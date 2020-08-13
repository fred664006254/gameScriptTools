/**
 * 通用官报 传入参数 msg 消息内容 title 标题名
 * author qianjun
 * date 2019/3/12
 * @class AcCommonReportView
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
var AcCommonReportView = (function (_super) {
    __extends(AcCommonReportView, _super);
    function AcCommonReportView() {
        return _super.call(this) || this;
    }
    AcCommonReportView.prototype.getResourceList = function () {
        var arr = ["public_9_bg64"];
        return _super.prototype.getResourceList.call(this).concat(arr);
    };
    AcCommonReportView.prototype.getTitleBgName = function () {
        return null;
    };
    AcCommonReportView.prototype.getTitleStr = function () {
        return null;
    };
    AcCommonReportView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    AcCommonReportView.prototype.initView = function () {
        this.addTouchTap(this.touchTap, this, null);
        this.viewBg.touchEnabled = true;
        var lookBg = BaseBitmap.create("public_9_bg64");
        // lookBg.scaleX = 2;
        lookBg.height = 355;
        this.addChild(lookBg);
        var param = this.param.data;
        //名字
        var nameTf = ComponentManager.getTextField("" + param.title, 26);
        this.addChild(nameTf);
        var descTf = ComponentManager.getTextField("" + param.msg, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTf.lineSpacing = 8;
        descTf.width = 500;
        this.addChild(descTf);
        var nextTf = ComponentManager.getTextField(LanguageManager.getlocal("clickContinue"), 20);
        nextTf.textColor = TextFieldConst.COLOR_WARN_GREEN;
        nextTf.width = 500;
        this.addChild(nextTf);
        lookBg.height = Math.max(nameTf.textHeight + descTf.textHeight + 220, 350);
        lookBg.setPosition(GameConfig.stageWidth / 2 - lookBg.width / 2, GameConfig.stageHeigth / 2 - lookBg.height / 2);
        nameTf.setPosition(lookBg.width / 2 - nameTf.width / 2, lookBg.y + 70);
        descTf.setPosition(lookBg.width / 2 - descTf.width / 2, nameTf.y + nameTf.textHeight + 30);
        nextTf.setPosition(420, lookBg.y + lookBg.height - nextTf.textHeight - 50);
    };
    AcCommonReportView.prototype.touchTap = function () {
        this.hide();
    };
    AcCommonReportView.prototype.dispose = function () {
        // this._childId = null;
        _super.prototype.dispose.call(this);
    };
    return AcCommonReportView;
}(BaseView));
__reflect(AcCommonReportView.prototype, "AcCommonReportView");
//# sourceMappingURL=AcCommonReportView.js.map