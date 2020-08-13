namespace Config
{
	export namespace AcCfg
	{
		export class OneYearHeraldCfg 
		{
                  public wifeId:number=100;
                  public servantId:number=100;
                  public formatData(data:any):void
                  {
                        for(var key in data){
                              this[key]=data[key];
                        }
                  }
	      }
	}
}