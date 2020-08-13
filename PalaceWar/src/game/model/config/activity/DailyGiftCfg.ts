namespace Config
{
	export namespace AcCfg
	{
		export class DailyGiftCfg 
		{
            //每日赠送
            private _getReward:string = null;
        
            //每日的付费礼包
            //cost：调用的充值档位
            //limit：每日限制次数
            private _dailyCost:any[] = [];



            public get getReward(): string{
                return this._getReward;
            }

            public get dailyCost():any[]{
                return this._dailyCost;
            }

            //解析数据
            public formatData(data:any):void
			{
                if(data["getReward"]){
                    this._getReward = data["getReward"];
                }
                if(data["dailyCost"]){
                    this._dailyCost = data["dailyCost"];
                }
  

             }
		}
	}
}