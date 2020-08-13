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
* 我的据点
* date 2020.5.13
* author ycg
* @name SixSection1SeatInfoPopupViewTab1
*/
var SixSection1SeatInfoPopupViewTab1 = (function (_super) {
    __extends(SixSection1SeatInfoPopupViewTab1, _super);
    function SixSection1SeatInfoPopupViewTab1(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    SixSection1SeatInfoPopupViewTab1.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION1_COLLECT, this.collectCallback, this);
        this.width = 530;
        this.height = 675;
        var bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 675;
        bg.x = 26;
        bg.y = 55;
        this.addChild(bg);
        var data = Api.sixsection1VoApi.getSortMyBuildData();
        var scrollList = ComponentManager.getScrollList(SixSection1SeatInfoScrollItem1, data, new egret.Rectangle(0, 0, bg.width, bg.height - 10));
        scrollList.setPosition(bg.x, bg.y + 5);
        this.addChild(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        this._scrollList = scrollList;
        var tipBg = BaseBitmap.create("sixsection1_popbottombg");
        tipBg.setPosition(bg.x + bg.width / 2 - tipBg.width / 2, bg.y + bg.height - 105);
        this.addChild(tipBg);
        var tip = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SeatInfoPointGoTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tip.setPosition(tipBg.x + tipBg.width / 2 - tip.width / 2, tipBg.y + tipBg.height - 38);
        this.addChild(tip);
    };
    SixSection1SeatInfoPopupViewTab1.prototype.refreshWhenSwitchBack = function () {
        App.LogUtil.log("SixSection1SeatInfoPopupViewTab1 refreshWhenSwitchBack");
        var dataList = Api.sixsection1VoApi.getSortMyBuildData();
        this._scrollList.refreshData(dataList);
    };
    SixSection1SeatInfoPopupViewTab1.prototype.collectCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        var data = evt.data.data.data;
        App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1SeatInfoCollectGet", ["" + data.getResource]));
        // console.log("collectCallback ", data);
        if (data.map) {
            Api.sixsection1VoApi.setMapInfo(data.map);
        }
        var dataList = Api.sixsection1VoApi.getSortMyBuildData();
        this._scrollList.refreshData(dataList);
    };
    SixSection1SeatInfoPopupViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_COLLECT, this.collectCallback, this);
        _super.prototype.dispose.call(this);
    };
    return SixSection1SeatInfoPopupViewTab1;
}(CommonViewTab));
__reflect(SixSection1SeatInfoPopupViewTab1.prototype, "SixSection1SeatInfoPopupViewTab1");
//# sourceMappingURL=SixSection1SeatInfoPopupViewTab1.js.map