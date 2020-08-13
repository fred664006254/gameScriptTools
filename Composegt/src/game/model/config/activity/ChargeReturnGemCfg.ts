namespace Config
{
	export namespace AcCfg
	{
		export class ChargeReturnGemCfg 
		{
            public rebateLimit:number = 0;
            public rebateRate:number = 0;
			public formatData(data:any):void
			{
                this.rebateRate = data.rebateRate;
                this.rebateLimit = data.rebateLimit;
			}
		}
	}
}