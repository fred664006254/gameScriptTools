/**
 * 排行榜玩家信息vo
 * author yanyuling
 * date 2017/10/26
 * @class RankUserVo
 */
class RankUserVo extends BaseVo
{
    public level:number = 0;
    public name:string = "";
    public vip:string = "";
    public power:string = "";
    public uid:string = ""; 
    public title:string = "";
    public total_imacy:string = "";
    public cid:string = "";

    public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
        if (data.level != null)
            this.level = Number(data.level);

         if (data.name != null)
            this.name = data.name;

         if (data.vip != null)
            this.vip = data.vip;

         if (data.power != null)
            this.power = data.power;
        
         if (data.uid != null)
            this.uid = data.uid;

         if (data.title != null)
            this.title = data.title;

         if (data.total_imacy != null)
            this.total_imacy = data.total_imacy;

         if (data.cid != null)
            this.cid = data.cid;
        
    }

    public dispose():void
	{
        this.level = 0;
        this.name = "";
        this.vip = "";
        this.power = "";
        this.uid = ""; 
        this.title = "";
        this.total_imacy = "";
        this.cid = "";
    }
}