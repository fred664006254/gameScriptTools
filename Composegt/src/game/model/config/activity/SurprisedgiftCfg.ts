namespace Config
{
    export namespace AcCfg
    {
        export class SurprisedgiftCfg
        {
            private ratio:number = 0;
            private tokencost:number[] = [];
            private drawlimited:number = 0;
            private tokenlimited:number = 0;
            private surprisedgift:any[] = [];
            public totlelimited:number = 0;
            /**
             * 初始化数据
             */
			public formatData(data:any):void
			{
                for(var key in data){
                    this[key] = data[key];

                }  
            }
            //活动期间每充值 10 元宝获得 1 个代币
            public getRatio():number
            {
                return this.ratio;
            }
            //抽奖消耗
            public getCost():number[]
            {
                return this.tokencost;
            }
            //每天抽奖次数限制
            public getLimit():number
            {
                return this.drawlimited;
            }
            // 惊喜回馈转盘
            public getGiftList():any[]
            {
                return this.surprisedgift;
            }
        }
 
    }

}