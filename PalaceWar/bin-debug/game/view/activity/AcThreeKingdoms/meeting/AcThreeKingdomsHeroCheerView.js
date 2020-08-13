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
 * 三国争霸 神将助威
 * author qianjun
 */
var AcThreeKingdomsHeroCheerView = (function (_super) {
    __extends(AcThreeKingdomsHeroCheerView, _super);
    function AcThreeKingdomsHeroCheerView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcThreeKingdomsHeroCheerView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsHeroCheerView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsHeroCheerView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsHeroCheerView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsHeroCheerView.prototype.getUiCode = function () {
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
    AcThreeKingdomsHeroCheerView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress3", "progress3_bg",
        ]);
    };
    AcThreeKingdomsHeroCheerView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    AcThreeKingdomsHeroCheerView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    Object.defineProperty(AcThreeKingdomsHeroCheerView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsHeroCheerView.prototype.getRequestData = function () {
        return {
            requestType: NetRequestConst.REQUEST_THREEKINGDOMS_GOVERMENTINFO,
            requestData: {
                activeId: this.acTivityId
            }
        };
    };
    AcThreeKingdomsHeroCheerView.prototype.receiveData = function (data) {
        if (data.ret) {
            var rdata = data.data.data;
            this.vo.setMeetingInfo(rdata);
        }
    };
    AcThreeKingdomsHeroCheerView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        var selctcity = view.param.data.selectcity;
        var selectkingdom = view.param.data.selectkingdom;
        //App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_UPGRADEREWARD, view.attackBack, view);
        var code = view.getUiCode();
        var cfg = view.cfg;
        var tipTxt1 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsherocheertip1", code)), 20, TextFieldConst.COLOR_BROWN);
        view.addChildToContainer(tipTxt1);
        tipTxt1.lineSpacing = 6;
        tipTxt1.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt1.setPosition((view.viewBg.x + (view.viewBg.width - tipTxt1.width) / 2), 20);
        var line = BaseBitmap.create("public_cut_line");
        line.width = 455;
        view.addChildToContainer(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, tipTxt1, [0, tipTxt1.height + 10]);
        var bg = BaseBitmap.create("public_9_bg94");
        bg.width = 510;
        bg.height = 160;
        view.addChildToContainer(bg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, line, [0, line.height + 15]);
        var icon = BaseBitmap.create("threekingdomsherocheericon");
        view.addChildToContainer(icon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, bg, [13, 10]);
        var levelbg = BaseBitmap.create("public_titlebg");
        view.addChildToContainer(levelbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, levelbg, icon, [icon.width, 0]);
        var curexp = view.vo.getHeroCheerExp();
        var nextexp = 0;
        var level = 0;
        var curadd = 0;
        var nextadd = 0;
        for (var i in view.cfg.heroList) {
            var cfg_1 = view.cfg.heroList[i];
            if (curexp >= cfg_1.needExp) {
                level = cfg_1.id;
                curadd = cfg_1.addAtk;
            }
        }
        //最大等级
        var curStr = '';
        var nextStr = '';
        curStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsherocheertip4", code), [(curadd * 100).toFixed(0)]);
        if (level == view.cfg.heroList.length) {
            nextStr = LanguageManager.getlocal("acBattlePassMaxLevel-1");
            nextexp = curexp;
        }
        else {
            var nextcfg = view.cfg.heroList[level];
            nextadd = nextcfg.addAtk;
            nextexp = nextcfg.needExp;
            nextStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsherocheertip4", code), [(nextadd * 100).toFixed(0)]);
        }
        var levelTxt = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifanglevel", [level.toString()]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, levelTxt, levelbg, [10, 0]);
        view.addChildToContainer(levelTxt);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsherocheertip5", code)), 18, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, levelbg, [10, levelbg.height + 7]);
        view.addChildToContainer(tipTxt);
        var curTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsherocheertip2", code), [curStr]), 18, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, curTxt, tipTxt, [0, tipTxt.height + 5]);
        view.addChildToContainer(curTxt);
        var nextTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsherocheertip3", code), [nextStr]), 18, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, nextTxt, curTxt, [0, curTxt.height + 5]);
        view.addChildToContainer(nextTxt);
        var progressBar = ComponentManager.getProgressBar("progress3", "progress3_bg", 490);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, progressBar, bg, [0, 10]);
        view.addChildToContainer(progressBar);
        var percent = curexp / nextexp;
        var textStr = level == view.cfg.heroList.length ? nextStr : (curexp + "/" + nextexp);
        var textColor = TextFieldConst.COLOR_WHITE;
        progressBar.setPercentage(percent, textStr, textColor);
        // let btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, `confirmBtn`, ()=>{
        //     //确认
        //     view.hide();
        // }, view);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, bg, [0,bg.height+10]);
        // view.addChildToContainer(btn);
    };
    AcThreeKingdomsHeroCheerView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acThreeKingdomsherocheer", this.getUiCode());
    };
    AcThreeKingdomsHeroCheerView.prototype.getShowHeight = function () {
        return 420;
    };
    AcThreeKingdomsHeroCheerView.prototype.dispose = function () {
        var view = this;
        //App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_UPGRADEREWARD, view.attackBack, view);
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsHeroCheerView;
}(PopupView));
__reflect(AcThreeKingdomsHeroCheerView.prototype, "AcThreeKingdomsHeroCheerView");
//# sourceMappingURL=AcThreeKingdomsHeroCheerView.js.map