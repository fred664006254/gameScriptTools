class NewAtkracecrossVoApi extends BaseVoApi
{
	private atkracecrossVo:NewatkracecrossVo;
	public zonerankinfos:any = null;
	public isCanJoin:boolean =false;
	public revengeIdx:number = 0;

	public constructor() {
		super();
	}

	public setZoneRankInfo(data : any) : void{
		this.zonerankinfos = data.atkranks;
	}
	/**
	 * 战斗信息
	 */
	public getMyFightInfo():AtkraceAtkInfoVo
	{
		return this.atkracecrossVo.ainfo;
	}
	/**
	 * 武馆信息息
	 */
	public getMyInfo():AtkraceInfoVo
	{
		return this.atkracecrossVo.info;
	}

	public isShowNpc():boolean
	{
		return Api.servantVoApi.getServantCountLevel60Plus()>=1 && Api.servantVoApi.getServantCount() >= Config.AtkraceCfg.getUnlock();
	}

	public getLockedString():string
	{
		return LanguageManager.getlocal("atkraceUnlcok",[Config.AtkraceCfg.getUnlock().toString()]);
	}

	public getPoint():number
	{
		return this.atkracecrossVo.point;
	}

	public getRewardc():any
	{
		return this.atkracecrossVo.rewardc;
	}

	public getLastKillerInfo():any
	{
		return this.atkracecrossVo.info.lastKillerInfo;
	}
	
	public checkNpcMessage():boolean
	{	
		let flag:boolean = false;
		if (this.isShowNpc()) {
			if (this.atkracecrossVo.ainfo && this.atkracecrossVo.ainfo.mesid ) {
				flag = true;
			}
			else {
				let maxCount:number = Config.AtkraceCfg.getDailyNum();
				let myNum:number = this.atkracecrossVo.info.num;
				if (myNum < maxCount) {
					let countDownTime:number = this.atkracecrossVo.info.lasttime + Config.AtkraceCfg.getIntervalTime() -  GameData.serverTime; 
					if (countDownTime<=0) {
						flag = true;
					}
				}
			}
		}
		return flag;
	}

	public dispose():void
	{
		this.zonerankinfos = null;
		this.isCanJoin = false;
		this.revengeIdx = 0;

		super.dispose();
	}
}