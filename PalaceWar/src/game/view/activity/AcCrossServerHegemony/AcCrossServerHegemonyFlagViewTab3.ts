//
class AcCrossServerHegemonyFlagViewTab3 extends CommonViewTab
{

	private _scrollList:ScrollList = null;
    private _flagNum:BaseTextField = null;
    private _scoreNumTxt:BaseTextField = null;
    private _scoreBtn:BaseButton = null;
    private _canGetTxt:BaseTextField = null;
    // private _oldScore: number = 0;
	public constructor(param?) 
	{
		super();
		this.param = param;
		this.initView();
        // console.log(param);
	}


	
	private get cfg() : Config.AcCfg.CrossServerHegemonyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcCrossServerHegemonyVo{
        return <AcCrossServerHegemonyVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

	protected getListType():number
	{
		return 1;
	}

	protected initView():void
	{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETWARFLAGSCORE,this.refreshScore,this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_USEWARFLAG,this.refreshData,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH,this.refreshView,this);
        let rankData = Api.crossServerHegemonyVoApi.getFlagRankData();

        let redBg = BaseBitmap.create("accshegemony_ranktitlebg");
		redBg.width = 620;
        redBg.x = GameConfig.stageWidth/2 - redBg.width/2;
        redBg.y = 10;
        this.addChild(redBg);

        let detailBg = BaseBitmap.create("arena_bottom");
        detailBg.width = 600;
        detailBg.height = 235;
        detailBg.x = GameConfig.stageWidth/2 - detailBg.width/2;
        detailBg.y = GameConfig.stageHeigth - 89 - 60 - detailBg.height - 10;
        this.addChild(detailBg);
    
        let outbg:BaseBitmap = BaseBitmap.create("public_9_bg14");
        outbg.width = GameConfig.stageWidth - 20;
        // outbg.height = 730 - (1136 - GameConfig.stageHeigth ) - 60;//GameConfig.stageHeigth - 69 - 99;
        outbg.height = GameConfig.stageHeigth - 99 - 60 - 14 - redBg.height - detailBg.height - 1;
        outbg.x = GameConfig.stageWidth/2 - outbg.width/2;
		outbg.y = redBg.y + redBg.height + 2;
        this.addChild(outbg);
        outbg.visible = false;

        let detailLine = BaseBitmap.create("public_line1");
        detailLine.width = 600;
        detailLine.x = detailBg.x + detailBg.width/2 - detailLine.width/2;
        detailLine.y = detailBg.y + detailBg.height/2 - detailLine.height/2 + 5;
        this.addChild(detailLine);

        let playerName = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagPlayername",[Api.playerVoApi.getPlayerName()]),24,TextFieldConst.COLOR_WHITE);
        playerName.x = detailBg.x + 20;
        playerName.y = detailBg.y + 15;
        this.addChild(playerName);
        // let fNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.flagItemID);
        let fNum = this.vo.getSpecailToolNum();
        let flagNum = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagNum",[String(fNum)]),24,TextFieldConst.COLOR_WHITE);
        flagNum.x = playerName.x;
        flagNum.y = playerName.y + playerName.height + 5;
        this.addChild(flagNum);
        this._flagNum = flagNum;

        let scoreNum = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagScore",[String(this.vo.getScore())]),24,TextFieldConst.COLOR_WHITE);
        scoreNum.x = playerName.x;
        scoreNum.y = flagNum.y + flagNum.height + 5;
        this.addChild(scoreNum); 
        this._scoreNumTxt = scoreNum;

        let rule1 = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagRule1",[this.vo.resultscore]),20,TextFieldConst.COLOR_WHITE);
        rule1.width = 560;
        rule1.lineSpacing = 4;
        rule1.x = playerName.x;
        rule1.y = detailBg.y + 135;
        this.addChild(rule1); 

        let scoreBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW,"acCrossServerHegemonyFlagScoreBtn",this.scoreBtnClick,this, null, null, null, TextFieldConst.COLOR_BLACK);
        scoreBtn.x = detailBg.x + detailBg.width - 20 - scoreBtn.width;
        scoreBtn.y = detailLine.y - scoreBtn.height - 5;
        this.addChild(scoreBtn);
        this._scoreBtn = scoreBtn;

        this._canGetTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagGetScore",[String(this.vo.canGetScore())]),20,TextFieldConst.COLOR_BROWN);
        this._canGetTxt.x = this._scoreBtn.x + this._scoreBtn.width/2 - this._canGetTxt.width/2;
        this._canGetTxt.y = this._scoreBtn.y - 2 - this._canGetTxt.height;
        this.addChild(this._canGetTxt); 
        if(this.vo.canGetScore() <= 0){
            this._canGetTxt.visible = false;
        }

        let ruleBtn = ComponentManager.getButton("accshegemony_rulebtn","acCrossServerHegemonyFlagRuleBtn",this.ruleBtnClick,this,null,null,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
        ruleBtn.x = detailBg.x + detailBg.width - ruleBtn.width - 10;
        ruleBtn.y = detailBg.y + detailBg.height - 5 - ruleBtn.height;
        this.addChild(ruleBtn);

        // let listBg = BaseBitmap.create();
        // listBg.width = 600;
        // listBg.height = 640 - (1136 - GameConfig.stageHeigth);
        // listBg.x = GameConfig.stageWidth/2 - listBg.width/2;
        // listBg.y = line1.y - listBg.height;
        // this.addChild(listBg);

        let redRankTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagRank"),20,TextFieldConst.COLOR_WARN_YELLOW);
        redRankTxt.x = 86 - redRankTxt.width/2;
        redRankTxt.y = redBg.y + redBg.height / 2 - redRankTxt.height/2;
        this.addChild(redRankTxt);

        let redDetailTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagDetail"),20,TextFieldConst.COLOR_WARN_YELLOW);
        redDetailTxt.x = 272 - redDetailTxt.width/2;
        redDetailTxt.y = redBg.y + redBg.height / 2 - redDetailTxt.height/2;
        this.addChild(redDetailTxt);

        let redTotalTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagTotal"),20,TextFieldConst.COLOR_WARN_YELLOW);
        redTotalTxt.x = 450 - redTotalTxt.width/2;
        redTotalTxt.y = redBg.y + redBg.height / 2 - redTotalTxt.height/2;
        this.addChild(redTotalTxt);

        let redPlusTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagPlus"),20,TextFieldConst.COLOR_WARN_YELLOW);
        redPlusTxt.x = 555 - redPlusTxt.width/2;
        redPlusTxt.y = redBg.y + redBg.height / 2 - redPlusTxt.height/2;
        this.addChild(redPlusTxt);

        let list:any[] = [];
        if (rankData && rankData.rank){
            list = rankData.rank;
        }
        // let list = rankData.rank;
        let rect = new egret.Rectangle(0,0, 620, outbg.height - 6);
        let scrollList = ComponentManager.getScrollList(AcCrossServerHegemonyFlagScrollList3,list,rect,{aid:this.param.data.aid,code:this.param.data.code});
        scrollList.x = GameConfig.stageWidth/2 - scrollList.width/2;//bottomBg.x;
        scrollList.y = outbg.y + 3;
        this.addChild(scrollList);
        this._scrollList = scrollList;
        // this._oldScore = this.vo.getScore();
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        this.refreshView();
	}
    private refreshView():void{
        if(!this._canGetTxt){
            return;
        }

        // this._oldScore = 0;
        this._canGetTxt.text = LanguageManager.getlocal("acCrossServerHegemonyFlagGetScore",[String(this.vo.canGetScore())]);
        this._canGetTxt.x = this._scoreBtn.x + this._scoreBtn.width/2 - this._canGetTxt.width/2;
        this._scoreNumTxt.text = LanguageManager.getlocal("acCrossServerHegemonyFlagScore",[String(this.vo.getScore())]);
        // let fNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.flagItemID);
        let fNum = this.vo.getSpecailToolNum();
        this._flagNum.text = LanguageManager.getlocal("acCrossServerHegemonyFlagNum",[String(fNum)]);

        if(this.vo.canGetScore() > 0){
            App.CommonUtil.addIconToBDOC(this._scoreBtn);
            this._scoreBtn.setEnable(true);
          
        } else {
            this._canGetTxt.visible = false;
            App.CommonUtil.removeIconFromBDOC(this._scoreBtn);
            this._scoreBtn.setEnable(false);
        }

    }
    private refreshScore(event?:egret.Event):void{
        if(event && event.data && event.data.ret && event.data.data.ret == 0){
            if(event && event.data && event.data.data && event.data.data.ret == 0){
                let data = event.data.data.data;
                let addscore = data.addscore;
                if(addscore > 0){
                          
                    App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyFlagPulsScore",[String(addscore)]));
                }
            }
        }
    }
    private refreshData(event?:egret.Event):void{
        if(event.data && event.data.ret && event.data.data.ret == 0){
            let d = event.data.data.data;
            let rank = d.rank;
        
             Api.crossServerHegemonyVoApi.setFlagOnlyRankData(rank);

            this._scrollList.refreshData(rank,{aid:this.param.data.aid,code:this.param.data.code});
            // let fNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.flagItemID);
            let fNum = this.vo.getSpecailToolNum();
            this._flagNum.text = LanguageManager.getlocal("acCrossServerHegemonyFlagNum",[String(fNum)]);

        }
    }
    // private canGetScore():number{

    //     let rankData = Api.crossServerHegemonyVoApi.getFlagRankData().rank;
    //     let needGetNum = 0;
    //     for(let i = 0;i < rankData.length; i++){
    //         let rData = rankData[i];
    //         if(Number(rData.endflag) != 0){
    //             if(!this.vo.checkGetFlagByAid(rData.aid)){
    //                 let sendFlagNum = this.vo.getFlagNumByAid(rData.aid);
    //                 let rebate = this.cfg.getFlagRebateByRank(i + 1);
                    
    //                 needGetNum += sendFlagNum * rebate;
    //             }
    //         }
    //     }
    //     return needGetNum * this.cfg.flagScoreNum;

    // }
    private ruleBtnClick():void
    {
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERHEGEMONYFLAGRULEPOPUPVIEW,{
			aid : this.param.data.aid,
			code : this.param.data.code,
			
		});
    }
    private scoreBtnClick():void
    {
        if(this.vo.canGetScore() > 0){
            // this._oldScore = this.vo.getScore();
            NetManager.request(NetRequestConst.REQUEST_ACHEGEMONY_GETWARFLAGSCORE,{activeId:this.vo.aidAndCode});  
        } else {
            App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyNoGetFlag"));
        }
    }

	public tick():void{	

	}


	public dispose():void
	{
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH,this.refreshView,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_USEWARFLAG,this.refreshData,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETWARFLAGSCORE,this.refreshScore,this);
        this._scrollList = null;
        this._flagNum = null;


        this._scoreNumTxt = null;
        this._scoreBtn = null;
        this._canGetTxt = null;
        // this._oldScore = 0;
		super.dispose();
	}

}