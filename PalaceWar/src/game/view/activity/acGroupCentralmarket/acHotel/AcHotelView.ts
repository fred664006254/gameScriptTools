/**
  * 客栈活动
  * @author 张朝阳
  * date 2018/12/7
  * @class AcHotelView
  */
class AcHotelView extends AcCommonView {
	public constructor() {
		super();
	}


	// private aid:string ="";
	// private code:string =""; 

	public initView() {
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		// this.aid = this.param.data.aid;
		// this.code =this.param.data.code;

		let topBg = BaseLoadBitmap.create("acmidautumnview_topbg")
		topBg.height = 70;
		topBg.width = 640;
		topBg.setPosition(0, -68);
		this.addChildToContainer(topBg);

		let butttomBg = BaseLoadBitmap.create("dragonboattab1bg");
		butttomBg.width = 640;
		butttomBg.height = GameConfig.stageHeigth - topBg.height - this.getTabbarGroupY() - this.getContainerY() - 70;
		butttomBg.setPosition(topBg.x, topBg.y + topBg.height - 8);
		this.addChildToContainer(butttomBg);
		this.refreshView();
	}
	private refreshView() {
		let vo = <AcHotelVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		if (vo.isFree || vo.isHaveBoxDot()) {
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
    /**
	 * 设置tabbar 的文本
	 */
	protected getTabbarTextArr(): Array<string> {
		if (this.code == "1") {
			return [
				"acHotelTitleTab1",
				"acHotelTitleTab2",
				"acHotelTitleTab3",
			];
		}
		return [
			"acHotelTitleTab1-" + this.code,
			"acHotelTitleTab2-" + this.code,
			"acHotelTitleTab3-" + this.code,
		];
	}

	protected tick(): void {
		if (this.tabViewData && this.tabViewData[0]) {
			this.tabViewData[0].tick();
		}

	}

	protected getRuleInfo(): string {
		if (this.code == "1") {
			if(Api.switchVoApi.checkServantRefuseBattle()){
				return "acHotelRuleInfo_withOpenRefusal";
			}
			return "acHotelRuleInfo";
		}

		return "acHotelRuleInfo-" + this.code;


	}
	protected getTitleStr(): string {
		return "acHotelView-" + this.code + "_Title";
	}
	protected getResourceList(): string[] {
		let arr = [];
		if (this.code == "1") {
			arr = [
				"achotelview_bowlani1",
				"achotelview_bowlani2",
				"achotelview_idle",
				"achotelview_jarsani1",
				"achotelview_jarsani2"
			];
		}
		else {
			arr = [
				"achotelview-" + this.getUiCode(),
				"achotelview_bowlani1-" + this.getUiCode(),
				"achotelview_bowlani2-" + this.getUiCode(),
				"achotelview_idle-" + this.getUiCode(),
				"achotelview_jarsani1-" + this.getUiCode(),
				"achotelview_jarsani2-" + this.getUiCode()
			];
		}
		return super.getResourceList().concat([
			"progress7", "progress7_bg", "common_box_1", "common_box_2", "common_box_3", "common_boxbg", "common_numbg",
			"acturantable_taskbox_light",
		]).concat(arr);
	}

	protected getUiCode() {
		// if (this.code == "3") {
		// 	return "2"
		// }
		return this.code;
	}

	protected getProbablyInfo(): string {
		let ruleStr = this.getClassName().toLowerCase().replace("view", "") + "ProbablyInfo" + this.code;
		if (LanguageManager.checkHasKey(ruleStr)) {
			return ruleStr;
		}
		else {

		}
		return "";
	}

	public dispose(): void {
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		super.dispose();
	}
}
