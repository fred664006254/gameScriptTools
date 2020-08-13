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
 * author:qianjun
 * desc:粮草信息item
*/
var AcThreeKingdomsFoodItem = (function (_super) {
    __extends(AcThreeKingdomsFoodItem, _super);
    function AcThreeKingdomsFoodItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    AcThreeKingdomsFoodItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view.width = 629;
        view.height = 45;
        view._data = data;
        var code = itemparam;
        // let listbg = BaseBitmap.create(`threekingdomszranklistbg${kingdomid}`);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, rankTitle, [0,20]);
        // view.addChild(listbg);
        // view.addChild(rankTitle);
        var rank = data.rank[0] == data.rank[1] ? "" + data.rank[0] : data.rank[0] + "-" + data.rank[1];
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRank3Tip3", code), [rank, data.food2.toString()]), 20);
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tipTxt, view, [30, 0], true);
        var line = BaseBitmap.create("public_line1");
        view.addChild(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, line, view, [10, 0], true);
    };
    AcThreeKingdomsFoodItem.prototype.dispose = function () {
        var view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsFoodItem;
}(ScrollListItem));
__reflect(AcThreeKingdomsFoodItem.prototype, "AcThreeKingdomsFoodItem");
//# sourceMappingURL=AcThreeKingdomsFoodItem.js.map