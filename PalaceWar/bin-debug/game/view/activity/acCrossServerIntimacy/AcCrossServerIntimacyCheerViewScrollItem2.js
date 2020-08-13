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
 * 排行列表
 * author ycg
 * date 2020.4.20
 * @class RankScrollItem
 */
var AcCrossServerIntimacyCheerViewScrollItem2 = (function (_super) {
    __extends(AcCrossServerIntimacyCheerViewScrollItem2, _super);
    function AcCrossServerIntimacyCheerViewScrollItem2() {
        var _this = _super.call(this) || this;
        _this._rowIdx = 0;
        _this._uiData = undefined;
        _this._aid = "";
        _this._code = "";
        return _this;
    }
    Object.defineProperty(AcCrossServerIntimacyCheerViewScrollItem2.prototype, "aid", {
        get: function () {
            return this._aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerIntimacyCheerViewScrollItem2.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerIntimacyCheerViewScrollItem2.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "7";
                break;
        }
        return code;
    };
    Object.defineProperty(AcCrossServerIntimacyCheerViewScrollItem2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerIntimacyCheerViewScrollItem2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerIntimacyCheerViewScrollItem2.prototype.initItem = function (index, data, itemParam) {
        // console.log("intiitem ",data);
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this._rowIdx = index;
        this._uiData = data;
        this.width = 620;
        // this.height = 124;
        this.addTouch(this.eventHandler, this, null, true);
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (data.uid) {
            if (data.uid == Api.playerVoApi.getPlayerID()) {
                tarColor = TextFieldConst.COLOR_WARN_GREEN4;
            }
        }
        else {
            if (data.aid == Api.playerVoApi.getPlayerAllianceId()) {
                tarColor = TextFieldConst.COLOR_WARN_GREEN4;
            }
        }
        if (this._rowIdx < 3) {
            var guang = BaseBitmap.create("accshegemony_ranklistbg" + String(this._rowIdx + 1));
            guang.width = this.width;
            guang.height = 76;
            guang.x = this.width / 2 - guang.width / 2;
            this.addChild(guang);
            var rankImg = BaseBitmap.create("accshegemonyprank" + String(this._rowIdx + 1));
            rankImg.setScale(0.9);
            rankImg.x = 70 - rankImg.width / 2 * rankImg.scaleX - 20;
            rankImg.y = 15; //this.height/2 - rankImg.height/2;
            this.addChild(rankImg);
        }
        else {
            var guang = BaseBitmap.create("accshegemony_ranklistbg");
            guang.width = this.width;
            guang.height = 76;
            guang.x = this.width / 2 - guang.width / 2;
            // guang.y = this.height/2 - guang.height/2 - 2;
            this.addChild(guang);
            var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
            rankTxt.text = String(this._rowIdx + 1);
            rankTxt.x = 70 - rankTxt.width / 2 - 20;
            rankTxt.y = 30;
            this.addChild(rankTxt);
        }
        var nameTxt = ComponentManager.getTextField(this._uiData.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
        nameTxt.x = 170 - nameTxt.width / 2;
        nameTxt.y = 30;
        this.addChild(nameTxt);
        var power = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
        power.text = App.StringUtil.changeIntToText(Number(this._uiData.point));
        power.x = 305 - power.width / 2;
        power.y = nameTxt.y;
        this.addChild(power);
        var cheerTotal = ComponentManager.getTextField("" + this._uiData.flagScore, TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
        cheerTotal.x = 430 - cheerTotal.width / 2;
        cheerTotal.y = nameTxt.y;
        this.addChild(cheerTotal);
        var pCherrNum = this.vo.getVoteNumByUid(this._uiData.uid);
        var playerCheer = ComponentManager.getTextField("" + pCherrNum, TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
        playerCheer.x = 550 - playerCheer.width / 2;
        playerCheer.y = nameTxt.y;
        this.addChild(playerCheer);
        // let maskImg = BaseBitmap.create("rank_select_mask")
        var maskImg = BaseBitmap.create("public_9_bg29");
        maskImg.height = 76;
        maskImg.width = this.width + 4;
        maskImg.x = this.width / 2 - maskImg.width / 2;
        maskImg.y = 0;
        maskImg.visible = false;
        this._maskImg = maskImg;
        this.addChild(maskImg);
        this.cacheAsBitmap = true;
    };
    AcCrossServerIntimacyCheerViewScrollItem2.prototype.eventHandler = function (event) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this._maskImg.visible = true;
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                this._maskImg.visible = false;
                break;
            case egret.TouchEvent.TOUCH_END:
                this._maskImg.visible = false;
                if (!this.vo.isInActivity()) {
                    this.vo.showAcEndTip();
                    return;
                }
                if (!this.vo.isInFightFlagUseTime() || this.vo.isInAcPreTime()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverImacyIsShowTimeNoFlag", this.getUiCode())));
                    return;
                }
                var num = this.vo.getFightFlagNum();
                if (num <= 0) {
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverImacyNoFlag", this.getUiCode())));
                    return;
                }
                var isLimit = this.vo.isLimitFightFlagNum(this._uiData.uid);
                if (isLimit) {
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverImacyAddFlagTooMuch", this.getUiCode()), ["" + this.cfg.flagPeopleNum]));
                    return;
                }
                var itemId = 1060;
                ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERIMACYUSEFLAGPOPUPVIEW, { aid: this.aid, code: this.code, itemId: itemId, fuid: this._uiData.uid, aname: this._uiData.name });
                break;
        }
    };
    AcCrossServerIntimacyCheerViewScrollItem2.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    AcCrossServerIntimacyCheerViewScrollItem2.prototype.getSpaceY = function () {
        return 5;
    };
    AcCrossServerIntimacyCheerViewScrollItem2.prototype.dispose = function () {
        this._maskImg = null;
        this._rowIdx = null;
        this._uiData = null;
        this.cacheAsBitmap = false;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerIntimacyCheerViewScrollItem2;
}(ScrollListItem));
__reflect(AcCrossServerIntimacyCheerViewScrollItem2.prototype, "AcCrossServerIntimacyCheerViewScrollItem2");
//# sourceMappingURL=AcCrossServerIntimacyCheerViewScrollItem2.js.map