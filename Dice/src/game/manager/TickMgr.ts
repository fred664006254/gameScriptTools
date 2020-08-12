namespace TickMgr 
{
	let isTicking:boolean=false;
	let tickList:{callback:Function,callbackThisObj:any,callbackParams:any[]}[]=[];
	let fastTickList:{callback:Function,callbackThisObj:any,callbackParams:any[]}[]=[];
	let nowdayzero:number=0;
	/**
	 * 开始tick 一帧一次，一秒一次
	 */
	export function startTick():void
	{
		if(isTicking)
		{
			return;
		}
		isTicking=true;
		// TimerMgr.doTimer(1000,0,tick,TickMgr);
		egret.startTick(fastTick,TickMgr);
	}

	/**
	 * 停止tick 一帧一次，一秒一次
	 */
	export function stopTick():void
	{
		isTicking=false;
		// TimerMgr.remove(tick,this);
		egret.stopTick(fastTick,TickMgr);
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
	export function addFastTick(callback:Function,callbackThisObj:any,callbackParams?:any[]):void
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
	export function removeFastTick(callback:Function,callbackThisObj:any):void
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
			GameData.serverTimeMs = new Date().getTime() + GameData.serverClientTimeDt;
			if(Math.floor(lastt/1000)!=Math.floor(GameData.serverTimeMs/1000))
			{
				istick=true;
			}
		}

		if(LoginMgr.isLoginGameSuccess)
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
		if(LoginMgr.isLoginGameSuccess)
		{
			if(!App.DateUtil.checkIsToday(GameData.lastFreshDayInfoTime)){
				GameData.lastFreshDayInfoTime=GameData.getServerTime();
				console.log(GameData.serverTimeMs);
				let tout = egret.setTimeout(()=>{
					egret.clearTimeout(tout);
					NetManager.request(NetConst.USER_FRESHDAYINFO,{});
				},null,2000);
			}
			else
			{
				if(GameData.serverTimeMs-GameData.lastReceiveTimeMs>4*60*1000)
				{
					GameData.lastReceiveTimeMs=GameData.serverTimeMs;
					NetManager.request(NetConst.USER_SYNC,{},false);
				}
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
}