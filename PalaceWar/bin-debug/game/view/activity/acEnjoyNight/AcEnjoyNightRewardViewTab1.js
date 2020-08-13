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
// TypeScript file
var AcEnjoyNightRewardViewTab1 = (function (_super) {
    __extends(AcEnjoyNightRewardViewTab1, _super);
    function AcEnjoyNightRewardViewTab1() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcEnjoyNightRewardViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightRewardViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightRewardViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightRewardViewTab1.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcEnjoyNightView');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightRewardViewTab1.prototype, "uicode", {
        get: function () {
            return this.uiCode;
        },
        enumerable: true,
        configurable: true
    });
    AcEnjoyNightRewardViewTab1.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTGETRECHARGERWD), this.useCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.restList, this);
        var bottomBg2 = BaseBitmap.create("public_9_bg32");
        bottomBg2.height = GameConfig.stageHeigth - 169;
        bottomBg2.width = GameConfig.stageWidth - 32;
        bottomBg2.x = GameConfig.stageWidth / 2 - bottomBg2.width / 2;
        bottomBg2.y = 10;
        this.addChild(bottomBg2);
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomBg2.height - 10);
        var newArr = this.getArr();
        var scrollList = ComponentManager.getScrollList(EnjoyNightRewardScrollItem, newArr, rect, { aid: this.aid, code: this.code, uicode: this.uicode });
        scrollList.x = 20;
        scrollList.y = 5 + bottomBg2.y;
        this.addChild(scrollList);
        this._scrollList = scrollList;
    };
    AcEnjoyNightRewardViewTab1.prototype.restList = function () {
        var newarr = this.getArr();
        this._scrollList.refreshData(newarr, { aid: this.aid, code: this.code, uicode: this.uicode });
    };
    AcEnjoyNightRewardViewTab1.prototype.getArr = function () {
        var keys = Object.keys(this.cfg.recharge);
        var arr = [];
        var arr2 = [];
        for (var i in keys) {
            var currRe = this.cfg.recharge[keys[i]];
            var myRechargeNum = this.vo.getRechargeNum();
            if (this.vo.getRechargeFlag(currRe.id) == false && myRechargeNum >= currRe.needGem) {
                arr.push(currRe);
            }
            else {
                arr2.push(currRe);
            }
        }
        var newarr = [];
        newarr = arr2.concat(arr);
        return newarr;
    };
    AcEnjoyNightRewardViewTab1.prototype.useCallback = function (event) {
        if (event.data.ret) {
            var rewards = "";
            rewards = this.vo.tmpReward;
            App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(rewards));
        }
    };
    AcEnjoyNightRewardViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTGETRECHARGERWD), this.useCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.restList, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcEnjoyNightRewardViewTab1;
}(AcCommonViewTab));
__reflect(AcEnjoyNightRewardViewTab1.prototype, "AcEnjoyNightRewardViewTab1");
//# sourceMappingURL=AcEnjoyNightRewardViewTab1.js.map