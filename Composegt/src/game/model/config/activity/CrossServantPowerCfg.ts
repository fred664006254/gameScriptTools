namespace Config
{
	export namespace AcCfg
	{
		export class CrossServantPowerCfg 
		{
			public servantid:string;
			public servantlv:number;
			public maxNum:number;
			public rankList1:{rank:number[],reward:string}[] =[];
			public task:{needNum:number,questType:number,value:number,getReward:string,openType:string}[] =[];
			public servantSkinID:string
			public formatData(data:any):void
			{
                for(var key in data){
                    this[key] = data[key];
                }  
			}
			
		}
	}
}