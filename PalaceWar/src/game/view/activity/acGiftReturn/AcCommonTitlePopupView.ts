/**
 * 活动通用头像框板子
 * author 张朝阳
 * date 2019/7/4
 * @class AcCommonTitlePopupView
 */
class AcCommonTitlePopupView extends PopupView {
	public constructor() {
		super();
	}

	protected initView(): void {

		let titleId = this.param.data.titleId;
		let topMsg = this.param.data.topMsg;

		let titleCfg = Config.TitleCfg.getTitleCfgById(titleId);

		let bg = BaseLoadBitmap.create("acgiftreturnview_common_titlebg");
		bg.width = 544;
		bg.height = 204;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 30);
		this.addChildToContainer(bg);


		let headCntainer = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(), titleCfg.id);
		headCntainer.setPosition(bg.x + bg.width / 2 - headCntainer.width / 2, bg.y + bg.height / 2 - headCntainer.height / 2 - 10);
		this.addChildToContainer(headCntainer);

		let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
		topbg.width = 544;
		topbg.height = 36;
		topbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topbg.width / 2, 0);
		this.addChildToContainer(topbg);

		let topDesc = ComponentManager.getTextField(topMsg, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
		this.addChildToContainer(topDesc);


		let titleNameTF = ComponentManager.getTextField(titleCfg.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleNameTF.setPosition(bg.x + bg.width / 2 - titleNameTF.width / 2, bg.y + 172 - titleNameTF.height / 2);
		this.addChildToContainer(titleNameTF);


		let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
		buttomBg.width = 530;
		buttomBg.height = 210;
		buttomBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
		this.addChildToContainer(buttomBg);

		let buttomBg2 = BaseBitmap.create("public_9_bg14");
		buttomBg2.width = 526;
		buttomBg2.height = 206;
		buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
		this.addChildToContainer(buttomBg2);

		let titleTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("headEffect" + titleCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		titleTipTxt.width = 480;
		titleTipTxt.lineSpacing = 3;
		titleTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - titleTipTxt.width / 2, buttomBg2.y + 20);
		this.addChildToContainer(titleTipTxt);

		let infoBg = BaseBitmap.create("public_9_managebg")
		infoBg.width = 510;
		infoBg.height = 74;
		infoBg.setPosition(buttomBg2.x + buttomBg2.width / 2 - infoBg.width / 2, titleTipTxt.y + titleTipTxt.height + 13);
		this.addChildToContainer(infoBg);

		for (let index = 0; index < 4; index++) {
			let desc = ComponentManager.getTextField(LanguageManager.getlocal("acTailAttrAdd" + String(index + 1), [String(titleCfg.effect1)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
			let posX = index % 2 == 0 ? infoBg.x + 15 : infoBg.x + 280;
			let posY = index > 1 ? infoBg.y + 41 : infoBg.y + 13;
			desc.setPosition(posX, posY);
			this.addChildToContainer(desc);
		}

		let buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCommonTitlePopupViewButtomDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 15);
		this.addChildToContainer(buttomTipTxt);

	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([

		]);
	}
	protected getTitleStr(): string {
		return "acCommonTitlePopupViewTitle";
	}
	public dispose(): void {
		super.dispose();
	}
}