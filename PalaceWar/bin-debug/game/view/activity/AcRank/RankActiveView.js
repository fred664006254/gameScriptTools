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
 * 冲榜
 * author dky
 * date 2018/2/27
 * @class RankActiveView
 */
var RankActiveView = (function (_super) {
    __extends(RankActiveView, _super);
    function RankActiveView() {
        return _super.call(this) || this;
    }
    RankActiveView.prototype.initView = function () {
        var bottomBg = BaseBitmap.create("public_9_bg23");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth - 105;
        bottomBg.x = 0;
        bottomBg.y = -7;
        this.addChildToContainer(bottomBg);
        var achList = Api.acVoApi.getRanActives();
        // this._oldList = achList;
        achList.sort(function (a, b) { return a['sortId'] - b['sortId']; });
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, bottomBg.width, bottomBg.height - 8);
        this._scrollList = ComponentManager.getScrollList(RankActiveScrollItem, achList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.x = bottomBg.x + bottomBg.width / 2 - this._scrollList.width / 2 + 4;
        this._scrollList.y = bottomBg.y + bottomBg.height / 2 - this._scrollList.height / 2;
        // this._scrollList.addTouchTap(this.clickItemHandler, this);
    };
    RankActiveView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress5", "progress3_bg", "progress6", "progress6_bg",
            "achievement_state1", "achievement_state2", "achievement_state3",
            "ranactivecellbg", "rankactivenamebg",
            "rankbgs_1", "rankbgs_2", "rankbgs_3",
            "rankinglist_rankn1",
            "rankinglist_rankn2",
            "rankinglist_rankn3",
        ]);
    };
    RankActiveView.prototype.dispose = function () {
        // Api.rookieVoApi.checkWaitingGuide();
        this._scrollList = null;
        // this._achievementInfoVoList = null;
        this._achId = null;
        // this._oldList = null;
        _super.prototype.dispose.call(this);
    };
    return RankActiveView;
}(CommonView));
__reflect(RankActiveView.prototype, "RankActiveView");
//# sourceMappingURL=RankActiveView.js.map