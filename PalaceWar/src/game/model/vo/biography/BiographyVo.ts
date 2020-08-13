class BiographyVo extends BaseVo
{
    
    public lastday:number = 0;
    public updated_at:number = 0;
    //当前传记信息[id] = {id=1001,st=111}
    public info:Object = null;
    public list:Object[] = [];

    public constructor() 
	{
		super();
	}

	public initData(data:any):void
    {
        if (data.lastday != null)
        {
            this.lastday = data.lastday;
        }
        if (data.updated_at != null)
        {
            this.updated_at = data.updated_at;
        }
        if (data.info != null)
        {
            this.info = data.info;
        }
        if (data.list != null && data.list.length>0)
        {
            this.list = data.list;
        }
    }

    public dispose()
    {
       this.lastday = 0;
       this.updated_at = 0;

       this.info = null;
       this.list.length = 0;
    }
}