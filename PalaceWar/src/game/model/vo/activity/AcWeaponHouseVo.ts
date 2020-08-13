/**
 * 神兵宝库
 * date 2020.6.10
 * author yangtao
 * @class AcWeaponHouseVo
 */
class AcWeaponHouseVo extends AcBaseVo{
    //public isfree:number;//免费次数
    public v:number;//可用次数
    public ainfo:any; //个人进度
    public zinfo:any; //全服进度
    public num:number;//道具数量
    public map:number[][];//map数组
    private rinfo:any = null;//充值
    private buynum:number;
    public nowscore:number;
    public step:number; 
    public refresh:any;
    private refreshNum = -1;

    public constructor(){
        super();
    }

    public initData(data:any):void{
        for (let key in data){
            this[key] = data[key];
        }
    }
    // public isAddPhy()
    // {
    //     this.refresh.num++;
    //     this.refresh.st = GameData.serverTime;
    // }
    //倒计时
    public getDuTime():string
    {
        if(this.refresh.st == 0)
        {
            return App.DateUtil.getFormatBySecond(this.cfg.addTime, 1);
        }
        let time = this.cfg.addTime - (GameData.serverTime - this.refresh.st)%this.cfg.addTime;
        // if(time <= 0)
        // {
        //     time = 0;
        //     this.isAddPhy();
        // }
        if(this.refresh)
        {
            this.refreshNum = this.refresh.num + Math.floor((GameData.serverTime - this.refresh.st)/this.cfg.addTime);
            this.refreshNum = this.refreshNum>this.cfg.baseTime ? this.cfg.baseTime : this.refreshNum;
        }
        return App.DateUtil.getFormatBySecond(time, 1);
    }
    //获取恢复次数
    public rePhy():number
    {
        if(this.refresh)
        {
            if(this.refresh.num == 0&&this.refresh.st == 0)
            {
                return Number(this.cfg.baseTime - this.refresh.num);
            }else{
                this.refreshNum = this.refresh.num + Math.floor((GameData.serverTime - this.refresh.st)/this.cfg.addTime);
                this.refreshNum = this.refreshNum>this.cfg.baseTime ? this.cfg.baseTime : this.refreshNum;
                return Number(this.refreshNum);
            }
        }
        
        return 0;
    }

    //是否有次数
    public isFree():boolean{
        if ((this.v + this.rePhy()) > 0){
            return true;
        }
        return false;
    }
    //获得可用次数
    public getRechargeNum():string{
        if ((this.v + this.rePhy())> 0){
            return ((this.v + this.rePhy()) + "/1");
        }
        return "0/1";
    }
    public getRechargeNums():number{
        if ((this.v + this.rePhy()) > 0){
            return (this.v + this.rePhy());
        }
        return 0;
    }
    public getScoreNum():number
    {
        let num = 0
        if(this.ainfo[1] && this.ainfo[1].v){
            num = this.ainfo[1].v;
		}
        return num;
    }

    public shouGoldNum():number
    {
        let num:number;
        if(this.buynum>=this.cfg.costMoney.length)
        {
            num = this.cfg.costMoney[this.cfg.costMoney.length-1]
        }else{
            num = this.cfg.costMoney[this.buynum]
        }

        return num;
    }
    //选择购买十次
    public showGoldNumTen():number
    {
        let num:number = 0;
        if(this.buynum>=this.cfg.costMoney.length)
        {
            num = this.cfg.costMoney[this.cfg.costMoney.length-1]*10;
        }else{
            for(let index:number = this.buynum;index<(this.cfg.costMoney.length-1);index++)
            {
                num += this.cfg.costMoney[index];
            }
            num += ((10-(this.cfg.costMoney.length-1-this.buynum))*this.cfg.costMoney[this.cfg.costMoney.length-1]);
        }

        return num;
    }

    //获取累积充值数目
	public getChargeNum():number{
		let num = 0;
		if(this.rinfo && this.rinfo.v){
			num = this.rinfo.v;
		}
		return num;
	}
    //获取完成数目
	public getNeedNum(id1,id2):number{
		let num = 0;
		if(this.rinfo && this.rinfo.v){
			num = this.rinfo.v;
		}
		return num;
	}

	/*累积充值领取判断*/
	public isGetRecharge(id:string):boolean
	{	
		if(this.rinfo&&this.rinfo.flags && this.rinfo.flags[id])
		{
			return true; 
		}
		return false;
	}

    // public getNeedMoney():number{
    //     let rechargeData = this.cfg.getRechargeList();
    //     if (rechargeData && rechargeData.length > 0){
    //         for (let i=0; i < rechargeData.length; i++){
    //             let rewards = rechargeData[i].getReward.split("|");
    //             for (let key in rewards){
    //                 let id = rewards[key].split("_")[1];
	// 				let itemCfg = Config.ItemCfg.getItemCfgById(id);
	// 				if(itemCfg)
	// 				{
	// 					if(itemCfg.getRewards && itemCfg.getRewards.split("_")[1] && itemCfg.getRewards.split("_")[1] == String(this.cfg.show))
	// 					{
	// 						return rechargeData[i].needGem;
	// 					}
	// 				}
    //             }
    //         }
    //     }
    //     return 0;
    // }	
    //获得充值奖励的配置
	public getSortRechargeCfg():Config.AcCfg.RechargeListItem[] 
	{
		let rechargeData = this.cfg.getRechargeList();
		for (let i = 0; i < rechargeData.length; i++) {
			if (this.isGetRecharge(String(rechargeData[i].id))) {
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

    //获取全服任务完成次数
	public getTask(id1,id2):number{
		let num = 0;
		if(this.zinfo[id1] && this.zinfo[id1][id2] && this.zinfo[id1][id2].num){
			num = this.zinfo[id1][id2].num;
		}
		return num;
	} 

     //获取个人任务完成次数
	public getOneTask(id1):number{
		let num = 0;
		if(this.ainfo[id1] && this.ainfo[id1].v){
            num = this.ainfo[id1].v;
		}
		return num;
	} 

    /*任务奖励是否领取*/
	public isGetTaskReward(id1,id2):boolean{
		let flag = false;
		if(this.zinfo[id1] && this.zinfo[id1][id2]){
			flag = this.zinfo[id1][id2].flag == 1;
		}
		return flag;
	} 

    /*个人任务当前进度*/
	public GeOnetTaskReward(id1,id2):boolean{
		let flag = false;
        if(this.ainfo[id1] && (this.ainfo[id1].stage == id2)){
			//flag = this.ainfo[id1].f == 1;
            flag = true;
		}
		return flag;
	} 
    /*个人任务奖励是否领取*/
	public isGeOnetTaskReward(id1,id2):boolean{
		let flag = false;
        if(this.ainfo[id1] && (this.ainfo[id1].stage == id2)){
			flag = this.ainfo[id1].f == 1;
		}
		return flag;
	} 

    //充值奖励红点
	public isShowRechargeDot():boolean
    {
		let curNum = this.getChargeNum();
        let data = this.cfg.getRechargeList();
        for (let i=0; i < data.length; i++)
		{
            if (!this.isGetRecharge(String(data[i].id)))
			{
                if (curNum >= data[i].needGem)
				{
                    return true;
                }
            }
        }
        return false;
    }

    //全服奖励红点
	public getAllRedhot():boolean
    {
		let cfg = this.cfg;
		if(!cfg)
		{
			return false;
		}
		let task = this.cfg.scheduleAll;
		for(let i in task){
			let unit = task[i];
			let id = Number(i);
			for(let k in unit){
				let isget = this.isGetTaskReward(id,Number(k)-1);
				let taskNum = this.getTask(id,Number(k)-1);
				let onecfg = unit[k];
                if(onecfg.needNum)
                {
                    if (taskNum<onecfg.needNum)
                    {
                        break;
                    }
                    if (!isget && taskNum>=onecfg.needNum)
                    {
                        return true;
                    }
                }else{
                    if (taskNum<onecfg.value2)
                    {
                        break;
                    }
                    if (!isget && taskNum>=onecfg.value2)
                    {
                        return true;
                    }
                }
				
			}
		}
		return false;
    }

     //个人奖励红点
	public isShowOneDot():boolean
    {
        if(this.ainfo)
        {
            let task = this.ainfo;
            for(let i in task)
            {
                if(task[i].f == 1)
                {
                    return true;
                }
            } 
        }
        return false;
    }

    //图标红点
    public getRedPoint():boolean
    {
        if(this.isShowOneDot()||this.getAllRedhot()||this.isShowRechargeDot())
        {
            return true;
        }
        return false;
    }


    public getMapData():number[][]
    {
        return this.map;
    }
    // public getNeedRecharge():number{
    //     let num = this.getRechargeNums();
    //     let needNum = this.cfg.needGem - num % this.cfg.needGem;
    //     return needNum;
    // }

    //道具数量
    public getToolNum():number{
        if (this.num){
            return this.num;
        }
        return 0;
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

    //是否有免费次数
    public isCanPlay():boolean{
        if (this.isInActivity() && (this.isFree() || this.getToolNum() > 0)){
            return true;
        }
        return false;
    }

    public get isShowRedDot(): boolean {
       if (this.isInActivity() && this.isFree()){
            return true;
       }
	    return  this.getRedPoint();
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
    public isInAct():boolean
    {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    }

    public get cfg():Config.AcCfg.WeaponHouseCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

}
/**
 * 格子数据
 */
class GridItemData {
    public i: number;//横
    public j: number;//竖
    public value: number = 0;//值
    public item: AcWeaponHouseItem;//显示对象
    /**x的位置 */
    public get disX(): number {
        let _half: number = 50 >> 1;
        let disX: number = 59 + (5 + 108) * this.j + _half;
        return disX;
    }
    /**y的位置 */
    public get disY(): number {
        let _half: number =  108 >> 1;
        let disY: number = 74 + (5 + 108) * this.i + _half;
        return disY;
    }
}