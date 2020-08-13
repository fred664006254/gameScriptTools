class AcSingleDayBuild1ViewTab4 extends CommonViewTab {

	private _scrollList: ScrollList = null;

	private _timeTxt: BaseTextField = null;

	private _myRank: BaseTextField = null;
	private _rankData:any = null;
	private _suffix:string = null;
	public constructor(param?) {
		super();
		this.param = param;
		this.init();
		this.initView();
	}
	protected init():void
	{
        let code = this.param.data.code;
        if(Number(code) <= 4 ){
            this._suffix = "1";//;
        }else{
            this._suffix = code;
        }
        super.init();
    }
	private get cfg(): Config.AcCfg.SingleDayCfg {
		return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
	}

	private get vo(): AcSingleDayVo {
		return <AcSingleDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
	}

	private get acTivityId(): string {
		return `${this.param.data.aid}-${this.param.data.code}`;
	}

	public initView(): void {
		let view = this;
		view.height = GameConfig.stageHeigth - view.y - 110;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.refreashView,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ACTIVITY_GET_SINGLE_DAY_RANK,this.refreashView,this);
		let gemRankData = this.vo.getArr('gemRank');
		let bg = BaseBitmap.create("public_9v_bg03");
		bg.width = GameConfig.stageWidth;
		bg.height = GameConfig.stageHeigth - this.getViewTitleButtomY() - 120;
		this.addChild(bg);

		let  topRes = "acsingleday_rankbg";
		if( this.param.data.code == "2" ||  this.param.data.code == "3" ||  this.param.data.code == "4"){
			topRes = "acsingleday_rankbg2";
		}
		let topBg = BaseLoadBitmap.create(topRes);
		// 626 × 286
		topBg.width = 626;
		topBg.height = 286;
		topBg.setPosition(bg.x + bg.width / 2 - topBg.width / 2, bg.y);
		this.addChild(topBg);

		let ruleTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayBuild1ViewTab4Rule_" + this.param.data.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		ruleTxt.width = 255;
		ruleTxt.lineSpacing = 5;
		ruleTxt.setPosition(topBg.x + 355, topBg.y + 25);
		this.addChild(ruleTxt);

		let rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acSingleDayBuild1ViewTab4Rank", this.rankClick, this);
		rankBtn.setPosition(ruleTxt.x + 35, ruleTxt.y + 180);
		this.addChild(rankBtn);

		this._myRank = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayBuild1ViewTab4MyRank", [""]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._myRank.setPosition(ruleTxt.x, rankBtn.y - this._myRank.height - 10);
		this.addChild(this._myRank);

		this._timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayBuild1ViewTab4Time", [this.vo.acCountDown]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._timeTxt.setPosition(this._myRank.x, this._myRank.y - this._timeTxt.height - 5);
		this.addChild(this._timeTxt);

		let acTimeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayBuild1ViewTab4AcTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		acTimeTxt.setPosition(this._timeTxt.x, this._timeTxt.y - acTimeTxt.height - 5);
		this.addChild(acTimeTxt);

		let rect = new egret.Rectangle(0,0,bg.width - 20,bg.height - topBg.height - 15);
		this._scrollList = ComponentManager.getScrollList(AcSingleDayBuild1ViewTab4ScrollItem,gemRankData,rect)
		this._scrollList.setPosition(10,topBg.y + topBg.height + 5);
		this.addChild(this._scrollList)
		if(!this.vo.isActivityEnd())
		{
			NetManager.request(NetRequestConst.REQYEST_ACTIVITY_GET_SINGLE_DAY_RANK,{activeId:this.vo.aidAndCode});
		}
		TickManager.addTick(this.tick,this);
		this.tick();
	}
	private rankClick() {
		if(this.vo.isActivityEnd())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.ACSINGLEDAYRECHARGEPOPUPVIEW,{rankData:this._rankData,vo:this.vo});
		
	}
	public tick()
	{
		if(this.vo.isActivityEnd())
		{
			return;
		}
		this._timeTxt.text = LanguageManager.getlocal("acSingleDayBuild1ViewTab4Time", [this.vo.acCountDown]);
		if(this._rankData)
		{
			let myRankStr = "";
			if(this._rankData.myrankArr.myrank)
			{
				myRankStr = this._rankData.myrankArr.myrank;
			}
			else
			{
				myRankStr = LanguageManager.getlocal("allianceRankNoRank");
			}
			this._myRank.text = LanguageManager.getlocal("acSingleDayBuild1ViewTab4MyRank", [myRankStr])
		}
	}
	private refreashView(event:egret.Event)
	{
		if(event.data.ret)
		{
			if(event.data.data.cmd == NetRequestConst.REQYEST_ACTIVITY_GET_SINGLE_DAY_RANK)
			{
				this._rankData = event.data.data.data;
				this.tick();
			}
			 
		}
	}
	public  refreshWhenSwitchBack()
	{
		if(this.vo.isActivityEnd())
		{
			return;
		}
		NetManager.request(NetRequestConst.REQYEST_ACTIVITY_GET_SINGLE_DAY_RANK,{activeId:this.vo.aidAndCode});
	}
	public dispose(): void {
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.refreashView,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ACTIVITY_GET_SINGLE_DAY_RANK,this.refreashView,this);
		TickManager.removeTick(this.tick,this);
		this._scrollList = null;
		this._timeTxt = null;
		this._rankData =  null;
		this._myRank = null;
		this._suffix = null;
		super.dispose();
	}
}