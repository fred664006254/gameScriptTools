namespace Config
{   
	export namespace EmperoroutingCfg 
	{  
        export let lvNeed:number;
        export let lvNeed2:number;
        export let holdTimes:number;
        export let phrase:any;
        export let lastTime:number;
        export let popularity:number;
        export let cdTime:number;
        export let barrageTimes:number;
        export let getReward:string;
        export let bonusTimes:number;
        export let bonus:string;
        export let addPopularity:string;
        export let barrage:any;
        export let achievement1List:EmperorOutingItemCfg[];
        export let achievement2List:EmperorOutingItemCfg[];

        export function formatData(data:any):void{
            for (let key in data){
                this[key] = data[key];
                if (key == "achievement1"){
                    achievement1List = [];
                    for (let k in data[key]){
                        let item:EmperorOutingItemCfg = new EmperorOutingItemCfg();
                        item.initData(data[key][k]);
                        item.id = ""+(Number(k)+1);
                        item.sortId = Number(k)+1;
                        achievement1List.push(item);
                    }
                }
                else if (key == "achievement2"){
                    achievement2List = [];
                    for (let k in data[key]){
                        let item:EmperorOutingItemCfg = new EmperorOutingItemCfg();
                        item.initData(data[key][k]);
                        item.id = ""+(Number(k)+1);
                        item.sortId = Number(k) + 1;
                        achievement2List.push(item);
                    }
                }
            }
        }

        export function getAchievement1CfgList():EmperorOutingItemCfg[]{
            return achievement1List;
        }

        export function getAchievement2CfgList():EmperorOutingItemCfg[]{
            return achievement2List;
        }
    }

    export class EmperorOutingItemCfg extends BaseItemCfg{
        public needPopularity:number;
        public getReward:string;
        public id:string;
        public sortId:number;
    }
}