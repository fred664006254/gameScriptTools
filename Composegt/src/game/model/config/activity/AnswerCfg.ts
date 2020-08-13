namespace Config
{
	export namespace AcCfg
	{
		export class AnswerCfg 
		{
			//需要x活力达成才能进行一次答题
			public cost:number;
			//答题总次数
			public answerTime:number=3;
			
			//单次答题数量
			public answerNum:number=10 ;
			
			//答题初始时间要求：秒
			public timeLimit:number=30 ;
			
			//每秒时间扣除分数
			public timeCost:number=2 ;
			
			//答错给予基础分
			public answerWrong:number=5 ;
			
			//答对给予最高分
			public answerRight:number=100 ;
			
			//题库列表
			//rightAnswer:正确答案
			//weight:筛选权重
			//prizePool:奖池
			
			public poolList:{rightAnswer:number,weight:number,prizePool:{},questionID:string }[] = []
			
			//活动期间的积分范围的额外奖励
			//scoreRange:积分范围
			//getReward:奖励
			
			public ranklist:{scoreRange:number[],getReward:string}[] =[];


			public totalRanking:{scoreRange:number[],getReward:string}[] =[];

			public titleId = 4114;
			public formatData(data:any):void
			{
				if(data)
				{
					for(var key in data)
					{
						this[key]=data[key];
						if(key == 'mainReward'){
							this.titleId = GameData.formatRewardItem(data[key])[0].id;
						}
					}
				}
			}
			
		}
	}
}