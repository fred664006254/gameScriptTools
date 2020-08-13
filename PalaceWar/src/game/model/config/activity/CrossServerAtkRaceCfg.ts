
namespace Config
{
	export namespace AcCfg
	{
		/**
		 * 擂台配置
		 */
		export class CrossServerAtkRaceCfg
		{	
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

			public winServer:string;
			public loseServer:string;
			public rankList:{string:{rank:number[],reward:string}}[];
			//多区服排名奖励
			public rankList1:{string:{rank:number[],reward:string}}[];
			 //多区服区服奖励
			public serverList1:{string:{rank:number[],reward:string}}[];

			public change:any;
			public extraTime:number;
			public lastTime:number = 0;
			public needLv:number = 0;
			public flagPeopleNum:number = 10;
			public flagScoreNum1:number = 10;
			public flagScoreNum2:number = 10;
			public flagScoreRebate:any;
			//任务
			private _taskList:CrossAtkraceTaskItemCfg[] = [];
			//积分商店
			private _flagScoreShopList:CrossAtkraceFlagScoreItemCfg[] = [];
			//道具商店
			private _flagScoreShop2List:CrossAtkraceFlagScoreItemCfg[] = [];			
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

				this.iniAtt = data.iniAtt;
				this.juniorAtt = data.juniorAtt;
				this.mediumAtt = data.mediumAtt;
				this.seniorAtt = data.seniorAtt;
				this.winServer = data.winServer;
				this.loseServer = data.loseServer;
				this.rankList = data.rankList;
				this.rankList1 = data.rankList1;
				this.serverList1 = data.serverList1;

				this.change = data.change;
				this.extraTime = data.extraTime;
				this.flagScoreRebate = data.flagScoreRebate;
				this.needLv = data.needLv;
				this.lastTime = data.lastTime;
				this.flagPeopleNum = data.flagPeopleNum;
				this.flagScoreNum1 = data.flagScoreNum1;
				this.flagScoreNum2 = data.flagScoreNum2;
				if (data["task"])
				{
					this._taskList = [];
					for (let k in data["task"])
					{
						let item = new CrossAtkraceTaskItemCfg();
						item.initData(data["task"][k]);
						item.id = Number(k) + 1;
						this._taskList.push(item);
					}
				}
				if (data["flagScoreShop"])
				{
					this._flagScoreShopList = [];
					for (let k in data["flagScoreShop"])
					{
						let item = new CrossAtkraceFlagScoreItemCfg();
						item.initData(data["flagScoreShop"][k]);
						item.id = Number(k) + 1;
						item.isItem = false;
						this._flagScoreShopList.push(item);
					}
				}
				if (data["flagScoreShop2"])
				{
					this._flagScoreShop2List = [];
					for (let k in data["flagScoreShop2"])
					{
						let item = new CrossAtkraceFlagScoreItemCfg();
						item.initData(data["flagScoreShop2"][k]);
						item.id = Number(k) + 1;
						item.isItem = true;
						this._flagScoreShop2List.push(item);
					}
				}				
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

			public getMulServerPRankRewards()
			{
				return this.rankList1;
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

			//task
			public getTaskList():CrossAtkraceTaskItemCfg[]{
				return this._taskList;
			}
			public getShopList():CrossAtkraceFlagScoreItemCfg[]{
				return this._flagScoreShopList;
			}		
			//shop2
			public getShop2List():CrossAtkraceFlagScoreItemCfg[]{
				return this._flagScoreShop2List;
			}			
		}
        class CrossAtkraceTaskItemCfg extends BaseItemCfg
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
        class CrossAtkraceFlagScoreItemCfg extends BaseItemCfg
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
