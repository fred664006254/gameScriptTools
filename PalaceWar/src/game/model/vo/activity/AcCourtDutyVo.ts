/**
 * 女优活动4 依生依世
 * author ycg
 * date 2019.10.28
 * @class AcCourtDutyVo
 */
class AcCourtDutyVo extends AcBaseVo{
    public task:any;
    public flags:any;
    public diffday:number;
    public unlock:any;

    public constructor(){
        super();
    }

    public initData(data:any){
        for (let key in data){
            this[key] = data[key];
        }
    }

    public getRechargeNum():number{
        if (this.v){
            return this.v;
        }
        return 0;
    }

    //当前任务完成情况
    public getYaMenTaskCurrNum(id:string|number, type:number){
        if (this.task && this.task[type]){
            return this.task[type];
        }
        return 0;
    }

    //是否领取当前任务
    public isGetYaMenTaskById(day:string|number, id:number|string):boolean{
        let key = "yaMenTask";
        if (this.flags && this.flags[key] && this.flags[key][day] && this.flags[key][day][id]){
            return true;
        }
        return false;
    }

    //当前皇榜任务完成情况
    public getHuangBangTaskCurrNum(id:string|number, type:number){
        if (this.task && this.task[type]){
            return this.task[type];
        }
        return 0;
    }

    //是否领取皇榜当前任务
    public isGetHuangBangTaskById(day:string|number, id:number|string):boolean{
        let key = "huangBangTask";
        if (this.flags && this.flags[key] && this.flags[key][day] && this.flags[key][day][id]){
            return true;
        }
        return false;
    }

    public getCurrDay():number{
        return this.diffday;
    }
    
    // public getYaMenTaskCfgById(id:string|number):any{
    //     let data = this.cfg.getYaMenTaskList();
    //     for (let i = 0; i < data.length; i++){
    //         if (data[i].id == Number(id)){
    //             return data[i];
    //         }
    //     }
    // }

    //衙门cfg
    public getSortYaMenTaskCfg():any{
        let data = this.cfg.getYaMenTaskList();
        let currDay = this.getCurrDay();
        for (let i = 0; i < data.length; i++){
            if (currDay >= Number(data[i].taskId) && this.isGetYaMenTaskById(data[i].taskId, data[i].rKey)){
                data[i].sortId = data.length + Number(data[i].id);
            }
            else{
                let currNum = this.getYaMenTaskCurrNum(data[i].taskId, data[i].questType);
                if (currDay >= Number(data[i].taskId)){
                    if (currNum < data[i].value){
                        data[i].sortId = data[i].id;
                    }
                    else{
                        data[i].sortId = data[i].id - data.length;
                    }
                }
                else{
                    data[i].sortId = 2 * data.length + data[i].id;
                }
            }
        }
        return data.sort((a, b)=>{
            return a.sortId - b.sortId;
        })
    }

    //皇榜cfg
    public getSortHuangBangTaskCfg():any{
        let data = this.cfg.getHuangBangTaskList();
        let currDay = this.getCurrDay();
        for (let i = 0; i < data.length; i++){
            if (currDay >= Number(data[i].taskId) && this.isGetHuangBangTaskById(data[i].taskId, data[i].rKey)){
                data[i].sortId = data.length + Number(data[i].id);
            }
            else{
                let currNum = this.getHuangBangTaskCurrNum(data[i].taskId, data[i].questType);
                if (currDay >= Number(data[i].taskId)){
                    if (currNum < data[i].value){
                        data[i].sortId = data[i].id;
                    }
                    else{
                        data[i].sortId = data[i].id - data.length;
                    }
                }
                else{
                    data[i].sortId = 2 * data.length + data[i].id;
                }
            }
        }
        return data.sort((a, b)=>{
            return a.sortId - b.sortId;
        })
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

    public isShowYaMenTaskRedDot():boolean{
        let currDay = this.getCurrDay();
        let yaMenTask = this.cfg.getYaMenTaskList();
        for (let i = 0; i < yaMenTask.length; i++){
            let taskId = yaMenTask[i].taskId;
            if (currDay >= taskId && !this.isGetYaMenTaskById(taskId, yaMenTask[i].rKey) && this.getYaMenTaskCurrNum(taskId, yaMenTask[i].questType) >= yaMenTask[i].value){
                return true;
            }
        }
        return false;
    }

    public isShowHuangBangTaskRedDot():boolean{
        let currDay = this.getCurrDay();
        let taskList= this.cfg.getHuangBangTaskList();
        for (let i = 0; i < taskList.length; i++){
            let taskId = taskList[i].taskId;
            if (currDay >= taskId && !this.isGetHuangBangTaskById(taskId, taskList[i].rKey) && this.getHuangBangTaskCurrNum(taskId, taskList[i].questType) >= taskList[i].value){
                return true;
            }
        }
        return false;
    }

    //是否已解锁
    public isShowUnlockYaMenRedDot():boolean{
        let isUnlock:boolean = (this.unlock && this.unlock["yaMenTask"] && (this.unlock["yaMenTask"] == 1));
        if (this.cfg.needRecharge1 > 0 && this.cfg.needRecharge1 <= this.getRechargeNum() && (!isUnlock)){
            return true;
        }
        return false;
    }

    //是否已解锁
    public isShowUnlockHuangBangRedDot():boolean{
        let isUnlock:boolean = (this.unlock && this.unlock["huangBangTask"] && (this.unlock["huangBangTask"] == 1));
        if (this.cfg.needRecharge2 > 0 && this.cfg.needRecharge2 <= this.getRechargeNum() && (!isUnlock)){
            return true;
        }
        return false;
    }
    
    public get isShowRedDot():boolean{
        return this.isShowYaMenTaskRedDot() || this.isShowHuangBangTaskRedDot() || this.isShowUnlockYaMenRedDot() || this.isShowUnlockHuangBangRedDot();
    }   

    public get cfg():Config.AcCfg.CourtDutyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    public dispose():void{

        super.dispose();
    }
}