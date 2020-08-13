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
 *  好友vo
 * author yanyuling
 * date 2017/10/27
 * @class FriendVo
 */
var FriendVo = (function (_super) {
    __extends(FriendVo, _super);
    function FriendVo() {
        var _this = _super.call(this) || this;
        _this.recnum = 0;
        _this.lastday = 0;
        _this.updated_at = 0;
        return _this;
    }
    FriendVo.prototype.initData = function (data) {
        // let isNeedDispatch = false;
        var isRefreshRecvList = false;
        var isRefreshApplyList = false;
        var isRedreshFriendList = false;
        if (this.info && data.info != this.info) {
            //刷新好友列表，数量发生变化时才刷新
            var len1 = Object.keys(data.info).length;
            var len2 = Object.keys(this.info).length;
            if (len1 != len2) {
                isRedreshFriendList = true;
            }
        }
        if (this.apply && data.apply != this.apply) {
            //刷新推荐申请列表
            var len1 = Object.keys(data.apply).length;
            var len2 = Object.keys(this.apply).length;
            if (len1 != len2) {
                isRefreshApplyList = true;
            }
        }
        if (this.receive && this.receive != data.receive) {
            //刷新收到的申请列表
            var len1 = Object.keys(data.receive).length;
            var len2 = Object.keys(this.receive).length;
            if (len1 != len2) {
                isRefreshRecvList = true;
            }
        }
        for (var key in data) {
            this[key] = data[key];
        }
        if (isRefreshRecvList) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FRIENDS_NEW_RECEIVE);
        }
        if (isRefreshApplyList) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FRIENDS_NEW_APPLYCHANGE);
        }
        if (isRedreshFriendList) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FRIENDS_NEW_FRIENDSCHANGE);
        }
    };
    FriendVo.prototype.dispose = function () {
        this.info = null;
        this.apply = null;
        this.receive = null;
        this.recnum = null;
        this.oinfo = null;
        this.lastday = null;
        this.updated_at = null;
    };
    return FriendVo;
}(BaseVo));
__reflect(FriendVo.prototype, "FriendVo");
