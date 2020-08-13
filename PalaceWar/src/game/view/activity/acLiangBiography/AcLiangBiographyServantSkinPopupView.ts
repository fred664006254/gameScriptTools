/**
 * 	诸葛亮 皮肤
 * author 张朝阳
 * date 2018/5/16
 * @class AcLiangBiographyServantSkinPopupView
 */
class AcLiangBiographyServantSkinPopupView extends PopupView {
	public constructor() {
		super();
	}
	private aid: any;
	private code: any;

	protected initView(): void {
		this.aid = this.param.data.aid;
		this.code = this.param.data.code;

		let acCfg = <Config.AcCfg.LiangBiographyCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let skinCfg = Config.ServantskinCfg.getServantSkinItemById(acCfg.show);
		let servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);

		let bg = BaseLoadBitmap.create("acchristmasview_rewardmidbg");
		bg.width = 544;
		bg.height = 400;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
		this.addChildToContainer(bg);


		let rect = new egret.Rectangle(0, 0, 544, 364);
		let maskContan = new BaseDisplayObjectContainer();
		maskContan.width = 544;
		maskContan.height = 364;
		maskContan.mask = rect;
		maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 30);
		this.addChildToContainer(maskContan);

		let boneName = undefined;
		if (skinCfg && skinCfg.bone) {
			boneName = skinCfg.bone + "_ske";
		}
		if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
			let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
			droWifeIcon.setScale(0.9);
			droWifeIcon.anchorOffsetY = droWifeIcon.height;
			droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
			droWifeIcon.x = maskContan.width / 2;
			droWifeIcon.y = maskContan.y + maskContan.height - 5;
			maskContan.addChild(droWifeIcon);
		}
		else {
			let skinImg = BaseLoadBitmap.create(skinCfg.body);
			skinImg.width = 405;
			skinImg.height = 467;
			skinImg.anchorOffsetY = skinImg.height;
			skinImg.anchorOffsetX = skinImg.width / 2;
			skinImg.setScale(0.87);
			skinImg.x = maskContan.width / 2;
			skinImg.y = maskContan.y + maskContan.height - 5;
			maskContan.addChild(skinImg);
		}
		let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
		topbg.width = 544;
		topbg.height = 36;
		topbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topbg.width / 2, 0);
		this.addChildToContainer(topbg);

		let topDesc = ComponentManager.getTextField(LanguageManager.getlocal("acLiangBiographyServantSkinPopupViewTopDesc-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
		this.addChildToContainer(topDesc);

		let skinnamebg = BaseBitmap.create("skin_detail_namebg");
		skinnamebg.setPosition(bg.x, bg.y + 20);
		this.addChildToContainer(skinnamebg);

		let skinNameTxt = ComponentManager.getTextField(skinCfg.getSkinName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
		skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
		this.addChildToContainer(skinNameTxt);

		let servantNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
		servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
		this.addChildToContainer(servantNameTxt);

		let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
		buttomBg.width = 530;
		buttomBg.height = 275+20;
		buttomBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
		this.addChildToContainer(buttomBg);

		let buttomBg2 = BaseBitmap.create("public_9_bg14");
		buttomBg2.width = 525;
		buttomBg2.height = 269+20;
		buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
		this.addChildToContainer(buttomBg2);

		let skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		skinTipTxt.width = 480;
		skinTipTxt.lineSpacing = 3;
		skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
		this.addChildToContainer(skinTipTxt);

		let addAbility = skinCfg.addAbility;
		for (let index = 0; index < addAbility.length; index++) {
			let bnode = new ServantChangeSkinBookItem();
			bnode.initItem(index,addAbility[index], [skinCfg.id]);
			bnode.setPosition(skinTipTxt.x -5 + index%2*245, skinTipTxt.y + skinTipTxt.height + 15+ Math.floor(index/2)*92);
			this.addChildToContainer(bnode);
		}

		// let buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acLiangBiographyServantSkinPopupViewButtomDesc-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		// buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 15);
		// this.addChildToContainer(buttomTipTxt);

	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"skin_detail_namebg","servant_star",
			"servant_infoPro1","servant_infoPro2","servant_infoPro3","servant_infoPro4",
		]);
	}
	protected getTitleStr(): string {
		return "acLiangBiographyServantSkinPopupViewTitle-" + this.param.data.code;
	}
	// protected getShowHeight() {
	// 	return 760;
	// }

	protected getBgExtraHeight():number
	{
		return 20;
	}

	public dispose(): void {
		this.aid = null;
		this.code = null;
		super.dispose();
	}
}