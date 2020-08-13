/**
 * 红颜皮肤系统api
 * author dky
 * date 2018/3/2
 * @class WifeSkinVoApi
 */
class WifeskinVoApi extends BaseVoApi
{
	private wifeskinVo:WifeskinVo;
	public constructor() 
	{
		super();
	}

	// 获取皮肤数量
	public getWifeNum():number
	{
		let obj:Object = this.wifeskinVo.wifeSkinInfoVoObj;
		return Object.keys(obj).length
	}



	/**
	 * 获取红颜对应的皮肤列表
	 */
	public getWifeSkinListById(id:String):Array<Config.WifeSkinItemCfg>
	{
		let arr:Array<Config.WifeSkinItemCfg> = new Array();
		let wifeListCfg = Config.WifeskinCfg.getWifeCfgList();

		for(let key in wifeListCfg)
		{
			var curr_wifeItemCfg=wifeListCfg[key];
			if(id == curr_wifeItemCfg.wifeId)
			{	
				if (curr_wifeItemCfg.id == "1012")
				{
					if (Api.switchVoApi.checkOpenPrestige() == true)
					{
						arr.push(curr_wifeItemCfg);
					}
				}
				else 
				{
					arr.push(curr_wifeItemCfg);
				}
			}
		}

		return arr;
	}

	/**获取红颜是不是有皮肤(配置里是否有) */
	public isHaveSkin(wifeId):boolean
    {
		let wifevo = Api.wifeVoApi.getWifeInfoVoById(wifeId);
		let wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
		let wifeListCfg = Config.WifeskinCfg.getWifeCfgList();
		for(let key in wifeListCfg)
		{
			var curr_wifeItemCfg=wifeListCfg[key];
			if(wifeId == curr_wifeItemCfg.wifeId  && Config.WifeskinCfg.isSkinOPend(curr_wifeItemCfg.id) &&(curr_wifeItemCfg.isBlue==1&&wifeCfg.isBule()||curr_wifeItemCfg.isBlue==0&&!wifeCfg.isBule()))
			{
				return true;
			}
		}
		return false;
	}

	/**获取红颜列表 */
	public getWifeInfoVoList():Array<WifeskinInfoVo>
	{
		let arr:Array<WifeskinInfoVo> = new Array();
		let wifeSkinInfoVoObj:Object = this.wifeskinVo.wifeSkinInfoVoObj;
		for(let key in wifeSkinInfoVoObj)
		{
			arr.push(wifeSkinInfoVoObj[key]);
		}
		return arr;
	}

	
	/**
	 * 检测是否显示子嗣Npc
	 */
	public isShowNpc():boolean
	{
		return Api.playerVoApi.getPlayerLevel()>=Config.WifebaseCfg.unlockLv;
	}

	/**
	 * 根据红颜id获取皮肤vo
	 * @param id 红颜id
	 */
	public getWifeskinInfoVoById(id:number|string):WifeskinInfoVo
	{
		let wifeSkinInfoVoObj = this.wifeskinVo.wifeSkinInfoVoObj;
		if(wifeSkinInfoVoObj && wifeSkinInfoVoObj[id.toString()])
		{
			return wifeSkinInfoVoObj[id.toString()];
		}
		return null;
	}

	/**
	 * 根据皮肤id获取红颜列表位置
	 * @param id 红颜id
	 */
	public getWifeSkinIndexVoById(skinId:string):number
	{
		let wifeId = Config.WifeskinCfg.getWifeCfgById(skinId).wifeId;
		let skinCfgList = this.getWifeSkinListById(wifeId);

		for (var i = 0; i < skinCfgList.length; i ++) {
			if(skinId == skinCfgList[i].id ){
				return i
			}
		}
		return 0;
	}

	/**
	 * 获取所有红颜是否换肤红点

	 */
	public getSkinRedAll():boolean
	{	
		let skinList = this.getWifeInfoVoList();
		for (var index = 0; index < skinList.length; index++) {
			var element = skinList[index];
			if(element)
			{
				for(let key in element.skin)
				{
					// arr.push(elementObj[key]);
					if(element.skin[key].red == 1)
					{
						return true;
					}
				}
			}		
		}

		
		return false;
	}

	/**
	 * 获取某个红颜是否换肤红点

	 */
	public getSkinRed(wifeId):boolean
	{	
		let wifeSkinInfoVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeId);
		if(wifeSkinInfoVo)
		{
			let wifecfg = Config.WifeCfg.getWifeCfgById(wifeId);
			for(let key in wifeSkinInfoVo.skin)
			{
				// arr.push(wifeSkinInfoVoObj[key]);
				let wifeskincfg = Config.WifeskinCfg.getWifeCfgById(key);
				if((wifecfg.isBule() && !wifeskincfg.isBlueSkin) || (!wifecfg.isBule() && wifeskincfg.isBlueSkin)){
					continue;
				}
				if(wifeSkinInfoVo.skin[key].red == 1)
				{
					return true;
				}
				let skinId = key;
				if(Api.switchVoApi.checkWifeSkinLevelUp()){
					let wifeskincfg = Config.WifeskinCfg.getWifeCfgById(skinId);
					if(wifeskincfg && wifeskincfg.levelUp){
						let lv = Api.wifeSkinVoApi.getWifeSkinLV(skinId);
						let levelup = wifeskincfg.levelUp[lv];
						if(levelup){
							let levelUpCost = levelup.levelUpCost;
							if(levelUpCost && levelUpCost != ``){
								let rewardvo = GameData.formatRewardItem(levelUpCost)[0];
								let have = Api.itemVoApi.getItemNumInfoVoById(rewardvo.id);
								let need = rewardvo.num;
								if(have >= need){
									return true;
								}
							}
						}
					}
				}
			}
		}

		return false;
	}

	/**
	 * 获取某个皮肤是否换肤红点、升级红点

	 */
	public getSkinOneRed(wifeId,skinId):boolean
	{	
		if(!skinId){
			return false;
		}
		let wifeSkinInfoVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeId);
		if(wifeSkinInfoVo)
		{
			let wifecfg = Config.WifeCfg.getWifeCfgById(wifeId);
			let wifeskincfg = Config.WifeskinCfg.getWifeCfgById(skinId);
			if(wifeskincfg && (wifecfg.isBule() && wifeskincfg.isBlueSkin) || (!wifecfg.isBule() && !wifeskincfg.isBlueSkin)){
				if(wifeSkinInfoVo.skin[skinId]&&wifeSkinInfoVo.skin[skinId].red == 1)
				{
					return true;
				}
			}
		}
		if(Api.switchVoApi.checkWifeSkinLevelUp() && wifeSkinInfoVo && wifeSkinInfoVo.skin[skinId]){
			let wifeskincfg = Config.WifeskinCfg.getWifeCfgById(skinId);
			if(wifeskincfg && wifeskincfg.levelUp){
				let lv = Api.wifeSkinVoApi.getWifeSkinLV(skinId);
				let levelup = wifeskincfg.levelUp[lv];
				if(levelup){
					let levelUpCost = levelup.levelUpCost;
					if(levelUpCost && levelUpCost != ``){
						let rewardvo = GameData.formatRewardItem(levelUpCost)[0];
						let have = Api.itemVoApi.getItemNumInfoVoById(rewardvo.id);
						let need = rewardvo.num;
						if(have >= need){
							return true;
						}
					}
				}
			}
		}
		return false;
	}

	public isOwnSkinOfSkinId(skinId)
    {
		let wifeId = Config.WifeskinCfg.getWifeCfgById(skinId).wifeId;
		let wifecfg = Config.WifeCfg.getWifeCfgById(wifeId);
		let wifeskincfg = Config.WifeskinCfg.getWifeCfgById(skinId);
		if(wifeskincfg){
			if(this.wifeskinVo && this.wifeskinVo.wifeSkinInfoVoObj[wifeId] && this.wifeskinVo.wifeSkinInfoVoObj[wifeId].skin && this.wifeskinVo.wifeSkinInfoVoObj[wifeId].skin[skinId])
			{
				return true;
			}
		}        
        return false;
    }

	public getWifeSkinLV(skinId:string):number
	{
		let lv = 1;
		let cfg = Config.WifeskinCfg.getWifeCfgById(skinId);
		if(cfg){
			let wifeId = cfg.wifeId;
			if(this.wifeskinVo.wifeSkinInfoVoObj[wifeId] && this.wifeskinVo.wifeSkinInfoVoObj[wifeId].skin[skinId] && this.wifeskinVo.wifeSkinInfoVoObj[wifeId].skin[skinId].wlv)
			{
				lv = this.wifeskinVo.wifeSkinInfoVoObj[wifeId].skin[skinId].wlv ;
			}
		}
        return lv;
	}

	public getAllWifeSkinIdList()
	{
		let wifeSkinInfoVoObj = this.wifeskinVo.wifeSkinInfoVoObj;
		let idList = [];
		for (var key in wifeSkinInfoVoObj) {
			// if(Api.wifeVoApi.getWifeInfoVoById(key)){
				let skin = wifeSkinInfoVoObj[key].skin;
				for (var key2 in skin) {
					let tmp = skin[key2];
					tmp["wid"] = key2;
					idList.push(tmp);
				}
			// }
		}
		return idList;
	}
	public getAllWifeSkinProAdd():number[]
	{
		let res = [0,0,0,0,0,0,0,0,0,0,0];
		let idList = this.getAllWifeSkinIdList();
		for (let index = 0; index < idList.length; index++) {
			let skinId = idList[index].wid;
			let tmpV = this.getWifeSkinProAdd(skinId);
			for (let index2 = 0; index2 < tmpV.length; index2++) {
				res[index2] += tmpV[index2];
			}
		}
		return res;
	}

	/**
	 * 获取单个红颜皮肤的属性加成信息,如果没获取，则返回皮肤基础配置
	 */
	public getWifeSkinProAdd(skinId:string,onlyCfg:boolean=false)
	{
		let res = [0,0,0,0,0,0,0,0,0,0];
		let wifeId = Config.WifeskinCfg.getWifeCfgById(skinId).wifeId;
		let wlv = 0;
        if(!onlyCfg && this.wifeskinVo.wifeSkinInfoVoObj[wifeId] && this.wifeskinVo.wifeSkinInfoVoObj[wifeId].skin[skinId])
        {
			wlv = this.wifeskinVo.wifeSkinInfoVoObj[wifeId].skin[skinId].wlv ;
			if(!wlv)
			{
				wlv = 1;//默认1级
			}
        }else{
			if(!onlyCfg){
				return res;
			}else{
				wlv = 1;
			}
		}

		let skincfg = Config.WifeskinCfg.getWifeCfgById(skinId);
		if (skincfg.atkAdd)
		{
			if(skincfg.atkAdd[0] == 1){
				res[0] += skincfg.atkAdd[1];
			}else{
				res[6] += skincfg.atkAdd[1];
			}
		}

		if (skincfg.inteAdd)
		{
			if(skincfg.inteAdd[0] == 1){
				res[1] += skincfg.inteAdd[1];
			}else{
				res[7] += skincfg.inteAdd[1];
			}
		}
		
		if (skincfg.politicsAdd)
		{
			if(skincfg.politicsAdd[0] == 1){
				res[2] += skincfg.politicsAdd[1];
			}else{
				res[8] += skincfg.politicsAdd[1];
			}
		}
		
		if (skincfg.charmAdd)
		{
			if(skincfg.charmAdd[0] == 1){
				res[3] += skincfg.charmAdd[1];
			}else{
				res[9] += skincfg.charmAdd[1];
			}
		}
		
		if (skincfg.atkAdd2)
		{
			if(skincfg.atkAdd2[0] == 1){
				res[0] += skincfg.atkAdd2[1];
			}else{
				res[6] += skincfg.atkAdd2[1];
			}
			res[10] = 1;
		}

		if (skincfg.inteAdd2)
		{
			if(skincfg.inteAdd2[0] == 1){
				res[1] += skincfg.inteAdd2[1];
			}else{
				res[7] += skincfg.inteAdd2[1];
			}
			res[10] = 1;
		}
		
		if (skincfg.politicsAdd2)
		{
			if(skincfg.politicsAdd2[0] == 1){
				res[2] += skincfg.politicsAdd2[1];
			}else{
				res[8] += skincfg.politicsAdd2[1];
			}
			res[10] = 1;
		}
		
		if (skincfg.charmAdd2)
		{
			if(skincfg.charmAdd2[0] == 1){
				res[3] += skincfg.charmAdd2[1];
			}else{
				res[9] += skincfg.charmAdd2[1];
			}
			res[10] = 1;
		}

		res[4] += skincfg.wifeIntimacy ;
		res[5] += skincfg.wifeGlamour ;
		res[4] += skincfg.wifeLvUpIntimacy  * (wlv-1);
		res[5] += skincfg.wifeLvUpGlamour * (wlv-1);

		if(skincfg.atkLvUpAdd[0] == 1){
			res[0] += skincfg.atkLvUpAdd[1] * (wlv-1);
		}else{
			res[6] += skincfg.atkLvUpAdd[1] * (wlv-1);
		}

		if(skincfg.inteLvUpAdd[0] == 1){
			res[1] += skincfg.inteLvUpAdd[1] * (wlv-1);
		}else{
			res[7] += skincfg.inteLvUpAdd[1] * (wlv-1);
		}

		if(skincfg.politicsLvUpAdd[0] == 1){
			res[2] += skincfg.politicsLvUpAdd[1] * (wlv-1);
		}else{
			res[8] += skincfg.politicsLvUpAdd[1] * (wlv-1);
		}

		if(skincfg.charmLvUpAdd[0] == 1){
			res[3] += skincfg.charmLvUpAdd[1] * (wlv-1);
		}else{
			res[9] += skincfg.charmLvUpAdd[1] * (wlv-1);
		}

		return res;
	}

	/**
	 * 获取单个红颜皮肤的属性加成信息,返回皮肤基础配置
	 */
	// kind 1 皮肤 2 门客  attr属性  type: 1 固定值 2 百分比 3 修身固定值 4 修身百分比 valu 值
	public getNewWifeSkinProAdd(skinId:string,onlyCfg:boolean=false):{kind:number, attr:string, type:number, value:number}[]
	{
		// let wifeId = Config.WifeskinCfg.getWifeCfgById(skinId).wifeId;
		// let wlv = 1;
        // if(!onlyCfg && this.wifeskinVo.wifeSkinInfoVoObj[wifeId] && this.wifeskinVo.wifeSkinInfoVoObj[wifeId].skin[skinId])
        // {
		// 	wlv = this.wifeskinVo.wifeSkinInfoVoObj[wifeId].skin[skinId].wlv ;
		// 	if(!wlv)
		// 	{
		// 		wlv = 1;//默认1级
		// 	}
        // }else{
		// 	if(!onlyCfg){
		// 		return null;
		// 	}else{
		// 		wlv = 1;
		// 	}
		// }
		
		let dataList:{kind:number, attr:string, type:number, value:number}[] = [];
		let skincfg = Config.WifeskinCfg.getWifeCfgById(skinId);
		if (skincfg.atkAdd)
		{
			let value = skincfg.atkAdd[1];
			let atkData = {attr:"atkAdd", type: skincfg.atkAdd[0], value: value, kind: 1};
			dataList.push(atkData);
		}

		if (skincfg.inteAdd)
		{
			let value = skincfg.inteAdd[1];
			let data = {attr:"inteAdd", type: skincfg.inteAdd[0], value: value, kind: 1};
			dataList.push(data);
		}
		
		if (skincfg.politicsAdd)
		{
			let data = {attr:"politicsAdd", type: skincfg.politicsAdd[0], value: skincfg.politicsAdd[1], kind: 1};
			dataList.push(data);
		}
		
		if (skincfg.charmAdd)
		{
			let data = {attr:"charmAdd", type: skincfg.charmAdd[0], value: skincfg.charmAdd[1], kind: 1};
			dataList.push(data);
		}
		
		if (skincfg.atkAdd2)
		{
			let data = {attr:"atkAdd2", type: skincfg.atkAdd2[0], value: skincfg.atkAdd2[1], kind: 2};
			dataList.push(data);
		}

		if (skincfg.inteAdd2)
		{
			let data = {attr:"inteAdd2", type: skincfg.inteAdd2[0], value: skincfg.inteAdd2[1], kind: 2};
			dataList.push(data);
		}
		
		if (skincfg.politicsAdd2)
		{
			let data = {attr:"politicsAdd2", type: skincfg.politicsAdd2[0], value: skincfg.politicsAdd2[1], kind: 2};
			dataList.push(data);
		}
		
		if (skincfg.charmAdd2)
		{
			let data = {attr:"charmAdd2", type: skincfg.charmAdd2[0], value: skincfg.charmAdd2[1], kind: 2};
			dataList.push(data);
		}

		if (skincfg.wifeIntimacy){
			let value = skincfg.wifeIntimacy;
			let data = {attr:"wifeIntimacy", type:0, value: value, kind: 1};
			dataList.push(data);
		}

		if (skincfg.wifeGlamour){
			let value = skincfg.wifeGlamour;
			let data = {attr:"wifeGlamour", type:0, value: value, kind: 1};
			dataList.push(data);
		}

		return dataList;
	}

		/**获取红颜列表 */
	public getWifeSkinNums():number
	{
		let num = 0;
		let wifeSkinInfoVoObj:Object = this.wifeskinVo.wifeSkinInfoVoObj;
		for(let key in wifeSkinInfoVoObj)
		{
			let obj = wifeSkinInfoVoObj[key];
			num += Object.keys(obj.skin).length;
		}
		return num;
	}

	public getLockedString():string
	{
		return LanguageManager.getlocal("reachLvelUnlockDesc",[Api.playerVoApi.getPlayerOfficeByLevel(Config.WifebaseCfg.unlockLv)]);
	}

	public dispose():void
	{
		this.wifeskinVo = null;
 
		super.dispose();
	}
}