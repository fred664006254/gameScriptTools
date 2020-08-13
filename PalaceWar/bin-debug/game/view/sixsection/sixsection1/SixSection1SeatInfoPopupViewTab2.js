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
* 防守信息
* date 2020.5.13
* author ycg
* @name SixSection1SeatInfoPopupViewTab2
*/
var SixSection1SeatInfoPopupViewTab2 = (function (_super) {
    __extends(SixSection1SeatInfoPopupViewTab2, _super);
    function SixSection1SeatInfoPopupViewTab2(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    SixSection1SeatInfoPopupViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION1_GETDINFO, this.getDinfoCallback, this);
        NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_GETDINFO, {});
        this.width = 530;
        this.height = 675;
        var bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 675;
        bg.x = 26;
        bg.y = 55;
        this.addChild(bg);
        var data = [];
        var scrollList = ComponentManager.getScrollList(SixSection1SeatInfoScrollItem2, data, new egret.Rectangle(0, 0, bg.width, bg.height - 10));
        scrollList.setPosition(bg.x, bg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        var tipBg = BaseBitmap.create("sixsection1_popbottombg");
        tipBg.setPosition(bg.x + bg.width / 2 - tipBg.width / 2, bg.y + bg.height - 105);
        this.addChild(tipBg);
    };
    SixSection1SeatInfoPopupViewTab2.prototype.getDinfoCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        var data = evt.data.data.data;
        console.log("getDinfoCallback", data);
        // let buildCfg 
        var dataList = data.dinfo;
        if (dataList.length > 1) {
            dataList.sort(function (a, b) {
                return b.fightst - a.fightst;
            });
        }
        this._scrollList.refreshData(dataList);
    };
    SixSection1SeatInfoPopupViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_GETDINFO, this.getDinfoCallback, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return SixSection1SeatInfoPopupViewTab2;
}(CommonViewTab));
__reflect(SixSection1SeatInfoPopupViewTab2.prototype, "SixSection1SeatInfoPopupViewTab2");
//# sourceMappingURL=SixSection1SeatInfoPopupViewTab2.js.map