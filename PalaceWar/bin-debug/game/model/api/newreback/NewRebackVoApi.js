var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var NewRebackVoApi = (function (_super) {
    __extends(NewRebackVoApi, _super);
    function NewRebackVoApi() {
        var _this = _super.call(this) || this;
        _this.lastpos = null;
        _this.lastidx = -1;
        return _this;
    }
    //获取自己邀请码
    NewRebackVoApi.prototype.getBindCode = function () {
        var code = "";
        if (this.newRebackVo && this.newRebackVo.code) {
            code = this.newRebackVo.code;
        }
        return code;
    };
    //获取自己是否已经和人绑定
    NewRebackVoApi.prototype.getIsBindWithUid = function () {
        var flag = false;
        if (this.newRebackVo && this.newRebackVo.iuid) {
            flag = this.newRebackVo.iuid > 0;
        }
        return flag;
    };
    //获取自己是否已经和人绑定
    NewRebackVoApi.prototype.getBindUid = function () {
        var code = 0;
        if (this.newRebackVo && this.newRebackVo.iuid) {
            code = this.newRebackVo.iuid;
        }
        return code;
    };
    //获取成功邀请玩家数
    NewRebackVoApi.prototype.getInviteFriendNum = function () {
        var num = 0;
        if (this.newRebackVo && this.newRebackVo.info) {
            num = Object.keys(this.newRebackVo.info).length;
        }
        return num;
    };
    //获取成功邀请玩家列表
    NewRebackVoApi.prototype.getInviteFriendList = function () {
        var arr = [];
        // for(let i = 1; i < 50; ++ i){
        //     arr.push({
        //         uid : 1,
        //         name : `玩家${i}`,
        //         power : App.MathUtil.getRandom(1,100000000000),
        //     });
        // }
        if (this.newRebackVo && this.newRebackVo.info) {
            for (var i in this.newRebackVo.info) {
                var unit = this.newRebackVo.info[i];
                arr.push({
                    uid: unit[0],
                    name: unit[1],
                    power: unit[2],
                });
            }
            arr.sort(function (a, b) {
                if (a.power == b.power) {
                    return b.uid - a.uid;
                }
                else {
                    return b.power - a.power;
                }
            });
        }
        return arr;
    };
    //获取符合权势玩家数
    NewRebackVoApi.prototype.getInvitePowerNum = function (neednum) {
        var num = 0;
        if (this.newRebackVo && this.newRebackVo.info) {
            for (var i in this.newRebackVo.info) {
                var unit = this.newRebackVo.info[i];
                //{uid,name,power
                if (unit && unit[2] >= neednum) {
                    ++num;
                }
            }
        }
        return num;
    };
    NewRebackVoApi.prototype.getShowRed = function () {
        return this.getInviteTaskRedPoint() || this.firstRed() || this.secondRed();
    };
    NewRebackVoApi.prototype.firstRed = function () {
        var flag = false;
        if (Api.switchVoApi.checkOpenPlayerComeBack() && this.newRebackVo) {
            flag = this.newRebackVo.oinfo && this.newRebackVo.oinfo.red == 1;
        }
        return flag;
    };
    //符合权势玩家 没有填码
    NewRebackVoApi.prototype.secondRed = function () {
        var flag = false;
        if (Api.switchVoApi.checkOpenPlayerComeBack() && this.newRebackVo && this.getBindUid() == 0 && Api.playerVoApi.getPlayerPower() >= Config.PlayercomebackCfg.needPower && this.isInReturnTime() && this.getLimitCD() > 0) {
            flag = true;
        }
        return flag;
    };
    NewRebackVoApi.prototype.getInviteTaskRedPoint = function () {
        var flag = false;
        if (Api.switchVoApi.checkOpenPlayerComeBack()) {
            var num = this.getInviteFriendNum();
            var cfg = Config.Invitefriend2Cfg.inviteTask;
            for (var i = 0; i < cfg.length; i++) {
                var tmp = cfg[i];
                if (!this.isGetInviteFriendTask(tmp.id) && num >= tmp.value) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    };
    //是否已领取邀请好友奖励
    NewRebackVoApi.prototype.isGetInviteFriendTask = function (id) {
        var flag = false;
        if (this.newRebackVo && this.newRebackVo.rinfo && this.newRebackVo.rinfo.invite && this.newRebackVo.rinfo.invite[id]) {
            flag = true;
        }
        return flag;
    };
    //是否已领取邀绑定奖励
    NewRebackVoApi.prototype.isGetInviteBind = function () {
        var flag = false;
        flag = this.newRebackVo && this.newRebackVo.iuid > 0;
        return flag;
    };
    //是否已点击发送好友申请
    NewRebackVoApi.prototype.isSendApply = function () {
        var flag = false;
        if (this.newRebackVo && this.newRebackVo.oinfo && this.newRebackVo.oinfo.apply) {
            flag = true;
        }
        return flag;
    };
    //是否是自己的邀请好友
    NewRebackVoApi.prototype.isInviteUid = function (uid) {
        var flag = false;
        if (this.newRebackVo && this.newRebackVo.info) {
            for (var i in this.newRebackVo.info) {
                var unit = this.newRebackVo.info[i];
                if (Number(unit[0]) == uid) {
                    flag = true;
                    break;
                }
            }
        }
        //flag = this.newRebackVo.oinfo && this.newRebackVo.oinfo.red;
        return flag;
    };
    //判断是否已经是好友
    NewRebackVoApi.prototype.isMyFriend = function (uid) {
        return Api.friendVoApi.isFriendByUid(String(uid));
    };
    //判断是否已过期
    NewRebackVoApi.prototype.getLimitCD = function () {
        var limitday = 7;
        var num = 0;
        var st = Api.playerReturnVoApi.version;
        num = st + limitday * 86400 - GameData.serverTime;
        return num;
    };
    NewRebackVoApi.prototype.isInReturnTime = function () {
        var flag = false;
        if (Api.switchVoApi.checkOpenReback() && Api.playerReturnVoApi.version > 0 && Api.playerReturnVoApi.isInActTime()) {
            flag = true;
        }
        return flag;
    };
    NewRebackVoApi.prototype.dispose = function () {
        this.lastpos = null;
        this.lastidx = -1;
    };
    return NewRebackVoApi;
}(BaseVoApi));
__reflect(NewRebackVoApi.prototype, "NewRebackVoApi");
//# sourceMappingURL=NewRebackVoApi.js.map