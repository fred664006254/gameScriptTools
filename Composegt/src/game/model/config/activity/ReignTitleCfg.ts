namespace Config {
    export namespace AcCfg {
        export class ReignTitleCfg {
            // --元宝抽取价格（元宝）
            public reignTitlePrice:number = null;
            // --元宝文字与道具的2类概率
            public reignTitleType:number[] = null;
            // --元宝抽取四个文字分别的概率
            public reignTitleRate:number[] = null;
            // --元宝抽取文字时道具备选
            public reignTitleReward:any[] = null;
            // --升级的头像框ID
            public reignTitleRewardID:number = null;
            // --升级需要的文字数量需求
            public reignTitleLevelNeed:number[] = null;
            // --任务奖励的最大天数
            public maxDay:number = null;
            // --文字兑换的道具ID
            public exchangeItem:number = null;
            // --第一天活跃任务
            public dayTask1:any[] = null;
            // --第二天活跃任务
            public dayTask2:any[] = null;
            // --第三天活跃任务
            public dayTask3:any[] = null;
            // --第四天活跃任务
            public dayTask4:any[] = null;
            // 文字兑换
            public rechangeReignTitle:any[] = null;

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
}