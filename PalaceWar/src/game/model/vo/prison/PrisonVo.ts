class PrisonVo extends BaseVo
{

// "model.prison"] = "牢房模型",
// ["model.prison.info"] = "牢房信息",
// ["model.prison.info.*"] = "牢房中囚犯id和惩罚次数",
// ["model.prison.mypre"] = "我的名望",
// ["model.prison.dailypre"] = "每日产出",
// ["model.prison.maxpre"] = "名望上限",

    public  info:any={};
    public  lastday:number=0;
    public  mypre:number =0;
    public  dailypre:number =0;
    public  maxpre:number =0;
 
    
    
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
        if(data)
        {
            if(data.info)
            {
                this.info =data.info;
            }
            if(data.dailypre)
            {
                this.dailypre = data.dailypre;
            }
             if(data.mypre)
            {
                this.mypre = data.mypre;
            }
            else
            {
                 this.mypre =0
            }
            if(data.maxpre)
            {
                this.maxpre = data.maxpre;
            }
            if(data.lastday)
            {
                this.lastday = data.lastday;
            }
        }
    }
	public dispose():void
	{
      this.info={};
      this.lastday=0;
      this.mypre= 0;
      this.dailypre =0;
      this.maxpre =0;
    }
}