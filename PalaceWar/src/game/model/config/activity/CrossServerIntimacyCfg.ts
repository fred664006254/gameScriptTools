
namespace Config
{
	export namespace AcCfg
	{
		/**
		 * 亲密配置
		 */
		export class CrossServerIntimacyCfg
		{	
			//展示期
			public extraTime:number;			
			//获胜区奖励
			private _winServer:string;
			//败区奖励
			private _loseServer:string;
			//排名奖励
			private _rankList:{string:{rank:number[],reward:string}}[];
			//多区服排名奖励
			private _rankList1:{string:{rank:number[],reward:string}}[];
			//多区服区服奖励
			private _serverList1:{string:{rank:number[],reward:string}}[];
			//兑换奖励
			public change:any;
			//参与活动任务所需官职
			public needLv:number;
			//战旗助威截止时间  活动结束前的 X 小时  不算展示期的
			public lastTime:number;
			//战旗助威的最大人数
			public flagPeopleNum:number;
			//1战旗 = X基础人气币  活动结束后返还的人气币数量 = 助威人排名返还倍率 * 战旗基础人气币 * 助威数量
			public flagScoreNum1:number;
			//1战旗 = X人气      
			public flagScoreNum2:number;
			//发奖规则
			public rewardList:any[] = [];
			//助威人排名返还
			public flagScoreRebate:any[] = [];
			//任务
			private _taskList:CrossServerImacyTaskItemCfg[] = [];
			//积分商店
			private _flagScoreShopList:CrossServerImacyFlagScoreItemCfg[] = [];
			//道具商店
			private _flagScoreShop2List:CrossServerImacyFlagScoreItemCfg[] = [];			
			//多区服排名奖励
			private rankList1:any;
			//多区服区服奖励
			private serverList1:any;
			//多区服排名奖励
			private rankList2:any;
			//多区服区服奖励
			private serverList2:any;
			//多区服排名奖励
			private rankList3:any;
			//多区服区服奖励
			private serverList3:any;
			//多区服排名奖励
			private rankList4:any;
			//多区服区服奖励
			private serverList4:any;
			//多区服排名奖励
			private rankList5:any;
			//多区服区服奖励
			private serverList5:any;
			//多区服排名奖励
			private rankList6:any;
			//多区服区服奖励
			private serverList6:any;			
			public formatData(data:any):void
			{
				this._winServer = data.winServer;
				this._loseServer = data.loseServer;
				this._rankList = data.rankList;
				this._rankList1 = data.rankList1;
				this._serverList1 = data.serverList1;
				for (let key in data){
					this[key] = data[key];
					if (key == "task"){
						this._taskList = [];
						for (let k in data[key]){
							let item = new CrossServerImacyTaskItemCfg();
							item.initData(data[key][k]);
							item.id = Number(k) + 1;
							this._taskList.push(item);
						}
					}
					else if (key == "flagScoreShop"){
						this._flagScoreShopList = [];
						for (let k in data[key]){
							let item = new CrossServerImacyFlagScoreItemCfg();
							item.initData(data[key][k]);
							item.id = Number(k) + 1;
							item.isItem = false;
							this._flagScoreShopList.push(item);
						}
					}
					else if (key == "flagScoreShop2"){
						this._flagScoreShop2List = [];
						for (let k in data[key]){
							let item = new CrossServerImacyFlagScoreItemCfg();
							item.initData(data[key][k]);
							item.id = Number(k) + 1;
							item.isItem = true;
							this._flagScoreShop2List.push(item);
						}
					}						
				}				
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

			public getMulServerPRankRewards()
			{
				return this._rankList1;
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
			//task
			public getTaskList():CrossServerImacyTaskItemCfg[]{
				return this._taskList;
			}
			public getShopList():CrossServerImacyFlagScoreItemCfg[]{
				return this._flagScoreShopList;
			}		
			//shop2
			public getShop2List():CrossServerImacyFlagScoreItemCfg[]{
				return this._flagScoreShop2List;
			}				
		}
		//任务
        class CrossServerImacyTaskItemCfg extends BaseItemCfg
        {
            public id:number;
            //跳转
            public openType:string;
            //任务类型
            public questType:number;
            //进度
            public value:number;
            //奖励
            public getReward:string;
            //特殊奖励
            public special1:number;
            public sortId:number;
        }

		//旗帜积分商店
        class CrossServerImacyFlagScoreItemCfg extends BaseItemCfg
        {
            public id:number;
            //排行榜上限
            public cost:number;
            // limitType:0：不限购；1：每天限购；4:活动期间购买数量限制
            public limitType:number;
            // limitNum:限购次数 0：无作用
            public limitNum:number;
            // sell:商店内容
            public sell:string;
            // 是否是兑换的道具
            public isItem:boolean;			
        }		
	}
}
