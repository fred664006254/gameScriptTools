/**
  * 勤王除恶官报
  * @author 张朝阳
  * date 2019/4/15
  * @class AllianceWeekEndReportView
  */

class AllianceWeekEndReportView extends BaseView {

	public constructor() {
		super();
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"alliancepurpose",
		]);
	}


	protected getTitleBgName(): string {
		return null;
	}

	protected getTitleStr(): string {
		return null;
	}

	protected getBgName(): string {
		return "public_9_bg8";
	}

	protected initView(): void {
		this.addTouchTap(this.touchTap, this, null);
		this.viewBg.touchEnabled = true;

		let lookBg: BaseBitmap = BaseBitmap.create("public_9_wordbg");
		// lookBg.scaleX = 2;
		// lookBg.height = 300;
		this.addChild(lookBg);

		let titlebg = BaseBitmap.create("alliancepurpose");
		this.addChild(titlebg);

		let param = this.param.data;
		//名字
		let nameTf: BaseTextField = ComponentManager.getTextField(`${param.title}`, TextFieldConst.FONTSIZE_TITLE_SMALL);
		nameTf.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		this.addChild(nameTf);

		let nameLine = BaseBitmap.create("public_line3");
		this.addChild(nameLine);


		let descTf: BaseTextField = ComponentManager.getTextField(`${param.msg}`, TextFieldConst.FONTSIZE_CONTENT_SMALL);
		descTf.textColor = TextFieldConst.COLOR_WHITE;
		descTf.lineSpacing = 18;
		descTf.width = lookBg.width - 60
		this.addChild(descTf);

		let nextTf: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("clickContinue"), TextFieldConst.FONTSIZE_TITLE_SMALL);
		nextTf.textColor = TextFieldConst.COLOR_WARN_GREEN;
		nextTf.width = lookBg.width - 60
		this.addChild(nextTf);

		lookBg.height = nameTf.textHeight + descTf.textHeight + 140;
		lookBg.setPosition(GameConfig.stageWidth / 2 - lookBg.width / 2, GameConfig.stageHeigth / 2 - lookBg.height / 2);
		titlebg.setPosition(lookBg.x + lookBg.width / 2 - titlebg.width / 2, lookBg.y - titlebg.height / 2);
		nameTf.setPosition(lookBg.width / 2 - nameTf.width / 2, lookBg.y + 50);
		nameLine.width += nameTf.width + 40;
		nameLine.setPosition(nameTf.x + nameTf.width / 2 - nameLine.width / 2, nameTf.y + nameTf.height / 2 - nameLine.height / 2);
		descTf.setPosition(lookBg.width / 2 - descTf.width / 2, nameTf.y + nameTf.textHeight + 30);
		nextTf.setPosition(470, lookBg.y + lookBg.height - nextTf.textHeight - 10);
	}

	private touchTap(): void {
		this.hide();
	}

	public dispose(): void {
		// this._childId = null;
		super.dispose();
	}

}