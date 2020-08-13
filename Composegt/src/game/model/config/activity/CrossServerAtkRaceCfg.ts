
namespace Config
{
	export namespace AcCfg
	{
		/**
		 * 擂台配置
		 */
		export class CrossServerAtkRaceCfg
		{	
			private crossServerType:number;
			/**
			 * 解锁条件  拥有 X 个门客
			 */
			private unlock:number;

			/**
			 * 门客等级
			 */
			private servantLv:number;

			
			private dailyNum:number;

			/**
			 * 每次间隔时间 单位（秒）
			 */
			private intervalTime:number;

			/**
			 * 出使消耗道具
			 */
			private fightAdd:string;

			/**
			 * 复仇消耗道具
			 */
			private revenge:string;

			/**
			 * 挑战消耗道具
			 */
			private challenge:string;

			/**
			 * 追杀消耗道具 暂用道具
			 */
			private hunt:string;

			/**
			 * 额外出使次数： 大于等于60级门客数量 / parameter1  向下取整
			 */
			private parameter1:number;
			private parameter3:number;

			private iniAtt:Object;
			private juniorAtt:Object;
			private mediumAtt:Object;
			private seniorAtt:Object;

			//奖励巾帼
			public specialReward:string;



			public winServer:string;
			public loseServer:string;
			public rankList:{string:{rank:number[],reward:string}}[];
			//多区服排名奖励
			public rankList1:{string:{rank:number[],serverRange:number[],reward:string}};
			 //多区服区服奖励
			public serverList1:{string:{rank:number[],reward:string}}[];
			public formatData(data:any):void
			{
				this.unlock = data.unlock;
				this.servantLv = data.servantLv;
				this.dailyNum = data.dailyNum;
				this.intervalTime = data.intervalTime;
				this.fightAdd = data.fightAdd;
				this.revenge = data.revenge;
				this.challenge = data.challenge;
				this.hunt = data.hunt;
				this.parameter1 = data.parameter1;
				this.parameter3 = data.parameter3;

				//奖励巾帼
				if(data.specialReward){
					this.specialReward = data.specialReward;
				}

				this.iniAtt = data.iniAtt;
				this.juniorAtt = data.juniorAtt;
				this.mediumAtt = data.mediumAtt;
				this.seniorAtt = data.seniorAtt;
				this.winServer = data.winServer;
				this.loseServer = data.loseServer;
				this.rankList = data.rankList;
				this.rankList1 = data.rankList1;
				this.serverList1 = data.serverList1;
				if(data.crossServerType){
					this.crossServerType = data.crossServerType;
				}
			}
			//是否是跨服/多区服争霸赛
			public getCrossServerType():string
			{
				if(this.crossServerType){
					return this.crossServerType + "";
				}
				return "";
			}
			/**
			 * 每日武馆次数
			 */
			public getDailyNum():number
			{
				return this.dailyNum;
			}

			/**
			 * 额外出战系数
			 */
			public getParameter1():number
			{
				return this.parameter1;
			}

			/**
			 * 门客等级限制
			 */
			public getServantLv():number
			{
				return this.servantLv;
			}

			/**
			 * 每次间隔时间 单位（秒）
			 */
			public getIntervalTime():number
			{
				return this.intervalTime;
			}

			/**
			 * 解锁条件  拥有 X 个门客
			 */
			public getUnlock():number
			{
				return this.unlock;
			}

			/**
			 * 初始属性
			 */
			public getInitAtt(key:string):Object
			{
				return this.iniAtt[key];
			}
			/**
			 * 初级属性
			 */
			public getJuniorAtt(key:string):Object
			{
				return this.juniorAtt[key];
			}
			/**
			 * 中级属性
			 */
			public getMediumAtt(key:string):Object
			{
				return this.mediumAtt[key];
			}
			/**
			 * 高级属性
			 */
			public getSeniorAtt(key:string):Object
			{
				return this.seniorAtt[key];
			}

			public getFightAdd():string
			{
				return this.fightAdd;
			}
			/**
			 * 上榜条件 击败多少名
			 */
			public getbeatNum():number
			{
				return this.parameter3;
			}
			
			public getWinServerRewards()
			{
				return GameData.getRewardItemIcons(this.winServer,true,true);
			}
			public getLossServerRewards()
			{
				return GameData.getRewardItemIcons(this.loseServer,true,true);
			}

			public getServerRankRewards()
			{
				return this.rankList;
			}

			public getMulServerRewards(zonenum)
			{
				this.judgeParam(zonenum);
				return this.serverList1;
			}

			public getMulServerPRankRewards(serverNum:number)
			{

				let curList = {};
				for(let key in this.rankList1){
					let rl = this.rankList1[key];
					let serverRange = rl.serverRange;
					// if(serverNum >= serverRange[0] && serverNum <= serverRange[1]){
					if(serverNum >= serverRange[0]){
						curList[key] = rl;
					}
				}
				return curList;


				// return this.rankList1;
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
		}
	}
}
