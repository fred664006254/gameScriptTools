namespace Config {
    export namespace AcCfg {
        export class CrossOneServerCfg {
            // 展示期
            public extraTime: number;
            // 当期门客
            public servant: number;
            // 上榜等级需求
            public needLv: number;
            // 任务列表
            private task: CrossOneServerTaskItem[];
            // 排名奖励
            private award: CrossOneServerAwardItem[];

            public formatData(data:any) {
                this.extraTime = data.extraTime;
                this.servant = data.servant;
                // this.servant = 2010;
                this.needLv = data.needLv;
                this.task = [...data.task];
                this.award = [...data.award];
            }

            public get taskList(): CrossOneServerTaskItem[] {
                return [...this.task];
            }

            public get awardList(): CrossOneServerAwardItem[] {
                return [...this.award];
            }

        }

        export class CrossOneServerTaskItem extends BaseItemCfg {
            public powerAdd: number;
            public getReward: string;
        }

        export class CrossOneServerAwardItem extends BaseItemCfg {
            public rank: [number, number];
            public getReward: string;
        }

    }
}