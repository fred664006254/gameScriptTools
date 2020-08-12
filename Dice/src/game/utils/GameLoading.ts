class GameLoading extends BaseLoadDisplayObjectContiner
{
	protected _progressBar:ProgressBar;
	protected _loadNumBMTxt:BaseBitmapText|BaseTextField;
	private _timeCount:number=-1;
	private _percent:number=0;
	private _tipTxt:BaseTextField=null;
	private _txtTimeCount:number=-1;
	public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{
		return [];
	}

	public show():void
	{
		if(this.isShow())
		{
			if(!this.parent)
			{
				let parent = this.getParent();
				if(parent)
				{
					parent.addChild(this);
				}
				this.setPercentage(0);
				this.startAutoPercent();
			}
		}
		else
		{
			super.show();
		}
	}

	protected autoPercent():boolean
	{
		return true;
	}

	protected startAutoPercent():void
	{
		if(!this.autoPercent())
		{
			return;
		}
		if(this._timeCount==-1)
		{
			this._timeCount=egret.setInterval(()=>{
				let cp=this._percent;
				let scaleValue=Math.max(0.1,(this._percent-0.4))*10;
				scaleValue=scaleValue*scaleValue;
				let percent = Math.min(1,cp+Math.random()*10/scaleValue*0.01);
				this.setPercentage(percent);
				if(percent>=1)
				{
					this.clearTimeCount();
				}
			},this,this.getInterval());
		}
		if(this.showWarTip()&&this._txtTimeCount==-1)
		{
			this._txtTimeCount=egret.setInterval(()=>{
				if(this._tipTxt)
				{
					let rid = App.MathUtil.getRandom(1,6);
					this._tipTxt.setString(LangMger.getlocal("warwaitngtip"+rid));
				}
			},this,3000);
		}
	}

	protected getInterval():number
	{
		return 300;
	}

	protected clearTimeCount():void
	{
		if(this._timeCount>-1)
		{
			egret.clearInterval(this._timeCount);
			this._timeCount=-1;
		}
	}

	protected init():void
	{
		this.initBg();
		let logoName = this.getSpLoadLogo();
		let logo = BaseLoadBitmap.create(logoName,null,{
			callback : ()=>{
				logo.setPosition((GameConfig.stageWidth - logo.width) / 2 , logo.height / 2);
		    },
				callbackThisObj : null
			});
		this.addChild(logo);

		if(PlatMgr.checkIsLsSp()||PlatMgr.checkIsIOSShenheSp())
		{
			logo.visible = false;
		}

		this._progressBar = ComponentMgr.getProgressBar(ProgressBarConst.IMAGE_PROGRESS1,ProgressBarConst.IMAGE_PROGRESS1_Bg);
		
		this._progressBar.x = GameConfig.stageWidth/2 - this._progressBar.getBgWidth()/2;
		this._progressBar.y = GameConfig.stageHeigth - 150;
		this.addChild(this._progressBar);
		this.setPercentage(0);
		
		let loadNumBMTxt:BaseBitmapText|BaseTextField=ComponentMgr.getBitmapText("0%","loadnum_fnt");
		loadNumBMTxt.width=100;
		loadNumBMTxt.textAlign=egret.HorizontalAlign.CENTER;
		loadNumBMTxt.setPosition(10,this._progressBar.y-loadNumBMTxt.height);
		this.addChild(loadNumBMTxt);
		this._loadNumBMTxt=loadNumBMTxt;
		
		if(this.showWarTip())
		{
			let rid = App.MathUtil.getRandom(1,6);
			this._tipTxt=ComponentMgr.getTextField(LangMger.getlocal("warwaitngtip"+rid),TextFieldConst.SIZE_24);
			this._tipTxt.textAlign=egret.HorizontalAlign.CENTER;
			this._tipTxt.width=GameConfig.stageWidth;
			this._tipTxt.setPosition((GameConfig.stageWidth-this._tipTxt.width)*0.5,this._progressBar.y+this._progressBar.height+15);
			this.addChild(this._tipTxt);
		}
		
		//ios提审时不显示加载进度条
		if(PlatMgr.checkIsIOSShenheSp())
		{
			this._progressBar.visible = false;
			this._loadNumBMTxt.visible = false;
		}
		this.startAutoPercent();

	}
	
	protected showWarTip():boolean
	{
		return true;
	}
    
    protected initBg():void
    {
        let bg = BaseBitmap.create("loginbg");
		bg.anchorOffsetX = 0;
		bg.anchorOffsetY = bg.height;
		bg.setPosition(0,GameConfig.stageHeigth);
		this.addChild(bg);
    }

	protected getSpLoadLogo():string
	{
		let appId = PlatMgr.getAppid();
		let spName = PlatMgr.getSpName();
		let bigAppId = PlatMgr.getBigAppid();
		let spIdKey = PlatMgr.getSpidKey();

		let logoName = "login_logo_" + appId.toString();
		if(!ResMgr.hasRes(logoName))
		{
			logoName = "login_logo_" + spName.toString();
		}
		if(!ResMgr.hasRes(logoName))
		{
			logoName = "login_logo_" + bigAppId.toString();
		}
		if(!ResMgr.hasRes(logoName))
		{
			logoName = "login_logo_" + spIdKey.toString();
		}
		if(!ResMgr.hasRes(logoName))
		{
			logoName = "login_logo";
		}

		return logoName;
	}

	public setPercentage(percent:number,textStr?:string,textColor?:number):void
	{
		if(this._progressBar)
		{
			this._percent=percent;
			if(this.autoPercent())
			{
				if(percent<this._percent)
				{
					return;
				}
			}
			this._progressBar.setPercentage(percent);
			if(this._loadNumBMTxt)
			{
				this._loadNumBMTxt.text=Math.floor(percent*100)+"%";
			}
		}
	}

	protected getParent():egret.DisplayObjectContainer
	{
		return LayerMgr.maskLayer;
	}

	public dispose(isDispose?:boolean):void
	{
		if(isDispose)
		{
			this._progressBar=null;
			this._loadNumBMTxt=null;
			this._tipTxt=null;
			super.dispose();
		}
		else
		{
			if(this.parent)
			{
				if(this._percent<1)
				{
					this.setPercentage(1);
					let count = egret.setTimeout(()=>{
						egret.clearTimeout(count);
						this.parent.removeChild(this);
					},this,300);
				}
				else
				{
					this.parent.removeChild(this);
				}
			}
		}
		this._percent=0;
		this.clearTimeCount();
		if(this._txtTimeCount>-1)
		{
			egret.clearInterval(this._txtTimeCount);
			this._txtTimeCount=-1;
		}
	}
}