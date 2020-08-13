/**
 * 成就系统vo
 * author dky
 * date 2017/10/31
 * @class AchievementVo
 */
class AchievementVo extends BaseVo
{


	public achievementInfoVoObj:Object = null;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data.info)
		{
			this.achievementInfoVoObj = null;

			if(data.info)
			{
				if(this.achievementInfoVoObj == null)
				{
					this.achievementInfoVoObj = {};
				}
				for(var key in data.info)
				{

					if(this.achievementInfoVoObj[key])
					{
						this.achievementInfoVoObj[key].initData(data.info[key]);
						
					}
					else
					{
						let adultInfoVo:AchievementInfoVo = new AchievementInfoVo();
						adultInfoVo.id = key;
						adultInfoVo.initData(data.info[key]);
						this.achievementInfoVoObj[key] = adultInfoVo;
					}
				}
				for(var key in this.achievementInfoVoObj)
				{
					if(!data.info[key])
					{
						delete this.achievementInfoVoObj[key];
					}
				}
			}
		}
	}

	public dispose():void
	{
		if(this.achievementInfoVoObj)
		{
			for(let key in this.achievementInfoVoObj)
			{
				(this.achievementInfoVoObj[key])
				{
					this.achievementInfoVoObj[key].dispose();
					this.achievementInfoVoObj[key] = null;
				}
			}
		}

		this.achievementInfoVoObj = null;
	}
}