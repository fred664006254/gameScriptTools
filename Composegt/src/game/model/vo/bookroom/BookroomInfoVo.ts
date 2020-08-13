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
    public level:number = 0;
    public lastservant:string = undefined;
    public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
        if(data)
        {
            this.servantid = data.servantid;
            this.lastservant = data.lastservant;
            this.et = data.et;
            if(data.level != undefined){
                this.level = data.level 
            }else{
                this.level = 0; 
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
         this.level = 0;
         this.lastservant = undefined;
    }
}