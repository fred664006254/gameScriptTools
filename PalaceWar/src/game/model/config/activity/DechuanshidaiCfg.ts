namespace Config
{
	export namespace AcCfg
	{
		export class DechuanshidaiCfg 
		{
            /**展示时间 */
            public extraTime:number = 0;
            public switch:string[]=[];
            //--单抽消耗 单位：元宝
            public cost:number=0;
            //十连抽折扣
            public discount:number=0;
            
            //--德道具结束自动转化
            public deZiExchange:string="";
            
            //--川道具结束自动转化
            public chuanZiExchange:string="";
            
            //--时道具结束自动转化
            public shiZiExchange:string="";
            
            //--代道具结束自动转化
            public daiZiExchange:string="";
            
            //--抽奖奖池
            public pool1:any[]=[];
            
            //--有字奖池
            public pool2:any[]=[];
            
            //--进入有字奖池的次数标识，抽奖次数达到 pool2Times 的时候，会进行一次几率判定，判定成功，走pool2,不成功，走pool1
            public pool2Times=[];
            
            //--进入有字奖池的概率  百分制  每次几率判定的几率  超过最大值取最大值
            public pool2Ratio=[];
            
            //--超出pool2Times后，每 X 次，进行一次几率判定
            public exTimes:number=0;
            /**
			 *  --活动期间的累计充值奖励
				--needGem:所需额度：单位（元宝）
				--specialGift:消除次数
				--getReward:奖励
			 */
            public recharge:Object={};
            /**
             *  --每日任务:这里的1002任务，做一个特殊跳转，跳到活动的抽奖界面上
                --questType:任务类型
                --sortId:排序
                --value:任务参数
                --openType:任务跳转
                --specialReward:特殊奖励:奖励活动道具个数
                --getReward:奖励
            */
            public dailyTask:any[]=[];
            /** 
             *   --兑换
                --costdeZi:需要德字
                --costchuanZi:需要川字
                --costshiZi:需要时字
                --costdaiZi:需要代字
                --limit:活动限购
                --item:道具
            */
            public claim:Object={};
            public dailyReward:string='';

            //解析数据
            public formatData(data:any):void
			{
                this.extraTime = data.extraTime;
                this.cost = data.cost;
                this.discount = data.discount;
                this.deZiExchange = data.deZiExchange;
                this.chuanZiExchange = data.chuanZiExchange;
                this.shiZiExchange = data.shiZiExchange;
                this.daiZiExchange = data.daiZiExchange;
                this.pool1 = data.pool1;
                this.pool2 = data.pool2;
                this.pool2Times = data.pool2Times;
                this.pool2Ratio = data.pool2Ratio;
                this.exTimes = data.exTimes;
                this.switch = data.switch;
                this.dailyReward = data.dailyReward;

                for(var key in data.recharge)
                {
                    let itemCfg:DeChuanRechargeItemCfg;
					let id = Number(key);
                    if(!this.recharge[id])
                    {
                        this.recharge[id]=new DeChuanRechargeItemCfg();
                    }
                    itemCfg=this.recharge[id];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id=id;
                }

                for(var key in data.claim)
                {
                    let itemCfg:DeChuanExchangeItemCfg;
					let id = Number(key);
                    if(!this.claim[id])
                    {
                        this.claim[id]=new DeChuanExchangeItemCfg();
                    }
                    itemCfg=this.claim[id];
                    itemCfg.initData(data.claim[key]);
                    itemCfg.id=id;
                }

                this.dailyTask = data.dailyTask;

            }

            public getWealthGod():string{
                let rewards = "";
                for (let i in this.pool1) {
                    let unit = this.pool1[i];
                    rewards += unit[0] + "|";
                }
                return rewards.substring(0, rewards.length - 1);
            }

            public getDailyReward(day):string{
                return this.dailyReward.split(`|`)[day - 1];
            }


            public getSkin(code):string{
                let skinId = this.switch[1].split(`_`)[1];
                return skinId;
            }

            public getServant(code):string{
                let skinId = this.switch[0].split(`servant_name`)[1];
                return skinId;
            }
        }

        export class DeChuanExchangeItemCfg extends BaseItemCfg
        {
            public id:number;
			/**
			 * 道具内容
			 */
			public item:string;

			/**
			 * 需要德字
			 */
            public costdeZi:number;
            /**
			 * 需要德字
			 */
            public costchuanZi:number;
            /**
			 * 需要德字
			 */
            public costshiZi:number;
            /**
			 * 需要德字
			 */
			public costdaiZi:number;
			/**
			 * 限购
			 */
			public limit:number;
        }

        export class DeChuanRechargeItemCfg extends BaseItemCfg
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
            
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,false);
            }
        }
    }
}