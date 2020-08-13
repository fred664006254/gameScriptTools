namespace Config
{
	export namespace AcCfg
	{
		export class FanliReviewCfg 
		{
			public cost:number;	
        				
			//1次回顾获得记忆碎片				
			public ReviewItem="6_2113_1";
							
			//记忆碎片上限				
			public ReviewItemNum=100;				
							
			//范蠡皮肤ID				
			public fanliSkinId=10341;				
							
			//100次回顾获得范蠡皮肤				
			public ReviewReward="19_10341_1";	
							
			//1次回顾获得记忆传承x个				
			public ReviewPool = []		
			// 	{"6_2114_1",70,0,0},				
			// 	{"6_2114_2",20,0,0},				
			// 	{"6_2114_3",10,0,0},				
			// },				
        				
        //-活动期间，抽奖次数的进度奖励				
        //needNum：所需回顾次数				
        //getReward：奖励				
        	public ReviewNum:{needNum:number,getReward:string}[] = [];
	
			public formatData(data:any):void
			{
              	for (var key in data) {
				  	if (data.hasOwnProperty(key)) {
					  	this[key] = data[key];
				  	}
			  	}
			}

			public getServantSkinId()
			{
				return this.ReviewReward.split("_")[1];
			}
		}
	}
}
		
