/**
 * 门客系统api
 * author dmj
 * date 2017/9/22
 * @class ServantVoApi
 */
class ServantVoApi extends BaseVoApi
{
	private servantVo:ServantVo;
	private waitShowData:any;
	private waitShowData2:any;
	public isShowAtkraceGuide = false;
	public isCheckGuide = false;
	public showSkinId = null;
	public showSkinId2 = null;
	public constructor() 
	{
		super();
	}

	public setWaitShowData(data:any)
	{
		this.waitShowData = data;
	}
	public getWaitShowData()
	{
		let data = this.waitShowData
		this.waitShowData = null;
		return data;
	}

	public setWaitShowData2(data:any)
	{
		this.waitShowData2 = data;
	}
	public getWaitShowDat2()
	{
		let data = this.waitShowData2
		this.waitShowData2 = null;
		return data;
	}

	// todo 
	public getServantCount():number
	{
		return Object.keys(this.servantVo.servantInfoVoObj).length;
	}

	public getServantInfoList():Object
	{
		return this.servantVo.servantInfoVoObj;
	}

	public getServantObj(servantId:string):any
	{
		return this.servantVo.servantInfoVoObj[servantId];
	}
	
	//返回排序后的servantInfo 列表，结构为数组
	/**
	 * 门客排序
	 * sortType  1 默认排序  2 总属性排序 3 等级排序 4 资质排序 5 总属性倒序排序
	 */
	public getServantInfoListWithSort(sortType:number):any
	{
		sortType = sortType ? sortType : 1;
		let idList = this.getServantInfoIdListWithSort(sortType);
		
		let result = [];
		for (var index = 0; index < idList.length; index++) {
			result.push(this.servantVo.servantInfoVoObj[idList[index]]);
		}
		return result;
	}
	/** 得到总属性最大的门客id */
	public getIdOfTotalMax():string {
		var maxTotal = null;
		var maxId = null;
		for(var key in this.servantVo.servantInfoVoObj) {
			if (this.servantVo.servantInfoVoObj.hasOwnProperty(key)) {
				var element = this.servantVo.servantInfoVoObj[key];
				if (!maxTotal || maxTotal < element.total || (maxTotal === element.total && parseInt(maxId) < parseInt(key))) {
					maxTotal = element.total;
					maxId = key;
				}
			}
		}
		return maxId;
	}
	/**
	 * 主线任务
	 */
	public getMainTaskNeedServant(type:number):string{
		let taskId = Api.mainTaskVoApi.getCurMainTaskId();
		if (!taskId){
			return null;
		}
		let taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
		if (taskCfg && taskCfg.questType && taskCfg.questType == type){
			let servantListObj = this.servantVo.servantInfoVoObj;
			if (type == 202){
				//至少x名门客等级达到x级 获取最接近所需等级的门客
				let lv = 0;
				let id = 0;
				for (let key in servantListObj){
					let servantLv = Number(servantListObj[key].level);
					if (servantLv < taskCfg.need){
						if (id == 0){
							id = Number(key);
							lv = servantLv;
						}
						else{
							if (servantLv > lv){
								id = Number(key);
								lv = servantLv;
							}
							else if (servantLv == lv){
								if (Number(key) > id){
									id = Number(key);
									lv = servantLv;
								}
							}
						}
					}
				}
				if (id){
					return String(id);
				}
			}
			else if (type == 205){
				let maxAttrId = this.getIdOfTotalMax();
				let baseCfg = GameConfig.config.servantbaseCfg;
				let maxLv = baseCfg.skillLvLimit;
				let skill = this.getServantObj(maxAttrId).skill;
				if (skill && skill.length > 1 && (skill[0] < maxLv || skill[1] < maxLv)){
					return maxAttrId;
				}
				return null;
			}
			else if (type == 206){
				//爵位提升
				let needClv = taskCfg.need;
				// let servantLvList = Config.ServantBaseCfg.getServantLvList();
				// let topLV = servantLvList[String(needClv-1)].upLv;
				let lv = 0;
				let id = 0;
				for (let key in servantListObj){
					if (servantListObj[key].clv < needClv){
						let servantLv = Number(servantListObj[key].level);
						if (id == 0){
							id = Number(key);
							lv = servantLv;
						}
						else{
							if (servantLv > lv){
								id = Number(key);
								lv = servantLv;
							}
							else if (servantLv == lv){
								if (Number(key) > id){
									id = Number(key);
									lv = servantLv;
								}
							}
						}
					}
				}
				if (id){
					return String(id);
				}
			}
		}
		return null;
	}

	/**获取id最靠前的门客 */
	public getServantMinId():string{
		let servantListObj = this.servantVo.servantInfoVoObj;
		let id = 0;
		for (let key in servantListObj){
			if (id == 0){
				id = Number(key);
			}
			else{
				if (Number(key) > id){
					id = Number(key);
				}
			}
		}
		return String(id);
	}

	//返回经过排序后的id
	public getServantInfoIdListWithSort(sortType:number)
	{
		//排序数据，刷新列表
		let servantListObj= this.servantVo.servantInfoVoObj
		let keys:string[] = Object.keys(servantListObj);
		//默认排序
		if (sortType == 1)
		{
			// keys.sort((a:string,b:string)=>{
			// 	return Number(a) - Number(b) ;
			// });
			if (Api.switchVoApi.checkOpenExile()) {
				keys.sort((a: string, b: string) => {
					let servantA = this.servantVo.servantInfoVoObj[a];
					let servantB = this.servantVo.servantInfoVoObj[b];
					if (servantA.banishSt && (!servantB.banishSt)) {
						return 1;
					}
					else if (servantA.banishSt && servantB.banishSt) {
						return Number(servantA.servantId) -  Number(servantB.servantId);
					}
					else if ((!servantA.banishSt) && servantB.banishSt) {
						return -1;
					}
					else if((!servantA.banishSt) && (!servantB.banishSt))
					{
						return Number(servantA.servantId) -  Number(servantB.servantId);
					}
				});
			}
			
		}
		//总属性排序
		else if (sortType == 2)
		{
			keys.sort((a:string,b:string)=>{
				let servantA = this.servantVo.servantInfoVoObj[a];
				let servantB = this.servantVo.servantInfoVoObj[b];
				if (Api.switchVoApi.checkOpenExile()) {
					
					if (servantA.banishSt && (!servantB.banishSt)) {
						return 1;
					}
					else if (servantA.banishSt && servantB.banishSt) {
						if (servantA.total == servantB.total) {
							return Number(b) - Number(a);
						} else {
							if (Number(servantB.total) == Number(servantA.total)) {
								return Number(b) - Number(a);
							}
							return Number(servantB.total) - Number(servantA.total);
						}

					}
					else if ((!servantA.banishSt) && servantB.banishSt) {
						return -1;
					}
					else if ((!servantA.banishSt) && (!servantB.banishSt)) {
						if (servantA.total == servantB.total) {
							return Number(b) - Number(a);
						} else {
							if (Number(servantB.total) == Number(servantA.total)) {
								return Number(b) - Number(a);
							}
							return Number(servantB.total) - Number(servantA.total);
						}
					}

				}
				else {
					if (servantA.total == servantB.total) {
						return Number(b) - Number(a);
					} else {
						if (Number(servantB.total) == Number(servantA.total)) {
							return Number(b) - Number(a);
						}
						return Number(servantB.total) - Number(servantA.total);
					}
				}

				// return 0;
			});
		}
		//资质排序, 第一版不做
		else if (sortType == 4)
		{
			// 
			keys.sort((a:string,b:string)=>{
				let servantA = this.servantVo.servantInfoVoObj[a];
				let servantB = this.servantVo.servantInfoVoObj[b]; 
			
				let bookAv =servantA.getTotalBookValue() ;
				let bookBv =servantB.getTotalBookValue() ; 
				// if(servantA.servantId&&servantA.skinred)
				// {
				// 	let numZ =this.getSkNum(servantA.servantId);
				// 	bookAv+=numZ;
				// }

				// if(servantB.servantId&&servantB.skinred)
				// { 
				// 	let numZ =this.getSkNum(servantB.servantId);
				// 	bookBv+=numZ;
				// } 

				if (Api.switchVoApi.checkOpenExile()) {
					if (servantA.banishSt && (!servantB.banishSt)) {
						return 1;
					}
					else if (servantA.banishSt && servantB.banishSt) {
						if (bookAv == bookBv) {
							return Number(b) - Number(a);
						} else {
							if (bookBv == bookAv) {
								return Number(b) - Number(a);
							}
							return bookBv - bookAv;
						}

					}
					else if ((!servantA.banishSt) && servantB.banishSt) {
						return -1;
					}
					else if ((!servantA.banishSt) && (!servantB.banishSt)) {
						if (bookAv == bookBv) {
							return Number(b) - Number(a);
						} else {
							if (bookBv == bookAv) {
								return Number(b) - Number(a);
							}
							return bookBv - bookAv;
						}
					}
				}
				else {
					if (bookAv == bookBv) {
						return Number(b) - Number(a);
					} else {
						if (bookBv == bookAv) {
							return Number(b) - Number(a);
						}
						return bookBv - bookAv;
					}
				}

				

				// return 0;
			});
		}
		//资质排序，无视出海
		else if (sortType == 6)
		{
			// 
			keys.sort((a:string,b:string)=>{
				let servantA = this.servantVo.servantInfoVoObj[a];
				let servantB = this.servantVo.servantInfoVoObj[b]; 
			
				let bookAv =servantA.getTotalBookValue() ;
				let bookBv =servantB.getTotalBookValue() ; 

				if (bookAv == bookBv) {
					return Number(a) - Number(b);
				} 
				else {
					if (bookBv == bookAv) {
						return Number(b) - Number(a);
					}
					return bookBv - bookAv;
				}
			});
		}
		//等级排序
		else if (sortType == 3)
		{
			keys.sort((a:string,b:string)=>{
				let servantA = this.servantVo.servantInfoVoObj[a];
				let servantB = this.servantVo.servantInfoVoObj[b];

				if(Api.switchVoApi.checkOpenExile())
				{
					if (servantA.banishSt && (!servantB.banishSt)) {
						return 1;
					}
					else if (servantA.banishSt && servantB.banishSt) {
						if (servantA.level == servantB.level) {
							return Number(b) - Number(a);
						} else {
							if (Number(servantB.level) == Number(servantA.level)) {
								return Number(b) - Number(a);
							}
							return Number(servantB.level) - Number(servantA.level);
						}
					}
					else if ((!servantA.banishSt) && servantB.banishSt) {
						return -1;
					}
					else if ((!servantA.banishSt) && (!servantB.banishSt)) {
						if (servantA.level == servantB.level) {
							return Number(b) - Number(a);
						} else {
							if (Number(servantB.level) == Number(servantA.level)) {
								return Number(b) - Number(a);
							}
							return Number(servantB.level) - Number(servantA.level);
						}
					}

				}
				else
				{
					if (servantA.level == servantB.level) {
						return Number(b) - Number(a);
					} else {
						if (Number(servantB.level) == Number(servantA.level)) {
							return Number(b) - Number(a);
						}
						return Number(servantB.level) - Number(servantA.level);
					}

				}
				
				// return 0;
			});
		}
		//	总属性倒序排序
		else if (sortType == 5)
		{
			keys.sort((a:string,b:string)=>{
				let servantA = this.servantVo.servantInfoVoObj[a];
				let servantB = this.servantVo.servantInfoVoObj[b];
				if (Api.switchVoApi.checkOpenExile()) {
					
					if (servantA.banishSt && (!servantB.banishSt)) {
						return 1;
					}
					else if (servantA.banishSt && servantB.banishSt) {
						if (servantA.total == servantB.total) {
							return Number(a) - Number(b);
						} else {
							if (Number(servantB.total) == Number(servantA.total)) {
								return Number(a) - Number(b);
							}
							return Number(servantA.total) - Number(servantB.total);
						}

					}
					else if ((!servantA.banishSt) && servantB.banishSt) {
						return -1;
					}
					else if ((!servantA.banishSt) && (!servantB.banishSt)) {
						if (servantA.total == servantB.total) {
							return Number(a) - Number(b);
						} else {
							if (Number(servantB.total) == Number(servantA.total)) {
								return Number(a) - Number(b);
							}
							return Number(servantA.total) - Number(servantB.total);
						}
					}

				}
				else {
					if (servantA.total == servantB.total) {
						return Number(a) - Number(b);
					} else {
						if (Number(servantB.total) == Number(servantA.total)) {
							return Number(a) - Number(b);
						}
						return Number(servantA.total) - Number(servantB.total);
					}
				}

				// return 0;
			});
		}
		return keys;
	}

	/**
	 * 属性排序后的id  
	 * @param sortType 1武力 2智力 ，3政治  4魅力 0总属性
	 */
	public getServantInfoIdListByProperty(sortType:number):string[]
	{
		//排序数据，刷新列表
		let servantListObj= this.servantVo.servantInfoVoObj
		let keys:string[] = Object.keys(servantListObj);

		keys.sort((a:string,b:string)=>{
				let servantA = this.servantVo.servantInfoVoObj[a];
				let servantB = this.servantVo.servantInfoVoObj[b];

				let valueA:number;
				let valueB:number;
				
				switch (sortType) 
				{
					case 1:
						valueA = servantA.attrVo.forceTotal;
						valueB = servantB.attrVo.forceTotal;
						break;
					case 2:
						valueA = servantA.attrVo.brainsTotal;
						valueB = servantB.attrVo.brainsTotal;
						break;
					case 4:
						valueA = servantA.attrVo.charmTotal;
						valueB = servantB.attrVo.charmTotal;
						break;
					case 3:
						valueA = servantA.attrVo.politicsTotal;
						valueB = servantB.attrVo.politicsTotal;
						break;
					case 0:
						valueA = servantA.total;
						valueB = servantB.total;
						break;
				}
				if (Api.switchVoApi.checkOpenExile()) {

					if (servantA.banishSt && (!servantB.banishSt)) {
						return 1;
					}
					else if (servantA.banishSt && servantB.banishSt) {
						if (valueA == valueB) {
							return Number(Number(b) - Number(a));
						} else {
							return Number(valueB - valueA);
						}

					}
					else if ((!servantA.banishSt) && servantB.banishSt) {
						return -1;
					}
					else if ((!servantA.banishSt) && (!servantB.banishSt)) {
						if (valueA == valueB) {
							return Number(Number(b) - Number(a));
						} else {
							return Number(valueB - valueA);
						}
					}

				}
				else {
					if (valueA == valueB) {
						return Number(Number(b) - Number(a));
					} else {
						return Number(valueB - valueA);
					}
				}
				
			});

		return keys;
	}

	//皮肤加成
	private getSkNum(servantId:string):number
	{ 	
		let Obj = this.getServantObj(servantId);
		var numZ =0;
		if(Obj && Obj.skin){
			for (var key in Obj.skin) {
				let skinVo = Obj.skin[key];
				numZ += skinVo.getSkinBookNum(servantId);
			}
		}
		return numZ;
	}

	public getServantProByType(servnatId:string,proType:number)
	{
		let servantA : ServantInfoVo= this.servantVo.servantInfoVoObj[servnatId];
		let valuePro:number;
		switch (proType) 
		{
			case 1:
				valuePro = servantA.attrVo.forceTotal;
				break;
			case 2:
				valuePro = servantA.attrVo.brainsTotal;
				break;
			case 4:
				valuePro = servantA.attrVo.charmTotal;
				break;
			case 3:
				valuePro = servantA.attrVo.politicsTotal;
				break;
			case 0:
				valuePro = servantA.total;
				break;
		}
		return valuePro;
	}
	/**
	 * 获取门客战斗力
	 *  门客武力资质 * 5000 * 门客等级 + 门客的武力属性
	 */
	public getServantCombatWithId(servantId:string):number
	{
		let infoVo= this.servantVo.servantInfoVoObj[servantId];
		//  Api.servantVoApi.getServantForceTotalById(servantId)
		let value:number = infoVo.attrVo.forceTotal + infoVo.level * 5000 * this.getServantForceTotalById(servantId);

		return value;
	}
	/**
	 * 获取门客战斗力
	 *  	包含神器特殊加成
	 */
	public getServantCombatWithIdContentsWeapon(servantId:string,weapontype:number):number
	{
		
		let value:number = this.getServantCombatWithId(servantId);
		let weaponvo = Api.weaponVoApi.getWeaponInfoVoByServantId(servantId);
		if (weaponvo)
		{
			 value += weaponvo.getSpecialityByType(weapontype);
		}
		return value;
	}

	/**
	 * 获取门客武力资质
	 * @param servantId 
	 */
	public getServantForceTotalById(servantId:string):number
	{
		let vo = this.servantVo.servantInfoVoObj[servantId];
		if (vo){
			return vo.getTotalBookValue(1);
		}
		let servantcfg = Config.ServantCfg.getServantItemById(servantId);
		let ability = servantcfg.ability;
		 let infoVo= this.servantVo.servantInfoVoObj[servantId];
		 let abilityCfg = GameConfig.config.abilityCfg;
		 let value = 0;
		 for (var index = 0; index < ability.length; index++) {
			 let abilityItem = abilityCfg[String(ability[index])];
			 if(abilityItem.type == 1)
			 {
				 value += abilityItem.num*infoVo.ability[index];
			 }
		 }
		let tmpValue = infoVo.getAllSkinProAdd();
		if (tmpValue && tmpValue[0]>0)
		{
			value +=tmpValue[0];
		}
		// let weaponVo = Api.weaponVoApi.getWeaponInfoVoByServantId(servantId);
		// if (weaponVo && weaponVo.attr[0])
		// {
		// 	value +=weaponVo.attr[0];
		// }

		return value
	}

	public getServantStarsNumWithId(servantId:string):number
	{
		let servantCfg = GameConfig.config.servantCfg[servantId];
        let ability = servantCfg.ability
        let starNum = 0;
        for (var index2 = 0; index2 < ability.length; index2++) {
			let tmpAcfg = GameConfig.config.abilityCfg[ability[index2]];
            starNum += tmpAcfg.num;
        }

		let Obj = this.getServantObj(servantId);
		if(Obj && Obj.skin){
			for (var key in Obj.skin) {
				let skinVo = Obj.skin[key];
				starNum += skinVo.getSkinStarNum();
			}
		}
		return starNum;
	}

	/**门客的综合资质不包含皮肤 */
	public getServantAptitude(servantId:string):number
	{
		let servantCfg = GameConfig.config.servantCfg[servantId];
        let ability = servantCfg.ability
        let starNum = 0;
        for (var index2 = 0; index2 < ability.length; index2++) {
			let tmpAcfg = GameConfig.config.abilityCfg[ability[index2]];
            starNum += tmpAcfg.num;
        }
		return starNum;
	}

	public getFullImgPathWithId(servantId):string{
		let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[servantId];
		if(servant){
			return servant.fullImgPath;
		}
		return null;
	}

	/**
	 * 门客的骨骼动画
	 */
	public getServantBoneId(servantId){
		let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[servantId];
		if(servant){
			if ("1034"==String(servantId) && PlatformManager.checkIsRuLang() == false)
			{
				return null;
			}
			return servant.servantBone;
		}
		return null;
	}


	/**
	 * 大于60级门客数量
	 */
	public getServantCountLevel60Plus():number
	{	
		let count:number = 0;
		let needLv:number = Config.AtkraceCfg.getServantLv();
		for (let key in this.servantVo.servantInfoVoObj)
		{
			let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[key];
			if (servant.level >= needLv) {
				count++;
			}
		}
		return count;
	}

	/**
	 * 大于60级尚未出海门客数量
	 */
	public getServantCountLevel60PlusNotExile():number
	{	
		let count:number = 0;
		let needLv:number = Config.AtkraceCfg.getServantLv();
		for (let key in this.servantVo.servantInfoVoObj)
		{
			let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[key];
			if (servant.level >= needLv && !servant.isServantExile()) {
				count++;
			}
		}
		return count;
	}

	public getServantCountExiled():number
	{	
		let count:number = 0;
		for (let key in this.servantVo.servantInfoVoObj)
		{
			let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[key];
			if (servant.isServantExile()) {
				count++;
			}
		}
		return count;
	}

	public getServantsExiled():string[]
	{	
		let sids:string[] = [];
		for (let key in this.servantVo.servantInfoVoObj)
		{
			let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[key];
			if (servant.isServantExile()) {
				sids.push(key);
			}
		}
		return sids;
	}


	/**
	 * 获取大于60级的门客 属性最高在上
	 */
	public getServantCountLevel60PlusList()
	{	

		let keyArr:Array<any> = [];
		let needLv:number = Config.AtkraceCfg.getServantLv();
		let arr =this.getServantInfoIdListWithSort(2);
		for (let key in arr)
		{	
			let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[arr[key]];
			if (servant.level >= needLv) {
				keyArr.push(arr[key])
			}
		}
		return keyArr;
	}

	public checkRedPoint():boolean
    {   
		if(this.isShowRedForItem())
			return true;
			
        for (let key in this.servantVo.servantInfoVoObj)
		{
			let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[key];
			if (servant.isShowRedInServantList()) {
				return true;
			}
		}
		if (Api.switchVoApi.checkOpenOfficialCareer() && Api.switchVoApi.checkOpenQingYuanHuiJuan() && Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv()){
			if (Api.encounterVoApi.isShowNpc()){
				return true;
			}
		}
		if (Api.servantExileVoApi.getExileBuffRed())
		{
			return true;
		}
        return false;
    }

	public isShowRedForItem()
	{
		let attItem = GameConfig.config.servantbaseCfg.attItem;
		for (var index = 0; index < attItem.length; index++) {
			let id = attItem[index];
			let itemVO = Api.itemVoApi.getItemInfoVoById(id);
			if(itemVO && itemVO.num > 0)
			{
				return true;
			}
		}

		return false;
	}

	public isOwnServantDailyBoss()
	{
		if (this.getServantObj("1051")) {
			return true ;
		}
		return false;
	}

	public getDecreePolicyAddAttrInfo(){
		return Api.promoteVoApi.getDecreePolicyAddAttrInfo("servant",0);
	}

	public getAllServantSkinAbilityAdd()
	{
		let result = [0,0,0,0];
		for (let key in this.servantVo.servantInfoVoObj)
		{
			let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[key];
			let tmpValue = servant.getAllSkinProAdd();
			result[0] += tmpValue[0];
			result[1] += tmpValue[1];
			result[2] += tmpValue[2];
			result[3] += tmpValue[3];
		}
		return result;
	}

	public getAllServantSkinNums()
	{
		let result = 0;
		for (let key in this.servantVo.servantInfoVoObj)
		{
			let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[key];
			result += servant.getSkinNums();
		}
		return result;
	}

	public getAllServantSkinList()
	{
		let resultList = [];
		for (let key in this.servantVo.servantInfoVoObj)
		{
			let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[key];
			resultList = resultList.concat( servant.getAllSkinList());
		}
		return resultList;
	}
	
	public getServantSkinLV(skinId:string):number
	{
		let servantId = Config.ServantskinCfg.getServantSkinItemById(""+skinId).servantId;
		let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[servantId];
        if(servant )
        {
            return servant.getSkinLv(skinId) ;
        }
        return null;
	}
	public getSerSkinBookId(skinId:string,bookId:string)
	{
		let servantId = Config.ServantskinCfg.getServantSkinItemById(""+skinId).servantId;
		let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[servantId];
        if(servant )
        {
            return servant.getSkinBookLv(skinId,bookId) ;
        }
        return 1;
	}

	public getSerSkinBookId2(skinId:string,bookId:string)
	{
		let servantId = Config.ServantskinCfg.getServantSkinItemById(""+skinId).servantId;
		let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[servantId];
        if(servant )
        {
            return servant.getSkinBookLv2(bookId) ;
        }
        return 0;
	}

	public getSkinOneRed(servantId:string,_skinId:string)
	{
		let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[servantId];
        if(servant && servant.skinred && servant.skinred[_skinId])
        {
            return servant.skinred[_skinId] ;
        }
		return false;
	}
	public isShowSkinRedForEnter(servantId:string,)
	{
		let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[servantId];
        if(servant && servant.skinred )
        {
			for (var key in servant.skinred) {
				if (servant.skinred.hasOwnProperty(key)) {
					if(servant.skinred[key] == 1){
						return true;
					}
				}
			}
        }
		return false;
	}

	public isShowAuralevelUpRedForEnter(servantId:string)
	{
		if(Api.switchVoApi.checkOpenExile())
		{
			if(Api.servantExileVoApi.getServantExileInfoForServantId(servantId))
			{
				return false;
			}
		}
		if (!Api.switchVoApi.checkOpenServantSkinAura())
		{
			return false;
		}


		let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[servantId];
		let skinList = servant.getOwnSkinIdList();
		if(skinList && skinList.length){
			for(let i in skinList){
				let unit = Config.ServantskinCfg.getServantSkinItemById(skinList[i]);
				for(let j in unit.aura){
					let skinvo : ServantSkinVo = servant.getSkinInfobyId(skinList[i]);
					let level = skinvo.getSkinAuraLv(Number(j) - 1);
					let temp = unit.aura[j];
					let havenum = Api.itemVoApi.getItemNumInfoVoById(temp.growNeed);
					if(havenum >= temp.growNumNeed[level]){
						return true;
					}
				}
			}
		}
		return false;
	}

	public isShowAuralevelUpRed(servantId:string,skinId:string)
	{
		if(Api.switchVoApi.checkOpenExile())
		{
			if(Api.servantExileVoApi.getServantExileInfoForServantId(servantId))
			{
				return false;
			}
		}
		if (!Api.switchVoApi.checkOpenServantSkinAura())
		{
			return false;
		}

		let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[servantId];
		let unit = Config.ServantskinCfg.getServantSkinItemById(skinId);
		if (unit)
		{
			for(let j in unit.aura){
				let skinvo : ServantSkinVo = servant.getSkinInfobyId(skinId);
				if (skinvo)
				{
					let level = skinvo.getSkinAuraLv(Number(j) - 1);
					let temp = unit.aura[j];
					let havenum = Api.itemVoApi.getItemNumInfoVoById(temp.growNeed);
					if(havenum >= temp.growNumNeed[level]){
						return true;
					}
				}
			}
		}
		return false;
	}

	/**
	 * 检测是否又这个皮肤
	 */
	public isOwnSkinOfSkinId(skinId:string)
	{
		let cfg = Config.ServantskinCfg.getServantSkinItemById(""+skinId);
		if(!cfg || !cfg.servantId){
			return false;
		}
		let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[cfg.servantId];
        if(!servant || !servant.skin || !servant.skin[skinId] )
        {
            return false;
        }
		return true;
	}
	//获取指定门客穿戴的皮肤id
	public getservantSkinIdInWear(servantId:string)
	{
		let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[servantId];
        if(!servant || !servant.equip || servant.equip == "")
        {
			return null;
        }
		return servant.equip;
	}
	public isServantSkinInWear(skinId:string)
	{
		let skcfg =  Config.ServantskinCfg.getServantSkinItemById(""+skinId);
		if(!skcfg){
			return false;
		}
		let servantId = skcfg.servantId;
		let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[servantId];
        if(!servant || !servant.equip || servant.equip != skinId )
        {
			return false;
        }
		return true;
	}
	/**
	 * 通过皮肤来找门客信息
	 */
	public getHaveServantForSerVantSkinId(skinId:string)
	{
		let skcfg =  Config.ServantskinCfg.getServantSkinItemById(skinId);
		let servanInfo = this.getServantObj(skcfg.servantId);
		return servanInfo;
	}

	/**
	 * 第四级光环需要4位门客的3级光环全部满级
	 */
	public checkAura4CanLevelUp(servantId:string):boolean
	{
		let lv4Aura = 4;
		let servantNum = 0;
		// let needLv = 0
		let lv3MaxLv = 0;
		let serIdList = [];
		let haveSerNum = 0;
		let cfg = Config.ServantCfg.servantListCfg;
		let servantCfg = Config.ServantCfg.getServantItemById(servantId);
		let lastAuraIcon = servantCfg.aura[lv4Aura-1].auraIcon;
		for (const key in cfg) {
			if (cfg.hasOwnProperty(key)) {
				const element:Config.ServantItemCfg = cfg[key];
				if(element.aura && element.aura[String(lv4Aura-1)] && element.aura[String(lv4Aura-1)].auraIcon == lastAuraIcon){
					servantNum += 1;
					// needLv += element.aura[2].maxLv;
					lv3MaxLv = element.aura[String(lv4Aura-1)].maxLv;
					serIdList.push(element.id);
				}	
			}
		}

		for (let i = 0; i < serIdList.length; i++) {
			const serId = serIdList[i];
			let serObj:ServantInfoVo = this.getServantObj(serId);
			if(serObj && serObj.aura[String(lv4Aura-1)] && serObj.aura[String(lv4Aura-1)] == lv3MaxLv){
				haveSerNum += 1;
			}else{
				return false;
			}
		}

		if(haveSerNum == servantNum){
			return true;
		}
		return false;
	}

	/**
	 * 第四级光环需要开启3光环,并且至少有一位3级光环满级
	 */
	public checkAura4CanShow(servantId:string):boolean
	{
		let lv4Aura = 4;

		let serIdList = [];
		let cfg = Config.ServantCfg.servantListCfg;
		let servantCfg = Config.ServantCfg.getServantItemById(servantId);
		let lastAuraIcon = servantCfg.aura[lv4Aura-1].auraIcon;
		let lv3MaxLv = servantCfg.aura[lv4Aura-1].maxLv;

		for (const key in cfg) {
			if (cfg.hasOwnProperty(key)) {
				const element:Config.ServantItemCfg = cfg[key];
				if(element.aura && element.aura[String(lv4Aura-1)] && element.aura[String(lv4Aura-1)].auraIcon == lastAuraIcon){
					serIdList.push(element.id);
				}	
			}
		}

		for (let i = 0; i < serIdList.length; i++) {
			const serId = serIdList[i];
			let serObj:ServantInfoVo = this.getServantObj(serId);
			if(serObj && serObj.aura[String(lv4Aura-1)] && serObj.aura[String(lv4Aura-1)] == lv3MaxLv){
				return true;
			}
		}
		return false;
	}
	/**
	 * 门客角标特效
	 */
	public getCornerMarkerContainer(q:number):BaseDisplayObjectContainer
	{	
		let container = new BaseDisplayObjectContainer();
		let cornerImg = BaseLoadBitmap.create("servanticon_corner"+q);
		cornerImg.width = 52;
		cornerImg.height = 52;
		container.addChild(cornerImg);

		if (q>=3)
		{
			let fameCount = 12;
	
			let cornerEffect = ComponentManager.getCustomMovieClip('servant_rankeffect'+q+'_',fameCount);
			cornerEffect.setPosition(cornerImg.x - 24, cornerImg.y - 24);
			cornerEffect.blendMode = egret.BlendMode.ADD;
			container.addChild(cornerEffect);
			cornerEffect.playWithTime(0);
		}

		return container;
	}

	//门客出海 总资质 总属性
	public getServantExiledAttr():number[]
	{	
		let attr:number[] = [0,0];
		for (let key in this.servantVo.servantInfoVoObj)
		{
			let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[key];
			if (servant.isServantExile()) {
				attr[0]+=servant.getTotalBookValue();
				attr[1]+=servant.total;
			}
		}
		return attr;
	}

	//门客出海buff string
	public getExileBuffStrings():string[]
	{
		let strings:string[] = [];
		let values:number[] = this.getExileBuff();
		let v2 = Math.floor(values[0]* 10+0.5)/10;
        let v3 = Math.floor(values[1]* 1000+0.5)/10;
		let str1 = LanguageManager.getlocal("exileBuff2_fleet_add1",[String(v2)]);
		let str2 = LanguageManager.getlocal("exileBuff2_fleet_add2",[String(v3)]);
		strings.push(str1);
		strings.push(str2);
		return strings;		
	}

	public getBuffBookValueCount(bv:number):number
	{	
		let v = 0;
		let allSids = this.getServantsExiled();
		for (let i = 0; i<allSids.length; i++)
		{
			let oneid = allSids[i];
			let servantObj = Api.servantVoApi.getServantObj(oneid);
			if (servantObj.getTotalBookValue() >= bv)
			{
				v++;
			}
		}
		return v;
	}

	public getExileBuff():number[]
	{	
		let buffAtk:number = 0;
		let buffCrit:number = 0;
		let cfg = Config.ExileCfg.buff2;
		for (let k in cfg)
		{
			let onebuff = cfg[k];
			let needv = onebuff["1"].needAbility;
			let servantCount = this.getBuffBookValueCount(needv);

			let oneValue1 = 0;
			let oneValue2 = 0;
			for (let j in onebuff)
			{
				let threebuff = onebuff[j];
				if (servantCount >= threebuff.servantNum)
				{	
					if (threebuff.atkAdd1)
					{
						oneValue1 =  threebuff.atkAdd1;
					}
					if (threebuff.atkAdd2)
					{
						oneValue2 =  threebuff.atkAdd2;
					}
					
				}
				else 
				{
					break;
				}
			}
			buffAtk += oneValue1;
			buffCrit += oneValue2;
		}
		return [buffAtk,buffCrit];
	}

	public getBaseBuffListById(k:number):any[]
	{
		let v = [];
		let cfg = Config.ExileCfg.buff2;
		let onebuff = cfg[k];
		for (let j in onebuff)
		{
			let threebuff = onebuff[j];
			v.push(threebuff);
		}
		return v;
	}

	public getBaseBuffList():any[]
	{	
		let v = [];
		let cfg = Config.ExileCfg.buff2;
		for (let k in cfg)
		{
			let onebuff = cfg[k];
			let needv = onebuff["1"].needAbility;
			let servantCount = this.getBuffBookValueCount(needv);
			let oneValue1 = 0;
			let oneValue2 = 0;
			let level = 0;
			let onetype = onebuff["1"].atkAdd1>0 ?  1:2;
			if ( onebuff["1"].atkAdd1>0  && onebuff["1"].atkAdd2>0 )
			{
				onetype = 3;
			}
			for (let j in onebuff)
			{
				let threebuff = onebuff[j];
				if (servantCount >= threebuff.servantNum)
				{	
					if (threebuff.atkAdd1)
					{
						oneValue1 =  threebuff.atkAdd1;
					}
					if (threebuff.atkAdd2)
					{
						oneValue2 =  threebuff.atkAdd2;
					}
					level = Number(j);
				}
				else 
				{
					break;
				}
			}
			let onev = {id:k, needv: needv, lv :level , type : onetype, v1:oneValue1, v2 : oneValue2, maxLv : Object.keys(onebuff).length, sc:servantCount}
			v.push(onev);
		}
		return v;
	}

	//单个门客出海buff string
	public getOneExileBuffStrings(sid?):any[]
	{
		let strings = [];
		let attr:number[] = [0,0];
		
		if (sid && this.servantVo.servantInfoVoObj[sid])
		{
			let oneVo = this.servantVo.servantInfoVoObj[sid];
			attr = [oneVo.getTotalBookValue(),oneVo.total];
		}
		 

		let cfg = Config.ExileCfg.buff1;

		for (let i=0; i<1; i++)
		{
			let onecfg = cfg[i];
			let value1 = onecfg.atkBase + attr[0] * 100 * onecfg.atkRatio;
			// let value2 = onecfg.hpBase + attr[1] * 100 * onecfg.hpRatio;
			// let name = LanguageManager.getlocal("exileBuff_type"+onecfg.playType);
			let str0  = LanguageManager.getlocal("exileBuff_choose_itemtitle",[name]);
			let str1 = LanguageManager.getlocal("exileBuff_fleet_addAll",[String(value1)]);
			// let str2 = LanguageManager.getlocal("exileBuff_fleet_add2",[name,String(value2)]);

			strings.push([str0,str1]);
		}

		return strings;
	}

	public getAvoidNum():number{
		
		let list = this.getServantInfoListWithSort(0);
		let servantId:any;
		let count = 0;
		for (let i = 0; i < list.length; i++){
			servantId = list[i].servantId;
			if (Api.servantVoApi.getServantObj(servantId) && Api.servantVoApi.getServantObj(list[i].servantId).avoid == 2){
				count ++;
			}
		}
		return count;
	}
	
	public dispose():void
	{
		this.isShowAtkraceGuide = false;
		this.isCheckGuide = false;
		this.waitShowData = null;
		this.waitShowData2 = null;
		this.showSkinId= null;
		this.showSkinId2 = null;
		super.dispose();
	}
}