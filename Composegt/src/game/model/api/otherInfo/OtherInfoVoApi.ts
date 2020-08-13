/**
 * 其他杂项api
 * author yanyuling
 * date 2017/10/27
 * @class PlayerVoApi
 */
class OtherInfoVoApi extends BaseVoApi
{
	private otherInfoVo:OtherInfoVo;
	public constructor() 
	{
		super();
	}

    /**
     * 检测是否已膜拜
     */
    public isRankVisited(idx:number)
    {
        if(idx == 0)
        {
            return this.otherInfoVo.power
        }
        if(idx == 1)
        {
            return this.otherInfoVo.challenge 
        }
        if(idx == 2)
        {
            return this.otherInfoVo.imacy
        }
        if(idx == 3)
        {
            return this.otherInfoVo.gpower
        }
         if(idx == 4)
        {
            return this.otherInfoVo.galliance
        }
    }

     public getOtherInfo()
    {
        return this.otherInfoVo;
    }

     /**
     * 检测是否领取绑定奖励
     */
    public isGetBindingReward()
    {
        if(this.otherInfoVo.info.bindFlag && this.otherInfoVo.info.bindFlag == 1){
            return true;
        }   
        return false;
    }
    public getPalaceFlag()
    {
        return this.otherInfoVo.palace_flag;
    }
    //获取禁言剩余时间
    public getBanet()
    {
        return this.otherInfoVo.banet;
    }

    //获取禁言剩余时间
    public getCrossBanet()
    {
        return this.otherInfoVo.info.crossBanet;
    }

     //获取糖果屋领取情况
    public getCandyGetInfo()
    {
        return this.otherInfoVo.info.candy;
    }
      //疯狂游乐场关分享信息
    public getFkShareInfo()
    {
        return this.otherInfoVo.info.fkShare;
    }

      //疯狂游乐场关关注信息
    public getFkFocusInfo()
    {
        return this.otherInfoVo.info.fkFocus;
    }

    //获取禁言剩余时间
    public getFirstchallengefail()
    {
        return this.otherInfoVo.firstchallengefail;
    }
     //疯狂游乐场分享红点
    public getFkIsshowRed()
    {
        if(!this.otherInfoVo.info.fkShare){
            return false;
        }
        let rewards = Config.GameprojectCfg.rewardFKYLC2;
        let keys=Object.keys(rewards);

		let l:number=keys.length;
        let fkVo = Api.otherInfoVoApi.getFkShareInfo();
		for(let i:number=0;i<l;i++)
		{
			let rewardStr=rewards[keys[i]];
            //state 1 未领取 2已经领取 3未达成
            let state = 1;
            if(!fkVo){
                state = 3;
            }
            else{
                if(fkVo.n >= Number(keys[i]))
                {
                    if(fkVo.get[keys[i]] == 1)
                    {
                        state = 2;
                    }
                    else{
                        state = 1;
                    }
                }
                else{
                    state = 3;
                }
            }
            if(state == 1){
                return true;
            }
		}

        return false;
    }

    public checkShowWanbaDesktopIcon():boolean
    {
        return PlatformManager.isSupportDesktopIcon()&&!this.checkWanbaHasSendDesktop();
    }

    public checkShowWanbaShareIcon():boolean
    {
        return PlatformManager.isSupportShare()&&!this.checkWanbaDailyHasShared();
    }

    public checkWanbaHasSendDesktop():boolean
    {
        return this.otherInfoVo&&this.otherInfoVo.info&&this.otherInfoVo.info.wbsendFlag;
    }

    public checkWanbaDailyHasShared():boolean
    {
        return this.otherInfoVo&&this.otherInfoVo.info&&this.otherInfoVo.info.wbdailyshareFlag;
    }



    // 3k实名认证已领取 true 未领取
     public checkrealnamerewards():boolean
    {
        if(this.otherInfoVo.info.author3k)
        {
            return false
        }
        return true
    }

    public getServantSortId()
    {
        let sortId = this.otherInfoVo.info.sortId;
        return sortId? sortId : 1 ;
    }
    public getUnlockList()
    {   
        if(this.otherInfoVo.info)
        {
            var arr = this.otherInfoVo.info.unlockList;
        }
        return arr;
    }
    
    //功能解锁名字
    public getFunctionName():string
    {   
        // this.arr2 =[];
		let arr = Api.otherInfoVoApi.getUnlockList();//领取数据 

		var arr2 = [];
		arr2 =Config.UnlocklistCfg.getUnlockItemCfgList();
		var arr3 =[]; //已经领取过的
		var arr4 =[]; //可以领取的
		var arr5 =[]; //不可以领取的
		for(var i:number=0;i<arr2.length ;i++)
		{
			if(arr&&arr[arr2[i].key]==1)
			{
				arr3.push(arr2[i]);
                if(arr3.length==arr2.length)
                {
                    return null;
                }
			}
			else
			{
				if(Api[arr2[i].gameName+"VoApi"]&&Api[arr2[i].gameName+"VoApi"].isShowNpc)
             	{
                    let isShowNpc:boolean=Api[arr2[i].gameName+"VoApi"].isShowNpc();
				  	if(isShowNpc)
					{
						arr4.push(arr2[i]);
					}
					else
					{
						arr5.push(arr2[i]);
					}
				}
				
			}
		}
	 
		arr3.sort(function(a: any,b: any):number
        {
            if(a.sortId > b.sortId) return 1;
            else if(a.sortId == b.sortId) return 0;
            return -1;
        });
		arr4.sort(function(a: any,b: any):number
        {
            if(a.sortId > b.sortId) return 1;
            else if(a.sortId == b.sortId) return 0;
            return -1;
        });

		arr5.sort(function(a: any,b: any):number
        {
            if(a.sortId > b.sortId) return 1;
            else if(a.sortId == b.sortId) return 0;
            return -1;
        });
		
		arr2 = arr4.concat(arr5).concat(arr3); 
        let str = LanguageManager.getlocal("functionModuleDes"+arr2[0].sortId);
        return  str
     
    }

    
    //功能解锁红点
    public getFunctionRedhot():boolean
    {
         let arr2 = Config.UnlocklistCfg.getUnlockItemCfgList();
         if(this.otherInfoVo&&this.otherInfoVo.info&&this.otherInfoVo.info.unlockList)
         { 
            var arr = this.otherInfoVo.info.unlockList;
            var boo:boolean =false;
            for(var i:number=0;i<arr2.length ;i++)
            {
                if(Api[arr2[i].gameName+"VoApi"]&&Api[arr2[i].gameName+"VoApi"].isShowNpc)
                {
                    let isShowNpc:boolean=Api[arr2[i].gameName+"VoApi"].isShowNpc();
                    if(isShowNpc&&arr[arr2[i].key]!=1)
                    {
                        boo=true; 
                        return boo;
                    } 
                } 
            }
         return boo; 
      }
      else
      {
          return false;
      }
    }
    public getCoverState():number
    {
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.cover) {
            return this.otherInfoVo.info.cover;
        } else {
            return 0;
        }
    }
    /** 获取港台绑定账号奖励领取状态 */
    public getFBBindFlag():number
    {
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.gtfbbindFlag) {
            return this.otherInfoVo.info.gtfbbindFlag;
        } else {
            return 0;
        }
    }
 
    public certification():boolean
    {   
        if(this.otherInfoVo.certification)
        {
            return true;
        }
        return false;
    }
    /**
     * 获取分享奖励的领取次数
     */
    public getShareGuideCount():number
    {
        let count = 0;
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.shareguide) 
        {
            return this.otherInfoVo.info.shareguide;
        }
        return count;
    }
    /**
     * 是否是新用户的
     */
    public isnewuser():boolean
    {
        if(this.otherInfoVo&&this.otherInfoVo.info&&this.otherInfoVo.info.isnewuser)
        {
            return true;
        }
        return false;
    }
    /**
     * 新分享面板的信息
     */
    public getGeneralShareInfo():any
    {
        return this.otherInfoVo.info.generalshare;
    }
    //群组分享信息
    public getTherealShareInfo():any
    {
        return this.otherInfoVo.info.therealshare;
    }
    /**
     * 新7天签到信息
     */
    public getArrivalNewInfo():any
    {
        return this.otherInfoVo.info.arrivalNewInfo;
    }

    public refreshArrivalNewInfoFlag():void
    {
        this.otherInfoVo.info.arrivalNewInfo.flag = 0;
    }
	/**
	 * 检查具体某一天的领取状态
	 * @param index 天数 
	 */
	public checkFlagByIndex(index:number):number
	{
		let curCount = this.otherInfoVo.info.arrivalNewInfo.count;
		let curFlag = this.otherInfoVo.info.arrivalNewInfo.flag;
		if(curCount > index)
		{
			return 1;
		}
		else if(index == curCount)
		{
			return 1;
		}
			
		return 2;
	}
    /**
	 * 是否显示红点
	 */
	public get isSignShowRedDot():boolean
	{
		if(this.otherInfoVo.info.arrivalNewInfo.flag == 0)
		{
			return true;
		}
		return false;
	}
    /**
     * 得到上一次请求当天早上的0点的时间
     */
    public getLastday():number
    {
        return this.otherInfoVo.lastday;
    }
    
    public setLastday(d:number):void
    {
        this.otherInfoVo.lastday = d;
    }
    public getWxchatgift()
    {
        return this.otherInfoVo.wxchatgift;
    }
    /** 3号实名认证是否已完成 */
    public hasRealname3Ok():boolean
    {
        return this.otherInfoVo.info.idcardnum && this.otherInfoVo.info.idcardname;
    }

    /** 问卷调查是否已完成 */
    public hasQuestionnaireOk():boolean
    {
        return this.otherInfoVo.info.jpquestionflag && this.otherInfoVo.info.jpquestionflag>0;
    }
    /** 添加到我的小程序，状态标记 */
    public wxaddmyproStatus():number
    {
        if (typeof(this.otherInfoVo.info.wxaddmyproflag) === "number") {
            return this.otherInfoVo.info.wxaddmyproflag;
        } else {
            return 0;
        }
    }
    /**微信悬浮窗，状态标记 */
    public wxiconStatus():number
    {
        if (typeof(this.otherInfoVo.info.wxaddfloat) === "number") {
            return this.otherInfoVo.info.wxaddfloat;
        } else {
            return 0;
        }
    }
    /** 微信关注公众号，状态标记 */
    public wxaddoffacctStatus():boolean
    {
        if (this.otherInfoVo.info.wxaddoffacct) {
            return true;
        } else {
            return false;
        }
    }

     /**
     * 得到聊天屏蔽
     */
    public getShareblock():number
    {
        if(this.otherInfoVo.info.shareblock)
        {
            return this.otherInfoVo.info.shareblock
        }
        return 0;
    }

     /**
     * 得到聊天屏蔽2
     */
    public getAllianceShareblock():number
    {
        if(this.otherInfoVo.info.allianceshareblock)
        {
            return this.otherInfoVo.info.allianceshareblock
        }
        return 0;
    }
    public getRealnameRewards():number
	{
		if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.realnameRewards!=null) {
			return this.otherInfoVo.info.realnameRewards;
		} else {
			return null;
		}
	}

    public getWanbaviptequanInfo(vipLevel)
	{
		if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.wbvipgiftinfo!=null) {
            return this.otherInfoVo.info.wbvipgiftinfo[vipLevel];
		} else {
			return 0;
		}
	}

     /**
     * 获取是否领取过防诈骗奖励
     */
    public getAntiDeception():number
    {
        let count = 0;
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.antideception) 
        {
            return this.otherInfoVo.info.antideception;
        }
        return count;
    }
     /**
     * 获取是否领取过twitter每日分享奖励
     */
    public getTwdailyshare():number
    {
        let count = 0;
        if (this.otherInfoVo && this.otherInfoVo && this.otherInfoVo.twdailyshare) 
        {
            return this.otherInfoVo.info.twdailyshare;
        }
        return count;
    }
    /** 新官上任任务信息 */
    public getLoginWeekTask() {
        return this.otherInfoVo.info.loginWeek.task;
    }
    /** 新官上任积分信息 */
    public getLoginWeekScore() {
        return this.otherInfoVo.info.loginWeek.score;
    }
    /** 新官上任任务领取信息 */
    public getLoginWeekFlags() {
        return this.otherInfoVo.info.loginWeek.flags;
    }
    /** 新官上任阶段奖励领取信息 */
    public getLoginWeekSinfo() {
        return this.otherInfoVo.info.loginWeek.sinfo;
    }
    /** 新官上任当前阶段0~4 */
    public getLoginWeekCurBoxIndex() {
        // 当前阶段
        let curBoxIndex = 1;
        for (var i = 0; i < 4; i++) {
            if (this.otherInfoVo.info.loginWeek.sinfo[i+1] == 1) {
                curBoxIndex = i+1+1;
            }
        }
        return curBoxIndex;
    }
    /** 新官上当前是第几天1~7 */
    public getLoginWeekDiffday() {
        // 开始时间
        let st = this.otherInfoVo.info.loginWeek.st;
        // 当前时间和开始时间所在零点的时间差
        let dt = GameData.serverTime - App.DateUtil.getWeeTs(st);

        return Math.ceil(dt/24/60/60);
    }
    /** 新官上任是否过期了 */
    public getLoginWeekTimeout() {
        if (!this.otherInfoVo.info.loginWeek) {
            return true;
        }
        return this.getLoginWeekDiffday() > 7;
    }
    /** 新官上任今日是否已弹出过 */
    public getLoginWeekFirstPopup() {
        return this.otherInfoVo.info.loginWeek.firstflag == 1;
    }
    /** 新官上任，天数红点 */
    public getLoginWeekRedOneDay(day:number): boolean{
        if (day > this.getLoginWeekDiffday()) {
            // 还没到天数，没有红点
            return false;
        }
        let task = this.otherInfoVo.info.loginWeek.task;
        let flags = this.otherInfoVo.info.loginWeek.flags;

        var arr: Array<any> = GameConfig.config.loginweekCfg.dailyTask[day];
        
        for (let key in arr) {
            if (arr.hasOwnProperty(key)) {
                if (!flags[day] || flags[day][key] != "1") { // 还未领取
                    let cfg = arr[key];
                    var num1 = 0;
                    if (task && task[cfg.questType]) {
                        num1 = task[cfg.questType];
                    }
                    if (num1 >= cfg.value) { // 任务达成
                        return true;
                    }
                }
            }
        }
        return false;
    }
    /** 新官上任，红点 */
    public getLoginWeekRed(): boolean{
        // 每天的红点
        for (var i = 0; i < 7; i++) {
            if (this.getLoginWeekRedOneDay(i+1)) {
                return true;
            }
        }
        // 阶段奖励红点
        let boxCfg = GameConfig.config.loginweekCfg.totalScoreReward[this.getLoginWeekCurBoxIndex()];
        if (boxCfg && this.getLoginWeekScore() >= boxCfg.needScore) {
            return true;
        }
        return false;
    }
    /** 新官上任结束时间 */
    public getLoginWeekEndTime() {
        return this.otherInfoVo.info.loginWeek.et;
    }


    public getOtherInfoVo() {
        return this.otherInfoVo;
    }

    public checkIsNeverUseMiaosha():boolean{
        return !this.otherInfoVo.autosmallattacket;
    }
    //秒杀功能
    public checkCanUseMiaosha():boolean{
        let canUse = false;
        if(this.otherInfoVo.autosmallattacket){
            canUse = GameData.serverTime < this.otherInfoVo.autosmallattacket;
        }else{
            canUse = true;
        }
        if(Api.shopVoApi.ifBuyMonthCard() || Api.shopVoApi.ifBuyYearCard()){
            canUse = true
        }
        if(Api.challengeVoApi.getCurBigChannelId() < 3){
            canUse = false;
        }
        return canUse;
    }
    public getMiaoshaLeftTime():string{
        if(Api.shopVoApi.ifBuyMonthCard() || Api.shopVoApi.ifBuyYearCard()){
            return '';
        }
        if(this.otherInfoVo.autosmallattacket){
            if(GameData.serverTime < this.otherInfoVo.autosmallattacket){
                return LanguageManager.getlocal(`miaoshaRemainTime`,[App.DateUtil.getFormatBySecond((this.otherInfoVo.autosmallattacket-GameData.serverTime), 8)]);
            }else{
                return '';
            }
        }else{
            return LanguageManager.getlocal(`miaoshaRemainTime`,[App.DateUtil.getFormatBySecond(Config.GameprojectCfg.miaoshaChallengeTime||1800, 8)]);

        }
    }

   
    public dispose():void
	{
		this.otherInfoVo = null;
		super.dispose();
	}


    
}