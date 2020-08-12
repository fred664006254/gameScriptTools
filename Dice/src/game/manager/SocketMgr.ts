/**
 * 网络通信管理
 * author 陈可
 * date 2017/9/15
 * @class NetManager
 */
namespace NetManager 
{
	export let curReceiveCmd:string="";
	let requestNum:number = 0;
	/**
	 * 发送socket请求
	 * @param cmd 请求key
	 * @param data 数据
	 * @param addQueue 是否添加到请求队列，默认true 添加到队列，如设置false则不走请求队列另起ws，需注意非队列的ws没有login，如要设置false请先和后端确认此请求是否可行
	 */
	export function request(cmd:string,data:any,addQueue:boolean=true):void
	{
		requestNum++;
		data=formatRequest(cmd,data);
		socket.send(data,formatReceive,NetManager,addQueue);
	}

	/**
	 * 事件打点追踪 类型要和服务端商量好后定义
	 * @param kid 事件整体类型 如 女性玩家追踪
	 * @param id 具体事件打点 如 点击哪个红颜事件
	 */
	export function trackEvent(kid:string,id:string){
		this.request(NetConst.TRACKEVENT_STATS,{
			kid : kid,
			id : id
		});
	}
	/**
	 * 处理发送数据
	 * @param data json对象
	 */
	function formatRequest(cmd:string,data:any):void
	{
		let result:any = {};
		let params:any = data ? data : {};
		if(cmd != NetConst.CLIENT_CHAT)
		{
			switch(cmd)
			{
				case NetConst.USER_LOGIIN:
					params["client_ip"] = GameData.client_ip;
					params["pid"] = PlatMgr.userId;
					if (GameData.pushToken)
					{
						params["pushToken"] = GameData.pushToken;
					}
					// params["bindid"] = 
					// params["buidtype"] = 
					// params["deviceid"] = 
					break;
				// default:
				// 	params = data;
				// 	break;	
			}

			result["cmd"] = cmd;
			result["params"] = params;
			// 添加公共数据start
			result["uid"] = Api.UserinfoVoApi.getUid();
			result["ts"] = GameData.serverTimeMs;
			result["logints"] = GameData.logints;
			result["rnum"] = requestNum;
			result["zoneid"] = ServerCfg.selectServer.zid;
			if(GameData.tstInputStr)
			{
				result["whitebi"]=GameData.tstInputStr;
			}
			// 
			result["access_token"] = GameData.access_token;
			// 添加公共数据end	
		}
		else
		{
			// todo聊天数据

		}
		return result;
	}

	/**
	 * 处理接收数据
	 * @param data json对象
	 */
	export function formatReceive(rpdata:{status:"success"|"timeout"|"fail",data:any},callbackAction?:boolean):void
	{	
		let status=rpdata.status;
		let data=rpdata.data;
		let checkData=null;

		if(status=="timeout"||status=="fail")
		{
			console.log("game socket" + status);
			checkData=checkServerData(data);
			// return;
		}
		else if(data)
		{
			if(data.ts)
			{
				GameData.lastReceiveTimeMs=data.ts;
				GameData.serverTimeMs = data.ts;
				// 计算服务器和客户端时间差
				GameData.serverClientTimeDt = data.ts - new Date().getTime();
				if(GameData.lastFreshDayInfoTime==0)
				{
					GameData.lastFreshDayInfoTime=App.DateUtil.getWeeTs(GameData.getServerTime());
				}
			}
			if(data.data && data.data.timezone!=null)
			{
				GameData.timeZone=data.data.timezone;
			}
			if(data.cmd)
			{
				curReceiveCmd=data.cmd;
			}
			let rData:any = data.data;
			let rMode=data.model;
			let isLogin:boolean=false;
			if(data.cmd &&data.cmd == NetConst.USER_LOGIIN)
			{
				//todo
				LocalStorageMgr.set(LocalStorageConst.LOCAL_USER_NAME,PlatMgr.userId);
				
				if (RSDKHelper.isInit ) {
					let tmpUid = data.uid;
					egret.callLater(()=>{
						// alert("RSDKHelper.setShareInfo:"+ tmpUid);
						RSDKHelper.setShareInfo(tmpUid);
					}, null, data.uid);
				}
				isLogin=true;
			}

			//推送消息
			if(rData && rData.gamebarmsg!=null) 
			{
				 PlatMgr.pushMsg(rData.gamebarmsg);
			}
			checkData = checkServerData(data);
			if(checkData.ret == false)
			{
				if(checkData.data.ret==-125)
				{
					ViewController.getInstance().openView(ViewConst.OFFLINEVIEW,{
						title:LangMger.getlocal("sysTip"),
						msg:LangMger.getlocal("accountprompting"),
						callback:()=>{refreshHandler()},
						closecallback:()=>{refreshHandler()},
						handler:NetManager,
						needCancel:false
					});
				}
			
				if(checkData.data.ret==-999)
				{
					let rewardStr = LangMger.getlocal("accountLock",);
					// let msg = LanguageManager.getlocal("adultMarryCancalMsg",[rewardStr])
					ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW,{
						title:LangMger.getlocal("sysTip"),
						msg:rewardStr,
						callback:()=>{},
						handler:NetManager,
						needCancel:false
					});
					NetLoading.hide();
					return;
				}
			}
			else
			{
				Api.formatUserData(data);
			}
			// 解析公共数据start
			if(data.ts && checkData.ret == true)  
			{
				TickMgr.startTick();
			}
			// 版本踢人
			checkCSVersion(data.version);
		}
		// 解析公共数据end
		//上面填解析data代码
		let requestType:string=(data&&data.cmd)?data.cmd:NetConst.CLIENT_CHAT;
		App.MsgHelper.dispEvt(requestType,checkData);
	}
	function refreshHandler():void
	{
		LoginMgr.changeAccount();
		if(App.DeviceUtil.IsHtml5())
		{
			window.location.reload();
		}
		else
		{
			PlatMgr.forceAppExit();
		}
	}

	export function checkCSVersion(sVersion:number):boolean
	{
		if(BattleStatus.startBattleTime<=0)
		{
			if (sVersion && window["VERINFO_VER"] && sVersion  > window["VERINFO_VER"]) {
				ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW,{
					title:LangMger.getlocal("sysTip"),
					msg:LangMger.getlocal("versionCompareInfo"),
					callback:(dlg)=>{
						refreshHandler();
					},
					closecallback:()=>{
						refreshHandler();
					},
					handler:NetManager,
					clickNotAutoHide:true,
					inLayer:LayerMgr.msgLayer
				});
				return false;
			}
		}
		return true;
	}

	export function formatPushData(data:{status:"success"|"timeout"|"fail",data:any}):void
	{	
		formatReceive(data);
		if(data&&data.data&&data.data.cmd==NetPushConst.PUSH_PAY)
		{	
			let tmpData=data.data.data;
			if (tmpData && tmpData.payment && tmpData.payment.itemId)
			{
				// 服务器已发货，打点统计（微信）
				PlatMgr.analyticsWxBuy(tmpData)
				delete GameData.payWaitSendDic[tmpData.payment.itemId];
			}
		}
	}

	/**
	 * 检查数据是否有报错
	 * @param data 
	 */
	export function checkServerData(data:any):{ret:boolean,data:any}
	{
		var ret:boolean = true;
		if(data.ret < 0)
		{
			let cmd:string = data.cmd;
			if (cmd&&GameConfig.noTipCmd.indexOf(cmd)<0)
			{
				let tipKey:string = "";
				tipKey = cmd.replace(".","")+"FailCode"+data.ret;
				if(data.ret==ResponseEnums.socketError)
				{
					tipKey ="netWarnDesc";
				}
				else
				{
					if(LangMger.checkHasKey(tipKey)==false)
					{
						tipKey="requestFailCode"+data.ret;
					}
					if(LangMger.checkHasKey(tipKey)==false)
					{
						tipKey="requestLoadErrorTip";
					}
				}
				//-125为帐号异地登陆 已经有弹出框提示 此处不再弹出
				if(data.ret != -125)
				{
					App.CommonUtil.showTip(LangMger.getlocal(tipKey));
				}
			}
			ret = false;
		}
		return {data:data,ret:ret};
	}

	/**
	 * 检测是否是https连接
	 */
	export function checkHttps():boolean
	{
		return Http.getProtocol()=="https:";
	}
}