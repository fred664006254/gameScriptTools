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
 * 选择语言列表
 * author 陈可
 * date 2019/08/15
 * @class SettingPopopView
 */
var SettingLangPopupView = (function (_super) {
    __extends(SettingLangPopupView, _super);
    function SettingLangPopupView() {
        var _this = _super.call(this) || this;
        _this._checkBoxList = [];
        return _this;
    }
    SettingLangPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 520;
        bg.height = 300;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 25;
        this.addChildToContainer(bg);
        var arr = GameConfig.langList;
        var i = 0;
        var bgMaxH = 0;
        var curKey = PlatMgr.getSpidKey();
        if (arr.indexOf(curKey) < 0) {
            curKey = "en";
        }
        for (var key in arr) {
            if (arr.hasOwnProperty(key)) {
                var langItem = arr[key];
                var checkBox = ComponentMgr.getCheckBox(GameConfig.localLangCfg[langItem]);
                checkBox.setPosition(100, (checkBox.height + 10) * i + bg.y + 20);
                this.addChildToContainer(checkBox);
                checkBox.addChangeStatusHanlder(this.changeLangHandler, this, [langItem]);
                this._checkBoxList.push(checkBox);
                i++;
                bgMaxH = checkBox.y + checkBox.height - bg.y;
                if (curKey == langItem) {
                    checkBox.setSelected(true);
                    checkBox.touchChildren = false;
                }
            }
        }
        bg.height = bgMaxH + 20;
    };
    SettingLangPopupView.prototype.changeLangHandler = function (target, params) {
        var list = this._checkBoxList;
        if (target.checkSelected()) {
            ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                msg: LangMger.getlocal("switchAreaLangTip"), title: LangMger.getlocal("sysTip"), needCancel: true, handler: this, callback: function () {
                    for (var key in list) {
                        if (list.hasOwnProperty(key)) {
                            var checkBox = list[key];
                            if (checkBox.hashCode == target.hashCode) {
                                checkBox.touchChildren = false;
                            }
                            else {
                                if (checkBox.checkSelected()) {
                                    checkBox.setSelected(false);
                                }
                                if (checkBox.touchChildren == false) {
                                    checkBox.touchChildren = true;
                                }
                            }
                        }
                    }
                    PlatMgr.switchAreaOrLanguage(PlatMgr.getGameArea(), params[0]);
                }, cancelcallback: function () {
                    if (target) {
                        target.setSelected(false);
                    }
                }
            });
        }
    };
    SettingLangPopupView.prototype.dispose = function () {
        this._checkBoxList.length = 0;
        _super.prototype.dispose.call(this);
    };
    return SettingLangPopupView;
}(PopupView));
__reflect(SettingLangPopupView.prototype, "SettingLangPopupView");
//# sourceMappingURL=SettingLangPopupView.js.map