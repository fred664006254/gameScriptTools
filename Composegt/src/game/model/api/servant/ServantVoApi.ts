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
	public isShowAtkraceGuide = false;
	public isCheckGuide = false;
	public equipParams : {[key:string] : number}= {};
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

	// todo 
	public getServantCount():number
	{
		return Object.keys(this.servantVo.servantInfoVoObj).length;
	}

	public getServantInfoList():Object
	{
		return this.servantVo.servantInfoVoObj;
	}

	public getServantObj(servantId:string): ServantInfoVo
	{
		return this.servantVo.servantInfoVoObj[servantId];
	}

	//返回排序后的servantInfo 列表，结构为数组
	public getServantInfoListWithSort(sortType:number): ServantInfoVo[]
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
	//返回经过排序后的id
	public getServantInfoIdListWithSort(sortType:number)
	{
		//排序数据，刷新列表
		let servantListObj= this.servantVo.servantInfoVoObj
		let keys:any[] = Object.keys(servantListObj);
		//默认排序
		if (sortType == 1)
		{
			// keys.sort((a:string,b:string)=>{
			// 	return Number(a) - Number(b) ;
			// });
		}
		//总属性排序
		if (sortType == 2)
		{
			keys.sort((a:string,b:string)=>{
				let servantA = this.servantVo.servantInfoVoObj[a];
				let servantB = this.servantVo.servantInfoVoObj[b];
				if (servantA.total == servantB.total)
				{
					return Number(b) - Number(a)  ;
				}else
				{
					if(Number(servantB.total) ==  Number(servantA.total))
					{
						return Number(b) - Number(a)  ;
					}
					return Number(servantB.total) -  Number(servantA.total) ;
				}
				// return 0;
			});
		}
		//资质排序, 第一版不做
		if (sortType == 4)
		{
			// 
			keys.sort((a:string,b:string)=>{
				let servantA = this.servantVo.servantInfoVoObj[a];
				let servantB = this.servantVo.servantInfoVoObj[b];
				let bookAv =servantA.getTotalBookValue() ;
				let bookBv =servantB.getTotalBookValue() ;
				if ( bookAv ==  bookBv )
				{
					return Number(b) - Number(a)  ;
				}else
				{
					if(bookBv  == bookAv )
					{
						return Number(b) - Number(a)  ;
					}
					return bookBv  -bookAv   ;
				}
				// return 0;
			});
		}
		//等级排序
		if (sortType == 3)
		{
			keys.sort((a:string,b:string)=>{
				let servantA = this.servantVo.servantInfoVoObj[a];
				let servantB = this.servantVo.servantInfoVoObj[b];
				if (servantA.level == servantB.level)
				{
					return Number(b) - Number(a)  ;
				}else
				{
					if(Number(servantB.level) ==  Number(servantA.level) )
					{
						return Number(b) - Number(a)  ;
					}
					return Number(servantB.level) -  Number(servantA.level) ;
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

				if (valueA == valueB)
				{
					return Number(Number(b) - Number(a)) ;
				}else
				{
					return Number(valueB - valueA);
				}
			});

		return keys;
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
		let value:number = infoVo.attrVo.forceTotal + infoVo.level * 5000 * this.getServantForceTotalById(servantId);

		return value;
	}
	/**
	 * 获取门客武力资质
	 * @param servantId 
	 */
	public getServantForceTotalById(servantId:string):number
	{
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

	public getFullImgPathWithId(servantId):string{
		let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[servantId];
		if(servant){
			return servant.fullImgPath;
		}
		return "servant_full_" + servantId;
	}
		/**
	 * 检测是否有有骨骼
	 */
	public isHaveBone(boneName:string):boolean
	{
		if(!PlatformManager.checkIsKRNewSp()){
			let krBones = {
				"servant_full2_1050_ske":1,
			}
			if(krBones[boneName]){
				return false;
			}
		}
		return true;
	}
	/**
	 * 门客的骨骼动画
	 */
	public getServantBoneId(servantId){
		let servant:ServantInfoVo = this.servantVo.servantInfoVoObj[servantId];
		if(servant){
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
        return false;
    }

	public isShowRedForItem(sid?:string)
	{
		let isContinueCheckItem=false;
		if(sid)
		{
			let itemList = Config.ServantequiplCfg.getEquipItemsIdList();
			for (const key in itemList) 
			{
				if (Object.prototype.hasOwnProperty.call(itemList, key)) 
				{
					const id = Number(itemList[key]);
					if(!this.checkEquipMaxQualityAndLv(sid,id))
					{
						isContinueCheckItem=true;
						break;
					}
				}
			}
		}
		else
		{
			isContinueCheckItem=true;
		}
		if(isContinueCheckItem)
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

	// public getDecreePolicyAddAttrInfo(){
	// 	return Api.promoteVoApi.getDecreePolicyAddAttrInfo("servant",0);
	// }

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
	 * 检测奖励是否包含门客，且发生门客转换
	 * cfgRewards://原本应该获取的奖励
	 * realRewards:实际获得的奖励，如果发生了转换，则和cfgRewards不一致，否则一致
	 * isHideRewardWin: 是否隐藏兑换后的获得奖励面板
	 */
	public checkServantChangeRewards(cfgRewards:string,realRewards:string,otherrewards?:string,isHideRewardWin?:boolean)
	{
		if(!cfgRewards || cfgRewards == realRewards)
		{
			if(!isHideRewardWin){
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":realRewards,"otherRewards":otherrewards,"isPlayAni":true});
			}

			return;
		}
		let rewardItemvo:RewardItemVo[] = GameData.formatRewardItem(cfgRewards);
		for (var index = 0; index < rewardItemvo.length; index++) {
			var element = rewardItemvo[index];
			if(element.type == 8){
				let sercfg = Config.ServantCfg.getServantItemById(element.id);
				if(sercfg.exchange){
					ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD,{"name":sercfg.name,"touch":sercfg.exchange,"message":"changeOtherRewardTip","callback":()=>{
						if(!isHideRewardWin){
							ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":realRewards,"otherRewards":otherrewards,"isPlayAni":true});
						}
					},"handler":this});
					break;
				}
			}
			if(element.type == 19){
				let sercfg = Config.ServantskinCfg.getServantSkinItemById(""+element.id);
				if(sercfg.exchange){
					ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD,{"name":sercfg.getSkinName(),"touch":sercfg.exchange,"message":"changeOtherRewardTip","callback":()=>{
						if(!isHideRewardWin){
							ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":realRewards,"otherRewards":otherrewards,"isPlayAni":true});
						}
					},"handler":this});
					break;
				}
			}
		}
	}

	/**
	 * 返回对应特长的门客信息列表
	 * 1：武力 2：智力 3：政治 4：魅力 5：均衡 6：全能
	 */
	public getServantInfoListBySpeciality(specialityId:number): ServantInfoVo[]
	{
		let servantListObj= this.servantVo.servantInfoVoObj;
		let servantInfoList: ServantInfoVo[] = [];
		if(specialityId >= 5){
			servantInfoList = this.getServantInfoListWithSort(1);
		}else{
			for (const key in servantListObj) {
				if (servantListObj.hasOwnProperty(key)) {
					const servantId = servantListObj[key].servantId;
					const servantCfg = Config.ServantCfg.getServantItemById(servantId);
					const servantSp = servantCfg.speciality;
					if(servantSp.indexOf(specialityId) != -1 ||servantSp.indexOf(5) != -1 ||servantSp.indexOf(6) != -1){
						servantInfoList.push(servantListObj[key]);
					}
				}
			}
		}

		return servantInfoList;
	}
	//1234武智政魅
	public getEquipAddAttr(idx : number, quality : number, lv : number):number{
		let num = Config.ServantequiplCfg.getEquipAddvalue(idx,quality,lv,true);
		return num;
	}

	////{{1,0,0},{1,0,0},{1,0,0},{1,0,0}}装备品阶 装备等级 装备经验
	public getEquipQuality(sid : string, equipid : number):number{
		let num = 1;
		let obj = <ServantInfoVo>this.getServantObj(sid);
		if(obj)
		{
			num=obj.getEquipInfoByQuality(equipid,0);
		}
		return num;
	}

	public getEquipAddLv(sid : string, equipid : number):number{
		let num = 0;
		let obj = <ServantInfoVo>this.getServantObj(sid);
		if(obj)
		{
			num=obj.getEquipInfoByQuality(equipid,1);
		}
		return num;
	}

	public checkEquipMaxLv(sid : string, equipid : number):boolean
	{
		let quality=this.getEquipQuality(sid,equipid);
		let clv=this.getEquipAddLv(sid,equipid);
		let maxLv = Config.ServantequiplCfg.getEquipQualityMaxLv(quality)
		return clv>=maxLv;
	}

	public checkEquipMaxQuality(sid : string, equipid : number):boolean
	{
		let quality=this.getEquipQuality(sid,equipid);
		return quality>=Config.ServantequiplCfg.getMaxQuality();
	}

	public getEquipCurExp(sid : string, equipid : number):number{
		let num = 0;
		let obj = <ServantInfoVo>this.getServantObj(sid);
		if(obj)
		{
			num=obj.getEquipInfoByQuality(equipid,2);
		}
		return num;
	}

	/**
	 * 获取当前状态到下一品阶需要总的经验值
	 * @param sid 
	 * @param equipid 
	 */
	public getNextQualityCostExp(sid : string, equipid : number):number
	{
		let clv = this.getEquipAddLv(sid,equipid);
		let exp = this.getEquipCurExp(sid,equipid);
		let quality = this.getEquipQuality(sid,equipid);
		return Config.ServantequiplCfg.getNextQualityCostExp(quality,clv,exp);
	}

	

	public getServantActiveJiban(sid : string):{active : number, total : number}{
		return {
			active : this.getActiveBuffNums(sid),
			total : Config.ServentcombinationCfg.getCombineNums(sid)
		}
	}

	public getServantActiveBufflv(sid :  string, id : number):number{
		let num = 0;
		let obj = this.getServantObj(sid);
		if(obj && obj.combination && obj.combination[sid+id]){
			let cfg = Config.ServentcombinationCfg.getCombineInfoById(sid, id);
			let minLv=999;
			for(let i = 0; i < cfg.combinationDetail.length; ++ i){
				let sid = cfg.combinationDetail[i];
				let obj = this.getServantObj(sid);
				let sValue=obj.getTotalBookValue();
				let abilityNum=cfg.getMaxLv();
				let cMinLv=-1;
				ab:for (let index = 0; index < abilityNum; index++) {
					const needNum = cfg.needAbility[index];
					if(sValue>=needNum)
					{
						cMinLv=index;
					}
					else
					{
						break ab;
					}
					
				}
				minLv=Math.min(minLv,cMinLv);
				// if(!obj || obj.getTotalBookValue() < cfg.needAbility[curActiveLv]){
				// 	bool = false;
				// 	break;
				// }
			}
			num = Math.max(minLv+1,obj.combination[sid+id]);
		}
		return num;
	}

	public isBuffActive(sid :  string, id : number):boolean{
		let bool = this.getServantActiveBufflv(sid,id)>0;
		// let curActiveLv = this.getServantActiveBufflv(sid, id);
		// let cfg = Config.ServentcombinationCfg.getCombineInfoById(sid, id);
		// for(let i = 0; i < cfg.combinationDetail.length; ++ i){
		// 	let sid = cfg.combinationDetail[i];
		// 	let obj = this.getServantObj(sid);
		// 	if(!obj || obj.level < cfg.needAbility[curActiveLv]){
		// 		bool = false;
		// 		break;
		// 	}
		// }
		return bool;
	}

	public checkHaveBuffActive(sid : string):boolean{
		let bool = false;
		let nums = Config.ServentcombinationCfg.getCombineNums(sid);
		for(let i = 1; i <= nums; ++ i){
			if(this.canBuffActive(sid, i)){
				return true;
			}
		}
		return false;
	}

	public canBuffActive(sid :  string, id : number):boolean{
		let bool = true;
		if(this.isBuffActive(sid,id))
		{
			return false;
		}
		let curActiveLv = this.getServantActiveBufflv(sid, id);
		let cfg = Config.ServentcombinationCfg.getCombineInfoById(sid, id);
		for(let i = 0; i < cfg.combinationDetail.length; ++ i){
			let sid = cfg.combinationDetail[i];
			let obj = this.getServantObj(sid);
			if(!obj || obj.getTotalBookValue() < cfg.needAbility[curActiveLv]){
				bool = false;
				break;
			}
		}
		return bool;
	}

	public getActiveBuffNums(sid : string) : number{
		let num = 0;
		let nums = Config.ServentcombinationCfg.getCombineNums(sid);
		for(let i = 1; i <= nums; ++ i){
			if(this.isBuffActive(sid, i)){
				++ num;
			}
		}
		return num;
	}

	public getActiveBuffInfos(servantId: string): {buff: Config.ServantCombinationItemCfg, lv: number}[] {
		let rsl = [];
		let n = Config.ServentcombinationCfg.getCombineNums(servantId);
		for (let i=0;i<n;i++) {
			const _bid = i+1;
			if (!this.isBuffActive(servantId, _bid)) continue;
			let _buff = Config.ServentcombinationCfg.getCombineInfoById(servantId, _bid);
			rsl.push({
				buff: _buff,
				lv: this.getServantActiveBufflv(servantId, _bid)
			})
		}

		return rsl;
	}
	/**
	 * @param servantId sid
	 * @param type 加成属性类型  1.擂台中增加攻击 2擂台中增加血量
	 */
	public getActiveBuffValue(servantId: string, type: number): number {
		let _act = this.getActiveBuffInfos(servantId);
		let rsl: number = 0;
		_act.forEach(v => {
			if (v.buff.attributeType == type) {
				rsl += v.buff.getAddValueByLv(v.lv);
			}
		})

		return rsl;
	}

	public getServantSkillLv(sid:string, skillid:string):number{
		let num = 0;
		if(Number(skillid) == 1 || Number(skillid) == 0){
			let skill = Api.servantVoApi.getServantObj(sid).skill;
			num = skill[skillid];
		}
		else{
			num = 1;
		}
		return num;
	}

	// /**
	//  * 获取门客已激活的经营技能
	//  */
	// public getActiveSkillLevyById(servantId: string): Config.SkillLevyCfgItem {
	// 	let _skill = Config.SkilllevyCfg.getSkillLevyByServantId(servantId);
	// 	if (!_skill) return null;
	// 	let _servant = this.getServantObj(servantId);
	// 	if (_skill.unlockLevel <= _servant.level) {
	// 		return _skill;
	// 	} else {
	// 		return null;
	// 	}
	// }

	
	/**
	 * 获取当前装备升级到指定等级需要的经验
	 * @param sid 门客
	 * @param equipId 装备ID
	 * @param equipQuality 装备品质
	 * @param toLv 目标等级，不传的话默认是下一级
	 */
	public getLvupNeedEquipExp(sid : string, equipId : number, equipQuality : number, toLv? : number):number
	{
		let num=0;
		let curlv = Api.servantVoApi.getEquipAddLv(sid, equipId);
		if(!toLv)
		{
			toLv=Math.min(Config.ServantequiplCfg.getEquipQualityMaxLv(equipQuality),curlv+1);
		}
		num=Config.ServantequiplCfg.getLvupNeedEquipExp(equipQuality,curlv,toLv);
		return num;
	}

	public getCurTotalAddExp(itemId?:string,addType?:number):number
    {
        let totalexp = 0;
        for(let i in this.equipParams)
        {
            let id = i;
            let num = this.equipParams[i];
            let exp = Config.ServantequiplCfg.getCostEquipAddExp(id);
            totalexp += (num * exp);
        }

        if(itemId)
        {
            addType=addType||0;
            let addExp=Config.ServantequiplCfg.getCostEquipAddExp(itemId);
            totalexp+=addType*addExp
        }

        return totalexp;
	}
	
	public checkAddEquipExp(sid:string,eid:number,itemId:string,addType:number):{num:number,result:boolean}
	{
		let resultData={num:this.equipParams[itemId]||0,result:true};
		if(addType>0)
		{
			if(resultData.num>=Api.itemVoApi.getItemNumInfoVoById(itemId))
			{
				resultData.result=false;
				return resultData;
			}
			
			let nexQualityCostExp=Api.servantVoApi.getNextQualityCostExp(sid,eid);
			let curAllExp=Api.servantVoApi.getCurTotalAddExp();
			if(curAllExp>=nexQualityCostExp)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("servantEquipMaxExpTip"));
				resultData.result=false;
				return resultData;
			}
		}
		if(!this.equipParams[itemId])
		{
			this.equipParams[itemId]=0;
		}
		this.equipParams[itemId]+=addType;
		this.equipParams[itemId]=Math.max(0,this.equipParams[itemId])
		resultData.num=this.equipParams[itemId];
		if(!this.equipParams[itemId])
		{
			resultData.result=false;
			delete this.equipParams[itemId];
		}
		return resultData;
	}

	public getEquipItemSelectNum(itemId:string):number
	{
		return this.equipParams[itemId]||0;
	}
	public clearEquipItemsNum():void
	{
		this.equipParams={};
	}

	public checkEquipMaxQualityAndLv(sid:string,eid:number):boolean
	{
		let isMaxQuality = Api.servantVoApi.checkEquipMaxQuality(sid,eid);
		let maxFullLv=(Api.servantVoApi.getNextQualityCostExp(sid,eid)<=0);
		return isMaxQuality&&maxFullLv;
	}

	/**
	 * 获取未解锁门客
	 */
	public getUnlockServantList():{sid:string,unlock:boolean}[]{
		let allCfg = Config.ServantCfg.getServantAllCfg();
		let tmp = [];
		for(let i in allCfg){
			if(!Config.ServantCfg.checkIsLockedByGM(i) && !Api.servantVoApi.getServantObj(i)){
				tmp.push({
					sid : i,
					unlock : true,
				});
			}
		}
		tmp.sort((a,b)=>{
			let ainfo = Config.ServantCfg.getServantItemById(a.sid);
			let binfo = Config.ServantCfg.getServantItemById(b.sid);
			if(ainfo.getStarNums() === binfo.getStarNums()){
				return Number(a) - Number(b);
			}
			else{
				return ainfo.getStarNums() - binfo.getStarNums()
			}
		});
		return tmp;
	}


	public dispose():void
	{
		this.isShowAtkraceGuide = false;
		this.isCheckGuide = false;
		this.waitShowData = null;
		this.servantVo=null;
		this.equipParams={};
		super.dispose();
	}
}