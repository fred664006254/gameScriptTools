namespace Config
{
	export namespace ServantequiplCfg 
	{
        export let rankList:{[key:string]:{equipLvLimit:number,breakRankExp:number,upLv:number,attType?:number,value?:number}}={};
        let equipItem:{[key:string]:{[idx:string]:{itemId:number,getExp:number}}}={};
		let lv:{[key:string]:{[idx:string]:{equipmentExp:number,value:number}}}={};
		let costExp:{[key:string]:number}={};
		let maxQuality:number;
		export function formatData(data:any):void
		{
            rankList = data.rankList;
            equipItem = data.equipItem;
			lv = data.lv;
			initcostExp();
			let qulaitys = Object.keys(rankList);
			qulaitys.sort((a,b)=>{return Number(b)-Number(a)});
			maxQuality=Number(qulaitys[0]);
		}
		
		export function getMaxQuality():number
		{
			return maxQuality;
		}
        
        export function getEquipAddvalue(equipId : number, equipQuality : number, level : number, iscal?:boolean):number{
			let num = 0;
			if(equipQuality == 1 && level == 0){
				return num;
			}
            if(equipQuality == 6){
                equipQuality = 5;
                level = rankList[equipQuality].equipLvLimit;
            }
            if(lv && lv[equipQuality] && lv[equipQuality]){
				if(level == 0){
					num = lv[equipQuality-1][rankList[equipQuality-1].equipLvLimit].value;
				}
				else{
					num = lv[equipQuality][level].value;
				}
			}
			if(iscal){
				for(let i = 2; i <= equipQuality; ++ i){
					if(rankList[i].attType == 1){
						num += rankList[i].value;
					}
					else if(rankList[i].attType == 2){
						num *= (1+rankList[i].value);
					}
				}
			}
            return num;
        }

        export function getNextNeedEquipExp(equipQuality : number, level : number):number{
			let num = 0;
			// if(level == 0){
			// 	-- equipQuality;
			// }
            if(lv && lv[equipQuality]){
				let len = Object.keys(lv[equipQuality]).length;
				if(level > 0 && level <= len){
					num = lv[equipQuality][level].equipmentExp;
				}
				else{
					num = rankList[equipQuality].breakRankExp;
				}
			}

            return num;
		}

		export function getUpLv(equipQuality : number):number
		{
			return rankList[equipQuality].upLv;
		}
		
		/**
		 * 升级到指定等级需要吃的经验
		 * @param equipQuality 品质
		 * @param fromLv 初始等级
		 * @param toLv 目标等级
		 */
		export function getLvupNeedEquipExp(equipQuality:number,fromLv:number,toLv:number):number{
			let num = 0;
			if(lv && lv[equipQuality])
			{
				for(let i = fromLv+1; i <= toLv; i++)
				{
					if(lv[equipQuality][i])
					{
						num += lv[equipQuality][i].equipmentExp;
					}
				}
				if(fromLv==getEquipQualityMaxLv(equipQuality))
				{
					num+=getEquipQualityBreakExp(equipQuality);
				}
			}
            return num;
		}

		/**
		 * 获取当前等级距离进阶还可以吃多少经验
		 * @param equipQuality 当前品质
		 * @param curlv 当前等级
		 */
		export function getNextQualityCostExp(equipQuality : number, curlv : number,curExp:number):number{
			let num = 0-curExp;
			let maxLv=getEquipQualityMaxLv(equipQuality);
			if(curlv<maxLv)
			{
				num+=getLvupNeedEquipExp(equipQuality,curlv,maxLv);
			}
			
			num+=getEquipQualityBreakExp(equipQuality);
            return Math.max(0,num);
		}

		/**
		 * 获取装备突破这一次要用的经验
		 * @param equipQuality 
		 */
		export function getEquipQualityBreakExp(equipQuality : number):number{
            let num = 0;
            if(rankList && rankList[equipQuality]){
                num = rankList[equipQuality].breakRankExp||0;
            }
            return num;
        }

        export function getEquipQualityMaxLv(equipQuality : number):number{
            let num = 0;
            if(rankList && rankList[equipQuality]){
                num = rankList[equipQuality].equipLvLimit;
            }
            return num;
        }

		export function getCostEquipAddExp(id : string):number{
			let num = 0;
			if(costExp && costExp[id]){
				num = costExp[id];
			}
            return num;
		}
		
		function initcostExp():void{
			for(let j in equipItem){
				let equipId = j;
				for(let i in equipItem[equipId]){
					let unit = equipItem[equipId][i];
					costExp[unit.itemId] = unit.getExp;
				}
			}
		}

		/**
		 * 根据装备ID获取升级需要消耗的道具
		 * @param equipId 装备ID
		 * @param itemQulaity 道具品质
		 */
        export function getCostEquipItem(equipId : number, itemQulaity? : number):{item : string, exp : number}[]{
			let arr = [];
			if(itemQulaity){
				let unit =  equipItem[equipId][itemQulaity];
				if(Api.itemVoApi.getItemNumInfoVoById(unit.itemId)){
					arr.push({
						item : unit.itemId,
						exp : unit.getExp
					});
				}
				
			}
			else{
				for(let i in equipItem[equipId]){
					let unit = equipItem[equipId][i];
					if(Api.itemVoApi.getItemNumInfoVoById(unit.itemId)){
						arr.push({
							item : unit.itemId,
							exp : unit.getExp
						});
					}
				}
			}
            return arr;
		}

		/**
		 * 根据装备ID获取所有道具品质列表
		 * @param equipId 
		 */
		export function getEquipItemsQulaityListByEid(equipId:number):string[]
		{
			return Object.keys(equipItem[equipId]);
		}

		/**
		 * 获取装备ID列表
		 */
		export function getEquipItemsIdList():string[]
		{
			return Object.keys(equipItem).sort((a,b)=>{return Number(a)-Number(b)});
		}

		/**
		 * 根据装备ID和品质获取需要的道具信息
		 * @param equipId 
		 * @param qulaity 
		 */
		export function getEquipItemData(equipId:number,qulaity : number):{itemId: number,getExp: number}
		{
			return equipItem[equipId][qulaity];
		}
		
		export function calExpProgress(totalexp : number, qulaity : number, curlv : number):{toLv:number,leftExp:number,maxLvAndQuality:boolean}{
			let cfg = lv[qulaity];
			let maxLv = getEquipQualityMaxLv(qulaity);
			let maxQuality=getMaxQuality();
			let toLv=curlv;
			let maxLvAndQuality=false;
			if(curlv == maxLv)
			{
				if(qulaity==maxQuality)
				{
					maxLvAndQuality=true;
				}
			}
			else
			{
				for(let i = curlv+1; i <= maxLv; ++ i)
				{
					if(cfg[i].equipmentExp <= totalexp)
					{
						totalexp -= cfg[i].equipmentExp;
						toLv=i;
					}
					else
					{
						break;
					}
				}
				if(toLv==maxLv&&qulaity==maxQuality)
				{
					maxLvAndQuality=true;
				}
			}
			return {
				toLv:toLv,
				leftExp:Math.max(0,totalexp),
				maxLvAndQuality:maxLvAndQuality
			};
		}
	}


	// class ServantskillItemCfg extends BaseItemCfg
	// {
	// 	/**
	// 	 * 门客皮肤技能
	// 	 */
	// 	public id:string;
	// 	/**
	// 	 * 光环["triggerType"]=2,
    //             ["percent"]=50,
    //             ["effectType"]=1,
    //             ["value"]=0.4,
    //             ["turn"]=1,
    //             ["maxNum"]=1,
    //             ----triggerType     触发类型
	// 			----1     开场触发
	// 			----2     攻击触发
	// 			----3     击败触发
	// 			----effectType     加成类型
	// 			----1     增加攻击力
	// 			----2     增加暴击率
	// 			----3     增加暴击伤害
	// 			----4     增加分裂攻击状态
	// 			----5     击杀加攻击
	// 			----105     单体伤害(对应目标)
	// 			----106     群体伤害(所有目标)
	// 			----107     随机目标伤害
	// 			----addType     加成目标类型
	// 			----1     自己
	// 			----2     敌人
	// 			----3     随机己方
	// 			----4     随机敌方
	// 			----atkNum     随机目标数
	// 			----atkscale     攻击比例
	// 			----addNum     添加数量
	// 			----value     加成效果
	// 			----turn     持续回合
	// 			----maxNum     最大叠加次数
	// 			----criRemove      暴击移除标记
	// 			----inherit     继承
	// 	 */
	// 	public effect:{triggerType:number,effectType:number,percent:number,value:number,turn:number,maxNum:number,addType:number,atkNum:number,atkscale:number,addNum:number,criRemove:number,inherit:number}[];

	// 	public getDescStr():string{
	// 		let str = '';
	// 		//触发方式

	// 		for(let i = 0; i < this.effect.length; ++ i){
	// 			let unit = this.effect[i];
	// 			if(unit.triggerType){
	// 				str += `${LanguageManager.getlocal(`servantSkillDesc_Special_triggerType${unit.triggerType}`, [unit.percent+''])}，`;
	// 			}
	// 			if(unit.effectType){
	// 				let arr = [];

	// 				if(unit.addType){
	// 					let str =  LanguageManager.getlocal(`servantSkillDesc_Special_addType${unit.addType}`, [unit.addNum+''])
	// 					arr.push(str)
	// 				}

	// 				if(unit.atkNum){
	// 					arr.push(unit.atkNum+``);
	// 				}

	// 				let value = '';
	// 				if(unit.atkscale){
	// 					value = unit.atkscale < 1 ? (unit.atkscale*100).toFixed(0) : unit.atkscale.toString();
	// 				}
	// 				else if(unit.value){
	// 					value = unit.value < 1 ? (unit.value*100).toFixed(0) : unit.value.toString();
	// 				}
	// 				arr.push(value);
	// 				str += `${LanguageManager.getlocal(`servantSkillDesc_Special_effectType${unit.effectType}`, arr)}，`
	// 			}
	// 			if(unit.maxNum){
	// 				str += `${LanguageManager.getlocal(`servantSkillDesc_Special_maxNum${unit.maxNum == 1 ? 1 : 2}`, [unit.maxNum+''])}，`
	// 			}
	// 			if(unit.turn){
	// 				str += `${LanguageManager.getlocal(`servantSkillDesc_Special_turn`, [unit.turn+''])}，`;
	// 			}
	// 			str = str.substring(0,str.length-1) + `\n`
	// 		}
	// 		return str;
	// 	}
	// }

}