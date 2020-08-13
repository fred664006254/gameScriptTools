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
/*
author : jiang
date : 2018.9.4
desc : 限时礼包
*/
var LimitedGiftView = (function (_super) {
    __extends(LimitedGiftView, _super);
    function LimitedGiftView() {
        var _this = _super.call(this) || this;
        // private titleImg: BaseBitmap = null;
        _this.contentList = null;
        _this._scrollList = null;
        _this._rechargeCfgMap = null;
        _this.lightImage = null;
        return _this;
    }
    // private _rechargeCfgMap = {
    // 	g29: "LimitedGiftSoldierEmpty",//士兵空了
    // 	g30: "LimitedGiftGoldEmpty",	//银两空了
    // 	g31: "LimitedGiftPowerEmpty",	//体力空了
    // 	g32: "LimitedGiftEnergyEmpty",	//红颜精力空了
    // 	g33: "LimitedGiftVigourEmpty",  //子嗣活力空了
    // 	g34: "LimitedGiftDinnerEmpty"	//酒楼举办宴会
    // };
    LimitedGiftView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.refreshListData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LIMITEDGIFT_REFRESHLIST, this.refreshList, this);
        // this.titleImg = BaseBitmap.create("limitedgiftview_title");
        // // this.titleImg.x = this.viewBg.x + this.viewBg.width/2 - this.titleImg.width/2;
        // this.titleImg.y = this.viewBg.y + 5;
        // this.addChild(this.titleImg);
        // this.addChildToContainer(this.titleImg);
        this.showList();
        this.lightImage = BaseBitmap.create("limitedgiftview_bg_light");
        this.addChild(this.lightImage);
    };
    LimitedGiftView.prototype.showList = function () {
        //设置列表数据
        this.contentList = [];
        this._rechargeCfgMap = Api.limitedGiftVoApi.rechargeCfgMap;
        var vo = null;
        var cfg = null;
        var test = null;
        //当前弹出的key
        var showKey = Api.shopVoApi.getPayShow();
        var redKey = Api.shopVoApi.getPayRedpoint();
        for (var key in this._rechargeCfgMap) {
            var isOpen = false;
            if (showKey) {
                if (key == showKey) {
                    isOpen = true;
                }
            }
            else {
                if (redKey) {
                    if (key == redKey) {
                        isOpen = true;
                    }
                }
            }
            vo = Api.shopVoApi.getPayInfoById2(key);
            cfg = Config.RechargeCfg.getRechargeItemCfgByKey(key);
            if (vo && cfg && vo.isbuy == 0) {
                var timeTmp = vo.st + cfg.lastTime - GameData.serverTime;
                if (timeTmp > 0) {
                    var isMaxRefuse = Api.limitedGiftVoApi.isMaxLimitedGiftRefuseNum(key);
                    var contentData = { color: this._rechargeCfgMap[key].color, rechargeId: key, isOpen: isOpen, title: this._rechargeCfgMap[key].title, img: this._rechargeCfgMap[key].img, cost: cfg.cost, reward: cfg.getReward, time: vo.st + cfg.lastTime, gemCost: cfg.gemCost, num: this._rechargeCfgMap[key].num, showTip: isMaxRefuse };
                    this.contentList.push(contentData);
                }
            }
        }
        this.contentList.sort(function (a, b) {
            return a.time - b.time;
        });
        if (showKey == null && redKey == null) {
            if (this.contentList.length > 0) {
                this.contentList[0].isOpen = true;
            }
        }
        var curIndex = 0;
        for (var i = 0; i < this.contentList.length; i++) {
            if (this.contentList[i].isOpen) {
                curIndex = i;
                break;
            }
        }
        for (var i = 0; i < this.contentList.length; i++) {
            this.contentList[i].isShowTime = (this.contentList.length > 1);
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 566, Math.min(680, (this.contentList.length - 1) * 49 + 443));
        this._scrollList = ComponentManager.getScrollList(LimitedGiftScrollItem, this.contentList, rect);
        this._scrollList.x = this.viewBg.x + this.viewBg.width / 2 - this._scrollList.width / 2;
        if (this.contentList.length > 0) {
            this._scrollList.setScrollTopByIndex(curIndex);
        }
        if (showKey) {
            NetManager.request(NetRequestConst.REQUEST_SHOP_SHOW1COSTSCENEGIFT, { showtype: 1 });
        }
        else {
            if (redKey) {
                NetManager.request(NetRequestConst.REQUEST_SHOP_SHOW1COSTSCENEGIFT, { showtype: 2 });
            }
        }
        this.addChild(this._scrollList);
    };
    LimitedGiftView.prototype.refreshList = function (event) {
        for (var i = 0; i < this.contentList.length; i++) {
            if (i == event.data) {
                this.contentList[i].isOpen = true;
            }
            else {
                this.contentList[i].isOpen = false;
            }
        }
        this._scrollList.refreshData(this.contentList);
    };
    LimitedGiftView.prototype.refreshListData = function () {
        //设置列表数据
        this.contentList = [];
        this._rechargeCfgMap = Api.limitedGiftVoApi.rechargeCfgMap;
        var vo = null;
        var cfg = null;
        var test = null;
        //当前弹出的key
        var showKey = Api.shopVoApi.getPayShow();
        for (var key in this._rechargeCfgMap) {
            var isOpen = false;
            if (key == showKey) {
                isOpen = true;
            }
            vo = Api.shopVoApi.getPayInfoById2(key);
            cfg = Config.RechargeCfg.getRechargeItemCfgByKey(key);
            if (vo && cfg && vo.isbuy == 0) {
                var timeTmp = vo.st + cfg.lastTime - GameData.serverTime;
                if (timeTmp > 0) {
                    var isMaxRefuse = Api.limitedGiftVoApi.isMaxLimitedGiftRefuseNum(key);
                    var contentData = { color: this._rechargeCfgMap[key].color, rechargeId: key, isOpen: isOpen, title: this._rechargeCfgMap[key].title, img: this._rechargeCfgMap[key].img, cost: cfg.cost, reward: cfg.getReward, time: vo.st + cfg.lastTime, gemCost: cfg.gemCost, num: this._rechargeCfgMap[key].num, showTip: isMaxRefuse };
                    this.contentList.push(contentData);
                }
            }
        }
        this.contentList.sort(function (a, b) {
            return a.time - b.time;
        });
        if (showKey == null) {
            if (this.contentList.length > 0) {
                this.contentList[0].isOpen = true;
            }
        }
        var curIndex = 0;
        for (var i = 0; i < this.contentList.length; i++) {
            if (this.contentList[i].isOpen) {
                curIndex = i;
                break;
            }
        }
        for (var i = 0; i < this.contentList.length; i++) {
            this.contentList[i].isShowTime = (this.contentList.length > 1);
        }
        if (this.contentList.length > 0) {
            this._scrollList.refreshData(this.contentList);
            this._scrollList.setScrollTopByIndex(curIndex);
        }
        else {
            this.hide();
        }
    };
    LimitedGiftView.prototype.getBgName = function () {
        return "limitedgiftview_bg";
    };
    /**
 * 重置背景的高度 主要设置 btn的位置
 * 仅适用于新的分享
 */
    LimitedGiftView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.viewBg.height = this._scrollList.height + 90;
        this.viewBg.y = GameConfig.stageHeigth / 2 - this.viewBg.height / 2;
        this._scrollList.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._scrollList.width / 2, this.viewBg.y + 75);
        this.closeBtn.setPosition(this.viewBg.x + this.viewBg.width - this.closeBtn.width, this.viewBg.y + 10);
        this._hudieClip.x = this.closeBtn.x - 45;
        this._hudieClip.y = this.closeBtn.y - 45;
        this.lightImage.x = this.viewBg.x;
        this.lightImage.y = this.viewBg.y + this.viewBg.height - this.lightImage.height + 12;
        //增加vip经验的提示
        var tipBg = BaseBitmap.create("public_searchdescbg");
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("addVipExpTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipBg.width = tipTxt.width + 60;
        tipBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - tipBg.width / 2, this.viewBg.y + this.viewBg.height + 10);
        tipTxt.setPosition(tipBg.x + tipBg.width / 2 - tipTxt.width / 2, tipBg.y + tipBg.height / 2 - tipTxt.height / 2);
        this.addChild(tipBg);
        this.addChild(tipTxt);
    };
    LimitedGiftView.prototype.initViewBg = function () {
        this.viewBg.height = 850;
    };
    LimitedGiftView.prototype.getTitleStr = function () {
        return null;
    };
    LimitedGiftView.prototype.receivePushData = function (event) {
        var data = event.data;
        if (data.data.ret == 0 && data.data.cmd == NetPushConst.PUSH_PAY) {
            var cfg = Config.RechargeCfg.getRechargeItemCfgByKey(data.data.data.payment.itemId);
            var rewards = "1_1_" + cfg.gemCost + "|" + data.data.data.rewards;
            var rewObj = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewObj);
            // if(data.data.data.payment)
            // {
            // let itemid=data.data.data.payment.itemId;
            // PlatformManager.analyticsPay(itemid,data.data.data.payment.orderId,);
            // }
            this.refreshListData();
        }
    };
    /**
     * 重新一下关闭按钮
     * 仅适用于新的分享
     */
    LimitedGiftView.prototype.getCloseBtnName = function () {
        return "sharepopupview_closebtn";
    };
    LimitedGiftView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "firstchargebutton01",
            "sharepopupview_closebtn",
            "limitedgiftview_bg_light",
            "limitedgiftnum_fnt",
        ]);
    };
    LimitedGiftView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LIMITEDGIFT_REFRESHLIST, this.refreshList, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.refreshListData, this);
        // this.titleImg = null;
        this.contentList = null;
        this._scrollList = null;
        this._rechargeCfgMap = null;
        this.lightImage = null;
        _super.prototype.dispose.call(this);
    };
    return LimitedGiftView;
}(PopupView));
__reflect(LimitedGiftView.prototype, "LimitedGiftView");
//# sourceMappingURL=LimitedGiftView.js.map