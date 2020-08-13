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
				if(unlockList[key].gameName)
				{ 
					let functionName:string = "checkOpen"+App.StringUtil.firstCharToUper(unlockList[key].gameName);
					if(Api.switchVoApi[functionName])
					{
						if(Api.switchVoApi[functionName]())
						{
							arr.push(unlockList[key]);
						}
					}
					else
					{
						arr.push(unlockList[key]);
					}
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