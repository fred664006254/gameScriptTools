/**
  * 勤王除恶战斗结果战报
  * @author 张朝阳
  * date 2019/4/17
  * @class AllianceWeekEndBattleReportView
  */

class AllianceWeekEndBattleReportView extends BaseView {

	public constructor() {
		super();
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"allianceweekendview_result",
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

		let param = this.param.data;

		let damage = this.param.data.damage;
		let score = this.param.data.score;
		let isAuto = this.param.data.isAuto;

		let lookBg: BaseBitmap = BaseBitmap.create("public_9_wordbg");
		this.addChild(lookBg);

		let titlebg = BaseBitmap.create("allianceweekendview_result");
		this.addChild(titlebg);


		//名字

		let damageTF: BaseTextField = ComponentManager.getTextField(damage, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		damageTF.lineSpacing = 18;
		damageTF.textAlign = egret.HorizontalAlign.CENTER;
		damageTF.width = 500;
		this.addChild(damageTF);



		let scoreTF: BaseTextField = ComponentManager.getTextField(score, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		scoreTF.lineSpacing = 18;
		scoreTF.textAlign = egret.HorizontalAlign.CENTER;
		scoreTF.width = 500;
		this.addChild(scoreTF);


		lookBg.height = damageTF.height + scoreTF.height + 120;
		lookBg.setPosition(GameConfig.stageWidth / 2 - lookBg.width / 2, GameConfig.stageHeigth / 2 - lookBg.height / 2);
		titlebg.setPosition(lookBg.x + lookBg.width / 2 - titlebg.width / 2, lookBg.y - titlebg.height / 2);
		damageTF.setPosition(lookBg.width / 2 - damageTF.width / 2, lookBg.y + 60);
		scoreTF.setPosition(lookBg.width / 2 - scoreTF.width / 2, damageTF.y + damageTF.textHeight + 20);
		if (isAuto) {
			egret.Tween.get(this).wait(1000).call(this.touchTap, this);
		}
	}

	private touchTap(): void {
		this.hide();
	}

	public dispose(): void {
		egret.Tween.removeTweens(this);
		super.dispose();
	}

}