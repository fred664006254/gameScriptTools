
class AcFlipCardVo extends AcBaseVo
{

	public cardinfo:{get: number, ctype: number,rewards:string}[]= []; 
	public lotterynum:number=0; 
	public taskinfo = {}; 
	public stageinfo= {}; 
	public flags = {};
	public lastday:number = 0;

	public initData(data:any):void
	{
		super.initData(data);

		let isRefreshTask = false;
		for (var key in data.taskinfo) {
			if (data.taskinfo.hasOwnProperty(key)) {
				var element = data.taskinfo[key];
				if(!this.taskinfo[key] || !this.taskinfo[key] != element)
				{
					isRefreshTask = true;
				}
			}
		}
		this.cardinfo = data.cardinfo;
		this.lotterynum = data.lotterynum;
		this.taskinfo = data.taskinfo;
		this.stageinfo = data.stageinfo;
		this.flags = data.flags;
		this.lastday = data.lastday;
		if(isRefreshTask){
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FLIPCARD_TASK_REFRESH);
		}
	}

	/**
	 * 任务的状态
	 */
	public  getTaskStatus(id:string):boolean
	{
		if(!this.flags || !this.flags[id]){
			return  false;
		}
		return  this.flags[id]&&this.flags[id] == 1?true:false;
	}
		/**
	 * 任务类型的进度
	 */
	public gettTaskNum(type:string):number
	{
		if(!this.taskinfo || !this.taskinfo[type]){
			return  0;
		}
		return this.taskinfo[type]?this.taskinfo[type]:0;
	}
	//翻一次价格
	public getFlipPrice()
	{
		let len = this.getFlipNums();
		return this.config.costRange[len] || 0;
	}
	//一键价格
	public getBatchFlipPrice()
	{
		let len = this.getFlipNums();
		let costRange = this.config.costRange;
		let price = 0;
		for (var index = len; index < 6; index++) {
			price += costRange[index];
		}
		return price;
	}

	public isFlipEnable()
	{
		let len = this.getFlipNums();
		return len < 6;
		// for (var key in this.cardinfo) {
		// 	if (this.cardinfo.hasOwnProperty(key)) {
		// 		var element = this.cardinfo[key];
		// 		if(element.get == 0)
		// 		{
		// 			return true;
		// 		}
		// 	}
		// }
		// return false
	}
	public isCardReset()
	{
		return this.getFlipNums() == 0;
	}
	
	public getFlipNums()
	{
		let num = 0;
		for (var key in this.cardinfo) {
			if (this.cardinfo.hasOwnProperty(key)) {
				var element = this.cardinfo[key];
				if(element.get == 1)
				{
					num ++;
				}
			}
		}
		return num;
	}

	public getCurSelectCardIdx()
	{
		let num = 1;
		let keys = Object.keys(this.cardinfo);
		for (var index = 0; index < keys.length; index++) {
			let  key = keys[index];
			if (this.cardinfo.hasOwnProperty(key)) {
				var element = this.cardinfo[key];
				if(element.get == 0)
				{
					num = Number(key);
					break;
				}
			}
		}
		return num;
	}
	public isCardFliped(index:number)
	{
		return  this.cardinfo[index].get == 1;
	}

	public getCardType(index:number)
	{
		return  this.cardinfo[index].ctype ;
	}
	public getCardReward(index:number)
	{
		return  this.cardinfo[index].rewards || null ;
	}
	public getStageinfo(stage:number)
	{
		return this.stageinfo[stage] || 0
	}

	public get isShowRedDot():boolean
	{
		let lotterynum = this.lotterynum ;
        let cfg = <Config.AcCfg.FlipCardCfg>this.config;
        let ReviewNum = cfg.ReviewNum;
        for (var index = 1; index <= ReviewNum.length; index++) {
            let stage = this.getStageinfo(index);
            if(stage == 0 && ReviewNum[index-1].needNum <= lotterynum){
				return true;
            }
        }
		return this.isShowTaskRed();
	}

	public isShowTaskRed()
	{
		let cfg = <Config.AcCfg.FlipCardCfg>this.config;
		let task = cfg.task;
		for (var index = 0; index < task.length; index++) {
			// var element = task[index];
			let element = task[index];
			let openType = element.openType;
			let taskNum = this.gettTaskNum(""+element.questType);
			if(taskNum >= element.value && !this.getTaskStatus( "" + (index+1) )){
				return true;
			}
		}
		return false;
	}

	public dispose():void 
	{ 
		this.cardinfo= []; 
		this.lotterynum=0; 
		this.taskinfo=0; 
		this.stageinfo= []; 
		this.flags= null; 
		this.lastday= null; 

		super.dispose();
	}
}