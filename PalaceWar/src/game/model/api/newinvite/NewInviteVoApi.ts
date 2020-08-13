class NewInviteVoApi extends BaseVoApi
{
    private newInviteVo:NewInviteVo;
    public lastpos = null;
    public lastidx = -1;
    
	public constructor() {
		super();
    }
    
    //获取自己邀请码
    public getBindCode():string{
        return this.newInviteVo.code;
    }

    //获取自己是否已经和人绑定
    public getIsBindWithUid():boolean{
        return this.newInviteVo.iuid > 0;
    }

    //获取自己是否已经和人绑定
    public getBindUid():number{
        return this.newInviteVo.iuid;
    }

    //获取成功邀请玩家数
    public getInviteFriendNum():number{
        let num = 0;
        if(this.newInviteVo.info){
            num = Object.keys(this.newInviteVo.info).length;
        }
        return num;
    }

    //获取成功邀请玩家列表
    public getInviteFriendList():any[]{
        let arr = [];
        if(this.newInviteVo.info){
            for(let i in this.newInviteVo.info){
                let unit = this.newInviteVo.info[i];
                arr.push({
                    uid : unit[0],
                    name : unit[1],
                    power : unit[2],
                });
            }
            arr.sort((a,b)=>{
                if(a.power == b.power){
                    return b.uid - a.uid;
                }
                else{
                    return b.power - a.power;
                } 
            });
        }
        return arr;
    }

    //获取符合权势玩家数
    public getInvitePowerNum(neednum : number):number{
        let num = 0;
        if(this.newInviteVo.info){
            for(let i in this.newInviteVo.info){
                let unit = this.newInviteVo.info[i];
                //{uid,name,power
                if(unit && unit[2] >= neednum){
                    ++ num;
                }
            }
        }
        return num;
    }

    public getShowRed():boolean{
        return this.getInviteTaskRedPoint() || this.getInvitePowerRedPoint() || this.firstRed();
    }

    public firstRed():boolean{
        let flag = false;
        if(Api.switchVoApi.checkOpenNewInvite()){
            flag = this.newInviteVo.oinfo && this.newInviteVo.oinfo.red == 1;
        }
        return flag;
    }

    public getInviteTaskRedPoint():boolean{
        let flag = false;
        if(Api.switchVoApi.checkOpenNewInvite()){
            let num = this.getInviteFriendNum();
            let cfg = Config.Invitefriend2Cfg.inviteTask;
            for(let i:number= 0;i < cfg.length; i++){
                let tmp : Config.InviteTaskCfg = cfg[i];
                if(!this.isGetInviteFriendTask(tmp.id) && num >= tmp.value){//
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    }

    public getInvitePowerRedPoint():boolean{
        let flag = false;
        if(Api.switchVoApi.checkOpenNewInvite()){
            let cfg = Config.Invitefriend2Cfg.powerTask;
            for(let i:number= 0;i < cfg.length; i++){
                let tmp : Config.InvitePowerTaskCfg = cfg[i];
                let num = this.getInvitePowerNum(tmp.needPower);
                if(!this.isGetInvitePowerTask(tmp.id) && num >= tmp.value){//
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    }

    //是否已领取邀请好友奖励
    public isGetInviteFriendTask(id : number):boolean{
        let flag = false;
        if(this.newInviteVo.rinfo && this.newInviteVo.rinfo.invite && this.newInviteVo.rinfo.invite[id]){
            flag = true;
        }
        return flag;
    }

     //是否已领取邀请好友权势任务奖励
     public isGetInvitePowerTask(id : number):boolean{
        let flag = false;
        if(this.newInviteVo.rinfo && this.newInviteVo.rinfo.power && this.newInviteVo.rinfo.power[id]){
            flag = true;
        }
        return flag;
    }

    //是否已领取邀绑定奖励
    public isGetInviteBind():boolean{
        let flag = false;
        flag = this.newInviteVo.iuid > 0;
        return flag;
    }

    //是否已点击发送好友申请
    public isSendApply():boolean{
        let flag = false; 
        if(this.newInviteVo.oinfo && this.newInviteVo.oinfo.apply){
            flag = true;
        }
        return flag;
    }

    //是否是自己的邀请好友
    public isInviteUid(uid : number):boolean{
        let flag = false;
        if(this.newInviteVo.info){
            for(let i in this.newInviteVo.info){
                let unit = this.newInviteVo.info[i];
                if(Number(unit[0]) == uid){
                    flag = true;
                    break;
                }
            }
        }
        //flag = this.newInviteVo.oinfo && this.newInviteVo.oinfo.red;
        return flag;
    }

    //判断是否已经是好友
    public isMyFriend(uid : number):boolean{
        return Api.friendVoApi.isFriendByUid(String(uid));
    }
    

    public dispose():void{
        this.lastpos = null;
        this.lastidx = -1;
    }
}