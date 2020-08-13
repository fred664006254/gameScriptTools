namespace Config
{
	export namespace AcCfg
	{
		export class WifeBattleRankCfg  
		{
            public rankBuff:number = 0;
            public extraTime:number;
			public wifeBattleBuff:{artistryRange:number[],rankBuff:number}[] = [];
            //解析数据
            public formatData(data:any):void
			{
                // if(data["rankBuff"]){
                //     this.rankBuff = data["rankBuff"];
                // }

				if(data)
				{
					for(var key in data)
					{
						this[key]=data[key];
					}
				}

            }
		}
	}
}