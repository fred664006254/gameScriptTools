namespace Config
{
	export namespace AcCfg
	{
		export class CostGemRankCfg
		{
			public needGemCost:number = 0;
			public extraTime:number = 1;
			public switch:string[]=[];
			public gemRank:Object={};

			public formatData(data:any):void
			{
				this.needGemCost = data.needGemCost;
				this.extraTime = data.extraTime;
				this.switch = data.switch;
		 
				for(let key in data.gemRank)
				{
					let itemCfg:AcCostGemRankItemCfg;
					if(!this.gemRank.hasOwnProperty(String(key)))
					{
						this.gemRank[String(key)]=new AcCostGemRankItemCfg();
					}
					itemCfg=this.gemRank[String(key)];
					itemCfg.initData(data.gemRank[key]);
					itemCfg.id=Number(key);
				}
			}

			public getMaxRank():number{
                let max = 0;
                let unit =  this.gemRank[Object.keys(this.gemRank).length];
                if(unit && unit.rank && unit.rank[1]){
                    max = unit.rank[1];
                }
                return max;
            }

            public getTitle():string{
                let str = `3812`;
                // let arr = this.switch[0].split(`title_name`);
                // if(arr[1]){
                //     str = arr[1];
                // }
                return str;
            }
		}

		// --rank:排名
        //--getReward:奖励
		export class AcCostGemRankItemCfg extends BaseItemCfg{ 
			public id:number;
			public rank:number[];
			public getReward:string; 
			public get minRank():number{
				return this.rank[0];
			}
			public get maxRank():number{
				return this.rank[1];
			}
		}
		 
	}
}