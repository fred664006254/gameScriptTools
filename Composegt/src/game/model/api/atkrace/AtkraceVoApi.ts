
/**
 * 擂台api
 * author shaoliang
 * date 2017/11/23
 * @class AtkraceVoApi
 */

class AtkraceVoApi extends BaseVoApi
{
	private atkraceVo:AtkraceVo;
	public dieSidList:[{[key:string]:number},{[key:string]:number}]=[{},{}];

	public constructor() {
		super();
	}
	/**
	 * 战斗信息
	 */
	public getMyFightInfo():AtkraceAtkInfoVo
	{
		return this.atkraceVo.ainfo;
	}

	public getNextInfo():AtkraceAtkInfoVo
	{
		return this.atkraceVo.nextAInfo;
	}

	public getFightServantList():AtkraceServantVo[]
	{
		return this.atkraceVo.ainfo.meslist;
	}
	/**
	 * 武馆信息息
	 */
	public getMyInfo():AtkraceInfoVo
	{
		return this.atkraceVo.info;
	}

	/**
	 * 防守信息
	 */
	public getDefendInfo(): AtkraceDefendInfo[] {
		return this.atkraceVo.dinfo;
	}

	/**仇人信息 */
	public getEnemyInfo(): AtkraceEnemyInfo[] {
		return this.atkraceVo.einfo;
	}

	public isShowNpc():boolean
	{
		let __cfg = Config.AtkraceCfg.getservantLvAndNum();
		return Api.servantVoApi.getServantCountLevel60Plus()>=__cfg[1] && Api.servantVoApi.getServantCount() >= Config.AtkraceCfg.getUnlock();
		// return true;
	}

	public getLockedString():string
	{
		return LanguageManager.getlocal("atkraceUnlcok",[Config.AtkraceCfg.getUnlock().toString(), Config.AtkraceCfg.getservantLvAndNum()[1].toString()]);
	}

	public getPoint():number
	{
		return this.atkraceVo.point;
	}

	public getRewardc():any
	{
		return this.atkraceVo.rewardc;
	}

	
	public checkNpcMessage():boolean
	{	
		let flag:boolean = false;
		if (this.isShowNpc()) {
			if (this.atkraceVo.ainfo && this.atkraceVo.ainfo.mesid ) {
				flag = true;
			}
			else {
				let maxCount:number = Config.AtkraceCfg.getDailyNum();
				let myNum:number = this.atkraceVo.info.num;
				if (myNum < maxCount) {
					let countDownTime:number = this.atkraceVo.info.lasttime + Config.AtkraceCfg.getIntervalTime() -  GameData.serverTime; 
					if (countDownTime<=0) {
						flag = true;
					}
				}
			}
		}
		return flag;
	}

	public checkAndStartBattle():void
	{
		//条件检测
		ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEBATTLEVIEW);
	}

	public dispose():void
	{
		super.dispose();
		this.dieSidList=[{},{}];
		this.atkraceVo=null;
	}
}