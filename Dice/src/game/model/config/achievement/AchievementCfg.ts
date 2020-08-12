namespace Config{
    export namespace AchievementCfg{

        let achievementMap:any = {}

        export function formatData(data: any){
            let achievementList = data.achievementList;
            if(!achievementList){
                return;
            }

            for (const key1 in achievementList) {
                if (achievementList.hasOwnProperty(key1)) {
                    const item = achievementList[key1];
                    if(!achievementMap[key1]){
                        achievementMap[key1] = {}
                    }
                    for (const key2 in item) {
                        if (item.hasOwnProperty(key2)) {
                            const item2 = item[key2];
                            let acItem:AchievementItemCfg = new AchievementItemCfg();
                            acItem.initData(item2);
                            achievementMap[key1][key2] = acItem;
                        }
                    }
                }
            }
            
        }

        export function getAchievement(){
            return achievementMap;
        }

        export function getAchieveKeys(){
            let keys = Object.keys(achievementMap);
            return keys;
        }

        export function getAchieveTitle(type:string){
            let item = achievementMap[type];
            if(!item){
                return "配置错误";
            }
            let stage = Api.AchievementVoApi.getStageByID(type);
            let data = <AchievementItemCfg>item[stage];
            let des:string = ``;
            des = LangMger.getlocal(`achievementtitle${data.type}`, [String(data.value), String(data.Need1)]);
            return des;
        }

        export function getAchItemCfgByID(id:number|string, stage:number|string):AchievementItemCfg{
            let cfg = achievementMap[id][stage];
            return cfg;
        }
    }

    export class AchievementItemCfg extends BaseItemCfg {
        public type: number = 0;
        public value: number = 0;
        public need1: number = 0;
        public getReward: string = "";

        public initData(data:any){
            if(data){
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];
                    }
                }
            }
        }

        public dispose () {
            this.type = 0;
            this.value = 0;
            this.need1 = 0;
            this.getReward = ``;
            super.dispose();
        }

        public get Need1(){
            if(this.type === 2002){
                return LangMger.getlocal(`bridtype${this.need1}`);
            } else {
                return this.need1;
            }
        }
    }
}