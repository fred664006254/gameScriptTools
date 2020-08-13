namespace Config
{
	export namespace AcCfg
	{
		export class OneYearRankCfg 
		{
                  public oneYearRankRaward:string="3805";//--图标id
                  public formatData(data:any):void
                  {
                        for(var key in data){
                              this[key]=data[key];
                        }
                  }
	      }
	}
}