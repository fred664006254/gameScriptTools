/**
 * 皮肤vo
 * author yanyuling
 * date 2018/08/13
 * @class SkinVo
 */
class SkinVo extends BaseVo
{

	public sinfo:{string:{attr:number,name:string,ranking:number,uid:string,zid:string,lv:number}}[] = [];
	public winfo:{string:{intimacy:number,name:string,ranking:number,uid:string,zid:string,lv:number}}[] = [];
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data.sinfo){
				this.sinfo = data.sinfo;
			}
			if(data.winfo){
				this.winfo = data.winfo;
			}
		}
	}
	
	public dispose():void
	{
		this.sinfo = [];
		this.winfo = [];
	}
}