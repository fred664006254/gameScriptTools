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
 * 麦田飘香，大宝箱预览
 * author 赵占涛
 */
var AcRyeHarvestBigBoxPopupView = (function (_super) {
    __extends(AcRyeHarvestBigBoxPopupView, _super);
    function AcRyeHarvestBigBoxPopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        return _this;
    }
    Object.defineProperty(AcRyeHarvestBigBoxPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRyeHarvestBigBoxPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRyeHarvestBigBoxPopupView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRyeHarvestBigBoxPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRyeHarvestBigBoxPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcRyeHarvestBigBoxPopupView.prototype.getTitleStr = function () {
        return "taskViewTitle";
    };
    AcRyeHarvestBigBoxPopupView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 2:
                code = '1';
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcRyeHarvestBigBoxPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RYEHARVEST_FRESH_ITEM, this.refreashView, this);
        var view = this;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 538;
        bg.height = 835;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 10;
        this._nodeContainer.addChild(bg);
        var rect = new egret.Rectangle(0, 0, 518, bg.height - 23);
        this._scrollList = ComponentManager.getScrollList(AcRyeHarvestBigBoxItem, this.cfg.bigPrize, rect, this.code);
        this._scrollList.setPosition(bg.x + bg.width / 2 - this._scrollList.width / 2, bg.y + 10);
        this.addChildToContainer(this._scrollList);
    };
    AcRyeHarvestBigBoxPopupView.prototype.sortFunc = function (a, b) {
        var lqua = a.isGet;
        var lqub = b.isGet;
        if ((lqua && lqub) || !(lqua || lqub)) {
            return a.needGem - b.needGem;
        }
        else if (lqua) {
            return 1;
        }
        else if (lqub) {
            return -1;
        }
    };
    /**
     * 领奖回调
     */
    AcRyeHarvestBigBoxPopupView.prototype.christmasTaskRewardHandel = function (event) {
        var view = this;
        if (event.data.ret) {
            // taskId
            var list = [];
            var rechargeId = view.vo.selIdx;
            var starnum = view.cfg.task[rechargeId].specialGift;
            if (starnum) {
                var icon = "motherdayicon1-" + view.getUiCode();
                var starItem = { icon: icon, tipMessage: "+" + String(starnum), type: 0 };
                list.push(starItem);
            }
            var reward = event.data.data.data.rewards;
            var rewardVo = GameData.formatRewardItem(reward);
            for (var key in rewardVo) {
                var item = { icon: rewardVo[key].icon, tipMessage: rewardVo[key].tipMessage, type: rewardVo[key].type };
                list.push(item);
            }
            App.CommonUtil.playRewardFlyAction(list);
        }
    };
    AcRyeHarvestBigBoxPopupView.prototype.refreashView = function () {
        var view = this;
        this._scrollList.refreshData(this.cfg.bigPrize, this.code);
    };
    AcRyeHarvestBigBoxPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acmidautumnview_titlebg", "progress3_bg", "progress3",
            "activity_db_01", "activity_charge_red", "progress_type1_yellow", "progress_type1_bg"
        ]);
    };
    AcRyeHarvestBigBoxPopupView.prototype.getShowHeight = function () {
        return 935;
    };
    AcRyeHarvestBigBoxPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RYEHARVEST_FRESH_ITEM, this.refreashView, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcRyeHarvestBigBoxPopupView;
}(PopupView));
__reflect(AcRyeHarvestBigBoxPopupView.prototype, "AcRyeHarvestBigBoxPopupView");
