/**
 *门客板子
 * @author hyd
 * date 2019/8/8
 * @class AcMidAutumnPreviewPopupViewTab2
 */
class AcMidAutumnPreviewPopupViewTab2 extends AcCommonViewTab {
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
		let wifeId = '302';
		let servantId = this.vo.getRewardServant();
		let isWife = false;

		//skinCfg =  Config.ServantskinCfg.getServantSkinItemById(skinId);

		if (isWife) {
			let wifeCfg: Config.WifeItemCfg = Config.WifeCfg.getWifeCfgById(wifeId);
			let servantCfg: Config.ServantItemCfg = Config.ServantCfg.getServantItemById(wifeCfg.servantId);
			let bg = BaseLoadBitmap.create(`sevendayssignupview_infobg_7`);
			bg.width = 544;
			bg.height = 400;
			bg.setPosition(this.width / 2 - bg.width / 2, 36);
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
			if (App.CommonUtil.check_dragon() && Api.wifeVoApi.isHaveBone(boneName)) {
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
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wife, bg, [270, 469]);
			}
			else {
				wife = BaseLoadBitmap.create(wifeCfg.body);
				wife.setScale(0.5);
				wife.mask = new egret.Rectangle(0, 0, 640, 700);
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wife, bg, [125, 49]);
			}
			view.addChild(wife);

			let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
			topbg.width = 544;
			topbg.height = 40;
			topbg.setPosition(this.width / 2 - topbg.width / 2, 0);
			this.addChild(topbg);

			let topbgLine = BaseLoadBitmap.create("herosavebeauty_sideline");
			topbgLine.width = 544;
			topbgLine.setPosition(topbg.x, -2);
			this.addChild(topbgLine);

			let str = LanguageManager.getlocal("acMidAutumn_previewTab2_info",[]);
			//view.param.data.needTxt ? view.param.data.needTxt : `acCommonSkinGet2`, [view.param.data.need, skinCfg.name]
			let topDesc = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
			this.addChild(topDesc);

			let skinnamebg = BaseLoadBitmap.create("skin_detail_namebg");
			skinnamebg.setPosition(bg.x, bg.y + 20);
			skinnamebg.setScale(0.8);
			this.addChild(skinnamebg);

			let skinNameTxt = ComponentManager.getTextField(wifeCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
			skinNameTxt.width = 120;
			skinNameTxt.textAlign = egret.HorizontalAlign.CENTER;
			skinNameTxt.setPosition(30, 92);
			this.addChild(skinNameTxt);

			// let servantNameTxt = ComponentManager.getTextField(wifeCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
			// servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
			// this.addChild(servantNameTxt);

			let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
			buttomBg.width = 530;
			buttomBg.height = 210;
			buttomBg.setPosition(this.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
			this.addChild(buttomBg);

			let buttomBg2 = BaseBitmap.create("public_9_bg14");
			buttomBg2.width = 524;
			buttomBg2.height = 204;
			buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
			this.addChild(buttomBg2);

			// let skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeDesc_" + wifeId), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			// skinTipTxt.width = 480;
			// skinTipTxt.lineSpacing = 3;
			// skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
			// this.addChild(skinTipTxt);

			// let addAbility = skinCfg.addAbility;
			// for (let index = 0; index < addAbility.length; index++) {
			// 	let bnode = new ServantSkinBookScrollItem();
			// 	bnode.init(skinCfg.id, index, skinCfg.servantId, 450);
			// 	bnode.setPosition(skinTipTxt.x + 15, skinTipTxt.y + skinTipTxt.height + 15);
			// 	this.addChild(bnode);
			// }
			let descBg = BaseBitmap.create(`public_9_managebg`);
			descBg.width = 500;
			descBg.height = 95;
			descBg.setPosition(buttomBg.x + buttomBg.width / 2 - descBg.width / 2, buttomBg.y + buttomBg.height / 2 - descBg.height / 2 + 40);
			this.addChild(descBg);

			//初始魅力
			let initialCharmStr = LanguageManager.getlocal('acCommonWifePopupViewcCharm', [wifeCfg.glamour + '']);
			let initialCharmTxt = ComponentManager.getTextField(initialCharmStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			initialCharmTxt.setPosition(buttomBg.x + 30, buttomBg.y + 30);
			this.addChild(initialCharmTxt);
			//加成门客
			let servantAddStr = LanguageManager.getlocal('acCommonWifePopupViewcServant', [`<font color=0x3e9b00>${servantCfg.name}</font>`]);
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
			let servantCfg: Config.ServantItemCfg = Config.ServantCfg.getServantItemById(servantId);
			let dagonBonesName = Api.servantVoApi.getServantBoneId(servantId);

			let bg = BaseLoadBitmap.create(`acchristmasview_rewardmidbg`);
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
			let servant = null;
			if (servantCfg && dagonBonesName) {
				boneName = dagonBonesName + "_ske";
			}
			if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
				servant = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
				// servant.width = 354;
				// servant.height = 611;
				// wife.setAnchorOffset(-138.5, -610);
				// if(PlatformManager.checkIsThSp())
				// {
				//     wife.setAnchorOffset(-138.5, -650);
				// }
				servant.mask = new egret.Rectangle(-354, -609, 914, 510);
				servant.setScale(0.7);
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, servant, bg, [270, 469]);
			}
			else {
				servant  = BaseLoadBitmap.create(servantCfg.fullIcon);
				servant.width = 405;
				servant.height = 467;
				servant.setScale(0.8);
				servant.mask = new egret.Rectangle(0, 0, 405, 467);
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, servant, bg, [110, 20]);
			}
			view.addChild(servant);

			let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
			topbg.width = 544;
			topbg.height = 40;
			topbg.setPosition(this.width / 2 - topbg.width / 2 + 13, 56);
			this.addChild(topbg);

			let topbgLine = BaseLoadBitmap.create("herosavebeauty_sideline");
			topbgLine.width = 544;
			topbgLine.setPosition(topbg.x, topbg.y - 2);
			this.addChild(topbgLine);

			let servantNeed:number = 0;
			this.cfg.getBoxList().forEach(element => {
				if(element.id == '5'){
					servantNeed = element.needNum;
				}
			});
			//let str = LanguageManager.getlocal("acMidAutumn_previewTab2_info");
			let str = "";
			if (this.code == "5" || this.code == '6'){
				str = LanguageManager.getlocal("acMidAutumn_previewTab2_info-"+this.code,[servantNeed+'']);
			}
			else{
				str = LanguageManager.getlocal("acMidAutumn_previewTab2_info",[servantNeed+'']);
			}
			//view.param.data.needTxt ? view.param.data.needTxt : `acCommonSkinGet2`, [view.param.data.need, skinCfg.name]
			let topDesc = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2 - 2);
			this.addChild(topDesc);

			let skinnamebg = BaseLoadBitmap.create("skin_detail_namebg");
			skinnamebg.setPosition(bg.x, bg.y + 20);
			skinnamebg.setScale(0.9);
			this.addChild(skinnamebg);

			let skinNameTitle = ComponentManager.getTextField(LanguageManager.getlocal('servant'), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
			skinNameTitle.width = 120;
			skinNameTitle.textAlign = egret.HorizontalAlign.CENTER;
			skinNameTitle.setPosition(57, 138);
			this.addChild(skinNameTitle);

			let skinNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
			skinNameTxt.width = 120;
			skinNameTxt.textAlign = egret.HorizontalAlign.CENTER;
			skinNameTxt.setPosition(57, 162);
			this.addChild(skinNameTxt);


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

			//综合资质
			let aptitudeStr = LanguageManager.getlocal("acCommonServantPopupViewcAptitude", [Api.servantVoApi.getServantAptitude(servantId)+'']);
			let aptitudeTxt = ComponentManager.getTextField(aptitudeStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			aptitudeTxt.setPosition(buttomBg.x + 30, buttomBg.y + 30);
			this.addChild(aptitudeTxt);
			//门客特长
			let speciality = servantCfg.speciality;
			let specialityStr = "";
			for (let i = 0; i < speciality.length; i++) {
				specialityStr += LanguageManager.getlocal("servantInfo_speciality" + speciality[i]) + "，"
			}
			let servantTFStr = LanguageManager.getlocal('acCommonServantPopupViewcAdvantage', [specialityStr.substr(0, specialityStr.length - 1)]);
			let servantTF = ComponentManager.getTextField(servantTFStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			//let servantAddTxt = ComponentManager.getTextField(servantAddStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			servantTF.setPosition(buttomBg.x + 30, aptitudeTxt.y + 30);
			this.addChild(servantTF);

			let servantDescStr = LanguageManager.getlocal('acMidAutumn_previewTab2_servantDesc');
			if (this.code == "5" || this.code == '6'){
				servantDescStr = LanguageManager.getlocal('acMidAutumn_previewTab2_servantDesc-'+this.code);
			}
			let servantDescTxt = ComponentManager.getTextField(servantDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			servantDescTxt.lineSpacing = 3;
			servantDescTxt.width = descBg.width - 50;
			servantDescTxt.setPosition(descBg.x + 20, descBg.y + 20);
			this.addChild(servantDescTxt);

			if(servantCfg.quality2)
			{	
				let cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
				cornerImg.x = 475;
				cornerImg.y = 403;
				cornerImg.setScale(1.3);
				this.addChild(cornerImg);
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
