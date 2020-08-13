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
 * 拉霸机 -记录
 * author 张朝阳
 * date 2019/6/13
 * @class AcArcadeGameLogView
 */
var AcArcadeGameLogView = (function (_super) {
    __extends(AcArcadeGameLogView, _super);
    function AcArcadeGameLogView() {
        var _this = _super.call(this) || this;
        _this._logs = [];
        return _this;
    }
    AcArcadeGameLogView.prototype.getCnCode = function () {
        var code = this.param.data.code;
        if (code == "2" || code == "3") {
            code = "1";
        }
        return code;
    };
    AcArcadeGameLogView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 540;
        bg.height = 700;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 60);
        this.addChildToContainer(bg);
        var rect = new egret.Rectangle(0, 0, 520, 680);
        var logs = this._logs;
        if (logs.length > 1) {
            logs.sort(function (a, b) {
                return b[0] - a[0];
            });
        }
        var scrollList = ComponentManager.getScrollList(AcArcadeGameLogsScrollItem, logs, rect, { aid: this.param.data.aid, code: this.param.data.code });
        scrollList.setPosition(bg.x + 10, bg.y + 10);
        this.addChildToContainer(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        var totalNum = 0;
        if (logs.length > 0) {
            totalNum = logs[0][0];
        }
        var targetStr = LanguageManager.getlocal("acArcadeGame_logtiptxt", ["" + totalNum]);
        var targetText = ComponentManager.getTextField(targetStr, 20, TextFieldConst.COLOR_BROWN);
        targetText.setPosition(bg.x + 10, bg.y - 25);
        this.addChildToContainer(targetText);
    };
    AcArcadeGameLogView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUST_ACTIVITY_ARCADEGETLOGS, requestData: { activeId: this.param.data.activeId } };
    };
    AcArcadeGameLogView.prototype.receiveData = function (data) {
        this._logs = data.data.data.logs;
    };
    AcArcadeGameLogView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "accarnivalview_tab_red", "acarcadeview_logdown-1", "acarcadeview_logup-1", "activity_db_01", "activity_charge_red"
        ]);
    };
    AcArcadeGameLogView.prototype.getTitleStr = function () {
        return "acArcadeGameLogViewTitle-" + this.getCnCode();
    };
    AcArcadeGameLogView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._logs = [];
    };
    return AcArcadeGameLogView;
}(PopupView));
__reflect(AcArcadeGameLogView.prototype, "AcArcadeGameLogView");
