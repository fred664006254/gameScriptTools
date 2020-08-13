
namespace Config
{
	export namespace AcCfg
	{
		/**
		 * 亲密配置
		 */
		export class CrossServerPowerCfg
		{	
			//是否跨服/多区服争霸赛资格
			private _crossServerType:number;
           //获胜区奖励
			private _winServer:string;
			//败区奖励
			private _loseServer:string;
			//排名奖励
			private _rankList:{string:{rank:number[],reward:string}}[];
			//多区服排名奖励
			private _rankList1:{string:{rank:number[],serverRange:number[],reward:string}};
			//多区服区服奖励
			private _serverList1:{string:{rank:number[],reward:string}}[];
						//奖励巾帼
			public specialReward:string;
			public formatData(data:any):void
			{
				if(data.crossServerType){
					this._crossServerType = data.crossServerType;
				}	
				
				this._winServer = data.winServer;
				this._loseServer = data.loseServer;
				this._rankList = data.rankList;
				this._rankList1 = data.rankList1;
				this._serverList1 = data.serverList1;
				//奖励巾帼
				if(data.specialReward){
					this.specialReward = data.specialReward;
				}
			}
			//是否跨服/多区服争霸赛资格
			public getCrossServerType():string
			{
				if(this._crossServerType){
					return this._crossServerType + "";
				}
				return "";
			}

			
			public getWinServerRewards()
			{
				return GameData.getRewardItemIcons(this._winServer,true,true);
			}
			
			public getLossServerRewards()
			{
				return GameData.getRewardItemIcons(this._loseServer,true,true);
			}

			public getMulServerRewards(zonenum)
			{
				this.judgeParam(zonenum);
				return this._serverList1;
			}

			public getMulServerPRankRewards(serverNum:number)
			{
				let curList = {};
				for(let key in this._rankList1){
					let rl = this._rankList1[key];
					let serverRange = rl.serverRange;
					// if(serverNum >= serverRange[0] && serverNum <= serverRange[1]){
					
					// if(serverNum <= serverRange[1]){
					if(serverNum >= serverRange[0]){
						curList[key] = rl;
					}
				}
				return curList;
				// return this._rankList1;
			}

			private judgeParam(zonenum){
				for(var i in this._serverList1){
					let unit : any = this._serverList1[i];
					if(zonenum <= Number(unit.rank[1])){
						unit.rank[1] = zonenum;
						break;
					}
				}
				for(let j in this._serverList1){
					if(Number(i) < Number(j)){
						delete this._serverList1[j];
					}
				}
			}
			
			public getServerRankRewards()
			{
				return this._rankList;
			}
		}
	}
}
