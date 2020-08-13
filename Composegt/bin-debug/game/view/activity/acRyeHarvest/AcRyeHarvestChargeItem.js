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
var AcRyeHarvestChargeItem = (function (_super) {
    __extends(AcRyeHarvestChargeItem, _super);
    function AcRyeHarvestChargeItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._btn = null;
        _this._Index = 0;
        _this._tadayTaskTxt = null;
        return _this;
    }
    Object.defineProperty(AcRyeHarvestChargeItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRyeHarvestChargeItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRyeHarvestChargeItem.prototype, "aid", {
        get: function () {
            return "ryeHarvest";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRyeHarvestChargeItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcRyeHarvestChargeItem.prototype.getUiCode = function () {
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
    Object.defineProperty(AcRyeHarvestChargeItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcRyeHarvestChargeItem.prototype.initItem = function (index, data, itemParam) {
        var view = this;
        view._data = data;
        view.width = 518;
        view._code = itemParam;
        view._id = data.id;
        view._Index = index;
        var reward = data.getReward;
        reward = "1007_0_" + data.specialGift + "_" + view.getUiCode() + "|" + reward;
        var rIcons = GameData.getRewardItemIcons(reward, true, true);
        var row = Math.ceil(rIcons.length / 5); //行数
        view.height = 5 + 30 + 5 + row * 108 + (row - 1) * 5 + 10 + 80 + view.getSpaceY();
        var bg = BaseBitmap.create("activity_db_01");
        bg.width = view.width;
        bg.height = view.height - view.getSpaceY();
        view.addChild(bg);
        //任务红色底
        var bottom2 = BaseBitmap.create("activity_charge_red");
        this.addChild(bottom2);
        bottom2.x = -1;
        //任务：1／10
        var tadayTaskTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        var num1 = view.vo.getChargeNum(data.questType);
        if (this._data.questType == 105) {
            tadayTaskTxt.text = LanguageManager.getlocal("acNewYearquestType" + this._data.questType, [
                LanguageManager.getlocal("officialTitle" + num1),
                LanguageManager.getlocal("officialTitle" + this._data.value)
            ]);
        }
        else {
            tadayTaskTxt.text = this.getTitleStr(Number(this._data.questType));
        }
        tadayTaskTxt.x = 10;
        tadayTaskTxt.y = 5;
        this._tadayTaskTxt = tadayTaskTxt;
        this.addChild(tadayTaskTxt);
        bottom2.width = tadayTaskTxt.textWidth + 35;
        var tmpY = 5;
        for (var i in rIcons) {
            var icon = rIcons[i];
            icon.setScale(0.8);
            var idx = Number(i);
            icon.x = 27 + (idx % 5) * (108 * 0.8 + 8);
            icon.y = 50 + Math.floor(idx / 5) * (108 * 0.8 + 5);
            view.addChild(icon);
        }
        var progress = ComponentManager.getProgressBar("progress_type1_yellow", "progress_type1_bg", 324);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progress, titelTxt, [0,titelTxt.height+5]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, progress, bg, [10, 35]);
        view.addChild(progress);
        progress.setPercentage(view.vo.getChargeNum(data.questType) / data.value, view.vo.getChargeNum(data.questType) + "/" + data.value, TextFieldConst.COLOR_QUALITY_WHITE);
        if (view.vo.isGetRecharge(data.id)) {
            var flag = BaseBitmap.create("collectflag");
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, flag, bg, [10, 10]);
            view.addChild(flag);
        }
        else {
            var str = "";
            var res = "";
            if (view.vo.getChargeNum(data.questType) < data.value) {
                if (!this._data.openType) {
                    res = ButtonConst.BTN_SMALL_YELLOW;
                    str = "taskCollect";
                }
                else {
                    res = ButtonConst.BTN_SMALL_YELLOW;
                    str = "taskGoBtn";
                }
            }
            else {
                res = ButtonConst.BTN_SMALL_YELLOW;
                str = "taskCollect";
            }
            // if (this._data.openType || view.vo.getChargeNum(data.questType) >= data.value) {
            var btn = ComponentManager.getButton(res, str, view.buyHandler, view);
            view.addChild(btn);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, btn, bg, [20, 20]);
            view._btn = btn;
            if (view.vo.getChargeNum(data.questType) >= data.value) {
                if (view.vo.isActyEnd()) {
                    App.CommonUtil.removeIconFromBDOC(btn);
                }
                else {
                    App.CommonUtil.addIconToBDOC(btn);
                }
                btn.setGray(view.vo.isActyEnd());
            }
            else {
                btn.setGray(!view.vo.isInActivity() || !this._data.openType);
            }
            // }
        }
    };
    /**
     * 获得
     */
    AcRyeHarvestChargeItem.prototype.getTitleStr = function (type) {
        var strTop = null;
        var valueStr = String(this._data.value);
        switch (Number(this._data.questType)) {
            case 1:
                {
                    strTop = LanguageManager.getlocal("acJadeTaksTitleType1", [valueStr]);
                    break;
                }
            case 2:
                {
                    strTop = LanguageManager.getlocal("acJadeTaksTitleType2", [valueStr]);
                    break;
                }
            case 301:
                {
                    if (Api.switchVoApi.checkCloseText()) {
                        strTop = LanguageManager.getlocal("acJadeTaksTitleType3_1", [valueStr]);
                    }
                    else {
                        strTop = LanguageManager.getlocal("acJadeTaksTitleType3_2", [valueStr]);
                    }
                    break;
                }
            case 402:
                {
                    strTop = LanguageManager.getlocal("acJadeTaksTitleType4", [valueStr]);
                    break;
                }
            case 303:
                {
                    strTop = LanguageManager.getlocal("acJadeTaksTitleType5", [valueStr]);
                    break;
                }
            case 601:
                {
                    strTop = LanguageManager.getlocal("acJadeTaksTitleType6", [valueStr]);
                    break;
                }
            case 104:
                {
                    strTop = LanguageManager.getlocal("acJadeTaksTitleType7", [valueStr]);
                    break;
                }
            case 10001:
                {
                    strTop = LanguageManager.getlocal("betheking_task_questType10001", [valueStr]);
                    break;
                }
            default:
                {
                    App.LogUtil.log("未支持的类型");
                }
        }
        return strTop;
    };
    AcRyeHarvestChargeItem.prototype.buyHandler = function (param) {
        var view = this;
        if (view.vo.isActyEnd()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (view.vo.getChargeNum(this._data.questType) < view._data.value) {
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            var openType = this._data.openType;
            if (!openType) {
                return;
            }
            var viewName = App.StringUtil.firstCharToUper(openType);
            if (openType == "level" || openType == "arrival" || openType == "") {
                // ViewController.getInstance().openView(ViewConst.COMMON.PROMOTIONVIEW);
                PlayerBottomUI.getInstance().show();
            }
            else {
                if (Api[openType + "VoApi"] && Api[openType + "VoApi"].isShowNpc) {
                    var isShowNpc = Api[openType + "VoApi"].isShowNpc();
                    if (!isShowNpc) {
                        var lockedStr = Api[openType + "VoApi"].getLockedString ? Api[openType + "VoApi"].getLockedString() : LanguageManager.getlocal("dailyTask_" + openType + "Tip");
                        App.CommonUtil.showTip(lockedStr ? lockedStr : LanguageManager.getlocal("sysWaitOpen"));
                        return;
                    }
                }
                if (openType == "alliance") {
                    Api.allianceVoApi.openMainView();
                    return;
                }
                if (openType == "studyatk") {
                    Api.studyatkVoApi.openMainView();
                    return;
                }
                if (egret.getDefinitionByName(viewName + "View")) {
                    ViewController.getInstance().openView(viewName + "View");
                }
                else if (egret.getDefinitionByName(viewName + "PopupView")) {
                    ViewController.getInstance().openView(viewName + "PopupView");
                }
                else {
                    if (openType == "recharge") {
                        ViewController.getInstance().openView(viewName + "Vip" + "View");
                    }
                }
            }
        }
        else {
            view.vo.selIdx = view._id - 1;
            NetManager.request(NetRequestConst.REQUEST_RYEHARVEST_GETCHARGE, {
                activeId: view.acTivityId,
                taskId: view._id,
            });
        }
        // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM);
    };
    AcRyeHarvestChargeItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcRyeHarvestChargeItem.prototype.dispose = function () {
        var view = this;
        view._btn = null;
        view._id = 0;
        view._Index = 0;
        _super.prototype.dispose.call(this);
    };
    return AcRyeHarvestChargeItem;
}(ScrollListItem));
__reflect(AcRyeHarvestChargeItem.prototype, "AcRyeHarvestChargeItem");
