/**
 * 朝廷诏令
 * date 2020.3.23
 * author ycg
 */
class AcChaoTingVo extends AcBaseVo{
    //任务
    public task:any; 
    //充值
    public rinfo:any;
    //任务解锁
    public unlock:any;

    public constructor(){
        super();
    }

    public initData(data:any):void{
        for (let key in data){
            this[key] = data[key];
        }
    }

    //当前道具数量
    public getToolNum():number{
        if (this.v){
            return this.v;
        }
        return 0;
    }

    //充值元宝数
    public getRechargeNum():number{
        if (this.rinfo && this.rinfo.v){
            return this.rinfo.v;
        }
        return 0;
    }

    //是否领取充值奖励
    public isGetRechargeById(id:string|number):boolean{
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]){
            return true;
        }
        return false;
    }

    //充值奖励红点
    public checkRechargeRedDot():boolean{
        let data = this.cfg.getRechargeCfg();
        let currNum = this.getRechargeNum();
        for (let i = 0; i < data.length; i++){
            if (!this.isGetRechargeById(data[i].id) && currNum >= data[i].needGem){
                return true;
            }
        }
        return false;
    }

    //充值奖励 排序
    public getSortRechargeCfg():any[]{
        let rechargeCfg = this.cfg.getRechargeCfg();
        let currNum = this.getRechargeNum();
        let listCfg:any [] = [];
        for (let i = 0; i < rechargeCfg.length; i++){
            if (this.isGetRechargeById(rechargeCfg[i].id)){
                rechargeCfg[i].sortId = rechargeCfg[i].id + rechargeCfg.length;
            }
            else if (currNum >= rechargeCfg[i].needGem){
                rechargeCfg[i].sortId = rechargeCfg[i].id - rechargeCfg.length;
            }
            else{
                rechargeCfg[i].sortId = rechargeCfg[i].id;
            }
            if (rechargeCfg[i].display < 0 || rechargeCfg[i].display + 1 > rechargeCfg.length){
                listCfg.push(rechargeCfg[i]);
            }
            else{
                let index = rechargeCfg[i].display;
                if (currNum >= rechargeCfg[index].needGem){
                    listCfg.push(rechargeCfg[i]);
                }
            }
            
        }
        listCfg.sort((a, b)=>{
            return a.sortId - b.sortId;
        })
        return listCfg;
    }


    //是否已解锁任务
    public isUnlockTask():boolean{
        return this.unlock && this.unlock.unlock;
    }

    //是否已领取任务奖励
    public isGetTaskRewardById(id:string|number):boolean{
        return this.task && this.task.flags && this.task.flags[id];
    }

    //任务完成数量
    public getTaskNum(questType:number|string):number{
        return (this.task && this.task.v && this.task.v[questType]) ? this.task.v[questType] : 0;
    }

    //任务列表
    public getSortTaskCfg():any[]{
        let taskCfg = this.cfg.getTaskCfg();
        for (let i=0; i < taskCfg.length; i++){
            if (this.isGetTaskRewardById(taskCfg[i].id)){
                taskCfg[i].sortId = taskCfg[i].id + taskCfg.length;
            }
            else{
                if (taskCfg[i].value <= this.getTaskNum(taskCfg[i].questType)){
                    taskCfg[i].sortId = taskCfg[i].id - taskCfg.length;
                }
                else{
                    taskCfg[i].sortId = taskCfg[i].id;
                }
            }
        }
        return taskCfg.sort((a, b)=>{
            return a.sortId - b.sortId;
        })
    }

    //任务红点
    public checkTaskRedDot():boolean{
        if (!this.isUnlockTask()){
            return this.firstInRed();
        }
        let taskCfg = this.cfg.getTaskCfg();
        for (let i=0; i < taskCfg.length; i++){
            if (!this.isGetTaskRewardById(taskCfg[i].id) && taskCfg[i].value <= this.getTaskNum(taskCfg[i].questType)){
                return true;
            }
        }
        return false;
    }

    //解锁红点
    public checkUnlockRed():boolean{
        if (this.getRechargeNum() >= this.cfg.recharge1 && (!this.isUnlockTask())){
            return true;
        }
        return false;
    }

    //首次进入红点
    public firstInRed():boolean{
        let key = "firstin"+Api.playerVoApi.getPlayerID()+this.aidAndCode+this.et;
        let value = LocalStorageManager.get(key);
        if (!value || value == ""){
            return true;
        }
        return false;
    }

    public get isShowRedDot():boolean
	{
		return this.checkRechargeRedDot() || this.checkTaskRedDot() || this.checkUnlockRed();
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

    public get cfg():Config.AcCfg.ChaoTingCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    public dispose():void{
        super.dispose();
    }
}