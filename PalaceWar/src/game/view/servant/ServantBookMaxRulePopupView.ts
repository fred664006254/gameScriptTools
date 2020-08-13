/**
  * 书籍详情
  * @author 张朝阳
  * date 2019/6/6
  * @class ServantBookMaxRulePopupView
  */
class ServantBookMaxRulePopupView extends PopupView {

	public constructor() {
		super();
	}
	public initView(): void {


		let bookMaxLv = this.param.data.bookMaxLv;
		let bookextraLevelMax = this.param.data.bookextraLevelMax;
		let bookextraLevelMax2 = this.param.data.bookextraLevelMax2;
		let booknowLv = this.param.data.booknowLv;
		let baseLv = booknowLv - bookextraLevelMax - bookextraLevelMax2;
		let maxLv = bookMaxLv - bookextraLevelMax - bookextraLevelMax2;

		let bg: BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 150;
		bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
		bg.y = 15;
		this.addChildToContainer(bg);

		let descTF1 = ComponentManager.getTextField(LanguageManager.getlocal("servantBookMaxRulePopupViewNowLv", [String(booknowLv), String(bookMaxLv)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		descTF1.setPosition(bg.x + 100, bg.y + 25);
		this.addChildToContainer(descTF1);

		let descTF2 = ComponentManager.getTextField(LanguageManager.getlocal("servantBookMaxRulePopupViewStyLv", [String(bookextraLevelMax)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		descTF2.setPosition(descTF1.x, descTF1.y + descTF1.height + 17);
		this.addChildToContainer(descTF2);

		let descTF3 = ComponentManager.getTextField(LanguageManager.getlocal("servantBookMaxRulePopupViewBaseLv", [String(baseLv), String(maxLv)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		descTF3.setPosition(descTF2.x, descTF2.y + descTF2.height + 17);
		this.addChildToContainer(descTF3);

		if(Api.switchVoApi.checkOpenWifeBattle()){
			let descTF4 = ComponentManager.getTextField(LanguageManager.getlocal("servantBookMaxRulePopupViewStyLv2", [String(bookextraLevelMax2)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
			descTF4.setPosition(descTF2.x, descTF2.y + descTF2.height + 17);
			this.addChildToContainer(descTF4);

			descTF3.setPosition(descTF4.x, descTF4.y + descTF4.height + 17);
			bg.height = 190;
		}

		let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
		btn.setPosition(bg.x + bg.width / 2 - btn.width / 2, bg.y + bg.height + 10);
		this.addChildToContainer(btn);


	}

	public dispose(): void {

		super.dispose();
	}
}