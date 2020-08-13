/**
 * 通用大面板的父类
 * author dmj
 * date 2017/9/16
 * @class CommonView
 */
abstract class CommonView extends BaseView
{
	private static showedViewNameList:string[]=[];
	
	// 规则说明按钮北京
	private _ruleBg:BaseBitmap;
	// 规则说明按钮
	private _ruleBtn:BaseButton;
	// 概率按钮
	private _probBtn:BaseButton;

	private static _waitHideList:Object={};
	
	/**
	 * 正在加载的界面数量
	 */
	private static _showloadingCount:number=0;
	public constructor() 
	{
		super();
	}

	/**
	 * 
	 * @param data data tab:有tabbar时，需要传该参数，tab代表默认打开的页签，从0开始,如果有2级页签时，可以传"0-1"
	 */
	public show(data?:{tab?:string}):void
	{
		if(this.isShow())
		{
			return;
		}
		CommonView._showloadingCount++;
		App.LogUtil.log("commonview.showCount:",CommonView._showloadingCount);
		super.show(data);
	}
	public hide():void
	{
		if(!this.isShow())
		{
			return;
		}
		if(!this.isInit())
		{
			this.removeLoadingCount();
		}
		if(CommonView._showloadingCount>0)
		{
			let thisName:string=this.getClassName();
			let hideData:{hide:Function,hideThisObj:any}=CommonView._waitHideList[thisName];
			if(hideData==null)
			{
				hideData={hide:this.hide,hideThisObj:this};
				CommonView._waitHideList[thisName]=hideData;
				App.LogUtil.log(thisName,"等待关闭");
				return;
			}
		}
		super.hide();
		if(this.hideScene())
		{
			let idx:number=CommonView.showedViewNameList.indexOf(this.getClassName());
			if(idx>-1)
			{
				CommonView.showedViewNameList.splice(idx,1);
			}
			if(CommonView.showedViewNameList.length<1)
			{
				SceneController.getInstance().showScene();
			}
		}
	}
	protected preInit():void
	{
		let thisName:string=this.getClassName();
		let hideScene=this.hideScene();
		if(hideScene)
		{
			let idx:number=CommonView.showedViewNameList.indexOf(thisName);
			if(idx<0)
			{
				CommonView.showedViewNameList.push(thisName);
			}
		}
		super.preInit();
		if(hideScene&&CommonView.showedViewNameList.length<2)
		{
			//日本特殊引导会导致主场景隐藏
			// if(Api.rookieVoApi.curStep == "127" && PlatformManager.checkIsJPSp()){

			// }else{
				SceneController.getInstance().hideScene();
			// }
		}
	}
	protected hideScene():boolean
	{
		return true;
	}

	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			this.viewBg = ResourceManager.getRes(bgName)?BaseBitmap.create(bgName):BaseLoadBitmap.create(bgName);;
			if(bgName=="public_9v_bg01"&&(this.viewBg instanceof BaseBitmap))
			{
				this.viewBg.fillMode=egret.BitmapFillMode.REPEAT;
			}
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
			this.addChild(this.viewBg);
			this.viewBg.width = GameConfig.stageWidth;
			this.viewBg.height = GameConfig.stageHeigth;
		}
	}

	private removeLoadingCount():void
	{
		CommonView._showloadingCount--;
		App.LogUtil.log("commonview.hideCount:",CommonView._showloadingCount);
		if(CommonView._showloadingCount==0)
		{
			for(let key in CommonView._waitHideList)
			{
				let hideData:{hide:Function,hideThisObj:any}=CommonView._waitHideList[key];
				if(hideData)
				{
					hideData.hide.call(hideData.hideThisObj);
					hideData.hide=null;
					hideData.hideThisObj=null;
					delete CommonView._waitHideList[key];
					App.LogUtil.log(this.getClassName()+"初始化完成,关闭界面"+key);
				}
			}
		}
	}

	protected init():void
	{
		this.removeLoadingCount();
		super.init();
		this.initRuleBtn();
	}
	protected initTitle():void
	{
		super.initTitle();
		if(this.titleBg && this.isShowTitleBgShadow())
		{
			let titleBgShadow:BaseBitmap=BaseBitmap.create("commonview_titlebgshadow");
			titleBgShadow.width=this.titleBg.width;
			titleBgShadow.setPosition(0,this.titleBg.y+this.titleBg.height);
			this.addChild(titleBgShadow);
		}
		// if(GameData.isUseNewUI)
		// {
			// let titleHuawen:BaseBitmap=BaseBitmap.create("commonview_titlebg02");
			// this.addChild(titleHuawen);
		// }
	}
	protected isShowTitleBgShadow()
	{
		return true;
	}
	protected initViewBg():void
	{
		super.initViewBg();
		
	}

	private initRuleBtn():void
	{
		//规则说明和概率说明 如果有一个就显示背景
		if(this.getRuleInfo() || this.getProbInfo() || this.getProbText())
		{
			this._ruleBg = BaseBitmap.create("commonview_titlebg02");
			// this._ruleBg.width = 150;
			this._ruleBg.x = 0;
			this._ruleBg.y = 0;
			this.addChild(this._ruleBg);
			if(PlatformManager.hasSpcialCloseBtn())
			{
				this._ruleBg.visible = false;
			}


		}

		if(this.getRuleInfo()){
			this._ruleBtn = ComponentManager.getButton("btn_rule","",this.clickRuleBtnHandler,this);
			this._ruleBtn.x = 3 + (PlatformManager.hasSpcialCloseBtn()?90:0);
			this._ruleBtn.y = 0                                                                ;
			this.addChild(this._ruleBtn);
		}

		

		if(this.getProbInfo() || this.getProbText()){
			this._probBtn = ComponentManager.getButton("btn_prob","",this.clickProbBtnHandler,this);
			let startX = 0;
			if(this._ruleBtn){
				startX = this._ruleBtn.x + this._ruleBtn.width + (PlatformManager.hasSpcialCloseBtn()?10:30);
			} else {
				startX = 3 + (PlatformManager.hasSpcialCloseBtn()?90:0);
			}
			this._probBtn.setScale(0.9);
			this._probBtn.x = 3 + startX;
			this._probBtn.y = 0                                                                ;
			this.addChild(this._probBtn);
		}

	}

	private clickRuleBtnHandler(param:any):void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.RULEINFOPOPUPVIEW, LanguageManager.getlocal(this.getRuleInfo(), this.getRuleParam()));
	}

	protected getRuleParam():string[]{
		return [];
	}
	
	private clickProbBtnHandler(param:any):void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.PROBINFOPOPUPVIEW, this.getProbText() || LanguageManager.getlocal(this.getProbInfo()));
	}

	/**概率文本优先使用这个 */
	protected getProbText(): string {
		return null;
	}

	// 需要加载的资源
	protected getResourceList():string[]
	{
		let titleBgName:string=this.getTitleBgName();
		let bgName:string=this.getBgName();
		let closeBtnName:string=this.getCloseBtnName();
		let resArr2:string[]=[];
		this.checkAndPushRes(bgName,resArr2);
		this.checkAndPushRes(titleBgName,resArr2);
		this.checkAndPushRes(closeBtnName,resArr2);
		this.checkAndPushRes(titleBgName+"shadow",resArr2);
		let lowClassName:string=this.getClassName().toLowerCase();
		if(RES.hasRes(lowClassName))
		{
			resArr2.push(lowClassName);
		}
		return super.getResourceList().concat(resArr2);
	}

	// 背景图名称
	protected getBgName():string
	{
	
		return "public_9v_bg01";
	}
	
	// 标题背景名称
	protected getTitleBgName():string
	{
		return "commonview_titlebg";
	}

	// 关闭按钮图标名称
	protected getCloseBtnName():string
	{
		return ButtonConst.COMMON_CLOSE_1;
	}
	

	// 规则说明内容
	protected getRuleInfo():string
	{
		let ruleStr=this.getClassName().toLowerCase().replace("view","")+"RuleInfo";
		if(LanguageManager.checkHasKey(ruleStr))
		{
			return ruleStr;
		}
		else
		{
			
		}
		return "";
	}
	//概率展示
	protected getProbInfo():string
	{

		if(!Api.switchVoApi.checkOpenProbInfo()){
			return "";
		}
		let probStr = this.getClassName().toLowerCase().replace("view","") + "ProbInfo";
		if(LanguageManager.checkHasKey(probStr))
		{
			return probStr;
		} else 
		{

		}
		return "";

	}

	protected getRuleBtnName():string
	{
		return "btn_rule"
	}

	public dispose():void
	{
		
		if(this._ruleBtn)
		{
			this.removeChild(this._ruleBtn);
			this._ruleBtn.dispose();
			this._ruleBtn = null;
		}
		if(this._probBtn)
		{
			this.removeChild(this._probBtn);
			this._probBtn.dispose();
			this._probBtn = null;
		}

		if(this._ruleBg)
		{
			this.removeChild(this._ruleBg);
			this._ruleBg.dispose();
			this._ruleBg = null;
		}
		super.dispose();
	}
}