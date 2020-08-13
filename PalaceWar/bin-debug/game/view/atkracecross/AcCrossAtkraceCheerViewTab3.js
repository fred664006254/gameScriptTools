var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//任务
var AcCrossAtkraceCheerViewTab3 = /** @class */ (function (_super) {
    __extends(AcCrossAtkraceCheerViewTab3, _super);
    function AcCrossAtkraceCheerViewTab3(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcCrossAtkraceCheerViewTab3.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = this.code;
                break;
        }
        return code;
    };
    Object.defineProperty(AcCrossAtkraceCheerViewTab3.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossAtkraceCheerViewTab3.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossAtkraceCheerViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossAtkraceCheerViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossAtkraceCheerViewTab3.prototype.initView = function () {
        var baseView = ViewController.getInstance().getView("AcCrossAtkraceCheerView");
        this.height = baseView.tabHeight;
        this.width = GameConfig.stageWidth;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_ATKRACEG_GETTASKREWARD, this.getRewardCallback, this);
        var tmpRect = new egret.Rectangle(0, 0, 620, this.height - 20);
        var dataList = this.vo.getSortTaskCfg();
        var scrollList = ComponentManager.getScrollList(AcCrossAtkraceCheerViewScrollItem3, dataList, tmpRect, { aid: this.aid, code: this.code });
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
    AcCrossAtkraceCheerViewTab3.prototype.refreshView = function () {
        var dataList = this.vo.getSortTaskCfg();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
    };
    AcCrossAtkraceCheerViewTab3.prototype.getRewardCallback = function (event) {
        if (event.data && event.data.ret) {
            var data = event.data.data.data;
            var rewards = data.rewards;
            if (data.specialGift) {
                if (data.rewards) {
                    rewards = "1066_0_" + data.specialGift + "_" + this.getUiCode() + "|" + data.rewards;
                }
                else {
                    rewards = "1066_0_" + data.specialGift + "_" + this.getUiCode();
                }
            }
            var rList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rList);
        }
    };
    AcCrossAtkraceCheerViewTab3.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_ATKRACEG_GETTASKREWARD, this.getRewardCallback, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossAtkraceCheerViewTab3;
}(CommonViewTab));
//# sourceMappingURL=AcCrossAtkraceCheerViewTab3.js.map