/**
 * 衣装预览 红颜
 * @author shaoliang
 * date 2019/5/7
 * @class ChoshespreviewWifeInfoPopupView
 */
class ChoshespreviewWifeInfoPopupView extends PopupView {
	public constructor() {
		super();
	}
	protected initView(): void {

        let wifeId:string = this.param.data.wid;

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

		let wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId)

		let boneName = "";
		if (wifeCfg && wifeCfg.bone) {
			boneName = wifeCfg.bone + "_ske";
		}
		if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
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



		let nameTips = BaseLoadBitmap.create("clothespreview_wifename"+wifeId);
		nameTips.setPosition(bg.x + 5, bg.y + 15);
		this.addChildToContainer(nameTips);

		let buttomTip = BaseLoadBitmap.create("clothespreview_wifetip"+wifeId);
		buttomTip.width = 534;
		buttomTip.height = 33;
		buttomTip.setPosition(bg.x + bg.width / 2 - buttomTip.width / 2, bg.y + bg.height - buttomTip.height);
		this.addChildToContainer(buttomTip);
	}

	protected getTitleStr(): string {
		return "sevenDaysSignUpWifeInfoPopupViewTitle";
	}

	protected getShowHeight() {
		return 525+10;
	}

	public dispose(): void {
		super.dispose();
	}
}