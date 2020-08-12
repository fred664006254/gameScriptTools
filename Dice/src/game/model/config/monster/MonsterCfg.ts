namespace Config{
    export namespace MonsterCfg{
        let bossList = {};
        let monsterList = [];
        export function formatData(data: any){
            for(let key in data.bossList){
                if(data.bossList.hasOwnProperty(key))
                {
                    let bossData=data.bossList[key];
                    let bossItem=new BossItemCfg();
                    bossItem.initData(bossData);
                    bossItem.id=key;
                    bossList[key]=bossItem;
                }
            }
        }

        export function getBossNum(){
            return Object.keys(bossList).length;
        }

        export function getBossKeys(){
            return Object.keys(bossList);
        }

        export function getBossCfgById(key:string):BossItemCfg{
            return bossList[key];
        }
    }
    export class BossItemCfg extends MonsterItemCfg
    {
        public parameter:number[];
        public id:string;
    }
}