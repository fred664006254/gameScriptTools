/**
 * 关卡系统api
 * author shaoliang
 * date 2017/9/26
 * @class ChallengeVoApi
 */

class ChallengeVoApi extends BaseVoApi
{
	private challengeVo:ChallengeVo;
	private bigNum:number=15;
	// private middleNum:number=
	public smallNum:number=329;

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

	public getHasPassId():number
	{
		return this.challengeVo.cid;
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
	 * 当前第几大关
	 */
	public getCurBigChannelId():number
	{	
		let bcid:number;
		if(this.getCurChannelId() >this.smallNum)
		{
			bcid = Math.ceil((this.getCurChannelId()-this.smallNum) / 41)  + this.bigNum;
		}else{
			bcid = ChallengeCfg.getChallengeCfgById(this.getCurChannelId()).big;
		}
		return bcid;
	}

	public getBigChannelIdByCid(cid:number):number
	{
		let bcid:number;
		cid = cid + 1
		if (cid >= ChallengeCfg.getChallengeTotalPass()) {
			bcid = Math.floor((ChallengeCfg.getChallengeTotalPass()-this.smallNum) / 41) + this.bigNum;
		}
		else {
			if(cid >this.smallNum)
			{
				bcid = Math.ceil((cid-this.smallNum) / 41)  + this.bigNum;
			}else{
				bcid = ChallengeCfg.getChallengeCfgById(cid).big;
			}
		}
		return bcid;
	}
	//不加一 配置用
	public getBigChannelIdByCid2(cid:number):number
	{
		let bcid:number;
		if (cid >= ChallengeCfg.getChallengeTotalPass()) {
			bcid = Math.floor((ChallengeCfg.getChallengeTotalPass()-this.smallNum) / 41) + this.bigNum;
		}
		else {
			if(cid >this.smallNum)
			{
				bcid = Math.ceil((cid-this.smallNum) / 41)  + this.bigNum;
			}else{
				bcid = ChallengeCfg.getChallengeCfgById(cid).big;
			}
		}
		return bcid;
	}

	/**
	 * 第几中关
	 */
	public getMiddleChannelById(cid:number):number
	{	
		let mcid:number;
		// cid = cid + 1;
		if(cid >=this.smallNum)
		{
			//  mcid = Math.floor((cid-this.smallNum-1) % 41 / 8 ) + 1;
			mcid= Math.ceil((cid-this.smallNum)%(5*8+1)/8)||6;
		}else{
			mcid = ChallengeCfg.getChallengeCfgById(cid+1).middle;
		}
		return mcid;
	}
	/**
	 * 当前第几中关
	 */
	public getCurMiddleChannelId():number
	{	
		let mcid:number;
		if(this.getCurChannelId() >this.smallNum)
		{
			 mcid = Math.floor((this.getCurChannelId()-this.smallNum-1) % 41 / 8 ) + 1;
		}else{
			mcid = ChallengeCfg.getChallengeCfgById(this.getCurChannelId()).middle;
		}
		return mcid;
	}

	/**
	 * 当前第几小关
	 */
	public getCurSmallChannelId():number
	{	
		let scid:number;
		if(this.getCurChannelId() >this.smallNum)
		{
			 scid = (this.getCurChannelId()-this.smallNum-1) % 41 % 8;
		}else{
			scid = ChallengeCfg.getChallengeCfgById(this.getCurChannelId()).small-1;
		}
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
		
		if (ChallengeCfg.getChallengeCfgById(this.getCurChannelId()).type==2) {
			b = true;
		}
		return b;
	}

	/**
	 * 当前是否打开 关卡view， 如果已经通关，就不打开了。
	 */
	public getOpenViewMessage():string
	{
		if(Api.switchVoApi.checkOpenLimitC100Chapter()&&this.getCurBigChannelId() >100)
		{
			return LanguageManager.getlocal("servantInfo_levelupTip12");
		}
		if (this.challengeVo.cid >= ChallengeCfg.getChallengeTotalPass()) {
			return LanguageManager.getlocal("challengeAllPassed");
		}
		return null;
	}

	public getUnlockPersonLimit():number
	{
		return ChallengeCfg.getChallengeCfgById(this.getCurChannelId())?ChallengeCfg.getChallengeCfgById(this.getCurChannelId()).personLimit:0;
	}


	/**
	 * 获取当前关卡是否解锁
	 */
	public getChannelIslock():boolean
	{	
		let cfg=ChallengeCfg.getChallengeCfgById(this.getCurChannelId());
		if((!cfg)||(!cfg.personLimit))
		{
			return true
		}
		return Api.composemapVoApi.getMaxLv()>= ChallengeCfg.getChallengeCfgById(this.getCurChannelId()).personLimit;

	}
	/**
	 * 获取当前关卡是否解锁
	 */
	public getChannelLockStr():string
	{
		let str = LanguageManager.getlocal("challengeUnlockTip",[ChallengeCfg.getChallengeCfgById(this.getCurChannelId()).personLimit])
		return  str;
	}
	public dispose():void
	{
		super.dispose();
	}
}