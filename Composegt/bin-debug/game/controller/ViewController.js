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
    ViewController.getInstance = function () {
        if (ViewController._instance == undefined) {
            ViewController._instance = new ViewController();
        }
        return ViewController._instance;
    };
    return ViewController;
}(BaseViewController));
__reflect(ViewController.prototype, "ViewController");
