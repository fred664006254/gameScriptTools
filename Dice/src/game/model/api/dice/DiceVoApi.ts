namespace Api{
    export namespace DiceVoApi{

        let diceVo:DiceVo;
        let oldDiceInfo={};
        let addDiceInfo={};
        let newGetDiceInfo = {}
        export let needfreshDice = false;
        export function formatData(data:any):void{
            if(!diceVo){
                diceVo=new DiceVo();
                oldDiceInfo = data.info;
            }
            diceVo.initData(data);
            newGetDiceInfo = {};
            for(let i in diceVo.info){
                if(!oldDiceInfo[i]){
                    addDiceInfo[i]=1;
                    newGetDiceInfo[i] = 1;
                }
            }
            oldDiceInfo = diceVo.info;
		}
		export function dispose():void{
            if(diceVo){
				diceVo.dispose();
				diceVo = null;
            }
            oldDiceInfo = null;
            addDiceInfo = null;
            newGetDiceInfo = null;
            needfreshDice = false;
        }

        //是否是新获得的
        export function isNewGet(id : string):boolean{
            let flag = false;
            if(addDiceInfo && addDiceInfo[id]){
				flag = true;
            }
            return flag;
        }
        export function notOld(id:string){
            let flag = false;
            if(newGetDiceInfo && newGetDiceInfo[id]){
                flag = true;
            }
            return flag;
        }

        export function getNewGetNum():number{
            let num = 0;
            if(addDiceInfo){
				num = Object.keys(addDiceInfo).length;
            }
            return num;
        }

        export function deleteNew(id : string):void{
            if(addDiceInfo && addDiceInfo[id]){
				delete addDiceInfo[id];
            }
        }

        //获取骰子总类型多少种
        export function getDiceTotalType():number{
            let num = 0;
            if(diceVo && diceVo.info){
				num = Object.keys(diceVo.info).length;
            }
            return num;
        }

        //获取骰子暴击伤害加成比
        export function getDiceCrit():number{
            let num = 0;
            if(diceVo && diceVo.crivalue){
				num = diceVo.crivalue;
            }
            return num;
        }

        //获取已有骰子信息
        export function getDiceInfoList():string[]{
            let arr = [];
            if(diceVo && diceVo.info){
				for(let i in diceVo.info){
                    arr.push(i);
                }
            }
            return arr.concat(this.getNotGetDiceInfoList());
        }

        //获取未获得骰子信息
        export function getNotGetDiceInfoList():string[]{
            let dicelist = Config.DiceCfg.getDiceList();
            let arr = [];
            for(let i in dicelist){
                let diceid = dicelist[i];
                if(!Api.DiceVoApi.isHaveDiceById(diceid)){
                    arr.push(diceid);
                }
            }
            return arr;
        }
        //获取骰子等级
        export function getDiceLvById(id : string):number{
            let level = 1;
            if(diceVo && diceVo.info && diceVo.info[id] && diceVo.info[id].lv){
				level = diceVo.info[id].lv;
            }
            else{
                let cfg = Config.DiceCfg.getCfgById(id);
                level = cfg.iniGrade;
            }
            return level;
        }
        //是否有某个骰子
        export function isHaveDiceById(id : string):boolean{
            let flag = false;
            if(diceVo && diceVo.info && diceVo.info[id]){
				flag = true;
            }
            return flag;
        }
        //某个骰子数量 有可能是0
        export function getDiceNumById(id : string):number{
            let num = 0;
            if(diceVo && diceVo.info && diceVo.info[id] && diceVo.info[id].num){
                num = diceVo.info[id].num;
            }
            return num;
        }
        //获取当前可升级的骰子数
        export function getDiceCanLevelUpNum():number{
            let total = 0;
            if(diceVo && diceVo.info){
                for(let i in diceVo.info){
                    let unit = diceVo.info[i];
                    let num = unit.num;
                    let lv = unit.lv;
                    let cfg = Config.DiceCfg.getCfgById(i);
                    let needNum = cfg.getNextLvCostNumByLv(lv + 1);
                    if(needNum && num >= needNum && lv < cfg.maxGrade){
                        ++ total;
                    }
                }
            }
            return total;
        }

    }
}