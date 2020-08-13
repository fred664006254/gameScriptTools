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
var AcJadeViewTab2 = (function (_super) {
    __extends(AcJadeViewTab2, _super);
    function AcJadeViewTab2() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._aidAndCode = null;
        _this._rankList = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcJadeViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcJadeViewTab2.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACJADE_REFRESHVO, this.refreshData, this);
        this._aidAndCode = { "aid": this.aid, "code": this.code };
        var rect = new egret.Rectangle(0, 0, 612, GameConfig.stageHeigth - this.getViewTitleButtomY() - 50 - 47);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        this._rankList = cfg.getTotalList();
        var rankO = null;
        for (var i = this._rankList.length - 1; i >= 0; i--) {
            rankO = this._rankList[i];
            if (rankO.rankV2 != -1 && rankO.rankV2 < this.vo.getRechargeValue()) {
                this._rankList.splice(i, 1);
            }
        }
        this._scrollList = ComponentManager.getScrollList(AcJadeViewTotalScrollItem, this._rankList, rect, this._aidAndCode);
        this._scrollList.setScrollTopByIndex(this._rankList.length - 1);
        this._scrollList.y = 3;
        this._scrollList.x = GameConfig.stageWidth / 2 - this._scrollList.width / 2;
        this.addChild(this._scrollList);
        var bottomBg = BaseBitmap.create("adult_lowbg");
        bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width / 2;
        bottomBg.y = GameConfig.stageHeigth - 486 - bottomBg.height - 12;
        this.addChild(bottomBg);
        var tabText = ComponentManager.getTextField(LanguageManager.getlocal("acJadeViewBottomTip2"), 20, 0xdc9740);
        tabText.x = bottomBg.x + bottomBg.width / 2 - tabText.width / 2;
        tabText.y = bottomBg.y + bottomBg.height / 2 - tabText.height / 2;
        this.addChild(tabText);
    };
    AcJadeViewTab2.prototype.refreshData = function () {
        if (this._rankList) {
            var rankO = null;
            for (var i = this._rankList.length - 1; i >= 0; i--) {
                rankO = this._rankList[i];
                if (rankO.rankV2 != -1 && rankO.rankV2 < this.vo.getRechargeValue()) {
                    this._rankList.splice(i, 1);
                }
            }
            this._scrollList.refreshData(this._rankList, this._aidAndCode);
            this._scrollList.setScrollTopByIndex(this._rankList.length - 1);
        }
    };
    AcJadeViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACJADE_REFRESHVO, this.refreshData, this);
        this._scrollList = null;
        this._aidAndCode = null;
        this._rankList = null;
        _super.prototype.dispose.call(this);
    };
    return AcJadeViewTab2;
}(AcCommonViewTab));
__reflect(AcJadeViewTab2.prototype, "AcJadeViewTab2");
