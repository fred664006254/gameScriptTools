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
var AcDoubleSeventhExchangeItem = (function (_super) {
    __extends(AcDoubleSeventhExchangeItem, _super);
    function AcDoubleSeventhExchangeItem() {
        var _this = _super.call(this) || this;
        _this._limitTxt = null;
        _this._itemCfg = null;
        _this._flag = null;
        _this._code = '';
        _this._aid = null;
        return _this;
    }
    Object.defineProperty(AcDoubleSeventhExchangeItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhExchangeItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhExchangeItem.prototype, "acTivityId", {
        get: function () {
            return this._aid + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhExchangeItem.prototype, "requestStr", {
        get: function () {
            return NetRequestConst.REQUST_ACTIVITY_GETDOUBLESEVENTHEXCHANGE;
        },
        enumerable: true,
        configurable: true
    });
    AcDoubleSeventhExchangeItem.prototype.initItem = function (index, data, item) {
        var view = this;
        view.width = 205;
        view._code = item.code;
        this._aid = item.aid;
        var itemCfg = data;
        view._itemCfg = itemCfg;
        var bg = BaseBitmap.create("scene_exchange_itembg"); //public_dj_bg01  public_9_probiginnerbg
        bg.setPosition(3, 3);
        view.addChild(bg);
        var rewardvo = GameData.formatRewardItem(itemCfg.getReward)[0];
        var nameTxt = ComponentManager.getTextField(rewardvo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameTxt.setPosition(bg.x + (bg.width - nameTxt.width) / 2, bg.y + 30);
        nameTxt.textColor = TextFieldConst.COLOR_BROWN;
        view.addChild(nameTxt);
        var icon = GameData.getItemIcon(rewardvo, true);
        icon.setPosition(bg.x + (bg.width - icon.width) / 2, bg.y + nameTxt.y + nameTxt.height + 5);
        view.addChild(icon);
        view.width = bg.width + this.getSpaceX();
        var limitNum = itemCfg.limit - view.vo.getShopNum(itemCfg.id);
        var limitTxt = ComponentManager.getTextField(LanguageManager.getlocal("acBattlePassShopEchange-1", [limitNum.toString()]), 18, limitNum > 0 ? 0x3e9b00 : 0xff3c3c);
        view.addChild(limitTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, icon, [0, icon.height + 3]);
        view._limitTxt = limitTxt;
        var rectd = new egret.Rectangle(0, 0, 38, 38);
        var costicon = BaseLoadBitmap.create("itemicon" + this.cfg.getExchangeNeedItemId(), rectd);
        costicon.setPosition(70, 186);
        view.addChild(costicon);
        //原价
        var needparts = itemCfg.needPart;
        var needNum = needparts.split("_")[2];
        var originPriceTxt = ComponentManager.getTextField(needNum, 20, TextFieldConst.COLOR_BLACK);
        view.addChild(originPriceTxt);
        originPriceTxt.setPosition(costicon.x + costicon.width, 195);
        var composeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "exchange", this.composeHandler, this);
        composeBtn.setPosition(bg.x + (bg.width - composeBtn.width * composeBtn.scaleX) / 2, bg.y + bg.height - composeBtn.height - 20);
        view.addChild(composeBtn);
        view._composeBtn = composeBtn;
        var flag = BaseBitmap.create("battlepasscollect3-1");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flag, composeBtn);
        view.addChild(flag);
        view._flag = flag;
        view._composeBtn.setEnable(limitNum > 0);
        flag.visible = !composeBtn.visible;
    };
    AcDoubleSeventhExchangeItem.prototype.refreshItem = function (rewards) {
        var view = this;
        var code = view._code;
        var itemCfg = view._itemCfg;
        if (view._limitTxt) {
            var limitNum = itemCfg.limit - view.vo.getShopNum(itemCfg.id);
            view._limitTxt.text = LanguageManager.getlocal("acBattlePassShopEchange-1", [limitNum.toString()]);
            view._limitTxt.textColor = limitNum > 0 ? 0x3e9b00 : 0xff3c3c;
            view._composeBtn.setEnable(limitNum > 0);
            view._flag.visible = !view._composeBtn.visible;
        }
        var rewardList = GameData.formatRewardItem(rewards);
        var pos = view.localToGlobal(view._composeBtn.x + 60, view._composeBtn.y + 10);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    AcDoubleSeventhExchangeItem.prototype.composeHandler = function () {
        var view = this;
        var itemcfg = this._itemCfg;
        if (view.vo.isEnd) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var limitNum = itemcfg.limit - view.vo.getShopNum(itemcfg.id);
        if (limitNum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acSingleDaybuyTips"));
            return;
        }
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.getExchangeNeedItemId());
        var needparts = this._itemCfg.needPart;
        var needNum = needparts.split("_")[2];
        var cost = hasNum - Number(needNum);
        if (cost < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
            return;
        }
        view.vo.selIdx = view._index;
        NetManager.request(this.requestStr, {
            activeId: view.acTivityId,
            isscene: 0,
            rkey: itemcfg.id,
        });
    };
    /**
     * 不同格子X间距
     */
    AcDoubleSeventhExchangeItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcDoubleSeventhExchangeItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcDoubleSeventhExchangeItem.prototype.dispose = function () {
        this._itemCfg = null;
        this._composeBtn = null;
        this._flag = null;
        this._limitTxt = null;
        this._aid = null;
        _super.prototype.dispose.call(this);
    };
    return AcDoubleSeventhExchangeItem;
}(ScrollListItem));
__reflect(AcDoubleSeventhExchangeItem.prototype, "AcDoubleSeventhExchangeItem");
//# sourceMappingURL=AcDoubleSeventhExchangeItem.js.map