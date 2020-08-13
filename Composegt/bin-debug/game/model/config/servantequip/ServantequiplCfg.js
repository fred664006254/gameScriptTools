var Config;
(function (Config) {
    var ServantequiplCfg;
    (function (ServantequiplCfg) {
        ServantequiplCfg.rankList = {};
        var equipItem = {};
        var lv = {};
        var costExp = {};
        function formatData(data) {
            ServantequiplCfg.rankList = data.rankList;
            equipItem = data.equipItem;
            lv = data.lv;
            initcostExp();
        }
        ServantequiplCfg.formatData = formatData;
        function getEquipAddvalue(equipId, equipQuality, level, iscal) {
            var num = 0;
            if (equipQuality == 1 && level == 0) {
                return num;
            }
            if (equipQuality == 6) {
                equipQuality = 5;
                level = ServantequiplCfg.rankList[equipQuality].equipLvLimit;
            }
            if (lv && lv[equipQuality] && lv[equipQuality]) {
                if (level == 0) {
                    num = lv[equipQuality - 1][ServantequiplCfg.rankList[equipQuality - 1].equipLvLimit].value;
                }
                else {
                    num = lv[equipQuality][level].value;
                }
            }
            if (iscal) {
                for (var i = 2; i <= equipQuality; ++i) {
                    if (ServantequiplCfg.rankList[i].attType == 1) {
                        num += ServantequiplCfg.rankList[i].value;
                    }
                    else if (ServantequiplCfg.rankList[i].attType == 2) {
                        num *= (1 + ServantequiplCfg.rankList[i].value);
                    }
                }
            }
            return num;
        }
        ServantequiplCfg.getEquipAddvalue = getEquipAddvalue;
        function getNextNeedValue(equipQuality, level) {
            var num = 0;
            if (level == 0) {
                --equipQuality;
            }
            if (lv && lv[equipQuality]) {
                var len = Object.keys(lv[equipQuality]).length;
                if (level > 0 && level <= len) {
                    num = lv[equipQuality][level].value;
                }
                else {
                    num = ServantequiplCfg.rankList[equipQuality].breakRankExp;
                }
            }
            return num;
        }
        ServantequiplCfg.getNextNeedValue = getNextNeedValue;
        function getTotalNeedExp(sid, equipId, equipQuality, level) {
            var num = 0;
            var curlv = Api.servantVoApi.getEquipAddLv(sid, equipId);
            if (level < 0) {
                equipQuality > 1 ? equipQuality-- : 0;
                level = ServantequiplCfg.rankList[equipQuality].equipLvLimit;
                //num +=  rankList[equipQuality].breakRankExp;
            }
            if (lv && lv[equipQuality]) {
                for (var i = curlv + 1; i <= level; ++i) {
                    if (lv[equipQuality][i]) {
                        num += lv[equipQuality][i].equipmentExp;
                    }
                }
            }
            return num;
        }
        ServantequiplCfg.getTotalNeedExp = getTotalNeedExp;
        function getEquipQualityBreakExp(equipQuality) {
            var num = 0;
            if (ServantequiplCfg.rankList && ServantequiplCfg.rankList[equipQuality]) {
                num = ServantequiplCfg.rankList[equipQuality].breakRankExp;
            }
            return num;
        }
        ServantequiplCfg.getEquipQualityBreakExp = getEquipQualityBreakExp;
        function getEquipQualityMaxLv(equipQuality) {
            var num = 0;
            if (ServantequiplCfg.rankList && ServantequiplCfg.rankList[equipQuality]) {
                num = ServantequiplCfg.rankList[equipQuality].equipLvLimit;
            }
            return num;
        }
        ServantequiplCfg.getEquipQualityMaxLv = getEquipQualityMaxLv;
        function getCostEquipAddExp(id) {
            var num = 0;
            if (costExp && costExp[id]) {
                num = costExp[id];
            }
            return num;
        }
        ServantequiplCfg.getCostEquipAddExp = getCostEquipAddExp;
        function initcostExp() {
            for (var j in equipItem) {
                var equipId = j;
                for (var i in equipItem[equipId]) {
                    var unit = equipItem[equipId][i];
                    costExp[unit.itemId] = unit.getExp;
                }
            }
        }
        function getCostEquipItem(equipId, qulaity) {
            var arr = [];
            if (qulaity) {
                var unit = equipItem[equipId][qulaity];
                if (Api.itemVoApi.getItemNumInfoVoById(unit.itemId)) {
                    arr.push({
                        item: unit.itemId,
                        exp: unit.getExp
                    });
                }
            }
            else {
                for (var i in equipItem[equipId]) {
                    var unit = equipItem[equipId][i];
                    if (Api.itemVoApi.getItemNumInfoVoById(unit.itemId)) {
                        arr.push({
                            item: unit.itemId,
                            exp: unit.getExp
                        });
                    }
                }
            }
            return arr;
        }
        ServantequiplCfg.getCostEquipItem = getCostEquipItem;
        function calExpProgress(totalexp, equipId, qulaity, curlv) {
            var cfg = lv[qulaity];
            var len = Object.keys(cfg).length;
            var nextlv = 1;
            var broke = false;
            var nextquality = qulaity;
            if (curlv == len) {
                nextlv = 0;
                nextquality = qulaity + 1;
                broke = true;
                //totalexp >=(rankList[qulaity].breakRankExp
            }
            else {
                for (var i = curlv + 1; i <= len; ++i) {
                    if (cfg[i].equipmentExp <= totalexp) {
                        totalexp -= cfg[i].equipmentExp;
                        nextlv = (i + 1);
                        broke = i == len; //&& totalexp >=(rankList[qulaity].breakRankExp);
                    }
                    else {
                        nextlv = i;
                        break;
                    }
                }
                nextquality = broke ? (qulaity + 1) : qulaity;
            }
            nextlv = broke ? 0 : nextlv;
            return {
                nextquality: nextquality,
                nextlv: nextlv,
                isBroke: broke
            };
        }
        ServantequiplCfg.calExpProgress = calExpProgress;
    })(ServantequiplCfg = Config.ServantequiplCfg || (Config.ServantequiplCfg = {}));
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
})(Config || (Config = {}));
