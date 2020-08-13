/**
 * 东郊狩猎
 * author yangchengguo
 * date 2019.8.5
 * @class AcHuntingVo
 */
class AcHuntingVo extends AcBaseVo{
    /**每日免费次数 */
    private isfree:number;
    // private v:number;
    /**当前伤害 */
    private damage:number;
    /**当前boss id */
    private lv:number;
    /**充值信息*/
    private rinfo:any; //{v:, flags:{}}
    /**进度奖励领取情况 */
    private rewards:any;

    public constructor() {
		super();
    }
    
    public initData(data:any):void{
        for (let key in data){
            this[key] = data[key];
        }
        if (data.lv){
            this.lv = data.lv;
        }
        if (data.damage){
            this.damage = data.damage;
        }
    }

    //boss id
    public getBossId():number{
        return this.lv;
    }

    //boss血量
    public getBossTotalBloodById(id:number|string):number{
        let list = this.cfg.getAchievementList();
        for (let i=0; i < list.length; i++){
            if (Number(id) == Number(list[i].id)){
                return list[i].npcHp;   
            }
        }
        return 0;
    }

    //获取剩余血量
    public getBossRemainBloodById(id:string|number):number{
        if (this.lv > Number(id)){
            return 0;
        }
        else if (this.lv == Number(id)){
            return this.getBossTotalBloodById(id) - this.damage;
        }
        else{
            return this.getBossTotalBloodById(id);
        }
    }

    //当前伤害值
    public getDamage():number{
        return this.damage;
    }

    //是否免费
    public isFree():boolean{
        if (this.isfree > 0){
            return true;
        }
        return false;
    }

    /**获取箭的数量 */
    public getArrowNum():number{
        let num = 0;
        if (this.v){
            num = this.v;
        }
        return num;
    }

    //获取攻击位置的单次伤害值
    public getSingleDamageByHitPos(hitPos:number):number{
        let attack = this.cfg.attack;
        return this.cfg.multiple[hitPos] * attack;
    }

    public isLastBoss():boolean{
        if (this.lv == this.cfg.getAchievementList().length + 1){
            return true;
        }
        return false;
    }

    public isDead(currDamage:number):boolean{
        if (this.isLastBoss()){
            return false;
        }
        if (this.damage + currDamage >= this.getBossTotalBloodById(this.lv)){
            return true;
        }
        return false;
    }

    //获取累积充值数目
	public getChargeNum(): number {
		let num = 0;
		if (this.rinfo && this.rinfo.v) {
			num = this.rinfo.v;
		}
		return num;
    }
    
    //累积充值领取判断
	public isGetRechargeById(id: number): boolean {
		if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]) {
			return true;
		}
		return false;
    }
    
    //进度奖励判断
    public isGetKillRewardById(id:number):boolean{
        if (this.rewards && this.rewards[id]){
            return true;
        }
        return false;
    }

	//倒计时
	public getCountDown():string {
		let et = this.et - this.cfg.extraTime * 86400;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    }

    //活动日期时间显示
    public get acTimeAndHour(): string {
		let et = this.et - 86400 * this.cfg.extraTime;
		return App.DateUtil.getOpenLocalTime(this.st, et, true);
	}

    //是否在活动期间
	public isInActivity(): boolean {
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400* this.cfg.extraTime;
    }

    //是否展示第一次进入面板
    public isShowFirstInView():boolean{
        let key = ""+ this.aid + this.code + Api.playerVoApi.getPlayerID();
        let value = LocalStorageManager.get(key);
        if (value){
            if (Number(value) == this.et){
                return false;
            }
            else{
                LocalStorageManager.set(key, String(this.et));
                return true;
            }
        }
        else{
            LocalStorageManager.set(key, String(this.et));
            return true;
        }
    }

    public get isShowRedDot():boolean{
        if (this.isShowChargeRewardRedDot() || this.isShowKillRewardRedDot() || this.isCanPlayRedDot() || this.isShowQingyuanRedDot()){
            return true;
        }
        return false;
    }

    //是否有情缘红点
    public isShowQingyuanRedDot():boolean{
        if ((this.code == 3 || this.code == 4) && Api.switchVoApi.checkOpenOfficialCareer() && Api.switchVoApi.checkOpenQingYuanHuiJuan() && Api.switchVoApi.checkOpenQingYuan("winterIsComing")) {
            if (Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv()) {
                if (Api.encounterVoApi.isShowNpc()){
                    return true;
                }
            }
        }
        return false;
    }

    //是否显示充值奖励红点
    public isShowChargeRewardRedDot():boolean{
        let rechargeData = this.cfg.getRechargeList();
        for (let i = 0; i < rechargeData.length; i++) {
            if (this.isGetRechargeById(rechargeData[i].id) == false && this.getChargeNum() >= rechargeData[i].needGem){
                return true;
            }
        }
        return false;
    }

    //是否显示进度奖励红点
    public isShowKillRewardRedDot():boolean{
        let data = this.cfg.getAchievementList();
        for (let i = 0; i < data.length; i++) {
            if (this.isGetKillRewardById(data[i].id) == false && this.lv > data[i].id){
                return true;
            }
        }
        return false;
    }

    //有箭可用的时候显示小红点
    public isCanPlayRedDot():boolean{
        if (this.isInActivity() && (this.isfree > 0 || this.getArrowNum() > 0)){
            return true;
        }
        return false;
    }

    //获得充值奖励的配置
	public getSortRechargeCfg():Config.AcCfg.HuntingRecharageItem[] {
		let rechargeData = this.cfg.getRechargeList();
		for (let i = 0; i < rechargeData.length; i++) {
			if (this.isGetRechargeById(rechargeData[i].id)) {
				rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
			}
			else if (this.getChargeNum() >= rechargeData[i].needGem) {
				rechargeData[i].sortId = (Number(rechargeData[i].id)) - rechargeData.length - 1;
			}
			else {
				rechargeData[i].sortId = Number(rechargeData[i].id);
			}
        }
        rechargeData.sort((a, b) => { return a.sortId - b.sortId });
		return rechargeData;
    }
    
    //击杀排序
    public getSortAchievementCfg():Config.AcCfg.HuntingAchievementItem[]{
        let achievementData = this.cfg.getAchievementList();
        for (let i = 0; i < achievementData.length; i++){
            if (this.isGetKillRewardById(achievementData[i].id)){
                achievementData[i].sortId = achievementData.length + Number(achievementData[i].id);
            }
            else if (this.lv > achievementData[i].id){
                achievementData[i].sortId = (Number(achievementData[i].id)) - achievementData.length - 1;
            }
            else{
                achievementData[i].sortId = Number(achievementData[i].id);
            }
        }
        achievementData.sort((a, b) => { return a.sortId - b.sortId });
		return achievementData;
    }

    //获取获得皮肤所需要的元宝
    public getSkinNeedGem():number{
        let rechargeData = this.cfg.getRechargeList();
        for (let i = 0; i < rechargeData.length; i++){
            let rewards = rechargeData[i].getReward.split("|");
            for (let key in rewards){
                let id = rewards[key].split("_")[1];
                if (id == "2323"){
                    return rechargeData[i].needGem;
                }
            }
        }
        return 0;
    }

    //获取箭移动轨迹时间
    public getArrowMoveTime(posArr:any[]):number[]{
        let timeArr:number[] = [];
        for (let i = 0; i < posArr.length; i++){
            let currPos = posArr[i];
            let nextPos = posArr[i + 1];
            if (!nextPos){
                nextPos = posArr[0];
            }
            let time = Math.sqrt((nextPos.x - currPos.x) * (nextPos.x - currPos.x) + (nextPos.y - currPos.y) * (nextPos.y - currPos.y)) * 10;
            timeArr[i] = time;
        }
        return timeArr;
    }

    //配置
    public get cfg(){
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    } 
}