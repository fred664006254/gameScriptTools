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
 * 母亲节奖励宝箱奖励预览弹板
 * author qianjun
 */
var AcRyeHarvestRewardPopupView = (function (_super) {
    __extends(AcRyeHarvestRewardPopupView, _super);
    function AcRyeHarvestRewardPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcRyeHarvestRewardPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRyeHarvestRewardPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRyeHarvestRewardPopupView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRyeHarvestRewardPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRyeHarvestRewardPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcRyeHarvestRewardPopupView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 2:
                code = '1';
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcRyeHarvestRewardPopupView.prototype.getTitleStr = function () {
        return "dailyTaskRewardPreviewPopuiViewTitle";
    };
    AcRyeHarvestRewardPopupView.prototype.initView = function () {
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var view = this;
        var data = this.param.data;
        var rewardId = data.id;
        var mustStr = '';
        var canReward = null;
        var rewardCfg = rewardId == 11 ? view.cfg.bigPrize : view.cfg.achievement[rewardId - 1];
        mustStr = rewardCfg.getReward;
        var ofy = 51;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 180;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 116 - ofy;
        this._nodeContainer.addChild(bg);
        var topBg = BaseBitmap.create("public_9_bg3");
        this._nodeContainer.addChild(topBg);
        var tipTxt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        var strTitle = "ryeharvestrewardtip1-" + view.getUiCode();
        if (rewardId == 11) {
            strTitle = "ryeharvestrewardtip3-" + view.getUiCode();
        }
        else if (rewardId > 5) {
            strTitle = "ryeharvestrewardtip2-" + view.getUiCode();
        }
        tipTxt1.text = LanguageManager.getlocal(strTitle);
        topBg.width = tipTxt1.textWidth + 40;
        topBg.x = this.viewBg.x + this.viewBg.width / 2 - topBg.width / 2;
        topBg.y = 65 - ofy;
        tipTxt1.x = topBg.x + topBg.width / 2 - tipTxt1.width / 2;
        tipTxt1.y = topBg.y + topBg.height / 2 - tipTxt1.height / 2 + 20;
        this._nodeContainer.addChild(tipTxt1);
        var tipTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        tipTxt2.text = LanguageManager.getlocal("ryeharvestrewardtip4-" + view.getUiCode());
        tipTxt2.x = bg.x + 10;
        tipTxt2.y = bg.y + 20;
        this._nodeContainer.addChild(tipTxt2);
        if (!canReward) {
            canReward = [];
        }
        var resultStr = mustStr;
        for (var index = 0; index < canReward.length; index++) {
            resultStr = resultStr + "|" + canReward[index];
        }
        var rewardArr = GameData.formatRewardItem(resultStr);
        var lineNum = Math.ceil(rewardArr.length / 4);
        var rbg = BaseBitmap.create("public_9_bg1");
        rbg.width = bg.width - 20;
        rbg.height = 120 * lineNum;
        rbg.x = this.viewBg.x + this.viewBg.width / 2 - rbg.width / 2;
        rbg.y = tipTxt2.y + tipTxt2.height + 10;
        this._nodeContainer.addChild(rbg);
        bg.height = rbg.height + 90;
        // let rewardX = rbg.x + (data.type == AcConst.AID_ACMAYDAY ||data.type == AcConst.AID_ACARCHER||data.type == AcConst.AID_LABORDAY ? ((500 - 108 * rewardArr.length - 10 * (rewardArr.length - 1)) / 2): 10);//rewardX = rbg.x + (500 - 108 * rewardArr.length - 10 * (rewardArr.length - 1)) / 2;
        var rewardX = rbg.x + 10;
        var rewardY = rbg.y + 10;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true);
            if (index > 0) {
                rewardX += (iconItem.width + 10);
                if (index % 4 == 0) {
                    // rewardX = rewardX = rbg.x + (data.type == AcConst.AID_ACMAYDAY || data.type == AcConst.AID_ACARCHER||data.type == AcConst.AID_LABORDAY ? ((500 - 108 * rewardArr.length - 10 * (rewardArr.length - 1)) / 2): 10);
                    rewardX = rewardX = rbg.x + 10;
                    rewardY += iconItem.height + 5;
                }
            }
            iconItem.x = rewardX;
            iconItem.y = rewardY;
            this._nodeContainer.addChild(iconItem);
        }
        var btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "confirmBtn", view.hide, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, bg, [0, bg.height + 20]);
        this._nodeContainer.addChild(btn);
    };
    AcRyeHarvestRewardPopupView.prototype.getShowHeight = function () {
        return 425;
    };
    AcRyeHarvestRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcRyeHarvestRewardPopupView.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcRyeHarvestRewardPopupView;
}(PopupView));
__reflect(AcRyeHarvestRewardPopupView.prototype, "AcRyeHarvestRewardPopupView");
