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
					itemCfg.type = data[key].type;
					itemCfg.id = Number(key);
					this.itemListCfg.push (itemCfg);
				} 
            }  
			public getPeopleList():Array<any>
			{
	            return this.itemListCfg
			}

			/** 通过类型获取对应数据*/
			public getPeopleListByType(type:number):FourPeoPleItemCfg[]{
				let data:FourPeoPleItemCfg[] = [];
				for (let i=0; i < this.itemListCfg.length; i++){
					if (this.itemListCfg[i].type && this.itemListCfg[i].type == type){
						data.push(this.itemListCfg[i]);
					}
				}
				return data.sort((a, b)=>{return a.id - b.id});
			}

			public getTypeList():number[]{
				let typeList:number[] = [];
				let type = 0;
				for (let i=0; i < this.itemListCfg.length; i++){
					type = this.itemListCfg[i].type;
					if (type && !GameData.isInArray(type, typeList)){
						typeList.push(type);
					}
				}
				if (typeList.length > 1){
					return typeList.sort((a, b)=>{return a - b});
				}
				return typeList;
			}
        } 
	 

		export class FourPeoPleItemCfg extends BaseItemCfg
		{
	     	public getServant:string ="";
			public needItem:string ="";
			public needNum:number=0; 
			public type:number = 0;
			public id:number=0;
			
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