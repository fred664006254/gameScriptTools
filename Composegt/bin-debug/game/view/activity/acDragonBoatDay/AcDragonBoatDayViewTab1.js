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
/*
author : qinajun
date : 2018.4.14
desc : 端午活动 划龙舟
*/
var AcDragonBoatDayViewTab1 = (function (_super) {
    __extends(AcDragonBoatDayViewTab1, _super);
    function AcDragonBoatDayViewTab1() {
        var _this = _super.call(this) || this;
        _this._zziTxt = null;
        _this._curMeterTxt = null;
        _this._numbg = null;
        _this._progressBar = null;
        _this._curRiceTxt = null;
        _this._nextRiceTxt = null;
        _this._prevAwardRiceTxt = null;
        _this._nextAwardRiceTxt = null;
        _this._curAwardRiceTxt = null;
        _this._scrollList = null;
        _this._dbnumricecurbg = null;
        _this._dbnumricenextbg = null;
        _this._awardbg = null;
        _this._prevBtn = null;
        _this._nextBtn = null;
        _this._curJindu = 0;
        _this._lqBtn = null;
        _this._rankBtn = null;
        _this._collectflag = null;
        _this._redPot1 = null;
        _this._redPot2 = null;
        _this._boatclip = null;
        _this._dbboatbg = null;
        _this._dbboatbg2 = null;
        _this._boatGroup = null;
        _this._lampClip = null;
        _this._activityTimerText = null;
        _this._activityDescText = null;
        _this._mibg = null;
        _this._redBg = null;
        _this.isShowLoad = false;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcDragonBoatDayViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDragonBoatDayViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDragonBoatDayViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDragonBoatDayViewTab1.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBJINDU), view.lqJinduAward, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM, view.fresh_view, view);
        var boatview = ViewController.getInstance().getView('AcDragonBoatDayView');
        view.height = boatview.tabHeight;
        view.width = boatview.tabWidth;
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);
        var vo = this.vo;
        var awardbg = BaseBitmap.create('public_listshotbg');
        awardbg.width = 510;
        awardbg.height = 120;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, awardbg, view, [0, 100]);
        view.addChild(awardbg);
        view._awardbg = awardbg;
        if (this.code == "2") {
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, awardbg, view, [10, 78]);
        }
        var tmpRect = new egret.Rectangle(0, 0, 486, 120);
        var scrollList = ComponentManager.getScrollList(ItemScrollItem, null, tmpRect);
        scrollList.addTouchTap(this.clickItemHandler, this);
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollList, awardbg);
        view.addChild(scrollList);
        var lqBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, 'DragonBoatDayLq', view.lqClick, view);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, lqBtn, view, [0, 45]);
        view.addChild(lqBtn);
        view._lqBtn = lqBtn;
        var prevBtn = ComponentManager.getButton('btn_leftpage', '', view.prevClick, view);
        prevBtn.setScale(0.6);
        view.setLayoutPosition(LayoutConst.lefttop, prevBtn, awardbg, [0 - prevBtn.width / 2 * prevBtn.scaleX, 0 - prevBtn.height * prevBtn.scaleY - 15]);
        if (vo.code == 2) {
            view.setLayoutPosition(LayoutConst.lefttop, prevBtn, awardbg, [0 - prevBtn.width / 2 * prevBtn.scaleX - 30, 0 - prevBtn.height * prevBtn.scaleY - 5 + 80]);
        }
        view.addChild(prevBtn);
        view._prevBtn = prevBtn;
        var public_dot1 = BaseBitmap.create("public_dot2");
        view.setLayoutPosition(LayoutConst.lefttop, public_dot1, prevBtn, [0 - public_dot1.width / 4, -public_dot1.height / 4]);
        public_dot1.visible = false;
        view.addChild(public_dot1);
        view._redPot1 = public_dot1;
        var prevAwardRiceTxt = ComponentManager.getTextField("", 18, 0xc2b88b);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, prevAwardRiceTxt, prevBtn, [0, 0]);
        view.addChild(prevAwardRiceTxt);
        view._prevAwardRiceTxt = prevAwardRiceTxt;
        var nextBtn = ComponentManager.getButton('btn_leftpage', '', view.nextClick, view);
        nextBtn.anchorOffsetX = nextBtn.width / 2;
        nextBtn.setScale(0.6);
        view.setLayoutPosition(LayoutConst.righttop, nextBtn, awardbg, [0 - prevBtn.width * 0.8, 0 - prevBtn.height * nextBtn.scaleY - 15]);
        nextBtn.scaleX = -0.6;
        view.addChild(nextBtn);
        view._nextBtn = nextBtn;
        if (vo.code == 2) {
            view.setLayoutPosition(LayoutConst.righttop, nextBtn, awardbg, [0 - prevBtn.width * 0.8 + 80, 0 - prevBtn.height * nextBtn.scaleY - 5 + 80]);
        }
        var public_dot2 = BaseBitmap.create("public_dot2");
        view.setLayoutPosition(LayoutConst.lefttop, public_dot2, nextBtn, [public_dot2.width / 4, -public_dot2.height / 4]);
        public_dot2.visible = false;
        view.addChild(public_dot2);
        view._redPot2 = public_dot2;
        var nextWardriceTxt = ComponentManager.getTextField("", 18, 0xc2b88b);
        view.setLayoutPosition(LayoutConst.rightverticalCenter, nextWardriceTxt, nextBtn, [0, 0]);
        view.addChild(nextWardriceTxt);
        view._nextAwardRiceTxt = nextWardriceTxt;
        var curAwardRiceTxt = ComponentManager.getTextField("", 26, 0xfcf3b4);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, curAwardRiceTxt, awardbg, [0, -17]);
        view.addChild(curAwardRiceTxt);
        view._curAwardRiceTxt = curAwardRiceTxt;
        var height = prevBtn.y - 10; //Math.min(prevBtn.y - 20, 383);
        var bg = BaseBitmap.create('recharge_diban_01');
        bg.width = 612;
        bg.height = height;
        if (this.code == "2") {
            bg.height = 102;
            scrollList.scaleX = 0.9;
            scrollList.scaleY = 0.9;
        }
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view);
        view.addChild(bg);
        var _bottomBg = BaseBitmap.create("rechargevie_db_01");
        _bottomBg.x = bg.x;
        _bottomBg.y = bg.y + bg.height;
        _bottomBg.width = bg.width;
        _bottomBg.height = GameConfig.stageHeigth - bg.y - bg.height - 491;
        view.addChild(_bottomBg);
        this.setChildIndex(_bottomBg, 0);
        var _redBg = BaseBitmap.create("dragonboatred");
        _redBg.width = _bottomBg.width;
        _redBg.x = _bottomBg.x;
        _redBg.y = _bottomBg.y + 4;
        view.addChild(_redBg);
        this.setChildIndex(_redBg, 1);
        view._redBg = _redBg;
        // _bottomBg.height = _bottomBg - view.tabbarGroup.y - view.tabbarGroup.height;
        // view._bottomBg = _bottomBg;
        var boatGroup = new BaseDisplayObjectContainer();
        boatGroup.width = 612;
        boatGroup.height = height - 80;
        view.setLayoutPosition(LayoutConst.lefttop, boatGroup, bg);
        view.addChild(boatGroup);
        boatGroup.mask = new egret.Rectangle(0, 0, 610, boatGroup.height);
        if (this.code == "2") {
            boatGroup.mask = new egret.Rectangle(0, 102, 610, GameConfig.stageHeigth - 300 - 120); //boatGroup.height+102);
            awardbg.width = 498;
            awardbg.height = 112;
        }
        view._boatGroup = boatGroup;
        var dbboatbg = null;
        if (this.code == "1" || this.code == "3" || this.code == "5") {
            dbboatbg = BaseBitmap.create('dragonboatbg');
            dbboatbg.height = height - 80;
            view.setLayoutPosition(LayoutConst.lefttop, dbboatbg, boatGroup, [0, 0], true);
            boatGroup.addChild(dbboatbg);
            view._dbboatbg = dbboatbg;
            var dbboatbg2 = BaseBitmap.create('dragonboatbg');
            dbboatbg2.height = height - 80;
            view.setLayoutPosition(LayoutConst.lefttop, dbboatbg2, dbboatbg, [dbboatbg.width, 0]);
            boatGroup.addChild(dbboatbg2);
            view._dbboatbg2 = dbboatbg2;
            egret.Tween.get(dbboatbg, { loop: true }).
                to({ x: -dbboatbg.width }, 20000).
                to({ x: dbboatbg.width - 5 }, 1).
                to({ x: 0 }, 20000);
            egret.Tween.get(dbboatbg2, { loop: true }).
                to({ x: -dbboatbg.width }, 40000).
                to({ x: dbboatbg.width - 5 }, 1);
            var boatclip = ComponentManager.getCustomMovieClip((this.code == "3" || this.code == "5") ? "dragonboat3_" : "dragonboat", 2, 800);
            boatclip.width = 504;
            boatclip.height = 148;
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, boatclip, bg);
            boatGroup.addChild(boatclip);
            boatclip.playWithTime(-1);
            view._boatclip = boatclip;
        }
        var numbgstr = "public_hb_bg01";
        if (this.code == "2") {
            dbboatbg = BaseLoadBitmap.create('dragonboatbgnew2');
            view.setLayoutPosition(LayoutConst.leftbottom, dbboatbg, boatGroup, [0, 621], true);
            boatGroup.addChild(dbboatbg);
            view._dbboatbg = dbboatbg;
            numbgstr = "public_9_resbg";
        }
        //排行榜
        var rankBg = ComponentManager.getButton("mainui_bottombtnbg", null, this.rankClick, this, null, 0);
        // rankBg.setPosition(GameConfig.stageWidth-rankBg.width-24,visitBg.y);
        rankBg.x = 30;
        this.addChild(rankBg);
        var rankBtn = BaseBitmap.create("punish_rank_icon");
        rankBg.addChild(rankBtn);
        rankBtn.addTouchTap(view.rankClick, view);
        view._rankBtn = rankBtn;
        var rankText = BaseBitmap.create("punish_rank_name");
        rankText.setPosition(rankBg.width / 2 - rankBtn.width / 2, rankBtn.y + rankBtn.height - 20);
        rankBg.addChild(rankText);
        var numbg = BaseBitmap.create(numbgstr);
        view.setLayoutPosition(LayoutConst.righttop, numbg, view, [22, 10]);
        view.addChild(numbg);
        view._numbg = numbg;
        var zziTxt = ComponentManager.getTextField('', 18, TextFieldConst.COLOR_QUALITY_WHITE);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, zziTxt, numbg, [10, 0]);
        view.addChild(zziTxt);
        view._zziTxt = zziTxt;
        var zziImg = BaseBitmap.create('dragonboatitem' + this.code);
        zziImg.setScale(0.5);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, zziImg, numbg, [0 - 0.5 * zziImg.width / 2 + 10, 0]);
        if (this.code == "2") {
            zziImg.setScale(0.8);
            zziImg.setPosition(3, 93);
            view._numbg.setPosition(20, 113);
            zziTxt.width = 90;
            zziTxt.textAlign = TextFieldConst.ALIGH_CENTER;
            view._zziTxt.size = 24;
            view._zziTxt.setPosition(65, 120);
        }
        view.addChild(zziImg);
        var progress = ComponentManager.getProgressBar("dragonboatprogress", "dragonboatprogress_bg", 612);
        progress.setPercentage(0);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, progress, bg, [0, dbboatbg.height + 20]);
        progress.setDragIcon('dragonboathead' + this.code);
        view.addChild(progress);
        view._progressBar = progress;
        if (vo.code == 2) {
            progress.y = GameConfig.stageHeigth - 470;
        }
        var curMeterTxt = ComponentManager.getTextField('', 18, 0xfcf3b4);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, curMeterTxt, progress);
        view.addChild(curMeterTxt);
        view._curMeterTxt = curMeterTxt;
        var dbnumriceprevbg = BaseBitmap.create('dragonboatnumbg');
        dbnumriceprevbg.height = 30;
        view.setLayoutPosition(LayoutConst.lefttop, dbnumriceprevbg, progress, [0, progress.height + 5]);
        view.addChild(dbnumriceprevbg);
        view._dbnumricecurbg = dbnumriceprevbg;
        var prevriceTxt = ComponentManager.getTextField("", 18, 0xfcf3b4);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, prevriceTxt, dbnumriceprevbg, [0, 2]);
        view.addChild(prevriceTxt);
        view._curRiceTxt = prevriceTxt;
        var dbnumricenextbg = BaseBitmap.create('dragonboatnumbg');
        dbnumricenextbg.height = 30;
        view.setLayoutPosition(LayoutConst.righttop, dbnumricenextbg, bg, [0, progress.y + progress.height + 5]);
        view.addChild(dbnumricenextbg);
        view._dbnumricenextbg = dbnumricenextbg;
        if (vo.code == 2) {
            dbnumricenextbg.width = 99;
            dbnumriceprevbg.width = 99;
            view.setLayoutPosition(LayoutConst.righttop, dbnumricenextbg, bg, [5, progress.y + progress.height + 5]);
        }
        var nextriceTxt = ComponentManager.getTextField("", 18, 0xfcf3b4);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nextriceTxt, dbnumricenextbg, [0, 2]);
        view.addChild(nextriceTxt);
        view._nextRiceTxt = nextriceTxt;
        var flag = BaseBitmap.create("collectflag");
        flag.setScale(0.6);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flag, lqBtn);
        view.addChild(flag);
        flag.visible = false;
        view._collectflag = flag;
        if (this.code == "2") {
            //活动时间    
            view._activityTimerText = ComponentManager.getTextField(LanguageManager.getlocal("AcTurnTableViewTime", [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            view.addChild(view._activityTimerText);
            view._activityTimerText.setPosition(bg.x + 10, bg.y + 11);
            //活动描述
            view._activityDescText = ComponentManager.getTextField(LanguageManager.getlocal("DragonBoatDayDesc-" + vo.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            view.addChild(view._activityDescText);
            view._activityDescText.width = bg.width - 20;
            view._activityDescText.setPosition(bg.x + 10, bg.y + 35);
            view.setLayoutPosition(LayoutConst.lefttop, rankBtn, view, [540, 103]);
            view.setLayoutPosition(LayoutConst.horizontalCentertop, view._curAwardRiceTxt, view._awardbg, [0, -22]);
            var downTitleLine = BaseBitmap.create("public_line3");
            this.addChild(downTitleLine);
            view._curAwardRiceTxt.size = 22;
            downTitleLine.width = 440;
            view.setLayoutPosition(LayoutConst.horizontalCentertop, downTitleLine, view._awardbg, [0, -30]);
        }
        view._curJindu = view.vo.getCurJindu();
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_DRAGONINFO, {
            activeId: view.acTivityId
        });
    };
    AcDragonBoatDayViewTab1.prototype.fresh_jindu = function (jindu) {
        var view = this;
        view._zziTxt.text = view.vo.getZongzi().toString();
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._zziTxt, view._numbg);
        if (this.code == "2") {
            view._zziTxt.x = 65;
            view._zziTxt.width = 90;
            view._zziTxt.textAlign = TextFieldConst.ALIGH_CENTER;
        }
        var totalMeter = view.vo.getTotalRiceNum();
        var str = totalMeter >= view.vo.getEndMeter() ? LanguageManager.getlocal("DragonBoatDayEnd_" + this.code) : (LanguageManager.getlocal('DragonBoatDayTotalRiceNum_' + this.code, [view.vo.getTotalRiceNum().toString()]));
        view._curMeterTxt.text = str; //
        if (totalMeter >= view.vo.getEndMeter()) {
            //
            //停止动画
            //view._boatclip.timeRate = 30;
            // if(AcDraftVoteView.CODE=="1")
            // {
            // 	egret.Tween.removeTweens(view._dbboatbg);
            // 	egret.Tween.removeTweens(view._dbboatbg2);
            // 	view._boatclip.stop();
            // 	view._boatclip.playWithTime(1);
            // } 
            view.showLihua();
        }
        var cur_jindu = jindu;
        //当前进度米数
        var curData = view.vo.getteamRewardDataById(cur_jindu);
        var curRice = '';
        if (curData) {
            curRice = curData.needMeter.toString();
        }
        else {
            curRice = '0';
        }
        view._curRiceTxt.text = LanguageManager.getlocal('DragonBoatDayRiceNum_' + this.code, [curRice]);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._curRiceTxt, view._dbnumricecurbg, [0, 2]);
        //下一个进度米数
        var nextData = view.vo.getteamRewardDataById(cur_jindu + 1);
        var nextRice = '';
        if (nextData) {
            nextRice = nextData.needMeter.toString();
        }
        else {
            var prevData = view.vo.getteamRewardDataById(cur_jindu - 1);
            view._curRiceTxt.text = LanguageManager.getlocal('DragonBoatDayRiceNum_' + this.code, [prevData.needMeter.toString()]);
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._curRiceTxt, view._dbnumricecurbg, [0, 2]);
            nextRice = curData.needMeter.toString();
        }
        view._nextRiceTxt.text = LanguageManager.getlocal('DragonBoatDayRiceNum_' + this.code, [nextRice]);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._nextRiceTxt, view._dbnumricenextbg, [0, 2]);
        view.fresh_rewward(view._curJindu);
        //进度条
        var percent = 0;
        var totalRice = view.vo.getTotalRiceNum();
        var curMeter = 0;
        if (cur_jindu == 0) {
            curMeter = nextData.needMeter;
            nextData = view.vo.getteamRewardDataById(2);
            nextRice = nextData.needMeter.toString();
        }
        else {
            curMeter = curData.needMeter;
        }
        if (cur_jindu == 0) {
            percent = totalRice / curMeter;
        }
        else if (nextData) {
            percent = (totalRice - curMeter) / (nextData.needMeter - curMeter);
        }
        else {
            if (totalRice >= view.vo.getEndMeter()) {
                percent = 1;
            }
            else {
                var prevData = view.vo.getteamRewardDataById(cur_jindu - 1);
                percent = (totalRice - curMeter) / (curMeter - prevData.needMeter);
            }
        }
        view._progressBar.setPercentage(percent);
        if (view._curJindu == view.vo.getCurJindu() && totalRice >= (nextData ? nextData.needMeter : curMeter)) {
            view._progressBar.resetIconPosition(575);
        }
        view._progressBar.setIconVisible(view._curJindu == view.vo.getCurJindu());
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._curMeterTxt, view, [0, view._progressBar.y + view._progressBar.height + 15 - view.y]);
    };
    AcDragonBoatDayViewTab1.prototype.fresh_rewward = function (cur_jindu) {
        var view = this;
        if (cur_jindu == 0) {
            cur_jindu = 1;
        }
        //进度奖励
        var prevData = view.vo.getteamRewardDataById(cur_jindu - 1);
        var prevRice = '';
        if (prevData) {
            view._prevAwardRiceTxt.visible = view._prevBtn.visible = true;
            prevRice = prevData.needMeter.toString();
        }
        else {
            prevRice = '';
            view._prevAwardRiceTxt.visible = view._prevBtn.visible = false;
        }
        view._prevAwardRiceTxt.text = LanguageManager.getlocal('DragonBoatDayRiceNum_' + this.code, [prevRice]);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, view._prevAwardRiceTxt, view._prevBtn, [view._prevBtn.width * 0.8, 0]);
        var curData = view.vo.getteamRewardDataById(cur_jindu);
        var nextData = view.vo.getteamRewardDataById(cur_jindu + 1);
        var curMeter = curData.needMeter;
        var nextMeter = 0; //n
        view._curAwardRiceTxt.text = LanguageManager.getlocal('DragonBoatDayRiceNumAward_' + this.code, [curMeter.toString()]);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._curAwardRiceTxt, view._redBg);
        if (nextData) {
            view._nextAwardRiceTxt.visible = view._nextBtn.visible = true;
            nextMeter = nextData.needMeter;
        }
        else {
            view._nextAwardRiceTxt.visible = view._nextBtn.visible = false;
        }
        view._nextAwardRiceTxt.text = LanguageManager.getlocal('DragonBoatDayRiceNum_' + this.code, [nextMeter.toString()]);
        view.setLayoutPosition(LayoutConst.rightverticalCenter, view._nextAwardRiceTxt, view._nextBtn, [-20, 0]);
        view._scrollList.refreshData(view.vo.gerCurRiceAward(view._curJindu), view.code);
        view._scrollList.width = (view.vo.gerCurRiceAward(view._curJindu)).length > 3 ? 486 : 363;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._scrollList, view._awardbg);
        var curTotalMeter = view.vo.getTotalRiceNum();
        if (curTotalMeter >= curMeter) {
            view._collectflag.visible = view.vo.isGetJinduAward(view._curJindu);
            view._lqBtn.setEnable(true);
        }
        else {
            view._collectflag.visible = false;
            view._lqBtn.setEnable(false);
        }
        view._lqBtn.visible = !view._collectflag.visible;
        //小红点
        if (prevData) {
            view._redPot1.visible = view.vo.isCanLqAwardJindu(view._curJindu - 1);
        }
        else {
            view._redPot1.visible = false;
        }
        if (nextData) {
            view._redPot2.visible = view.vo.isCanLqAwardJindu(view._curJindu + 1, true);
        }
        else {
            view._redPot2.visible = false;
        }
        if (this.code == "2") {
            view._nextAwardRiceTxt.visible = false;
            view._prevAwardRiceTxt.visible = false;
        }
    };
    AcDragonBoatDayViewTab1.prototype.prevClick = function () {
        var view = this;
        view._curJindu = Math.max(0, view._curJindu - 1);
        view.fresh_jindu(view._curJindu);
    };
    AcDragonBoatDayViewTab1.prototype.lqJinduAward = function (evt) {
        var view = this;
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        view.fresh_rewward(view._curJindu);
        var rewards = rData.rewards;
        var rewardList = GameData.formatRewardItem(rewards);
        var pos = new egret.Point(view.width / 2, GameConfig.stageHeigth - 200);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    AcDragonBoatDayViewTab1.prototype.nextClick = function () {
        var view = this;
        if (view._curJindu == 0) {
            view._curJindu = 1;
        }
        view._curJindu = Math.min(view.vo.getArr('teamReward').length, view._curJindu + 1);
        view.fresh_jindu(view._curJindu);
    };
    AcDragonBoatDayViewTab1.prototype.lqClick = function () {
        var view = this;
        if (GameData.serverTime < view.vo.et) {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_DBJINDU, {
                activeId: view.acTivityId,
                rechargeId: view._curJindu
            });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
        }
    };
    AcDragonBoatDayViewTab1.prototype.rankClick = function () {
        // this._acVo.et = GameData.serverTime + 10;
        var view = this;
        if (view.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.DRAGONBOATRANKVIEW, {
            aid: view.aid,
            code: view.code
        });
    };
    AcDragonBoatDayViewTab1.prototype.getdragonInfo = function (evt) {
        var view = this;
        var data = evt.data;
        // Api.acVoApi.formatData(data.data.data.activity, data.data.cmd == NetRequestConst.REQUEST_USER_LOGIIN);
        // view.vo.setRiceNumber(data.data.data.riceNumber);
        //view.fresh_jindu();
        // if(view.isShowLoad){
        // 	view.isShowLoad = false;
        // 	NetLoading.hide();
        // }
    };
    AcDragonBoatDayViewTab1.prototype.refreshWhenSwitchBack = function () {
        var view = this;
        // this.request(NetRequestConst.REQUEST_ACTIVITY_DRAGONINFO, {
        // 	activeId : view.acTivityId
        // });
    };
    AcDragonBoatDayViewTab1.prototype.update = function () {
        var view = this;
        if (!this.vo) {
            return;
        }
    };
    AcDragonBoatDayViewTab1.prototype.clickItemHandler = function (event) {
        var view = this;
        var index = Number(event.data);
        var arr = view.vo.gerCurRiceAward(view._curJindu);
        var item = arr[index];
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, item.id);
    };
    AcDragonBoatDayViewTab1.prototype.showLihua = function () {
        var view = this;
        //dblamp1
        if (this.code == "1") {
            var dblamp1 = ComponentManager.getCustomMovieClip("dblamp", 2, 800);
            dblamp1.width = 57;
            dblamp1.height = 181;
            view.setLayoutPosition(LayoutConst.lefttop, dblamp1, view._boatGroup, [15, view._rankBtn.y + view._rankBtn.height + 15], true);
            view._boatGroup.addChild(dblamp1);
            var dblamp2 = ComponentManager.getCustomMovieClip("dblamp", 2, 800);
            dblamp2.width = 57;
            dblamp2.height = 181;
            view.setLayoutPosition(LayoutConst.righttop, dblamp2, view._boatGroup, [15, view._rankBtn.y + view._rankBtn.height + 15], true);
            view._boatGroup.addChild(dblamp2);
            var dblamp3 = ComponentManager.getCustomMovieClip("dblamp", 2, 800);
            dblamp3.width = 57;
            dblamp3.height = 181;
            dblamp3.setScale(0.7);
            view.setLayoutPosition(LayoutConst.lefttop, dblamp3, dblamp1, [15 + dblamp1.width, 0 - 40]);
            view._boatGroup.addChild(dblamp3);
            var dblamp4 = ComponentManager.getCustomMovieClip("dblamp", 2, 800);
            dblamp4.width = 57;
            dblamp4.height = 181;
            dblamp4.setScale(0.7);
            view.setLayoutPosition(LayoutConst.righttop, dblamp4, dblamp2, [15 + dblamp2.width, 0 - 40]);
            view._boatGroup.addChild(dblamp4);
            dblamp1.playWithTime(-1);
            dblamp2.playWithTime(-1);
            dblamp3.playWithTime(-1);
            dblamp4.playWithTime(-1);
        }
        var deviationNum = 0;
        if (this.code == "2") {
            deviationNum = 200;
        }
        var param = {
            1: { color: 'hong', pos: [500, 40 + deviationNum], scale: 0.9, wait: 0 },
            2: { color: 'huang', pos: [80, 10 + deviationNum], scale: 1.85, wait: 200 },
            3: { color: 'huang', pos: [300, 0 + deviationNum], scale: 1.5, wait: 400 },
            4: { color: 'lan', pos: [200, -50 + deviationNum], scale: 2, wait: 650 },
            5: { color: 'hong', pos: [40, 60 + deviationNum], scale: 1, wait: 900 }
        };
        var ths = this;
        var _loop_1 = function (i) {
            if (view._boatGroup && !view._boatGroup.getChildByName("lihua" + i)) {
                var unit = param[i];
                var lihuaclip_1 = ComponentManager.getCustomMovieClip("lihua_" + unit.color + "000", 10, 115);
                lihuaclip_1.setScale(unit.scale);
                lihuaclip_1.name = "lihua" + i;
                lihuaclip_1.x = unit.pos[0];
                lihuaclip_1.y = unit.pos[1];
                view._boatGroup.addChild(lihuaclip_1);
                egret.Tween.get(lihuaclip_1).wait(unit.wait).call(function () {
                    egret.Tween.removeTweens(lihuaclip_1);
                    if (view._boatGroup) {
                        view._boatGroup.addChild(lihuaclip_1);
                        lihuaclip_1.playWithTime(-1);
                    }
                }, view);
            }
        };
        for (var i in param) {
            _loop_1(i);
        }
    };
    AcDragonBoatDayViewTab1.prototype.fresh_view = function () {
        var view = this;
        view.fresh_jindu(view._curJindu);
    };
    AcDragonBoatDayViewTab1.prototype.dispose = function () {
        var view = this;
        if (this.code == "1") {
            egret.Tween.removeTweens(view._dbboatbg);
            egret.Tween.removeTweens(view._dbboatbg2);
            view._boatclip.stop();
            view._boatclip.dispose();
        }
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM, view.fresh_view, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBJINDU), view.lqJinduAward, view);
        view._zziTxt = null;
        view._curMeterTxt = null;
        view._numbg = null;
        view._progressBar = null;
        view._curRiceTxt = null;
        view._nextRiceTxt = null;
        view._prevAwardRiceTxt = null;
        view._nextAwardRiceTxt = null;
        view._curAwardRiceTxt = null;
        view._scrollList.removeTouchTap();
        view._scrollList = null;
        view._dbnumricecurbg = null;
        view._dbnumricenextbg = null;
        view._awardbg = null;
        view._prevBtn = null;
        view._nextBtn = null;
        view._lqBtn = null;
        view._collectflag = null;
        view._redPot1 = null;
        view._redPot2 = null;
        view._boatclip = null;
        view._dbboatbg = null;
        view._dbboatbg2 = null;
        view._boatGroup.dispose();
        view._boatGroup = null;
        view._activityDescText = view._activityTimerText = null;
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);
        _super.prototype.dispose.call(this);
    };
    return AcDragonBoatDayViewTab1;
}(AcCommonViewTab));
__reflect(AcDragonBoatDayViewTab1.prototype, "AcDragonBoatDayViewTab1");
