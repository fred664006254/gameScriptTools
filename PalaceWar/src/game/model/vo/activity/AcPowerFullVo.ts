/**
 * 权倾朝野
 * date 2020.7.14
 * author ycg
 * @class AcPowerFullVo
 */
class AcPowerFullVo extends AcBaseVo{
    public isfree:number;
    public ainfo:any; //进度
    public num:number; //道具数量
    public slimit:number;//特殊道具抽取次数
    public claim:any;//商店兑换
    private achRewardId:number; //当前领取进度id
    public plotinfo:any; //获得衣装对话信息

    public constructor(){
        super();
    }

    public initData(data:any):void{
        for (let key in data){
            this[key] = data[key];
        }
    }

    public setAchRewardId(id:number){
        this.achRewardId = id;
    }

    public getAchRewardId():number{
        return this.achRewardId;
    }

    //是否免费
    public isFree():boolean{
        if (this.isfree > 0){
            return true;
        }
        return false;
    }

    //道具数量
    public getToolNum():number{
        if (this.num){
            return this.num;
        }
        return 0;
    }

    //充值数量
    public getRechargeNum():number{
        if (this.v){
            return this.v;
        }
        return 0;
    }

    //特殊奖励数量
    public getSpecailNum():number{
        if (this.slimit){
            return this.slimit;
        }
        return 0;
    }

    public getNeedRecharge():number{
        let currNum = this.getRechargeNum();
        let num = this.cfg.needGem - currNum % this.cfg.needGem;
        return num;
    }

    /**当前进度 */
    public getProcessNum():number{
        if (this.ainfo && this.ainfo.v){
            return this.ainfo.v;
        }
        return 0;
    }

    /**当前进度奖励是否领取 */
    public isGetAchieveRewardById(id:string|number):boolean{
        if (this.ainfo && this.ainfo.flags && this.ainfo.flags[id]){
            return true;
        }
        return false;
    }

    public getSortAchievementCfg():Config.AcCfg.PowerFullAchieveItemCfg[]{
        let achieveData = this.cfg.getAchieveList();
        let count = achieveData.length;
        let data:Config.AcCfg.PowerFullAchieveItemCfg[] = [];
        let currNum = this.getProcessNum();
        for (let i = 0; i < count; i++){
            if (this.isGetAchieveRewardById(achieveData[i].id)){
                achieveData[i].sortId = achieveData[i].id + count;
            }
            else if (currNum >= achieveData[i].needNum){
                achieveData[i].sortId = achieveData[i].id - count;
            }
            else{
                achieveData[i].sortId = achieveData[i].id;
            }
            data.push(achieveData[i]);
        }
        data.sort((a, b)=>{
            return a.sortId - b.sortId;
        })
        return data;
    }

    //获取当前最大进度
    public getCurrMaxProNum():number{
        let data = this.cfg.getAchieveList();
        return data[data.length - 1].needNum;
    }

    //可领奖励id
    public getAchieveRewardId():number{
        let data = this.cfg.getAchieveList();
        let currNum = this.getProcessNum();
        for (let i=0; i < data.length; i++){
            if (!this.isGetAchieveRewardById(data[i].id)){
                if (currNum >= data[i].needNum){
                    return data[i].id;
                }
            }
        }
        return 0;
    }

    //当前到哪个进度
    public getCurProcessIndex():number{
        let data = this.cfg.getAchieveList();
        let currNum = this.getProcessNum();
        for (let i=0; i < data.length; i++){
            if (currNum < data[i].needNum){
                return i;
            } 
        }
        if (currNum >= this.getCurrMaxProNum()){
            return data.length - 1;
        }
        return 0;
    }

    //商店购买次数
    public getShopBuyNum(id:string|number):number{
        if (this.claim && this.claim[id]){
            return this.claim[id];
        }
        return 0;
    }

    //获取展示对应的数据
    public getShowSkinData():RewardItemVo{
        let data = this.cfg.change;
        let itemVo = GameData.formatRewardItem(data.needItem)[0];
        return itemVo;
    }

    //红点
    public get isShowRedDot():boolean{
        return this.checkAchieveRed() || this.isCanPlay() || this.checkExchangeRed();
    }

    //是否有可领取进度奖励
    public checkAchieveRed():boolean{
        let data = this.cfg.getAchieveList();
        let currNum = this.getProcessNum();
        for (let i=0; i < data.length; i++){
            if (!this.isGetAchieveRewardById(data[i].id)){
                if (currNum >= data[i].needNum){
                    return true;
                }
            }
        }
        return false;
    }

    //是否可以兑换
    public checkExchangeRed():boolean{
        let str = this.cfg.change.needItem;
        let itemVo = GameData.formatRewardItem(str)[0];
        let itemData = Api.itemVoApi.getItemInfoVoById(itemVo.id);
        let currNum = 0;
        if (itemData){
            currNum = itemData.num;
        }
        if (currNum >= itemVo.num){
            return true;
        }
        return false;
    }

    //是否有次数
    public isCanPlay():boolean{
        if (this.isInActivity() && (this.isFree() || this.getToolNum() > 0)){
            return true;
        }
        return false;
    }

    //当前衣装获取数量
    public getHasSkinNum():number{
        // let servantInfoVo = Api.servantVoApi.getServantObj("2004");
        // if (servantInfoVo){
        //     return servantInfoVo.getSkinNums();
        // }
        // this.getHasSkinId();
        // let count = 0;
        // let skinIdArr = ["20041", "20042"]
        // for (let i=0; i < skinIdArr.length; i++){
        //     if (Api.servantVoApi.isOwnSkinOfSkinId(skinIdArr[i])){
        //         count +=1;
        //     }
        // }
        // return 0;
        let data = this.getHasSkinId();
        return data.length;
    }

    public getHasSkinId():any[]{
        let data:string[] = [];
        let servantInfoVo:ServantInfoVo = Api.servantVoApi.getServantObj("2004");
        if (servantInfoVo){
            let skinInfo = servantInfoVo.getOwnSkinIdList();
            if (skinInfo){
                for (let i=0; i < skinInfo.length; i++){
                    if (skinInfo[i] != String(this.cfg.show)){
                        data.push(skinInfo[i]);
                    }
                }
            }
        }
        if (data.length > 1){
            data.sort((a, b)=>{return Number(a) - Number(b)});
        }
        return data;
    }

    //衣装对话
    public getShowSkinDialogId():number{
        let skinNum = this.getHasSkinNum() + 1;
        if (skinNum > 3){
            skinNum = 3;
        }
        if (this.plotinfo && this.plotinfo[skinNum]){
            return 0;
        }
        return skinNum;
    }

    //倒计时
    public getCountDown():string{
        let et = this.et - this.cfg.extraTime * 86400;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    }

    public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
	}

    //活动日期时间显示
    public get acTimeAndHour(): string {
		let et = this.et - 86400 * this.cfg.extraTime;
		return App.DateUtil.getOpenLocalTime(this.st, et, true);
	}

    public get cfg():Config.AcCfg.PowerFullCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    public dispose():void{
        this.achRewardId = null;
        
        super.dispose();
    }
}