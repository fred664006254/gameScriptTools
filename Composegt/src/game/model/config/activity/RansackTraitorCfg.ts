
namespace Config
{
	export namespace AcCfg
	{
		export class RansackTraitorCfg 
		{
            //搜查奸臣配置

            //充值X元宝获得1次搜查次数
            public cost:number=undefined;
            
            //单次搜查证物分布空间
            public Range:number[] = [];//{5,10,15,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340},
            
            //证物上限
            public RansackItemNum:number=undefined;
            
            //奸臣皮肤ID
            public TraitorSkinId:number=undefined;
            
            //100个证物获得奸臣皮肤
            public RansackReward:string= undefined;
            
            //10次搜查必获得1个证物
            public RansackRewardNum:string= undefined;
            
            //每次搜查获得道具
            public RansackPool:{}[] =[]

            //皮肤对应门客id
            public TraitorId:string= undefined;
            
            //10次搜查必获得1个证物
            public RansackItem:string= undefined;
            
            //搜查必获得证物ID
            public RansackItemID:string= undefined;
        
            public formatData(data:any):void
			{
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];
                    }
                }
            }

      
            public getRewardSkinId()
            {
                return this.TraitorSkinId;
                
                // return this.RansackReward.split("_")[1];
            }
        }

    }
}

