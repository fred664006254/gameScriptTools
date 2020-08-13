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
//赛季个人
var AcThreeKingdomsRankViewTab1Tab1 = (function (_super) {
    __extends(AcThreeKingdomsRankViewTab1Tab1, _super);
    //private _countDownText:BaseTextField = null;
    function AcThreeKingdomsRankViewTab1Tab1(param) {
        var _this = _super.call(this) || this;
        _this._nodeContainer = null;
        _this._rankTxt = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsRankViewTab1Tab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab1Tab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab1Tab1.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab1Tab1.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab1Tab1.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsRankViewTab1Tab1.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcThreeKingdomsRankViewTab1Tab1.prototype.getListType = function () {
        return 1;
    };
    AcThreeKingdomsRankViewTab1Tab1.prototype.initView = function () {
        var view = this;
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_SEASONRANK, view.prankCallback, view);
        var baseview = ViewController.getInstance().getView(ViewConst.COMMON.ACTHREEKINGDOMSRANKVIEW);
        view.height = baseview.tabHeight - 46;
        view.width = baseview.tabWidth;
        var code = view.getUiCode();
        var juzhou = BaseBitmap.create(App.CommonUtil.getResByCode("threekingdomsjzhou", code));
        view.addChild(juzhou);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, juzhou, view, [0, 0], true);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRanktip7", code), [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_BROWN);
        tipTxt.lineSpacing = 10;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt.width = 560;
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, juzhou, [0, 33]);
        var dateTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRanktip2", code), [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_BROWN);
        view.addChild(dateTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dateTxt, tipTxt, [0, tipTxt.textHeight + 10]);
        //膜拜背景
        var bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.height = 135;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view, [0, 0], true);
        view.addChild(bottomBg);
        //上轮排名 
        // let rankBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, 'allianceBtnRank', view.rankCLick, view);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [210,0]);
        // view.addChild(rankBtn);
        //查看奖励
        var rewardBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acThreeKingdomsRanktip3", code), function () {
            ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSREWARDVIEW, {
                code: view.code,
                aid: view.aid
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rewardBtn, bottomBg, [25, 0]);
        view.addChild(rewardBtn);
        var mypoint = 0;
        var rankV = 0;
        var arr = [];
        if (view.vo.prankseasonarr && view.vo.prankseasonarr.rankArr) {
            arr = view.vo.prankseasonarr.rankArr;
        }
        if (view.vo.prankseasonarr && view.vo.prankseasonarr.myrankArr) {
            var myrankarr = view.vo.prankseasonarr.myrankArr;
            if (myrankarr && myrankarr.myrank) {
                rankV = myrankarr.myrank;
            }
            if (myrankarr && myrankarr.value) {
                mypoint = myrankarr.value;
            }
        }
        //我的赛季分数
        var myKingdomTxt = ComponentManager.getTextField(LanguageManager.getlocal("acThreeKingdomsRanktip12-" + code, [mypoint.toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myKingdomTxt, bottomBg, [25, 35]);
        view.addChild(myKingdomTxt);
        //赛季排名
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
        if (view.vo.getCurPeriod() == 1) {
            rankstr = LanguageManager.getlocal('acBattleRoundNotStart-1');
        }
        var txt3 = ComponentManager.getTextField(LanguageManager.getlocal("acThreeKingdomsRanktip5-" + code, [rankstr]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt3, myKingdomTxt, [0, myKingdomTxt.textHeight + 20]);
        view.addChild(txt3);
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
        var list = ComponentManager.getScrollList(AcThreeKingdomsPrankItem, arr, new egret.Rectangle(0, 0, 610, bottomBg.y - title.y - title.height - 10));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, title, [0, title.height + 5]);
        view.addChild(list);
        list.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        // NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_SEASONRANK,{
        // 	activeId:view.acTivityId,
        // });
    };
    AcThreeKingdomsRankViewTab1Tab1.prototype.getCountTimeStr = function (time) {
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    AcThreeKingdomsRankViewTab1Tab1.prototype.prankCallback = function (evt) {
        // if(evt.data.data.data){
        // 	this.vo.setPrankinfo(evt.data.data.data);
        // 	let rankstr = '';
        // 	let rankV = this.vo.getMyPrank();
        // 	if(rankV == 0){
        // 		rankstr = LanguageManager.getlocal('atkracedes4');
        // 	}
        // 	else{
        // 		rankstr = rankV.toString();
        // 	}
        // 	let color = String(0x21eb39);
        // 	if(this.vo.getCurPeriod() == 1){
        // 		rankstr = LanguageManager.getlocal('acBattleRoundNotStart-1');
        // 	}
        // 	else{
        // 		if(!this.vo.isCanJoin()){
        // 			rankstr = LanguageManager.getlocal('crossImacyNoAccess');
        // 			color = String(0xff3c3c);
        // 		}
        // 	}
        // 	this._rankTxt.text = LanguageManager.getlocal(`acConquerMainLandrank1-${this.uiCode}`, [color,rankstr]);
        // }
    };
    AcThreeKingdomsRankViewTab1Tab1.prototype.dispose = function () {
        var view = this;
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_SEASONRANK, view.prankCallback, view);
        this._nodeContainer = null;
        this._rankTxt = null;
        //this._countDownText = null;
        // TickManager.removeTick(this.tick,this);
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsRankViewTab1Tab1;
}(CommonViewTab));
__reflect(AcThreeKingdomsRankViewTab1Tab1.prototype, "AcThreeKingdomsRankViewTab1Tab1");
//# sourceMappingURL=AcThreeKingdomsRankViewTab1Tab1.js.map