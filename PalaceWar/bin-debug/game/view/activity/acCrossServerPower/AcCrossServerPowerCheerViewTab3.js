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
//任务
var AcCrossServerPowerCheerViewTab3 = (function (_super) {
    __extends(AcCrossServerPowerCheerViewTab3, _super);
    function AcCrossServerPowerCheerViewTab3(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcCrossServerPowerCheerViewTab3.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = this.code;
                break;
        }
        return code;
    };
    Object.defineProperty(AcCrossServerPowerCheerViewTab3.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerPowerCheerViewTab3.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerPowerCheerViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerPowerCheerViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerPowerCheerViewTab3.prototype.initView = function () {
        var baseView = ViewController.getInstance().getView("AcCrossServerPowerCheerView");
        this.height = baseView.tabHeight;
        this.width = GameConfig.stageWidth;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_GETTASKREWARD, this.getRewardCallback, this);
        var tmpRect = new egret.Rectangle(0, 0, 620, this.height - 20);
        var dataList = this.vo.getSortTaskCfg();
        var scrollList = ComponentManager.getScrollList(AcCrossServerPowerCheerViewScrollItem3, dataList, tmpRect, { aid: this.aid, code: this.code });
        scrollList.x = GameConfig.stageWidth / 2 - scrollList.width / 2;
        scrollList.y = 10;
        this.addChild(scrollList);
        this._scrollList = scrollList;
        var maskContainer = new BaseDisplayObjectContainer();
        maskContainer.width = this.width;
        maskContainer.height = this.height;
        this.addChild(maskContainer);
        maskContainer.touchEnabled = true;
        var blackBg = BaseBitmap.create("public_9_viewmask");
        blackBg.width = maskContainer.width;
        blackBg.height = maskContainer.height;
        maskContainer.addChild(blackBg);
        var lockImg = BaseBitmap.create(App.CommonUtil.getResByCode("accrosspower_tasklock", this.getUiCode()));
        maskContainer.addChild(lockImg);
        var tipbg = BaseLoadBitmap.create("countrywarrewardview_itembg");
        tipbg.width = 560;
        tipbg.height = 85;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipbg, blackBg, [0, 145], true);
        maskContainer.addChild(tipbg);
        var lv = LanguageManager.getlocal("officialTitle" + this.cfg.needLv);
        var lockTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPower_taskNeedTip", this.getUiCode()), [lv]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        lockTxt.lineSpacing = 6;
        lockTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lockTxt, tipbg);
        maskContainer.addChild(lockTxt);
        scrollList.setShowArrow(false);
        var playerLv = Api.playerVoApi.getPlayerLevel();
        if (playerLv >= this.cfg.needLv) {
            maskContainer.visible = false;
            scrollList.setShowArrow(true);
        }
    };
    AcCrossServerPowerCheerViewTab3.prototype.refreshView = function () {
        var dataList = this.vo.getSortTaskCfg();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
    };
    AcCrossServerPowerCheerViewTab3.prototype.getRewardCallback = function (event) {
        if (event.data && event.data.ret) {
            var data = event.data.data.data;
            var rewards = data.rewards;
            if (data.specialGift) {
                if (data.rewards) {
                    rewards = "1054_0_" + data.specialGift + "_" + this.getUiCode() + "|" + data.rewards;
                }
                else {
                    rewards = "1054_0_" + data.specialGift + "_" + this.getUiCode();
                }
            }
            var rList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rList);
        }
    };
    AcCrossServerPowerCheerViewTab3.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_GETTASKREWARD, this.getRewardCallback, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerPowerCheerViewTab3;
}(CommonViewTab));
__reflect(AcCrossServerPowerCheerViewTab3.prototype, "AcCrossServerPowerCheerViewTab3");
//# sourceMappingURL=AcCrossServerPowerCheerViewTab3.js.map