/*
author : qianjun
desc : 帮会争顶活动预热界面
*/
class AcBattleGroundView extends AcCommonView{
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
   
    private get cfg() : Config.AcCfg.BattleGroundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
    private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
    //REQUST_ACTIVITY_BATTLEGROUND

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }
    
    protected getTitleStr():string{
        return `acBattleRoundViewTitle-${this.getUiCode()}`
    }

    protected getResourceList():string[]{
        let ret = super.getResourceList();
        ret = ret.concat([
            `crosspowerenterbg-1`,
        ]);
		return ret;
	}
    
    // 背景图名称
	protected getBgName():string{
        return `crosspowerenterbg-1`;
    }

    protected getRuleInfo() : string{
        let code = this.getUiCode();
        if(Api.switchVoApi.checkServantRefuseBattle() && this.getUiCode() == '1' &&Api.switchVoApi.checkOpenAtkracegChangegpoint()){
			return "acBattleRoundRule-1_newRule_withOpenRefusal";
		}
        return Api.switchVoApi.checkOpenAtkracegChangegpoint() ? (`acBattleRoundRule-${code}_newRule`) : (`acBattleRoundRule-${code}`);
    }
    
    protected getRuleInfoParam() : string[]{
        let tmp = [];
        if(Api.switchVoApi.checkOpenAtkracegChangegpoint()){
            tmp.push(this.cfg.lowestScore.toString());
        }
        tmp.push(this.cfg.disableTime.toString());
        return tmp;
    } 
    
    protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND,requestData:{
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
                view.vo.setWaiting(0)
            }
            view.vo.setRaceInfo(data.data.data.battleground);
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
		//view.api.setBossNumInfo(data.data.data);
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
    
    public initView(){
        let view = this; 
        view._curRound = view.vo.getCurRound();
        view.vo.init = false;
       // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREBOXPLAY),view.playBoxCallback,view);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        let code = this.getUiCode();

        view._period = view.vo.getCurperiod();
        //顶部
        let topBg = BaseBitmap.create(`battlegroundtop-${code}`);
        view.addChild(topBg);
        let timeCdTxt = ComponentManager.getTextField(LanguageManager.getlocal(`AcTurnTableViewTime`,[view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(timeCdTxt);
        let attendTxt = ComponentManager.getTextField(LanguageManager.getlocal(`${view.vo.getAttendQuality() ? `acBattleRoundQuality` : `acBattleRoundNoQuality`}-${code}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(attendTxt);
        view._attendText = attendTxt;
        if(view.vo.isWaiting()){
            attendTxt.text = LanguageManager.getlocal(`acBattleRoundCDTxt10-${code}`);
        }
        if(this.vo.getCurperiod()==1)
		{
			attendTxt.text = LanguageManager.getlocal("acbattlenobegun2");
		}
        topBg.height = timeCdTxt.textHeight + attendTxt.textHeight + 30;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view.titleBg, [0,view.titleBg.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeCdTxt, topBg, [10,10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, attendTxt, timeCdTxt, [0,timeCdTxt.textHeight + 5]);
        //顶部提示
        view.initTopTip();

        //底部
        let bottomBg = BaseBitmap.create(`battlegroundbottombg-${code}`);
        bottomBg.height = 86;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);
        //活动详情
        let detailBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'atkracecrossDetailTitle', ()=>{
            
            if(this.vo.isStart==false)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            else
            {
                ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEDETAILSVIEW,{
                    aid : view.aid,
                    code : view.code
                });
            //活动详情界面
            }
         
            
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, detailBtn, bottomBg, [85,0]);
        view.addChild(detailBtn);
        //排行榜
        let rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acDragonBoatDayRankViewTitle', ()=>{
            //排行榜界面
            ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEDETAILSVIEW,{
                    aid : view.aid,
                    code : view.code,
                    type: "rank"
                });

        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [85,0]);
        view.addChild(rankBtn);
        //中部按钮
        let midBtn = ComponentManager.getButton(`battlegroundbtn${Math.min(view.vo.getCurperiod(), 3)}-${code}`, '', ()=>{
            let str = '';   
            switch(view.vo.getCurperiod()){
                case 1:
                    str = `acBattleRoundNotStart-${code}`
                    break;
                case 2:
                case 3:
                    ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEGROUNDMAPVIEW,{
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
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, midBtn, view);
        view.addChild(midBtn);
        view._midBtn = midBtn;
        view.setChildIndex(view.closeBtn, 9999);
    }

    public tick():void{
        let view = this;
        let curPeriod = view.vo.getCurperiod();
        let code = this.getUiCode();
        // if(curPeriod == 4){
        //     App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundCDTxt5-${code}`));
        //     view.hide();
        //     return;
        // }
        if(curPeriod !== view._period){
            this._needFresh = true;
            this.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND,{activeId:view.acTivityId});
        }
        //view._midBtn.setBtnBitMap(`battlegroundbtn${Math.min(3,view.vo.getCurperiod())}-${view.code}`);
        view.freshText();
        view._period = curPeriod;
        view._midBtn.setBtnBitMap(`battlegroundbtn${Math.min(view.vo.getCurperiod(), 3)}-${code}`);
      
        if(view.vo.isWaiting()){
            view._attendText.text = LanguageManager.getlocal(`acBattleRoundCDTxt10-${code}`);
        }
        else{
            view._attendText.text = LanguageManager.getlocal(`${view.vo.getAttendQuality() ? `acBattleRoundQuality` : `acBattleRoundNoQuality`}-${code}`);
         }
        if(this.vo.getCurperiod()==1)
		{
			  view._attendText.text = LanguageManager.getlocal("acbattlenobegun2");
        }
        let curround = view.vo.getCurRound();
        if(curround != view._curRound){
            this.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND,{activeId:view.acTivityId});
        }
        view._curRound = curround;
    }

    private initTopTip():void{
        let view = this;
        let code = this.getUiCode();
        let tipBg = BaseBitmap.create(`battlegrounddescbg-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipBg, view, [0,153]);
        view.addChild(tipBg);
        view._cdBg = tipBg;
        tipBg.addTouchTap(()=>{
            ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEDETAILSVIEW,{
                aid : view.aid,
                code : view.code,
                type: "rank"
            });
        },view);

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
        let str = `acBattleRoundCDTxt${view._period}-${code}`;
        let param = [];
        let myRank = view.vo.getMyRank();
        if(view.vo.isWaiting()){
            view._cdText.text = LanguageManager.getlocal(`acBattleGroundTip8-${code}`);
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
                        str = `acBattleRoundCDTxt4-${code}`;
                    }
                    else{
                        param.push(need);
                    }
                    if(view.vo.getAttendQuality()){
                        //没被淘汰
                        if(view.vo.getJoinIn()){
                            param.push(LanguageManager.getlocal(`acBattleRoundRank-${code}`, [String(myRank <= need ? 0x21eb39 : 0xff3c3c),myRank.toString()]));
                        }
                        else{
                            param.push(LanguageManager.getlocal(`acBattleRoundCDTxt5-${code}`));
                        }
                    }
                    else{
                        if(view.vo.getCurRound() == 1){
                            param.push(LanguageManager.getlocal(`acBattleRoundCDTxt11-${code}`));
                        }
                        else{
                            if(view.vo.getCheerALlianceOut()){
                                param.push(LanguageManager.getlocal(`acBattleRoundCDTxt13-${code}`));
                            }
                            else{
                                param.push(LanguageManager.getlocal(`acBattleRoundCDTxt12-${code}`));
                            }
                            // param.push(LanguageManager.getlocal(`acBattleRoundCDTxt11-${code}`));
                        }
                        // param.push(LanguageManager.getlocal(`acBattleRoundNoAttend-${code}`));
                    }
                    break;
                case 3:
                case 4:
                    str = `acBattleRoundCDTxt3-${code}`;
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
                    param.push(LanguageManager.getlocal(`acBattleRoundCDTxt${tyle}-${code}`));
                    break;
            }
            if(this._needFresh){
                view._cdText.text = LanguageManager.getlocal(`acBattleGroundTip8-${code}`);
            }
            else{
                view._cdText.text = LanguageManager.getlocal(str,param);
            }
        }
        
        view._cdBg.width = view._cdText.textWidth + 30;
        view._cdBg.height = view._cdText.textHeight + 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._cdBg, view, [0,153]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._cdText, view._cdBg, [0,-5]);
    }

    protected getSoundBgName():string
	{
		return `music_atkrace`;
	}
    
    public dispose():void{   
        let view = this;
        view._midBtn = null;
        view._period = 1;
        view._cdBg.removeTouchTap();
        view._cdBg = null;
        view._cdText = null;
        view._needFresh = false;
        view._curRound = 1;
        Api.chatVoApi.clearAcCrossChatList();
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_DOUBLESEVEN_GETREWARD),view.getrewardCallback,view);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH,this.fresh_jindu,this); 
        super.dispose();
    }
}