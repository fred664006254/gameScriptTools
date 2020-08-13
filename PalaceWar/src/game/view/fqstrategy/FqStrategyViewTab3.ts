class FqStrategyViewTab3 extends  ViewTab {


	private _scrollList: ScrollList = null; 
	private _fourPeopleInfoVoList =null;

	private _activityTimerText: BaseTextField = null;
	private _acCDTxt: BaseTextField = null;
	private _ruleText: BaseTextField = null;
	private _inOrderText: BaseTextField = null;

	public constructor() {
		super(); 
		this.initView();
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([ 
			"strengthen_button"
		]);
	}

	public initView(): void 
	{
		//直监听演武场，其他界面都会关闭这个板子
		App.MessageHelper.addNetMessage("studyatk",this.refreshView,this);
		this.showList(); 
	}
	 
	private showList(): void {
 
		this._fourPeopleInfoVoList =[1,2,3];
		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 640, GameConfig.stageHeigth -100);
		this._scrollList = ComponentManager.getScrollList(StrengthenScrollItem, this._fourPeopleInfoVoList, rect);
		this.addChild(this._scrollList);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, this._scrollList, this, [18,5], true);
		//this._scrollList.setPosition(20, 20);

	}
	private refreshView()
	{
		this._scrollList.refreshData(this._fourPeopleInfoVoList);
	}
	public getShowWidth():number{
		return 570;
	}

	public getShowHeight():number{
		return 820;
	}

	public dispose(): void 
	{
	 	App.MessageHelper.removeNetMessage("studyatk",this.refreshView,this);
		this._scrollList = null;
		this._fourPeopleInfoVoList = null;
		super.dispose();
	}

}