/**
 * 未迎娶界面
 * author dmj
 * date 2017/10/9
 * @class WifeViewTab1
 */
class WifeViewTab2 extends CommonViewTab
{
	private _wifVoApi:WifeVoApi;
	public constructor() 
	{
		super();
		this.initView();
	}
	protected initView():void
	{
		this._wifVoApi = Api.wifeVoApi;
		let unlockList = this._wifVoApi.getUnlockWifeInfoVoList();
		// if(unlockList.length <= 0 )
		// {
		// 	return;
		// }

		let bottomBg = BaseBitmap.create("public_9_bg23");
		bottomBg.width = GameConfig.stageWidth-10;
		bottomBg.height = GameConfig.stageHeigth - 170;
		bottomBg.x = 5;
		bottomBg.y = 0;
		this.addChild(bottomBg);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth - 14,GameConfig.stageHeigth - 185);
		let scrollList = ComponentManager.getScrollList(WifeScrollItem2,unlockList,rect);
		scrollList.setEmptyTip(LanguageManager.getlocal("wifeNoUnlockWife"));
		this.addChild(scrollList);
		scrollList.setPosition(7,7);
	}

	public dispose():void
	{
		
		super.dispose();
	}
}