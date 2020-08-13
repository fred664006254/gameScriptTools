/**
  * 筑阁祭天活动Skin view
  * @author 张朝阳
  * date 2019/5/24
 * @class AcWorshipSkinRewardPopupView
 */
class AcWorshipSkinRewardPopupView extends PopupView {


	public constructor() {
		super();
	}
	public initView(): void {
	}
	protected resetBgSize() {
		super.resetBgSize();
		let aid = this.param.data.aid;
		let code = this.param.data.code;
		let cfg = <Config.AcCfg.WorshipCfg>Config.AcCfg.getCfgByActivityIdAndCode(aid, code);

		let bg = BaseLoadBitmap.create("acworshipview_skinbg");
		bg.width = 615 ;
		bg.height = 559;
		bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, GameConfig.stageHeigth / 2 - bg.height / 2);
		this.addChildToContainer(bg);

		let titlebg = BaseLoadBitmap.create("acworshipview_skintitlebg");
		titlebg.width = 337;
		titlebg.height = 104;
		titlebg.setPosition(bg.x + bg.width / 2 - titlebg.width / 2, bg.y - titlebg.height / 2 + 20);
		this.addChildToContainer(titlebg);

		let desc1TF = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipSkinRewardPopupViewDesc1-" + code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		desc1TF.setPosition(bg.x + 130, bg.y + 370);
		this.addChildToContainer(desc1TF);

		let desc2TF = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipSkinRewardPopupViewDesc2-" + code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		desc2TF.setPosition(desc1TF.x, desc1TF.y + desc1TF.height + 8);
		this.addChildToContainer(desc2TF);

		let confirmBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", () => {
			this.hide();
		}, this);
		confirmBtn.setPosition(bg.x + bg.width / 2 - confirmBtn.width / 2, bg.y + bg.height - confirmBtn.height - 50);
		this.addChildToContainer(confirmBtn);
		let container = Api.playerVoApi.getUserHeadContainer()
		container.setPosition(bg.x + 248, bg.y + 57);
		this.addChildToContainer(container);
		this.closeBtn.setPosition(bg.x + bg.width - 120, bg.y + 40);
	}
	protected getCloseBtnName(): string {
		return "sharepopupview_closebtn";
	}

	protected getBgName(): string {
		return null;
	}
	protected getTitleBgName(): string {
		return null;
	}
	protected getTitleStr(): string {
		return null;
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat(["sharepopupview_closebtn"
		]);
	}
	public dispose(): void {
		super.dispose();
	}
}