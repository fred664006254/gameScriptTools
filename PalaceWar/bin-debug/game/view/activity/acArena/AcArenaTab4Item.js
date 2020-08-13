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
 * desc : 劳动活动 商店 itemrender
 */
var AcArenaTab4Item = (function (_super) {
    __extends(AcArenaTab4Item, _super);
    function AcArenaTab4Item() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._buyBtn = null;
        _this._limitTxt = null;
        _this._curIdx = 0;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcArenaTab4Item.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcArenaTab4Item.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcArenaTab4Item.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcArenaTab4Item.prototype, "aid", {
        get: function () {
            return AcConst.AID_ARENA;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcArenaTab4Item.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcArenaTab4Item.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view.width = 510;
        view.height = 170 + 10;
        view._data = data;
        view._curIdx = index;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ARENASHOP), this.eventCollectHandlerCallBack, this);
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);  
        var rewardsArr = GameData.formatRewardItem(data.goods);
        var wordsBg = BaseBitmap.create("public_9_bg14");
        wordsBg.width = 510;
        wordsBg.height = 170;
        this.addChild(wordsBg);
        var icon = GameData.getItemIcon(rewardsArr[0], true);
        var bindData = icon.bindData;
        view.setLayoutPosition(LayoutConst.lefttop, icon, wordsBg, [10, 20]);
        view.addChild(icon);
        var itemNameBg = BaseBitmap.create("public_9_bg15");
        itemNameBg.width = 180;
        view.setLayoutPosition(LayoutConst.lefttop, itemNameBg, icon, [icon.width + 10, 0]);
        view.addChild(itemNameBg);
        var itemNameTF = ComponentManager.getTextField(bindData.name, TextFieldConst.FONTSIZE_TITLE_SMALL, rewardsArr[0].nameColor);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, itemNameTF, itemNameBg);
        view.addChild(itemNameTF);
        var itemDescTF = ComponentManager.getTextField(rewardsArr[0].desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        itemDescTF.textAlign = egret.HorizontalAlign.LEFT;
        itemDescTF.width = 215;
        view.setLayoutPosition(LayoutConst.lefttop, itemDescTF, itemNameBg, [0, itemNameBg.height + 2]);
        view.addChild(itemDescTF);
        var btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "nothing", this.buyHandler, this);
        var str = data.needGem.toString();
        btn.setText(str, false);
        btn.addTextIcon("public_icon1", 1);
        view.setLayoutPosition(LayoutConst.rightbottom, btn, view, [10, 50]);
        view.addChild(btn);
        view._buyBtn = btn;
        if (!view.vo.isInActivity()) {
            btn.setEnable(false);
        }
        //折扣
        if (data.discount) {
            var tag = BaseBitmap.create('shopview_corner');
            view.setLayoutPosition(LayoutConst.lefttop, tag, view);
            view.addChild(tag);
            var cost = (data.discount * 10);
            var tagTxt = ComponentManager.getTextField(LanguageManager.getlocal('discountTitle', [cost.toString()]), 18, TextFieldConst.COLOR_WARN_YELLOW);
            tagTxt.rotation = -45;
            tagTxt.setPosition(0, 28);
            if (PlatformManager.checkIsThSp()) {
                // tagTxt.setPosition(0,33);
                tagTxt.setPosition(-5, 38);
                tagTxt.text = LanguageManager.getlocal("discountTitle", [String(100 - data.discount * 100)]);
            }
            if (PlatformManager.checkIsEnLang()) {
                tagTxt.setPosition(0, 33);
                tagTxt.text = LanguageManager.getlocal("discountTitle", [String(100 - data.discount * 100)]);
            }
            view.addChild(tagTxt);
            var itemCfg = GameData.getRewardItemVoByIdAndType(1);
            var itemicon = BaseLoadBitmap.create(itemCfg.icon);
            itemicon.setScale(0.4);
            itemicon.width = 100;
            itemicon.height = 100;
            var oldTxt = ComponentManager.getTextField(LanguageManager.getlocal('acMayDayOldProce'), 18, TextFieldConst.COLOR_BLACK);
            var priceTxt = ComponentManager.getTextField(data.originalCost.toString(), 18, TextFieldConst.COLOR_BLACK);
            var desc = (btn.width - (oldTxt.textWidth + 40 + priceTxt.textWidth)) / 2;
            if (PlatformManager.checkIsRuLang()) {
                view.setLayoutPosition(LayoutConst.lefttop, oldTxt, btn, [desc - 7, btn.height + 8]);
            }
            else {
                view.setLayoutPosition(LayoutConst.lefttop, oldTxt, btn, [desc, btn.height + 8]);
            }
            view.addChild(oldTxt);
            view.setLayoutPosition(LayoutConst.leftverticalCenter, itemicon, oldTxt, [oldTxt.textWidth, 0]);
            view.addChild(itemicon);
            view.setLayoutPosition(LayoutConst.lefttop, priceTxt, oldTxt, [100 * 0.4 + oldTxt.textWidth, 0]);
            view.addChild(priceTxt);
            var line = BaseBitmap.create('shopview_line');
            view.setLayoutPosition(LayoutConst.leftverticalCenter, line, oldTxt, [(line.width - (oldTxt.textWidth + 40 + priceTxt.textWidth)) / 2, 0]);
            line.x = oldTxt.x;
            line.scaleX = (oldTxt.width + priceTxt.width + 35) / line.width;
            view.addChild(line);
        }
        //限购
        if (data.limit) {
            var curNum = data.limit - view.vo.getBuyLimitnum(data.sortId);
            var limitTxt = ComponentManager.getTextField(LanguageManager.getlocal("acLaborlimit-" + view.code, [curNum.toString()]), 20, TextFieldConst.COLOR_BLACK);
            if (PlatformManager.checkIsRuLang()) {
                view.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, btn, [-7, -limitTxt.textHeight - 8]);
            }
            else {
                view.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, btn, [0, -limitTxt.textHeight - 8]);
            }
            view.addChild(limitTxt);
            view._limitTxt = limitTxt;
            if (curNum <= 0) {
                view._buyBtn.setEnable(false);
            }
        }
        //this.update();
    };
    AcArenaTab4Item.prototype.buyHandler = function (evt) {
        var vo = this.vo;
        if (!vo) {
            return;
        }
        if (this.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
        }
        var view = this;
        var curNum = view._data.limit - view.vo.getBuyLimitnum(view._data.sortId);
        if (curNum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("DragonBoatShopTip"));
            return;
        }
        if (Api.playerVoApi.getPlayerGem() < view._data.needGem) {
            App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
            return;
        }
        view.checkNeedWarnPopup();
    };
    //弹出消费提示框显示确认
    AcArenaTab4Item.prototype.confirmCallbackHandler = function () {
        var view = this;
        view.vo.lastidx = this._curIdx;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_ARENASHOP, {
            activeId: view.acTivityId,
            shopId: view._data.sortId
        });
    };
    //检查是否需要弹出消费提示框
    AcArenaTab4Item.prototype.checkNeedWarnPopup = function () {
        //物品价格
        var view = this;
        var num = view._data.needGem;
        //检查价格是否超过购买警告阈值
        if (num >= Config.ShopCfg.buyItemCheckVal) {
            var contentList = GameData.formatRewardItem(this._data.goods); //shopItemCfg.contentList;
            var rewardItemVo = contentList[0];
            //let icon = GameData.getItemIcon(rewardItemVo,true);
            //展示信息
            var message = LanguageManager.getlocal("shopBuyUseGem2", [num.toString(), rewardItemVo.name]);
            //玩家所持有的元宝数
            var playerGem = Api.playerVoApi.getPlayerGem();
            // ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{useNum:rewardItemVo.num,confirmCallback:this.confirmCallbackHandler,handler:this,icon:rewardItemVo.icon,iconBg: rewardItemVo.iconBg,num:playerGem,msg:message,id : 1});
            ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMPOPUPVIEW, {
                goods: this._data.goods,
                confirmCallback: this.confirmCallbackHandler,
                handler: this,
                num: playerGem,
                msg: message,
                id: 1 //消耗物品id  1->元宝
            });
        }
        else {
            this.confirmCallbackHandler();
        }
    };
    AcArenaTab4Item.prototype.eventCollectHandlerCallBack = function (event) {
        var view = this;
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
        }
        if (view.vo.lastidx != this._curIdx) {
            return;
        }
        view.vo.lastidx = null;
        var data = event.data;
        var rewards = data.data.data.rewards;
        if (this._data.goods !== rewards) {
            var rewardItemvo = GameData.formatRewardItem(this._data.goods)[0];
            var servantReward = null;
            var name_1 = '';
            var exchange = void 0;
            if (rewardItemvo.type == 8) {
                servantReward = Config.ServantCfg.getServantItemById(rewardItemvo.id);
                name_1 = servantReward.name;
                exchange = servantReward.exchange;
            }
            else if (rewardItemvo.type == 16) {
                servantReward = Config.WifeskinCfg.getWifeCfgById(rewardItemvo.id);
                name_1 = servantReward.name;
                exchange = "6_2101_" + servantReward.itemNum;
            }
            else if (rewardItemvo.type == 19) {
                servantReward = Config.ServantskinCfg.getServantSkinItemById(rewardItemvo.id);
                name_1 = servantReward.getSkinName();
                exchange = servantReward.returnItem;
            }
            if (servantReward) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "name": name_1, "touch": exchange, "message": "changeOtherRewardTip", "callback": function () {
                        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "isPlayAni": true });
                    }, "handler": this });
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "isPlayAni": true });
            }
        }
        else {
            var rewardList = GameData.formatRewardItem(data.data.data.rewards);
            var pos = view._buyBtn.localToGlobal(view._buyBtn.width / 2, 20);
            App.CommonUtil.playRewardFlyAction(rewardList, pos);
        }
        var curNum = view._data.limit - view.vo.getBuyLimitnum(view._data.sortId);
        view._limitTxt.text = LanguageManager.getlocal("acLaborlimit-" + view.code, [curNum.toString()]);
        if (curNum <= 0) {
            view._buyBtn.setEnable(false);
        }
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._limitTxt, view._buyBtn, [0, -view._limitTxt.textHeight - 8]);
        // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_DBDAY_FRESH_LIST);
    };
    AcArenaTab4Item.prototype.getSpaceY = function () {
        return 10;
    };
    AcArenaTab4Item.prototype.dispose = function () {
        var view = this;
        view._data = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ARENASHOP), this.eventCollectHandlerCallBack, this);
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this); 		
        _super.prototype.dispose.call(this);
    };
    return AcArenaTab4Item;
}(ScrollListItem));
__reflect(AcArenaTab4Item.prototype, "AcArenaTab4Item");
//# sourceMappingURL=AcArenaTab4Item.js.map