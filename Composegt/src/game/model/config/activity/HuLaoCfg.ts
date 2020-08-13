namespace Config {
    export namespace AcCfg {
        export class HuLaoCfg {
            public cost: number;
            public attackNum: number;            
            public skinActiveNum: number;
            public skinActiveId: number;
            public skinExchange: 10331;
            public titleID:0;
            public lotteryNum:{needNum:number,getReward:string}[];
            public vipshopNum:{needNum:number,needVIP:number,limit:number,getReward:string}[];

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