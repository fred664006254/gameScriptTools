/**
  * 勤王除恶选择门客Item
  * @author 张朝阳
  * date 2019/4/17
 * @class AllianceWeekEndSelectServantScrollItem
 */
class AllianceWeekEndSelectServantScrollItem extends ScrollListItem {
	public constructor() {
		super();
	}
	protected initItem(index: number, data: any) {

		let servantInfoVo: ServantInfoVo = data.servantInfoVo;


		let bg: BaseBitmap = BaseBitmap.create("public_9_bg1");
		bg.width = 500;
		bg.height = 120;
		this.addChild(bg);
		let temW: number = 100;

		let iconBgBt: BaseBitmap = BaseLoadBitmap.create(servantInfoVo.qualityBoxImgPath);
		iconBgBt.x = 10;
		iconBgBt.y = 10;
		this.addChild(iconBgBt);
		iconBgBt.scaleX = temW / 194;
		iconBgBt.scaleY = temW / 192;

		let iconBt: BaseBitmap = BaseLoadBitmap.create(servantInfoVo.halfImgPath);
		iconBt.x = iconBgBt.x + 5;
		iconBt.y = iconBgBt.y + 5;
		this.addChild(iconBt);
		iconBt.scaleX = (temW - 10) / 180;
		iconBt.scaleY = (temW - 10) / 177;

		if (servantInfoVo.isServantExile()) {
			let exileBM = BaseBitmap.create("public_servantexilelogo");
			exileBM.setScale(iconBgBt.scaleX)
			exileBM.setPosition(iconBgBt.x + 194 * iconBgBt.scaleX - exileBM.width * iconBgBt.scaleX, iconBgBt.y);
			this.addChild(exileBM);
		}


		let nameTF: BaseTextField = ComponentManager.getTextField(servantInfoVo.servantName, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		nameTF.x = 120;
		nameTF.y = 20;
		this.addChild(nameTF);

		let levelTF: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndSelectServantItemLevel", [String(servantInfoVo.level)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		levelTF.x = 120;
		levelTF.y = 50;
		this.addChild(levelTF);

		let attrTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndSelectServantItemCombat", [data.servantCombat]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		attrTF.x = 120;
		attrTF.y = 80;
		this.addChild(attrTF);


		if (Api.myAllianceWeekVoApi.checkServantState(servantInfoVo.servantId)) {
			if (Api.myAllianceWeekVoApi.checkServantRecover(servantInfoVo.servantId)) {
				let recoverBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "allianceWeekEndSelectServantItemRecover", () => {
					let itemId: string = Config.AllianceweekendCfg.needItem;
					let hasNum: number = Api.itemVoApi.getItemNumInfoVoById(Number(itemId));
					let itemUseCount = 1;
					let itemCount = hasNum;
					let itemCfg = Config.ItemCfg.getItemCfgById(Number(itemId));
					let message: string = LanguageManager.getlocal("useItemMsg", [itemCfg.name + "x" + itemUseCount, LanguageManager.getlocal("dailybossRecoveryBattleNumDesc")]);
					ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, {
						confirmCallback: () => {
							NetManager.request(NetRequestConst.REQYEST_ALLIANCEWEEK_RECOVER, { servantId: servantInfoVo.servantId });
						}, handler: this, icon: itemCfg.icon, iconBg: itemCfg.iconBg, num: itemCount, useNum: itemUseCount, msg: message, id: itemId
					});
				}, this)
				recoverBtn.setPosition(bg.x + bg.width - recoverBtn.width - 10, bg.y + bg.height / 2 - recoverBtn.height / 2);
				this.addChild(recoverBtn);
			}
			else {
				let battleBM = BaseBitmap.create("boss_gotowar");
				battleBM.setPosition(bg.x + bg.width - 85 - battleBM.width / 2, bg.y + bg.height / 2 - battleBM.height / 2);
				this.addChild(battleBM);
			}

		}
		else {
			let goFightBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "allianceWeekEndSelectServantItemGoFight", () => {
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ALLIANCEWEEKEND_SELECTSERVANT, { servantId: servantInfoVo.servantId });
			}, this)
			goFightBtn.setPosition(bg.x + bg.width - goFightBtn.width - 10, bg.y + bg.height / 2 - goFightBtn.height / 2);
			this.addChild(goFightBtn);
		}
	}

	public dispose(): void {
		super.dispose();
	}
}