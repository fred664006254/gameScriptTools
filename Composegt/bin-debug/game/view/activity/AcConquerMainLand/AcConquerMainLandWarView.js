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
        _this._stopTouch = false;
        _this._nodeContainer = null;
        _this._topProgressGroup = null;
        _this._perScoreBg = null;
        _this._perScoreTxt = null;
        _this._nowDay = 0;
        _this._collectBtn = null;
        _this._fightPeriod = 1;
        _this._myArmyBtn = null;
        _this._mycityList = [];
        _this.cityPos = {
            1: { 1: { x: 153, y: 270, scale: 0.8, } },
            2: { 1: { x: 75, y: 457, scale: 0.8, }, 2: { x: 355, y: 460, scale: 0.8, } },
            3: { 1: { x: 8, y: 649, scale: 0.8, }, 2: { x: 214, y: 649, scale: 0.8, }, 3: { x: 413, y: 637, scale: 0.8, } },
        };
        _this.pos = {
            1: { x: 265, width: 0 },
            2: { x: 160, width: 100 },
            3: { x: 45, width: 110 },
            4: { x: 10, width: 20, scale: 0.8, height: 50 },
            5: { x: 20, width: 20, y: 630, scale: 1, height: 50 },
            6: { x: 40, width: 40, y: 745, scale: 1, height: 40 },
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
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
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
            "mainlangwar" + code, "mlwarbg-" + code, "mlwarloopbg-" + code, "servant_mask",
            ,
            "mainlandprogressfire" + code + "-", "mainlandfire" + code + "-", "mainlandsmoke" + code + "-",
            "mainui_bottombtnbg", "punish_reward_icon", "punish_reward_name", "mainland_myarmy_btn_name",
            "mlcity1-1_" + code, "mlcity2-1_" + code, "mlcity2-2_" + code, "mlcity3-1_" + code, "mlcity3-2_" + code, "mlcity3-3_" + code,
            "mlcity4_" + code, "mlcity5_" + code, "mlcity6_" + code, "mlcity7_" + code,
            "commonview_border1", "commonview_border2", "commonview_bottom", "commonview_redtitle", "commonview_woodbg"
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
        if (data.data.data) {
            this.vo.setMapInfo(data.data.data.mapinfo);
            this.vo.setMaxCity(data.data.data.mainLand6buildingNum);
            this.freshview();
        }
    };
    //请求回调
    AcConquerMainLandWarView.prototype.getKilllog = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        if (data) {
            view.vo.setWarLog(data.list);
            view.refreshText();
        }
    };
    AcConquerMainLandWarView.prototype.initView = function () {
        var view = this;
        var code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE, view.hide, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_RECORDLIST), view.getKilllog, view);
        view._nodeContainer = new BaseDisplayObjectContainer();
        view._nodeContainer.width = GameConfig.stageWidth;
        view.addChild(this._nodeContainer);
        view._nowDay = view.vo.getNowDay();
        var topBg = BaseBitmap.create("public_9v_bg10");
        topBg.width = GameConfig.stageWidth;
        view.addChild(topBg);
        view._curPeriod = view.vo.getCurPeriod();
        var dateTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandActTime-" + code, [view.vo.acTimeAndHour]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(dateTxt);
        var cdTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandActCD-" + code, [view.vo.acCountDown]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(cdTxt);
        view._timeCDTxt = cdTxt;
        topBg.height = dateTxt.textHeight + cdTxt.textHeight + 10;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view.titleBg, [0, view.titleBg.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dateTxt, topBg, [13, 15]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, cdTxt, topBg, [13, 15]);
        var bottomBg = App.CommonUtil.getCommonBorderFrame(188);
        //bottomBg.height = 86;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);
        view._bottomBg = bottomBg;
        var perScoreBg = BaseBitmap.create("commonview_redtitle");
        perScoreBg.setPosition(bottomBg.x + bottomBg.width / 2 - perScoreBg.width / 2, bottomBg.y + 10);
        view.addChild(perScoreBg);
        view._perScoreBg = perScoreBg;
        var perScoreTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandTip10-" + code, [App.StringUtil.changeIntToText(view.vo.getMyScore()), App.StringUtil.changeIntToText(view.vo.getMyScorePerMin())]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, perScoreTxt, perScoreBg);
        view.addChild(perScoreTxt);
        view._perScoreTxt = perScoreTxt;
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
        var scrollH = bottomBg.y - topBg.y - topBg.height + 6;
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, scrollH);
        var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
        scrollView.y = topBg.y + topBg.height;
        scrollView.bounces = false;
        view.addChild(scrollView);
        var RankBg = BaseBitmap.create("mainui_bottombtnbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, RankBg, view._bottomBg, [25, view._bottomBg.height + 20]);
        this.addChild(RankBg);
        var RankIcon = ComponentManager.getButton("punish_reward_icon", "", function () {
            ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDDETAILRANKVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, this);
        RankIcon.x = RankBg.x + RankBg.width / 2 - RankIcon.width / 2;
        RankIcon.y = RankBg.y + RankBg.height / 2 - RankIcon.height / 2;
        this.addChild(RankIcon);
        var RankStr = BaseBitmap.create("punish_reward_name");
        RankStr.x = RankBg.x + RankBg.width / 2 - RankStr.width / 2;
        RankStr.y = RankBg.y + RankBg.height - RankStr.height / 2;
        this.addChild(RankStr);
        if (this.vo.isCanJoin()) {
            var myArmyBg = BaseBitmap.create("mainui_bottombtnbg");
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, myArmyBg, view._bottomBg, [25, view._bottomBg.height + 20]);
            this.addChild(myArmyBg);
            var myArmyIcon = ComponentManager.getButton("mainland_myarmy_btn", "", function () {
                //我的军团
                ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDDETAILARMYVIEW, {
                    aid: view.aid,
                    code: view.code
                });
            }, this);
            myArmyIcon.x = myArmyBg.x + myArmyBg.width / 2 - myArmyIcon.width / 2;
            myArmyIcon.y = myArmyBg.y + myArmyBg.height / 2 - myArmyIcon.height / 2;
            this.addChild(myArmyIcon);
            var myArmyStr = BaseBitmap.create("mainland_myarmy_btn_name");
            myArmyStr.x = myArmyBg.x + myArmyBg.width / 2 - myArmyStr.width / 2;
            myArmyStr.y = myArmyBg.y + myArmyBg.height - myArmyStr.height / 2;
            this.addChild(myArmyStr);
            view._myArmyBtn = myArmyIcon;
        }
        //顶部进度条
        view.createProgress();
        view.freshProgress();
        //通告信息
        NetManager.request(NetRequestConst.REQUEST_MAINLAND_RECORDLIST, {
            activeId: view.acTivityId,
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
                var isSpecial = tmp.buff > dayinfo[1].buff;
                var datePointBg = BaseBitmap.create("mainlandtimepointbg-" + code);
                var datePointTxt = ComponentManager.getTextField("" + App.DateUtil.getFormatBySecond(startTime, 12), 18);
                if (isSpecial) {
                    posX -= 10;
                }
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, datePointBg, topProgressGroup, [posX, 0], true);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, datePointTxt, datePointBg);
                datePointTxt.name = "pointTxt" + i;
                var progress = null;
                if (isSpecial) {
                    progress = ComponentManager.getNewProgressBar("mainland_progressred", "mainland_progressbg", width);
                }
                else {
                    progress = ComponentManager.getNewProgressBar("mainland_progressgreen", "mainland_progressbg", width);
                }
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, progress, datePointBg, [datePointBg.width - 10, 0]);
                topProgressGroup.addChild(progress);
                progress.name = "progress" + i;
                topProgressGroup.addChild(datePointBg);
                topProgressGroup.addChild(datePointTxt);
                if (idx == now) {
                    var datePointBg2 = BaseBitmap.create("mainlandtimepointbg-" + code);
                    topProgressGroup.addChild(datePointBg2);
                    var end = tmp.endTime == 86400 ? "24:00" : App.DateUtil.getFormatBySecond(endTime, 12);
                    var datePointTxt2 = ComponentManager.getTextField(end, 18);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, datePointBg2, progress, [progress.width - 10, 0]);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, datePointTxt2, datePointBg2);
                    topProgressGroup.addChild(datePointTxt2);
                    datePointTxt2.name = "pointTxt2" + i;
                }
                posX += (datePointBg.width + progress.width - 20);
                //战功获取倍数提升
                if (GameData.serverTime < endTime && GameData.serverTime >= startTime) {
                    var descBg = BaseBitmap.create("mainland_warview_tipbg-" + code);
                    descBg.name = "descBg";
                    view.addChild(descBg);
                    descBg.x = GameConfig.stageWidth / 2 - descBg.width / 2;
                    descBg.y = 158;
                    var str = "acConquerMainLandTip9-" + code;
                    var param = [App.DateUtil.getFormatBySecond(startTime, 12), App.DateUtil.getFormatBySecond(endTime, 12), "" + tmp.buff];
                    if (isSpecial) {
                        str = "acConquerMainLandTip11-" + code;
                    }
                    else if (tmp.buff == 0) {
                        str = "acConquerMainLandTip12-" + code;
                        [App.DateUtil.getFormatBySecond(endTime, 12)];
                    }
                    var descTxt = ComponentManager.getTextField(LanguageManager.getlocal(str, param), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
                    this.addChild(descTxt);
                    descTxt.name = "descTxt";
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg, [0, 12]);
                }
            }
            topProgressGroup.x = 0;
            topProgressGroup.y = 130;
            view.addChild(topProgressGroup);
        }
        else {
            var descBg = view.getChildByName("descBg");
            var descTxt = view.getChildByName("descTxt");
            if (descBg && descTxt) {
                descTxt.text = LanguageManager.getlocal("acPunishEnd");
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg, [0, 12]);
            }
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
                var isSpecial = tmp.buff > dayinfo[1].buff;
                if (progress) {
                    if (isSpecial) {
                        progress.changeRes("mainlandprogressfire" + code + "-", "mainland_progressbg", true, 10, 70, width, 20);
                    }
                    else {
                        progress.changeRes("mainland_progressgreen", "mainland_progressbg");
                    }
                }
                if (tmp.buff > 0) {
                    var datePointTxt = view._topProgressGroup.getChildByName("pointTxt" + i);
                    if (datePointTxt) {
                        datePointTxt.text = App.DateUtil.getFormatBySecond(startTime, 12);
                    }
                    if (now == idx) {
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
                        var descBg = view.getChildByName("descBg");
                        var descTxt = view.getChildByName("descTxt");
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
                            if (this.vo.getCurPeriod() == 4) {
                                descTxt.text = LanguageManager.getlocal("acPunishEnd");
                            }
                            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg, [0, 12]);
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
                if (this.vo.getCurPeriod() == 3) {
                    var descBg = view.getChildByName("descBg");
                    var descTxt = view.getChildByName("descTxt");
                    if (descBg && descTxt) {
                        var str = "acConquerMainLandTip25-" + code;
                        descTxt.text = LanguageManager.getlocal(str);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg, [0, 12]);
                    }
                }
            }
        }
        else {
            var descBg = view.getChildByName("descBg");
            var descTxt = view.getChildByName("descTxt");
            if (descBg && descTxt) {
                descTxt.text = LanguageManager.getlocal("acPunishEnd");
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg, [0, 12]);
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
                        if (j == unit.buildingNum) {
                            baseY = city.y + city.height + pos.height;
                        }
                        city.addTouchTap(function () {
                            if (!view.vo.isCanJoin()) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + view.getUiCode()));
                                return;
                            }
                            if (!view.vo.isInActivity()) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
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
                        var cityNameBg = BaseBitmap.create("mainlandcitynamebg_" + (level < 4 ? 'big' : 'small') + "-" + code);
                        cityNameBg.name = "mlcityName" + level + "-" + j;
                        cityNameBg.addTouchTap(function () {
                            if (!view.vo.isCanJoin()) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + view.getUiCode()));
                                return;
                            }
                            if (!view.vo.isInActivity()) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                                return;
                            }
                            ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDCITYINFOVIEW, {
                                aid: view.aid,
                                code: view.code,
                                cityLevel: level,
                                cityNum: j
                            });
                        }, view);
                        cityNameBg.setScale(0.7);
                        view._nodeContainer.addChild(cityNameBg);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, cityNameBg, city, [5, -30]);
                        var citynameTxt = ComponentManager.getTextField(view.vo.getCityName(level + "_" + j), 24, TextFieldConst.COLOR_BROWN_NEW);
                        if (PlatformManager.checkIsViSp()) {
                            citynameTxt.size -= 4;
                        }
                        citynameTxt.setScale(0.7);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, citynameTxt, cityNameBg);
                        view._nodeContainer.addChild(citynameTxt);
                        var citynumbg = BaseBitmap.create("public_itemtipbg2");
                        citynumbg.width = cityNameBg.width;
                        citynumbg.setScale(0.8);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, citynumbg, cityNameBg, [0, cityNameBg.height * cityNameBg.scaleY - 5]);
                        view._nodeContainer.addChild(citynumbg);
                        citynumbg.name = "citynumbg" + level + "_" + j;
                        var cityNumTxt = ComponentManager.getTextField(view.vo.getCityObserveNum(level, j) + "/" + unit.segmentation, 20, TextFieldConst.COLOR_CROSS_YELLOW);
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
                        var cityNameBg = BaseBitmap.create("mainlandcitynamebg_" + (level < 4 ? 'big' : 'small') + "-" + code);
                        cityNameBg.name = "mlcityName" + level + "-" + j;
                        cityNameBg.addTouchTap(function () {
                            if (!view.vo.isCanJoin()) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + view.getUiCode()));
                                return;
                            }
                            if (!view.vo.isInActivity()) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                                return;
                            }
                            ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDCITYINFOVIEW, {
                                aid: view.aid,
                                code: view.code,
                                cityLevel: level,
                                cityNum: j
                            });
                        }, view);
                        //cityNameBg.setScale(level < 4 ? 1 : 0.8);
                        var city = BaseBitmap.create(level < 4 ? "mlcity" + level + "-" + j + "_" + code : "mlcity" + level + "_" + code);
                        city.addTouchTap(function () {
                            if (!view.vo.isCanJoin()) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + view.getUiCode()));
                                return;
                            }
                            if (!view.vo.isInActivity()) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
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
                        var obj = ComponentManager.getTextField(view.vo.getCityName(level + "_" + j), 24, TextFieldConst.COLOR_BROWN_NEW);
                        if (PlatformManager.checkIsViSp()) {
                            obj.size -= 2;
                        }
                        obj.setScale(level < 4 ? 1 : 0.8);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, cityNameBg, city, [level < 4 ? 15 : 5, -30]);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, obj, cityNameBg);
                        view._nodeContainer.addChild(cityNameBg);
                        view._nodeContainer.addChild(obj);
                        var citynumbg = BaseBitmap.create("public_itemtipbg2");
                        citynumbg.width = cityNameBg.width;
                        citynumbg.setScale(level < 4 ? 1 : 0.8);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, citynumbg, cityNameBg, [0, cityNameBg.height * cityNameBg.scaleY - 5]);
                        view._nodeContainer.addChild(citynumbg);
                        citynumbg.name = "citynumbg" + level + "_" + j;
                        var cityNumTxt = ComponentManager.getTextField(view.vo.getCityObserveNum(level, j) + "/" + unit.segmentation, 20, TextFieldConst.COLOR_CROSS_YELLOW);
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
                            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
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
                    var cityNameBg = BaseBitmap.create("mainlandcitynamebg_" + (level < 4 ? 'big' : 'small') + "-" + code);
                    cityNameBg.name = "mlcityName" + level + "-" + j;
                    cityNameBg.setScale(0.8);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, cityNameBg, city, [5, -15]);
                    view._nodeContainer.addChild(cityNameBg);
                    cityNameBg.addTouchTap(function () {
                        if (!view.vo.isCanJoin()) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + view.getUiCode()));
                            return;
                        }
                        if (!view.vo.isInActivity()) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                            return;
                        }
                        ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDCITYINFOVIEW, {
                            aid: view.aid,
                            code: view.code,
                            cityLevel: level,
                            cityNum: 1
                        });
                    }, view);
                    var obj = ComponentManager.getTextField(view.vo.getCityName(level + "_" + j), 24, TextFieldConst.COLOR_BROWN_NEW);
                    if (PlatformManager.checkIsViSp()) {
                        obj.size -= 4;
                    }
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
                var cityName = view._nodeContainer.getChildByName("mlcityName" + i + "-" + j);
                if (city) {
                    var period = view.vo.getFightPeriod();
                    var smoke1 = view._nodeContainer.getChildByName("mainlandsmoke_" + 1 + "_" + i + "-" + j);
                    var fire2 = view._nodeContainer.getChildByName("mainlandfire1" + 2 + i + "-" + j);
                    //1正常交战 2激战
                    if (period == 2) {
                        if (smoke1) {
                            smoke1.dispose();
                            smoke1 = null;
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
                                        fire.x = city.x + city.width * city.scaleX / 2 + fire.anchorOffsetX + (i == 1 ? 15 : -15);
                                        fire.y = city.y + (i == 1 ? 120 : 95);
                                        if (i == 3) {
                                            fire.y = city.y + 80;
                                            if (j == 3) {
                                                fire.y = city.y + 90;
                                            }
                                        }
                                        break;
                                    case 2:
                                        fire.scaleX *= -1;
                                        fire.x = city.x + fire.anchorOffsetX + (i == 1 ? 25 : -20);
                                        fire.y = city.y + (i == 1 ? 120 : 95);
                                        if (i == 3) {
                                            fire.x = city.x + fire.anchorOffsetX + (-13);
                                            fire.y = city.y + 80;
                                            if (j == 3) {
                                                fire.y = city.y + 90;
                                            }
                                        }
                                        break;
                                    case 3:
                                        fire.scaleX *= -1;
                                        fire.x = city.x + city.width * city.scaleX / 2 + fire.anchorOffsetX + (i == 1 ? 0 : -10);
                                        fire.y = city.y + fire.anchorOffsetY;
                                        if (i == 3) {
                                            fire.y = city.y + fire.anchorOffsetY - 20;
                                            fire.x = city.x + city.width * city.scaleX / 2 + fire.anchorOffsetX - 10;
                                            if (j == 3) {
                                                fire.y = city.y + fire.anchorOffsetY - 7;
                                            }
                                        }
                                        break;
                                    case 4:
                                        fire.x = city.x + city.width * city.scaleX / 2 - fire.anchorOffsetX + (i == 1 ? 20 : 25);
                                        fire.y = city.y + fire.anchorOffsetY;
                                        if (i == 3) {
                                            fire.x = city.x + city.width * city.scaleX / 2 - fire.anchorOffsetX + 30;
                                            fire.y = city.y + fire.anchorOffsetY - 15;
                                            if (j == 3) {
                                                fire.y = city.y + fire.anchorOffsetY + -5;
                                            }
                                        }
                                        break;
                                }
                                if (k < 3) {
                                    view._nodeContainer.addChildAt(fire, view._nodeContainer.getChildIndex(cityName));
                                }
                                else {
                                    view._nodeContainer.addChildAt(fire, view._nodeContainer.getChildIndex(city) - 1);
                                }
                            }
                        }
                    }
                    else {
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
    //刷新我占领的城市
    AcConquerMainLandWarView.prototype.freshMyCity = function () {
        var mycity = this.vo.getMyCity();
        var myCArr = [];
        for (var i = 0; i < mycity.length; i++) {
            myCArr.push(mycity[i].mainland + "_" + mycity[i].building);
        }
        //撤回军队了 清除之前的箭头
        if (this._mycityList && this._mycityList[0]) {
            for (var i = 0; i < this._mycityList.length; i++) {
                var item = this._mycityList[i];
                if (myCArr.indexOf(item) == -1) {
                    var mainbuild = item.split('_');
                    var arrow = this._nodeContainer.getChildByName("myplaceArrow" + mainbuild[0] + "-" + mainbuild[1]);
                    if (arrow) {
                        arrow.stopAllActions();
                        this._nodeContainer.removeChild(arrow);
                        arrow = null;
                        this._mycityList.splice(i, 1);
                    }
                }
            }
        }
        if (mycity && mycity[0]) {
            for (var i = 0; i < mycity.length; i++) {
                var element = mycity[i];
                if (!this._nodeContainer.getChildByName("myplaceArrow" + element.mainland + "-" + element.building)) {
                    var city = this._nodeContainer.getChildByName("mlcity" + element.mainland + "-" + element.building);
                    var target = null;
                    var smoke = this._nodeContainer.getChildByName("mainlandsmoke_1_" + element.mainland + "-" + element.building);
                    if (smoke) {
                        target = smoke;
                    }
                    else {
                        target = this._nodeContainer.getChildByName("mlcityName" + element.mainland + "-" + element.building);
                    }
                    var offset = [3.5 + (7 - Number(element.mainland)) * 1.5, city.height / 2 - (7 - Number(element.mainland)) * 4];
                    var myplaceArrow = BaseBitmap.create("mainland_myplacearrow");
                    myplaceArrow.name = "myplaceArrow" + element.mainland + "-" + element.building;
                    this._nodeContainer.addChildAt(myplaceArrow, this._nodeContainer.getChildIndex(target) + 1);
                    this._mycityList.push(element.mainland + "_" + element.building);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, myplaceArrow, city, offset);
                    egret.Tween.get(myplaceArrow, { loop: true })
                        .to({ y: myplaceArrow.y - 15 }, 800)
                        .to({ y: myplaceArrow.y }, 800);
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
        maskDown.y = GameConfig.stageHeigth - bottom.height - maskDown.height - 15;
        this.addChild(maskDown);
        this.swapChildren(maskDown, this.container);
        //文本
        var tipBg = BaseBitmap.create("public_listbg3");
        tipBg.width = 600;
        tipBg.setPosition(20, bottom.y + 75);
        this.addChild(tipBg);
        var tipBgLine = BaseBitmap.create("public_line4");
        tipBgLine.width = tipBg.width - 20;
        tipBgLine.x = tipBg.x + 10;
        tipBgLine.y = tipBg.y + tipBg.height / 2 - tipBgLine.height / 2;
        this.addChild(tipBgLine);
        var tipTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN_NEW);
        tipTxt.lineSpacing = 20;
        tipTxt.width = 480;
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, tipBg, [25, 25]);
        view._bottomLogTxt = tipTxt;
        var showMore = ComponentManager.getButton("mainland_arrow", "", this.showMoreHandle, this);
        showMore.scaleY = -1;
        showMore.setPosition(GameConfig.stageWidth - showMore.width - 38, GameConfig.stageHeigth - 40);
        this.addChild(showMore);
        this._moreArrow = showMore;
    };
    AcConquerMainLandWarView.prototype.refreshText = function () {
        var view = this;
        var code = view.getUiCode();
        //获取最新一条记录
        var logInfo = view.vo.getLastChargeLog();
        var str = "";
        if (logInfo) {
            var cityname = view.vo.getCityName(logInfo.citylevel + "_" + logInfo.cityNum + "_" + logInfo.cityIdx);
            //撤军
            if (logInfo.callback) {
                str = LanguageManager.getlocal("acConquerMainLandLog5_1-" + code, [logInfo.winName, cityname]);
            }
            else {
                /**1
                * 通报标头→玩家ID 成功夺取 地标名
                * 进攻胜利通报：玩家ID 已成功夺取 地标名
                * 防御胜利通报：玩家ID 成功防御 地标名
                * */
                var str1 = LanguageManager.getlocal("acConquerMainLandLog1_" + logInfo.title.type + "-" + code, [logInfo.winName, cityname]);
                /**2
                * （通报内容）→玩家ID 出动大军，来势汹汹，击败了 玩家ID2，成功夺取了 地标名！
                * */
                var str2 = "";
                if (logInfo.report.type == 5) {
                    str2 = LanguageManager.getlocal("acConquerMainLandLog2_" + logInfo.report.type + "_" + logInfo.report.rid + "-" + code, [logInfo.winName, logInfo.loseName, cityname]);
                }
                else {
                    str2 = LanguageManager.getlocal("acConquerMainLandLog2_" + logInfo.report.type + "-" + code, [logInfo.winName, logInfo.loseName, cityname]);
                }
                /**3
                * （接②，连胜通报）→并取得x连胜！
                * */
                var str3 = "";
                if (logInfo.win.type) {
                    str3 = LanguageManager.getlocal("acConquerMainLandLog3_" + logInfo.win.type + "-" + code, [logInfo.win.type == 1 ? logInfo.win.num : logInfo.loseName, logInfo.win.num]);
                }
                str = str2; // + `\n` + str2 + str3;
            }
            /**4
            * 时间戳
            * */
            var str4 = App.DateUtil.getFormatBySecond(logInfo.time, 13);
        }
        else {
            str = LanguageManager.getlocal("atkracedes3");
        }
        view._bottomLogTxt.text = str;
        //App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._bottomLogTxt, view._bottomBg, [25,0]);
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
                this._moreArrow.scaleY = 1;
                this._moreArrow.alpha = 0;
                egret.Tween.get(this._moreArrow).wait(500).to({ alpha: 1 }, 100);
                this._moreArrow.y = 260;
                this.showList();
                // NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST,{activeId:this.acTivityId});
            }
            else {
                this._moreArrow.scaleY = -1;
                this._moreArrow.y = GameConfig.stageHeigth - 40;
                this.closeList();
            }
        }
    };
    AcConquerMainLandWarView.prototype.closeList = function () {
        this.touchBoo = false;
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
        this._currMaskBmp = BaseBitmap.create("public_9_viewmask");
        this._currMaskBmp.width = GameConfig.stageWidth;
        this._currMaskBmp.height = GameConfig.stageHeigth;
        this._currMaskBmp.touchEnabled = true;
        this.addChild(this._currMaskBmp);
        this.moveContainer = new BaseDisplayObjectContainer();
        this.addChild(this.moveContainer);
        this.moveContainer.height = GameConfig.stageHeigth - 250;
        this.moreBg = App.CommonUtil.getCommonBorderFrame(GameConfig.stageHeigth - 250);
        this.moveContainer.addChild(this.moreBg);
        var woodBg = BaseBitmap.create("commonview_woodbg");
        woodBg.width = 620;
        woodBg.height = this.moreBg.height - 40;
        woodBg.setPosition(10, 18);
        this.moveContainer.addChild(woodBg);
        var listbg = BaseBitmap.create("public_listbg3");
        listbg.width = 600;
        listbg.height = this.moreBg.height - 40;
        listbg.setPosition(20, 21);
        this.moveContainer.addChild(listbg);
        this.setChildIndex(this._moreArrow, this.getChildIndex(this.moveContainer));
        //this.setChildIndex(this._currMaskBmp,this.getChildIndex(this._topProgressGroup));
        // 增加 点击区域
        this._touchBg = BaseBitmap.create("public_9_bg25");
        this._touchBg.width = 640;
        this._touchBg.height = 260;
        this._touchBg.x = 0;
        this._touchBg.y = -240;
        this._touchBg.alpha = 0;
        this._touchBg.addTouchTap(this.showMoreHandle, this);
        this.moveContainer.addChild(this._touchBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 580, listbg.height - 20);
        var arr = this.vo.getWarLog();
        this._scrollList = ComponentManager.getScrollList(AcConquerMainLandLogItem, arr, rect, this.code);
        this._scrollList.setPosition(30, 28);
        this.moveContainer.addChild(this._scrollList);
        this._scrollList.bounces = false;
        if (!arr || !arr[0]) {
            this._scrollList.setEmptyTip(LanguageManager.getlocal('atkracedes3'), TextFieldConst.COLOR_BROWN_NEW);
        }
        this.moveContainer.y = 1150;
        this.touchBoo = false;
        if (this.describeTxt) {
            this.describeTxt.visible = false;
        }
        egret.Tween.get(this.moveContainer).to({ y: 235 }, 500).call(function () {
            egret.Tween.removeTweens(this.moveContainer);
            this.touchBoo = true;
        }, this);
    };
    AcConquerMainLandWarView.prototype.infoClick = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSALLIANCEINFOVIEW, {
            aid: view.aid,
            code: view.code
        });
    };
    AcConquerMainLandWarView.prototype.freshview = function () {
        var view = this;
        var code = view.getUiCode();
        if (view._perScoreTxt) {
            //战功刷新
            view._perScoreTxt.text = LanguageManager.getlocal("acConquerMainLandTip10-" + code, [App.StringUtil.changeIntToText(view.vo.getMyScore()), view.vo.getMyScorePerMin().toString()]);
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
        return "AcConquerMainLandRule-" + this.getUiCode();
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
        view._timeCDTxt.text = LanguageManager.getlocal("acConquerMainLandActCD-" + code, [this.vo.acCountDown]);
        this._timeCDTxt.x = GameConfig.stageWidth - this._timeCDTxt.width - 13;
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
        view.freshMyCity();
    };
    AcConquerMainLandWarView.prototype.enterInHandler = function () {
        var view = this;
    };
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
        view._stopTouch = false;
        view._scrollList = null;
        view._nodeContainer.dispose();
        view._nodeContainer = null;
        view._collectBtn = null;
        if (view._topProgressGroup) {
            view._topProgressGroup.dispose();
            view._topProgressGroup = null;
        }
        view._perScoreBg = null;
        view._perScoreTxt = null;
        view._nowDay = 0;
        view._fightPeriod = 1;
        view._myArmyBtn = null;
        view._mycityList = [];
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE, view.hide, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_RECORDLIST), view.getKilllog, view);
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandWarView;
}(CommonView));
__reflect(AcConquerMainLandWarView.prototype, "AcConquerMainLandWarView");
