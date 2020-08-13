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
 * author : qianjun
 * date : 2018.4.14
 * desc : 活动商店itemrender
 */
var AcTombShopTab1ScrollItem = (function (_super) {
    __extends(AcTombShopTab1ScrollItem, _super);
    function AcTombShopTab1ScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._buyBtn = null;
        _this._limitTxt = null;
        _this._priceTxt = null;
        _this._curIdx = 0;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcTombShopTab1ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_TOMB, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombShopTab1ScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_TOMB, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcTombShopTab1ScrollItem.prototype.getUicode = function () {
        var baseview = ViewController.getInstance().getView('AcTombView');
        return baseview.getUiCode();
    };
    AcTombShopTab1ScrollItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view.width = 505;
        view.height = 120 + 10;
        view._data = data;
        view._curIdx = index;
        var item;
        var icon;
        if (data.effect) {
            var effecId = 2114;
            var itemvo = Config.ItemCfg.getItemCfgById(effecId);
            item = {
                name: itemvo.name,
                desc: LanguageManager.getlocal('acwipeBossShopEffect', [(data.effect * 100).toString()]),
                iconPic: itemvo.icon,
                dropDesc: itemvo.dropDesc,
            };
            var container = new BaseDisplayObjectContainer();
            var iconBg = BaseBitmap.create(itemvo.iconBg);
            container.addChild(iconBg);
            container.width = iconBg.width;
            container.height = iconBg.height;
            var Icon = BaseLoadBitmap.create(itemvo.icon);
            container.addChild(Icon);
            Icon.setPosition(4, 5);
            iconBg.addTouchTap(function (event, item) {
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, item);
            }, GameData, [effecId]);
            icon = container;
        }
        else {
            item = GameData.formatRewardItem(data.goods)[0];
            icon = GameData.getItemIcon(item, true, false);
        }
        var wordsBg = BaseBitmap.create("public_9_bg1");
        wordsBg.width = view.width;
        wordsBg.height = view.height - 10;
        view.addChild(wordsBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, wordsBg, [10, 0]);
        view.addChild(icon);
        var itemNameTF = ComponentManager.getTextField(item.name, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, itemNameTF, icon, [106 + 15, 10]);
        view.addChild(itemNameTF);
        var itemCfg = GameData.getRewardItemVoByIdAndType(1);
        var itemicon = BaseLoadBitmap.create(itemCfg.icon);
        itemicon.setScale(0.4);
        itemicon.width = 100;
        itemicon.height = 100;
        var cost = data.effect ? data.needGem[Math.min(view.vo.getShopBuyLimitnum(data.id), 9)] : data.needGem;
        var costTxt = ComponentManager.getTextField(LanguageManager.getlocal('allianceBuildCost'), 18);
        var priceTxt = ComponentManager.getTextField(cost.toString(), 18, TextFieldConst.COLOR_QUALITY_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, costTxt, itemNameTF, [0, itemNameTF.textHeight + 10]);
        view.addChild(costTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, itemicon, costTxt, [costTxt.textWidth, 0]);
        view.addChild(itemicon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, priceTxt, costTxt, [costTxt.textWidth + 50, 0]);
        view.addChild(priceTxt);
        view._priceTxt = priceTxt;
        var itemDescTF = ComponentManager.getTextField(item.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        itemDescTF.textAlign = egret.HorizontalAlign.LEFT;
        itemDescTF.width = 350;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, itemDescTF, costTxt, [0, costTxt.textHeight + 17]);
        view.addChild(itemDescTF);
        var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceBtnBuy", view.buyHandler, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, btn, wordsBg, [10, 8]);
        view.addChild(btn);
        view._buyBtn = btn;
        if (!view.vo.isInActTime() || view.vo.getIsKillAll()) {
            btn.setGray(true);
        }
        //限购
        if (data.limit) {
            var curNum = data.limit - view.vo.getShopBuyLimitnum(data.id);
            var limitTxt = ComponentManager.getTextField(LanguageManager.getlocal('DragonBoatDayLimit', [curNum.toString()]), 20, TextFieldConst.COLOR_WARN_GREEN);
            view.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, btn, [0, btn.height + 5]);
            view.addChild(limitTxt);
            view._limitTxt = limitTxt;
            if (curNum <= 0) {
                view._buyBtn.setEnable(false);
            }
        }
    };
    AcTombShopTab1ScrollItem.prototype.update = function () {
        var view = this;
        var curNum = view._data.limit - view.vo.getShopBuyLimitnum(view._data.id);
        view._limitTxt.text = LanguageManager.getlocal('DragonBoatDayLimit', [curNum.toString()]);
        if (curNum <= 0) {
            if (view._buyBtn) {
                view._buyBtn.setEnable(false);
            }
        }
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._limitTxt, view._buyBtn, [0, view._buyBtn.height + 5]);
        var cost = view._data.effect ? view._data.needGem[Math.min(view.vo.getShopBuyLimitnum(view._data.id), 9)] : view._data.needGem;
        view._priceTxt.text = cost;
    };
    AcTombShopTab1ScrollItem.prototype.buyHandler = function (evt) {
        var vo = this.vo;
        if (!vo) {
            return;
        }
        if (!this.vo.getAttendQUality()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("tombattend2-" + this.getUicode(), [Api.playerVoApi.getPlayerOfficeByLevel(this.cfg.needLv)]));
            return;
        }
        if (this.vo.getCurPeriod() == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("tombtime2-" + this.getUicode()));
            return;
        }
        if (this.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
        }
        if (!this.vo.isInActTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
        }
        if (!this.vo.isInFightTime() && this._index == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("tombtime4-" + this.getUicode()));
            return;
        }
        if (this.vo.getIsKillAll()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossSearchTip6"));
            return;
        }
        var view = this;
        var curNum = view._data.limit - view.vo.getShopBuyLimitnum(view._data.id);
        if (curNum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("DragonBoatShopTip"));
            return;
        }
        var needGem = view._data.effect ? view._data.needGem[Math.min(view.vo.getShopBuyLimitnum(view._data.id), 9)] : view._data.needGem;
        if (Api.playerVoApi.getPlayerGem() < needGem) {
            App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
            return;
        }
        view.vo.setClickIdx('a', view._curIdx);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_TOMBSHOPBUY, {
            activeId: view.vo.aidAndCode,
            num: 1,
            goods: view._data.id,
            stype: 'a'
        });
    };
    //弹出消费提示框显示确认
    AcTombShopTab1ScrollItem.prototype.confirmCallbackHandler = function () {
        var view = this;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_TOMBSHOPBUY, {
            // activeId : view.acTivityId,
            shopId: view._data.id
        });
    };
    AcTombShopTab1ScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AcTombShopTab1ScrollItem.prototype.dispose = function () {
        var view = this;
        view._data = null;
        view._buyBtn = null;
        view._limitTxt = null;
        view._priceTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcTombShopTab1ScrollItem;
}(ScrollListItem));
__reflect(AcTombShopTab1ScrollItem.prototype, "AcTombShopTab1ScrollItem");
//# sourceMappingURL=AcTombShopTab1ScrollItem.js.map