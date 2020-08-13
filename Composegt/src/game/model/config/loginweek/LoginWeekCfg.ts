namespace Config {
    /** 
     * 新官上任配置
     * @author 赵占涛
     */
    export class LoginWeekCfg {
        /** 阶段奖励 */
        public totalScoreReward: { [key: string]: { needScore: number, reward: string } };
        /** 每日任务 */
        public dailyTask: { [key: string]: { [key:string]:{questType:string,value:number,getScore:number,openType:string,reward:string} } };

        //解析数据
        public formatData(data: any): void {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    this[key] = data[key];
                }
            }
        }
    }
}