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
author : qinajun
date : 2018.4.14
desc : 活动节日任务
*/
var AcDechuanshidaiPopupViewTab2 = (function (_super) {
    __extends(AcDechuanshidaiPopupViewTab2, _super);
    function AcDechuanshidaiPopupViewTab2(data) {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._claimText = null;
        _this._claimBtn = null;
        _this._itemTab = [];
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcDechuanshidaiPopupViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiPopupViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiPopupViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDechuanshidaiPopupViewTab2.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcDechuanshidaiPopupViewTab2.prototype.initView = function () {
        var view = this;
        // let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
        view.height = 660;
        view.width = 545;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DECHUAN_CLAIM), this.rewardCallBack, this);
        var code = view.getUiCode();
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 535;
        Bg.height = 650;
        Bg.x = 30;
        Bg.y = 55;
        view.addChild(Bg);
        var topbg = BaseBitmap.create("dechuanchangetopbg-" + code);
        view.addChild(topbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, Bg, [0, 5]);
        var pos = {
            1: [55, 40],
            2: [400, 40],
            3: [55, 175],
            4: [400, 175],
        };
        var need = {};
        var cfg = view.cfg.claim[1];
        if (cfg.costdeZi) {
            need[1] = cfg.costdeZi;
        }
        if (cfg.costchuanZi) {
            need[2] = cfg.costchuanZi;
        }
        if (cfg.costshiZi) {
            need[3] = cfg.costshiZi;
        }
        if (cfg.costdaiZi) {
            need[4] = cfg.costdaiZi;
        }
        for (var i = 1; i < 5; ++i) {
            var img = BaseBitmap.create("dechuantype" + i + "-" + code);
            view.addChild(img);
            img.setScale(0.8);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, img, Bg, pos[i]);
            var typeTxt = ComponentManager.getTextField("X" + need[i], 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            typeTxt.name = "typeTxt" + i;
            view.addChild(typeTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, typeTxt, img, [0, img.height * img.scaleY - 6]);
        }
        view._claimBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "exchange", this.claimHandle, this, [1]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._claimBtn, topbg, [0, 15]);
        view.addChild(view._claimBtn);
        var wife_btnbg = BaseBitmap.create("wife_btnbg");
        wife_btnbg.name = "wife_btnbg";
        view.addChild(wife_btnbg);
        wife_btnbg.width = 130;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, wife_btnbg, view._claimBtn, [0, -wife_btnbg.height - 5]);
        view._claimText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._claimText, wife_btnbg);
        view.addChild(this._claimText);
        view.resetTop();
        var vo = this.vo;
        var shopArr = vo.getArr("claim");
        var container = new BaseDisplayObjectContainer();
        container.width = 530;
        var posY = 0;
        for (var i = 1; i < shopArr.length; i++) {
            var item = new AcDechuanshidaiExchangeItem();
            item.init(shopArr[i], view.code, this.claimHandle, this);
            item.setPosition(0, 135 * (i - 1));
            container.addChild(item);
            view._itemTab.push(item);
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 530, 350);
        var scrollView = ComponentManager.getScrollView(container, rect);
        scrollView.bounces = false;
        scrollView.horizontalScrollPolicy = "off";
        this.addChild(scrollView);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollView, topbg, [0, topbg.height + 3]);
        view.sortItems();
    };
    AcDechuanshidaiPopupViewTab2.prototype.update = function () {
        var view = this;
        if (!this.vo) {
            return;
        }
        this.resetTop();
        this.sortItems();
        // for(let i = 1; i < 5; ++ i){
        //     let typeTxt = <BaseTextField>view.getChildByName(`typeTxt${i}`);
        //     typeTxt.text = `X${view.vo.dayNumById(i)}`;
        // }
    };
    AcDechuanshidaiPopupViewTab2.prototype.sortItems = function () {
        this._itemTab.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
        for (var i = 0; i < this._itemTab.length; i++) {
            this._itemTab[i].y = 135 * i;
            this._itemTab[i].resetBtn();
        }
    };
    AcDechuanshidaiPopupViewTab2.prototype.resetTop = function () {
        var vo = this.vo;
        var shopArr = vo.getArr("claim");
        var topCfg = shopArr[0];
        var claimNum = topCfg.limit - vo.getBuyLimitnum(1);
        if (claimNum > 0) {
            this._claimText.text = LanguageManager.getlocal("acDechuanshidaiClaimTimes", [String(claimNum)]);
        }
        else {
            this._claimText.text = LanguageManager.getlocal("acDechuanshidaiClaimTimes2", [String(claimNum)]);
            this._claimBtn.setEnable(false);
        }
        var claimbg = this.getChildByName("wife_btnbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._claimText, claimbg);
        var cfg = this.cfg.claim[1];
        var need = {};
        if (cfg.costdeZi) {
            need[1] = cfg.costdeZi;
        }
        if (cfg.costchuanZi) {
            need[2] = cfg.costchuanZi;
        }
        if (cfg.costshiZi) {
            need[3] = cfg.costshiZi;
        }
        if (cfg.costdaiZi) {
            need[4] = cfg.costdaiZi;
        }
        if (vo.dayNumById(1) >= need[1] && vo.dayNumById(2) >= need[2] && vo.dayNumById(3) >= need[3] && vo.dayNumById(4) >= need[4]) {
            App.DisplayUtil.changeToNormal(this._claimBtn);
        }
        else {
            App.DisplayUtil.changeToGray(this._claimBtn);
        }
    };
    AcDechuanshidaiPopupViewTab2.prototype.claimHandle = function (idx) {
        if (this.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var shopArr = this.vo.getArr("claim");
        var oneCfg = shopArr[idx - 1];
        if (oneCfg.costdeZi) {
            if (oneCfg.costdeZi > this.vo.dayNumById(1)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acDechuanshidaitip5-" + this.getUiCode(), [LanguageManager.getlocal("acDechuanshidaifont1-" + this.getUiCode())]));
                return;
            }
        }
        if (oneCfg.costchuanZi) {
            if (oneCfg.costchuanZi > this.vo.dayNumById(2)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acDechuanshidaitip5-" + this.getUiCode(), [LanguageManager.getlocal("acDechuanshidaifont2-" + this.getUiCode())]));
                return;
            }
        }
        if (oneCfg.costshiZi) {
            if (oneCfg.costshiZi > this.vo.dayNumById(3)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acDechuanshidaitip5-" + this.getUiCode(), [LanguageManager.getlocal("acDechuanshidaifont3-" + this.getUiCode())]));
                return;
            }
        }
        if (oneCfg.costdaiZi) {
            if (oneCfg.costdaiZi > this.vo.dayNumById(4)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acDechuanshidaitip5-" + this.getUiCode(), [LanguageManager.getlocal("acDechuanshidaifont4-" + this.getUiCode())]));
                return;
            }
        }
        this.vo.lastidx = idx;
        if (idx == 1) {
            this.vo.lastpos = this._claimText.localToGlobal(this._claimText.width, 20);
        }
        NetManager.request(NetRequestConst.REQUEST_DECHUAN_CLAIM, {
            activeId: this.acTivityId,
            shopId: idx
        });
    };
    AcDechuanshidaiPopupViewTab2.prototype.rewardCallBack = function (evt) {
        var view = this;
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = rData.rewards;
        var cfg = view.cfg.claim[this.vo.lastidx];
        var str = rewards;
        var replacerewards = rData.replacerewards;
        if (replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
        }
        var rewardList = GameData.formatRewardItem(str);
        var pos = this.vo.lastpos;
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    AcDechuanshidaiPopupViewTab2.prototype.dispose = function () {
        var view = this;
        view._claimText = null;
        view._claimBtn = null;
        view._itemTab = [];
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DECHUAN_CLAIM), this.rewardCallBack, this);
        _super.prototype.dispose.call(this);
    };
    return AcDechuanshidaiPopupViewTab2;
}(AcCommonViewTab));
__reflect(AcDechuanshidaiPopupViewTab2.prototype, "AcDechuanshidaiPopupViewTab2");
//# sourceMappingURL=AcDechuanshidaiPopupViewTab2.js.map