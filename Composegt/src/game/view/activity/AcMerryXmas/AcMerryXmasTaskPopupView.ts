/**
 * 通用任务弹窗
 * @param aid string 活动aid
 * @param code string 活动code
 * @param tabbarTextArr  string[] 可选参数 标签页cnkey数组,同时决定标签页个数,不传则默认3个
 * @param specialIconId  string 可选参数 活动特殊道具图标Id,需自行在RewardItemVo中添加
 * @param uiCode string 可选参数 活动的资源code(特殊道具图标code后缀)
 * 
 * 以下可参考AcMerryXmasVo
 * 需在活动vo中实现getSortTask方法获取任务列表
 * 需要在vo中实现getTaskNum方法获取任务进度
 * 可以在vo中实现isShowTaskTabRed方法检测标签页红点
 */

class AcMerryXmasTaskPopupView extends PopupView {

	private code: string = null;
	private aid: string = null;
	public constructor() {
		super();
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"accommontask_itemtitlebg"
		]);
	}
	private get vo(): any {
		return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
	}
	protected getShowHeight(): number {
		return 850;
	}
	public initView(): void {
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MERRYXMAS_REFRESHVO, this.checkTabRed, this);
		this.code = this.param.data.code;
		this.aid = this.param.data.aid;

		this.tabbarGroup.setSpace(10);

		this.checkTabRed();
	}
	public checkTabRed() {
		const tabNum = this.getTabbarTextArr().length;
		for (let i = 0; i < tabNum; i++) {
			if (this.vo.isShowTaskTabRed(i + 1)) {
				this.tabbarGroup.addRedPoint(i);
			} else {
				this.tabbarGroup.removeRedPoint(i);
			}
		}
	}

	protected getTabbarName(): string | string[] {
		return ButtonConst.BTN_WINTAB;
	}
	protected getTabbarTextArr(): Array<string> {
		if (this.param.data.tabbarTextArr && this.param.data.tabbarTextArr[0]) {
			return this.param.data.tabbarTextArr;
		}
		return [
			"acCarnivalNightTaskPopupViewTabTitle1",
			"acCarnivalNightTaskPopupViewTabTitle2",
			"acCarnivalNightTaskPopupViewTabTitle3",
		];
	}
	protected getTabbarGroupX(): number {
		return 17;
	}
	protected isHaveTabBg(): boolean {
		return true;
	}

	public dispose(): void {
		this.code = null;
		this.aid = null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MERRYXMAS_REFRESHVO, this.checkTabRed, this);

		super.dispose();
	}
}