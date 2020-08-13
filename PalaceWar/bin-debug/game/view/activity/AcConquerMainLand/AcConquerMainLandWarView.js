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
 * author:qianjun
 * desc:定军中原城市抢夺
*/
var AcConquerMainLandWarView = (function (_super) {
    __extends(AcConquerMainLandWarView, _super);
    function AcConquerMainLandWarView() {
        var _this = _super.call(this) || this;
        _this._timeCDTxt = null;
        _this._curPeriod = 1;
        _this._bottomBg = null;
        _this.touchBoo = true;
        _this.moreBg = null;
        _this.describeTxt = null;
        _this.moveContainer = null;
        _this._moreArrow = null;
        _this._isShowMore = false;
        _this._bottomLogTxt = null;
        _this._touchBg = null;
        _this._currMaskBmp = null;
        _this.isData = false;
        _this.listconditions = null;
        _this._stopTouch = false;
        _this._nodeContainer = null;
        _this._topProgressGroup = null;
        _this._perScoreBg = null;
        _this._perScoreTxt = null;
        _this._nowDay = 0;
        _this._progressView = null;
        _this._collectBtn = null;
        _this._fightPeriod = 1;
        _this._myArmyBtn = null;
        _this._rankindex = 0;
        _this.cityPos = {
            1: { 1: { x: 153, y: 252, scale: 0.8, } },
            2: { 1: { x: 75, y: 457, scale: 0.8, }, 2: { x: 355, y: 460, scale: 0.8, } },
            3: { 1: { x: 8, y: 649, scale: 0.8, }, 2: { x: 214, y: 649, scale: 0.8, }, 3: { x: 413, y: 637, scale: 0.8, } },
        };
        _this.pos = {
            1: { x: 265, width: 0 },
            2: { x: 160, width: 100 },
            3: { x: 45, width: 110 },
            4: { x: 10, width: 20, scale: 0.8, height: 20 },
            5: { x: 20, width: 20, y: 630, scale: 1, height: 40 },
            6: { x: 40, width: 40, y: 745, scale: 1, height: 20 },
            7: { x: 40, width: 70, y: 855, scale: 1 },
        };
        _this.effscale = {
            1: {
                smoke: {
                    1: { 1: 1.45 },
                    2: { 1: 1, 2: 1 },
                    3: { 1: 1, 2: 1, 3: 1 }
                }
            },
            2: {
                smoke: {
                    1: { 1: 1.2 },
                    2: { 1: 0.8, 2: 0.8 },
                    3: { 1: 0.8, 2: 0.8, 3: 0.8 }
                },
                fire: {
                    1: { 1: 1.52 },
                    2: { 1: 0.8, 2: 0.8 },
                    3: { 1: 0.8, 2: 0.8, 3: 0.78 }
                }
            }
        };
        return _this;
    }
    AcConquerMainLandWarView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    Object.defineProperty(AcConquerMainLandWarView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandWarView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandWarView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandWarView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandWarView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandWarView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "mainlangwar" + code, "dragonboatprogress_bg", "dragonboatprogress", "specialview_commoni_namebg",
            "mlwarbg-" + code, "mlwarloopbg-" + code, "arena_arrow", "servant_mask", "arena_more", "arena_bottom",
            "progress15_bg", "progress15", "mlcity1-1_1", "mlcity2-1_1", "mlcity2-2_1", "mlcity3-1_1", "mlcity3-2_1", "mlcity3-3_1", "arena_bottom_bg",
            "mainlandprogressfire" + code + "-", "dinner_detail", "mlcity4_1", "mlcity5_1", "mlcity7_1", "mlcity6_1",
            "mainlandfire" + code + "-", "mainlandsmoke" + code + "-", "battlegroundsmoke3_"
        ]);
    };
    AcConquerMainLandWarView.prototype.getTitleStr = function () {
        return "acConquerMainLand-" + this.getUiCode() + "_Title";
    };
    AcConquerMainLandWarView.prototype.getRequestData = function () {
        return {
            requestType: NetRequestConst.REQUEST_MAINLAND_GETMAPINFO,
            requestData: {
                activeId: this.acTivityId
            }
        };
    };
    AcConquerMainLandWarView.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.data.mapinfo && data.data.data.mainLand6buildingNum) {
                this.vo.setMapInfo(data.data.data.mapinfo);
                this.vo.setMaxCity(data.data.data.mainLand6buildingNum);
                this.freshview();
            }
        }
    };
    //请求回调
    AcConquerMainLandWarView.prototype.getKilllog = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        if (evt.data.ret && data) {
            //分页
            var idx = data.idx;
            var maxLen = data.maxLen;
            if (data.list && data.list.length) {
                this._rankindex = idx;
                view.vo.setWarLog(data.list);
                view.refreshText();
                if (this._scrollList && this._isShowMore) {
                    var arr = view.vo.getWarLog();
                    if (arr.length * 110 < this._scrollList.height) {
                        var len = Math.ceil((this._scrollList.height - arr.length * 110) / 110) + 1;
                        for (var i = 1; i <= len; ++i) {
                            arr.push({
                                empty: true
                            });
                        }
                    }
                    this._scrollList.refreshData(arr, this.code);
                    this._scrollList.scrollTop = 0;
                    //this._scrollList.setContentHeight(10);
                }
            }
            else {
                if (this._scrollList && this._isShowMore) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundTip23-" + this.getUiCode()));
                }
            }
        }
    };
    AcConquerMainLandWarView.prototype.initView = function () {
        var view = this;
        var code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MAINLAND_ZG_FRESH, view.freshScoreTxt, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE, view.hide, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_RECORDLIST), view.getKilllog, view);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSSEARCH),view.searchCallback,view);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSKILLLOG),view.getKilllog,view);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETRANK),view.freshBottom,view);
        view._nodeContainer = new BaseDisplayObjectContainer();
        view._nodeContainer.width = GameConfig.stageWidth;
        view.addChild(this._nodeContainer);
        view._nowDay = view.vo.getNowDay();
        var topBg = BaseBitmap.create("forpeople_top");
        view.addChild(topBg);
        view._curPeriod = view.vo.getCurPeriod();
        var dateTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandActTime-" + code, [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        var str = '';
        if (view.vo.isInActivity()) {
            str = App.DateUtil.getFormatBySecond(view.vo.getCountDown());
        }
        else {
            str = "<font color=0x21eb39>" + LanguageManager.getlocal("acPunishEnd") + "</font>";
        }
        view.addChild(dateTxt);
        var cdTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandActCD-" + code, [String(view.vo.isInActivity() ? 0x21eb39 : 0xff3c3c), str]), 20);
        view.addChild(cdTxt);
        view._timeCDTxt = cdTxt;
        topBg.height = dateTxt.textHeight + cdTxt.textHeight + 10 + 30;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view.titleBg, [0, view.titleBg.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dateTxt, topBg, [13, 15]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cdTxt, dateTxt, [0, dateTxt.textHeight + 10]);
        var bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.height = 86;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);
        view._bottomBg = bottomBg;
        var bg = BaseBitmap.create("mlwarbg-" + code);
        bg.y = 0;
        view._nodeContainer.addChild(bg);
        //中部城市
        view._fightPeriod = view.vo.getFightPeriod();
        var cityMax = view.vo.getCityMax();
        this.makeCityItem();
        var bgcount = Math.ceil((this._nodeContainer.height - bg.height) / 395);
        for (var i = 0; i < bgcount; ++i) {
            var bg2 = BaseBitmap.create("mlwarloopbg-" + code);
            bg2.y = bg.height + i * 395 + bg.y;
            bg2.height = i == bgcount - 1 ? (415 - (bgcount * 395 - this._nodeContainer.height + bg.height)) : 395;
            view._nodeContainer.addChildAt(bg2, 1);
        }
        //烟雾状态(仅限于前三等级)
        view.freshCityStatus();
        //底部记录
        view.initBottom();
        var scrollH = bottomBg.y - topBg.y - topBg.height;
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, scrollH);
        var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
        scrollView.y = topBg.y + topBg.height;
        scrollView.bounces = false;
        view.addChild(scrollView);
        var rankBtn = ComponentManager.getButton("mainlandbtn3-" + code, "", function () {
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acBattlePassTimeEnd"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDDETAILRANKVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        view.addChild(rankBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rankBtn, topBg, [25, topBg.height + 65]);
        var btnStr = this.vo.checkIsJJL ? "mainlandbtn4-" + code : "mainlandbtn1-" + code;
        var collectBtn = ComponentManager.getButton(btnStr, "", function () {
            //募集援军
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acBattlePassTimeEnd"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDDETAILTASKVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        view.addChild(collectBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, collectBtn, view._bottomBg, [25, view._bottomBg.height + 10]);
        if (view.vo.getpublicRedhot3()) {
            App.CommonUtil.addIconToBDOC(collectBtn);
            var red = collectBtn.getChildByName("reddot");
            if (red) {
                red.setPosition(57, 0);
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(collectBtn);
        }
        view._collectBtn = collectBtn;
        var myArmyBtn = ComponentManager.getButton("mainlandbtn2-" + code, "", function () {
            //我的军团
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acBattlePassTimeEnd"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDDETAILARMYVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        view.addChild(myArmyBtn);
        view._myArmyBtn = myArmyBtn;
        if (view.vo.getpublicRedhot2() || view.vo.getpublicRedhot1()) {
            App.CommonUtil.addIconToBDOC(myArmyBtn);
            var red = myArmyBtn.getChildByName("reddot");
            if (red) {
                red.setPosition(57, 0);
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(myArmyBtn);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, myArmyBtn, view._bottomBg, [25, view._bottomBg.height + 10]);
        //顶部进度条
        view.createProgress();
        view.freshProgress();
        var perScoreBg = BaseBitmap.create("wifestatus_namebg");
        view.addChild(perScoreBg);
        view._perScoreBg = perScoreBg;
        var perScoreTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip10-" + code, [App.StringUtil.changeIntToText(view.vo.getMyScore(), 4), App.StringUtil.changeIntToText(view.vo.getMyScorePerMin(), 4)]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        perScoreBg.width = perScoreTxt.textWidth + 60;
        perScoreBg.height = perScoreTxt.textHeight + 30;
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, perScoreBg, view, [15, 250]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, perScoreTxt, perScoreBg);
        view.addChild(perScoreTxt);
        view._perScoreTxt = perScoreTxt;
        //通告信息
        NetManager.request(NetRequestConst.REQUEST_MAINLAND_RECORDLIST, {
            activeId: view.acTivityId,
            idx: 1
        });
        if (view.param.data.change) {
            ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDCITYINFOVIEW, {
                aid: view.aid,
                code: view.code,
                cityLevel: view.param.data.change.level,
                cityNum: view.param.data.change.num
            });
        }
        // let detailBtn = ComponentManager.getButton(`mldetailbtn-${code}`, ``, ()=>{
        // }, view);
        // view.addChild(detailBtn);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, detailBtn, rankbg, [20, rankbg.height + 10]);
    };
    AcConquerMainLandWarView.prototype.createProgress = function () {
        var view = this;
        if (view._topProgressGroup) {
            view._topProgressGroup.dispose();
            view._topProgressGroup = null;
        }
        var topProgressGroup = new BaseDisplayObjectContainer();
        view.addChild(topProgressGroup);
        topProgressGroup.height = 60;
        view._topProgressGroup = topProgressGroup;
        if (view._progressView) {
            view._progressView.dispose();
            view._progressView = null;
        }
        var code = view.getUiCode();
        if (view.vo.isInActivity()) {
            var dayinfo = view.cfg.timeAndBuff[view.vo.getNowDay() - 1];
            var posX = 5;
            var st = view.vo.st + 2 * 3600;
            var day = view.vo.getNowDay();
            var count = dayinfo.length;
            var now = 0;
            for (var k in dayinfo) {
                if (dayinfo[k].buff > 0) {
                    ++now;
                }
            }
            var width = (GameConfig.stageWidth - (now + 1) * 55) / now;
            var idx = 0;
            for (var i in dayinfo) {
                if (dayinfo[i].buff == 0) {
                    continue;
                }
                ++idx;
                var tmp = dayinfo[i];
                var startTime = st + Number(day - 1) * 86400 + tmp.startTime;
                var endTime = st + Number(day - 1) * 86400 + tmp.endTime;
                var isSpecial = tmp.buff >= dayinfo[count - 2].buff;
                var datePointBg = BaseBitmap.create(isSpecial ? "mainlandtimebg-" + code : "mainlandtimepointbg-" + code);
                datePointBg.name = "pointbg" + i;
                var datePointTxt = ComponentManager.getTextField("" + App.DateUtil.getFormatBySecond(startTime, 12), 18);
                datePointBg.width = datePointTxt.textWidth + 30;
                if (isSpecial) {
                    posX -= 10;
                }
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, datePointBg, topProgressGroup, [posX, 0], true);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, datePointTxt, datePointBg);
                datePointTxt.name = "pointTxt" + i;
                var progress = null;
                if (isSpecial) {
                    progress = ComponentManager.getProgressBar("progress15", "progress15_bg", width);
                }
                else {
                    progress = ComponentManager.getProgressBar("dragonboatprogress", "dragonboatprogress_bg", width);
                }
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, progress, datePointBg, [datePointBg.width - 10, 0]);
                topProgressGroup.addChild(progress);
                progress.name = "progress" + i;
                topProgressGroup.addChild(datePointBg);
                topProgressGroup.addChild(datePointTxt);
                if (idx == now) {
                    var datePointBg2 = BaseBitmap.create(isSpecial ? "mainlandtimebg-" + code : "mainlandtimepointbg-" + code);
                    topProgressGroup.addChild(datePointBg2);
                    datePointBg2.name = "pointbg2" + i;
                    var end = tmp.endTime == 86400 ? "24:00" : App.DateUtil.getFormatBySecond(endTime, 12);
                    var datePointTxt2 = ComponentManager.getTextField(end, 18);
                    datePointBg2.width = datePointTxt2.textWidth + 30;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, datePointBg2, progress, [progress.width - 10, 0]);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, datePointTxt2, datePointBg2);
                    topProgressGroup.addChild(datePointTxt2);
                    datePointTxt2.name = "pointTxt2" + i;
                }
                posX += (datePointBg.width + progress.width - 20);
                if (GameData.serverTime < endTime && GameData.serverTime >= startTime) {
                    var descBg = BaseBitmap.create("mlcitynumbg");
                    descBg.height = 30;
                    descBg.name = "descBg";
                    topProgressGroup.addChild(descBg);
                    var arrow = BaseBitmap.create("mlcitynumarrow");
                    arrow.name = "descArrow";
                    topProgressGroup.addChild(arrow);
                    var str = "acConquerMainLandTip9-" + code;
                    var param = [App.DateUtil.getFormatBySecond(startTime, 12), App.DateUtil.getFormatBySecond(endTime, 12), "" + tmp.buff];
                    if (isSpecial) {
                        str = "acConquerMainLandTip11-" + code;
                    }
                    else if (tmp.buff == 0) {
                        str = "acConquerMainLandTip12-" + code;
                        [App.DateUtil.getFormatBySecond(endTime, 12)];
                    }
                    var descTxt = ComponentManager.getTextField(LanguageManager.getlocal(str, param), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
                    topProgressGroup.addChild(descTxt);
                    descTxt.name = "descTxt";
                    descBg.width = descTxt.textWidth + 40;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, arrow, progress, [0, progress.height + (isSpecial ? -5 : 5)]);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, arrow, [0, arrow.height]);
                    if (descBg.x < 0) {
                        descBg.x = 0;
                    }
                    if (descBg.x > (GameConfig.stageWidth - descBg.width)) {
                        descBg.x = GameConfig.stageWidth - descBg.width;
                    }
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg, [0, 3]);
                }
            }
            var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, topProgressGroup.height);
            var scrollView = ComponentManager.getScrollView(topProgressGroup, rect);
            topProgressGroup.x = topProgressGroup.y = 0;
            scrollView.x = 0;
            scrollView.y = 185;
            scrollView.bounces = false;
            scrollView.verticalScrollPolicy = 'off';
            view.addChild(scrollView);
            view._progressView = scrollView;
        }
        else {
            var tiptxt = ComponentManager.getTextField("<font color=0xff3c3c>" + LanguageManager.getlocal("acPunishEnd") + "</font>", 24);
            view.addChild(tiptxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tiptxt, view, [0, 185]);
        }
        view.refreshText();
    };
    AcConquerMainLandWarView.prototype.freshProgress = function () {
        var view = this;
        var code = view.getUiCode();
        var day = view.vo.getNowDay();
        if (view.vo.isInActivity()) {
            var dayinfo = view.cfg.timeAndBuff[day - 1];
            var count = dayinfo.length;
            var now = 0;
            for (var k in dayinfo) {
                if (dayinfo[k].buff > 0) {
                    ++now;
                }
            }
            var width = (GameConfig.stageWidth - (now + 1) * 55) / now;
            var idx = 0;
            for (var i in dayinfo) {
                var tmp = dayinfo[i];
                if (tmp.buff == 0) {
                    continue;
                }
                ++idx;
                var st = view.vo.st + 2 * 3600;
                var startTime = st + Number(day - 1) * 86400 + tmp.startTime;
                var endTime = st + Number(day - 1) * 86400 + tmp.endTime;
                var progress = view._topProgressGroup.getChildByName("progress" + i);
                var percent = 0;
                var isSpecial = tmp.buff >= dayinfo[count - 2].buff;
                if (progress) {
                    if (isSpecial) {
                        progress.changeRes("mainlandprogressfire" + code + "-", "progress15_bg", true, 10, 70, width, 20);
                    }
                    else {
                        progress.changeRes("dragonboatprogress", "dragonboatprogress_bg");
                    }
                }
                if (tmp.buff > 0) {
                    var datePointBg = view._topProgressGroup.getChildByName("pointbg" + i);
                    if (datePointBg) {
                        datePointBg.setRes(isSpecial ? "mainlandtimebg-" + code : "mainlandtimepointbg-" + code);
                    }
                    var datePointTxt = view._topProgressGroup.getChildByName("pointTxt" + i);
                    if (datePointTxt) {
                        datePointTxt.text = App.DateUtil.getFormatBySecond(startTime, 12);
                    }
                    if (now == idx) {
                        var datePointBg2 = view._topProgressGroup.getChildByName("pointbg2" + i);
                        if (datePointBg2) {
                            datePointBg2.setRes(isSpecial ? "mainlandtimebg-" + code : "mainlandtimepointbg-" + code);
                        }
                        var datePointTxt2 = view._topProgressGroup.getChildByName("pointTxt2" + i);
                        if (datePointTxt2) {
                            datePointTxt2.text = App.DateUtil.getFormatBySecond(endTime, 12);
                        }
                    }
                    if (GameData.serverTime >= endTime) {
                        percent = 1;
                    }
                    else if (GameData.serverTime < startTime) {
                        percent = 0;
                    }
                    else {
                        percent = (GameData.serverTime - startTime) / (endTime - startTime);
                        var descBg = view._topProgressGroup.getChildByName("descBg");
                        var descTxt = view._topProgressGroup.getChildByName("descTxt");
                        var arrow = view._topProgressGroup.getChildByName("descArrow");
                        if (descBg && descTxt) {
                            var str = "acConquerMainLandTip9-" + code;
                            var param = [App.DateUtil.getFormatBySecond(startTime, 12), App.DateUtil.getFormatBySecond(endTime, 12), "" + tmp.buff];
                            if (isSpecial) {
                                str = "acConquerMainLandTip11-" + code;
                            }
                            else if (tmp.buff == 0) {
                                str = "acConquerMainLandTip12-" + code;
                                [App.DateUtil.getFormatBySecond(endTime, 12)];
                            }
                            descTxt.text = LanguageManager.getlocal(str, param);
                            descBg.width = descTxt.textWidth + 40;
                            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, arrow, progress, [0, progress.height + (isSpecial ? -5 : 5)]);
                            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, arrow, [0, arrow.height]);
                            if (descBg.x < 0) {
                                descBg.x = 0;
                            }
                            if (descBg.x > (GameConfig.stageWidth - descBg.width)) {
                                descBg.x = GameConfig.stageWidth - descBg.width;
                            }
                            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg, [0, 3]);
                        }
                    }
                }
                else {
                    if (GameData.serverTime >= endTime) {
                        percent = 1;
                    }
                    else if (GameData.serverTime < startTime) {
                        percent = 0;
                    }
                    else {
                        percent = (GameData.serverTime - startTime) / (endTime - startTime);
                    }
                }
                if (progress) {
                    progress.setPercentage(percent);
                }
            }
        }
    };
    AcConquerMainLandWarView.prototype.makeCityItem = function () {
        var view = this;
        var code = view.getUiCode();
        var max = view.vo.getCityMax();
        //常规化
        var baseY = 0;
        var _loop_1 = function (i) {
            var unit = view.cfg.mainLand[i];
            var level = Number(i) + 1;
            var pos = view.pos[level];
            if (level < 7) {
                //补充城市
                baseY += 15;
                if (level == 6) {
                    var _loop_2 = function (j) {
                        var city = BaseBitmap.create("mlcity6_" + code);
                        city.setScale(0.8);
                        city.x = pos.x + ((j - 1) % 4) * (pos.width + city.width * city.scaleX);
                        city.y = baseY + (Math.ceil(j / 4) - 1) * (city.height + pos.height);
                        // if(j == unit.buildingNum){
                        //     baseY = city.y + city.height + pos.height;
                        // }
                        city.addTouchTap(function () {
                            if (!view.vo.isCanJoin()) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + view.getUiCode()));
                                return;
                            }
                            if (!view.vo.isInActivity()) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("acBattlePassTimeEnd"));
                                return;
                            }
                            ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDCITYINFOVIEW, {
                                aid: view.aid,
                                code: view.code,
                                cityLevel: level,
                                cityNum: j
                            });
                        }, view);
                        city.name = "mlcity" + level + "-" + j;
                        view._nodeContainer.addChild(city);
                        var cityNameBg = BaseBitmap.create("mainlandcitynamebg-" + code);
                        cityNameBg.addTouchTap(function () {
                            if (!view.vo.isCanJoin()) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + view.getUiCode()));
                                return;
                            }
                            if (!view.vo.isInActivity()) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("acBattlePassTimeEnd"));
                                return;
                            }
                            ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDCITYINFOVIEW, {
                                aid: view.aid,
                                code: view.code,
                                cityLevel: level,
                                cityNum: j
                            });
                        }, view);
                        cityNameBg.setScale(0.8);
                        view._nodeContainer.addChild(cityNameBg);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, cityNameBg, city, [0, 0]);
                        var citynameTxt = ComponentManager.getTextField(view.vo.getCityName(level + "_" + j), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
                        citynameTxt.setScale(0.8);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, citynameTxt, cityNameBg);
                        view._nodeContainer.addChild(citynameTxt);
                        var citynumbg = BaseBitmap.create("public_itemtipbg2");
                        citynumbg.width = cityNameBg.width;
                        citynumbg.setScale(0.8);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, citynumbg, cityNameBg, [0, cityNameBg.height * cityNameBg.scaleY + 3]);
                        view._nodeContainer.addChild(citynumbg);
                        citynumbg.name = "citynumbg" + level + "_" + j;
                        var cityNumTxt = ComponentManager.getTextField(view.vo.getCityObserveNum(level, j) + "/" + unit.segmentation, 20);
                        cityNumTxt.setScale(0.8);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cityNumTxt, citynumbg);
                        view._nodeContainer.addChild(cityNumTxt);
                        cityNumTxt.name = "cityNumTxt" + level + "_" + j;
                        if (j == max) {
                            baseY = citynumbg.y + citynumbg.height * citynumbg.scaleY + 30;
                        }
                    };
                    for (var j = 1; j <= max; ++j) {
                        _loop_2(j);
                    }
                }
                else {
                    var _loop_3 = function (j) {
                        var cityRes = "acmainlandcity" + level + "_" + j + "-" + code;
                        var cityNameBg = BaseBitmap.create("mainlandcitynamebg-" + code);
                        cityNameBg.addTouchTap(function () {
                            if (!view.vo.isCanJoin()) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + view.getUiCode()));
                                return;
                            }
                            if (!view.vo.isInActivity()) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("acBattlePassTimeEnd"));
                                return;
                            }
                            ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDCITYINFOVIEW, {
                                aid: view.aid,
                                code: view.code,
                                cityLevel: level,
                                cityNum: j
                            });
                        }, view);
                        cityNameBg.setScale(level < 4 ? 1 : 0.8);
                        var city = BaseBitmap.create(level < 4 ? "mlcity" + level + "-" + j + "_" + code : "mlcity" + level + "_" + code);
                        city.addTouchTap(function () {
                            if (!view.vo.isCanJoin()) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + view.getUiCode()));
                                return;
                            }
                            if (!view.vo.isInActivity()) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("acBattlePassTimeEnd"));
                                return;
                            }
                            ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDCITYINFOVIEW, {
                                aid: view.aid,
                                code: view.code,
                                cityLevel: level,
                                cityNum: j
                            });
                        }, view);
                        city.name = "mlcity" + level + "-" + j;
                        view._nodeContainer.addChild(city);
                        if (level < 4) {
                            city.setScale(view.cityPos[level][j].scale);
                            city.x = view.cityPos[level][j].x;
                            city.y = view.cityPos[level][j].y - 170;
                            baseY = city.y + city.height + 75;
                        }
                        else {
                            city.setScale(pos.scale);
                            city.x = pos.x + ((j - 1) % 4) * (pos.width + city.width * city.scaleX);
                            city.y = baseY + (Math.ceil(j / 4) - 1) * (city.height + pos.height);
                            if (j == unit.buildingNum) {
                                baseY = city.y + city.height * city.scaleY + pos.height;
                            }
                        }
                        // cityNameBg.setScale(level < 4 ? 1 : 0.8);
                        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cityNameBg, view._nodeContainer, [pos.x + ((j - 1) % 4) * (pos.width + cityNameBg.width * cityNameBg.scaleX), baseY + (Math.ceil(j / 4) - 1) * 130], true);
                        var obj = null;
                        if (level < 4) {
                            obj = BaseBitmap.create(cityRes);
                        }
                        else {
                            obj = ComponentManager.getTextField(view.vo.getCityName(level + "_" + j), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
                        }
                        obj.setScale(level < 4 ? 1 : 0.8);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, cityNameBg, city, [level < 4 ? 10 : 0, 0]);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, obj, cityNameBg);
                        view._nodeContainer.addChild(cityNameBg);
                        view._nodeContainer.addChild(obj);
                        var citynumbg = BaseBitmap.create("public_itemtipbg2");
                        citynumbg.width = cityNameBg.width;
                        citynumbg.setScale(level < 4 ? 1 : 0.8);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, citynumbg, cityNameBg, [0, cityNameBg.height * cityNameBg.scaleY + 3]);
                        view._nodeContainer.addChild(citynumbg);
                        citynumbg.name = "citynumbg" + level + "_" + j;
                        var cityNumTxt = ComponentManager.getTextField(view.vo.getCityObserveNum(level, j) + "/" + unit.segmentation, 20);
                        cityNumTxt.setScale(level < 4 ? 1 : 0.8);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cityNumTxt, citynumbg);
                        view._nodeContainer.addChild(cityNumTxt);
                        cityNumTxt.name = "cityNumTxt" + level + "_" + j;
                    };
                    for (var j = 1; j <= unit.buildingNum; ++j) {
                        _loop_3(j);
                    }
                }
            }
            else {
                var _loop_4 = function (j) {
                    var city = BaseBitmap.create("mlcity7_" + code);
                    city.setScale(0.8);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, city, view._nodeContainer, [0, baseY], true);
                    city.addTouchTap(function () {
                        if (!view.vo.isCanJoin()) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + view.getUiCode()));
                            return;
                        }
                        if (!view.vo.isInActivity()) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("acBattlePassTimeEnd"));
                            return;
                        }
                        ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDCITYINFOVIEW, {
                            aid: view.aid,
                            code: view.code,
                            cityLevel: level,
                            cityNum: j
                        });
                    }, view);
                    city.name = "mlcity" + level + "-" + j;
                    view._nodeContainer.addChild(city);
                    var cityNameBg = BaseBitmap.create("mainlandcitynamebg-" + code);
                    cityNameBg.setScale(0.8);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, cityNameBg, city);
                    view._nodeContainer.addChild(cityNameBg);
                    cityNameBg.addTouchTap(function () {
                        if (!view.vo.isCanJoin()) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + view.getUiCode()));
                            return;
                        }
                        if (!view.vo.isInActivity()) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("acBattlePassTimeEnd"));
                            return;
                        }
                        ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDCITYINFOVIEW, {
                            aid: view.aid,
                            code: view.code,
                            cityLevel: level,
                            cityNum: 1
                        });
                    }, view);
                    var obj = ComponentManager.getTextField(view.vo.getCityName(level + "_" + j), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
                    obj.setScale(0.8);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, obj, cityNameBg);
                    view._nodeContainer.addChild(obj);
                    // let citynumbg = BaseBitmap.create(`public_itemtipbg2`);
                    // citynumbg.width = cityNameBg.width;
                    // citynumbg.setScale(0.8);
                    // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, citynumbg, cityNameBg, [0, cityNameBg.height + 3]);
                    // view._nodeContainer.addChild(citynumbg);
                    // citynumbg.name = `citynumbg${level}_${i}`;
                    // let cityNumTxt = ComponentManager.getTextField(`${view.vo.getCityObserveNum(level, j)}/${3}`, 20);
                    // cityNumTxt.setScale(0.8);
                    // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cityNumTxt, citynumbg);
                    // view._nodeContainer.addChild(cityNumTxt);
                    // citynumbg.name = `cityNumTxt${level}_${j}`;
                };
                for (var j = 1; j <= unit.buildingNum; ++j) {
                    _loop_4(j);
                }
            }
        };
        for (var i in view.cfg.mainLand) {
            _loop_1(i);
        }
    };
    //刷新城市状态
    AcConquerMainLandWarView.prototype.freshCityStatus = function () {
        var view = this;
        var code = view.getUiCode();
        for (var i = 1; i <= 3; ++i) {
            var unit = view.cfg.mainLand[i - 1];
            for (var j = 1; j <= unit.buildingNum; ++j) {
                var city = view._nodeContainer.getChildByName("mlcity" + i + "-" + j);
                if (city) {
                    var period = view.vo.getFightPeriod();
                    var smoke1 = view._nodeContainer.getChildByName("mainlandsmoke_" + 1 + "_" + i + "-" + j);
                    var smoke2 = view._nodeContainer.getChildByName("mainlandsmoke_" + 2 + "_" + i + "-" + j);
                    var fire2 = view._nodeContainer.getChildByName("mainlandfire1" + 2 + i + "-" + j);
                    //1正常交战 2激战
                    if (period == 2) {
                        if (smoke1) {
                            smoke1.dispose();
                            smoke1 = null;
                        }
                        if (!smoke2) {
                            var smoke = ComponentManager.getCustomMovieClip("battlegroundsmoke3_", 10, 30);
                            smoke.name = "mainlandsmoke_" + 2 + "_" + i + "-" + j;
                            smoke.width = 190;
                            smoke.height = 168;
                            smoke.anchorOffsetX = smoke.width / 2;
                            smoke.anchorOffsetY = smoke.height / 2;
                            smoke.setScale(view.effscale[2].smoke[i][j]);
                            smoke.playWithTime(-1);
                            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, smoke, city, [i == 1 ? 30 : -15, i == 1 ? -40 : -50]);
                            view._nodeContainer.addChild(smoke);
                        }
                        if (!fire2) {
                            for (var k = 1; k < 5; ++k) {
                                var fire = ComponentManager.getCustomMovieClip("mainlandfire" + code + "-", 15, 50);
                                fire.name = "mainlandfire" + k + 2 + i + "-" + j;
                                fire.width = 144;
                                fire.height = 101;
                                fire.anchorOffsetX = fire.width / 2;
                                fire.anchorOffsetY = fire.height / 2;
                                fire.setScale(view.effscale[2].fire[i][j] * 0.8);
                                fire.playWithTime(-1);
                                switch (k) {
                                    case 1:
                                        fire.x = city.x + city.width * city.scaleX / 2 + fire.anchorOffsetX + (i == 1 ? 20 : -20);
                                        fire.y = city.y + (i == 1 ? 100 : 90);
                                        break;
                                    case 2:
                                        fire.scaleX *= -1;
                                        fire.x = city.x + fire.anchorOffsetX + (i == 1 ? 20 : -20);
                                        fire.y = city.y + (i == 1 ? 100 : 90);
                                        break;
                                    case 3:
                                        fire.scaleY *= -1;
                                        fire.x = city.x + city.width * city.scaleX / 2 + fire.anchorOffsetX;
                                        fire.y = city.y + fire.anchorOffsetY - 5;
                                        break;
                                    case 4:
                                        fire.scaleX *= -1;
                                        fire.scaleY *= -1;
                                        fire.x = city.x + fire.anchorOffsetX + (i == 1 ? 20 : -20);
                                        fire.y = city.y + fire.anchorOffsetY - 5;
                                        break;
                                }
                                if (k < 3) {
                                    view._nodeContainer.addChild(fire);
                                }
                                else {
                                    view._nodeContainer.addChildAt(fire, view._nodeContainer.getChildIndex(city) - 1);
                                }
                            }
                        }
                    }
                    else {
                        //清除旧资源
                        if (smoke2) {
                            smoke2.dispose();
                            smoke2 = null;
                        }
                        if (fire2) {
                            for (var k = 1; k < 5; ++k) {
                                var eff = view._nodeContainer.getChildByName("mainlandfire" + k + 2 + i + "-" + j);
                                if (eff) {
                                    eff.dispose();
                                    eff = null;
                                }
                            }
                        }
                        //添加新资源
                        var smoke1_1 = view._nodeContainer.getChildByName("mainlandsmoke_" + 1 + "_" + i + "-" + j);
                        if (!smoke1_1) {
                            var smoke1_2 = ComponentManager.getCustomMovieClip("mainlandsmoke" + code + "-", 10, 30);
                            smoke1_2.name = "mainlandsmoke_" + 1 + "_" + i + "-" + j;
                            smoke1_2.width = 131;
                            smoke1_2.height = 116;
                            smoke1_2.playWithTime(-1);
                            smoke1_2.anchorOffsetX = smoke1_2.width / 2;
                            smoke1_2.anchorOffsetY = smoke1_2.height / 2;
                            smoke1_2.setScale(view.effscale[1].smoke[i][j]);
                            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, smoke1_2, city, [i == 1 ? 50 : 5, -40]);
                            view._nodeContainer.addChild(smoke1_2);
                        }
                    }
                }
            }
        }
    };
    //底部
    AcConquerMainLandWarView.prototype.initBottom = function () {
        var view = this;
        var bottom = view._bottomBg;
        var maskDown = BaseBitmap.create("servant_mask");
        maskDown.width = GameConfig.stageWidth;
        maskDown.y = GameConfig.stageHeigth - bottom.height - maskDown.height;
        this.addChild(maskDown);
        this.swapChildren(maskDown, this.container);
        var showMore = ComponentManager.getButton("arena_more", "", this.showMoreHandle, this);
        showMore.setPosition(GameConfig.stageWidth - showMore.width - 18, GameConfig.stageHeigth - bottom.height / 2 - showMore.height / 2);
        this.addChild(showMore);
        this._moreArrow = BaseBitmap.create("arena_arrow");
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, this._moreArrow, showMore, [-this._moreArrow.width - 5, 0]);
        this.addChild(this._moreArrow);
        //文本
        var tipTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.lineSpacing = 3;
        tipTxt.width = 480;
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tipTxt, bottom);
        view._bottomLogTxt = tipTxt;
    };
    AcConquerMainLandWarView.prototype.refreshText = function () {
        var view = this;
        var code = view.getUiCode();
        //获取最新一条记录
        var logInfo = view.vo.getLastChargeLog();
        var str = "";
        if (logInfo) {
            var winname = "" + logInfo.winName + LanguageManager.getlocal("atkraceyamenid", [logInfo.winId]);
            var cityname = view.vo.getCityName(logInfo.citylevel + "_" + logInfo.cityNum + "_" + logInfo.cityIdx);
            //撤军
            if (logInfo.callback) {
                str = LanguageManager.getlocal("acConquerMainLandLog5_1-" + code, [winname, cityname]);
            }
            else {
                /**1
                * 通报标头→玩家ID 成功夺取 地标名
                * 进攻胜利通报：玩家ID 已成功夺取 地标名
                * 防御胜利通报：玩家ID 成功防御 地标名
                * */
                var str1 = LanguageManager.getlocal("acConquerMainLandLog1_" + logInfo.title.type + "-" + code, [winname, cityname]);
                /**2
                * （通报内容）→玩家ID 出动大军，来势汹汹，击败了 玩家ID2，成功夺取了 地标名！
                * */
                var str2 = "";
                if (logInfo.report.type == 5) {
                    str2 = LanguageManager.getlocal("acConquerMainLandLog2_" + logInfo.report.type + "_" + logInfo.report.rid + "-" + code, [winname, logInfo.loseName, cityname]);
                }
                else {
                    str2 = LanguageManager.getlocal("acConquerMainLandLog2_" + logInfo.report.type + "-" + code, [winname, logInfo.loseName, cityname]);
                }
                /**3
                * （接②，连胜通报）→并取得x连胜！
                * */
                var str3 = "";
                if (logInfo.win.type) {
                    str3 = LanguageManager.getlocal("acConquerMainLandLog3_" + logInfo.win.type + "-" + code, [logInfo.win.type == 1 ? logInfo.win.num : logInfo.loseName, logInfo.win.num]);
                }
                str = str1; // + `\n` + str2 + str3;
            }
            /**4
            * 时间戳
            * */
            var str4 = App.DateUtil.getFormatBySecond(logInfo.time, 9);
        }
        view._bottomLogTxt.text = str;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._bottomLogTxt, view._bottomBg, [25, 0]);
    };
    AcConquerMainLandWarView.prototype.showMoreHandle = function () {
        if (this._stopTouch) {
            return;
        }
        if (this.touchBoo) {
            // if(!this.vo.isInActivity()){
            //     App.CommonUtil.showTip(LanguageManager.getlocal(`date_error`));
            //     return;
            // }
            this._isShowMore = !this._isShowMore;
            this._bottomLogTxt.visible = !this._isShowMore;
            if (this._isShowMore == true) {
                this._moreArrow.scaleY = -1;
                this._moreArrow.y += this._moreArrow.height;
                this.showList();
                // NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST,{activeId:this.acTivityId});
            }
            else {
                this._moreArrow.scaleY = 1;
                this._moreArrow.y -= this._moreArrow.height;
                this.closeList();
            }
        }
    };
    AcConquerMainLandWarView.prototype.closeList = function () {
        this.touchBoo = false;
        if (this.listconditions) {
            this.listconditions.visible = false;
        }
        if (this.describeTxt) {
            this.describeTxt.visible = true;
        }
        if (this.moveContainer) {
            egret.Tween.get(this.moveContainer).to({ y: 1150 }, 500).call(function () {
                this.touchBoo = true;
                egret.Tween.removeTweens(this.moveContainer);
                this.moveContainer.dispose();
                this.moveContainer = null;
                if (this._scrollList) {
                    this._scrollList = null;
                }
            }, this);
        }
        if (this._currMaskBmp && this._currMaskBmp.parent) {
            this._currMaskBmp.parent.removeChild(this._currMaskBmp);
            this._currMaskBmp.dispose();
            this._currMaskBmp = null;
        }
        if (this._touchBg && this._touchBg.parent) {
            this._touchBg.parent.removeChild(this._touchBg);
            this._touchBg.dispose();
            this._touchBg = null;
        }
        if (this._bottomLogTxt) {
            this._bottomLogTxt.visible = true;
        }
    };
    AcConquerMainLandWarView.prototype.showList = function () {
        var _this = this;
        this.moveContainer = new BaseDisplayObjectContainer();
        this.addChild(this.moveContainer);
        this.moreBg = BaseBitmap.create("arena_bottom_bg"); //arena_bottom_bg
        this.moreBg.width = 640;
        this.moreBg.height = GameConfig.stageHeigth - 230;
        this.moreBg.touchEnabled = true;
        this.moveContainer.addChild(this.moreBg);
        this._currMaskBmp = BaseBitmap.create("public_9_viewmask");
        this._currMaskBmp.width = GameConfig.stageWidth;
        this._currMaskBmp.height = GameConfig.stageHeigth;
        this._currMaskBmp.touchEnabled = true;
        this.addChild(this._currMaskBmp);
        this.setChildIndex(this._currMaskBmp, this.getChildIndex(this._bottomBg));
        // 增加 点击区域
        this._touchBg = BaseBitmap.create("public_9_bg25");
        this._touchBg.width = 640;
        this._touchBg.height = 260;
        this._touchBg.x = 0;
        this._touchBg.y = -240;
        this._touchBg.alpha = 0;
        this._touchBg.addTouchTap(this.showMoreHandle, this);
        this.moveContainer.addChild(this._touchBg);
        if (1) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 5, 620, this.moreBg.height - 20);
            var arr = this.vo.getWarLog();
            this._scrollList = ComponentManager.getScrollList(AcConquerMainLandLogItem, arr, rect, this.code);
            this.moveContainer.addChild(this._scrollList);
            this._scrollList.bounces = true;
            var num_1 = 20;
            this._scrollList.bindMoveCompleteCallback(function () {
                var view = _this;
                var index = _this._rankindex;
                if (!_this._scrollList.checkShowArrow()) {
                    index += num_1;
                }
                else if (_this._scrollList.scrollTop == 0) {
                    index = Math.max(0, index - num_1);
                }
                if (_this._rankindex != index) {
                    _this.request(NetRequestConst.REQUEST_MAINLAND_RECORDLIST, {
                        activeId: view.acTivityId,
                        idx: index
                    });
                }
            }, this);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._scrollList, this.moreBg, [0, 10]);
        }
        else {
            var atkracedes3 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes3"), 20);
            atkracedes3.x = 250;
            atkracedes3.y = 300;
            this.moveContainer.addChild(atkracedes3);
        }
        this.moveContainer.y = 1150;
        this.touchBoo = false;
        //描述文字：击败门客20
        var num = 20; //this.cfg.getbeatNum();
        var listconditions = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip35-" + this.getUiCode(), [num + ""]), 20);
        listconditions.x = 30;
        listconditions.y = GameConfig.stageHeigth - 50;
        this.addChild(listconditions);
        this.listconditions = listconditions;
        if (this.listconditions) {
            this.listconditions.visible = false;
        }
        if (this.describeTxt) {
            this.describeTxt.visible = false;
        }
        // this.runText();
        egret.Tween.get(this.moveContainer).to({ y: 150 }, 500).call(function () {
            egret.Tween.removeTweens(this.moveContainer);
            this.touchBoo = true;
            if (this.listconditions) {
                this.listconditions.visible = true;
            }
        }, this);
    };
    AcConquerMainLandWarView.prototype.infoClick = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSALLIANCEINFOVIEW, {
            aid: view.aid,
            code: view.code
        });
    };
    AcConquerMainLandWarView.prototype.freshScoreTxt = function () {
        if (this._perScoreTxt) {
            var code = this.getUiCode();
            this._perScoreTxt.text = LanguageManager.getlocal("acConquerMainLandTip10-" + code, [App.StringUtil.changeIntToText(this.vo.getMyScore(), 4), this.vo.getMyScorePerMin().toString()]);
        }
    };
    AcConquerMainLandWarView.prototype.freshview = function () {
        var view = this;
        var code = view.getUiCode();
        if (view._perScoreTxt) {
            //战功刷新
            this.freshScoreTxt();
            view._perScoreBg.width = view._perScoreTxt.textWidth + 60;
            view._perScoreBg.height = view._perScoreTxt.textHeight + 30;
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view._perScoreBg, view, [15, 250]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._perScoreTxt, view._perScoreBg);
            //城市数刷新
            for (var i in view.cfg.mainLand) {
                var level = Number(i) + 1;
                var unit = view.cfg.mainLand[i];
                if (unit.segmentation) {
                    if (level < 6) {
                        for (var j = 1; j <= unit.buildingNum; ++j) {
                            var citynumbg = view._nodeContainer.getChildByName("citynumbg" + level + "_" + j);
                            var cityNumTxt = view._nodeContainer.getChildByName("cityNumTxt" + level + "_" + j);
                            cityNumTxt.text = view.vo.getCityObserveNum(level, j) + "/" + unit.segmentation;
                            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cityNumTxt, citynumbg);
                        }
                    }
                    else if (level == 6) {
                        var max = view.vo.getCityMax();
                        for (var j = 1; j <= max; ++j) {
                            var citynumbg = view._nodeContainer.getChildByName("citynumbg" + level + "_" + j);
                            var cityNumTxt = view._nodeContainer.getChildByName("cityNumTxt" + level + "_" + j);
                            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cityNumTxt, citynumbg);
                        }
                    }
                }
            }
            //纪录刷新
            view.refreshText();
        }
    };
    AcConquerMainLandWarView.prototype.getRuleInfo = function () {
        return this.vo.getThisCn("AcConquerMainLandRule");
    };
    /**
     * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
     */
    AcConquerMainLandWarView.prototype.getReportTipData = function () {
        var view = this;
        var day = Math.ceil((GameData.serverTime - view.vo.st) / 86400);
        var key = "ConquerMainLand-" + view.getUiCode() + "report-" + Api.playerVoApi.getPlayerID() + "-" + view.vo.st + "-" + day;
        var storage = LocalStorageManager.get(key);
        if (!storage) {
            LocalStorageManager.set(key, "1");
            return { title: { key: "acConquerMainLandreporttitle-" + view.getUiCode() }, msg: { key: "acConquerMainLandreportmsg-" + view.getUiCode() } };
        }
        else {
            return null;
        }
    };
    AcConquerMainLandWarView.prototype.tick = function () {
        var view = this;
        var code = view.getUiCode();
        var str = '';
        if (view.vo.getpublicRedhot3()) {
            App.CommonUtil.addIconToBDOC(view._collectBtn);
            var red = view._collectBtn.getChildByName("reddot");
            if (red) {
                red.setPosition(57, 0);
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._collectBtn);
        }
        if (view.vo.getpublicRedhot2() || view.vo.getpublicRedhot1()) {
            App.CommonUtil.addIconToBDOC(view._myArmyBtn);
            var red = view._myArmyBtn.getChildByName("reddot");
            if (red) {
                red.setPosition(57, 0);
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._myArmyBtn);
        }
        if (view.vo.isInActivity()) {
            str = App.DateUtil.getFormatBySecond(view.vo.getCountDown());
        }
        else {
            str = "<font color=" + TextFieldConst.COLOR_WARN_GREEN + ">" + LanguageManager.getlocal("acPunishEnd") + "</font>";
        }
        view._timeCDTxt.text = LanguageManager.getlocal("acConquerMainLandActCD-" + code, [String(view.vo.isInActivity() ? 0x21eb39 : 0xff3c3c), str]);
        var period = view.vo.getCurPeriod();
        if (period != view._curPeriod) {
            view._curPeriod = period;
        }
        if (view.vo.getNowDay() != view._nowDay) {
            view.createProgress();
        }
        view._nowDay = view.vo.getNowDay();
        view.freshProgress();
        var fightperiod = view.vo.getFightPeriod();
        if (fightperiod != view._fightPeriod) {
            view.freshCityStatus();
        }
        view._fightPeriod = fightperiod;
    };
    AcConquerMainLandWarView.prototype.enterInHandler = function () {
        var view = this;
    };
    // protected getRequestData():{requestType:string,requestData:any}{	
    // 	let view = this;
    // 	return {requestType:NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM,requestData:{
    // 		activeId : view.vo.aidAndCode,
    // 	}};
    // }
    // protected receiveData(data:{ret:boolean,data:any}):void{
    // 	let view = this;
    // 	view.api.setBossNumInfo(data.data.data);
    // }
    AcConquerMainLandWarView.prototype.dispose = function () {
        var view = this;
        view._timeCDTxt = null;
        view._curPeriod = 1;
        view._bottomBg = null;
        view.touchBoo = true;
        view.moreBg = null;
        view.describeTxt = null;
        view.moveContainer = null;
        view._moreArrow = null;
        view._isShowMore = false;
        view._bottomLogTxt = null;
        view._touchBg = null;
        view._currMaskBmp = null;
        view.isData = false;
        view.listconditions = null;
        view._stopTouch = false;
        view._scrollList = null;
        if (view._nodeContainer) {
            view._nodeContainer.dispose();
        }
        view._nodeContainer = null;
        view._collectBtn = null;
        if (view._topProgressGroup) {
            view._topProgressGroup.dispose();
            view._topProgressGroup = null;
        }
        view._perScoreBg = null;
        view._perScoreTxt = null;
        view._nowDay = 0;
        if (view._progressView) {
            view._progressView.dispose();
            view._progressView = null;
        }
        view._fightPeriod = 1;
        view._myArmyBtn = null;
        view._rankindex = 0;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MAINLAND_ZG_FRESH, view.freshScoreTxt, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE, view.hide, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_RECORDLIST), view.getKilllog, view);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIPEBOSS_REFRESH,view.freshView,view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSSEARCH),view.searchCallback,view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSKILLLOG),view.getKilllog,view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETRANK),view.freshBottom,view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM),view.getBossNum,view);
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandWarView;
}(CommonView));
__reflect(AcConquerMainLandWarView.prototype, "AcConquerMainLandWarView");
//# sourceMappingURL=AcConquerMainLandWarView.js.map