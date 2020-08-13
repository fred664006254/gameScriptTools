abstract class ViewTab extends BaseLoadDisplayObjectContiner {
	// 参数
	protected param: any
	// 页签
	protected tabbarGroup: TabBarGroup;
	// 保存tabview数据
	protected tabViewData: {[key:string]:ViewTab} = {};
	// 当前选中的页签
	protected _selectedTabIndex: number = 0;
	// 上次选中的页签
	private _lastSelectedTabIndex: number = null;
	public constructor(param?) {
		super();
		this.param = param;
	}

	protected abstract initView(): void;

	protected init(): void {

	}
	protected getTabbarTextArr(): Array<string> {
		return [];
	}
	// 页签图名称
	protected getTabbarName(): string | string[] {
		return ButtonConst.BTN_TAB;
	}

	protected initTabbarGroup(): void {
		let tabBarTextArr: string[] = this.getTabbarTextArr();
		if (tabBarTextArr && tabBarTextArr.length > 0) {
			this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this);
			let tabBarX: number = (this instanceof PopupView) ? 30 : 15;
			this.addChild(this.tabbarGroup);
			this.setTabBarPosition();
			this.tabbarGroup.selectedIndex = this._selectedTabIndex;
			// this.changeTab();
		}
	}
	protected setTabBarPosition(): void {

	}
	protected getTabbarGroupY(): number {
		return 0;
	}
	protected clickTabbarHandler(data: any): void {

		App.LogUtil.log("index: " + data.index);
		var index = Number(data.index);
		if (this.checkTabCondition(index) == false) {
			// 重新checkTabCondition方法处理
			this.tabbarGroup.selectedIndex = this.selectedTabIndex;
			return;
		}
		this.lastSelectedTabIndex = this.selectedTabIndex;
		this.selectedTabIndex = index;
		this.changeTab();
	}
	// (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
	protected checkTabCondition(index: number): boolean {
		return true;
	}

	protected set selectedTabIndex(index: number) {
		if (!isNaN(index)) {
			this._selectedTabIndex = index;
		}
	}
	protected get selectedTabIndex(): number {
		return this._selectedTabIndex;
	}
	protected set lastSelectedTabIndex(index: number) {
		if (!isNaN(index)) {
			this._lastSelectedTabIndex = index;
		}

	}
	protected get lastSelectedTabIndex(): number {
		return this._lastSelectedTabIndex;
	}
	protected changeTab(): void {
		let tabveiwClass: any = egret.getDefinitionByName(this.getClassName() + "Tab" + (this.selectedTabIndex + 1));
		if (tabveiwClass) {
			let commViewTab: ViewTab = <ViewTab>this.tabViewData[this.selectedTabIndex];
			if (commViewTab) {
				this.addChild(commViewTab);
				commViewTab.refreshWhenSwitchBack();
			}
			else {
				let tabView: ViewTab = new tabveiwClass(this.param);
				tabView.setPosition(this.x, this.y + this.getTabbarGroupY());
				this.tabViewData[this.selectedTabIndex] = tabView;
				tabView["param"] = this.param;
				this.addChild(tabView);
				// this.addChild(tabView);
			}
			if (this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex]) {
				this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
			}
		}

	}
	/**获取当前选中的tab实例 */
	public getSelectedTab(): ViewTab {
		if (this.tabViewData && this.tabViewData[this.selectedTabIndex]) {
			return this.tabViewData[this.selectedTabIndex];
		}
		return null;
	}

	/**检查是否为当前选中的页签 */
	public checkSelectedTab(index: number): boolean {
		if (index == this.selectedTabIndex) {
			return true;
		}
		return false;
	}
	/**
	 * 切换页签
	 */
	public refreshWhenSwitchBack(): void {

	}
	protected addRedPoint(index: number): void {
		if (this.tabbarGroup) {
			this.tabbarGroup.addRedPoint(index);
		}
	}

	protected removeRedPoint(index: number): void {
		if (this.tabbarGroup) {
			this.tabbarGroup.removeRedPoint(index);
		}
	}

	protected getViewTitleButtomY(): number {
		let className: string = this.getClassName();
		className = this.getClassName().substring(0, className.indexOf("Tab"));
		let view: CommonView = <CommonView>ViewController.getInstance().getView(className);
		return view["getTitleButtomY"]();
	}

	protected getParent(): egret.DisplayObjectContainer {
		return null;
	}

	protected getResourceList(): string[] {
		return [];
	}
	public dispose(): void {
		this.param = null;
		this.tabbarGroup=null;
		for (const key in this.tabViewData) 
		{
			if (Object.prototype.hasOwnProperty.call(this.tabViewData, key)) 
			{
				const tabViwe:ViewTab = this.tabViewData[key];
				tabViwe&&tabViwe.dispose();
				delete this.tabViewData[key];
				
			}
		}
		this._selectedTabIndex=0;
		this._lastSelectedTabIndex=null;
		super.dispose();
	}
}