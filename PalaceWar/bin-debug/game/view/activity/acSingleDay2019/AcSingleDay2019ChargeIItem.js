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
 * desc : 累计充值itemrender
 */
var AcSingleDay2019ChargeIItem = (function (_super) {
    __extends(AcSingleDay2019ChargeIItem, _super);
    function AcSingleDay2019ChargeIItem() {
        var _this = _super.call(this) || this;
        //item数据
        _this._itemData = undefined;
        //序号
        _this._curIdx = 0;
        _this._rechargeItem = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcSingleDay2019ChargeIItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019ChargeIItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019ChargeIItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019ChargeIItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_SINGLEDAY2019;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019ChargeIItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDay2019ChargeIItem.prototype.getUiCode = function () {
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
    AcSingleDay2019ChargeIItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view.width = 627;
        view.height = 237;
        this._itemData = data.id;
        this._curIdx = this._itemData;
        this._rechargeItem = data; //cfgObj.getChargeRewardById(this._itemData);
        //创建ui
        //背景图片
        var code = view.getUiCode();
        var bg = BaseBitmap.create("newsingledaytab2bottombg-" + code);
        this.addChild(bg);
        //消费红色标头   改变领取状态的时候需要更改这个图片
        var detailBgImg = BaseBitmap.create("acmidautumnview_titlebg");
        detailBgImg.width = 607;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, detailBgImg, bg, [0, 5]);
        this.addChild(detailBgImg);
        var line = BaseBitmap.create("public_line3");
        view.addChild(line);
        var roundTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        roundTxt.text = LanguageManager.getlocal("acMayDayTotal_recharge", [String(this._rechargeItem.needGem)]);
        line.width = roundTxt.textWidth + 280;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, detailBgImg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, roundTxt, line);
        view.addChild(roundTxt);
        var str = "1032_0_" + this._rechargeItem.specialReward + "_" + this.getUiCode() + "|" + this._rechargeItem.getReward;
        var rewardArr = GameData.formatRewardItem(str);
        var row = Math.ceil(rewardArr.length / 5); //行数
        var rewardBg = BaseBitmap.create("public_9_managebg");
        rewardBg.width = 570;
        rewardBg.height = row * 108 * 0.85 + (row - 1) * 5 + 10;
        view.addChild(rewardBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, rewardBg, detailBgImg, [0, detailBgImg.height + 10]);
        var scroStartY = 60;
        var len = Math.min(5, rewardArr.length);
        var tmpX = (view.width - len * 108 * 0.8 - (len - 1) * 7) / 2;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true);
            iconItem.setScale(0.8);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX + 7);
            if (tmpX > bg.width - 8) {
                tmpX = (view.width - len * 108 * 0.8 - (len - 1) * 7) / 2;
                scroStartY += (iconItem.height * iconItem.scaleX) + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * iconItem.scaleX + 7);
            }
            this.addChild(iconItem);
        }
        scroStartY += 110;
        bg.height = scroStartY + 60;
        this.height = bg.height;
        //进度条
        this._progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 435);
        this._progress.x = 25;
        // progress.y = 185;
        this._progress.y = rewardBg.y + rewardBg.height + 30;
        this.addChild(this._progress);
        this.refreshBtnStatus();
    };
    //刷新按钮状态
    AcSingleDay2019ChargeIItem.prototype.refreshBtnStatus = function () {
        var tmpVo = this.vo;
        if (!tmpVo) {
            return;
        }
        var chargeTotal = tmpVo.getChargeNum();
        this._progress.setText(LanguageManager.getlocal("acCarnivalProgressText", [String(chargeTotal), this._rechargeItem.needGem.toString()]));
        this._progress.setPercentage(chargeTotal / this._rechargeItem.needGem);
        if (this._collectFlag)
            this.removeChild(this._collectFlag);
        this._collectFlag = null;
        if (this._collectBtn)
            this.removeChild(this._collectBtn);
        this._collectBtn = null;
        if (this._chargeBtn)
            this.removeChild(this._chargeBtn);
        this._chargeBtn = null;
        //检查是否创建已经领取标签
        if (tmpVo.isGetRecharge(this._itemData)) {
            this.createCollectFlag();
        }
        else {
            if (chargeTotal >= this._rechargeItem.needGem) {
                var collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "ac_recharge_Btntxt2", this.eventCollectHandler, this);
                collectBtn.x = this._progress.x + this._progress.width + 10;
                collectBtn.y = this._progress.y + this._progress.height - collectBtn.height;
                collectBtn.name = "collectBtn";
                this.addChild(collectBtn);
                this._collectBtn = collectBtn;
            }
            else {
                var chargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "acCarnivalToChargeBtnText", this.goRechargeHandler, this);
                chargeBtn.x = this._progress.x + this._progress.width + 10;
                chargeBtn.y = this._progress.y + this._progress.height - chargeBtn.height;
                chargeBtn.name = "costBtn";
                this.addChild(chargeBtn);
                this._chargeBtn = chargeBtn;
                if (!this.vo.isInActivity()) {
                    this._chargeBtn.setEnable(false);
                }
            }
        }
    };
    AcSingleDay2019ChargeIItem.prototype.refreshUI = function () {
        if (this.getChildByName("collectBtn")) {
            this.getChildByName("collectBtn").visible = false;
        }
        if (this._collectFlag) {
            this.removeChild(this._collectFlag);
            this._collectFlag = null;
        }
        /**
         * 展示已领取
         */
        this.createCollectFlag();
        this._collectFlag.visible = false;
        this._collectFlag.setScale(1.3);
        this._collectFlag.visible = true;
        egret.Tween.get(this._collectFlag).to({ scaleX: 0.7, scaleY: 0.7 }, 300);
    };
    AcSingleDay2019ChargeIItem.prototype.createCollectFlag = function () {
        this._collectFlag = BaseBitmap.create("collectflag");
        this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
        this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
        this._collectFlag.setScale(0.7);
        this._collectFlag.x = this._progress.x + this._progress.width + 80;
        this._collectFlag.y = this._progress.y + this._progress.height - 30;
        this.addChild(this._collectFlag);
    };
    AcSingleDay2019ChargeIItem.prototype.eventCollectHandler = function (event) {
        if (this.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        this.vo.lastidx = this._itemData;
        this.vo.lastpos = this._collectBtn.localToGlobal(this._collectBtn.width / 2 + 50, 20);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SDNEWGETRECHARGE, {
            activeId: this.acTivityId,
            rkey: this._itemData
        });
    };
    AcSingleDay2019ChargeIItem.prototype.goRechargeHandler = function (event) {
        if (this.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcSingleDay2019ChargeIItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcSingleDay2019ChargeIItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcSingleDay2019ChargeIItem.prototype.dispose = function () {
        this._itemData = null;
        this._collectFlag = null;
        this._progress = null;
        this._collectBtn = null;
        this._chargeBtn = null;
        this._curIdx = 0;
        this._rechargeItem = null;
        // this._lastReqIdx = null;
        _super.prototype.dispose.call(this);
    };
    return AcSingleDay2019ChargeIItem;
}(ScrollListItem));
__reflect(AcSingleDay2019ChargeIItem.prototype, "AcSingleDay2019ChargeIItem");
//# sourceMappingURL=AcSingleDay2019ChargeIItem.js.map