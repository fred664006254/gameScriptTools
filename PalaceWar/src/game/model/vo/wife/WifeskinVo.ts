/**
 * 红颜皮肤系统vo
 * author dky
 * date 2018/3/2
 * @class WifeskinVo
 */
class WifeskinVo extends BaseVo
{
	// 皮肤vo列表
	public wifeSkinInfoVoObj:Object = null;

	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data.info)
			{
				if(this.wifeSkinInfoVoObj == null)
				{
					this.wifeSkinInfoVoObj = {};
				}
				for(var key in data.info)
				{
					if(this.wifeSkinInfoVoObj[key])
					{
						this.wifeSkinInfoVoObj[key].initData(data.info[key]);
					}
					else
					{
						let wifeInfoVo:WifeskinInfoVo = new WifeskinInfoVo();
						wifeInfoVo.id = String(key);
						wifeInfoVo.initData(data.info[key]);
						this.wifeSkinInfoVoObj[key] = wifeInfoVo;
					}
				}
			}
		}
	}
	public dispose():void
	{
		if(this.wifeSkinInfoVoObj)
		{
			for(let key in this.wifeSkinInfoVoObj)
			{
				(this.wifeSkinInfoVoObj[key])
				{
					this.wifeSkinInfoVoObj[key].dispose();
					this.wifeSkinInfoVoObj[key] = null;
				}
			}
		}
		this.wifeSkinInfoVoObj = null;
	}
}