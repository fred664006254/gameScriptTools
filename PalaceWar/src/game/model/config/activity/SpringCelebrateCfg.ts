namespace Config
{
	export namespace AcCfg
	{	
		var  celeBrateList: Array<any> = [];
		
		export class SpringCelebrateCfg 
		{
			private itemListCfg:Object={};
			public  itemListCfg2:Array<any>=[];
			public showItem:number[];
			public formatData(data:any):void
			{
				celeBrateList = [];
			 	for(var key in data)
				{	
					data[key].key = String(key);
					celeBrateList.push(data[key]); 
					this.itemListCfg2.push(data[key]);
					this[key]=data[key];
				}
			}  
			public getItemListCfg2():Array<any>
			{
	            return  this.itemListCfg2;
			}
		}
	}
}