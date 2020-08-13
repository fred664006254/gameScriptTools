/*
author : wxz
desc : 风华群芳（绝地群芳赛）
time : 2020.7.9
*/
class AcGroupWifeBattleView extends AcCommonView
{
    private _midBtn : BaseButton = null;
    private _period : number = 1;
    private _cdBg : BaseBitmap = null;
    private _cdText : BaseTextField = null;
    private _needFresh : boolean = false;
    private _attendText : BaseTextField = null;
    private _curRound = 1;
    public constructor(){
        super();
    }
   
    private get cfg() : Config.AcCfg.GroupWifeBattleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
    private get vo() : AcGroupWifeBattleVo{
        return <AcGroupWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }
    
    protected getTitleStr():string{
        return null;
    }
	protected getTitleBgName():string
	{
        return "acgroupwifebattle_title1-" + this.getUiCode();
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
    }
    protected getResourceList():string[]{
        let ret = super.getResourceList();
        ret = ret.concat([
            `acgroupwifebattle_enterbg`,"acgroupwifebattlecode"+this.getUiCode(),"acliangbiographyview_common_acbg","crossserverintidaizi-7",
            "atkracecross_moretxt","atkracecross_upflag","public_popupscrollitembg"
        ]);
		return ret;
	}
    
    // 背景图名称
	protected getBgName():string{
        return `acgroupwifebattle_enterbg`;
    }
	protected getRuleBtnName():string
	{	
		return ButtonConst.BTN2_RULE;
	}
	protected getCloseBtnName():string
	{
		return "acchaoting_closebtn";
	}    
    protected getRuleInfo() : string{
        let code = this.getUiCode();
        // if(Api.switchVoApi.checkServantRefuseBattle() && this.getUiCode() == '1' &&Api.switchVoApi.checkOpenAtkracegChangegpoint()){
		// 	return "acBattleRoundRule-1_newRule_withOpenRefusal";
		// }
        // return Api.switchVoApi.checkOpenAtkracegChangegpoint() ? (`acBattleRoundRule-${code}_newRule`) : (`acBattleRoundRule-${code}`);
        return `acGroupWifeBattleRule-${code}`;
    }
    
    protected getRuleInfoParam() : string[]{
        return this.vo.getRuleInfoParam();
    } 
    
    protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
        if(view.vo.isEnd)
        {
            return null;
        }
		return {requestType:NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE,requestData:{
			activeId : view.vo.aidAndCode,
		}};
    }
    
    private _data : any[] = [];
	protected receiveData(data:{ret:boolean,data:any}):void
	{
        let view = this;
        view._data = [];
        if(data.data.data){
            if(data.data.data.waiting){
                view.vo.setWaiting(data.data.data.waiting);
            }
            else{
                view.vo.setWaiting(0);
            }
            if(data.data.data.groupwifebattle)
            {
                view.vo.setRaceInfo(data.data.data.groupwifebattle);
                view.vo.setWifebattleInfo(data.data.data.groupwifebattle);
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
            if(data.data.data.map){
                view.vo.setMap(data.data.data.map);
            }
            if(view._needFresh){
                view._needFresh = false;
            }
        }
	}
    
    protected initBg():void{
        this.height = GameConfig.stageHeigth;
        this.width = GameConfig.stageWidth;
		let bgName:string=this.getBgName();
		if(bgName){
            this.viewBg = BaseBitmap.create(bgName);
            if(this.isTouchMaskClose()){
				this.viewBg.touchEnabled=true;
            }
            this.addChild(this.viewBg);
            this.viewBg.y = 0 - Math.floor((1136 - GameConfig.stageHeigth) / 2);
		}
    }
    
    public initView()
    {
        let view = this; 
        if(view.vo.isEnd)
        {
            view.hide();
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			Api.acVoApi.isHandled_BI = false;
			Api.acVoApi.isHandled_LRP = false;
			Api.acVoApi.isHandled_ILI = false;
            return;
        }

        view._curRound = view.vo.getCurRound();
        view.vo.init = false;
       // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREBOXPLAY),view.playBoxCallback,view);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        let code = this.getUiCode();

        let wifestatusnum = Api.wifestatusVoApi.getStatusWifeNum();

        view._period = view.vo.getCurperiod();
        //顶部
        let topBg = BaseBitmap.create(`acliangbiographyview_common_acbg`);
        topBg.width = 640;
        view.addChild(topBg);
        let timeCdTxt = ComponentManager.getTextField(LanguageManager.getlocal(`AcTurnTableViewTime`,[view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(timeCdTxt);
        let attendTxt = ComponentManager.getTextField(LanguageManager.getlocal(`${view.vo.getAttendQuality() ? `acGroupWifeBattleQuality` : `acGroupWifeBattleNoQuality`}-${code}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(attendTxt);
        view._attendText = attendTxt;
        if(view.vo.isWaiting()){
            attendTxt.text = LanguageManager.getlocal(`acGroupWifeBattleCDTxt10-${code}`);
        }
        if(this.vo.getCurperiod()==1)
		{
            if(view.vo.getAttendQuality())
            {
                if(view.vo.getStatusWifeNum() < view.cfg.unlock_wifeStar)
                {
                    view._attendText.text = LanguageManager.getlocal(`acGroupWifeBattleQualityTip1-${code}`);
                }else
                {
                    view._attendText.text = LanguageManager.getlocal("acbattlenobegun2");
                }
            }
        }else
        {
            if(view.vo.getAttendQuality())
            {
                if(view.vo.getStatusWifeNum() < view.cfg.unlock_wifeStar)
                {
                    view._attendText.text = LanguageManager.getlocal(`acGroupWifeBattleQualityTip2-${code}`);
                }
            }
        }        
        topBg.height = timeCdTxt.textHeight + attendTxt.textHeight + 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view.titleBg, [0,view.titleBg.height-10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeCdTxt, topBg, [10,10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, attendTxt, timeCdTxt, [0,timeCdTxt.textHeight + 5]);
        view.setChildIndex(topBg,view.getChildIndex(view.titleBg));

        //顶部提示
        view.initTopTip();

        //带子
        let daizi = BaseBitmap.create(`crossserverintidaizi-7`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, daizi, view,[0,77]);
        view.addChild(daizi);

        //底部
        let bottomBg = BaseBitmap.create(`acgroupwifebattlebottombg-${code}`);
        // bottomBg.height = 80;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view,[0,-45]);
        view.addChild(bottomBg);

        // let bottomleft = BaseBitmap.create(`acgroupwifebattlecorner-${code}`);
        // bottomleft.setPosition(0,GameConfig.stageHeigth-bottomleft.height);
        // view.addChild(bottomleft);
        // let bottomright = BaseBitmap.create(`acgroupwifebattlecorner-${code}`);
        // bottomright.scaleX = -1;
        // bottomright.setPosition(GameConfig.stageWidth,GameConfig.stageHeigth-bottomright.height);
        // view.addChild(bottomright);
        //活动详情
        let detailBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'atkracecrossDetailTitle', ()=>{
            
            if(this.vo.isStart==false)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            else
            {
                ViewController.getInstance().openView(ViewConst.COMMON.ACGROUPWIFEBATTLEDETAILSVIEW,{
                    aid : view.aid,
                    code : view.code
                });
            //活动详情界面
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, detailBtn, bottomBg, [85,18]);
        view.addChild(detailBtn);
        //排行榜
        let rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acDragonBoatDayRankViewTitle', ()=>{
            //排行榜界面
            ViewController.getInstance().openView(ViewConst.COMMON.ACGROUPWIFEBATTLEDETAILSVIEW,{
                    aid : view.aid,
                    code : view.code,
                    type: "rank"
                });

        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, rankBtn, bottomBg, [85,18]);
        view.addChild(rankBtn);
        //中部按钮
        let midBtn = ComponentManager.getButton(`acgroupwifebattle_gobtn`, '', ()=>{
            let str = '';   
            switch(view.vo.getCurperiod()){
                case 1:
                    str = `acGroupWifeBattleNotStart-${code}`
                    break;
                case 2:
                case 3:
                    ViewController.getInstance().openView(ViewConst.COMMON.ACGROUPWIFEBATTLEMAPVIEW,{
                        aid : view.aid,
                        code : view.code
                    });
                    return;
                case 4:
                    str = 'date_error';
                    break;
            }
            App.CommonUtil.showTip(LanguageManager.getlocal(str));
        }, view);
        let type = view.vo.getCurperiod();
		if(type > 1 && type < 4){
			App.DisplayUtil.changeToNormal(midBtn);
		}
		else{
			App.DisplayUtil.changeToGray(midBtn);
		}        
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midBtn, bottomBg,[0,-midBtn.height+5]);
        view.addChild(midBtn);
        view._midBtn = midBtn;
        view.setChildIndex(view.closeBtn, 9999);
    }

    public tick():void{
        let view = this;
        let curPeriod = view.vo.getCurperiod();
        let code = this.getUiCode();
     
        if(curPeriod !== view._period){
            this._needFresh = true;
            this.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE,{activeId:view.acTivityId});
        }
        view.freshText();
        view._period = curPeriod;
        let type = view.vo.getCurperiod();

		if(curPeriod > 1 && curPeriod < 4){
			App.DisplayUtil.changeToNormal(view._midBtn);
		}
		else{
			App.DisplayUtil.changeToGray(view._midBtn);
		}           

        if(view.vo.isWaiting()){
            view._attendText.text = LanguageManager.getlocal(`acGroupWifeBattleCDTxt10-${code}`);
        }
        else{
            view._attendText.text = LanguageManager.getlocal(`${view.vo.getAttendQuality() ? `acGroupWifeBattleQuality` : `acGroupWifeBattleNoQuality`}-${code}`);
         }
        if(this.vo.getCurperiod()==1)
		{
            if(view.vo.getAttendQuality())
            {
                if(view.vo.getStatusWifeNum() < view.cfg.unlock_wifeStar)
                {
                    view._attendText.text = LanguageManager.getlocal(`acGroupWifeBattleQualityTip1-${code}`);
                }else
                {
                    view._attendText.text = LanguageManager.getlocal("acbattlenobegun2");
                }
            }
        }else
        {
            if(view.vo.getAttendQuality())
            {
                if(view.vo.getStatusWifeNum() < view.cfg.unlock_wifeStar)
                {
                    view._attendText.text = LanguageManager.getlocal(`acGroupWifeBattleQualityTip2-${code}`);
                }
            }
        }  
        let curround = view.vo.getCurRound();
        if(curround != view._curRound){
            this.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE,{activeId:view.acTivityId});
        }
        view._curRound = curround;

        // if(view.vo.isEnd)
        // {
        //     ViewController.getInstance().hideAllView();
        //     App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
		// 	Api.acVoApi.isHandled_BI = false;
		// 	Api.acVoApi.isHandled_LRP = false;
		// 	Api.acVoApi.isHandled_ILI = false;
        //     return;
        // }        
    }

    private initTopTip():void{
        let view = this;

        let tipTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.lineSpacing = 5;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        view.addChild(tipTxt);
        view._cdText = tipTxt;

        view.freshText();
    }

    private freshText():void{
        let view = this;
        let code = this.getUiCode();
        let period = view.vo.getCurperiod();
        //提示板信息
        let cd = App.DateUtil.getFormatBySecond(view.vo.getCountCD());
        let str = `acGroupWifeBattleCDTxt${view._period}-${code}`;
        let param = [];
        let myRank = view.vo.getMyRank();
        if(period == 1)
        {
            view._cdText.text = LanguageManager.getlocal(`acGroupWifeBattleTip15-${code}`);
        }else
        {
            if(view.vo.isWaiting())
            {
                view._cdText.text = LanguageManager.getlocal(`acGroupWifeBattleTip8-${code}`);
            }
            else
            {
                switch(period)
                {
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
                        param.push(LanguageManager.getlocal(`acGroupWifeBattleCDTxt${tyle}-${code}`));
                        break;
                }
                if(this._needFresh)
                {
                    view._cdText.text = LanguageManager.getlocal(`acGroupWifeBattleTip8-${code}`);
                }
                else
                {
                    view._cdText.text = LanguageManager.getlocal(str,param);
                }
            }
        }
        
        view._cdBg.width = view._cdText.textWidth + 30;
        view._cdBg.height = view._cdText.textHeight + 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._cdBg, view, [0,140]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._cdText, view._cdBg, [0,-5]);
    }

    // protected getSoundBgName():string
	// {
	// 	return `music_atkrace`;
	// }
    
    public dispose():void{   
        let view = this;
        view._midBtn = null;
        view._period = 1;
        if(view._cdBg)
        {
            view._cdBg.removeTouchTap();
            view._cdBg = null;
        }
        view._cdText = null;
        view._needFresh = false;
        view._curRound = 1;
        Api.chatVoApi.clearAcCrossChatList();
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_DOUBLESEVEN_GETREWARD),view.getrewardCallback,view);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH,this.fresh_jindu,this); 
        if(view.vo.isEnd)
        {
			Api.acVoApi.isHandled_BI = false;
			Api.acVoApi.isHandled_LRP = false;
			Api.acVoApi.isHandled_ILI = false;
        }        
        super.dispose();
    }
}