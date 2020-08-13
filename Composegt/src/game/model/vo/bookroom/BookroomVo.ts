/**
 * 书院vo
 * author yanyuling
 * date 2017/11/24
 * @class BookroomVo
 */
class BookroomVo extends BaseVo
{  
    
    public pos_num:number=0; //活跃度
    public infoList:Object = {};
    public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
        this.pos_num = data.pos_num;
        for (var key in this.infoList) {
            this.infoList[key].dispose();
        }
        this.infoList = {};
        for (var key in data.info) {
            let tmpinfo = data.info[key]
            let infovo = this.infoList[key]
            if( infovo == null)
            {
                infovo = new BookroomInfoVo();
                this.infoList[key] = infovo;
                infovo.posId = key;
            }
            infovo.initData(tmpinfo);
        }
    }
    public dispose()
    {
        this.pos_num = 0;
        this.infoList = {};
    }
}