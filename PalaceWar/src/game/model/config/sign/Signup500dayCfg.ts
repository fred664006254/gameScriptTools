namespace Config
{
	export namespace Signup500dayCfg 
	{

        export let showDay:number;
        export let getReward:string;
        export let getExtraReward:string;
        export let lastDay:number;
        export let shopCfg:ShopItemCfg;

        export let sign600Day:number = 600;

        export function formatData(data:any):void
		{
             for(var key in data)
			{   
                if (key == "shop")
                {   
                    if (!shopCfg)
                    {
                        shopCfg = new ShopItemCfg();
                    }
                    let allKey:string[] = Object.keys(data.shop);
                    
                    shopCfg.initData(data.shop[allKey[0]]);                    
                    shopCfg.id = Number(allKey[0]);
                }
                else
                {
                    this[key]=data[key];
                }
			}
        }

        export function showLastDay():number
        {
            return (showDay+lastDay);
        }
    }
}