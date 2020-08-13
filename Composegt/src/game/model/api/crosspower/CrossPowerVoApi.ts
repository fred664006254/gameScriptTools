class CrossPowerVoApi extends BaseVoApi
{
	private _crossPowerVo : AcCrossServerPowerVo;
	private _zonerankinfos : any = null;
	private _prankinfos : any = null
	private _iszonewin : number = 0;
	private _merank : number = 0;
	private _mepoint : number = 0;
	private _countDownTime : number = 0;
	private _zidgroups:any = 0;

	public constructor() {
		super();
	}

	public getCountDownTime():number{
		return this._countDownTime;
	}

	public setCountDownTime(time){
		this._countDownTime = time;
	}

	public setZoneRankInfo(data : any) : void{
		this._zonerankinfos = data.atkranks;
		this._iszonewin =  data.iszonewin;
		this._zidgroups = data.zidgroups;
	}

	public setPRankInfo(data : any) : void{
		this._prankinfos = data.atkranks;
		this._merank = data.merank;
		this._mepoint = data.mepoint;
	}
	public get zidLength(){
		return this._zidgroups ?  this._zidgroups.length:1;
	}
	public get zonerankinfos(){
		return this._zonerankinfos;
	}

	public get prankinfos(){
		return this._prankinfos;
	}

	public get iszonewin(){
		return this._iszonewin;
	}

	public get merank(){
		return this._merank;
	}

	public get mepoint(){
		return this._mepoint;
	}

	public dispose():void
	{
		this._zonerankinfos = null;
		this._prankinfos = null;
		this._crossPowerVo = null;
	
		super.dispose();
	}
}