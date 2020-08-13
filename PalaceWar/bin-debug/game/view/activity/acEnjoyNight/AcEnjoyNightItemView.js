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
var AcEnjoyNightItemView = (function (_super) {
    __extends(AcEnjoyNightItemView, _super);
    function AcEnjoyNightItemView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._numTxt = null;
        return _this;
    }
    AcEnjoyNightItemView.prototype.getTitleStr = function () {
        return "acEnjoyNightExchange";
    };
    AcEnjoyNightItemView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "servant_bottombg", "acchristmasview_smalldescbg", "acsingledayitembg", "battlepasscollect3-1"
        ]);
    };
    Object.defineProperty(AcEnjoyNightItemView.prototype, "vo", {
        get: function () {
            var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
            return springCelebrateVo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightItemView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightItemView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightItemView.prototype, "uicode", {
        get: function () {
            return this.param.data.uicode;
        },
        enumerable: true,
        configurable: true
    });
    AcEnjoyNightItemView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTEXCHANGE), this.useCallback, this);
        var bottomBg = BaseBitmap.create("servant_bottombg");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth - this.container.y + 89;
        bottomBg.x = 0;
        bottomBg.y = -82;
        this.addChildToContainer(bottomBg);
        var bottomBg2 = BaseBitmap.create("public_9_bg32");
        bottomBg2.height = bottomBg.height - 190;
        bottomBg2.width = 610;
        bottomBg2.x = GameConfig.stageWidth / 2 - bottomBg2.width / 2;
        bottomBg2.y = bottomBg.y + 125;
        this.addChildToContainer(bottomBg2);
        var numbg = BaseBitmap.create("acchristmasview_smalldescbg");
        numbg.height = 34;
        numbg.width = 120;
        numbg.setPosition(GameConfig.stageWidth / 2 - numbg.width / 2, bottomBg2.y - 10 - numbg.height);
        this.addChildToContainer(numbg);
        var rectd = new egret.Rectangle(0, 0, 40, 40);
        var icon = BaseLoadBitmap.create("itemicon2009", rectd);
        icon.setPosition(numbg.x + 10, numbg.y + numbg.height / 2 - icon.height / 2);
        view.addChildToContainer(icon);
        var hasNum = Api.itemVoApi.getItemNumInfoVoById("2009");
        var numTxt = ComponentManager.getTextField(String(hasNum), 20);
        numTxt.setPosition(icon.x + icon.width + 10, numbg.y + numbg.height / 2 - numTxt.height / 2);
        view.addChildToContainer(numTxt);
        view._numTxt = numTxt;
        var objList = view.cfg.getShopArr();
        var listbg = bottomBg2;
        var tmpRect = new egret.Rectangle(0, 0, 612, listbg.height - 10);
        var scrollList = ComponentManager.getScrollList(AcEnjoyNightItemScrollItem, objList, tmpRect, this.param.data.code);
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0, 5]);
        view.addChildToContainer(scrollList);
        view.update();
        var resetText = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightExchangeReset"), 20, TextFieldConst.COLOR_BROWN);
        resetText.setPosition(GameConfig.stageWidth / 2 - resetText.width / 2, bottomBg2.y + bottomBg2.height + 12);
        view.addChildToContainer(resetText);
    };
    AcEnjoyNightItemView.prototype.update = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        var numTxt = view._numTxt;
        var hasNum = Api.itemVoApi.getItemNumInfoVoById("2009");
        numTxt.text = hasNum.toString();
    };
    AcEnjoyNightItemView.prototype.useCallback = function (event) {
        var view = this;
        var data = event.data.data.data;
        if (data && data.rewards) {
            var rewards = data.rewards;
            var selIdx = view.vo.selIdx;
            var item = view._scrollList.getItemByIndex(selIdx);
            if (item) {
                item.refreshItem(rewards);
            }
            view.vo.selIdx = -1;
        }
    };
    AcEnjoyNightItemView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTEXCHANGE), this.useCallback, this);
        this._numTxt = null;
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcEnjoyNightItemView;
}(CommonView));
__reflect(AcEnjoyNightItemView.prototype, "AcEnjoyNightItemView");
//# sourceMappingURL=AcEnjoyNightItemView.js.map