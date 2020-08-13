namespace Config
{
	export namespace AcCfg
	{
        export class EnjoyNightCfg 
        {
            /**
             * 展示时间 
             * */
            public extraTime:number = 0;
             /**
             * 每日免费巡游次数
             * */
            public freeTime:number = 0;
            /**
             * 每次巡游获得巡游值
             * */
            public addValue:number = 0;
            /**
             * 巡游值进度奖励
             */
            public achievement:Object = {};
             /**
             * 地图奖励
             */
            public map:Object = {};
             /**
             * 活动期间的累计充值奖励
             */
            public recharge:Object = {};
             /**
             * 喝酒小游戏配置
                --npcHealth:NPC酒力初始值
                --playerHealth:玩家酒力初始值
                --win:必赢局
             */
            public drink:Object = {};
             /**
             * 兑换商店
             */
            public shop:Object = {};

            public normalPoint:any[] = [];

            public exchangeScene:any = {};

            public task:Object={};

            public formatData(data:any):void
            {
                 this.extraTime = data.extraTime;
                 this.freeTime = data.freeTime;
                 this.addValue = data.addValue;
                 this.normalPoint = data.normalPoint;
                 this.exchangeScene = data.exchangeScene;

                 for(let key in data.achievement){
                    let itemCfg:EnjoyNightAchievementCfg;
                    let index = Number(key) + 1;
                    if(!this.achievement.hasOwnProperty(index.toString())){
                        this.achievement[index] = new EnjoyNightAchievementCfg();
                    }
                    itemCfg = this.achievement[index];
                    itemCfg.initData(data.achievement[key]);
                    itemCfg.id = index;
                }

                for(let key in data.map){
                    let itemCfg:EnjoyNightMapCfg;
                    let index = Number(key) + 1;
                    if(!this.map.hasOwnProperty(index.toString())){
                        this.map[index] = new EnjoyNightMapCfg();
                    }
                    itemCfg = this.map[index];
                    itemCfg.initData(data.map[key]);
                    itemCfg.id = index;
                }

                for(var key in data.recharge)
                {
                    let itemCfg:EnjoyNightRechargeCfg;
					let id = Number(key) + 1;
                    if(!this.recharge[id])
                    {
                        this.recharge[id]=new EnjoyNightRechargeCfg();
                    }
                    itemCfg=this.recharge[id];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id=id;
                }
                this.drink =data.drink;

                for(var key in data.shop)
				{
					let itemCfg:EnjoyNightShopCfg;
					let id = Number(key) + 1;
					if(!this.shop[id])
					{   
						this.shop[id]=new EnjoyNightShopCfg();
					}
					itemCfg=this.shop[id];
					itemCfg.initData(data.shop[key]);
					itemCfg.id=id;
				}

                for(var key in data.task)
                {
                    let itemCfg:EnjoyNightTaskItemCfg;
					let id = Number(key) + 1;
                    if(!this.task[id])
                    {
                        this.task[id]=new EnjoyNightTaskItemCfg();
                    }
                    itemCfg=this.task[id];
                    itemCfg.initData(data.task[key]);

                    itemCfg.taskId=id;
                }
            }

            public getExchangeSceneId():string
            {
                let scenestr:string = this.exchangeScene.getReward;
                return scenestr.split("_")[1];
            }

            public getNormalPointAwards():string
            {
                let awards:string = "";
                for (let i=0; i<this.normalPoint.length; i++)
                {
                    if (awards.length)
                    {
                        awards += "|";
                    }
                    awards += this.normalPoint[i][0];
                }
                return awards;
            }



            /**最大的进度 */
            public getMaxAchievementValue():number
            {   
                let keys = Object.keys(this.achievement);
                let lastAchievement:EnjoyNightAchievementCfg = this.achievement[keys[keys.length-1]];
                return lastAchievement.needNum;
            }


            //商店兑换
            public getShopArr():any[]{
                let arr = [];

                for(let i in this.shop){

                    let unit = this.shop[i];
                    if (unit.getReward == "6_1740_1")
					{
						if (Api.switchVoApi.checkOpenServantLevel450())
						{
							 arr.push(unit);
						}
					}
					else
					{
						 arr.push(unit);
					}
                   
                }
                return arr;
            }
        }

        export class EnjoyNightAchievementCfg extends BaseItemCfg{
            public id:number;
            /*
            *所需抽奖次数
            */
            public needNum:number;
            /*
            *奖励
            */
            public getReward:string;

            public mapChange:number;
        }

        export class EnjoyNightMapCfg extends BaseItemCfg{
            public id:number;
            /*
            *格子ID 
            */
            public pointID:number;
            /*
            *格子类型(1：普通格子；2：剧情建筑)
            */
            public pointType:number;
            /*
            *巡游值-多
            */
            public addValueMore:string;
            /*
            *巡游值-少
            */
            public addValueLess:string;
            /*
            *建筑类型
            */
            public buildingType:string;
            /*
            *对应奖池
            */
            public specificPool:any[];

            public getRewards():string
            {
                let awards:string = "";
                for (let i=0; i<this.specificPool.length; i++)
                {
                    if (awards.length)
                    {
                        awards += "|";
                    }
                    awards += this.specificPool[i][0];
                }
                return awards;
            }
        }

        export class EnjoyNightRechargeCfg extends BaseItemCfg
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
            * 特殊奖励
            */
            public specialGift:number;
            
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,false);
            }
        }

        export class EnjoyNightShopCfg extends BaseItemCfg
		{
			public id: number;
			/**
			 * 获得奖励
			 */
			public getReward:string;
			/**
			 * 需要碎片数量
			 */
			public needPart:number;
			/**
			 * 限购
			 */
			public limit:number;

			public get rewardIcons():BaseDisplayObjectContainer
            {
				return GameData.getRewardItemIcons(this.getReward,true,false)[0];
            }
		}

        export class EnjoyNightTaskItemCfg extends BaseItemCfg
        {
            /**
             * 任务id
             */
            public taskId:number;
    
            public openType:string;
            /**
             * 任务类型
             */
            public questType:number;
            /**
             * 进度
             */
            public value:number
            /**
              获得雄黄酒
             */
            public specialGift:number = 0;
            /**
             * 奖励
             */
            public getReward:string;
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                // this.getReward += (`18_0001_${this.zongziGet}`);
                return GameData.getRewardItemIcons(this.getReward,true,false);
            }
        }

    }
}