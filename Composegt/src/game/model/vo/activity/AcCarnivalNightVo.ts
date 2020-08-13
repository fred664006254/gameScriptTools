class AcCarnivalNightVo extends AcBaseVo {
	public selIdx: number = 0;
	public ainfo: any = {};
	public uinfo: any = {};
	public tinfo: any = {};
	private taskflags: any = {} //{v = 0,flags={}} --充值信息
	private taskinfo: any = {} //{v = 0,flags={}} --充值信息

	//消耗南瓜奖励领取情况
	private boxflags: any = {};
	public attacknum: number = 0;

	//轮次奖励领取情况
	turnflags: any = {}

	public canatknum: number = 0;


	//当前boss轮次
	public theturn: number;

	public initData(data: any): void {
		for (let key in data) {
			this[key] = data[key];
			if (key == 'ainfo') {
				const ele = data[key];
				this.turnflags = ele.flags;

			}
			if (key == 'tinfo') {
				const ele = data[key];
				this.taskflags = ele.flags;
				//this.attacknum = ele.lotterynum;
				this.taskinfo = ele.task;
			}
			if (key == 'uinfo') {
				const ele = data[key];
				this.attacknum = ele.v;
				this.boxflags = ele.flags;
			}
			if (key == "v") {
				this.canatknum = data[key] || 0;
			}

		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CARNIVALNIGHT_FRESH_ITEM);
	}
	private get cfg(): Config.AcCfg.CarnivalNightCfg {
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public get bossHp(): number {
		return this.cfg.getCurBossMaxHp(this.theturn);
	}

	/**
 	 * 累积充值领取判断
  	 */
	public isGetRecharge(id: number): boolean {
		let flag = false;
		if (this.taskflags && this.taskflags[id]) {
			flag = true;
		}
		return flag;
	}
	//获取累积充值数目
	public getChargeNum(questType: number): number {
		let num = 0;
		if (this.taskinfo && this.taskinfo[questType]) {
			num = this.taskinfo[questType];
		}
		return num;
	}

	public get isShowRedDot(): boolean {
		if (!this.cfg || !this.isInActivity()) {
			return false;
		}
		if (this.canatknum > 0 ) {
			return true;
		}
		if (this.isHaveTaskRedDot()) {
			return true;
		}
		// 宝箱
	}
	/**
	 * 任务奖励红点
	 */
	public isHaveTaskRedDot(): boolean {
		let cfg = <Config.AcCfg.CarnivalNightCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if (!cfg) {
			return false;
		}
		if(this.isShowTaskTab1Red() || this.isShowTaskTab2Red() || this.isShowTaskTab3Red()){
			return true;
		}
		return false;
	}
	/**
	 * 任务类型的进度
	 */
	public getTaskNum(type: string): number {
		return this.tinfo.task[type] ? this.tinfo.task[type] : 0;
	}
	/**
	 * 任务类型的进度
	 */
	public getAcTaskNum(typeId: string): number {
		if (typeId.indexOf("batHP") > -1) {
			let id = typeId.replace('batHP', '');
			return Number(this.ainfo.v);
			// >= Number(id) ? 1 : 0;
		} else {
			let id = typeId.replace('bigPrize', '');
			return Number(this.uinfo.v);
		}
	}
	/**
	 * 任务的状态
	 */
	public getTaskStatus(id: string): boolean {
		return this.tinfo.flags[id] && this.tinfo.flags[id] == 1 ? true : false;
	}

	public getAcTaskStatus(typeId: string): boolean {
		if (typeId.indexOf("batHP") > -1) {
			let id = typeId.replace('batHP', '');
			return this.ainfo.flags[id] && this.ainfo.flags[id] == 1 ? true : false;

		} else {
			let id = typeId.replace('bigPrize', '');
			return this.uinfo.flags[id] && this.uinfo.flags[id] == 1 ? true : false;
		}
	}

	/**
 * 获得Task列表
 */
	public getSortTask(id: number): Config.AcCfg.CarnivalNightTaskItemCfg[] {

		//1,2是任务列表,3是消耗南瓜和轮次奖励
		let cfg = <Config.AcCfg.CarnivalNightCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if (id < 3) {
			let taskData = cfg.getTaskListById(id);
			//let baseTaskData = cfg.getTaskList();

			let arr: Array<any> = [];
			for (let i = 0; i < taskData.length; i++) {

				if (taskData[i].questType == "1") {
					let openDay = App.DateUtil.getActivityDay(this.et, this.st);
					if (openDay < taskData[i].value) {
						continue;
					}
				}
				arr.push(taskData[i]);
			}

			for (let i = 0; i < arr.length; i++) {
				if (this.getTaskStatus(arr[i].id)) {
					arr[i].sortId =  Number(arr[i].id) + 200;
					continue;
				}
				else if (this.getTaskNum(arr[i].questType) >= arr[i].value) {
					arr[i].sortId = (Number(arr[i].id))  - 200;
					continue;
				}
				else {
					arr[i].sortId = Number(arr[i].id);
					continue;
				}
			}
			return arr;
		}

	}

	public getAcSortTask(id: number): Config.AcCfg.CarnivalNightTaskItemCfg2[] {

		//1,2是任务列表,3是消耗南瓜和轮次奖励
		let cfg = <Config.AcCfg.CarnivalNightCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let arr: Array<any> = [];
		let acTaskList = this.cfg.acTask;

		for (let i = 0; i < acTaskList.length; i++) {
			arr.push(acTaskList[i]);
			//轮次奖励在前,消耗奖励在后
			let offset = 0;
			if (arr[i].typeId.indexOf('batHP')) {
				offset = 200;
			} else {
				offset = 100;
			}
			if (this.getAcTaskStatus(arr[i].typeId)) {
				arr[i].sortId = acTaskList.length + offset + Number(arr[i].id);
				continue;
			} else if (this.getAcTaskNum(arr[i].typeId) >= arr[i].value) {
				arr[i].sortId = (Number(arr[i].id)) - acTaskList.length - 1 - 500 + offset;
				continue;
			}
			else {
				arr[i].sortId = Number(arr[i].id) + offset;
				continue;
			}

		}

		return arr;



	}


	public isShowTaskTab1Red(): boolean {
		let cfg = <Config.AcCfg.CarnivalNightCfg>this.cfg;
		let dataList = this.getSortTask(1)
		for (var index = 0; index < dataList.length; index++) {
			var element = dataList[index];
			let openType = element.openType;
			let taskNum = this.getTaskNum(element.questType);
			let newTaskNum = element.value;
			if (taskNum >= newTaskNum && !this.getTaskStatus(element.id)) {
				return true;
			}
		}
		return false;
	}
	public isShowTaskTab2Red(): boolean {
		let cfg = <Config.AcCfg.CarnivalNightCfg>this.cfg;
		let dataList = this.getSortTask(2)
		for (var index = 0; index < dataList.length; index++) {
			var element = dataList[index];
			let openType = element.openType;
			let taskNum = this.getTaskNum(element.questType);
			let newTaskNum = element.value;
			if (taskNum >= newTaskNum && !this.getTaskStatus(element.id)) {
				return true;
			}
		}
		return false;
	}
	public isShowTaskTab3Red(): boolean {
		let dataList = this.getAcSortTask(3)
		for (var index = 0; index < dataList.length; index++) {
			var element = dataList[index];
			let taskNum = this.getAcTaskNum(element.typeId);
			let newTaskNum = element.value;
			if (taskNum >= newTaskNum && !this.getAcTaskStatus(element.typeId)) {
				return true;
			}
		}
		return false;
	}

	public get acTimeAndHour(): string {
		let et = this.et;
		return App.DateUtil.getOpenLocalTime(this.st, et, true);
	}

	public isInActivity(): boolean {
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}

	public dispose(): void {
		this.selIdx = 0;
		this.taskinfo = {};
		this.taskflags = {};
		this.attacknum = 0;
		this.canatknum = 0;
		this.theturn = 0;
		super.dispose();

	}
}