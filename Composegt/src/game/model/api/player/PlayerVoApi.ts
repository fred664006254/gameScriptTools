/**
 * 用户信息api
 * author dmj
 * date 2017/9/15
 * @class PlayerVoApi
 */
class PlayerVoApi extends BaseVoApi
{
	private playerVo:PlayerVo;

	public adictionTab:number[] = [3600,7200,10800,12600,14400,16200,18000];
	// public adictionTab:number[] = [36,72,108,126,144,162,1800];
	//第几次警告 1 ～ 7
	private adictionWarnTimes:number = 0;
	private lastCheckTime:number = 0;
	public constructor() 
	{
		super();
	}

	public getPlayerMaxVip():number
	{
		return Config.VipCfg.getMaxLevel();
		// return 11;
	}
	
	// 用户id
	public getPlayerID():number
	{
		if(this.playerVo)
		{
			return this.playerVo.uid;
		}
		return 0;
	}
	// 获取头像ID
	public getPlayePicId():number
	{
		return this.playerVo.pic;
	}
	// 获取头像
	public getPlayerSmallPic():string
	{
		return "smallpic" + this.playerVo.pic;
	}

	// 获取全身像
	public getPlayerBigPic():string
	{
		return "bigpic" + this.playerVo.pic;
	}
	// 获取用户名称
	public getPlayerName():string
	{
		return this.playerVo.name;
	}
	// 获取用户等级
	public getPlayerLevel():number
	{
		if(!this.playerVo)
		{
			return 1;
		}
		return this.playerVo.level;
	}

	/** 获取下一级 */
	public getPlayerNextLevel():number
	{
		let lv=this.getPlayerLevel();
		let maxLv = Config.LevelCfg.getMaxLevel();
		return Math.min(lv+1,maxLv);
	}

	/**检测是否升级到最大级 */
	public checkMaxPlayerLevel():boolean
	{
		let lv=this.getPlayerLevel();
		let maxLv = Config.LevelCfg.getMaxLevel();
		return lv>=maxLv;
	}

	// 获取用户经验值
	public getPlayerExp():number
	{
		// todo
		return this.playerVo.exp;
	}
	// 获取用户vip等级
	public getPlayerVipLevel():number
	{
		return this.playerVo.vip;
	}
	/**
	 * 获取用户下一个VIP等级
	 */
	public getPlayerNextVipLevel():number
	{
		let level:number=this.playerVo.vip+1;
		level=Math.min(Config.VipCfg.getMaxLevel(),level);
		return level;
	}
	// 获取用户vip经验
	public getPlayerVipExp():number
	{
		return this.playerVo.vipexp;
	}
	/**
	 * 获取用户元宝
	 */
	public getPlayerGem():number
	{
		return this.playerVo.gem;
	}
	/**
	 * 获取用户消耗元宝
	 */
	public getUsegems():number
	{
		return this.playerVo.usegems;
	}
	/**
	 * 获取用户元宝 用亿万显示
	 */
	public getPlayerGemStr():string
	{
		return App.StringUtil.changeIntToText(this.playerVo.gem); 
	}
	/**
	 * 获取用户银两
	 */ 
	public getPlayerGold():number
	{
		return this.playerVo.gold;
	}
	/**
	 * 获取用户银两(亿万显示)
	 */ 
	public getPlayerGoldStr():string
	{
	
		return 	App.StringUtil.changeIntToText(this.playerVo.gold);
	}
	// 获取用户军团id
	public getPlayerAllianceId():number
	{
		return this.playerVo.mygid;
	}
	// 获取用户军团名称
	public getPlayerAllianceName():string
	{
		return this.playerVo.mygname;
	}
	/**
	 * 获取用户势力值
	 */
	public getPlayerPower():number
	{
		return this.playerVo.power;
	}
	/**
	 * 获取用户势力值(亿万显示)
	 */
	public getPlayerPowerStr():string
	{
		
		return App.StringUtil.changeIntToText(this.playerVo.power);
	}
	/**
	 * 获取购买元宝的数量
	 */
	public getPlayerBuyGem():number
	{
		return this.playerVo.buyg;
	}
	
	/**
	 * 获取粮食
	 */
	public getFood():number
	{
		return this.playerVo.food;
	}
	/**
	 * 获取粮食 亿万显示
	 */
	public getFoodStr():string
	{
	
		return 	App.StringUtil.changeIntToText(this.playerVo.food);
	}

	/**
	 * 官职
	 */
	public getPlayerOffice():string
	{
		return this.getPlayerOfficeByLevel(this.playerVo.level);
	}

	/**
	 * 下一个官职
	 */
	public getNextPlayerOffice():string
	{
		return this.getPlayerOfficeByLevel(this.getPlayerNextLevel());
	}

	public getPlayerOfficeByLevel(level:number):string
	{
		return LanguageManager.getlocal("officialTitle"+level);
	}

	/**
	 * 上个官职
	 */
	public getPlayerPrevOffice():string
	{
		if(this.playerVo.level > 1)
		{
			return LanguageManager.getlocal("officialTitle"+(this.playerVo.level - 1));
		}
		return LanguageManager.getlocal("officialTitle"+this.playerVo.level);
	}
	/**
	 * 获取士兵
	 */
	public getSoldier():number
	{
		return this.playerVo.soldier;
	}
	/**
	 * 获取士兵 亿万显示
	 */
	public getSoldierStr():string
	{
	
		return 	App.StringUtil.changeIntToText(this.playerVo.soldier);
	}


	/**
	 * 获取魅力
	 */
	public getCharm():number
	{
		return this.playerVo.charm;
	}
	/**
	 * 获取智力
	 */
	public getInte():number
	{
		return this.playerVo.inte;
	}
	/**
	 * 获取武力
	 */
	public getAtk():number
	{
		return this.playerVo.atk;
	}
	/**
	 * 获取政治
	 */
	public getPolitics():number
	{
		return this.playerVo.politics;
	}
	/**
	 * 获取称号
	 */
	public getTitleid():number
	{
		return this.playerVo.titleid;
	}
	// 获取升级所需经验
	public getNextLevelExp():number
	{	
		let curLevel:number = Api.playerVoApi.getPlayerLevel();
		if ( curLevel < Config.LevelCfg.getMaxLevel() ) {
			curLevel++;
		}
		return Config.LevelCfg.getCfgByLevel(curLevel.toString()).exp;
	}

	/**
	 * 根据类型获取资源数量
	 * @param type 类型 ItemEnums的枚举,支持key或者value
	 */
	public getValueByResType(type:string|number):string
	{
		if(typeof(type)!="number")
		{
			type=ItemEnums[type];
		}
		let num:string="0";
		if(type==1)
		{
			num=Api.playerVoApi.getPlayerGem() + "";
		}
		else if(type==2)
		{
			num=Api.playerVoApi.getPlayerGoldStr()+ "";
		}
		else if(type==3)
		{
			num=Api.playerVoApi.getFoodStr()+ "";
		}
		else if(type==4)
		{
			num=Api.playerVoApi.getSoldierStr()+ "";
		}
		else if(type==5)
		{
			num=Api.playerVoApi.getPlayerExp()+ "";
		}
		else if(type==0)
		{
			num=Api.playerVoApi.getPlayerPowerStr()+ "";
		}
		return num;
	}

	public getCurLevelPrivilegeTxtStr(level?:number):string
	{
		level = level? level :Api.playerVoApi.getPlayerLevel()
		let curLvCfg = Config.LevelCfg.getCfgByLevel(level.toString())
		if (!curLvCfg)
		{
			return  LanguageManager.getlocal("promotionView_topLV");
		}

		let str = ""
		// for (var index = 0; index < curLvCfg.personLv.length; index++) {
		// 	if(index == curLvCfg.personLv.length-1)
		// 	{
		// 		str = str + "LV."+ curLvCfg.personLv[index];
		// 	}else{
		// 		str = str + "LV."+ curLvCfg.personLv[index] +"  ";
		// 	}
			
			
		// }
		let resultStr ="";
		let idx = 1;
		if (curLvCfg.servant){
			resultStr += idx.toString() + "."+ LanguageManager.getlocal("promotion_privilege6") + LanguageManager.getlocal("servant_name"+curLvCfg.servant) + "\n"
			idx +=1;
		}
		resultStr += (idx++) +"."+ LanguageManager.getlocal("promotion_compose_desc1",[str])
			// +(idx++) +"."+ LanguageManager.getlocal("promotion_privilege2") + " <font color="+TextFieldConst.COLOR_QUALITY_GREEN+">" + curLvCfg.food + "</font>\n"
			// +(idx++) +"."+ LanguageManager.getlocal("promotion_privilege3") + " <font color="+TextFieldConst.COLOR_QUALITY_GREEN+">" + curLvCfg.soldier + "</font>\n"
			// +(idx++) +"."+ LanguageManager.getlocal("promotion_privilege4") + " <font color="+TextFieldConst.COLOR_QUALITY_GREEN+">" + curLvCfg.affair + "</font>\n"
			// // +(idx++) +"."+ LanguageManager.getlocal("promotion_privilege5") + curLvCfg.servantLv ;
			// +(idx++) +"."+ LanguageManager.getlocal("promotion_privilege7",[String(curLvCfg.gem )]);
	

		if( Api.practiceVoApi.isPracticeOPen() )
		{
			let plv = this.getPlayerLevel(); 
			let plvcfg = GameConfig.config.practicebaseCfg.level;
			let storeLimit = GameConfig.config.practicebaseCfg.storeLimit;
			let addV = plvcfg[plv-1];
			let addV2 = storeLimit[plv-1];
			if(!addV)
			{
				addV = plvcfg[plvcfg.length-1];
			}
			if(!addV2)
			{
				addV2 = storeLimit[storeLimit.length-1];
			}

			resultStr += "\n";
			resultStr = resultStr +(idx++) +"."+ LanguageManager.getlocal("promotion_privilege8") + addV
			+ "\n"
			 +(idx++) +"."+ LanguageManager.getlocal("promotion_privilege9") + addV2;
		}

		return resultStr
	}


	/**
	 * 获取用户形象（有官职的显示官职 ，通过ID判断）
	 * 
	 * @param picId 官衔 pic 用户头像
	 */
	public getPlayerPortrait(picId:number,pic:number,type?:number,isCreateUser?:boolean,isMale?:boolean):BaseDisplayObjectContainer
	{	
		let container = new BaseDisplayObjectContainer();
		let rect:egret.Rectangle= new egret.Rectangle();
		
		let num:number=0;
		let loadComplete=function(container:BaseDisplayObjectContainer):void
		{
			if(container)
			{
				if(container["loadusernum"]==null)
				{
					container["loadusernum"]=0;
				}
				container["loadusernum"]++;
				
				if(container["loadusernum"]==container["maxNum"])
				{
					if(container.getChildByName("myBody"))
					{
						container.getChildByName("myBody").visible=true;
					}
					if(container.getChildByName("myHead"))
					{
						container.getChildByName("myHead").visible=true;
					}
					if(container.getChildByName("myHair"))
					{
						container.getChildByName("myHair").visible=true;
					}
				}
			}
		}

		let picStr = "user_body"
		rect.setTo(0,0,300,618);
		if(picId >= 1000){
			picStr = "user_body_full_"
			rect.setTo(0,0,382,618);
		}
		container["maxNum"] = 2;
		
		let hairPic = "user_hair" + pic;
		if(pic <= 5){
			hairPic = "user_hair" + 7;
		} else if (pic >= 5000) {
			hairPic = "user_hair7";
		}

		// if(pic > 5){
			// let rect12:egret.Rectangle= egret.Rectangle.create();
			let rect12:egret.Rectangle= new egret.Rectangle();
			rect12.setTo(0,0,85,140);
			let myHair = BaseLoadBitmap.create(hairPic,rect12,{callback:loadComplete,callbackThisObj:this,callbackParams:[container]});
			myHair.visible=false;
			myHair.x = 111;
			myHair.y = -3;
			myHair.name = "myHair";
			container.addChild(myHair);
			container["maxNum"] = 3;
		// }
		
		let bodyPic = picStr + picId;

		if(Api.switchVoApi.checkIsInBlueWife()&&Api.gameinfoVoApi.getSexnum()==1 &&ResourceManager.hasRes(bodyPic+"_female"))
		{
			bodyPic = bodyPic+"_female";
		}
		let isbigW = false;
		let titleType = 0;
		let titlecfg = Config.TitleCfg.getTitleCfgById(""+picId);
		if(titlecfg && titlecfg.titleType){
			titleType = titlecfg.titleType;
		}

		isbigW =  Api.palaceVoApi.isKingWithBigTexture(picId);
	
	
		if(isCreateUser  ){
			// bodyPic = "user_body_full_3201_2";
			if(isMale){
				bodyPic = "chuangjue_male";
			} else {
				bodyPic = "chuangjue_female";
			}
			
			// rect.setTo(0,0,712,700);
			rect.setTo(0,0,712,700);
		}

		if(isbigW == true ){
			rect.setTo(0,0,712,668);
		}
		let myBody = BaseLoadBitmap.create(bodyPic,rect,{callback:loadComplete,callbackThisObj:this,callbackParams:[container]});
		myBody.visible=false;
		myBody.name = "myBody";
		container.addChild(myBody);
		// let rect1:egret.Rectangle= egret.Rectangle.create();
		let rect1:egret.Rectangle= new egret.Rectangle();//egret.Rectangle.create();
		rect1.setTo(0,0,136,143);
		let myHead = BaseLoadBitmap.create("user_head" + pic,rect1,{callback:loadComplete,callbackThisObj:this,callbackParams:[container]});
		myHead.visible=false;
		myHead.x = 87;
		if(isbigW == true ){
			myHead.y = 20;
		}
		// myHead.x = myBody.x + myBody.width/2 - myHead.width/2
		myHead.name = "myHead";
		container.addChild(myHead);

		if(picId >= 1000){
			myHead.x = 117;
			myHair.x = 141;
		}

		myBody.y = 91;
		if(isCreateUser  || isbigW == true ){
			myBody.x = myBody.x + 382 / 2 -  712/2 -1.5;
		}
		if(isCreateUser){
			myBody.y = 74;
		}
		// if( isbigW == true && myBody.x < 0){
		// 	let deltaX = Math.abs(myBody.x) ;
		// 	myBody.x += deltaX;
		// 	myHead.x += deltaX;
		// 	myHair.x += deltaX;
		// }
		return container;
	}

	public getMyPortrait():BaseDisplayObjectContainer
	{
		let lv = this.getPlayerLevel();
		if(this.playerVo.titleid > 0)
		{
			lv = this.playerVo.titleid
		}
		return this.getPlayerPortrait(lv,this.getPlayePicId());
	}

	public getMyNextLvPortrait():BaseDisplayObjectContainer
	{
		let lv = this.getPlayerNextLevel();
		if(this.playerVo.titleid > 0)
		{
			lv = this.playerVo.titleid
		}
		return this.getPlayerPortrait(lv,this.getPlayePicId());
	}

	public getUserHeadImgPath()
	{
		return "user_head" + this.getPlayePicId();
	}

		// 根据ID获取头像
	public getUserHeadImgPathById(pic):string
	{
		return "user_head" + pic;
	}
	public getNo():any
	{
		// this.playerVo.n
		// Api.playerVoApi.getTitleid()
	}

	public getVipHeadBg():string
	{	

    	let titleCfg = Config.TitleCfg.getTitleCfg();
		for (let k in titleCfg)
		{
			let v = titleCfg[k];
			let titleVo = Api.itemVoApi.getTitleInfoVoById(Number(k));
			if (v.isTitle==2 && titleVo.num == 2)
			{
				return "head_circle_bg_"+k;
			}
		}

		return null;
	}

	public getVipHeadID():string
	{	

    	let titleCfg = Config.TitleCfg.getTitleCfg();
		for (let k in titleCfg)
		{
			let v = titleCfg[k];
			let titleVo = Api.itemVoApi.getTitleInfoVoById(Number(k));
			if (v.isTitle==2 && titleVo.num == 2)
			{
				return k;
			}
		}

		return null;
	}

	public getVipHeadBgByTitle(title:string):string
	{	

		if(title && title!="0"){
			return "head_circle_bg_"+title;
		}
		return null;
	}

	/**
	 * 获取用户圆头象
	 * @param pic 用户头像id
	 */
	public getPlayerCircleHead(pic:number,title:string|number = "-1"):BaseDisplayObjectContainer
	{	
		let container = new BaseDisplayObjectContainer();
		let headBg = "head_circle_bg"
		if(title == "-1"){
			if (this.getVipHeadBg())
			{
				headBg = this.getVipHeadBg();
			}
		}else if((typeof title == "string")&&title.indexOf("head_circle_bg") > -1)
		{
			headBg = title;
		}
		else if (title && this.getVipHeadBgByTitle(String(title)))
		{
			headBg = this.getVipHeadBgByTitle(String(title));
		}

		let myBody:BaseLoadBitmap = BaseLoadBitmap.create(headBg);
		myBody.width = 109;
		myBody.height = 106;
		if(headBg == "head_circle_bg_4002" || headBg == "head_circle_bg_4003" || headBg == "head_circle_bg_4004" || headBg == "head_circle_bg_4008"  ){
			myBody.width = 103;
			myBody.height = 100;
		}

		myBody.name = "myBody";
		container.addChild(myBody);
		
		// 头像框动画
		if (headBg == "head_circle_bg_4111") {
			let headEffect = ComponentManager.getCustomMovieClip(`ryeharvestheadeffect1-`, 14, 70);
			// headEffect.width = 150;
			// headEffect.height = 145;
			headEffect.name = "myHeadEffect";
			headEffect.playWithTime(0);
			headEffect.x = myBody.x + myBody.width/2 - 150/2 +2;
			headEffect.y = myBody.y + myBody.height/2 - 145/2;
			let containerWidth = container.width;
			let containerHeight = container.height;
			container.addChild(headEffect);
			container.width = containerWidth;
			container.height = containerHeight;
		}else if(headBg == "head_circle_bg_4116")
		{
			let headEffect = ComponentManager.getCustomMovieClip(`ryeharvestheadeffect2-`, 10, 70);
			// headEffect.width = 150;
			// headEffect.height = 145;
			headEffect.name = "myHeadEffect";
			headEffect.playWithTime(0);
			headEffect.x = myBody.x + myBody.width/2 - 130/2 +2;
			headEffect.y = myBody.y + myBody.height/2 - 127/2;
			let containerWidth = container.width;
			let containerHeight = container.height;
			container.addChild(headEffect);
			container.width = containerWidth;
			container.height = containerHeight;
		}
		// myBody.setPosition(-17,-17)
		// if(this.getVipHeadBg()){
		// 	myBody.y = -3;
	
		// }

		// let myBody2:BaseBitmap = BaseBitmap.create("head_circle_bg2");
		// myBody2.name = "myBody2";
		// container.addChild(myBody2);
		// let rect1:egret.Rectangle=egret.Rectangle.create();
		let rect1:egret.Rectangle=new egret.Rectangle();//egret.Rectangle.create();
		rect1.setTo(0,0,136,143);
		let myHead:BaseLoadBitmap = BaseLoadBitmap.create("user_head" + pic,rect1);
		myHead.x = 13;
		myHead.y = 1;
		myHead.setScale(2/3)
		myHead.name = "myHead";
		container.addChild(myHead);
		
		return container;
	}

	/**
	 * 获取用户圆头象(包括别人的)
	 * @param pic 用户头像id
	 */
	public getUserCircleHead(pic:number,title?:string):BaseDisplayObjectContainer
	{	

		let container = new BaseDisplayObjectContainer();
		let headBg = "head_circle_bg"
		// if(title == "-1"){
		// 	if (this.getVipHeadBg())
		// 	{
		// 		headBg = this.getVipHeadBg();
		// 	}
		// }
		// else 
		if (title && this.getVipHeadBgByTitle(title)) 
		{
			headBg = this.getVipHeadBgByTitle(title);
		}
		let myBody:BaseLoadBitmap = BaseLoadBitmap.create(headBg);
		myBody.name = "myBody";
		container.addChild(myBody);
		// myBody.setPosition(-17,-17)
		// if(this.getVipHeadBg()){
		// 	myBody.y = -3;
	
		// }

		// let myBody2:BaseBitmap = BaseBitmap.create("head_circle_bg2");
		// myBody2.name = "myBody2";
		// container.addChild(myBody2);
		// let rect1:egret.Rectangle=egret.Rectangle.create();
		let rect1:egret.Rectangle=new egret.Rectangle();//egret.Rectangle.create();
		rect1.setTo(0,0,136,143);
		let myHead = BaseLoadBitmap.create("user_head" + pic,rect1);
		myHead.x = 13;
		myHead.y = 1;
		myHead.setScale(2/3)
		myHead.name = "myHead";
		container.addChild(myHead);

		return container;
	}

	public checkIsAddictionHalve():boolean
	{
		if (Api.switchVoApi.checkOpenRealnamerewards()&&Api.switchVoApi.checkProtectInDrink() && GameData.idcardType !="3" && GameData.isShowedHomeScene==true && this.playerVo.todayolt >= this.adictionTab[2])
		{
			return true;
	}
		return false;
	}

	public checkAddiction(isInit?:boolean):void
	{	
		if (Api.switchVoApi.checkOpenRealnamerewards()&&Api.switchVoApi.checkProtectInDrink() && GameData.idcardType !="3" && GameData.isShowedHomeScene==true)
		{
			if(App.DateUtil.checkIsToday(this.lastCheckTime) == false )
			{
				this.adictionWarnTimes = 0;
			}
			this.lastCheckTime = GameData.serverTime;

			let warningLevel:number = 0;
			while (this.playerVo.todayolt >= this.adictionTab[warningLevel])
			{
				warningLevel++;
			}
			if (warningLevel > this.adictionWarnTimes ||(isInit==true && warningLevel==7))
			{
				this.adictionWarnTimes = warningLevel;
				ViewController.getInstance().openView(ViewConst.POPUP.ANTIADDICTIONPOPUPVIEW,{level:warningLevel});
			}
		}
	}

	public firstCMDst()
	{
		return this.playerVo.flogincmdst || 0 ;
	}

	public addLevyGoods(rate: { grate: number, frate: number, srate: number },count:number){
		this.playerVo.gold += rate.grate*count;
		this.playerVo.food += rate.frate*count;
		this.playerVo.soldier += rate.srate*count;
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LEVY_ADD_GOODS,{
			gold:rate.grate*count,
			food:rate.frate*count,
			soldier:rate.srate*count
		});
	}
	
	//获取玩家属性根据type 1:武力；2：智力；3：政治；4:魅力
	public getPropertyByType(type:number):number
	{
		let num = 0;
		switch (type) {
			case 1:
				num = this.getAtk();
				break;
			case 2:
				num = this.getInte();
				break;
			case 3:
				num = this.getPolitics();
				break;		
			case 4:
				num = this.getCharm();
				break;				
			default:
				break;
		}
		return num;
	}

	//获取玩家小官职等级
	public getPlayerMinLevelId():number
	{
		return Number(this.playerVo.minlevelid) || 1;
	}

	//获取玩家小官职等级
	public getPlayerMinLevel():number
	{
		let minId = this.getPlayerMinLevelId();
		return Config.MinlevelCfg.getCfgByMinLevelId(minId).zlv;
	}

	//获取统计用等级
	public getSdkLevel():number
	{
		// if(Api.playerVoApi.getPlayerLevel()<0)
		// {
		// 	return 0;
		// }
		return Api.playerVoApi.getPlayerMinLevelId();
	}
	/*根据minlevelid获取玩家小官职字符串,默认获取当前官职*/
	public getPlayerMinLevelStr(minLevelId?:number|string):string
	{
		let minId = minLevelId||this.getPlayerMinLevelId();
		let minLevelCfg = Config.MinlevelCfg.getCfgByMinLevelId(minId);
		return LanguageManager.getlocal(`officialTitleWithMinLevel`,[LanguageManager.getlocal("officialTitle"+minLevelCfg.lv),minLevelCfg.lv <= -1?"":"-"+String(minLevelCfg.zlv+1)]);
	}

	public checkMaxMinLv(minLevelId?:number):boolean
	{
		minLevelId=minLevelId?minLevelId:this.getPlayerMinLevelId();
		return Config.MinlevelCfg.getMaxLevel()<=minLevelId;
	}
}