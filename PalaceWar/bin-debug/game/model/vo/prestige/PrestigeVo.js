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
var PrestigeVo = (function (_super) {
    __extends(PrestigeVo, _super);
    function PrestigeVo() {
        var _this = _super.call(this) || this;
        _this.pem = 0;
        _this.info = null;
        _this.log = null;
        _this.canemper = 0; //是否能称帝
        return _this;
    }
    PrestigeVo.prototype.initData = function (data) {
        if (data) {
            if (data.pem != null) {
                this.pem = data.pem;
            }
            if (data.info != null) {
                var isdispatch = false;
                var oldPid = this.info ? this.info.pid : null;
                var newPic = data.info.pid;
                if (oldPid && oldPid != newPic && newPic == 5) {
                    isdispatch = true;
                }
                this.info = data.info;
                //刷新头像框
                if (isdispatch) {
                    egret.callLater(function () {
                        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_REFRESH_SPECIAL_AVATAR);
                    }, this);
                }
            }
            if (data.log != null) {
                this.log = data.log;
            }
            if (data.canemper != null) {
                this.canemper = data.canemper;
            }
        }
    };
    PrestigeVo.prototype.dispose = function () {
        this.pem = 0;
        this.info = null;
        this.log = null;
    };
    return PrestigeVo;
}(BaseVo));
__reflect(PrestigeVo.prototype, "PrestigeVo");
//# sourceMappingURL=PrestigeVo.js.map