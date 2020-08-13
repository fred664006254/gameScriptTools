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
 * 圈数奖励item
 * author qianjun
 */
var AcTreasureHuntRoundRewardItem = (function (_super) {
    __extends(AcTreasureHuntRoundRewardItem, _super);
    function AcTreasureHuntRoundRewardItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._btn = null;
        _this._Index = 0;
        return _this;
    }
    Object.defineProperty(AcTreasureHuntRoundRewardItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntRoundRewardItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntRoundRewardItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntRoundRewardItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_TREASUREHUNT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntRoundRewardItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcTreasureHuntRoundRewardItem.prototype.initItem = function (index, data, itemParam) {
        var view = this;
        view._data = data;
        view.width = 528;
        view._code = itemParam;
        view._id = data.id;
        view._Index = index;
        var reward = data.getReward;
        var rIcons = GameData.getRewardItemIcons(reward, true);
        var row = Math.ceil(rIcons.length / 5); //行数
        view.height = 5 + 30 + 5 + row * 108 * 0.85 + (row - 1) * 5 + 10 + 80 + view.getSpaceY();
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = view.width;
        bg.height = view.height - view.getSpaceY();
        view.addChild(bg);
        var charge_redBg = BaseBitmap.create("acmidautumnview_titlebg");
        charge_redBg.width = 485;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, charge_redBg, bg, [0, 10]);
        view.addChild(charge_redBg);
        var line = BaseBitmap.create("public_line3");
        view.addChild(line);
        var roundTxt = ComponentManager.getTextField(LanguageManager.getlocal(data.id > 10 ? "acTreasureRoundNum2-" + view.code : "acTreasureRoundNum-" + view.code, [data.num]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        line.width = roundTxt.textWidth + 280;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, charge_redBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, roundTxt, line);
        view.addChild(roundTxt);
        var rewardBg = BaseBitmap.create("public_9_managebg");
        rewardBg.width = 502;
        rewardBg.height = row * 108 * 0.85 + (row - 1) * 5 + 10;
        view.addChild(rewardBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, rewardBg, charge_redBg, [0, charge_redBg.height + 5]);
        var tmpY = 5;
        for (var i in rIcons) {
            var icon = rIcons[i];
            var idx = Number(i);
            icon.setScale(0.85);
            icon.x = rewardBg.x + 8 + (idx % 5) * (108 * 0.85 + 8);
            icon.y = rewardBg.y + 5 + Math.floor(idx / 5) * (108 * 0.85 + 5);
            view.addChild(icon);
        }
        var progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 375);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progress, titelTxt, [0,titelTxt.height+5]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progress, rewardBg, [2, rewardBg.height + 32]);
        view.addChild(progress);
        progress.setPercentage(view.vo.getCurRound() / data.num, view.vo.getCurRound() + "/" + data.num, TextFieldConst.COLOR_QUALITY_WHITE);
        progress.scaleX = 0.95;
        var titelTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTreasureRoundTitle-" + view.code), 20, TextFieldConst.COLOR_BLACK);
        view.addChild(titelTxt);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, titelTxt, rewardBg, [147,rewardBg.height+7]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titelTxt, progress, [0, -25]);
        if (view.vo.isGetRoundReward(data.id)) {
            var flag = BaseBitmap.create("collectflag");
            flag.setScale(0.6);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, flag, bg, [10, 10]);
            view.addChild(flag);
        }
        else {
            var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, 'taskCollect', view.buyHandler, view);
            view.addChild(btn);
            btn.setGray(view.vo.getCurRound() < data.num || view.vo.isActyEnd());
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, btn, bg, [10, 10]);
            view._btn = btn;
            if (view.vo.isActyEnd()) {
            }
            else {
                if (view.vo.getCurRoundGetState(data.id) == 1) {
                    App.CommonUtil.addIconToBDOC(btn);
                }
            }
        }
    };
    AcTreasureHuntRoundRewardItem.prototype.buyHandler = function (param) {
        var view = this;
        if (view.vo.isActyEnd()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (view.vo.getCurRound() < view._data.num) {
            App.CommonUtil.showTip(LanguageManager.getlocal("PlayerReturnTip2"));
            return;
        }
        view.vo.selIdx = view._Index;
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_TREASURECIRCLERERWARD, {
            activeId: view.acTivityId,
            circleId: view._data.num,
        });
        // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH);
    };
    AcTreasureHuntRoundRewardItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcTreasureHuntRoundRewardItem.prototype.dispose = function () {
        var view = this;
        view._btn = null;
        view._id = 0;
        view._Index = 0;
        _super.prototype.dispose.call(this);
    };
    return AcTreasureHuntRoundRewardItem;
}(ScrollListItem));
__reflect(AcTreasureHuntRoundRewardItem.prototype, "AcTreasureHuntRoundRewardItem");
//# sourceMappingURL=AcTreasureHuntRoundRewardItem.js.map