class AcCrossServerIntimacyVo extends AcBaseVo{
    public info:any = null;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}
	}

	public get acTimeAndHour():string
	{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st + 7200,et,true);
	}

    //个人奖励是否领取
    public isGetPreward() : boolean
	{
		return this.info.preward == 1;
    }
    
    //获取区域排名
	public isGettZonereward() : boolean
	{
		return this.info.zonereward == 1;
	}
    
    //获取当前亲密排行榜自己的分数
    public getCurPoints():number{
        return Number(this.info.v);
    }

    //自己的参赛资格
    public getIsCanJoin():boolean{
        return this.info.iscanjoin;
	}
	
	//当前时间阶段 0即将开始  1:准备开始倒计时  2:结束倒计时   3:展示期 4:活动结束
	public judgeTimeProcess():number{
		let timeNumber:number = 3600 * 2;
		let timeNumber2:number = 3600 * 24;
		let type = 0;
		if (GameData.serverTime < this.st)
		{	
			type = 0;
		}
		else if(GameData.serverTime >= this.st &&  GameData.serverTime < (this.st + timeNumber)){
			type = 1;
		}
		else if (GameData.serverTime >= (this.st + timeNumber) && GameData.serverTime < (this.et - timeNumber2))
		{
			type = 2;
		}
		else  if((GameData.serverTime >= (this.et - timeNumber2)) && GameData.serverTime < this.et){
			type = 3;
		}
		else  if(GameData.serverTime >= this.et){
			type = 4;
		}
		return type;
	}

	//时间转格式
	public getCountTimeStr(num):string
	{	
		let time:number = num;
		if (time < 0) {
			time = 0;
		}
		return App.DateUtil.getFormatBySecond(time);
	}

    public dispose():void
	{
		this.info = null;

		super.dispose();
    }
}