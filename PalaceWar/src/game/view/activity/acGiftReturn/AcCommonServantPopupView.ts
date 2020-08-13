/**
 * 活动通用门客板子
 * @author 张朝阳
 * date 2019/7/3
 * @class AcCommonServantPopupView
 */
class AcCommonServantPopupView extends PopupView {
	public constructor() {
		super();
	}

	protected initView(): void {


		// let servantCfg = Config.ServantCfg.getServantItemById("1050")

		let servantId = this.param.data.servantId;
		let servantCfg = Config.ServantCfg.getServantItemById(servantId);

		let bg = BaseLoadBitmap.create("sevendayssignupview_infobg_2");
		bg.width = 544;
		bg.height = 462;;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
		this.addChildToContainer(bg);

		let rect = new egret.Rectangle(0, 0, 544, 457);
		let maskContan = new BaseDisplayObjectContainer();
		maskContan.width = 544;
		maskContan.height = 457;
		maskContan.mask = rect;
		maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y);
		this.addChildToContainer(maskContan);

		let servantImg = BaseLoadBitmap.create(servantCfg.fullIcon);
		servantImg.width = 405;
		servantImg.height = 467;
		servantImg.anchorOffsetY = servantImg.height;
		servantImg.anchorOffsetX = servantImg.width / 2;
		servantImg.setScale(0.89);
		servantImg.x = maskContan.width / 2;
		servantImg.y = maskContan.y + maskContan.height;
		maskContan.addChild(servantImg);

		let skinnamebg = BaseBitmap.create("skin_detail_namebg");
		skinnamebg.setPosition(bg.x, bg.y + 20);
		this.addChildToContainer(skinnamebg);

		let skinNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
		skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 60 - skinNameTxt.height / 2);
		this.addChildToContainer(skinNameTxt);

		let buttomBg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
		buttomBg.width = 544;
		buttomBg.height = 36;
		buttomBg.setPosition(bg.x + bg.width / 2 - buttomBg.width / 2, bg.y + bg.height - buttomBg.height + 5);
		this.addChildToContainer(buttomBg);

		let aptitudeTF = ComponentManager.getTextField(LanguageManager.getlocal("acCommonServantPopupViewcAptitude", [String(Api.servantVoApi.getServantAptitude(servantCfg.id))]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		aptitudeTF.setPosition(buttomBg.x + 70, buttomBg.y + buttomBg.height / 2 - aptitudeTF.height / 2);
		this.addChildToContainer(aptitudeTF);

		let speciality = servantCfg.speciality;
		let str = "";
		for (let i = 0; i < speciality.length; i++) {
			str += LanguageManager.getlocal("servantInfo_speciality" + speciality[i]) + "，"
		}

		let servantTF = ComponentManager.getTextField(LanguageManager.getlocal("acCommonServantPopupViewcAdvantage", [str.substr(0, str.length - 1)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		servantTF.setPosition(buttomBg.x + 310, buttomBg.y + buttomBg.height / 2 - servantTF.height / 2);
		this.addChildToContainer(servantTF);

		//  let servantCfg: Config.ServantItemCfg = Config.ServantCfg.getServantItemById(clothesCfg.id);
            if(servantCfg.quality2)
			{	
				let cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
				cornerImg.x = 455;
				cornerImg.y = 313;
				cornerImg.setScale(1.3);
				this.addChildToContainer(cornerImg);
			}
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"skin_detail_namebg",
		]);
	}

	protected getTitleStr(): string {
		return "acCommonServantPopupViewTitle";
	}

	protected getShowHeight() {
		return 525+10;
	}
	public dispose(): void {
		super.dispose();
	}
}

