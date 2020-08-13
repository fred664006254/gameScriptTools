/**
 * 板子队列api
 * author shaoliang
 * date 2020/3/3
 *
 * @class ViewqueueVoApi
 */
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
var ViewqueueVoApi = (function (_super) {
    __extends(ViewqueueVoApi, _super);
    function ViewqueueVoApi() {
        var _this = _super.call(this) || this;
        _this.isShowing = false;
        _this._waitingQueue = [];
        return _this;
    }
    ViewqueueVoApi.prototype.isCanShowView = function () {
        if (this.isShowing || Api.rookieVoApi.isGuiding || Api.rookieVoApi.isInGuiding) {
            return false;
        }
        return true;
    };
    ViewqueueVoApi.prototype.checkShowView = function (viewname, parms, isHead) {
        if (isHead === void 0) { isHead = false; }
        if (this.isCanShowView() == false) {
            if (isHead) {
                this._waitingQueue.splice(0, 0, { name: viewname, parms: parms });
            }
            else {
                this._waitingQueue.push({ name: viewname, parms: parms });
            }
        }
        else {
            this.isShowing = true;
            ViewController.getInstance().openView(viewname, parms, true);
        }
    };
    ViewqueueVoApi.prototype.checkWaitingView = function () {
        this.isShowing = false;
        if (this.isCanShowView() == false) {
            return;
        }
        if (this._waitingQueue.length > 0) {
            var a = this._waitingQueue.shift();
            this.isShowing = true;
            ViewController.getInstance().openView(a.name, a.parms, true);
        }
        else {
            this.isShowing = false;
            if (Api.rookieVoApi.curGuideKey == "zhenqifang") {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_NEEDGUIDE);
            }
        }
    };
    ViewqueueVoApi.prototype.dispose = function () {
        this.isShowing = false;
        this._waitingQueue.length = 0;
        _super.prototype.dispose.call(this);
    };
    return ViewqueueVoApi;
}(BaseVoApi));
__reflect(ViewqueueVoApi.prototype, "ViewqueueVoApi");
//# sourceMappingURL=ViewqueueVoApi.js.map