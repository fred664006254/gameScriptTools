
namespace Config
{
	export namespace AcCfg
	{
		export class RansackTraitorSPCfg 
		{
            //搜查奸臣配置

            //充值X元宝获得1次搜查次数
            public cost:number=undefined;
            
            //单次搜查证物分布空间
            public Range:number[] = [];//{5,10,15,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340},
            
            //证物上限
            public RansackItemNum:number=undefined;
                        
            //搜查必获得证物ID
            public RansackItemID:any[]= undefined;

            //10次搜查必获得1个证物
            public RansackRewardNum:string= undefined;
            

            public exchangeShop:any[] = null;
            public formatData(data:any):void
			{
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];
                    }
                }
            }

            public getRewardSkinIdByIndex(index):{itemID:number,proofNum:number,skinID:number}
            {
                return this.exchangeShop[index];
            }

        }

    }
}

