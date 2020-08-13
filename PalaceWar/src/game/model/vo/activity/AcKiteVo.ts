class AcKiteVo extends AcBaseVo {


	public lotterynum: number;
	public scorenum: number;

	public chargenum: number;
	public maxhight: number;
	public nowhight: number;
	public mapinfo: any;
	public posinfo: any;

	public taskinfo: { [key: string]: number };
	public stageinfo: { [key: string]: number };
	public flags: any;
	public lastday: number;
	public firstOpen: any = null;
	public rankInfo:{myrank:any,rankList:any} = {myrank:0,rankList:{}};

	public dispose(): void {
		this.lotterynum = null;
		this.scorenum = null;
	
		this.chargenum = null;
		this.maxhight = null;
		this.nowhight = null;
		this.mapinfo = null;
		this.posinfo = null;
	
		this.taskinfo = null;
		this.stageinfo = null;
		this.flags = null;
		this.lastday = null;
		this.firstOpen = null;
		this.rankInfo = null;
	
		super.dispose();
	}



	public initData(data: any): void {
		for (let key in data) {
			this[key] = data[key];
		}
		// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_KITE_REFRESHVO);
	}

	private get cfg(): Config.AcCfg.KiteCfg {
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
	public getSkinNeedData():number{
		let data = this.cfg.getProgressList();
		for (let i = 0; i < data.length; i++){
			let rewardArr = data[i].getReward.split("|");
			for (let j = 0; j < rewardArr.length; j++){
				let itemId = rewardArr[j].split("_")[1];
				let itemCfg = Config.ItemCfg.getItemCfgById(itemId);
				if (itemCfg.servantSkinID && itemCfg.servantSkinID == Number(this.cfg.corePrize)){
					return data[i].need;
				} 
			}
		}
		return 0;
	}

	public isFirst(): boolean {
		return this.firstOpen != 1;
	}

	/**拥有数量 */
	public get starNum(): number {
		return this.scorenum ? this.scorenum : 0;
	}

	/**抽取次数 */
	public get useNum(): number {
		return this.lotterynum ? this.lotterynum : 0;
	}

	public get curStep(): number {

		// let progress = this.cfg.progress;
		// for (let i = 0; i < progress.length; i++) {
		// 	const element = progress[i];
		// 	if(this.lotterynum >= element.needNum){
		// 		continue;
		// 	}else{
		// 		return i;
		// 	}	
		// }
		// return progress.length;
		let maxDrawNum = this.cfg.progressList[this.cfg.progressList.length - 1]["need"];
		return this.lotterynum / maxDrawNum;

	}

	
	public isHaveBoxRedDot():boolean{
		let boxCfg = this.cfg.progressList;
        for (let index = 0; index < boxCfg.length; index++) {
			let rStatus = this.getBoxStatusByIndex(boxCfg[index].id);
			if(rStatus == 2){
				return true;
			}
		}
		return false;
	}

	/**
	 * 任务奖励红点
	 */
	public isHaveTaskRedDot(): boolean {
		let cfg = <Config.AcCfg.KiteCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if (!cfg) {
			return false;
		}

		let tasklist = cfg.getTaskList();
		for (let i = 0; i < tasklist.length; i++) {
			if (!this.getTaskStatus(tasklist[i].id) && this.getTaskNum(String(tasklist[i].questType)) >= tasklist[i].value) {
				return true;
			}
		}
		return false;
	}


	/**
	 * 任务类型的进度
	 */
	public getTaskNum(type: string|number): number {
		return this.taskinfo[type] ? this.taskinfo[type] : 0;
	}
	/**
	 * 任务的状态
	 */
	public getTaskStatus(taskId:string|number): boolean {
		return this.flags[taskId] && this.flags[taskId] == 1 ? true : false;
	}
	/**
	 * 获得Task列表
	 */
	public getSortTask(): Config.AcCfg.KiteTaskItemCfg[] {
		let baseTaskData = this.cfg.getTaskList();
		let taskLength = baseTaskData.length;
		let arr: Array<any> = [];
		for (let i = 0; i < baseTaskData.length; i++) {
			if (this.getTaskStatus(baseTaskData[i].id)) {
				baseTaskData[i].sortId = taskLength + Number(baseTaskData[i].id);
			}
			else if (this.getTaskNum(baseTaskData[i].questType) >= baseTaskData[i].value) {
				baseTaskData[i].sortId = (Number(baseTaskData[i].id)) - taskLength - 1;
			}
			else {
				baseTaskData[i].sortId = Number(baseTaskData[i].id);
			}
			arr.push(baseTaskData[i]);
		}
		arr.sort((a, b)=>{return a.sortId - b.sortId});
		return arr;
	}

	/**
	 * 进度配置
	 */
	public getSortProcessCfg():Config.AcCfg.KiteProgressItemCfg[]{
		let data = [];
		let dataList = this.cfg.progressList;
		let sepIndex = 5;
		let sepNeed = dataList[sepIndex - 1].need;
		let len = dataList.length;
		// if (this.lotterynum < sepNeed){
		// 	len = 5;
		// }
		for (let i=0; i < len; i++){
			let status = this.getBoxStatusByIndex(dataList[i].id);
			if (status == 3){
				dataList[i].sortId = dataList.length + Number(dataList[i].id);
			}
			else if (status == 2){
				dataList[i].sortId = Number(dataList[i].id) - dataList.length;
			}
			else{
				dataList[i].sortId = Number(dataList[i].id);
			}
			data.push(dataList[i]);
		}
		data.sort((a, b)=>{return a.sortId - b.sortId});
		return data;
	}

	public isSecondProcess():boolean{
		let dataList = this.cfg.progressList;
		let sepIndex = 5;
		let sepNeed = dataList[sepIndex - 1].need;
		if (this.lotterynum >= sepNeed){
			return true;
		}
		return false;
	}

	public isSecondProcessRed():boolean{
		let data = this.cfg.progressList;
		for (let i = 5; i < data.length; i++){
			let rStatus = this.getBoxStatusByIndex(data[i].id);
			if(rStatus == 2){
				return true;
			}
		}
		return false;
	}

	public getCurrRedProcessId():number{
		let data = this.cfg.progressList;
		for (let i = 0; i < data.length; i++){
			let rStatus = this.getBoxStatusByIndex(data[i].id);
			if(rStatus == 2){
				return data[i].id;
			}
			else if (rStatus == 1){
				return data[i].id;
			}
		}
		return 1;
	}

	// 1->宝箱不可领取 ,2->可以领取宝箱, 3->已经打开宝箱
	public getBoxStatusByIndex(id: string|number): number {
		if (this.stageinfo[id]) {
			return 3;
		} else {
			let need = 0;
			let data = this.cfg.progressList;
			for (let i=0; i < data.length; i++){
				if (String(data[i].id) == String(id)){
					need = data[i].need;
					break;
				}
			}
			if (this.lotterynum >= need) {
				return 2;
			} else {
				return 1;
			}
		}
	}

	// public setRankInfo(data:any){
	// 	this.rankInfo = {
	// 		myrank:data.myrank,
	// 		rankList:data.rankList
	// 	}
	// }

	public get progressPercent():number{
		let data = this.cfg.getProgressList();
		let index = 4;
		let max = data[index].need;
		// return Math.min(1,this.lotterynum/this.cfg.getMaxBoxNeedNum());
		return Math.min(1, this.lotterynum/max);
	}

	public get isShowRedDot(): boolean {
		if (this.isHaveBoxRedDot() ||this.isHaveTaskRedDot()) {
			return true;
		}
		return false;
	}

	public isInActivity(): boolean {
		return GameData.serverTime >= this.st && GameData.serverTime < this.et- 86400*(this.cfg.extraTime||0);
	}

	public get acCountDown(): string {
		let et = this.et - (this.config.extraTime || 0) * 86400;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return LanguageManager.getlocal("acKiteTimeCountDown", [App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1)]);
	}

}