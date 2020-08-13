
class AcMerryXmasTaskPopupViewTab extends PopupViewTab {


	private _scrollList: ScrollList = null;
	private code: string = null;
	private aid: string = null;
	private specialIconId: string = null;
	private uiCode: string = null;
	protected _tabIndex = 0;
	public constructor(param: any) {

		super();
		this.aid = param.data.aid;
		this.code = param.data.code;
		this.specialIconId = param.data.specialIconId;
		this.uiCode = param.data.uiCode || this.code;

		this.initView();
	}

	public initView(): void {
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MERRYXMAS_REFRESHVO, this.refreshData, this);


		this.showList();
	}

	private get cfg(): any {
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	private get vo(): any {
		return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
	}
	public showList(): void {

		if (this._scrollList == null) {
			let taskList = this.vo.getSortTask(this.getTabIndex());
			taskList.sort((a: Config.CommonTaskItemCfg, b: Config.CommonTaskItemCfg) => { return a.sortId - b.sortId });

			let rect = egret.Rectangle.create();
			rect.setTo(0, 0, 530, 667);
			this._scrollList = ComponentManager.getScrollList(AcMerryXmasTaskScrollItem, taskList, rect, {
				aid: this.aid,
				code: this.code,
				uiCode: this.uiCode,
				specialIconId: this.specialIconId
			});
			this.addChild(this._scrollList);
			this._scrollList.setPosition(50, 73);
		}
	}

	private refreshData() {
		if (this._scrollList) {
			let taskList = this.vo.getSortTask(this.getTabIndex());
			taskList.sort((a: Config.CommonTaskItemCfg, b: Config.CommonTaskItemCfg) => { return a.sortId - b.sortId });
			this._scrollList.refreshData(taskList, { 
				aid: this.aid, 
				code: this.code,
				uiCode: this.uiCode,
				specialIconId: this.specialIconId
			});
		}
	}

	protected getTabIndex(): number {
		return this._tabIndex;
	}

	public dispose(): void {
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MERRYXMAS_REFRESHVO, this.refreshData, this);
		this._scrollList = null;
		this.aid = null;
		this.code = null;
		this.uiCode = null;
		this.specialIconId = null;
		this._tabIndex = 0;
		super.dispose();
	}
}