/**
 * 大宴乡勇VO
 */
class AcJurakudaiVo extends AcBaseVo {

	/**本次抽奖总数 */
	public lotterysnum: number;
	/**剩余抽奖次数 */
	public lotterynum: number;
	/**当前抽奖进度 */
	public lotteryplan: number;
	/**保底奖励领取次数 */
	public awardnum: number;
	/**本日充值 */
	public rechargenum: number;
	/**充值奖励领取状态 */
	public rechargeinfo: {[index: number]: number} = {};
	/**任务领取 */
	public taskinfo: {[index: number]: number} = {};
	/**任务奖励进度 */
	public taskplan: {[index: number]: number} = {};

	public initData(data: any) {
		for(let key in data)
		{
			this[key]=data[key];
		}

		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_JURAKUDAI_REFRESHVO);
	}

	public formatReward(rew: string, special: number): string {
		let _rsl = rew;
		if (special && special > 0) {
			_rsl = "6_" + this.config.specialRewardId + "_" + special + "|" + rew;
		}
		return _rsl;
	}

	/**
	 * 活动配置
	 */
	public get config(): Config.AcCfg.JurakudaiCfg {
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	/**
	 * 活动结束倒计时，格式：X天X时X分X秒
	 */
	public get acCountDown():string	{
		return App.DateUtil.getFormatBySecond(Math.max(0,(this.et - GameData.serverTime)),14);
	}

	/**
	 * 奖池概率展示
	 */
	public get probability(): string {
		let rsl: string = "";

		let arr = this.config.pool;
		for (let i=0;i<arr.length;i++) {
			let _rew = GameData.formatRewardItem(<string>arr[i][0])[0];
			if (_rew && _rew.name) {
				rsl += `${_rew.name}  ${arr[i][1]}%\n`;
			}
		}

		return rsl;
	}

	/**获取保底门客ID */
	public get awardServantId(): string {
		let arr = this.config.servantID;
		// 暂时的
		if (this.awardnum < 1) {
			this.awardnum = 1;
		}
		let n = (this.awardnum-1) % arr.length;
		return arr[n].toString();
	}

	/**距离领取保底门客所需次数 */
	public get lotteryNeedNum(): number {
		// return 0;
		return this.config.mustNum - this.lotteryplan;
	}

	/**任务列表 */
	public get taskInfoList(): {taskCfg: Config.AcCfg.JurakudaiTaskItem, status: number}[] {
		let arr = this.config.task;
		let rsl: {taskCfg: Config.AcCfg.JurakudaiTaskItem, status: number}[] = [];

		arr.forEach(v => {
			rsl.push(this.getShowTask(v));
		})

		// todo sort?
		rsl.sort((a, b) => {
			return b.status - a.status;
		})

		return rsl;
	}

	private getShowTask(arr: Config.AcCfg.JurakudaiTaskItem[]): {taskCfg: Config.AcCfg.JurakudaiTaskItem, status: number} {
		let rsl: {taskCfg: Config.AcCfg.JurakudaiTaskItem, status: number} = null;
		let __id = arr[0].taskType;
		let __qt = arr[0].questType;

		let jd = this.taskplan[__qt] || 0;
		let gt = this.taskinfo[__id] || -1;

		for (let i=0;i<arr.length;i++) {
			if (jd >= arr[i].value && gt < i + 1) {
				// 已完成但未领取
				rsl = {
					taskCfg: arr[i],
					status: 3
				}
				break;
			}

			if (jd < arr[i].value) {
				// 未完成
				rsl = {
					taskCfg: arr[i],
					status: 2,
				}
				break;
			}

			if (i == arr.length - 1) {
				// 最后一个了
				rsl = {
					taskCfg: arr[i],
					status: 1
				}
			}
		}


		return rsl;
	}

	/**根据配置获取任务描述 */
	public getTaskDesByCfg(cfg: Config.AcCfg.JurakudaiTaskItem): string {
		return LanguageManager.getlocal("taskDesc"+cfg.questType,[""+cfg.value]);
	}

	/**
	 * 每日充值列表
	 */
	public get rechargeInfoList(): {rechargeCfg: Config.AcCfg.JurakudaiRecItem, status: number}[] {
		let arr = this.config.recharge;
		let rsl: {rechargeCfg: any, status: number}[] = [];
		arr.forEach(v => {
			rsl.push({
				rechargeCfg: v,
				status: this.getRechargeStatus(v)
			})
		})

		// todo sort?
		rsl.sort((a, b) => {
			return b.status - a.status;
		})

		return rsl;
	}

	/**
	 * 判断每日充值的领取状态
	 * 1.已领取	2.不可领取	3.可领取
	 *  */
	public getRechargeStatus(rec: Config.AcCfg.JurakudaiRecItem) {
		if (this.rechargeinfo[rec.rechargeId] == 1) {
			return 1;
		}
		if (this.rechargenum >= rec.chargeNum) {
			return 3;
		}
		return 2;
	}

	/**是否第一次进入 */
	public isFirstEnter(): boolean {
		// return true;
		let rsl: boolean = false;

		let _key: string = `${LocalStorageConst.LOCAL_FIRST_ENTERJURAKUDAI}_${this.st}_${this.code}_${Api.playerVoApi.getPlayerID()}`;
		let _cookie: string = LocalStorageManager.get(_key);
		if (!_cookie) {
			LocalStorageManager.set(_key, "1");
			rsl = true;
		}

		return rsl;
	}

	public get isRedCharge(): boolean {
		let _list = this.rechargeInfoList.filter(v => v.status == 3);
		return _list.length > 0;
	}

	public get isRedTask(): boolean {
		let _list = this.taskInfoList.filter(v => v.status == 3);
		return _list.length > 0;
	}

	public get isRedServant(): boolean {
		return this.lotteryNeedNum == 0;
	}

	/**是否红点 */
	public get isShowRedDot():boolean {
		return this.lotterynum > 0 || this.isRedServant || this.isRedCharge || this.isRedTask;
	}


	public dispose():void { 
		this.lotterynum = 0;
		this.lotteryplan = 0;
		this.lotterysnum = 0;
		this.awardnum = 0;
		this.rechargenum = 0;
		this.rechargeinfo = {};
		this.taskinfo = {};
		this.taskplan = {};
		super.dispose();
	}
}