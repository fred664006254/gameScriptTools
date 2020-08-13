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
var AcCommonView = (function (_super) {
    __extends(AcCommonView, _super);
    function AcCommonView() {
        var _this = _super.call(this) || this;
        _this.aid = App.StringUtil.firstCharToLower(_this.getClassName().replace("Ac", "").replace("View", ""));
        return _this;
    }
    AcCommonView.prototype.getProbablyInfo = function () {
        var rStr = this.getClassName().toLowerCase().replace("view", "") + "ProbablyInfo";
        var ruleStr = rStr + this.code;
        if (LanguageManager.checkHasKey(ruleStr)) {
            return ruleStr;
        }
        else if (LanguageManager.checkHasKey(rStr)) {
            return rStr;
        }
        else {
        }
        return "";
    };
    AcCommonView.prototype.getResourceList = function () {
        var resArr = [];
        if (this.code && ResourceManager.hasRes(String(this.aid).toLowerCase() + this.code)) {
            resArr.push(String(this.aid).toLowerCase() + this.code);
        }
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    Object.defineProperty(AcCommonView.prototype, "code", {
        get: function () {
            return this.param ? this.param.data : "";
        },
        enumerable: true,
        configurable: true
    });
    AcCommonView.prototype.getUiCode = function () {
        return this.code;
    };
    Object.defineProperty(AcCommonView.prototype, "acVo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCommonView.prototype.getTitleStr = function () {
        return "ac" + App.StringUtil.firstCharToUper(this.acVo.aidAndCode) + "_Title";
    };
    AcCommonView.prototype.getTitleParams = function () {
        return null;
    };
    /*
    *根据code获得资源图  资源必须严格命名 以xxx-code 结尾 如 xxx-1, xxx-2,xxxx-3
    *prev  资源前缀 分隔符"-"以前的字符串
    *code 传入code
    */
    AcCommonView.prototype.getResByCode = function (prev, code) {
        if (!code) {
            code = this.getUiCode();
        }
        var resname = App.CommonUtil.getResByCode(prev, this.code, code);
        return resname;
    };
    /*
    *根据code获得cnkey  key严格命名以 必须 xxx-code 结尾 如 xxx-1, xxx-2,xxxx-3
    *prev  key前缀 分隔符"-"以前的字符串
    *code 传入code
    */
    AcCommonView.prototype.getCnByCode = function (prev, code) {
        if (!code) {
            code = this.getUiCode();
        }
        var newkey = App.CommonUtil.getCnByCode(prev, this.code, code);
        return newkey;
    };
    /*
    * 活动显示剧情
    * keyStr  前面是一个key， 后面是typecode，一般是1
    * isSave 是否保存下次调用不触发剧情
    * visitId 和之前用法一样
    * callBack 回调方法

    * talkKey 在cn中的配法以天籁之音活动和默认参数为例 skySoundStartDialogTalk_1_1-1
    */
    AcCommonView.prototype.showAcDialog = function (keyStr, isSave, visitId, callBack) {
        if (keyStr === void 0) { keyStr = "startDialog_1"; }
        if (isSave === void 0) { isSave = true; }
        if (visitId === void 0) { visitId = "1"; }
        if (callBack === void 0) { callBack = null; }
        var localkey = this.acVo.aidAndCode + Api.playerVoApi.getPlayerID() + keyStr + visitId;
        var lastTime = 0;
        var timeStr = LocalStorageManager.get(localkey);
        if (timeStr && timeStr != "") {
            lastTime = Number(timeStr);
        }
        if (lastTime == this.acVo.et && isSave) {
            if (callBack) {
                callBack();
            }
            return;
        }
        if (isSave) {
            LocalStorageManager.set(localkey, String(this.acVo.et));
        }
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var diaCfg = cfg[keyStr];
        if (diaCfg && diaCfg[visitId]) {
            ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW, {
                aid: this.aid,
                code: keyStr.split("_")[1],
                AVGDialog: diaCfg,
                visitId: visitId,
                talkKey: this.aid + App.StringUtil.firstCharToUper(keyStr.split("_")[0]) + "Talk_",
                callBack: callBack
            });
        }
    };
    return AcCommonView;
}(CommonView));
__reflect(AcCommonView.prototype, "AcCommonView");
//# sourceMappingURL=AcCommonView.js.map