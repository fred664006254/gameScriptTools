/**
  * 马超排行榜Tab2
  * author 张朝阳
  * date 2019/1/14
  * @class AcMaChaoRankPopupViewTab2
  */
class AcMaChaoRankPopupViewTab2 extends AcCommonViewTab {

	private _rewardAcTimeTF: BaseTextField = null;
	private _buttomBg: BaseBitmap = null;
	private _rewardMyRankTF: BaseTextField = null;
	public constructor() {
		super();
		egret.callLater(this.initView, this);
	}

	public initView() {

		let cfg = <Config.AcCfg.MaChaoCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcMaChaoVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let rewardList: any[] = cfg.rankItemListCfg;

		let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
		buttomBg.width = 524;
		buttomBg.height = 520;
		buttomBg.setPosition(24, 55);
		this.addChild(buttomBg);

		let rewardRect = new egret.Rectangle(0, 0, 516, 510);
		let rewardScrollList = ComponentManager.getScrollList(AcMaChaoRankRewardScrollItem, rewardList, rewardRect);
		rewardScrollList.setPosition(buttomBg.x + 4, buttomBg.y + 5);
		this.addChild(rewardScrollList);

		this._buttomBg = BaseBitmap.create("public_9_bg1");
		this._buttomBg.width = 516;
		this._buttomBg.height = 105;
		this._buttomBg.setPosition(rewardScrollList.x, rewardScrollList.y + rewardScrollList.height + 10);
		this.addChild(this._buttomBg);
		// 我的排名 rankorder2
		let rankStr = "";
		let myRank = this.param.data.rankData.myrankArr.myrank;
		if (myRank && myRank <= 100) {
			rankStr = LanguageManager.getlocal("acMaChaoRankPopupViewTab2Rank-" + this.code, [myRank])
		}
		else {
			rankStr = LanguageManager.getlocal("acMaChaoRankPopupViewTab2Rank-" + this.code, [LanguageManager.getlocal("acMaChaoRankPopupViewTab2Unrank-" + this.code)]);
		}
		this._rewardMyRankTF = ComponentManager.getTextField(rankStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._rewardMyRankTF.setPosition(this._buttomBg.x + 30, this._buttomBg.y + 15);
		this.addChild(this._rewardMyRankTF)
		// 活动倒计时 
		this._rewardAcTimeTF = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoRankPopupViewTab2Time-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._rewardAcTimeTF.setPosition(this._buttomBg.x + this._buttomBg.width - this._rewardAcTimeTF.width - 30, this._rewardMyRankTF.y);
		this.addChild(this._rewardAcTimeTF);
		// 奖励发送 
		let rewardMailTF = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoRankPopupViewTab2Tip-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		rewardMailTF.textAlign = egret.HorizontalAlign.CENTER;
		rewardMailTF.setPosition(this._buttomBg.x + this._buttomBg.width / 2 - rewardMailTF.width / 2, this._rewardAcTimeTF.y + this._rewardAcTimeTF.height + 15);
		this.addChild(rewardMailTF);

		TickManager.addTick(this.tick, this);
		this.tick();
	}

	/**
	 * 时间倒计时
	 */
	public tick() {
		let cfg = <Config.AcCfg.MaChaoCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcMaChaoVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let deltaT = vo.et - GameData.serverTime - 86400 * 1;
		if (this._rewardAcTimeTF && (!vo.checkIsInEndShowTime())) {
			this._rewardAcTimeTF.text = LanguageManager.getlocal("acMaChaoRankPopupViewTab2Time-" + this.code, [App.DateUtil.getFormatBySecond(deltaT, 1)]);
			this._rewardAcTimeTF.setPosition(this._buttomBg.x + this._buttomBg.width - this._rewardAcTimeTF.width - 30, this._rewardMyRankTF.y);

		} else {
			this._rewardAcTimeTF.text = LanguageManager.getlocal("acMaChaoRankPopupViewTab2Time-" + this.code, [LanguageManager.getlocal("acMaChaoRankPopupViewTab2TimeEnd-" + this.code)]);
			this._rewardAcTimeTF.setPosition(this._buttomBg.x + this._buttomBg.width - this._rewardAcTimeTF.width - 30, this._rewardMyRankTF.y);
		}
	}
	public dispose() {
		TickManager.removeTick(this.tick, this);
		this._rewardAcTimeTF = null;
		this._buttomBg = null;
		this._rewardAcTimeTF = null;
		super.dispose();
	}

}