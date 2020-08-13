namespace Config {
    export namespace AcCfg {
        export class RedLotusWarriorCfg {

            public cost:number = null;
            public helmetItem:string = null;
            public helmetItemId:number = null;
            public helmetRwardNum:number = null;
            public attackloop:number = null;
            public criticaltime:number = null;
            public criticaldamageAdd: number = null;
            public helmetItemNum: number = null;
            public zhentianSkinId:number = null;
            public sevantID:number = null;
            public helmetReward:string = null;
            public trophyPool:any = null;
            public helmetNum: any = null;

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