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
 * 界面管理
 * author 陈可
 * date 2017/9/18
 * @class ViewController
 */
var ViewController = (function (_super) {
    __extends(ViewController, _super);
    function ViewController() {
        return _super.call(this) || this;
    }
    ViewController.prototype.openViewByFunName = function (functionName) {
        var result = false;
        if (functionName) {
            if (Api[functionName + "VoApi"] && Api[functionName + "VoApi"].openMainView) {
                Api[functionName + "VoApi"].openMainView();
                result = true;
            }
            else {
                var viewClassName = App.StringUtil.firstCharToUper(functionName) + "View";
                if (egret.hasDefinition(viewClassName)) {
                    if (viewClassName == "DailybossView" && !Api.switchVoApi.checkOpenDailybossTogather()) {
                        this.openView(ViewConst.COMMON.DAILYBOSSDETILVIEW);
                    }
                    else {
                        this.openView(viewClassName);
                    }
                    result = true;
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
                    if (true) {
                        this.openView(viewClassName);
                    }
                    result = false;
                }
            }
        }
        return result;
    };
    ViewController.getInstance = function () {
        if (ViewController._instance == undefined) {
            ViewController._instance = new ViewController();
        }
        return ViewController._instance;
    };
    return ViewController;
}(BaseViewController));
__reflect(ViewController.prototype, "ViewController");
//# sourceMappingURL=ViewController.js.map