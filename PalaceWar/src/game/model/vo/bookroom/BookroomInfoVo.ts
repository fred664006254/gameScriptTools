/**
 * 书院vo
 * author yanyuling
 * date 2017/11/24
 * @class BookroomInfoVo
 */
class BookroomInfoVo extends BaseVo
{  
    public servantid:string = "";
    public et:number=0; 
    public posId:string;
    public lastet:number=0;
    private lock:number = 0;
    private needLevel:number=0; 
    public lastservant:string="";

    public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
        if(data)
        {
            this.servantid = data.servantid;
            this.et = data.et;
            if(data.lastet)
            {
                this.lastet = data.lastet;
            }
            if(data.lock)
            {
                this.lock =data.lock;
            }
            if(data.needLevel)
            {
                this.needLevel = data.needLevel;
            }
            if(data.lastservant){
                this.lastservant = data.lastservant;
            }
        }   
    }
    public isStudyOver()
    {
        if( this.et > 0 && this.et <= GameData.serverTime)
        {
            return true;
        }else
        {
            return false;
        }
    }
    public dispose()
    {
         this.servantid = "";
         this.et = 0;
         this.posId = "";
         this.lastet =0;
         this.lock  =0;
         this.needLevel=0;
    }
}