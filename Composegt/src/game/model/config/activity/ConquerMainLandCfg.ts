namespace Config{
	export namespace AcCfg{
		export class ConquerMainLandCfg{
           /**展示时间 */
			public extraTime : number = 1;
			/**驻扎城池结算时间（s）：占领每达到 X 秒获得一次积分*/
			public settleTime : number = 0;
			/** --队务详情
				--numberOfTeam:玩家队伍数量限制
				--main:每队门客数
				--warTime:每名门客每日初始参战次数
				--cd:每名门客出战次数恢复CD，单位:秒，积累次数最大不可超过初始上限
				--buyTime:使用元宝恢复次数消耗(超上限取上限)
				--successive:每名门客最高连胜，超过后下场 */
			public teamInfo : any = null;
			/** --时间与分数倍率。倍率为0的时间段为休战期
				--startTime:开始时间
				--endTime:结束时间
				--buff:分数倍率：获得分数 = 位置分数 * 分数倍率*/
			public timeAndBuff : any = null;
			/**--建筑加分
				--buildingNum:该类建筑数量
				--segmentation:可容纳队伍数
				--initial:初始守城军战力
				--getScore:位置分数 */
			public mainLand : any = null;
			/**--个人排名奖励
				--idvRank:排名
				--getReward:奖励*/
			public indivdualRank : any = null;

			/**--区服排名奖励
       	 	--serRank:排名
        	--getReward:奖励*/
        	public serverRank :any = null;

			public mainReward:number = 0;

			public prankList:any[] = [];
			public zrankList:any[] = [];

			public servantAttBuff:{attIncrease:number[],rankBuff:number}[] = null;
		   /**
			* 初始化数据
			*/
		    public formatData(data: any): void {
			   	for(let key in data){
				   this[key] = data[key];
				   if(key == 'indivdualRank'){
					  this.prankList = [];
					  let i = 0;
					  for(let k in data[key])
					  {
						  let itemcfg = new ConquerMainLandRankItemCfg();
						  itemcfg.initData(data[key][k])
						  itemcfg.id = String(i+1);
						  this.prankList.push(itemcfg);
						  i ++;
					  }
					}
					if(key == 'serverRank'){
						this.zrankList = [];
						let i = 0;
						for(let k in data[key])
						{
							let itemcfg = new ConquerMainLandRankItemCfg();
							itemcfg.initData(data[key][k])
							itemcfg.id = String(i+1);
							this.zrankList.push(itemcfg);
							i ++;
						}
					  }
				}
				   
			}
			
			public get maxBuffLevel():number{
				return this.servantAttBuff.length;
			}
		}
		export class ConquerMainLandRankItemCfg extends BaseItemCfg
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
			public initData(data:any):void
            {
                if(data)
                {
                    for(var key in data)
                    {
						this[key]=data[key];
						if(key == 'idvRank'|| key == 'serRank'){
							this.lower = data[key][1];
							this.upper = data[key][0];
						}
                    }
                }
            }
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
