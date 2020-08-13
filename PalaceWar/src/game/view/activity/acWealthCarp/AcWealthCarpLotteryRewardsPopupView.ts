/**
  * 中秋活动奖励查看的弹板
  * @author 张朝阳
  * date 2019/6/27
  * @class AcWealthCarpLotteryRewardsPopupView
  */
class AcWealthCarpLotteryRewardsPopupView extends PopupView {

	private _scollList: ScrollList = null;

	private aid: string = null;

	private code: string = null;

	private rankList: any = null;

	private _isQualification: boolean = false;

	private _countDownTime: BaseTextField = null;
	private _data: any = null;

	public constructor() {
		super();
	}

	public initView() {
		let rewards = this.param.data.rewards;
		this.aid = this.param.data.aid;
		this.code = this.param.data.code;
		this.rankList = this.param.data.luckyinfo;
		this._isQualification = this.param.data.isQualification;
		// this._data = this.param.data.data;
		for (let i = 0; i < this.rankList.length; i++) {
			if (this.rankList[i].lucky == 1) {
				this._data = this.rankList[i];
				break;
			}
		}


		let vo = <AcWealthCarpVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);


		let bgContainer = new BaseDisplayObjectContainer();
		bgContainer.width = 544;
		bgContainer.height = 396;
		bgContainer.setPosition(this.viewBg.x + this.viewBg.width / 2 - bgContainer.width / 2, 0);
		this.addChildToContainer(bgContainer);
		bgContainer.mask = new egret.Rectangle(0, 0, 544, 392);

		let bg = BaseLoadBitmap.create("acwealthcarpview_common_lotterybg");
		bg.width = 544;
		bg.height = 396;
		bgContainer.addChild(bg);


		if (vo.checkIsInEndShowTime()) {
			if (this._data && this._data.pic) {
				let picId = this._data.level;
				// if(this._data.title){
				// 	let info = App.CommonUtil.getTitleData(this._data.title);
				// 	if(info.title != ``){
				// 		picId = info.title;
				// 	}
				// }
				let player = Api.playerVoApi.getPlayerPortrait(Number(picId), this._data.pic);
				player.setPosition(0, bg.y + 20);
				bgContainer.addChild(player);

			}
			else {
				let personBM = BaseLoadBitmap.create("acwealthcarpview_common_bady");
				personBM.width = 291;
				personBM.height = 357;
				personBM.setPosition(0, bg.y + bg.height - personBM.height);
				bgContainer.addChild(personBM);
			}
		}
		else {
			let personBM = BaseLoadBitmap.create("acwealthcarpview_common_bady");
			personBM.width = 291;
			personBM.height = 357;
			personBM.setPosition(0, bg.y + bg.height - personBM.height);
			bgContainer.addChild(personBM);
		}
		// 225 180

		let descBg = BaseBitmap.create("specialview_commoni_namebg");
		descBg.width = 225;
		descBg.height = 180;
		descBg.setPosition(bg.x + bg.width - descBg.width, bg.y + 70);
		bgContainer.addChild(descBg);

		let qualificationStr: string = this._isQualification ? LanguageManager.getlocal("acWealthCarpLotteryRewardsPopupViewQualification-" + this.code) : LanguageManager.getlocal("acWealthCarpLotteryRewardsPopupViewUnQualification-" + this.code);
		let qualificationTF = ComponentManager.getTextField(qualificationStr, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
		qualificationTF.textAlign = egret.HorizontalAlign.CENTER;
		qualificationTF.setPosition(descBg.x + descBg.width / 2 - qualificationTF.width / 2, descBg.y + 20);
		bgContainer.addChild(qualificationTF);

		let lotteryTF = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpLotteryRewardsPopupViewLotteryNum-" + this.code, [String(this.rankList.length ? this.rankList.length : 0)]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
		lotteryTF.textAlign = egret.HorizontalAlign.CENTER;
		lotteryTF.setPosition(descBg.x + descBg.width / 2 - lotteryTF.width / 2, descBg.y + 110);
		bgContainer.addChild(lotteryTF);

		let rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acWealthCarpLotteryRewardsPopupViewRankBtn-" + this.code, () => {
			ViewController.getInstance().openView(ViewConst.POPUP.ACWEALTHCARPRANKPOPUPVIEW, { aid: this.aid, code: this.code, rewards: rewards, luckyinfo: this.rankList });
		}, this);
		rankBtn.setPosition(descBg.x + descBg.width / 2 - rankBtn.width / 2, bg.y + bg.height - rankBtn.height - 15);
		bgContainer.addChild(rankBtn);



		let toptip = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpViewRankPopupViewTopTip-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		toptip.setPosition(this.viewBg.x + this.viewBg.width / 2 - toptip.width / 2, bgContainer.y + bgContainer.height + 10)
		this.addChildToContainer(toptip);

		let rewardbg = BaseBitmap.create("public_9_bg4");
		rewardbg.width = 530;
		rewardbg.height = 205;
		rewardbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rewardbg.width / 2, toptip.y + toptip.height + 5);
		this.addChildToContainer(rewardbg);

		let emptybg = BaseLoadBitmap.create("acwealthcarpview_10emptybg");
		emptybg.width = 503;
		emptybg.height = 186;
		emptybg.setPosition(rewardbg.x + rewardbg.width / 2 - emptybg.width / 2, rewardbg.y + rewardbg.height / 2 - emptybg.height / 2);
		this.addChildToContainer(emptybg);

		let rewardVoList: RewardItemVo[] = GameData.formatRewardItem(rewards);
		let rewardScale = 0.85;
		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
			rewardDB.setScale(rewardScale);
			rewardDB.setPosition(emptybg.x + (i % 5) * (rewardDB.width * rewardScale + 10) + 3, emptybg.y + Math.floor(i / 5) * (rewardDB.height * rewardScale + 4));
			this.addChildToContainer(rewardDB);
		}

		let txtbg = BaseBitmap.create("public_itemtipbg2");
		this.addChildToContainer(txtbg);

		// 153
		if (!vo.checkIsInEndShowTime()) {
			this._countDownTime = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpLotteryRewardsPopupViewCountDown-" + this.code, [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_RED);
			this._countDownTime.setPosition(153 - this._countDownTime.width / 2+GameData.popupviewOffsetX, bgContainer.y + bgContainer.height - 23 - this._countDownTime.height / 2);
			this.addChildToContainer(this._countDownTime);

			txtbg.width = 72 + this._countDownTime.width;
			txtbg.setPosition(this._countDownTime.x + this._countDownTime.width / 2 - txtbg.width / 2, this._countDownTime.y + this._countDownTime.height / 2 - txtbg.height / 2)
		}
		else {
			let nameStr = "";
			if (this._data && this._data.pic) {
				nameStr = this._data.name;;
			}
			else {
				nameStr = LanguageManager.getlocal("acWealthCarpRankPopupViewNoBigReward-" + this.code);
			}
			let bigRewardTF = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpRankPopupViewBigReward-" + this.code, [nameStr]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
			bigRewardTF.setPosition(153 - bigRewardTF.width / 2, bgContainer.y + bgContainer.height - 23 - bigRewardTF.height / 2);
			this.addChildToContainer(bigRewardTF);
			txtbg.width = 72 + bigRewardTF.width;
			txtbg.setPosition(bigRewardTF.x + bigRewardTF.width / 2 - txtbg.width / 2, bigRewardTF.y + bigRewardTF.height / 2 - txtbg.height / 2)
		}

	}

	public tick() {
		let vo = <AcWealthCarpVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		if (this._countDownTime) {
			if (vo.checkIsInEndShowTime()) {
				this._countDownTime.text = LanguageManager.getlocal("acWealthCarpLotteryRewardsPopupViewRefreshView-" + this.code);
			}
			else {
				this._countDownTime.text = LanguageManager.getlocal("acWealthCarpLotteryRewardsPopupViewCountDown-" + this.code, [vo.acCountDown]);
			}
			this._countDownTime.x = 153 - this._countDownTime.width / 2+GameData.popupviewOffsetX;
		}

	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"specialview_commoni_namebg"
		]);
	}
	protected getTitleStr(): string {
		return "acWealthCarpLotteryRewardsPopupViewTitle-" + this.param.data.code;
	}
	public dispose() {
		this._scollList = null;
		this.aid = null;
		this.code = null;
		this.rankList = null;
		this._isQualification = false;
		this._countDownTime = null;
		this._data = null;
		super.dispose();
	}

}