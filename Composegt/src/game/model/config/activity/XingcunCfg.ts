namespace Config
{
	export namespace AcCfg
	{
		export class XingcunCfg 
		{
			
			public totalScoreReward:{needScore:number,reward:string} = undefined;

			
			public dailyTask={};//string:XingcunTaskCfg[] }[] = [];
			public completeTaskReward:{reward:string}[] = [];

			public formatData(data:any):void
			{
              	for (var key in data) {
				  	if (data.hasOwnProperty(key)) {
						  if(key == "dailyTask"){
								for (var key2 in data["dailyTask"]) {
									if(!this.dailyTask[key2])
									{
										this.dailyTask[key2] = [];
									}
									let daydata = data["dailyTask"][key2] ;
									for (var key3 in daydata) {
										if (daydata.hasOwnProperty(key3)) {
											var element = daydata[key3];
											let task = new XingcunTaskCfg()
											task.initData(element );
											task.id = key3;
											this.dailyTask[key2].push(task) ;
										}
									}
							  	}
						  }else{
							  this[key] = data[key];
						  }
				  	}
			  	}
			}

			public getRewardSerId()
			{
				let reward = this.totalScoreReward.reward
				return reward.split("_")[1];
			}
		}

		export class XingcunTaskCfg extends BaseItemCfg
		{
			public questType:string;
			public sortId:string;
			public value:number;
			public mendCost:number;
			public openType:string;
			public reward:string;
			public id:string

		}
	}
}
		
