/**
 * 聊天
 * author dky
 * date 2017/10/26
 * @class ChatScrollItem
 */
class ChatScrollItem extends ScrollListItem {

    private _userName:BaseTextField;
    private _posContainer:BaseDisplayObjectContainer;
    private _chatData:any;
    private _stype:number = 0; //分享的类型
    public constructor() {
        super();
    }

    public initItem(index: number, chatData: any): void {

        
        this.width = 610;
        

        // let chatList = Api.chatVoApi.getChatList();


        // let chatData = chatList[index];
        this._chatData = chatData;
       
        //头像背景
        // this._posContainer = new BaseDisplayObjectContainer();
        let posStr =  "head_circle_bg";//chatData.content.headID;
        if(chatData.content.headID && chatData.content.headID != ""){
            posStr = chatData.content.headID;
        }
        if(chatData.content.headBg && Api.switchVoApi.checkVip1Privilege() && chatData.content.headBg != 'head_circle_bg_0'){
            posStr = chatData.content.headBg;
        }
        
        this._posContainer = Api.playerVoApi.getPlayerCircleHead(chatData.content.pic,posStr);
        this._posContainer.x = 0;


       
       



        // let posStr = "head_circle_bg";
        // if(chatData.content.headBg && Api.switchVoApi.checkVip1Privilege()){
        //     posStr = chatData.content.headBg;
        // }
        // let posBg:BaseBitmap = BaseBitmap.create(posStr);
        // this._posContainer.addChild(posBg)
		this.addChild(this._posContainer);

        let head = this._posContainer.getChildByName("myHead");

        let titleLv = chatData.content.titleLv;
        if(titleLv && titleLv != 0){
            let lvbg:BaseBitmap = BaseBitmap.create("public_lvupbg");
			lvbg.setPosition(head.x + head.width * head.scaleX /2 - lvbg.width /2, this._posContainer.height-lvbg.height+3);
			this._posContainer.addChild(lvbg);

			let levelTf:BaseTextField = ComponentManager.getTextField("Lv."+String(titleLv),16,TextFieldConst.COLOR_BROWN);
			levelTf.x = lvbg.x + lvbg.width/2 - levelTf.width/2;
			levelTf.y = lvbg.y ;
			this._posContainer.addChild(levelTf);
        }


        // //  this._posContainer.setPosition(-30,-30)

        this._posContainer.addTouch(this.eventHandler,this,null);	
        let itemBgPic = "public_chatbg3";
        if (chatData.content.stype == 3) {
            itemBgPic = "public_chatbg4";
        } else if (chatData.sender == Api.playerVoApi.getPlayerID()) {
            itemBgPic = "public_chatbg2";
        }
        let isKing = (chatData.content.ket>0 );
        if (isKing)
        {
            itemBgPic = "public_chatbg_king";
        }

        let itemBg = BaseBitmap.create(itemBgPic);
        itemBg.width = 404;
        itemBg.x = 108;
        itemBg.y = 50;
        this.addChild(itemBg);
       
      
        //名字
        let chatName = "<font u ='true'>" + chatData.sendername + "</font>";

        this._userName = ComponentManager.getTextField(chatName, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._userName.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        this._userName.x = itemBg.x + 10;
        this._userName.y = 15;
        this.addChild(this._userName);
        this._userName.addTouchTap(this.showUserInfo,this,null);
         let titlepath = "";
        let serverTxt:BaseTextField = undefined; 
        if(chatData.chattype && chatData.chattype == 'cross'){
            serverTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x39d7fe);
            let sidname = Api.mergeServerVoApi.getAfterMergeSeverName(this._chatData.sender);
            serverTxt.text = sidname;
            serverTxt.x = 404 + 5;
            serverTxt.y = 10;
            this.addChild(serverTxt);
        }

        let dis = 0;
        let vipFlag;
        if(chatData.content.vip && chatData.content.vip > 0 && !PlatformManager.checkIsKRSp()){
            vipFlag = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(chatData.content.vip).icon);
            vipFlag.setScale(0.65);
            vipFlag.x =  this._userName.x + this._userName.width + 10;
            vipFlag.y = this._userName.y ;
            this.addChild(vipFlag);
            dis = 68 + 5;
        }
        let officerImg;
        if(chatData.content.title && chatData.content.title > 0){
             titlepath = Config.TitleCfg.getTitleIcon3WithLv(chatData.content.title,chatData.content.tlv);
            officerImg = BaseLoadBitmap.create(titlepath);
            officerImg.x =  this._userName.x + this._userName.width + dis ; 
            officerImg.y = this._userName.y - 10 ;
            this.addChild(officerImg);
            dis = dis + 110 + 5;
         }
       
      
        //时间
        let timeDis = GameData.serverTime;
        if(chatData.ts){
            timeDis = GameData.serverTime - chatData.ts;
        }else if(chatData.content.ts){
            timeDis = GameData.serverTime - chatData.content.ts;
        }
        
        let timeTF = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(timeDis,4), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        timeTF.textColor = TextFieldConst.COLOR_LIGHT_YELLOW
        timeTF.x = this.width - timeTF.width -5;
        timeTF.y = this._userName.y;
        this.addChild(timeTF);
        
        let messageTF:BaseTextField;
        if (chatData.content.stype) {
            this._stype = chatData.content.stype;
            this.initShareInfo(itemBg,chatData.sender == Api.playerVoApi.getPlayerID());
        }else
        {
            //内容
            messageTF = ComponentManager.getTextField(chatData.content.message, TextFieldConst.FONTSIZE_CONTENT_COMMON);
            messageTF.textColor = TextFieldConst.COLOR_BROWN;
            messageTF.x = itemBg.x + 25;
            messageTF.y = itemBg.y + 12;
            this.addChild(messageTF);
            if(isKing){
                messageTF.y = itemBg.y + 18;
            }

            if(messageTF.width > 370){
                messageTF.width = 370; 
            }
            
            let bgHeight =  messageTF.height + 20;
            if (bgHeight < 50){
                itemBg.width = messageTF.width + 30;
                itemBg.height = 47;

            }else{
                itemBg.width = 404;
                itemBg.height = messageTF.height + 20;

            }
        }
                //自己说的话
        if (chatData.sender == Api.playerVoApi.getPlayerID()) {
            this._posContainer.x = this.width - this._posContainer.width;
            itemBg.skewY = 180;
            itemBg.x = this._posContainer.x - 12;

            if(serverTxt){
                this._userName.x = 475 - this._userName.textWidth ;
            }else{
                this._userName.x = itemBg.x  - this._userName.textWidth - 8;
            }
            if(vipFlag){
                vipFlag.x = this._userName.x - 68 - 10;
            }

            if(officerImg){
                if(vipFlag){
                    officerImg.x = vipFlag.x - 190;
                }else{
                    officerImg.x = this._userName.x - 190;
                }
            }

            timeTF.x = 5;
            
            if (messageTF) {
                messageTF.x = itemBg.x - messageTF.width - 22;
            }
        }

         if(isKing){
            // itemBg.width += 20;
             if(messageTF.y + messageTF.height > itemBg.y +itemBg.height - 12){
                 itemBg.height = messageTF.y + messageTF.height + 12 - itemBg.y;
             }
        }
        
        timeTF.y = itemBg.y + itemBg.height - timeTF.height;
        if(serverTxt){
            serverTxt.y =  timeTF.y - serverTxt.height - 5;
            if (chatData.sender == Api.playerVoApi.getPlayerID()) {
                serverTxt.x =  timeTF.x ;
            }else{
                serverTxt.x =  timeTF.x + timeTF.width - serverTxt.width;
            }
        }

       this.cacheAsBitmap=true;
    }

    private initShareInfo(itemBg:BaseBitmap,isself:boolean):void
    {
        itemBg.height  = 106;
        itemBg.addTouchTap(this.shareTurnOnHandler,this,null);

        let iconBg:BaseBitmap= BaseBitmap.create("chat_share_bg_" + ((this._stype == 3)?this._chatData.content.sinfo.sex:"3"));
        iconBg.setPosition(itemBg.x+23,itemBg.y+7);
        this.addChild(iconBg);
        let showArr = new Array();
        showArr = this._chatData.content.sinfo.info.concat();
        if (isself)
        {
            iconBg.x =  itemBg.x + 35 -iconBg.width/2;
        }
        let lineStr :string;
        if (this._stype == 1)
        {   
            lineStr= LanguageManager.getlocal("taskGoBtn");
            let icon:BaseLoadBitmap= BaseLoadBitmap.create(this._chatData.content.sinfo.dtype=="1"?"itemicon1501":"itemicon1511");
            icon.setPosition(iconBg.x,iconBg.y);
            this.addChild(icon);
            
            // let zoneidText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranserver",[this._chatData.zoneid]), TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);   
            // zoneidText.setPosition(iconBg.x + iconBg.width+10,itemBg.y+10);
            // this.addChild(zoneidText);
            if(Api.switchVoApi.checkOpenCrossRank()){
				showArr.push(LanguageManager.getlocal("ranserver",[this._chatData.zoneid]));
			}
            
        }
        else if (this._stype == 2)
        {   
            // lineStr= LanguageManager.getlocal("taskGoBtn");
            // let icon:BaseLoadBitmap= BaseLoadBitmap.create("chat_share_icon2");
            // icon.setPosition(iconBg.x,iconBg.y);
            // this.addChild(icon);
        }
        else if (this._stype == 3)
        {   
            lineStr= LanguageManager.getlocal("adultMarry");
            // if (this._chatData.content.sinfo.cid)
            // {
                let rect = egret.Rectangle.create();
                rect.setTo(0, 0, 106*0.9, 87*0.9);
                let icon:BaseLoadBitmap= BaseLoadBitmap.create(Api.adultVoApi.getAdultHalfPic(this._chatData.content.sinfo.sex,this._chatData.content.sinfo.aquality),rect);
                icon.setPosition(iconBg.x,iconBg.y+8);
                this.addChild(icon);  
            // }
        }
        let posY:number = itemBg.y+10;
        for (let key in showArr)
        {
            let infoStr:string = showArr[key];
            let infoText:BaseTextField = ComponentManager.getTextField(infoStr, TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);   
            infoText.setPosition(iconBg.x + iconBg.width+10,posY);
            this.addChild(infoText);
            posY += infoText.height + 10;
        }

        let goTo:BaseTextField = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_RED);   
        goTo.textFlow = new Array<egret.ITextElement>(
				{ text: lineStr, style: { "underline": true} }
				);
        goTo.setPosition(iconBg.x + 367 -goTo.width,itemBg.y+itemBg.height/2-goTo.height/2);
        this.addChild(goTo);
    }

    private shareTurnOnHandler():void{
		if (this._stype == 1)
        {
            if (Config.DinnerCfg.getNeedLv() > Api.composemapVoApi.getMaxLv())
            {   
                App.CommonUtil.showTip(Api.dinnerVoApi.getLockedString());
                return;
            }

            if (this._chatData.sender == Api.playerVoApi.getPlayerID())
            {   
                App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL),this.requiestCallback2,this);
			    NetManager.request(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL,{"getuid":Api.playerVoApi.getPlayerID()});
            }
            else
            {
                let chatTs = this._chatData.ts;
                ViewController.getInstance().openView(ViewConst.BASE.GOTODINNEREDVIEW, {"info":{name:this._chatData.sendername ,uid: this._chatData.sender, checkChatTime:chatTs}});
            }

           
        }
        else if (this._stype == 2)
        {   
            // if (GameConfig.config.studyatkbaseCfg.needLv > Api.playerVoApi.getPlayerLevel())
            // {   
            //     App.CommonUtil.showTip(Api.studyatkVoApi.getLockedString());
            //     return;
            // }
            // if (GameData.serverTime >= this._chatData.content.sinfo.et)
            // {   
            //     App.CommonUtil.showTip(LanguageManager.getlocal("shareTimeOver"));
            //     return;
            // }


            // let studyAtkBaseCfg = GameConfig.config.studyatkbaseCfg
            // let tmpFuid = Api.playerVoApi.getPlayerID();
            // let endSec = Api.studyatkVoApi.getStudyatkVo().create_time + studyAtkBaseCfg.lastTime;
            // if(Api.studyatkVoApi.getStudyatkVo().join_uid > 0)
            // {
            //     endSec = Api.studyatkVoApi.getStudyatkVo().join_st + studyAtkBaseCfg.lastTime;
            //     tmpFuid = Api.studyatkVoApi.getStudyatkVo().join_uid;
            // }
            // if(endSec > GameData.serverTime  && this._chatData.sender != Api.playerVoApi.getPlayerID()  && this._chatData.sender != tmpFuid)
            // { 
            //     App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_already"));
            //     return;
            // }

            // // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_INDEX),this.requiestCallback3,this);
			// // NetManager.request(NetRequestConst.REQUEST_STUDYATK_INDEX,{});
            // ViewController.getInstance().openView(ViewConst.COMMON.STUDYATKDETAILVIEW,{uid:this._chatData.sender});  
            
        }
        else if (this._stype == 3)
        {   
            if (GameData.serverTime >= this._chatData.content.sinfo.et)
            {   
                App.CommonUtil.showTip(LanguageManager.getlocal("shareTimeOver"));
                return;
            }
            if (this._chatData.sender == Api.playerVoApi.getPlayerID())
            {   
                App.CommonUtil.showTip(LanguageManager.getlocal("shareAdultMarryNoSelf"));
                return;
            }
            let sinfo = this._chatData.content.sinfo;

            let childList = Api.adultVoApi.getAdultVoListById(sinfo.aquality,sinfo.sex);
            if (childList.length == 0)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("adult_no_match"));
                return;
            }
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ADULT_EXISTPROPOSE),this.requiestCallback,this);
			NetManager.request(NetRequestConst.REQUEST_ADULT_EXISTPROPOSE,{"proposeId":Number(sinfo.aid)});

        }
	}

    //提亲回调
    private requiestCallback(p:any):void
	{	
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ADULT_EXISTPROPOSE),this.requiestCallback,this);
        if (p.data.ret == true) {
			 let sinfo = this._chatData.content.sinfo;
            let info:any = {id:Number(sinfo.aid),aquality:sinfo.aquality,sex:sinfo.sex,uid:this._chatData.sender,visit:sinfo.visit,fatherName:this._chatData.sendername,name:sinfo.info[0],total:sinfo.total};
		    ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSECHILDVIEW, { childInfo: info,confirmCallback: null, handler: null });	
		}
        else
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip5"));
        }
    }
    //宴会回调
    private requiestCallback2(p:any):void
	{	
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL),this.requiestCallback2,this);

		let checkChatTime:any = this._chatData.ts;

		if (p.data.ret == true && Config.DinnerCfg.getFeastItemCfg(p.data.data.data.dinnerdetail.dtype)&&(p.data.data.data.dinnerdetail.end_time - Config.DinnerCfg.getFeastItemCfg(p.data.data.data.dinnerdetail.dtype).lastTime <= checkChatTime)) {
			if (p.data.data.data.dinnerReport) {
				Api.dinnerVoApi.formatData(p.data.data.data.dinnerdetail);
				ViewController.getInstance().openView(ViewConst.BASE.DINNERFINISHVIEW, {"info":p.data.data.data.dinnerReport,"baodi":p.data.data.data.baodiNum});
			}
			else {
				let data:any = {"info":p.data.data.data,"uid":Api.playerVoApi.getPlayerID()};
				ViewController.getInstance().openView(ViewConst.COMMON.DINNERDETAILVIEW, data);
			}		
		}
        else
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("dinner_is_over"));
        }
	}
    protected userShotCallback(event:egret.Event)
    {

        let data = event.data.data.data;
        let cross = this._chatData.chattype && this._chatData.chattype == 'cross';
        // if(String(data.ruid) == this._chatData.sender)
        // {
        if(!Api.switchVoApi.checkOpenShenhe())
		{
            if (Api.switchVoApi.checkOpenCrossRank()){
				// data['crossZone'] = true;
                // data.crossZone = cross
				data['zid'] = data.rzid;
				data["isDinnerHost"] = false;
			}
            ViewController.getInstance().openView(ViewConst.COMMON.RANKUSERINFOVIEW,data);
        }
         
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
    }
    private showUserInfo()
    {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:this._chatData.sender});
    }
    protected eventHandler(event:egret.TouchEvent)
    {

        switch(event.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
				
                // egret.Tween.get(this._posContainer,{loop:false}).to({scaleX:0.8,ScaleY:0.8},200);
                this.showUserInfo();
				break;
            case egret.TouchEvent.TOUCH_CANCEL:
                // this._itemBg.texture = ResourceManager.getRes("public_9_bg28");
                break;
			case egret.TouchEvent.TOUCH_END:
				// this._itemBg.texture = ResourceManager.getRes("public_9_bg28");
                
				break;
        }
    }

    public getSpaceY(): number {
        return 0;
    }

    public dispose(): void {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL),this.requiestCallback2,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
        this.cacheAsBitmap=true;
        this._userName.removeTouchTap();
        this._userName = null;
        // this._posContainer.removeAllTouchs();
        this._posContainer = null;
        this._stype = 0;
        
        super.dispose();
    }
}