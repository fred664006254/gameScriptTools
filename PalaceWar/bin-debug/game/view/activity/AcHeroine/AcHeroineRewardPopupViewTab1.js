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
 * 巾帼英雄充值奖励
 */
var AcHeroineRewardPopupViewTab1 = (function (_super) {
    __extends(AcHeroineRewardPopupViewTab1, _super);
    function AcHeroineRewardPopupViewTab1() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    AcHeroineRewardPopupViewTab1.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_HEROINE_RECHARGE, this.requestCallback, this);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 532;
        bg.height = 670;
        bg.setPosition(34, 50);
        this.addChild(bg);
        var dataList = this.vo.getSortRechargeCfg();
        var rect = new egret.Rectangle(0, 0, bg.width - 10, bg.height - 14);
        var scrollList = ComponentManager.getScrollList(AcHeroineRewardPopupTab1ScrollItem, dataList, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(bg.x + 5, bg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        // let id = this.param.data.id;
        // if (id) {
        // 	for (let i = 0; i < dataList.length; i++) {
        // 		if (dataList[i].id == id) {
        // 			this._scrollList.setScrollTopByIndex(i, 1000);
        // 			break;
        // 		}
        // 	}
        // }
    };
    AcHeroineRewardPopupViewTab1.prototype.requestCallback = function (event) {
        if (event && event.data && event.data.ret) {
            var rData = event.data.data.data;
            var rewards = rData.rewards;
            if (rData.specialGift) {
                rewards = "1034_0_" + rData.specialGift + "_" + this.getTypeCode() + "|" + rewards;
            }
            var rewardVoList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
            if (rData.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
            }
        }
    };
    AcHeroineRewardPopupViewTab1.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        var dataList = this.vo.getSortRechargeCfg();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
    };
    Object.defineProperty(AcHeroineRewardPopupViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcHeroineRewardPopupViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcHeroineRewardPopupViewTab1.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        else if (this.code == "4") {
            return "3";
        }
        else if (this.code == "6") {
            return "5";
        }
        else if (this.code == "8") {
            return "7";
        }
        else if (this.code == "10") {
            return "9";
        }
        return this.code;
    };
    AcHeroineRewardPopupViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_HEROINE_RECHARGE, this.requestCallback, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcHeroineRewardPopupViewTab1;
}(AcCommonViewTab));
__reflect(AcHeroineRewardPopupViewTab1.prototype, "AcHeroineRewardPopupViewTab1");
//# sourceMappingURL=AcHeroineRewardPopupViewTab1.js.map