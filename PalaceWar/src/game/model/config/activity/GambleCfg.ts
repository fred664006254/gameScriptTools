namespace Config
{
	export namespace AcCfg
	{
		export class GambleCfg 
		{
			/**
			 * 每天可玩局数
			 */
			public gambNum:number;
			/**
			 * 展示时间
			 */
			public extraTime:number;

			/**
			 *押金范围
			 */
			public gambDeposit:number[]=[];

			/**
			 * 赌坊奖励设置
			 */
			public gambPrize:Object={};


            public formatData(data:any):void
            {
                this.gambNum = data.gambNum;
                this.extraTime = data.extraTime;
                this.gambDeposit = data.gambDeposit;

                // if(data.exchange){
                //     this.exchange = data.exchange;
                // }
    
                for(var key in data.gambPrize){
					let itemCfg:GambPrizeItem;
					let index = Number(key);
                    if(!this.gambPrize.hasOwnProperty(String(index)))
                    {
                        this.gambPrize[String(index)]=new GambPrizeItem();
                    }
                    itemCfg=this.gambPrize[String(index)];
                    itemCfg.initData(data.gambPrize[index]);
                    itemCfg.id=index;
                }
            }    
        }


        class GambPrizeItem extends BaseItemCfg{
            public id:number;
            /**
             * wrong
             */
            public wrong:any={};
            /**
             * stop
             */
            public stop:any={};
        }
	}
}