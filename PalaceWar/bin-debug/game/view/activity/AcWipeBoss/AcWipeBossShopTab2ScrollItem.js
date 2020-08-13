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
 * desc : 积分兑换itemrender
 */
var AcWipeBossShopTab2ScrollItem = (function (_super) {
    __extends(AcWipeBossShopTab2ScrollItem, _super);
    function AcWipeBossShopTab2ScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._buyBtn = null;
        _this._limitTxt = null;
        _this._icon = null;
        _this._curIdx = 0;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcWipeBossShopTab2ScrollItem.prototype, "api", {
        get: function () {
            return Api.wipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossShopTab2ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_WIPEBOSS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossShopTab2ScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_WIPEBOSS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcWipeBossShopTab2ScrollItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view.width = 156 + view.getSpaceX();
        view.height = 250 + view.getSpaceY();
        view._data = data;
        view._curIdx = index;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);  
        var item;
        item = GameData.formatRewardItem(data.goods)[0];
        var wordsBg = BaseBitmap.create("public_9_bg1");
        wordsBg.width = view.width - view.getSpaceX();
        wordsBg.height = view.height - view.getSpaceY();
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wordsBg, view);
        view.addChild(wordsBg);
        var itemNameTF = ComponentManager.getTextField(item.name, 22, TextFieldConst.COLOR_QUALITY_ORANGE);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemNameTF, wordsBg, [0, 10]);
        view.addChild(itemNameTF);
        var icon = GameData.getItemIcon(item, true);
        icon.width = icon.height = 108;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon, itemNameTF, [0, itemNameTF.textHeight + 10]);
        view.addChild(icon);
        view._icon = icon;
        //限购
        var curNum = data.limit - view.vo.getPointChangeLimitnum(data.id);
        var limitTxt = ComponentManager.getTextField(LanguageManager.getlocal('buyNum', [TextFieldConst.COLOR_WARN_GREEN.toString(), curNum.toString()]), 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, icon, [0, icon.height + 10]);
        view.addChild(limitTxt);
        view._limitTxt = limitTxt;
        var btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "", view.buyHandler, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, wordsBg, [0, 10]);
        btn.setText(LanguageManager.getlocal('acwipeBossCostPoint', [data.costScore]), false);
        view.addChild(btn);
        view._buyBtn = btn;
        if (!view.vo.isInActivity() || curNum <= 0) {
            btn.setEnable(false);
        }
    };
    AcWipeBossShopTab2ScrollItem.prototype.update = function () {
        var view = this;
        var curNum = view._data.limit - view.vo.getPointChangeLimitnum(view._data.id);
        view._limitTxt.text = LanguageManager.getlocal('buyNum', [TextFieldConst.COLOR_WARN_GREEN.toString(), curNum.toString()]);
        if (curNum <= 0) {
            if (view._buyBtn) {
                view._buyBtn.setEnable(false);
            }
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._limitTxt, view._icon, [0, view._icon.height + 10]);
    };
    AcWipeBossShopTab2ScrollItem.prototype.buyHandler = function (evt) {
        var vo = this.vo;
        if (!vo) {
            return;
        }
        if (this.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
        }
        var view = this;
        var curNum = view._data.limit - view.vo.getPointChangeLimitnum(view._data.id);
        if (curNum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("DragonBoatShopTip"));
            return;
        }
        if (view.vo.getActPoints() < view._data.costScore) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishShopTip2'));
            return;
        }
        view.api.setClickIdx('b', view._curIdx);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSSHOPBUY, {
            activeId: view.vo.aidAndCode,
            num: 1,
            goods: view._data.id,
            stype: 'b'
        });
    };
    //弹出消费提示框显示确认
    AcWipeBossShopTab2ScrollItem.prototype.confirmCallbackHandler = function () {
        var view = this;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY, {
            // activeId : view.acTivityId,
            shopId: view._data.id
        });
    };
    AcWipeBossShopTab2ScrollItem.prototype.eventCollectHandlerCallBack = function (event) {
        var view = this;
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
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
        var curNum = view._data.limit - view.vo.getPointChangeLimitnum(view._data.id);
        view._limitTxt.text = LanguageManager.getlocal('DragonBoatDayLimit', [curNum.toString()]);
        if (curNum <= 0) {
            if (view._buyBtn) {
                view._buyBtn.setEnable(false);
            }
        }
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._limitTxt, view._buyBtn, [0, view._buyBtn.height + 5]);
    };
    AcWipeBossShopTab2ScrollItem.prototype.getSpaceX = function () {
        return 17;
    };
    AcWipeBossShopTab2ScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AcWipeBossShopTab2ScrollItem.prototype.dispose = function () {
        var view = this;
        view._data = null;
        view._buyBtn = null;
        view._limitTxt = null;
        view._icon = null;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this); 		
        _super.prototype.dispose.call(this);
    };
    return AcWipeBossShopTab2ScrollItem;
}(ScrollListItem));
__reflect(AcWipeBossShopTab2ScrollItem.prototype, "AcWipeBossShopTab2ScrollItem");
//# sourceMappingURL=AcWipeBossShopTab2ScrollItem.js.map