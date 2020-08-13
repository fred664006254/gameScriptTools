class PrestigeVo extends BaseVo
{
	public pem:number = 0;
	public info:Object = null;
	public log:any[] = null;

	public constructor() {
		super();
	}

	public initData(data:any):void
	{
		if (data) {
			if (data.pem != null) {
				this.pem =data.pem;
			}
			if (data.info != null) {
				this.info =data.info;
			}
			if (data.log != null) {
				this.log =data.log;
			}
		}
	}

	
	public dispose()
    {
		this.pem = 0;
		this.info = null;
		this.log = null;
	}
}