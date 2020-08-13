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
var InviteVoApi = (function (_super) {
    __extends(InviteVoApi, _super);
    function InviteVoApi() {
        var _this = _super.call(this) || this;
        _this.sortedByTime = [];
        _this.sortedByPower = [];
        _this.sortedByRecharge = [];
        return _this;
    }
    /**
     * 获取邀请好友人数列表
     */
    InviteVoApi.prototype.getFriendNumList = function () {
        var _this = this;
        console.log("getFriendNumList");
        var retArr = [];
        for (var cfgId in Config.InvitefriendCfg.friendNum) {
            if (Config.InvitefriendCfg.friendNum.hasOwnProperty(cfgId)) {
                retArr.push({ cfgId: cfgId, userPid: this.sortedByTime[Config.InvitefriendCfg.friendNum[cfgId].needNum - 1] });
            }
        }
        if (this.inviteVo) {
            retArr.sort(function (a, b) {
                // 配置信息
                var cfgInfoA = Config.InvitefriendCfg.friendNum[a.cfgId];
                var cfgInfoB = Config.InvitefriendCfg.friendNum[b.cfgId];
                // 状态0当前可领 1 当前不可领也未领过 2 已经领过
                var statA = 0;
                var statB = 0;
                if (_this.inviteVo.rinfo.invite[a.cfgId] === 1) {
                    statA = 2;
                }
                else if (_this.sortedByTime.length >= cfgInfoA.needNum) {
                    statA = 0;
                }
                else {
                    statA = 1;
                }
                if (_this.inviteVo.rinfo.invite[b.cfgId] === 1) {
                    statB = 2;
                }
                else if (_this.sortedByTime.length >= cfgInfoB.needNum) {
                    statB = 0;
                }
                else {
                    statB = 1;
                }
                if (statA !== statB) {
                    return statA - statB;
                }
                return cfgInfoA.needNum - cfgInfoB.needNum;
            });
        }
        console.log("getFriendNumList over");
        return retArr;
    };
    /**
     * 获取权势奖励列表
     */
    InviteVoApi.prototype.getFriendPowerList = function () {
        var _this = this;
        var retArr = [];
        if (this.inviteVo) {
            for (var cfgId in Config.InvitefriendCfg.friendPower) {
                if (Config.InvitefriendCfg.friendPower.hasOwnProperty(cfgId)) {
                    var arriveCount = 0;
                    // 计算有多少人达到了
                    for (var i = 0; i < this.sortedByPower.length; i++) {
                        if (this.inviteVo.info[this.sortedByPower[i]][2] >= Config.InvitefriendCfg.friendPower[cfgId].needPower) {
                            arriveCount++;
                        }
                        else {
                            break;
                        }
                    }
                    retArr.push({ cfgId: cfgId, arriveCount: arriveCount }); // 配置id,已达到人数
                }
            }
            retArr.sort(function (a, b) {
                // 配置信息
                var cfgInfoA = Config.InvitefriendCfg.friendPower[a.cfgId];
                var cfgInfoB = Config.InvitefriendCfg.friendPower[b.cfgId];
                // 状态0当前可领 1 当前不可领也未领过 2 已经完不能再领
                var statA = 0;
                var statB = 0;
                if (_this.inviteVo.rinfo.power[a.cfgId] >= cfgInfoA.limit) {
                    statA = 2;
                }
                else if ((!_this.inviteVo.rinfo.power[a.cfgId] && a.arriveCount > 0) || a.arriveCount > _this.inviteVo.rinfo.power[a.cfgId]) {
                    statA = 0;
                }
                else {
                    statA = 1;
                }
                if (_this.inviteVo.rinfo.power[b.cfgId] >= cfgInfoB.limit) {
                    statB = 2;
                }
                else if ((!_this.inviteVo.rinfo.power[b.cfgId] && b.arriveCount > 0) || b.arriveCount > _this.inviteVo.rinfo.power[b.cfgId]) {
                    statB = 0;
                }
                else {
                    statB = 1;
                }
                if (statA !== statB) {
                    return statA - statB;
                }
                return cfgInfoA.needPower - cfgInfoB.needPower;
            });
        }
        return retArr;
    };
    /**
     * 获取充值奖励列表
     */
    InviteVoApi.prototype.getFriendRechargeList = function () {
        var _this = this;
        var retArr = [];
        if (this.inviteVo) {
            for (var cfgId in Config.InvitefriendCfg.friendRecharge) {
                if (Config.InvitefriendCfg.friendRecharge.hasOwnProperty(cfgId)) {
                    var arriveCount = 0;
                    // 计算有多少人达到了
                    for (var i = 0; i < this.sortedByRecharge.length; i++) {
                        if (this.inviteVo.info[this.sortedByRecharge[i]][3] >= Config.InvitefriendCfg.friendRecharge[cfgId].needRecharge) {
                            arriveCount++;
                        }
                        else {
                            break;
                        }
                    }
                    retArr.push({ cfgId: cfgId, arriveCount: arriveCount }); // 配置id,已达到人数
                }
            }
            retArr.sort(function (a, b) {
                // 配置信息
                var cfgInfoA = Config.InvitefriendCfg.friendRecharge[a.cfgId];
                var cfgInfoB = Config.InvitefriendCfg.friendRecharge[b.cfgId];
                // 状态0当前可领 1 当前不可领也未领过 2 已经完不能再领
                var statA = 0;
                var statB = 0;
                if (_this.inviteVo.rinfo.recharge[a.cfgId] >= cfgInfoA.limit) {
                    statA = 2;
                }
                else if ((!_this.inviteVo.rinfo.recharge[a.cfgId] && a.arriveCount > 0) || a.arriveCount > _this.inviteVo.rinfo.recharge[a.cfgId]) {
                    statA = 0;
                }
                else {
                    statA = 1;
                }
                if (_this.inviteVo.rinfo.recharge[b.cfgId] >= cfgInfoB.limit) {
                    statB = 2;
                }
                else if ((!_this.inviteVo.rinfo.recharge[b.cfgId] && b.arriveCount > 0) || b.arriveCount > _this.inviteVo.rinfo.recharge[b.cfgId]) {
                    statB = 0;
                }
                else {
                    statB = 1;
                }
                if (statA !== statB) {
                    return statA - statB;
                }
                return cfgInfoA.needRecharge - cfgInfoB.needRecharge;
            });
        }
        return retArr;
    };
    // 处理一下数据（在对话框打开的时候）
    InviteVoApi.prototype.processDataOnOpenDialog = function () {
        var _this = this;
        console.log("processDataOnOpenDialog");
        if (this.inviteVo) {
            // 按时间排序
            this.sortedByTime = Object.keys(this.inviteVo.info);
            this.sortedByTime.sort(function (a, b) {
                return _this.inviteVo.info[a][6] - _this.inviteVo.info[b][6];
            });
            // 按权势排序
            this.sortedByPower = Object.keys(this.inviteVo.info);
            this.sortedByPower.sort(function (a, b) {
                var powerA = _this.inviteVo.info[a][2];
                var powerB = _this.inviteVo.info[b][2];
                if (powerA !== powerB) {
                    return powerB - powerA;
                }
                return _this.inviteVo.info[a][6] - _this.inviteVo.info[b][6];
            });
            // 按充值排序
            this.sortedByRecharge = Object.keys(this.inviteVo.info);
            this.sortedByRecharge.sort(function (a, b) {
                var rechargeA = _this.inviteVo.info[a][3];
                var rechargeB = _this.inviteVo.info[b][3];
                if (rechargeA !== rechargeB) {
                    return rechargeB - rechargeA;
                }
                return _this.inviteVo.info[a][6] - _this.inviteVo.info[b][6];
            });
        }
        else {
            this.sortedByTime = [];
            this.sortedByPower = [];
            this.sortedByRecharge = [];
        }
        console.log("processDataOnOpenDialog over");
    };
    // 获取用户昵称
    InviteVoApi.prototype.getUserNicknameByPid = function (userPid) {
        if (this.inviteVo) {
            return String(this.inviteVo.info[userPid][5]);
        }
        else {
            return "";
        }
    };
    // 获取用户头像
    InviteVoApi.prototype.getUserHeadByPid = function (userPid) {
        return String(this.inviteVo.info[userPid][4]);
        // return "http://thirdapp1.qlogo.cn/qzopenapp/43a357988b13b4b8f7aff5cf812ac0c3a21d7e096764d8cb80214d16323327c7/50";
    };
    // 获取用户uid
    InviteVoApi.prototype.getUserUidByPid = function (userPid) {
        if (this.inviteVo) {
            return this.inviteVo.info[userPid][0];
        }
        else {
            return 0;
        }
    };
    // 获取用户服号
    InviteVoApi.prototype.getUserServerByPid = function (userPid) {
        if (this.inviteVo) {
            return String(this.inviteVo.info[userPid][1]);
        }
        else {
            return "1";
        }
    };
    // 获取用户权势
    InviteVoApi.prototype.getUserPowerByPid = function (userPid) {
        if (this.inviteVo) {
            return String(this.inviteVo.info[userPid][2]);
        }
        else {
            return "0";
        }
    };
    // 邀请人数奖励是否已经领取
    InviteVoApi.prototype.getInviteNumGettedReward = function (cfgId) {
        if (this.inviteVo) {
            return this.inviteVo.rinfo.invite[cfgId] === 1;
        }
        else {
            return false;
        }
    };
    // 得到已邀请的总人数
    InviteVoApi.prototype.getInvitedNum = function () {
        return this.sortedByTime.length;
    };
    // 邀请权势奖励已经领取次数
    InviteVoApi.prototype.getInvitePowerGettedReward = function (cfgId) {
        if (this.inviteVo && this.inviteVo.rinfo.power[cfgId]) {
            return this.inviteVo.rinfo.power[cfgId];
        }
        else {
            return 0;
        }
    };
    // 邀请充值奖励已经领取次数
    InviteVoApi.prototype.getInviteRechargeGettedReward = function (cfgId) {
        if (this.inviteVo && this.inviteVo.rinfo.recharge[cfgId]) {
            return this.inviteVo.rinfo.recharge[cfgId];
        }
        else {
            return 0;
        }
    };
    return InviteVoApi;
}(BaseVoApi));
__reflect(InviteVoApi.prototype, "InviteVoApi");
//# sourceMappingURL=InviteVoApi.js.map