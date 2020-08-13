/**
 * 用户信息
 * author dmj
 * date 2017/9/16
 * @class PlayerVo
 */
class PlayerVo extends BaseVo
{
	// 用户游戏ID
	public uid:number = 0;
	// 用户头像
	public pic:number = 0;
	// 用户名称
	public name:string = "";
	// 等级/官职
	public level:number = 0;
	// 经验/政绩
	public exp:number = 0;
	// VIP等级
	public vip:number = -1;
	// VIP经验
	public vipexp:number = 0;
	// 钻石/元宝
	public gem:number = 0;
	// 银两
	public gold:number = 0;
	// 军团ID
	public mygid:number = 0;
	// 军团名称
	public mygname:string = "";
	// 势力值
	public power:number = 0;
	// 购买元宝数量
	public buyg:number = 0;
	// 最户购买元宝时间
	public buyt:number = 0;
	// 免费获得元宝
	public freeg:number = 0;
	// 总共消耗元宝
	public tcost:number = 0;
	// 最后在线时间
	public olt:number = 0;
	// 数据上次更新时间
	public updated_at:number = 0;
	//魅力
	public charm:number = 0;
	//智力
	public inte:number = 0;
	//武力
	public atk:number = 0;
	// 政治
	public politics:number = 0;
	
	// 粮食
	public food:number = 0;
	public soldier:number = 0;

	//称号信息
	public title:any=null;
	//称号
	public titleid:number = 0;
	// 皮肤
	public titleid2:number = 0;
	//今日在线时长
	public todayolt:number = 0;
	//头像
	public ptitle:any=null;

	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data.buyg != this.buyg || data.level != this.level)
			{
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_STORAGE)
			}
			let refreshArr = this.checkRefreshUI(data);
			if(data.uid != null)
			{
				this.uid = Number(data.uid);
			}
			if(data.pic != null)
			{
				if (data.pic == "")
				{
					this.pic = 0;
				}
				else
				{
					this.pic = Number(data.pic);
				}
			}
			if(data.name != null)
			{
				this.name = String(data.name);
			}
			if(data.level != null)
			{
				let curLevel = this.level;
				this.level = Number(data.level);
				
				// this.level = 3; // test code
				//酒楼分阶段引导
				let ucLockLevel = Config.DinnerCfg.getNeedLv();
				if(curLevel != this.level && this.level == ucLockLevel && curLevel == ucLockLevel - 1){
					if (!Api.unlocklist2VoApi.getAtHome()){
						Api.unlocklist2VoApi._isNeedWait = true;
					}
					Api.rookieVoApi.curGuideKey = "dinner";
					Api.rookieVoApi.insertWaitingGuide({"idx":"dinner_1"},true);
				}
				//寻访分阶段引导
				let searchUcLockLevel = Config.SearchbaseCfg.needLv;
				if(curLevel != this.level && this.level == searchUcLockLevel && curLevel == searchUcLockLevel - 1){
					Api.rookieVoApi.curGuideKey = "search";
					Api.rookieVoApi.insertWaitingGuide({"idx":"search_1"},true);
				}
				//升级统计
				if(curLevel != this.level && curLevel != 0){
					PlatformManager.analyticsLevelup();
				}
				//门客珍器坊引导
				if(Api.switchVoApi.checkZhenQiFangOpen()){				
					let needlv = Config.ServantweaponCfg.lvNeed;
					if((curLevel != this.level && this.level == needlv && curLevel == needlv - 1)){
						Api.rookieVoApi.curGuideKey = "zhenqifang";
						Api.rookieVoApi.insertWaitingGuide({"idx":"zhenqifang_1"},true);
					}
				}
			}
			if(data.exp != null)
			{
				this.exp = Number(data.exp);
			}
			if(data.vip != null)
			{	
				let curVip:number = this.vip;
				this.vip = Number(data.vip);

				//升级统计
				if(curVip != this.vip && curVip != -1){
					PlatformManager.analyticsVipup();
				}
			}
			if(data.vipexp != null)
			{
				this.vipexp = Number(data.vipexp);
			}
			if(data.gem != null)
			{
				this.gem = Number(data.gem);
			}
			if(data.gold != null)
			{
				this.gold = Number(data.gold);
			}
			if(data.mygid != null)
			{
				this.mygid = Number(data.mygid);
			}
			if(data.mygname != null)
			{
				this.mygname = String(data.mygname);
			}
			if(data.power != null)
			{	
				let curPower = this.power;
				this.power = Number(data.power);
				if(LoginManager.isCreateScene)
				{
					if(this.power>curPower)
					{
						if(GameConfig.checkWywReportPower(curPower,this.power))
						{
							PlatformManager.reportGameResult();
						}
					}
				}
				let curCmd = NetManager.curReceiveCmd;
				if(curPower!=0 && this.power - curPower >0&& curCmd != NetRequestConst.REQUEST_WIFE_LOVE&& curCmd != NetRequestConst.REQUEST_WIFE_CALL && curCmd.indexOf("push.")!==1){
					let dis = this.power - curPower;
					let pos = egret.Point.create(320,GameConfig.stageHeigth/2);
					// App.CommonUtil.playRewardFlyAction([{tipMessage:LanguageManager.getlocal("rankpower")+"+"+dis}],pos);	
					let powerFly = new PowerFly();
					powerFly.init(dis);
					
					LayerManager.msgLayer.addChild(powerFly);
				}
				if(curPower!=0 && this.power - curPower >0){
					App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHECK_MEET_BEAUTY);
				}
			}
			if(data.buyg != null)
			{
				this.buyg = Number(data.buyg);
			}
			if(data.buyt != null)
			{
				this.buyt = Number(data.buyt);
			}
			if(data.freeg != null)
			{
				this.freeg = Number(data.freeg);
			}
			if(data.tcost != null)
			{
				this.tcost = Number(data.tcost);
			}
			if(data.olt != null)
			{
				this.olt = Number(data.olt);
			}
			if(data.updated_at != null)
			{
				this.updated_at = Number(data.updated_at);
			}

			if(data.charm != null)
			{
				this.charm = Number(data.charm);
			}

			if(data.inte != null)
			{
				this.inte = Number(data.inte);
			}

			if(data.atk != null)
			{
				this.atk = Number(data.atk);
			}
			if(data.politics != null)
			{
				this.politics = Number(data.politics);
			}
			if(data.food != null)
			{
				this.food = Number(data.food);
			}
			if (data.soldier != null)
			{
				this.soldier = Number(data.soldier);
			}
			if(refreshArr.length>0)
			{
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI,refreshArr);
			}
			if (data.title != null)
			{	
				this.title = App.CommonUtil.getTitleData(data.title);
				if((typeof data.title == "string" || typeof data.title == "number") && data.title != ''){
					let titleArray:string[] = String(data.title).split("_");			
					if (titleArray[1])
					{
						this.titleid2 =  Number(titleArray[0]);
						this.titleid = Number(titleArray[1]);
					}
					else
					{	
						if (Config.TitleCfg.getIsTitleOnly(titleArray[0]))
						{
							this.titleid = Number(titleArray[0]);
							this.titleid2 = 0;
						}
						else
						{
							this.titleid = Number(titleArray[0]);
							this.titleid2 =  Number(titleArray[0]);
						}
					}
				}
				if(typeof data.title == "object"){
					let titleinfo = App.CommonUtil.getTitleData(data.title);		
					if(titleinfo.title != ``){					
						if (titleinfo.clothes != ``)
						{
							this.titleid2 = Number(titleinfo.clothes);
							this.titleid = Number(titleinfo.title);
						}
						else
						{	
							if (Config.TitleCfg.getIsTitleOnly(titleinfo.title))
							{
								this.titleid = Number(titleinfo.title);
								this.titleid2 = 0;
							}
							else
							{
								this.titleid = Number(titleinfo.title);
								this.titleid2 =  Number(titleinfo.title);
							}
						}
					}
					else{
						this.titleid = 0;
					}

					if(titleinfo.clothes == ``){
						this.titleid2 = 0;
					}
					
				}
			}
			else
			{
				this.titleid = 0;
				this.titleid2 = 0;
			}
			if(data.ptitle != null){
				this.ptitle = data.ptitle;
			}
			else{
				this.ptitle = null;
			}
			if (data.todayolt != null)
			{	
				this.todayolt = Number(data.todayolt);
				Api.playerVoApi.checkAddiction();
			}
		}
	}

	private checkRefreshUI(data:any):string[]
	{
		let resultArr:string[]=[];
		if(data)
		{
			let checkResArr:string[] = GameConfig.refreshUIResArr;
			let l:number=checkResArr.length;
			for(var i:number=l-1;i>=0;i--)
			{
				let key:string=checkResArr[i];
				let isDiff:boolean=false;
				if(data[key]!=null)
				{
					isDiff=!App.MathUtil.checkEqual(this[key],data[key]);
				}
				if(isDiff)
				{
					resultArr.push(key);
				}
			}
		}
		return resultArr;
	}

	public dispose():void
	{
		this.uid = 0;
		this.pic = 0;
		this.name = "";
		this.level = 0;
		this.exp = 0;
		this.vip = -1;
		this.vipexp = 0;
		this.gem = 0;
		this.gold = 0;
		this.mygid = 0;
		this.mygname = "";
		this.power = 0;
		this.buyg = 0;
		this.buyt = 0;
		this.freeg = 0;
		this.tcost = 0;
		this.olt = 0;
		this.updated_at = 0;
		this.charm = 0;
		this.inte = 0;
		this.atk = 0;
		this.politics = 0;
		this.food = 0;
		this.soldier = 0;
		this.titleid = 0;
		this.titleid2 = 0;
		this.todayolt = 0;
		this.title = null;
	}
}