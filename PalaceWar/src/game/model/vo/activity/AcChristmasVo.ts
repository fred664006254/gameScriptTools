class AcChristmasVo extends AcBaseVo {
	/**层数 */
	private floor: any = null;
	/**每层的奖励 */
	private getrewards: any = null;
	/** 任务 */
	private task: any = null;
	public constructor() {
		super();
	}

	public initData(data: any): void {
		for (let key in data) {
			this[key] = data[key];
		}

	}
	/**道具的数量 */
	public getItemValue(): number {
		return this.v;
	}
	/**
	 * 每层
	 */
	public getFloor() {
		return this.floor;
	}
	public getFloorCost(): number {
		let cfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		return cfg.getFloorCost(String(this.floor))

	}
	/**每层的已使用次数 */
	public getFloorValue(floor: number) {
		let cfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		switch (floor) {
			case 1:
				if (this.floor > floor) {
					return Object.keys(cfg.firstFloor).length;
				}
				else {
					return Object.keys(this.getrewards).length;
				}
			case 2:
				if (this.floor > floor) {
					return Object.keys(cfg.secondFloor).length;
				}
				else if (this.floor < floor) {
					return 0;
				}
				else {
					return Object.keys(this.getrewards).length;
				}
			case 3:
				if (this.floor > floor) {
					return Object.keys(cfg.thirdFloor).length;
				}
				else if (this.floor < floor) {
					return 0;
				}
				else {
					return Object.keys(this.getrewards).length;
				}

		}
	}
	/**每层的剩余次数 */
	public getOtherFloorValue(floor: number) {
		let cfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let value = this.getFloorValue(floor);
		switch (floor) {
			case 1:
				return Object.keys(cfg.firstFloor).length - value;
			case 2:
				return Object.keys(cfg.secondFloor).length - value;
			case 3:
				return Object.keys(cfg.thirdFloor).length - value;
		}
	}
	public getlotteryValue() {
		if (this.floor > 3) {
			return 10;
		}
		let value = this.getOtherFloorValue(this.floor);
		return value >= 10 ? 10 : value;
	}
	/**
	 * 每层的奖励item是否领取了
	 */
	public getFloorReward(itemKey: string, floor: number) {
		if (this.floor > floor) {
			return true;
		}
		else if (this.floor < floor) {
			return false;
		}

		for (let key in this.getrewards) {
			if (key == itemKey && this.getrewards[key] == 1) {
				return true;
			}
		}
		return false;
	}
	/**
	 * 每层的奖励是否已经全部领完
	 */
	public isCompleteFloorReward(floor:string):boolean{
		let cfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let floorData = cfg.getFloorRewardPoolList(floor);
		for (let i = 0; i < floorData.length; i++){
			if (!this.getFloorReward(floorData[i].id, Number(floor))){
				return false;
			}
		}
		return true;
	}
	/**
	 * 获得现在奖池中的物品
	 */
	public getNowRewardPool(): { id: string, reward: string, weight: number, isLight: boolean }[] {
		let cfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let floorRewardList = cfg.getFloorRewardPoolList(String(this.floor));
		let nowfloorRewardList: { id: string, reward: string, weight: number, isLight: boolean }[] = [];
		for (let key in floorRewardList) {
			if (this.floor < 4) {
				if (this.getFloorReward(floorRewardList[key].id, this.floor)) {
					continue;
				}
			}
			nowfloorRewardList.push(floorRewardList[key]);
		}
		return nowfloorRewardList;
	}
	public getItemIndexByType(type:number, floor:number|string):string{
		let cfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let data:any = null;
		let f = Number(floor);
		if (f == 1){
			data = cfg.firstFloor;
		}
		else if (f == 2){
			data = cfg.secondFloor;
		}
		else if (f == 3){
			data = cfg.thirdFloor;
		}
		else if (f == 4){
			data = cfg.finalFloor;
		}
		for (let key in data){
			let needType = (data[key][0]).split("_")[0];
			if (needType == String(type)){
				return key;
			}
		}
		return null;
	}
	/**
	 * 任务的状态
	 */
	public getTaskStatus(id: string): boolean {
		return this.task.flags[id] && this.task.flags[id] == 1 ? true : false;
	}
	/**
	 * 任务类型的进度
	 */
	public gettTaskNum(type: string): number {
		return this.task.v[type] ? this.task.v[type] : 0;
	}
	/**
	 * 获得Task列表
	 */
	public getSortTask(): Config.AcCfg.ChristmasTaskItemCfg[] {
		let cfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let taskData = cfg.getTaskCfg();
		for (let i = 0; i < taskData.length; i++) {
			if (this.getTaskStatus(taskData[i].id)) {
				taskData[i].sortId = taskData.length + Number(taskData[i].id);
				continue;
			}
			else if (this.gettTaskNum(taskData[i].questType) >= taskData[i].value) {
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
	/**
	 * 红点显示
	 */
	public get isShowRedDot(): boolean {
		return this.isHaveTaskRedDot() || this.isHaveDrawRewardRedDot();
	}
		/**
	 * 任务奖励红点
	 */
	public isHaveTaskRedDot():boolean
	{
		let cfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg)
		{
			return false;
		}
		for(let i = 0;i < cfg.getTaskCfg().length; i++ )
		{
			if(this.gettTaskNum(cfg.getTaskCfg()[i].questType) >= cfg.getTaskCfg()[i].value )
			{
				if(!this.getTaskStatus(cfg.getTaskCfg()[i].id))
				{
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * 圣诞活动小红点可抽奖判断
	*/
	public isHaveDrawRewardRedDot():boolean{
		let cfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg)
		{
			return false;
		}
		let et = this.et - cfg.extraTime * 86400;
		//活动展示期不显示红点
		if (et <= GameData.serverTime){
			return false;
		}
		if (this.getItemValue() >= this.getFloorCost()){
			return true;
		}
		return false;
	}
	/**
	 * 活动结束倒计时，格式：00：00：00
	 */
	public get acCountDown(): string {
		let cfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let et = this.et - cfg.extraTime * 86400;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
	}
	/**
	 * 最后一层的奖励放第一位
	 */
	public formatLastRewards(rewards:string):string{
		if (!rewards){
			return null;
		}
		let arr = rewards.split("|");
		if (!arr || arr.length <= 1){
			return null;
		}
		let cfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let finalReward = cfg.getFloorRewardList("4")[0].reward;
		let index = rewards.indexOf(finalReward);
		App.LogUtil.log("formatLastRewards index: "+index + " rewards: "+rewards);
		if (index > -1){
			let str = rewards.substring(0, index-1);
			App.LogUtil.log("formatLastRewards11: "+str);
			return finalReward + "|" + str;	
		}
		else{
			return null;
		}
	}
	public dispose(): void {
		this.floor = null;
		this.task = null
		this.getrewards = null
		this.v = null
		super.dispose();
	}
}