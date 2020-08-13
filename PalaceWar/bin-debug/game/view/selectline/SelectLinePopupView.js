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
var SelectLinePopupView = (function (_super) {
    __extends(SelectLinePopupView, _super);
    function SelectLinePopupView() {
        var _this = _super.call(this) || this;
        _this._checkBoxList = [];
        return _this;
    }
    SelectLinePopupView.prototype.initView = function () {
        var lineArr = window["gameLineArr"] || [];
        var l = lineArr.length;
        for (var i = 0; i < l; i++) {
            var checkBox = ComponentManager.getCheckBox(LanguageManager.getlocal("selectLine" + i + "Desc"), null, NaN, TextFieldConst.COLOR_BROWN);
            this.addChildToContainer(checkBox);
            checkBox.addTouchTap(this.selectLineHandler, this, [i]);
            checkBox.setPosition(150, 50 + (checkBox.height + 20) * i);
            this._checkBoxList.push(checkBox);
            if (window["gameproxyline"] == lineArr[i]) {
                checkBox.setSelected(true);
            }
            else if (!window["gameproxyline"] && (lineArr[i].indexOf("web01") > -1 || lineArr[i].indexOf("game01") > -1)) {
                checkBox.setSelected(true);
            }
        }
    };
    SelectLinePopupView.prototype.selectLineHandler = function (e, line) {
        var checkBox = e.currentTarget;
        if (!checkBox.checkSelected()) {
            checkBox.setSelected(true);
        }
        var lineArr = window["gameLineArr"] || [];
        var linehost = window["gameproxyline"];
        if (lineArr[line] && lineArr[line] != linehost) {
            window["selectGameLine"](lineArr[line]);
            var newLineHost = window["gameproxyline"];
            if (linehost != newLineHost) {
                App.CommonUtil.showTip(LanguageManager.getlocal("wifeskinchangebgsuc"));
            }
            // NetManager.socket.closeAndReconnect();
            // NetManager.chat.closeAndReconnect();
        }
        var l = this._checkBoxList.length;
        for (var i = 0; i < l; i++) {
            var tcheckBox = this._checkBoxList[i];
            if (tcheckBox.hashCode != checkBox.hashCode) {
                tcheckBox.setSelected(false);
            }
        }
    };
    SelectLinePopupView.prototype.dispose = function () {
        this._checkBoxList.length = 0;
        _super.prototype.dispose.call(this);
    };
    return SelectLinePopupView;
}(PopupView));
__reflect(SelectLinePopupView.prototype, "SelectLinePopupView");
//# sourceMappingURL=SelectLinePopupView.js.map