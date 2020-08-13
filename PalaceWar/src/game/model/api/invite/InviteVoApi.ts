class InviteVoApi extends BaseVoApi
{
	private inviteVo:InviteVo;
    public sortedByTime:Array<string>=[];
    public sortedByPower:Array<string>=[];
    public sortedByRecharge:Array<string>=[];
	public constructor() 
	{
		super();
	}
    /**
     * 获取邀请好友人数列表
     */
    public getFriendNumList():string[] {
        console.log("getFriendNumList")
        let retArr = [];
        for(let cfgId in Config.InvitefriendCfg.friendNum) {
            if (Config.InvitefriendCfg.friendNum.hasOwnProperty(cfgId)) {
                retArr.push({cfgId:cfgId, userPid:this.sortedByTime[Config.InvitefriendCfg.friendNum[cfgId].needNum - 1]});
            }
        }
        if (this.inviteVo) {
            retArr.sort((a:{cfgId:string, userPid:string},b:{cfgId:string, userPid:string})=>{
                // 配置信息
                let cfgInfoA = Config.InvitefriendCfg.friendNum[a.cfgId];
                let cfgInfoB = Config.InvitefriendCfg.friendNum[b.cfgId];
                // 状态0当前可领 1 当前不可领也未领过 2 已经领过
                let statA = 0; 
                let statB = 0; 
                if (this.inviteVo.rinfo.invite[a.cfgId] === 1) {
                    statA = 2;
                } else if (this.sortedByTime.length >= cfgInfoA.needNum) {
                    statA = 0;
                } else {
                    statA = 1;
                }
                if (this.inviteVo.rinfo.invite[b.cfgId] === 1) {
                    statB = 2;
                } else if (this.sortedByTime.length >= cfgInfoB.needNum) {
                    statB = 0;
                } else {
                    statB = 1;
                }
                if (statA !== statB) {
                    return statA - statB;
                }
                return cfgInfoA.needNum - cfgInfoB.needNum;
            });   
        }
        console.log("getFriendNumList over")
        return retArr;
    }
    /**
     * 获取权势奖励列表
     */
    public getFriendPowerList():string[] {
        let retArr = [];

        if (this.inviteVo) {
            for(let cfgId in Config.InvitefriendCfg.friendPower) {
                if (Config.InvitefriendCfg.friendPower.hasOwnProperty(cfgId)) {
                    let arriveCount = 0;
                    // 计算有多少人达到了
                    for(let i = 0; i < this.sortedByPower.length; i++) {
                        if (this.inviteVo.info[this.sortedByPower[i]][2] >= Config.InvitefriendCfg.friendPower[cfgId].needPower) {
                            arriveCount ++;
                        } else {
                            break;
                        }
                    }
                    retArr.push({cfgId:cfgId, arriveCount:arriveCount}); // 配置id,已达到人数

                }
            }

            retArr.sort((a:{cfgId:string, arriveCount:number},b:{cfgId:string, arriveCount:number})=>{
                // 配置信息
                let cfgInfoA = Config.InvitefriendCfg.friendPower[a.cfgId];
                let cfgInfoB = Config.InvitefriendCfg.friendPower[b.cfgId];
                // 状态0当前可领 1 当前不可领也未领过 2 已经完不能再领
                let statA = 0; 
                let statB = 0; 

                if (this.inviteVo.rinfo.power[a.cfgId] >= cfgInfoA.limit) { // 已领取的次数大于或等于能领取的最大次数，就认为不能再领了
                    statA = 2;
                } else if ((!this.inviteVo.rinfo.power[a.cfgId]&&a.arriveCount>0) || a.arriveCount > this.inviteVo.rinfo.power[a.cfgId] ) { // 已达到的人数，大于已领取的次数，认为可以领取
                    statA = 0;
                } else {
                    statA = 1;
                }
                if (this.inviteVo.rinfo.power[b.cfgId] >= cfgInfoB.limit) { // 已领取的次数大于或等于能领取的最大次数，就认为不能再领了
                    statB = 2;
                } else if ((!this.inviteVo.rinfo.power[b.cfgId] && b.arriveCount>0)|| b.arriveCount > this.inviteVo.rinfo.power[b.cfgId]) { // 已达到的人数，大于已领取的次数，认为可以领取
                    statB = 0;
                } else {
                    statB = 1;
                }
                if (statA !== statB) {
                    return statA - statB;
                }
                return cfgInfoA.needPower - cfgInfoB.needPower;
            });
        }
        return retArr;
    }
    /**
     * 获取充值奖励列表
     */
    public getFriendRechargeList():string[] {
        let retArr = [];
        
        if (this.inviteVo) {
            for(let cfgId in Config.InvitefriendCfg.friendRecharge) {
                if (Config.InvitefriendCfg.friendRecharge.hasOwnProperty(cfgId)) {
                    let arriveCount = 0;
                    // 计算有多少人达到了
                    for(let i = 0; i < this.sortedByRecharge.length; i++) {
                        if (this.inviteVo.info[this.sortedByRecharge[i]][3] >= Config.InvitefriendCfg.friendRecharge[cfgId].needRecharge) {
                            arriveCount ++;
                        } else {
                            break;
                        }
                    }
                    retArr.push({cfgId:cfgId, arriveCount:arriveCount}); // 配置id,已达到人数

                }
            }

            retArr.sort((a:{cfgId:string, arriveCount:number},b:{cfgId:string, arriveCount:number})=>{
                // 配置信息
                let cfgInfoA = Config.InvitefriendCfg.friendRecharge[a.cfgId];
                let cfgInfoB = Config.InvitefriendCfg.friendRecharge[b.cfgId];
                // 状态0当前可领 1 当前不可领也未领过 2 已经完不能再领
                let statA = 0; 
                let statB = 0; 

                if (this.inviteVo.rinfo.recharge[a.cfgId] >= cfgInfoA.limit) { // 已领取的次数大于或等于能领取的最大次数，就认为不能再领了
                    statA = 2;
                } else if ((!this.inviteVo.rinfo.recharge[a.cfgId] && a.arriveCount>0) || a.arriveCount > this.inviteVo.rinfo.recharge[a.cfgId] ) { // 已达到的人数，大于已领取的次数，认为可以领取
                    statA = 0;
                } else {
                    statA = 1;
                }
                if (this.inviteVo.rinfo.recharge[b.cfgId] >= cfgInfoB.limit) { // 已领取的次数大于或等于能领取的最大次数，就认为不能再领了
                    statB = 2;
                } else if ((!this.inviteVo.rinfo.recharge[b.cfgId]&& b.arriveCount>0)|| b.arriveCount > this.inviteVo.rinfo.recharge[b.cfgId]) { // 已达到的人数，大于已领取的次数，认为可以领取
                    statB = 0;
                } else {
                    statB = 1;
                }
                if (statA !== statB) {
                    return statA - statB;
                }
                return cfgInfoA.needRecharge - cfgInfoB.needRecharge;
            });
        }
        return retArr;
    }
    // 处理一下数据（在对话框打开的时候）
    public processDataOnOpenDialog():void {
        console.log("processDataOnOpenDialog");
        if (this.inviteVo) {           
            // 按时间排序
            this.sortedByTime = Object.keys(this.inviteVo.info);
            this.sortedByTime.sort((a,b)=>{
                return this.inviteVo.info[a][6] - this.inviteVo.info[b][6];
            });
            // 按权势排序
            this.sortedByPower = Object.keys(this.inviteVo.info);
            this.sortedByPower.sort((a,b)=>{
                let powerA = this.inviteVo.info[a][2];
                let powerB = this.inviteVo.info[b][2];
                if (powerA !== powerB) {
                    return powerB - powerA;
                }
                return this.inviteVo.info[a][6] - this.inviteVo.info[b][6];
            });
            // 按充值排序
            this.sortedByRecharge = Object.keys(this.inviteVo.info);
            this.sortedByRecharge.sort((a,b)=>{
                let rechargeA = this.inviteVo.info[a][3];
                let rechargeB = this.inviteVo.info[b][3];
                if (rechargeA !== rechargeB) {
                    return rechargeB - rechargeA;
                }
                return this.inviteVo.info[a][6] - this.inviteVo.info[b][6];
            }); 
        } else {
            this.sortedByTime = [];
            this.sortedByPower = [];
            this.sortedByRecharge = [];
        }
        console.log("processDataOnOpenDialog over");
    }
    // 获取用户昵称
    public getUserNicknameByPid(userPid:string):string
    {
        if (this.inviteVo) {
            return String(this.inviteVo.info[userPid][5]);
        } else {
            return "";
        }
    }
    // 获取用户头像
    public getUserHeadByPid(userPid:string):string
    {
        return String(this.inviteVo.info[userPid][4]);
        // return "http://thirdapp1.qlogo.cn/qzopenapp/43a357988b13b4b8f7aff5cf812ac0c3a21d7e096764d8cb80214d16323327c7/50";
    }

    // 获取用户uid
    public getUserUidByPid(userPid:string):number
    {
        if (this.inviteVo) {
            return this.inviteVo.info[userPid][0];
        } else {
            return 0;
        }
    }
    // 获取用户服号
    public getUserServerByPid(userPid:string):string
    {
        if (this.inviteVo) {
            return String(this.inviteVo.info[userPid][1]);
        } else {
            return "1";
        }
    }
    // 获取用户权势
    public getUserPowerByPid(userPid:string):string
    {
        if (this.inviteVo) {
            return String(this.inviteVo.info[userPid][2]);
        } else {
            return "0"
        }
    }
    // 邀请人数奖励是否已经领取
    public getInviteNumGettedReward(cfgId:string):boolean
    {
        if (this.inviteVo) {
            return this.inviteVo.rinfo.invite[cfgId] === 1;
        } else {
            return false;
        }
    }
    // 得到已邀请的总人数
    public getInvitedNum():number
    {
        return this.sortedByTime.length;
    }
    // 邀请权势奖励已经领取次数
    public getInvitePowerGettedReward(cfgId:string):number
    {
        if (this.inviteVo && this.inviteVo.rinfo.power[cfgId]) {
            return this.inviteVo.rinfo.power[cfgId];
        }else{
            return 0;
        }
    }
    // 邀请充值奖励已经领取次数
    public getInviteRechargeGettedReward(cfgId:string):number
    {
        if (this.inviteVo && this.inviteVo.rinfo.recharge[cfgId]) {
            return this.inviteVo.rinfo.recharge[cfgId];
        }else{
            return 0;
        }
    }
}