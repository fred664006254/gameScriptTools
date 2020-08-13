/**
 * 七日好礼api
 * @author 张朝阳
 * date 2019/3/22
 * @class SevenDaysSignupLoginVoApi
 */
class SevenDaysSignupLoginVoApi extends BaseVoApi {
	/**
	 * 新号的信息
	 */
	private info = null;
	/**新号的标示 */
	private newer: number = 0;

	private signUp3Flag:Object = null;

	private init_flag: number = 0;
	
	public constructor() {
		super();
	}

	public formatData(data: any): void {
		this.info = data.info;
		this.newer = data.newer;
		this.init_flag = data.init_flag;
		this.signUp3Flag = data.info.signUp3Flag;
	}
	/**活动时间是否已结束 */
	public checkTimeEnd() {
		if (this.info && this.info.et <= GameData.serverTime) {
			return true;
		}
		return false;
	}
	/**任务的排序id */
	public getSortTask(day: number): Config.AllTaskItemCfg[] {
		let cfg = Config.SevendayssignupCfg.getTaskCfgById(String(day));
		let taskData = cfg;
		for (let i = 0; i < taskData.length; i++) {
			if (this.checkTaskReceive(Number(day), Number(taskData[i].id))) {
				taskData[i].sortId = taskData.length + Number(taskData[i].id);
				continue;
			}
			else if (this.checkTaskSuccess(Number(day), Number(taskData[i].id))) {
				taskData[i].sortId = (Number(taskData[i].id)) - taskData.length - 1;
				continue;
			}
			else {
				taskData[i].sortId = Number(taskData[i].id);
				continue;
			}
		}
		return taskData;
	}
	/**是否显示小红点 */
	public checkShowRedDot() {
		if (this.checkLoginShowRedDot()||this.checkTaskShowRedDot()||this.checkReadShowRedDot()) {
			return true;
		}
		return false;
	}
	/**是否有任务的奖励显示红点 */
	public checkTaskShowRedDot() {
		if (this.info.diffday) {
			for (let i = 1; i <= this.info.diffday; i++) {
				if (this.checkSinfleTaskShowRedDot(i)) {
					return true;
				}
			}
		}
		return false;
	}
	public checkSinfleTaskShowRedDot(index: number) {
		if (this.info.diffday && index <= this.info.diffday) {
			let taskCfg = Config.SevendayssignupCfg.getTaskCfgById(String(index));
			for (let key in taskCfg) {
				if (this.checkTaskSuccess(index, Number(taskCfg[key].id))) {
					return true;
				}
			}
		}
		return false;
	}

	public checkReadShowRedDot() {
		if (this.info.diffday) {
			for (let i = 1; i <= this.info.diffday; i++) {
				if (this.checkSingleReadShowRedDot(i)) {
					return true;
				}
			}
		}
		return false;
	}

	public checkSingleReadShowRedDot(index: number) {
		if (this.info.diffday && index <= this.info.diffday) {
			if (!this.checkReadReward(index)) {
				return true;
			}
		}
		return false;
	}

	/**是否有登陆的奖励显示红点 */
	public checkLoginShowRedDot() {
		if (this.info.diffday) {
			for (let i = 1; i <= this.info.diffday; i++) {
				if (this.checkSingleLoginShowRedDot(i)) {
					return true;
				}
			}
		}
		return false;
	}
	/** 单个登陆奖励的红点显示*/
	public checkSingleLoginShowRedDot(index: number) {
		if (this.info.diffday && index <= this.info.diffday) {
			if ((this.checkLoginReward(index) == false && this.info.diffday >= index) || (this.checkVIPReward(index) == false && Api.playerVoApi.getPlayerVipLevel() >= Number(Config.SevendayssignupCfg.getSignUpCfgById(String(index)).needVip))) {
				return true;
			}
		}
		return false;
	}
	public isEnSp():boolean
	{
		return PlatformManager.checkIsEnSp();
		// return true;
	}
	public checkShowFirView():void
	{
		if(this.checkCreateMainIcon())
		{
			if(this.isEnSp())
			{
				if (this.info && this.info.diffday && this.info.diffday == 1)
				{
					let value = LocalStorageManager.get("isShowSevenDaysSignUpFirShowView"+Api.playerVoApi.getPlayerID())
					if(!value)
					{
						Api.viewqueueVoApi.checkShowView(ViewConst.COMMON.SEVENDAYSSIGNUPFIRSHOWVIEW);
					}
				}
			}
		}
	}
	/**当前的type */
	public nowType(): number {
		if(PlatformManager.checkIsRuSp()){
			if (this.info.diffday && this.info.diffday <= 2) {
				return this.info.diffday;
			}
			return 7;
		}else if(this.isEnSp())
		{
			if (this.info.diffday && this.info.diffday <= 2) {
				return this.info.diffday;
			}
			return 7;			
		}
		else{
			if (this.info.diffday && this.info.diffday <= 2) {
				return 2;
			}
			return 7;
		}
		
	}
	/**当前天数  */
	public nowDay() {
		if (this.info.diffday && this.checkNewUserLoginThanSeven()) {
			return this.info.diffday;
		}
		return Config.SevendayssignupCfg.signUpItemCfgList.length;
	}
	/**任务的进度 */
	public taskValue(day: number, index: number): number {
		if (this.info.taskinfo && this.info.taskinfo[day] && this.info.taskinfo[day][index] && this.info.taskinfo[day][index].v) {
			return this.info.taskinfo[day][index].v;
		}
		return 0
	}
	/**任务是否已完成 */
	public checkTaskSuccess(day: number, index: number): boolean {
		if (this.info.taskinfo && this.info.taskinfo[day] && this.info.taskinfo[day][index] && this.info.taskinfo[day][index].flag
			&& this.info.taskinfo[day][index].flag == 1
		) {
			return true;
		}
		return false;
	}
	/**任务的进度 */
	public checkTaskReceive(day: number, index: number): boolean {
		if (this.info.taskinfo && this.info.taskinfo[day] && this.info.taskinfo[day][index] && this.info.taskinfo[day][index].flag
			&& this.info.taskinfo[day][index].flag == 2
		) {
			return true;
		}
		return false;
	}
	/**登陆奖励是否领取 */
	public checkLoginReward(index: number) {
		if (this.info.getFlag && this.info.getFlag[index] && this.info.getFlag[index].normal && this.info.getFlag[index].normal == 1) {
			return true
		}
		return false;

	}

	public checkReadReward(index: number) {
		if (this.signUp3Flag  && this.signUp3Flag[index] && this.signUp3Flag[index] == 1) {
			return true
		}
		return false;

	}

	/*俄语特殊奖励*/
	public checkSpecialReward() {
		if (this.info && this.info.firstdayrwd) {
			return true
		}
		return false;

	}
	
	/**VIP奖励是否领取 */
	public checkVIPReward(index: number) {
		if (this.info.getFlag[index] && this.info.getFlag[index].vip && this.info.getFlag[index].vip == 1) {
			return true
		}
		return false;

	}
	/**倒计时 */
	public CountDownTime() {
		if (this.info.et && this.info.et > GameData.serverTime) {
			return App.DateUtil.getFormatBySecond(this.info.et - GameData.serverTime, 1);
		}
		return LanguageManager.getlocal("sevenDaysSignUpViewTimEnd");

	}
	/**是否创建7日好礼mainicon包含判断 */
	public checkCreateMainIcon(): boolean {
		return this.checkUserIsNewer() && this.checkNewUserLoginThanSeven() && Api.switchVoApi.checkOpenSevenDay();
	}
	/**是否是新号 */
	public checkUserIsNewer(): boolean {
		if (this.newer == 1) {
			return true
		}
		return false;
	}
	/**新号天数是否小于7天 */
	public checkNewUserLoginThanSeven() {
		if (Object.keys(this.info).length > 0 && this.info.et > GameData.serverTime) {
			return true;
		}
		return false;

	}
	public canGetRewardRu()
	{
		let regdt = Api.gameinfoVoApi.getRegdt();
		if(GameData.serverTime - regdt >= Config.SevendayssignupCfg.firstDayNeedTime)
		{
			return true;
		}
		return false
	}
	public canGetRewardEn()
	{
		let regdt = Api.gameinfoVoApi.getRegdt();
		if(GameData.serverTime - regdt >= Config.SevendayssignupCfg.firstDayNeedTime)
		{
			return true;
		}
		return false
	}	
	public dispose(): void {
		this.info = null;
		this.newer = 0;
		this.init_flag = 0;
		this.signUp3Flag = null
		super.dispose();
	}
}