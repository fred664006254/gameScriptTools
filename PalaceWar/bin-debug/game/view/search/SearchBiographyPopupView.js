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
var SearchBiographyPopupView = (function (_super) {
    __extends(SearchBiographyPopupView, _super);
    function SearchBiographyPopupView() {
        var _this = _super.call(this) || this;
        _this._biographylist = [];
        return _this;
    }
    SearchBiographyPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "biographyview", "biographyview_attic_bg", "biographyview_attic", "biographyview_atticbg2",
        ]);
    };
    SearchBiographyPopupView.prototype.getBgName = function () {
        return "biographyview_attic_bg";
    };
    SearchBiographyPopupView.prototype.getTitleStr = function () {
        return null;
    };
    SearchBiographyPopupView.prototype.getBgExtraHeight = function () {
        return 0;
    };
    SearchBiographyPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_SEARCH_GETBIOGRAPHY, requestData: {} };
    };
    SearchBiographyPopupView.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.data.biographylist && data.data.data.biographylist.length > 0) {
                this._biographylist = data.data.data.biographylist;
            }
        }
    };
    SearchBiographyPopupView.prototype.initView = function () {
        var title = BaseBitmap.create("biographyview_attic");
        title.setPosition(this.viewBg.width / 2 - title.width / 2, 0);
        this.addChildToContainer(title);
        this.closeBtn.y -= 10;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 524, 758);
        this._biographylist.sort(function (a, b) {
            var cfga = Config.BiographyCfg.getCfgBgId(a.id);
            var cfgb = Config.BiographyCfg.getCfgBgId(b.id);
            if (cfga.type != cfgb.type) {
                return cfgb.type - cfga.type;
            }
            if (a.sortID > b.sortID) {
                return 1;
            }
            else if (a.sortID == b.sortID) {
                if (App.DateUtil.isSameDay(b.st, a.st)) {
                    return b.power - a.power;
                }
                else {
                    return b.st - a.st;
                }
            }
            return -1;
        });
        var scrollList = ComponentManager.getScrollList(SearchBiographyScrollItem, this._biographylist, rect, null, null, null, true);
        scrollList.setPosition(this.viewBg.width / 2 - rect.width / 2, 77);
        this.addChildToContainer(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
    };
    SearchBiographyPopupView.prototype.dispose = function () {
        this._biographylist.length = 0;
        _super.prototype.dispose.call(this);
    };
    return SearchBiographyPopupView;
}(PopupView));
__reflect(SearchBiographyPopupView.prototype, "SearchBiographyPopupView");
//# sourceMappingURL=SearchBiographyPopupView.js.map