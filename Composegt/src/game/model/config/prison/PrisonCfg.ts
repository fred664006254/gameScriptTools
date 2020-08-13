namespace Config
{
	/**
	 * 牢房配置类
	 */
			
	export namespace PrisonCfg 
	{
	    let prisonItemList: Object = {};	
	
		
		export function formatData(data: any): void 
		{
	
			for (var key in data) 
			{
				let prisonItemCfg: PrisonItemCfg;
				if (!prisonItemList.hasOwnProperty(String(key))) 
				{
					prisonItemList[String(key)] = new PrisonItemCfg();
				}
				prisonItemCfg = prisonItemList[String(key)];
				prisonItemCfg.initData(data[key]);
				this.prisonItemCfg = prisonItemCfg;
			}
		}

	export function getPrisonItemCfgList():Array<PrisonItemCfg>
		{
			let arr:Array<PrisonItemCfg> = new Array();
			for(let key in prisonItemList)
			{
				arr.push(prisonItemList[key]);
			}
			return arr;
		}
	//根据ID 返回当前配置
	export function getIndexPrisonItemCfg(index:number=0):any
	{

		for(let key in prisonItemList)
		{
			if(key==""+index)
			{
		    	return prisonItemList[key]
			} 
		}
		return null
		 
	}
	  
	  
	export class PrisonItemCfg extends BaseItemCfg 
	{
	
	// 	-unlock  解锁条件  通关某一关卡
    //   --cost  每次惩罚所需声望
    //   --num  该囚犯的可惩罚次数  num为空时，囚犯可无限惩罚
    //   --base  资源基础值  在获得银两、粮草、士兵时，用 base + 属性 * 倍率
    //   --drop  每次惩罚可能获得的奖励  其中有资源_倍率的情况
		
		public  unlock:number =0;
		public cost:number =0;
		public num:number =0;
		public  drop:Array<any> =[];
		public sheetType: number;

	}
  }
	
}