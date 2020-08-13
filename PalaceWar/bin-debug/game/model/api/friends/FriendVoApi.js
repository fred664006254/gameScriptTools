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
/**
 * 好友api
 * author yanyuling
 * date 2018/06/25
 * @class FriendVoApi
 */
var FriendVoApi = (function (_super) {
    __extends(FriendVoApi, _super);
    function FriendVoApi() {
        var _this = _super.call(this) || this;
        _this.recommendList = []; //推荐列表
        _this.applyList = []; //自己的申请列表
        _this.shieldList = []; //屏蔽列表
        _this.friendList = []; //好友列表
        _this.receiveList = []; //被申请列表
        _this.sadunList = []; //被申请列表
        _this._hideSadlist = false;
        _this._hideFriendList = false;
        return _this;
    }
    FriendVoApi.prototype.isShowNpc = function () {
        // return true;
        if (GameConfig.config.friendCfg.needLv <= Api.playerVoApi.getPlayerLevel()) {
            return true;
        }
        return false;
    };
    FriendVoApi.prototype.getGetGiftTimes = function () {
        return this.friendVo ? this.friendVo.recnum : 0;
    };
    FriendVoApi.prototype.isGiftCollectEnable = function () {
        /**
         * 达到领取上限后，不再显示红点
         */
        if (this.getGetGiftTimes() >= GameConfig.config.friendCfg.maxGetNum) {
            return false;
        }
        if (this.friendVo) {
            for (var key in this.friendVo.info) {
                var rec = this.friendVo.info[key]["rec"];
                if (rec && rec == 1) {
                    return true;
                }
            }
        }
        return false;
    };
    FriendVoApi.prototype.isShowRedForItem3 = function () {
        return this.friendVo && Object.keys(this.friendVo.receive).length > 0;
    };
    FriendVoApi.prototype.getFriendsCount = function () {
        return this.friendVo ? Object.keys(this.friendVo.info).length : 0;
    };
    FriendVoApi.prototype.getApplyCount = function () {
        return this.friendVo ? Object.keys(this.friendVo.apply).length : 0;
    };
    FriendVoApi.prototype.getSendTimes = function () {
        var num = 0;
        for (var key in this.friendVo.info) {
            if (this.friendVo.info[key]["send"] == 1) {
                num++;
            }
        }
        return num;
    };
    FriendVoApi.prototype.isMaxFriendsNums = function () {
        var max = GameConfig.config.friendCfg.maxFriend;
        if (this.getFriendsCount() == max) {
            return true;
        }
        return false;
    };
    //申请数量是否已达上限
    FriendVoApi.prototype.isMaxFriendsApply = function () {
        var max = GameConfig.config.friendCfg.maxSendRequest;
        if (this.getApplyCount() == max) {
            return true;
        }
        return false;
    };
    FriendVoApi.prototype.isBatchSendGiftEnable = function () {
        for (var key in this.friendVo.info) {
            var tmpInfo = this.friendVo.info[key];
            if (tmpInfo["send"] == 0) {
                return true;
            }
        }
        return false;
    };
    //是否已申请
    FriendVoApi.prototype.isAppliedByUid = function (uid) {
        for (var key in this.friendVo.apply) {
            if (key == "" + uid) {
                return true;
            }
        }
        return false;
    };
    //是否是好友
    FriendVoApi.prototype.isFriendByUid = function (uid) {
        if (this.friendVo && this.friendVo.info && this.friendVo.info["" + uid]) {
            return true;
        }
        return false;
    };
    //是否是亲家
    FriendVoApi.prototype.isSadunByUid = function (uid) {
        for (var _i = 0, _a = this.sadunList; _i < _a.length; _i++) {
            var unit = _a[_i];
            if (Number(unit.uid) == Number(uid)) {
                return true;
            }
        }
        return false;
    };
    FriendVoApi.prototype.isGetGiftEnableByUid = function (uid) {
        var info = this.friendVo.info["" + uid];
        if (info && info.rec == 1) {
            return true;
        }
        return false;
    };
    //是否可赠送
    FriendVoApi.prototype.isSendEnable = function (uid) {
        var info = this.friendVo.info["" + uid];
        if (info && info.send == 0) {
            return true;
        }
        return false;
    };
    FriendVoApi.prototype.isInvalidInList3 = function (uid) {
        if (this.friendVo.receive["" + uid]) {
            return true;
        }
        return false;
    };
    //主界面是否显示红点
    FriendVoApi.prototype.isShowRedForEnter = function () {
        return this.friendVo ? (this.isShowRedForItem3() || this.isGiftCollectEnable()) : Api.redpointVoApi.checkRedPoint("friend");
    };
    FriendVoApi.prototype.showFriendsNetFlags = function (flag) {
        App.CommonUtil.showTip(LanguageManager.getlocal("friends_netFlag" + flag));
    };
    FriendVoApi.prototype.hideSaduList = function (isHide) {
        this._hideSadlist = isHide;
        if (this.sadunList.length > 0) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FRIENDS_HIDE_FRIENDS_OR_SADUN);
        }
    };
    FriendVoApi.prototype.isHideSaduList = function () {
        return this._hideSadlist;
    };
    FriendVoApi.prototype.hideFriendsList = function (isHide) {
        this._hideFriendList = isHide;
        if (this.friendList.length > 0) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FRIENDS_HIDE_FRIENDS_OR_SADUN);
        }
    };
    FriendVoApi.prototype.isHideFriendsList = function () {
        return this._hideFriendList;
    };
    FriendVoApi.prototype.dispose = function () {
        this.friendVo = null;
        this.recommendList = [];
        this.applyList = [];
        this.shieldList = [];
        this.friendList = [];
        this.receiveList = [];
        this.sadunList = [];
        this._hideSadlist = false;
        this._hideFriendList = false;
        _super.prototype.dispose.call(this);
    };
    return FriendVoApi;
}(BaseVoApi));
__reflect(FriendVoApi.prototype, "FriendVoApi");
//# sourceMappingURL=FriendVoApi.js.map