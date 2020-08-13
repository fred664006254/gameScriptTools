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
	// 资质todo，第一版不升级，等级默认为1
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
	public skin: Object= {};//ServantSkinVo[]
	public skinred:any = undefined;
	/**出海时间 */
	public banishSt:any = null;
	//免战状态
	public avoid:number = 0;
	//门客名望
	public fame:number = 0;
	public fameLv:number = 0;

	public abilityArr:number[] = null;

	public constructor() 
	{
		super();
	}

	private banishEnd():void
	{
		App.MessageHelper.dispatchNetMessage("servantbanish");
	}

	public initData(data:any):void
	{
		if(data)
		{	
			if (data.banishEt)
			{	
				TimerManager.remove(this.banishEnd,this);
				if (data.banishEt>GameData.serverTime && (data.banishEt-GameData.serverTime)<86400)
				{
					TimerManager.doTimer((data.banishEt-GameData.serverTime)*1000,1,this.banishEnd,this);
				}
			}

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
			this.banishSt = null;
			if(data.banishSt != null)
			{
				if ((data.banishSt + Config.ExileCfg.exileTime * 86400) > GameData.serverTime) {
					this.banishSt = data.banishSt;
				}
			}
			if(data.avoid != null)
			{
				this.avoid = data.avoid;
			}else {
				this.avoid = 0;
			}
			if(data.fame != null)
			{
				this.fame = Number(data.fame);
			}
			if(data.fameLv != null)
			{
				this.fameLv = Number(data.fameLv);
			}
			if(data.abilityArr != null)
			{
				this.abilityArr = data.abilityArr;
			}
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
	//获取缩小版全身像资源
	public get cellImgPath():string{
		if(!this.equip || this.equip == ""){
			return "servant_cell_" + this.servantId;
		}
		let skincfg = Config.ServantskinCfg.getServantSkinItemById(this.equip);
		return skincfg.cell;
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
	//获取品质框资源
	public get qualityBoxImgPathNew():string{
		return "itembg_" + this.clv;
	}

	//获取新版品质框资源
	public get qualityCardBg():string{
		return "servanticonbg_" + this.clv;
	}

	//获取新版等级背景
	public get levelBg():string{
		return "servanticon_lvbg_"+this.clv;
	}

	//获取新版装饰背景
	public get cardDecorateBg():string{
		return "servanticonbg_decorate_"+this.clv;
	}

	//获取门客名字
	public get servantName():string
	{
		return LanguageManager.getlocal("servant_name"+this.servantId);
	}


	//获取声音
	public get sound():string{
		if(Api.switchVoApi.checkOpenNewSound()){
			if(this.equip && this.equip != ``){
				let skinCfg = Config.ServantskinCfg.getServantSkinItemById(this.equip);
				return skinCfg.sound;
			}
			else{
				let arr = [`effect_servant_${this.servantId}`, `effect_servant_${this.servantId}_2`];
				return  arr[App.MathUtil.getRandom(0,arr.length)];
			}
		}
		else{
			return `effect_servant_${this.servantId}`;
		}
	}

	public get sound2():string{
		if(Api.switchVoApi.checkOpenNewSound()){
			if(this.equip && this.equip != ``){
				let skinCfg = Config.ServantskinCfg.getServantSkinItemById(this.equip);
				return skinCfg.sound2;
			}
			else{
				return `effect_servant_${this.servantId}`;
			}
		}
		else{
			return `effect_servant_${this.servantId}`;
		}
	}

	public isAtMaxLv()
	{
		let servantLvList = Config.ServantBaseCfg.getServantLvList();
		let topLV = servantLvList[String(this.clv)].upLv
		if(this.level == topLV  && !  servantLvList[String(this.clv+1)])
		{
			return true;
		}
		return false;
	}

	public isAtTopLv()
	{
		let servantLvList = Config.ServantBaseCfg.getServantLvList();
		let topLV = servantLvList[String(this.clv)].upLv
		if(this.level >= topLV )
		{
			return true;
		}
		return false;
	}
	public isLvEnableForAdvance()
	{
		let servantLvList = Config.ServantBaseCfg.getServantLvList();
		let topLV = servantLvList[String(this.clv)].upLv
		if(this.level >= topLV && servantLvList[String(this.clv+1)])
		{
			return true;
		}
		return false;
	}
	public isAdvanceEnable()
	{
		if(this.isServantExile())
		{
			return false;
		}
		let servantLvList = Config.ServantBaseCfg.getServantLvList();
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
		if(this.isServantExile())
		{
			return false;
		}
		let baseCfg = GameConfig.config.servantbaseCfg
		let skillUpgradeExp:number[] = baseCfg.skillUpgradeExp; 
		let maxLv =  baseCfg.skillLvLimit;
		// baseCfg.servantLvList[String(this.clv)].upLv
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
		if(this.isServantExile())
		{
			return false;
		}
		let abilitybaseCfg = GameConfig.config.abilitybaseCfg
        let typeList = abilitybaseCfg.typeList ;
        let numList = abilitybaseCfg.numList ;
		let idxList = {};
		let servantCfg = GameConfig.config.servantCfg[this.servantId];
		let tmpability = servantCfg.ability;
		// let ability = servantCfg.ability
		let ability = this.getAbilityIdList();
		let curClvCfg = Config.ServantBaseCfg.getServantLvList()[String(this.clv)];
		for (var index2 = 0; index2 < ability.length; index2++) {
			let aid = ability[index2];
			let tmpAcfg = GameConfig.config.abilityCfg[aid];
            let aLv:number = 1;
			//  this.ability[String(index2)];
			let abilityExp = numList[String(tmpAcfg.num)].abilityExp ;
			let needItem:string = numList[String(tmpAcfg.num)].needItem;
			let oriidx = tmpability.indexOf(aid) ;
			if( oriidx> -1){
				aLv = this.ability[String(oriidx)];
			}else{
				aLv = this.getSkinBookLv2(aid);
			}

			if (aLv < curClvCfg.abilityLv)
        	{
				let ownNum1 = Api.itemVoApi.getItemNumInfoVoById(typeList[tmpAcfg.type]);
				let ownNum2 = Api.itemVoApi.getItemNumInfoVoById(needItem);
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
		if(this.isServantExile())
		{
			return false;
		}
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
				let curClvCfg = Config.ServantBaseCfg.getServantLvList()[String(this.clv)];
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
	 * 获取该书籍还可以升多少级
	 * @param bookid 
	 */
	public getBookCanLevelUpNum(bookid:string):number
	{
		let servantcfg = GameConfig.config.servantCfg[this.servantId];
		
		let curClvCfg = Config.ServantBaseCfg.getServantLvList()[String(this.clv)];
		let extraLevelMax = 0;
		let dataList = Config.StudyatkCfg.getStudyatkList();
        let studylevel = Api.studyatkVoApi.getStudySkillInfoLv();
        for(let i in dataList){
            let unit = dataList[i];
			if(Number(i) <= studylevel && Number(unit.ability) == Number(bookid)){
                extraLevelMax += unit.upLv;
            }
            if(studylevel < Number(i)){
                break;
            }
		}
		let maxLv:number = curClvCfg.abilityLv + extraLevelMax;
		if (this.clv > Config.ServantBaseCfg.commonMaxClv())
        {
            maxLv =  this.level + extraLevelMax;
		}
		let bookextraLevelMax2 = 0;
        if(Api.switchVoApi.checkOpenWifeBattle()){
            let dataList = Config.WifebattleCfg.getWifeStudyCfgList();
            let statusNum = Api.wifestatusVoApi.getStatusWifeNum();
            let itemHaveNum = Api.itemVoApi.getItemNumInfoVoById(Config.WifebattleCfg.costItem);;//
            let curLv = Api.wifebattleVoApi.wifebattleVo.info.ylinfo?Api.wifebattleVoApi.wifebattleVo.info.ylinfo.lv:0;
            for(let i in dataList){
                let unit = dataList[i];
                let needStatusNum = unit.unlock;
                if(statusNum >= needStatusNum && curLv >= (Number(unit.id) + 1)){
                    if(Number(bookid) == Number(unit.abilityID) && Number(bookid) == Number(unit.servantID)){
                        bookextraLevelMax2 += 1;
                    }
                }
            }   
            maxLv += bookextraLevelMax2;
        }
		let ability = servantcfg.ability;
		let alv = 0;
		for (var index2 = 0; index2 < ability.length; index2++) {
			let aid = ability[index2];
			if(aid == bookid){
				alv = this.ability[ index2 ];
			}
        }

		return maxLv-alv;
	}

	/**
	 * 是否在门客列表中显示红点
	 */
	public isShowRedInServantList()
	{
		if(this.isServantExile())
		{
			return false;
		}
		if(//Api.servantVoApi.isShowAuralevelUpRedForEnter(this.servantId) ||
		 Api.servantVoApi.isShowRedForItem() || 
		 this.isAdvanceEnable() || this.isSkillLvUpEnable() || 
		 this.isBookLvUpEnable() || this.checkWeaponReddot()|| 
		 Api.servantVoApi.isShowSkinRedForEnter(this.servantId) || this.isShowRedForaura())//
		{
			return true;
		}
		return false;
	}

	public checkWeaponReddot():boolean
	{	
		let weaponvo = Api.weaponVoApi.getWeaponInfoVoByServantId(this.servantId);
		if (weaponvo)
		{
			return weaponvo.checkCanMakeUp();
		}
		return false;
	}

	public getTotalAttrValye(type:number):number
	{
		if (type == 1)
		{
			return this.attrVo.forceTotal;
		}
		if (type == 2)
		{
			return this.attrVo.brainsTotal;
		}
		if (type == 3)
		{
			return this.attrVo.politicsTotal;
		}
		return this.attrVo.charmTotal;
	}

	public getTotalBookValue(type?)
	{	
		if (this.abilityArr)
		{
			if (type)
			{
				return this.abilityArr[type-1];
			}
			else
			{
				let v = 0;
				for (var i = 0; i < this.abilityArr.length; i++) 
				{
					v+=this.abilityArr[i];
				}
				return v;
			}
		}


		let servantCfg = GameConfig.config.servantCfg[this.servantId];
		let ability = servantCfg.ability
		// let ability = this.getAbilityIdList();
        let totalBookV = 0;
		for (var index2 = 0; index2 < ability.length; index2++) {
			let aid = ability[index2];
			let tmpAcfg = GameConfig.config.abilityCfg[aid];
			if(type){
				if(tmpAcfg.type == type){
					let aLv:number = this.ability[String(index2)];
					totalBookV += aLv * tmpAcfg.num;
				}
			}
			else{
				let aLv:number = this.ability[String(index2)];
				totalBookV += aLv * tmpAcfg.num;
			}
		}

		let skidList = this.getAllSkinBidList();
		for (let i:number = 0; i < skidList.length; i++) {
			let aid = skidList[i];
			let tmpAcfg = GameConfig.config.abilityCfg[aid];
			if(type){
				if(tmpAcfg.type == type){
					let aLv:number = this.getSkinBookLv2(aid);
					if (aLv){
						totalBookV += aLv * tmpAcfg.num;
					}
				}
			}
			else{
				let aLv:number = this.getSkinBookLv2(aid);
				if (aLv){
					totalBookV += aLv * tmpAcfg.num;
				}
			}
        }

		return totalBookV;
	}



	public getAllBookValue():number
	{
		let servantCfg = GameConfig.config.servantCfg[this.servantId];
		let ability = servantCfg.ability
        let totalBookV = 0;
		for (var index2 = 0; index2 < ability.length; index2++) {
			let aid = ability[index2];
			let tmpAcfg = GameConfig.config.abilityCfg[aid];
			let aLv:number = this.ability[String(index2)];
			totalBookV += aLv * tmpAcfg.num;
        }
		let skidList = this.getAllSkinBidList();
		for (let i:number = 0; i < skidList.length; i++) {
			let aid = skidList[i];
			let tmpAcfg = GameConfig.config.abilityCfg[aid];
			let aLv:number = this.getSkinBookLv2(aid);
			if (aLv)
			{
				totalBookV += aLv * tmpAcfg.num;
			}
        }

		return totalBookV;
	}

	
	public isShowRedForaura()
	{
		if(this.isServantExile())
		{
			return false;
		}
		if(!Api.switchVoApi.checkOpenServantSkinAura())
		{
			if(this.checkRedSkinOpenAura())
			{
				return true;
			}
			return false;
		}
		let servantCfg = GameConfig.config.servantCfg[this.servantId]; 
		if(servantCfg.aura )
		{
			let keysList = Object.keys(servantCfg.aura);
			for (var index = 1; index < keysList.length; index++) {
				let auraId = keysList[index];
				let cfg  = servantCfg.aura[auraId];
				if(auraId == "3"){
					let aura3Data = servantCfg.aura[auraId];
					let isAura1LvMax:boolean = (this.aura['1'] || 0) >= servantCfg.aura['1'].maxLv;
					let isAura2LvMax:boolean = (this.aura['2'] || 0) >= servantCfg.aura['2'].maxLv;
					let isAura3CanUp:boolean = isAura1LvMax && isAura2LvMax;
					if(aura3Data  && Api.switchVoApi.checkOpenNewAura(aura3Data.auraIcon)  && isAura3CanUp){
						let curLv = this.aura[auraId];
						if(!curLv){
							curLv = 0;
						}
						if(aura3Data.maxLv > curLv){
							let growNeed2 = aura3Data.growNeed2;
							let resTab = App.StringUtil.splitString(growNeed2,"_");
							if(Api.itemVoApi.getItemNumInfoVoById(resTab[1]) >= Number(resTab[2]) )
							{
								return true;
							}
						}
					}
				}else if(auraId == "4"){
					let aura4Data = servantCfg.aura[auraId];
					if(aura4Data  && (Api.switchVoApi.checkOpenNewAura(aura4Data.auraIcon) || Number(this.servantId)>2018 ||  Number(this.servantId)<2001) && Api.servantVoApi.checkAura4CanLevelUp(this.servantId) ){
						let curLv = this.aura[auraId];
						if(!curLv){
							curLv = 0;
						}
						if(aura4Data.maxLv > curLv){
							let growNeed2 = aura4Data.growNeed2;
							let resTab = App.StringUtil.splitString(growNeed2,"_");
							if(Api.itemVoApi.getItemNumInfoVoById(resTab[1]) >= Number(resTab[2]) )
							{
								return true;
							}
						}
					}
				}
				else
				{
					if(cfg.maxLv > this.aura[auraId])
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
			// return false;
		}

		if(this.checkRedSkinOpenAura())
		{
			return true;
		}
		return false;
	}

	private checkRedSkinOpenAura():boolean
	{
		let servantcfg = Config.ServantCfg.getServantItemById(this.servantId);
		if(servantcfg.isOpenAuraBySkin())
		{
            let skinList:string[] = Config.ServantskinCfg.getIdListBySerVantId(this.servantId);
            for(let i = 0; i < skinList.length; i++)
            {
                if(Api.servantVoApi.isOwnSkinOfSkinId(skinList[i]))
                {
                    let servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(skinList[i]);
                    if(servantSkinCfg.specialAura)
                    {
                        let servantskinAuraCfg = servantSkinCfg.specialAuraCfg;
						let servant:ServantInfoVo = Api.servantVoApi.getServantObj(this.servantId);
						let skinvo : ServantSkinVo = servant.skin[Number(servantSkinCfg.id)];
						let auarV = 0;
						if (skinvo)
						{
							auarV = skinvo.specialAura;
						}
						if(!auarV)
						{
							auarV = 1;
						}		
						if(auarV < servantskinAuraCfg.specialAuraLvMax)
						{
							let ownNum = Api.itemVoApi.getItemNumInfoVoById(servantskinAuraCfg.specialAuraLvNeed);
							let need = servantskinAuraCfg.specialAuraLvNeedNum[auarV-1];
							if(ownNum >= need)
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
		let level = 0;
		for (var key in this.skin) {
			if (this.skin.hasOwnProperty(key)) {
				let skinVo:ServantSkinVo = this.skin[key];
				if(skinVo && skinVo.getbookLv(bid) > 0){
					level =  skinVo.getbookLv(bid);
				}
			}
		}
		return level;
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

	public getskinBookLv(skinId:string,bookLv:string)
	{
		let skinVo = this.skin[skinId];
		if (skinVo) {
			return skinVo.getbookLv(bookLv);
		}
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

	public isSkinAbility(bid:string):boolean
	{
		if (GameData.isInArray(bid,this.getAllSkinBidList()))
		{
			return true;
		}
		return false;
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
	/**门客是否出海中 */
	public isServantExile()
	{
		if(Api.switchVoApi.checkOpenExile())
		{
			if(this.banishSt&&(this.banishSt + Config.ExileCfg.exileTime * 86400) > GameData.serverTime)
			{
				return true;
			}
		}
		return false;
	}

	public get book0():number{
		return this.getTotalBookValue(0);
	}
	public get book1():number{
		return this.getTotalBookValue(0);
	}
	public get book2():number{
		return this.getTotalBookValue(0);
	}
	public get book3():number{
		return this.getTotalBookValue(0);
	}
	public get book4():number{
		return this.getTotalBookValue(0);
	}

	public getTotalByWeaponSpecial(s:number):number
	{	
		let v = this.total;
		let weaponvo = Api.weaponVoApi.getWeaponInfoVoByServantId(this.servantId);
		if (weaponvo)
		{
			v+= weaponvo.getSpecialityByType(s);
		}
		return v;
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
		this.abilityArr = null;
		if(this.attrVo)
		{
			this.attrVo.dispose();
			this.attrVo = null;
		}
		TimerManager.remove(this.banishEnd,this);
	}
}
