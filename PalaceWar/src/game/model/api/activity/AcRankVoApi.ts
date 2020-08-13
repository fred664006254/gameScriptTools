/**
 * 活动排名通用api
 * author dmj
 * date 2017/11/9
 * @class AcRankVoApi
 */
class AcRankVoApi extends BaseVoApi
{
	private acRankVo:AcRankVo;
	public constructor() 
	{
		super();
	}

	/**
	 * 根据aid和code获取acrankinfovo
	 * @param aid 活动id
	 * @param code  活动版本
	 */
	public getAcRankInfoVoByAidAndCode(aid:string,code:string):AcRankInfoVo
	{
		let aidAndCode = aid + "-" + code;
		let acRankInfoVoObj = this.acRankVo.acRankInfoVoObj;
		if(acRankInfoVoObj && acRankInfoVoObj[aidAndCode])
		{
			return acRankInfoVoObj[aidAndCode];
		}
		return null;
	}
	
	public dispose():void
	{
		this.acRankVo=null;
		super.dispose();
	}
}