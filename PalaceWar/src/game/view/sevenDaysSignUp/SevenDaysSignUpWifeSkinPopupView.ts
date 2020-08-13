/**
 * 七日好礼红颜info
 * @author 张朝阳
 * date 2019/3/21
 * @class SevenDaysSignUpWifeInfoPopupView
 */
class SevenDaysSignUpWifeSkinPopupView extends PopupView {
	public constructor() {
		super();
	}
	protected initView(): void {
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

		let wid = '3022';
		if(PlatformManager.checkIsRuSp()){
			wid = `3022`;
		}
		let wifeCfg = Config.WifeskinCfg.getWifeCfgById(wid)
		

		let boneName = "";
		if (wifeCfg && wifeCfg.bone) {
			boneName = wifeCfg.bone + "_ske";
		}
		if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
			let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
			droWifeIcon.setScale(0.75);
			droWifeIcon.anchorOffsetY = droWifeIcon.height;
			droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
			droWifeIcon.x = maskContan.width / 2;
			droWifeIcon.y = maskContan.y + maskContan.height+15;
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


		let res = `sevendayssignupview_namebg_7`;
		if(PlatformManager.checkIsRuSp()){
			res += `sevendayssignupview_namebg_7_ru`;
		}
		let nameTips = BaseLoadBitmap.create(res);
		nameTips.setPosition(bg.x + 5, bg.y + 15);
		this.addChildToContainer(nameTips);

		let descres = `sevendayssignupview_descbg_7`;
		if(PlatformManager.checkIsRuSp()){
			descres += `sevendayssignupview_descbg_7_ru`;
		}

		let buttomTip = BaseLoadBitmap.create(descres);
		buttomTip.width = 534;
		buttomTip.height = 33;
		buttomTip.setPosition(bg.x + bg.width / 2 - buttomTip.width / 2, bg.y + bg.height - buttomTip.height);
		this.addChildToContainer(buttomTip);
	}

	protected getResourceList(): string[] {
		let arr = [
		];
		if(PlatformManager.checkIsRuSp()){
			arr.push(`sevendayssignupview_namebg_7_ru`,`sevendayssignupview_descbg_7_ru`);
		}
		return super.getResourceList().concat(arr);
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

