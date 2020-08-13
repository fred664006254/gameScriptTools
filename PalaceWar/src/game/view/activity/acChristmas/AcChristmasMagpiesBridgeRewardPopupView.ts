/**
 * 鹊桥相会奖励牛郎织女皮肤预览
 * author yangchengguo
 * date 2019/7/16
 * @class AcChristmasView
 */
class AcChristmasMagpiesBridgeRewardPopupView extends PopupView{
	public constructor() {
		super();
	}

	public initView(): void {
	}

	protected resetBgSize() {
		super.resetBgSize();
		let aid = this.param.data.aid;
		let code = this.param.data.code;
		let cfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
		let bg = BaseLoadBitmap.create("acchristmasview_popbg_6");
		bg.width = 615 ;
		bg.height = 559;
		bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, GameConfig.stageHeigth / 2 - bg.height / 2);
		this.addChildToContainer(bg);

		let titlebg = BaseLoadBitmap.create("acchristmasview_poptitlebg_6");
		titlebg.width = 337;
		titlebg.height = 104;
		titlebg.setPosition(bg.x + bg.width / 2 - titlebg.width / 2, bg.y - titlebg.height / 2 + 20);
		this.addChildToContainer(titlebg);

		let desc1TF = ComponentManager.getTextField(LanguageManager.getlocal("acWealthComingSkinRewardPopupViewDesc1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		desc1TF.setPosition(bg.x + 130, bg.y + 370);
		this.addChildToContainer(desc1TF);

		let desc2TF = ComponentManager.getTextField(LanguageManager.getlocal("acWealthComingSkinRewardPopupViewDesc2"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		desc2TF.setPosition(desc1TF.x, desc1TF.y + desc1TF.height + 8);
		this.addChildToContainer(desc2TF);

		let confirmBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", () => {
			this.hide();
		}, this);
		confirmBtn.setPosition(bg.x + bg.width / 2 - confirmBtn.width / 2, bg.y + bg.height - confirmBtn.height - 50);
		this.addChildToContainer(confirmBtn);
		let picId:number = Api.playerVoApi.getPlayePicId();
		if (Api.playerVoApi.getUserSex(picId) == 2) {
			//女的
			let container = Api.playerVoApi.getUserHeadContainer();
			container.setPosition(bg.x + 412 - container.width / 2, bg.y + 220 - container.height + 18);
			this.addChildToContainer(container);

			if (PlatformManager.checkIsKRSp()) {
				container.setPosition(bg.x + 319 - container.width / 2, bg.y + 208 - container.height);
			}
			else 
			{
				let container2 = Api.playerVoApi.getUserHeadContainer(1);
				container2.setPosition(bg.x + 233 - container.width / 2, bg.y + 188 - container2.height + 18);
				this.addChildToContainer(container2);
			}
		}
		else {
			//男的
			let container = Api.playerVoApi.getUserHeadContainer();
			container.setPosition(bg.x + 233 - container.width / 2, bg.y + 188 - container.height + 18);
			this.addChildToContainer(container);

			if (PlatformManager.checkIsKRSp()) {
				container.setPosition(bg.x + 319 - container.width / 2, bg.y + 208 - container.height);
			}
			else 
			{
				let container2 = Api.playerVoApi.getUserHeadContainer(6)
				container2.setPosition(bg.x + 412 - container.width / 2, bg.y + 220 - container2.height + 18);
				this.addChildToContainer(container2);
			}
		}
		this.closeBtn.setPosition(bg.x + bg.width - 120, bg.y + 40);
	}
	protected getCloseBtnName():string {
		return "sharepopupview_closebtn";
	}

	protected getBgName():string {
		return null;
	}
	protected getTitleBgName():string {
		return null;
	}
	protected getTitleStr():string {
		return null;
	}
	protected getResourceList():string[] {
		return super.getResourceList().concat(["sharepopupview_closebtn"
		]);
	}
	public dispose(): void {
		super.dispose();
	}
}