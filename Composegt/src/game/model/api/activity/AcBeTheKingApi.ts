/**
 * 裁缝
 * author dmj
 * date 2018/03/01
 * @class AcTailorApi
 */
class AcBeTheKingApi extends BaseVoApi
{
	private acBeTheKingVo:AcBeTheKingVo;
	private _rankList:any;
	public constructor() 
	{
		super();
	}

	public setRankInfos(ranks:any)
	{
		this._rankList = ranks;
	}
	
	public getRankInfos()
	{
		return this._rankList;
	}

	public getCurActivityId()
	{
		return this.acBeTheKingVo.aidAndCode;
	}

	public dispose():void
	{
		this.acBeTheKingVo=null;
		super.dispose();
	}
}