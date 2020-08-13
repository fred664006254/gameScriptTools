/**
 * 内阁/议事院具体事件view
 * author qianjun
 */
class CouncilEventView extends CommonView {
    public constructor() {
		super();
    }

    private _data : any = null;
    private _type : number = 1;//1参加时间 2结算间隔 3领赏时间
    private _timeDesc : BaseTextField = null;
    private _topbg : BaseBitmap = null;
    private _listview : ScrollView = null;
    private _dbNode1:BaseDisplayObjectContainer;
	private _dbNode2:BaseDisplayObjectContainer;
	private _dbNode3:BaseDisplayObjectContainer;
    // private _saveBtn : BaseButton = null;
    private _nodeContainer:BaseDisplayObjectContainer;

    protected getResourceList(): string[] {
		return super.getResourceList().concat([
            "acsevenckjl","acsevenckjl_down","discussplayerrole","discussviewbg","discussviewbg2",
            "palace_role_empty","palace_role_shadow","palace_king_empty","emparena_bottom","studyatk_frame_light","studyatk_frame",
            "discussseat"
        ]);
    }

    protected getTitleStr():string{
        return 'councilViewTitle';
    }

    private get api(){
        return Api.councilVoApi;
    }

    protected getRuleInfo() : string{
        return `councilRuleInfo`;
    }

    protected getBgName() : string{
        return null;
    }
    protected getRuleInfoParam():string[]
	{ 
        var zoneStr:number = 0; 
        var zoneStr2:number = 0; 
        var zoneStr3:number = 0;
        zoneStr =  App.DateUtil.formatSvrHourByLocalTimeZone(12).hour;
        zoneStr2 = App.DateUtil.formatSvrHourByLocalTimeZone(22).hour;    
        zoneStr3 = App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;   
		return [zoneStr+"",zoneStr2+"",zoneStr2+"",zoneStr+"",zoneStr3+""];
    }
    

    // protected initBg():void
	// {
	// 	let bgName:string=this.getBgName();
	// 	if(bgName)
	// 	{
	// 		this.viewBg = BaseLoadBitmap.create(bgName);
	// 		if(this.isTouchMaskClose())
	// 		{
	// 			this.viewBg.touchEnabled=true;
	// 		}
    //         this.addChild(this.viewBg);
    //         this.viewBg.width = GameConfig.stageWidth;
    //         this.height = GameConfig.stageHeigth;

    //         //this.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
	// 		// 
    //         // this.viewBg.height = GameConfig.stageHeigth;
    //         // let mask = BaseLoadBitmap.create('empvsmask');
    //         // this.addChild(mask);
	// 		// mask.width = GameConfig.stageWidth;
    //         // mask.height = GameConfig.stageHeigth;
    //         this.viewBg.y = 0;
	// 	}
	// }

    protected initView():void{
        let view = this;
        let data = view.param.data;
        view._data = data;
        view._type = view.api.getCurpeirod();

        if(view.api.canGetReward(data.eventId)){
            NetManager.request(NetRequestConst.REQUST_COUNCIL_GETREWARD, {
                eventId : data.eventId,
                eventst : view.api.getEventInfoById(data.eventId).st
            });
        }

        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_COUNCIL_JOINEVENT,view.joinEventCallBack,view);

        view._nodeContainer = new BaseDisplayObjectContainer();
        view.addChild(this._nodeContainer);

        let bg = BaseBitmap.create("discussviewbg");
        bg.y = -89;
        view._nodeContainer.addChild(bg);
        //人物形象
        //武-武 智-仁 政-政 魅-文
        let titleId = '';
        switch(Number(data.eventNeedType)){
            case 1:
                titleId = '3000';
                break;
            case 2:
                titleId = '3102';
                break;
            case 3:
                titleId = '3103';
                break;
            case 4:
                titleId = '3105';
                break;
            case 0:
                titleId = '3201';
                break;
        }
        let roleinfo = null;
        if(titleId == '3201'){
            roleinfo = Api.councilVoApi.getKingData();
            roleinfo.titleId = '3201';
        }
        else{
            roleinfo = Api.palaceVoApi.getRoleInfoByTitleId(titleId);
        }
        
        if(!roleinfo || roleinfo.uid == 0){
            let arr = ['3201','3000','3102','3103','3105','3104'];
            for(let i in arr){
                if(arr[i] == '3201'){
                    roleinfo = Api.councilVoApi.getKingData();
                    roleinfo.titleId = '3201';
                }
                else{
                    roleinfo = Api.palaceVoApi.getRoleInfoByTitleId(arr[i]);
                }
                if(roleinfo && roleinfo.uid){
                    titleId = arr[i];
                    break;
                }
                else{
                    roleinfo = null;
                }
            }
        }
        this._dbNode1 =  new BaseDisplayObjectContainer(); //下层可变特效
        this._nodeContainer.addChild(this._dbNode1);
		this._dbNode2 =  new BaseDisplayObjectContainer();  //上层可变
        this._dbNode3 =  new BaseDisplayObjectContainer();  //上层不可变
        
        let role : any = new CouncilRole();
        if(roleinfo){
            role.y = 50;
            role.refreshUIWithData(roleinfo);
            this._dbNode1.x = this._dbNode2.x = this._dbNode3.x = 190;
            this._dbNode1.y = this._dbNode2.y = this._dbNode3.y = role.y + 100;
        }
        else{
            this._dbNode1.y = this._dbNode2.y = this._dbNode3.y = role.y+40;
        }
        
        role.scaleX = role.scaleY = 0.4;
        this._dbNode1.setScale(0.4);
        this._dbNode2.setScale(0.4);
        this._dbNode3.setScale(0.4);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, role, bg, [0, 180]);
        view._nodeContainer.addChild(role);

        this._nodeContainer.addChild(this._dbNode2);
        this._nodeContainer.addChild(this._dbNode3);
        //名
        if(roleinfo){
            let nameBg = BaseBitmap.create("public_9_bg12");
            nameBg.width = 120;
            nameBg.height = 30;
            view._nodeContainer.addChild(nameBg);
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, nameBg, role,[0,10]);
            
            let nameTxt = ComponentManager.getTextField(roleinfo.name,20);
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, nameBg);
            view._nodeContainer.addChild(nameTxt);

            if(!roleinfo.tlv){
                roleinfo.tlv = 1;
            }
        }	
        
        let titleImg = App.CommonUtil.getTitlePic(titleId, roleinfo ? roleinfo.tlv : 1);
        titleImg.width = 155;
        titleImg.height = 59;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, titleImg, role, [0,50]);
        view._nodeContainer.addChild(titleImg);

        //文本框
        let descbg = BaseBitmap.create(`public_9_bg25`);//public_chatbg3 
        descbg.width = 320;
        if(PlatformManager.checkIsThSp())
        {
             descbg.width = 380;
        }
        view.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, role, [0,-90]);
        view._nodeContainer.addChild(descbg);

        let descTxt = ComponentManager.getTextField(LanguageManager.getlocal(view._type == 4 ? 'discussViewEventSuccess' : `discussViewEventDesc${data.eventNeedType}_${view.api.getDescId(data.eventNeedType)}`), 20, TextFieldConst.COLOR_BLACK);
        descTxt.width = descbg.width - 40;
        descTxt.lineSpacing = 5;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt, descbg, [0,10]);
        view._nodeContainer.addChild(descTxt);
        descbg.height = descTxt.height + 20 + 25;

        //所需述性
        let needTypeTxt = ComponentManager.getTextField(LanguageManager.getlocal(`discussViewNeedType3`, [LanguageManager.getlocal(`servantInfo_speciality${data.eventNeedType == 0 ? 7 : data.eventNeedType}`)]), 20, TextFieldConst.COLOR_WARN_YELLOW2);
        view.setLayoutPosition(LayoutConst.rightbottom, needTypeTxt, descbg, [15,10]);
        view._nodeContainer.addChild(needTypeTxt);
        if(PlatformManager.checkIsEnLang())
        {
            needTypeTxt.setPosition(descbg.x + descbg.width / 2 - needTypeTxt.width / 2,descbg.y + descbg.height - needTypeTxt.height - 10);
        }

        let arrowBM = BaseBitmap.create("public_arrow");
        arrowBM.anchorOffsetX = arrowBM.width / 2;
        arrowBM.anchorOffsetY = arrowBM.height / 2;
        arrowBM.rotation = -90;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, arrowBM, descbg, [arrowBM.anchorOffsetX - 3, descbg.height - 10 + arrowBM.anchorOffsetY]);
        view._nodeContainer.addChild(arrowBM);
        if(PlatformManager.checkIsThSp())
        {
            arrowBM.x -= 77;
        }
        // if(view._type == 4){
            
        // }
        // else{
        //     let tmpRect =  new egret.Rectangle(0,0,498, GameConfig.stageHeigth - role.y - 80 - 250 - 30);
        //     scrollList = ComponentManager.getScrollList(CouncilEventRoleItem, [], tmpRect);
        //     view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, role, [0,250]);
        // }
        if(view._type == 4){
            let arr = view.api.getEventPlayerInfo(view.param.data.eventId, view._type);
            let tmpRect =  new egret.Rectangle(0,0,640, GameConfig.stageHeigth - role.y - role.height * 0.5 - 10);
            let scrollList = ComponentManager.getScrollList(CouncilEventSuccessItem, arr, tmpRect, NaN, view.api.getMaxJoinNum());
            view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, role, [0,role.height * 0.5 - 60]); 
            view._nodeContainer.addChild(scrollList);
            view.swapChildren(view._nodeContainer,view.container);

            if(!arr.length){
                let listbg = BaseBitmap.create('discusslistbg');
                listbg.width = 634;
                listbg.height = scrollList.height - 20;
                view._nodeContainer.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, scrollList);
                view._nodeContainer.addChild(listbg);
                view._nodeContainer.swapChildren(scrollList, listbg);

                let tipbg = BaseBitmap.create('public_tipbg');
                tipbg.width = listbg.width - 60;             
                tipbg.height = 30;         
                view._nodeContainer.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipbg, listbg);
                view._nodeContainer.addChild(tipbg); 
                
                let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal('councilNoManJoin'), 24);//
                view._nodeContainer.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipbg);
                view._nodeContainer.addChild(tipTxt); 
                
            }
            view._nodeContainer.y = 89;
        }
        else{
            for(var index = 0; index < view.api.getMaxJoinNum(); index++) {
                this.makeSeatItem(index);
            }
            let bgcount = Math.ceil((this._nodeContainer.height - bg.height) / 285);
            for(let i = 0; i < bgcount; ++ i){
                let bg2 = BaseBitmap.create("discussviewbg2");
                bg2.y = bg.height + i * 285 + bg.y;
                view._nodeContainer.addChildAt(bg2,1);
            }
            let scrollH = GameConfig.stageHeigth + 10;
            let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,scrollH);
            let scrollView = ComponentManager.getScrollView(this._nodeContainer,rect);
            scrollView.bounces = false;
            view.addChildToContainer(scrollView);
            view._listview = scrollView;
            view.fresh_list();
            // let emparena_bottom = BaseBitmap.create(`emparena_bottom`);
            // view.setLayoutPosition(LayoutConst.horizontalCenterbottom, emparena_bottom, view._listview);
            // view.addChild(emparena_bottom);
            // //底部
            // let savebtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, `discussViewVisitEvent`, view.joinEventClick, view);
            // view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, savebtn, emparena_bottom); 
            // view.addChild(savebtn);
            // savebtn.setGray(view.api.isVisitEvent(data.eventId) || view.api.getEventInfoById(view._data.eventId).joinNum >= view.api.getMaxJoinNum());
            // view._saveBtn = savebtn;

            // emparena_bottom.visible = savebtn.visible = view._type == 2;

            let ckBtn = ComponentManager.getButton('acsevenckjl', '', view.ckjliClick, view);
            view.setLayoutPosition(LayoutConst.lefttop, ckBtn, view.titleBg, [10, view.titleBg.height + 10]);
            view.addChild(ckBtn);
        }
        //身体特效
        if(1){

        }
        view.refreshDBDragons(roleinfo);
    }

    private refreshDBDragons(roleinfo)
	{
        let view = this;
        if(roleinfo){
            let roleNode1 = this._dbNode1.getChildByName("roleNode1");
            let roleNode2 = this._dbNode2.getChildByName("roleNode2");
            if(roleNode1 && roleNode1 instanceof  BaseLoadDragonBones){
                roleNode1.stop();
                roleNode1.dispose();
            }
            if(roleNode2 && roleNode2 instanceof  BaseLoadDragonBones){
                roleNode2.stop();
                roleNode2.dispose();
            }
            this._dbNode1.removeChildren(); //下层可变特效
            this._dbNode2.removeChildren(); //上层可变
            this._dbNode3.removeChildren(); //上层不可变

            let level = roleinfo.tlv;
            if(level){
                let cfg = null;
                let titleconfig = Config.TitleCfg.getTitleCfgById(roleinfo.titleId);
                let isdi = titleconfig.isTitle == 1 && titleconfig.titleType == 1;
                let iswang = titleconfig.isTitle == 1 && titleconfig.titleType == 2;
                let ishuang = titleconfig.isTitle == 1 && titleconfig.titleType == 7;
                if(isdi){
                    cfg = Config.TitleupgradeCfg.diList[level - 1];
                }
                if(iswang){
                    cfg = Config.TitleupgradeCfg.wangList[level - 1];
                }
                if(ishuang){
                    cfg = Config.TitleupgradeCfg.huangList[level - 1];
                }
    
                let xialevel = 0;
                if(cfg.shoulder){
                    xialevel = 1;
                }
    
                if(cfg.head){
                    xialevel = 2;
                }
            
                if(cfg.body){
                    xialevel = 3;
                }
            
                if(cfg.dragon){
                    xialevel = 4;
                }
            
                if(xialevel >= 1){
                    if(xialevel > 1){
                        let xiapath = "huangdi_" + xialevel + "xia";
                        let roleNode1 = App.DragonBonesUtil.getLoadDragonBones(xiapath);
                        if(xialevel == 2){
                            roleNode1.y = 160;
                        }else if(xialevel == 3){
                            roleNode1.y = 160;
                        }else if(xialevel == 4){
                            roleNode1.y = 180;
                        } 
                        this._dbNode1.addChild(roleNode1);
                        roleNode1.name = "roleNode1";
                        roleNode1.x = GameConfig.stageWidth/2;
                    }
                    
                    let shangpath = "huangdi_" + (xialevel>=3 ? 3 : xialevel ) + "shang";
                    if(xialevel == 1){
                        shangpath = "huangdi_1";
                    }
                    let roleNode2 = App.DragonBonesUtil.getLoadDragonBones( shangpath);
                    roleNode2.y = 200;
                    this._dbNode2.addChild(roleNode2);
                
                    roleNode2.name = "roleNode2";
                    roleNode2.x = GameConfig.stageWidth/2;
                }
            }
        }
	}

    private makeSeatItem(index):void{
        let view = this;
        let item : any = view._nodeContainer.getChildByName('roleitem' + index);
        let arr = view.api.getEventPlayerInfo(view.param.data.eventId, view._type);
        if(item){
            if(arr[index] && !arr[index].empty){
                item.refreshRole(arr[index]);
            }
            
        }
        else{
            let councilEventRoleItem = new CouncilEventRoleItem();
            councilEventRoleItem.name = 'roleitem' + index;
            councilEventRoleItem.initItem(index+1, arr[index]);
            
            let posX = 40;
            if((index%2) == 1)
            {
            //如果是比较长的语言  bookRoomInfoItem中的容器会被文本撑开  所以默认固定间隔是桌子的宽度 284 
            //    posX = GameConfig.stageWidth -bookRoomInfoItem.width - posX ;
                posX = GameConfig.stageWidth - 290;
            }
            let posY = 350 + Math.floor(index/2) * 310;
            councilEventRoleItem.x = posX;
            councilEventRoleItem.y = posY;
            view._nodeContainer.addChild(councilEventRoleItem);
        }
    }

    private ckjliClick():void{
        let view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.COUNCILRANKLISTVIEW, view._data);
    }

    private fresh_list():void{
        let view = this;
        if(view.api.isVisitEvent(view._data.eventId) && view._type < 4){
            let idx = view.api.getJoinEventSeatId(view.param.data.eventId);
            if(idx){
                let height = 350 + Math.floor((idx - 1)/2) * 310;
                let scrollH = GameConfig.stageHeigth - this.container.y + 10;
                let scrollTop = height + 310 / 2;
                let maxY : number =  350 + Math.floor(view.api.getMaxJoinNum() / 2) * 310 + 310;
                let isTop : boolean = false;
                let isEnd : boolean = false;
                if(scrollTop < (scrollH / 2))
                {
                    scrollTop = 0;
                }
                else if(scrollTop > (maxY - scrollH/2))
                {
                    scrollTop=maxY - scrollH;
                }
                else
                {
                    scrollTop = height + 310 / 2 - scrollH/2;
                }
                view._listview.setScrollTop(scrollTop,100);
                //setScrollTopByIndex(idx - 1, 80);
            }
        }
    }

    private joinEventCallBack(evt : egret.Event):void{
        if(evt.data.ret){
            let view = this;
            let str = '';
            if(Number(evt.data.data.data.councilstat)){
                switch(Number(evt.data.data.data.councilstat)){
                    case 1:
                        str = 'discussJoinEventTip4';
                        break;
                    case 2:
                        str = 'discussJoinEventTip5';
                        break;
                    case 3:
                        str = 'discussJoinEventTip6';
                        break;
                    case 4:
                        str = 'discussJoinEventTip7';
                        break;
                    default :
                        str = 'discussJoinEventTip6';
                        break;
                }
                App.CommonUtil.showTip(LanguageManager.getlocal(str));
            }
            if(evt.data.data.data.seatlist){
                view.api.setEventSeatInfoBack(view.param.data.eventId, evt.data.data.data.seatlist);
                for(var index = 0; index < view.api.getMaxJoinNum(); index++) {
                    this.makeSeatItem(index);
                }
                // let seatid = Number(evt.data.data.data.seatinfo.seatId);
                // view.makeSeatItem(seatid - 1);
                view.fresh_list();
                //view._saveBtn.setGray(view.api.isVisitEvent(view._data.eventId) || view.api.getEventInfoById(view._data.eventId).joinNum >= view.api.getMaxJoinNum());
            }
        }
    }

    private joinEventClick():void{
        let view = this;
        if(Api.switchVoApi.checkOpenServerMaintain()){
            App.CommonUtil.showTip(LanguageManager.getlocal("mergeServerTip"));
            return;
        }
        if(view.api.isVisitEvent(view._data.eventId)){
            App.CommonUtil.showTip(LanguageManager.getlocal("discussViewHaveVisit"));
            return;
        }
        if(view.api.getEventInfoById(view._data.eventId).joinNum >= view.api.getMaxJoinNum()){
            App.CommonUtil.showTip(LanguageManager.getlocal("discussViewNumEnough"));
            return;
        }
        if(view.api.getCurpeirod() != 2){
            App.CommonUtil.showTip(LanguageManager.getlocal("discussViewEventTimePass"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.COUNCILSELECTSERVANTVIEW, view._data);
    }

    protected getRequestData():{requestType:string,requestData:any}{ 
        let view = this;
        view._type = view.api.getCurpeirod();
        let msg = view._type == 4 ? NetRequestConst.REQUST_COUNCIL_GETRANK : NetRequestConst.REQUST_COUNCIL_GETEVENTDETAIL;
        return {requestType:msg,requestData:{eventId : view.param.data.eventId}};
    }

    protected receiveData(data:{ret:boolean,data:any}):void{
        let view = this;
        if(data.ret){
            if(data.data.cmd == NetRequestConst.REQUST_COUNCIL_GETRANK){
                view.api.setRankInfo(view.param.data.eventId, data.data.data);
            }
            else if(data.data.cmd == NetRequestConst.REQUST_COUNCIL_GETEVENTDETAIL){
                view.api.setEventSeatInfo(view.param.data.eventId, data.data.data.seatlist);
            }
        }
        // if(data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_DBRANK)
		// {
		// 	this._acData  = data.data.data;
		// 	//this._acVo = <AcMayDayVo>Api.acVoApi.getActivityVoByAidAndCode(AcMayDayRankPopupView.aid,AcMayDayRankPopupView.code);
		// }
    }
    
    public dispose():void{
        let view = this;
        NetManager.request(NetRequestConst.REQUST_COUNCIL_GETEVENTINFO, {});
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_COUNCIL_JOINEVENT,view.joinEventCallBack,view);
        view._timeDesc = null;
        view._topbg = null;
        view._type = 1;
        view._listview = null;
        //view._saveBtn = null;
        view._nodeContainer = null;
        this._dbNode1 = null;
		this._dbNode2 = null;
        this._dbNode3 = null;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_GETPALACEINFO),view.palaceInfoHandlerCallback,view);
        super.dispose();
    }
}