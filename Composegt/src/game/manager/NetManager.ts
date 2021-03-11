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
	 */
	export function request(cmd:string,data:any):void
	{
		switch(cmd)
		{
			case NetRequestConst.REQUEST_PRICHAT_SENDMSG:
			case NetRequestConst.REQUEST_CROSSCHAT_SENDMSG:
				if(data&&data.content &&(PlatformManager.checkIsWxSp()|| PlatformManager.checkIsWxmgSp()))
				{
					Api.chatVoApi.checkShieldAndReportChat(data.content,data.channel);
				}
				break;
		}
		requestNum ++;
		data=formatRequest(cmd,data);
		NetManager.socket.send(data,formatReceive,NetManager);
	}

	export function requestChat(chatData:any):void
	{	

		PlatformManager.analytics37Point("custom_social","chat_behavior",1);
		let channel = chatData.channel;
		let senderName = Api.playerVoApi.getPlayerName();
		let reciverName = "";
		let message = chatData.message;
		if(PlatformManager.checkIsWxSp()||PlatformManager.checkIsWxmgSp())
		{
			Api.chatVoApi.checkShieldAndReportChat(message,channel);
		}
		
		
		var sendTime: number = GameData.serverTime;
        var data: any = {};
        data.type = "chat";
        data.channel = channel;
        data.sender = Api.playerVoApi.getPlayerID();
        data.sendername = senderName;
        // data.reciver = reciver;
        data.recivername = reciverName;
		if(PlatformManager.chat_mkey)
		{
			data.mkey = PlatformManager.chat_mkey;
		}
		if(channel!=1)
		{
			data.nocheck = "tank_hwm";
		}

		let titleLv:number = 0;
		let titleId = Api.playerVoApi.getVipHeadID();
		let tlv:string = "";
		if(titleId != null){
			let titleInfo:TitleInfoVo = Api.itemVoApi.getTitleInfoVoById(Number(titleId));
			if (Api.switchVoApi.checkOpenTitleLv() && titleInfo.isLvUp == 1)
			{
				titleLv = titleInfo.lv;
			}
		}
		
		let ttitleid = Api.playerVoApi.getTitleid();
		let titleInfo2:TitleInfoVo = Api.itemVoApi.getTitleInfoVoById(Number(ttitleid));
		if(titleInfo2){
			let itemCfg = titleInfo2.itemCfg ;
			if( itemCfg && itemCfg.emperorLvUpNeed && itemCfg.emperorLvUpNeed.length > 0 ){
				tlv = ""+titleInfo2.lv;
			}
		}

		let kinget:number = 0;
		if (Api.itemVoApi.getTitleInfoVoById(3201).num > 0)
		{
			kinget = 100;//Api.promoteVoApi.getKingEndtime();
		}

        data.content = 
		{
			"message" : message,
			"pic" : Api.playerVoApi.getPlayePicId(),
			"vip" :  Api.playerVoApi.getPlayerVipLevel(),
			"title" : Api.playerVoApi.getTitleid(),
			"headID" : Api.playerVoApi.getVipHeadID(),
			"sign" : Api.chatVoApi.getChatSign(),
			"titleLv":titleLv,
			"ket" : kinget,
			"tlv":tlv
			// "ts" : GameData.serverTime
		};
		if(PlatformManager.chat_ts&&PlatformManager.chat_mkey){
			data.ts = PlatformManager.chat_ts;
			PlatformManager.chat_ts = null;
		}else{
			data.ts = GameData.serverTime;	
		}
        
        data.zoneid = ServerCfg.selectServer.zid;

        // function callback(e:egret.Event)
        // {
        //     var sData: any = e.data;
        //     data.mkey = sData.chatStr;
        //     data.ts = sendTime;
		// 	chat.send(data);
        // }
		// let typeKey:string=getMessageName(NetRequestConst.REQUEST_CHAT_ENCRYPT);
		// if(!App.MessageHelper.hasEventListener(typeKey))
		// {
		// 	App.MessageHelper.addEventListener(typeKey,callback,NetManager)
		// }
        // request(NetRequestConst.REQUEST_CHAT_ENCRYPT,{});
		 App.LogUtil.log("发送聊天数据",data);
		NetManager.chat.send(data);
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
        NetManager.chat.send(tb,callback,callbackThisObj);
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
		NetManager.chat.send(tb);
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
					if(GameData.isTestUser||GameData.isLocal()||GameData.isTest())
					{
						params["client_ip"] = "103.216.43.176";
					}
					params["pid"] = PlatformManager.userId;
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
			PlatformManager.chat_ts = GameData.serverTime;
			result["logints"] = GameData.logints;
			result["rnum"] = requestNum;
			result["zoneid"] = ServerCfg.selectServer.zid;
			
			if (PlatformManager.checkIsWxSp()||PlatformManager.checkIsWxmgSp())
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
			// App.CommonUtil.showTip(LanguageManager.getlocal("netWarnDesc"));
			checkData=checkServerData(data);
			// return;
		}
		else if(data)
		{
			if(data.ts)
			{
				// TickManager.startTick();
				GameData.setServerTime(data.ts*1000,true);
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
					if(rData&&rData.newCfgFlag)
					{
						GameData.isNewCfgFlag = rData&&rData.newCfgFlag;
					}
					let boo = false;
					if(GameData.isNewCfgFlag)
					{
						boo = true;
					}
					return GameConfig.switchNewOrOldCfg(boo,()=>{
						formatReceive(rpdata,true);
					},NetManager);
				}
				if(rData&&rData.notices)
				{
					GameData.announcementData =data.data.notices;
				}
				// rData.wbrewards = "6_1004_4|6_1302_4|6_1301_4|6_1303_4";
				// rData.wbrewardsFlag = true;
				//玩吧礼包
				if(rData && rData.wbrewards!=null)
				{
					GameData.wbrewards = rData.wbrewards;
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

				//玩吧礼包
				if(rData && rData.bigPayId!=null)
				{
					GameData.bigPayId = rData.bigPayId;
				}

				//微信IOS支付等级限制
				if(rData && rData.ioslevellimit!=null)
				{
					GameData.ioslevellimit = rData.ioslevellimit;
				}
				//WX不让人看到支付
				if(PlatformManager.checkIsWxmgSp()&&rData && rData.wxblackname)
				{
					for (var index = 0; index < rData.wxblackname.length; index++) {
						var blockName = rData.wxblackname[index];
						if(PlatformManager.nickname&&blockName&&PlatformManager.nickname.indexOf(blockName)>-1)
						{
							PlatformManager.ios_pay = false;
						}
						
					}
				}

				//离线收益
				//微信IOS支付等级限制
				if(rData && rData.autoRes!=null && rData.autoRes[0])
				{
					GameData.autoRes = rData.autoRes;
				}
				if(rData && rData.leavetime)
				{
					GameData.leavetime = rData.leavetime;
				}
				if(rData && rData.islvminCon)
				{
					GameData.islvminCon = rData.islvminCon;
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
						console.log("setShareInfo");
						RSDKHelper.setShareInfo(tmpUid);
					}, null, data.uid);
				}
				isLogin=true;
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

			/**
			 * 脱衣等级
			 */
			if(rData && rData.striplevel!=null)
			{
				GameData.striplevel=rData.striplevel;
			}

			//推送消息
			if(rData && rData.gamebarmsg!=null) 
			{
				 PlatformManager.pushMsg(rData.gamebarmsg);
			}

			if(data.timezone!=null)
			{
				GameData.timeZone=data.timezone;
			}

			if(rData &&rData.realnameinfo)
			{

				GameData.idcardType = String(rData.realnameinfo.type);
				GameData.pidflag = rData.realnameinfo.pidflag;
				GameData.regionflag = rData.realnameinfo.regionflag;
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

				if(checkData.data.ret==-126)
				{
					ViewController.getInstance().openView(ViewConst.POPUP.OFFLINEVIEW,{
						title:"itemUseConstPopupViewTitle",
						msg:LanguageManager.getlocal("accountState_126"),
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
				if(rData)
				{
					Api.formatData(rData,data.cmd);
				}
			}
			else
			{
				Api.formatData(rData,data.cmd);
				if(rData.unlockPersonLv)
				{
					ViewController.getInstance().openView(ViewConst.BASE.COMPOSELVUPVIEW,{
						lv: rData.unlockPersonLv,
						rewards: rData.rewards,
						unlockServant: rData.unlockServant || null
					});
					App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT);
				}
				if(rData.unlockMapGroups&&(rData.unlockMapGroups instanceof Array))
				{
					App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_UNLOCK_MAPGROUP,rData.unlockMapGroups);
				}
				if(rData.unlockServant && !rData.unlockWife && !rData.unlockPersonLv)
				{
					if(data.cmd == NetRequestConst.REQUEST_USER_UPGRADE||data.cmd == NetRequestConst.REQUEST_SEARCH_PLAY || data.cmd == NetRequestConst.REQUEST_SEARCH_PLAYGEM){
						let data = {unlockServant:rData.unlockServant};
						Api.servantVoApi.setWaitShowData(data);
					}
					else{
						let servantCfg = GameConfig.config.servantCfg[rData.unlockServant]; 
						if(servantCfg&&servantCfg.getStoryID)
						{
							// let data = {unlockServant:rData.unlockServant};
							// Api.servantVoApi.setWaitShowData(data);
							ViewController.getInstance().openView(ViewConst.COMMON.SEARCHSTORYVIEW, 
							{ storyId: servantCfg.getStoryID, callback:  (unlockServant)=>{
								
								ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW,unlockServant);
							} ,target:this,params:rData.unlockServant});
						}
						else{
							ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW,rData.unlockServant);
						}
						
					}
					
				}
				if(rData.unlockWife&&data.cmd != NetRequestConst.REQUEST_USER_LOGIIN)
				{
					if(data.cmd == NetRequestConst.REQUEST_USER_UPGRADE ||data.cmd == NetRequestConst.REQUEST_SEARCH_PLAY || data.cmd == NetRequestConst.REQUEST_SEARCH_PLAYGEM){
						let data = {unlockWife:rData.unlockWife,unlockServant:rData.unlockServant};
						Api.wifeVoApi.setWaitShowWife(data);
					}
					else{
						ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW,{wifeIdList:rData.unlockWife,servantId:rData.unlockServant});
					}
					
				}
				if(isLogin&&Config.AcCfg.isGetAll==false)
				{
					NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG,{});
				}
			}
			// 解析公共数据start
			if(checkData.ret == true && data.ts)
			{
				TickManager.startTick();
				// GameData.serverTime = data.ts;
				// // 计算服务器和客户端时间差
				// GameData.serverClientTimeDt = data.ts - new Date().getTime()/1000;
			}
			// 版本踢人
			if (data.data && data.data.verinfo && data.data.verinfo.ver && window["VERINFO_VER"] && data.data.verinfo.ver  > window["VERINFO_VER"]) {
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					title:"itemUseConstPopupViewTitle",
					msg:data.data&&data.data.verinfo&&data.data.verinfo.msg?data.data.verinfo.msg:LanguageManager.getlocal("versionCompareInfo"),
					callback:(dlg)=>{
						if (App.DeviceUtil.isWXgame() || App.DeviceUtil.isBaidugame()) {
							LoginManager.changeServer();
						} else {
							window.location.reload();
						}
					},
					handler:null,
					clickNotAutoHide:true,
					inLayer:LayerManager.maskLayer
				});
			}
		}
		// 解析公共数据end
		// 上面填解析data代码
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
			if(data.data.ret == 0)
			{
				if(data.data.data.payment){
					PlatformManager.analyticsPay(data.data.data.payment.itemId,data.data.data.payment.orderId,data.data.data.payment);
				}
				
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
		if(data.ret < 0 || data.ret == 2333)
		{
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