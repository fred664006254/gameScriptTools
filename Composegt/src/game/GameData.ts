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
	export let serverTime:number=0;
	export let serverTimeMs:number=0;



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

	export let localCfg: string[] = ["192.168", "localhost","127.0.0.1","king-test.leishenhuyu.com","local-test-82.raygame3.com"];

	export let testCfg:string[]=["gt_test"];

	/**暂停心跳同步 默认false */
	export let pauseSync:boolean = false;
	/**心跳同步数据时间戳 */
	export let lastAutoSyncTime:number = 0;
	/**服务器和客户端时间差（客户端时间加上此值就是服务器时间） */
	export let serverClientTimeDt:number = 0;
	/**服务器开服时间（只有调用了otherinfo.getserverinfo赋值后才有值） */
	export let serverOpenTime:number = 0;

	/**公告数据 */
	export let announcementData:any = {};

	/**玩吧礼包 */
	export let wbrewards:string = null;
	/**
	 * 是否支持像素碰撞
	 */
	export let isSupportHitTestPoint:boolean=true;
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
	 * 红颜脱衣服Vip等级
	 */
	export let striplevel:number = 0;
	/**
	 * 英文限制名字长度
	 */
	export let nameLength:number = 10;

	/**
	 * 昆仑大区ID
	 */
	export let bigPayId:number = 0;

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
	 * 微信IOS支付等级限制
	 */
	export let ioslevellimit:number = null;

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
	 * 是否使用新的UI
	 */
	export let isUseNewUI:boolean=true;

	/**
	 * 实名认证是否进入过正常模式
	 */
	export let idcardEnterNormal:number=0;

	/**
	 * 实名认证防沉迷用户类型0，1，2，3的类用户，详见文档
	 */
	export let idcardType:string="0";

	/**
	 * pid白名单
	 */
	export let pidflag:boolean=false;

	/**
	 * ip白名单
	 */
	export let regionflag:boolean=true;

	/**
	 * 分享聊天
	 */
	export let sharechatcd = 1800;

	/**
	 * 聊天的最大字数限制
	 */
	export let chatMaxChars = 60;

	/**
	 * 是否内部测试
	 */
	export let isTestUser = false;
	/**
	 * 是不是已经显示过府邸
	 */
	export let isShowedHomeScene:boolean=false;

	/**
	 * 是不是在府邸中
	 */
	export let isHomeScene:boolean=false;

	/**
	 * 是不是在合成中
	 */
	export let isComposeScene:boolean=true;

	/**
	 * 红颜脱衣和谐开关
	 */
	export let wifeSwitch:boolean=false;
	/**
	 * 命令强制使用壳子socket
	 */
	export let testUseClientSocket:boolean=false;

	/**是否是新创建账号首次登陆的用户 */
	export let isNewUser:boolean=false;

	///////////////////////////////////////分割线|上面是变量|下面是方法///////////////////////////////////// 

	//左侧气泡
	export let leftBubble = {
		isFirstChargeBubble:false		//首充气泡

	};
	//离线时间
	export let leavetime:number = 0;
	//离线收益资源
	export let autoRes:number[] = [0,0,0];

	//是不是足额招募
	export let islvminCon:boolean = false;

	//是不是新配置
	export let isNewCfgFlag:number = null;

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

	export function setServerTime(tms:number,init?:boolean):void
	{
		serverTimeMs=tms;
		serverTime=Math.floor(tms/1000);
		if(init)
		{
			// 计算服务器和客户端时间差
			GameData.serverClientTimeDt = tms - new Date().getTime();
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
		else if (PlatformManager.checkIsKRNewSp() == true) 
		{
			return "krnew";
		}
		else if (PlatformManager.checkIsJPSp() == true) 
		{
			return "jp";
		}
		else if (PlatformManager.checkIsViSp() == true) 
		{
			return "vi";
		}
		else 
		{
			return "cn";
		}
		
	}
	// 当前的渠道id
	export function getCurPlatName():string
	{
		return "0";
	}
	/**判断是否为本地地址 */
	export function isLocal():boolean
    {
        var result: boolean = false;
        if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
        {
            var url: string = window.location.href;
            for (var i: number = 0; i < localCfg.length;i++)
            {
                var str: string = localCfg[i];
                if(url.indexOf(str)>-1)
                {
                    result = true;
                    break;
                }
            }
        } 
		// else if (App.DeviceUtil.isWXgame()) {
		// 	result = true;
		// } else if (App.DeviceUtil.isWyw()) {
		// 	result = true;
		// }
        return result;
    }

	export function isTest():boolean
	{
		if(PlatformManager.checkIsDisableSDK())
		{
			return true;
		}
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
	 * 奖励字符串整合
	 */
	export function rewardsStrComp(rewards1:string,rewards2:string):string
	{
		let arr1:Array<RewardItemVo> = GameData.formatRewardItem(rewards1);
		let arr2:Array<RewardItemVo> = GameData.formatRewardItem(rewards2);
		
		let rewardObj = new Object();
		for(let i = 0;i < arr1.length; i ++){
			let riVo1 = arr1[i];
			let checkKey = riVo1.type + "_" + riVo1.id;
			if(rewardObj.hasOwnProperty(checkKey)){
				rewardObj[checkKey] += riVo1.num;
			} else {
				rewardObj[checkKey] = riVo1.num;
			}
			
		}

		for(let j = 0; j < arr2.length; j ++){
			let riVo2 = arr2[j];
			let checkKey = riVo2.type + "_" + riVo2.id;
			if(rewardObj.hasOwnProperty(checkKey)){
				rewardObj[checkKey] += riVo2.num;
			} else {
				rewardObj[checkKey] = riVo2.num;
			}
		}
		let rewardStr = "";
		let isFirst = true;
		for(let key in rewardObj){
			if(isFirst){
				rewardStr += (key + "_" + rewardObj[key]);
				isFirst = false;
			} else {
				rewardStr += "|"+(key + "_" + rewardObj[key]);
			}
		}

		return rewardStr;
	}

	/**
	 * 解析奖励物品格式
	 * @param rewards 奖励原始数据
	 */
	export function formatRewardItem(rewards:string):Array<RewardItemVo>
	{
		let arr:Array<RewardItemVo> = new Array();
		// 1 钻石/元宝  2 黄金/银两  3 粮食  4 士兵 5 经验/政绩  6 道具 7 门客属性
		if(rewards)
		{
			let rewardsArr:Array<string> = rewards.split("|");
			for(let i:number = 0;i < rewardsArr.length;i++)
			{
				let rewardItemVo:RewardItemVo = new RewardItemVo();
				rewardItemVo.initData(rewardsArr[i]);
				 //如果不开称帝，前端屏蔽人望奖励
				if (!Api.switchVoApi.checkOpenPrestige())
				{
					if (rewardItemVo.type == 17)
					{
						continue;
					}
				}
				arr.push(rewardItemVo);
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
	 * @param touchCb 如果触摸会显示道具，这里可以另外支持一个回调，一般可以用于统计
	 * @param touchCbTarget 触摸回调的this
	 */
	export function getItemIcon(itemVo:RewardItemVo|Config.ItemItemCfg,isTouchShowInfo?:boolean,isShowEffect:boolean = false,touchCb?:Function,touchCbTarget?:any):BaseDisplayObjectContainer
	{
		let container:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		
		var iconBg:BaseBitmap = BaseBitmap.create(itemVo.iconBg);
		iconBg.name = "iconBg"
		container.addChild(iconBg);
		container.width = iconBg.width;
		container.height = iconBg.height;
		
		let icon:BaseLoadBitmap = BaseLoadBitmap.create(itemVo.icon);
		let iconName = itemVo.icon ;
		let firstChar:string = itemVo.icon.substr(0,13);
		if (firstChar == "servant_half_" || iconName.indexOf("skin_half_") > -1 )
		{
			icon.setScale(100/180);
		}
		if(itemVo.id == 1)
		{
			iconBg.texture = ResourceManager.getRes("itembg_7");
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

		
		container.addChild(icon);
		container.bindData=itemVo;

		icon.setPosition(4,3);

		if(itemVo.type==12)
		{
			icon.x = 0;

		}

		if(itemVo.type == 25){
			let item : any = itemVo;
			if(itemVo.id == 0){
				let noTxt = ComponentManager.getTextField(LanguageManager.getlocal('acSingleDayNoRed'), 18);
				noTxt.lineSpacing = 5;
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, noTxt, iconBg);
				container.addChild(noTxt);
			}
			else{
				let ybaonum:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(String(item._code),TextFieldConst.FONTNAME_ITEMTIP);
				// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, ybaonum, icon);
				if(Number(item._code) >= 1000){
					ybaonum.x = 17;
				}
				else if(Number(item._code) >= 100){
					ybaonum.x = 27;
				}
				else{
					ybaonum.x = 35;
				}
				ybaonum.y = 35;
				container.addChild(ybaonum);
			}
			
		}

		if((itemVo instanceof RewardItemVo) &&itemVo.num)
		{	
			if (itemVo.type == 15 || itemVo.type == 14|| itemVo.type == 16) {
				
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
				
				let numLb:BaseTextField = ComponentManager.getTextField( numberstr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
				numLb.name="numLb";
				numLb.setPosition(iconBg.width/2-numLb.width/2, iconBg.height - 3 - numLb.height );
				container.addChild(numLb);
				if(itemVo.id >10){
					numLb.setPosition(iconBg.width - 3 - numLb.width, iconBg.height - 3 - numLb.height );
				}
			}
			else {
				let nn =  String(itemVo.num)
				if(itemVo.type ==2 ||itemVo.type ==3||itemVo.type ==4)
				{
					nn =  App.StringUtil.changeIntToText(itemVo.num)
				}
				let numLb:BaseTextField = ComponentManager.getTextField( nn,TextFieldConst.FONTSIZE_CONTENT_SMALL);
				numLb.name="numLb";
				numLb.setPosition(iconBg.width - 3 - numLb.width, iconBg.height - 3 - numLb.height );
				container.addChild(numLb);
			}
		}
		if(isTouchShowInfo)
		{
			iconBg.addTouchTap((event:egret.TouchEvent,item:string|number|RewardItemVo)=>{
				ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW,item);
				if (touchCb) {
					touchCb.call(touchCbTarget);
				}
			},GameData,[(itemVo instanceof RewardItemVo)?itemVo:itemVo.id]);
		}

		if(isShowEffect)
		{
			let temScale = 1/0.82;
			// let temScale = 1/0.74;
			let effectClip = ComponentManager.getCustomMovieClip("itemeffect",10,100);
			// effectClip.x = icon.x + 50 - 125*temScale/2;
			// effectClip.y = icon.y + 50 - 125*temScale/2;
			effectClip.x = iconBg.x + iconBg.width/2 - 125*temScale/2;
			effectClip.y = iconBg.y + iconBg.height/2 - 125*temScale/2;
			container.addChild(effectClip);
			effectClip.scaleX = effectClip.scaleY = temScale;
			effectClip.playWithTime(-1);
		}
		if (itemVo.type == 11 && itemVo.id == "4111") {

            let headEffect = ComponentManager.getCustomMovieClip(`ryeharvestheadeffect1-`, 14, 70);
            headEffect.width = 150;
            headEffect.height = 145;
            headEffect.playWithTime(0);
			headEffect.x = icon.x + 100/2 - headEffect.width/2 +2;
			headEffect.y = icon.y + 100/2 - headEffect.height/2 - 2;
            container.addChild(headEffect);
		}
		return container;
	}

	/**
	 * 获取奖励物品Icon
	 * @param rewards 奖励原始数据
	 * @param isTouchShowInfo 是否触摸显示道具详情，默认不显示，如需要显示请传true
	 * @param isShowEffect 是否显示特效
	 */
	export function getRewardItemIcons(rewards:string,isTouchShowInfo?:boolean,isShowEffect:boolean = false):Array<BaseDisplayObjectContainer>
	{
		let arr:Array<BaseDisplayObjectContainer> = new Array();
		let rewardsArr:Array<RewardItemVo> = GameData.formatRewardItem(rewards);
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
	export function getIconContainer(iconName:string,iconBgName:string):BaseDisplayObjectContainer
	{
		let container:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
		let bg:BaseBitmap=BaseBitmap.create(iconBgName);
		container.addChild(bg);
		bg.name="iconBg";
		let icon:BaseLoadBitmap=BaseLoadBitmap.create(iconName,null,{callback:(container:BaseDisplayObjectContainer)=>{
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
		return container;
	}

	/**
	 * 生成特殊物品ICON
	 */
	export function getSpecialItemIcon(icon: string, quality: number = 1, num: number = 0, des?: string) {
		let rsl: BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		let _bg = BaseBitmap.create("itembg_" + quality);
		rsl.addChild(_bg);
		const _bgsize = 106;
		let _icon = BaseLoadBitmap.create(icon);
		rsl.addChild(_icon);
		_icon.width = _icon.height = _bgsize - 10;
		_icon.setPosition(5, 5);

		if (num > 0) {
			let _numText = ComponentManager.getTextField(""+num, 18, 0xffffff);
			_numText.width = _bgsize - 10;
			_numText.textAlign = egret.HorizontalAlign.RIGHT;
			rsl.addChild(_numText);
			_numText.setPosition(5, _bgsize - 22);
		}

		rsl.width = _bgsize;
		rsl.height = _bgsize;

		return rsl;
	}

	/**
	 * 获取门客品质ICON（没有则返回null）
	 * @param sid 门客ID
	 * @param effect 是否添加帧动画（若有），默认true
	 * @return BaseDisplayObjectContainer
	 */
	export function getServantQualityIconBySid(sid: string|number, effect: boolean = true): BaseDisplayObjectContainer {
		let _icon: BaseDisplayObjectContainer = null;
		let _servant = Config.ServantCfg.getServantItemById(sid);
		if (_servant.quality > 1) {
			_icon = new BaseDisplayObjectContainer();
			_icon.width = 209;
			_icon.height = 312;
			_icon.addChild(BaseLoadBitmap.create(Config.ServantCfg.getQualityIconKeyBySid(<string>sid)));
		}
		if (_servant.quality > 2 && effect) {
			let _icon_mv = ComponentManager.getCustomMovieClip(Config.ServantCfg.getQualityMvKeyBySid(<string>sid), 10, 120);
			_icon_mv.blendMode = egret.BlendMode.ADD;
			_icon_mv.playWithTime(0);
			_icon.addChild(_icon_mv);
		}
		return _icon;
	}

	/**
	 * 获取门客羁绊入口Icon
	 * @param servantId 门客ID
	 */
	export function getServantFetterBtn(servantId: string): BaseButton {
		let _btn: BaseButton = null;
		if (Config.ServentcombinationCfg.isHaveCombine(servantId)) {
			let _fetterBtn = ComponentManager.getButton("public_servantjibanicon", "", () => {
				ViewController.getInstance().openView(ViewConst.POPUP.SERVANTJIBANBUFFPOPUPVUEW,{sid : servantId});
			}, GameData, null, 0);
			let _fetterText = BaseBitmap.create("public_servantjibantxt");
			_fetterText.width = 67;
			_fetterText.height = 43;
			_fetterBtn.addChild(_fetterText);
			_fetterText.setPosition(
				(_fetterBtn.width - _fetterText.width)/2,
				_fetterBtn.height - _fetterText.height
			);
			// this.addChild(_fetterBtn);
			// _fetterBtn.setPosition(463, bg2.y + 435);
			// _fetterBtn.setScale(100/_fetterBtn.width);
			_btn = _fetterBtn;
		}
		return _btn;
	}

	export function init():void
	{
		// if(GameData.isUseNewUI)
		// {
			/**
			 * 提示黄
			 */
			TextFieldConst.COLOR_WARN_YELLOW = 0xfdf3b5;
			/**
			 * 提示黄2，颜色更深，适合放到亮色底板
			 */
			TextFieldConst.COLOR_WARN_YELLOW2 = 0xfedb38;
			/**
			 * 提示红
			 */
			TextFieldConst.COLOR_WARN_RED = 0xac0101;
			/**
			 * 提示绿
			 */
			TextFieldConst.COLOR_WARN_GREEN = 0x13851e;

			/**
			 * 品质灰
			 */
			TextFieldConst.COLOR_QUALITY_GRAY =0xdfdfdf
			/**
			 * 品质白
			 */
			TextFieldConst.COLOR_QUALITY_WHITE = 0x7e7e7e;
			/**
			 * 品质绿
			 */
			TextFieldConst.COLOR_QUALITY_GREEN = 0x619c6c;
			/**
			 * 品质蓝
			 */
			TextFieldConst.COLOR_QUALITY_BLUE = 0x617b9c;
			/**
			 * 品质紫
			 */
			TextFieldConst.COLOR_QUALITY_PURPLE = 0x97659f;
			/**
			 * 品质橙
			 */
			TextFieldConst.COLOR_QUALITY_ORANGE = 0xdc9740;
			/**
			 * 品质红
			 */
			TextFieldConst.COLOR_QUALITY_RED = 0xce1515
			/**
			 * 品质黄
			 */
			TextFieldConst.COLOR_QUALITY_YELLOW = 0xfedb38;
		// }
	}

	/**
	 * 检测限时红颜会不会显示
	 */
	export function checkTimeLimitWife():boolean
	{
		let vo = Api.shopVoApi.getPayInfoById2("g16");
		let cfg  = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
		if(cfg&&vo&&Number(vo.isbuy) == 0 && Api.switchVoApi.checkOpenTimeLimitWife())
		{
			
			let wifeEt = vo.st + cfg.lastTime;
			let wifevo = GameData.formatRewardItem(cfg.getReward)[0];
			let iswife = Api.wifeVoApi.getWifeInfoVoById(wifevo.id);
			//只有微信小程序永久显示
			// if(PlatformManager.checkIsWxSp()){
			// 	return true;
			// } else {
				if(wifeEt > GameData.serverTime&&(!iswife))
				{
					return true;
				}
			// }
		}
		return false;
	}

	//越南 fb第三方支付 红颜售卖
	export function checkTimeLimitWifeFb():boolean
	{
		let cfg  = Config.RechargeCfg.getRechargeItemCfgByKey("g16");

		if(cfg && PlatformManager.checkIsViSp() && Api.switchVoApi.checkOpenTimeLimitWifeFb() && !Api.shopVoApi.isWebPay())
		{
			
			let wifeEt = Api.gameinfoVoApi.getRegdt() + cfg.lastTime;
			let wifevo = GameData.formatRewardItem(cfg.getReward)[0];
			let iswife = Api.wifeVoApi.getWifeInfoVoById(wifevo.id);
	

			if(wifeEt > GameData.serverTime&&(!iswife))
			{
				return true;
			}
	
		}
		return false;
	}

	//合成按钮红点
	export function checkCityRed():boolean
	{
		if(Api.dailytaskVoApi.checkRedPoint()||Api.achievementVoApi.checkRedPoint()
		||Api.wifeVoApi.checkNpcMessage()||Api.searchVoApi.checkNpcMessage()||Api.childVoApi.checkNpcMessage()
		||Api.studyatkVoApi.checkNpcMessage()||Api.atkraceVoApi.checkNpcMessage()
		||Api.prisonVoApi.checkNpcMessage()||Api.mailVoApi.getUnreadNum() > 0
		||Api.adultVoApi.checkNpcMessage()||Api.palaceVoApi.checkNpcMessage()||Api.rankVoApi.checkNpcMessage()
		)
		{
			return true;
		}
		return false;
	}


	export function dispose():void
	{
		limitVipLv=null;
		closeSource=NaN;
		customerServiceData = null;
		isShowedHomeScene= false;
		ioslevellimit =null;
		pidflag=false;
		regionflag=true;
		isHomeScene = false;
		isComposeScene = false;
		leftBubble = {
			isFirstChargeBubble:false		//首充气泡

		};
		autoRes = [0,0,0];
		leavetime=0;
		islvminCon = false;
		isNewUser=false;
		isNewCfgFlag = null;
		serverTime=serverTimeMs=0;
	}

}