class AtkracecrossVoApi extends BaseVoApi
{
	private atkracecrossVo:AtkracecrossVo;
	public zonerankinfos:any = null;
	private _prankinfos : any = null
	private _merank : number = 0;
	private _mepoint : number = 0;	
	public isCanJoin:boolean =false;
	public revengeIdx:number = 0;
	private _flagRankInfo:any = null;

	public newcrossCode :string = null;

	/**
	 * 江湖名望 席位数据
	 */
	private _fameMapInfo:any = {};

	public constructor() {
		super();
	}

	public getNewCrossVo():AcNewCrossServerAtkRaceVo
	{
		let crossVo = <AcNewCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace",this.newcrossCode);
		return crossVo;
	}

	public getNewCrossCfg():Config.AcCfg.NewCrossServerAtkRaceCfg
	{
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode("newCrossServerAtkRace",this.newcrossCode);
		return cfg;
	}

	public setZoneRankInfo(data : any) : void{
		this.zonerankinfos = data.atkranks;
		// this._iszonewin =  data.iszonewin;
	}

	public setPRankInfo(data : any) : void
	{
		this._prankinfos = data.atkrank;
		this._merank = data.merank;
		this._mepoint = data.mepoint;

		this.zonerankinfos = data.zrank;
	}

	public get prankinfos(){
		return this._prankinfos;
	}
	
	public get merank(){
		return this._merank;
	}

	public get mepoint(){
		return this._mepoint;
	}	

	public setFlagRankInfo(data:any):void{
		this._flagRankInfo = data;
	}

	public get flagRankInfo(){
		return this._flagRankInfo;
	}
		
	/**
	 * 战斗信息
	 */
	public getMyFightInfo():AtkraceAtkInfoVo
	{
		return this.atkracecrossVo.ainfo;
	}

	public getUseTimes():number
	{
		let useids = this.atkracecrossVo.info.asids;
		return useids.length;
	}

	public getUseTimes2():number
	{
		let i = 1;
		let useids = this.atkracecrossVo.info.asids;
		if (useids.length>=30)
		{
			i = 1 + Math.floor(useids.length/30);
		}
		return i;
	}

	public getUseServantsTimes(sid:string):number
	{
		let g = 0;
		let useids = this.atkracecrossVo.info.asids;
		if (useids.length>=1)
		{
			for (let i = 0; i<useids.length; i++)
			{
				if (sid == useids[i])
				{
					g++;
				}
			}
		}
		return g;
	}

	/**
	 * 武馆信息息
	 */
	public getMyInfo():AtkraceInfoVo
	{
		if (this.atkracecrossVo){
			return this.atkracecrossVo.info;
		}
		return null;
	}

	/**
	 * 江湖名望
	*/
	public setFameMapInfo(data:any){
        if (data){
            for (let k in data){
                let row = Number(k) * 10 + 1;
                for (let i=0; i < data[k].length; i++){
                    let num = row + i;
                    if (!this._fameMapInfo[num]){
                        this._fameMapInfo[num] = {};
                    }
                    this._fameMapInfo[num] = data[k][i];
                } 
            }
        }
	}
	
	public setClearFameMapInfo(floor:number):void{
		if (this._fameMapInfo && this._fameMapInfo[floor]){
			this._fameMapInfo[floor] = null;
		}
	}

    public getFameMapInfoByFloor(floor:number):any{
        if (this._fameMapInfo && this._fameMapInfo[floor]){
            return this._fameMapInfo[floor];
        }
        return null;
    }

    public clearFameMapInfo():void{
        this._fameMapInfo = {};
	}
	
	//江湖名望 席位数据
	public getMyFameSeatInfo():any{
		let atkInfo = this.getMyInfo();
		if (atkInfo && atkInfo.director){
			return atkInfo.director;
		}
		return null;
	}

	/**
	//  * 获取区服
	//  */
	// public getMydinfo(index:number):number
	// {
	// 	return this.atkracecrossVo.info[index].zid; 
	// }

	public isShowNpc():boolean
	{
		return Api.servantVoApi.getServantCountLevel60Plus()>=1 && Api.servantVoApi.getServantCount() >= Config.AtkraceCfg.getUnlock();
		// return true;
	}

	public getLockedString():string
	{
		return LanguageManager.getlocal("atkraceUnlcok",[Config.AtkraceCfg.getUnlock().toString()]);
	}

	public getPoint():number
	{
		return this.atkracecrossVo.point;
	}

	public getRewardc():any
	{
		return this.atkracecrossVo.rewardc;
	}

	public getLastKillerInfo():any
	{
		return this.atkracecrossVo.info.lastKillerInfo;
	}
	
	public checkNpcMessage():boolean
	{	
		let flag:boolean = false;
		if (this.atkracecrossVo && this.isShowNpc()) {
			if (this.atkracecrossVo.ainfo && this.atkracecrossVo.ainfo.mesid ) {
				flag = true;
			}
			else {
				let maxCount:number = Config.AtkraceCfg.getDailyNum();
				if(this.atkracecrossVo&&this.atkracecrossVo.info)
				{
					let myNum:number = this.atkracecrossVo.info.num;
					if (this.isCanJoin && myNum < maxCount) {
						let countDownTime:number = this.atkracecrossVo.info.lasttime + Config.AtkraceCfg.getIntervalTime() -  GameData.serverTime; 
						if (countDownTime<=0) {
							flag = true;
						}
					}
				}
				else
				{
					flag=false;
				}
			}
		}
		return flag;
	}


	public dateErrorHandle(type:number=1): void {

		if (type == 1)
		{
			let atkraceView = <AtkracecrossView>ViewController.getInstance().getView(ViewConst.COMMON.ATKRACECROSSVIEW);
			if (atkraceView) {
				atkraceView.refreshServant();
			}

			let rewardPopupView = ViewController.getInstance().getView(ViewConst.POPUP.ATKRACECROSSREWARDPOPUPVIEW);
			if (rewardPopupView) {
				rewardPopupView.hide();
			}

			let autoFightPopupView = ViewController.getInstance().getView(ViewConst.POPUP.ATKRACECROSSAUTOFIGHTPOPUPVIEW);
			if (autoFightPopupView) {
				autoFightPopupView.hide();
			}

			let buyPopupView = ViewController.getInstance().getView(ViewConst.POPUP.ATKRACECROSSBUYPOPUPVIEW);
			if (buyPopupView) {
				buyPopupView.hide();
			}

			let agreePopupDialog = ViewController.getInstance().getView(ViewConst.POPUP.ATKRACECROSSAGREEPOPUPDIALOG);
			if (agreePopupDialog) {
				agreePopupDialog.hide();
			}

			let arrestView = ViewController.getInstance().getView(ViewConst.COMMON.ATKRACECROSSARRESTVIEW);
			if (arrestView) {
				arrestView.hide();
			}
			App.CommonUtil.showTip(LanguageManager.getlocal("atkracedesErrorTip1"));
		}
		else
		{
			let atkraceView = <NewAtkracecrossView>ViewController.getInstance().getView(ViewConst.COMMON.NEWATKRACECROSSVIEW);
			if (atkraceView) {
				atkraceView.refreshServant();
			}

			let rewardPopupView = ViewController.getInstance().getView(ViewConst.POPUP.NEWATKRACECROSSREWARDPOPUPVIEW);
			if (rewardPopupView) {
				rewardPopupView.hide();
			}

			let autoFightPopupView = ViewController.getInstance().getView(ViewConst.POPUP.NEWATKRACECROSSAUTOFIGHTPOPUPVIEW);
			if (autoFightPopupView) {
				autoFightPopupView.hide();
			}

			let buyPopupView = ViewController.getInstance().getView(ViewConst.POPUP.NEWATKRACECROSSBUYPOPUPVIEW);
			if (buyPopupView) {
				buyPopupView.hide();
			}

			let agreePopupDialog = ViewController.getInstance().getView(ViewConst.POPUP.NEWATKRACECROSSAGREEPOPUPDIALOG);
			if (agreePopupDialog) {
				agreePopupDialog.hide();
			}

			let arrestView = ViewController.getInstance().getView(ViewConst.COMMON.NEWATKRACECROSSARRESTVIEW);
			if (arrestView) {
				arrestView.hide();
			}
			App.CommonUtil.showTip(LanguageManager.getlocal("atkracedesErrorTip2"));
		}


	}

	public dispose():void
	{
		this.zonerankinfos = null;
		this.isCanJoin = false;
		this.revengeIdx = 0;
		this.newcrossCode = null;
		this._fameMapInfo = [];

		super.dispose();
	}
}