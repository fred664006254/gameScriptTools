/**
 * 活动通用红颜板子
 * @author 张朝阳
 * date 2019/7/3
 * @class AcCommonWifePopupView
 */
class AcCommonWifePopupView extends PopupView {
	public constructor() {
		super();
	}

	protected initView(): void {


		// let servantCfg = Config.ServantCfg.getServantItemById("1050")

		let wifeId = this.param.data.wifeId;
		let wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);

		let servantCfg = Config.ServantCfg.getServantItemById(wifeCfg.servantId);

		let bg = BaseLoadBitmap.create("sevendayssignupview_infobg_7");
		bg.width = 544;
		bg.height = 462;;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
		this.addChildToContainer(bg);

		let rect = new egret.Rectangle(0, 0, 544, 462);
		let maskContan = new BaseDisplayObjectContainer();
		maskContan.width = 544;
		maskContan.height = 462;
		maskContan.mask = rect;
		maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y);
		this.addChildToContainer(maskContan);


		let boneName = "";
		if (wifeCfg && wifeCfg.bone) {
			boneName = wifeCfg.bone + "_ske";
		}
		if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon() && Api.wifeVoApi.isHaveBone(boneName)) {
			let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
			droWifeIcon.setScale(0.72);
			droWifeIcon.anchorOffsetY = droWifeIcon.height;
			droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
			droWifeIcon.x = maskContan.width / 2;
			droWifeIcon.y = maskContan.y + maskContan.height;
			maskContan.addChild(droWifeIcon);
		}
		else {
			let wifeImg = BaseLoadBitmap.create(wifeCfg.body);
			wifeImg.width = 640;
			wifeImg.height = 840;
			wifeImg.anchorOffsetY = wifeImg.height;
			wifeImg.anchorOffsetX = wifeImg.width / 2;
			wifeImg.setScale(0.52);
			wifeImg.x = maskContan.width / 2;
			wifeImg.y = maskContan.y + maskContan.height;
			maskContan.addChild(wifeImg);
		}

		let skinnamebg = BaseBitmap.create("skin_detail_namebg");
		skinnamebg.setPosition(bg.x, bg.y + 20);
		this.addChildToContainer(skinnamebg);

		let skinNameTxt = ComponentManager.getTextField(wifeCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
		skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 60 - skinNameTxt.height / 2);
		this.addChildToContainer(skinNameTxt);

		let buttomBg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
		buttomBg.width = 544;
		buttomBg.height = 36;
		buttomBg.setPosition(bg.x + bg.width / 2 - buttomBg.width / 2, bg.y + bg.height - buttomBg.height + 5);
		this.addChildToContainer(buttomBg);

		let charmTF = ComponentManager.getTextField(LanguageManager.getlocal("acCommonWifePopupViewcCharm", [String(wifeCfg.glamour)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		charmTF.setPosition(buttomBg.x + 70, buttomBg.y + buttomBg.height / 2 - charmTF.height / 2);
		this.addChildToContainer(charmTF);

		let servantTF = ComponentManager.getTextField(LanguageManager.getlocal("acCommonWifePopupViewcServant", [String(servantCfg.name)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		servantTF.setPosition(buttomBg.x + 310, buttomBg.y + buttomBg.height / 2 - servantTF.height / 2);
		this.addChildToContainer(servantTF);
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"skin_detail_namebg",
		]);
	}

	protected getTitleStr(): string {
		return "acCommonWifePopupViewTitle";
	}

	protected getShowHeight() {
		return 525+10;
	}
	public dispose(): void {
		super.dispose();
	}
}

