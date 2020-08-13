/**
 * 管家发送请求
 * author shaoliang
 * date 2020/4/28
 * @class HousekeeperReportView
 */
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
var HousekeeperReportView = (function (_super) {
    __extends(HousekeeperReportView, _super);
    function HousekeeperReportView() {
        return _super.call(this) || this;
    }
    HousekeeperReportView.prototype.getTitleBgName = function () {
        return null;
    };
    HousekeeperReportView.prototype.getTitleStr = function () {
        return null;
    };
    HousekeeperReportView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    HousekeeperReportView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "public_9_wordbg", "housekeeperreportview"
        ]);
    };
    HousekeeperReportView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_wordbg");
        bg.width = GameConfig.stageWidth;
        bg.height = GameConfig.stageHeigth - 245;
        bg.y = 140;
        this.addChild(bg);
        var titlebg = BaseBitmap.create("housekeeperreport_titlebg");
        titlebg.setPosition(GameConfig.stageWidth / 2 - titlebg.width / 2, bg.y - 80);
        this.addChild(titlebg);
        var title = BaseBitmap.create("housekeeperreport_title");
        title.setPosition(GameConfig.stageWidth / 2 - title.width / 2, bg.y - 59);
        this.addChild(title);
        var btn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        btn.setPosition(GameConfig.stageWidth / 2 - btn.width / 2, bg.y + bg.height + 16);
        this.addChild(btn);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth, bg.height - 60);
        var scrollContainer = new BaseDisplayObjectContainer();
        var scrollView = ComponentManager.getScrollView(scrollContainer, rect);
        scrollView.y = bg.y + 50;
        this.addChild(scrollView);
        var timesArray = this.getTimesStr();
        var rewardsArray = this.getRewardStr();
        var posy = 5;
        for (var i = 0; i < timesArray.length; i += 2) {
            var text1 = ComponentManager.getTextField(timesArray[i], TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            text1.width = 270;
            text1.lineSpacing = 4;
            text1.setPosition(60, posy);
            scrollContainer.addChild(text1);
            posy += (text1.height + 12);
            if (timesArray[i + 1]) {
                var text2 = ComponentManager.getTextField(timesArray[i + 1], TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
                text2.width = 270;
                text2.lineSpacing = 4;
                text2.setPosition(338, text1.y);
                scrollContainer.addChild(text2);
                if (text2.y + text2.height + 12 > posy) {
                    posy = text2.y + text2.height + 12;
                }
            }
        }
        if (timesArray.length == 0) {
            var text1 = ComponentManager.getTextField(LanguageManager.getlocal("housekeeper_empty_tip1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            text1.width = 600;
            text1.lineSpacing = 4;
            text1.textAlign = egret.HorizontalAlign.CENTER;
            text1.setPosition(20, posy);
            scrollContainer.addChild(text1);
            posy += (text1.height + 12);
        }
        var line = BaseBitmap.create("housekeeperreport_line");
        line.setPosition(GameConfig.stageWidth / 2 - line.width / 2, posy + 8);
        scrollContainer.addChild(line);
        posy = line.y + 33;
        for (var i = 0; i < rewardsArray.length; i += 2) {
            var onerevo = rewardsArray[i];
            var text1 = ComponentManager.getTextField(onerevo[0], TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_YELLOW);
            text1.width = 270;
            text1.lineSpacing = 4;
            text1.setPosition(60, posy);
            scrollContainer.addChild(text1);
            posy += (text1.height + 12);
            if (onerevo[2] == 1) {
                var itemvo = onerevo[1];
                if (itemvo.num < 0) {
                    text1.textColor = TextFieldConst.COLOR_QUALITY_RED;
                }
            }
            if (rewardsArray[i + 1]) {
                var onerevo2 = rewardsArray[i + 1];
                var text2 = ComponentManager.getTextField(onerevo2[0], TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_YELLOW);
                text2.width = 270;
                text2.lineSpacing = 4;
                text2.setPosition(338, text1.y);
                scrollContainer.addChild(text2);
                if (text2.y + text2.height + 12 > posy) {
                    posy = text2.y + text2.height + 12;
                }
                if (onerevo2[2] == 1) {
                    var itemvo2 = onerevo2[1];
                    if (itemvo2.num < 0) {
                        text2.textColor = TextFieldConst.COLOR_QUALITY_RED;
                    }
                }
            }
        }
        if (rewardsArray.length == 0) {
            var text1 = ComponentManager.getTextField(LanguageManager.getlocal("housekeeper_empty_tip2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            text1.width = 600;
            text1.lineSpacing = 4;
            text1.textAlign = egret.HorizontalAlign.CENTER;
            text1.setPosition(20, posy);
            scrollContainer.addChild(text1);
            posy += (text1.height + 12);
        }
        scrollContainer.height = posy;
    };
    HousekeeperReportView.prototype.getTimesStr = function () {
        var timess = [];
        var info = this.param.data.info;
        for (var k in info) {
            var oneInfo = info[k];
            if (oneInfo.times) {
                timess.push(LanguageManager.getlocal("housekeeper_times_" + k, [String(oneInfo.times), "0x3e9b00"]));
            }
        }
        return timess;
    };
    HousekeeperReportView.prototype.getRewardStr = function () {
        var rewardsArray = [];
        var info = this.param.data.info;
        var rewardsstr = "";
        //this._rewardInfo["manage"] = {"times":times,"gold":num1,"food":num2,"soldier":num3,"practice":num4};
        if (info.manage) {
            if (info.manage.gold) {
                if (rewardsstr != "") {
                    rewardsstr += "|";
                }
                rewardsstr += ("2_0_" + info.manage.gold);
            }
            if (info.manage.food) {
                if (rewardsstr != "") {
                    rewardsstr += "|";
                }
                rewardsstr += ("3_0_" + info.manage.food);
            }
            if (info.manage.soldier) {
                if (rewardsstr != "") {
                    rewardsstr += "|";
                }
                rewardsstr += ("4_0_" + info.manage.soldier);
            }
            if (info.manage.practice) {
                if (rewardsstr != "") {
                    rewardsstr += "|";
                }
                rewardsstr += ("31_0_" + info.manage.practice);
            }
        }
        //红颜经验
        //
        var wifechildnumobj = {};
        if (info.wife && info.wife.autoCallWife) {
            for (var k in info.wife.autoCallWife) {
                var oneInfo = info.wife.autoCallWife[k];
                var wifeid = oneInfo[0];
                if (rewardsstr != "") {
                    rewardsstr += "|";
                }
                rewardsstr += ("13_" + wifeid + "_" + oneInfo[1]);
                if (oneInfo[3]) {
                    if (wifechildnumobj[wifeid]) {
                        wifechildnumobj[wifeid]++;
                    }
                    else {
                        wifechildnumobj[wifeid] = 1;
                    }
                }
            }
        }
        //  门客
        if (info.bookroom && info.bookroom.bookroom_poss) {
            for (var k in info.bookroom.bookroom_poss) {
                var oneInfo = info.bookroom.bookroom_poss[k];
                var servantid = oneInfo.sid;
                var cfg = Config.ServantCfg.getServantItemById(servantid);
                var rate = 1;
                if (oneInfo.pos) {
                    rate = oneInfo.pos;
                }
                if (Api.otherInfoVoApi.isHasScene("204", "cityScene")) {
                    var abilitycfg = Config.SceneCfg.getSceneCfgBySceneName("cityScene", "204").personalityCfg;
                    rate = rate * (1 + abilitycfg.buffValue);
                }
                var bookCfg = GameConfig.config.bookroomCfg;
                var v1 = Math.floor(bookCfg.getBookExp * rate + 0.5);
                var v2 = Math.floor(bookCfg.getSkillExp * rate + 0.5);
                if (rewardsstr != "") {
                    rewardsstr += "|";
                }
                rewardsstr += ("14_" + servantid + "_" + v1 + "|15_" + servantid + "_" + v2);
            }
        }
        for (var k in info) {
            var oneInfo = info[k];
            if (oneInfo.rewards) {
                if (rewardsstr != "") {
                    rewardsstr += "|";
                }
                rewardsstr += oneInfo.rewards;
            }
        }
        var rewardsvo = GameData.formatRewardItem(rewardsstr, true);
        rewardsvo.sort(function (a, b) {
            var sortIdA = a.type;
            var sortIdB = b.type;
            if (a.type >= 12 && a.type <= 15) {
                sortIdA = 1000000;
            }
            if (b.type >= 12 && b.type <= 15) {
                sortIdB = 1000000;
            }
            if (a.type == 5) {
                sortIdA = 1.5;
            }
            if (b.type == 5) {
                sortIdB = 1.5;
            }
            if (a.type == 31) {
                sortIdA = 5;
            }
            if (b.type == 31) {
                sortIdB = 5;
            }
            return sortIdA - sortIdB;
        });
        for (var i = 0; i < rewardsvo.length; i++) {
            var onevo = rewardsvo[i];
            if (onevo && onevo.num) {
                var str = onevo.getFullTip();
                if (onevo.type == 13 && wifechildnumobj[String(onevo.id)]) {
                    str += LanguageManager.getlocal("housekeeper_wifechild", [String(wifechildnumobj[String(onevo.id)])]);
                }
                rewardsArray.push([str, onevo, 1]);
            }
        }
        //书院学习
        // if (info.bookroom && info.bookroom.sids)
        // {
        //     for (let i=0; i<info.bookroom.sids.length; i++)
        //     {
        //         let sid = info.bookroom.sids[i];
        //         let scfg = Config.ServantCfg.getServantItemById(sid);
        //         if (scfg)
        //         {
        //             let str = LanguageManager.getlocal("housekeeper_bookroom_study",[scfg.name]);
        //             rewardsArray.push([str,scfg,2]);
        //         }
        //     }
        // }
        //寻访事件
        if (info.child && info.child.levelinfo) {
            for (var i = 0; i < info.child.levelinfo.length; i++) {
                var str = info.child.levelinfo[i];
                if (str) {
                    rewardsArray.push([str, {}, 3]);
                }
            }
        }
        //寻访事件s
        if (info.search && info.search.showArr) {
            for (var i = 0; i < info.search.showArr.length; i++) {
                var str = info.search.showArr[i];
                if (str) {
                    rewardsArray.push([str, {}, 4]);
                }
            }
        }
        return rewardsArray;
    };
    return HousekeeperReportView;
}(BaseView));
__reflect(HousekeeperReportView.prototype, "HousekeeperReportView");
//# sourceMappingURL=HousekeeperReportView.js.map