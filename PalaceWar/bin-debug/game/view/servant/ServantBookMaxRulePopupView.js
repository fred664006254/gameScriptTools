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
  * 书籍详情
  * @author 张朝阳
  * date 2019/6/6
  * @class ServantBookMaxRulePopupView
  */
var ServantBookMaxRulePopupView = (function (_super) {
    __extends(ServantBookMaxRulePopupView, _super);
    function ServantBookMaxRulePopupView() {
        return _super.call(this) || this;
    }
    ServantBookMaxRulePopupView.prototype.initView = function () {
        var bookMaxLv = this.param.data.bookMaxLv;
        var bookextraLevelMax = this.param.data.bookextraLevelMax;
        var bookextraLevelMax2 = this.param.data.bookextraLevelMax2;
        var booknowLv = this.param.data.booknowLv;
        var baseLv = booknowLv - bookextraLevelMax - bookextraLevelMax2;
        var maxLv = bookMaxLv - bookextraLevelMax - bookextraLevelMax2;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 150;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 15;
        this.addChildToContainer(bg);
        var descTF1 = ComponentManager.getTextField(LanguageManager.getlocal("servantBookMaxRulePopupViewNowLv", [String(booknowLv), String(bookMaxLv)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTF1.setPosition(bg.x + 100, bg.y + 25);
        this.addChildToContainer(descTF1);
        var descTF2 = ComponentManager.getTextField(LanguageManager.getlocal("servantBookMaxRulePopupViewStyLv", [String(bookextraLevelMax)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTF2.setPosition(descTF1.x, descTF1.y + descTF1.height + 17);
        this.addChildToContainer(descTF2);
        var descTF3 = ComponentManager.getTextField(LanguageManager.getlocal("servantBookMaxRulePopupViewBaseLv", [String(baseLv), String(maxLv)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTF3.setPosition(descTF2.x, descTF2.y + descTF2.height + 17);
        this.addChildToContainer(descTF3);
        if (Api.switchVoApi.checkOpenWifeBattle()) {
            var descTF4 = ComponentManager.getTextField(LanguageManager.getlocal("servantBookMaxRulePopupViewStyLv2", [String(bookextraLevelMax2)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            descTF4.setPosition(descTF2.x, descTF2.y + descTF2.height + 17);
            this.addChildToContainer(descTF4);
            descTF3.setPosition(descTF4.x, descTF4.y + descTF4.height + 17);
            bg.height = 190;
        }
        var btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        btn.setPosition(bg.x + bg.width / 2 - btn.width / 2, bg.y + bg.height + 10);
        this.addChildToContainer(btn);
    };
    ServantBookMaxRulePopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ServantBookMaxRulePopupView;
}(PopupView));
__reflect(ServantBookMaxRulePopupView.prototype, "ServantBookMaxRulePopupView");
//# sourceMappingURL=ServantBookMaxRulePopupView.js.map