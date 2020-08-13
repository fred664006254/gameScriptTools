class AcAnswerVo extends AcBaseVo
{
	public anum: number =0; //已答次数
	public cannum: number =0;
	public point: number =0; //当前活跃度
	//{list={1，2，3，4}10道题目,score=0 答题分数,endindex=0 答题位置,oknum=0 答对个数,usetime=0 总使用时间} --考题情况
	public qinfo: {oknum: number, endindex: number, list:number[], score: number, usetime: number} 
	public tscore: number =0; //总积分
	public todaySt:number = 0;
	
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		let oldPoint = this.point || 0;
		for(let key in data)
		{
			this[key]=data[key];
		}
		if(this.point != oldPoint){
			//App.MessageHelper.dispatchEvent(MessageConst.EXAMANSWER_POINTCHANGE);
		}
	}

	public get isStart():boolean
	{
		if((this.st <= GameData.serverTime) && (this.et > GameData.serverTime))
		{
			return true;
		}
		return false;
	}
	public isInExtra():boolean{
		if (this.isInActivity()&&this.config) {
			let extraTime = this.config.extraTime;
			if (extraTime) {
				return GameData.serverTime > this.et - 86400 * extraTime
			}
		}
		return false
	}
	
	
	public get isShowRedDot():boolean
	{
		if(!this.isInActivity() || this.isInExtra()){
			return false;
		}
        return this.point >= (this.anum +1) * this.config.cost ;
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}

}