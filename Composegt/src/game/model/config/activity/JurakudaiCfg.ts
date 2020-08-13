namespace Config {
    export namespace AcCfg {
        /**
         * 大宴乡勇配置
         */
        export class JurakudaiCfg {
            // 保底奖励门客
            public servantID: number[] = [];

            // 获取保底奖励所需数量
            public mustNum: number;

            // 特殊道具（群宴令）
            public specialRewardId: number;

            // 奖池
            public pool: (Array<string|number>)[] = [];

            // 充值奖励列表
            public recharge: JurakudaiRecItem[] = [];

            // 任务列表
            public task: JurakudaiTaskItem[][] = [];

            //解析数据
            public formatData(data: any): void {
                // console.log("*****", data)
                for(var key in data) {
                    if (key == "recharge") {
                        this.recharge = [];
                        data[key].forEach((v, i) => {
                            this.recharge[i] = {
                                rechargeId: i+1,
                                chargeNum: v.chargeNum,
                                specialReward: v.specialReward || 0,
                                getReward: v.getReward
                            }
                        })
                        continue;
                    }

                    if (key == "task") {
                        this.task = [];
                        data[key].forEach((v, i) => {
                            let _taskId = i+1;
                            this.task[i] = v.map(nv => {
                                return {
                                    taskType: _taskId,
                                    questType: nv.questType,
                                    value: nv.value,
                                    specialReward: nv.specialReward || 0,
                                    getReward: nv.getReward,
                                    openType: nv.openType || null,
                                }
                            })
                        })
                        continue;
                    }
                    
					this[key]=data[key];
				}

                // this.servantID = [2014, 2015, 2016, 2017, 2018]
            }
        }

        /**大宴乡勇充值奖励 */
        export interface JurakudaiRecItem {
            /**档位ID */
            rechargeId: number,
            /**充值额度 */
            chargeNum: number,
            /**特殊道具奖励数量 */
            specialReward: number,
            /**背包道具奖励数量 */
            getReward: string,
        }

        /**大宴乡勇任务奖励 */
        export interface JurakudaiTaskItem {
            /**任务套系ID */
            taskType: number,
            /**任务类型 */
            questType: number,
            /**任务完成数量要求 */
            value: number,
            /**特殊道具奖励数量 */
            specialReward: number,
            /**背包道具奖励数量 */
            getReward: string,
            /**跳转类型 */
            openType?: string,
        }
    }
}