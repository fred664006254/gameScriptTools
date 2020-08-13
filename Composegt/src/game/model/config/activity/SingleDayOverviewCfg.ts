namespace Config
{
	export namespace AcCfg
	{
		export class SingleDayOverviewCfg 
		{
                  public  Overview:{sortID:number,aid:string,code:number}[] = [];
                  public formatData(data:any):void
                  {
                        for(var key in data){
                              this[key]=data[key];
                        }
                  }
	      }
	}
}