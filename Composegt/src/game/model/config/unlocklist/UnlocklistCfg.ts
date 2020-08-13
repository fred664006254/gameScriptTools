namespace Config
{
	 
	export namespace UnlocklistCfg 
	{
	    let unlockList: Object = {};	
	
		
		export function formatData(data: any): void 
		{
	
			for (var key in data) 
			{
				let prisonItemCfg: UnlocklistItemCfg;
				if (!unlockList.hasOwnProperty(String(key))) 
				{
					unlockList[String(key)] = new UnlocklistItemCfg();
				}
				prisonItemCfg = unlockList[String(key)];
				prisonItemCfg.initData(data[key]);
				prisonItemCfg.key =key;
				this.prisonItemCfg = prisonItemCfg;
			}
		}

	export function getUnlockItemCfgList():Array<UnlocklistItemCfg>
		{
			let arr:Array<UnlocklistItemCfg> = new Array();
			for(let key in unlockList)
			{
				if(key == "1")
				{
					if(PlatformManager.checkIsWxCfg())
					{
						if(Api.switchVoApi.checkOpenPrison())
						{
							arr.push(unlockList[key]);
						}	
					}
					else{
						arr.push(unlockList[key]);
					}	
				}else{
					arr.push(unlockList[key]);
				}
				
			}
			
			arr.sort(function(a: any,b: any):number
			{
				if(a.sortId > b.sortId) return 1;
				else if(a.sortId == b.sortId) return 0;
				return -1;
			});
			return arr; 
		}
	// //根据ID 返回当前配置
	// export function getIndexPrisonItemCfg(index:number=0):any
	// {

	// 	for(let key in prisonItemList)
	// 	{
	// 		if(key==""+index)
	// 		{
	// 	    	return prisonItemList[key]
	// 		}
	// 	}
		 
	// }
	  
	  
	export class UnlocklistItemCfg extends BaseItemCfg 
	{
		public  sortId:number =0;
		public  gameName:string = null; 
		public  reward:string = null;
		public  key:string =null;
		public  butType:boolean =true;
	}
  }
	
}