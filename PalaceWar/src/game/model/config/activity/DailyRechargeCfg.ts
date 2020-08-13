namespace Config
{
	export namespace AcCfg
	{
		export class DailyRechargeCfg 
		{
            /**展示时间 */
            public extraTime:number = 0;
            /** 核心奖励*/
            public show:string = '';
            public switch:string[] = [];
            /**
			 *  --活动期间的累计充值奖励
				--needGem:所需额度：单位（元宝）
				--specialGift:消除次数
				--getReward:奖励
			 */
            public recharge:Object={};

            //解析数据
            public formatData(data:any):void
			{
                if(data.extraTime){
                    this.extraTime = data.extraTime;
                }
               
                this.show = data.show;
                this.switch = data.switch;

                for(let key in data.recharge)
                {
                    let itemCfg:DailyRechargeItemCfg;
					let id = Number(key);
                    if(!this.recharge[id])
                    {
                        this.recharge[id]=new DailyRechargeItemCfg();
                    }
                    itemCfg=this.recharge[id];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id=id;
                }
            }

            public getReardType():string{
                let type = ``;
                let rewardvo = GameData.formatRewardItem(this.show)[0];
                if(rewardvo.type == 8 || rewardvo.type == 19){
                    type = `servant`;
                }
                else if(rewardvo.type == 10 || rewardvo.type == 16){
                    type = `wife`;
                }
                return type;
            }
        }

        export class DailyRechargeItemCfg extends BaseItemCfg
        {
            public id:number;
            /**
            * 所需额度：单位（元宝）
            */
            public needGem:number;
            /**
            * 奖励
            */
            public getReward:string;
            /*
            * openType
            */
            public openType:number;

        }
    }
}