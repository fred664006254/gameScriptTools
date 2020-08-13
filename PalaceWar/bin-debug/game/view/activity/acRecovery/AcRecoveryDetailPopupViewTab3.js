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
 * 奖池
 * author ycg
 * date 2020.2.26
 * @class AcRecoveryDetailPopupViewTab3
 */
var AcRecoveryDetailPopupViewTab3 = (function (_super) {
    __extends(AcRecoveryDetailPopupViewTab3, _super);
    function AcRecoveryDetailPopupViewTab3(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcRecoveryDetailPopupViewTab3.prototype.initView = function () {
        var rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 680;
        rewardBg.setPosition(25, 50);
        this.addChild(rewardBg);
        var topBg = BaseBitmap.create("public_9_bg91");
        topBg.width = rewardBg.width - 20;
        topBg.setPosition(rewardBg.x + rewardBg.width / 2 - topBg.width / 2, rewardBg.y + 8);
        this.addChild(topBg);
        var topMsg = ComponentManager.getTextField(LanguageManager.getlocal("acRecoveryPoolInfo-" + this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        topMsg.setPosition(topBg.x + topBg.width / 2 - topMsg.width / 2, topBg.y + topBg.height / 2 - topMsg.height / 2);
        this.addChild(topMsg);
        var dataList = this.cfg.getPoolListCfg();
        var rect = new egret.Rectangle(0, 0, 530, 660 - topBg.height);
        var scrollList = ComponentManager.getScrollList(AcRecoveryDetailTab3ScrollItem, dataList, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(25, topBg.y + topBg.height + 7);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    };
    AcRecoveryDetailPopupViewTab3.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcRecoveryDetailPopupViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRecoveryDetailPopupViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRecoveryDetailPopupViewTab3.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRecoveryDetailPopupViewTab3.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcRecoveryDetailPopupViewTab3.prototype.dispose = function () {
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcRecoveryDetailPopupViewTab3;
}(CommonViewTab));
__reflect(AcRecoveryDetailPopupViewTab3.prototype, "AcRecoveryDetailPopupViewTab3");
//# sourceMappingURL=AcRecoveryDetailPopupViewTab3.js.map