class AcSingleDayBuild1ViewTab4 extends CommonViewTab {

	private _scrollList: ScrollList = null;

	private _timeTxt: BaseTextField = null;

	private _myRank: BaseTextField = null;
	private _rankData:any = null;
	public constructor(param?) {
		super();
		this.param = param;
		this.initView();
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

	private getUiCode():string{
		let code = this.param.data.code;
		if (code == "3"){
			return "2";
		}
		return code;
	}

	public initView(): void {
		let view = this;
		view.height = GameConfig.stageHeigth - view.y - 110;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.refreashView,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ACTIVITY_GET_SINGLE_DAY_RANK,this.refreashView,this);
		let gemRankData = this.vo.getArr('gemRank');
		
		// let bg = BaseBitmap.create("public_9_bg22");
		// bg.width = GameConfig.stageWidth;
		// bg.height = GameConfig.stageHeigth - this.getViewTitleButtomY();
		// this.addChild(bg);
		let topBgImg = App.CommonUtil.getResByCode("acsingleday_rankbg", this.getUiCode());
		let topBg = BaseLoadBitmap.create(topBgImg);
		topBg.width = 640;
		topBg.height = 280;
		this.addChild(topBg);

		let line = BaseBitmap.create("acsingledayline")
        this.addChild(line);
		
		let lineBg = BaseBitmap.create(	"acsingledayline");
		lineBg.setPosition(topBg.x,topBg.y);
		this.addChild(lineBg);
		
		let buttomBg = BaseBitmap.create("public_9_bg22");
		buttomBg.width = GameConfig.stageWidth;
		buttomBg.height = GameConfig.stageHeigth - this.getViewTitleButtomY() - topBg.height - 110;
		buttomBg.setPosition(topBg.x,topBg.y + topBg.height);
		this.addChild(buttomBg);

		/**衣装预览 start */
		if (this.getUiCode() == "1"){
			let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
			let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
			skinTxtEffect.width = 208;
			skinTxtEffect.height = 154;
			skinTxtEffect.setPosition(topBg.x + 165 - 208 / 2, topBg.y + topBg.height - 110);
			skinTxtEffect.blendMode = egret.BlendMode.ADD;
			this.addChild(skinTxtEffect);
			skinTxtEffect.playWithTime(-1);
			skinTxtEffect.addTouchTap(() => {
				let topMsg = LanguageManager.getlocal("acSingleDayTopMsg_"+this.getUiCode());
				let rewards = gemRankData[0].getReward.split("|");
				let rewardId = rewards[0].split("_")[1];
				ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONTITLEREWARDPOPUPVIEW, {titleIds: [rewardId], bgType:3, topMsg:topMsg});
			}, this);

			let skinTxt = BaseBitmap.create("acsearchproofview_common_skintxt");
			skinTxt.anchorOffsetX = skinTxt.width / 2;
			skinTxt.anchorOffsetY = skinTxt.height / 2;
			// skinTxt.setPosition(topBg.x + 165, topBg.y + 245);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
			this.addChild(skinTxt);
			egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

			let skinTxteffect = BaseBitmap.create("acsearchproofview_common_skintxt");
			skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
			skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
			// skinTxteffect.setPosition(skinTxt.x, skinTxt.y);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxteffect, skinTxtEffect);
			this.addChild(skinTxteffect);
			skinTxteffect.blendMode = egret.BlendMode.ADD;
			skinTxteffect.alpha = 0;
			egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
			/**衣装预览 end */
		}
		else if (this.getUiCode() == "2"){
			let iconCon = new BaseDisplayObjectContainer();
			this.addChild(iconCon);
			let icon = BaseBitmap.create(App.CommonUtil.getResByCode("acsingleday_tokenicon", this.getUiCode()));
			iconCon.width = icon.width;
			iconCon.addChild(icon);
			iconCon.x = 155 - iconCon.width/2;
			iconCon.y = 50;
			let iconEff = ComponentManager.getCustomMovieClip("acsingleday_iconeff", 10);
			iconEff.width = 270;
			iconEff.height = 239;
			iconEff.blendMode = egret.BlendMode.ADD;
			iconCon.addChild(iconEff);
			iconEff.playWithTime(0);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconEff, icon, [0, 0]);

			egret.Tween.get(iconCon,{loop:true}).to({y:iconCon.y - 5},1000).wait(100).to({y:iconCon.y},1000).wait(100);
		}

		let ruleTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayBuild1ViewTab4Rule_" + this.getUiCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		ruleTxt.width = 270;
		ruleTxt.lineSpacing = 5;
		ruleTxt.setPosition(topBg.x + 350, topBg.y + 25);
		this.addChild(ruleTxt);

		let rankBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acSingleDayBuild1ViewTab4Rank", this.rankClick, this);
		rankBtn.setPosition(ruleTxt.x + ruleTxt.width / 2 - rankBtn.width / 2 , ruleTxt.y + 188);
		this.addChild(rankBtn);

		this._myRank = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayBuild1ViewTab4MyRank", [""]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		this._myRank.setPosition(ruleTxt.x, rankBtn.y - this._myRank.height - 18);
		this.addChild(this._myRank);

		this._timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayBuild1ViewTab4Time", [this.vo.acCountDown]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		this._timeTxt.setPosition(this._myRank.x, this._myRank.y - this._timeTxt.height - 5);
		this.addChild(this._timeTxt);

		let acTimeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayBuild1ViewTab4AcTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		acTimeTxt.setPosition(this._timeTxt.x, this._timeTxt.y - acTimeTxt.height - 5);
		this.addChild(acTimeTxt);

		let rect = new egret.Rectangle(0,0,buttomBg.width - 40,buttomBg.height - 45);
		this._scrollList = ComponentManager.getScrollList(AcSingleDayBuild1ViewTab4ScrollItem,gemRankData,rect)
		this._scrollList.setPosition(17,buttomBg.y + 23);
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
		super.dispose();
	}
}