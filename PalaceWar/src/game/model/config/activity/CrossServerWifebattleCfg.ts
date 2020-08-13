
namespace Config
{
	export namespace AcCfg
	{
		/**
		 * 亲密配置
		 */
		export class CrossServerWifeBattleCfg
		{	
            //--每日对战次数
            private dailyNum:number;
            
            //--每次间隔时间 单位（秒）
            private intervalTime:number;
            
            //--对战消耗道具
            private rankRange:any;

            //--对战消耗道具
            private fightAdd:string;

            //--个人解锁条件  拥有红颜册封的星级大于等于X
            private unlock_wifeStar:number;

            //--显示最近X条对战记录
            private dataParameter:number;

            //--红颜连续战斗次数
            private battleTime:number;

            //--每1位红颜册封加成
            private talentStatusBuff:number;

            //--每次获胜跨服红颜对战分数奖励  score红颜对战分数  胜利分数 = 胜利基础分数 + 战胜人数 * 战胜人数分数
            private victoryScore:any;

            //--每次失败跨服红颜对战分数奖励  score红颜对战积分数  失败分数 = 失败基础分数 + 失败击杀人数 * 失败击杀人数分数
            private lostScore:any;
            
            //--是否是跨服/多区服争霸赛
            private crossServerType:number;

            //--两区跨服获胜区奖励
            private winServer:string;
            
            //--两区跨服战败区奖励
            private loseServer:string;

            //--两区跨服排名奖励
            private rankList:any[];

            //--多区跨服区服奖励
            private serverList1:any[];

            // --多区跨服排名奖励
            private rankList1:any[];

            // --红颜对战加成效果；增加1才艺对应增加才情的系数；才情值 =（红颜亲密*3+红颜魅力*3+红颜才艺*4）* （1+册封人数buff） + 才艺提升才情系数 * 活动期间才艺提升值
            // --artistryRange：活动期间才艺提升值
            // --rankBuff：才艺提升才情系数
            public wifeBattleBuff:any[];


			
			public formatData(data:any):void
			{
                for(var key in data){
                    this[key] = data[key];
                }  
			}
			//是否跨服/多区服争霸赛资格
			public getCrossServerType():string
			{
				if(this.crossServerType){
					return this.crossServerType + "";
				}
				return "";
			}
			public getWinServerRewards()
			{
				return GameData.getRewardItemIcons(this.winServer,true,true);
			}
			
			public getLossServerRewards()
			{
				return GameData.getRewardItemIcons(this.loseServer,true,true);
			}

			public getMulServerRewards(zonenum)
			{
				// this.judgeParam(zonenum);
				// return this.serverList1;
				let rList = [];
				for(let key in this.serverList1){
					rList.push(this.serverList1[key]);
				}
				return rList;
			}

			public getMulServerPRankRewards()
			{
				// return this.rankList1;
				let rList = [];
				for(let key in this.rankList1){
					rList.push(this.rankList1[key]);
				}
				return rList;
			}

			private judgeParam(zonenum){
				for(var i in this.serverList1){
					let unit : any = this.serverList1[i];
					if(zonenum <= Number(unit.rank[1])){
						unit.rank[1] = zonenum;
						break;
					}
				}
				for(let j in this.serverList1){
					if(Number(i) < Number(j)){
						delete this.serverList1[j];
					}
				}
			}
			
			public getServerRankRewards()
			{
				let rList = [];
				for(let key in this.rankList){
					rList.push(this.rankList[key]);
				}
				return rList;
			}

			// public getArr(key):Array<any>{	
			// 	let arr:Array<any> =[];
			// 	let cfg : Config.AcCfg.CrossServerWipeBossCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
			// 	if(!cfg)
			// 	{
			// 		return [];
			// 	}
			// 	let list = cfg;  

			// 	for(var i in list)
			// 	{
			// 		if(i == key)
			// 		{	
			// 			for(var key2 in list[i])
			// 			{	
			// 				if(list[i][key2])
			// 				{
			// 					var currObj =  list[i][key2]
			// 					if(currObj.rank || currObj.needGem || currObj.limit || currObj.bossScore)
			// 					{
			// 						list[i][key2].key = Number(key2)+1;
			// 						if(list[i][key2].key)
			// 						{
			// 							arr.push(list[i][key2]); 
			// 						}
			// 					} 
			// 				} 
			// 			} 
			// 		}
			// 	}
			// 	return arr;  
			// }


		}
	}
}
