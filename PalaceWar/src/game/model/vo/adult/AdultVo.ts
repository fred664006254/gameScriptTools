/**
 * 成年系统vo
 * author dky
 * date 2017/10/28
 * @class AdultVo
 */
class AdultVo extends BaseVo
{
	// 子嗣扩展槽
	public posnum:number = 0;
	// 子嗣vo列表
	public adultInfoVoObj:Object = null;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			this.adultInfoVoObj = null;
			if(data.posnum)
			{
				this.posnum = Number(data.posnum);
			}
			if(data)
			{
				if(this.adultInfoVoObj == null)
				{
					this.adultInfoVoObj = {};
				}
				for(var key in data)
				{

					if(this.adultInfoVoObj[key])
					{
						this.adultInfoVoObj[key].initData(data[key]);
						
					}
					else
					{
						let adultInfoVo:AdultInfoVo = new AdultInfoVo();
						adultInfoVo.id = key;
						adultInfoVo.initData(data[key]);
						this.adultInfoVoObj[key] = adultInfoVo;
					}
				}
				for(var key in this.adultInfoVoObj)
				{
					if(!data[key])
					{
						delete this.adultInfoVoObj[key];
					}
				}
			}
		}
	}

	public dispose():void
	{
		if(this.adultInfoVoObj)
		{
			for(let key in this.adultInfoVoObj)
			{
				(this.adultInfoVoObj[key])
				{
					this.adultInfoVoObj[key].dispose();
					this.adultInfoVoObj[key] = null;
				}
			}
		}
		this.posnum = 0;
		this.adultInfoVoObj = null;
	}
}