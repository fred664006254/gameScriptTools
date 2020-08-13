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
 * 三国争霸时间说明表
 * author qianjun
 */
var AcThreeKingdomsTimeView = (function (_super) {
    __extends(AcThreeKingdomsTimeView, _super);
    function AcThreeKingdomsTimeView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcThreeKingdomsTimeView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsTimeView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsTimeView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsTimeView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsTimeView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcThreeKingdomsTimeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "public_9_bg62"
        ]);
    };
    AcThreeKingdomsTimeView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    AcThreeKingdomsTimeView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    AcThreeKingdomsTimeView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        var code = view.getUiCode();
        var vo = view.vo;
        var cfg = view.cfg;
        //总轮数
        var roundnum = cfg.lastTime / 7;
        var temH = 10;
        var group = new BaseDisplayObjectContainer();
        group.width = 530;
        view.addChildToContainer(group);
        var curweek = vo.getCurWeek();
        var arr = [];
        if (curweek > 1) {
            var temp = curweek;
            while (temp <= roundnum) {
                arr.push(temp);
                ++temp;
            }
            temp = curweek - 1;
            while (temp > 0) {
                arr.push(temp);
                --temp;
            }
        }
        else {
            var temp = 1;
            while (temp <= roundnum) {
                arr.push(temp);
                ++temp;
            }
        }
        for (var t = 1; t <= arr.length; ++t) {
            var week = arr[t - 1];
            var titlebg = BaseBitmap.create("public_9_bg95");
            group.addChild(titlebg);
            var isin = false;
            var key = '';
            if (view.vo.getCurPeriod() == 1) {
                key = "acThreeKingdomsEnter1";
            }
            else if (view.vo.getCurPeriod() == 2) {
                //本周周一活动开始时间
                var st = vo.activeSt + (week - 1) * (7 * 86400) + this.cfg.activeTime[0].popularityRange[0] * 3600;
                //本周周日活动结束时间
                var et = vo.activeSt + (week - 1) * (7 * 86400) + 6 * 86400 + this.cfg.activeTime[4].popularityRange[1] * 3600;
                if (GameData.serverTime < st) {
                    key = "acThreeKingdomsEnter1";
                }
                else if (GameData.serverTime >= st && GameData.serverTime < et) {
                    key = "acThreeKingdomsEnter5";
                    isin = true;
                }
                else {
                    key = "acThreeKingdomsEnter4";
                }
            }
            else {
                key = "acThreeKingdomsEnter4";
            }
            var str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(key, code));
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRound", code), [week.toString(), str]), 20, isin ? TextFieldConst.COLOR_WARN_YELLOW : TextFieldConst.COLOR_BROWN);
            titlebg.width = tipTxt.width + 80;
            titlebg.setPosition(group.x + group.width / 2 - titlebg.width / 2, temH);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, titlebg);
            group.addChild(tipTxt);
            var listbg = BaseBitmap.create("public_9_bg44");
            listbg.width = 530;
            group.addChild(listbg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, titlebg, [0, titlebg.height + 10]);
            var topBg = BaseBitmap.create("public_9_bg33");
            topBg.width = listbg.width;
            topBg.height = 33;
            group.addChild(topBg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, listbg);
            //本周周一0点
            var start = vo.activeSt + (week - 1) * (7 * 86400) + this.cfg.activeTime[0].popularityRange[0] * 3600;
            ; //vo.activeSt + (week - 1) * (7 * 86400);
            //下周一0点
            var end = vo.activeSt + (week - 1) * (7 * 86400) + 6 * 86400 + this.cfg.activeTime[4].popularityRange[1] * 3600; //vo.activeSt + week * (7 * 86400)
            var dateTxt = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(start, 15) + "-" + App.DateUtil.getFormatBySecond(end, 15), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, dateTxt, topBg);
            group.addChild(dateTxt);
            var height = listbg.y + 42;
            for (var k = 1; k <= 8; ++k) {
                var unit = cfg.activeTime[(k < 6 ? k : (k - 3)) - 1];
                var key_1 = '';
                var date = "";
                var st = App.DateUtil.getWeeTs(GameData.serverTime) + unit.popularityRange[0] * 3600;
                var et = App.DateUtil.getWeeTs(GameData.serverTime) + unit.popularityRange[1] * 3600;
                var timeparam = App.DateUtil.getFormatBySecond(st, 12) + "-" + App.DateUtil.getFormatBySecond(et, 12);
                var isNowRound = false;
                switch (k) {
                    case 1:
                        //本周周一-周五 正常任务
                        date = App.DateUtil.getFormatBySecond(start, 7) + "-" + App.DateUtil.getFormatBySecond(start + 4 * 86400, 7);
                        key_1 = "acThreeKingdomsRoundDesc1";
                        if (week == vo.getCurWeek() && GameData.serverTime >= start && GameData.serverTime < (start + 5 * 86400)) {
                            isNowRound = true; //GameData.serverTime >= st && GameData.serverTime < et;
                        }
                        break;
                    case 2:
                        //最后一周神将突袭
                        if (week == roundnum) {
                            date = App.DateUtil.getFormatBySecond(start, 7) + "-" + App.DateUtil.getFormatBySecond(start + 4 * 86400, 7);
                            key_1 = "acThreeKingdomsRoundDesc2";
                            if (week == vo.getCurWeek() && GameData.serverTime >= start && GameData.serverTime < (start + 5 * 86400)) {
                                isNowRound = GameData.serverTime >= st && GameData.serverTime < et;
                            }
                        }
                        break;
                    case 3:
                    case 6:
                        //本周六日 第一场攻城
                        date = "" + App.DateUtil.getFormatBySecond(start + (k > 3 ? 6 : 5) * 86400, 7);
                        key_1 = "acThreeKingdomsRoundDesc3";
                        if (week == vo.getCurWeek() && GameData.serverTime >= (start + (k > 3 ? 6 : 5) * 86400) && GameData.serverTime < (start + (k > 3 ? 7 : 6) * 86400)) {
                            isNowRound = GameData.serverTime >= st && GameData.serverTime < et;
                        }
                        break;
                    case 4:
                    case 7:
                        //本周六 第二场攻城
                        date = "" + App.DateUtil.getFormatBySecond(start + (k > 4 ? 6 : 5) * 86400, 7);
                        key_1 = "acThreeKingdomsRoundDesc4";
                        if (week == vo.getCurWeek() && GameData.serverTime >= (start + (k > 4 ? 6 : 5) * 86400) && GameData.serverTime < (start + (k > 4 ? 7 : 6) * 86400)) {
                            isNowRound = GameData.serverTime >= st && GameData.serverTime < et;
                        }
                        break;
                    case 5:
                    case 8:
                        //本周六 激战
                        date = "" + App.DateUtil.getFormatBySecond(start + (k > 5 ? 6 : 5) * 86400, 7);
                        key_1 = "acThreeKingdomsRoundDesc5_" + (k > 5 ? 2 : 1);
                        if (week == vo.getCurWeek() && GameData.serverTime >= (start + (k > 5 ? 6 : 5) * 86400) && GameData.serverTime < (start + (k > 5 ? 7 : 6) * 86400)) {
                            isNowRound = GameData.serverTime >= st && GameData.serverTime < et;
                        }
                        break;
                }
                if (date != "") {
                    var str_1 = "" + date + timeparam + LanguageManager.getlocal(App.CommonUtil.getCnByCode(key_1, code));
                    var txt = ComponentManager.getTextField("" + date + timeparam, 20);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, txt, group, [0, height], true);
                    var txt1 = ComponentManager.getTextField("" + date + timeparam, 20);
                    if (PlatformManager.checkIsThSp() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuLang()) {
                        txt1.text = "" + date + " " + timeparam;
                    }
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt1, group, [55, height], true);
                    group.addChild(txt1);
                    var txt2 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(key_1, code)), 20);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt2, group, [335, height], true);
                    group.addChild(txt2);
                    var line = BaseBitmap.create("public_line1");
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, txt, [0, txt.height + 7]);
                    group.addChild(line);
                    height = line.y + line.height + 10;
                    if (isNowRound) {
                        txt1.textColor = txt2.textColor = TextFieldConst.COLOR_WARN_YELLOW;
                        var curTime = BaseBitmap.create("threekingdomscurtime");
                        group.addChild(curTime);
                        curTime.y = txt1.y - 5;
                        curTime.x = 1;
                    }
                }
            }
            listbg.height = height - 10 - listbg.y;
            temH = listbg.y + listbg.height + 7;
        }
        var scrollview = ComponentManager.getScrollView(group, new egret.Rectangle(0, 0, 530, 655));
        scrollview.setPosition(this.viewBg.x + this.viewBg.width / 2 - scrollview.width / 2, 10);
        view.addChildToContainer(scrollview);
    };
    AcThreeKingdomsTimeView.prototype.getShowHeight = function () {
        return 760;
    };
    AcThreeKingdomsTimeView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acThreeKingdomsTip22", this.getUiCode());
    };
    AcThreeKingdomsTimeView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsTimeView;
}(PopupView));
__reflect(AcThreeKingdomsTimeView.prototype, "AcThreeKingdomsTimeView");
//# sourceMappingURL=AcThreeKingdomsTimeView.js.map