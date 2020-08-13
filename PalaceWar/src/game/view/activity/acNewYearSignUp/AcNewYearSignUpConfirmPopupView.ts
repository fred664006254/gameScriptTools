/**
 * 奖励二级弹框界面
 * @author 张朝阳
 * date 2018/12/22
 * @class AcNewYearSignUpConfirmPopupView
 */
class AcNewYearSignUpConfirmPopupView extends PopupView {

	private _confirmCallback: Function = null;
	private _cost = null;
	public constructor() {
		super();
	}

	public initView(): void {

		this._confirmCallback = this.param.data.callbackHandle;

		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 530;
		bg.height = 150;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 20);
		this.addChildToContainer(bg);

		let desc1 = ComponentManager.getTextField(LanguageManager.getlocal("acNewYearSignUpConfirmPopupViewDesc",[String(this.param.data.cost)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		desc1.lineSpacing = 3;
		desc1.width = 500;
		desc1.textAlign = egret.HorizontalAlign.CENTER;
		desc1.setPosition(bg.x + bg.width / 2 - desc1.width / 2, bg.y + bg.height / 2 - desc1.height / 2)
		this.addChildToContainer(desc1);

		let cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "cancelBtn", this.hide, this);
		cancelBtn.setPosition(this.viewBg.x + 50, bg.y + bg.height + 12);
		this.addChildToContainer(cancelBtn);

		let confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.confirmBtnClick, this);
		confirmBtn.setPosition(this.viewBg.x + this.viewBg.width - confirmBtn.width - 50, bg.y + bg.height + 12);
		this.addChildToContainer(confirmBtn);

	}
	private confirmBtnClick() {
		App.LogUtil.log("confirmBtnClick: "+Api.playerVoApi.getPlayerGem() + " cose:"+this.param.data.cost);
		if (Api.playerVoApi.getPlayerGem() < this.param.data.cost) {
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"))
			this.hide();
			return;
		}
		if (this._confirmCallback) {
			this._confirmCallback.apply(this.param.data.handle)
		}
		this.hide();
	}
	protected getTitleStr() {
		return "itemUseConstPopupViewTitle";
	}
	public dispose(): void {
		this._confirmCallback = null;
		super.dispose();
	}
}