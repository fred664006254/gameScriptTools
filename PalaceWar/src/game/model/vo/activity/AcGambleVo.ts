class AcGambleVo extends AcBaseVo
{
	private _gambNum : number = 0;
	private _gambRoundNum : number = 0;
	private _round : any = null;
	public _prevTime = 0;
	public _prevRound = 0;
	public constructor(){
		super();
	}

	public initData(data:any):void{
		for(let key in data)
		{
			this[key]=data[key];
		}
		this._gambNum = data.gambNum;
		this._gambRoundNum = data.gambRoundNum;
		this._round = data.round;
		//App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM);
	}

	public get acTimeAndHour():string{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

   	public get isShowRedDot(): boolean{
		if(this.isStart)
		{
			return false;
		}
		let flag = false;
		for(let i in this._round){
			let unit = this._round[i];
			if(typeof unit.reward == 'undefined' && unit.gemNum > 0){
				flag = true;
				break;
			}
		}
		return flag;
	}

	public isInActy():boolean{
		let flag = false;
		if(GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400){
			flag = true;
		}
		return flag;
	}


	/**
	 * 获取当前场次
	*/
	public getCurTime():number{
		return this._gambNum;
	}

	/**
	 * 获取当前回合
	*/
	public getCurRound():number{
		return this._gambRoundNum;
	}

	/**
	 * 今日是否全部结束
	*/
	public _isEnd = false;
	public getIsEnd():boolean{
		return this._gambNum > 3;
	}

	private get cfg() : Config.AcCfg.GambleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	/**
	 * 获取当前回合的押注金额
	*/
	public getThisRoundGem(round : number = 0):number{
		let baseGem = 0;
		if(round){
			let unit = this._round[round];
			if(typeof unit.reward == 'undefined' && unit.gemNum > 0){
				baseGem = unit.gemNum;
			}
		}
		else{
			for(let i in this._round){
				let unit = this._round[i];
				if(typeof unit.reward == 'undefined' && unit.gemNum > 0){
					baseGem = unit.gemNum;
					break;
				}
			}
		}
		return baseGem;
	}
	
	/**
	 * 获取当前累计的奖金数目
	*/
	public getMyGem():number{
		let num = 0;
		let baseGem = 0;
		for(let i in this._round){
			let unit = this._round[i];
			if(typeof unit.reward == 'undefined' && unit.gemNum > 0){
				baseGem = unit.gemNum;
				for(let j in unit.ret){
					if(unit.ret[j] == 1){
						let round = Number(j) + 1;
						num = (baseGem * (this.cfg.gambPrize[round].stop.prize));
					}
				}
				break;
			}
		}
		return num;
	}
	/**
	 * 是否可以领取奖励
	*/
	public canGetReward():boolean{
		let flag = false;
		for(let i in this._round){
			let unit = this._round[i];
			if(typeof unit.reward == 'undefined' && unit.gemNum > 0){
				for(let j in unit.ret){
					if(unit.ret[j] == 1){
						flag = true;
						break;
					}
				}
				break;
			}
		}
		return flag;
	}

	/**
	 * 奖励信息
	*/
	public getRewardInfo():{round : number, time : number}{
		let temp : any = null;
		for(let i in this._round){
			let unit = this._round[i];
			if(typeof unit.reward == 'undefined' && unit.gemNum > 0){
				temp = {};
				temp.time = Number(i) + 1;
				temp.round = unit.ret.length;
				break;
			}
		}
		return temp;
	}
	
	public dispose():void{ 
		this._isEnd = false;
		this._round = null;
		this._gambNum = this._gambRoundNum = 0;
		this._prevRound = this._prevTime = 0;
		super.dispose();
	}
}