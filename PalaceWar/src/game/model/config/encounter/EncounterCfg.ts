

namespace Config {

	/**
	 * 情缘绘卷配置
	 */
	export namespace EncounterCfg{	
        export let encounterList:EncounterInfoCfg[] = [];
        export let needLv1:number = 0;
        export let needLv2:number = 0;
        export function formatData(data:any):void{
            // for(let i in data){
            //     encounterList.push(data[i]);
            // }
            let idx = 0;
			for(let i in data){
                this[i] = data[i];
                let itemCfg:EncounterInfoCfg;
                if(!encounterList.hasOwnProperty(String(idx)))
				{
					encounterList[String(idx)] = new EncounterInfoCfg();
				}
				itemCfg = encounterList[String(idx)];
                itemCfg.id = idx + 1;
                itemCfg.need = data[i].need;
                itemCfg.kind = data[i].kind;
                itemCfg.turn = data[i].turn;
                itemCfg.coordinateOutside = {};
                for(let j in data[i][`coordinate-Outside`]){
                    let unit = data[i][`coordinate-Outside`][j].split(',');
                    let needid = data[i].need[j];
                    let id = needid.split(`_`)[1];
                    itemCfg.coordinateOutside[id] = {
                        x : Number(unit[0]),
                        y : Number(unit[1]),
                    }
                }
                itemCfg.coordinateInside = {};
                for(let j in data[i][`coordinate-Inside`]){
                    let unit = data[i][`coordinate-Inside`][j].split(',');
                    let needid = data[i].need[j];
                    let id = needid.split(`_`)[1];
                    itemCfg.coordinateInside[id] = {
                        x : Number(unit[0]),
                        y : Number(unit[1]),
                    }
                }
                itemCfg.coordinateName = {};
                for(let j in data[i][`coordinate-Name`]){
                    let unit = data[i][`coordinate-Name`][j].split(',');
                    let needid = data[i].need[j];
                    let id = needid.split(`_`)[1];
                    itemCfg.coordinateName[id] = {
                        x : Number(unit[0]),
                        y : Number(unit[1]),
                    }
                }
                itemCfg.unlock = {};
                for(let j in data[i][`unlock`]){
                    let unit = data[i][`unlock`][j].split(',');
                    let needid = data[i].need[j];
                    let id = needid.split(`_`)[1];
                    itemCfg.unlock[id] = {
                        x : Number(unit[0]),
                        y : Number(unit[1]),
                    }
                }

                itemCfg.add = [];
                itemCfg.type = i;

                let taskIndex = 0;
                let taskTmp = data[i][taskIndex+1];
                itemCfg.process = [];
                itemCfg.collect = [];
                itemCfg.task = [];
                let taskCount:number = 0;
                let collectCount:number = 0;
                while (taskTmp){
                    let encounterTaskItem = new EncounterTaskItemCfg();
                    encounterTaskItem.initData(taskTmp);
                    encounterTaskItem.id = taskIndex+1;
                    for (let kk in taskTmp){
                        if (taskTmp.type == 0 && kk != "type" && kk != "reward" && kk != "all_Child" && kk != "task_Value"){
                            let addCfg = new EncounterAddCfg();
                            addCfg.initData(taskTmp[kk]);
                            addCfg.id = kk;
                            encounterTaskItem.data.push(addCfg);
                        }
                        else{
                            if (taskTmp.type > 0 && kk != "type" && kk != "reward" && kk != "task_Value"){
                                let addCfg = new EncounterAddCfg();
                                addCfg.initData(taskTmp[kk]);
                                addCfg.id = kk;
                                encounterTaskItem.data.push(addCfg);
                            }
                        }
                    }
                    itemCfg.process.push(encounterTaskItem);
                    if (encounterTaskItem.type > 0){
                        taskCount++;
                        encounterTaskItem.index = taskCount;
                        itemCfg.task.push(encounterTaskItem);
                    }
                    else{
                        collectCount++;
                        encounterTaskItem.index = collectCount;
                        itemCfg.collect.push(encounterTaskItem);
                    }
                    taskIndex ++;
                    taskTmp = data[i][taskIndex+1];
                }

                for(let j in data[i]){
                    let unit = data[i][j];
                    if(j != `need`){
                        let servantinfocfg = new EncounterServantInfoCfg();
                        servantinfocfg.initData(unit); 
                        servantinfocfg.addattr = {};
                        for(let k in unit){
                            if(k != `all_Child` && k != `reward`){
                                let sid = k;              
                                let tmp = unit[k];
                                let encounterAdd = new EncounterAddCfg();
                                encounterAdd.initData(tmp);
                                servantinfocfg.addattr[k] = encounterAdd;                     
                            }
                        }
                        itemCfg.add.push(servantinfocfg);
                    }
                }
                ++ idx;
            }
        }

        export function getEncountCfgByKind(kind:number):EncounterInfoCfg[]{
            let data:EncounterInfoCfg[] = [];
            for (let k in this.encounterList){
                let cfg = this.encounterList[k];
                if (cfg.kind == kind){
                    data.push(cfg);
                }
            }
            if (data.length > 1){
                data.sort((a, b)=>{return a.turn - b.turn});
            }
            return data;
        }
        
        export class EncounterInfoCfg extends BaseItemCfg{
            public id:number;
            public type:string;
            /**
             * basic 要求人数 need []
             */
            public need:string[]=[];
            /**
             * 坐标配置
             */
            public coordinateOutside:any={};
            public coordinateInside:any={};
            public coordinateName:any={};
            public unlock:any={};
            /**
             * 加成信息
            */
            public add : EncounterServantInfoCfg[] = [];

            /**
             * 类型 --kind:情缘类型
            --1门客组
            --2红颜组
            --3门客皮肤组
            --4红颜皮肤组
             */
            public kind:number;

            /**
             * 进度
             */
            public process:EncounterTaskItemCfg[] = [];
            //收集
            public collect:EncounterTaskItemCfg[] = [];
            //养成任务
            public task:EncounterTaskItemCfg[] = [];
            public collectOpen:boolean = false;
            public taskOpen:boolean = false;
            //选中的id
            public tabIndex:number = 1;
            //排序id
            public turn:number = 0;
        }

        export class EncounterTaskItemCfg extends BaseItemCfg{
            public id:number;
            public sortId:number;
            public data:any[] = [];
            public reward:string=null;
            public type:number = 0;
            public task_Value:number = 0;
            public all_Child:number = 0;
            public index:number = 0;
        }

        export class EncounterServantInfoCfg extends BaseItemCfg{
            /**
             * 加成信息
            */
            public addattr:any = {};
            public all_Child : number = 0;
            public reward : string = ``;
        }

        // --need:需求
        // --strength:武力百分比
        // --intelligence:智力百分比
        // --politics:政治百分比
        // --charm:魅力百分比
        // --all:全属性百分比
        // --strength_Constant:武力固定值
        // --intelligence_Constant:智力固定值
        // --politics_Constant:政治固定值
        // --charm_Constant:魅力固定值
        // --all_Constant:全属性固定值
        // --wife_Intimacy :红颜亲密度固定值
        // --wife_Charm:红颜魅力固定值
        // --wife_exp:红颜经验加成百分比
        // --wife_Child:对应红颜子嗣属性加成百分比
        // --all_Child:所有子嗣属性加成百分比
        // --getReward:奖励道具
        //task_Value:情缘任务需求值
        //type:组内id类型
        //--specialType:特殊属性增加
        //--specialValue:特殊属性的增加值

        export class EncounterAddCfg extends BaseItemCfg{
            public strength:number=0;
            public intelligence:number=0;
            public politics:number=0;
            public charm:number=0;
            public all:number=0;
            public strength_Constant:number=0;
            public intelligence_Constant:number=0;
            public politics_Constant:number=0;
            public charm_Constant:number=0;
            public all_Constant:number=0;
            public wife_Intimacy:number=0;
            public wife_Charm:number=0;
            public wife_exp:number=0;
            public wife_Child:number=0;
            public type:number=0;
            public task_Value:number=0;
            public specialValue:number=0;
            public specialType:number=0;
            public id:string=null;
        }
    }
}