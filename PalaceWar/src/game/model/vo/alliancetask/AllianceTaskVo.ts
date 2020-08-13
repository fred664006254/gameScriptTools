/**
 * 军团建设系统vo
 * author yanyuling
 * date 2018/07/23
 * @class AllianceTaskVo
 */
class AllianceTaskVo extends BaseVo
{
	public buff:{bnum:number,id:string} = null;
	public id:string = "";
	public tinfo:{ string:{string:{flag:number,v:number,uids:{string:number}[]} } }[] = [];
	public v:number = 0;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			for (var key in data) {
				this[key] = data[key];
			}
		}
	}

	public dispose():void
	{
		this.buff = null;
		this.id = "";
		this.tinfo = [];
		this.v = 0;
	}
}