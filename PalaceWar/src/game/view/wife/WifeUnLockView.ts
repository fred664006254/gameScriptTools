/**
 * 未迎娶界面
 * author dmj
 * date 2017/10/9
 * @class WifeUnLockView
 */
class WifeUnLockView extends CommonView
{
	private _wifVoApi:WifeVoApi;
	private _sexType = 0;//0女 1男

	public constructor() 
	{
		super();
	}
	protected initView():void
	{
		this.titleTF.text = LanguageManager.getlocal(Api.switchVoApi.checkIsInBlueWife() ? "wifeUnLockViewTitle2" : "wifeUnLockViewTitle");
		this._wifVoApi = Api.wifeVoApi;
		let unlockList = this._wifVoApi.getUnlockWifeInfoVoList();
		// if(unlockList.length <= 0 )
		// {
		// 	return;
		// }
		this._sexType = 0;
		if(Api.switchVoApi.checkOpenBlueWife() && Api.gameinfoVoApi.getSexswitch() && Api.gameinfoVoApi.getSexdefault()){
			this._sexType = 1;
		}

		let bottomBg = BaseBitmap.create("public_9_bg23");
		bottomBg.width = GameConfig.stageWidth;
		bottomBg.height = GameConfig.stageHeigth;
		bottomBg.x = 0;
		bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 120;
		this.addChildToContainer(bottomBg);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth - 0,GameConfig.stageHeigth - this.container.y + 20);
		let scrollList = ComponentManager.getScrollList(WifeScrollItem2,unlockList,rect,this._sexType);
		scrollList.setEmptyTip(LanguageManager.getlocal("wifeNoUnlockWife"));
		this.addChildToContainer(scrollList);
		scrollList.setPosition(0,-15);

		if(Api.switchVoApi.checkIsInBlueWife()){
			let malebtn = ComponentManager.getButton(this._sexType == 0 ? `malelistbtn` : `femalelistbtn`, '', ()=>{
				if(this._sexType == 0){
					this._sexType = 1;
					scrollList.refreshData(unlockList,this._sexType);
				}
				else if(this._sexType > 0){
					this._sexType = 0;
					scrollList.refreshData(unlockList,this._sexType);
				}
				malebtn.setBtnBitMap(this._sexType == 0 ? `malelistbtn` : `femalelistbtn`);
			}, this);
			malebtn.x = 40;
			malebtn.y = this.container.y - malebtn.height + 10;
			this.addChild(malebtn);

			scrollList.setPosition(0,0);
		}
		
	}


	protected getResourceList(): string[] {
		return super.getResourceList().concat([
		]);
	}

	public dispose():void
	{
		super.dispose();
	}
}