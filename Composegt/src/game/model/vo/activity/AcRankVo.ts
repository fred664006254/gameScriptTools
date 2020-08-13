/**
 * 活动排名通用vo
 * author dmj
 * date 2017/11/9
 * @class AcRankVo
 */
class AcRankVo extends BaseVo
{
	public acRankInfoVoObj:Object = {};
	public constructor() 
	{
		super();
	}
	public initData(data:any):void
	{
		if(this.acRankInfoVoObj == null)
		{
			this.acRankInfoVoObj = {};
		}
		if(data.activeId)
		{
			if(this.acRankInfoVoObj[data.activeId])
			{
				this.acRankInfoVoObj[data.activeId].initData(data);
			}
			else
			{
				let acRankInfoVo:AcRankInfoVo = new AcRankInfoVo();
				acRankInfoVo.initData(data);
				this.acRankInfoVoObj[data.activeId] = acRankInfoVo;
			}
		}
	}


	public dispose():void
	{
		this.acRankInfoVoObj = null;
	}
}