/**
 * 红颜板子
 * @author hyd
 * date 2019/8/8
 * @class AcMidAutumnPreviewPopupViewTab1
 */
class AcMidAutumnPreviewPopupViewTab1 extends AcCommonViewTab {
	//AcCommonViewTab
	public constructor() {
		super();
		egret.callLater(this.initView, this);
	}
	private get cfg() : Config.AcCfg.MidAutumnCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

	protected initView(): void {

		let view = this;
		this.width = 544;
		this.height = 780;
		//let skinId = '1012'; //view.param.data.skinId;
		let wifeId = this.vo.getRewardWife();
		let skinCfg: any; //= Config.WifeskinCfg.getWifeCfgById(skinId);
		let isWife = true;

		//skinCfg =  Config.ServantskinCfg.getServantSkinItemById(skinId);
		if (isWife) {
			let wifeCfg: Config.WifeItemCfg = Config.WifeCfg.getWifeCfgById(wifeId);
			let servantCfg: Config.ServantItemCfg = Config.ServantCfg.getServantItemById(wifeCfg.servantId);
			let bg = BaseLoadBitmap.create(`sevendayssignupview_infobg_7`);
			bg.width = 544;
			bg.height = 400;
			bg.setPosition(this.width / 2 - bg.width / 2 + 13, 90);
			this.addChild(bg);

			let rect = new egret.Rectangle(0, 0, 544, 368);
			let maskContan = new BaseDisplayObjectContainer();
			maskContan.width = 544;
			maskContan.height = 368;
			maskContan.mask = rect;
			maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 30);
			this.addChild(maskContan);

			let boneName = undefined;
			let wife = null;
			if (wifeCfg && wifeCfg.bone) {
				boneName = wifeCfg.bone + "_ske";
			}
			if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
				wife = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
				wife.width = 354;
				wife.height = 611;
				// wife.setAnchorOffset(-138.5, -610);
				// if(PlatformManager.checkIsThSp())
				// {
				//     wife.setAnchorOffset(-138.5, -650);
				// }
				wife.mask = new egret.Rectangle(-354, -609, 914, 510);
				wife.setScale(0.7);
				if (this.code == "5" || this.code == "6"){
					wife.setScale(0.8);
					App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wife, bg, [270, 478]);
				}
				else{
					wife.setScale(0.7);
					App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wife, bg, [270, 468]);
				}	
			}
			else {
				wife = BaseLoadBitmap.create(wifeCfg.body);
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wife, bg, [125, 49]);
				wife.mask = new egret.Rectangle(0, 0, 640, 700);
			}
			view.addChild(wife);

			let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
			topbg.width = 544;
			topbg.height = 40;
			topbg.setPosition(this.width / 2 - topbg.width / 2 + 13, 56);
			this.addChild(topbg);

			let topbgLine = BaseLoadBitmap.create("herosavebeauty_sideline");
			topbgLine.width = 544;
			topbgLine.setPosition(topbg.x, topbg.y - 2);
			this.addChild(topbgLine);
			// let cfg = <Config.AcCfg.MidAutumnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);

			//let str = LanguageManager.getlocal("acMidAutumn_previewTab1_info");
			let wifeNeed:number = 0;
			this.cfg.rechargeList().forEach(element => {
				if(element.id == '6'){
					wifeNeed = element.needGem;
				}
			});
			let str = "";
			if (this.code == "5" || this.code == "6"){
				str = LanguageManager.getlocal("acMidAutumn_previewTab1_info-"+this.code,[wifeNeed+'']);
			}
			else{
				str = LanguageManager.getlocal("acMidAutumn_previewTab1_info",[wifeNeed+'']);
			}
			//view.param.data.needTxt ? view.param.data.needTxt : `acCommonSkinGet2`, [view.param.data.need, skinCfg.name]
			let topDesc = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2 - 2);
			this.addChild(topDesc);

			let skinnamebg = BaseLoadBitmap.create("skin_detail_namebg");
			skinnamebg.setPosition(bg.x, bg.y + 20);
			skinnamebg.setScale(0.9);
			this.addChild(skinnamebg);

			let skinNameTitle = ComponentManager.getTextField(LanguageManager.getlocal('wife') , TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
			skinNameTitle.width = 120;
			skinNameTitle.textAlign = egret.HorizontalAlign.CENTER;
			skinNameTitle.setPosition(57, 138);
			this.addChild(skinNameTitle);

			let skinNameTxt = ComponentManager.getTextField(wifeCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
			skinNameTxt.width = 120;
			skinNameTxt.textAlign = egret.HorizontalAlign.CENTER;
			skinNameTxt.setPosition(57, 162);
			this.addChild(skinNameTxt);

			// let servantNameTxt = ComponentManager.getTextField(wifeCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
			// servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
			// this.addChild(servantNameTxt);

			let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
			buttomBg.width = 530;
			buttomBg.height = 210;
			buttomBg.setPosition(this.width / 2 - buttomBg.width / 2 + 13, bg.y + bg.height + 5);
			this.addChild(buttomBg);

			let buttomBg2 = BaseBitmap.create("public_9_bg14");
			buttomBg2.width = 524;
			buttomBg2.height = 204;
			buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
			this.addChild(buttomBg2);

			let descBg = BaseBitmap.create(`public_9_managebg`);
			descBg.width = 500;
			descBg.height = 95;
			descBg.setPosition(buttomBg.x + buttomBg.width / 2 - descBg.width / 2, buttomBg.y + buttomBg.height / 2 - descBg.height / 2 + 40);
			this.addChild(descBg);

			//let addValues = Api.wifeSkinVoApi.getWifeSkinProAdd(skinId, true);
			//初始魅力
			let initialCharmStr = LanguageManager.getlocal('acCommonWifePopupViewcCharm', [wifeCfg.glamour + '']);
			let initialCharmTxt = ComponentManager.getTextField(initialCharmStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			initialCharmTxt.setPosition(buttomBg.x + 30, buttomBg.y + 30);
			this.addChild(initialCharmTxt);
			//加成门客
			let servantAddStr = LanguageManager.getlocal('acCommonWifePopupViewcServant', [servantCfg.name]);
			let servantAddTxt = ComponentManager.getTextField(servantAddStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			servantAddTxt.setPosition(buttomBg.x + 30, initialCharmTxt.y + 30);
			this.addChild(servantAddTxt);

			let wifeDescStr = LanguageManager.getlocal('wifeDesc_' + wifeId);
			let wifeDescTxt = ComponentManager.getTextField(wifeDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			wifeDescTxt.lineSpacing = 3;
			wifeDescTxt.width = descBg.width - 50;
			wifeDescTxt.setPosition(descBg.x + 20, descBg.y + 20);
			this.addChild(wifeDescTxt);
		}
		else {
			let view = this;
			let servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);

			let bg = BaseLoadBitmap.create(`luckdrawshowbg-1`);
			bg.width = 544;
			bg.height = 400;
			bg.setPosition(this.width / 2 - bg.width / 2, 0);
			this.addChild(bg);


			let rect = new egret.Rectangle(0, 0, 544, 364);
			let maskContan = new BaseDisplayObjectContainer();
			maskContan.width = 544;
			maskContan.height = 364;
			maskContan.mask = rect;
			maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 30);
			this.addChild(maskContan);

			let boneName = undefined;
			if (skinCfg && skinCfg.bone) {
				boneName = skinCfg.bone + "_ske";
			}
			if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
				let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
				droWifeIcon.scaleY = 0.9;
				droWifeIcon.scaleX = 0.9;
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
			topbg.setPosition(this.width / 2 - topbg.width / 2, 0);
			this.addChild(topbg);

			let topDesc = ComponentManager.getTextField(LanguageManager.getlocal(view.param.data.needTxt ? view.param.data.needTxt : `acCommonSkinGet1`, [view.param.data.need, skinCfg.name]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
			this.addChild(topDesc);

			let skinnamebg = BaseBitmap.create("skin_detail_namebg");
			skinnamebg.setPosition(bg.x, bg.y + 20);
			this.addChild(skinnamebg);

			let skinNameTxt = ComponentManager.getTextField(skinCfg.getSkinName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
			skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
			this.addChild(skinNameTxt);

			let servantNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
			servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
			this.addChild(servantNameTxt);

			let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
			buttomBg.width = 530;
			buttomBg.height = 275 + 20;
			buttomBg.setPosition(this.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
			this.addChild(buttomBg);

			let buttomBg2 = BaseBitmap.create("public_9_bg14");
			buttomBg2.width = 525;
			buttomBg2.height = 269 + 20;
			buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
			this.addChild(buttomBg2);

			let skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			skinTipTxt.width = 480;
			skinTipTxt.lineSpacing = 3;
			skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
			this.addChild(skinTipTxt);

			let addAbility = skinCfg.addAbility;
			for (let index = 0; index < addAbility.length; index++) {
				let bnode = new ServantChangeSkinBookItem();
				bnode.initItem(index, addAbility[index], [skinCfg.id]);
				bnode.setPosition(skinTipTxt.x - 5 + index % 2 * 245, skinTipTxt.y + skinTipTxt.height + 15 + Math.floor(index / 2) * 92);
				this.addChild(bnode);
			}
		}
	}

	private get vo() : AcMidAutumnVo{
        return <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

	public dispose(): void {
		super.dispose();
	}
}
