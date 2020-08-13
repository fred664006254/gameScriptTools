namespace Config
{
	export namespace AcCfg
	{
		export class SkinPackageCfg 
		{
            /**
			 * 展示期
			 */
			public extraTime:number;

            /**
			 * 需要的门客皮肤ID
			 */
			public skinNeed:number;

            public gift:Object={};

          

            public formatData(data:any):void
            {
                this.extraTime = data.extraTime;
                this.skinNeed = data.skinNeed;


                if (data.gift)
                {
                     for(var key in data.gift)
                    {
                        let itemCfg:SkinPackageGiftItemCfg;
                        if(!this.gift.hasOwnProperty(String(key)))
                        {
                            this.gift[String(key)]=new SkinPackageGiftItemCfg();
                        }
                        itemCfg=this.gift[String(key)];
                        itemCfg.initData(data.gift[key]);
                        itemCfg.id=Number(key);
                    }
                }
               
            }

            public getGemNeed(key:string|number):number
			{   
                return this.gift[String(key)].gemNeed;
			}
            
            public getItemCfg(key:string|number):SkinPackageGiftItemCfg
			{
                return  this.gift[String(key)];
			}

            public getRewardMax():number
			{   
                return  Object.keys(this.gift).length;
			}

            

        }
        export class SkinPackageGiftItemCfg extends BaseItemCfg
        {   
            public id:number;
            public gemNeed:number;
            public getReward:string;

            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,true);
            }
        }
    }
}