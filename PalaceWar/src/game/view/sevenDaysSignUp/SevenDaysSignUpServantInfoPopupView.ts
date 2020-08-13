/**
 * 七日好礼门客info
 * @author 张朝阳
 * date 2019/3/21
 * @class SevenDaysSignUpServantInfoPopupView
 */
class SevenDaysSignUpServantInfoPopupView extends PopupView {
	public constructor() {
		super();
	}

	protected initView(): void {
		let bg = BaseLoadBitmap.create("sevendayssignupview_infobg_2");
		bg.width = 544;
		bg.height = 462;;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
		this.addChildToContainer(bg);

		let rect = new egret.Rectangle(0, 0, 544, 462);
		let maskContan = new BaseDisplayObjectContainer();
		maskContan.width = 544;
		maskContan.height = 462;
		maskContan.mask = rect;
		maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y);
		this.addChildToContainer(maskContan);

		let sid = '1050';
		let servantCfg = Config.ServantCfg.getServantItemById(sid);
		let servantImg = BaseLoadBitmap.create(servantCfg.fullIcon);
		servantImg.width = 405;
		servantImg.height = 467;
		servantImg.anchorOffsetY = servantImg.height;
		servantImg.anchorOffsetX = servantImg.width / 2;
		servantImg.setScale(0.89);
		servantImg.x = maskContan.width / 2;
		servantImg.y = maskContan.y + maskContan.height;
		maskContan.addChild(servantImg);

		let res = `sevendayssignupview_namebg_2`;
		if(PlatformManager.checkIsRuSp()){
			res += `sevendayssignupview_namebg_1_ru`;
		}
		let nameTips = BaseLoadBitmap.create(res);
		nameTips.setPosition(bg.x + 5, bg.y + 15);
		this.addChildToContainer(nameTips);

		let descres = `sevendayssignupview_descbg_2`;
		if(PlatformManager.checkIsRuSp()){
			descres += `sevendayssignupview_descbg_1_ru`;
		}
		let buttomTip = BaseLoadBitmap.create(descres);
		buttomTip.width = 534;
		buttomTip.height = 33;
		buttomTip.setPosition(bg.x + bg.width / 2 - buttomTip.width / 2, bg.y + bg.height - buttomTip.height);
		this.addChildToContainer(buttomTip);

		 //门客角标
		if(servantCfg.quality2)
		{	
			let cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
			cornerImg.x = 480;
			cornerImg.y = 350;
			cornerImg.setScale(1.3);
			this.addChildToContainer(cornerImg);
		}
	}

	protected getResourceList(): string[] {
		let arr = [
		];
		if(PlatformManager.checkIsRuSp()){
			arr.push(`sevendayssignupview_descbg_1_ru`,`sevendayssignupview_namebg_1_ru`);
		}
		return super.getResourceList().concat(arr);
	}

	protected getTitleStr(): string {
		return "sevenDaysSignUpServantInfoPopupViewTitle";
	}

	protected getShowHeight() {
		return 525+10;
	}
	public dispose(): void {
		super.dispose();
	}
}

