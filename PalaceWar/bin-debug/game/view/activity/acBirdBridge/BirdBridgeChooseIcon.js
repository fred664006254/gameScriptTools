var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BirdBridgeChooseIcon = /** @class */ (function (_super) {
    __extends(BirdBridgeChooseIcon, _super);
    function BirdBridgeChooseIcon() {
        var _this = _super.call(this) || this;
        _this._light = null;
        _this._code = null;
        _this.cfg = null;
        return _this;
    }
    BirdBridgeChooseIcon.prototype.init = function (data, gotNum, wishNum, code, f, o) {
        var _this = this;
        this._code = code;
        this.cfg = data;
        var bg = BaseBitmap.create("birdbridge_kuang1-" + code);
        this.addChild(bg);
        var rewardvo = GameData.formatRewardItem(data.getReward)[0];
        var namestr = rewardvo.name;
        if (rewardvo.type == 10) {
            namestr = LanguageManager.getlocal("wifeName_" + rewardvo.id);
        }
        var name = ComponentManager.getTextField(namestr, 20, TextFieldConst.COLOR_QUALITY_ORANGE);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, name, bg, [0, 30]);
        this.addChild(name);
        var icon = GameData.getRewardItemIcons(data.getReward, true)[0];
        icon.setScale(0.8);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon, bg, [0, 65]);
        this.addChild(icon);
        var lessTime = data.limitTime - gotNum;
        var lessTimeText = ComponentManager.getTextField(LanguageManager.getlocal("acBirdBridgeWishGetTime-" + code, [String(lessTime)]), 18);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, lessTimeText, bg, [0, 157]);
        this.addChild(lessTimeText);
        if (lessTime > 0) {
            lessTimeText.textColor = TextFieldConst.COLOR_WARN_GREEN2;
        }
        else {
            lessTimeText.textColor = TextFieldConst.COLOR_QUALITY_RED;
        }
        var wishTimeText = ComponentManager.getTextField(LanguageManager.getlocal("acBirdBridgeWishTime-" + code, [String(wishNum), String(data.needTime)]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        wishTimeText.width = 160;
        wishTimeText.lineSpacing = 3;
        wishTimeText.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, wishTimeText, bg, [0, 193]);
        this.addChild(wishTimeText);
        if (lessTime > 0) {
            var light = BaseBitmap.create("birdbridge_light1-" + code);
            light.height += 47;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, light, bg, [0, 20]);
            this.addChild(light);
            this._light = light;
            light.visible = false;
            bg.addTouchTap(function () {
                f.apply(o, [_this]);
            }, this);
        }
        else {
            App.DisplayUtil.changeToGray(icon);
            var light = BaseBitmap.create("birdbridge_got-" + code);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, light, bg, [0, 135]);
            this.addChild(light);
        }
    };
    BirdBridgeChooseIcon.prototype.setSelect = function (v) {
        if (this._light) {
            this._light.visible = v;
        }
    };
    BirdBridgeChooseIcon.prototype.dispose = function () {
        this._light = null;
        this._code = null;
        this.cfg = null;
        _super.prototype.dispose.call(this);
    };
    return BirdBridgeChooseIcon;
}(BaseDisplayObjectContainer));
//# sourceMappingURL=BirdBridgeChooseIcon.js.map