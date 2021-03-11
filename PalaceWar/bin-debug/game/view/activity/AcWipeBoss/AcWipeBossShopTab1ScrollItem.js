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
var AcWipeBossShopTab1ScrollItem = (function (_super) {
    __extends(AcWipeBossShopTab1ScrollItem, _super);
    function AcWipeBossShopTab1ScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._buyBtn = null;
        _this._limitTxt = null;
        _this._priceTxt = null;
        _this._curIdx = 0;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcWipeBossShopTab1ScrollItem.prototype, "api", {
        get: function () {
            return Api.wipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossShopTab1ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_WIPEBOSS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossShopTab1ScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_WIPEBOSS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcWipeBossShopTab1ScrollItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view.width = 505;
        view.height = 120 + 10;
        view._data = data;
        view._curIdx = index;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);  
        var item;
        var icon;
        if (data.effect) {
            item = {
                name: LanguageManager.getlocal('acwipeBossShopEffectName'),
                desc: LanguageManager.getlocal('acwipeBossShopEffect', [(data.effect * 100).toString()]),
                iconPic: 'aobaiqhfu',
                dropDesc: LanguageManager.getlocal('itemDropDesc_2110'),
            };
            var container = new BaseDisplayObjectContainer();
            var iconBg = BaseBitmap.create('itembg_2');
            container.addChild(iconBg);
            container.width = iconBg.width;
            container.height = iconBg.height;
            var Icon = BaseLoadBitmap.create('aobaiqhfu');
            container.addChild(Icon);
            Icon.setPosition(4, 5);
            iconBg.addTouchTap(function (event, item) {
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, item);
            }, GameData, ['2110']);
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
        var cost = data.limit ? data.needGem[Math.min(view.vo.getShopBuyLimitnum(data.id), 9)] : data.needGem;
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
        if (!view.vo.isInTansuoTime() || Api.wipeBossVoApi.getIsKillAll()) {
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
        //this.update();
    };
    AcWipeBossShopTab1ScrollItem.prototype.update = function () {
        var view = this;
        var curNum = view._data.limit - view.vo.getShopBuyLimitnum(view._data.id);
        view._limitTxt.text = LanguageManager.getlocal('DragonBoatDayLimit', [curNum.toString()]);
        if (curNum <= 0) {
            if (view._buyBtn) {
                view._buyBtn.setEnable(false);
            }
        }
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._limitTxt, view._buyBtn, [0, view._buyBtn.height + 5]);
        var cost = view._data.limit ? view._data.needGem[Math.min(view.vo.getShopBuyLimitnum(view._data.id), 9)] : view._data.needGem;
        view._priceTxt.text = cost;
    };
    AcWipeBossShopTab1ScrollItem.prototype.buyHandler = function (evt) {
        var vo = this.vo;
        if (!vo) {
            return;
        }
        if (Api.playerVoApi.getPlayerLevel() < this.cfg.needLv) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossOpenTip", [Api.playerVoApi.getPlayerOfficeByLevel(this.cfg.needLv)]));
            return;
        }
        if (this.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
        }
        if (!this.vo.isInTansuoTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
        }
        if (Api.wipeBossVoApi.getIsKillAll()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossSearchTip6"));
            return;
        }
        var view = this;
        var curNum = view._data.limit - view.vo.getShopBuyLimitnum(view._data.id);
        if (curNum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("DragonBoatShopTip"));
            return;
        }
        var needGem = view._data.limit ? view._data.needGem[Math.min(view.vo.getShopBuyLimitnum(view._data.id), 9)] : view._data.needGem;
        if (Api.playerVoApi.getPlayerGem() < needGem) {
            App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
            return;
        }
        view.api.setClickIdx('a', view._curIdx);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSSHOPBUY, {
            activeId: view.vo.aidAndCode,
            num: 1,
            goods: view._data.id,
            stype: 'a'
        });
    };
    //弹出消费提示框显示确认
    AcWipeBossShopTab1ScrollItem.prototype.confirmCallbackHandler = function () {
        var view = this;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSSHOPBUY, {
            // activeId : view.acTivityId,
            shopId: view._data.id
        });
    };
    AcWipeBossShopTab1ScrollItem.prototype.eventCollectHandlerCallBack = function (event) {
        var view = this;
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossShopEffectSuccess"));
            return;
        }
        // //this.update();
        // let rewards = rData.rewards
        // let rewardList =  GameData.formatRewardItem(rewards);
        // let pos =  AcDragonBoatDayTab4ScrollItem._lastPos;
        // App.CommonUtil.playRewardFlyAction(rewardList,pos);
        var data = event.data;
        var rewardList = GameData.formatRewardItem(data.data.data.rewards);
        var pos = view._buyBtn.localToGlobal(view._buyBtn.width / 2, 20);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    AcWipeBossShopTab1ScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AcWipeBossShopTab1ScrollItem.prototype.dispose = function () {
        var view = this;
        view._data = null;
        view._buyBtn = null;
        view._limitTxt = null;
        view._priceTxt = null;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this); 		
        _super.prototype.dispose.call(this);
    };
    return AcWipeBossShopTab1ScrollItem;
}(ScrollListItem));
__reflect(AcWipeBossShopTab1ScrollItem.prototype, "AcWipeBossShopTab1ScrollItem");
//# sourceMappingURL=AcWipeBossShopTab1ScrollItem.js.map