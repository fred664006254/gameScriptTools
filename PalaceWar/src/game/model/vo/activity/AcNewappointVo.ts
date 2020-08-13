/**
 * 新服庆典
 * date 2020.6.30
 * author ycg
 * @class AcNewappointVo
 */
class AcNewappointVo extends AcBaseVo{
    public task:any; //礼包进度
    public claim:any;//兑换
    public diffday:number;//登录天数
    public isjoin:number;//是否参与预约
    public score:number;//积分

    public constructor(){
        super();
    }

    public initData(data:any):void{
        for (let key in data){
            this[key] = data[key];
        }
    }

    public isJoin():boolean{
        if (this.isjoin){
            return true;
        }
        return false;
    }

    public get isShowIcon():boolean
	{
		return this.isJoin();
	}

    /**礼包当前进度 */
    public getGiftProcess():number{
        if (this.diffday){
            return this.diffday;
        }
        return 0;
    }

    /**礼包进度奖励是否领取 */
    public isGetGiftReward(id:string|number):boolean{
        if (this.task && this.task[id]){
            return true;
        }
        return false;
    }

    //是否有礼包奖励
    public checkGiftRed():boolean{
        let data = this.cfg.getGiftListCfg();
        for (let i=0; i < data.length; i++){
            if (!this.isGetGiftReward(data[i].id)){
                if (this.getGiftProcess() >= data[i].needDay){
                    return true;
                }
            }
        }
        return false;
    }

    public getGiftRewardIndex():number{
        let data = this.cfg.getGiftListCfg();
        for (let i=0; i < data.length; i++){
            if (!this.isGetGiftReward(data[i].id)){
                if (this.getGiftProcess() >= data[i].needDay){
                    return i;
                }
            }
        }
        return 0;
    }

    //当前积分
    public getScore():number{
        if (this.score){
            return this.score;
        }
        return 0;
    }

    //积分兑换
    public getExchangeNum(id:string|number):number{
        if (this.claim && this.claim[id]){
            return this.claim[id];
        }
        return 0;
    }

    //兑换红点
    public checkExchangeRed():boolean{
        let data = this.cfg.getShopListCfg();
        let currScore = this.getScore();
        for (let i=0; i < data.length; i++){
            if (data[i].limitTime - this.getExchangeNum(data[i].id) > 0 && currScore >= data[i].costScore){
                return true;
            }
        }
        return false;
    }

    //红点
    public get isShowRedDot():boolean{
        return this.checkGiftRed() || this.checkExchangeRed();
    }

    //倒计时
    public getCountDown():string{
        let et = this.et;
        if (this.cfg.extraTime){
            et = this.et - this.cfg.extraTime * 86400;
        }
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 17);
    }

    public isInActivity():boolean{
        let et = this.et;
        if (this.cfg.extraTime){
            et = this.et - this.cfg.extraTime * 86400;
        }
		return GameData.serverTime >= this.st && GameData.serverTime < et;
	}

    public get cfg():Config.AcCfg.NewappointCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
}