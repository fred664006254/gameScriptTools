
class EmperorwarActiveVo extends BaseVo
{   
    /**
	 * 1 正在进行的  2 将要开启的  3 已完成的最近一期 
	 */
    public flag:number = 0;
    public id:number = 0;
    public updated_at:number = 0;
    public version:number = 0;
    public info:string = "";
    public et:number = 0;

	public constructor() {
		super();
	}

	public initData(data:any):void
	{
		if (data) {
             if (data.flag != null) {
                this.flag =Number(data.flag);
			}
            if (data.id != null) {
                this.id =Number(data.id);
			}
            if (data.updated_at != null) {
                this.updated_at =Number(data.updated_at);
			}
            if (data.version != null) {
                this.version =Number(data.version);
			}
            if (data.info != null) {
				this.info =data.info;
			}
            if (data.et != null) {
                this.et =Number(data.et);
			}
		}
	}

	public dispose()
    {   
        this.flag = 0;
        this.id = 0;
        this.updated_at = 0;
        this.version = 0;
        this.info = "";
        this.et = 0;
	}
}