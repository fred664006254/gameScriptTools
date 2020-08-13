namespace Config
{
	export namespace AcCfg
	{
		export class OneYearOverviewCfg 
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