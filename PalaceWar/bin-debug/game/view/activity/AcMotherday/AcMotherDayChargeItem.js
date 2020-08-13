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
 * 充值奖励item
 * author qianjun
 */
var AcMotherDayChargeItem = (function (_super) {
    __extends(AcMotherDayChargeItem, _super);
    function AcMotherDayChargeItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._btn = null;
        _this._Index = 0;
        return _this;
    }
    Object.defineProperty(AcMotherDayChargeItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMotherDayChargeItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMotherDayChargeItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_MOTHERDAY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMotherDayChargeItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcMotherDayChargeItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 2:
            case 5:
            case 6:
                code = '1';
                break;
            case 4:
                code = '3';
                break;
            case 7:
            case 8:
                code = '7';
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    Object.defineProperty(AcMotherDayChargeItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcMotherDayChargeItem.prototype.initItem = function (index, data, itemParam) {
        var view = this;
        view._data = data;
        view.width = 600;
        view._code = itemParam;
        view._id = data.id;
        view._Index = index;
        var reward = data.getReward;
        reward = "1007_0_" + data.specialGift + "_" + ((this.code == "5" || this.code == "6") ? this.code : view.getUiCode()) + "|" + reward;
        var rIcons = GameData.getRewardItemIcons(reward, true, true);
        var row = Math.ceil(rIcons.length / 5); //行数
        view.height = 5 + 30 + 5 + row * 108 + (row - 1) * 5 + 10 + 80 + view.getSpaceY();
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = view.width;
        bg.height = view.height - view.getSpaceY();
        view.addChild(bg);
        var charge_redBg = BaseBitmap.create("acmidautumnview_titlebg");
        charge_redBg.width = view.width - 25;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, charge_redBg, bg, [0, 10]);
        view.addChild(charge_redBg);
        var line = BaseBitmap.create("public_line3");
        view.addChild(line);
        var roundTxt = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyDrawRechargeNum-" + view.getUiCode(), [data.needGem]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        line.width = roundTxt.textWidth + 280;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, charge_redBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, roundTxt, line);
        view.addChild(roundTxt);
        var rewardBg = BaseBitmap.create("public_9_managebg");
        rewardBg.width = view.width - 20;
        rewardBg.height = row * 108 + (row - 1) * 5 + 10;
        view.addChild(rewardBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, rewardBg, charge_redBg, [0, charge_redBg.height + 5]);
        var tmpY = 5;
        for (var i in rIcons) {
            var icon = rIcons[i];
            var idx = Number(i);
            icon.x = rewardBg.x + 4 + (idx % 5) * (108 + 8);
            icon.y = rewardBg.y + 5 + Math.floor(idx / 5) * (108 + 5);
            view.addChild(icon);
        }
        var progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 430);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progress, titelTxt, [0,titelTxt.height+5]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progress, rewardBg, [2, rewardBg.height + 32]);
        view.addChild(progress);
        progress.setPercentage(view.vo.getChargeNum() / data.needGem, view.vo.getChargeNum() + "/" + data.needGem, TextFieldConst.COLOR_QUALITY_WHITE);
        var titelTxt = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyDrawRechargeTotalNum-" + view.getUiCode()), 20, TextFieldConst.COLOR_BROWN);
        view.addChild(titelTxt);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, titelTxt, rewardBg, [147,rewardBg.height+7]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titelTxt, progress, [0, -25]);
        if (view.vo.isGetRecharge(data.id)) {
            var flag = BaseBitmap.create("collectflag");
            flag.setScale(0.6);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, flag, bg, [10, 10]);
            view.addChild(flag);
        }
        else {
            var str = "";
            var res = "";
            if (view.vo.getChargeNum() < data.needGem) {
                res = ButtonConst.BTN_SMALL_RED;
                str = "acRechargeBoxPopupViewGoRecharge";
            }
            else {
                res = ButtonConst.BTN_SMALL_YELLOW;
                str = "taskCollect";
            }
            var btn = ComponentManager.getButton(res, str, view.buyHandler, view);
            view.addChild(btn);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, btn, bg, [10, 10]);
            view._btn = btn;
            if (view.vo.getChargeNum() >= data.needGem) {
                if (view.vo.isActyEnd()) {
                    App.CommonUtil.removeIconFromBDOC(btn);
                }
                else {
                    App.CommonUtil.addIconToBDOC(btn);
                }
                btn.setGray(view.vo.isActyEnd());
            }
            else {
                btn.setGray(!view.vo.isInActivity());
            }
        }
    };
    AcMotherDayChargeItem.prototype.buyHandler = function (param) {
        var view = this;
        if (view.vo.isActyEnd()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (view.vo.getChargeNum() < view._data.needGem) {
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }
        else {
            view.vo.selIdx = view._id - 1;
            NetManager.request(NetRequestConst.REQUEST_MOTHERDAY_GETCHARGE, {
                activeId: view.acTivityId,
                rkey: view._id,
            });
        }
        // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM);
    };
    AcMotherDayChargeItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcMotherDayChargeItem.prototype.dispose = function () {
        var view = this;
        view._btn = null;
        view._id = 0;
        view._Index = 0;
        _super.prototype.dispose.call(this);
    };
    return AcMotherDayChargeItem;
}(ScrollListItem));
__reflect(AcMotherDayChargeItem.prototype, "AcMotherDayChargeItem");
//# sourceMappingURL=AcMotherDayChargeItem.js.map