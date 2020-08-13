/**
 * 门客皮肤碎片合成
 * author 张朝阳
 * date 2018/11/7
 * @class SkinComposePopupView
 * param: skinId 门客皮肤的ID
 */
class SkinComposePopupView extends PopupView {
	private _composeInfoList: { rewaradVo: RewardItemVo; icon: BaseDisplayObjectContainer; numTxt: BaseTextField; }[] = [];
	public constructor() {
		super();
	}
	protected initView(): void {
		App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_SERVANTPK_EXCHANGESERVANTSKIN, this.servantSkinHandle, this);
		let skinId = this.param.data.skinId;
		let servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
		// this._itemCfg=Config.ItemCfg.getItemCfgById(this.getId());
		let bg: BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 528;
		bg.height = 292;
		bg.setPosition((this.viewBg.width - bg.width) / 2, 10);
		this.addChildToContainer(bg);

		let txtBg: BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		txtBg.width = 502;
		txtBg.height = 142;
		txtBg.setPosition(bg.x + (bg.width - txtBg.width) / 2, bg.y + 10);
		this.addChildToContainer(txtBg);

		let icon: BaseDisplayObjectContainer = servantSkinCfg.getIconContainer();
		icon.setPosition(txtBg.x + 10, txtBg.y + (txtBg.height - icon.height) / 2);
		this.addChildToContainer(icon);

		let nameTxt: BaseTextField = ComponentManager.getTextField(servantSkinCfg.getSkinName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
		nameTxt.setPosition(icon.x + icon.width + 10, icon.y);
		this.addChildToContainer(nameTxt);

		let descTxt: BaseTextField = ComponentManager.getTextField(servantSkinCfg.getSkinDesc(), TextFieldConst.FONTSIZE_CONTENT_COMMON);
		descTxt.width = txtBg.width - icon.x + txtBg.x - icon.width - 10 - 10;
		descTxt.setPosition(nameTxt.x, nameTxt.y + nameTxt.height + 10);
		this.addChildToContainer(descTxt);

		let composeUseTxt: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("composeCostDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		composeUseTxt.setPosition(icon.x + 20, txtBg.y + txtBg.height + 10);
		this.addChildToContainer(composeUseTxt);

		let rewaradVoList = GameData.formatRewardItem(servantSkinCfg.exchangeItem);
		for (let i = 0; i < rewaradVoList.length; i++) {
			//icon
			let rewaradVo = rewaradVoList[i];
			let needItemCfg: Config.ItemItemCfg = Config.ItemCfg.getItemCfgById(rewaradVo.id);
			let icon: BaseDisplayObjectContainer = needItemCfg.getIconContainer(true);
			icon.setPosition(composeUseTxt.x + composeUseTxt.width + 10 + (icon.width + 5) * i, txtBg.y + txtBg.height + 5);
			this.addChildToContainer(icon);

			//txt
			let ownNum: number = Api.itemVoApi.getItemNumInfoVoById(rewaradVo.id);
			let needNum = rewaradVo.num;
			let str: string = "";
			str = "(" + ownNum + "/" + needNum + ")"
			if (ownNum >= needNum) {
				str = App.StringUtil.formatStringColor(str, TextFieldConst.COLOR_WARN_GREEN);
			}
			else {
				str = App.StringUtil.formatStringColor(str, TextFieldConst.COLOR_WARN_RED);
			}
			let numTxt: BaseTextField = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL);
			numTxt.setPosition(icon.x + icon.width / 2 - numTxt.width / 2, icon.y + icon.height + 2);
			this.addChildToContainer(numTxt);

			let composeInfo: { rewaradVo: RewardItemVo; icon: BaseDisplayObjectContainer; numTxt: BaseTextField; } = { rewaradVo: rewaradVo, icon: icon, numTxt: numTxt }
			this._composeInfoList.push(composeInfo);
		}


		let composeBtn: BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "composeBtn", this.composeHandler, this);
		composeBtn.setPosition(bg.x + (bg.width - composeBtn.width) / 2, bg.y + bg.height + 10);
		this.addChildToContainer(composeBtn);
	}
	private composeHandler() {
		let servantCfg = Config.ServantCfg.getServantItemById(this.param.data.servantId);

		if (!Api.servantVoApi.getServantObj(servantCfg.id)) {
			App.CommonUtil.showTip(LanguageManager.getlocal("crossserverNotServantTip", [servantCfg.name]));
			return;
		}
		let cfg = Config.ServantskinCfg.getServantSkinItemById(this.param.data.skinId);
		// if (Api.servantVoApi.isOwnSkinOfSkinId(this.param.data.skinId)) {
		if (!cfg.canExchangeItem()){
			App.CommonUtil.showTip(LanguageManager.getlocal("crossserverHaveServantSkin"));
			return;
		}
		let servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(this.param.data.skinId);
		let rewaradVoList = GameData.formatRewardItem(servantSkinCfg.exchangeItem);
		for (let i = 0; i < rewaradVoList.length; i++) {
			//icon
			let rewaradVo = rewaradVoList[i];
			let ownNum: number = Api.itemVoApi.getItemNumInfoVoById(rewaradVo.id);
			let needNum = rewaradVo.num;
			if (ownNum < needNum) {
				App.CommonUtil.showTip(LanguageManager.getlocal("crossserverNotServantSkinDebris"));
				return;
			}
		}
		let aidAndCode = this.param.data.aid + "-" + this.param.data.code;
		this.request(NetRequestConst.REQYEST_SERVANTPK_EXCHANGESERVANTSKIN, { activeId: aidAndCode, skinId: this.param.data.skinId })
	}
	private servantSkinHandle(event: egret.Event) {
		if (event && event.data && event.data.ret) {
			let rewards = event.data.data.data.rewards;
			let servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(this.param.data.skinId);
			for (let i = 0; i < this._composeInfoList.length; i++) {
				let composeInfo = this._composeInfoList[i];
				let ownNum: number = Api.itemVoApi.getItemNumInfoVoById(composeInfo.rewaradVo.id);
				let needNum = composeInfo.rewaradVo.num;
				let str: string = "";
				str = "(" + ownNum + "/" + needNum + ")"
				if (ownNum >= needNum) {
					str = App.StringUtil.formatStringColor(str, TextFieldConst.COLOR_WARN_GREEN);
				}
				else {
					str = App.StringUtil.formatStringColor(str, TextFieldConst.COLOR_WARN_RED);
				}
				composeInfo.numTxt.text = str;
				composeInfo.numTxt.setPosition(composeInfo.icon.x + composeInfo.icon.width / 2 - composeInfo.numTxt.width / 2, composeInfo.icon.y + composeInfo.icon.height + 2);
			}
			let rewardvo = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rewardvo);
		}
		else
		{
			// App.CommonUtil.showTip(LanguageManager.getlocal("crossserverServantSkinFailure"));
		}
		this.hide();
	}
	protected getTitleStr() {
		return "composePopupViewTitle";
	}
	public dispose(): void {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_SERVANTPK_EXCHANGESERVANTSKIN, this.servantSkinHandle, this);
		this._composeInfoList = [];
		super.dispose();
	}
}