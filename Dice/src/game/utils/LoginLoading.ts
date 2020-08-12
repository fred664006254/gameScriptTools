class LoginLoading extends GameLoading
{
	private static _loginLoading:LoginLoading;
	private _touchNum:number=0;
	private _lastTouchTime:number=0;
	// private _wxgameText : BaseTextField;
	public constructor() 
	{
		super();
	}

	protected init():void
	{
		super.init();
		if(PlatMgr.isShowWXLoading())
		{
			let loadTxt:BaseTextField=ComponentMgr.getTextField("首次加载时间较长，请耐心等待...",TextFieldConst.SIZE_CONTENT_COMMON);
			loadTxt.setPosition(GameConfig.stageWidth*0.5 - loadTxt.width*0.5,this._progressBar.y-loadTxt.height-10);
			loadTxt.y=this._progressBar.y-loadTxt.height-10;
			this.addChild(loadTxt);
			this._loadNumBMTxt.y = this._progressBar.y - 30;

			const stateMent: string = PlatMgr.getStatement();
			if (stateMent && stateMent != "") {
				let stateText:BaseTextField = ComponentMgr.getTextField(stateMent, TextFieldConst.SIZE_16);
				stateText.width = GameConfig.stageWidth;
				stateText.textAlign = TextFieldConst.ALIGH_CENTER;
				this.addChild(stateText);
				stateText.setPosition(GameConfig.stageWidth*0.5 - stateText.width*0.5, GameConfig.stageHeigth - stateText.height - 10);
			}

			this.hideReloadDiv();
			
		}
		this.initTestTouch();

	}

	private initTestTouch():void
	{
		let leftMk:BaseShape=new BaseShape();
		leftMk.graphics.beginFill(0,0);
		leftMk.graphics.drawRect(0,0,60,130);
		leftMk.graphics.endFill();
		this.addChild(leftMk);
		leftMk.addTouchTap((event:egret.TouchEvent)=>{
			if(this._touchNum<1)
			{
				this._touchNum++;
			}
			else
			{
				if(egret.getTimer()-this._lastTouchTime>1000)
				{
					this._touchNum=0;
				}
				else
				{
					this._touchNum++;
				}
			}
			this._lastTouchTime=egret.getTimer();
			if(this._touchNum==10)
			{
				if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2()||App.DeviceUtil.isWXgame())
				{
					StatisticsHelper.reportOwnNameLog("touch10","testcmd");
					console.log("already in test");
					// this.createPanel(()=>{
					// 	ViewController.getInstance().openView("TestView");
					// },"开始测试");
					LoginMgr.showLog();
				}
			}
		},this);
	}

	protected showWarTip():boolean
	{
		return false;
	}

	protected getInterval():number
	{
		return 1000;
	}

	protected initBg():void
	{
		let bg = BaseLoadBitmap.create("loginbg",null,{callback:()=>{
			LoginLoading.hideDivLoading();
		},callbackThisObj:this});
		bg.anchorOffsetX = 0;
		bg.anchorOffsetY = bg.height;
		bg.setPosition(0,GameConfig.stageHeigth);
		this.addChild(bg);
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

	protected getParent():egret.DisplayObjectContainer
	{
		return LayerMgr.panelLayer;
	}

	public dispose():void
	{
		LoginLoading.hideDivLoading();
		this._progressBar=null;
		this._loadNumBMTxt=null;
		// this._wxgameText = null;
		super.dispose(true);
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

		App.CommonUtil.formatFullScreenBg();
		App.CommonUtil.formatIpadScreenBg();
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
	protected autoPercent():boolean
	{
		return false;
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