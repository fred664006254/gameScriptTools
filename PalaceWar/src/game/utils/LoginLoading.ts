class LoginLoading extends BaseLoadDisplayObjectContiner
{
	private static _loginLoading:LoginLoading;
	private _progressBar:ProgressBar;
	private _loadImg:BaseLoadBitmap;
	private _bg:BaseBitmap;
	private _loadNumBMTxt:BaseBitmapText|BaseTextField;
	// private _wxgameText : BaseTextField;
	public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{
		return [];
	}

	protected init():void
	{
		if (PlatformManager.isShowWXLoading()) {
        //     let wxgameText:BaseTextField=ComponentManager.getTextField("<font color=0xb0faff  size=30>健康游戏忠告</font>\n<font color=0x6ebdc6  size=26>抵制不良游戏，拒绝盗版游戏。\n注意自我保护，谨防上当受骗。\n适度游戏益脑，沉迷游戏伤身。\n合理安排时间，享受健康生活。</font>",TextFieldConst.FONTSIZE_TITLE_COMMON);
        //     wxgameText.lineSpacing=5;
        //     wxgameText.textAlign=egret.HorizontalAlign.CENTER;
        //     wxgameText.setPosition((GameConfig.stageWidth-wxgameText.width)/2,(GameConfig.stageHeigth-wxgameText.height)/2);
        //     this.addChild(wxgameText);
        //     wxgameText.name="wxgameText";
		// 	this._wxgameText = wxgameText;
			let bg=BaseBitmap.create("wxloadingbg");
			bg.setPosition(0,(GameConfig.stageHeigth - bg.height)/2);
			this.addChild(bg);

		}

		
		// this.hideReloadDiv();


		let progressBarBg:BaseBitmap=BaseBitmap.create("loginbg_progressbg");
		progressBarBg.setPosition(GameConfig.stageWidth/2 - progressBarBg.width/2,GameConfig.stageHeigth - 128.8);
		this.addChild(progressBarBg);

		if(PlatformManager.isShowWXLoading())
		{
			this._progressBar = ComponentManager.getProgressBar("loginbg_wxprogress1","loginbg_wxprogress1_bg");
			progressBarBg.visible = false;
		}
		else{
			this._progressBar = ComponentManager.getProgressBar(ProgressBarConst.IMAGE_PROGRESS1,ProgressBarConst.IMAGE_PROGRESS1_Bg);
		}
		
		this._progressBar.x = GameConfig.stageWidth/2 - this._progressBar.getBgWidth()/2;
		this._progressBar.y = GameConfig.stageHeigth - 100;
		this.addChild(this._progressBar);
		this.setPercentage(0);

		let loginLoadingTxt:BaseBitmap=BaseBitmap.create("login_loading");
		loginLoadingTxt.setPosition(GameConfig.stageWidth*0.5 - loginLoadingTxt.width*0.5,this._progressBar.y-loginLoadingTxt.height-5);
		this.addChild(loginLoadingTxt);

		let loadNumBMTxt:BaseBitmapText|BaseTextField
		if(PlatformManager.isShowWXLoading())

		{
			loadNumBMTxt=ComponentManager.getBitmapText("0%","loadnumwx_fnt");
		}
		else{
			loadNumBMTxt=ComponentManager.getBitmapText("0%","loadnum_fnt");
		}
		loadNumBMTxt.width=100;
		loadNumBMTxt.textAlign=egret.HorizontalAlign.CENTER;
		loadNumBMTxt.setPosition(GameConfig.stageWidth*0.5 - loadNumBMTxt.width*0.5,this._progressBar.y+this._progressBar.getBgHeight()+5);
		this.addChild(loadNumBMTxt);
		this._loadNumBMTxt=loadNumBMTxt;
		if(PlatformManager.checkIsXlSp())
		{
			this.hideReloadDiv();
			let refreshTxt:BaseTextField=ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
			refreshTxt.stroke=1;
			refreshTxt.strokeColor=0;
			refreshTxt.textFlow = new Array<egret.ITextElement>(
				{ text: "如果无法进入游戏，请", style: { "textColor": 0xffffff} },
				{ text: "点击刷新", style: { "textColor": 0xff0000,"underline":true, "href": "event:text event triggered"} });
			refreshTxt.touchEnabled = true;
			refreshTxt.addEventListener(egret.TextEvent.LINK, function (evt: egret.TextEvent) {
				if(App.DeviceUtil.IsHtml5())
				{
					StatisticsHelper.reportLoadData("reload_3");
					window.location.reload();
				}
			}, this);
			refreshTxt.setPosition(GameConfig.stageWidth*0.5 - refreshTxt.width*0.5,this._progressBar.y-refreshTxt.height-10);
			loginLoadingTxt.y=GameConfig.stageHeigth - 100;
			this.addChild(refreshTxt);
		}
		else if(PlatformManager.isShowWXLoading())
		{

			let loadTxt:BaseTextField=ComponentManager.getTextField("首次加载时间较长，请耐心等待...",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
			loadTxt.setPosition(GameConfig.stageWidth*0.5 - loadTxt.width*0.5,this._progressBar.y-loadTxt.height-10);
			loadTxt.y=this._progressBar.y-loadTxt.height-10;
			this.addChild(loadTxt);
			loadNumBMTxt.y = this._progressBar.y;

			loginLoadingTxt.visible = false;
			let refreshTxt:BaseTextField=ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
			// refreshTxt.stroke=1;
			// refreshTxt.strokeColor=0;
			refreshTxt.textFlow = new Array<egret.ITextElement>(
				{ text: "如果无法进入游戏，请", style: { "textColor": 0x000000} },
				{ text: "点击刷新", style: { "textColor": 0xff0000,"underline":true, "href": "event:text event triggered"} });
			refreshTxt.touchEnabled = true;
			refreshTxt.addEventListener(egret.TextEvent.LINK, function (evt: egret.TextEvent) {
				if(App.DeviceUtil.IsHtml5())
				{
					StatisticsHelper.reportLoadData("reload_3");
					window.location.reload();
				}
			}, this);
			refreshTxt.setPosition(GameConfig.stageWidth*0.5 - refreshTxt.width*0.5,this._progressBar.y+refreshTxt.height+10);
			// loginLoadingTxt.y=GameConfig.stageHeigth - 150;
			this.addChild(refreshTxt);

			LoginLoading.hideDivLoading();
			this.hideReloadDiv();
			


		}
	}

	private hideReloadDiv():void
	{
		if(App.DeviceUtil.IsHtml5())
		{
			var my = document.getElementById("rayIdxload1");
			if (my != null)
			{
				App.LogUtil.log("rayIdxload1");
				my.parentNode.removeChild(my);
			}
			var my2 = document.getElementById("rayIdxload2");
			if (my2 != null)
			{
				App.LogUtil.log("rayIdxload1");
				my2.parentNode.removeChild(my2);
			}
		}
		let refreshTxt:BaseTextField=<BaseTextField>GameConfig.stage.getChildByName("xlrefreshTxt");
		if(refreshTxt)
		{
			refreshTxt.dispose();
		}
	}

	private showBg():void
	{
		App.LogUtil.log("开始显示loginLoading的bg");
		LoginLoading.hideDivLoading();
		if(this._loadImg)
		{
			BaseLoadBitmap.release(this._loadImg);
			this._loadImg=null;
		}
		if(!this._bg)
		{
			this._bg=BaseBitmap.create(PlatCfg.loginBg);
			this.addChildAt(this._bg,0);
		}
	}

	public setPercentage(percent:number,textStr?:string,textColor?:number):void
	{
		if(this._progressBar)
		{
			this._progressBar.setPercentage(percent);
			if(this._loadNumBMTxt)
			{
				this._loadNumBMTxt.text=Math.floor(percent*100)+"%";
			}
		}
	}

	protected getParent():egret.DisplayObjectContainer
	{
		return LayerManager.panelLayer;
	}

	public dispose():void
	{
		LoginLoading.hideDivLoading();
		this._progressBar=null;
		this._loadImg=null;
		this._loadNumBMTxt=null;
		// this._wxgameText = null;
		super.dispose();
	}

	public static show():void
	{
		if(!LoginLoading._loginLoading)
		{
			LoginLoading._loginLoading=new LoginLoading();
			LoginLoading._loginLoading.show();
		}
		else
		{
			if(!LoginLoading._loginLoading.parent)
			{
				LoginLoading._loginLoading.getParent().addChild(LoginLoading._loginLoading);
			}
		}
		if(App.DeviceUtil.isRuntime2())
		{
			//隐藏掉原生包的loading图
			let param={"func":"dismissSplash"};
			egret.ExternalInterface.call("sendToNative", JSON.stringify(param));
		}
	}

	public static hide():void
	{
		if(LoginLoading._loginLoading)
		{
			if(LoginLoading._loginLoading.parent)
			{
				LoginLoading._loginLoading.parent.removeChild(LoginLoading._loginLoading);
			}
			LoginLoading.hideDivLoading();
			LoginLoading._loginLoading.setPercentage(0);
		}
	}
	// 隐藏微信小游戏里的健康游戏公告
	public static hideWxgameText():void
	{
		// if(LoginLoading._loginLoading && LoginLoading._loginLoading._wxgameText) {
		// 	LoginLoading._loginLoading._wxgameText.visible = false;
		// }
	}
	public static showBg():void
	{
		if(LoginLoading._loginLoading)
		{
			LoginLoading._loginLoading.showBg();
		}
		let gameruntimelogo:BaseLoadBitmap=<BaseLoadBitmap>GameConfig.stage.getChildByName("gameruntimelogo");
		if(gameruntimelogo)
		{
			gameruntimelogo.dispose();
		}
	}

	public static setPercentage(percent:number,textStr?:string,textColor?:number):void
	{
		if(LoginLoading._loginLoading)
		{
			LoginLoading._loginLoading.setPercentage(percent,textStr,textColor);
			if(percent>0.4)
			{
				// let par:BaseBitmap;
				// par.visible = false;
			}
		}
	}

	public static hideDivLoading():void
	{
		if(App.DeviceUtil.IsHtml5())
		{
			var my = document.getElementById("alertdiv");
			if (my != null)
			{
				App.LogUtil.log("htmlloding移除完成");
				my.parentNode.removeChild(my);
			}
		}
		let xlTxt:BaseTextField=<BaseTextField>GameConfig.stage.getChildByName("xlTxt");
		if(xlTxt)
		{
			xlTxt.dispose();
		}
		let refreshTxt:BaseTextField=<BaseTextField>GameConfig.stage.getChildByName("xlrefreshTxt");
		if(refreshTxt)
		{
			refreshTxt.dispose();
		}
	}
}