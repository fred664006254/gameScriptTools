namespace Config
{
	export namespace AcCfg
	{
		export class FlipCardCfg 
		{
			//价格区间
			public costRange:number[] = [];
			
			//铜色1张卡牌进度值
			public copperyCardValue:number=1;
			
			// --银色1张卡牌进度值
			public silveryCardValue:number=2;
			
			//--金色1张卡牌进度值
			public goldenCardValu:number=4;
			
			//--进度兑换
			public valueMax:number=150;
			
			//--银卡数量；必然有1个位置是银卡，可能有1个位置是金卡（不是金卡时是铜卡），其余是铜卡
			public silveryCardNum:number=1;
			
			//--金卡出现概率；6张牌中最多1个
			public goldenCardRate:number=0.1;

			//--刷新卡牌价格（元宝）
			public refrestPrice:number=50;
			
			//--抽取铜卡奖励池
			public copperyPool:number[][] = [];
			// {
			// 	{"6_1301_1",70,0,0},
			// 	{"6_1303_2",20,0,0},
			// 	{"6_1302_3",10,0,0},
			// },
			public wifeID:string = undefined;
			//--抽取银卡奖励池
			public silveryPool:number[][] = [];
			//--抽取金卡奖励池
			public goldenPool:number[][] = [];
		
			public ReviewNum:{needNum:number,getReward:string}[] = [];
        	public _task:{openType:string,questType:number,value:number,getReward:string}[] = [];
			public taskList:FlipCardTaskItemCfg[] = []

			public get task()
			{
				return this.taskList;
			}
			public formatData(data:any):void
			{
              	for (var key in data) {
				  	if (data.hasOwnProperty(key)) {
						
						if(key == "task")
                        {
                            this.taskList = [];
                            let i = 0;
                            for(let k in data[key])
                            {
                                let itemcfg = new FlipCardTaskItemCfg();
                                itemcfg.initData(data[key][k])
                                itemcfg.id = String(i+1);
                                this.taskList.push(itemcfg);
                                i ++;
                            }
                        }else{
							this[key] = data[key];
						}
					}
			  	}
			}

			public getCardAddVaule(ctype:number){
				if(ctype == 3)
				{
					return this.copperyCardValue;
				}else if(ctype == 2)
				{
					return this.silveryCardValue;
				}else if(ctype == 1)
				{
					return this.goldenCardValu;
				}
				return 0;
			}

			public getWifeID()
			{
				return this.wifeID;
			}
		}

		/**
         * 任务的
         */
        export class FlipCardTaskItemCfg extends BaseItemCfg
        {
            /**任务ID */
            public id:string;

            public openType:string = null;
            /**
             * 任务类型
             */
            public questType:string;
            /**
             * 任务进度
             */
            public value:number;
            /**奖励 */
            public getReward:string;
        }
	}
}

/**
 * ["activity.getflipcardreward"] = "翻牌活动-单次翻牌奖励",
    --参数 activeId 活动Id
    --参数 抽奖 tid   X
    --返回 model activity
    --返回 model rewards奖励信息
    
    
    ["activity.getflipcardallreward"] = "翻牌活动-剩余牌全部翻奖励",
    --参数 activeId 活动Id
    --返回 model activity
    --返回 model rewards奖励信息
    
    
    ["activity.getflipcardreplace"] = "翻牌活动-刷新牌组",
    --参数 activeId 活动Id
    --返回 model activity
    
    
    ["activity.getflipcardboxreward"] = "翻牌活动-领取箱子奖励",
    --参数 activeId 活动Id
    --参数 gid：第几阶段 
    --返回 model activity
    --返回 model rewards奖励信息
    
    
    ["activity.getflipcardtaskreward"] = "翻牌活动-领取任务奖励",
    --参数 activeId 活动Id
    --参数 taskId 任务档位id
    --返回 model activity,userinfo,item
    --返回 data.rewards 奖励



 */


		
