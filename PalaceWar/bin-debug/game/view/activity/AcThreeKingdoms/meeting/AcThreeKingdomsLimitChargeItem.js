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
 * desc : 三国限时军需充值item
 */
var AcThreeKingdomsLimitChargeItem = (function (_super) {
    __extends(AcThreeKingdomsLimitChargeItem, _super);
    function AcThreeKingdomsLimitChargeItem() {
        var _this = _super.call(this) || this;
        _this._rechargeItem = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsLimitChargeItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsLimitChargeItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsLimitChargeItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsLimitChargeItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_THREEKINGDOMS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsLimitChargeItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsLimitChargeItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcThreeKingdomsLimitChargeItem.prototype.initItem = function (index, data, itemparam) {
        var _this = this;
        var view = this;
        view._code = itemparam;
        view.width = 605;
        view.height = 235 + 10;
        this._rechargeItem = data; //cfgObj.getChargeRewardById(this._itemData);
        //创建ui
        //背景图片
        var bg = BaseBitmap.create("public_scrollitembg");
        bg.width = view.width;
        bg.height = view.height - 10;
        this.addChild(bg);
        //消费红色标头   改变领取状态的时候需要更改这个图片
        var charge_redBg = BaseBitmap.create("shopview_itemtitle");
        charge_redBg.y = 0;
        charge_redBg.width = 250;
        this.addChild(charge_redBg);
        var Txt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        Txt1.text = LanguageManager.getlocal("acMayDayTotal_recharge", [String(this._rechargeItem.needGem)]);
        Txt1.x = charge_redBg.x + 20;
        Txt1.y = charge_redBg.y + 7;
        this.addChild(Txt1);
        var rewardBg = BaseBitmap.create("public_scrolllistbg");
        rewardBg.width = 420;
        rewardBg.height = 107;
        rewardBg.x = bg.x + 15;
        rewardBg.y = charge_redBg.y + charge_redBg.height + 10;
        this.addChild(rewardBg);
        var str = "1045_1_" + data.specialReward1 + "|1046_1_" + data.specialReward2;
        var contentList = GameData.formatRewardItem(str);
        var reward = "";
        var scroStartY = rewardBg.y + 5;
        var tmpX = rewardBg.x + 8;
        var deltaS = 1;
        for (var index_1 = 0; index_1 < contentList.length; index_1++) {
            var tmpData = contentList[index_1];
            var iconItem = GameData.getItemIcon(tmpData, true);
            iconItem.setScale(deltaS);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * deltaS + 7);
            if (tmpX > rewardBg.x + rewardBg.width - 5) {
                tmpX = rewardBg.x + 8;
                scroStartY += iconItem.height * deltaS + 5;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * deltaS + 7);
            }
            this.addChild(iconItem);
        }
        scroStartY += 113;
        rewardBg.height = scroStartY - rewardBg.y + 2;
        rewardBg.width = 240;
        bg.height = Math.max(236, rewardBg.y + rewardBg.height + 40);
        //进度条
        var progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 420);
        progress.x = 15;
        // progress.y = 185;
        progress.y = scroStartY + 17;
        this.addChild(progress);
        var tmpVo = this.vo;
        var chargeTotal = tmpVo.getChargeNum();
        progress.setText(LanguageManager.getlocal("acCarnivalProgressText", [String(chargeTotal), data.needGem.toString()]));
        progress.setPercentage(chargeTotal / data.needGem);
        //检查是否创建已经领取标签
        if (tmpVo.isGetRecharge(data.id)) {
            var collectFlag = BaseBitmap.create("collectflag");
            collectFlag.anchorOffsetX = collectFlag.width / 2;
            collectFlag.anchorOffsetY = collectFlag.height / 2;
            collectFlag.setScale(0.7);
            collectFlag.x = progress.x + progress.width + 80;
            collectFlag.y = progress.y + progress.height / 2 - 10;
            this.addChild(collectFlag);
        }
        else {
            if (chargeTotal >= this._rechargeItem.needGem) {
                var collectBtn_1 = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "ac_recharge_Btntxt2", function () {
                    if (_this.vo.et < GameData.serverTime) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
                        return;
                    }
                    if (!_this.vo.isInChargeTime()) {
                        App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsLimitChargeTimeTip2", _this.code)));
                        return;
                    }
                    _this.vo.lastidx = data.id;
                    _this.vo.lastpos = collectBtn_1.localToGlobal(collectBtn_1.width / 2 + 50, 20);
                    NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_RECHAGRERWD, {
                        activeId: _this.acTivityId,
                        rkey: data.id
                    });
                }, this);
                collectBtn_1.x = progress.x + progress.width + 5;
                collectBtn_1.y = progress.y + progress.height / 2 - collectBtn_1.height / 2;
                this.addChild(collectBtn_1);
            }
            else {
                var chargeBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, "acCarnivalToChargeBtnText", this.goRechargeHandler, this);
                chargeBtn.x = progress.x + progress.width + 10;
                chargeBtn.y = progress.y + progress.height / 2 - chargeBtn.height / 2;
                this.addChild(chargeBtn);
                if (!this.vo.isInChargeTime()) {
                    chargeBtn.setGray(false);
                }
            }
        }
        // if (itemparam.id == data.id) {
        // 	let light = BaseBitmap.create("public_9_bg57")
        // 	light.width = bg.width + 10;
        // 	light.height = bg.height + 14;
        // 	light.setPosition(bg.x - 6, bg.y - 6);
        // 	this.addChild(light);
        // 	egret.Tween.get(light, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
        // }
    };
    AcThreeKingdomsLimitChargeItem.prototype.goRechargeHandler = function (event) {
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if (!this.vo.isInChargeTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsLimitChargeTimeTip2", this.code)));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcThreeKingdomsLimitChargeItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcThreeKingdomsLimitChargeItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcThreeKingdomsLimitChargeItem.prototype.dispose = function () {
        this._rechargeItem = null;
        // this._lastReqIdx = null;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsLimitChargeItem;
}(ScrollListItem));
__reflect(AcThreeKingdomsLimitChargeItem.prototype, "AcThreeKingdomsLimitChargeItem");
//# sourceMappingURL=AcThreeKingdomsLimitChargeItem.js.map