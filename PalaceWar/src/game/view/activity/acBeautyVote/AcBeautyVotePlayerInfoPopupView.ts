/**
  * 花魁活动-- 花魁详情
  * @author 张朝阳
  * date 2019/4/23
  * @class AcBeautyVotePlayerInfoPopupView
  */
class AcBeautyVotePlayerInfoPopupView extends PopupView {
	public constructor() {
		super();
	}
	private aid: any;
	private code: any;
	private playerId: number = 0;
	private voteId: number = 0;

	private _itemBg: BaseBitmap = null;
	private _myItemNumTF: BaseTextField = null;
	private _itemNumTF: BaseTextField = null;

	protected initView(): void {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_BEAUTYVOTE_VOTE, this.voteHandle, this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACBEAUTYVOTE_CHECKTASK, this.hide, this);

		this.aid = this.param.data.aid;
		this.code = this.param.data.code;
		this.playerId = this.param.data.playerId;
		this.voteId = this.param.data.voteId;
		let cfg = <Config.AcCfg.BeautyVoteCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

		let bg = BaseLoadBitmap.create("acbeautyvoteview_palyerinfobg-" + this.code);
		bg.width = 544;
		bg.height = 400;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
		this.addChildToContainer(bg);

		let playerBM = BaseLoadBitmap.create("acbeautyvoteview_player" + this.playerId + "-" + this.code);
		playerBM.width = 300 ;
		playerBM.height = 385;
		playerBM.setPosition(bg.x + bg.width / 2 - playerBM.width / 2, bg.y);
		this.addChildToContainer(playerBM);

		let playerNamebg = BaseBitmap.create("skin_detail_namebg");
		playerNamebg.setPosition(bg.x, bg.y);
		this.addChildToContainer(playerNamebg);

		let playerNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab1PlayerName" + this.playerId + "-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		playerNameTxt.setPosition(playerNamebg.x + playerNamebg.width / 2 - playerNameTxt.width / 2, playerNamebg.y + 55);
		this.addChildToContainer(playerNameTxt);

		let fanRankBtn = ComponentManager.getButton("acbeautyvoteview_fanrankbtn-" + this.code, "", () => {
			ViewController.getInstance().openView(ViewConst.POPUP.ACBEAUTYVOTEFANRANKPOPUPVIEW, { round: this.param.data.round, voteId: this.param.data.voteId, code: this.code, aid: this.aid });
		}, this);
		fanRankBtn.setPosition(bg.x + bg.width - fanRankBtn.width - 10, bg.y + bg.height - fanRankBtn.height - 30);
		this.addChildToContainer(fanRankBtn);

		this._itemBg = BaseBitmap.create("acbeautyvoteview_joinflag");
		this._itemBg.setPosition(bg.x + bg.width - this._itemBg.width, bg.y);
		this.addChildToContainer(this._itemBg);

		this._myItemNumTF = ComponentManager.getTextField("99999", 16, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._myItemNumTF.setPosition(this._itemBg.x + this._itemBg.width - this._myItemNumTF.width - 30, this._itemBg.y + 14 - this._myItemNumTF.height / 2);
		this.addChildToContainer(this._myItemNumTF);


		let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
		buttomBg.width = 530;
		buttomBg.height = 220;
		buttomBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
		this.addChildToContainer(buttomBg);

		let buttomBg2 = BaseBitmap.create("public_9_bg14");
		buttomBg2.width = 525;
		buttomBg2.height = 215;
		buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
		this.addChildToContainer(buttomBg2);

		let buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab1PlayerDesc" + this.playerId + "-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		buttomTipTxt.width = 490;
		buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + 15);
		this.addChildToContainer(buttomTipTxt);

		if (vo.checkSingleRoundAcTime(this.param.data.round)) {
			let flowerBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "acBeautyVotePlayerInfoPopupViewflowerBtn-" + this.code, () => {
				if (Api.playerVoApi.getPlayerLevel() < cfg.lvLimit) {
					App.CommonUtil.showTip(LanguageManager.getlocal("acBeautyVoteLvUnfullTip-" + this.code, [LanguageManager.getlocal("officialTitle" + String(cfg.lvLimit))]));
					return;
				}
				if (!vo.checkSingleRoundAcTime(this.param.data.round)) {
					App.CommonUtil.showTip(LanguageManager.getlocal("acBeautyVotePlayerInfoPopupViewAcTimeEndTip-" + this.code));
					return;
				}
				let vo1 = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

				if (vo1.getFlowersValue() > 0) {

					ViewController.getInstance().openView(ViewConst.POPUP.ACBEAUTYVOTEUSEITEMSLIDERPOPUPVIEW, { code: this.code, aid: this.aid, voteId: this.voteId, round: this.param.data.round });
				}
				else {

					let msg = LanguageManager.getlocal("acBeautyVoteGetNotFlowesMsg-" + this.code);
					let title = "acBeautyVoteGetNotFlowesTitle-" + this.code;
					ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
						msg: msg, title: title, needCancel: true, canelTxt: "acBeautyVoteGetNotFlowesCanel-" + this.code, confirmTxt: "acBeautyVoteGetNotFlowesBuyFlowes-" + this.code, handler: this, callback: () => {
							if (vo1.getBuyTimes() >= cfg.limit) {
								App.CommonUtil.showTip(LanguageManager.getlocal("acBeautyVoteNotBuyFlowesTip-" + this.code))
								return;
							}
							ViewController.getInstance().openView(ViewConst.POPUP.ACBEAUTYVOTEBUYITEMSLIDERPOPUPVIEW, { aid: this.aid, code: this.code });
						}, cancelcallback: () => {
							App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACBEAUTYVOTE_CHECKTASK);
						}
					});
				}
			}, this);
			flowerBtn.setPosition(buttomBg.x + buttomBg.width / 2 - flowerBtn.width / 2, buttomBg.y + buttomBg.height + 15);
			this.addChildToContainer(flowerBtn);

			let flower = BaseBitmap.create("acbeautyvoteview_acitemsmall-" + this.code);
			flower.setPosition(flowerBtn.x - flower.width / 2, flowerBtn.y + flowerBtn.height / 2 - flower.height / 2);
			this.addChildToContainer(flower);

			if (Api.playerVoApi.getPlayerLevel() < cfg.lvLimit) {
				flowerBtn.setGray(true);
				App.DisplayUtil.changeToGray(flower);
			}

		}
		else {
			let tip = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVotePlayerInfoPopupViewAcTimeEnd-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
			tip.setPosition(buttomBg.x + buttomBg.width / 2 - tip.width / 2, buttomBg.y + buttomBg.height + 25);
			this.addChildToContainer(tip);
		}


		this.refreshView();

	}
	/**刷新界面 */
	private refreshView() {
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
		let flowersinfo = vo.getSingleRoundFlowers(this.param.data.round);
		let flowerNumber: number = 0;
		if (this.param.data.voteId == 1) {
			flowerNumber = flowersinfo.letfValue;
		}
		else {
			flowerNumber = flowersinfo.rightValue;
		}
		if (flowerNumber > 0) {
			this._itemBg.setVisible(true);
			this._myItemNumTF.setVisible(true);
			this._myItemNumTF.text = String(flowerNumber);
			this._myItemNumTF.setPosition(this._itemBg.x + this._itemBg.width - this._myItemNumTF.width - 30, this._itemBg.y + 14 - this._myItemNumTF.height / 2);
		}
		else {
			this._itemBg.setVisible(false);
			this._myItemNumTF.setVisible(false);
		}
		if (this._itemNumTF) {
			this._itemNumTF.text = String(vo.getFlowersValue());
		}


	}



	/**献花成功 */
	private voteHandle(event: egret.Event) {
		if (event.data.ret) {
			let score: number = event.data.data.data.getScore;
			let msg = LanguageManager.getlocal("acBeautyVoteGetScoreMsg-" + this.param.data.code, [String(score)]);
			let title = "itemUseConstPopupViewTitle";
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, { msg: msg, title: title })
			this.refreshView();
		}
	}

	/**重设高度 */
	protected resetBgSize() {
		super.resetBgSize();
		let aid = this.param.data.aid;
		let code = this.param.data.code;
		let cfg = <Config.AcCfg.BeautyVoteCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let itembg = BaseBitmap.create("public_9_resbg");
		itembg.setPosition(this.viewBg.x + this.viewBg.width - itembg.width - 33, this.viewBg.y - itembg.height - 15);
		this.addChild(itembg);

		let itemBM = BaseBitmap.create("acbeautyvoteview_acitemsmall-" + this.code);
		itemBM.anchorOffsetX = itemBM.width / 2;
		itemBM.anchorOffsetY = itemBM.height / 2;
		itemBM.setScale(0.8);
		itemBM.setPosition(itembg.x + 20, itembg.y + itembg.height / 2);
		this.addChild(itemBM);

		this._itemNumTF = ComponentManager.getTextField("1111", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		this._itemNumTF.setPosition(itemBM.x + itemBM.width / 2 + 5, itembg.y + itembg.height / 2 - this._itemNumTF.height / 2);
		this.addChild(this._itemNumTF);

		let addItembtn = ComponentManager.getButton("mainui_btn1", null, () => {
			if (vo.getBuyTimes() >= cfg.limit) {
				App.CommonUtil.showTip(LanguageManager.getlocal("acBeautyVoteNotBuyFlowesTip-" + code))
				return;
			}
			ViewController.getInstance().openView(ViewConst.POPUP.ACBEAUTYVOTEBUYITEMSLIDERPOPUPVIEW, { aid: this.aid, code: this.code });

		}, this)
		addItembtn.setPosition(itembg.x + itembg.width - 20, itembg.y + itembg.height / 2 - addItembtn.height / 2);
		this.addChild(addItembtn);
		this.refreshView();
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"skin_detail_namebg",
		]);
	}
	protected getTitleStr(): string {
		return "acBeautyVotePlayerInfoPopupViewTitle-" + this.param.data.code;
	}
	public dispose(): void {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_BEAUTYVOTE_VOTE, this.voteHandle, this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACBEAUTYVOTE_CHECKTASK, this.hide, this);
		this.aid = null;
		this.code = null;
		this.playerId = 0;
		this.voteId = 0;
		this._itemBg = null;
		this._myItemNumTF = null;
		this._itemNumTF = null;
		super.dispose();
	}
}