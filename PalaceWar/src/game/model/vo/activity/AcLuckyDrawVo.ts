class AcLuckyDrawVo extends AcBaseVo
{
	public pickNum = 0;
	public selIdx = 0;
	private _isfree = 0;
	private _coin = 0;
	private _lottery = null;
	private _charge = null;

	public showId = null;

	public constructor(){
		super();
	}

	public initData(data:any):void{
		super.initData(data);
		this._isfree = data.isfree;
		this._coin = data.coin;
		this._lottery = data.lottery;
		this._charge = data.charge;
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM);
	}

	//获取自己幸运币数
	public getLuckyCoin():number{
		return this._coin;
	}

	//获取累积充值数目
	public getChargeNum():number{
		let num = 0;
		if(this._charge && this._charge.v){
			num = this._charge.v;
		}
		return num;
	}

	//倒计时
	public getCountDown():number{
		return this.et - 86400 - GameData.serverTime;
	}
	/**
	 * 累积充值领取判断
	 * */
	public isGetRecharge(id:number):boolean
	{	
		let idx = id + 1;
		if(this._charge&&this._charge.flags)
		{
			if(this._charge.flags[idx]==1)
			{
				return true;
			}
		}
		return false;
	}

	/*
	*活动周期内
	*/
	public isInActy():boolean{
		let flag = false;
		if(GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400){
			flag = true;
		}
		return flag;
	}
	
	public isActyEnd():boolean{
		let flag = false;
		if(GameData.serverTime >= this.et){
			flag = true;
		}
		return flag;
    }

	private get cfg() : Config.AcCfg.LuckyDrawCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	//是否免费
	public getpublicRedhot1():boolean{
		let flag = false;
		if(this.isInActivity()){
			flag = this.isFree();
		}
		return flag;
	}
	//是否有未领取进度奖励
	public getpublicRedhot3():boolean{
		if (this.isActyEnd())
		{
			return false;
		}
		//奖励进度宝箱
		for(let i in this.cfg.achievement){
			let unit = this.cfg.achievement[i];
			let jindu = Number(i);
			if(this.getLuckyProgress() >= unit.needNum && !this.isGetJinduAward(jindu)){
				return true;
			}
		}
		return false;
	}
	//是否有未领取充值奖励
	public getpublicRedhot2():boolean
	{	
		//充值
		let cfg = this.cfg;
		if(!cfg)
		{
			return false;
		}
		if (this.isActyEnd())
		{
			return false;
		}
		let curCharge = this.getChargeNum();
		for(let i in cfg.recharge){
			let unit = cfg.recharge[i];
			if(curCharge >= unit.needGem && !this.isGetRecharge(Number(i))){
				return true;
			}
		}
		return false;
	}

	public isFree():boolean{
		return this._isfree == 1;
	}

	public get isShowRedDot(): boolean 
	{	
		if (this.getLuckyCoin()>0 && this.isInActivity())
		{
			return true;
		}
		for(let i = 1; i <= 3; ++ i){
			if(this[`getpublicRedhot${i}`]()){
				return true
			}
		}
		return false; 
	} 
	
	public get acTimeAndHour():string
	{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400;
	}
	
	public isGetJinduAward(id):boolean{
		let idx = Number(id) + 1;
		let info : any = this._lottery;
		if(info && info.flags){
			if(info.flags[idx]==1){
				return true;
			}
		}
		return false;
	}
	/*当前已翻牌次数*/
	public getLuckyProgress():number{
		let num = 0;
		if(this._lottery && this._lottery.v){
			num = this._lottery.v;
		}
		return num;
	}
	//当前进度
	public getCurjindu():number{
		let curJindu = 0;
		let curProgress = this.getLuckyProgress();
		if(curProgress >= this.cfg.getTotalProgress()){
			curJindu = this.cfg.achievement.length;
		}
		else{
			for(let i in this.cfg.achievement){
				let unit = this.cfg.achievement[i];
				if(curProgress < unit.needNum){
					curJindu = Number(i);
					break;
				}
			}
		}
		return curJindu;
	}
	 
	public dispose():void {
		this.pickNum = 0;
		this.selIdx = 0;
		this. _isfree = 0;
		this. _coin = 0;
		this. _lottery = null;
		this. _charge = null;
		this.showId = null;
		super.dispose(); 
	}
}