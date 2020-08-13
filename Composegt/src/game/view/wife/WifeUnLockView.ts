/**
 * 未迎娶界面
 * author dmj
 * date 2017/10/9
 * @class WifeUnLockView
 */
class WifeUnLockView extends CommonView
{
	private _wifVoApi:WifeVoApi;
	private _scrollList:ScrollList = undefined;
	private _bluePrevBtn:BaseButton = null;
	//1是蓝颜预览 0是红颜预览
	private _bluePrevFlag:number = 0;
	public constructor() 
	{
		super();
	}
	protected getBorderName():string
	{
		return "commonview_border1";
	}
	protected getBgName():string
	{
	
		return "commonview_woodbg";
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				"wifechangesex_unlockview_bottombg",
				"commonview_woodbg"
			]);
	}
	protected initView():void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_SEARCHGEM_REFRESH,this.refreshList,this);

		this._bluePrevFlag = 0;
		if(Api.switchVoApi.checkOpenBuleWife() && Api.gameinfoVoApi.getSexswitch() && Api.gameinfoVoApi.getSexdefault()){
			this._bluePrevFlag = 1;
		}

		this._wifVoApi = Api.wifeVoApi;
		let unlockList = this._wifVoApi.getUnlockWifeInfoVoList();
		// if(unlockList.length <= 0 )
		// {
		// 	return;
		// }

		// let bottomBg = BaseBitmap.create("public_9v_bg02");
		// bottomBg.width = GameConfig.stageWidth;
		// bottomBg.height = GameConfig.stageHeigth;
		// bottomBg.x = 0;
		// bottomBg.y = -15;
		// this.addChildToContainer(bottomBg);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth - 0,GameConfig.stageHeigth - this.container.y-30);
		let scrollList = ComponentManager.getScrollList(WifeScrollItem2,unlockList,rect);
		scrollList.setEmptyTip(LanguageManager.getlocal("wifeNoUnlockWife"));
		this.addChildToContainer(scrollList);
		scrollList.setPosition(0,-5);
		this._scrollList = scrollList;

		if(Api.switchVoApi.checkOpenBuleWife() && Api.gameinfoVoApi.getSexswitch() ){
			let bWifeBg = BaseBitmap.create("wifechangesex_unlockview_bottombg");
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bWifeBg, this.viewBg);

			this._bluePrevBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,'bluePreviewBtn',this.bluePreviewHandle,this);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._bluePrevBtn, bWifeBg);
			this.addChild(bWifeBg);
			this.addChild(this._bluePrevBtn);

			this._bluePrevBtn.setText((this._bluePrevFlag?"redPreviewBtn":"bluePreviewBtn"),true);
			
		}
	}

	protected refreshList()
	{
		let unlockList = this._wifVoApi.getUnlockWifeInfoVoList();
		this._scrollList.refreshData(unlockList);
	}

	private bluePreviewList(flag:number){
		let unlockList = this._wifVoApi.getUnlockWifeInfoVoList();
		this._scrollList.refreshData(unlockList,{isBluePreview:flag});
	}

	private bluePreviewHandle(){
		this._bluePrevFlag = 1 - this._bluePrevFlag;
		this._bluePrevBtn.setText((this._bluePrevFlag?"redPreviewBtn":"bluePreviewBtn"),true);

		this.bluePreviewList(this._bluePrevFlag);

	}
	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SEARCHGEM_REFRESH,this.refreshList,this);
		this._scrollList = null;
		this._bluePrevBtn = null;
		this._bluePrevFlag = 0;
		super.dispose();
	}
}