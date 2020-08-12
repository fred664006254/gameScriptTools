/**
 * 通用大面板的父类
 * author dmj
 * date 2017/9/16
 * @class CommonView
 */
abstract class CommonView extends BaseView
{
	private static showedViewNameList:string[]=[];

	protected _guideBtn:BaseButton = null;

	// private static _waitHideList:Object={};
	
	/**
	 * 正在加载的界面数量
	 */
	// private static _showloadingCount:number=0;
	public constructor() 
	{
		super();
	}

	private initStageEvent():void
	{
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStageHandler,this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeToStageHander,this);
	}

	private removeStageEvent():void
	{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.addToStageHandler,this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeToStageHander,this);
	}

	private addToStageHandler(e:egret.Event)
	{
	}
	
	private removeToStageHander(e:egret.Event)
	{
	}

	/**
	 * 
	 * @param data data tab:有tabbar时，需要传该参数，tab代表默认打开的页签，从0开始,如果有2级页签时，可以传"0-1"
	 */
	public show(data?:{tab?:string}):void
	{
		if(this.isShow())
		{
			this.switchToTop(data);
			return;
		}
		super.show(data);
	}
	public hide():void
	{
		if(!this.isShow())
		{
			return;
		}
		super.hide();
		let idx:number=CommonView.showedViewNameList.indexOf(this.getClassName());
		if(idx>-1)
		{
			CommonView.showedViewNameList.splice(idx,1);
		}
		if(CommonView.showedViewNameList.length==0)
		{
			SceneController.getInstance().showScene();
		}
	}
	protected preInit():void
	{
		let thisName:string=this.getClassName();
		let idx:number=CommonView.showedViewNameList.indexOf(thisName);
		if(idx<0)
		{
			CommonView.showedViewNameList.push(thisName);
		}
		super.preInit();
		if(CommonView.showedViewNameList.length==1)
		{
			SceneController.getInstance().hideScene();
		}
	}

	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			this.viewBg = BaseBitmap.create(bgName);
			if(bgName=="commonview_bg1"&&(this.viewBg instanceof BaseBitmap))
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


	protected init():void
	{
		super.init();
		this.initStageEvent();
		this.initGuideAgain();
		
	}
	protected initTitle():void
	{
		super.initTitle();
		// if(this.titleBg)
		// {
		// 	let titleBgShadow:BaseBitmap=BaseBitmap.create("commonview_titlebgshadow");
		// 	titleBgShadow.width=this.titleBg.width;
		// 	titleBgShadow.setPosition(0,this.titleBg.y+this.titleBg.height);
		// 	this.addChild(titleBgShadow);
		// 	this.titleBgShadow = titleBgShadow;
		// }
	}
	
	// 需要加载的资源
	protected getResourceList():string[]
	{
		let titleBgName:string=this.getTitleBgName();
		let bgName:string=this.getBgName();
		let closeBtnName:string=this.getCloseBtnName();
		let titlePicName:string=this.getTitlePic();
		let resArr2:string[]=[];
		let bigframePic:string=this.getBigFrame();
		let beamPic:string=this.getBeamName();
		this.checkAndPushRes(titlePicName,resArr2);
		this.checkAndPushRes(bgName,resArr2);
		this.checkAndPushRes(titleBgName,resArr2);
		this.checkAndPushRes(closeBtnName,resArr2);
		this.checkAndPushRes(titleBgName+"shadow",resArr2);
		this.checkAndPushRes(bigframePic,resArr2);
		this.checkAndPushRes(beamPic,resArr2);
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
		return "commonview_bg1";
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
	
	protected getRuleBtnName():string
	{	
		return "btn_rule";
	}

	/**
	 * 被新打开的全屏界面遮挡触发，重写需处理动画暂停
	 */
	protected onBeCoverHandler():void
	{
		App.LogUtil.log(this.getClassName()+"被遮挡");
	}

	/**
	 * 被遮挡的界面上层view关闭，恢复到最上层时候触发，重写需处理动画恢复
	 */
	protected onTopHandler():void
	{
		App.LogUtil.log(this.getClassName()+"切到top");
	}

	protected isHideTitleBgShadow():boolean{
		return false;
	}

	protected getBigFrame():string
	{	
		return null;
	}

	protected showGuideAgain():string
	{
		return null;
	}

	protected initGuideAgain():void
	{
	}

	public dispose():void
	{
		
		super.dispose();
		this.removeStageEvent();
	}
}