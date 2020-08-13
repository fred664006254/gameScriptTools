/**
 * 任务
 */

class AcCarnivalNightTaskPopupView extends PopupView {

	private _mainTaskHandKey: string = null;
	private code: string = null;
	private aid: string = null;
	private type = null;
	private _itemCount = null;
	public constructor() {
		super();
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"rankinglist_rankbg",
			"atkraceVisitbg",
			"atkracevipbg",
			"office_fnt",
			"acmoonlight_red-1",
			"collectflag",
		]);
	}
	private get vo(): AcCarnivalNightVo {
		return <AcCarnivalNightVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
	}
	protected getShowHeight(): number {
		return 800;
	}
	public initView(): void {

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CARNIVALNIGHT_FRESH_ITEM, this.checkTabRed, this);
		this.code = this.param.data.code;
		this.aid = this.param.data.aid;
		// this.type = this.param.data.type;

		this.tabbarGroup.setSpace(5);

		let tabBar1 = this.tabbarGroup.getTabBar(1);
		let tabBar2 = this.tabbarGroup.getTabBar(2);
		this.checkTabRed();
	}
	// protected getTabbarGroupX():number
    // {
    //     return 20;
    // }
    // protected getTabbarGroupY():number
    // {
    //     return 22;
    // }
	public checkTabRed() {
		if (this.vo.isShowTaskTab1Red()) {
			this.tabbarGroup.addRedPoint(0);
		} else {
			this.tabbarGroup.removeRedPoint(0);
		}

		if (this.vo.isShowTaskTab2Red()) {
			this.tabbarGroup.addRedPoint(1);
		} else {
			this.tabbarGroup.removeRedPoint(1);
		}

		if (this.vo.isShowTaskTab3Red()) {
			this.tabbarGroup.addRedPoint(2);
		} else {
			this.tabbarGroup.removeRedPoint(2);
		}
	}

	protected getTabbarName(): string | string[] {
		return ButtonConst.BTN_WINTAB_OLD;
	}
	protected getTabbarTextArr(): Array<string> {
		return [
			"acCarnivalNightTaskPopupViewTabTitle1",
			"acCarnivalNightTaskPopupViewTabTitle2",
			"acCarnivalNightTaskPopupViewTabTitle3",

		];
	}
	protected getDefaultCn(cnName: string, defaultCode?: string): string {
		defaultCode = defaultCode || "1";
		if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
			return cnName + "-" + this.code;
		} else {
			return cnName + "-" + defaultCode;
		}
	}
	protected setTabBarPosition(): void {

		//this.tabbarGroup.setSpace(12);
		let tabX: number = 0;
		let tabY: number = 0;

		tabX = this.viewBg.x + 48;
		tabY = this.viewBg.y + 95;


		tabY += this.getTabbarGroupY();;
		this.tabbarGroup.setPosition(tabX, tabY);

	}
	// private refreshData(){

	// 	// let itemCount1 = this.vo.titleinfo[""+this.type]==null?0:this.vo.titleinfo[""+this.type];
	// 	// this._itemCount.text = LanguageManager.getlocal(this.getDefaultCn("acReignTitle_itemcount"+this.type),[String(itemCount1)]);
	// }
	public dispose(): void {
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CARNIVALNIGHT_FRESH_ITEM, this.checkTabRed, this);
		this._mainTaskHandKey = null;
		this.code = null;
		this.aid = null;
		this.type = null;
		this._itemCount = null;
		super.dispose();
	}
}