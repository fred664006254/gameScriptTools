/**
 * 子嗣系统vo
 * author dmj
 * date 2017/9/23
 * @class ChildVo
 */
class ChildVo extends BaseVo
{
	//
	public cnum:number=0;//当前子嗣
	// 子嗣扩展槽
	public posnum:number = 0;
	// 子嗣vo列表
	public childInfoVoObj:Object = null;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			// this.childInfoVoObj = null;
			if(data.posnum)
			{
				this.posnum = Number(data.posnum);
			}
			if(data.cnum!=null)
			{
				this.cnum=data.cnum;
			}
			if(data.info)
			{
				if(this.childInfoVoObj == null)
				{
					this.childInfoVoObj = {};
				}
				for(var key in data.info)
				{

					if(this.childInfoVoObj[key])
					{
						this.childInfoVoObj[key].initData(data.info[key]);
						
					}
					else
					{
						let childrenInfoVo:ChildInfoVo = new ChildInfoVo();
						childrenInfoVo.id = key;
						childrenInfoVo.initData(data.info[key]);
						this.childInfoVoObj[key] = childrenInfoVo;
					}
				}
				for(var key in this.childInfoVoObj)
				{
					if(!data.info[key])
					{
						delete this.childInfoVoObj[key];
					}
				}
			}
		}
	}

	public dispose():void
	{
		if(this.childInfoVoObj)
		{
			for(let key in this.childInfoVoObj)
			{
				(this.childInfoVoObj[key])
				{
					this.childInfoVoObj[key].dispose();
					this.childInfoVoObj[key] = null;
				}
			}
		}
		this.posnum = 0;
		this.childInfoVoObj = null;
	}
}