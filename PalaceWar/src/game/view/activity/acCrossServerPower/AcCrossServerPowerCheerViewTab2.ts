//助威
class AcCrossServerPowerCheerViewTab2 extends CommonViewTab
{

	private _scrollList:ScrollList = null;
    private _flagNum:BaseTextField = null;
    private _scoreNumTxt:BaseTextField = null;
    private _scoreBtn:BaseButton = null;
    private _canGetTxt:BaseTextField = null;
    private _cheerTip:BaseTextField = null;
	public constructor(param?) 
	{
		super();
		this.param = param;
		this.initView();
        // console.log(param);
	}

	protected getUiCode():string{
        let code = "";
        switch(Number(this.code)){
            default:
                code = `7`;
                break;
        }
        return code;        
    }
	
    private get aid():string{
        return this.param.data.aid;
    }

    private get code():string{
        return this.param.data.code;
    }

    private get vo() : AcCrossServerPowerVo{
        return <AcCrossServerPowerVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }	
	private get cfg() : Config.AcCfg.CrossServerPowerCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }


	protected initView():void
	{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_GETFLAGREWARD,this.refreshScore,this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_USEFLAG,this.refreshData,this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.refreshView,this);

        let baseView = <AcCrossServerPowerCheerView>ViewController.getInstance().getView("AcCrossServerPowerCheerView");
        this.height = baseView.tabHeight;
        this.width = GameConfig.stageWidth;

        let redBg = BaseBitmap.create("accshegemony_ranktitlebg");
		redBg.width = 620;
        redBg.x = GameConfig.stageWidth/2 - redBg.width/2;
        redBg.y = 10;
        this.addChild(redBg);

        let detailBg = BaseBitmap.create("arena_bottom");
        detailBg.width = 600;
        detailBg.height = 270;
        detailBg.x = GameConfig.stageWidth/2 - detailBg.width/2;
        detailBg.y = this.height - detailBg.height - 5;
        this.addChild(detailBg);

        let fNum = this.vo.getFightFlagNum();
        let flagNum = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerflag", this.getUiCode()) ,[String(fNum)]),24,TextFieldConst.COLOR_WHITE);
        flagNum.x = detailBg.x + 20;
        flagNum.y = detailBg.y + 25;
        this.addChild(flagNum);
        this._flagNum = flagNum;

        let score = this.vo.getFlagScore();
        let scoreNum = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerPopularNum", this.getUiCode()),[String(score)]),24,TextFieldConst.COLOR_WHITE);
        scoreNum.x = flagNum.x;
        scoreNum.y = flagNum.y + flagNum.height + 20;
        this.addChild(scoreNum); 
        this._scoreNumTxt = scoreNum;

        let detailLine = BaseBitmap.create("public_line1");
        detailLine.width = 600;
        detailLine.x = detailBg.x + detailBg.width/2 - detailLine.width/2;
        detailLine.y = scoreNum.y + scoreNum.height + 15;
        this.addChild(detailLine);

        let info = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerInfo", this.getUiCode())),TextFieldConst.FONTSIZE_CONTENT_COMMON ,TextFieldConst.COLOR_WHITE);
        info.width = 600;
        info.lineSpacing = 5;
        info.x = scoreNum.x;
        info.y = detailLine.y + detailLine.height + 20;
        this.addChild(info); 

        let scoreBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW,App.CommonUtil.getCnByCode("acCrossserverPowerCheerGetPopular", this.getUiCode()) ,this.scoreBtnClick,this, null, null, null, TextFieldConst.COLOR_BLACK);
        scoreBtn.x = detailBg.x + detailBg.width - 20 - scoreBtn.width;
        scoreBtn.y = detailLine.y - scoreBtn.height - 15;
        this.addChild(scoreBtn);
        this._scoreBtn = scoreBtn;

        let ruleBtn = ComponentManager.getButton("accshegemony_rulebtn",App.CommonUtil.getCnByCode("acCrossserverPowerCheerRuleInfo", this.getUiCode()),this.ruleBtnClick,this,null,null,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
        ruleBtn.x = detailBg.x + detailBg.width - ruleBtn.width - 10;
        ruleBtn.y = detailBg.y + detailBg.height - 5 - ruleBtn.height;
        this.addChild(ruleBtn);

        //倒计时
        let cheerTipStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossServerPowerCheerNotOpen", this.getUiCode(), "7"));
        let cheerEndTime = this.vo.getCheerEndTime()
        if (GameData.serverTime >= cheerEndTime){
            cheerTipStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossServerPowerCheerFinish", this.getUiCode(), "7"));
        }
        else{
            if (!this.vo.isInAcPreTime()){
                let timeStr = App.DateUtil.getFormatBySecond((cheerEndTime - GameData.serverTime), 1);
                cheerTipStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossServerPowerCheerTimeDown", this.getUiCode(), "7"), [timeStr]);
            }
        }
        let cheerTip = ComponentManager.getTextField(cheerTipStr, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        cheerTip.setPosition(detailBg.x + 20, detailBg.y + detailBg.height - cheerTip.height - 10);
        this.addChild(cheerTip);
        this._cheerTip = cheerTip;

        let redRankTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerRank", this.getUiCode())),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        redRankTxt.x = 66 - redRankTxt.width/2;
        redRankTxt.y = redBg.y + redBg.height / 2 - redRankTxt.height/2;
        this.addChild(redRankTxt);

        let redNameTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerNick", this.getUiCode())),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        redNameTxt.x = 180 - redNameTxt.width/2;
        redNameTxt.y = redBg.y + redBg.height / 2 - redNameTxt.height/2;
        this.addChild(redNameTxt);

        let redPlusTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerAddPower", this.getUiCode())),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        redPlusTxt.x = 315 - redPlusTxt.width/2;
        redPlusTxt.y = redBg.y + redBg.height / 2 - redPlusTxt.height/2;
        this.addChild(redPlusTxt);

        let redTotalTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerNumTitle", this.getUiCode())),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        redTotalTxt.x = 440 - redTotalTxt.width/2;
        redTotalTxt.y = redBg.y + redBg.height / 2 - redTotalTxt.height/2;
        this.addChild(redTotalTxt);

        let playerAddTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerSelfNum", this.getUiCode())),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        playerAddTxt.x = 560 - playerAddTxt.width/2;
        playerAddTxt.y = redBg.y + redBg.height / 2 - playerAddTxt.height/2;
        this.addChild(playerAddTxt);

        let list:any[] = [];
        let rankData = Api.crossPowerVoApi.flagRankInfo;
        if (rankData){
            list = rankData;
        }
        let listH = detailBg.y - redBg.y - redBg.height - 5;
        let rect = new egret.Rectangle(0,0, 620, listH);
        let scrollList = ComponentManager.getScrollList(AcCrossServerPowerCheerViewScrollItem2, list, rect, {aid:this.aid,code:this.code});
        scrollList.x = GameConfig.stageWidth/2 - scrollList.width/2;//bottomBg.x;
        scrollList.y = redBg.y + redBg.height + 3;
        this.addChild(scrollList);
        this._scrollList = scrollList;
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));

        TickManager.addTick(this.tick, this);
        this.refreshView();
    }

    private tick():void{
        if (this._cheerTip){
            let cheerTipStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossServerPowerCheerNotOpen", this.getUiCode(), "7"));
            let cheerEndTime = this.vo.getCheerEndTime()
            if (GameData.serverTime >= cheerEndTime){
                cheerTipStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossServerPowerCheerFinish", this.getUiCode(), "7"));
            }
            else{
                if (!this.vo.isInAcPreTime()){
                    let timeStr = App.DateUtil.getFormatBySecond((cheerEndTime - GameData.serverTime), 1);
                    cheerTipStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossServerPowerCheerTimeDown", this.getUiCode(), "7"), [timeStr]);
                }
            }
            this._cheerTip.text = cheerTipStr;
        }
    }
    
    private refreshView():void{
       
        this._scoreNumTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerPopularNum", this.getUiCode()),[String(this.vo.getFlagScore())]);
        this._flagNum.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerCheerflag", this.getUiCode()) ,[String(this.vo.getFightFlagNum())]);

        if (!this.vo.isGetFlagScore() && this.vo.isCanGetFlagScore()){
            App.CommonUtil.addIconToBDOC(this._scoreBtn);
            this._scoreBtn.setEnable(true);
        } else {
            App.CommonUtil.removeIconFromBDOC(this._scoreBtn);
            this._scoreBtn.setEnable(false);
        }

        let list:any[] = [];
        let rankData = Api.crossPowerVoApi.flagRankInfo;
        if (rankData){
            list = rankData;
        }
        this._scrollList.refreshData(list, {aid:this.aid,code:this.code})
    }

    private refreshScore(event?:egret.Event):void{
        if(event && event.data && event.data.ret ){
            let data = event.data.data.data;
            let addscore = data.addscore;
            if(addscore > 0){  
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerFlagPulsScore", this.getUiCode()),[String(addscore)]));
            }
        } 
        this.refreshView();
    }

    private refreshData(event?:egret.Event):void{
        if(event.data && event.data.ret ){
            let d = event.data.data.data;
            let rank = d.atkranks;
            Api.crossPowerVoApi.setFlagRankInfo(rank);

            this._scrollList.refreshData(rank,{aid:this.param.data.aid,code:this.param.data.code});
            this.refreshView();
        }
    }

    private scoreBtnClick():void
    {
        if (!this.vo.isStart){
            this.vo.showAcEndTip();
            return;
        }
        if (this.vo.isCanGetFlagScore()){
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_GETFLAGREWARD, {activeId:this.vo.aidAndCode}); 
        }
    }
    
    private ruleBtnClick():void
    {
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERPOWERCHEERRULEPOPUPVIEW,{
			aid : this.param.data.aid,
			code : this.param.data.code,
			
		});
    }

	public dispose():void
	{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_GETFLAGREWARD,this.refreshScore,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_USEFLAG,this.refreshData,this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.refreshView,this);
        TickManager.removeTick(this.tick, this);
        this._scrollList = null;
        this._flagNum = null;
        this._scoreNumTxt = null;
        this._scoreBtn = null;
        this._cheerTip = null;

		super.dispose();
	}

}