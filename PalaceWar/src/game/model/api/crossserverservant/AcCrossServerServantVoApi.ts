class AcCrossServerServantVoApi extends BaseVoApi
{
	public constructor() {
		super();
	}

	public get vo() : AcCrossServerServantVo{
        return <AcCrossServerServantVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_SERVANTPK);
	}

	public get cfg() : Config.AcCfg.CrossServerServantCfg{
        return this.vo.cfg;
	}

	public initData(data:any):void{
		this.vo.initData(data);
	}
	
	/*
	*1开始时间  2结束时间前12h 3结束时间前7h 4结束时间前2h 5结束时间前30min 6结束时间前10min 7结束时间前3min 8展示期
	*/
	public getCurpeirod():number{
		return this.vo.getCurpeirod();
	}

	public getCountTime():number{
		let st = this.vo.st;
		let et = this.vo.et - 86400;
		let period = this.getCurpeirod();
		if(period < 8){
			return et - GameData.serverTime;
		}
		
	}

	/*
	*获取对战的两个门客的支援人数
	*/
	public getCheerNum(area : number):number{
		if(this.vo.tinfo[this.getVsServant(area)]){
			return this.vo.tinfo[this.getVsServant(area)][1];
		}
		return 0;
	}

	/*
	*获取对战的两个门客的支援人数
	*/
	public getCheerPlayer(area : number):any[]{
		let arr = [];
		// let rid = Math.floor(Math.random() * 20);
		for(let i in this.vo[`sinfo${area}`]){
			let unit = this.vo[`sinfo${area}`][i];
			arr.push({
				uid : unit.uid,
				name : unit.name,
				zid : unit.zid
			});
		}
		return arr;
	}

		/*
	*获取对战的两个门客
	*/
	public getVsServant(area : number):string{
		//return area == 1 ? '1001' : '1002';
		return this.cfg[`servantId${area}`]
	}

	/*
	*获取对战的两个门客对应新皮肤
	*/
	public getVsServantSkin(area : number):string{
		//return area == 1 ? '1001' : '1002';
		let skin = this.cfg[`servantSkin${area}`];
		return skin.split('_')[1];//`skin_full_${skin.split('_')[1]}`;
	}


	/*
	*获取支持的门客
	*/
	public getCheerForArea():number{
		for(let i = 1; i < 3; ++i){
			if(Number(this.vo.sid) == Number(this.cfg[`servantId${i}`])){
				return i;
			}
		}
		return 0;
	}

	/*
	*获取支持的门客
	*/
	public getCheerServantId():number{
		return Number(this.vo.sid)
	}

	/*
	*获取赢的门客
	*/
	public getWinServant():number{
		if(this.getCurpeirod() == 8){
			for(let i = 1; i < 3; ++i){
				if(Number(this.cfg[`servantId${i}`]) == Number(this.vo.maxsid)){
					return i;
				}
			}
		}else{
			return 0;
		}
		
	}

	/*
	*获取赢的门客
	*/
	public getWinServantId():number{
		if(this.getCurpeirod() == 8){
			return Number(this.vo.maxsid);
		}else{
			return 0;
		}
	}

	/*
	*获取活动日期
	*/
	public get acTimeAndHour():string
	{	
		let st = this.vo.st;
		let et = this.vo.et - 86400;
		return App.DateUtil.getOpenLocalTime(st,et,true);
	}

	/*
	*获取活动参与区服
	*/
	public getCrossServer():string[]
	{	
		return this.vo.pkzids;
	}

	/*
	*获取属性
	*/
	public getTotalNum(area : number, type : number):string
	{	
		let total = this.vo.tinfo[this.getVsServant(area)] ? this.vo.tinfo[this.getVsServant(area)][0] : 0;
		let str = Math.floor(total / 10000).toString();
		// if(PlatformManager.checkIsEnLang())
		// {
		// 	str = Math.floor(total / 1000).toString();
		// }
		let arr = [];
		for(let i = 1; i <= 6; ++ i){
			if(str[str.length - i]){
				arr.push(str[str.length - i]);
			}
			else{
				arr.push('0');
			}
		}
		return arr[type - 1];
	}

	/*
	*获取活动参与区服
	*/
	public getIsWinner():boolean
	{	
		return Number(this.vo.maxsid) == this.getCheerServantId();
	}

	/*
	*是否领取过奖励
	*/
	public getIsLqPreward():boolean
	{	
		return this.vo.preward == 1;
	}

	/*
	*是否领取过奖励
	*/
	public getIsLqZreward():boolean
	{	
		return this.vo.zreward == 1;
	}

	public dispose():void{
		super.dispose();
	}
}