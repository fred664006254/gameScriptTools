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
var AcDoubleSeventhExchangeViewTab2 = (function (_super) {
    __extends(AcDoubleSeventhExchangeViewTab2, _super);
    function AcDoubleSeventhExchangeViewTab2() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._numTxt = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcDoubleSeventhExchangeViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhExchangeViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhExchangeViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhExchangeViewTab2.prototype, "sceneType", {
        get: function () {
            return "searchScene";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhExchangeViewTab2.prototype, "requestStr", {
        get: function () {
            return NetRequestConst.REQUST_ACTIVITY_GETDOUBLESEVENTHEXCHANGE;
        },
        enumerable: true,
        configurable: true
    });
    AcDoubleSeventhExchangeViewTab2.prototype.initView = function () {
        var view = this;
        view.height = 677;
        view.width = 560;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(this.requestStr), this.useCallback, this);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 522;
        bg.height = 658;
        bg.setPosition(this.width / 2 - bg.width / 2 + 5, 55);
        this.addChild(bg);
        var topbg = BaseBitmap.create("scene_exchange_topbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, bg, [0, 8]);
        this.addChild(topbg);
        var rectd = new egret.Rectangle(0, 0, 65, 65);
        var icon = BaseLoadBitmap.create("itemicon" + this.cfg.getExchangeNeedItemId(), rectd);
        this.addChild(icon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, topbg, [38, 15]);
        var sid = this.cfg.getExchangeSceneId();
        var tipTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("exchangeSceneShopDesc_" + sid), 20, TextFieldConst.COLOR_BROWN);
        tipTxt3.width = 362;
        tipTxt3.lineSpacing = 6;
        this.addChild(tipTxt3);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt3, topbg, [123, 15]);
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.getExchangeNeedItemId());
        var numTxt = ComponentManager.getTextField(String(hasNum), 18);
        numTxt.width = 88;
        numTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, numTxt, topbg, [23, 89]);
        view.addChild(numTxt);
        view._numTxt = numTxt;
        var objList = view.cfg.getShopArr();
        var tmpRect = new egret.Rectangle(0, 0, bg.width - 4, 517);
        var scrollList = ComponentManager.getScrollList(AcDoubleSeventhExchangeItem, objList, tmpRect, { code: this.code, aid: this.aid });
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bg, [0, 135]);
        view.addChild(scrollList);
        this.update();
    };
    AcDoubleSeventhExchangeViewTab2.prototype.update = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        var numTxt = view._numTxt;
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.getExchangeNeedItemId());
        numTxt.text = hasNum.toString();
    };
    AcDoubleSeventhExchangeViewTab2.prototype.useCallback = function (event) {
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
    AcDoubleSeventhExchangeViewTab2.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(this.requestStr), this.useCallback, this);
        this._numTxt = null;
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcDoubleSeventhExchangeViewTab2;
}(AcCommonViewTab));
__reflect(AcDoubleSeventhExchangeViewTab2.prototype, "AcDoubleSeventhExchangeViewTab2");
//# sourceMappingURL=AcDoubleSeventhExchangeViewTab2.js.map