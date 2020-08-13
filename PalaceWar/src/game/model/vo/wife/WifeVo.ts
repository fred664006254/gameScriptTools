/**
 * 红颜系统vo
 * author dmj
 * date 2017/9/22
 * @class WifeVo
 */
class WifeVo extends BaseVo
{
	// 门客vo列表
	public wifeInfoVoObj:Object = null;
	/**精力剩余次数 */
	public energy_num:number = 0;
	/**精力最后一次更新时间戳 */
	public energy_st:number = 0;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data.energy != null)
			{
				if(data.energy.st != null)
				{
					this.energy_st = data.energy.st;
				}
				if(data.energy.num != null)
				{
					this.energy_num = data.energy.num;
				}
			}
			if(data.info)
			{
				if(this.wifeInfoVoObj == null)
				{
					this.wifeInfoVoObj = {};
				}
				for(var key in data.info)
				{
					if(this.wifeInfoVoObj[key])
					{
						this.wifeInfoVoObj[key].initData(data.info[key]);
					}
					else
					{
						let wifeInfoVo:WifeInfoVo = new WifeInfoVo();
						wifeInfoVo.id = Number(key);
						wifeInfoVo.initData(data.info[key]);
						this.wifeInfoVoObj[key] = wifeInfoVo;
				

					}
				}
			}
		}
		/**
		 * 检测修身相关红点
		 */
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_PRACTICE_RED);
	}
	public dispose():void
	{
		if(this.wifeInfoVoObj)
		{
			for(let key in this.wifeInfoVoObj)
			{
				(this.wifeInfoVoObj[key])
				{
					this.wifeInfoVoObj[key].dispose();
					this.wifeInfoVoObj[key] = null;
				}
			}
		}
		this.energy_num = 0;
		this.energy_st = 0;
		this.wifeInfoVoObj = null;
	}
}