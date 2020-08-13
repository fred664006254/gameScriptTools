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
 * author:qianjun
 * desc:世界杯活动积分商店item
*/
var AcWorldCupTab3Item = (function (_super) {
    __extends(AcWorldCupTab3Item, _super);
    function AcWorldCupTab3Item() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._curIdx = 0;
        _this._limitTxt = null;
        _this._lastReqIdx = null;
        _this._buyBtn = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcWorldCupTab3Item.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACWORLDCUP, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupTab3Item.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACWORLDCUP, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupTab3Item.prototype, "acTivityId", {
        get: function () {
            return AcConst.AID_ACWORLDCUP + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcWorldCupTab3Item.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view.width = 600;
        view.height = 140 + 10;
        view._data = data;
        view._curIdx = index;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPUSE), this.eventCollectHandlerCallBack, this);
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);  
        var rewardsArr = GameData.formatRewardItem(data.goods);
        var wordsBg = BaseBitmap.create("public_9_bg14");
        wordsBg.width = 598;
        wordsBg.height = 140;
        this.addChild(wordsBg);
        var icon = data.rewardIcons[0];
        var bindData = icon.bindData;
        view.setLayoutPosition(LayoutConst.leftverticalCenter, icon, wordsBg, [22, 0]);
        view.addChild(icon);
        var itemNameBg = BaseBitmap.create("public_9_bg15");
        itemNameBg.width = 180;
        view.setLayoutPosition(LayoutConst.lefttop, itemNameBg, icon, [icon.width + 10, 5]);
        view.addChild(itemNameBg);
        var itemNameTF = ComponentManager.getTextField(bindData.name, TextFieldConst.FONTSIZE_TITLE_SMALL, rewardsArr[0].nameColor);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, itemNameTF, itemNameBg);
        view.addChild(itemNameTF);
        var itemDescTF = ComponentManager.getTextField(rewardsArr[0].desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        itemDescTF.textAlign = egret.HorizontalAlign.LEFT;
        itemDescTF.width = 200;
        view.setLayoutPosition(LayoutConst.lefttop, itemDescTF, itemNameBg, [0, itemNameBg.height + 2]);
        view.addChild(itemDescTF);
        var btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "nothing", this.buyHandler, this);
        var str = data.needCoin.toString();
        btn.setText(str, false);
        btn.addTextIcon("worldcupfootball", 1);
        view.setLayoutPosition(LayoutConst.rightverticalCenter, btn, view, [22, 0]);
        view.addChild(btn);
        view._buyBtn = btn;
        if (!view.vo.isInActivity()) {
            btn.setGray(true);
        }
        //折扣
        if (data.discount) {
            var tag = BaseBitmap.create('shopview_corner');
            view.setLayoutPosition(LayoutConst.lefttop, tag, view);
            view.addChild(tag);
            var tagTxt = ComponentManager.getTextField(LanguageManager.getlocal('discountTitle', [(data.discount * 10).toString()]), 18, TextFieldConst.COLOR_WARN_YELLOW);
            tagTxt.rotation = -45;
            view.setLayoutPosition(LayoutConst.lefttop, tagTxt, icon, [-18, 11]);
            view.addChild(tagTxt);
            var itemicon = BaseBitmap.create('worldcupfootball'); //
            var oldTxt = ComponentManager.getTextField(LanguageManager.getlocal('acMayDayOldProce'), 18, TextFieldConst.COLOR_BLACK);
            var priceTxt = ComponentManager.getTextField(data.originalCost.toString(), 18, TextFieldConst.COLOR_BLACK);
            var desc = (btn.width - (oldTxt.textWidth + 40 + priceTxt.textWidth)) / 2;
            view.setLayoutPosition(LayoutConst.lefttop, oldTxt, btn, [desc, 0 - oldTxt.textHeight - 8]);
            view.addChild(oldTxt);
            view.setLayoutPosition(LayoutConst.leftverticalCenter, itemicon, oldTxt, [oldTxt.textWidth, 0]);
            view.addChild(itemicon);
            view.setLayoutPosition(LayoutConst.lefttop, priceTxt, oldTxt, [100 * 0.4 + oldTxt.textWidth, 0]);
            view.addChild(priceTxt);
            var line = BaseBitmap.create('shopview_line');
            view.setLayoutPosition(LayoutConst.leftverticalCenter, line, oldTxt, [(line.width - (oldTxt.textWidth + 40 + priceTxt.textWidth)) / 2, 0]);
            view.addChild(line);
        }
        //限购
        if (data.limit) {
            var curNum = data.limit - view.vo.getBuyLimitnum(data.sortId + 1);
            var limitTxt = ComponentManager.getTextField(LanguageManager.getlocal('DragonBoatDayLimit', [curNum.toString()]), 20, TextFieldConst.COLOR_BLACK);
            view.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, btn, [0, btn.height + 5]);
            view.addChild(limitTxt);
            view._limitTxt = limitTxt;
            if (curNum <= 0) {
                view._buyBtn.setEnable(false);
            }
        }
        //this.update();
    };
    AcWorldCupTab3Item.prototype.buyHandler = function (evt) {
        var vo = this.vo;
        if (!vo) {
            return;
        }
        var period = this.vo.getCurPeriod();
        if (period != 3) {
            App.CommonUtil.showTip(LanguageManager.getlocal(period == 4 ? "acPunishEnd" : "AcWorldCupShopNotIn"));
            return;
        }
        // if(this.vo.et < GameData.serverTime){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
        //     return;
        // }
        var view = this;
        var curNum = view._data.limit - view.vo.getBuyLimitnum(view._data.sortId + 1);
        if (curNum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("DragonBoatShopTip"));
            return;
        }
        if (view.vo.getCurPoints() < view._data.needCoin) {
            App.CommonUtil.showTip(LanguageManager.getlocal('AcWorldCupShopNotEnough'));
            return;
        }
        view.confirmCallbackHandler();
    };
    //弹出消费提示框显示确认
    AcWorldCupTab3Item.prototype.confirmCallbackHandler = function () {
        var view = this;
        view._lastReqIdx = this._curIdx;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPUSE, {
            activeId: view.acTivityId,
            mid: view._data.sortId + 1
        });
    };
    AcWorldCupTab3Item.prototype.eventCollectHandlerCallBack = function (event) {
        var view = this;
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
        }
        if (view._lastReqIdx != this._curIdx) {
            return;
        }
        view._lastReqIdx = null;
        // //this.update();
        // let rewards = rData.rewards
        // let rewardList =  GameData.formatRewardItem(rewards);
        // let pos =  AcDragonBoatDayTab4ScrollItem._lastPos;
        // App.CommonUtil.playRewardFlyAction(rewardList,pos);
        var data = event.data;
        var rewardList = GameData.formatRewardItem(data.data.data.rewards);
        var pos = view._buyBtn.localToGlobal(view._buyBtn.width / 2, view._buyBtn.y / 2);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
        var curNum = view._data.limit - view.vo.getBuyLimitnum(view._data.sortId + 1);
        view._limitTxt.text = LanguageManager.getlocal('DragonBoatDayLimit', [curNum.toString()]);
        if (curNum <= 0) {
            view._buyBtn.setEnable(false);
        }
        if (Number(view._data.sortId) == 1) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
        }
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._limitTxt, view._buyBtn, [0, view._buyBtn.height + 5]);
    };
    AcWorldCupTab3Item.prototype.getSpaceY = function () {
        return 10;
    };
    AcWorldCupTab3Item.prototype.dispose = function () {
        var view = this;
        view._limitTxt = null;
        view._buyBtn = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPUSE), this.eventCollectHandlerCallBack, this);
        _super.prototype.dispose.call(this);
    };
    return AcWorldCupTab3Item;
}(ScrollListItem));
__reflect(AcWorldCupTab3Item.prototype, "AcWorldCupTab3Item");
//# sourceMappingURL=AcWorldCupTab3Item.js.map