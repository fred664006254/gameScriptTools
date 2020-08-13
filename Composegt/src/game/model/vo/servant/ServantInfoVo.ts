/**
 * 门客vo
 * author dmj
 * date 2017/9/22
 * @class ServantInfoVo
 */
class ServantInfoVo  extends BaseVo
{
	// 等级
	public level:number = 0;
	// 已升级经验
	public hasexp:number = 0;
	// 总属性
	public total:number = 0;
	// 属性vo
	public attrVo:ServantAttrVo;
	// ID
	public servantId:string = "";

	public skillExp:number = 0; 
	public clv:number = 0; 
	public ability:{}; 
	public skill=[];
	public abilityExp:number = 0;
	/**
	 * 特殊门客的光环信息
	 */
	public aura:{} = 0; 
	/**
	 * 门客皮肤
	 */
	public equip:string = "";
	public skin:ServantSkinVo[] = [];
	public skinred:any = undefined;
	//{{1,0,0},{1,0,0},{1,0,0},{1,0,0}}装备品阶 装备等级 装备经验(经验是当前等级的经验进度)
	private equipment:number[][] = [];
	public combination = {};
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data.lv != null)
			{
				this.level = Number(data.lv);
			}
			if(data.hasexp != null)
			{
				this.hasexp = Number(data.hasexp);
			}
			if(data.total != null)
			{
				let curTotal = this.total;
				this.total = Number(data.total);
				// if(curTotal!=0 && this.total - curTotal >0){
				// 	let dis = this.total - curTotal;
				// 	let pos = egret.Point.create(320,GameConfig.stageHeigth/2);
				// 	// App.CommonUtil.playRewardFlyAction([{tipMessage:LanguageManager.getlocal("rankpower")+"+"+dis}],pos);
				// 	let powerFly = new PowerFly();
				// 	powerFly.init(dis);
					
				// 	LayerManager.msgLayer.addChild(powerFly);	
				// }
			}
			if(this.attrVo == null)
			{
				this.attrVo = new ServantAttrVo();
			}

			if(data.skillExp != null)
			{
				this.skillExp = data.skillExp;
			}
			if(data.clv != null)
			{
				this.clv = data.clv;
			}
			if(data.ability != null)
			{
				this.ability = data.ability;
			}
			if(data.skill != null)
			{
				this.skill = data.skill;
			}
			if(data.abilityExp != null)
			{
				this.abilityExp = data.abilityExp;
			}
			if(data.aura != null)
			{
				this.aura = data.aura;
			}
			
			this.attrVo.initData(data);

			if(data.equip != null)
			{
				this.equip = data.equip;
			}
			if(data.skin != null)
			{
				for (let key in data.skin) {
					let skinvo = this.skin[key];
					if(!skinvo){
						skinvo = new ServantSkinVo();
						this.skin[key] = skinvo;
					}
					skinvo.skinid = key;
					skinvo.initData(data.skin[key]);
				}
			}
			if(data.skinred != null)
			{
				this.skinred = data.skinred;
			}
			if(data.equipment){
				this.equipment = data.equipment;
			}
			if(data.combination){
				this.combination = data.combination;
			}
		}
	}

	/**
	 * 根据装备id和位置获取装备数据
	 * @param equipid 品质
	 * @param idx 索引位置,0品质,1等级,2当前等级的经验
	 */
	public getEquipInfoByQuality(equipid:number,idx:0|1|2):number
	{
		let tmpkey=Number(equipid)-1;
		if(this.equipment)
		{
			return this.equipment[tmpkey][idx];
		}
		else
		{
			return (idx==0?1:0);
		}
	}

	//获取头像资源
	public get halfImgPath():string{
		if(!this.equip || this.equip == ""){
			return "servant_half_" + this.servantId;
		}
		let skincfg = Config.ServantskinCfg.getServantSkinItemById(this.equip);
		return skincfg.icon;
	}
	//获取全身像资源
	public get fullImgPath():string{
		if(!this.equip || this.equip == ""){
			return "servant_full_" + this.servantId;
		}
		let skincfg = Config.ServantskinCfg.getServantSkinItemById(this.equip);
		return skincfg.body;
	}

	public get servantBone():string
	{
		// if(!this.equip || this.equip == ""){
			return "servant_full2_"+ this.servantId;
		// }
	}
	// //获取名字资源
	// public get nameImgPath():string{
	// 	return "name_" + this.servantId;
	// }
	//获取品质框资源
	public get qualityBoxImgPath():string{
		return "servant_cardbg_" + this.clv;
	}
	public get qualityBg():string{
		return "servant_qualityBg_" + this.clv;
	}
	
	//获取门客名字
	public get servantName():string
	{
		return LanguageManager.getlocal("servant_name"+this.servantId);
	}
	//获取声音
	public get sound():string{
		if(Api.switchVoApi.checkOpenNewSound()){
			let arr = [`effect_servant_${this.servantId}`, `effect_servant_${this.servantId}_2`];
			return  arr[App.MathUtil.getRandom(0,arr.length)];
		}
		else{
			return `effect_servant_${this.servantId}`;
		}
	}
	public isAtMaxLv()
	{
		let servantLvList = GameConfig.config.servantbaseCfg.servantLvList;
		let topLV = servantLvList[String(this.clv)].upLv
		if(this.level == topLV  && !  servantLvList[String(this.clv+1)])
		{
			return true;
		}
		return false;
	}

	public isAtTopLv()
	{
		let servantLvList = GameConfig.config.servantbaseCfg.servantLvList;
		let topLV = servantLvList[String(this.clv)].upLv
		if(this.level >= topLV )
		{
			return true;
		}
		return false;
	}
	public isLvEnableForAdvance()
	{
		let servantLvList = GameConfig.config.servantbaseCfg.servantLvList;
		let topLV = servantLvList[String(this.clv)].upLv
		if(this.level >= topLV && servantLvList[String(this.clv+1)])
		{
			return true;
		}
		return false;
	}
	public isAdvanceEnable()
	{
		let servantLvList = GameConfig.config.servantbaseCfg.servantLvList;
		let topLV = servantLvList[String(this.clv)].upLv
		
		if(this.level >= topLV && servantLvList[String(this.clv+1)])
		{
			let needItem = servantLvList[String(this.clv+1)].needItem;
			for (var key in needItem) {
				let ownNum = Api.itemVoApi.getItemNumInfoVoById(Number(key));
				if(ownNum < needItem[key])
					return false;
			}
			//判断道具
			return true;
		}
		return false;
	}
	/**
	 * 技能是否可升级
	 */
	public isSkillLvUpEnable()
	{
		let baseCfg = GameConfig.config.servantbaseCfg
		if(!baseCfg)
		{	
			return false;
		}
		let skillUpgradeExp:number[] = baseCfg.skillUpgradeExp; 
		let maxLv =  baseCfg.skillLvLimit;
		// baseCfg.servantLvList[String(this.clv)].upLv
		if(!skillUpgradeExp)
		{	
			return false;
		}
		for (var index = 0; index < this.skill.length; index++) {
			let skillLv = this.skill[index];
			if(skillLv < maxLv && this.skillExp >= skillUpgradeExp[skillLv-1])
			{
				return true;
			}
		}
		return false;
	}
	/**
	 * 红颜技能是否可升级，可以则返回aid
	 */
	public isBookLvUpEnable()
	{
		let abilitybaseCfg = GameConfig.config.abilitybaseCfg
        let typeList = abilitybaseCfg.typeList ;
        let numList = abilitybaseCfg.numList ;
		let idxList = {};
		let servantCfg = GameConfig.config.servantCfg[this.servantId];
		let tmpability = servantCfg.ability;
		// let ability = servantCfg.ability
		let ability = this.getAbilityIdList();
		let curClvCfg = GameConfig.config.servantbaseCfg.servantLvList[String(this.clv)];
		for (var index2 = 0; index2 < ability.length; index2++) {
			let aid = ability[index2];
			let tmpAcfg = GameConfig.config.abilityCfg[aid];
            let aLv:number = 1;
			//  this.ability[String(index2)];
			let abilityExp = numList[String(tmpAcfg.num)].abilityExp ;
			let oriidx = tmpability.indexOf(aid) ;
			if( oriidx> -1){
				aLv = this.ability[String(oriidx)];
			}else{
				aLv = this.getSkinBookLv2(aid);
			}

			if (aLv < curClvCfg.abilityLv)
        	{
				let ownNum1 = Api.itemVoApi.getItemNumInfoVoById(typeList[tmpAcfg.type]);
				let ownNum2 = Api.itemVoApi.getItemNumInfoVoById("159" + tmpAcfg.num);
				if(abilityExp<= this.abilityExp || ownNum1 >= 1 || ownNum2 >= 1)
				{
					idxList[String(index2)] = index2;
				}
			}
        }

		if(Object.keys(idxList).length > 0)
		{
			return idxList;
		}else
		{
			return false;
		}
	}
	
	public isBookLvUpEnableById(bookid:string)
	{
		let servantCfg = GameConfig.config.servantCfg[this.servantId];
		let ability = servantCfg.ability
		for (var index2 = 0; index2 < ability.length; index2++) {
			let aid = ability[index2];
			if(aid == bookid){
				let abilitybaseCfg = GameConfig.config.abilitybaseCfg
				let typeList = abilitybaseCfg.typeList ;
				let numList = abilitybaseCfg.numList ;
				let tmpAcfg = GameConfig.config.abilityCfg[aid];
				let aLv:number = this.ability[ aid ];
				let curClvCfg = GameConfig.config.servantbaseCfg.servantLvList[String(this.clv)];
				let abilityExp = numList[String(tmpAcfg.num)].abilityExp ;

				if (aLv < curClvCfg.abilityLv)
				{
					let ownNum1 = Api.itemVoApi.getItemNumInfoVoById(typeList[tmpAcfg.type]);
					if(abilityExp<= this.abilityExp || ownNum1 >= 1)
					{
						return true;
					}
				}
			}
        }
		return false;
	}
	/**
	 * 是否在门客列表中显示红点
	 */
	public isShowRedInServantList()
	{
		if(Api.servantVoApi.isShowRedForItem() || this.isAdvanceEnable() || this.isSkillLvUpEnable() || this.isBookLvUpEnable() || this.isShowRedForaura() || this.isShowRedForAmuletAura() || Api.servantVoApi.checkHaveBuffActive(this.servantId))
		{
			return true;
		}
		return false;
	}

	public getTotalBookValue(type?)
	{
		let servantCfg = GameConfig.config.servantCfg[this.servantId];
		let ability = servantCfg.ability
        let totalBookV = 0;
		for (var index2 = 0; index2 < ability.length; index2++) {
			let aid = ability[index2];
			let tmpAcfg = GameConfig.config.abilityCfg[aid];
			if(type){
				if(tmpAcfg.type == type){
					let aLv:number = this.ability[String(index2)];
					let txtIdx = index2*2 
					totalBookV += aLv * tmpAcfg.num;
				}
			}
			else{
				let aLv:number = this.ability[String(index2)];
            	let txtIdx = index2*2 
				totalBookV += aLv * tmpAcfg.num;
			}
        }
		//皮肤的书籍加成
		for (var key in this.skin) {
			if (this.skin.hasOwnProperty(key)) {
				totalBookV += this.skin[key].getSkinBookValue();
				
			}
		}
		return totalBookV;
	}
	
	public isShowRedForaura()
	{
		let servantCfg = GameConfig.config.servantCfg[this.servantId]; 
		let saura = this.getAllSkinAuraList();
		if(servantCfg.aura)
		{
			let keysList = Object.keys(servantCfg.aura);
			for (let index = 1; index < keysList.length; index++) {
				let auraId = keysList[index];
				let cfg  = servantCfg.aura[auraId];

				if(Number(auraId) >= 3 ){
					let aura3Data = servantCfg.aura[auraId];
					let curLv = this.aura[auraId];
					if(curLv == null){
						curLv = aura3Data.maxLv;
					}
					
					let lvUpDemand = aura3Data.lvUpDemand;
					if(lvUpDemand ){ //有前置条件
						if( aura3Data.maxLv <= curLv){
							if(aura3Data.breakSwitch && Api.switchVoApi.checkCommonSwitch(aura3Data.breakSwitch)){
								if(curLv >= aura3Data.breakMaxlv){
									return false;

								} else {
									let bLvUpDemandList = aura3Data.breaklvUpDemand;
									let unLock = true;
									let needV = "1";
									if(bLvUpDemandList && bLvUpDemandList.length >0){
										for(let i = 0; i < bLvUpDemandList.length; i ++){
											let bLvUpDemand = bLvUpDemandList[i];
											let bLvUpDemandData = bLvUpDemand.split("_");
											if(bLvUpDemandData.length > 0){
												let serObj = <ServantInfoVo>Api.servantVoApi.getServantObj(bLvUpDemandData[0]);
												if(!serObj){
													unLock = false;
													break;
												}
												let servantcfg = Config.ServantCfg.getServantItemById(bLvUpDemandData[0]);
												let auraList = servantcfg.aura || [];
												let skin_auraList = serObj.getAllSkinAuraList();
												let auraVV = 1;
												if(auraList[bLvUpDemandData[1]]){
													auraVV = serObj.aura[bLvUpDemandData[1]];
												} else if(skin_auraList[bLvUpDemandData[1]]){
													auraVV = serObj.getSkinAuraLevel(bLvUpDemandData[1]);
												}
												auraVV = auraVV?auraVV:0;
												needV = bLvUpDemandData[2]
												if(auraVV < Number(bLvUpDemandData[2])){
													unLock = false;
													break;
												}
											}
										}
									} 
									if(!unLock){
										return false;
									} else {
										let breakGrowNeedList = aura3Data.breakGrowNeed;
							
										let itemList:RewardItemVo[] = GameData.formatRewardItem(breakGrowNeedList[curLv - 10]);
								
										let item:RewardItemVo = itemList[0];
										// for (var index = 0; index < itemList.length; index++) {
											// let item:RewardItemVo = itemList[index];
										let ownNum = Api.itemVoApi.getItemNumInfoVoById(item.id);
										
										if (ownNum < item.num )
										{
											return false;
										}else
										{
											return true;
										}
									}

								}



							} else {
								return false;
							}		
						}
						for (let index = 0; index < lvUpDemand.length; index++) {
							let element = lvUpDemand[index];
							let elementInfo =  element.split("_");
							let preAura = keysList[elementInfo[0]];// 
							let growNeed2 = aura3Data.growNeed2;
							let resTab = App.StringUtil.splitString(growNeed2,"_");
							if(this.aura[elementInfo[0]] < elementInfo[1] || Api.itemVoApi.getItemNumInfoVoById(resTab[1]) < Number(resTab[2]) ){
								return false;
							}
						}
						return true;
					}else{ //兼容老版本
						if(aura3Data  && Api.switchVoApi.checkOpenNewAura(aura3Data.auraIcon )  ){
							if(aura3Data.maxLv > curLv){
								let growNeed2 = aura3Data.growNeed2;
								let resTab = App.StringUtil.splitString(growNeed2,"_");
								if(Api.itemVoApi.getItemNumInfoVoById(resTab[1]) >= Number(resTab[2]) )
								{
									return true;
								}
							}
						}
					}
					return false;

				}else
				{
					if(cfg.maxLv > this.aura[auraId])
					{
						let growNeed2 = cfg.growNeed2;
						let resTab = App.StringUtil.splitString(growNeed2,"_");
						if(Api.itemVoApi.getItemNumInfoVoById(resTab[1]) >= Number(resTab[2]) )
						{
							return true;
						}
					} else {
						if(cfg.breakSwitch && Api.switchVoApi.checkCommonSwitch(cfg.breakSwitch)){
							if(cfg.breakMaxlv > this.aura[auraId]){
								let breakGrowNeedList = cfg.breakGrowNeed;
					
								let itemList:RewardItemVo[] = GameData.formatRewardItem(breakGrowNeedList[this.aura[auraId] - 10]);
						
								let item:RewardItemVo = itemList[0];
								// for (var index = 0; index < itemList.length; index++) {
									// let item:RewardItemVo = itemList[index];
								let ownNum = Api.itemVoApi.getItemNumInfoVoById(item.id);
								
								if (ownNum < item.num )
								{
									
								}else
								{
									return true;
								}
							}
						}	
					}
				}
			}
		}
		let keysList2 = Object.keys(saura);
		if( keysList2.length > 0 ){
			for (let index = 0; index < keysList2.length; index++) {
				let auraId = keysList2[index];
				let aurr = auraId.split("_");
				let cfg  = Config.ServantskinCfg.getServantSkinItemById(aurr[0]).aura[auraId];// servantCfg.aura[auraId];
				{
					let arlv = this.getSkinAuraLevel(auraId);
					if(cfg.maxLv > arlv)
					{
						let growNeed2 = cfg.growNeed2;
						let resTab = App.StringUtil.splitString(growNeed2,"_");
						if(Api.itemVoApi.getItemNumInfoVoById(resTab[1]) >= Number(resTab[2]) )
						{
							return true;
						}
					}
				}
			}

		}
		return false;
	}

	public getSkinLv(skinid:string)
	{
		let skinVo:ServantSkinVo = this.skin[skinid];
		if(skinVo)
		{
			return skinVo.slv;
		}
	}
	public getSkinBookLv(skinid:string,bid:string)
	{
		let skinVo:ServantSkinVo = this.skin[skinid];
		if(skinVo)
		{
			return skinVo.getbookLv(bid);
		}
		return 1;
	}

	public getSkinBookLv2(bid:string)
	{
		for (var key in this.skin) {
			if (this.skin.hasOwnProperty(key)) {
				let skinVo:ServantSkinVo = this.skin[key];
				if(skinVo){
					return skinVo.getbookLv(bid);
				}
			}
		}
		return 0;
	}
	/**
	 * 获取所有皮肤增加的资质信息
	 */
	public getAllSkinProAdd():number[]
	{
		let result = [0,0,0,0];
		for (let key in this.skin) {
			let perSkin = this.getSkinProAdd(key);
			result[0] += perSkin[0];
			result[1] += perSkin[1];
			result[2] += perSkin[2];
			result[3] += perSkin[3];
		}
		return result;
	}

	/**
	 * 获取指定皮肤增加的资质信息
	 */
	public getSkinProAdd(skinId:string):number[]
	{
		let result = [0,0,0,0];
		let skinVo = this.skin[skinId];
		if (skinVo) {
			let ability = skinVo.ability;
			for (var key2 in ability) {
				let bookcfg = GameConfig.config.abilityCfg[key2];
				let type = bookcfg.type;
				let num = bookcfg.num;
				let alv = ability[key2]["alv"];
				result[type-1] += alv * num;
			}
		}
		return result;
	}

	public getSkinNums()
	{
		return Object.keys(this.skin).length ;
	}

	public getOwnSkinIdList()
	{
		return Object.keys(this.skin);
	}
	public getSkinInfobyId(sid:string)
	{
		return this.skin[sid];
	}
	public getAllSkinList()
	{
		let list = [];
		for (var key in this.skin) {
			list.push(this.skin[key]);
		}
		return list;
	}

	public getEquipedSkinBidList()
	{
		if(!this.equip || this.equip == "" || !this.skin[this.equip]){
			return [];
		}
		let bvo =  this.skin[this.equip];
		return bvo.getbookIdList();
	}

	public getAllSkinBidList()
	{
		let list = [];
		for (var key in this.skin) {
			if (this.skin.hasOwnProperty(key)) {
				let bvo =  this.skin[key];
				if(bvo){
					list = list.concat(bvo.getbookIdList());
				}
			}
		}
		return list;
	}

	public getSkinAuraLevel(aid:string|string)
	{
		for (var key in this.skin) {
			if (this.skin.hasOwnProperty(key)) {
				let bvo =  this.skin[key];
				if(bvo && bvo.aura && bvo.aura[""+aid]){
					return bvo.aura[""+aid];
				}
			}
		}
		return 1; //默认1级
	}

	public getAllSkinAuraList()
	{
		let list = {};
		for (var key in this.skin) {
			if (this.skin.hasOwnProperty(key)) {
				let bvo =  this.skin[key];
				if(bvo){
					let aidList = bvo.getSkinAuraIdList();
					for (let key2 in aidList) {
						if (aidList.hasOwnProperty(key2)) {
							// var element = aidList[key2];
							list[key2] = aidList[key2]
							// list.push(element)
						}
					}
				}
			}
		}
		return list;
	}

	public getAbilityIdList()
	{
		let servantCfg = GameConfig.config.servantCfg[this.servantId];
		let ability = servantCfg.ability;
		let skidList = this.getAllSkinBidList();
		ability = ability.concat(skidList);
		ability.sort((dataA:string,dataB:string)=>{
			let tmpAcfgA = GameConfig.config.abilityCfg[dataA];
			let tmpAcfgB = GameConfig.config.abilityCfg[dataB];
			if(tmpAcfgA.type == tmpAcfgB.type){
				if(tmpAcfgB.num == tmpAcfgA.num){
					return Number(dataA) - Number(dataB) ;
				}
				return tmpAcfgB.num - tmpAcfgA.num
			}
			return tmpAcfgA.type - tmpAcfgB.type;
		});
		return ability;
	}

	public getAmuletAuraList(){
		let list = {};
		for (var key in this.skin) {
			if (this.skin.hasOwnProperty(key)) {
				let bvo =  this.skin[key];
				if(bvo){
					let amuletAura = bvo.amuletAura;
					for (let key2 in amuletAura) {
						if (amuletAura.hasOwnProperty(key2)) {
							list[key2] = amuletAura[key2]
						}
					}
				}
			}
		}
		return list;
	}

	public isShowRedForAmuletAura()
	{
		for (var key in this.skin) {
			if (this.skin.hasOwnProperty(key)) {
				let bvo =  this.skin[key];
				if(bvo){
					let amuletAura = bvo.amuletAura;
					for (let key2 in amuletAura) {
						if (amuletAura.hasOwnProperty(key2)) {
							let lv = amuletAura[key2];
							let amuBasecfg = Config.AmuletaruaCfg.getAmuletAuraItemById(key2); 
							let lvcfg = amuBasecfg.attrLvList[lv];
							if(lvcfg && lvcfg.update <= Api.amuletVoApi.getAmuletNum(this.servantId,key2))
							{
								return true;
							}
						}
					}
				}
			}
		}
		return false;
	}

	/**
	 * 门客攻击力
	 * 总资质*(lv+100) * 羁绊
	 **/
	public get AttackNum(): number {
		return Math.round(this.getTotalBookValue() * (this.level + 100) * (1 + Api.servantVoApi.getActiveBuffValue(this.servantId, 1)));
	}

	/**
	 * 门客血量
	 * 总属性 * 羁绊
	 */
	public get HPNum(): number {
		return Math.round(this.total * (1 + Api.servantVoApi.getActiveBuffValue(this.servantId, 2)));
	}

	/**
	 * 已激活经营技能
	 */
	public get activeSkillLevy(): Config.SkillLevyCfgItem {
		let _skill = Config.ServantCfg.getSkillLevyByServantId(this.servantId);
		if (!_skill) return null;
		if (_skill.unlockLevel <= this.level) {
			return _skill;
		} else {
			return null;
		}
	}
	
	public dispose():void
	{
		this.level = 0;
		this.hasexp = 0;
		this.total = 0;
		this.skillExp = 0; 
		this.clv = 0; 
		this.ability={}; 
		this.skill=[];
		this.abilityExp = 0;
		this.aura = {};
		this.equip = null;
		this.skin = null;
		this.skinred = null;
		if(this.attrVo)
		{
			this.attrVo.dispose();
			this.attrVo = null;
		}
	}
}