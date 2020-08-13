
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
    public periods:any[] = [];
    public hasOpen:boolean = false;
	public constructor() {
		super();
	}

	public initData(info:any):void
	{
        let data = info.activeinfo;
        let periods = info.periods;
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
        if(periods){
            this.periods = periods;
        }
        if(info.hasOpen) {
            this.hasOpen = info.hasOpen;
        }
    }
    //0 活动/报名开始--> 1 报名结束/助威/准备开始-->2 首场开始-->3 2战开始-->4 3战开始-->5 3战结束
    public getPeriod(idx):number{
        return this.periods[idx];
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