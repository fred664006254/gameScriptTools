
namespace Config
{
	export namespace AcCfg
	{
		/**
		 * 围剿鳌拜
		 */
		export class CrossServerWipeBossCfg
		{
	    	/**
			 * --参与条件：官职达到从七品或以上
			 */
            public needLv:number=0;

            /**
			 * --每日初始探索次数  0点更新
			 */
            public initialExplore:number=0;

            /**
			 * 次数恢复时间 （单位：秒，官职越高，恢复所需时间越短） 第一个值是从七品
			 */
            public renewTime:number[]=[];

        

             /**
			 * 购买探索次数消耗 单位：元宝。超过十次价格按十次计算
			 */
            public buyNumCost:number[]=[];
            /**
			 * --帮会敌情上限
			 */
            public maxShare:number=0;

            /**
             * --活动时间  早上9点至晚上10点是可攻打时间
             */
            public actTime:number[]=[];

            /**
			 * --帮会击杀Boss数量与打开宝箱数量达到X时,才能探索到鳌拜
			 */
            public needKillNum:number=0;

            //门客出战恢复道具  消耗出战令1个  每个门客每天只可恢复1次
            public needItem:string = null;

            //个人排名数量
            public personRankNum:number = 0;

            //区服排名数量
            public serverRankNum:number = 0;

            /**--个人排名奖励
            --rank：排行榜上下限  例：{5,10} 第五名至第十名
            --getReward：奖励*/
            public personRankReward:Object={};

            /**--帮会排名奖励  （个人分数达到50分的成员才有资格领取）
            --rank：排行榜上下限  例：{5,10} 第五名至第十名
            --getReward1：盟主奖励
            --getReward2：成员奖励*/
            public serverRankReward:Object={};

            /*
            *--积分商城
            --limit：购买次数限制
            --costScore：所需积分
            --goods：商品内容
            * */
            public scoreMarket:Object={};

            /*
            * --活动商铺
            --needGem：所需元宝  每日消耗会刷新
            --limit：购买次数限制
            --effect：购买效果 提升活动中门客战力5%，当天有效
            --goods：商品内容
            * */
            public actMarket:Object={};

            /**
             * --铲除Boss活动配置
            --type：类型：1，BOSS  2，宝箱
            --bossNum：数量： 此活动总产出数量
            --bossScore：单个boss总积分。单次积分=A/BOSS血量*BOSS总积分  （A为门客对BOSS造成的伤害，其最大值等于BOSS血量）
            --bossHP：Boss血量
            --ranWeight：探索时的随机权重
            --needKey：开启方式
            --killPool：击杀奖池。给予BOSS最后一击才可获得击杀奖励道具（从奖池中随机）
            */
           public foe:Object={};
            
            public formatData(data:any):void{
                this.needLv = data.needLv;
                this.initialExplore = data.initialExplore;
                this.renewTime = data.renewTime;
                this.maxShare = data.maxShare;
                this.actTime = data.actTime;
                this.needKillNum = data.needKillNum;
                this.buyNumCost = data.buyNumCost;
                
                for(var key in data.personRankReward){
                    let itemCfg:CrossServerWipeBossPersonRankRewardItemCfg;
                    if(!this.personRankReward.hasOwnProperty((Number(key) + 1).toString()))
                    {
                        this.personRankReward[Number(key) + 1] = new CrossServerWipeBossPersonRankRewardItemCfg();
                    }
                    itemCfg = this.personRankReward[Number(key) + 1];
                    itemCfg.initData(data.personRankReward[key]);
                    itemCfg.id = Number(key) + 1;
                }

                for(var key in data.serverRankReward){
                    let itemCfg:CrossServerWipeBossServerRankRewardItemCfg;
                    if(!this.serverRankReward.hasOwnProperty((Number(key) + 1).toString()))
                    {
                        this.serverRankReward[Number(key) + 1] = new CrossServerWipeBossServerRankRewardItemCfg();
                    }
                    itemCfg = this.serverRankReward[Number(key) + 1];
                    itemCfg.initData(data.serverRankReward[key]);
                    itemCfg.id = Number(key) + 1;
                }

                for(var key in data.scoreMarket){
                    let itemCfg:CrossServerWipeBossScoreItemCfg;
                    if(!this.scoreMarket.hasOwnProperty(String(key)))
                    {
                        this.scoreMarket[String(key)]=new CrossServerWipeBossScoreItemCfg();
                    }
                    itemCfg=this.scoreMarket[String(key)];
                    itemCfg.initData(data.scoreMarket[key]);
                    itemCfg.id = Number(key) + 1;
                }

                for(var key in data.actMarket){
                    let itemCfg:CrossServerWipeBossShopItemCfg;
                    if(!this.actMarket.hasOwnProperty(String(key)))
                    {
                        this.actMarket[String(key)]=new CrossServerWipeBossShopItemCfg();
                    }
                    itemCfg=this.actMarket[String(key)];
                    itemCfg.initData(data.actMarket[key]);
                    itemCfg.id = Number(key) + 1;
                }

                for(var key in data.foe){
                    let itemCfg:CrossServerWipeBossFoeItemCfg;
                    if(!this.foe.hasOwnProperty(String(key)))
                    {
                        this.foe[String(key)]=new CrossServerWipeBossFoeItemCfg();
                    }
                    itemCfg=this.foe[String(key)];
                    itemCfg.initData(data.foe[key]);
                    itemCfg.id = Number(key) + 1;
                }
            }
            
            public getBossNpcItemCfgById(foeid : number):CrossServerWipeBossFoeItemCfg{
                return this.foe[foeid - 1];
            }
        }

        class CrossServerWipeBossPersonRankRewardItemCfg extends BaseItemCfg
        {
            public id:number;
            /**
             * 排名上限
             */
            public rank:number[];
            /**
             * 达到进度的奖励
             */
            public getReward:string;
            public get minRank():number
            {
                return this.rank[0];
            }
            public get maxRank():number
            {
                return this.rank[1];
            }
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,true);
            }
        }

        class CrossServerWipeBossServerRankRewardItemCfg extends BaseItemCfg
        {
            public id:number;
            /**
             * 排名上限
             */
            public rank:number[];
            /**
             * --getReward1：盟主奖励
                --getReward2：成员奖励
             */
            public getReward:string;
            // public getReward2:string;

            public get minRank():number
            {
                return this.rank[0];
            }
            public get maxRank():number
            {
                return this.rank[1];
            }
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,true);
            }

 
        }

        class CrossServerWipeBossScoreItemCfg extends BaseItemCfg{
            public id:number;
            /**
             * 购买次数限制 
             */
            public limit:number;
            /*
            所需积分
            */
            public costScore:number;
            /**
             * 商品内容
             */
            public goods:string;
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.goods,true,false);
            }
        }

        class CrossServerWipeBossShopItemCfg extends BaseItemCfg{
            public id:number;
            /**
             * 购买次数限制 
             */
            public limit:number;
            /*
            所需元宝  每日消耗会刷新
            */
            public needGem:number|number[];
            /*
            购买效果 提升活动中门客战力5%，当天有效
            */
            public effect:number;
            /**
             * 商品内容
             */
            public goods:string;
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.goods,true,false);
            }
        }

        export class CrossServerWipeBossFoeItemCfg extends BaseItemCfg{
            public id:number;
            /**
             * 类型：1，BOSS  2，宝箱
             */
            public type:number;
            /*
            数量： 此活动总产出数量
            */
            public bossNum:number;
            /*
            单个boss总积分。单次积分=A/BOSS血量*BOSS总积分 
            */
            public bossScore:number;
            /**
             * bossHP：Boss血量
             */
            public bossHP:number;
            /*
            击杀积分。给予BOSS最后一击才可获得击杀积分
            */
            public killScore:number;
            /*
            击杀分数 给予BOSS最后一击才可获得
            */
            public killMark:number;
            /**
             * killPool：击杀奖池。给予BOSS最后一击才可获得击杀奖励道具（从奖池中随机）
            */
            public killPool:any[];
            /**
             * 所需钥匙
            */
            public needKey : string;

            /*
            *固定奖励
            * */
            public get reward1Icons():BaseDisplayObjectContainer[]{
                let str = '';
                for(let i in this.killPool){
                    str += (`${this.killPool[i][0]}${Number(i) == this.killPool.length - 1 ? '' : '|'}`);
                }
                return GameData.getRewardItemIcons(str,true,true);
            }

            /*
            *几率奖励
            * */
            public get reward2Icons():BaseDisplayObjectContainer[]{
                let str = '';
                for(let i in this.killPool){
                    str += (`${this.killPool[i][0]}${Number(i) == this.killPool.length - 1 ? '' : '|'}`);
                }
                return GameData.getRewardItemIcons(str,true,true);
           }

            /**
                * 怪物名
                */
            public get npcName():string{
                return this.type == 1 ? LanguageManager.getlocal(`crossserverwipebossname${this.id}`) : LanguageManager.getlocal(`accrossserverwipeBossKillBox${this.id - 7}`);
            }

           /**
            * 怪物立绘
            */
            public get npcPic():string{
                return this.type == 1 ? `crossserverwipeboss${this.id}` : `accrossserverwipeboss_box${this.id - 7}`;
            }

             /**
            * 怪物头像
            */
            public get npcIcon():string{
                return this.type == 1 ? `crossserverwipeboss${this.id}_icon` : `accrossserverwipeboss_box${this.id - 7}_icon`;
            }

             /**
            * 怪物品质
            */ 
           public get itemBg():string{
                let itembg = '';
                let arr = [1,2,3,4,7,6,5];

                if(this.type == 1){
                    itembg = `itembg_${arr[this.id - 1]}`
                } 
                else{
                    itembg = `itembg_${this.id < 10 ? (this.id - 5) : 7}` 
                }
                return itembg;
            }
        }
	}
}
