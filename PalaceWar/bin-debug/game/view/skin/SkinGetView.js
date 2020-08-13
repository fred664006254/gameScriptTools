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
var SkinGetView = (function (_super) {
    __extends(SkinGetView, _super);
    function SkinGetView() {
        return _super.call(this) || this;
    }
    SkinGetView.prototype.initView = function () {
        var re_data = this.param.data.rewards;
        var tailor_get_light = BaseBitmap.create("tailor_get_light");
        tailor_get_light.anchorOffsetX = tailor_get_light.width / 2;
        tailor_get_light.anchorOffsetY = tailor_get_light.height / 2;
        tailor_get_light.x = GameConfig.stageWidth / 2;
        tailor_get_light.y = 100 + tailor_get_light.height / 2;
        egret.Tween.get(tailor_get_light, { loop: true }).to({ rotation: 360 }, 5000);
        this.addChild(tailor_get_light);
        var tailor_get_light2 = BaseBitmap.create("tailor_get_light");
        tailor_get_light2.anchorOffsetX = tailor_get_light2.width / 2;
        tailor_get_light2.anchorOffsetY = tailor_get_light2.height / 2;
        tailor_get_light2.x = tailor_get_light.x;
        tailor_get_light2.y = tailor_get_light.y;
        egret.Tween.get(tailor_get_light2, { loop: true }).to({ rotation: -360 }, 5000);
        this.addChild(tailor_get_light2);
        var tailor_get_word = BaseBitmap.create("skin_make_word");
        tailor_get_word.anchorOffsetX = tailor_get_word.width / 2;
        tailor_get_word.anchorOffsetY = tailor_get_word.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tailor_get_word, tailor_get_light, [0, 108]);
        this.addChild(tailor_get_word);
        //"6_1150_4|6_1710_1";
        var bottomBg = BaseBitmap.create("public_9_wordbg");
        bottomBg.height = 310;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bottomBg, tailor_get_word, [0, tailor_get_word.height]);
        this.addChild(bottomBg);
        var exchange = '';
        var name = '';
        if (re_data.servantId) {
            exchange = re_data.exchangeItem;
            name = re_data.getSkinName();
        }
        else {
            exchange = re_data.claim;
            name = re_data.name;
        }
        var itemvo = GameData.formatRewardItem(exchange)[0];
        var text = ComponentManager.getTextField(LanguageManager.getlocal("skinViewMakeSucTip" + (re_data.servantId ? 2 : 1), [itemvo.num.toString(), itemvo.name, name]), 20);
        text.textAlign = egret.HorizontalAlign.CENTER;
        text.lineSpacing = 5;
        this.addChild(text);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, text, bottomBg, [0, 55]);
        var scroStartY = text.y + text.textHeight + 35;
        var element = GameData.getIconContainer(re_data.icon, 'itembg_7');
        element.anchorOffsetX = element.width / 2;
        element.anchorOffsetY = element.height / 2;
        element.x = GameConfig.stageWidth / 2;
        element.y = scroStartY + element.height / 2; // + 40;
        this.addChild(element);
        var okBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        okBtn.x = (GameConfig.stageWidth - okBtn.width) / 2;
        okBtn.y = bottomBg.y + bottomBg.height + 50;
        this.addChild(okBtn);
    };
    SkinGetView.prototype.hide = function () {
        if (this.param.data.callback) {
            this.param.data.callback.apply(this.param.data.callobj);
        }
        _super.prototype.hide.call(this);
    };
    SkinGetView.prototype.getShowHeight = function () {
        return 300;
    };
    SkinGetView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            'public_9_wordbg2', "tailor_get_light",
            "tailor_get_bg",
            "skin_make_word"
        ]);
    };
    SkinGetView.prototype.isTouchMaskClose = function () {
        return true;
    };
    SkinGetView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return SkinGetView;
}(BaseView));
__reflect(SkinGetView.prototype, "SkinGetView");
//# sourceMappingURL=SkinGetView.js.map