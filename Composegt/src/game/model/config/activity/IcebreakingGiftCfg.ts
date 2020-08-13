namespace Config
{
    export namespace AcCfg
    {
        export class IcebreakingGiftCfg
        {
            //红包总额
            private totalGem:number = 0;

            //活动期间充值获得大于等于x元宝即可获得红包收益
            private gemGet:number = 0;

            //获得元宝奖励元宝下限
            private gemRewardMin:number = 0;

            //获得元宝奖励元宝上限限
            private gemRewardMax:number = 0;
            
            //活动期间获得元宝次数
            private giftLimit:number = 0;
            /**
             * 初始化数据
             */
			public formatData(data:any):void
			{
                for(var key in data){
                    this[key] = data[key];

                }  
            }
            //红包总额
            public getTotalGem():number
            {
                return this.totalGem;
            }
            //活动期间充值获得大于等于x元宝即可获得红包收益
            public getGemGet():number
            {
                return this.gemGet;
            }
            //获得元宝奖励元宝下限
            public getGemRewardMin():number
            {
                return this.gemRewardMin;
            }
            //获得元宝奖励元宝上限限
            public getGemRewardMax():number
            {
                return this.gemRewardMax;
            }
            //活动期间获得元宝次数
            public getGiftLimit():number
            {
                return this.giftLimit;
            }
        }
 
    }

}