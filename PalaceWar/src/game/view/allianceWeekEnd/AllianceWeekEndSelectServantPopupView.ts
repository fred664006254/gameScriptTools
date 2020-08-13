/**
  * 勤王除恶选择门客
  * @author 张朝阳
  * date 2019/4/17
 * @class AllianceWeekEndSelectServantPopupView
 */
class AllianceWeekEndSelectServantPopupView extends PopupView {

	private _scrollList: ScrollList = null;
	private _callback: Function = null;
	private _handler: any = null;
	public constructor() {
		super();

	}

	private getType(): number {
		return Number(this.param.data.type);
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"boss_gotowar"
		]);
	}
	protected initView(): void {
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCEWEEKEND_SELECTSERVANT, this.selectHandle, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_RECOVER, this.recovertHandle, this);
		let bg: BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 670;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
		this.addChildToContainer(bg);

		let servantList = Api.myAllianceWeekVoApi.getServantList();
		let rect = new egret.Rectangle(0, 0, bg.width - 10, bg.height - 20);
		this._scrollList = ComponentManager.getScrollList(AllianceWeekEndSelectServantScrollItem, servantList, rect);
		this._scrollList.setPosition(bg.x + 10, bg.y + 10);
		this.addChildToContainer(this._scrollList);
	}
	private recovertHandle() {
		let servantList = Api.myAllianceWeekVoApi.getServantList();
		this._scrollList.refreshData(servantList);
	}

	private selectHandle() {
		// App.CommonUtil.showTip(LanguageManager.getlocal("allianceWeekEndSelectServantPopupViewGoFightSuccess"));
		this.hide();
	}

	protected getBgExtraHeight(): number {
		return 40;
	}

	public dispose(): void {
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCEWEEKEND_SELECTSERVANT, this.selectHandle, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_RECOVER, this.recovertHandle, this);
		this._scrollList = null;
		this._callback = null;
		this._handler = null;

		super.dispose();
	}
}