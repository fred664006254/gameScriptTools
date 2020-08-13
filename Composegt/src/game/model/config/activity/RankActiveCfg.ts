namespace Config
{
	export namespace AcCfg
	{
		export class RankActiveCfg 
		{
			/**
			 * 类型 1：势力冲榜 2：关卡冲榜
			 */
			public type:number;
			public title:string;
			private rankList:Object={};
				
			//是否跨服  1：跨服，活动结束后产出跨服资格  0：不跨服 
			private isCross:number = 0;
			private crossServerType:string = "";
			private rankLength = 0;
			public formatData(data:any):void
			{
				for(var key in data)
				{
					if(key=="rankList")
					{
						for(let rankKey in data[key])
						{
							let itemCfg:RankActiveItemCfg;
							if(!this.rankList.hasOwnProperty(String(rankKey)))
							{
								this.rankList[String(rankKey)]=new RankActiveItemCfg();
							}
							itemCfg=this.rankList[String(rankKey)];
							itemCfg.initData(data[key][rankKey]);
							itemCfg.id=String(rankKey);
						}
					}
					else
					{
						this[key]=data[key];
					}
				}
			}
			public getRankList()
			{
				return this.rankList;
			}
			public getRankLength(){
				if(this.rankLength > 0){
					// console.log("return rankLength...");
					return this.rankLength;
				}
				// console.log("sum ranklength...");
				let l = 0;
				for(let key in this.rankList){
					l ++;
				}
				this.rankLength = l;
				return this.rankLength;
			}
			public getMaxRangValue()
			{
				let lastKList = Object.keys(this.rankList);
				return this.rankList[lastKList[lastKList.length-1]].rank[1];
			}

			public get helpInfo():string
			{
				let helpStr:string = undefined;
				if(this.type == 11)
				{
					helpStr = "acRankActive-"+ this.type + "_Desc";
				}

				if(Api.switchVoApi.checkOpenAllianceRankNewRule()){
					if(LanguageManager.checkHasKey("acrankactive-"+this.type +"-RuleInfo_newRule")){
						helpStr = "acrankactive-"+this.type +"-RuleInfo_newRule";
					}
				} else {
					if(LanguageManager.checkHasKey("acrankactive-"+this.type +"-RuleInfo")){
						helpStr = "acrankactive-"+this.type +"-RuleInfo";
					}
				}

				return helpStr;
			}

			public get titleType():number
			{	
				return this.title ? Config.TitleCfg.getTitleCfgById(this.title).titleType : 0;
			}
		}
		export class RankActiveItemCfg extends BaseItemCfg
		{
			public id:string;
			/**
			 * 排名上下限
			 */
			private rank:[number,number];
		
			/**
			 * 奖励
			 */
			public reward:string = "";
			public reward1:string = "";
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
				return GameData.getRewardItemIcons(this.reward,true,false);
			}
			public get reward1Icons():BaseDisplayObjectContainer[]
			{
				return GameData.getRewardItemIcons(this.reward1,true,false);
			}
			public getRewardTitle():string
			{
				let title = null;
				let rewardsArr:Array<RewardItemVo> = GameData.formatRewardItem(this.reward);
				for(let i:number = 0;i < rewardsArr.length;i++)
				{
					if(rewardsArr[i].type == 11 ){
						title = String(rewardsArr[i].id);
						break;
					}
				}
				return title;
			}
			public getReward1Title():string
			{
				let title = null;
				let rewardsArr:Array<RewardItemVo> = GameData.formatRewardItem(this.reward1);
				for(let i:number = 0;i < rewardsArr.length;i++)
				{
					if(rewardsArr[i].type == 11 ){
						title = String(rewardsArr[i].id);
						break;
					}
				}
				return title;
			}
			
		}
	}
}