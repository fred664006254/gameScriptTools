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
var RankBiographyScrollItem = (function (_super) {
    __extends(RankBiographyScrollItem, _super);
    function RankBiographyScrollItem() {
        return _super.call(this) || this;
    }
    RankBiographyScrollItem.prototype.initItem = function (index, info) {
        var posy = 0;
        if (info.t) {
            var toppic = BaseBitmap.create("biographyview_bg" + info.t);
            this.addChild(toppic);
            posy = toppic.height;
        }
        var bg1 = BaseBitmap.create("biographyview_bg5");
        bg1.y = posy;
        this.addChild(bg1);
        var bg = BaseBitmap.create("biography_shelf");
        bg.y = posy;
        this.addChild(bg);
        bg1.height = bg.height;
        var data = info.data;
        var leftContainer = Api.biographyVoApi.getBookInfoContainerByInfo(data[0]);
        leftContainer.setPosition(43, posy + 10);
        this.addChild(leftContainer);
        leftContainer.addTouchTap(this.showInfo, this, data[0]);
        if (data[1]) {
            var rightContainer = Api.biographyVoApi.getBookInfoContainerByInfo(data[1]);
            rightContainer.setPosition(328, posy + 10);
            this.addChild(rightContainer);
            rightContainer.addTouchTap(this.showInfo, this, data[1]);
        }
        this.height = bg.y + bg.height;
    };
    RankBiographyScrollItem.prototype.showInfo = function (event, data) {
        Api.biographyVoApi.showInfo = data;
        ViewController.getInstance().openView(ViewConst.COMMON.BIOGRAPHYSHOWVIEW, {});
    };
    RankBiographyScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return RankBiographyScrollItem;
}(ScrollListItem));
__reflect(RankBiographyScrollItem.prototype, "RankBiographyScrollItem");
//# sourceMappingURL=RankBiographyScrollItem.js.map