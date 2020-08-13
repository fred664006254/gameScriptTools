namespace Config
{
	export namespace AcCfg
	{
        export class AnnualCelebration2020Cfg 
        {
            /**
             * 展示时间 
             */
            public extraTime:number = 0;
            /**
             * 核心奖励:红颜ID，前端展示
             */
            public show:number = 0;
            /**
           

            /**
             * 游览奖励（圈数进度奖励），达到最大圈数后，以后每圈都会获得最大圈数的奖励
             */
            public achievement:Object = {};
            /**
             * -页签二-庆典任务   注：活动任务-特殊的限时方式，同类型的要扩展式的，不是分天的！
             */
            public task:Object[] = [];
            /**
             * 地图奖励
             */
            public map:Object = {};

            public normalPoint:any[] = [];

            public formatData(data:any):void
            {
                this.extraTime = data.extraTime;
                this.show = data.show;
                this.normalPoint = data.normalPoint;

                 for(let key in data.achievement){
                    let itemCfg:AC2020AchievementItemCfg;
                    let index = Number(key) + 1;
                    if(!this.achievement.hasOwnProperty(index.toString())){
                        this.achievement[index] = new AC2020AchievementItemCfg();
                    }
                    itemCfg = this.achievement[index];
                    itemCfg.initData(data.achievement[key]);
                    itemCfg.id = index;
                }

                this.task.length = 0;
                for(let key in data.task){

                    let v = data.task[key];
                    let oneList = {};
                    this.task.push(oneList);
                    for (let k in v)
                    {   
                        let index = Number(k) + 1;
                        let itemCfg:AC2020TaskItemCfg = new AC2020TaskItemCfg();
                        oneList[k] = itemCfg;
                        itemCfg.initData(v[k]);
                        itemCfg.id = index;
                        itemCfg.type = Number(key)+1;
                    }
                }

                for(let key in data.map){
                    let itemCfg:AC2020MapItemCfg;
                    let index = Number(key) + 1;
                    if(!this.map.hasOwnProperty(index.toString())){
                        this.map[index] = new AC2020MapItemCfg();
                    }
                    itemCfg = this.map[index];
                    itemCfg.initData(data.map[key]);
                    itemCfg.id = index;
                }
            }

            public getMaxCircle():number
            {
                return Object.keys(this.achievement).length;
            }

            public getSkinNeedCircle():number
            {
                for (let k in this.achievement)
                {
                    let cfg = <AC2020AchievementItemCfg>this.achievement[k];
                    let rewardsvo = GameData.formatRewardItem(cfg.getReward);
                    for (let i = 0 ; i<rewardsvo.length; i++)
                    {
                        let onevo = rewardsvo[i];
                        if (onevo.type == 10 && onevo.id == this.show)
                        {
                            return cfg.needNum;
                        }
                    }
                }
                return 12;
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

        }

        export class AC2020AchievementItemCfg extends BaseItemCfg{

            public id:number;

            /*
             *所需圈数
             */
            public needNum:number;
            /*
             *奖励
             */
            public getReward:string;
        }

        export class AC2020TaskItemCfg extends BaseItemCfg{

            public id:number;
            public type:number;
            /*
             *跳转
             */
            public openType:string;
            /*
             *任务类型 
             */
            public questType:number;
            /*
             *进度
             */
            public value:number;
            /*
             *定向骰子
             */
            public specialGift2:number;
            /*
             *普通骰子
             */
            public specialGift1:number;
             /*
             *奖励
             */
            public getReward:string;
           
        }

        export class AC2020MapItemCfg extends BaseItemCfg{

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
             *建筑类型
            */
            public buildingType:string;
            /*
             *奖励
            */
            public specificPool:string;

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
    }
}