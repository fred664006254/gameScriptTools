namespace Config
{   
	export namespace EmperorachieveCfg 
	{  
        export let king1List:EmperorAchieveItemCfg[] = [];
        export let king2List:EmperorAchieveItemCfg[] = [];

        export function formatData(data:any):void{
            for (let key in data){
                this[key] = data[key];
                if (key == "king1"){
                    king1List = [];
                    for (let k in data[key]){
                        let item:EmperorAchieveItemCfg = new EmperorAchieveItemCfg();
                        item.initData(data[key][k]);
                        item.id = k;
                        item.sortId = Number(k);
                        king1List.push(item);
                    }
                }
                else if (key == "king2"){
                    king2List = [];
                    for (let k in data[key]){
                        let item:EmperorAchieveItemCfg = new EmperorAchieveItemCfg();
                        item.initData(data[key][k]);
                        item.id = k;
                        item.sortId = Number(k);
                        king2List.push(item);
                    }
                }
            }
        }

        export function getKing1CfgList():EmperorAchieveItemCfg[]{
            return king1List;
        }

        export function getKing2CfgList():EmperorAchieveItemCfg[]{
            return king2List;
        }

        export class EmperorAchieveItemCfg extends BaseItemCfg{
            public needNum:number;
            public servantSkinId:string;
            public getReward:string;
            public unlock:number;
            public id:string;
            public sortId:number;
        }
    }    
}