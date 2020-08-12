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
var InviteFriendVo = (function (_super) {
    __extends(InviteFriendVo, _super);
    function InviteFriendVo() {
        var _this = _super.call(this) || this;
        _this.code = ""; //邀请码
        _this.score = 0; //我的邀请积分
        _this.iscore = 0; //我带来的邀请积分
        _this.iuid = 0; //邀请者
        _this.rinfo = null; //奖励领取信息
        return _this;
    }
    InviteFriendVo.prototype.initData = function (data) {
        if (data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
    };
    InviteFriendVo.prototype.dispose = function () {
        this.code = "";
        this.score = 0;
        this.iscore = 0;
        this.iuid = 0;
        this.rinfo = null;
    };
    return InviteFriendVo;
}(BaseVo));
__reflect(InviteFriendVo.prototype, "InviteFriendVo");
//# sourceMappingURL=InviteFriendVo.js.map