/**
 * 每日任务api
 * author yanyuling
 * date 2017/10/27
 * @class DailyTaskVoApi
 */
class DailytaskVoApi extends BaseVoApi
{
	private dailytaskVo:DailytaskVo;
	public constructor() 
	{
		super();
	}

    /**
     * 
     * 根据任务id，读取任务的当前进度信息
     */
    public getTaskFandVByTaskId(taskId:string)
    {
        return this.dailytaskVo.dailyTaskList[taskId];
    }
    /**
     * 
     * @param taskId 读取指定任务id的状态 0未完成 1已完成 2已领取
     */
    public getTaskStatusByTaskId(taskId:string)
    {
        if (this.dailytaskVo.dailyTaskList[taskId])
        {
            return this.dailytaskVo.dailyTaskList[taskId].task_f; 
        }
        return 0;
        
    }
    /**
     * 
     * @param rewardId 读取指定奖励id的状态 1未完成 2可领取 3已领取
     */
    public getTaskRewardStatusByRewardId(rewardId:string)
    {
        return this.dailytaskVo.rewards[rewardId];
    }

    /**
     * 获取当前活跃度
     */
    public getCurLivenessValue()
    {
        return this.dailytaskVo.liveness;
    }

    /**
     * 获取当前奖励
     */
    public getCurRewards()
    {
        return this.dailytaskVo.rewards;
    }

    public getTaskIdListAfterSort()
    {
        let keys:string[] = Config.DailytaskCfg.getTasksIdList();
        if (Api.switchVoApi.checkTWShenhe()) {
			let idx:number = 0;
			for(let i in keys)
			{
				if (keys[i]=="14")
				{
					keys.splice(Number(i)+idx,1);
				}
			}	
        }

        //审核服下益玩大平台特殊处理
		if(PlatformManager.checkIsShenHeYiWan() || Api.switchVoApi.checkTWShenhe()|| Api.switchVoApi.checkClosePay()){
			let delete_arr = ['13','14'];
			for(let id of delete_arr){
				let idx = keys.indexOf(id);
				if(idx > -1){
					keys.splice(idx , 1);
				}
			}
		}

        if(PlatformManager.checkHideIconByIP())
        {
            let isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
            if(!isBuyMonthCard)
            {
                let idx = keys.indexOf("13");
				if(idx > -1){
					keys.splice(idx , 1);
				}
            }
            
            let isBuyYearCard = Api.shopVoApi.ifBuyYearCard();
            if(!isBuyYearCard)
            {
                let idx = keys.indexOf("14");
				if(idx > -1){
					keys.splice(idx , 1);
				}
            }
        }
        //群芳会屏蔽
        if (Api.switchVoApi.checkOpenWifeBattle() && Api.wifebattleVoApi.checkCanJoin()) {

        } else {
			let idx:number = 0;
			for(let i in keys)
			{
				if (keys[i]=="22")
				{
					keys.splice(Number(i)+idx,1);
				}
			}	
        }



        let list1 =[];
		let list2 =[];
		let list3 =[];
		for (var index = 0; index <  keys.length; index++) {
			let status  = this.getTaskStatusByTaskId(keys[index]);
			if (status == 1)
			{
				list1.push(keys[index]);
			}else if(status == 2)
			{
				list3.push(keys[index]);
			}else
			{
				list2.push(keys[index]);
			}
		}
		return list1.concat(list2).concat(list3);
    }
    public getTaskIdForMainTaskUI():string
    {
        let idList = this.getTaskIdListAfterSort();
        let statdIdx = 0;
        while((idList[statdIdx] == "13" || idList[statdIdx] == "14") || this.getTaskRewardStatusByRewardId(idList[statdIdx]) == 3 )
        {
            statdIdx ++;
        }
        let stat = this.getTaskStatusByTaskId(idList[statdIdx]) || 0 ;
        // let reward = this.getTaskRewardStatusByRewardId(idList[statdIdx]) ;
        if(stat == 2){
            return null;
        }
        return idList[statdIdx];
        // return LanguageManager.getlocal("dailyTaskName"+ id);
    }
    public checkRedPoint():boolean
    {   
        for (var key in this.dailytaskVo.dailyTaskList) {
            if(this.dailytaskVo.dailyTaskList[key].task_f == 1)
            {
                return true;
            }
        }
        let rewardList = Config.DailytaskCfg.getDailyRewardsList();
        for (const key in rewardList) {
            if (Object.prototype.hasOwnProperty.call(rewardList, key)) 
            {
                if(this.getBoxStatusById(key)==2)
                {
                    return true;
                }
            }
        }
        return false;
    }

    public getBoxStatusById(boxId:string)
	{
		let tmpRew = Config.DailytaskCfg.getDailyRewardsCfgByRewardId(boxId);
		let rStatus = 1;
		if (Api.dailytaskVoApi.getTaskRewardStatusByRewardId( boxId))
		{
			rStatus = 3;
		}else
		{
			if (tmpRew.needLiveness <= Api.dailytaskVoApi.getCurLivenessValue())
				rStatus = 2;
		}
		return rStatus;
	}

    public go():void
    {
        ViewController.getInstance().openView(ViewConst.COMMON.DAILYTASKVIEW);
    }
    public dispose():void
    {
        this.dailytaskVo=null;
        super.dispose();
    }
}