namespace Config
{
	export namespace AcCfg
	{
		export class AllianceRechargeTotalCfg 
		{
            public extraTime : number = 0;
            private _countReward:any[] =[] ;
            private _count:any[] =[];
            public get countReward(): any{
                return this._countReward;
            }     
             public get count(): any{
                return this._count;
            }     
            //解析数据
            public formatData(data:any):void
			{   
                 if(data.extraTime)
				{
					this.extraTime =data.extraTime;
				}
               
                 if(data["totalReward"])
                 {
                    this._countReward = data["totalReward"];
                 }
                 if(data["total"])
                 {
                    this._count = data["total"];
                 }
            } 
		}
	}
}
