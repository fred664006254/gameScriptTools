
namespace Config
{
	export namespace AcCfg
	{
		/**
		 * 东海皇陵
		 */
		export class LocTombCfg
		{
            /**
			 * --展示时间
			 */
            public extraTime:number=0;
            /**
			 * --参与条件：官职达到从七品或以上
			 */
            public lvNeed:number=0;
            /**
			 * --每日是否刷新怪物，0否,1是
			 */
            public refresh:number=0;
            /**
			 *--总行数，一行6个，数值请注意总格子数与怪物奖励格子数的关系
			 */
            public totRows:number=0;

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
            public maxShare:number=100;

            /**
             * --活动时间  早上9点至晚上10点是可攻打时间
             */
            public actTime:number[]=[];

            /**
			 * --帮会击杀Boss数量与打开宝箱数量达到X时,才能探索到鳌拜
			 */
            public needKillNum:number=0;


            /**--个人排名奖励
            --rank：排行榜上下限  例：{5,10} 第五名至第十名
            --getReward：奖励*/
            public indivdualRank:Object={};

            /**--区服排名奖励
            --rank：排行榜上下限  例：{5,10} 第五名至第十名
            --getReward：奖励*/
            public allianceRank:Object={};

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
            /**
             * 
            --门客出战恢复道具  消耗出战令1个  每个门客每天只可恢复1次
            */
            public needItem:string="";
            /**
             * 玩家整个活动获得积分上限，服务器数量 X scoreLimit 。玩家可获取总积分的一半
            */
            public scoreLimit:number=0;
            /**
             * --挖每个格子增加积分和分数
            */
            public dig:number=0;
            /**
             * --挖每个格子增加积分和分数
            */
            public prize:any[]=[];
            
            
            public formatData(data:any):void{
                this.lvNeed = 5;
                this.initialExplore = data.initialExplore;
                this.renewTime = data.renewTime;
                if(data.maxShare){
                    this.maxShare = data.maxShare;
                }
                this.actTime = data.actTime;
                this.needKillNum = data.needKillNum;
                this.buyNumCost = data.buyNumCost;
                this.totRows = data.totRows;
                this.extraTime = data.extraTime;
                
                for(var key in data.indivdualRank){
                    let itemCfg:LocTombPersonRankRewardItemCfg;
                    if(!this.indivdualRank.hasOwnProperty((Number(key) + 1).toString()))
                    {
                        this.indivdualRank[Number(key) + 1] = new LocTombPersonRankRewardItemCfg();
                    }
                    itemCfg = this.indivdualRank[Number(key) + 1];
                    itemCfg.initData(data.indivdualRank[key]);
                    itemCfg.id = Number(key) + 1;
                }

                for(var key in data.allianceRank){
                    let itemCfg:LocTombServerRankRewardItemCfg;
                    if(!this.allianceRank.hasOwnProperty((Number(key) + 1).toString()))
                    {
                        this.allianceRank[Number(key) + 1] = new LocTombServerRankRewardItemCfg();
                    }
                    itemCfg = this.allianceRank[Number(key) + 1];
                    itemCfg.initData(data.allianceRank[key]);
                    itemCfg.id = Number(key) + 1;
                }

                for(var key in data.scoreMarket){
                    let itemCfg:LocTombScoreItemCfg;
                    if(!this.scoreMarket.hasOwnProperty(String(key)))
                    {
                        this.scoreMarket[String(key)]=new LocTombScoreItemCfg();
                    }
                    itemCfg=this.scoreMarket[String(key)];
                    itemCfg.initData(data.scoreMarket[key]);
                    itemCfg.id = Number(key) + 1;
                }

                for(var key in data.actMarket){
                    let itemCfg:LocTombShopItemCfg;
                    if(!this.actMarket.hasOwnProperty(String(key)))
                    {
                        this.actMarket[String(key)]=new LocTombShopItemCfg();
                    }
                    itemCfg=this.actMarket[String(key)];
                    itemCfg.initData(data.actMarket[key]);
                    itemCfg.id = Number(key) + 1;
                }

                for(var key in data.foe){
                    let itemCfg:LocTombFoeItemCfg;
                    if(!this.foe.hasOwnProperty(String(key)))
                    {
                        this.foe[String(key)]=new LocTombFoeItemCfg();
                    }
                    itemCfg=this.foe[String(key)];
                    itemCfg.initData(data.foe[key]);
                    itemCfg.id = Number(key) + 1;
                }
            }
            
            public getBossNpcItemCfgById(foeid : number):LocTombFoeItemCfg{
                return this.foe[foeid - 1];
            }

            public getActTime():number[]{
                return [
                    App.DateUtil.formatSvrHourByLocalTimeZone(this.actTime[0]).hour,
                    App.DateUtil.formatSvrHourByLocalTimeZone(this.actTime[1]).hour,
                ]
            }
        }

        class LocTombPersonRankRewardItemCfg extends BaseItemCfg
        {
            public id:number;
            /**
             * 排名上限
             */
            public idvRank:number[];
            /**
             * 达到进度的奖励
             */
            public getReward:string;
            public get minRank():number
            {
                return this.idvRank[0];
            }
            public get maxRank():number
            {
                return this.idvRank[1];
            }
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.getReward,true,true);
            }
        }

        class LocTombServerRankRewardItemCfg extends BaseItemCfg
        {
            public id:number;
            /**
             * 排名上限
             */
            public alnRank:number[];
            /**
             * --lordReward：盟主奖励
                --memberReward：成员奖励
             */
            public lordReward:string;
            public memberReward:string;

            public get minRank():number
            {
                return this.alnRank[0];
            }
            public get maxRank():number
            {
                return this.alnRank[1];
            }
            public get reward1Icons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.lordReward,true,true);
            }

            public get reward2Icons():BaseDisplayObjectContainer[]
            {
                return GameData.getRewardItemIcons(this.memberReward,true,true);
            }
        }

        class LocTombScoreItemCfg extends BaseItemCfg{
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

        class LocTombShopItemCfg extends BaseItemCfg{
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

        export class LocTombFoeItemCfg extends BaseItemCfg{
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
            public getnpcName(code):string{
                return LanguageManager.getlocal(`tombbossname${this.id}-${code}`);
            }

            /**
            * 怪物立绘
            */
            public getnpcPic(code):string{
                return `tombboss${this.id}-${code}`;
            }

            /**
            * 怪物头像
            */
            public getnpcIcon(code):string{
                return `tombboss${this.id}_icon-${code}`;
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
