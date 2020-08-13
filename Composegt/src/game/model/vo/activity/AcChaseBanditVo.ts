class AcChaseBanditVo extends AcBaseVo {
	public selIdx: number = 0;
	public ainfo: any = {};
	private flags: any = {} //{v = 0,flags={}} --充值信息
	private taskinfo: any = {} //{v = 0,flags={}} --充值信息
	public attacknum: number;
	public canatknum:number;

	public initData(data: any): void {
		for (let key in data) {
			this[key] = data[key];
			if (key == 'ainfo') {
				const ele = data[key];
				this.flags = ele.flags;
				this.attacknum = ele.lotterynum;
				this.taskinfo = ele.taskinfo;
				this.canatknum = ele.v || 0;
			}
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHASEBANDIT_FRESH_ITEM);
	}
	private get cfg(): Config.AcCfg.ChaseBanditCfg {
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	/**
 * 累积充值领取判断
 * */
	public isGetRecharge(id: number): boolean {
		let flag = false;
		if (this.flags && this.flags[id]) {
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
		if (!this.cfg) {
			return false;
		}
		if (this.canatknum > 0 && this.attacknum < this.cfg.num) {
			return true;
		}
		if (this.isHaveTaskRedDot()) {
			return true;
		}
        // 宝箱
        for (var i = 0; i < this.cfg.lotteryNum.length; i++) { 
			let tmprcfg = this.cfg.lotteryNum[i];
			if ((!this.ainfo.flags ||  !this.ainfo.flags[i+1]) && this.ainfo.lotterynum >= tmprcfg.needNum) {
                return true;
            }
        }
		return false;
	}
	/**
	 * 任务奖励红点
	 */
	public isHaveTaskRedDot():boolean
	{
		let cfg = <Config.AcCfg.ChaseBanditCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg)
		{
			return false;
		}

		let tasklist = cfg.getTaskList();
		for(let i = 0;i < tasklist.length; i++ )
		{
			if(!this.getTaskStatus(tasklist[i].id) && this.gettTaskNum(tasklist[i].questType) >= tasklist[i].value)
			{
				return true;
			}
		}
		return false;
	}
	/**
	 * 任务类型的进度
	 */
	public gettTaskNum(type:string):number
	{
		return this.ainfo.taskinfo[type]?this.ainfo.taskinfo[type]:0;
	}
	/**
	 * 任务的状态
	 */
	public  getTaskStatus(id:string):boolean
	{
		return  this.ainfo.flags[id]&&this.ainfo.flags[id] == 1?true:false;
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
		this.taskinfo = {} //{v = 0,flags={}} --充值信息
		this.flags = {} //{v = 0,flags={}} --充值信息
		super.dispose();

	}
}