namespace Config {
    export namespace AcCfg {
        export class FiveTigersCfg {

            public cost:number = 0;
            public servantSkinID:number = 0;
            public servantID:number =0;
            public chipID:number = 0;
            public chipNum:number = 0;
            public exchangeNum:number= 0;
            public exchangeItemID:number =0;
            public pool:any =null;
            public progress:{needNum:number,getReward:string}[] = [];
            public mainReward:string = '';


            //解析数据
            public formatData(data: any): void {
          
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];
                    }
                }
                //this.servantSkinID = 10431;
            }
        }
    }
}