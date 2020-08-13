namespace Config {
    export namespace AcCfg {
        export class NewYearRedCfg {
            /**展示时间 */
            public extraTime: number = 1;
            /**开关 */
            public switch: string[] = [];
            /**核心奖励 */
            public coreReward: any = '';
            /**活动期间的累计充值奖励 */
            public recharge: any = {};
            /**
             * 初始化数据
             */
            public formatData(data: any): void {
                this.extraTime = data.extraTime;
                this.switch = data.switch;
                this.coreReward = data.coreReward;
                for(let key in data.recharge)
                {
                    let itemCfg:NewYearRedRechargeItemCfg;
                    let id = Number(key) + 1;
                    if(!this.recharge.hasOwnProperty(String(id)))
                    {
                        this.recharge[String(id)]=new NewYearRedRechargeItemCfg();
                    }
                    itemCfg=this.recharge[String(id)];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id=id;
                }
            }

            public getCoreRewardGemIdx():number{
                let num = 0;
                for(let i in this.recharge){
                    let unit = this.recharge[i];
                    if(unit.getReward.indexOf(`10_${this.coreReward}_1`) > -1){
                        num = Number(i);
                        break;
                    }
                }
                return num;
            }

            public getCoreRewardGemNum():number{
                let num = 0;
                for(let i in this.recharge){
                    let unit = this.recharge[i];
                    if(unit.getReward.indexOf(`10_${this.coreReward}_1`) > -1){
                        num = unit.needGem;
                        break;
                    }
                }
                return num;
            }
        }

        /**累计充值奖励 */
        export class NewYearRedRechargeItemCfg extends BaseItemCfg {
            /**id */
            public id: number;
            /**所需额度*/
            public needGem: number;
            /**特殊奖励 */
            public show: number;
            /**奖励 */
            public getReward: string;
        }
    }
}