class NewRebackVoApi extends BaseVoApi
{
    private newRebackVo:NewRebackVo;
    public lastpos = null;
    public lastidx = -1;
    
	public constructor() {
		super();
    }
    
    //获取自己邀请码
    public getBindCode():string{
        let code = ``;
        if(this.newRebackVo && this.newRebackVo.code){
            code = this.newRebackVo.code
        }
        return code;
    }

    //获取自己是否已经和人绑定
    public getIsBindWithUid():boolean{
        let flag = false;
        if(this.newRebackVo && this.newRebackVo.iuid){
            flag =  this.newRebackVo.iuid > 0;
        }
        return flag;
    }

    //获取自己是否已经和人绑定
    public getBindUid():number{
        let code = 0;
        if(this.newRebackVo && this.newRebackVo.iuid){
            code = this.newRebackVo.iuid;
        }
        return code;
    }

    //获取成功邀请玩家数
    public getInviteFriendNum():number{
        let num = 0;
        if(this.newRebackVo && this.newRebackVo.info){
            num = Object.keys(this.newRebackVo.info).length;
        }
        return num;
    }

    //获取成功邀请玩家列表
    public getInviteFriendList():any[]{
        let arr = [];
        // for(let i = 1; i < 50; ++ i){
        //     arr.push({
        //         uid : 1,
        //         name : `玩家${i}`,
        //         power : App.MathUtil.getRandom(1,100000000000),
        //     });
        // }
        if(this.newRebackVo && this.newRebackVo.info){
            for(let i in this.newRebackVo.info){
                let unit = this.newRebackVo.info[i];
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
        if(this.newRebackVo && this.newRebackVo.info){
            for(let i in this.newRebackVo.info){
                let unit = this.newRebackVo.info[i];
                //{uid,name,power
                if(unit && unit[2] >= neednum){
                    ++ num;
                }
            }
        }
        return num;
    }

    public getShowRed():boolean{
        return this.getInviteTaskRedPoint() || this.firstRed() || this.secondRed();
    }

    public firstRed():boolean{
        let flag = false;
        if(Api.switchVoApi.checkOpenPlayerComeBack() && this.newRebackVo){
            flag = this.newRebackVo.oinfo && this.newRebackVo.oinfo.red == 1;   
        }
        return flag;
    }

    //符合权势玩家 没有填码
    public secondRed():boolean{
        let flag = false;
        if(Api.switchVoApi.checkOpenPlayerComeBack() && this.newRebackVo && this.getBindUid() == 0 && Api.playerVoApi.getPlayerPower() >= Config.PlayercomebackCfg.needPower && this.isInReturnTime() && this.getLimitCD() > 0){
            flag = true;   
        }
        return flag;
    }

    public getInviteTaskRedPoint():boolean{
        let flag = false;
        if(Api.switchVoApi.checkOpenPlayerComeBack()){
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

    //是否已领取邀请好友奖励
    public isGetInviteFriendTask(id : number):boolean{
        let flag = false;
        if(this.newRebackVo && this.newRebackVo.rinfo && this.newRebackVo.rinfo.invite && this.newRebackVo.rinfo.invite[id]){
            flag = true;
        }
        return flag;
    }

    //是否已领取邀绑定奖励
    public isGetInviteBind():boolean{
        let flag = false;
        flag = this.newRebackVo && this.newRebackVo.iuid > 0;
        return flag;
    }

    //是否已点击发送好友申请
    public isSendApply():boolean{
        let flag = false; 
        if(this.newRebackVo && this.newRebackVo.oinfo && this.newRebackVo.oinfo.apply){
            flag = true;
        }
        return flag;
    }

    //是否是自己的邀请好友
    public isInviteUid(uid : number):boolean{
        let flag = false;
        if(this.newRebackVo && this.newRebackVo.info){
            for(let i in this.newRebackVo.info){
                let unit = this.newRebackVo.info[i];
                if(Number(unit[0]) == uid){
                    flag = true;
                    break;
                }
            }
        }
        //flag = this.newRebackVo.oinfo && this.newRebackVo.oinfo.red;
        return flag;
    }

    //判断是否已经是好友
    public isMyFriend(uid : number):boolean{
        return Api.friendVoApi.isFriendByUid(String(uid));
    }
    
    //判断是否已过期
    public getLimitCD():number{
        let limitday = 7;
        let num = 0;
        let st = Api.playerReturnVoApi.version;
        num = st + limitday * 86400 - GameData.serverTime;
        return num;
    }

    public isInReturnTime():boolean{
        let flag = false;
        if(Api.switchVoApi.checkOpenReback() && Api.playerReturnVoApi.version > 0 && Api.playerReturnVoApi.isInActTime()){
            flag = true;
        }
        return flag; 
    }

    public dispose():void{
        this.lastpos = null;
        this.lastidx = -1;
    }
}