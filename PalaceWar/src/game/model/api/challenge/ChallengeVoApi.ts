/**
 * 关卡系统api
 * author shaoliang
 * date 2017/9/26
 * @class ChallengeVoApi
 */

class ChallengeVoApi extends BaseVoApi
{
	private challengeVo:ChallengeVo;

	public lastRecallId:number = 0;

	public constructor() {
		super();
	}

	/**
	 * 当前关卡ID
	 */
	public getCurChannelId():number
	{
		return this.challengeVo.cid + 1;
	}

	/**
	 * 当前关卡已经击杀数量
	 */
	public getCurKilledNum():number
	{
		return this.challengeVo.ksoldier;
	}

	public getServantInfo():Object
	{
		return this.challengeVo.info;
	}

	public getServantInfoValue(k:string):number
	{	
		let v:number = this.challengeVo.info[k];
		if (v == null) {
			v = 0;
		}
		return v;
	}

	/**
	 * 是否有门课可以使用请战书
	 */
	public getHasServantCanRelive():boolean
	{
		for (let k in this.challengeVo.info)
		{
			if (this.challengeVo.info[k] <2)
			{
				return true;
			}

		}

		return false;
	}

	/**
	 * 当前第几大关
	 */
	public getCurBigChannelId():number
	{	
		let bcid:number = Math.floor(this.challengeVo.cid / 41) + 1;
		return bcid;
	}

	public getBigChannelIdByCid(cid:number):number
	{
		let bcid:number;
		if (cid >= ChallengeCfg.getChallengeTotalPass()) {
			bcid = Math.floor(ChallengeCfg.getChallengeTotalPass() / 41);
		}
		else {
			bcid = Math.floor(cid / 41) + 1;
		}
		return bcid;
	}
	/**
	 * 当前第几中关
	 */
	public getCurMiddleChannelId():number
	{	
		let mcid:number = Math.floor(this.challengeVo.cid % 41 / 8 ) + 1;
		return mcid;
	}

	/**
	 * 当前第几小关
	 */
	public getCurSmallChannelId():number
	{	
		let scid:number = this.challengeVo.cid % 41 % 8 ;
		return scid;
	}

	/**
	 * 当前是否是boss关
	 */
	public getIsBossChannel():boolean
	{
		let b:boolean = false;

		// 关卡版本2
		// if (Api.challengeVoApi.getCurMiddleChannelId() == 6 || Api.challengeVoApi.getCurSmallChannelId() == 7) {
		
		if (Api.challengeVoApi.getCurMiddleChannelId() == 6 ) {
			b = true;
		}
		return b;
	}

	/**
	 * 当前是否打开 关卡view， 如果已经通关，就不打开了。
	 */
	public getOpenViewMessage():string
	{
		if (this.challengeVo.cid >= ChallengeCfg.getChallengeTotalPass()) {
			return LanguageManager.getlocal("challengeAllPassed");
		}
		return null;
	}

	public dispose():void
	{
		this.lastRecallId = 0;

		super.dispose();
	}

	public getDecreePolicyAddAttrInfo()
	{
		return Api.promoteVoApi.getDecreePolicyAddAttrInfo("challenge",4);
	}
}