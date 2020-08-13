class AcWifeComeVo extends AcBaseVo
{
    //充值的数值
    public v: number;
    //是否已经领取
    public get: number;
    
    public constructor()
    {
        super();
    }

    public initData(data: any): void
    {

        let oldV = this.v;
        let oldGet = this.get;
        
        for(let key in data)
        {
            this[key] = data[key];
        }
        if (this.code == 3) {
            if (this.get == 2) {
                Api.acVoApi.setActiveUnlock(1);
            }
        }
        else {
            if (this.get == 1) {
                Api.acVoApi.setActiveUnlock(1);
            }
        }

        if(oldV != this.v || oldGet != this.get)
        {
            
            //状态发生变化
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACWIFECOME_VOCHANGE);

        }
        App.LogUtil.log("wifecomevo 1 "+this.get);
    }

    //倒计时
    public getCountDown():string{
        let acCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);
        let et = this.et;
        if (acCfg.extraTime){
            et = this.et - acCfg.extraTime * 86400;
        }
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    }

    public get isShowRedDot(): boolean
    {
        let acVo:any = Api.acVoApi.getActivityVoByAidAndCode(this.aid,String(this.code));
        let acCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);
        if(!acCfg)
        {
            return false;
        }
        if (acVo.get == 0 && acVo.v >= acCfg.need){
            return true;
        } else {
            return false;
        }

    }

 	/**重写
	 * 是否在活动开始期间，true：在期间，false:已结束或者未开始
	 */
	public get isStart():boolean
	{   
		if((this.st <= GameData.serverTime) && (this.et > GameData.serverTime) && !this.isNotCanStart())
		{
			return true;
		}
		return false;
    }
    
    private isNotCanStart():boolean{
        return this.checkOwnWife() || this.checkIsHasScene() || this.checkIsHasWifeSkin();
    }

    private checkOwnWife():boolean{
        let acCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);
        if(acCfg && acCfg.wifeId && Api.wifeVoApi.getWifeInfoVoById(Number(acCfg.wifeId)))
        {
            return true;
        } else {
            return false;
        }
    }

    private checkIsHasScene():boolean{
        let acCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);
        if (acCfg && acCfg.sceneID){
            if (Api.otherInfoVoApi.isHasScene(acCfg.sceneID, "homeScene") || Api.otherInfoVoApi.isHasSceneUnlock(acCfg.sceneID, "homeScene")){
                return true;
            }
        }
        return false;
    }

    private checkIsHasWifeSkin():boolean{
        let acCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);
        if (acCfg && acCfg.wifeSkinID){
            return Api.wifeSkinVoApi.isOwnSkinOfSkinId(acCfg.wifeSkinID);
        }
        return false;
    }

    public get isShowIcon():boolean
	{
		return !this.isNotCanStart();
	}

    public dispose(): void
    {
        this.v = 0;
        this.get = 0;
    }


}