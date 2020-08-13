/**
 * 表情包
 * author yangchengguo
 * date 2019.8.12
 * @class EmoticonView
 */
class EmoticonView extends CommonView{
    public _emoticonList:any[] = [];
    public _emoticonDataList:any[] = [];
    public _scorllContainer:BaseDisplayObjectContainer = null;
    public _emoticonScrollView:ScrollView = null;
    public _isShowAni:boolean = false;
    public _clickTime:number = 0;
    public _isStart:boolean = false;
    public _selectedIndex:number = -1;
    public _currEmoticonAni:any = null;
    public _bg = null;
    public _emoticonContainer:BaseDisplayObjectContainer = null;
    public _viewData:any = null;

    public constructor(){
        super();
    }

    public get cfg(){
        return Config.EmoticonCfg;
    }

    public get api(){
        return Api.emoticonVoApi;
    }

    public initView():void{
        this._maskBmp.alpha = 0;
        this._viewData = this.param.data;
        App.LogUtil.log("viewData is:"+this._viewData.channel);
        let bg = BaseBitmap.create("public_9_downbg");
        bg.width = GameConfig.stageWidth;
        bg.height = 340;
        bg.setPosition(0, GameConfig.stageHeigth - bg.height - 170);
        this.addChildToContainer(bg);
        bg.touchEnabled = true;
        this._bg = bg;

        //表情滑动列表
        let scorllContainer = new BaseDisplayObjectContainer();
        scorllContainer.width = bg.width;
        this._scorllContainer = scorllContainer;
        let rect = new egret.Rectangle(0, 0, scorllContainer.width, 280);
        let emoticonScrollView = ComponentManager.getScrollView(scorllContainer, rect);
        emoticonScrollView.horizontalScrollPolicy = "off";
        emoticonScrollView.setPosition(bg.x, bg.y + 15);
        this.addChildToContainer(emoticonScrollView);
        emoticonScrollView.bounces = false;
        this._emoticonScrollView = emoticonScrollView;

        //底部按钮
        let groupIds = this.api.getEmotiocnGroupId();
        let textArr:string[] = [];
        for (let i=0; i < groupIds.length; i++){
            textArr[i] = ""+groupIds[i];
        }
        App.LogUtil.log("textArr.length:"+textArr.length);
        let tabbarBg:BaseBitmap = BaseBitmap.create("emoticon_bottom_bg");
        tabbarBg.height = 50;
        tabbarBg.width = 619;
        tabbarBg.setPosition(GameConfig.stageWidth/2 - tabbarBg.width/2, bg.y + bg.height - 60);
        this.addChildToContainer(tabbarBg);
        let tabBarContainer = new BaseDisplayObjectContainer();
        tabBarContainer.height= 50;
        // let tabbarRect = new egret.Rectangle(0, 0, tabbarBg.width, 50);
        // let tabbarScrollView = ComponentManager.getScrollView(tabBarContainer, tabbarRect);
        // tabbarScrollView.horizontalScrollPolicy = "on";
        // tabbarScrollView.bounces = false;
        // tabbarScrollView.setPosition(GameConfig.stageWidth/2 - tabbarBg.width/2, bg.y + bg.height - 62);
        // this.addChildToContainer(tabbarScrollView);
        
        let tabbarGroup:TabBarGroup = ComponentManager.getScroTabBarGroup("emoticon_btn_icon", textArr, this.emoticonTabbarBtnHandler,this, null, null, tabbarBg.width, true, tabbarBg.width, 50);
        tabbarGroup.setPosition(0, tabBarContainer.height/2 - tabbarGroup.height/2 + 5);
        tabBarContainer.addChild(tabbarGroup);
        tabbarGroup.setSpace(1);

        tabBarContainer.setPosition(GameConfig.stageWidth/2 - tabbarBg.width/2, bg.y + bg.height - 62);
        this.addChildToContainer(tabBarContainer);

        for (let i=0; i < groupIds.length; i++){
            let btn = tabbarGroup.getChildAt(i);
            let imgStr = "emoticon_btn_img_"+groupIds[i];
            let btnFlag = BaseLoadBitmap.create(imgStr);
            btnFlag.width = 36;
            btnFlag.height = 35;
            btnFlag.setPosition(btn.x + btn.width/2 - btnFlag.width/2, btn.y + btn.height/2 - btnFlag.height/2);
            tabbarGroup.scrollContiner.addChild(btnFlag);
        }
        
        //显示表情
        let emoticonDataList = this.api.getSortEmoticonDataByGroup(groupIds[0]);
        this._emoticonDataList = emoticonDataList;
        this.refreshEmoticonList(emoticonDataList);

        this._scorllContainer.addTouch(this.touchEmoticonHandler, this);
    }

    //tabbar回调
    public emoticonTabbarBtnHandler(params:any):void{
        App.LogUtil.log("params.index: "+params.index);
        let index = params.index;
        let groupIds = this.api.getEmotiocnGroupId();
        let emoticonDataList = this.api.getSortEmoticonDataByGroup(groupIds[index]);
        if (index == 0){
            App.LogUtil.log("emoticonDataList.length: "+emoticonDataList.length);
        }
        this._emoticonDataList = emoticonDataList;
        this.refreshEmoticonList(emoticonDataList);
    }

    //刷新所有表情
    public refreshEmoticonList(data:any){
        let posX = 0;
        let posY = 0;
        let offsetX = 15;
        let offsetY = 10;
        let colNum = 5;
        for (let i=0; i < data.length; i++){
            if (this._emoticonList && this._emoticonList[i]){
               this._emoticonList[i].refreshEmoticonItem(data[i]);
                this._emoticonList[i].visible = true;
            }
            else{
                this._emoticonList[i] = new EmoticonItem();
                this._emoticonList[i].initItem(i, this._emoticonDataList[i]);
                this._scorllContainer.addChild(this._emoticonList[i]);
            }
            posX = this._emoticonList[i].width * (i % colNum) + offsetX * ((i % colNum + 1));
            posY = (this._emoticonList[i].height + offsetY) * (Math.floor(i / colNum));
            this._emoticonList[i].setPosition(posX, posY);
        }
        let count = this._emoticonList.length;
        for (let i=data.length; i < count; i++){
            this._emoticonList[i].visible = false; //注意是否会影响scrollview 的滑动 高度 如果不行就移除，下次再添加
        }
    }

    public touchEmoticonHandler(e:egret.TouchEvent){
        if (e.type == egret.TouchEvent.TOUCH_BEGIN){
            App.LogUtil.log("event: "+ e.type + " stageX:"+e.stageX + " stageY:"+e.stageY);
            this._isShowAni = false;
            for (let i = 0; i < this._emoticonList.length; i++){
                let ofp = this._scorllContainer.localToGlobal(0,0);
				if(this._emoticonList[i].hitTestPoint(Math.floor(e.localX + ofp.x) * this.scaleX, Math.floor(e.localY + (ofp.y + GameData.layerPosY) * this.scaleY),GameData.isSupportHitTestPoint)){
                    if (this._selectedIndex > -1){
                        this._emoticonList[this._selectedIndex].setSelected(false);
                    }
                    this._isStart = true;
                    if (this._emoticonDataList[i].status == 1){
                        this._emoticonList[i].setSelected(true);
                    }
                    this._selectedIndex = i;
                    break;
                }
            }
            App.LogUtil.log("touch begin selectIndex:"+this._selectedIndex);
        }
        else if (e.type == egret.TouchEvent.TOUCH_MOVE){
            if (this._selectedIndex == -1){
                return;
            }
            if (this._isStart){
                this._emoticonList[this._selectedIndex].setSelected(false);
                this._isStart = false;
            }
            if (!this._bg.hitTestPoint(e.stageX, e.stageY, GameData.isSupportHitTestPoint)){
                // App.LogUtil.log("***出屏幕");
                this._isShowAni = false;
                this.removeEmoticonAni();
            }
            if (this._isShowAni){
                for (let i = 0; i < this._emoticonList.length; i++){
                    let ofp = this._scorllContainer.localToGlobal(0,0);
                    if(this._emoticonList[i].hitTestPoint(Math.floor(e.localX + ofp.x) * this.scaleX, Math.floor(e.localY + (ofp.y + GameData.layerPosY) * this.scaleY), GameData.isSupportHitTestPoint)){
                        // App.LogUtil.log("move move:"+i+ " this._selectedIndex:"+this._selectedIndex);
                        if (i != this._selectedIndex){
                            this._selectedIndex = i;
                            this.showEmoticonAni();
                        }
                        break;
                    }
                }
            }
        }
        else if (e.type == egret.TouchEvent.TOUCH_END){
            this._emoticonScrollView.verticalScrollPolicy = "on";
            this.removeEmoticonAni();
            if (this._selectedIndex == -1){
                return;
            }
            if (this._isStart){
                this._emoticonList[this._selectedIndex].setSelected(false);
                this._isStart = false;
            }
            //发送表情 未获得不让发送
            App.LogUtil.log("event: "+ e.type + " stageX:"+e.stageX + " stageY:"+e.stageY);
            if (!this._isStart && !this._isShowAni){
                if (this._emoticonDataList[this._selectedIndex].status == 1){
                    App.LogUtil.log("发送表情");
                    this.sendEmoticon();
                }
                else{
                    App.LogUtil.log("show tip");
                    let id = this._emoticonDataList[this._selectedIndex].id;
                    let tipMsg = this.api.getEmoticonUnlockMsg(id);
                    App.CommonUtil.showTip(tipMsg);
                }
            }
            else{
                this._isShowAni = false;
            }
        }
        else if (e.type == egret.TouchEvent.TOUCH_CANCEL){
            App.LogUtil.log("event: "+ e.type + " stageX:"+e.stageX + " stageY:"+e.stageY);
            this._isStart = false;
            this._isShowAni = false;
            this._emoticonScrollView.verticalScrollPolicy = "on";
            this.removeEmoticonAni();
        }
    }

    //发送聊天表情
    public sendEmoticon():void{
        let id = this._emoticonDataList[this._selectedIndex].id;
        App.LogUtil.log("****send***"+this._selectedIndex+" emoticon id:"+id);
        if(GameData.serverTime - Api.chatVoApi._lastTime < 5)
		{
			let times = String( Api.chatVoApi._lastTime - GameData.serverTime + 5);
			App.CommonUtil.showTip(LanguageManager.getlocal("chatTimeTip",[times]));
			return;
        }
        Api.chatVoApi._lastTime = GameData.serverTime;
        
        this.api.setRecentEmoticon(id);
        let messageStr = GameData.emoticonMsgStr + "-" + id;
        if (this._viewData.type == 0){ // 默认
            let chatData:any = {};
            chatData.channel = 1;
            if (this._viewData.channel){
                chatData.channel = this._viewData.channel;
            }
            chatData.message = messageStr;
            chatData.emoticon = 1;
            NetManager.requestChat(chatData, this.requestChatCallBack, this);
        }
        else if (this._viewData.type == 1){ //跨服
            let data:any = {};
            data.content = messageStr;
            if (this._viewData.activeId){
                data.activeId = this._viewData.activeId;
            }
            if(this._viewData.iskingdom){
                data.iskingdom = 1;
            }
            NetManager.request(NetRequestConst.REQUEST_CROSSCHAT_SENDMSG, data);
        }
        else if (this._viewData.type == 2){ //私聊
            NetManager.request(NetRequestConst.REQUEST_PRICHAT_SENDMSG, {
                receiveuid:this._viewData.receiveuid,
                content:messageStr,
            });
        }
        this.hide();
    }

    public requestChatCallBack(data:{status:"success"|"timeout"|"fail"}):void{
        App.LogUtil.log("requestChatCallBack: "+data.status);
    }

    //获取当前点击的对象
    public getTouchedEmoticonIndex(localX:number, localY:number){
        let ofp = this._scorllContainer.localToGlobal(0,0);
        for (let i = 0; i < this._emoticonList.length; i++){
            if(this._emoticonList[i].hitTestPoint(Math.floor(localX + ofp.x) * this.scaleX, Math.floor(localY + (ofp.y + GameData.layerPosY) * this.scaleY),GameData.isSupportHitTestPoint)){
                if (i != this._selectedIndex){
                    this._selectedIndex = i;
                    this.showEmoticonAni();
                }
                break;
            }
        }
    }

    //预览
    public showEmoticonAni():void{
        App.LogUtil.log("showEmoticonAni this._selectedIndex: "+ this._selectedIndex);
        let id = this._emoticonDataList[this._selectedIndex].id;
        let imgStr = "emoticon_" + id + "_effect";
        ResourceManager.loadItem(imgStr, this.loadEmoticonResComplete, this);
    }

    //加载预览资源
    public loadEmoticonResComplete():void{
        let id = this._emoticonDataList[this._selectedIndex].id;
        let target = this._emoticonList[this._selectedIndex];
        let desPos = target.localToGlobal(0, 0);
        // App.LogUtil.log("desPos.x:"+desPos.x+ "  "+desPos.y);
        let emoticonData = Config.EmoticonCfg.getEmoticonCfgById(id);
        if (this._emoticonContainer && this._currEmoticonAni){
            let imgArr:string[] = [];
            for (let i=1; i <= emoticonData.frame; i++){
                imgArr[i-1] = "emoticon_" + id + "_effect" + i;
            }
            this._currEmoticonAni.frameImages = imgArr;
            this._emoticonContainer.setPosition(desPos.x, desPos.y - 120);
        }
        else{
            this._emoticonContainer = new BaseDisplayObjectContainer();
            this._emoticonContainer.width = 120;
            this._emoticonContainer.height = 120;
            this._emoticonContainer.setPosition(desPos.x, desPos.y - 120);
            this.addChildToContainer(this._emoticonContainer);
            let bg = BaseBitmap.create("public_9_bg77");
            bg.width = this._emoticonContainer.width;
            bg.height = this._emoticonContainer.height;
            this._emoticonContainer.addChild(bg);
            this._currEmoticonAni = ComponentManager.getCustomMovieClip("emoticon_" + id + "_effect", emoticonData.frame, 100);
            this._emoticonContainer.addChild(this._currEmoticonAni);
            this._currEmoticonAni.playWithTime(1);
            let view = this;
            this._currEmoticonAni.setEndCallBack(()=>{
                egret.Tween.get(view._currEmoticonAni).wait(700).call(()=>{
                    view._currEmoticonAni.playWithTime(1);
                })
            }, view);
        }
    }

    //删除预览
    public removeEmoticonAni():void{
        if (this._emoticonContainer){
            this._emoticonContainer.dispose();
            this._emoticonContainer = null;
            this._currEmoticonAni = null;
        }
    }

    public tick():void{
        if (this._isStart){
            this._clickTime += 1;
        }
        if (this._clickTime >= 2){
            if (this._emoticonScrollView._checkScrollPolicy()){
                this._emoticonScrollView._onTouchEnd(null);
            }
            this._emoticonScrollView.verticalScrollPolicy = "off";
            this._isStart = false;
            this._isShowAni = true;
            this._clickTime = 0;
            this._emoticonList[this._selectedIndex].setSelected(false);
            this.showEmoticonAni();
        }
    }

    protected getResourceList():string[]{
        return super.getResourceList().concat([
            "emoticon_bottom_bg", "emoticon_btn_icon", "emoticon_btn_icon_down", "emoticon_lock"
        ]);
    }

    protected getBgName():string{
        return "";
    }

    protected getTitleBgName():string{
        return "";
    }

    protected getCloseBtnName():string{
        return "";
    }

    protected getTitleStr():string{
        return "";
    }

    protected isTouchMaskClose():boolean
	{
		return true;
	}

    public dispose():void{
        this._emoticonList = [];
        this._emoticonDataList = [];
        this._scorllContainer = null;
        this._emoticonScrollView = null;
        this._isShowAni = false;
        this._clickTime = 0;
        this._isStart = false;
        this._selectedIndex = -1;
        this._currEmoticonAni = null;
        this._emoticonContainer = null;
        this._currEmoticonAni = null;
        this._bg = null;
        this._viewData = null;
        super.dispose();
    }
}