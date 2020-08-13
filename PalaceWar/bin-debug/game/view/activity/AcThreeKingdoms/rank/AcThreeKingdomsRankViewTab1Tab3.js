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
//本轮个人
var AcThreeKingdomsRankViewTab1Tab3 = (function (_super) {
    __extends(AcThreeKingdomsRankViewTab1Tab3, _super);
    //private _countDownText:BaseTextField = null;
    function AcThreeKingdomsRankViewTab1Tab3(param) {
        var _this = _super.call(this) || this;
        _this._nodeContainer = null;
        _this._rankTxt = null;
        _this._rank2Txt = null;
        _this._list = null;
        _this._bottombg = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsRankViewTab1Tab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab1Tab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab1Tab3.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab1Tab3.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab1Tab3.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsRankViewTab1Tab3.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcThreeKingdomsRankViewTab1Tab3.prototype.getListType = function () {
        return 1;
    };
    // protected getRequestData():{requestType:string,requestData:any}{	
    // 	return {
    //         requestType:NetRequestConst.REQUEST_THREEKINGDOMS_GETRANK,
    //         requestData:{
    //             activeId : this.acTivityId,
    //             round : this.vo.getCurWeek()
    //         }
    //     };
    // }
    // protected receiveData(data:{ret:boolean,data:any}):void{
    //     if(data.ret){
    //         let rdata = data.data.data;
    //         this.vo.setMapInfo
    //     }
    // }
    AcThreeKingdomsRankViewTab1Tab3.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETRANK, view.prankCallback, view);
        var baseview = ViewController.getInstance().getView(ViewConst.COMMON.ACTHREEKINGDOMSRANKVIEW);
        view.height = baseview.tabHeight - 46;
        view.width = baseview.tabWidth;
        var code = view.getUiCode();
        var juzhou = BaseBitmap.create(App.CommonUtil.getResByCode("threekingdomsjzhou", code));
        view.addChild(juzhou);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, juzhou, view, [0, 0], true);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRanktip20", code)), 20, TextFieldConst.COLOR_BROWN);
        tipTxt.lineSpacing = 10;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt.width = 560;
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, juzhou, [0, 33]);
        //本周六的第一场攻城战
        var week = view.vo.getCurWeek();
        var start = view.vo.activeSt + (week - 1) * (7 * 86400);
        var unit = view.cfg.activeTime[0];
        //周六
        var st = start + (1 - 1) * 86400 + unit.popularityRange[0] * 3600;
        unit = view.cfg.activeTime[4];
        var et = start + (7 - 1) * 86400 + unit.popularityRange[1] * 3600;
        var timeparam = App.DateUtil.getFormatBySecond(st, 15) + "-" + App.DateUtil.getFormatBySecond(et, 15);
        var dateTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRanktip21", code), [timeparam]), 20, TextFieldConst.COLOR_BROWN);
        view.addChild(dateTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dateTxt, tipTxt, [0, tipTxt.textHeight + 10]);
        //膜拜背景
        var bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.height = 135;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view, [0, 0], true);
        view.addChild(bottomBg);
        this._bottombg = bottomBg;
        //上轮排名 
        var rankBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, App.CommonUtil.getCnByCode("acThreeKingdomsRanktip6", code), view.rankCLick, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [210, 0]);
        view.addChild(rankBtn);
        if (view.vo.getCurWeek() == 1) {
            rankBtn.setGray(true);
        }
        //查看奖励
        var rewardBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acThreeKingdomsRanktip3", code), function () {
            ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSREWARDVIEW3, {
                code: view.code,
                aid: view.aid
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rewardBtn, bottomBg, [25, 0]);
        view.addChild(rewardBtn);
        var arr = [];
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
        this._list = list;
        list.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        var myKingdomTxt = ComponentManager.getTextField(LanguageManager.getlocal("acThreeKingdomsRanktip9-" + code, [""]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myKingdomTxt, view._bottombg, [25, 35]);
        view.addChild(myKingdomTxt);
        view._rankTxt = myKingdomTxt;
        //本轮个人排名
        var rankstr = "";
        var color = String(0x21eb39);
        if (view.vo.getCurPeriod() == 1) {
            rankstr = LanguageManager.getlocal('acBattleRoundNotStart-1');
        }
        var txt3 = ComponentManager.getTextField(LanguageManager.getlocal("acThreeKingdomsRanktip5-" + code, [rankstr]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt3, myKingdomTxt, [0, myKingdomTxt.textHeight + 20]);
        view.addChild(txt3);
        view._rank2Txt = txt3;
        NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_GETRANK, {
            activeId: view.acTivityId,
            round: this.vo.getCurWeek()
        });
    };
    // public tick():void{	
    // 	if (this._countDownText)
    // 	{
    // 		let countDownTime = this.vo.getCountDown();
    // 		if(countDownTime > 0) {
    // 			this._countDownText.text = LanguageManager.getlocal(`acFourPeople_acCD`, [App.DateUtil.getFormatBySecond(countDownTime)]);
    // 		}
    // 		else{
    // 			this._countDownText.text = LanguageManager.getlocal("acPunishEnd");
    // 		}
    // 	}
    // }
    AcThreeKingdomsRankViewTab1Tab3.prototype.rankCLick = function () {
        var view = this;
        if (view.vo.isEnd) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
            return;
        }
        if (view.vo.getCurWeek() == 1 || view.vo.getCurPeriod() == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRanktip10", view.getUiCode())));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSLASTROUNDPRANKVIEW, {
            aid: view.param.data.aid,
            code: view.param.data.code,
        });
    };
    AcThreeKingdomsRankViewTab1Tab3.prototype.getCountTimeStr = function (time) {
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    AcThreeKingdomsRankViewTab1Tab3.prototype.prankCallback = function (evt) {
        var view = this;
        var code = view.getUiCode();
        if (evt.data.ret && evt.data.data.data.round == this.vo.getCurWeek()) {
            var rankarr = evt.data.data.data.rankArr;
            var myrankarr = evt.data.data.data.myrankArr;
            view.vo.prankroundarr = evt.data.data.data;
            var mypoint = 0;
            var rankV = 0;
            if (myrankarr && myrankarr.myrank) {
                rankV = myrankarr.myrank;
            }
            if (myrankarr && myrankarr.value) {
                mypoint = myrankarr.value;
            }
            // arr = [];
            // for(let i = 1; i < 20; ++ i){
            // 	arr.push({
            // 		uid : 1002735+i,
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
            this._list.refreshData(rankarr);
            //我的本轮个人分数
            view._rankTxt.text = LanguageManager.getlocal("acThreeKingdomsRanktip9-" + code, [App.StringUtil.changeIntToText(mypoint)]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view._rankTxt, view._bottombg, [25, 35]);
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
            if (view.vo.getCurPeriod() == 1) {
                rankstr = LanguageManager.getlocal('acBattleRoundNotStart-1');
            }
            view._rank2Txt.text = LanguageManager.getlocal("acThreeKingdomsRanktip5-" + code, [rankstr]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view._rank2Txt, view._rankTxt, [0, view._rankTxt.textHeight + 20]);
        }
    };
    AcThreeKingdomsRankViewTab1Tab3.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETRANK, view.prankCallback, view);
        this._nodeContainer = null;
        this._rankTxt = null;
        this._bottombg = null;
        //this._countDownText = null;
        // TickManager.removeTick(this.tick,this);
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsRankViewTab1Tab3;
}(CommonViewTab));
__reflect(AcThreeKingdomsRankViewTab1Tab3.prototype, "AcThreeKingdomsRankViewTab1Tab3");
//# sourceMappingURL=AcThreeKingdomsRankViewTab1Tab3.js.map