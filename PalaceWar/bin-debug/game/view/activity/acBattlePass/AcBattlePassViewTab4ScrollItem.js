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
var AcBattlePassViewTab4ScrollItem = (function (_super) {
    __extends(AcBattlePassViewTab4ScrollItem, _super);
    function AcBattlePassViewTab4ScrollItem() {
        var _this = _super.call(this) || this;
        _this._limitTxt = null;
        _this._itemCfg = null;
        _this._flag = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcBattlePassViewTab4ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_BATTLEPASS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab4ScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEPASS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab4ScrollItem.prototype, "acTivityId", {
        get: function () {
            return AcConst.AID_BATTLEPASS + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab4ScrollItem.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcBattlePassView');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattlePassViewTab4ScrollItem.prototype.initItem = function (index, data, item) {
        var view = this;
        view.width = 205;
        view._code = item;
        var code = view.uiCode;
        var itemCfg = data;
        view._itemCfg = itemCfg;
        var bg = BaseBitmap.create("acsingledayitembg"); //public_dj_bg01  public_9_probiginnerbg
        bg.setPosition(3, 3);
        view.addChild(bg);
        var rewardvo = GameData.formatRewardItem(itemCfg.goods)[0];
        var nameTxt = ComponentManager.getTextField(rewardvo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameTxt.setPosition(bg.x + (bg.width - nameTxt.width) / 2, bg.y + 30);
        nameTxt.textColor = TextFieldConst.COLOR_BROWN;
        view.addChild(nameTxt);
        var icon = GameData.getItemIcon(rewardvo, true);
        icon.setPosition(bg.x + (bg.width - icon.width) / 2, bg.y + nameTxt.y + nameTxt.height + 5);
        view.addChild(icon);
        view.width = bg.width + this.getSpaceX();
        var limitNum = itemCfg.limit - view.vo.getLimitBuyNum(itemCfg.id);
        var limitTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassShopEchange", code), [limitNum.toString()]), 18, limitNum > 0 ? 0x3e9b00 : 0xff3c3c);
        view.addChild(limitTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, icon, [0, icon.height + 3]);
        view._limitTxt = limitTxt;
        //原价
        var goldGemBM = BaseBitmap.create(App.CommonUtil.getResByCode("battlepassicon2", code));
        goldGemBM.width = goldGemBM.height = 30;
        view.addChild(goldGemBM);
        var originPriceTxt = ComponentManager.getTextField(itemCfg.cost.toString(), 20, TextFieldConst.COLOR_BLACK);
        view.addChild(originPriceTxt);
        var distance = (bg.width - goldGemBM.width - originPriceTxt.textWidth) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, goldGemBM, bg, [distance, icon.y + icon.height + 20]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, originPriceTxt, goldGemBM, [goldGemBM.width, 0]);
        var composeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "exchange", this.composeHandler, this);
        composeBtn.setPosition(bg.x + (bg.width - composeBtn.width * composeBtn.scaleX) / 2, bg.y + bg.height - composeBtn.height - 20);
        view.addChild(composeBtn);
        view._composeBtn = composeBtn;
        var flag = BaseBitmap.create(App.CommonUtil.getResByCode("battlepasscollect3", code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flag, composeBtn);
        view.addChild(flag);
        view._flag = flag;
        composeBtn.visible = limitNum > 0;
        flag.visible = !composeBtn.visible;
    };
    AcBattlePassViewTab4ScrollItem.prototype.refreshItem = function (rewards) {
        var view = this;
        var code = view.uiCode;
        var itemCfg = view._itemCfg;
        if (view._limitTxt) {
            var limitNum = itemCfg.limit - view.vo.getLimitBuyNum(itemCfg.id);
            view._limitTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassShopEchange", code), [limitNum.toString()]);
            view._limitTxt.textColor = limitNum > 0 ? 0x3e9b00 : 0xff3c3c;
            view._composeBtn.visible = limitNum > 0;
            view._flag.visible = !view._composeBtn.visible;
        }
        var rewardList = GameData.formatRewardItem(rewards);
        var pos = view.localToGlobal(view._composeBtn.x + 60, view._composeBtn.y + 10);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    AcBattlePassViewTab4ScrollItem.prototype.composeHandler = function () {
        var view = this;
        var itemcfg = this._itemCfg;
        if (view.vo.isEnd) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var limitNum = itemcfg.limit - view.vo.getLimitBuyNum(itemcfg.id);
        if (limitNum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acSingleDaybuyTips"));
            return;
        }
        var cost = view.vo.getMyScore() - Math.ceil(itemcfg.cost);
        if (cost < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassNumNotEnough", view.uiCode)));
            return;
        }
        view.vo.selIdx = view._index;
        NetManager.request(NetRequestConst.REQUEST_BATTLEPASS_SHOPBUY, {
            activeId: view.acTivityId,
            shopid: itemcfg.id,
            num: 1
        });
        // }
        // else{
        //NetManager.request(NetRequestConst.REQYEST_ACTIVITY_SINGLEDAY_BUYSHOP,{activeId : view.acTivityId, itemKey : itemcfg.id + 1, mType : 2});
        // }
    };
    /**
     * 不同格子X间距
     */
    AcBattlePassViewTab4ScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcBattlePassViewTab4ScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcBattlePassViewTab4ScrollItem.prototype.dispose = function () {
        this._itemCfg = null;
        this._composeBtn = null;
        this._flag = null;
        this._limitTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattlePassViewTab4ScrollItem;
}(ScrollListItem));
__reflect(AcBattlePassViewTab4ScrollItem.prototype, "AcBattlePassViewTab4ScrollItem");
//# sourceMappingURL=AcBattlePassViewTab4ScrollItem.js.map