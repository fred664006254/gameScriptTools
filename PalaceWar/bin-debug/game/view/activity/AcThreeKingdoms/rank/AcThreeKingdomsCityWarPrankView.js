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
 * 本轮攻城战排名
 * author qianjun
 */
var AcThreeKingdomsCityWarPrankView = (function (_super) {
    __extends(AcThreeKingdomsCityWarPrankView, _super);
    function AcThreeKingdomsCityWarPrankView() {
        var _this = _super.call(this) || this;
        // 滑动列表
        _this.info = null;
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsCityWarPrankView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsCityWarPrankView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsCityWarPrankView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsCityWarPrankView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsCityWarPrankView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsCityWarPrankView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcThreeKingdomsCityWarPrankView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    Object.defineProperty(AcThreeKingdomsCityWarPrankView.prototype, "day", {
        get: function () {
            return this.param.data.number < 3 ? 6 : 7;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsCityWarPrankView.prototype, "ftype", {
        get: function () {
            return this.param.data.number % 2 == 1 ? 3 : 4;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsCityWarPrankView.prototype.getRequestData = function () {
        return {
            requestType: NetRequestConst.REQUEST_THREEKINGDOMS_GETCITYRANK,
            requestData: {
                activeId: this.acTivityId,
                day: this.day,
                ftype: this.ftype
            }
        };
    };
    AcThreeKingdomsCityWarPrankView.prototype.receiveData = function (data) {
        if (data.ret) {
            var rdata = data.data.data;
            this.info = rdata;
        }
    };
    AcThreeKingdomsCityWarPrankView.prototype.initView = function () {
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var code = view.getUiCode();
        var juzhou = BaseBitmap.create(App.CommonUtil.getResByCode("threekingdomsjzhou", code));
        view.addChild(juzhou);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, juzhou, view.titleBg, [0, view.titleBg.height]);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRanktip17", code)), 20, TextFieldConst.COLOR_BROWN);
        tipTxt.lineSpacing = 10;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt.width = 560;
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, juzhou, [0, 30]);
        //本周六的第一场攻城战
        var week = view.vo.getCurWeek();
        var start = view.vo.activeSt + (week - 1) * (7 * 86400);
        var unit = view.cfg.activeTime[view.ftype - 1];
        //周六
        var st = start + (view.day - 1) * 86400 + unit.popularityRange[0] * 3600;
        var et = start + (view.day - 1) * 86400 + unit.popularityRange[1] * 3600;
        // let st2 = start + (7 - 1) * 86400 + unit.popularityRange[0] * 3600;
        // let et2 = start + (7 - 1) * 86400 + unit.popularityRange[1] * 3600;
        var timeparam = App.DateUtil.getFormatBySecond(st, 15) + "-" + App.DateUtil.getFormatBySecond(et, 15);
        var dateTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRanktip18", code), [timeparam]), 20, TextFieldConst.COLOR_BROWN);
        view.addChild(dateTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dateTxt, tipTxt, [0, tipTxt.textHeight + 10]);
        //膜拜背景
        var bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.height = 135;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view, [0, 0], true);
        view.addChild(bottomBg);
        //查看奖励
        var rewardBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acThreeKingdomsRanktip3", code), function () {
            ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSCITYWARREWARDVIEW, {
                code: view.code,
                aid: view.aid,
                mypoint: mypoint,
                rankstr: rankstr
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rewardBtn, bottomBg, [25, 0]);
        view.addChild(rewardBtn);
        //排名列表
        var title = BaseBitmap.create("qingyuanitemtitlebg");
        title.width = 610;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, title, juzhou, [0, juzhou.height + 7]);
        this.addChild(title);
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(42, title.y + 8);
        this.addChild(rankText);
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(115, rankText.y);
        this.addChild(nameText);
        var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_rank_title3"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt.setPosition(275, rankText.y);
        this.addChild(titleTxt);
        var serverTxt = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        serverTxt.setPosition(400, rankText.y);
        this.addChild(serverTxt);
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal("acThreeKingdomsRanktip8-1"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(475, rankText.y);
        this.addChild(scoreText);
        var rankarr = view.info.rankArr;
        var myrankarr = view.info.myrankArr;
        var mypoint = 0;
        var rankV = 0;
        if (myrankarr && myrankarr.myrank) {
            rankV = myrankarr.myrank;
        }
        if (myrankarr && myrankarr.value) {
            mypoint = myrankarr.value;
        }
        var myKingdomTxt = ComponentManager.getTextField(LanguageManager.getlocal("acThreeKingdomsRanktip9-" + code, [App.StringUtil.changeIntToText(mypoint)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myKingdomTxt, bottomBg, [25, 35]);
        view.addChild(myKingdomTxt);
        //本轮个人排名
        var rankstr = "";
        if (!this.vo.getMyKingdoms()) {
            rankstr = LanguageManager.getlocal("acThreeKingdomsTeam0-" + code);
        }
        else if (rankV == 0) {
            rankstr = LanguageManager.getlocal("atkracedes4");
        }
        else {
            rankstr = rankV.toString();
        }
        var color = String(0x21eb39);
        var txt3 = ComponentManager.getTextField(LanguageManager.getlocal("acThreeKingdomsRanktip5-" + code, [rankstr]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt3, myKingdomTxt, [0, myKingdomTxt.textHeight + 20]);
        view.addChild(txt3);
        // let arr = [];
        // for(let i = 1; i < 20; ++ i){
        // 	arr.push({
        // 		uid : 1002740+i,
        // 		zid : App.MathUtil.getRandom(1,16),
        // 		title : {
        // 			title : 3000 + i,
        // 			level : App.MathUtil.getRandom(1,9),
        // 		},
        // 		name : `玩家${i}`,
        // 		kingdom : App.MathUtil.getRandom(1,4),
        // 		level : App.MathUtil.getRandom(1,9),
        // 		value : App.MathUtil.getRandom(1,10000),
        // 	});
        // }
        // //rankarr
        var list = ComponentManager.getScrollList(AcThreeKingdomsCityWarPrankItem, rankarr, new egret.Rectangle(0, 0, 610, bottomBg.y - title.y - title.height - 10));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, title, [0, title.height + 5]);
        view.addChild(list);
        list.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
    };
    AcThreeKingdomsCityWarPrankView.prototype.getTitleStr = function () {
        return 'rankViewTitle';
    };
    AcThreeKingdomsCityWarPrankView.prototype.dispose = function () {
        var view = this;
        view.info = null;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsCityWarPrankView;
}(CommonView));
__reflect(AcThreeKingdomsCityWarPrankView.prototype, "AcThreeKingdomsCityWarPrankView");
//# sourceMappingURL=AcThreeKingdomsCityWarPrankView.js.map