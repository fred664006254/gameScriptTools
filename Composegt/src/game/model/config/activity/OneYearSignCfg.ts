namespace Config
{
	export namespace AcCfg
	{
		export class OneYearSignCfg 
		{
                  public  SignReward:{getReward:string}[] = [];
                  public formatData(data:any):void
                  {
                        for(var key in data){
                              this[key]=data[key];
                        }
                  }
	      }
	}
}