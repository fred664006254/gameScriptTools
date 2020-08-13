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
var NewInviteVoApi = (function (_super) {
    __extends(NewInviteVoApi, _super);
    function NewInviteVoApi() {
        var _this = _super.call(this) || this;
        _this.lastpos = null;
        _this.lastidx = -1;
        return _this;
    }
    //获取自己邀请码
    NewInviteVoApi.prototype.getBindCode = function () {
        return this.newInviteVo.code;
    };
    //获取自己是否已经和人绑定
    NewInviteVoApi.prototype.getIsBindWithUid = function () {
        return this.newInviteVo.iuid > 0;
    };
    //获取自己是否已经和人绑定
    NewInviteVoApi.prototype.getBindUid = function () {
        return this.newInviteVo.iuid;
    };
    //获取成功邀请玩家数
    NewInviteVoApi.prototype.getInviteFriendNum = function () {
        var num = 0;
        if (this.newInviteVo.info) {
            num = Object.keys(this.newInviteVo.info).length;
        }
        return num;
    };
    //获取成功邀请玩家列表
    NewInviteVoApi.prototype.getInviteFriendList = function () {
        var arr = [];
        if (this.newInviteVo.info) {
            for (var i in this.newInviteVo.info) {
                var unit = this.newInviteVo.info[i];
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
    NewInviteVoApi.prototype.getInvitePowerNum = function (neednum) {
        var num = 0;
        if (this.newInviteVo.info) {
            for (var i in this.newInviteVo.info) {
                var unit = this.newInviteVo.info[i];
                //{uid,name,power
                if (unit && unit[2] >= neednum) {
                    ++num;
                }
            }
        }
        return num;
    };
    NewInviteVoApi.prototype.getShowRed = function () {
        return this.getInviteTaskRedPoint() || this.getInvitePowerRedPoint() || this.firstRed();
    };
    NewInviteVoApi.prototype.firstRed = function () {
        var flag = false;
        if (Api.switchVoApi.checkOpenNewInvite()) {
            flag = this.newInviteVo.oinfo && this.newInviteVo.oinfo.red == 1;
        }
        return flag;
    };
    NewInviteVoApi.prototype.getInviteTaskRedPoint = function () {
        var flag = false;
        if (Api.switchVoApi.checkOpenNewInvite()) {
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
    NewInviteVoApi.prototype.getInvitePowerRedPoint = function () {
        var flag = false;
        if (Api.switchVoApi.checkOpenNewInvite()) {
            var cfg = Config.Invitefriend2Cfg.powerTask;
            for (var i = 0; i < cfg.length; i++) {
                var tmp = cfg[i];
                var num = this.getInvitePowerNum(tmp.needPower);
                if (!this.isGetInvitePowerTask(tmp.id) && num >= tmp.value) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    };
    //是否已领取邀请好友奖励
    NewInviteVoApi.prototype.isGetInviteFriendTask = function (id) {
        var flag = false;
        if (this.newInviteVo.rinfo && this.newInviteVo.rinfo.invite && this.newInviteVo.rinfo.invite[id]) {
            flag = true;
        }
        return flag;
    };
    //是否已领取邀请好友权势任务奖励
    NewInviteVoApi.prototype.isGetInvitePowerTask = function (id) {
        var flag = false;
        if (this.newInviteVo.rinfo && this.newInviteVo.rinfo.power && this.newInviteVo.rinfo.power[id]) {
            flag = true;
        }
        return flag;
    };
    //是否已领取邀绑定奖励
    NewInviteVoApi.prototype.isGetInviteBind = function () {
        var flag = false;
        flag = this.newInviteVo.iuid > 0;
        return flag;
    };
    //是否已点击发送好友申请
    NewInviteVoApi.prototype.isSendApply = function () {
        var flag = false;
        if (this.newInviteVo.oinfo && this.newInviteVo.oinfo.apply) {
            flag = true;
        }
        return flag;
    };
    //是否是自己的邀请好友
    NewInviteVoApi.prototype.isInviteUid = function (uid) {
        var flag = false;
        if (this.newInviteVo.info) {
            for (var i in this.newInviteVo.info) {
                var unit = this.newInviteVo.info[i];
                if (Number(unit[0]) == uid) {
                    flag = true;
                    break;
                }
            }
        }
        //flag = this.newInviteVo.oinfo && this.newInviteVo.oinfo.red;
        return flag;
    };
    //判断是否已经是好友
    NewInviteVoApi.prototype.isMyFriend = function (uid) {
        return Api.friendVoApi.isFriendByUid(String(uid));
    };
    NewInviteVoApi.prototype.dispose = function () {
        this.lastpos = null;
        this.lastidx = -1;
    };
    return NewInviteVoApi;
}(BaseVoApi));
__reflect(NewInviteVoApi.prototype, "NewInviteVoApi");
//# sourceMappingURL=NewInviteVoApi.js.map