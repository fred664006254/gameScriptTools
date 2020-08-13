namespace TickManager 
{
	let isTicking:boolean=false;
	let tickList:{callback:Function,callbackThisObj:any,callbackParams:any[]}[]=[];
	let fastTickList:{callback:(t:number,...args)=>void,callbackThisObj:any,callbackParams:any[]}[]=[];
	/**
	 * 开始tick 一秒一次
	 */
	export function startTick():void
	{
		if(isTicking)
		{
			return;
		}
		isTicking=true;
		egret.startTick(fastTick,TickManager);
	}

	/**
	 * 停止tick 一秒一次
	 */
	export function stopTick():void
	{
		isTicking=false;
		TimerManager.remove(fastTick,this);
	}

	/**
	 * 添加tick监听
	 * @param callback 
	 * @param callbackThisObj 
	 * @param callbackParams 
	 */
	export function addTick(callback:Function,callbackThisObj:any,callbackParams?:any[]):void
	{
		if(callback)
		{
			tickList.push({callback:callback,callbackThisObj:callbackThisObj,callbackParams:callbackParams});
		}
	}

	/**
	 * 移除tick监听
	 * @param callback 
	 * @param callbackThisObj 
	 */
	export function removeTick(callback:Function,callbackThisObj:any):void
	{
		let l:number=tickList.length;
		for(var i:number=l-1;i>=0;i--)
		{
			let callData=tickList[i];
			if(callData.callback==callback&&callData.callbackThisObj==callbackThisObj)
			{
				tickList.splice(i,1);
				break;
			}
		}
	}

	/**
	 * 添加tick监听
	 * @param callback 
	 * @param callbackThisObj 
	 * @param callbackParams 
	 */
	export function addFastTick(callback:(t:number,...args)=>void,callbackThisObj:any,callbackParams?:any[]):void
	{
		if(callback)
		{
			fastTickList.push({callback:callback,callbackThisObj:callbackThisObj,callbackParams:callbackParams});
		}
	}

	/**
	 * 移除tick监听
	 * @param callback 
	 * @param callbackThisObj 
	 */
	export function removeFastTick(callback:(t:number,...args)=>void,callbackThisObj:any):void
	{
		let l:number=fastTickList.length;
		for(var i:number=l-1;i>=0;i--)
		{
			let callData=fastTickList[i];
			if(callData.callback==callback&&callData.callbackThisObj==callbackThisObj)
			{
				fastTickList.splice(i,1);
				break;
			}
		}
	}
	
	function fastTick(t:number):boolean
	{
		let istick:boolean=false;
		if(GameData.serverTimeMs)
		{
			let lastt=GameData.serverTimeMs;
			let curT=Date.now() + GameData.serverClientTimeDt;
			if(Math.floor(lastt/1000)!=Math.floor(curT/1000))
			{
				GameData.setServerTime(curT);
				istick=true;
			}
			else
			{
				GameData.serverTimeMs=curT;
			}
		}
		if(LoginManager.isLoginSuccess)
		{
			if(fastTickList)
			{
				let l:number=fastTickList.length;
				for(var i:number=l-1;i>=0;i--)
				{
					let callData=fastTickList[i];
					if(callData&&callData.callback)
					{
						let params=callData.callbackParams||[];
						params.unshift(t);
						callData.callback.apply(callData.callbackThisObj,params);
					}
					else
					{
						App.LogUtil.log('lost callbackData');
					}
				}
			}
		}
		istick&&tick();
		return false;
	}

	function tick():void
	{
		if(GameData.serverTime)
		{
			if(GameData.lastAutoSyncTime == 0)
			{
				GameData.lastAutoSyncTime = GameData.serverTime;
			}
			if(GameData.pauseSync == false)
			{
				//检查心跳
				if((GameData.serverTime - GameData.lastAutoSyncTime) >= 60)
				{
					GameData.lastAutoSyncTime = GameData.serverTime;
					if(Api.rookieVoApi.isInGuiding == false)
					{
						NetManager.request(NetRequestConst.REQUEST_USER_SYNC,null);
					}
				}
				else
				{
					//是否跨天，跨天后需要同步数据
					if(App.DateUtil.checkIsToday(GameData.lastAutoSyncTime) == false && Api.rookieVoApi.isInGuiding == false)
					{
						GameData.lastAutoSyncTime = GameData.serverTime;
						let tout = egret.setTimeout(()=>{
							egret.clearTimeout(tout);
							NetManager.request(NetRequestConst.REQUEST_USER_SYNC,null);
						},null,2000);
					}
				}
			}
			if(LoginManager.isCreateScene == true && GameData.serverTime%5 == 0){
				Api.levyVoApi.levyUpdate();
			}
			// GameData.serverTime = Math.floor((Date.now() + GameData.serverClientTimeDt)/1000);
		}
		if(tickList)
		{
			let l:number=tickList.length;
			for(var i:number=l-1;i>=0;i--)
			{
				let callData=tickList[i];
				if(callData.callback)
				{
					callData.callback.apply(callData.callbackThisObj,callData.callbackParams);
				}
			}
		}
	}
}