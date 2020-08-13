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
 * 主线任务vo
 * author yanyuling
 * date 2017/10/13
 * @class MainTaskVo
 */
var MainTaskVo = (function (_super) {
    __extends(MainTaskVo, _super);
    function MainTaskVo() {
        return _super.call(this) || this;
    }
    MainTaskVo.prototype.initData = function (data) {
        var oldId = this.taskId;
        if (data.info) {
            this.value = data.info.v;
            this.taskId = data.info.id;
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI);
        }
        if (oldId && oldId != this.taskId) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_MAINTASK_GUIDE);
        }
    };
    MainTaskVo.prototype.dispose = function () {
        this.value = 0;
        this.taskId = null;
    };
    return MainTaskVo;
}(BaseVo));
__reflect(MainTaskVo.prototype, "MainTaskVo");
//# sourceMappingURL=MainTaskVo.js.map