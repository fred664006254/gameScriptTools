namespace Config {
    export namespace AcCfg {
        export class NewYearSignUpCfg {
            /** 展示时间 */
            public extraTime: number = 0;

            private newSignUpItemCfgList: NewSignUpItemCfg[] = [];
            /**连续7天特殊奖励 */
            public bigPrize:string;
            public redeem:number[];
            /**每日领取奖励次数 */
            public limitation:number;
            /**玩家停留时间（秒） */
            public waitingTime:number;
            /**有奖励的孔明灯数量 */
            public specialBallon:number;
            /**奖励领取间隔 */
            public rewardCD:number;
            /**飘出孔明灯的数量 */
            public ballonNum:number[];
            /**
             * 初始化数据
             */
            public formatData(data: any): void {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "newSignUp") {
                        this.newSignUpItemCfgList.length = 0;
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new NewSignUpItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = String(i + 1);
                            this.newSignUpItemCfgList.push(itemcfg);
                        }
                    }
                }
            }

            public getNewSignUpItemCfg(index:number):NewSignUpItemCfg
            {
                return this.newSignUpItemCfgList[index];
            }


        }
        /**
         * item
         */
        export class NewSignUpItemCfg extends BaseItemCfg {
            /**ID */
            public id: string;
			/**
			 * 开始时间
			 */
            public sTime: number;
            /**结束时间 */
            public eTime: number;
            /**奖励 */
            public getReward: string;

        }
    }
}