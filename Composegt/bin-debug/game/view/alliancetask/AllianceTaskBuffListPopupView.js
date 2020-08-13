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
 *帮会任务buff
 * author yanyuling
 * date 2018/07/20
 * @class AllianceTaskBuffListPopupView

 */
var AllianceTaskBuffListPopupView = (function (_super) {
    __extends(AllianceTaskBuffListPopupView, _super);
    function AllianceTaskBuffListPopupView() {
        var _this = _super.call(this) || this;
        _this._scrollView = null;
        return _this;
    }
    AllianceTaskBuffListPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_BUFF), this.refreshWealth, this);
        var wealthTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._wealthTxt = wealthTxt;
        wealthTxt.y = 10;
        this.addChildToContainer(wealthTxt);
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 540;
        bg.height = 560;
        bg.x = this.viewBg.width / 2 - bg.width / 2;
        bg.y = wealthTxt.y + 30;
        this.addChildToContainer(bg);
        wealthTxt.x = bg.x;
        var rect = new egret.Rectangle(0, 0, bg.width - 20, bg.height - 20);
        var list = Config.AlliancetaskCfg.getAllianceTaskBuffIdList();
        this._scrollView = ComponentManager.getScrollList(AllianceTaskBuffScrollItem, list, rect);
        this._scrollView.y = bg.y + 10;
        this._scrollView.x = bg.x + 10;
        ;
        this.addChildToContainer(this._scrollView);
        var tipbg = BaseBitmap.create("public_searchdescbg");
        tipbg.width = 550;
        // tipbg.height = 50;
        tipbg.x = this.viewBg.width / 2 - tipbg.width / 2;
        tipbg.y = 650;
        this.addChildToContainer(tipbg);
        var tipTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.text = LanguageManager.getlocal("allianceTaskbuffTip1");
        tipTxt.x = this.viewBg.width / 2 - tipTxt.width / 2;
        tipTxt.y = tipbg.y + tipbg.height / 2 - tipTxt.height / 2;
        this.addChildToContainer(tipTxt);
        this.refreshWealth();
    };
    AllianceTaskBuffListPopupView.prototype.refreshWealth = function () {
        var wealth = Api.allianceVoApi.getAllianceVo().wealth;
        this._wealthTxt.text = LanguageManager.getlocal("allianceTaskBuffValue", ["" + wealth]);
    };
    AllianceTaskBuffListPopupView.prototype.getShowHeight = function () {
        return 700;
    };
    AllianceTaskBuffListPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "alliance_taskIcon1",
            "alliance_taskIcon2",
            "alliance_taskIcon3",
            "alliance_taskIcon4",
            "alliance_taskIcon5",
        ]);
    };
    AllianceTaskBuffListPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_BUFF), this.refreshWealth, this);
        this._scrollView = null;
        this._wealthTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceTaskBuffListPopupView;
}(PopupView));
__reflect(AllianceTaskBuffListPopupView.prototype, "AllianceTaskBuffListPopupView");
