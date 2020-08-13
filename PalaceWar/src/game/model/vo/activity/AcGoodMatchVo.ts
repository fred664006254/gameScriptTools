/**
 * 情系良缘
 * date 2020.7.21
 * author ycg
 * @class AcGoodMatchVo
 */
class AcGoodMatchVo extends AcBaseVo{
    public isfree:number;
    public ainfo:any; //进度
    public zinfo:any;// 全服进度
    public num:number; //道具数量
    public matchtype:number; //奖池类型
    public map:any = null; // 地图数据
    private achRewardId:number; //进度奖励对话id

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

    public getSortAchievementCfg():Config.AcCfg.GoodMatchAchieveItemCfg[]{
        let achieveData = this.cfg.getAchieveList();
        let count = achieveData.length;
        let data:Config.AcCfg.GoodMatchAchieveItemCfg[] = [];
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

    //全服进度相关
    public isGetServerRewardById(id:string|number):boolean{
        if (this.zinfo && this.zinfo.flags && this.zinfo.flags[id]){
            return true;
        }
        return false;
    }

    //全服当前进度
    public getServerProcessNum():number{
        if (this.zinfo && this.zinfo.v){
            return this.zinfo.v;
        }
        return 0;
    }

    public getSortServerAchievementCfg():Config.AcCfg.GoodMatchAchieveItemCfg[]{
        let achieveData = this.cfg.getServerAchieveList();
        let count = achieveData.length;
        let data:Config.AcCfg.GoodMatchAchieveItemCfg[] = [];
        let currNum = this.getServerProcessNum();
        let pCurrNum = this.getProcessNum();
        for (let i = 0; i < count; i++){
            if (this.isGetServerRewardById(achieveData[i].id)){
                achieveData[i].sortId = achieveData[i].id + count;
            }
            else if (currNum >= achieveData[i].needNum2 && pCurrNum >= achieveData[i].needNum1){
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

    public checkServerRewardRed():boolean{
        let currNum = this.getServerProcessNum();
        let pCurrNum = this.getProcessNum();
        let data = this.cfg.getServerAchieveList();
        for (let i=0; i < data.length; i++){
            if (!this.isGetServerRewardById(data[i].id) && currNum >= data[i].needNum2 && pCurrNum >= data[i].needNum1){
                return true;
            }
        }
        return false;
    }

    //奖池id
    public getPoolRewardId():number{
        let currNum = this.getProcessNum();
        let id = this.matchtype;
        if (id == 0){
            if (currNum == 0){
                id = 0;
            }
            else{
                id = 1;
            }
        }
        return id;
    }

    public getMapData():any[]{
        if (this.map){
            return this.map;
        }
        return null;
    }

    //剩余气球数量
    public getCurrBallNum():number{
        let count = 0;
        if (this.map){
            for (let i=0; i < this.map.length; i++){
                if (this.map[i] == 0){
                    count ++;
                }
            }
        }
        else{
            count = 16;
        }
        return count;
    }

    //获取展示对应的数据
    public getShowSkinData():RewardItemVo{
        let data = this.cfg.change;
        let itemVo = GameData.formatRewardItem(data.needItem)[0];
        return itemVo;
    }

    //红点
    public get isShowRedDot():boolean{
        return this.checkAchieveRed() || this.checkServerRewardRed() || this.isCanPlay() || this.checkExchangeRed();
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

    public get cfg():Config.AcCfg.GoodMatchCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    public dispose():void{
        this.achRewardId = null;
        this.isfree = 0;
        this.ainfo = null;
        this.zinfo = null;
        this.map = null;
        this.matchtype = 0;
        super.dispose();
    }
}