namespace Config{
	export namespace AcCfg{
		export class ThreeKingdomsCfg{
           /*--参与三国争霸官品限制*/
			public lvNeed : number = 10;
			/**参与三国争霸权势要求*/
			public powerNeed : number = 0;
            /** --三国争霸持续时间 单位：天*/
            public lastTime : number = 0;
            /**展示期时间 单位：天*/
			public extraTime : number = 0;
			/**
             * --每周可参与活动时间
            */
            public activeTime : any[] = [];
            /**
             *  --任务期会用到的配置内容
            */
            public taskList : any[] = [];
            /**
             *  --阵营神将Buff
            */
            public heroList : any[] = [];
            //----------------------------------------------【普通攻城期】---------------------------------------------------/
            /*--每个门客攻击力 = 总资质 * X*/
            public atkBase : number = 0;
            
            /*--每个门客血量 = 总属性 * X*/
            public hpBase : number = 0;
            
            /*--每 X 回合，攻击力增加*/
            public round : number = 0;
            
            /*--每 round 回合，攻击力 = 攻击力 * X*/
            public atkAdd : number = 0;
            
            /*--普通城内的据点数量*/
            public campNum1 : number = 0;
            
            /*--普通城内，每个据点产出分数 X 每秒*/
            public campScore1 : number = 0;

            /*--大都督发布军令的城池，我方阵营门客攻击力增加 X%   注：攻击力的加成方式都是加法 【攻击力 * （1+ 加成1 + 加成2 +加成3）】 * 回合翻倍*/
            public order : number = 0;

            /* --普通攻城期，每次额外出战，需要消耗 X 粮草（注：普通攻城期和核心攻城期的粮草不是同一个东西）*/
            public costFood1 : number = 0;
        
            /**
             * --城池目标奖励
            */
            public cityReward : any[] = [];

            /**
             * --普通攻城期每轮排名奖励   每轮根据贡献的兵力，不考虑胜负方   
            */
            public cityRankReward : any[] = [];

            /**
             * 普通城援军加成 每个阵营援军数量达到 X ，则获得对应加成
            */
            public troop1 : any[] = [];

            /**
             * 普通城援军排名加成，根据阵营的总援军达到 X ，阵营援军排名，分别获得对应加成
            */
            public troopRank1 : any[] = [];

            /* 普通攻城期，每轮免费次数*/
            public freeNum1 : number = 0;
            /* 普通攻城期，每轮进攻冷却时间  单位：秒*/
            public coldTime1 : number = 0;
            /*--限时军需，充值奖励，每日充值*/
            public recharge : any[] = [];

            //----------------------------------------------【中心攻城期】---------------------------------------------------
            /**--中心城内的据点数量*/
            public campNum2 : number = 0;
            
            /*--中心城内，每个据点产出分数 X 每秒*/
            public campScore2 : number = 0;
            
            /*---每次出征，消耗 X 粮草*/
            public costFood2 : number = 0;
            /* 普通攻城期，每轮免费次数*/
            public freeNum2 : number = 0;
            /* 普通攻城期，每轮进攻冷却时间  单位：秒*/
            public coldTime2 : number = 0;

            /**
             * --中心城援军加成 每个阵营援军数量达到 X ，则获得对应加成
            */
            public troop2 : any[] = [];

            /** 
             * 中心城援军排名加成，根据阵营的总援军达到 X ，阵营援军排名，分别获得对应加成
            */
            public troopRank2 : any[] = [];
            //----------------------------------------------【排名奖励】---------------------------------------------------
            /**
             * 每周的阵营排名奖励
            */
            public kingdom1 : any[] = [];
             /**
             *每周的个人排名奖励
             */
            public person1 : any[] = [];
            /**
             *赛季的阵营排名奖励
             */
            public kingdom2 : any[] = [];
             /**
              * 赛季的个人排名奖励
             */
            public person2 : any[] = [];
            /*----------------------------------------------【神将突袭】---------------------------------------------------*/
            /*--神将突袭的boss血量*/
            public heroHp : number = 0;
            /*--击杀神将获得神将经验*/
            public addHeroExp : number = 0;
            /*--神将突袭参与奖励*/
            public officer1 : string = "";
            /*--神将突袭击退奖励*/
            public officer2 : string = "";
            //--加入推荐阵营奖励
            public recommendReward : string = "1_1_100";
            // --换阵营消耗道具
            public change : string = "6_1451_1";

            /** 
             * 冲榜排名获得粮草
             * --rank:排名
         --food2:跨服冲榜的排名获得军资 【跨服权势、亲密、擂台、绝地擂台、跨服皇陵、跨服群芳、定军中原】
            */
            public getFood : any[] = [];
            
  

		    public formatData(data: any): void {
                for(let key in data){
                    if(typeof data[key] != 'object'){
                        this[key] = data[key];
                    }
                }

                for(let key in data.activeTime){
                    let itemCfg:ThreeKingdomsActiveCfg;
                    let id = Number(key) + 1;
                    if(!this.activeTime.hasOwnProperty(String(key))){
                        this.activeTime[String(key)]=new ThreeKingdomsActiveCfg();
                    }
                    itemCfg=this.activeTime[String(key)];
                    itemCfg.initData(data.activeTime[key]);
                    itemCfg.id=id;
                }

                for(let key in data.taskList){
                    let itemCfg:ThreeKingdomsTaskListCfg;
                    let id = Number(key) + 1;
                    if(!this.taskList.hasOwnProperty(String(key))){
                        this.taskList[String(key)]=new ThreeKingdomsTaskListCfg();
                    }
                    itemCfg=this.taskList[String(key)];
                    itemCfg.initData(data.taskList[key]);
                    itemCfg.id=id;
                }

                for(let key in data.heroList){
                    let itemCfg:ThreeKingdomsHeroListCfg;
                    let id = Number(key) + 1;
                    if(!this.heroList.hasOwnProperty(String(key))){
                        this.heroList[String(key)]=new ThreeKingdomsHeroListCfg();
                    }
                    itemCfg=this.heroList[String(key)];
                    itemCfg.initData(data.heroList[key]);
                    itemCfg.id=id;
                }

                for(let key in data.cityReward){
                    let itemCfg:ThreeKingdomsCityRewardCfg;
                    let id = Number(key) + 1;
                    if(!this.cityReward.hasOwnProperty(String(key))){
                        this.cityReward[String(key)]=new ThreeKingdomsCityRewardCfg();
                    }
                    itemCfg=this.cityReward[String(key)];
                    itemCfg.initData(data.cityReward[key]);
                    itemCfg.id=id;
                }

                for(let key in data.troop1){
                    let itemCfg:ThreeKingdomsTroop1Cfg;
                    let id = Number(key) + 1;
                    if(!this.troop1.hasOwnProperty(String(key))){
                        this.troop1[String(key)]=new ThreeKingdomsTroop1Cfg();
                    }
                    itemCfg=this.troop1[String(key)];
                    itemCfg.initData(data.troop1[key]);
                    itemCfg.id=id;
                }

                for(let key in data.troopRank1){
                    let itemCfg:ThreeKingdomsTroop1RankCfg;
                    let id = Number(key) + 1;
                    if(!this.troopRank1.hasOwnProperty(String(key))){
                        this.troopRank1[String(key)]=new ThreeKingdomsTroop1RankCfg();
                    }
                    itemCfg=this.troopRank1[String(key)];
                    itemCfg.initData(data.troopRank1[key]);
                    itemCfg.id=id;
                }

                for(let key in data.troop2){
                    let itemCfg:ThreeKingdomsTroop2Cfg;
                    let id = Number(key) + 1;
                    if(!this.troop2.hasOwnProperty(String(key))){
                        this.troop2[String(key)]=new ThreeKingdomsTroop2Cfg();
                    }
                    itemCfg=this.troop2[String(key)];
                    itemCfg.initData(data.troop2[key]);
                    itemCfg.id=id;
                }

                for(let key in data.troopRank2){
                    let itemCfg:ThreeKingdomsTroop2RankCfg;
                    let id = Number(key) + 1;
                    if(!this.troopRank2.hasOwnProperty(String(key))){
                        this.troopRank2[String(key)]=new ThreeKingdomsTroop2RankCfg();
                    }
                    itemCfg=this.troopRank2[String(key)];
                    itemCfg.initData(data.troopRank2[key]);
                    itemCfg.id=id;
                }

                for(let key in data.kingdom1){
                    let itemCfg:ThreeKingdomsZrankRewardCfg;
                    let id = Number(key) + 1;
                    if(!this.kingdom1.hasOwnProperty(String(key))){
                        this.kingdom1[String(key)]=new ThreeKingdomsZrankRewardCfg();
                    }
                    itemCfg=this.kingdom1[String(key)];
                    itemCfg.initData(data.kingdom1[key]);
                    itemCfg.id=id;
                }

                for(let key in data.kingdom2){
                    let itemCfg:ThreeKingdomsZrankRewardCfg;
                    let id = Number(key) + 1;
                    if(!this.kingdom2.hasOwnProperty(String(key))){
                        this.kingdom2[String(key)]=new ThreeKingdomsZrankRewardCfg();
                    }
                    itemCfg=this.kingdom2[String(key)];
                    itemCfg.initData(data.kingdom2[key]);
                    itemCfg.id=id;
                }

                for(let key in data.person1){
                    let itemCfg:ThreeKingdomsPrankRewardCfg;
                    let id = Number(key) + 1;
                    if(!this.person1.hasOwnProperty(String(key))){
                        this.person1[String(key)]=new ThreeKingdomsPrankRewardCfg();
                    }
                    itemCfg=this.person1[String(key)];
                    itemCfg.initData(data.person1[key]);
                    itemCfg.id=id;
                }

                for(let key in data.person2){
                    let itemCfg:ThreeKingdomsPrankRewardCfg;
                    let id = Number(key) + 1;
                    if(!this.person2.hasOwnProperty(String(key))){
                        this.person2[String(key)]=new ThreeKingdomsPrankRewardCfg();
                    }
                    itemCfg=this.person2[String(key)];
                    itemCfg.initData(data.person2[key]);
                    itemCfg.id=id;
                }

                for(let key in data.recharge){
                    let itemCfg:ThreeKingdomsLimitRechargeCfg;
                    let id = Number(key) + 1;
                    if(!this.recharge.hasOwnProperty(String(key))){
                        this.recharge[String(key)]=new ThreeKingdomsLimitRechargeCfg();
                    }
                    itemCfg=this.recharge[String(key)];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id=id;
                }

                for(let key in data.getFood){
                    let itemCfg:ThreeKingdomsGetFoodRewardCfg;
                    let id = Number(key) + 1;
                    if(!this.getFood.hasOwnProperty(String(key))){
                        this.getFood[String(key)]=new ThreeKingdomsGetFoodRewardCfg();
                    }
                    itemCfg=this.getFood[String(key)];
                    itemCfg.initData(data.getFood[key]);
                    itemCfg.id=id;
                }

                for(let key in data.cityRankReward){
                    let itemCfg:ThreeKingdomsCityRankRewardCfg;
                    let id = Number(key) + 1;
                    if(!this.cityRankReward.hasOwnProperty(String(key))){
                        this.cityRankReward[String(key)]=new ThreeKingdomsCityRankRewardCfg();
                    }
                    itemCfg=this.cityRankReward[String(key)];
                    itemCfg.initData(data.cityRankReward[key]);
                    itemCfg.id=id;
                }
            }
            
            public getFightNum(type : number):number{
                return type == 1 ? this.freeNum1 : this.freeNum2;
            }
        }   
        
        export class ThreeKingdomsActiveCfg extends BaseItemCfg{
            /**
             * --type:事件类型 
             * 1：任务期（周一--周五）
             * 2：神将突袭时间（周一--周五） 
             * 3：攻城期第一场 
             *  4：攻城期第二场  
             * 5：激战期 
             * --popularityRange:事件时间
             */
            public id : number = 0;
            public type : number = 0;
            public popularityRange : number[] = [];
        }

        export class ThreeKingdomsTaskListCfg extends BaseItemCfg{
            public id : number = 0;
            //needGem:升级到下一级所需元宝
            public needGem : number = 0;
            //所需门客数
            public servantNeed : number = 0;
            //--needValue1:普通城所需对应资质达到 X  四个城分别对应：武智政魅  主城对应总资质
            public needValue1 : number = 0;
            // --needValue2:主城所需对应资质达到 X  主城对应总资质
            public needValue2 : number = 0;
            //--needTime:完成任务所需时间 单位：秒
            public needTime : number = 0;
            // --addHeroExp:完成任务增加 X 神将经验
            public addHeroExp : number = 0;
            //--getReward:任务奖励
            public getReward : string = '';
        }

        export class ThreeKingdomsHeroListCfg extends BaseItemCfg{
            /**
             * --needExp:升级到本级所需 X 经验，初始为0级
                --addAtk:增加本阵营所有队伍的攻击力： X%
                --addHeroExp:增加本阵营所有队伍血量： X%

             */
            public id : number = 0;
            public needExp : number = 0;
            public addAtk : number = 0;
            public addHeroExp : number = 0;
        }

        export class ThreeKingdomsCityRewardCfg extends BaseItemCfg{
            /**
             * 
             *  --cityType:城池类型：1：守城 2：攻城 3：荆州 4：赤壁
            --addKingdomScore:增加阵营分数
            --specialReward2:个人获得军资
            --getReward:个人获得奖励
             */
            public id : number = 0;
            public cityType : number = 0;
            public addKingdomScore : number = 0;
            public specialReward2 : number = 0;
            public getReward : string = '';
        }

        export class ThreeKingdomsTroop1Cfg extends BaseItemCfg{
            /**
             *--普通城援军加成 每个阵营援军数量达到 X ，则获得对应加成
            --needNum:阵营所需援军数量  单位：亿 
            --addAtk:增强门客攻击力 固定值
             */
            public id : number = 0;
            public needNum : number = 0;
            public addAtk : number = 0;
        }

        export class ThreeKingdomsTroop1RankCfg extends BaseItemCfg{
            /**
             *--needNum:总援军所需数量 单位：亿
            --rank1:排名第一的阵营，门客增加攻击力 固定值
            --rank2:排名第二的阵营，门客增加攻击力 固定值
            --rank3:排名第三的阵营，门客增加攻击力 固定值
             */
            public id : number = 0;
            public needNum : number = 0;
            public rank1 : number = 0;
            public rank2 : number = 0;
            public rank3 : number = 0;
        }

        export class ThreeKingdomsTroop2Cfg extends BaseItemCfg{
            /**
             *--普通城援军加成 每个阵营援军数量达到 X ，则获得对应加成
            --needNum:阵营所需援军数量  单位：亿 
            --addAtk:增强门客攻击力 固定值
             */
            public id : number = 0;
            public needNum : number = 0;
            public addAtk : number = 0;
        }

        export class ThreeKingdomsTroop2RankCfg extends BaseItemCfg{
            /**
             *--needNum:总援军所需数量 单位：亿
            --rank1:排名第一的阵营，门客增加攻击力 固定值
            --rank2:排名第二的阵营，门客增加攻击力 固定值
            --rank3:排名第三的阵营，门客增加攻击力 固定值
             */
            public id : number = 0;
            public needNum : number = 0;
            public rank1 : number = 0;
            public rank2 : number = 0;
            public rank3 : number = 0;
        }

        export class ThreeKingdomsZrankRewardCfg extends BaseItemCfg{
            /**
             * --每周的阵营排名奖励
            getReward:阵营排名奖励，分别对应 第一名、第二名、第三名
             */
            public id : number = 0;
            public getReward : string = '';
        }

        export class ThreeKingdomsPrankRewardCfg extends BaseItemCfg{
            /**
             * --每周的阵营排名奖励
            --rank:排名
            --getReward:个人排名奖励
             */
            public id : number = 0;
            public rank : number[] = [];
            public getReward : string = '';
        }

        export class ThreeKingdomsLimitRechargeCfg extends BaseItemCfg{
            public id : number = 0;
            /*充值额度  单位：元宝*/
            public needGem:number;
            /*获得特殊奖励 粮草*/
            public specialReward1:number;
            /*获得特殊奖励 军资*/
            public specialReward2:number;
        }

        export class ThreeKingdomsGetFoodRewardCfg extends BaseItemCfg{
            /**
             * --rank:排名
            --food2:跨服冲榜的排名获得军资 【跨服权势、亲密、擂台、绝地擂台、跨服皇陵、跨服群芳、定军中原】
             */
            public id : number = 0;
            public rank : number[] = [];
            public food2 : number = 0;
        }

        export class ThreeKingdomsCityRankRewardCfg extends BaseItemCfg{
            /**
             * --普通攻城期每轮排名奖励   每轮根据贡献的兵力，不考虑胜负方   
            --rank:贡献排名
            --specialReward2:获得特殊奖励 军资
            --getReward:个人获得奖励
             */
            public id : number = 0;
            public rank : number[] = [];
            public specialReward2 : number = 0;
            public getReward : string = '';
        }
	}
}
