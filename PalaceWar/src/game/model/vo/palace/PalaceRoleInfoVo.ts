/**
 * 皇宫vo
 * author yanyuling
 * date 2017/11/01
 * @class PalaceRoleInfoVo
 */
class PalaceRoleInfoVo extends BaseVo
{  
    public uid:number = 0;
    public sign:string = "";
    public vip:number = 0;
    public level:number = 0;
    public pic:number = 0;
    public titleId:any=null;
    public name:string = "";
    public rank =[];
    public promotetype : number = 0;
    public tlv : number = 0;
    public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
        if (data.uid)
        {
            this.uid = data.uid;
            this.sign = data.sign;
            this.vip = data.vip;
            this.level = data.level;
            this.pic = data.pic;
            this.name = data.name;
        }
        if (data.rank)
        {
            this.rank = data.rank;
        }
        if(data.promotetype){
            this.promotetype = data.promotetype;
        }
       
        if(data.titleId){
            this.titleId = data.titleId
        }
        if(data.tlv){
            this.tlv = data.tlv
        }
    }

    public dispose()
    {
        this.uid =0;
        this.sign = "";
        this.vip = 0;
        this.level = 0;
        this.pic = 0;
        this.titleId = null;
        this.tlv = 0;
        this.name = "";
        this.rank = [];
    }
}
