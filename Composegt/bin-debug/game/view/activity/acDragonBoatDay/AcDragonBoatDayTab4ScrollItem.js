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
 * desc : 端午商店 节日任务itemrender
 */
var AcDragonBoatDayTab4ScrollItem = (function (_super) {
    __extends(AcDragonBoatDayTab4ScrollItem, _super);
    function AcDragonBoatDayTab4ScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._buyBtn = null;
        _this._limitTxt = null;
        _this._curIdx = 0;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcDragonBoatDayTab4ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACDRAGONBOAT, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDragonBoatDayTab4ScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACDRAGONBOAT, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDragonBoatDayTab4ScrollItem.prototype, "acTivityId", {
        get: function () {
            return AcConst.AID_ACDRAGONBOAT + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcDragonBoatDayTab4ScrollItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view.width = 598;
        view.height = 140 + 10;
        view._data = data;
        view._curIdx = index;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY), this.eventCollectHandlerCallBack, this);
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);  
        var rewardsArr = GameData.formatRewardItem(data.goods);
        var wordsBg = BaseBitmap.create("activity_db_01");
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
        view.setLayoutPosition(LayoutConst.lefttop, itemDescTF, itemNameBg, [0, itemNameBg.height + 32]);
        view.addChild(itemDescTF);
        var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "nothing", this.buyHandler, this);
        var str = data.needGem.toString();
        btn.setText(str, false);
        btn.addTextIcon("public_icon1", 1);
        view.setLayoutPosition(LayoutConst.rightverticalCenter, btn, view, [22, 0]);
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
            var channelNum = 10;
            var disTxt = 0;
            if (PlatformManager.checkIsKRSp() || PlatformManager.checkIsJPSp() || PlatformManager.checkIsKRNewSp()) {
                // channelNum =100;
                disTxt = 10 - 10 * data.discount;
            }
            else if (PlatformManager.checkIsViSp()) {
                disTxt = 10 - 10 * data.discount;
            }
            else {
                disTxt = 10 * data.discount;
            }
            var tagTxt = ComponentManager.getTextField(LanguageManager.getlocal('discountTitle', [(disTxt).toString()]), 18, TextFieldConst.COLOR_WARN_YELLOW);
            tagTxt.rotation = -45;
            view.setLayoutPosition(LayoutConst.lefttop, tagTxt, icon, [-15, 8]);
            if (PlatformManager.checkIsViSp()) {
                // 	// tagTxt.setPosition(0,33);
                // 	tagTxt.setPosition(-5,38);
                // 	tagTxt.text  = LanguageManager.getlocal("discountTitle",[String(100 - data.discount * 100)]);
                view.setLayoutPosition(LayoutConst.lefttop, tagTxt, icon, [-25, 21]);
            }
            else if (PlatformManager.checkIsJPSp()) {
                // 	// tagTxt.setPosition(0,33);
                // 	tagTxt.setPosition(-5,38);
                // 	tagTxt.text  = LanguageManager.getlocal("discountTitle",[String(100 - data.discount * 100)]);
                view.setLayoutPosition(LayoutConst.lefttop, tagTxt, icon, [-23, 19]);
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
    AcDragonBoatDayTab4ScrollItem.prototype.buyHandler = function (evt) {
        var vo = this.vo;
        if (!vo) {
            return;
        }
        if (this.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
        }
        var view = this;
        var curNum = view._data.limit - view.vo.getBuyLimitnum(view._data.sortId + 1);
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
    AcDragonBoatDayTab4ScrollItem.prototype.confirmCallbackHandler = function () {
        var view = this;
        AcDragonBoatDayTab4ScrollItem._lastReqIdx = this._curIdx;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY, {
            activeId: view.acTivityId,
            shopId: view._data.sortId + 1
        });
    };
    //检查是否需要弹出消费提示框
    AcDragonBoatDayTab4ScrollItem.prototype.checkNeedWarnPopup = function () {
        //物品价格
        var view = this;
        var num = view._data.needGem;
        //检查价格是否超过购买警告阈值
        if (num >= Config.ShopCfg.buyItemCheckVal) {
            var contentList = GameData.formatRewardItem(this._data.content); //shopItemCfg.contentList;
            var rewardItemVo = contentList[0];
            //let icon = GameData.getItemIcon(rewardItemVo,true);
            //展示信息
            var message = LanguageManager.getlocal("shopBuyUseGem2", [num.toString(), rewardItemVo.name]);
            //玩家所持有的元宝数
            var playerGem = Api.playerVoApi.getPlayerGem();
            //ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{useNum:rewardItemVo.num,confirmCallback:this.confirmCallbackHandler,handler:this,icon:rewardItemVo.icon,iconBg: rewardItemVo.iconBg,num:playerGem,msg:message,id : 1});
            ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMPOPUPVIEW, {
                useNum: rewardItemVo.num,
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
    // private buyCallBack(evt){
    //     let view = this;
    //     App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_BUY),view.buyCallBack,view);
    //     let data = evt.data;
    //     if(data.data.ret < 0){
    //         return;
    //     }
    //     if (data.data.data.myemperor)
    //     {
    //         Api.emperorwarVoApi.setDataInfo(data.data.data.myemperor);
    //     }
    //     let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
    //     let pos = view._limitTxt.localToGlobal(view._limitTxt.textWidth + 20,20);
    //     App.CommonUtil.playRewardFlyAction(rewardList, pos);
    //     let curNum = view._data.limit - view.api.getBuyLimitnum(view._data.sortId);
    //     view._limitTxt.text = LanguageManager.getlocal('shopLimitBuy3',[curNum.toString()]);
    // }
    AcDragonBoatDayTab4ScrollItem.prototype.eventCollectHandlerCallBack = function (event) {
        var view = this;
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
        }
        if (AcDragonBoatDayTab4ScrollItem._lastReqIdx != this._curIdx) {
            return;
        }
        AcDragonBoatDayTab4ScrollItem._lastReqIdx = null;
        // //this.update();
        // let rewards = rData.rewards
        // let rewardList =  GameData.formatRewardItem(rewards);
        // let pos =  AcDragonBoatDayTab4ScrollItem._lastPos;
        // App.CommonUtil.playRewardFlyAction(rewardList,pos);
        var data = event.data;
        var rewardList = GameData.formatRewardItem(data.data.data.rewards);
        var pos = view._buyBtn.localToGlobal(view._buyBtn.width / 2, 20);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
        var curNum = view._data.limit - view.vo.getBuyLimitnum(view._data.sortId + 1);
        view._limitTxt.text = LanguageManager.getlocal('DragonBoatDayLimit', [curNum.toString()]);
        if (curNum <= 0) {
            view._buyBtn.setEnable(false);
        }
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._limitTxt, view._buyBtn, [0, view._buyBtn.height + 5]);
    };
    AcDragonBoatDayTab4ScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AcDragonBoatDayTab4ScrollItem.prototype.dispose = function () {
        var view = this;
        view._data = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY), this.eventCollectHandlerCallBack, this);
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this); 		
        _super.prototype.dispose.call(this);
    };
    AcDragonBoatDayTab4ScrollItem._lastReqIdx = null;
    AcDragonBoatDayTab4ScrollItem._lastPos = null;
    return AcDragonBoatDayTab4ScrollItem;
}(ScrollListItem));
__reflect(AcDragonBoatDayTab4ScrollItem.prototype, "AcDragonBoatDayTab4ScrollItem");
