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
 * desc : 评定匈奴 累计充值itemrender
 */
var AcBeatXiongNuRechargeItem = (function (_super) {
    __extends(AcBeatXiongNuRechargeItem, _super);
    function AcBeatXiongNuRechargeItem() {
        var _this = _super.call(this) || this;
        //item数据
        _this._itemData = undefined;
        //序号
        _this._curIdx = 0;
        _this._rechargeItem = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcBeatXiongNuRechargeItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBeatXiongNuRechargeItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBeatXiongNuRechargeItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBeatXiongNuRechargeItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_BEATXIONGNU;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBeatXiongNuRechargeItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcBeatXiongNuRechargeItem.prototype.getUiCode = function () {
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
    AcBeatXiongNuRechargeItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view.width = 520;
        view.height = 210 + 10;
        this._itemData = data.id;
        this._curIdx = this._itemData;
        this._rechargeItem = data;
        //创建ui
        //背景图片
        var bg = BaseBitmap.create("beatxiongnulistbg");
        bg.width = view.width;
        bg.height = view.height - 10;
        this.addChild(bg);
        //消费红色标头   改变领取状态的时候需要更改这个图片
        this._detailBgImg = BaseBitmap.create("ac_skinoflibai_chargeitem_red");
        this._detailBgImg.y = 5;
        this._detailBgImg.x = 2;
        this.addChild(this._detailBgImg);
        var Txt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        Txt1.text = LanguageManager.getlocal("acMayDayTotal_recharge", [String(this._rechargeItem.needGem)]);
        Txt1.x = this._detailBgImg.x + 20;
        Txt1.y = this._detailBgImg.y + 10;
        this.addChild(Txt1);
        var str = "1051_1_" + data.specialGift;
        if (this._rechargeItem.getReward) {
            str += "|" + this._rechargeItem.getReward;
        }
        var rewardArr = GameData.formatRewardItem(str);
        var scroStartY = 70;
        var len = Math.min(5, rewardArr.length);
        var tmpX = (view.width - len * 108 * 0.8 - (len - 1) * 7) / 2;
        for (var index_1 = 0; index_1 < rewardArr.length; index_1++) {
            var iconItem = GameData.getItemIcon(rewardArr[index_1], true, true);
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
        this._progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 350);
        this._progress.x = 15;
        // progress.y = 185;
        this._progress.y = scroStartY;
        this.addChild(this._progress);
        this.refreshBtnStatus();
    };
    //刷新按钮状态
    AcBeatXiongNuRechargeItem.prototype.refreshBtnStatus = function () {
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
        //根据是否达到金额设置title颜色
        if (chargeTotal >= this._rechargeItem.needGem) {
            this._detailBgImg.texture = ResourceManager.getRes("ac_skinoflibai_chargeitem_green");
        }
        else {
            this._detailBgImg.texture = ResourceManager.getRes("ac_skinoflibai_chargeitem_red");
        }
        //检查是否创建已经领取标签
        if (tmpVo.isGetRecharge(this._itemData)) {
            this.createCollectFlag();
        }
        else {
            if (chargeTotal >= this._rechargeItem.needGem) {
                var collectBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "ac_recharge_Btntxt2", this.eventCollectHandler, this);
                collectBtn.x = this._progress.x + this._progress.width + 5;
                collectBtn.y = this._progress.y + this._progress.height / 2 - collectBtn.height / 2;
                collectBtn.name = "collectBtn";
                this.addChild(collectBtn);
                this._collectBtn = collectBtn;
            }
            else {
                var chargeBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, "acCarnivalToChargeBtnText", this.goRechargeHandler, this);
                chargeBtn.x = this._progress.x + this._progress.width + 5;
                chargeBtn.y = this._progress.y + this._progress.height / 2 - chargeBtn.height / 2;
                chargeBtn.name = "costBtn";
                this.addChild(chargeBtn);
                this._chargeBtn = chargeBtn;
                if (!this.vo.isInActivity()) {
                    this._chargeBtn.setEnable(false);
                }
            }
        }
    };
    AcBeatXiongNuRechargeItem.prototype.refreshUI = function () {
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
    AcBeatXiongNuRechargeItem.prototype.createCollectFlag = function () {
        this._collectFlag = BaseBitmap.create("collectflag");
        this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
        this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
        this._collectFlag.setScale(0.7);
        this._collectFlag.x = this._progress.x + this._progress.width + 80;
        this._collectFlag.y = this._progress.y + this._progress.height / 2 - 10;
        this.addChild(this._collectFlag);
    };
    AcBeatXiongNuRechargeItem.prototype.eventCollectHandler = function (event) {
        if (this.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        this.vo.lastidx = this._itemData;
        this.vo.lastpos = this._collectBtn.localToGlobal(this._collectBtn.width / 2 + 50, 20);
        NetManager.request(NetRequestConst.REQUEST_XIONGNU_RECHARGE, {
            activeId: this.acTivityId,
            rkey: this._itemData
        });
    };
    AcBeatXiongNuRechargeItem.prototype.goRechargeHandler = function (event) {
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcBeatXiongNuRechargeItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcBeatXiongNuRechargeItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcBeatXiongNuRechargeItem.prototype.dispose = function () {
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
    return AcBeatXiongNuRechargeItem;
}(ScrollListItem));
__reflect(AcBeatXiongNuRechargeItem.prototype, "AcBeatXiongNuRechargeItem");
//# sourceMappingURL=AcBeatXiongNuRechargeItem.js.map