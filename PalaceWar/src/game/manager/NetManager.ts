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
		switch(cmd)
		{
			case NetRequestConst.REQUEST_PRICHAT_SENDMSG:
			case NetRequestConst.REQUEST_CROSSCHAT_SENDMSG:
				if(data&&data.content)
				{
					Api.chatVoApi.checkShieldAndReportChat(data.content);
				}
				break;
			case NetRequestConst.REQUEST_USER_LOGIIN:
				data.clientVersion = GameConfig.version;
				break;
		}
		requestNum ++;
		data=formatRequest(cmd,data);
		socket.send(data,formatReceive,NetManager,addQueue);
	}

	/**
	 * 事件打点追踪 类型要和服务端商量好后定义
	 * @param kid 事件整体类型 如 女性玩家追踪
	 * @param id 具体事件打点 如 点击哪个红颜事件
	 */
	export function trackEvent(kid:string,id:string){
		this.request(NetRequestConst.REQUEST_STATS_TRACKEVENT,{
			kid : kid,
			id : id
		});
	}

	let chatSendData:any=null;
	let requestChatCallback:(data:{status:"success"|"timeout"|"fail"})=>void=null;
	let requestChatCallbackThisObj:any=null;
	export function requestChat(chatData:any,requestCallback?:(data:{status:"success"|"timeout"|"fail"})=>void,requestCallbackThisObj?:any):void
	{
		let channel = chatData.channel;
		let senderName = Api.playerVoApi.getPlayerName();
		let reciverName = "";
		let message = chatData.message;
		Api.chatVoApi.checkShieldAndReportChat(message);
		
		var sendTime: number = GameData.serverTime;
        let data: any = {};
        data.type = "chat";
        data.channel = channel;
        data.sender = Api.playerVoApi.getPlayerID();
        data.sendername = senderName;
        // data.reciver = reciver;
		data.recivername = reciverName;

		let kinget:number = 0;
		if (Api.promoteVoApi.isKing())
		{
			kinget = Api.promoteVoApi.getKingEndtime();
		}
		// kinget = GameData.serverTime + 5000;
        data.content = 
		{
			"message" : message,
			"pic" : Api.playerVoApi.getPlayePicId(),
			"vip" :  Api.playerVoApi.getPlayerVipLevel(),
			"title" : Api.playerVoApi.getTitleInfo(),
			"headBg" : Api.playerVoApi.getPlayerPtitle(),
			"sign" : Api.chatVoApi.getChatSign(),
			"ket" : kinget,
			hideVip : Api.otherInfoVoApi.getOpenHideVip(),
			// "ts" : GameData.serverTime
		};
        data.ts = GameData.serverTime;
        data.zoneid = ServerCfg.selectServer.zid;
		chatSendData=data;
		requestChatCallback=requestCallback;
		requestChatCallbackThisObj=requestCallbackThisObj;

		let callback=(e:egret.Event)=>
        {
            let sData: any = e.data;
			if(sData.ret==false)
			{
				return App.CommonUtil.showTip(LanguageManager.getlocal("searchPersonTalk73"));
			}
			chatSendData.mkey = (sData.data&&sData.data.data)?sData.data.data.mkey:"";
            // data.ts = sendTime;
			chat.send(chatSendData,requestChatCallback,requestChatCallbackThisObj);
			requestChatCallback=requestChatCallbackThisObj=null;
			App.LogUtil.log("发送聊天数据",chatSendData);
        }
		let typeKey:string=getMessageName(NetRequestConst.REQUEST_CHAT_ENCRYPT);
		if(!App.MessageHelper.hasEventListener(typeKey))
		{
			App.MessageHelper.addEventListener(typeKey,callback,NetManager)
		}
        request(NetRequestConst.REQUEST_CHAT_ENCRYPT,{});
		//  App.LogUtil.log("发送聊天数据",data);
		// chat.send(data);
	}

	export function chatServerLogout(callback:(data:any)=>void,callbackThisObj:any)
    {
        var tb: any = {};
        tb["type"] = "quit";
        tb["uid"] = Api.playerVoApi.getPlayerID();
        tb["nickname"] = Api.playerVoApi.getPlayerName();
        tb["access_token"] = GameData.access_token;
        tb["ts"] = GameData.logints;
        // var aid = Api.playerVoApi.getPlayerAllianceId();
		// var aid = LocalStorageManager.get("lastAllianceId")
		var aid = Api.chatVoApi._lastAllianceId;
        if (aid != 0)
        {
            tb["channel"] = Number(aid);
        }
        App.LogUtil.log("登出聊天服务器", tb);
        chat.send(tb,callback,callbackThisObj);
    }
	
    export function chatServerLogin(callback:(data:any)=>void,callbackThisObj:any)
    {
        var tb: any = {};
        tb["type"] = "login";
        tb["uid"] = (Api.playerVoApi.getPlayerID() ? Api.playerVoApi.getPlayerID() : 0);//Base.curUid;//uid;
        tb["nickname"] = Api.playerVoApi.getPlayerName();
        tb["access_token"] = GameData.access_token;//token;
        tb["ts"] = GameData.logints;//ts;
        var aid = Api.playerVoApi.getPlayerAllianceId();
        if (aid != 0)
        {
            tb["channel"] = aid;
        }

        var timeStr: string = Base64.encode(App.MathUtil.getRandom(10, 99) + GameData.logints.toString());
        var qStr: string = timeStr.substr(0, 2);
        var hStr: string = timeStr.substr(2);
        var keyStrs: string = Base64.encode((App.MathUtil.getRandom(5, 1000000) * 2.3).toString());
        var urlParm = qStr + keyStrs.substr(0, 5) + hStr;
        tb["pstr"] = urlParm;
        App.LogUtil.log("登陆聊天服务器", tb);
		chat.send(tb,(data)=>{
			if(callback&&data&&data.status=='success')
			{
				callback.apply(callbackThisObj);
			}
		},NetManager);
		// LocalStorageManager.set("lastAllianceId", String(aid));
		Api.chatVoApi._lastAllianceId = aid;
    }

	/**
	 * 处理发送数据
	 * @param data json对象
	 */
	function formatRequest(cmd:string,data:any):void
	{
		let result:any = {};
		let params:any = data ? data : {};
		if(cmd != NetRequestConst.REQUEST_CLIENT_CHAT)
		{
			switch(cmd)
			{
				case NetRequestConst.REQUEST_USER_LOGIIN:
					params["client_ip"] = GameData.client_ip;
					params["pid"] = PlatformManager.userId;
					if (GameData.pushToken)
					{
						params["pushToken"] = GameData.pushToken;
					}
					params["serverip"] = ServerCfg.lastServer.ip_server;
					params["serverport"] = ServerCfg.lastServer.port_server;
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
			result["uid"] = GameData.userId;
			result["ts"] = GameData.serverTime;
			result["logints"] = GameData.logints;
			result["rnum"] = requestNum;
			result["zoneid"] = ServerCfg.selectServer.zid;
			if(GameData.tstInputStr)
			{
				result["whitebi"]=GameData.tstInputStr;
			}
			// 
			if ((PlatformManager.checkIsLocal()&&!App.TestUtil.getTestPlat()) || PlatformManager.checkIs3KSp()|| PlatformManager.checkIsFkylcSp())
			{
				result["access_token"] = diffRequest(GameData.access_token,GameData.serverTime,cmd);
			}
			else 
			{	
				result["access_token"] = GameData.access_token;
			}
			// 添加公共数据end	
		}
		else
		{
			// todo聊天数据

		}
		return result;
	}

	function diffRequest(a:string,t:number,c:string):string
	{
		if (a && a.length>0)
		{	
			let s1:string = a.substring(0,5);	
			let s2:string = a.substring(5,10);
			let s3:string = a.substring(10,a.length);
			let nc:string = Base64.encode(s2+t+s1+c+s3);
			if (nc.length>60)
			{
				nc=nc.substring(9,59);
			}
			else 
			{
				nc = nc.substring(1,nc.length);
			}
			let reg = new RegExp(String(t%9),"g");
			nc= nc.replace(reg,"");
			return nc;
		}
	}

	/**
	 * 处理接收数据
	 * @param data json对象
	 */
	function formatReceive(rpdata:{status:"success"|"timeout"|"fail",data:any},callbackAction?:boolean):void
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
				GameData.serverTime = data.ts;
				// 计算服务器和客户端时间差
				GameData.serverClientTimeDt = data.ts - new Date().getTime()/1000;
			}
			if(data.timezone!=null)
			{
				GameData.timeZone=data.timezone;
			}
			if(data.cmd)
			{
				curReceiveCmd=data.cmd;
			}
			let rData:any = data.data;
			let isLogin:boolean=false;
			if(data.cmd &&data.cmd == NetRequestConst.REQUEST_USER_LOGIIN)
			{
				//todo
				LocalStorageManager.set(LocalStorageConst.LOCAL_USER_NAME,PlatformManager.userId);
				if(!callbackAction)
				{
					return GameConfig.switchNewOrOldCfg(rData&&rData.newCfgFlag!=null,()=>{
						formatReceive(rpdata,true);
					},NetManager);
				}
				if(rData&&rData.notices)
				{
					GameData.announcementData =data.data.notices;
					let tmpIdDic:{[t:string]:number}={};
					let operaIdDic:{[t:string]:number}={};
					let tmpOperaMaxT:number=0;
					let tmpMaxT:number=0;
					for (const key in GameData.announcementData) {
						if (GameData.announcementData.hasOwnProperty(key)) {
							const noticeData:{title:string,content:string,time_st:number,id:number,pub_t:number} = GameData.announcementData[key];
							if(noticeData.time_st&&noticeData.time_st>tmpMaxT)
							{
								tmpMaxT=Number(noticeData.time_st);
								if((!tmpIdDic[String(tmpMaxT)])||tmpIdDic[String(tmpMaxT)]<noticeData.id)
								{
									tmpIdDic[String(tmpMaxT)]=noticeData.id;
								}
							}

							if(noticeData.pub_t&&noticeData.pub_t>tmpOperaMaxT)
							{
								tmpOperaMaxT=Number(noticeData.pub_t);
								if((!operaIdDic[String(tmpOperaMaxT)])||operaIdDic[String(tmpOperaMaxT)]<noticeData.id)
								{
									operaIdDic[String(tmpOperaMaxT)]=noticeData.id;
								}
							}
						}
					}
					if(tmpOperaMaxT>tmpMaxT)
					{
						GameData.announcementLastestT=tmpOperaMaxT+"_"+operaIdDic[tmpOperaMaxT];
					}
					else
					{
						GameData.announcementLastestT=tmpMaxT+"_"+tmpIdDic[tmpMaxT];
					}

				}
				// rData.wbrewards = "6_1004_4|6_1302_4|6_1301_4|6_1303_4";
				// rData.wbrewardsFlag = true;
				//玩吧礼包
				if(rData && rData.wbrewards!=null)
				{
					GameData.wbrewards = rData.wbrewards;
				}

				if(rData&&rData.hideReward)
				{
					GameData.hideReward=rData.hideReward;
				}
				/**
				 * 玩吧礼包
				 */
				if(rData && rData.wbrewardsFlag!=null)
				{
					GameData.wbrewardsFlag=rData.wbrewardsFlag;
				}
				/**
				 *openShenhe 是否开启审核 1:开启审核、屏蔽排行榜  0:打开排行榜关闭审核
				 */
				// if(rData&&rData.switch&&rData.switch.openShenhe)
				// {
				// 	GameData.openShenhe =rData.switch.openShenhe;
				// }

				/**
				 * 糖果屋登录
				 */
				if(rData && rData.candyflag!=null)
				{
					GameData.candyflag=rData.candyflag;
				}
				/**
				 * 玩吧数据上报
				 */
				if(rData && rData.closeSource!=null)
				{
					GameData.closeSource=rData.closeSource;
				}
				/**
				 * 游戏内输入迁服验证码
				 */
				if(rData && rData.wbisshow!=null)
				{
					GameData.wbisshow=rData.wbisshow;
				}
				if(rData && rData.bioHave!=null)
				{
					GameData.bioHave=rData.bioHave;
				}
				/**
				 * 玩吧，设置分享信息
				 */
				// alert("checkIsFkylcSp:" + PlatformManager.checkIsFkylcSp());
				// if (RSDKHelper.isInit && (PlatformManager.checkIsWanbaSp() || PlatformManager.checkIs4399Sp() || PlatformManager.checkIsAiweiyouSp() || PlatformManager.checkIsFkylcSp())) {
				if (RSDKHelper.isInit ) {
					let tmpUid = data.uid;
					egret.callLater(()=>{
						// alert("RSDKHelper.setShareInfo:"+ tmpUid);
						RSDKHelper.setShareInfo(tmpUid);
					}, null, data.uid);
				}
				isLogin=true;
			}
			if(rData&&rData.statUrl)
			{
				GameData.statUrl=rData.statUrl;
			}
			if(rData&&rData.limitVipLv)
			{
				GameData.limitVipLv=rData.limitVipLv;
				GameData.limitVipLv.sort((a,b)=>{
					return a-b;
				})
			}
			/**
			 * 聊天等级
			 */
			if(rData && rData.chatlevel!=null)
			{
				GameData.chatlevel=rData.chatlevel;
			}

			//推送消息
			if(rData && rData.gamebarmsg!=null) 
			{
				 PlatformManager.pushMsg(rData.gamebarmsg);
			}
			//红点 2020.6.29
			if(rData && rData.redpoint!=null && data.cmd == NetRequestConst.REQUEST_USER_SYNC) 
			{
				Api.redpointVoApi.formatData(rData.redpoint);
				Api.acVoApi.isHandled_LRP = false;
			}
			if(data.timezone!=null)
			{
				GameData.timeZone=data.timezone;
			}
			checkData = checkServerData(data);
			if(checkData.ret == false)
			{
				if(checkData.data.ret==-125)
				{
					ViewController.getInstance().openView(ViewConst.POPUP.OFFLINEVIEW,{
						title:"itemUseConstPopupViewTitle",
						msg:LanguageManager.getlocal("accountprompting"),
						callback:this.refreshHandler,
						handler:this,
						needCancel:false
					});
				}
			
				if(checkData.data.ret==-999)
				{
					let rewardStr = LanguageManager.getlocal("accountLock",);
					// let msg = LanguageManager.getlocal("adultMarryCancalMsg",[rewardStr])
					ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
						title:"itemUseConstPopupViewTitle",
						msg:rewardStr,
						callback:this.doDis,
						handler:this,
						needCancel:false
					});
					NetLoading.hide();
					return;
				}
			}
			else
			{
				Api.formatData(rData,data.cmd);
				if (rData.rewards) {
					Api.formatRewardData(rData.rewards);
				}
				
				if(rData.unlockServant&&!rData.unlockWife)
				{

					if(data.cmd == NetRequestConst.REQUEST_USER_UPGRADE){
						let data = {unlockServant:rData.unlockServant};
						Api.servantVoApi.setWaitShowData(data);
					}
					else{
						// ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW,rData.unlockServant); 
						Api.verifySpecialReward(rData.unlockServant,true);
					}
					
				}
				if(rData.unlockWife&&data.cmd != NetRequestConst.REQUEST_USER_LOGIIN)
				{
					if(data.cmd == NetRequestConst.REQUEST_USER_UPGRADE ||data.cmd == NetRequestConst.REQUEST_SEARCH_PLAY){
						let data = {unlockWife:rData.unlockWife,unlockServant:rData.unlockServant};
						Api.wifeVoApi.setWaitShowWife(data);
					}
					else{
						Api.verifySpecialReward(rData.unlockWife,false);
						// ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW,{wifeIdList:rData.unlockWife,servantId:rData.unlockServant});
					}
					
				}
				Api.openSpecialView();
				if(rData.unlockServantSkin)
				{	
					if(data.cmd == NetRequestConst.REQUEST_USER_UPGRADE){
						let data2 = {unlockServantSkin:rData.unlockServantSkin};
						Api.servantVoApi.setWaitShowData2(data2);
					}
					//App.CommonUtil.showTip(LanguageManager.getlocal("unLockServantSkinTip"));
				}
				if(isLogin&&Config.AcCfg.isGetAll==false)
				{
					NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG,{});
				}
			}
			// 解析公共数据start
			if(data.ts && checkData.ret == true)  
			{
				TickManager.startTick();
			}
			// 版本踢人
			if (data.data && data.data.verinfo && data.data.verinfo.ver && window["VERINFO_VER"] && data.data.verinfo.ver  > window["VERINFO_VER"]) {
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					title:"itemUseConstPopupViewTitle",
					msg:data.data&&data.data.verinfo&&data.data.verinfo.msg?data.data.verinfo.msg:LanguageManager.getlocal("versionCompareInfo"),
					callback:(dlg)=>{
						window.location.reload();
					},
					handler:null,
					clickNotAutoHide:true,
					inLayer:LayerManager.maskLayer
				});
			}
		}
		// 解析公共数据end
		//上面填解析data代码
		let requestType:string=(data&&data.cmd)?data.cmd:NetRequestConst.REQUEST_CLIENT_CHAT;
		App.MessageHelper.dispatchNetMessage(requestType,checkData);
	}
	export function refreshHandler():void
	{
		LoginManager.changeAccount();
	}

	export function formatPushData(data:{status:"success"|"timeout"|"fail",data:any}):void
	{
		formatReceive(data);
		if(data&&data.data&&data.data.cmd==NetPushConst.PUSH_PAY)
		{
			let tmpData=data.data;
			if (tmpData && tmpData.payment && tmpData.payment.itemId)
			{
				delete GameData.payWaitSendDic[tmpData.payment.itemId];
			}
		}
	}

	/**
	 * 处理聊天数据
	 * @param data 
	 */
	export function formatReceiveChat(data:any):void
	{
		if(data.type != "chat")
		{
			return;
		}
	
	
		Api.formatChatData(data);
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
					if(LanguageManager.checkHasKey(tipKey)==false)
					{
						tipKey="requestFailCode"+data.ret;
					}
					if(LanguageManager.checkHasKey(tipKey)==false)
					{
						tipKey="requestLoadErrorTip";
					}
				}
				App.CommonUtil.showTip(LanguageManager.getlocal(tipKey));
			}
			ret = false;
		}
		return {data:data,ret:ret};
	}

	/**
	 * 根据请求cmd
	 * @param requestType 
	 */
	export function getMessageName(requestType:string):string
	{
		return "socket_receivedata_"+requestType;
	}

	/**
	 * 检测是否是https连接
	 */
	export function checkHttps():boolean
	{
		return Http.getProtocol()=="https:";
	}
}