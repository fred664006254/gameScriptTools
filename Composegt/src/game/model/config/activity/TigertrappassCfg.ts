namespace Config {
    export namespace AcCfg {
        export class TigertrappassCfg {
            public cost: number;
            public drop: Array<[string, number]>;

            public lamplimit: number;
            public num: number;
            public skinchip: number;
            public skinchipid: number;
            public chipExchangeitem: string;
            public needChipNum: number;
            public needChipid: number;
            public skinExchange: 10331;

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