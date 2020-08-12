class SceneController extends BaseController
{
	private static _instance:SceneController=undefined;
	private _curScene:string=undefined;
	private _lastScene:string=undefined;
	private _sceneList:Object=new Object();
	private _isTicking:boolean=false;
	private _goSceneCallBack:Function;
	private _goSceneCallBackThisObj:any;
	public constructor()
	{
		super();
		App.MsgHelper.addEvt(MsgConst.HIDE_LAST_SCENE,this.hideLastScene,this);
	}
	public playBg():void
	{
		let scene:BaseScene = this._sceneList[this._curScene];
		if(scene&&scene["playBg"])
		{
			scene["playBg"]();
		}
	}
	public go(sceneId:string,params:{[key:string]:any},successCallback?:Function,successCallbackThisObj?:any):void
	{
		if(this._curScene==sceneId)
		{
			return;
		}
		this._goSceneCallBack=successCallback;
		this._goSceneCallBackThisObj=successCallbackThisObj;
		this._lastScene=this._curScene;
		let scene:BaseScene=undefined;
		if(this._sceneList.hasOwnProperty(sceneId))
		{
			scene=this._sceneList[sceneId];
		}
		else
		{
			let sceneClass=egret.getDefinitionByName(sceneId);
			if(sceneClass)
			{
				scene=new sceneClass();
				this._sceneList[sceneId]=scene;
			}
			else
			{
				App.LogUtil.log("lost "+sceneId);
				return;
			}
		}
		scene.show(params);
		if(!this._isTicking)
		{
			this._isTicking=true;
			TickMgr.addTick(this.tick,this)
		}
	}
	private tick():void
	{
		if(this._sceneList)
		{
			for(let sceneId in this._sceneList)
			{
				let scene:BaseScene=this._sceneList[sceneId];
				if(scene&&scene.isShow()&&scene.isInit()&&scene.parent&&scene["tick"])
				{
					scene["tick"]();
				}
			}
		}
	}

	private hideLastScene(e:egret.Event):void
	{
		if(e&&e.data&&e.data.sceneId)
		{
			this._curScene=e.data.sceneId;
		}
		if(this._goSceneCallBack)
		{
			this._goSceneCallBack.call(this._goSceneCallBackThisObj);
			this._goSceneCallBack=this._goSceneCallBackThisObj=null;
		}
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

	public goReady(successCallback?:Function,successCallbackThisObj?:any):void
	{
		this.go(SceneConst.SCENE_READY,null,successCallback,successCallbackThisObj);
	}

	// public goScene(scene:string,params:{[key:string]:any},successCallback?:Function,successCallbackThisObj?:any):void
	// {
	// 	this.go(scene,params,successCallback,successCallbackThisObj);
	// }
	
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
				scene.show();
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
		this._goSceneCallBack=this._goSceneCallBackThisObj=null;
		this._curScene=null;
	}

	public dispose():void
	{
		this.hideAllScene(true);
		TickMgr.removeTick(this.tick,this);
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