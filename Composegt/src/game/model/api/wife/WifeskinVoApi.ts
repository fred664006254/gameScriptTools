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
				arr.push(curr_wifeItemCfg);
			}
		}

		return arr;
	}

	/**获取红颜是不是有皮肤(配置里是否有) */
	public isHaveSkin(wifeId):boolean
    {
		let wifeListCfg = Config.WifeskinCfg.getWifeCfgList();
        for(let key in wifeListCfg)
		{
			var curr_wifeItemCfg=wifeListCfg[key];
			let wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
			if(wifeId == curr_wifeItemCfg.wifeId&&(curr_wifeItemCfg.isBlue==1&&wifeCfg.isBule()||curr_wifeItemCfg.isBlue==0&&!wifeCfg.isBule()))
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
			if(Api.switchVoApi.checkIsInBlueWife()){
				let isBlue = Config.WifeCfg.getWifeCfgById(id).isBule();
				if(isBlue){
					if(wifeSkinInfoVoObj[id.toString()].cfg && wifeSkinInfoVoObj[id.toString()].cfg.isBlue != null){
						if(Boolean(wifeSkinInfoVoObj[id.toString()].cfg.isBlue)!= isBlue){
							return null;
						}
					}else{
						return null;
					}
				}

			}
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
			// for (var index = 0; index < wifeSkinInfoVo.skin.length; index++) {
			// 	var element = wifeSkinInfoVo.skin[index];
			// 	// if(element.red == 1)
			// 	// {
			// 	// 	return true;
			// 	// }
			// 	for(let key in element)
			// {
			// 	// arr.push(wifeSkinInfoVoObj[key]);
			// 	if(element[key].red == 1)
			// 	{
			// 		return true;
			// 	}
			// }
				
			// }
			for(let key in wifeSkinInfoVo.skin)
			{
				// arr.push(wifeSkinInfoVoObj[key]);
				if(wifeSkinInfoVo.skin[key].red == 1)
				{
					return true;
				}
			}
		}
		
		return false;
	}

	/**
	 * 获取某个皮肤是否换肤红点

	 */
	public getSkinOneRed(wifeId,skinId):boolean
	{	
		let wifeSkinInfoVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeId);
		if(wifeSkinInfoVo)
		{
			if(wifeSkinInfoVo.skin[skinId]&&wifeSkinInfoVo.skin[skinId].red == 1)
			{
				return true;
			}
		}
		
		return false;
	}

	public isOwnSkinOfSkinId(skinId)
    {
        let wifeId = Config.WifeskinCfg.getWifeCfgById(skinId).wifeId;
        if(this.wifeskinVo.wifeSkinInfoVoObj[wifeId] && this.wifeskinVo.wifeSkinInfoVoObj[wifeId].skin[skinId])
        {
            return true;
        }
        return false;
    }
	public getLockedString():string
	{
		return LanguageManager.getlocal("reachLvelUnlockDesc",[Api.playerVoApi.getPlayerOfficeByLevel(Config.WifebaseCfg.unlockLv)]);
	}

		public getAllWifeSkinProAdd():number[]
	{
		let res = [0,0,0,0,0,0,0,0,0,0];
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
		if(skincfg.atkAdd[0] == 1){
			res[0] += skincfg.atkAdd[1];
		}else{
			res[6] += skincfg.atkAdd[1];
		}

		if(skincfg.inteAdd[0] == 1){
			res[1] += skincfg.inteAdd[1];
		}else{
			res[7] += skincfg.inteAdd[1];
		}

		if(skincfg.politicsAdd[0] == 1){
			res[2] += skincfg.politicsAdd[1];
		}else{
			res[8] += skincfg.politicsAdd[1];
		}

		if(skincfg.charmAdd[0] == 1){
			res[3] += skincfg.charmAdd[1];
		}else{
			res[9] += skincfg.charmAdd[1];
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
	
	public getWifeSkinLV(skinId:string):number
	{
 		let wifeId = Config.WifeskinCfg.getWifeCfgById(skinId).wifeId;
        if(this.wifeskinVo.wifeSkinInfoVoObj[wifeId] && this.wifeskinVo.wifeSkinInfoVoObj[wifeId].skin[skinId])
        {
            return this.wifeskinVo.wifeSkinInfoVoObj[wifeId].skin[skinId].wlv || 1;
        }
        return 1;
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
	
}