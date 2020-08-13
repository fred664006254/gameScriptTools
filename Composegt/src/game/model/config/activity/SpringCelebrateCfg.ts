namespace Config
{
	export namespace AcCfg
	{	
		var  celeBrateList: Array<any> = [];
		
		export class SpringCelebrateCfg 
		{
			private itemListCfg:Object={};
			public  itemListCfg2:Array<any>=[];
			public formatData(data:any):void
			{
				celeBrateList = [];
			 	for(var key in data)
				{	
					data[key].key = String(key);
					celeBrateList.push(data[key]); 
					this.itemListCfg2.push(data[key]);
				}
			}  
			public getItemListCfg2():Array<any>
			{
	            return  this.itemListCfg2;
			}
		}
		


		//    1recharge  2exchange   3 task    4 shop
		// export function getShopItemCfgById(key:string): Array<any> 
		// {
	
		// 	let arr:Array<any> =[];
		// 	for(var i:number=0;i< celeBrateList.length;i++)
		// 	{
		// 		if(celeBrateList[i].key == key)
		// 		{	
					
		// 			for(var key2 in celeBrateList[i])
		// 			{	
		// 				if(celeBrateList[i][key2])
		// 				{
		// 					var currObj =  celeBrateList[i][key2]
		// 					if(currObj.needGem||currObj.questType||currObj.discount||currObj.limit)
		// 					{
		// 						celeBrateList[i][key2].key = Number(key2)+1;
		// 						if(celeBrateList[i][key2].key)
		// 						{
		// 							arr.push(celeBrateList[i][key2]); 
		// 						}
		// 					} 
		// 				} 
		// 			} 
		// 		}
		// 	}
		// 	return arr;  
		// }  
	}
}