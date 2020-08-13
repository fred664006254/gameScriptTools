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
var AcJadeViewTab1 = (function (_super) {
    __extends(AcJadeViewTab1, _super);
    function AcJadeViewTab1() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._aidAndCode = null;
        _this.initView();
        return _this;
    }
    AcJadeViewTab1.prototype.initView = function () {
        this._aidAndCode = { "aid": this.aid, "code": this.code };
        var rect = new egret.Rectangle(0, 0, 612, GameConfig.stageHeigth - this.getViewTitleButtomY() - 50 - 47);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rankList = cfg.getRankList();
        this._scrollList = ComponentManager.getScrollList(AcJadeViewRankScrollItem, rankList, rect, this._aidAndCode);
        // this._scrollList.setPosition(15,15);
        this._scrollList.y = 3;
        this._scrollList.x = GameConfig.stageWidth / 2 - this._scrollList.width / 2;
        this.addChild(this._scrollList);
        var bottomBg = BaseBitmap.create("adult_lowbg");
        bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width / 2;
        bottomBg.y = GameConfig.stageHeigth - 486 - bottomBg.height - 12;
        this.addChild(bottomBg);
        var tabText = ComponentManager.getTextField(LanguageManager.getlocal("acJadeViewBottomTip1"), 20, 0xdc9740);
        tabText.x = bottomBg.x + bottomBg.width / 2 - tabText.width / 2;
        tabText.y = bottomBg.y + bottomBg.height / 2 - tabText.height / 2;
        this.addChild(tabText);
    };
    AcJadeViewTab1.prototype.dispose = function () {
        this._scrollList = null;
        this._aidAndCode = null;
        _super.prototype.dispose.call(this);
    };
    return AcJadeViewTab1;
}(AcCommonViewTab));
__reflect(AcJadeViewTab1.prototype, "AcJadeViewTab1");
