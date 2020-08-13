namespace Config {
    export namespace AcCfg {
        export class LanternCfg {
            /**展示时间 */
            public extraTime: number = 1;
            /**开关 */
            public switch: string[] = [];
            /**核心奖励 */
            public coreReward: any = '';
            /**--每日免费答灯谜次数*/
            public freeTimes=1;
            /**--每回答一次增加进度*/
            public addProcess=1;
            /**元宵奖池*/
            public LanternPool=[];
            /**玩家累计答灯谜次数 */
            public answerList: any = {};
            /**活动期间的累计充值奖励 */
            public recharge: any = {};
            /**
             * 初始化数据
             */
            public formatData(data: any): void {
                this.extraTime = data.extraTime;
                this.switch = data.switch;
                this.coreReward = data.coreReward;
                this.freeTimes = data.freeTimes;
                this.addProcess = data.addProcess;
                this.LanternPool = data.LanternPool;
                for(let key in data.recharge)
                {
                    let itemCfg:LanternRechargeItemCfg;
                    let id = Number(key) + 1;
                    if(!this.recharge.hasOwnProperty(String(id)))
                    {
                        this.recharge[String(id)]=new LanternRechargeItemCfg();
                    }
                    itemCfg=this.recharge[String(id)];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id=id;
                }

                for(let key in data.answerList)
                {
                    let itemCfg:LanternAnswerItemCfg;
                    let id = Number(key) + 1;
                    if(!this.answerList.hasOwnProperty(String(id)))
                    {
                        this.answerList[String(id)]=new LanternAnswerItemCfg();
                    }
                    itemCfg=this.answerList[String(id)];
                    itemCfg.initData(data.answerList[key]);
                    itemCfg.id=id;
                }
            }

            public getCoreRewardGemIdx():number{
                let num = 5;
                // for(let i in this.recharge){
                //     let unit = this.recharge[i];
                //     if(unit.getReward.indexOf(`10_${this.coreReward}_1`) > -1){
                //         num = Number(i);
                //         break;
                //     }
                // }
                return num;
            }

            public getCoreRewardType(code):string{
                let type = '';
                switch(Number(code)){
                    case 1:
                    case 2:
                    case 3:
                        type = `servantskin`;
                        break;
                }
                return type;
            }

            public getWealthGod():string{
                let rewards = "";
                for (let i in this.LanternPool) {
                    let unit = this.LanternPool;
                    rewards += unit[i][0] + "|";
                }

                return rewards.substring(0, rewards.length - 1);
            }

            public getCoreRewardGemNum(code):number{
                let num = this.answerList[5].answerfrequency;// 5;//Number(code) == 1 ? 10000 : 7500;

                // for(let i in this.recharge){
                //     let unit = this.recharge[i];
                //     if(unit.getReward.indexOf(`10_${this.coreReward}_1`) > -1){
                //         num = unit.needGem;
                //         break;
                //     }
                // }
                return num;
            }
        }

        /**累计充值奖励 */
        export class LanternRechargeItemCfg extends BaseItemCfg {
            /**id */
            public id: number;
            /**所需额度*/
            public needGem: number;
            /**特殊奖励 */
            public specialGift: string;
            /**奖励 */
            public getReward: string;
        }

        /**累计进度奖励 */
        export class LanternAnswerItemCfg extends BaseItemCfg {
            /**id */
            public id: number;
            /**所需额度*/
            public answerfrequency: number;
            /**特殊奖励 */
            public show: number;
            /**奖励 */
            public getReward: string;
        }
    }
}