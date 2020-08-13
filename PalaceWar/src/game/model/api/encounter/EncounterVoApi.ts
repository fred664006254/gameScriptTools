class EncounterVoApi extends BaseVoApi
{
    private encounterVo:EncounterVo;
    
	public constructor(){
		super();
	}

	public formatData(data:any):void{
		super.formatData(data);
	}
	//获取对应系列已激活的缘分个数
	public getActiveBuffNum(type : string):number{
		let num = 0;
		if(this.encounterVo.info && this.encounterVo.info[type] && this.encounterVo.info[type].lv){
			num = this.encounterVo.info[type].lv;
		}
		return Number(num);
	}

	//获取对应系列位置是否已激活
	public getActiveBuffIndex(type : string, index : number):boolean{
		let flag = false;
		if(this.encounterVo.info && this.encounterVo.info[type] && this.encounterVo.info[type].eIndex){
			if(this.encounterVo.info[type].eIndex.indexOf(Number(index)) > -1){
				flag = true;
			}
		}
		return flag;
	}


	//获取对应系列的门客情况
	public getNeedInfo(type : string, id : string):{isopen : boolean, have : boolean, iswife : boolean, isservant : boolean, iswifeskin : boolean, isservantskin : boolean, name : string}{
		let obj = null;
		for(let i in Config.EncounterCfg.encounterList){
			let unit = Config.EncounterCfg.encounterList[i];
			let need = unit.need;
			if(type == unit.type){
				for(let j in need){
					let rewardvo = GameData.formatRewardItem(need[j])[0];
					let sid = rewardvo.id.toString();
					if(sid == id.toString()){
						let iswife = false;
						let isservant = false;
						let iswifeskin = false;
						let isservantskin = false;
						let name = ``;
						let isopen = false;	
						let have = false;
						if(rewardvo.type == 8){
							//门客
							if(Api.servantVoApi.getServantObj(rewardvo.id.toString())){
								have = true;
							}
							isservant = true;
							name = Config.ServantCfg.getServantItemById(sid).name;
							isopen = !Config.ServantCfg.checkIsLockedByGM(sid);
						}
						else if(rewardvo.type == 10){
							//红颜
							if(Api.wifeVoApi.getWifeInfoVoById(rewardvo.id.toString())){
								have = true;
							}
							iswife = true;
							name = Config.WifeCfg.getWifeCfgById(sid).name;
							isopen = !Config.WifeCfg.checkIsLockedByGM(sid);
						}
						else if(rewardvo.type == 16){
							//红颜皮肤
							if(Api.wifeSkinVoApi.isOwnSkinOfSkinId(rewardvo.id.toString())){
								have = true;
							}
							iswifeskin = true;
							let wifeid = Config.WifeskinCfg.getWifeCfgById(sid).wifeId;
							name = Config.WifeCfg.getWifeCfgById(wifeid).name;
							isopen = Config.WifeskinCfg.isSkinOPend(sid);
						}
						else if(rewardvo.type == 19){
							//门客皮肤
							if(Api.servantVoApi.isOwnSkinOfSkinId(rewardvo.id.toString())){
								have = true;
							}
							isservantskin = true;
							let servantid = Config.ServantskinCfg.getServantSkinItemById(sid).servantId;
							name = Config.ServantCfg.getServantItemById(servantid).name;
							isopen = Api.switchVoApi.checkIsServantSkinState(sid);
						}
						obj = {
							isopen : isopen,
							have : have,
							name : name,
							iswife : iswife,
							isservant : isservant,
							iswifeskin : iswifeskin,
							isservantskin : isservantskin,
						};
						break;
					}
				}
				break;
			}
		}
		return obj;
	}

	public checkRed(type : string):boolean{
		let cfg = Config.EncounterCfg.encounterList;
		let flag = false;
		for(let i in cfg){
			if(cfg[i].type == type){
				if(Api.switchVoApi.checkOpenQingYuan(type)){
					let need = cfg[i].need;
					let have = 0;
					for(let i in need){
						let rewardvo = GameData.formatRewardItem(need[i])[0];
						if(rewardvo.type == 8){
							//门客
							if(Api.servantVoApi.getServantObj(rewardvo.id.toString())){
								++ have;
							}
						}
						else if(rewardvo.type == 10){
							//红颜
							if(Api.wifeVoApi.getWifeInfoVoById(rewardvo.id.toString())){
								++ have;
							}
						}
						else if(rewardvo.type == 16){
							//红颜皮肤
							if(Api.wifeSkinVoApi.isOwnSkinOfSkinId(rewardvo.id.toString())){
								++ have;
							}
						}
						else if(rewardvo.type == 19){
							//门客皮肤
							if(Api.servantVoApi.isOwnSkinOfSkinId(rewardvo.id.toString())){
								++ have;
							}
						}
					}	
					if(this.getActiveBuffNum(type) < have){
						flag = true;
					}
				}
				break;
			}
		}
		return flag;
	}

	//进度档位排序
	public getSortProcessData(type:string, data:any):any[]{
		let currHave = this.getActiveBuffNum(type);
		let maxNum = 999;
		let list:any[] = [];
		for (let i=0; i < data.length; i++){
			if (data[i].id <= currHave){
				data[i].sortId = maxNum + data[i].id;
			}
			else if (data[i].id == currHave + 1){
				data[i].sortId = data[i].id - maxNum;
			}
			else{
				data[i].sortId = data[i].id;
			}
			list.push(data[i]);
		}
		if (list.length > 1){
			list.sort((a, b)=>{return a.sortId - b.sortId});
		}
		return list;
	}

	//可解锁
	public getCurrCanGetIndex(type:string):number{
		let cfg = Config.EncounterCfg.encounterList;
		for(let i in cfg){
			if(cfg[i].type == type){
				if(Api.switchVoApi.checkOpenQingYuan(type)){
					let need = cfg[i].need;
					let have = 0;
					for(let i in need){
						if (!this.getActiveBuffIndex(type, Number(i)+1)){
							let rewardvo = GameData.formatRewardItem(need[i])[0];
							let info = Api.encounterVoApi.getNeedInfo(type, rewardvo.id.toString());
							if (info.isopen && info.have){
								return Number(i)+1;
							}
						}
					}
				}
				break;
			}
		}
		return null;
	}

	//当前已拥有的数量
	public getCurrHaveNum(type : string):number{
		let cfg = Config.EncounterCfg.encounterList;
		let flag = false;
		for(let i in cfg){
			if(cfg[i].type == type){
				if(Api.switchVoApi.checkOpenQingYuan(type)){
					let need = cfg[i].need;
					let have = 0;
					for(let i in need){
						let rewardvo = GameData.formatRewardItem(need[i])[0];
						if(rewardvo.type == 8){
							//门客
							if(Api.servantVoApi.getServantObj(rewardvo.id.toString())){
								++ have;
							}
						}
						else if(rewardvo.type == 10){
							//红颜
							if(Api.wifeVoApi.getWifeInfoVoById(rewardvo.id.toString())){
								++ have;
							}
						}
						else if(rewardvo.type == 16){
							//红颜皮肤
							if(Api.wifeSkinVoApi.isOwnSkinOfSkinId(rewardvo.id.toString())){
								++ have;
							}
						}
						else if(rewardvo.type == 19){
							//门客皮肤
							if(Api.servantVoApi.isOwnSkinOfSkinId(rewardvo.id.toString())){
								++ have;
							}
						}
					}	
					return have;
				}
				break;
			}
		}
		return 0;
	}

	//某一种类是否有红点
	public checkRedByKind(kind:number):boolean{
		let kindData = this.getEncountCfgByKind(kind);
		for (let i=0; i < kindData.length; i++){
			if (this.checkRedByType(kindData[i].type)){
				return true;
			}
		}
		return false;
	}

	//某一情缘类型是否有红点
	public checkRedByType(type:string):boolean{
		let cfg = Config.EncounterCfg.encounterList;
		let data = null;
		for (let i=0; i < cfg.length; i++){
			if (cfg[i].type == type){
				data = cfg[i];
				break;
			}
		}
		if (data.kind == 1 || data.kind == 2){
			if (Api.switchVoApi.checkOpenQingyuanServantAndWifePage()){
				if (data.kind == 1){
					if (!this.checkShowServantFlag()){
						return false;
					}
				}
				else if (data.kind == 2){
					if (!this.checkShowWifeFlag()){
						return false;
					}
				}
			}
			else
			{
				return false;
			}
		}
		let getNum = this.getActiveBuffNum(type);
		if (data.collect.length > 0){
			let currHaveNum = this.getCurrHaveNum(type);
			if (currHaveNum > getNum){
				return true;
			}
		}
		if (data.task.length > 0){
			let need = data.need;
			for (let i=0; i < data.task.length; i++){
				let tmpData = data.task[i];
				if (!this.getActiveBuffIndex(type, tmpData.id)){
					let flag = true;
					for (let k=0; k < need.length; k++){
						let attrNum = this.getAttrById(need[k], tmpData.type);
						if (attrNum < tmpData.task_Value){
							flag = false;
							break;
						}
					}
					if (flag){
						return true;
					}
				}
			}
		}
		return false;
	}

	//获取某一类型两种任务都有的情况
	public checkRedIndexByType(type:string):{type1: number, type2: number}{
		let cfg = Config.EncounterCfg.encounterList;
		let data = null;
		for (let i=0; i < cfg.length; i++){
			if (cfg[i].type == type){
				data = cfg[i];
				break;
			}
		} 
		let type1 = 0;
		let type2 = 0;
		let getNum = this.getActiveBuffNum(type);
		if (data.collect.length > 0){
			let currHaveNum = this.getCurrHaveNum(type);
			if (currHaveNum > getNum){
				type1 = 1;
			}
		}
		if (data.task.length > 0){
			if (data.collect.length > 0){
				if (getNum < data.collect[data.collect.length -1].id){
					return {type1: type1, type2: 0};
				}
			}
			let need = data.need;
			for (let i=0; i < data.task.length; i++){
				let tmpData = data.task[i];
				if (!this.getActiveBuffIndex(type, tmpData.id)){
					let flag = true;
					for (let k=0; k < need.length; k++){
						let attrNum = this.getAttrById(need[k], tmpData.type);
						if (attrNum < tmpData.task_Value){
							flag = false;
							break;
						}
					}
					if (flag){
						type2 = 1;
						break;
					}
				}
			}
		}
		return {type1: type1, type2: type2};
	}

	//情缘任务某一档位进度
	public getTaskProcessByType(type:string, taskType:number, taskId:number|string):{need:number, have:number}{
		let cfg = Config.EncounterCfg.encounterList;
		let data = null;
		for (let i=0; i < cfg.length; i++){
			if (cfg[i].type == type){
				data = cfg[i];
				break;
			}
		}
		if (taskType > 0){
			let needData:any = null;
			for (let i=0; i < data.task.length; i++){
				if (String(taskId) == String(data.task[i].id)){
					needData = data.task[i];
					break;
				}
			}
			if (needData){
				let count = 0;
				for (let i=0; i < data.need.length; i++){
					let attrNum = this.getAttrById(data.need[i], needData.type);
					if (attrNum >= needData.task_Value){
						count++;
					}
				}
				return {need: data.need.length, have:count};
			}
		}
		return {need: data.need.length, have: 0};
	}	

	//情缘任务属性
	public getAttrById(rewards:string, type:number):number{
		let rewardvo = GameData.formatRewardItem(rewards)[0];
		if(rewardvo.type == 8){
			//门客
			let servantVo = Api.servantVoApi.getServantObj(rewardvo.id.toString());
			if(servantVo){
				if (type == 1){
					return servantVo.total;
				}
				else if (type == 2){
					return servantVo.getTotalAttrValye(1);
				}
				else if (type == 3){
					return servantVo.getTotalAttrValye(2);
				}
				else if (type == 4){
					return servantVo.getTotalAttrValye(3);
				}
				else if (type == 5){
					return servantVo.getTotalAttrValye(4);
				}
			}
			return 0;
		}
		else if(rewardvo.type == 10){
			//红颜
			let wifeVo = Api.wifeVoApi.getWifeInfoVoById(rewardvo.id.toString());
			if(wifeVo){
				if (type == 6){
					return wifeVo.intimacy;
				}
				else if (type == 7){
					return wifeVo.glamour;
				}
			}
			return 0;
		}
		else if(rewardvo.type == 16){
			//红颜皮肤
			// let wifeSkinVo = Api.wifeSkinVoApi.isOwnSkinOfSkinId(rewardvo.id.toString());
			// if(wifeSkinVo){
			// 	return 0;
			// }
			// return 0;
		}
		else if(rewardvo.type == 19){
			//门客皮肤
			if(Api.servantVoApi.isOwnSkinOfSkinId(rewardvo.id.toString())){
				return 0;
			}
		}
		return 0;
	}

	//是否显示小红点
	public isShowNpc():boolean{

		let cfg = Config.EncounterCfg.encounterList;
		let flag = false;
		for(let k in cfg){
			let type = cfg[k].type;
			if(Api.switchVoApi.checkOpenQingYuan(type)){
				if(this.checkRedByType(type)){
					flag = true;
					break;
				}
			}
		}
		return flag;
	}

	public getChildAdd(wifeid):number{
		let num = 0;
		if(this.encounterVo && this.encounterVo.buff && this.encounterVo.buff.wife){
			let obj = this.encounterVo.buff.wife;
			if(obj && obj[wifeid]){
				num = Number(obj[wifeid].wife_Child) + this.encounterVo.buff.all_Child ? this.encounterVo.buff.all_Child : 0;
			}
		}
		return num;
	}

	//是否解锁门客或红颜情缘标签
	public checkShowServantFlag():boolean{
		let playerLv = Api.playerVoApi.getPlayerLevel();
		let needLv = Config.EncounterCfg.needLv1;
		if (playerLv >= needLv){
			return true;
		}
		return false;
	}

	//是否解锁门客或红颜情缘标签
	public checkShowWifeFlag():boolean{
		let playerLv = Api.playerVoApi.getPlayerLevel();
		let needLv = Config.EncounterCfg.needLv2;
		if (playerLv >= needLv){
			return true;
		}
		return false;
	}

	//获取某一kind的数据
	public getEncountCfgByKind(kind:number):Config.EncounterCfg.EncounterInfoCfg[]{
		let cfg = Config.EncounterCfg.getEncountCfgByKind(kind);
		let data:Config.EncounterCfg.EncounterInfoCfg[] = [];
		for (let i=0; i < cfg.length; i++){
			if (Api.switchVoApi.checkOpenQingYuan(cfg[i].type)){
				data.push(cfg[i]);
			}
		}
		return data;
	}

	public getShowKindList():number[]{
		//3 4 1 2 
		// --1门客组
		// --2红颜组
		// --3门客皮肤组
		// --4红颜皮肤组
		let list:number[] = [];
		let data = this.getEncountCfgByKind(3);
		if (data.length > 0){
			list.push(3);
		}
		data = this.getEncountCfgByKind(4);
		if (data.length > 0){
			list.push(4);
		}
		if (Api.switchVoApi.checkOpenQingyuanServantAndWifePage()){
			data = this.getEncountCfgByKind(1);
			if (data.length > 0 && this.checkShowServantFlag()){
				list.push(1);
			}

			data = this.getEncountCfgByKind(2);
			if (data.length > 0 && this.checkShowWifeFlag()){
				list.push(2);
			}
		}
		return list;
	}

	//获取门客特殊属性
	// --1帮会争霸攻击增加
	// --2雁门关攻击增加
	// --3本服擂台攻击增加
	// --4削藩平乱势力增加
	// --5跨服擂台攻击增加
	// --6绝地擂台攻击增加
	// --7定军中原兵力增加
	public getSpecialAddAttr(servantId:string|number, type:number):number{
		if (servantId && this.encounterVo.buff && this.encounterVo.buff.servant && this.encounterVo.buff.servant[servantId]){
			let info = this.encounterVo.buff.servant[servantId];
			if (info.special && info.special[type]){
				return info.special[type];
			}
		}
		return 0;
	}
	
	public dispose():void{
		super.dispose();
	}
}