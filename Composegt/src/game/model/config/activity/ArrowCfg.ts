namespace Config {
    export namespace AcCfg {
        export class ArrowCfg {
			public type:number = 11100;
            public extraTime: number = 0;
            /** 每充值X元宝获得1只箭只 */
            public arrowCost:number;
        
            /** 每日免费箭只数量*/
            public freeArrow:number;
        
            /** 设定z值出现的区间*/
            public bullseyeTime:number;

            //核心奖励
            public mainReward:number;
        
            /** 每支箭的收益配置
             * ring:环数
             * reward:奖励
             */
            public poolList:{ring:number,reward:{}}[];
        
            /** 活动期间，抽奖次数的进度奖励
             * needRings：所需抽奖次数
             * getReward：奖励
             */
            public phaseReward:{needRings:number,getReward:string}[];

            /** 箭支升级
             * needGem:所需充值额度：单位（元宝）
             * minRing:最低环数
             */
            public levelup:{needGem:number,minRing:number}[];

            /** 设定单向震荡幅度（需调节感受）
             */
            public offsetRate:{};

            /** 射箭次数增加速度提升（需调节感受）
             * needShoots:所需射箭次数
             * addv:速度提升比例
             */
            public speedadd:{needShoots:number,addv:number}[];

            /** 活动期间的冲榜奖励
             * upper:排行榜上限
             * lower:排行榜下限
             * getReward:奖励
             */
            public rankreward:{upper:number,lower:number,getReward:string}[];

            
            private levelList:ArrowLevelItemCfg[];

            private rankList:ArrowRankItemCfg[];

            //解析数据
            public formatData(data: any): void {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];

                    }

                    if(key == "levelup")
                    {
                        this.levelList = [];
                        let i = 0;
                        for(let k in data[key])
                        {
                            let itemcfg = new ArrowLevelItemCfg();
                            itemcfg.initData(data[key][k])
                            itemcfg.id = String(i+1);
                            this.levelList.push(itemcfg);
                            i ++;
                        }
                    }
                    if(key=="rankreward")
					{
                        this.rankList = [];
                         let i = 0;
                        for(let k in data[key])
                        {
                            let itemcfg = new ArrowRankItemCfg();
                            itemcfg.initData(data[key][k])
                            itemcfg.id = String(i+1);
                            this.rankList.push(itemcfg);
                            i ++;
                        }
					}
                }
            }

            public getMaxBoxNeedNum () {
                return this.phaseReward[this.phaseReward.length-1].needRings;
            }
            public getLevelUpList () {
                return this.levelList;
            }
           
			public getRankList()
			{
				return this.rankList;
			}
        }
    
        export class ArrowLevelItemCfg extends BaseItemCfg
        {
            public id:string;

            public needGem:number;

            public minRing:number;
        }

        export class ArrowRankItemCfg extends BaseItemCfg
		{
			public id:string;
			/**
			 * 排名上下限
			 */
			private upper:number;

            private lower:number;
		
			/**
			 * 奖励
			 */
			public getReward:string = "";
            
			public get minRank():number
			{
				return this.upper;
			}
			public get maxRank():number
			{
				return this.lower;
			}

			public get rewardIcons():BaseDisplayObjectContainer[]
			{
				return GameData.getRewardItemIcons(this.getReward,true,false);
			}

			
		}

    }
}