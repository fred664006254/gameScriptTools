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
 * desc:阵营排行item
*/
var AcThreeKingdomsZrankItem = (function (_super) {
    __extends(AcThreeKingdomsZrankItem, _super);
    function AcThreeKingdomsZrankItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    AcThreeKingdomsZrankItem.prototype.initItem = function (index, data) {
        var view = this;
        view.width = 614;
        view._data = data;
        var rankTitle = BaseBitmap.create("threekingdomszrank" + (index + 1));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, rankTitle, view, [0, 0], true);
        var kingdomid = data.kingdomid;
        var listbg = BaseBitmap.create("threekingdomszranklistbg" + kingdomid);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, rankTitle, [0, 20]);
        view.addChild(listbg);
        view.addChild(rankTitle);
        var shuiyin = BaseBitmap.create("threekingdomszranklistshuiyin" + kingdomid);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, shuiyin, listbg, [10, 40]);
        view.addChild(shuiyin);
        var scoreBitmapTxt = ComponentManager.getBitmapText(data.value, "socre_fnt");
        scoreBitmapTxt.letterSpacing = -7;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, scoreBitmapTxt, listbg, [15, 10]);
        view.addChild(scoreBitmapTxt);
        var scoreBitmap = BaseBitmap.create("threekingdomszranktxt");
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, scoreBitmap, scoreBitmapTxt, [scoreBitmapTxt.width, 0]);
        view.addChild(scoreBitmap);
    };
    AcThreeKingdomsZrankItem.prototype.dispose = function () {
        var view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsZrankItem;
}(ScrollListItem));
__reflect(AcThreeKingdomsZrankItem.prototype, "AcThreeKingdomsZrankItem");
//# sourceMappingURL=AcThreeKingdomsZrankItem.js.map