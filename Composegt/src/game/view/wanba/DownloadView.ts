class DownloadView extends PopupView
{
	private _scrollList:ScrollList;

	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		let bottomBgStr = "";
		if (PlatformManager.checkIsWanbaSp()) {
			bottomBgStr = "downloadRewordBg3";
		} else if (App.DeviceUtil.IsMobile()) {
			bottomBgStr = "downloadRewordBg2";
		} else {
			bottomBgStr = "downloadRewordBg";
		}

		let bottomBg = BaseBitmap.create(bottomBgStr);
		bottomBg.x = 10;
		this.addChildToContainer(bottomBg);
		
		if ((PlatformManager.checkIsWanbaSp() && App.DeviceUtil.isAndroid() && !App.DeviceUtil.wanbaIsDownloadApp) || (PlatformManager.checkIsTWBSp() && App.DeviceUtil.IsMobile())) {
			// 下载按钮
			let goDownloadBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"downloadPackage",this.downloadButtonHandler ,this);        
			goDownloadBtn.x = 400-goDownloadBtn.width/2;
			goDownloadBtn.y = 222-goDownloadBtn.height/2;
			goDownloadBtn.name = "goDownloadBtn";
			this.addChildToContainer(goDownloadBtn);
		} else if (PlatformManager.checkIsWanbaSp() && App.DeviceUtil.isAndroid() && App.DeviceUtil.wanbaIsDownloadApp) {
			// 去微端登录
			let goLoginLabel = BaseBitmap.create("weiduanreward_getlabel");
			goLoginLabel.x = 400-goLoginLabel.width/2;
			goLoginLabel.y = 222-goLoginLabel.height/2;
			this.addChildToContainer(goLoginLabel);
		}

		// 不同平台，奖励不同
		var rewardStr = "";
		if (PlatformManager.checkIsTWBSp()) {
			rewardStr = Config.GameprojectCfg.rewardGT;
		} else if (PlatformManager.checkIsWanbaSp()) {
			rewardStr = Config.GameprojectCfg.rewardWB4;
		}
		let rewardVoList:Array<RewardItemVo> = GameData.formatRewardItem(rewardStr);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,500,110);

		this._scrollList = ComponentManager.getScrollList(MailRewardScrollItem,rewardVoList,rect);
		this._scrollList.x = 284 - (Math.min(5,rewardVoList.length)/2) * 100;
		this._scrollList.y = 320;
		this.addChildToContainer(this._scrollList);
	}
	private downloadButtonHandler():void
	{
		if (PlatformManager.checkIsWanbaSp() && App.DeviceUtil.isAndroid()) {
			qqwanbaplugin.downloadApp();
			// console.log(url);
			// window.open(url);
		} else if (PlatformManager.checkIsTWBSp()) {
			window.open("https://go.onelink.me/FcNW?pid=H5");
		}
	}
	protected getShowHeight():number
	{
		return 500;
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat(["downloadRewordBg","downloadRewordBg2","downloadRewordBg3","weiduanreward_getlabel"]);
	}

	protected getTitleStr():string
	{
		if (PlatformManager.checkIsTWBSp()) {
			return "downloadViewTitle";
		} else if (PlatformManager.checkIsWanbaSp()) {
			if (App.DeviceUtil.wanbaIsDownloadApp) {
				return "downloadViewTitle2";
			} else {
				return "downloadViewTitle1";
			}
		}
		return "downloadViewTitle";
	}
	public dispose():void
	{
		this._scrollList = null;

		super.dispose();
	}
}