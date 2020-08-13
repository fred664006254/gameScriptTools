/**
 * 	计策使用界面
 * @author 张朝阳
 * date 2018/10/16
 * @class AllianceWarUsePlanPopupView
 */
class AllianceWarUsePlanPopupView extends PopupView {

	public constructor() {
		super();
	}
	public initView(): void {
		App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSTRATAGEM, this.hide, this);

		let itemCfg: Config.ItemItemCfg = this.param.data.itemCfg;
		let itemNum: number = this.param.data.itemNum;
		let cfgId = this.param.data.cfgId;

		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 515;
		bg.height = 300;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this.viewBg.y + 15);
		this.addChildToContainer(bg);

		let itemDB = GameData.getItemIcon(itemCfg);
		itemDB.setPosition(bg.x + bg.width / 2 - itemDB.width / 2, bg.y + 25);
		this.addChildToContainer(itemDB);

		if (itemNum && itemNum > 1) {
			let itemNumTxt = ComponentManager.getTextField(String(itemNum), TextFieldConst.FONTSIZE_CONTENT_SMALL);
			itemNumTxt.setPosition(itemDB.x + itemDB.width - 6 - itemNumTxt.width, itemDB.y + itemDB.height - 6 - itemNumTxt.height);
			this.addChildToContainer(itemNumTxt);
		}

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarUsePlanPopupViewTip", [itemCfg.name]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		if (tipTxt.width > 480) {
			tipTxt.width = 480;
		}
		tipTxt.textAlign = egret.HorizontalAlign.CENTER;
		tipTxt.setPosition(bg.x + bg.width / 2 - tipTxt.width / 2, itemDB.y + itemDB.height + 20);
		this.addChildToContainer(tipTxt)

		let cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "cancelBtn", this.hide, this);
		cancelBtn.setPosition(bg.x + 30, bg.y + bg.height - cancelBtn.height - 15);
		this.addChildToContainer(cancelBtn);

		let confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", () => {

			let info = Api.allianceWarVoApi.getMyInfo();
			if (info && info.servant != null) {

				if(itemNum <= 0)
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarPlanTip2"));
					return;
				}

				if (itemCfg.id != "2201") {
					this.request(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSTRATAGEM, { straId: cfgId });
				}
				else {
					let servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(1);
					let servantInfoList: { servantId: string, servantName: string, level: number, fightValue: number, qualityBoxImgPath: string, halfImgPath: string ,banishSt:number}[] = [];
					for (let key in servantInfoVoList) {
						let servantState = Api.allianceWarVoApi.getServantState(servantInfoVoList[key].servantId);
						if(servantState)
						{
							continue;
						}
						let item = servantInfoVoList[key];
						let fightValue = Api.servantVoApi.getServantCombatWithIdContentsWeapon(item.servantId,3);//Api.servantVoApi.getServantCombatWithId(item.servantId)
						let servantInfo = { servantId: item.servantId, servantName: item.servantName, level: item.level, fightValue: fightValue, qualityBoxImgPath: item.qualityBoxImgPath, halfImgPath: item.halfImgPath,banishSt:item.banishSt };
						servantInfoList.push(servantInfo);
					}
					servantInfoList.sort((a, b) => {
						return b.fightValue - a.fightValue;
					});
					ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWARSELECTSERVANTPOPUPVIEW,{servantList:servantInfoList,cfgId:cfgId});
					this.hide();
				}


			}
			else {
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarPlanTip"));
			}


		}, this);
		confirmBtn.setPosition(bg.x + bg.width - confirmBtn.width - 30, cancelBtn.y);
		this.addChildToContainer(confirmBtn);


	}
	/**
	 * 备战期结束关闭界面
	 */
	protected tick() {
		let periodType = Api.allianceWarVoApi.getWarPeriod();
		if(periodType != 1)
		{
			this.hide();
			return;
		}
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"acsevenitemzshi", "acsevenitemtopbg",
		]);
	}
	protected getTitleStr() {

		return "allianceWarUsePlanPopupViewTitle";
	}
	public dispose(): void {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSTRATAGEM, this.hide, this);
		super.dispose();
	}
}