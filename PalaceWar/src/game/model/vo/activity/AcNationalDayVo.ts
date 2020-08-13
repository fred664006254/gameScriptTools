/**
 * 国庆活动
 * date 2019.9.9
 * author yangchengguo
 * @class AcNationalDayVo
 */
class AcNationalDayVo extends AcBaseVo{
    //充值钱数
    public crackerNum:number;
    public rinfo:any;
    //任务
    public taskinfo:any;
    //第几天
    public diffday:number;

    public constructor(){
        super();
    }

    public initData(data:any):void{
        for (let key in data){
            this[key] = data[key];
        }
    }

    //当前第几天
    public getDay():number{
        return this.diffday;
    }

    /**充值奖励处理 */
    //充值元宝数
    public getChargeNum():number{
        if (this.crackerNum ){
            return this.crackerNum;
        }
        return 0;
    }

    //是否已领取充值奖励
    public isGetRechargeById(id:string):boolean{
        if (this.rinfo && this.rinfo[id]){
            return true;
        }
        return false;
    }

    public getCanRewardItemData():any{
        let data = this.getSortRechargeCfg();
        for (let i = 0; i < data.length; i++){
            let chargeData = data[i].data;
            for (let k = 0; k < chargeData.length; k ++){
                if (!this.isGetRechargeById(chargeData[k].id) && this.crackerNum >= chargeData[k].needItem){
                    return {index: i, chargeIndex: k};
                }
            }
            for (let k = 0; k < chargeData.length; k ++){
                if (!this.isGetRechargeById(chargeData[k].id)){
                    return {index: i, chargeIndex: k};
                }
            }
        }
        return {index: 0, chargeIndex: 0};
    }

    //充值的组奖励是否领取
    public isGetRechargeGroupById(id:string|number):boolean{
        let data = this.cfg.getRechargeList();
        let rechargeData = [];
        for (let i = 0; i < data.length; i++){
            if (data[i].id == Number(id)){
                rechargeData = data[i].data;
                break;
            }
        }
        for (let i = 0; i < rechargeData.length; i++){
            if (!this.isGetRechargeById(rechargeData[i].id)){
                return false;
            }
        }
        return true;
    }

    //获得充值奖励的配置
	public getSortRechargeCfg():any[] {
		let rechargeData = this.cfg.getRechargeList();
		for (let i = 0; i < rechargeData.length; i++) {
			if (this.isGetRechargeGroupById(rechargeData[i].id)) {
				rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
			}
			else {
				rechargeData[i].sortId = Number(rechargeData[i].id);
			}
        }
        rechargeData.sort((a, b) => { return a.sortId - b.sortId });
		return rechargeData;
    }

    //是否显示充值奖励红点
    public isShowChargeRewardRedDot():boolean{
        let rechargeData = this.cfg.getRechargeList();
        for (let i = 0; i < rechargeData.length; i++) {
            let data = rechargeData[i].data;
            for (let k = 0; k < data.length; k++){
                if (this.isGetRechargeById(data[k].id) == false && this.getChargeNum() >= data[k].needItem){
                    return true;
                }
            }
        }
        return false;
    }

    /**任务进度处理 */
    //任务完成数量 需增加当前天数判断
    public getDayTaskData(day:number|string):any{
        if (this.taskinfo && this.taskinfo[day]){
            return this.taskinfo[day];
        } 
        return null;
    }

    //任务完成数量
    public getTaskNumByType(day:number|string, type:number):number{
        let data = this.getDayTaskData(day);
        if (data && data[type]){
            return data[type].v;
        }
        return 0;
    }

    //任务是否已领奖
    public isGetTaskById(day:string|number, type:number|string):boolean{
        let data = this.getDayTaskData(day);
        if (data){
            if (data[type] && data[type].flag && data[type].flag == 2){
                return true;
            }
        }
        return false;
    }

    //任务完成状态 0 未完成  1完成 2已领取
    public getTaskCompleteStatus(day:string|number, type:number|string):number{
        let data = this.getDayTaskData(day);
        if (data){
            if (data[type] && data[type].flag) {
                return data[type].flag;
            }
        }
        return 0;
    }

    //获取某一天是否有奖励可领取
    public isCanGetTaskRewardByDay(day:string|number):boolean{
        let taskData = this.getTaskCfgById(day);
        if (!taskData){
            return false;
        }
        for (let i = 0; i < taskData.length; i++){
            if (this.getTaskCompleteStatus(day, taskData[i].questType) == 1){
                return true;
            }
        }
        return false;
    }

    //任务
    public getTaskCfgById(id:number|string):Config.AcCfg.NationalDayDailyTaskItem[]{
        let data = this.cfg.getDailyTaskList();
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == Number(id)){
                return data[i].data;
            }
        }
        return null;
    }
    
    //是否显示任务奖励红点 
    public isShowTaskRewardRedDot():boolean{
        let dataList = this.cfg.getDailyTaskList(); 
        for (let i = 0; i < dataList.length; i++){
            let taskData = dataList[i].data;
            for (let k = 0; k < taskData.length; k++){
                let status = this.getTaskCompleteStatus(i+1, taskData[k].questType);
                if (status == 1){
                    return true;
                }
            }
        }
        return false;
    }

    //七日奖励进度
    public isCompleteDailyTask(id:string|number):boolean{
        let data = this.cfg.getDailyTaskList();
        let taskData = data[Number(id)-1].data[0];
        let status = this.getTaskCompleteStatus(id, taskData.questType);
        if (status > 0){
            return true;
        }
        return false;
    }

    public isGetSevenReward():boolean{
        if (this.rinfo && this.rinfo.bigPrize && this.rinfo.bigPrize == 1){
            return true;
        }
        return false;
    }

    //是否可领取七日奖励
    public isCanGetSevenReward():boolean{
        for (let i=0; i < 7; i++){
            if (!this.isCompleteDailyTask(i+1)){
                return false;
            }
        }
        return true;
    }

    //是否显示任务红点
    public isShowTaskRedDot():boolean{
        return this.isShowDailyChargeRedDot() || this.isShowTaskRewardRedDot() || (this.isCanGetSevenReward() && !this.isGetSevenReward());
    }
    
    //小红点
    public get isShowRedDot():boolean{
        return this.isShowTaskRedDot() || this.isShowChargeRewardRedDot();
    }

    //是否为第一次进入活动
    public isFirstInView():boolean{
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

    //是否点击过每天的充值任务
    public isClickedDailyCharge():boolean{
        let day = this.getDay();
        if (day > 7){
            return true;
        }
        let key = this.aid + this.code + Api.playerVoApi.getPlayerID()+"day" + this.et + day;
        let value = LocalStorageManager.get(key);
        if (value){
            return true;
        }
        return false;
    }

    //设置每日点击充值任务
    public setClickedDailyCharge():void{
        let day = this.getDay();
        let key = this.aid + this.code + Api.playerVoApi.getPlayerID()+"day"+ this.et + day;
        LocalStorageManager.set(key, String(this.et));
    }

    //是否显示每日充值任务点击红点
    public isShowDailyChargeRedDot():boolean{
        let day = this.getDay();
        let data = this.getTaskCfgById(day);
        if (!data){
            return false;
        }
        if (!this.isInActivity()){
            return false;
        }
        let status = this.getTaskCompleteStatus(day, data[0].questType);
        if (!this.isClickedDailyCharge() && status == 0){
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

    //是否在活动期间 不包括展示期
	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    }
    
    //活动日期时间显示
    public get acTimeAndHour(): string {
		let et = this.et - 86400 * this.cfg.extraTime;
		return App.DateUtil.getOpenLocalTime(this.st, et, true);
	}

    //活动配置
    public get cfg(){
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
}