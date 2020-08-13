namespace Config
{
	export namespace AcCfg
	{
		
		export class  FourPeopleCfg
		{
			public  itemListCfg:Array<any>=[];
            public formatData(data:any):void
			{  
			  for(var key in data)
				{
					let itemCfg:FourPeoPleItemCfg;
					itemCfg =new FourPeoPleItemCfg();
					itemCfg.needNum =data[key].needNum;
					itemCfg.getServant =data[key].getServant;
					itemCfg.needItem =data[key].needItem; 
					this.itemListCfg.push (itemCfg);
				} 
            }  
			public getPeopleList():Array<any>
			{
	            return this.itemListCfg
			}
        } 
	 

		export class FourPeoPleItemCfg extends BaseItemCfg
		{
	     	public getServant:string ="";
			public needItem:string ="";
			public needNum:number=0; 
			
			public  get servantIcon():string
			{
				return Config.ServantCfg.getServantItemById(this.getServant).fullIcon;
			}
 			public  get servantName():string
			{
				return Config.ServantCfg.getServantItemById(this.getServant).name;
			} 

		}
	
    }
}