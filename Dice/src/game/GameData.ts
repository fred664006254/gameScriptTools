/**
 * 游戏全局的数据或者方法，能归类的按类放入不同的文件，不能归类的放这里，如:
 * DeviceUtil.ts     设备相关的数据
 * DisplayUtil.ts    显示相关的方法等
 * GameConfig.ts     全局的游戏配置
 * author dmj
 * date 2017/9/15
 * @namespace GameData
 */
namespace GameData {
	//注册时间
	export let regdt:number;
	// 服务器时间
	// export let serverTime:number;

	export let serverTimeMs:number;
	/**上一次收到服务器数据的时间毫秒 */
	export let lastReceiveTimeMs:number;

	/**上次咵天刷新的0点过2秒的时间戳 */
	export let lastFreshDayInfoTime:number=0;

	/**
	 * 时区
	 */
	export let timeZone:number=0;
	// 本地服务器时间
	export let localServerTime:number;
	// 服务器id
	export let curZoneID:number = 1;
	// 合服前服务器id
	// export let curOldZoneID:number = null;
	// 登录时临时存放的用户填写的绑定过的用户名
	// export let tmpUserName:string = "";
	// 登录时临时存放的用户填写的绑定过的用户密码
	export let tmpUserPassword:string = "";
	// 统计id
	export let statisticsId:number = 0;
	// 用户客户端ip
	export let client_ip:string = "127.0.0.1";
	// 用户平台id
	export let platId:string = "";
	// 用户uid
	export let uid:number = 0;

	export let access_token:string = "0";

	export let logints:number = 0;

	export let localCfg: string[] = ["192.168", "localhost","127.0.0.1"];

	export let testCfg:string[]=["gt_test"];

	/**暂停心跳同步 默认false */
	export let pauseSync:boolean = false;
	/**服务器和客户端时间差（客户端时间加上此值就是服务器时间） */
	export let serverClientTimeDt:number = 0;

	/**公告数据 */
	export let announcementData:any = {};
	export let announcementLastestT:string=null;

	/**进服之前公告数据 */
	export let announcementLoginLastTime:number = 0;

	/**
	 * 玩吧是不是需要上报数据 true 是 false 不是
	 */
	export let closeSource:number;

	/**
	 * 玩吧数据上报每多少个人上报一次
	 */
	export let wanbaEvenyNumReport:number=3;

	/**
	 * h5渠道限制vip等级显示
	 */
	export let limitVipLv:number[];

	/**
	 * 3kios 是否绑定手机 
	 */
	export let kkkIsBindIos:string="0";

	/**
	 * 聊天等级限制
	 */
	export let chatlevel:number = 4;
	/**
	 * 英文限制名字长度
	 */
	export let nameLength:number = 18;

	/**
	 * 泰文限制名字长度
	 */
	export let nameThLength:number = 12;

	/**
	 * 	英文玩家名字长度
	 */
	export let usernameEnLength: number = 8;
	
	/**
	 * 英文限制名字长度
	 */
	export let nameEnLength:number = 6;
	/**
	 * 英文限制帮会名字长度
	 */
	export let allianceNameEnLength:number = 8;

	/**
	 * 	俄文玩家名字长度
	 */
	export let usernameRuLength: number = 12;
	/**
	 * 俄罗斯文限制名字长度
	 */
	export let nameRuLength:number = 9;
	/**
	 * 俄罗斯文限制帮会名字长度
	 */
	export let allianceNameRuLength:number = 12;

	/**
	 * 俄罗斯跨服聊天免费次数
	 */
	export let crossChatFreeTimes:number = 3;

	/**
	 * 	英文玩家名字长度
	 */
	export let usernamePtLength: number = 8;
	/**
	 * 英文限制名字长度
	 */
	export let namePtLength:number = 6;
	/**
	 * 英文限制帮会名字长度
	 */
	export let allianceNamePtLength:number = 8;

	/**
	 * 客服信息
	 */
	export let customerServiceData:any = null;

	/**
	 * 是否加载跨域图片报错
	 */
	export let isLoadCrossImageError:boolean=false;

	/**
	 * 已经加载完成过图片
	 */
	export let isLoadedSuccessImage:boolean=false;
	
	/** 谷歌推送 */
	export let pushToken:string = null;

	/**
	 * 图层的y坐标
	 */
	export let layerPosY:number=0;

	/**
	 * 图层的X偏移坐标
	 */
	export let layerPosX:number=0;


	/**
	 * 实名认证防沉迷（一会儿就删）
	 */
	export let isAntiaddiction:boolean=false;
	/**
	 * 实名认证防沉迷开关
	 */
	export let idcardSwitch:boolean=false;
	/**
	 * 实名认证防沉迷是否去调收费接口的开关，三个状态，0去调收费接口，1只能游客登录，2仅验证身份证号码的有效性
	 */
	export let idcardNoFreeApiSwitch:number=0;

	/**
	 * 实名认证防沉迷模式（0简易模式，1正常模式，）
	 */
	export let idcardNormal:number=0;

	/**
	 * 实名认证防 是否强制认证
	 */
	export let idcardConstraint:boolean=false;

	/**
	 * 是否需要协议
	 */
	export let showAgreement:boolean=false;

	/**
	 * 为创建用户
	 */
	export let notCreated:boolean=false;

	/**
	 * 特殊的那个用户  需要让他协议重新弹
	 */
	export let specialUser:number=0;

	/**
	 * 是否需要协议
	 */
	export let phoneBindSwitch:number=0;

	/**
	 * 手机绑定开关
	 */
	export let hasPhone:number=0;

	/**
	 * 实名认证是否进入过正常模式
	 */
	export let idcardEnterNormal:number=0;

	/**
	 * 实名认证防沉迷用户类型0，1，2，3的类用户，详见文档
	 */
	export let idcardType:string="0";

	/**
	 * Fq游戏攻略data
	 */
	export let fqGameStrategyData ={"intro":"" ,"rcontent":[],"faqcontent":[],"index": 0};

	/**
	 * 分享聊天
	 */
	export let sharechatcd = 1800;

	/**
	 * 平台货币配置
	 */
	export let platMoneyData:any=null;/*{"gdth.hw.20_h1800":{"microsPrice":"120000000","productDesc":"1800元宝","country":"CN","price":"CNY 120.00","currency":"CNY","productNo":"gdth.hw.20_h1800","productName":"1800元宝"},
	"gdth.hw.1_h90":{"microsPrice":"6000000","productDesc":"90元宝","country":"CN","price":"CNY 6.00","currency":"CNY","productNo":"gdth.hw.1_h90","productName":"90元宝"},
	"gdth.hw.16_y1440":{"microsPrice":"96000000","productDesc":"终身卡","country":"CN","price":"CNY 96.00","currency":"CNY","productNo":"gdth.hw.16_y1440","productName":"终身卡"},
	"gdth.hw.4_h360":{"microsPrice":"24000000","productDesc":"360元宝","country":"CN","price":"CNY 24.00","currency":"CNY","productNo":"gdth.hw.4_h360","productName":"360元宝"},
	"gdth.hw.4_y360":{"microsPrice":"24000000","productDesc":"月卡","country":"CN","price":"CNY 24.00","currency":"CNY","productNo":"gdth.hw.4_y360","productName":"月卡"},
	"gdth.hw.50_h4500":{"microsPrice":"300000000","productDesc":"4500元宝","country":"CN","price":"CNY 300.00","currency":"CNY","productNo":"gdth.hw.50_h4500","productName":"4500元宝"},
	"gdth.hw.100_h9000":{"microsPrice":"600000000","productDesc":"9000元宝","country":"CN","price":"CNY 600.00","currency":"CNY","productNo":"gdth.hw.100_h9000","productName":"9000元宝"}};*/
	/**
	 * 平台货币配置2 对应登录 1010 
	 */
	export let platMoneyData2:any=null;

	/**
	 * 平台货币单位，只适用于通过sdk获取货币单位的情况
	 */
	export let platMoney:string="";//CNY";

	/**
	 * 是否支持像素碰撞
	 */
	export let isSupportHitTestPoint:boolean=true;

	/**
	 * 命令强制使用壳子socket
	 */
	export let testUseClientSocket:boolean=false;

	/**
	 * 支付成功等待发货的充值档
	 */
	export let payWaitSendDic: { [str: string]: number } = {};
	export let payWaitSendCD:number=20*1000;

	/**
	 * 等待loading时间，超时统计
	 */
	export let waitLdRpt:number=5000;

	/**
	 * 活动统计地址
	 */
	export let statUrl:string=null;

	/**
	 * 使用的语言版本
	 */
	export let languageUsing:string=null;

	/**
	 * 充值开关
	 */
	export let closePay:boolean=false;

	/**
	 * 当前用到的资源控制文件名，做统计用
	 */
	export let curDefaultName:string="resource/default.res.json";

	/**
	 * 调试命令输入的内容
	 */
	export let tstInputStr:string="";


	/**
	 * 当前使用的大区默认统计ID，对游戏来说是大区标识，游戏过程中不能被清除
	 */
	export let curBigType:string="";


	/**
	 * 默认启用新的websocket链接处理低优先级请求，比如user.sync
	 */
	export let useNewWS:boolean=false;

	/**
	 * 是否已经获取最近登录服，不用清理
	 */
	export let isGetLastLogin:boolean=false;

	/**
	 * 是否是微信审核
	 */
	export let isWxShenhe:boolean=false;

	///////////////////////////////////////分割线|上面是变量|下面是方法///////////////////////////////////// 

	// 解析model.gameinfo
	export function formatGameInfo(data:any):void
	{
		if(data.statisticsId)
		{
			statisticsId = Number(data.statisticsId);
		}
		if(data.pid)
		{
			platId = data.pid;
		}
	}

	export function getServerTime():number
	{
		return Math.floor(serverTimeMs/1000);
	}

	// 获取国家，
	export function getCountry():string
	{	
		if (PlatMgr.checkIsTWBSp() == true) 
		{
			return "tw";
		}
		else if (PlatMgr.checkIsKRSp() == true) 
		{
			return "kr";
		}
		else if (PlatMgr.checkIsThSp() == true) 
		{
			return "th";
		}
		else if (PlatMgr.checkIsEnLang() == true){
			return "en";
		}
		else 
		{
			return "cn";
		}
		
	}

	/**
	 * 根据资源名获取对应渠道的资源名+标识，比如cn，gameconfig_tw，names_en，shield_th这种情况
	 * @param prefix 不带标识的资源名，需要带上下划线，加前缀或者后缀会根据下划线来区分
	 */
	export function getLanguageKey(prefix:string):string
	{
		
		let key:string=PlatMgr.getSpid();
		let addEnd:boolean=((prefix.substr(0,1)=="_")?false:true);
		let tmpfix:string=prefix;
		if(!addEnd)
		{
			tmpfix=tmpfix.substr(1);
		}
		else if(tmpfix.substr(tmpfix.length-1)=="_")
		{
			tmpfix=tmpfix.substr(0,tmpfix.length-1);
		}

		switch(tmpfix)
		{
			case "sceneCfg":
			case "cn":
				prefix="";
				key=PlatMgr.getSpidKey();
				break;
			case "names":
			case "shield":
			case "shieldname":
				key=PlatMgr.getSpidKey();
				break;
			case "agreement":
				key=PlatMgr.getSpidKey();
				addEnd=false;
				break;
			case "gameconfig":
				key=key;
				break;
			default:
				break;
		}
		if(PlatMgr.checkIsLocal()||PlatMgr.checkIsIOSShenheSp())
		{
			let tmpcnName:string=PlatMgr.checkIsAreaPkg()?key:App.CommonUtil.getOption("language");
			let tmpStr:string=addEnd?(prefix+tmpcnName):(tmpcnName+prefix);
			if(tmpcnName&&RES.hasRes(tmpStr))
			{
				key=tmpcnName;
			}
			else
			{
				if(PlatMgr.checkIOSShenheOtherLanguage())
				{
					key=PlatMgr.checkIOSShenheOtherLanguage();
					if(!RES.hasRes(tmpStr))
					{
						key="cn";
					}
				}
				else if(PlatMgr.checkIsAreaPkg())
				{
					key="en";
				}
				else
				{
					key="cn";
				}
			}
		}
		else
		{
			if(PlatMgr.checkIsAreaPkg())
			{
				let tmpStr:string=addEnd?(prefix+key):(key+prefix);
				if(!ResMgr.hasRes(tmpStr))
				{
					key=GameConfig.getAreaLangKey();
					let tmpStr:string=addEnd?(prefix+key):(key+prefix);
					if(!ResMgr.hasRes(tmpStr))
					{
						key="en";
					}
				}
			}
			else
			{
				let tmpStr:string=addEnd?(prefix+key):(key+prefix);
				if(!ResMgr.hasRes(tmpStr))
				{
					key="cn";
				}
			}
		}
		return addEnd?(prefix+key):(key+prefix);
	}

	export function getLanguageRes(prefix:string):any
	{	
		let key:string=getLanguageKey(prefix);
		if (RES.hasRes(key))
		{
			return ResMgr.getRes(key);
		}
		else
		{
			return ResMgr.getRes(prefix+"cn");
		}		
	}

	// 当前的渠道id
	export function getCurPlatName():string
	{
		return "0";
	}

	export function isTest():boolean
	{
		var result: boolean = false;
        if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
        {
            var url: string = window.location.href;
            for (var i: number = 0; i < testCfg.length;i++)
            {
                var str: string = testCfg[i];
                if(url.indexOf(str)>-1)
                {
                    result = true;
                    break;
                }
            }
        }
        return result;
	}

	/**
	 * 数组中是否包含某个元素
	 */
	export function isInArray(obj:any , array:any[]):boolean
	{
		for (let i:number =0 ; i<array.length; i++)
		{
			if (obj == array[i])
			{
				return true;
			}
		}
		return false;
	} 
	/**
	 * 数组中包含某个元素 idx
	 */
	export function arrayIndexByItem(obj:any , array:any[]):number
	{
		for (let i:number =0 ; i<array.length; i++)
		{
			if (obj == array[i])
			{
				return i;
			}
		}
		return -1;
	} 

	/**
	 * 数组中包含某个元素 放到最后
	 */
	export function arrayPutItemLast(obj:any , array:any[]):void
	{
		for (let i:number =0 ; i<array.length; i++)
		{
			if (obj == array[i])
			{
				let item = array.splice(i,1);
				array.push(item);
			}
		}
	} 


	/**
	 * 检测是否可以弹出公告进服之前
	 */
	export function checkShowNoticeInLogin(noticeData:any):boolean
	{
		let localStr:string=LocalStorageMgr.get(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW+LoginMgr.getLocalUserName());
		if(localStr)
		{	
			let localT:number = Number(localStr);
			let currT:number = GameData.announcementLoginLastTime;
			let local0T = localT - localT % 86400;
			let curr0T = currT - currT % 86400;
			if (local0T != curr0T ){
				LocalStorageMgr.remove(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW+LoginMgr.getLocalUserName());
				return true;
			}
			if (noticeData && noticeData.length > 0){				
				for (let i=0; i < noticeData.length; i++){
					if (noticeData[i].st > localT && noticeData[i].st <= currT){
						return true;
					}	
				}
			}
			return false;
		}	
		return true;
	}

	/**
	 * 检测是否可以弹出公告进服之前 是否同一天
	 */
	export function checkShowNoticeIsTodayInLogin():boolean{
		let localStr:string=LocalStorageMgr.get(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW+LoginMgr.getLocalUserName());
		if(localStr)
		{	
			let localT:number = Number(localStr);
			let currT:number = GameData.announcementLoginLastTime;
			App.LogUtil.log("checkIsTodayInLogin: "+localT + " currT: "+currT);
			let local0T = localT - localT % 86400;
			let curr0T = currT - currT % 86400;
			if (local0T == curr0T ){
				return true;
			}
		}
		return false;
	}

	export function getRechargeItemName(id:string):string
	{
		return LangMger.getlocal("rechargeName_" + id);
	}

	export function getRechargeItemDesc(id:string):string
	{
		return LangMger.getlocal("rechargeDesc_" + id);
	}

	export function dispose():void
	{
		limitVipLv=null;
		closeSource=NaN;
		customerServiceData = null;
		fqGameStrategyData =={"intro":"" ,"rcontent":[],"faqcontent":[],"index": 0};
		payWaitSendDic={};
		statUrl=null;
		announcementLastestT=null;
		timeZone = 0;
		uid=0;
		isWxShenhe=false;
		lastFreshDayInfoTime=0;
	}

	export function getMonthDayByYearAndMonth(year:number,month:number):number
	{	
		let day = 31;
		if (month == 2)
		{
			if (year % 4 == 0 && year != 1900)
			{
				day = 29;
			}
			else
			{
				day = 28;
			}
		}
		else if (month == 4 || month == 6 || month == 9 || month == 11)
		{
			day = 30;
		}
		return day;
	}

	/**
	 * 时间段 上午(5:00 – 11:00)，正午(11:00-17:00)，傍晚(17:00-23:00)和深夜(23:00-5:00)
	 *   对应 1234
	 */
	export function getTimeIsnterval():number
	{	
		let d = Math.floor(Date.now()/1000) + 28800;
		let t:number = Math.floor(d%86400/3600);
		let f:number = 1;
		if (t < 5 || t >= 23)
		{
			f = 4;
		}
		else if (t < 11)
		{
			f = 1;
		}
		else if (t < 17)
		{
			f = 2;
		}
		else
		{
			f = 3;
		}
		return f;
	}


	/**
	 * 解析奖励物品格式
	 * @param rewards 奖励原始数据
	 * @param sameAdd 去重
	 */
	export function formatRewardItem(rewards:string,sameAdd:boolean=false):Array<RewardItemVo>{
		let arr:Array<RewardItemVo> = new Array();
		if(rewards){
			let rewardsArr:Array<string> = rewards.split("|");
			for(let i:number = 0;i < rewardsArr.length;i++){
				let rewardItemVo:RewardItemVo = new RewardItemVo();
				rewardItemVo.initData(rewardsArr[i]);
				rewardItemVo.originalIdx = i;
				if(sameAdd){	
					let noSame = true;
					for(let i=0; i <arr.length; i++){	
						let oneVo = arr[i];
						if (oneVo.type == rewardItemVo.type && oneVo.id == rewardItemVo.id){	
							oneVo.num +=rewardItemVo.num;
							noSame=false;
							break;
						}
					}
					if(noSame){
						arr.push(rewardItemVo);
					}
				}
				else{
					arr.push(rewardItemVo);
				}
			}
		}
		arr.sort((a : RewardItemVo, b : RewardItemVo)=>{
			return a.id - b.id;
		});
		return arr;
	}

	/**
	 * 获取物品Icon
	 * @param itemVo 物品模型
	 * @param isTouchShowInfo 是否触摸显示道具详情，默认不显示，如需要显示请传true
	 * @param isShowEffect 是否显示特效，true显示，注意，需要显示时，对面的界面需要提前添加资源文件  itemeffect.png
	 * @param isshowMagnifier 是否显示放大镜，true
	 * 
	 */
	export function getItemIcon(itemVo:RewardItemVo, num:number=0, isTouchShowInfo?:boolean, isNewstatus?:boolean):BaseDisplayObjectContainer
	{
		let container:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		
		let mask : BaseBitmap = BaseBitmap.create(`public_alphabg`);//
		mask.width = 108;
		mask.height = num?132:108;
		container.width = mask.width;
		container.height = mask.height;
		container.addChild(mask);
		mask.alpha = 0;

		if(itemVo.type == 100){
			let diceicon = App.CommonUtil.getDiceIconById(itemVo.id.toString(),1);
			container.addChild(diceicon);
			if(num){
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, diceicon, mask,[0,-5]);
				let numTxt = ComponentMgr.getTextField(`x${num}`, TextFieldConst.SIZE_CONTENT_COMMON);
				container.addChild(numTxt);
				numTxt.name = `numTxt`;
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, numTxt, mask, [0,0]);
			}
			else{
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, diceicon, mask);
			}
			if(isTouchShowInfo){
				let dicecfg = Config.DiceCfg.getCfgById(itemVo.id);
				diceicon.addTouchTap(()=>{
					ViewController.getInstance().openView(ViewConst.BUYDICECONFIRMPOPUPVIEW, {
						title : dicecfg.name,
						handler : null,
						needCancel : false,
						needClose : 1,
						id : `100_${dicecfg.id}_${num}`,
						costnum :LangMger.getlocal("sysconfirm"),
						// costIcon : `ab_mainui_gem`,
						touchMaskClose:true
					});
				}, diceicon);
				
			}
			if(isNewstatus){
				//是新获得的
				let newState = BaseBitmap.create(`dicenewget`);
				// App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, newState, container, [0,0]);
				newState.setScale(0.6);
				container.addChild(newState);
			}
		}
		else{
			let iconBg:BaseBitmap = BaseBitmap.create(itemVo.iconBg);//
			container.addChild(iconBg);
			iconBg.name = "iconBg";
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, iconBg, mask);

			let iconstr = itemVo.icon;
			let icon = BaseLoadBitmap.create(iconstr, null, {
				callback : ()=>{
					icon.setScale(100/icon.width);
					if(iconstr == "item1" || iconstr == "item2"){
						icon.setScale(0.7);
						icon.y = 20;
					}
					if(num){
						App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, icon, mask);
						// if(RES.hasRes(itemVo.iconBg)){
						// 	iconBg.setScale(108/iconBg.width);
						// 	App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, numTxt, iconBg, [0,iconBg.height*iconBg.scaleY + 10]);
						// }
						// else{
						// 	App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, numTxt, icon, [0,icon.height*icon.scaleY + 10]);
						// }
					}
					else{
						App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, mask);
					}
				},
				callbackThisObj : this
			});
			icon.name = `icon`;
			container.addChild(icon);

			if(num){
				let numTxt = ComponentMgr.getTextField(`x${num}`, TextFieldConst.SIZE_CONTENT_COMMON);
				container.addChild(numTxt);
				numTxt.name = `numTxt`;
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, numTxt, mask, [0,0]);
			}
	
			if(isTouchShowInfo){
				if(itemVo.type == 50){
					icon.addTouchTap((event:egret.TouchEvent,item:string|number|RewardItemVo)=>{
						ViewController.getInstance().openView(ViewConst.BOXREWARDDETAILPOPUPVIEW,{
							title : itemVo.name,
							needCancel : false,
							needClose : 1,
							boxId : itemVo.id,
						});
					},this);

					iconBg.addTouchTap((event:egret.TouchEvent,item:string|number|RewardItemVo)=>{
						ViewController.getInstance().openView(ViewConst.BOXREWARDDETAILPOPUPVIEW,{
							title : itemVo.name,
							needCancel : false,
							needClose : 1,
							boxId : itemVo.id,
						});
					},this);
				} else if (itemVo.type == 1 || itemVo.type == 2) {
					icon.addTouchTap(() => {
						ViewController.getInstance().openView(ViewConst.SIGNSHOWPOPVIEW, {
							title : itemVo.name,
							handler : null,
							needCancel : false,
							needClose : 1,
							param : itemVo,
							costnum :LangMger.getlocal("sysconfirm"),
							// costIcon : `ab_mainui_gem`
						});
					}, this)

					iconBg.addTouchTap(() => {
						ViewController.getInstance().openView(ViewConst.SIGNSHOWPOPVIEW, {
							title : itemVo.name,
							handler : null,
							needCancel : false,
							needClose : 1,
							param : itemVo,
							costnum :LangMger.getlocal("sysconfirm"),
							// costIcon : `ab_mainui_gem`
						});
					}, this)
				}	
			}
		}
		container.bindData=itemVo;
		

		// if(isShowEffect)
		// {
		// 	let temScale = 1/0.74;
		// 	let effectClip = ComponentManager.getCustomMovieClip("itemeffect",10,100);
		// 	effectClip.x = icon.x + 50 - 198*temScale/2;
		// 	effectClip.y = icon.y + 52 - 197*temScale/2;
		// 	container.addChild(effectClip);
		// 	effectClip.scaleX = effectClip.scaleY = temScale;
		// 	effectClip.playWithTime(-1);
		// }

		
		// if(itemVo instanceof Config.ItemItemCfg ||itemVo.type==6)
		// {
		// 	var cfg =Config.ItemCfg.getItemCfgById(itemVo.id);
		// 	if(cfg&&cfg.showContent&&cfg.showContent==1&&isshowMagnifier==true)
		// 	{ 
		// 		let magnifierIcon:BaseBitmap = BaseBitmap.create("public_magnifier");  
		// 		magnifierIcon.width = 38;
		// 		magnifierIcon.height = 38;
		// 		magnifierIcon.x =70;
		// 		magnifierIcon.y =2;
		// 		magnifierIcon.name = "magnifierIcon";
		// 		container.addChild(magnifierIcon);

		// 		magnifierIcon.addTouchTap((event:egret.TouchEvent,item:string|number|RewardItemVo)=>
		// 		{
		// 			ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOEXTENDPOPUPVIEW,item);
					
		// 		},GameData,[(itemVo instanceof RewardItemVo)?itemVo:itemVo.id]);
				
		// 	} 
		// } 
		return container;
	}

}