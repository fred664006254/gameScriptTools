class AcCrossServerServantVo extends AcBaseVo
{
	
	public preward : number = 0;
	public zreward : number = 0;
	public sid : number = 0;
	public sinfo1 : any = {};
	public sinfo2 : any = {};
	public tinfo : any = {};
	public maxsid : string = '';
	public pkzids : any[] = [];
	private selfRank = null;

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
		if(GameData.serverTime >= (this.et - 86400) && this.selfRank == null){
			App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_GETINFO), this.infoCallback, this);
			NetManager.request(NetRequestConst.REQUST_SERVANTPK_GETINFO, {
				activeId : `${this.aid}-${this.code}`,
			});
		}

		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SERVANTPK);
	}

	private infoCallback(evt : egret.Event):void{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_GETINFO), this.infoCallback, this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_RANK), this.rankCallback, this);
		NetManager.request(NetRequestConst.REQUST_SERVANTPK_RANK, {
			activeId : `${this.aid}-${this.code}`,
			sid : evt.data.data.data.maxsid
		});
	}

	private rankCallback(evt : egret.Event):void{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_RANK), this.rankCallback, this);
		this.selfRank = 99999;
		if(evt.data.data.data.menum){
			this.selfRank = evt.data.data.data.menum;
		}
	}
	
	public get cfg(): Config.AcCfg.CrossServerServantCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
    
	public get isShowRedDot():boolean
	{
		if(!this.cfg)
		{
			return false;
		}
		return this.getpublicRedhot1() || this.getpublicRedhot2();
	}

	/*
	*1开始时间  2结束时间前12h 3结束时间前7h 4结束时间前2h 5结束时间前30min 6结束时间前10min 7结束前3min 8展示期
	*/
	public getCurpeirod():number{
		let period = 1;
		let st = this.st;
		let et = this.et - 86400;
		let period_arr = [
			st,et - this.cfg.countDown[0], et - this.cfg.countDown[1], et - this.cfg.countDown[2], et - this.cfg.countDown[3], et - this.cfg.countDown[4], et - this.cfg.countDown[5], et
		];
		// let period_arr = [
		// 	st, et - this.cfg.cou, et - 7 * 3600, et - 2 * 3600, et - 30 * 60, et - 10 * 60, et
		// ];
		for(let i in period_arr){
			let time = period_arr[i];
			if(GameData.serverTime >= time){
				period = Number(i) + 1;
			}
		}
		if(GameData.serverTime >= et){
			period = 8;
		}
		return period;
	}
	
	public getpublicRedhot1():boolean{
		let flag = false;
		if(this.getCurpeirod() == 8 && Number(this.sid) && (Number(this.maxsid) == this.sid) && this.selfRank <= 500){
			flag = this.preward == 0;
		}
		return flag;
	}

	public getpublicRedhot2():boolean{
		let flag = false;
		if(this.getCurpeirod() == 8 && Number(this.sid)){
			flag = this.zreward == 0;
		}
		return flag;
	}
    
	public dispose():void
	{
		this.v = 0;
	}
}