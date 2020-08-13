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
	public tinfo:{ string:{string:{openflag: number,flag:number,v:number,uids:{string:number}[]} } }[] = [];
	public v:number = 0;
	public overNum:number = 0;
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
			this.checkOverNum();
		}
	}

	public checkOverNum()
	{
		this.overNum = 0;
		var date:Date = new Date(GameData.serverTime *1000);
		var year:number = date.getFullYear();
		var month:number = date.getMonth() + 1;
		let ymstr = year+""+month;
		if(month < 10)
		{
			ymstr = year+"0"+month;
		}
		if(this.tinfo[ymstr]){
			for(var tid in this.tinfo[ymstr])
			{
				let taskInfo = this.tinfo[ymstr][tid]
				if (taskInfo && taskInfo.flag > 0)
				{
					this.overNum = this.overNum + 1;
				}
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