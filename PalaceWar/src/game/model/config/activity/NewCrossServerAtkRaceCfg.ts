
namespace Config
{
	export namespace AcCfg
	{
		/**
		 * 擂台配置
		 */
		export class NewCrossServerAtkRaceCfg
		{	

            /**
			 * 展示时间
			 */
			public extraTime:number;

            /**
			 * 资格产生时间24小时制
			 */
			private starTime:number;

             /**
			 * 调整阵容截止时间24小时制
			 */
			private endTime:number;

			/**
			 * 每日武馆次数
			 */
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
			public parameter1:number;
			/**
			 * 击杀对方门客数量大于等于X，会被记入仇人列表
			 */
            private parameter2:number;
			/**
			 * 每击杀X个门客，获得一个翻牌奖励
			 */
			private parameter3:number;

			/**
			 * 玩家门客总数对应的buff
			 */
			private baseBuff:Object;


			public buff:any = null;
			/**
			 * 每次获胜奖励
			 */
			private victory:NewCSARVitctoryItemCfg[] = [];


			public winServer:string;
			public loseServer:string;
			public rankList:{string:{rank:number[],reward:string}}[];
			//多区服排名奖励
			public rankList1:{string:{rank:number[],reward:string}}[];
			 //多区服区服奖励
			public serverList1:{string:{rank:number[],reward:string}}[];
			 //群雄擂台中，攻击lowerLimit1分数的玩家不再加分，对手不再减分
			public lowerLimit1:number;
			 //群雄擂台中，攻击比自己低lowerLimit2分数的玩家不再加分，对手不再减分
			public lowerLimit2:number;
			//群雄擂台中，对手排名前lowerLimit3时，正常加减分
			public lowerLimit3:number;
			//名望席位
			private fameSeatList:NewCSARFameSeatItem[] = [];
			//江湖席位每天免费挑战次数
			public freePres:number;
			//江湖席位挑战花费元宝，超过最大取最大值
			public presCost:number[] = [];

			
			public formatData(data:any):void
			{	
				this.lowerLimit1 = data.lowerLimit1;
				this.lowerLimit2 = data.lowerLimit2;
				this.lowerLimit3 = data.lowerLimit3;
                this.extraTime = data.extraTime;
                this.starTime = data.starTime;
                this.endTime = data.endTime;
				this.dailyNum = data.dailyNum;
				this.intervalTime = data.intervalTime;
				this.fightAdd = data.fightAdd;
				this.revenge = data.revenge;
				this.challenge = data.challenge;
				this.hunt = data.hunt;
				this.parameter1 = data.parameter1;
				this.parameter2 = data.parameter2;
				this.parameter3 = data.parameter3;
				this.baseBuff = data.baseBuff;
				this.buff = data.buff;
				this.freePres = data.freePres;
				this.presCost = data.presCost;

				this.victory.length = 0;
				for(let key in data.victory)
                {
                    let itemCfg:NewCSARVitctoryItemCfg;
					let id = Number(key) + 1;
                    if(!this.victory[id])
                    {
                        this.victory[id]=new NewCSARVitctoryItemCfg();
                    }
                    itemCfg=this.victory[id];
                    itemCfg.initData(data.victory[key]);
                    itemCfg.id=id;
				}
				
				for (let key in data.pres){
					let item = new NewCSARFameSeatItem();
					item.initData(data.pres[key]);
					item.id = key;
					let index = Number(key.split("t")[1]);
					item.index = index;
					this.fameSeatList.push(item);
					this.fameSeatList.sort((a, b)=>{return a.index - b.index});
				}

				this.winServer = data.winServer;
				this.loseServer = data.loseServer;
				this.rankList = data.rankList;
				this.rankList1 = data.rankList1;
				this.serverList1 = data.serverList1;
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
			 * 名望席位
			 */
			public getFameSeatList():NewCSARFameSeatItem[]{
				return this.fameSeatList;
			}


			/**
			 * 每次间隔时间 单位（秒）
			 */
			public getIntervalTime():number
			{
				return this.intervalTime;
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

			public getBaseBuff():number[]
			{	
				let buffAtk:number = 0;
				let buffCrit:number = 0;
				for (let k in this.baseBuff)
				{
					let onebuff = this.baseBuff[k];
					let needv = onebuff["1"].needAbility;
					let servantCount = Api.atkracecrossVoApi.getNewCrossVo().getBuffBookValueCount(needv);

					let oneValue1 = 0;
					let oneValue2 = 0;
					for (let j in onebuff)
					{
						let threebuff = onebuff[j];
						if (servantCount >= threebuff.servantNum)
						{	
							if (threebuff.addAtk)
							{
								oneValue1 =  threebuff.addAtk;
							}
							if (threebuff.addCrit)
							{
								oneValue2 =  threebuff.addCrit;
							}
							
						}
						else 
						{
							break;
						}
					}
					buffAtk += oneValue1;
					buffCrit += oneValue2;
				}
				return [buffAtk,buffCrit];
			}

			public getBaseBuffListById(k:number):any[]
			{
				let v = [];
				let onebuff = this.baseBuff[k];
				for (let j in onebuff)
				{
					let threebuff = onebuff[j];
					v.push(threebuff);
				}
				return v;
			}

			public getBaseBuffList():any[]
			{	
				let v = [];
				for (let k in this.baseBuff)
				{
					let onebuff = this.baseBuff[k];
					let needv = onebuff["1"].needAbility;
					let servantCount = Api.atkracecrossVoApi.getNewCrossVo().getBuffBookValueCount(needv);
					let oneValue1 = 0;
					let oneValue2 = 0;
					let level = 0;
					let onetype = onebuff["1"].addAtk>0 ?  1:2;
					for (let j in onebuff)
					{
						let threebuff = onebuff[j];
						if (servantCount >= threebuff.servantNum)
						{	
							if (threebuff.addAtk)
							{
								oneValue1 =  threebuff.addAtk;
							}
							else if (threebuff.addCrit)
							{
								oneValue2 =  threebuff.addCrit;
							}
							level = Number(j);
						}
						else 
						{
							break;
						}
					}
					let onev = {id:k, needv: needv, lv :level , type : onetype, v1:oneValue1, v2 : oneValue2, maxLv : Object.keys(onebuff).length, sc:servantCount}
					v.push(onev);
				}
				return v;
			}

		}

		export class NewCSARVitctoryItemCfg extends BaseItemCfg
		{
			public id: number;
            /**
			 * 衙门积分
			 */
			public score:number;
			/**
			 * 书籍经验
			 */
			public abilityExp:number;
			/**
			 * 士气数量
			 */
			public point:number;
		}

		export class NewCSARFameSeatItem extends BaseItemCfg{
			//第几个等级
			public index:number = 0;
			public id:string = null;
			// --seatNumber:基础席位数量
			public seatNumber:number = 0;
			//perMaxSeat
			public perMaxSeat:number;
			public addSeat:number;
			public baseBuff:number;
			public addBuff:number;
		}
	}

	
}
