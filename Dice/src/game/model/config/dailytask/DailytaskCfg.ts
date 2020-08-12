namespace Config{

    export namespace DailytaskCfg{
        let mustTasks:any = {};
        let randomTasks:any = {};

        export function formatData(data: any){
            if(!data) return;

            for (const key in data.mustTask) {
                let item:MustTaskCfg;
                if(!mustTasks.hasOwnProperty(String(key))){
                    mustTasks[String(key)] = new MustTaskCfg();
                }
                item = mustTasks[String(key)];
                item.initData(data.mustTask[key]);
                item.id = String(key);
            }
            for (const key in data.randomTask) {
                let item:RandomTaskCfg;
                if(!randomTasks.hasOwnProperty(String(key))){
                    randomTasks[String(key)] = new RandomTaskCfg();
                }
                item = randomTasks[String(key)];
                item.initData(data.randomTask[key]);
                item.id = String(key);
            }
        }

        export function getMustTaskByID(taskID):MustTaskCfg{
            return mustTasks[taskID];
        }

        export function getMustTaskGold(taskID):number{
            let num = 0;
            if (Api.UserinfoVoApi.getLevel() >= mustTasks[taskID].gold.length){
                num = mustTasks[taskID].gold[mustTasks[taskID].gold.length - 1];
            } else if (Api.UserinfoVoApi.getLevel() <= 1 ){
                num = mustTasks[taskID].gold[0];
            } else {
                num = mustTasks[taskID].gold[Api.UserinfoVoApi.getLevel() - 1];
            }
            return num;
        }

        export function getMustTaskGem(taskID):number{
            let num = 0;
            if (Api.UserinfoVoApi.getLevel() >= mustTasks[taskID].gem.length){
                num = mustTasks[taskID].gem[mustTasks[taskID].gem.length - 1];
            } else if (Api.UserinfoVoApi.getLevel() <= 1 ){
                num = mustTasks[taskID].gem[0];
            } else {
                num = mustTasks[taskID].gem[Api.UserinfoVoApi.getLevel() - 1];
            }
            return num;
        }

        export function getMustTaskCard(taskID):number{
            let num = 0;
            if (Api.UserinfoVoApi.getLevel() >= mustTasks[taskID].card1Num.length){
                num = mustTasks[taskID].card1Num[mustTasks[taskID].card1Num.length - 1];
            } else if (Api.UserinfoVoApi.getLevel() <= 1 ){
                num = mustTasks[taskID].card1Num[0];
            } else {
                num = mustTasks[taskID].card1Num[Api.UserinfoVoApi.getLevel() - 1];
            }
            return num;
        }

        export function getMustTaskReward(taskID, rewardID){
            switch (rewardID) {
                case 0:
                    return getMustTaskGold(taskID);              
                case 1:
                    return getMustTaskGem(taskID);
                case 2:
                    return getMustTaskCard(taskID);
                default:
                    break;
            }
        }

        export function getRandomTaskByID(taskID):RandomTaskCfg{
            return randomTasks[taskID];
        }

        export function getRandomTaskGoldByID(taskID){
            let level = Api.UserinfoVoApi.getLevel();
            return randomTasks[taskID].gold[level] ? randomTasks[taskID].gold[level] : 0;
        }
        export function getRandomTaskGemByID(taskID){
            let level = Api.UserinfoVoApi.getLevel();
            return randomTasks[taskID].gem[level] ? randomTasks[taskID].gem[level] : 0;
        }
    }
    /**
     * 每日刷新任务
     */
    export class MustTaskCfg extends BaseItemCfg {
        /**
         * 每日任务的金币奖励，这个跟等级有关系
         */
        public gold:number[] = [];
        /**
         * 每日任务的砖石奖励，跟等级有关系
         */
        public gem:number[] = [];
        /**
         * 每日任务的卡牌建立，跟等级有关系
         */
        public card1Num:number[] = [];
        /**
         * 任务的id
         */
        public id:string;
    }

    export class RandomTaskCfg extends BaseItemCfg {
        /**
         * 任务 ID
         */
        public id:string = '';
        /**
         * 任务权重
         */
        private weight:number = 0;
        /**
         * 任务类型
         */
        public taskType:string = '';
        /**
         * 任务值
         */
        public value:number = 0;
        /**
         * 任务额外参数 1
         */
        public need1:number = 0;
        /**
         * 任务额外参数 2
         */
        public need2:number = 0;
        /**
         * 任务金币奖励，跟等级相关
         */
        public gold:number[];
        /**
         * 任务砖石奖励，跟等级相关
         */
        public gem:number[];

        /**
         * 获取等级对应的金币
         */
        get lvgold (){
            let level = Api.UserinfoVoApi.getLevel();
            let g = 0;
            if(level < 0){
                g = 0;
            } else if (level > this.gold.length) {
                g = this.gold[this.gold.length - 1];
            } else {
                g = this.gold[level - 1];
            }
            return !g ? 0 : g;
        }
        /**
         * 获取等级对应的钻石
         */
        get lvgem () {
            let level = Api.UserinfoVoApi.getLevel();
            if(level < 0){
                return 0;
            } else if (level >= this.gold.length) {
                return !this.gem[this.gem.length - 1] ? 0 : this.gem[this.gem.length - 1];
            } else {
                return !this.gem[level - 1] ? 0 : this.gem[level -1];
            }
        }

        get rewardStr(){
            return `2_1_${this.lvgold}|1_1_${this.lvgem}`
        }

        public dispose(){
            this.gem = [];
            this.gold = [];
            this.id = '';
            this.need1 = 0;
            this.need2 = 0;
            this.taskType = '';
            this.value = 0;
            this.weight = 0;
        }
    }
}