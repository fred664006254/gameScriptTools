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
var BanishChoosePopupView = (function (_super) {
    __extends(BanishChoosePopupView, _super);
    function BanishChoosePopupView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        return _this;
    }
    BanishChoosePopupView.prototype.initView = function () {
        this._callbackF = this.param.data.f;
        this._obj = this.param.data.o;
        var desc1 = ComponentManager.getTextField(LanguageManager.getlocal("banish_desc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        desc1.width = 520;
        desc1.setPosition(this.viewBg.width / 2 - desc1.width / 2, 20);
        this.addChildToContainer(desc1);
        var bg = BaseBitmap.create("public_9_bg32");
        bg.width = this.viewBg.width - 50 - GameData.popupviewOffsetX * 2;
        bg.height = 875 - desc1.height - 100;
        bg.setPosition(25 + GameData.popupviewOffsetX, desc1.y + desc1.height + 14);
        this.addChildToContainer(bg);
        var allWife = Api.wifeVoApi.getWifeInfoVoList();
        var wifeInfoTab = [];
        for (var i = 0; i < allWife.length; i++) {
            var vo = allWife[i];
            wifeInfoTab.push({ wifeId: String(vo.id), intimacy: vo.intimacy, charm: vo.glamour, isBanishing: Api.wifebanishVoApi.getIsWifeBanishing(String(vo.id)), f: this.clickHandle, o: this });
        }
        wifeInfoTab.sort(function (a, b) {
            if (a.isBanishing == b.isBanishing) {
                return a.intimacy - b.intimacy;
            }
            else {
                return a.isBanishing - b.isBanishing;
            }
        });
        var rect = new egret.Rectangle(0, 0, this.viewBg.width - 56, bg.height - 6);
        var scrollList = ComponentManager.getScrollList(BanishChooseItem, wifeInfoTab, rect);
        scrollList.setPosition(bg.x + 3, bg.y + 3);
        this.addChildToContainer(scrollList);
    };
    BanishChoosePopupView.prototype.clickHandle = function (wifeId) {
        this._callbackF.apply(this._obj, [wifeId]);
        this.hide();
    };
    BanishChoosePopupView.prototype.getTitleStr = function () {
        return "banish_choose";
    };
    BanishChoosePopupView.prototype.getBgExtraHeight = function () {
        return 10;
    };
    BanishChoosePopupView.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return BanishChoosePopupView;
}(PopupView));
__reflect(BanishChoosePopupView.prototype, "BanishChoosePopupView");
//# sourceMappingURL=BanishChoosePopupView.js.map