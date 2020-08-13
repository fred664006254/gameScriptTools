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
 * 官品升级政绩不足提示
 * author chenke
 * date 2020/07/10
 * @class PlayerUpLimitPopupView
 *
 */
var PlayerUpLimitPopupView = (function (_super) {
    __extends(PlayerUpLimitPopupView, _super);
    function PlayerUpLimitPopupView() {
        var _this = _super.call(this) || this;
        _this._cfg = {
            exp: [
                { key: "dailytask", unlock: 9, cnkey: "getExpTip1", plv: 0 },
                { key: "challenge", unlock: 0, cnkey: "getExpTip2", plv: 6 },
            ],
            rate: [
                { key: "composepersion", unlock: 0, cnkey: "getRateTip1", plv: 0 },
                { key: "buypersion", unlock: 0, cnkey: "getRateTip2", plv: 0 },
            ],
        };
        return _this;
    }
    PlayerUpLimitPopupView.prototype.getTitleStr = function () {
        var type = this.param.data.type;
        return "playerUpLimit" + App.StringUtil.firstCharToUper(type) + "Title";
    };
    PlayerUpLimitPopupView.prototype.initView = function () {
        var _this = this;
        var type = this.param.data.type;
        var bg = BaseBitmap.create("public_9v_bg12");
        this._lineBg = bg;
        bg.width = 526;
        bg.x = this.viewBg.width / 2 - bg.width / 2;
        bg.y = 5;
        this.addChildToContainer(bg);
        var titleBg = BaseBitmap.create("public_ts_bg01");
        this.addChildToContainer(titleBg);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("canGet" + App.StringUtil.firstCharToUper(type) + "Tip", [TextFieldConst.COLOR_WARN_GREEN + ""]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        tipTxt.setPosition(this.viewBg.width * 0.5 - tipTxt.width * 0.5, bg.y + 20);
        this.addChildToContainer(tipTxt);
        titleBg.width = 106 + tipTxt.width;
        titleBg.setPosition(this.viewBg.width * 0.5 - titleBg.width * 0.5, tipTxt.y + (tipTxt.height - titleBg.height) * 0.5);
        var idx = 0;
        var cellH = 130;
        for (var index = 0; index < this._cfg[type].length; index++) {
            var data = this._cfg[type][index];
            if (MainUI.getInstance().getUnlockIndex() >= data.unlock && Api.composemapVoApi.getMaxLv() >= data.plv) {
                var iconKey = data.key.toLowerCase();
                var iconBg = BaseBitmap.create("itembg_3");
                iconBg.setPosition(bg.x + 31, cellH * idx + bg.y + 82);
                this.addChildToContainer(iconBg);
                if (idx > 0) {
                    var line = BaseBitmap.create("public_line4");
                    line.width = 500;
                    line.x = this.viewBg.width * 0.5 - line.width * 0.5;
                    line.y = iconBg.y - line.height * 0.5 - 13;
                    this.addChildToContainer(line);
                }
                var res = "go_" + iconKey;
                var scale = 1;
                var offY = 0;
                if (!ResourceManager.hasRes(res)) {
                    res = "composebiglv1";
                    scale = 0.5;
                    offY = -27;
                }
                var icon = BaseLoadBitmap.create(res);
                icon.setPosition(iconBg.x + 3, iconBg.y + 3 + offY);
                this.addChildToContainer(icon);
                var text = ComponentManager.getTextField(LanguageManager.getlocal(data.cnkey), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
                text.lineSpacing = 3;
                text.setPosition(iconBg.x + iconBg.width + 10, iconBg.y + 10);
                this.addChildToContainer(text);
                var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskGoBtn", function (key) {
                    if (Api[key + "VoApi"] && Api[key + "VoApi"].go) {
                        Api[key + "VoApi"].go();
                    }
                    else {
                        if (key == "challenge") {
                            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_SHOWUNLOCK);
                        }
                        else if (key == "composepersion" || key == "buypersion") {
                            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND);
                        }
                    }
                    _this.hide();
                    ViewController.getInstance().hideView(ViewConst.COMMON.PLAYERVIEW);
                }, this, [data.key]);
                btn.setPosition(bg.x + bg.width - btn.width - 25, iconBg.y + (iconBg.height - btn.height) * 0.5);
                this.addChildToContainer(btn);
                idx++;
            }
        }
    };
    PlayerUpLimitPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this._lineBg.height = this.viewBg.height - 110;
    };
    return PlayerUpLimitPopupView;
}(PopupView));
__reflect(PlayerUpLimitPopupView.prototype, "PlayerUpLimitPopupView");
