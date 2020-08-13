/**
  * 勤王除恶--战斗确认
  * @author 张朝阳
  * date 2019/4/17
  * @class AllianceWeekEndBattleTipBaseView
  */
class AllianceWeekEndBattleTipBaseView extends BaseView {

	public constructor() {
		super();
	}
	protected getCloseBtnName(): string {
		return null;
	}

	protected isTouchMaskClose(): boolean {
		return true;
	}

	private _isCheck: boolean = false;

	public initView() {

		let cancelCalback: Function = this.param.data.cancelCalback;
		let battleCalback: Function = this.param.data.battleCalback;
		let upCalback: Function = this.param.data.upCalback;
		let handle = this.param.data.handle

		let bg = BaseBitmap.create("public_9_wordbg2");//640 × 107
		bg.height = 280;
		bg.setPosition(0, GameConfig.stageHeigth / 2 - bg.height / 2);
		this.addChildToContainer(bg);

		let title = BaseBitmap.create("allianceweekendview_battle");
		title.setPosition(bg.x + bg.width / 2 - title.width / 2, bg.y - title.height / 2);
		this.addChildToContainer(title)

		let desc = ComponentManager.getTextField(LanguageManager.getlocal("AllianceWeekEndBattleTipBaseViewDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		desc.width = 525;
		desc.textAlign = egret.HorizontalAlign.CENTER;
		desc.lineSpacing = 10;
		desc.setPosition(title.x + title.width / 2 - desc.width / 2, title.y + title.height + 10);
		this.addChildToContainer(desc);

		let cancelBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "cancelBtn", () => {
			cancelCalback.apply(handle);
			this.closeView();
		}, this);
		cancelBtn.setPosition(desc.x, bg.y + bg.height - cancelBtn.height - 27);
		this.addChildToContainer(cancelBtn);

		let battleBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "AllianceWeekEndBattleTipBaseViewBattle", () => {
			battleCalback.apply(handle);
			this.closeView();
		}, this);
		battleBtn.setPosition(desc.x + desc.width - battleBtn.width, cancelBtn.y);
		this.addChildToContainer(battleBtn);
		let myAllVo = Api.allianceVoApi.getMyAllianceVo();
		if (myAllVo.po < 3) {

			let upBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE, "AllianceWeekEndBattleTipBaseViewUpPower", () => {
				upCalback.apply(handle);
				this.closeView();
			}, this);
			upBtn.setPosition(desc.x + desc.width / 2 - upBtn.width / 2, cancelBtn.y);
			this.addChildToContainer(upBtn);
		}
		else {
			cancelBtn.x = desc.x + desc.width / 4 - cancelBtn.width / 2;
			battleBtn.x = desc.x + desc.width / 4 * 3 - battleBtn.width / 2;
		}

		let check = BaseBitmap.create("activitypop_check1");
		check.setPosition(desc.x + 140, cancelBtn.y - check.height - 25);
		this.addChildToContainer(check);
		check.addTouchTap(() => {
			if (this._isCheck) {
				this._isCheck = false;
				check.setRes("activitypop_check1")
			}
			else {
				this._isCheck = true;
				check.setRes("activitypop_check2")
			}
		}, this);

		let tip = ComponentManager.getTextField(LanguageManager.getlocal("AllianceWeekEndBattleTipBaseViewTodayNoTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
		tip.setPosition(check.x + check.width + 15, check.y + check.height / 2 - tip.height / 2);
		this.addChildToContainer(tip);

	}

	public closeView() {
		if (this._isCheck) {
			let data = new Date(GameData.serverTime * 1000);
			let date = String(data.getMonth()) + String(data.getDate());
			LocalStorageManager.set(Api.playerVoApi.getPlayerID() + "allianceweekend", date);
		}
		this.hide();
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			'public_9_wordbg2', "allianceweekendview_battle", "activitypop_check1", "activitypop_check2"
		]);
	}
	public dispose() {
		this._isCheck = false;
		super.dispose();
	}

}