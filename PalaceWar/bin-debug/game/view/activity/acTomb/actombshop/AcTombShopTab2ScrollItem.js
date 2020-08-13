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
var AcTombShopTab2ScrollItem = (function (_super) {
    __extends(AcTombShopTab2ScrollItem, _super);
    function AcTombShopTab2ScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._buyBtn = null;
        _this._limitTxt = null;
        _this._icon = null;
        _this._curIdx = 0;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcTombShopTab2ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_TOMB, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombShopTab2ScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_TOMB, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcTombShopTab2ScrollItem.prototype.getUicode = function () {
        var baseview = ViewController.getInstance().getView('AcTombView');
        return baseview.getUiCode();
    };
    AcTombShopTab2ScrollItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view.width = 156 + view.getSpaceX();
        view.height = 250 + view.getSpaceY();
        view._data = data;
        view._curIdx = index;
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
        var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "", view.buyHandler, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, wordsBg, [0, 10]);
        btn.setText(LanguageManager.getlocal('acwipeBossCostPoint', [data.costScore]), false);
        view.addChild(btn);
        view._buyBtn = btn;
        if (view.vo.isEnd || curNum <= 0) {
            btn.setEnable(false);
        }
    };
    AcTombShopTab2ScrollItem.prototype.update = function () {
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
    AcTombShopTab2ScrollItem.prototype.buyHandler = function (evt) {
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
        view.vo.setClickIdx('b', view._curIdx);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_TOMBSHOPBUY, {
            activeId: view.vo.aidAndCode,
            num: 1,
            goods: view._data.id,
            stype: 'b'
        });
    };
    //弹出消费提示框显示确认
    AcTombShopTab2ScrollItem.prototype.confirmCallbackHandler = function () {
        var view = this;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY, {
            // activeId : view.acTivityId,
            shopId: view._data.id
        });
    };
    AcTombShopTab2ScrollItem.prototype.getSpaceX = function () {
        return 17;
    };
    AcTombShopTab2ScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AcTombShopTab2ScrollItem.prototype.dispose = function () {
        var view = this;
        view._data = null;
        view._buyBtn = null;
        view._limitTxt = null;
        view._icon = null;
        _super.prototype.dispose.call(this);
    };
    return AcTombShopTab2ScrollItem;
}(ScrollListItem));
__reflect(AcTombShopTab2ScrollItem.prototype, "AcTombShopTab2ScrollItem");
//# sourceMappingURL=AcTombShopTab2ScrollItem.js.map