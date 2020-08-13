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
// declare function loadttf(name:string,callback:any);
var TTFManager = (function (_super) {
    __extends(TTFManager, _super);
    function TTFManager() {
        var _this = _super.call(this) || this;
        _this._loadedObj = null;
        return _this;
    }
    Object.defineProperty(TTFManager, "Ins", {
        get: function () {
            if (this._instance == null) {
                this._instance = new TTFManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 加载字体资源
     * @param fontName --资源名，后面也做fontFamily用    //资源放在resource/asset/css下
     * @param callback --回调方法
     */
    TTFManager.prototype.loadttfRes = function (fontName, callBack) {
        var _this = this;
        if (this._loadedObj == null) {
            this._loadedObj = {};
        }
        if (this._loadedObj[fontName]) {
            callBack(1);
            return;
        }
        console.log("beginwindowLoad______________ttf");
        if (window["loadttf"]) {
            console.log("windowLoad______________ttf");
            window["loadttf"](fontName, function (num) {
                console.log("loaded______________ttf");
                callBack(num);
                if (num == 1 || num == 3) {
                    if (!_this._loadedObj[fontName]) {
                        _this._loadedObj[fontName] = true;
                    }
                }
            });
        }
    };
    TTFManager._instance = null;
    TTFManager.TH_FONTNAME = "sarabun";
    return TTFManager;
}(egret.DisplayObject));
__reflect(TTFManager.prototype, "TTFManager");
//# sourceMappingURL=TTFManager.js.map