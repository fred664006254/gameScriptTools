/**
  * 勤王除恶--帮会加成
  * @author 张朝阳
  * date 2019/4/17
  * @class AllianceWeekEndAdditionPopupView
  */
class AllianceWeekEndAdditionPopupView extends PopupView {

	private _topTipTF: BaseTextField;
	private _needAsset: any = null;
	private _needGem: any = null;
	public constructor() {
		super();
	}
	public initView(): void {

		App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_BUYBUFF, this.buyBuffHandle, this);

		this._topTipTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndAdditionPopupViewServantAddition", [String(Api.allianceWeekVoApi.getAdditionBuff())]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		this._topTipTF.x = 30+GameData.popupviewOffsetX;
		this._topTipTF.y = 30;
		this.addChildToContainer(this._topTipTF);
		let bg1 = BaseBitmap.create("public_9_bg4");
		bg1.width = 520;
		bg1.height = 290;
		bg1.x = this.viewBg.width / 2 - bg1.width / 2;
		bg1.y = this._topTipTF.x + 20;
		this.addChildToContainer(bg1);

		this._needAsset = Config.AllianceweekendCfg.powerUp.needAsset[Api.allianceWeekVoApi.getbuffValue()] ? Config.AllianceweekendCfg.powerUp.needAsset[Api.allianceWeekVoApi.getbuffValue()] : Config.AllianceweekendCfg.powerUp.needAsset[Config.AllianceweekendCfg.powerUp.needAsset.length - 1];
		this._needGem = Config.AllianceweekendCfg.powerUp.needGem[Api.allianceWeekVoApi.getbuffValue()] ? Config.AllianceweekendCfg.powerUp.needGem[Api.allianceWeekVoApi.getbuffValue()] : Config.AllianceweekendCfg.powerUp.needGem[Config.AllianceweekendCfg.powerUp.needGem.length - 1];

		let txtCfg = [
			{
				iconStr: "1_0_0",
				txt1: LanguageManager.getlocal("allianceWeekEndAdditionPopupView_weekEnd_txt1", [String(Api.allianceWeekVoApi.getNextAdditionBuff())]),
				txt2: LanguageManager.getlocal("allianceWeekEndAdditionPopupView_weekEnd_txt2", [String(this._needAsset)]),
				txt3: LanguageManager.getlocal("allianceWeekEndAdditionPopupView_weekEnd_txt3", [String(Api.allianceVoApi.getAllianceVo().wealth)]),
			},
			{
				iconStr: "1_0_0",
				txt1: LanguageManager.getlocal("allianceWeekEndAdditionPopupView_weekEnd_txt4", [String(Api.allianceWeekVoApi.getNextAdditionBuff())]),
				txt2: LanguageManager.getlocal("allianceWeekEndAdditionPopupView_weekEnd_txt5", [String(this._needGem)]),
				txt3: LanguageManager.getlocal("allianceWeekEndAdditionPopupView_weekEnd_txt6", [String(Api.playerVoApi.getPlayerGem())]),
			},
		]

		let startX = bg1.x + 10;
		let startY = bg1.y + 10;
		for (var index = 0; index < txtCfg.length; index++) {
			let element = txtCfg[index];

			let bg = BaseBitmap.create("public_9_probiginnerbg");
			bg.width = 500;
			bg.height = 126;
			bg.y = startY;
			bg.x = startX;
			this.addChildToContainer(bg);
			startY += bg.height + 10;

			let icon: BaseBitmap | BaseDisplayObjectContainer;
			if (index == 0) {
				icon = BaseBitmap.create("allianceview_treasure");
			}
			else {
				icon = GameData.getRewardItemIcons(element.iconStr)[0];
			}
			icon.x = bg.x + 10;
			icon.y = bg.y + 10;
			this.addChildToContainer(icon);

			let openBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceWeekEndAdditionPopupViewUseBtn", this.openBtnHandler, this, [index + 1]);
			openBtn.x = bg.x + bg.width - openBtn.width - 20;
			openBtn.y = bg.y + bg.height / 2 - openBtn.height / 2;
			this.addChildToContainer(openBtn);

			let tmpX = icon.x + icon.width + 10;
			let tmpY = icon.y + 5;
			for (var index2 = 1; index2 <= 3; index2++) {
				let txt = ComponentManager.getTextField(element["txt" + index2], 20);
				txt.x = tmpX;
				txt.y = tmpY;
				tmpY += txt.height + 10;
				this.addChildToContainer(txt);
				// if (index2 == 2) {
				// 	if (index == 0 && this._needAsset > Api.allianceVoApi.getAllianceVo().wealth) {
				// 		txt.text = LanguageManager.getlocal("allianceBossOpen_txt2_1", [String(this._needAsset)]);
				// 	}
				// 	if (index == 1 && this._needGem > Api.playerVoApi.getPlayerGem()) {
				// 		txt.text = LanguageManager.getlocal("allianceBossOpen_txt5_1", [String(this._needGem)]);
				// 	}
				// }
			}
		}

		let desc = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndAdditionPopupViewDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		desc.width = 500;
		desc.setPosition(bg1.x + bg1.width / 2 - desc.width / 2, bg1.y + bg1.height);
		this.addChildToContainer(desc);

		bg1.height += desc.height + 20;

	}

	protected openBtnHandler(params: any) {
		if(!Api.allianceWeekVoApi.checkBattleTime())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceWeekEndViewUnBattleBuffTip"));
			return;
		}

		if (Api.allianceWeekVoApi.getbuffValue() >= Config.AllianceweekendCfg.powerUp.limit) {
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceWeekEndAdditionPopupViewBuffMaxTip"));
			return;
		}
		let myAllVo = Api.allianceVoApi.getMyAllianceVo();
		let allVo = Api.allianceVoApi.getAllianceVo();
		// let bossCfg = Config.AlliancebossCfg.getAllianceCfgByLv(this._data )

		if (params == 1) {
			// if (myAllVo.po > 2) {
			// 	App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip2"));
			// 	return;
			// }
			if (allVo.wealth < this._needAsset) {
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip3"));
				return;
			}
		} else {
			// if (myAllVo.po > 3) {
			// 	App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip4"));
			// 	return;
			// }

			if (Api.playerVoApi.getPlayerGem() < this._needGem) {
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip5"));
				return;
			}
			/**
			 * 元宝消耗确认框
			 */

			let rewardStr = LanguageManager.getlocal("allianceWeekEndAdditionPopupView_costTip", [String(this._needGem)]);
			// let msg = LanguageManager.getlocal("adultMarryCancalMsg",[rewardStr])
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
				title: "itemUseConstPopupViewTitle",
				msg: rewardStr,
				callback: this.doOPenReq,
				handler: this,
				needCancel: true
			});
			return;
		}
		this.doOPenReq(params);
	}

	protected doOPenReq(params) {

		if (typeof (params) != "number") {
			params = 2;
		}
		if (Api.allianceWeekVoApi.getbuffValue() >= Config.AllianceweekendCfg.powerUp.limit) {
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceWeekEndAdditionPopupViewBuffMaxTip"));
			return;
		}
		NetManager.request(NetRequestConst.REQYEST_ALLIANCEWEEK_BUYBUFF, { openType: params });
		// if (params == 1) {
		// NetManager.request(NetRequestConst.REQYEST_ALLIANCEWEEK_BUYBUFF, { openType: params });
		// }
		// else {
		// 	NetManager.request(NetRequestConst.REQYEST_ALLIANCEWEEK_BUYBUFF, { bossId: this._data, openType: params });
		// }
	}

	/**购买buff 回调 */
	private buyBuffHandle(event: egret.Event) {
		if (event.data.ret) {
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceWeekEndAdditionPopupViewbuyBuffTip"));
			this.hide();
		}
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
		]);
	}

	public dispose(): void {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_BUYBUFF, this.buyBuffHandle, this);
		this._topTipTF = null;
		this._needAsset = null;
		this._needGem = null;

		super.dispose();
	}
}