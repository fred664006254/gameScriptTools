/**
  * 马超活动
  * author 张朝阳
  * date 2019/1/14
  * @class AcMaChaoView
  */
class AcMaChaoView extends AcCommonView {

	private _bg: BaseLoadBitmap = null;
	private _lingBg: BaseLoadBitmap = null;

	public constructor() {
		super();
	}

	public initView() {
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_MACHAOANI, this.playBgAni, this);
		let bottomBg = BaseLoadBitmap.create("servant_bottombg");
		bottomBg.width = GameConfig.stageWidth;
		bottomBg.height = GameConfig.stageHeigth - 75;
		bottomBg.y = GameConfig.stageHeigth - bottomBg.height - this.getTitleButtomY()
		this.addChildToContainer(bottomBg);

		this._bg = BaseLoadBitmap.create("acmachaoview_bg-" + this.getUiCode());
		this._bg.width = 680;
		this._bg.height = 1136;
		this._bg.setPosition(GameConfig.stageWidth / 2 - this._bg.width / 2, GameConfig.stageHeigth - this._bg.height - 120);
		this.addChildToContainer(this._bg);

		this._lingBg = BaseLoadBitmap.create("dragonboattarbg");
		this._lingBg.y = -70;
		this.addChildToContainer(this._lingBg);
		this.refreshView()
	}
	private refreshView() {
		let vo = <AcMaChaoVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		if (vo.isFree()) {
			this.addRedPoint(0);
		}
		else {
			this.removeRedPoint(0);
		}
		if (vo.isHaveTaskRedDot()) {
			this.addRedPoint(1);
		}
		else {
			this.removeRedPoint(1);
		}
		if (vo.isHaveRechargeRedDot()) {
			this.addRedPoint(2);
		}
		else {
			this.removeRedPoint(2);
		}
	}
	/**_bg 动画 */
	private playBgAni(event: egret.Event) {
		let type = event.data.type;
		egret.Tween.removeTweens(this._bg);
		this._bg.setPosition(GameConfig.stageWidth / 2 - this._bg.width / 2, GameConfig.stageHeigth - this._bg.height - 120);
		let posX = this._bg.x;
		let posY = this._bg.y;
		let value = 0;
		let offest = 0;
		if (type == 1) {
			value = 3;
		}
		else if (type == 2) {
			value = 6;
		}
		else if (type == 3) {
			value = 3;
		}
		else if (type == 4) {
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_MACHAOTAbANI, { offest: offest, type: type });
			return;
		}
		egret.Tween.get(this._bg, { loop: true }).call(() => {
			let random = value * Math.random();
			let op = Math.random() > 0.5 ? -1 : 1;
			offest = random * op
			this._bg.setPosition(posX + offest, posY + offest);
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_MACHAOTAbANI, { offest: offest, type: type });
		}, this).wait(5);
	}


	/**
	 * tabbar 的监听事件
	 */
	protected clickTabbarHandler(data: any): void {
		super.clickTabbarHandler(data);
		if (data.index == 0) {
			this._bg.setVisible(true);
		}
		else {
			this._bg.setVisible(false);
		}
	}
	/**
	 * 设置tabbar 的文本
	 */
	protected getTabbarTextArr(): Array<string> {
		return [
			"acMaChaoViewTab1-" + this.code,
			"acMaChaoViewTab2-" + this.code,
			"acMaChaoViewTab3-" + this.code,
		];
	}
	// protected getSoundBgName():string
	// {
	// 	return SoundConst.MUSIC_CHALLENGE;
	// }
	protected getTitleStr(): string {
		return "acMaChaoViewTitle-" + this.code;
	}
	protected getRuleInfo(): string {
		return "acMaChaoViewRule-" + this.code;
	}
	protected getProbablyInfo(): string {
		return "acMaChaoViewProbablyInfo-" + this.code;
	}
	protected getUiCode() {
		if (this.code == "1" || this.code == "2" || this.code == "3" || this.code == "4"|| this.code == "5" || this.code == "6"|| this.code == "7" || this.code == "8"
		|| this.code == "9" || this.code == "10")
		{
			return "1";
		}
		return this.code;

	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat(["servant_bottombg", "activity_charge_red", "accarnivalview_tab_red", "progress5", "progress3_bg",
			"acmachaoview-" + this.getUiCode(), "dragonboatrank_down", "dragonboatrank", "acmachaoviewidle", "acmachaohurteffect", "acmachaoassaulteffect",
			"critmyflash1", "critmyflash2", "critmyflash3", "critmyspeed1", "critmyspeed2", "critmyspeed3", "critmyspeed4", "critmyspeed5","acmazeview_textbg","acmachaoview_common_text"

		]);
	}
	public dispose() {
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_MACHAOANI, this.playBgAni, this);
		egret.Tween.removeTweens(this._bg);
		this._bg = null;
		this._lingBg = null;
		super.dispose();
	}

}