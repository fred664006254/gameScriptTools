/**
 * 马超Vo
 * @author 张朝阳
 * data 2019/1/14
 * @class AcMaChaoVo
 */
class AcMaChaoVo extends AcBaseVo {
	private ainfo: any = null;
	private binfo: any = null;
	private cinfo: any = null;
	private isfree: number = 0;


	public constructor() {
		super();
	}

	public initData(data: any): void {
		for (let key in data) {
			this[key] = data[key];
		}
		// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACMAZE_TASK);

	}

	/**
	 * 获取抽奖的次数
	 */
	public getMaChaoValue(): number {
		return this.ainfo.v ? this.ainfo.v : 0;
	}

	/**
	 * 任务类型的进度
	 */
	public getTask(type: number): number {
		let scheduleNum = this.binfo.task[type];
		if (scheduleNum == null)
			scheduleNum = 0;
		return scheduleNum;
	}
	/**
	 * 返回任务奖励的领取状态
	 */
	public getTaskState(index: number): boolean {
		let state = this.binfo.flags[index];
		if (state == 1) {
			return true;
		}
		else {
			return false;
		}
	}
	/**
	 * 获取累积充值数目
	 */
	public getChargeNum(): number {
		return this.cinfo.v ? this.cinfo.v : 0;
	}
	/**
	 * 是否免费
	 */
	public isFree(): boolean {
		if (this.checkIsInEndShowTime()) {
			return false;
		}
		if (this.isfree == 1) {
			return true;
		}
		return false;

	}
	/** 
	 * 充值档位是否已经领取
	*/
	public isReceive(id: number): boolean {
		if (this.cinfo.flags[id] == 1) {
			return true;
		}
		else {
			return false;
		}
	}

	/**
	 * 红点显示
	 */
	public get isShowRedDot(): boolean {
		// return false;
		return this.isFree()||this.isHaveTaskRedDot()||this.isHaveRechargeRedDot();
	}
	/**
	 * 任务奖励红点
	 */
	public isHaveTaskRedDot(): boolean {
		let cfg = <Config.AcCfg.MaChaoCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if (!cfg) {
			return false;
		}
		for (let i = 0; i < cfg.taskItemListCfg.length; i++) {
			if (this.getTask(cfg.taskItemListCfg[i].questType) >= cfg.taskItemListCfg[i].value) {
				if (!this.getTaskState(Number(cfg.taskItemListCfg[i].id))) {
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * 充值奖励红点
	 */
	public isHaveRechargeRedDot(): boolean {
		let cfg = <Config.AcCfg.MaChaoCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if (!cfg) {
			return false;
		}
		for (let i = 0; i < cfg.rechargeItemListCfg.length; i++) {
			if (this.getChargeNum() >= cfg.rechargeItemListCfg[i].needGem) {
				if (!this.isReceive(Number(cfg.rechargeItemListCfg[i].id))) {
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * 获得Task列表
	 */
	public getSortTask(): Config.AcCfg.MaChaoTaskItemCfg[] {
		let cfg = <Config.AcCfg.MaChaoCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let taskData = cfg.taskItemListCfg;
		for (let i = 0; i < taskData.length; i++) {
			if (this.getTaskState(Number(taskData[i].id))) {
				taskData[i].sortId = taskData.length + Number(taskData[i].id);
				continue;
			}
			else if (this.getTask(Number(taskData[i].questType)) >= taskData[i].value) {
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

	public getSortRecharge(): Config.AcCfg.MaChaoRechargeItemCfg[] {
		let cfg = <Config.AcCfg.MaChaoCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.rechargeItemListCfg;
		for (let i = 0; i < rechargeData.length; i++) {
			if (this.isReceive(Number(rechargeData[i].id))) {
				rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
				continue;
			}
			else if (this.getChargeNum() >= rechargeData[i].needGem) {
				rechargeData[i].sortId = (Number(rechargeData[i].id)) - rechargeData.length - 1;
				continue;
			}
			else {
				rechargeData[i].sortId = Number(rechargeData[i].id);
				continue;
			}
		}
		return rechargeData;


	}
	/**
	 * 活动结束倒计时，格式：00：00：00
	 */
	public get acCountDown(): string {
		let et = this.et - 86400;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
	}
	public dispose(): void {
		this.ainfo = null;
		this.binfo = null;
		this.cinfo = null;
		this.isfree = 0;
		super.dispose();
	}
}