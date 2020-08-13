namespace Config
{
	export namespace AcCfg
	{
		export class RechargeBoxCfg 
		{
			private rechargeBoxItemListCfg:RechargeBoxItemCfg[] = [];
			public show:number;
            /**
             * 初始化数据
             */
			public formatData(data:any):void
			{
				for(var key in data.boxList)
				{
					let itemCfg:RechargeBoxItemCfg;
					if(!this.rechargeBoxItemListCfg.hasOwnProperty(String(key)))
					{
						this.rechargeBoxItemListCfg[String(key)]=new RechargeBoxItemCfg();
					}
					itemCfg=this.rechargeBoxItemListCfg[String(key)];
					itemCfg.initData(data.boxList[key]);
					itemCfg.id = Number(key) + 1;
				}
				this.show = data.show;
            }
			/**
			 * 获取当前的boxList cfg
			 */
			public getBoxListData():RechargeBoxItemCfg[]
			{
				let arr:RechargeBoxItemCfg[] = [];
				for(let i = 0;i<this.rechargeBoxItemListCfg.length;i++)
				{
					if(i == 0)
					{
						arr.push(this.rechargeBoxItemListCfg[this.rechargeBoxItemListCfg.length - 1 - 1]);
					}
					else if(i == 1)
					{
						arr.push(this.rechargeBoxItemListCfg[this.rechargeBoxItemListCfg.length - 1]);
					}
					else
					{
						arr.push(this.rechargeBoxItemListCfg[this.rechargeBoxItemListCfg.length - 1 - i]);
					}

					
				}
				return arr;
			}
			/**
			 * 通过id取当前的cfg
			 */
			public getBoxData(gears:string):RechargeBoxItemCfg
			{
				for(let i = 0;i<this.rechargeBoxItemListCfg.length;i++)
				{
					let boxData = this.rechargeBoxItemListCfg[i];
					if(boxData.needGem == gears)
					{
						return boxData;
					}
				}
			}

			public getSkinBone(code):string{
				let cfg = null;
				let skinid = this.getSkin(code);
                switch(Number(code)){
                    case 1:
                        cfg = Config.WifeskinCfg.getWifeCfgById(skinid);
                        break;
                    case 2:
                        cfg = Config.ServantskinCfg.getServantSkinItemById(skinid);
                        break;
                }
                return cfg.bone ? cfg.bone : ''; 
            }

            public getSkinName(code):string{
				let cfg = null;
				let skinid = this.getSkin(code);
                switch(Number(code)){
                    case 1:
                        cfg = Config.WifeskinCfg.getWifeCfgById(skinid);
                        break;
                    case 2:
                        cfg = Config.ServantskinCfg.getServantSkinItemById(skinid);
                        break;
                }
                return cfg.name ? cfg.name : ''; 
            }

            public getSkin(code):string{
                let skin = '';
                switch(Number(code)){
                    case 3:
                        skin = `2121`
                        break;
                }
                return skin; 
            }

		}
		
		export class RechargeBoxItemCfg extends BaseItemCfg
		{
            /**充值档位ID */
			public id:number;
			/**
			 * 所需充值档位
			 */
			public needGem:string;
            /**
			 * 可获得奖励次数
			 */
			public limit:string;
			/**
			 * 固定道具奖励
			 */
			public getReward:string;

		}
	}
}