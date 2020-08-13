namespace Config
{
	export namespace AcCfg
	{   
        /**
         * 天下至尊
         */
		export class LadderTournamentCfg 
		{
            /**
			 * 展示时间
			 */
            public extraTime:number=0;
            /**
			 * 所需官职等级
			 */
            public needLv:number=0;
            /**
			 * 所需门客数量
			 */
            public needServant:number=0;
            /**
			 * 每轮持续时间  单位：天
			 */
            public turnLast:number=0;
            /**
			 * 总共轮数
			 */
            public allTurnNum:number=0;
            /**
			 * 天梯战斗攻击系数
			 */
            public score1:number=0;
            public score2:number=0;
            /**
			 * 天梯战斗攻击系数
			 */
            public ladderAtk:number=0;
            /**
			 * 天梯战斗血量系数
			 */
            public ladderHp:number=0;
            /**
			 * 每日免费出战次数
			 */
            public freeNum:number=0;
            /**
			 * 超过免费次数后，出战消耗道具
			 */
            public needItem:string=null;
            /**
			 * 作战记录最大上限
			 */
            public maxRecord:number=0;
            
            /**
             * BUFF列表
             */
            public buffList:Object = {};
            /**
             * 每次出战获得奖励
             */
            public battleGet:Object = {};
            /**
             * 物资列表，每日任务
             */
            public taskList:Object[] = [];
            /**
             * 排行榜奖励
             */
            public rankReward:Object = {};
            /**
             * 商店
             */
            public shop:Object = {};

            /**
             * 修身战获胜后，全队获得的攻击buff
            */
            public atkBuff:number=0;
            /**
             * 初始化数据
             */
			public formatData(data:any):void
			{   
                this.extraTime = data.extraTime;
                this.needLv = data.needLv;
                this.needServant = data.needServant;
                this.turnLast = data.turnLast;
                this.allTurnNum = data.allTurnNum;
                this.score1 = data.score1;
                this.score2 = data.score2;
                this.ladderAtk = data.ladderAtk;
                this.ladderHp = data.ladderHp;
                this.freeNum = data.freeNum;
                this.needItem = data.needItem;
                this.maxRecord = data.maxRecord;
                this.atkBuff = data.atkBuff;

                for(let key in data.buffList){
                    let itemCfg:LTBuffCfg;
                    if(!this.buffList.hasOwnProperty(key)){
                        this.buffList[key] = new LTBuffCfg();
                    }
                    itemCfg = this.buffList[key];
                    itemCfg.initData(data.buffList[key]);
                    itemCfg.id = key;
                }

                for(let key in data.battleGet){
                    let itemCfg:LTBattleGetCfg;
                    if(!this.battleGet.hasOwnProperty(key)){
                        this.battleGet[key] = new LTBattleGetCfg();
                    }
                    itemCfg = this.battleGet[key];
                    itemCfg.initData(data.battleGet[key]);
                    itemCfg.id = key;
                }

                this.taskList.length = 0;
                for(let key in data.taskList){

                    let v = data.taskList[key];
                    let oneList = {};
                    this.taskList.push(oneList);
                    for (let k in v)
                    {
                        let itemCfg:LTTaskCfg = new LTTaskCfg();
                        oneList[k] = itemCfg;
                        itemCfg.initData(v[k]);
                        itemCfg.id = k;
                    }
                }

                for(let key in data.rankReward){
                    let itemCfg:LTRankRewardCfg;
                    if(!this.rankReward.hasOwnProperty(key)){
                        this.rankReward[key] = new LTRankRewardCfg();
                    }
                    itemCfg = this.rankReward[key];
                    itemCfg.initData(data.rankReward[key]);
                    itemCfg.id = key;
                }

                for(let key in data.shop){
                    let itemCfg:LTShopCfg;
                    if(!this.shop.hasOwnProperty(key)){
                        this.shop[key] = new LTShopCfg();
                    }
                    itemCfg = this.shop[key];
                    itemCfg.initData(data.shop[key]);
                    itemCfg.id = key;
                }


            }
            public getBuffCfg():LTBuffCfg
            {
                return this.buffList["1"];
            }

            public getTaskCfg(idx:number):LTTaskCfg[]
            {
                let taskobj = this.taskList[idx-1];
                let keys = Object.keys(taskobj);
                let array = [];
                for (let i = 0; i< keys.length; i++)
                {   
                    let key:string = keys[i]
                    array.push(taskobj[key]);
                }
                return array;
            }
        }

        export class LTBuffCfg extends BaseItemCfg{
            public id:string;
            /*
            *消耗道具的ID
            */
            public needItem:string;
            /*
            *生效次数
            */
            public effectNum:number;
            /*
            *整体队伍攻击加成
            */
            public atkUp:number;
            /*
            *整体队伍血量加成
            */
            public hpUp:number;
        }

        export class LTBattleGetCfg extends BaseItemCfg{
            public id:string;
            /*
            *修身技能经验
            */
            public practiceExp:number;
            /*
            *获得军功
            */
            public getMerit:number;
        }

        export class LTTaskCfg extends BaseItemCfg{
            public id:string;
            /*
            *任务类型
            */
            public taskType:number;
            /*
            *条件值
            */
            public value:number;
            /*
            *奖励
            */
            public getReward:string;

            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,false);
            }
        }

        export class LTRankRewardCfg extends BaseItemCfg{
            public id:string;
            /*
            *任务类型
            */
            public rank:number[];
            /*
            *获得军功
            */
            public getMerit:number;
            /*
            *奖励
            */
            public getReward:string;

            public get rewardIcons():BaseDisplayObjectContainer[]
            {       
                let rewardstr = `1030_0_${this.getMerit}|` + this.getReward;
                return GameData.getRewardItemIcons(rewardstr,true,false);
            }
        }

        export class LTShopCfg extends BaseItemCfg
		{
			public id: string;
			/**
			 * 道具
			 */
			public item:string;
			/**
			 * 价格 消耗军功
			 */
			public price:number;
			/**
			 * 限购类型 1:日刷新  2：轮刷新  3：整个活动期间不刷新
			 */
            public limitType:number;
            /**
			 * 限购次数
			 */
			public limit:number;
		}
    }
}