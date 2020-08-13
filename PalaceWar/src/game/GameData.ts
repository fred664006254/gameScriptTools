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
	// 服务器时间
	export let serverTime:number;

	/**
	 * 时区
	 */
	export let timeZone:number;
	// 本地服务器时间
	export let localServerTime:number;
	// 服务器id
	// export let curZoneID:number = 1;
	// 合服前服务器id
	// export let curOldZoneID:number = null;
	// 登录时临时存放的用户填写的绑定过的用户名
	// export let tmpUserName:string = "";
	// 登录时临时存放的用户填写的绑定过的用户密码
	export let tmpUserPassword:string = "";
	// 统计id
	export let statisticsId:number = 0;
	// 当前服务器名称
	export let curArea:string = "CN-15001";
	// 用户客户端ip
	export let client_ip:string = "127.0.0.1";
	// 用户平台id
	export let platId:string = "";
	// 用户uid
	export let userId:number = null;
	export let access_token:string = "0";

	export let logints:number = 0;

	export let localCfg: string[] = ["192.168", "localhost","127.0.0.1","gt-local-web01.raygame3.com"];

	export let testCfg:string[]=["gt_test"];

	/**暂停心跳同步 默认false */
	export let pauseSync:boolean = false;
	/**心跳同步数据时间戳 */
	export let lastAutoSyncTime:number = 0;
	/**服务器和客户端时间差（客户端时间加上此值就是服务器时间） */
	export let serverClientTimeDt:number = 0;

	/**公告数据 */
	export let announcementData:any = {};
	export let announcementLastestT:string=null;

	/**进服之前公告数据 */
	export let announcementLoginLastTime:number = 0;

	/**玩吧礼包 */
	export let wbrewards:string = null;

	/**
	 * 玩吧礼包状态 true 可领取 false 已领取
	 */
	export let wbrewardsFlag:boolean;

	/**
	 * 是不是从糖果屋登录 true 是 false 不是
	 */
	export let candyflag:boolean;

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
	 * 是不是已经显示过府邸
	 */
	export let isShowedHomeScene:boolean=false;
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
	 * 
	 */
	export let fbTradeType:string="h5heyuefb-1003005004";
	export let fbTwTradeType:string="h5heyuefb-17004008";

	/**
	 * 是否支持像素碰撞
	 */
	export let isSupportHitTestPoint:boolean=true;

	/**是否开始发生统计圣诞次数的消息 */
	export let isSendAcChristmasMessage:boolean = true;

	/**除夕签到活动的时间 */
	export let acNewYearSignUpTime = 0;
	/**除夕签到活动的时间 */
	export let isOpenNewYearSignUpView = true;

	/**
	 * 命令强制使用壳子socket
	 */
	export let testUseClientSocket:boolean=false;

	export let acPopTime:number = 0;

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

	/** 需要隐藏的道具奖励数组 */
	export let hideReward:string[]=[];

	/**
	 * 当前用到的资源控制文件名，做统计用
	 */
	export let curDefaultName:string="resource/default.res.json";

	/**
	 * 聊天发表情字符串前缀 用于区分表情和文字信息
	 */
	export let emoticonMsgStr:string="EmoticonJsmr";

	/**
	 * 调试命令输入的内容
	 */
	export let tstInputStr:string="";

	/**
	 * 新ui popupview x 偏差
	 */
	export let popupviewOffsetX:number=26.5;

	/**
	 * 当前使用的大区默认统计ID，对游戏来说是大区标识，游戏过程中不能被清除
	 */
	export let curBigType:string="";

	/**
	 * wbisshow 登录请求返回，表示需要弹出游戏内输入迁服验证码
	 */
	export let wbisshow:boolean=false;

	/**
	 * bioHave 是否有列传本纪获得着，用于列传本纪排行榜红点
	 */
	export let bioHave:boolean=false;


	/**
	 * 默认启用新的websocket链接处理低优先级请求，比如user.sync
	 */
	export let useNewWS:boolean=false;

	/**
	 * 是否已经获取最近登录服，不用清理
	 */
	export let isGetLastLogin:boolean=false;

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

	// 获取国家，
	export function getCountry():string
	{	
		if (PlatformManager.checkIsTWBSp() == true) 
		{
			return "tw";
		}
		else if (PlatformManager.checkIsKRSp() == true) 
		{
			return "kr";
		}
		else if (PlatformManager.checkIsThSp() == true) 
		{
			return "th";
		}
		else if (PlatformManager.checkIsEnLang() == true){
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
		
		let key:string=PlatformManager.getSpid();
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
				key=PlatformManager.getSpidKey();
				break;
			case "names":
			case "shield":
			case "shieldname":
				key=PlatformManager.getSpidKey();
				break;
			case "agreement":
				key=PlatformManager.getSpidKey();
				addEnd=false;
				break;
			case "gameconfig":
				key=key;
				break;
			default:
				break;
		}
		if(PlatformManager.checkIsLocal()||PlatformManager.checkIsIOSShenheSp())
		{
			let tmpcnName:string=PlatformManager.checkIsAreaPkg()?key:App.CommonUtil.getOption("language");
			let tmpStr:string=addEnd?(prefix+tmpcnName):(tmpcnName+prefix);
			if(tmpcnName&&RES.hasRes(tmpStr))
			{
				key=tmpcnName;
			}
			else
			{
				if(PlatformManager.checkIOSShenheOtherLanguage())
				{
					key=PlatformManager.checkIOSShenheOtherLanguage();
				}
				else if(PlatformManager.checkIsAreaPkg())
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
			if(PlatformManager.checkIsAreaPkg())
			{
				let tmpStr:string=addEnd?(prefix+key):(key+prefix);
				if(!ResourceManager.hasRes(tmpStr))
				{
					key=GameConfig.getAreaLangKey();
					let tmpStr:string=addEnd?(prefix+key):(key+prefix);
					if(!ResourceManager.hasRes(tmpStr))
					{
						key="en";
					}
				}
			}
			else
			{
				let tmpStr:string=addEnd?(prefix+key):(key+prefix);
				if(!ResourceManager.hasRes(tmpStr))
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
			return ResourceManager.getRes(key);
		}
		else
		{
			return ResourceManager.getRes(prefix+"cn");
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
	 * 解析奖励物品格式
	 * @param rewards 奖励原始数据
	 * @param sameAdd 去重
	 */
	export function formatRewardItem(rewards:string,sameAdd:boolean=false):Array<RewardItemVo>
	{
		let arr:Array<RewardItemVo> = new Array();
		// 1 钻石/元宝  2 黄金/银两  3 粮食  4 士兵 5 经验/政绩  6 道具 7 门客属性
		if(rewards)
		{
			let rewardsArr:Array<string> = rewards.split("|");
			for(let i:number = 0;i < rewardsArr.length;i++)
			{
				if(GameData.hideReward&&GameData.hideReward.length>0)
				{
					let str:string=rewardsArr[i];
					let strArr:string[]=rewardsArr[i].split("_");
					let checkNewStr:string=strArr[0]+"_"+strArr[1]+"_1";
					if(GameData.hideReward.indexOf(checkNewStr)>-1)
					{
						continue;
					}
				}
				let rewardItemVo:RewardItemVo = new RewardItemVo();
				rewardItemVo.initData(rewardsArr[i]);
				rewardItemVo.originalIdx = i;
				 //如果不开称帝，前端屏蔽人望奖励
				if (!Api.switchVoApi.checkOpenPrestige())
				{
					if (rewardItemVo.type == 17)
					{
						continue;
					}
				}
				if (sameAdd)
				{	
					let noSame = true;
					for (let i=0; i <arr.length; i++)
					{	
						let oneVo = arr[i];
						if (oneVo.type == rewardItemVo.type && (oneVo.id == rewardItemVo.id || oneVo.type== 2 || oneVo.type== 3 || oneVo.type== 4 ))
						{	
							oneVo.num +=rewardItemVo.num;
							noSame=false;
							break;
						}
					}
					if (noSame)
					{
						arr.push(rewardItemVo);
					}
				}
				else
				{
					arr.push(rewardItemVo);
				}

				
			}
		}

		return arr;
	}

	/**
	 * 解析奖励物品格式 返回奖励文本 金币+100 粮食+100 士兵 +100
	 * @param rewards 奖励原始数据
	 */
	export function getRewardsStr(rewards:string):string
	{
		let rewardsStr = "";
		// 1 钻石/元宝  2 黄金/银两  3 粮食  4 士兵 5 经验/政绩  6 道具 7 门客属性
		if(rewards)
		{
			let rewardsArr:Array<string> = rewards.split("|");
			for(let i:number = 0;i < rewardsArr.length;i++)
			{
				if(GameData.hideReward&&GameData.hideReward.length>0)
				{
					let str:string=rewardsArr[i];
					let strArr:string[]=rewardsArr[i].split("_");
					let checkNewStr:string=strArr[0]+"_"+strArr[1]+"_1";
					if(GameData.hideReward.indexOf(checkNewStr)>-1)
					{
						continue;
					}
				}
				let rewardItemVo:RewardItemVo = new RewardItemVo();
				rewardItemVo.initData(rewardsArr[i]);
				if(rewardsStr == "")
				{
					rewardsStr = rewardItemVo.message;
				}
				else{
					rewardsStr = rewardsStr + " " + rewardItemVo.message;
				}
				
			}
		}

		return rewardsStr;
	}

	/**
	 * 获取物品Icon
	 * @param itemVo 物品模型
	 * @param isTouchShowInfo 是否触摸显示道具详情，默认不显示，如需要显示请传true
	 * @param isShowEffect 是否显示特效，true显示，注意，需要显示时，对面的界面需要提前添加资源文件  itemeffect.png
	 * @param isshowMagnifier 是否显示放大镜，true
	 * 
	 */
	export function getItemIcon(itemVo:RewardItemVo|Config.ItemItemCfg,isTouchShowInfo?:boolean,isShowEffect:boolean = false,isshowMagnifier:boolean=true,num:number=null):BaseDisplayObjectContainer
	{
		let container:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		
		var iconBg:BaseBitmap = BaseBitmap.create(itemVo.iconBg);
		container.addChild(iconBg);
		iconBg.name = "iconBg"
		container.width = iconBg.width;
		container.height = iconBg.height;
		
		let icon:BaseLoadBitmap = BaseLoadBitmap.create(itemVo.icon);
		icon.name = `icon`;
		let firstChar:string = itemVo.icon.substr(0,13);
		if (firstChar == "servant_half_" || firstChar.indexOf("skin_half_") > -1)
		{
			icon.setScale(100/180);
		}
		if(itemVo.type==10)
		{
			iconBg.texture = ResourceManager.getRes("itembg_7");
			icon.setScale(0.5);

		}
		if(itemVo.type==12)
		{
			iconBg.texture = ResourceManager.getRes("itembg_7");
			icon.setScale(0.5);

		}
		if(itemVo.type==16)
		{
			iconBg.texture = ResourceManager.getRes("itembg_7");
			icon.setScale(0.5);
		}
		if(itemVo.type==24)
		{
			iconBg.texture = ResourceManager.getRes("itembg_7");
			// icon.setScale(100/110);
		}
		else if (itemVo.type==19)
		{
			iconBg.texture = ResourceManager.getRes("itembg_7");
		}
		
		container.addChild(icon);
		container.bindData=itemVo;

		icon.setPosition(4,5);

		if(itemVo.type==12)
		{
			icon.x = 0;
		}
		// if(itemVo instanceof Config.ItemItemCfg )
		// {
			if (itemVo.target == 7)
			{
				let picstr = "servant_half_"+itemVo.targetId;
				icon.setload(picstr);
				icon.setScale(100/180);
				icon.y = 5;

				let arry = itemVo.getRewards.split("_");
				let abcfg = GameConfig.config.abilityCfg[arry[1]];
				let framepic = "itemframe"+arry[0]+"_"+abcfg.type;
				let framebg = BaseLoadBitmap.create(framepic);
				framebg.y = 0;
				framebg.x = 1;
				container.addChild(framebg);

				let star = BaseLoadBitmap.create("servant_star");
				star.setPosition(3,77);
				container.addChild(star);

				let starnum = ComponentManager.getBitmapText(String(abcfg.num),"tip_fnt");
				starnum.setPosition(star.x+27,star.y);
				container.addChild(starnum);
			}
			else if (itemVo.target == 8)
			{
				let arry = itemVo.getRewards.split("_");
				let picstr = "wife_half_"+arry[1];
				icon.setScale(100/205);
				icon.setload(picstr);
				// icon.x = 5;
				icon.y = 8;

				let framepic = "itemframe"+arry[0];
				let framebg = BaseLoadBitmap.create(framepic);
				framebg.y = 0;
				framebg.x = 1;
				container.addChild(framebg);
			}
		// }

		if(itemVo.type == 1002){
			if(itemVo.id == 0){
				let noTxt = ComponentManager.getTextField(LanguageManager.getlocal('acSingleDayNoRed'), 18);
				noTxt.lineSpacing = 5;
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, noTxt, iconBg);
				container.addChild(noTxt);
			}
			else{
				let item : any = itemVo;
				let txt1 = ComponentManager.getTextField(item._code,18);
				txt1.y = 60;
				let txt2 = ComponentManager.getTextField(LanguageManager.getlocal('acSingleDayGetRed3'),12);
				txt2.y = 62;
	
				txt1.x = (container.width - (txt1.textWidth + txt2.textWidth + 3)) / 2;
				txt2.x = txt1.x + txt1.textWidth + 3;
				container.addChild(txt1);
				container.addChild(txt2);
			}
		}

		if((itemVo instanceof RewardItemVo) &&itemVo.num)
		{	
			if (itemVo.type == 15 || itemVo.type == 14) {//|| itemVo.type == 16
				
				let numbg:BaseBitmap = BaseBitmap.create("public_itemtipbg2");
				numbg.width = 100;
				numbg.scaleY = 22/numbg.height;
				numbg.setPosition(container.width/2-numbg.width/2 , container.height - 22);
				container.addChild(numbg);
				let numberstr:string = LanguageManager.getlocal("itemName_"+itemVo.type)+itemVo.num;
				if(itemVo.id >10){
					numberstr = itemVo.num.toString();
					numbg.visible = false;
				}
				
				let numLb:BaseTextField = ComponentManager.getTextField( numberstr,18);
				numLb.name="numLb";
				
				container.addChild(numLb);
				if(itemVo.id >10){
					numLb.setPosition(iconBg.width - 3 - numLb.width, iconBg.height - 3 - numLb.height );
				}
				else 
				{
					numLb.setPosition(iconBg.width - 3 - numLb.width, iconBg.height - 3 - numLb.height );
				}
			}
			else {
				let numLb:BaseTextField = ComponentManager.getTextField( itemVo.num.toString(),16,TextFieldConst.COLOR_WHITE);
				numLb.name="numLb";

				let numbg:BaseBitmap = BaseBitmap.create("public_9_itemnumbg");
				if (itemVo.num>99)
				{
					numbg.width = numLb.width+18;
				}
				numbg.name="numbg";
				numbg.setPosition(iconBg.width-numbg.width-4,iconBg.height-numbg.height-4);
				numLb.setPosition(iconBg.width-numLb.width-12, numbg.y+numbg.height/2-numLb.height/2 );

				container.addChild(numbg);
				container.addChild(numLb);
				// numbg.visible = false;
			}
		}
		else if (num!=null)
		{
			let numLb:BaseTextField = ComponentManager.getTextField( String(num),16,TextFieldConst.COLOR_WHITE);
			numLb.name="numLb";

			let numbg:BaseBitmap = BaseBitmap.create("public_9_itemnumbg");
			if (num>99)
			{
				numbg.width = numLb.width+18;
			}
			numbg.name="numbg";
			numbg.setPosition(iconBg.width-numbg.width-4,iconBg.height-numbg.height-4);
			numLb.setPosition(iconBg.width-numLb.width-12, numbg.y+numbg.height/2-numLb.height/2 );

			container.addChild(numbg);
			container.addChild(numLb);
		}

		if(isTouchShowInfo)
		{
			iconBg.addTouchTap((event:egret.TouchEvent,item:string|number|RewardItemVo)=>{
				ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW,item);
			},GameData,[(itemVo instanceof RewardItemVo)?itemVo:itemVo.id]);

			icon.addTouchTap((event:egret.TouchEvent,item:string|number|RewardItemVo)=>{
				ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW,item);
			},GameData,[(itemVo instanceof RewardItemVo)?itemVo:itemVo.id]);
		}

		if(isShowEffect)
		{
			let temScale = 1/0.74;
			let effectClip = ComponentManager.getCustomMovieClip("itemeffect",10,100);
			effectClip.x = icon.x + 50 - 198*temScale/2;
			effectClip.y = icon.y + 52 - 197*temScale/2;
			container.addChild(effectClip);
			effectClip.scaleX = effectClip.scaleY = temScale;
			effectClip.playWithTime(-1);
		}

		
		if(itemVo instanceof Config.ItemItemCfg ||itemVo.type==6)
		{
			var cfg =Config.ItemCfg.getItemCfgById(itemVo.id);
			if(cfg&&cfg.showContent&&cfg.showContent==1&&isshowMagnifier==true)
			{ 
				let magnifierIcon:BaseBitmap = BaseBitmap.create("public_magnifier");  
				magnifierIcon.width = 38;
				magnifierIcon.height = 38;
				magnifierIcon.x =70;
				magnifierIcon.y =2;
				magnifierIcon.name = "magnifierIcon";
				container.addChild(magnifierIcon);

				magnifierIcon.addTouchTap((event:egret.TouchEvent,item:string|number|RewardItemVo)=>
				{
					ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOEXTENDPOPUPVIEW,item);
					
				},GameData,[(itemVo instanceof RewardItemVo)?itemVo:itemVo.id]);
				
			} 
		} 
		return container;
	}

	/**
	 * 获取奖励物品Icon
	 * @param rewards 奖励原始数据
	 * @param isTouchShowInfo 是否触摸显示道具详情，默认不显示，如需要显示请传true
	 * @param isShowEffect 是否显示特效
	 */
	export function getRewardItemIcons(rewards:string,isTouchShowInfo?:boolean,isShowEffect:boolean = false,isSame:boolean = false,sortType:number=0):Array<BaseDisplayObjectContainer>
	{
		let arr:Array<BaseDisplayObjectContainer> = new Array();
		let rewardsArr:Array<RewardItemVo> = GameData.formatRewardItem(rewards,isSame);
		if(sortType)
		{
			if(sortType == 1)  //品质从高到低排序
			{
				rewardsArr.sort((a:RewardItemVo, b:RewardItemVo)=>
				{
					if(a.quality != b.quality)
					{
						return b.quality - a.quality;
					}else
					{
						return b.id - a.id;
					}
				})
			}
		}
		for(let i:number = 0;i < rewardsArr.length;i++)
		{
			let rewardItemIcon:BaseDisplayObjectContainer = GameData.getItemIcon(rewardsArr[i],isTouchShowInfo,isShowEffect);
			arr.push(rewardItemIcon);
		}
		return arr;
	}

	export function getRewardItemVoByIdAndType(type:number|string,id?:number|string):RewardItemVo
	{
		if(type)
		{
			return formatRewardItem(type+"_"+id+"_0")[0];
		}
		return null;
	}

	export function getRewardItemIconByIdAndType(type:number|string,id?:number|string,isTouchShowInfo?:boolean,num?:number):BaseDisplayObjectContainer
	{
		if(type)
		{
			return getRewardItemIcons(type+"_"+id+"_"+String(num?num:0),isTouchShowInfo)[0];
		}
		return null;
	}

	/**
	 * 根据icon名字和背景名字获取icon图标
	 * @param iconName 
	 * @param iconBgName 
	 */
	export function getIconContainer(iconName:string,iconBgName:string,num:number = null):BaseDisplayObjectContainer
	{
		let container:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
		let bg:BaseBitmap=BaseBitmap.create(iconBgName);
		container.addChild(bg);
		bg.name="iconBg";
		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 100, 100);
		let icon:BaseLoadBitmap=BaseLoadBitmap.create(iconName,rect,{callback:(container:BaseDisplayObjectContainer)=>{
			if(container)
			{
				let bg:BaseBitmap=<BaseBitmap>container.getChildByName("iconBg");
				let icon:BaseLoadBitmap=<BaseLoadBitmap>container.getChildByName("icon");
				if(bg&&icon)
				{
					icon.setPosition((bg.width-icon.width)/2,(bg.height-icon.height)/2);
				}
			}
		},callbackThisObj:GameData,callbackParams:[container]});
		container.addChild(icon);
		icon.name="icon";

		if (num != null)
		{
			let numLb:BaseTextField = ComponentManager.getTextField( num.toString(),16,TextFieldConst.COLOR_WHITE);
			numLb.name="numLb";

			let numbg:BaseBitmap = BaseBitmap.create("public_9_itemnumbg");
			if (num>99)
			{
				numbg.width = numLb.width+18;
			}
			numbg.name="numbg";
			numbg.setPosition(bg.width-numbg.width-4,bg.height-numbg.height-4);
			numLb.setPosition(bg.width-numLb.width-12, numbg.y+numbg.height/2-numLb.height/2 );

			container.addChild(numbg);
			container.addChild(numLb);
		}

		return container;
	}
	/**
	 * 检测限时红颜会不会显示
	 */
	export function checkTimeLimitWife():boolean
	{
		let vo = Api.shopVoApi.getPayInfoById2("g16");
		let cfg  = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
		if(cfg&&vo&&Number(vo.isbuy) == 0)
		{
			let wifeEt = vo.st + cfg.lastTime;
			let wifevo = GameData.formatRewardItem(cfg.getReward)[0];
			let iswife = Api.wifeVoApi.getWifeInfoVoById(wifevo.id);
			if(wifeEt > GameData.serverTime&&Api.switchVoApi.checkOpenTimeLimitWife()&&(!iswife))
			{
				return true;
			}
		}
		return false;
	}
	/**
	 * 皇帝说话的字数限制
	 */
	export function emperortalkMaxNumber():number
	{
		if(PlatformManager.checkIsThSp())
		{
			return PlatformCfg.emperortalkMaxNumberCfg["th"];
		}
		else if(PlatformManager.checkIsEnLang())
		{
			return PlatformCfg.emperortalkMaxNumberCfg["en"];
		}
		return PlatformCfg.emperortalkMaxNumberCfg["other"];
	}
	/**聊天最大长度 */
	export function chatMaxNumber():number
	{
		if(PlatformManager.checkIsEnLang())
		{
			return PlatformCfg.chatMaxNumberCfg["en"];
		}
		if(PlatformManager.checkIsRuLang())
		{
			return PlatformCfg.chatMaxNumberCfg["ru"];
		}
		return PlatformCfg.chatMaxNumberCfg["other"];
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
				break;
			}
		}
	} 

	export function arrayDelItem(obj:any , array:any[]):boolean
	{
		for (let i:number =0 ; i<array.length; i++)
		{
			if (obj == array[i])
			{
				array.splice(i,1);
				return true;
			}
		}
		return false;
	} 

	/**
	 * 检测是否可以弹出公告
	 */
	export function checkShowNoticeInGame():boolean
	{
		let localStr:string=LocalStorageManager.get(LocalStorageConst.LOCAL_ANNOUNCEMENT_SHOW+Api.playerVoApi.getPlayerID());
		let localT:number=0;
		let localId:number=0;
		let localserverT:number=0;
		if(localStr&&localStr.indexOf("-")>-1)
		{
			let tmpArr:string[]=localStr.split("-");
			let localTStr=tmpArr[0];
			localT=Number(localTStr.split("_")[0]);
			localId=Number(localTStr.split("_")[1]);
			let uid=tmpArr[2];
			localserverT=Number(tmpArr[1]);
			if(localserverT&&App.DateUtil.checkIsToday(localserverT)==false)
			{
				LocalStorageManager.remove(LocalStorageConst.LOCAL_ANNOUNCEMENT_SHOW+Api.playerVoApi.getPlayerID());
			}
			else if(localT&&GameData.announcementLastestT)
			{
				let tmpLocalT=Number(GameData.announcementLastestT.split("-")[0].split("_")[0]);
				let tmpLocalId=Number(GameData.announcementLastestT.split("-")[0].split("_")[1]);
				if(tmpLocalT==localT && tmpLocalId==localId)
				{
					return false;
				}
			}
		}
		else
		{
			LocalStorageManager.remove(LocalStorageConst.LOCAL_ANNOUNCEMENT_SHOW+Api.playerVoApi.getPlayerID());
		}
		return true;
	}

	/**
	 * 检测是否可以弹出公告进服之前
	 */
	export function checkShowNoticeInLogin(noticeData:any):boolean
	{
		let localStr:string=LocalStorageManager.get(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW+LoginManager.getLocalUserName());
		if(localStr)
		{	
			let localT:number = Number(localStr);
			let currT:number = GameData.announcementLoginLastTime;
			let local0T = localT - localT % 86400;
			let curr0T = currT - currT % 86400;
			if (local0T != curr0T ){
				LocalStorageManager.remove(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW+LoginManager.getLocalUserName());
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
		let localStr:string=LocalStorageManager.get(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW+LoginManager.getLocalUserName());
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
		return LanguageManager.getlocal("rechargeName_" + id);
	}

	export function getRechargeItemDesc(id:string):string
	{
		return LanguageManager.getlocal("rechargeDesc_" + id);
	}

	export function dispose():void
	{
		limitVipLv=null;
		closeSource=NaN;
		customerServiceData = null;
		isShowedHomeScene= false;
		fqGameStrategyData =={"intro":"" ,"rcontent":[],"faqcontent":[],"index": 0};
		isSendAcChristmasMessage = true;
		acNewYearSignUpTime = 0;
		isOpenNewYearSignUpView = true;
		acPopTime = 0;
		payWaitSendDic={};
		statUrl=null;
		announcementLastestT=null;
		lastAutoSyncTime=0;
		hideReward.length=0;
		wbisshow = false;
		bioHave = false;
	}
	/**
	 * 特殊奖励viewName，type
	 */
	export function getViewNameForType(specialReward:{ id: string, type: string })
	{
		let viewName = "Special" + specialReward.type + "GetView";
		if (specialReward.type == "11") { //特殊的
			let titlecfg = Config.TitleCfg.getTitleCfgById(specialReward.id);
			if (titlecfg.isTitle == 1) {
				if (titlecfg.titleType) {
					viewName = "SpecialTitleGetView";
				}
				else {
					viewName = "SpecialSkinGetView"; // 角色皮肤
				}

			}
			else if (titlecfg.isTitle == 2) {
				viewName = "SpecialHeadPortraitGetView"; //头像框
			}
			else if (titlecfg.isTitle == 3) {
				viewName = "SpecialSkinGetView"; // 角色皮肤
			}
			else if (titlecfg.isTitle == 4) {
				viewName = "SpecialTitle4GetView"; // 头衔
			}
			else if (titlecfg.isTitle == 5) {
				viewName = "SpecialHeadGetView"; // 头像
			}
			else if (titlecfg.isTitle == 6) {
				viewName = "SpecialChatBoxGetView"; // 聊天框
			}
		}
		if(specialReward.type =="Fame"){
			viewName = "AtkraceFameServantUpFameView";

		}
		return viewName;
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


}