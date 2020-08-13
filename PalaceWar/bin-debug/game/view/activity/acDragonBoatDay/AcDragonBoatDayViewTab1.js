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
        _this._curJindu = 1;
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
        _this._steps = null;
        _this._steps2 = null;
        _this._teamClip = null;
        _this._ribbonaClip = null;
        _this._ribbonbClip = null;
        _this._terminusbg = null;
        //解决_curRiceTxt,_nextRiceTxt显示错误的问题加的参数,范围0-9
        _this._newIndex = 0;
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
    AcDragonBoatDayViewTab1.prototype.getTypeCode = function () {
        var code = this.code;
        if (this.code == '6') {
            code = '3';
        }
        return code;
    };
    AcDragonBoatDayViewTab1.prototype.initView = function () {
        var _this = this;
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBJINDU), view.lqJinduAward, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM, view.fresh_view, view);
        var boatview = ViewController.getInstance().getView('AcDragonBoatDayView');
        view.height = boatview.tabHeight;
        view.width = boatview.tabWidth;
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);
        var vo = this.vo;
        var downBg = null;
        if (this.getTypeCode() == "5") {
            downBg = BaseBitmap.create('dragobottombg');
            downBg.width = 630;
            downBg.height = 326;
            this.addChild(downBg);
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, downBg, this, [0, 18]);
            var dragonfont = BaseBitmap.create('dragonfont');
            dragonfont.width = 528;
            dragonfont.height = 136;
            this.addChild(dragonfont);
            dragonfont.x = 50;
            dragonfont.y = 50;
        }
        var awardbg = BaseBitmap.create('public_9_bg41');
        awardbg.width = 510;
        awardbg.height = 126;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, awardbg, view, [0, this.getTypeCode() == '4' ? 120 : 100]);
        view.addChild(awardbg);
        view._awardbg = awardbg;
        if (this.getTypeCode() == "2") {
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, awardbg, view, [10, 78]);
        }
        if (this.getTypeCode() == "5") {
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, awardbg, view, [10, 90]);
        }
        if (this.getTypeCode() == "7") {
            var _bottomBg = BaseLoadBitmap.create("dragonboatbuttombg-" + this.getTypeCode());
            _bottomBg.width = 612;
            _bottomBg.height = 282;
            _bottomBg.setPosition(awardbg.x + awardbg.width / 2 - _bottomBg.width / 2, awardbg.y - 120 - 40 + 78); // 251 211
            view.addChild(_bottomBg);
        }
        if (this.getTypeCode() == "8") {
            var _bottomBg = BaseLoadBitmap.create("dragonboatbuttombg-" + this.getTypeCode());
            _bottomBg.width = 612;
            _bottomBg.height = 282;
            _bottomBg.setPosition(awardbg.x + awardbg.width / 2 - _bottomBg.width / 2, awardbg.y - 120 - 40 + 78); // 251 211
            view.addChild(_bottomBg);
        }
        var tmpRect = new egret.Rectangle(0, 0, 486, 124);
        var scrollList = ComponentManager.getScrollList(ItemScrollItem, null, tmpRect);
        scrollList.addTouchTap(this.clickItemHandler, this);
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, awardbg, [0, 4]);
        view.addChild(scrollList);
        var lqBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'DragonBoatDayLq', view.lqClick, view);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, lqBtn, view, [0, 40]);
        view.addChild(lqBtn);
        view._lqBtn = lqBtn;
        if (this.getTypeCode() == "5") {
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, lqBtn, view, [0, 30]);
        }
        var prevBtn = ComponentManager.getButton('btn_leftpage', '', view.prevClick, view);
        prevBtn.setScale(0.8);
        view.setLayoutPosition(LayoutConst.lefttop, prevBtn, awardbg, [0 - prevBtn.width / 2 * prevBtn.scaleX - 20, 0 - prevBtn.height * prevBtn.scaleY - 5]);
        if (this.getTypeCode() == "2" || this.getTypeCode() == "5") {
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
        nextBtn.setScale(0.8);
        view.setLayoutPosition(LayoutConst.righttop, nextBtn, awardbg, [0 - prevBtn.width * 0.8, 0 - prevBtn.height * nextBtn.scaleY - 5]);
        nextBtn.scaleX = -0.8;
        view.addChild(nextBtn);
        view._nextBtn = nextBtn;
        if (view.getTypeCode() == "2" || view.getTypeCode() == "5") {
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
        view.setLayoutPosition(LayoutConst.horizontalCentertop, curAwardRiceTxt, awardbg, [0, -27]);
        view.addChild(curAwardRiceTxt);
        view._curAwardRiceTxt = curAwardRiceTxt;
        var height = prevBtn.y - 10; //Math.min(prevBtn.y - 20, 383);
        var bg = BaseBitmap.create('dragonboatbg2');
        bg.width = 612;
        bg.height = height;
        if (this.getTypeCode() == "2") {
            bg.height = 102;
            scrollList.scaleX = 0.9;
            scrollList.scaleY = 0.9;
        }
        if (this.getTypeCode() == "5") {
            bg.visible = false;
        }
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view);
        view.addChild(bg);
        var boatGroup = new BaseDisplayObjectContainer();
        boatGroup.width = 612;
        boatGroup.height = height - 80;
        view.setLayoutPosition(LayoutConst.lefttop, boatGroup, bg);
        view.addChild(boatGroup);
        boatGroup.mask = new egret.Rectangle(0, 0, 610, boatGroup.height);
        if (this.getTypeCode() == "2") {
            boatGroup.mask = new egret.Rectangle(0, 102, 610, GameConfig.stageHeigth - 300 - 120); //boatGroup.height+102);
            awardbg.width = 498;
            awardbg.height = 112;
        }
        view._boatGroup = boatGroup;
        if (this.getTypeCode() == "5") {
            view._boatGroup.visible = false;
        }
        var dbboatbg = null;
        if (this.getTypeCode() == '4') {
            boatGroup.height = Math.min(height - 60, 310);
            boatGroup.mask = new egret.Rectangle(0, 0, 610, boatGroup.height);
            var cloud = BaseBitmap.create('dragonboatbg4-3');
            // dbboatbg.height = height - 80;
            view.setLayoutPosition(LayoutConst.lefttop, cloud, boatGroup, [0, 0], true);
            boatGroup.addChild(cloud);
            // view._dbboatbg = dbboatbg;
            dbboatbg = BaseBitmap.create('dragonboatbg4-2');
            // dbboatbg.height = height - 80;
            view.setLayoutPosition(LayoutConst.lefttop, dbboatbg, boatGroup, [0, 0], true);
            boatGroup.addChild(dbboatbg);
            view._dbboatbg = dbboatbg;
            var dbboatbg2 = BaseBitmap.create('dragonboatbg4-2');
            view.setLayoutPosition(LayoutConst.lefttop, dbboatbg2, dbboatbg, [dbboatbg.width, 0]);
            boatGroup.addChild(dbboatbg2);
            view._dbboatbg2 = dbboatbg2;
            egret.Tween.get(dbboatbg, { loop: true }).
                to({ x: -dbboatbg.width }, 57000).
                to({ x: dbboatbg.width - 5 }, 1).
                to({ x: 0 }, 57000);
            egret.Tween.get(dbboatbg2, { loop: true }).
                to({ x: -dbboatbg.width }, 114000).
                to({ x: dbboatbg.width - 5 }, 1);
            var steps = BaseBitmap.create('dragonboatbg4-1');
            // dbboatbg.height = height - 80;
            view.setLayoutPosition(LayoutConst.lefttop, steps, boatGroup, [0, 30], true);
            boatGroup.addChild(steps);
            var steps2 = BaseBitmap.create('dragonboatbg4-1');
            view.setLayoutPosition(LayoutConst.lefttop, steps2, boatGroup, [572, -235.2]);
            boatGroup.addChild(steps2);
            egret.Tween.get(steps, { loop: true }).
                to({ x: -572, y: 295.2 }, 13000).
                to({ x: 572, y: -235.2 }, 1).
                to({ x: 0, y: 30 }, 13000);
            egret.Tween.get(steps2, { loop: true }).
                to({ x: -572, y: 295.2 }, 26000).
                to({ x: 572, y: -235.2 }, 1);
            view._dbboatbg2 = dbboatbg2;
            var boatclip = ComponentManager.getCustomMovieClip('dragonboatman', 7, 200);
            boatclip.width = 63;
            boatclip.height = 133;
            view.setLayoutPosition(LayoutConst.horizontalCentertop, boatclip, dbboatbg, [-120, 70]);
            boatGroup.addChild(boatclip);
            boatclip.playWithTime(-1);
            view._boatclip = boatclip;
            var mask = BaseBitmap.create('dragonboatmask');
            // dbboatbg.height = height - 80;
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, mask, boatclip, [-15, -5]);
            boatGroup.addChild(mask);
            boatGroup.swapChildren(mask, boatclip);
        }
        else if (this.getTypeCode() == "7") {
            boatGroup.height = Math.min(height - 60, 310);
            boatGroup.mask = new egret.Rectangle(0, 0, 610, boatGroup.height);
            var steps = BaseLoadBitmap.create("dragonboatbg" + this.getTypeCode() + "-1");
            steps.width = 1089;
            steps.height = 383;
            boatGroup.addChild(steps);
            var steps2 = BaseLoadBitmap.create("dragonboatbg" + this.getTypeCode() + "-1");
            steps2.width = 1089;
            steps2.height = 383;
            boatGroup.addChild(steps2);
            var t = 52000 / (steps.width * 2);
            egret.Tween.get(steps, { loop: true }).to({
                x: -1089,
            }, (steps.x + steps.width) * t).to({
                x: steps2.x + steps2.width,
            }, 0).to({
                x: 0,
            }, steps2.x + steps2.width * t);
            egret.Tween.get(steps2, { loop: true }).to({
                x: steps.x + steps.width,
            }, 0).to({
                x: -1089,
            }, (steps.x + steps.width * 2) * t);
            this._steps = steps;
            this._steps2 = steps2;
            this._terminusbg = BaseLoadBitmap.create("dragonboatterminusbg-" + this.getTypeCode());
            this._terminusbg.width = 250;
            this._terminusbg.height = 382;
            this._terminusbg.setPosition(610 - this._terminusbg.width, 0);
            boatGroup.addChild(this._terminusbg);
            // let vo = <AcDragonBoatDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
            var needMeter = this.cfg.teamReward["9"].needMeter;
            if (needMeter) {
                var type = null;
                var posXa = 0;
                var posYa = 0;
                var posXb = 0;
                var posYb = 0;
                var scale = 0;
                if (this.vo.getTotalRiceNum() < needMeter * 0.3) {
                    type = "a";
                    posXa = -58;
                    posYa = -38;
                    posXb = 157;
                    posYb = -61;
                    scale = 0.6;
                }
                else if (this.vo.getTotalRiceNum() < needMeter * 0.6) {
                    type = "b";
                    posXa = -150;
                    posYa = -81;
                    posXb = 137;
                    posYb = -108;
                    scale = 0.8;
                }
                else {
                    type = "c";
                    posXa = -171;
                    posYa = -109;
                    posXb = 187;
                    posYb = -143;
                    scale = 1;
                }
                this._teamClip = ComponentManager.getCustomMovieClip("acdragonboatvieweffect_team" + type, 4, 150);
                var teamBM = BaseBitmap.create("acdragonboatvieweffect_team" + type + "1");
                this._teamClip.setPosition(305 - teamBM.width / 2 - 30, 30);
                boatGroup.addChild(this._teamClip);
                this._teamClip.addTouchTap(function () {
                    _this._ribbonaClip.playWithTime(1);
                    _this._ribbonbClip.playWithTime(1);
                }, this);
                if (this.vo.getTotalRiceNum() < needMeter) {
                    this._teamClip.setVisible(true);
                    this._teamClip.playWithTime(-1);
                    this._terminusbg.setVisible(false);
                }
                else {
                    this._teamClip.setVisible(false);
                    var teamBM_1 = BaseBitmap.create("acdragonboatvieweffect_team" + type + "1");
                    teamBM_1.setPosition(this._teamClip.x, this._teamClip.y);
                    boatGroup.addChild(teamBM_1);
                    teamBM_1.addTouchTap(function () {
                        _this._ribbonaClip.playWithTime(1);
                        _this._ribbonbClip.playWithTime(1);
                    }, this);
                    egret.Tween.removeTweens(this._steps);
                    egret.Tween.removeTweens(this._steps2);
                    this._terminusbg.setVisible(true);
                }
                this._ribbonaClip = ComponentManager.getCustomMovieClip("acdragonboatvieweffect_ribbona", 12, 120);
                this._ribbonaClip.setScale(scale);
                this._ribbonaClip.setPosition(this._teamClip.x + posXa, this._teamClip.y + posYa);
                boatGroup.addChild(this._ribbonaClip);
                this._ribbonbClip = ComponentManager.getCustomMovieClip("acdragonboatvieweffect_ribbonb", 12, 120);
                this._ribbonbClip.setScale(scale);
                this._ribbonbClip.setPosition(this._teamClip.x + posXb, this._teamClip.y + posYb);
                boatGroup.addChild(this._ribbonbClip);
            }
            // egret.Tween.get(steps,{loop : true}).
            // to({x : -572, y :295.2},13000). 
            // to({x : 572, y : -235.2}, 1).
            // to({x : 0, y : 30},13000);
            // egret.Tween.get(steps2,{loop : true}).
            // to({x : -572, y : 295.2}, 26000).
            // to({x : 572, y : -235.2}, 1);
            // // view._dbboatbg2 = dbboatbg2;
            // let boatclip = ComponentManager.getCustomMovieClip('dragonboatman',7,200);
            // boatclip.width = 63;
            // boatclip.height = 133;
            // view.setLayoutPosition(LayoutConst.horizontalCentertop, boatclip, dbboatbg, [-120,70]);
            // boatGroup.addChild(boatclip); 
            // boatclip.playWithTime(-1);
            // view._boatclip = boatclip;
            // let mask = BaseBitmap.create('dragonboatmask');
            // // dbboatbg.height = height - 80;
            // view.setLayoutPosition(LayoutConst.horizontalCenterbottom, mask, boatclip, [-15,-5]);
            // boatGroup.addChild(mask);
            // boatGroup.swapChildren(mask,boatclip);
        }
        else if (this.getTypeCode() == "8") {
            dbboatbg = BaseBitmap.create('dragonboatbg8-1');
            var top_1 = Math.min(0, (height - 60) - dbboatbg.height);
            view.setLayoutPosition(LayoutConst.lefttop, dbboatbg, boatGroup, [0, top_1], true);
            boatGroup.addChild(dbboatbg);
            view._dbboatbg = dbboatbg;
            var dbboatbg2 = BaseBitmap.create('dragonboatbg8-1');
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
            var clip = ComponentManager.getCustomMovieClip("acdragonboatviewlamp", 12);
            clip.width = 615;
            clip.height = 150;
            clip.y = dbboatbg.y + dbboatbg.height - clip.height + 5;
            clip.x = -2;
            clip.playWithTime(-1);
            boatGroup.addChild(clip);
            this.makeLamp();
        }
        else if (this.getTypeCode() != '2' && this.getTypeCode() != '5') {
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
            var boatclip = ComponentManager.getCustomMovieClip(this.getTypeCode() == "3" ? "dragonboat3_" : "dragonboat", 2, 800);
            boatclip.width = 504;
            boatclip.height = 148;
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, boatclip, view._boatGroup, [20, 0], true);
            boatGroup.addChild(boatclip);
            boatclip.playWithTime(-1);
            view._boatclip = boatclip;
        }
        var numbgstr = "public_numbg";
        if (this.getTypeCode() == "2") {
            dbboatbg = BaseLoadBitmap.create('dragonboatbgnew2');
            view.setLayoutPosition(LayoutConst.leftbottom, dbboatbg, boatGroup, [0, 621], true);
            boatGroup.addChild(dbboatbg);
            view._dbboatbg = dbboatbg;
            numbgstr = "public_9_resbg";
        }
        var rankBtnStr = 'dragonboatrank';
        if (this.getTypeCode() == "7") {
            rankBtnStr = 'dragonboatrankbtn-' + this.getTypeCode();
        }
        var rankBtn = ComponentManager.getButton(rankBtnStr, '', view.rankClick, view);
        view.setLayoutPosition(LayoutConst.lefttop, rankBtn, view, [22, 10]);
        view._rankBtn = rankBtn;
        view.addChild(rankBtn);
        var numbg = BaseBitmap.create(numbgstr);
        view.setLayoutPosition(LayoutConst.righttop, numbg, view, [22, 10]);
        view.addChild(numbg);
        view._numbg = numbg;
        var zziTxt = ComponentManager.getTextField('', 18, TextFieldConst.COLOR_QUALITY_WHITE);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, zziTxt, numbg, [10, 0]);
        view.addChild(zziTxt);
        view._zziTxt = zziTxt;
        var zziImg = BaseBitmap.create('dragonboatitem' + this.getTypeCode());
        zziImg.setScale(0.5);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, zziImg, numbg, [0 - 0.5 * zziImg.width / 2 + 10, 0]);
        if (this.getTypeCode() == "2") {
            zziImg.setScale(0.8);
            zziImg.setPosition(3, 93);
            view._numbg.setPosition(20, 113);
            zziTxt.width = 90;
            zziTxt.textAlign = TextFieldConst.ALIGH_CENTER;
            view._zziTxt.size = 24;
            view._zziTxt.setPosition(65, 120);
        }
        if (this.getTypeCode() == "5") {
            view._numbg.x = 15;
            view.setLayoutPosition(LayoutConst.lefttop, zziImg, downBg, [13, -70]);
            view._numbg.y = zziImg.y - 3 + 10;
            zziTxt.width = 90;
            zziTxt.textAlign = TextFieldConst.ALIGH_CENTER;
            view._zziTxt.size = 24;
            view._zziTxt.setPosition(zziImg.x - 15, zziImg.y);
        }
        view.addChild(zziImg);
        var progress = ComponentManager.getProgressBar("dragonboatprogress", "dragonboatprogress_bg", 612);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, progress, view._boatGroup, [0, view._boatGroup.height + (this.getTypeCode() == '4' ? 10 : 30)]);
        if (this.getTypeCode() == "7") {
            view.setLayoutPosition(LayoutConst.horizontalCentertop, progress, view._boatGroup, [0, view._boatGroup.height + 10]);
        }
        progress.setDragIcon('dragonboathead' + (this.getTypeCode() == '4' ? '3' : this.getTypeCode()));
        progress.setPercentage(0);
        view.addChild(progress);
        view._progressBar = progress;
        if (this.getTypeCode() == "2" || this.getTypeCode() == "5") {
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
        if (view.getTypeCode() == "2" || view.getTypeCode() == "5") {
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
        if (this.getTypeCode() == "2" || this.getTypeCode() == "5") {
            //活动时间    
            view._activityTimerText = ComponentManager.getTextField(LanguageManager.getlocal("AcTurnTableViewTime", [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            view.addChild(view._activityTimerText);
            view._activityTimerText.setPosition(bg.x + 10, bg.y + 11);
            //活动描述
            var dayDesc = '';
            if ((this.code == '1' || this.code == '3' || this.code == '6') && Api.switchVoApi.checkServantRefuseBattle()) {
                dayDesc = "DragonBoatDayDesc-" + view.code + "_withOpenRefusal";
            }
            else {
                dayDesc = "DragonBoatDayDesc-" + view.code;
            }
            view._activityDescText = ComponentManager.getTextField(LanguageManager.getlocal(dayDesc), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            view.addChild(view._activityDescText);
            view._activityDescText.width = bg.width - 20;
            view._activityDescText.setPosition(bg.x + 10, bg.y + 35);
            view.setLayoutPosition(LayoutConst.lefttop, rankBtn, view, [540, 103]);
            view.setLayoutPosition(LayoutConst.horizontalCentertop, view._curAwardRiceTxt, view._awardbg, [0, -22]);
            if (this.getTypeCode() == "5") {
                view._activityTimerText.setPosition(24, -60);
                view._activityDescText.setPosition(bg.x + 10, -30);
                view.setLayoutPosition(LayoutConst.lefttop, rankBtn, downBg, [540, -90]);
            }
            var downTitleLine = BaseBitmap.create("public_line3");
            this.addChild(downTitleLine);
            view._curAwardRiceTxt.size = 22;
            downTitleLine.width = 440;
            view.setLayoutPosition(LayoutConst.horizontalCentertop, downTitleLine, view._awardbg, [0, -30]);
            if (this.getTypeCode() == "5") {
                downTitleLine.visible = false;
                view._curAwardRiceTxt.x = view._curAwardRiceTxt.x - 5;
                view._curAwardRiceTxt.y = view._curAwardRiceTxt.y - 10;
                //view.setLayoutPosition(LayoutConst.horizontalCentertop, , view._awardbg, [0, -42]);
            }
        }
        view._curJindu = view.vo.getCurJindu();
        view._newIndex = Math.min(view.vo.getArr('teamReward').length, view._curJindu);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_DRAGONINFO, {
            activeId: view.acTivityId
        });
        if (this.getTypeCode() == "7") {
            view.setLayoutPosition(LayoutConst.lefttop, prevBtn, awardbg, [0 - prevBtn.width / 2 * prevBtn.scaleX - 20, 0 - prevBtn.height * prevBtn.scaleY - 5 - 5]);
            view.setLayoutPosition(LayoutConst.lefttop, public_dot1, prevBtn, [0 - public_dot1.width / 4, -public_dot1.height / 4]);
            view.setLayoutPosition(LayoutConst.righttop, nextBtn, awardbg, [0 - prevBtn.width * 0.8 + 80, 0 - prevBtn.height * nextBtn.scaleY - 5 - 5]);
            view.setLayoutPosition(LayoutConst.lefttop, public_dot2, nextBtn, [public_dot2.width / 4, -public_dot2.height / 4]);
        }
    };
    AcDragonBoatDayViewTab1.prototype.fresh_jindu = function (jindu) {
        var view = this;
        view._zziTxt.text = view.vo.getZongzi().toString();
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._zziTxt, view._numbg);
        if (this.getTypeCode() == "2" || this.getTypeCode() == "5") {
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
            if (AcDraftVoteView.CODE == "1") {
                egret.Tween.removeTweens(view._dbboatbg);
                egret.Tween.removeTweens(view._dbboatbg2);
                view._boatclip.stop();
                view._boatclip.playWithTime(1);
            }
            view.showLihua();
        }
        var cur_jindu = jindu;
        //当前进度米数
        var curData = view.vo.getteamRewardDataById(cur_jindu - 1);
        var curRice = '';
        if (curData) {
            curRice = curData.needMeter.toString();
        }
        else {
            curRice = '0';
        }
        view._curRiceTxt.text = LanguageManager.getlocal('DragonBoatDayRiceNum_' + this.code, [curRice]);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._curRiceTxt, view._dbnumricecurbg, [0, 2]);
        //前一个进度米数
        var prevData = view.vo.getteamRewardDataById(view._newIndex - 1);
        var prevRice = '';
        if (prevData) {
            prevRice = prevData.needMeter.toString();
        }
        else {
            prevRice = '0';
        }
        view._curRiceTxt.text = LanguageManager.getlocal('DragonBoatDayRiceNum_' + this.code, [prevRice]);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._curRiceTxt, view._dbnumricecurbg, [0, 2]);
        //下一个进度米数
        var nextData = view.vo.getteamRewardDataById(view._newIndex);
        var nextRice = nextData.needMeter.toString();
        view._nextRiceTxt.text = LanguageManager.getlocal('DragonBoatDayRiceNum_' + this.code, [nextRice]);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._nextRiceTxt, view._dbnumricenextbg, [0, 2]);
        view.fresh_rewward(view._curJindu);
        //进度条
        var percent = 0;
        var totalRice = view.vo.getTotalRiceNum();
        var curMeter = 0;
        if (cur_jindu <= 1) {
            curMeter = nextData.needMeter;
            nextData = view.vo.getteamRewardDataById(2);
            nextRice = nextData.needMeter.toString();
        }
        else {
            curMeter = curData.needMeter;
        }
        if (cur_jindu <= 1) {
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
                var prevData_1 = view.vo.getteamRewardDataById(cur_jindu - 1);
                percent = (totalRice - curMeter) / (curMeter - prevData_1.needMeter);
            }
        }
        view._progressBar.setPercentage(percent);
        if (view._curJindu == view.vo.getCurJindu() && totalRice >= (nextData ? nextData.needMeter : curMeter)) {
            view._progressBar.resetIconPosition(575);
        }
        if (percent >= 1 && view._curJindu == view.vo.getArr('teamReward').length) {
            view._progressBar._dragIcon.visible = true;
        }
        // view._progressBar.setIconVisible(view._curJindu == view.vo.getCurJindu());
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
        view.setLayoutPosition(LayoutConst.leftverticalCenter, view._prevAwardRiceTxt, view._prevBtn, [view._prevBtn.width * 0.8 + 10, 0]);
        var curData = view.vo.getteamRewardDataById(cur_jindu);
        var nextData = view.vo.getteamRewardDataById(cur_jindu + 1);
        var curMeter = curData.needMeter;
        var nextMeter = 0; //n
        view._curAwardRiceTxt.text = LanguageManager.getlocal('DragonBoatDayRiceNumAward_' + this.code, [curMeter.toString()]);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._curAwardRiceTxt, view._awardbg, [0, -32]);
        if (this.getTypeCode() == "7") {
            view.setLayoutPosition(LayoutConst.horizontalCentertop, view._curAwardRiceTxt, view._awardbg, [0, -37]);
        }
        if (nextData) {
            view._nextAwardRiceTxt.visible = view._nextBtn.visible = true;
            nextMeter = nextData.needMeter;
        }
        else {
            view._nextAwardRiceTxt.visible = view._nextBtn.visible = false;
        }
        view._nextAwardRiceTxt.text = LanguageManager.getlocal('DragonBoatDayRiceNum_' + this.code, [nextMeter.toString()]);
        view.setLayoutPosition(LayoutConst.rightverticalCenter, view._nextAwardRiceTxt, view._nextBtn, [-20, 0]);
        view._scrollList.refreshData(view.vo.gerCurRiceAward(view._curJindu), view.getTypeCode());
        view._scrollList.width = (view.vo.gerCurRiceAward(view._curJindu)).length > 3 ? 486 : 363;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._scrollList, view._awardbg, [0, 3]);
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
        if (this.getTypeCode() == "2" || this.getTypeCode() == "5") {
            view._nextAwardRiceTxt.visible = false;
            view._prevAwardRiceTxt.visible = false;
        }
    };
    AcDragonBoatDayViewTab1.prototype.prevClick = function () {
        var view = this;
        view._curJindu = Math.max(0, view._curJindu - 1);
        view._newIndex = Math.max(0, view._newIndex - 1);
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
        view._newIndex = Math.min(view.vo.getArr('teamReward').length - 1 + 1, view._newIndex + 1);
        view._curJindu = Math.min(view.vo.getArr('teamReward').length + 1, view._curJindu + 1);
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
        if (this.getTypeCode() == "1") {
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
        if (this.getTypeCode() == "2" || this.getTypeCode() == "5") {
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
        if (view.getTypeCode() == "8") {
            view.makeLamp();
        }
    };
    AcDragonBoatDayViewTab1.prototype.makeLamp = function () {
        var view = this;
        var jindu = view.vo.getCurPeriod();
        var len = Object.keys(view.cfg.teamReward).length;
        var lampnum = Math.min(6, Math.ceil(jindu / 3) * 2);
        var obj = {
            1: 54,
            2: 99,
            3: 81,
            4: 91,
            5: 102,
            6: 101
        };
        var total = 0;
        for (var i = 1; i <= lampnum; ++i) {
            total += obj[i];
        }
        var tmpx = (612 - total - (lampnum - 1) * 15) / 2;
        for (var i = 1; i <= lampnum; ++i) {
            var lamp = view._boatGroup.getChildByName("lamp" + i);
            var clip = view._boatGroup.getChildByName("clip" + i);
            if (lamp) {
            }
            else {
                lamp = BaseBitmap.create("dragonboatlamp" + i);
                lamp.name = "lamp" + i;
                var startY = view._dbboatbg.y + (i & 1 ? 270 : 210);
                lamp.y = startY;
                view._boatGroup.addChild(lamp);
                var tmpY = startY + (i & 1 ? 5 : -5);
                egret.Tween.get(lamp, { loop: true }).to({ y: tmpY }, 800).to({ y: startY }, 800);
                clip = ComponentManager.getCustomMovieClip('acdragonboatviewlight', 12);
                clip.blendMode = egret.BlendMode.ADD;
                clip.width = 160;
                clip.height = 210;
                clip.name = "clip" + i;
                view._boatGroup.addChild(clip);
                clip.playWithTime(-1);
            }
            lamp.x = tmpx;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clip, lamp, [0, -30]);
            tmpx += (lamp.width + 15);
        }
    };
    AcDragonBoatDayViewTab1.prototype.dispose = function () {
        var view = this;
        if (this.getTypeCode() == "1") {
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
        this._steps = null;
        this._steps2 = null;
        this._teamClip = null;
        this._ribbonaClip = null;
        this._ribbonbClip = null;
        this._terminusbg = null;
        this._newIndex = 0;
        view._curJindu = 1;
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);
        _super.prototype.dispose.call(this);
    };
    return AcDragonBoatDayViewTab1;
}(AcCommonViewTab));
__reflect(AcDragonBoatDayViewTab1.prototype, "AcDragonBoatDayViewTab1");
//# sourceMappingURL=AcDragonBoatDayViewTab1.js.map