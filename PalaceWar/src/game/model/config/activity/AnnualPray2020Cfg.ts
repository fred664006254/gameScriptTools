namespace Config
{
	export namespace AcCfg
	{
		export class AnnualPray2020Cfg 
		{
            /**展示时间 */
            public extraTime:number = 0;
            public switch:string[]=[];
            //--单抽消耗特殊道具数
            public cost:number=0;
            //每次抽取获得祈愿值
            public getNum:number=0;
            //--活动结束后道具转化
            public exchange:string="";
            //--二道具结束自动转化
            public erZiExchange:string="";
            
            //--周道具结束自动转化
            public zhouZiExchange:string="";
            
            //--时年道具结束自动转化
            public nianZiExchange:string="";
            
            //--庆道具结束自动转化
            public qingZiExchange:string="";
            
            //--抽奖奖池
            public pool1:any[]=[];
            //--有字奖池
            public pool2:any[]=[];
            /**
             * --祈愿进度奖励
                --ratetime:祈愿值进度
                --getReward:奖励
             */
            public processingReward:Object={};

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
            public claim:Object={};


            //解析数据
            public formatData(data:any):void
			{
                this.extraTime = data.extraTime;
                this.cost = data.cost;
                this.pool1 = data.pool1;
                this.pool2 = data.pool2;
                this.switch = data.switch;
                this.getNum = data.getNum;
                this.exchange = data.exchange;

                for(var key in data.recharge)
                {
                    let itemCfg:AnnualPrayRechargeItemCfg;
					let id = Number(key);
                    if(!this.recharge[id])
                    {
                        this.recharge[id]=new AnnualPrayRechargeItemCfg();
                    }
                    itemCfg=this.recharge[id];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id=id;
                }

                for(var key in data.claim)
                {
                    let itemCfg:AnnualPrayExchangeItemCfg;
					let id = Number(key);
                    if(!this.claim[id])
                    {
                        this.claim[id]=new AnnualPrayExchangeItemCfg();
                    }
                    itemCfg=this.claim[id];
                    itemCfg.initData(data.claim[key]);
                    itemCfg.id=id;
                }

                for(var key in data.processingReward)
                {
                    let itemCfg:AnnualPrayProcessItemCfg;
					let id = Number(key);
                    if(!this.processingReward[id])
                    {
                        this.processingReward[id]=new AnnualPrayProcessItemCfg();
                    }
                    itemCfg=this.processingReward[id];
                    itemCfg.initData(data.processingReward[key]);
                    itemCfg.id=id;
                }

            }

            public getWealthGod(id : number):string{
                let rewards = "";
                for (let i in this[`pool${id}`]) {
                    let unit = this[`pool${id}`];
                    rewards += unit[i][0] + "|";
                }

                return rewards.substring(0, rewards.length - 1);
            }

            public getSkin(code):string{
                let skinId = this.switch[1].split(`wifeSkin_name`)[1];
                return skinId;
            }

            public getServant(code):string{
                let skinId = this.switch[0].split(`servantSkin_name`)[1];
                return skinId;
            }

            public getTotalProgress():number{
                let num = 0;
                let cfg : AnnualPrayProcessItemCfg = this.processingReward[Object.keys(this.processingReward).length];
                if(cfg && cfg.ratetime){
                    num = cfg.ratetime;
                }
                return num;
            }
        }

        export class AnnualPrayExchangeItemCfg extends BaseItemCfg
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

        export class AnnualPrayRechargeItemCfg extends BaseItemCfg
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
            /**
            * 获得特殊道具
            */
            public specialGift:number;
            
            
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,false);
            }
        }

        export class AnnualPrayProcessItemCfg extends BaseItemCfg
        {
            public id:number;
            /**
            * 祈愿值进度
            */
            public ratetime:number;
            /**
            * 奖励
            */
            public getReward:string;
        }
    }
}