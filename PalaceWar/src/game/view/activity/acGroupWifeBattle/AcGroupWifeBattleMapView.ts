/*
author : qianjun----wxz
desc : 风华群芳活动
*/
class AcGroupWifeBattleMapView extends CommonView{
    private _bgGroup : BaseDisplayObjectContainer = null;
    private _period : number = 1;
    private _cdBg : BaseBitmap = null;
    private _cdText : BaseTextField = null;
    private _chatTxt :BaseTextField = null;
    private _bottomBg : BaseBitmap = null;
    private touchBoo:boolean =true;
	private moreBg:BaseBitmap =null;
	private describeTxt:BaseTextField =null;
	private moveContainer:BaseDisplayObjectContainer =null;
    private _moreArrow:BaseBitmap = null;
    private _isShowMore:boolean = false;
    private _touchBg:BaseBitmap =null;
    private _currMaskBmp:BaseBitmap =null;
    private isData:boolean =false;
    private listconditions:BaseTextField = null;
    private _scrollList: ScrollList;
    private _battleDataList:Array<any>=[];
    private _bottomLogTxt : BaseTextField = null;
    private _bgScrollView : ScrollView = null;
    private _countDownTime:number = 0;
    private _fightflag:boolean = null;
    private _randBtn:BaseButton =null;
    private _curFightType = 0;//1可以随机挑战 2已经发生战斗没结束 继续战斗 3cd中 4次数耗尽
    private _curAllianceMap = -1;//我的帮会所在地图
    private _curAllianceIdx = -1;//我的帮会索引
    private _stopTouch = false;
    private _leftArrow : BaseButton = null;
    private _rightArrow : BaseButton = null;
    private _needFresh = false;
    private _randClick = false;
    private _logBtn : BaseButton = null;
    private _cheerBtn : BaseButton = null;
    private _daizi:BaseBitmap = null;

    private _buildingNum = 12;

    private _protectTxt:BaseTextField = null;
    private _protectInfo:any = null;

    public constructor(){
        super();
    }

    private tmpX = 0;
    protected getRequestData():{requestType:string,requestData:any}
	{	
        let view = this;
		return {requestType:NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE,requestData:{
			activeId : view.vo.aidAndCode,
		}};
    }
    
	protected receiveData(data:{ret:boolean,data:any}):void
	{
        let view = this;
        if(data.data.data){
            if(data.data.data.waiting){
                view.vo.setWaiting(data.data.data.waiting);
            }
            else{
                view.vo.setWaiting(0);
                if(data.data.data && data.data.cmd == NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE){
                    if (data.data.data.groupwifebattle.fightflag == false) {
                        this._fightflag= false;
                    }
                    else {
                        this._fightflag= true;
                    }
                    if(data.data.data.groupwifebattle){
                        view.vo.setRaceInfo(data.data.data.groupwifebattle);
                        view.vo.setWifebattleInfo(data.data.data.groupwifebattle);
                    }
                    if(data.data.data.map){
                        view.vo.setMap(data.data.data.map);
                    }
                    if(data.data.data.myrankArr){
                        view.vo.setRank(data.data.data.myrankArr);
                    }
                    if(data.data.data.alive){
                        view.vo.setAlive(data.data.data.alive);
                    }
                    else{
                        view.vo.setAlive(0);
                    }
                    if(data.data.data.protectInfo)
                    {
                        this._protectInfo = data.data.data.protectInfo;
                    }
                    view.resetInfo();
                    if(view._needFresh){
                        view._needFresh = false;
                        let leftX = view._bgScrollView.scrollLeft;
                        let range = [leftX, Math.min(view._bgGroup.width - GameConfig.stageWidth, leftX + GameConfig.stageWidth)];
                        for(let i = 0; i < this.mapNum; ++ i){
                            let mapleft = i * this.mapWidth;
                            if(mapleft + this.mapWidth >= range[0] && mapleft < range[1]){
                                view.freshCity(i);
                            }
                        }
                    }
                }
            }
        }
	}

    protected getResourceList():string[]{
        let ret = super.getResourceList();
        let code = this.getUiCode();
        ret = ret.concat([
           `acgroupwifebattle_battlebg-${code}`,`groupwifebattle1-${code}`,`groupwifebattle2-${code}`,`groupwifebattle3-${code}`,`groupwifebattle4-${code}`,`battlegroundmap-${code}`,
           `servant_mask`,`arena_bottom_bg`,`battlegrounddestroy`,`battlegroundsmoke`,`groupwifebattle_mapmask`,
           `battlegroundsmapsmoke`,`battlegroundsmoke2_`,`battlegroundsmoke3_`,`battlegroundsmoke4_`,"arena_more","chatlaba","rankinglist_line","rankinglist_rankbg"
           ,`battlegroundfire${this.getUiCode()}_`
        ]);
		return ret;
	}
    
    // 背景图名称
	protected getBgName():string{
        return 'acgroupwifebattle_battlebg-' + this.getUiCode();
    }

    protected getRuleInfo() : string{
        let code = this.getUiCode();
        // if(Api.switchVoApi.checkServantRefuseBattle() && this.getUiCode() == '1' &&Api.switchVoApi.checkOpenAtkracegChangegpoint()){
		// 	return "acBattleRoundRule-1_newRule_withOpenRefusal";
		// }
        // return Api.switchVoApi.checkOpenAtkracegChangegpoint() ? (`acBattleRoundRule-${this.getUiCode()}_newRule`) : (`acBattleRoundRule-${this.getUiCode()}`);
        return `acGroupWifeBattleRule-${code}`;
    }
    
    protected getRuleInfoParam() : string[]{
        return this.vo.getRuleInfoParam();
    }

    //获取此次活动需要创建的地图数目
    private get mapNum():number{
        let servernum = this.vo.getMapLenth();
        let mapNum = Math.ceil(servernum / this._buildingNum);
        return mapNum;
    }

    //地图宽度
    private get mapWidth():number{
        return 1280;
    }
    
    private _isFreshMap = false;

    protected initBg():void{
        this.height = GameConfig.stageHeigth;
        this.width = GameConfig.stageWidth;

        let bgName:string=this.getBgName();
        this.viewBg = BaseBitmap.create(bgName);//`battlegroundmask-${this.code}`

        this._isFreshMap = false;
        
		if(bgName){
            let bggroup = new BaseDisplayObjectContainer();
            bggroup.width = GameConfig.stageWidth * 2 * this.mapNum;
            bggroup.height = GameConfig.stageHeigth;
            this.addChild(bggroup);
            this._bgGroup = bggroup;
            bggroup.addChild(this.viewBg);
            for(let i = 0; i < this.mapNum; ++ i){
                if(i > 0){
                    continue;
                }
                let map = BaseBitmap.create(bgName);
                map.name = `map${i}`;
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, map, bggroup, [i * this.mapWidth,0], true);
                bggroup.addChild(map);
                this.viewBg.x = map.x + map.width;
                this.viewBg.y = map.y;
                for(let j in this.mapPos){
                    if(Number(j) > 8){
                        break;
                    }
                    let unit = this.mapPos[j];
                    let idx = i * this._buildingNum + Number(j);
                    let info = this.vo.getAllInfoById(idx);
                    if(!info){
                        continue;
                    }
    
                    let mask1 = BaseBitmap.create(`groupwifebattle${info.period}-${this.getUiCode()}`);
                    mask1.anchorOffsetX = mask1.width / 2;
                    mask1.anchorOffsetY = mask1.height / 2;
                    mask1.x = map.x + unit.x + mask1.anchorOffsetX;
                    mask1.y = map.y + unit.y + mask1.anchorOffsetY;
                    mask1.name = `alliancebuild${info.alliId}`;

                    let alphaMask = BaseBitmap.create(`groupwifebattle_mapmask`);
                    alphaMask.anchorOffsetX = alphaMask.width / 2;
                    alphaMask.anchorOffsetY = alphaMask.height / 2;                    
                    alphaMask.setScale(4);
                    alphaMask.setPosition(mask1.x,mask1.y);
                    alphaMask.alpha = 0;
                    alphaMask.name = `alphaMask${info.alliId}`;

                    if(Number(j) == 1){
                        // let smoke = ComponentManager.getCustomMovieClip(`battlegroundsmapsmoke`,10,70);
                        // smoke.width = 74;
                        // smoke.height = 176;
                        // smoke.anchorOffsetX = smoke.width / 2;
                        // smoke.anchorOffsetY = smoke.height / 2;
                        // smoke.x = 349;
                        // smoke.y = map.y + 240;
                        // smoke.setScale(2);
                        // smoke.rotation = 17;
                        // bggroup.addChild(smoke);
                        // smoke.name = 'mapsmoke'; 
                        // smoke.playWithTime(0);
                    }
                    alphaMask.addTouch((e:egret.TouchEvent)=>
                    {
                        let target = e.currentTarget;
                        if(e.type == egret.TouchEvent.TOUCH_BEGIN)
                        {
                            target.alpha = 0.5;
                        }else if(e.type == egret.TouchEvent.TOUCH_END || e.type == egret.TouchEvent.TOUCH_CANCEL || e.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE)
                        {
                            target.alpha = 0;
                        }
                    },this);                    
                    alphaMask.addTouchTap((e : egret.Event)=>{
                        if(this._stopTouch){
                            return;
                        } 
                        if(Number(info.mid) == Number(Api.playerVoApi.getPlayerAllianceId())){
                           //跳转
                           this.moveToMyAlliance();
                        }
                        else{
                            ViewController.getInstance().openView(ViewConst.POPUP.ACGROUPWIFEBATTLEALLIINFOVIEW,{
                                code : this.code,
                                aid : this.aid,
                                alliId : info.alliId
                            });
                        }
                        
                    },this,null);
                    bggroup.addChild(mask1);
                    bggroup.addChild(alphaMask);
                    //信息
                    let infobg = BaseBitmap.create(`battlegroundallibg-${this.getUiCode()}`);
                    infobg.name = `alliancebg${info.alliId}`;
                    let allinameTxt = ComponentManager.getTextField(``, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
                    allinameTxt.name = `allianceTxt${info.alliId}`;
                    allinameTxt.lineSpacing = 5;
                    allinameTxt.textAlign = egret.HorizontalAlign.CENTER;
                    bggroup.addChild(infobg);
                    bggroup.addChild(allinameTxt);
                }
            }
            
            let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth);
            let noticescrollView = ComponentManager.getScrollView(bggroup,rect);
            noticescrollView.bounces = false;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, noticescrollView, this);
            noticescrollView.verticalScrollPolicy = 'off';
            bggroup.y = 0;
            this.addChild(noticescrollView);

            noticescrollView.bindMoveCompleteCallback(()=>{
                this.freshMap();
            },this);
            this._bgScrollView = noticescrollView;
            this.freshMap();
        }
    }

    //背景地图随可视窗口的创建刷新和移出
    private freshMap():void{
        if(this._isFreshMap)
        {
            return;
        }
        this._isFreshMap = true;

        let view = this;
        view.tmpX = 0;
        let leftX = view._bgScrollView.scrollLeft;
        //左右箭头
        if(view._leftArrow){
            view._leftArrow.visible = leftX > 0;
            view._rightArrow.visible = leftX < ((view.mapNum - 1) * this.mapWidth + (this.mapWidth / 2));
            if(view.mapNum == 0)
            {
                view._leftArrow.visible = false;
                view._rightArrow.visible = false;
            }            
        }
        
        for(let i = 0; i < this.mapNum; ++ i){
            let map = view._bgGroup.getChildByName(`map${i}`);
            if(!map){
                map = BaseBitmap.create(this.getBgName());
                let range = [leftX, Math.min(view._bgGroup.width - GameConfig.stageWidth, leftX + GameConfig.stageWidth)];
                let mapleft = i * this.mapWidth;
                if(mapleft + this.mapWidth >= range[0] && mapleft < range[1]){
                    map.name = `map${i}`;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, map, view._bgGroup, [i * this.mapWidth,0], true);
                    view._bgGroup.addChild(map);
                }
                else{
                    map = null;
                }
            }
            if(map){
                let mapleft = map.x;
                let range = [leftX, Math.min(view._bgGroup.width - GameConfig.stageWidth, leftX + GameConfig.stageWidth)];
                if(mapleft + this.mapWidth >= range[0] && mapleft < range[1]){
                    view.freshCity(i);
                }
                else{
                    if(map){
                        view._bgGroup.removeChild(map);
                    }
                    for(let j in view.mapPos){
                        view.removeCity(i * this._buildingNum + Number(j));
                    }
                }
            }
        }
        this._isFreshMap = false;
        // let mapsmoke = view._bgGroup.getChildByName(`mapsmoke`);
        // if(mapsmoke){
        //     view._bgGroup.setChildIndex(mapsmoke, 99999);
        // }
    }

    //每张地图上的城池状态变化
    private freshCity(mapId : number):void{
        let view = this;
        let leftX = view._bgScrollView.scrollLeft;
        let map = view._bgGroup.getChildByName(`map${mapId}`);
        if(map){
            let range = [leftX, leftX + GameConfig.stageWidth];
            for(let j in view.mapPos){
                let unit = view.mapPos[j];
                let idx = mapId * this._buildingNum + Number(j);
                let info = view.vo.getAllInfoById(idx);
                if(!info){
                    continue;
                }
                let mask1 : any = view._bgGroup.getChildByName(`alliancebuild${info.alliId}`);
                let alphaMask : any = view._bgGroup.getChildByName(`alphaMask${info.alliId}`);
                if(!mask1)
                {
                    mask1 = BaseBitmap.create(`groupwifebattle${info.period}-${this.getUiCode()}`);
                    mask1.anchorOffsetX = mask1.width / 2;
                    mask1.x = map.x + unit.x + mask1.anchorOffsetX;

                    alphaMask = BaseBitmap.create(`groupwifebattle_mapmask`);
                    alphaMask.anchorOffsetX = alphaMask.width / 2;
                    alphaMask.setScale(4);
                    alphaMask.x = mask1.x;
                    alphaMask.alpha = 0;

                    let scrollLeft = mask1.x - mask1.anchorOffsetX;
                    if(scrollLeft < range[1] && scrollLeft + mask1.width >= range[0])
                    {
                        mask1.anchorOffsetY = mask1.height / 2;
                        mask1.y = map.y + unit.y + mask1.anchorOffsetY;
                        mask1.name = `alliancebuild${info.alliId}`;

                        alphaMask.anchorOffsetY = alphaMask.height / 2;
                        alphaMask.y = mask1.y;
                        alphaMask.name = `alphaMask${info.alliId}`;

                        alphaMask.addTouch((e:egret.TouchEvent)=>
                        {
                            let target = e.currentTarget;
                            if(e.type == egret.TouchEvent.TOUCH_BEGIN)
                            {
                                target.alpha = 0.5;
                            }else if(e.type == egret.TouchEvent.TOUCH_END || e.type == egret.TouchEvent.TOUCH_CANCEL || e.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE)
                            {
                                target.alpha = 0;
                            }
                        },this);

                        alphaMask.addTouchTap((e : egret.Event)=>
                        {
                            if(this._stopTouch){
                                return;
                            } 
                            if(Number(info.mid) == Number(Api.playerVoApi.getPlayerAllianceId()))
                            {
                                //跳转
                                this.moveToMyAlliance();
                            }
                            else
                            {
                                ViewController.getInstance().openView(ViewConst.POPUP.ACGROUPWIFEBATTLEALLIINFOVIEW,{
                                    code : this.code,
                                    aid : this.aid,
                                    alliId : info.alliId
                                });
                            }
                           
                        },this,null,true);
                        view._bgGroup.addChild(mask1);
                        view._bgGroup.addChild(alphaMask);
                        //信息
                        let infobg = BaseBitmap.create(`battlegroundallibg-${this.getUiCode()}`);
                        infobg.name = `alliancebg${info.alliId}`;
                        let allinameTxt = ComponentManager.getTextField(``, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
                        allinameTxt.name = `allianceTxt${info.alliId}`;
                        allinameTxt.lineSpacing = 5;
                        allinameTxt.textAlign = egret.HorizontalAlign.CENTER;
                        view._bgGroup.addChild(infobg);
                        view._bgGroup.addChild(allinameTxt);

                    }
                    else{
                        mask1 = null;
                    }
                }
                let scrollLeft = 0;
                if(mask1){
                    scrollLeft = mask1.x - mask1.anchorOffsetX;
                }
    
                if(mask1 && scrollLeft < range[1] && scrollLeft + mask1.width >= range[0]){
                   view.changeCity(info.alliId);
                }
                else{
                    view.removeCity(info.alliId);
                }
            }
        }
    }

    private changeCity(alliId : number):void{
        let view = this;
        let info = this.vo.getAllInfoById(alliId);
        let mask1 : any = view._bgGroup.getChildByName(`alliancebuild${info.alliId}`);
        mask1.setRes(`groupwifebattle${info.period}-${view.getUiCode()}`);
        // let smoke = view._bgGroup.getChildByName(`smoke${info.alliId}`);
        // let destroy = view._bgGroup.getChildByName(`destroy${info.alliId}`);
        // if(smoke){
        //     view._bgGroup.removeChild(smoke);
        // }
        // if(destroy){
        //     egret.Tween.removeTweens(destroy);
        //     view._bgGroup.removeChild(destroy);
        // }
        if(info.period > 1){
            // let clip = ComponentManager.getCustomMovieClip(`battlegroundsmoke${info.period}_`,10,70);
            // clip.name = `smoke${info.alliId}`;
            // let tmp = [];
            // switch(info.period){
            //     case 2:
            //         clip.width = 164;
            //         clip.height = 94;
            //         tmp = [-30,-8];
            //         break;
            //     case 3:
            //         clip.width = 190;
            //         clip.height = 168;
            //         tmp = [-2,-66];
            //         break;
            //     case 4:
            //         clip.width = 25;
            //         clip.height = 33;
            //         tmp = [-2,-64];
            //         break;
            // }
            // clip.anchorOffsetX = clip.width / 2;
            // clip.anchorOffsetY = clip.height / 2;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clip, mask1, tmp);
            // view._bgGroup.addChild(clip);
            // clip.playWithTime(0);
        }
        // if(info.period == 4){
        //     let destroy = BaseBitmap.create(`battlegrounddestroy`);
        //     destroy.name = `destroy${info.alliId}`;
        //     destroy.anchorOffsetX = destroy.width / 2;
        //     destroy.anchorOffsetY = destroy.height / 2;
        //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, destroy, mask1, [-15,-13]);
        //     view._bgGroup.addChild(destroy);
        //     destroy.alpha = 0.1;

        //     egret.Tween.get(destroy, {loop : true}).to({alpha : 0.7}, 1000).to({alpha : 0.1}, 1000);
        // }
        view.freshAlliText(info.alliId);
    }

    private removeCity(alliId : number):void{
        let view = this;
        let mask1 : any = view._bgGroup.getChildByName(`alliancebuild${alliId}`);
        if(mask1){
            view._bgGroup.removeChild(mask1);
        }
        // let smoke = view._bgGroup.getChildByName(`smoke${alliId}`);
        // let destroy = view._bgGroup.getChildByName(`destroy${alliId}`);
        // if(smoke){
        //     view._bgGroup.removeChild(smoke);
        // }
        // if(destroy){
        //     egret.Tween.removeTweens(destroy);
        //     view._bgGroup.removeChild(destroy);
        // }
        let infobg = view._bgGroup.getChildByName(`alliancebg${alliId}`);
        let allinameTxt : any = view._bgGroup.getChildByName(`allianceTxt${alliId}`);
        if(infobg){
            view._bgGroup.removeChild(infobg);
        }
        if(allinameTxt){
            view._bgGroup.removeChild(allinameTxt);
        }
        // let cheerbg : any = view._bgGroup.getChildByName(`alliancecheer${alliId}`);
        // let cheertxt : any = view._bgGroup.getChildByName(`alliancecheertxt${alliId}`);
        // if(cheerbg){
        //     view._bgGroup.removeChild(cheerbg);
        // }
        // if(cheertxt){
        //     view._bgGroup.removeChild(cheertxt);
        // }
    }

    private freshAlliText(id:any){
        let view = this;
        let info = this.vo.getAllInfoById(id);
        let mask1 = view._bgGroup.getChildByName(`alliancebuild${info.alliId}`);
        //信息
        if(mask1){
            let infobg = view._bgGroup.getChildByName(`alliancebg${info.alliId}`);
            let allinameTxt : any = view._bgGroup.getChildByName(`allianceTxt${info.alliId}`);
            let str = '';
            if(view.vo.isAlliOut(id)){
                str = `${info.alliName}\n<font color=0xff3c3c>${LanguageManager.getlocal(`acGroupWifeBattleOut-${view.getUiCode()}`)}</font>`
                // allinameTxt.textColor = 0xff3c3c;
            }
            else if(view.vo.isChampWin() && view.vo.getWinnerAlliance().mid == Number(info.mid)){
                str = `${info.alliName}\n<font color=0x21eb39>${LanguageManager.getlocal(`acGroupWifeBattleTip10-${view.getUiCode()}`)}</font>`;
                let winImg = BaseBitmap.create(`battlegroundwin-${view.getUiCode()}`);
                App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, winImg, mask1,[20,60]);
                this._bgGroup.addChild(winImg);
            }
            else{
                str = `${info.alliName}\n<font color=0x21eb39>(${info.num}/${info.total})</font>`;
                if(Number(info.mid) == Number(Api.playerVoApi.getPlayerAllianceId())){
                    allinameTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
                }
            }
           
            allinameTxt.text = str;

            infobg.width = allinameTxt.textWidth + 100;
            infobg.height = allinameTxt.textHeight + 20;
    
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, infobg, mask1, [0,-infobg.height+30]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, allinameTxt, infobg);
        }
    }
    //
    public initView()
    {
        let view = this;
        view._period = view.vo.getCurperiod();
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_BATTLEGROUND_BATTLEEND,view.battleEnd,view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CHALLENGE), this.challengeCallback, this);

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_LIST), view.listCallback, view)
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_SEARCH),view.searchCallback,view);

       App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_FIGHT),view.fightCallback,view);
       App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_FIGHTREVIEW),view.fightReviewCallback,view);

        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        let code = view.getUiCode();

        if(view.vo.isHaveFightInfo())
        {
            ViewController.getInstance().openView(ViewConst.COMMON.ACGROUPWIFEBATTLESEARCHRESULTVIEW,{callback:this.closeSearchCallback,target:this,aid:this.aid,code:this.code});
        }

        NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_LIST,{activeId:view.acTivityId});

        view.initTopTip();

        //带子
        let daizi = BaseBitmap.create(`crossserverintidaizi-7`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, daizi, view,[0,110]);
        view.addChild(daizi);
        this._daizi = daizi;

        //底部
        let bottomBg = BaseBitmap.create(`acgroupwifebattlebottombg-${code}`);
        // bottomBg.height = 86;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view,[0,-45]);
        view.addChild(bottomBg);
        view._bottomBg = bottomBg;
        //聊天
        let chatbg = null;
        if(1){
            //跨服聊天消息
            chatbg = BaseBitmap.create(`acgroupwifebattlebottomchatbg-${view.getUiCode()}`);
            chatbg.width = GameConfig.stageWidth;
            chatbg.x = 0;
            chatbg.y = bottomBg.y - 28;
            this.addChild(chatbg);
            chatbg.touchEnabled = true;
            chatbg.addTouchTap(this.chatBgClickHandler,this);

            let chatIcon = BaseBitmap.create(ResourceManager.getRes("mainui_chatIcon"));
            chatIcon.anchorOffsetX = chatIcon.width/2;
            chatIcon.anchorOffsetY = chatIcon.height/2;
            chatIcon.x =  chatIcon.width/2+10;
            chatIcon.y = chatbg.y + chatbg.height/2;
            this.addChild(chatIcon);
            egret.Tween.get(chatIcon, {
                loop: true,//设置循环播放
            }).to({scaleX:0.8,scaleY:0.8},1000).to({scaleX:1,scaleY:1.0},1000);//设置2000毫秒内 rotation 属性变为360
            
            let showStr:any=Api.chatVoApi.getLastAcCrossMessage();
            if(!showStr)
            {
                showStr="";
            }
            else{
                let zonename = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,showStr.zoneid);
                showStr=LanguageManager.getlocal('acCrossServeDes', [zonename]) + showStr.sendername + ":" + (showStr.content.message.length > 15 ? (showStr.content.message.substring(0,16) + "...") : showStr.content.message);
            }
            let emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr);
			if (emoticonStr){
				showStr = emoticonStr;
			}
            this._chatTxt = ComponentManager.getTextField(showStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
            this._chatTxt.width = 480;
            this._chatTxt.height = 20;
            this.setLayoutPosition(LayoutConst.leftverticalCenter, this._chatTxt, chatbg, [chatIcon.width + 5, 0]);
            this.addChild(this._chatTxt);
        }
        
        let detailbtn = ComponentManager.getButton(`acgroupwifebattle_detail-${view.getUiCode()}`,'', ()=>{
            if(view._stopTouch){
                return;
            }  
           	if(this.vo.isStart==false)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            else
            {     //活动详情界面
                ViewController.getInstance().openView(ViewConst.COMMON.ACGROUPWIFEBATTLEDETAILSVIEW,{
                    aid : view.aid,
                    code : view.code
                 }); 
             }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, detailbtn, chatbg, [0,chatbg.height]);
        view.addChild(detailbtn);

        let protectbtn = ComponentManager.getButton(`acgroupwifebattle_protect-${view.getUiCode()}`,'', ()=>{
            if(view._stopTouch){
                return;
            }  
           	if(this.vo.isStart==false || this.vo.checkIsInEndShowTime())
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            else
            {   
                if(!view.vo.getAttendQuality())
                {
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleNoAttend-${code}`));
                    return;
                }               
                if(view.vo.getCurperiod() > 2)
                {
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleCDTxt14-${code}`));
                    return;
                }
                if(view.vo.isWaiting()){
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleTip17-${code}`));
                    return;
                }
                if(view.vo.isOut())
                {        
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleTip16-${code}`));
                    return;                                    
                }
                if(!view.vo.getJoinIn())
                {
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleTip4-${code}`));
                    return;
                }
                if(view.vo.getCurperiod() == 1)
                {
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleNotStart-${code}`));
                    return;              
                }
                //金兰之令界面
                ViewController.getInstance().openView(ViewConst.POPUP.ACGROUPWIFEBATTLEPROTECTVIEW,
                {
                    aid : view.aid,
                    code : view.code
                }); 
             }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, protectbtn, detailbtn, [0,detailbtn.height + 10]);
        view.addChild(protectbtn);

        let cheerbtn = ComponentManager.getButton(`acgroupwifebattle_guess-${view.getUiCode()}`,'', ()=>{
            if(view._stopTouch){
                return;
            }  
           	if(this.vo.isStart==false)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            else
            {     //竞猜界面
                ViewController.getInstance().openView(ViewConst.COMMON.ACGROUPWIFEBATTLEGUESSVIEW,{
                    aid : view.aid,
                    code : view.code
                 }); 
             }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, cheerbtn, protectbtn, [0,protectbtn.height + 10]);
        view.addChild(cheerbtn);
        view._cheerBtn = cheerbtn;
        // cheerbtn.visible = !view.vo.getAttendQuality();
        if(view.vo.getRedPot2()){
            App.CommonUtil.addIconToBDOC(cheerbtn);
            let red = <BaseBitmap>cheerbtn.getChildByName("reddot");
            if(red)
            {
                red.setPosition(55,0);
            }
        }
        else{
            App.CommonUtil.removeIconFromBDOC(cheerbtn);
        }

        let logbtn = ComponentManager.getButton(`battlegroundlog-${view.getUiCode()}`,'', ()=>{
            if(view._stopTouch){
                return;
            }
			let curPeriod = this.vo.getCurperiod();
			if(curPeriod==1)
			{	
				let str = LanguageManager.getlocal(`acNewYearisOpen`);
				App.CommonUtil.showTip(str);
				return;
			}       
            if(!view.vo.getAttendQuality()){
                App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleNoAttend-${code}`));
                return;
            }           
            if(view.vo.isWaiting()){
                App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleTip17-${code}`));
                return;
            }                  
            //来访消息界面
            ViewController.getInstance().openView(ViewConst.POPUP.ACGROUPWIFEBATTLEVISITVIEW, {
                aid : view.aid,
                code : view.code
            })
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, logbtn, chatbg, [0,chatbg.height]);
        view.addChild(logbtn);
        view._logBtn = logbtn;

        let caiqingbtn = ComponentManager.getButton(`acgroupwifebattle_caiqing-${view.getUiCode()}`,'', ()=>{
            if(view._stopTouch){
                return;
            } 
            //提升才情界面
            ViewController.getInstance().openView(ViewConst.POPUP.ACGROUPWIFEBATTLETALENTVIEW, {
                aid : view.aid,
                code : view.code
            })
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, caiqingbtn, logbtn, [0,logbtn.height+10]);
        view.addChild(caiqingbtn);     
        caiqingbtn.visible = view.vo.getAttendQuality();

        let randBtn = ComponentManager.getButton("acgroupwifebattle_searchbtn",null, ()=>
        {
            if(view._stopTouch){
                return;
            } 
            if(!view.vo.getAttendQuality()){
                App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleNoAttend-${code}`));
                return;
            }
            if(view.vo.isActyEnd()){
                App.CommonUtil.showTip(LanguageManager.getlocal(`date_error`));
                return;
            }
            if(view.vo.getCurperiod() == 3){
                App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime4`));
                return;
            }            
            if(view.vo.isWaiting()){
                App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleTip17-${code}`));
                return;
            }
            if(!view.vo.getJoinIn()){
                App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleTip4-${code}`));
                return;
            }          
            if(this.vo.getStatusWifeNum() < this.cfg.unlock_wifeStar){
                App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleTip24-${code}`,[this.cfg.unlock_wifeStar+""]));
                return;
            }
            if(view._randClick){
                return;
            }
            view._randClick = true;
            //随机挑战
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_SEARCH,{activeId:view.acTivityId,thetype:1});
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, randBtn, chatbg, [0,chatbg.height]);
        view.addChild(randBtn);
        view._randBtn = randBtn;
        randBtn.visible = view.vo.getJoinIn();
        this._daizi.visible = randBtn.visible;

        view.initBottom();
        view.resetInfo();
        //左右翻页
        let leftArrow = ComponentManager.getButton(`battlegroundmaparrow-${view.getUiCode()}`, '', ()=>{
            if(view._stopTouch){
                return;
            } 
            let startX = Math.max(view._bgScrollView.scrollLeft - GameConfig.stageWidth/2, 0);
            egret.Tween.get(view._bgScrollView).to({scrollLeft : startX},1000).call(()=>{
                view._stopTouch = false;
                view._leftArrow.visible = view._bgScrollView.scrollLeft > 0;
                if(view.mapNum == 0)
                {
                    view._leftArrow.visible = false;
                }
                egret.Tween.removeTweens(view._bgScrollView);
            },view);
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, leftArrow, view);
        view._leftArrow = leftArrow;
        leftArrow.visible = false;
        view.addChild(leftArrow);

        let rightArrow = ComponentManager.getButton(`battlegroundmaparrow-${view.getUiCode()}`, '', ()=>{
            if(view._stopTouch){
                return;
            } 
            let startX = Math.min(view._bgScrollView.scrollLeft + GameConfig.stageWidth/2, (view.mapNum - 1) * this.mapWidth + (this.mapWidth / 2));
            egret.Tween.get(view._bgScrollView).to({scrollLeft : startX},1000).call(()=>{
                egret.Tween.removeTweens(view._bgScrollView);
                view._stopTouch = false;
                view._rightArrow.visible = view._bgScrollView.scrollLeft < ((view.mapNum - 1) * this.mapWidth + (this.mapWidth / 2));
                if(view.mapNum == 0)
                {
                    view._rightArrow.visible = false;
                }
            },view);
        }, view);
        rightArrow.anchorOffsetX = rightArrow.width / 2;
        rightArrow.scaleX = -1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rightArrow, view);
        view._rightArrow = rightArrow;
        view.addChild(rightArrow);

        if(view.mapNum == 0)
        {
            view._leftArrow.visible = false;
            view._rightArrow.visible = false;
        }        

        //定位
        for(let i = 0; i < this.mapNum; ++ i){
            for(let j in this.mapPos){
                let unit = this.mapPos[j];
                let idx = i * this._buildingNum + Number(j);
                let info = this.vo.getAllInfoById(idx);
                if(info){
                    if(Number(info.mid) == Number(Api.playerVoApi.getPlayerAllianceId())){
                        this._curAllianceMap = i;
                        this._curAllianceIdx = Number(j);
                        break;
                    }
                }
            }
        }
        if(this._curAllianceMap > -1){
            let tmp = 0;
            if((this._curAllianceMap == 0 && this._curAllianceIdx < 9) || (this._curAllianceMap == this.mapNum - 1 &&  this._curAllianceIdx > 8)){
                tmp = this._curAllianceMap * this.mapWidth + (this._curAllianceMap == 0 ? 0 : (this.mapWidth / 2));
            }
            else{
                tmp = this._curAllianceMap * this.mapWidth + this.mapPos[this._curAllianceIdx].x - (320 - 100);
            }
            // view._stopTouch = true;
            view._bgScrollView.scrollLeft = tmp;
            // egret.Tween.get(view._bgScrollView).to({scrollLeft : tmp},1000).call(()=>{
            //     view._stopTouch = false;
            //     egret.Tween.removeTweens(view._bgScrollView);
            // },view);
        }
    }

    private closeSearchCallback():void
    {
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_FIGHT,{activeId:this.acTivityId});
    }

    public listCallback(event : any): void 
	{
		if(event.data.ret)
		{
			if(event.data.data.data.groupwifebattle){
				this.vo.setWifebattleInfo(event.data.data.data.groupwifebattle);
			}
			this._battleDataList =event.data.data.data.fightlist;	
			this.showText();	
			if(this._battleDataList.length>0)
			{
				this.isData =true;
			}
			else
			{
				this.isData =false;
			}
		}
		else
		{
			this.isData =false;
		}
    }

	private showText():void
	{	 
		if(this._battleDataList.length>0&&this._battleDataList[0].auid)
		{
			var  data:any =this._battleDataList[0];
			let namestr = `${data.aname}${LanguageManager.getlocal(`atkraceyamenid`, [this._battleDataList[0].auid])}(${Api.mergeServerVoApi.getRankServerName(this._battleDataList[0].auid)})`;
			let ennamestr = `${data.dname}(${Api.mergeServerVoApi.getRankServerName(this._battleDataList[0].duid)})`;

			let str = LanguageManager.getlocal("wifeBattleMoreDetail",[namestr,ennamestr,data.atotalwinnum,data.agetpoint]);			
			if(!this.describeTxt){
				let describeTxt:BaseTextField = null ;
				describeTxt  =ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
				describeTxt.width = 435;
				describeTxt.x = 20;
				describeTxt.y = GameConfig.stageHeigth - 47 - describeTxt.height/2;
				describeTxt.lineSpacing = 7;
				this.describeTxt = describeTxt;
				this.addChild(describeTxt);
			} else {
				this.describeTxt.text = str;
			}
		}
	}

    //底部
	private initBottom():void
	{	
        let view = this;
        let bottom = view._bottomBg;
		let maskDown:BaseBitmap = BaseBitmap.create("servant_mask");
        maskDown.width = GameConfig.stageWidth;
		 
        maskDown.y = GameConfig.stageHeigth - bottom.height - maskDown.height+55;
        this.addChild(maskDown);
		this.swapChildren(maskDown,this.container);
	
		let showMore:BaseButton = ComponentManager.getButton(`atkracecross_moretxt`,"",this.showMoreHandle,this);
		showMore.setPosition(GameConfig.stageWidth-showMore.width-18,bottom.y+23);
        this.addChild(showMore);

		this._moreArrow = BaseBitmap.create(`atkracecross_upflag`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, this._moreArrow, showMore, [-this._moreArrow.width-5,0]);
        this.addChild(this._moreArrow);
        //文本
        let tipTxt = ComponentManager.getTextField(``, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.lineSpacing = 3;
        tipTxt.width = 480;
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tipTxt, bottom);
        view._bottomLogTxt = tipTxt;
    }

    private showMoreHandle():void
	{
        if(this._stopTouch){
            return;
        } 
        if(this.touchBoo)
		{
            if(this.vo.isActyEnd()){
                App.CommonUtil.showTip(LanguageManager.getlocal(`date_error`));
                return;
            }
            this._isShowMore = !this._isShowMore;
            this._bottomLogTxt.visible = !this._isShowMore;
			if (this._isShowMore == true) {
				this._moreArrow.scaleY = -1;
                this._moreArrow.y += this._moreArrow.height;

                this.showList();
                // NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_LIST,{activeId:this.acTivityId});
			}
			else {
				this._moreArrow.scaleY = 1;
				this._moreArrow.y -= this._moreArrow.height;
				this.closeList();
			}
		}
		
    }
    
    private showList():void
	{
        this.moveContainer= new BaseDisplayObjectContainer();
        this.addChild(this.moveContainer);

        this.moreBg = BaseBitmap.create("arena_bottom_bg");//public_9_bg14
        this.moreBg.width = 640;
        this.moreBg.height =GameConfig.stageHeigth - 330;
        this.moveContainer.addChild(this.moreBg);
        // let topbg = BaseBitmap.create("public_9_bg71");//"public_9_bg21");//arena_bottom_bg
        // topbg.width = 620;
        // topbg.height = 80;
        // topbg.x = 10;
        // topbg.y = 10;
        // this.moveContainer.addChild(topbg);

        // //上次挑战信息
        // let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(``), 20);
        // let lastchargelog = this.vo.getLastChargeLog();
        // tipTxt.text = LanguageManager.getlocal(`acBattileGroundLastLog-1`, [lastchargelog ? lastchargelog.playerName : LanguageManager.getlocal(`nothing`)]);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tipTxt, topbg, [27,0]);
        // this.moveContainer.addChild(tipTxt);


        this._currMaskBmp = BaseBitmap.create("public_9_viewmask");
        this._currMaskBmp.width=GameConfig.stageWidth;
        this._currMaskBmp.height=GameConfig.stageHeigth;
        this._currMaskBmp.touchEnabled = true;
        this.addChild(this._currMaskBmp);
        this.setChildIndex(this._currMaskBmp,this.getChildIndex(this._bottomBg));


        // 增加 点击区域
        this._touchBg = BaseBitmap.create("public_9_bg25");  
        this._touchBg.width = 640;
        this._touchBg.height =260;
        this._touchBg.x=0;
        this._touchBg.y=-240;
        this._touchBg.alpha =0;
        this._touchBg.addTouchTap(this.showMoreHandle,this);
        this.moveContainer.addChild(this._touchBg);

        if(this.isData)
        {
            let rect = egret.Rectangle.create();
            rect.setTo(0,5,GameConfig.stageWidth,this.moreBg.height - 15);
            let maxNum = this._battleDataList.length > this.cfg.dataParameter ? this.cfg.dataParameter : this._battleDataList.length;
            this._scrollList = ComponentManager.getScrollList(AcGroupWifeBattleMoreItem, this._battleDataList, rect, this.vo.aidAndCode,maxNum);
            this.moveContainer.addChild(this._scrollList);
            this._scrollList.bounces = false;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._scrollList, this.moreBg, [0,10]);
        }
        else
        {
            let atkracedes3 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes3"), 20);
            atkracedes3.x =250;
            atkracedes3.y =300;
            this.moveContainer.addChild(atkracedes3);
        }	

        this.moveContainer.y =1150;
        this.touchBoo=false;    

        //描述文字：击败门客20
        var num = this.cfg.dataParameter2;
        let listconditions = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleListConditions",[num+""]), 20);
        listconditions.x = 100
        listconditions.y = GameConfig.stageHeigth - 47;
        this.addChild(listconditions);
        this.listconditions = listconditions;

        if(this.listconditions)
        {
            this.listconditions.visible =false;
        }
        if(this.describeTxt)
        {
            this.describeTxt.visible =false;
        }

        this.runText();
        
        egret.Tween.get(this.moveContainer).to({y:250},500).call(function()
        {
            egret.Tween.removeTweens(this.moveContainer);
            this.touchBoo =true;
            if(this.listconditions)
            {
                this.listconditions.visible =true;
            }
        },this);

    }

    /**跑马灯 */
	private runText() {
        let view = this;
        let strList = view.vo.getKillNoticeInfo(this.getUiCode());
        if(strList.length && view.vo.getCurperiod() == 2){
            let laba = BaseBitmap.create('chatlaba');
            laba.x = 10;
            laba.y = -laba.height;
            this.moveContainer.addChild(laba);

            let lampContainer = new LoopLamp(strList, LayoutConst.verticalCenter);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, lampContainer, laba, [laba.width,0]);
            lampContainer.mask = new egret.Rectangle(0,-4,GameConfig.stageWidth,26);
		    this.moveContainer.addChild(lampContainer);
        }
		// for (var i = 0; i < this._log.length; i++) {
		// 	let logItem = this._log[i];
		// 	let rewardVo = GameData.formatRewardItem(logItem[2])[0];
		// 	let str = LanguageManager.getlocal("acWealthComingViewRunTxt", [logItem[0], rewardVo.name, rewardVo.num]);
		// 	strList.push(str);
	}

	private closeList():void
	{
		this.touchBoo=false;
		if(this.listconditions)
		{
			this.listconditions.visible =false;
		}
	
		if(this.describeTxt)
		{
			this.describeTxt.visible =true;
		}
		
		if(this.moveContainer)
		{	
			egret.Tween.get(this.moveContainer).to({y:1150},500).call(function(){
			this.touchBoo=true;
            egret.Tween.removeTweens(this.moveContainer);
            this.moveContainer.dispose();
            this.moveContainer = null;
            if(this._scrollList){
                this._scrollList = null;
            }
		},this);
		}

		if(this._currMaskBmp&&this._currMaskBmp.parent)
		{
			this._currMaskBmp.parent.removeChild(this._currMaskBmp);
			this._currMaskBmp.dispose();
			this._currMaskBmp =null;
		}
		if(this._touchBg&&this._touchBg.parent)
		{
			this._touchBg.parent.removeChild(this._touchBg);
			this._touchBg.dispose();
			this._touchBg =null;
        }
        if(this._bottomLogTxt){
            this._bottomLogTxt.visible = true;
        }
	}

    
    private visitHandle():void
	{
		ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEVISITVIEW);
	}


    private chatBgClickHandler():void{
        let view = this;
        if(view._stopTouch){
            return;
        } 
        let code = view.getUiCode();
        if(!view.vo.getAttendQuality()){
            App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleNoAttend-${code}`));
            return;
        }        
		ViewController.getInstance().openView(ViewConst.COMMON.CHATACTIVITYCROSSVIEW, {activeID : view.vo.aidAndCode});
	}

    public tick():void{
        let view = this;
        view._randBtn.visible = view.vo.getJoinIn();
        this._daizi.visible = view._randBtn.visible;
        if(this._chatTxt){
			let showStr:any=Api.chatVoApi.getLastAcCrossMessage();
			if(!showStr)
			{
				showStr="";
			}
			else{
				let zonename = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,showStr.zoneid);
				showStr=LanguageManager.getlocal('acCrossServeDes', [zonename]) + showStr.sendername + ":" + (showStr.content.message.length > 15 ? (showStr.content.message.substring(0,16) + "...") : showStr.content.message);
            }
            let emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr);
			if (emoticonStr){
				showStr = emoticonStr;
			}
			this._chatTxt.text = showStr;
        }
        let curPeriod = view.vo.getCurperiod();
        if(curPeriod !== view._period){
            this._needFresh = true;
            this.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE,{activeId:view.acTivityId});
        }
        view.freshText();
        view._period = curPeriod;

        this.showCoolDown();

        if(view.vo.getRedPot2()){
            App.CommonUtil.addIconToBDOC(view._cheerBtn);
            let red = <BaseBitmap>view._cheerBtn.getChildByName("reddot");
            if(red)
            {
                red.setPosition(55,0);
            }            
        }
        else{
            App.CommonUtil.removeIconFromBDOC(view._cheerBtn);
        }
    }

    private _timebg:BaseBitmap = null;
    private _timeTxt:BaseTextField = null;

    private showCoolDown():void
    {
        if (this._countDownTime > 0) 
        {
			this._countDownTime--;
			if(this._countDownTime <= 0) 
            {
                this._curFightType = 1;
                if(this._timebg)
                {
                    this._timebg.visible = false;
                }
                if(this._timeTxt)
                {
                    this._timeTxt.visible = false;
                }                
            }
            else
            {
                if(!this._timebg)
                {
                    this._timebg = BaseBitmap.create(`public_9_bg91`);
                    this._timebg.width = 300;
                    this._timebg.x = GameConfig.stageWidth/2 - this._timebg.width/2;
                    this._timebg.y = GameConfig.stageHeigth - 250;
                    this.addChild(this._timebg);
                }
                if(!this._timeTxt)
                {
                    this._timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleMapTime",["0"]), 20,TextFieldConst.COLOR_LIGHT_YELLOW);
                    this._timeTxt.y = this._timebg.y + this._timebg.height/2 - this._timeTxt.height/2;
                    this.addChild(this._timeTxt);
                }
                this._timebg.visible = true;
                this._timeTxt.visible = true;
                this._timeTxt.text = LanguageManager.getlocal("acGroupWifeBattleMapTime",[this.getCountTimeStr()]);
                this._timeTxt.x = this._timebg.x + this._timebg.width/2 - this._timeTxt.width/2;
            }
        }else
        {
            if(this._timebg)
            {
                this._timebg.visible = false;
            }
            if(this._timeTxt)
            {
                this._timeTxt.visible = false;
            }             
        }

        if(!this._randBtn.visible)
        {
            if(this._timebg)
            {
                this._timebg.visible = false;
            }
            if(this._timeTxt)
            {
                this._timeTxt.visible = false;
            }
        }
    }
    
    private initTopTip():void{ 
        let view = this;

        let tipTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.lineSpacing = 5;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        view.addChild(tipTxt);
        view._cdText = tipTxt;

        view._protectTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WHITE);
        view._protectTxt.textFlow = [
            { text:LanguageManager.getlocal(`acGroupWifeBattleMapProtectTxt`, [""]), style: {underline: true } }
        ];
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._protectTxt, view._cdBg, [0,view._cdBg.height+5]);
        view.addChild(view._protectTxt);        

        view.freshText();
    }

    private freshText():void{
        let view = this;
        let code = view.getUiCode();
        let period = view.vo.getCurperiod();
        //提示板信息
        //提示板信息
        let cd = App.DateUtil.getFormatBySecond(view.vo.getCountCD());
        let str = `acGroupWifeBattleCDTxt${view._period}-${code}`;
        let param = [];
        let myRank = view.vo.getMyRank();
        if(view.vo.isWaiting()){
            view._cdText.text = LanguageManager.getlocal(`acGroupWifeBattleTip8-${view.getUiCode()}`);
        }
        else{
            switch(period){
                case 1:
                    param.push(cd);
                    break;
                case 2:
                    param.push(cd);
                    let need = view.cfg.weedOut[view.vo.getCurRound() - 1].btmLine;
                    if(period == 2 && view.cfg.weedOut.length == view.vo.getCurRound()){
                        //最后一轮
                        str = `acGroupWifeBattleCDTxt4-${code}`;
                    }
                    else{
                        param.push(need);
                    }
                    if(view.vo.getAttendQuality()){
                        //没被淘汰
                        if(view.vo.getJoinIn()){
                            param.push(LanguageManager.getlocal(`acGroupWifeBattleMapRank-${code}`, [String(myRank <= need ? 0x21eb39 : 0xff3c3c),myRank.toString()]));
                        }
                        else{
                            param.push(LanguageManager.getlocal(`acGroupWifeBattleCDTxt5-${code}`));
                        }
                    }
                    else{
                        if(view.vo.getCurRound() == 1){
                            param.push(LanguageManager.getlocal(`acGroupWifeBattleCDTxt11-${code}`));
                        }
                        else{
                            if(view.vo.getCheerALlianceOut()){
                                param.push(LanguageManager.getlocal(`acGroupWifeBattleCDTxt13-${code}`));
                            }
                            else{
                                param.push(LanguageManager.getlocal(`acGroupWifeBattleCDTxt12-${code}`));
                            }
                        }
                    }
                    break;
                case 3:
                case 4:
                    str = `acGroupWifeBattleCDTxt3-${code}`;
                    param.push(view.vo.getWinnerAlliance().name);
                    let tyle = 1;
                    if(view.vo.getWinnerAlliance().mid == Number(Api.playerVoApi.getPlayerAllianceId())){
                        tyle = 9;
                    }
                    else if(view.vo.getAttendQuality()){
                        tyle = 7;
                    }
                    else{
                        tyle = 8;
                    }
                    param.push(LanguageManager.getlocal(`acGroupWifeBattleCDTxt${tyle}-${view.getUiCode()}`));
                    break;
            }
            if(this._needFresh){
                view._cdText.text = LanguageManager.getlocal(`acGroupWifeBattleTip8-${view.getUiCode()}`);
            }
            else{
                view._cdText.text = LanguageManager.getlocal(str,param);
            }
        }
        view._cdBg.width = view._cdText.textWidth + 60;
        view._cdBg.height = view._cdText.textHeight + 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._cdBg, view.titleBg, [0,view.titleBg.height-10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._cdText, view._cdBg, [0,-5]);
    
        view.freshProtectTxt();
    }

    private freshProtectTxt():void
    {
        let view = this;
        if(this._protectInfo && this._protectInfo.pUid)
        {
            view._protectTxt.textFlow = [
                { text:LanguageManager.getlocal(`acGroupWifeBattleMapProtectTxt`, [""+this._protectInfo.pUid]), style: {underline: true } }
            ];
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._protectTxt, view._cdBg, [0,view._cdBg.height+5]);
        }else
        {
            view._protectTxt.visible = false;
        }
    }

    private searchCallback(evt : egret.Event):void{

        if (evt.data.ret == false)
        {
            return;
        }
        if(evt.data.data.data)
        {
            this.handleSearch(evt.data.data.data);
        }
    }

    private handleSearch(data:any):void
    {
        let view = this;
        view._randClick = false;
        if(data){
            if(data.bgstats)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleBgStasTip${data.bgstats}-${view.getUiCode()}`));
            }
            else{
                if(data.waiting){
                    view.vo.setWaiting(data.waiting);
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleTip17-${view.getUiCode()}`));
                }
                else{
                    view.vo.setWaiting(0);
                    this._fightflag= true;
                    if(data.groupwifebattle){
                        view.vo.setRaceInfo(data.groupwifebattle);
                        view.vo.setWifebattleInfo(data.groupwifebattle);
                    }                    
                    view.resetInfo();
                    //1可以随机挑战 2已经发生战斗没结束 继续战斗 3cd中 4次数耗尽可恢复 5次数耗尽不可恢复
                    switch(this._curFightType){
                        case 1:
                        case 2:
                            if(data.newRound && data.newRound == 1){
                                App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleTip1-${this.getUiCode()}`));
                                view.resetInfo();
                                return;
                            }
                            ViewController.getInstance().openView(ViewConst.COMMON.ACGROUPWIFEBATTLESEARCHRESULTVIEW,{callback:this.closeSearchCallback,target:this,aid:this.aid,code:this.code});
                            break;
                        case 3:
                            this.clickDialog(true);
                            break;
                        case 4:
                            this.clickDialog();
                            break;
                        case 5:
                            App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleContinueFightTip2-${view.getUiCode()}`));
                            break;
                        case 6:
                            App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleContinueFightTip1-${view.getUiCode()}`));
                            break;                            
                    }
                    
                }   
            }
        }
    }
    
    //重置信息
	private resetInfo():void
	{		
        // this.closeList();
        let view = this;
        if(!view._randBtn){
            return;
        }
		this._countDownTime = 0;
        //是否无法出战
        let textStr : string = '';

        //检查是否已有门客
        if (this.vo.isHaveFightInfo()) 
        {
            this._curFightType = 2;
            //1可以随机挑战 2已经发生战斗没结束 继续战斗 3cd中 4次数耗尽
        }
        else {
            //出战次数
            let maxCount:number = view.cfg.freeTime;
            let myInfo:any =this.vo.getMyInfo();

            let myNum:number = myInfo.num;
            if (myNum >= maxCount) {
                //次数已满
                let lv60plus:number = this.vo.getStatusWifeNum();
                let extraMax:number = Math.floor(lv60plus/view.cfg.refreshLimit2) + view.cfg.refreshLimit1;
                if (myInfo.extranum >= extraMax) {
                    //没次数了
                    //1可以随机挑战 2已经发生战斗没结束 继续战斗 3cd中 4次数耗尽 5次数耗尽不可恢复
                    this._curFightType = 5;
                }
                else {
                    //1可以随机挑战 2已经发生战斗没结束 继续战斗 3cd中 4次数耗尽 5次数耗尽不可恢复
                    this._curFightType = 4;
                }
            }
            else {
                //倒计时
                this._countDownTime = myInfo.lasttime + this.cfg.coolDownTime -  GameData.serverTime;
                if(this._countDownTime <= 0){
                    this._curFightType = 1;
                }
                else
                {
                    this._curFightType = 3;
                    let lv60plus:number = this.vo.getStatusWifeNum();
                    let extraMax:number = Math.floor(lv60plus/view.cfg.refreshLimit2) + view.cfg.refreshLimit1;  
                    if (myInfo.extranum >= extraMax)
                    {
                        this._curFightType = 6;
                    }                  
                }
            }
        }
        
        if(this._randBtn){
            this._randBtn.setGray(this._curFightType >= 5);
        }

        this.showCoolDown();
    }

    private getCountTimeStr():string
	{	
		let time:number = this._countDownTime;
		if (time < 0) {
			time = 0;
		}
		return App.DateUtil.getFormatBySecond(time);
	}

	private clickDialog(isCD:boolean=false):void
	{
		let itemId:string = this.cfg.needItem.refresh;
        let needNum:number = 1;
		let itemVo:ItemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(itemId));
		let numItem:number = 0;
		if (itemVo) {
			numItem = itemVo.num;
		}
		
        let str = isCD ? "acGroupWifeBattle_buyChallenge_CD" : "acGroupWifeBattle_buyChallenge";
		let message = LanguageManager.getlocal(str,[LanguageManager.getlocal("itemName_"+itemId)]);
		let mesObj = {
			 confirmCallback: this.buyChallenge, 
			 handler: this, 
			 icon:  "itemicon"+itemId,
			 iconBg: Config.ItemCfg.getItemCfgById(itemId).iconBg, 
			 num: numItem, 
             useNum:needNum,
			 msg: message ,
			 id: itemId
		};
		ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,mesObj );
    }
    
    private buyChallenge():void
	{
        let view = this;
        let code = view.getUiCode();
        if(view.vo.isActyEnd()){
            App.CommonUtil.showTip(LanguageManager.getlocal(`date_error`));
            return;
        }
        if(view.vo.getCurperiod() == 3){
            App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime4`));
            return;
        }            
        if(view.vo.isWaiting()){
            App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleTip17-${code}`));
            return;
        }
        if(!view.vo.getJoinIn()){
            App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleTip4-${code}`));
            return;
        }          
		NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_SEARCH,{activeId:this.acTivityId,thetype:2});
    }
    
    private challengeCallback(evt : egret.Event):void{

        if (evt.data.ret == false)
        {
            return;
        }
        if(evt.data.data.data)
        {
            if(evt.data.data.data.bgstats == 11)
            {
                let message: string = LanguageManager.getlocal(`acGroupWifeBattleFightSure-${this.getUiCode()}`);
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                    msg : message,
                    title : "itemUseConstPopupViewTitle",
                    touchMaskClose : true,
                    callback : ()=>
                    {
                        ViewController.getInstance().hideView(ViewConst.POPUP.ACGROUPWIFEBATTLEVISITVIEW);
                        this.handleSearch(evt.data.data.data); 
                    },
                    handler : this,
                    needClose : 1,
                    needCancel : true
                });	                
            }else
            {
                ViewController.getInstance().hideView(ViewConst.POPUP.ACGROUPWIFEBATTLEVISITVIEW);
                this.handleSearch(evt.data.data.data);
            }
        }
    }

    private battleEnd():void
    {
        let view = this;
        view.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE,{activeId:view.acTivityId});
        view.resetInfo();
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_LIST,{activeId:view.acTivityId});
    }

    private moveToMyAlliance()
    {
        ViewController.getInstance().openView(ViewConst.COMMON.ACGROUPWIFEBATTLEDETAILSVIEW,{
                aid : this.aid,
                code : this.code,
                type: "alliance"
            });
        //跳转至详情-我的帮会
    }

	private fightCallback(event: egret.Event)
    {
		if(event.data.ret && event.data.data.ret == 0){
			let data = event.data.data.data;
			let fightarr = data.fightarr;
			let point = data.point;
			let rewardnum = data.rewardnum;
			let winflag = data.winflag;

			if(event && event.data.data.data.groupwifebattle){
				this.vo.setWifebattleInfo(event.data.data.data.groupwifebattle);
			}
			ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERWIFEBATTLEBATTLEVIEW,{
				fightarr:fightarr, 
				point:point,
				rewardnum:rewardnum,
				winflag:winflag,
				callback:this.fightEnd,
				isReview:false,
				target:this});
		}
	}
    private fightReviewCallback(event: egret.Event)
    {
		let data = event.data.data.data;
		if(data.cantfindid == 1){

			App.CommonUtil.showTip(LanguageManager.getlocal("wifeBattleMoreOutTime"));
			return;
		}        
		if(event.data.ret && event.data.data.ret == 0){
			let fightarr = data.fightarr;
			let point = fightarr.auserinfo.point;
			let rewardnum = fightarr.auserinfo.rewardnum;
			let winflag = fightarr.winflag;

			if(event && event.data.data.data.groupwifebattle){
				this.vo.setWifebattleInfo(event.data.data.data.groupwifebattle);
			}
			ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERWIFEBATTLEBATTLEVIEW,{
				fightarr:fightarr, 
				point:point,
				rewardnum:rewardnum,
				winflag:winflag,
				callback:this.checkShowSearch,
				isReview:true,
				target:this});
		}
	}
	private checkShowSearch(event?:egret.Event)
    {
		// console.log("checkShowSearch",data);
		if(!this.vo)
        {
			return;
		}
		// this.battleEnd();
	}
    private fightEnd():void
    {
		if(!this.vo)
        {
			return;
		}
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_GROUPWIFEBATTLE_BATTLEEND);
		this.battleEnd();        
    }
    private get cfg() : Config.AcCfg.GroupWifeBattleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }
    private get vo() : AcGroupWifeBattleVo{
        return <AcGroupWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }
    private get code() : string{
        return String(this.param.data.code);
    }

    protected getUiCode() : string{
        let code = ``;
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }

    private get aid() : string{
        return String(this.param.data.aid);
    }

    private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
    }
    
    protected getTitleStr():string{
        return null;
    }
	protected getRuleBtnName():string
	{	
		return ButtonConst.BTN2_RULE;
	}
	protected getTitleBgName():string
	{
        return "acgroupwifebattle_title1-" + this.getUiCode();
	}    
	protected getCloseBtnName():string
	{
		return "acchaoting_closebtn";
	}
    protected initTitle():void
    {
        let view = this;
        let code = this.getUiCode();
        let tipBg = BaseBitmap.create(`acgroupwifebattledescbg-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipBg, view, [0,140]);
        view.addChild(tipBg);
        view._cdBg = tipBg;
        tipBg.addTouchTap(()=>{
            ViewController.getInstance().openView(ViewConst.COMMON.ACGROUPWIFEBATTLEDETAILSVIEW,{
                aid : view.aid,
                code : view.code,
                type: "rank"
            });
        },view);

        super.initTitle();      

        if(this.titleBgShadow)
        {
            this.titleBgShadow.visible = false;
        }  
    }    

    private get mapPos():any
    {
        let obj = {};
        for(let j in this._mapPos)
        {
            obj[j] = this._mapPos[j];
            // obj[j]["y"] = this._mapPos[j]["y"] - (1136-GameConfig.stageHeigth);
        }
        return obj;
    }

    private _mapPos = {
        1 : { x : 11, y : 381, width : 180, height : 116}, 
        2 : { x : 69, y : 680, width : 54, height : 54},
        3 : { x : 109, y : 531, width : 54, height : 54},
        4 : { x : 209, y : 283, width : 54, height : 54},
        5 : { x : 358, y : 528, width : 54, height : 54},
        6 : { x : 416, y : 374, width : 54, height : 54},
        7 : { x : 574, y : 111, width : 54, height : 54},
        8 : { x : 641, y : 690, width : 54, height : 54},
        9 : { x : 698, y : 237, width : 184, height : 124},
        10 : { x : 874, y : 571, width : 54, height : 54},
        11 : { x : 993, y : 212, width : 54, height : 54},
        12 : { x : 1053, y : 479, width : 54, height : 54},
    }

    public dispose():void{   
        let view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_BATTLEGROUND_BATTLEEND,this.battleEnd,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_SEARCH),view.searchCallback,view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_LIST), view.listCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CHALLENGE), view.challengeCallback, view);
       
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_FIGHT),view.fightCallback,view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_FIGHTREVIEW),view.fightReviewCallback,view);
        view._bgGroup = null;
        view._period = 1;
        if(view._cdBg)
        {
            view._cdBg.removeTouchTap();
            view._cdBg = null;
        }
        if(view._protectTxt)
        {
            view._protectTxt.dispose();
            view._protectTxt = null;
        }        
        view._cdText = null;
        view._chatTxt = null;
        view._bottomBg = null;
        view.touchBoo =true;
        view.moreBg =null;
        view.describeTxt =null;
        view.moveContainer =null;
        view._moreArrow= null;
        view._isShowMore = false;
        view._touchBg =null;
        view._currMaskBmp=null;
        view.isData=false;
        view.listconditions = null;
        view._scrollList = null;
        view._battleDataList=[];
        view._bottomLogTxt = null;
        view._bgScrollView = null;
        view._stopTouch = false;
        view._leftArrow = null;
        view._rightArrow = null;
        view._needFresh = false;
        view._randClick = false;
        view._randBtn = null;
        view._cheerBtn = null;
        view._timebg = null;
        view._timeTxt = null;
        view._logBtn = null;
        super.dispose();
    }
}