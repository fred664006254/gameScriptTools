class SceneController extends BaseController
{
	private static _instance:SceneController=undefined;
	private _curScene:string=undefined;
	private _lastScene:string=undefined;
	private _sceneList:Object=new Object();
	private _isTicking:boolean=false;
	public constructor()
	{
		super();
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_HIDE_LAST_SCENE,this.hideLastScene,this);
	}
	public playBg():void
	{
		let scene:BaseScene = this._sceneList[this._curScene];
		if(scene&&scene["playBg"])
		{
			scene["playBg"]();
		}
	}
	public go(sceneId:string):void
	{
		// if(sceneId)
		// {
		// 	ViewController.getInstance().hideView(ViewConst.BASE.LOGINVIEW);
		// }
		if(this._curScene==sceneId)
		{
			return;
		}
		this._lastScene=this._curScene;
		// if(this._curScene)
		// {
		// 	if(this._sceneList.hasOwnProperty(this._curScene))
		// 	{
		// 		let curScene:BaseScene = this._sceneList[this._curScene];
		// 		if(curScene)
		// 		{
		// 			curScene.hide();
		// 		}
		// 	}
		// }
		let scene:BaseScene=undefined;
		if(this._sceneList.hasOwnProperty(sceneId))
		{
			scene=this._sceneList[sceneId];
		}
		else
		{
			let sceneClass=egret.getDefinitionByName(sceneId);
			scene=new sceneClass();
			this._sceneList[sceneId]=scene;
		}
		this._curScene=sceneId;
		scene.show();
		if(!this._isTicking)
		{
			this._isTicking=true;
			TickManager.addTick(this.tick,this)
			TickManager.addFastTick(this.fastTick,this)
		}
	}
	private tick():void
	{
		if(this._sceneList)
		{
			for(let sceneId in this._sceneList)
			{
				let scene:BaseScene=this._sceneList[sceneId];
				if(scene&&scene.isShow()&&scene.isInit()&&scene.parent)
				{
					scene["tick"]&&scene["tick"]();
				}
			}
		}
	}

	private fastTick(t:number):void
	{
		if(this._sceneList)
		{
			for(let sceneId in this._sceneList)
			{
				let scene:BaseScene=this._sceneList[sceneId];
				if(scene&&scene.isShow()&&scene.isInit()&&scene.parent)
				{
					scene["fastTick"]&&scene["fastTick"](t);
				}
			}
		}
	}

	private hideLastScene():void
	{
		if(this._lastScene)
		{
			if(this._sceneList.hasOwnProperty(this._lastScene))
			{
				let curScene:BaseScene = this._sceneList[this._lastScene];
				if(curScene)
				{
					curScene.hide();
				}
			}
		}
	}

	public jump():void
	{
		if(this._curScene==SceneConst.SCENE_HOME||this._curScene==SceneConst.SCENE_COMPOSE)
		{
			this.goCity();
		}
		else
		{
			this.goCompose();
		}
	}

	public goCompose():void
	{
		this.go(SceneConst.SCENE_COMPOSE);
	}

	public goHome():void
	{
		this.go(SceneConst.SCENE_HOME);
	}
	public goCity():void
	{
		this.go(SceneConst.SCENE_CITY);
	}
	public hideScene():void
	{
		if(this._curScene&&this._sceneList&&this._sceneList[this._curScene])
		{
			let scene:BaseScene = this._sceneList[this._curScene];
			if(scene.isShow())
			{
				scene.hide();
			}
		}
	}
	public showScene():void
	{
		if(this._curScene&&this._sceneList&&this._sceneList[this._curScene])
		{
			let scene:BaseScene = this._sceneList[this._curScene];
			if(scene)
			{
				scene.show(true);
			}
		}
	}
	
	public hideAllScene(isDispose?:boolean):void
	{
		if(this._sceneList)
		{
			for(let sceneId in this._sceneList)
			{
				let scene:BaseScene=this._sceneList[sceneId];
				if(scene&&scene.isShow())
				{
					scene.hide(isDispose);
				}
			}
		}
		this._curScene=null;
	}

	public dispose():void
	{
		this.hideAllScene(true);
		TickManager.removeTick(this.tick,this);
		TickManager.removeFastTick(this.fastTick,this);
		this._isTicking=false;
	}

	public static getInstance():SceneController
	{
		if(!SceneController._instance)
		{
			SceneController._instance=new SceneController();
		}
		return SceneController._instance;
	}
}