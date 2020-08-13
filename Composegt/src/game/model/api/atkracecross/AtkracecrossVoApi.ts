class AtkracecrossVoApi extends BaseVoApi
{
	private atkracecrossVo:AtkracecrossVo;
	public zonerankinfos:any = null;
	public isCanJoin:boolean =false;
	public zidgroups:any = null;

	public constructor() {
		super();
	}
	public get zidLength():number{
		return this.zidgroups?this.zidgroups.length: 1;
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

	/**
	//  * 获取区服
	//  */
	// public getMydinfo(index:number):number
	// {
	// 	return this.atkracecrossVo.info[index].zid; 
	// }

	public isShowNpc():boolean
	{
		return Api.servantVoApi.getServantCountLevel60Plus()>=1 && Api.servantVoApi.getServantCount() >= Config.AtkraceCfg.getUnlock();
		// return true;
	}

	public getLockedString():string
	{
		return LanguageManager.getlocal("atkraceUnlcok",[Config.AtkraceCfg.getUnlock().toString(),Config.AtkraceCfg.getservantLvAndNum()[1].toString()]);
	}

	public getPoint():number
	{
		return this.atkracecrossVo.point;
	}

	public getRewardc():any
	{
		return this.atkracecrossVo.rewardc;
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
		this.zidgroups = null;

		super.dispose();
	}
}