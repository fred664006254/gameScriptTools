class StrengthenPopupView extends  PopupView {


	private _scrollList: ScrollList = null; 
	private _fourPeopleInfoVoList =null;

	private _activityTimerText: BaseTextField = null;
	private _acCDTxt: BaseTextField = null;
	private _ruleText: BaseTextField = null;
	private _inOrderText: BaseTextField = null;

	public constructor() {
		super();
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([ 
			"strengthen_button"
		]);
	}

	protected initView(): void 
	{
		let bg = BaseBitmap.create("public_tc_bg01");
		bg.width = 538;
	    bg.height = 735;
       	bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);
		this.showList(); 
	}
	 
	private showList(): void {
 
		this._fourPeopleInfoVoList =[1,2,3];
		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 518, GameConfig.stageHeigth - 230);
		this._scrollList = ComponentManager.getScrollList(StrengthenScrollItem, this._fourPeopleInfoVoList, rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(50, 20);

	}
 
	public dispose(): void 
	{
	 	 
		super.dispose();
	}

}