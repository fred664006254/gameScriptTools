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
        var bottomBg = BaseBitmap.create("commonview_woodbg");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth - 69;
        bottomBg.x = 0;
        bottomBg.y = 69;
        this.addChildToContainer(bottomBg);
        var foot = BaseBitmap.create("commonview_bottom");
        foot.x = 0;
        foot.y = bottomBg.y + bottomBg.height - foot.height;
        this.addChildToContainer(foot);
        var achList = Api.acVoApi.getRanActives();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 636, bottomBg.height - 41);
        var overList = [];
        var removeObj = null;
        for (var i = achList.length - 1; i >= 0; i--) {
            if (achList[i].et - 86400 - GameData.serverTime <= 0) {
                removeObj = achList[i];
                achList.splice(i, 1);
                overList.push(removeObj);
            }
        }
        var curOverList = [];
        for (var j = overList.length - 1; j >= 0; j--) {
            curOverList.push(overList[j]);
        }
        this._scrollList = ComponentManager.getScrollList(RankActiveScrollItem, achList.concat(curOverList), rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.x = GameConfig.stageWidth / 2 - this._scrollList.width / 2;
        this._scrollList.y = 80;
        // let bottomBgFrame = BaseBitmap.create("public_9v_bg03");
        // bottomBgFrame.width = 640;
        // bottomBgFrame.height = GameConfig.stageHeigth - 70;
        // bottomBgFrame.x = 0;
        // bottomBgFrame.y = 70;
        // this.addChild(bottomBgFrame); 
    };
    RankActiveView.prototype.getTitleBgName = function () {
        return "commonview_titlebg2";
    };
    RankActiveView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "achievement_state1", "achievement_state2", "achievement_state3",
            ,
            "rechargevie_db_01",
            "activity_charge_red", "recharge_diban_01",
            "commonview_titlebg2",
            "commonview_woodbg",
            "commonview_bottom",
            "activity_rank_listbg",
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
