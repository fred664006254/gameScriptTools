class AcRechargeGiftVo extends AcBaseVo
{
    public num:number = 0;

	public constructor() 
	{
		super();
	}

	public initData(data:any):void{
        for (let key in data){
            this[key] = data[key];
        }
    }

    public getRechargeCfg():Config.RechargeItemCfg{
        let cfg = Config.RechargeCfg.getRechargeItemCfgByKey(this.cfg.needGem);
        if (cfg){
            return cfg;
        }
        return null;
    }

    public get isStart():boolean
	{   
		if((this.st <= GameData.serverTime) && (this.et > GameData.serverTime))
		{
			return true;
		}
		return false;
    }

    public get isShowIcon():boolean
	{
        return this.isCanShow();
    }

    //是否可显示
    public isCanShow():boolean{
        let cfg = this.cfg;
        
        let isHave1 = false;//是否有对应的vip等级限制
        let isNeed1 = false;//是否需要有对应的vip等级限制
        if (cfg && cfg.need1 && this.checkOwnVipLv(cfg.need1)){
            isHave1 = true;
            isNeed1 = true;
        }
        let isHave2 = false;//是否有对应的门客or红颜
        let isNeed2 = false;//是否需要有对应的门客or红颜
        if (cfg && cfg.need2){
            isHave2 = true;
            if (this.isCanNeed2(cfg.need2)){
                isNeed2 = true;
            } 
        }
        //处理红颜和门客
        if (cfg && cfg.switch && cfg.switch[0])
        {   
            let oneswitch:string = cfg.switch[0];
            let array = oneswitch.split("_");
            let onestr:string = array[0];
            if (onestr == "servant" || onestr == "wifeName")
            {
                isHave2 = true;
                isNeed2 = true;
            }
        }

        if (isHave1){
            if (isHave2){
                if (isNeed1 && isNeed2 && this.checkHaveBuyNum()){
                    return true;
                }
            }
            else{
                if (isNeed1 && this.checkHaveBuyNum()){
                    return true;
                }
            }  
        }
        else{
            if (isHave2 && isNeed2 && this.checkHaveBuyNum()){
                return true;
            }
        }
        return false;
    }

    private isCanNeed2(need:string):boolean{
        let itemVoList = GameData.formatRewardItem(need);
        for (let i=0; i < itemVoList.length; i++){
            // 门客
            if (itemVoList[i].type == 8){
                if (!this.checkOwnServantById(itemVoList[i].id)){
                    return false;
                }
            }
            //红颜
            else if (itemVoList[i].type == 10){
                if (!this.checkOwnWifeById(itemVoList[i].id)){
                    return false;
                }
            }
        }
        return true;
    }

    //是否达到vip等级
    private checkOwnVipLv(needLv:number):boolean{
        let pViplv = Api.playerVoApi.getPlayerVipLevel();
        if (pViplv >= needLv){
            return true;
        }
        return false;
    }
    
    //是否有这个红颜
    public checkOwnWifeById(id:number):boolean{
        if (Api.wifeVoApi.getWifeInfoVoById(id)){
            return true;
        }
        return false;
    }

    //是否有红颜皮肤
    public checkIsHasWifeSkin(skinId:any):boolean{
        return Api.wifeSkinVoApi.isOwnSkinOfSkinId(skinId);
    }

    //是否有这个门客
    public checkOwnServantById(id:number|string):boolean{
        if (Api.servantVoApi.getServantObj(String(id)) != null){
            return true;
        }
        return false;
    }

    //是否有门客皮肤
    public checkIsHasServantSkin(skinId:any):boolean{
        return Api.servantVoApi.isOwnSkinOfSkinId(String(skinId));
    }

    //是否有购买次数
    public checkHaveBuyNum():boolean{
        if (this.cfg && this.cfg.maxNum > this.num){
            return true;
        }
        return false;
    }

    //倒计时
    public getCountDown():string{
        let et = this.et;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    }

    public isInActivity():boolean{
		return (GameData.serverTime >= this.st) && (GameData.serverTime < this.et);
	}

    public get cfg(){
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    public dispose():void{

        super.dispose();
    }

}