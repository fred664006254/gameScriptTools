class AcReignTitleVo extends AcBaseVo
{
	//第几次获取头像
	public getnum:number = null;
	//文字数量信息{"1":1}
	public titleinfo:any = null;
	//任务信息  {'day1'={"1":1}}{第1天={任务类型=进度}}
	public taskinfo:any = null;
	//阶段奖励信息  {'day1'={"1":1}}{第1天={id=领取}}
	public flags:any = null;

	public reignTitle: any = null;

	public showHand:any = null;

	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}
		

		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REIGNTITLE_REFRESHVO);
	}
	private get cfg() : Config.AcCfg.ReignTitleCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	public ifSendFirst():boolean{
		return this.reignTitle == 1;
	}
	public checkShowHand():boolean{
		return this.showHand != 1;
	}
	public get isShowRedDot():boolean
	{

		let canChange = this.canChange();
		if(canChange){
			return true;
		}
		for(let i = 1; i <= 4;i ++){
			let result = this.canCollectTask(i);
			if(result){
				return true;
			}
		}
		
		return false;
	}

	public canCollectTask(day:number):boolean{
		let curDay = this.getCurDay();
		let dayTaskList = this.cfg["dayTask" + day];
		for(let key in dayTaskList){
			let itemData = dayTaskList[key];

			let value = 0;
			if(this.taskinfo["day"+day] && this.taskinfo["day"+ day][String(itemData.questType)]){
				value = this.taskinfo["day"+ day] && this.taskinfo["day"+ day][String(itemData.questType)];
			}
			let collect = 0;
			let flags = this.flags;
			if(flags["day"+ day] && flags["day"+ day][String(Number(key)+1)]){

				collect = flags["day"+day][String(Number(key)+1)];
			}

			if(itemData.questType == 1001){
				if(curDay < day){
					// status = 0;
				} else {
					if(value >= itemData.value){
						if(collect == 1){
							// status = 3;
						} else {
							// status = 2;
							return true;
						}	
					} 
				}
			} else {
               //0 未开启，1 跳转 / 未达成，2 可领取，3已经领取，4补领  
				if(curDay < day){
					// status = 0;
				} else if(curDay > day) {
					
					if(value >= itemData.value){
						if(collect == 1){
							// status = 3;
						} else {
							// status = 2;
							return true;
						}
					} 
				} else {
					if(value >= itemData.value){
						if(collect == 1){
							// status = 3;
						} else {
							// status = 2;
							return true;
						}
					}
				}
			}
		}
		return false;
	}

	//可以兑换头像
	public canChange():boolean{
        let needCount = this.cfg.reignTitleLevelNeed[this.getnum];
        let itemCount1 = this.titleinfo["1"]==null?0:this.titleinfo["1"];
        let itemCount2 = this.titleinfo["2"]==null?0:this.titleinfo["2"];
        let itemCount3 = this.titleinfo["3"]==null?0:this.titleinfo["3"];
        let itemCount4 = this.titleinfo["4"]==null?0:this.titleinfo["4"];
		if(itemCount1 >= needCount && itemCount2 >= needCount && itemCount3 >= needCount && itemCount4 >= needCount){
			return true;
		} else {
			return false;
		}
	}
	public getCurDay():number{
		let curDay = 1;
        let acSt = App.DateUtil.getWeeTs(this.st);
        let todaySt = App.DateUtil.getWeeTs(GameData.serverTime);
        curDay = (todaySt - acSt)/86400 + 1;
		return curDay;
	}
	public getUnlockTimeStr(day):string{
		// let deltaT = this.acVo.et - GameData.serverTime;
		let curDay = this.getCurDay();
		if(curDay < day){
			//未解锁
			let acSt = App.DateUtil.getWeeTs(this.st);
			let unlockSt = App.DateUtil.getWeeTs(acSt + 86400 * (day-1));
			let deltaT = unlockSt - GameData.serverTime;
			return App.DateUtil.getFormatBySecond(deltaT, 8);

		} else {
			return null;
		} 


	}

	public isInActivity():boolean{ 


		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}
	public isAcTimeOut():boolean
	{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}

	public dispose():void 
	{ 

		super.dispose();
	}
}