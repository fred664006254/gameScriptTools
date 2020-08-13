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
author : qianjun
desc : 帮会争顶活动
*/
var AcBattleGroundMapView = (function (_super) {
    __extends(AcBattleGroundMapView, _super);
    function AcBattleGroundMapView() {
        var _this = _super.call(this) || this;
        _this._bgGroup = null;
        _this._period = 1;
        _this._cdBg = null;
        _this._cdText = null;
        _this._chatTxt = null;
        _this._bottomBg = null;
        _this.touchBoo = true;
        _this.moreBg = null;
        _this.describeTxt = null;
        _this.moveContainer = null;
        _this._moreArrow = null;
        _this._isShowMore = false;
        _this._touchBg = null;
        _this._currMaskBmp = null;
        _this.isData = false;
        _this.listconditions = null;
        _this._atkraceInfoVoList = [];
        _this._nameTxt = null;
        _this._bottomLogTxt = null;
        _this._bgScrollView = null;
        _this._countDownTime = 0;
        _this._fightflag = null;
        _this._randBtn = null;
        _this._curFightType = 0; //1可以随机挑战 2已经发生战斗没结束 继续战斗 3cd中 4次数耗尽
        _this._curAllianceMap = -1; //我的帮会所在地图
        _this._curAllianceIdx = -1; //我的帮会索引
        _this._stopTouch = false;
        _this._leftArrow = null;
        _this._rightArrow = null;
        _this._needFresh = false;
        _this._randClick = false;
        _this._logBtn = null;
        _this._topBg = null;
        _this._moreTipTxt = null;
        _this._killBtn = null;
        _this._challBtn = null;
        _this._moveAtkracedes3 = null;
        _this._curRound = -1;
        _this._lastChargeLog = null;
        _this.tmpX = 0;
        _this.mapPos = {
            1: { x: 33, y: 189, width: 180, height: 116 },
            2: { x: 27, y: 405, width: 54, height: 54 },
            3: { x: 131, y: 625, width: 54, height: 54 },
            4: { x: 318, y: 157, width: 54, height: 54 },
            5: { x: 224, y: 315, width: 54, height: 54 },
            6: { x: 299, y: 492, width: 54, height: 54 },
            7: { x: 717, y: 178, width: 54, height: 54 },
            8: { x: 666, y: 352, width: 54, height: 54 },
            9: { x: 783, y: 614, width: 184, height: 124 },
            10: { x: 975, y: 162, width: 54, height: 54 },
            11: { x: 852, y: 421, width: 54, height: 54 },
            12: { x: 1013, y: 537, width: 54, height: 54 },
        };
        return _this;
    }
    Object.defineProperty(AcBattleGroundMapView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundMapView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundMapView.prototype, "code", {
        get: function () {
            return String(this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundMapView.prototype, "aid", {
        get: function () {
            return String(this.param.data.aid);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundMapView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundMapView.prototype.getTitleStr = function () {
        return this.getDefaultRes("acBattleRoundViewTitle");
    };
    //根据资源名字得到完整资源名字
    AcBattleGroundMapView.prototype.getDefaultRes = function (resName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (ResourceManager.hasRes(resName + "-" + this.code)) {
            return resName + "-" + this.code;
        }
        else {
            return resName + "-" + defaultCode;
        }
    };
    AcBattleGroundMapView.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
            if (Api.switchVoApi.checkOpenAtkraceScoreFix() && LanguageManager.checkHasKey(cnName + "-" + this.code + "_2")) {
                return cnName + "-" + this.code + "_2";
            }
            return cnName + "-" + this.code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    AcBattleGroundMapView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND, requestData: {
                activeId: view.vo.aidAndCode,
            } };
    };
    AcBattleGroundMapView.prototype.receiveData = function (data) {
        var view = this;
        if (data.data.data) {
            if (data.data.data.waiting) {
                view.vo.setWaiting(data.data.data.waiting);
            }
            else {
                view.vo.setWaiting(0);
                if (data.data.data && data.data.cmd == NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND) {
                    if (data.data.data.battleground.fightflag == false) {
                        this._fightflag = false;
                    }
                    else {
                        this._fightflag = true;
                    }
                    if (data.data.data.battleground) {
                        view.vo.setRaceInfo(data.data.data.battleground);
                    }
                    if (data.data.data.map) {
                        view.vo.setMap(data.data.data.map);
                    }
                    if (data.data.data.myrankArr) {
                        view.vo.setRank(data.data.data.myrankArr);
                    }
                    if (data.data.data.alive) {
                        view.vo.setAlive(data.data.data.alive);
                    }
                    else {
                        view.vo.setAlive(0);
                    }
                    if (!this.vo.isChampWin()) {
                        //弹窗
                        if (data.data.data.popflag) {
                            ViewController.getInstance().openView("AcBattleGroundNextPopupView", {
                                aid: view.aid,
                                code: view.code
                            });
                        }
                    }
                    view.resetInfo();
                    if (view._needFresh) {
                        view._needFresh = false;
                        var leftX = view._bgScrollView.scrollLeft;
                        var range = [leftX, Math.min(view._bgGroup.width - GameConfig.stageWidth, leftX + GameConfig.stageWidth)];
                        for (var i = 0; i < this.mapNum; ++i) {
                            var mapleft = i * this.mapWidth;
                            if (mapleft + this.mapWidth >= range[0] && mapleft < range[1]) {
                                view.freshCity(i);
                            }
                        }
                    }
                }
            }
        }
        //view.api.setBossNumInfo(data.data.data);
    };
    AcBattleGroundMapView.prototype.getResourceList = function () {
        var ret = _super.prototype.getResourceList.call(this);
        ret = ret.concat([
            this.getDefaultRes("battlegroundbg"),
            "arena_arrow",
            "arena_more_down",
            "arena_more",
            "chatlaba",
            "atkracecross_laifa",
            "atkracecross_laifa_text",
            this.getDefaultRes("battlegroundbuild1"),
            this.getDefaultRes("battlegroundbuild2"),
            this.getDefaultRes("battlegroundbuild3"),
            this.getDefaultRes("battlegroundbuildd"),
            "arena_bottom_bg",
            "adult_lowbg",
            "atkrace_xian_1"
        ]);
        return ret;
    };
    // 背景图名称
    AcBattleGroundMapView.prototype.getBgName = function () {
        return this.getDefaultRes("battlegroundbg");
    };
    AcBattleGroundMapView.prototype.getRuleInfo = function () {
        return this.getDefaultCn("acBattleRoundRule");
    };
    AcBattleGroundMapView.prototype.getRuleParam = function () {
        var tmp = [];
        tmp.push(this.cfg.lowestScore.toString());
        tmp.push(this.cfg.disableTime.toString());
        return tmp;
    };
    Object.defineProperty(AcBattleGroundMapView.prototype, "mapNum", {
        //获取此次活动需要创建的地图数目
        get: function () {
            // let servernum = this.cfg.serverNum * 3;
            // let mapNum = Math.ceil(servernum / 12);
            // return mapNum;
            var servernum = this.vo.getMap();
            var mapNum = Math.ceil(servernum / 12);
            return mapNum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundMapView.prototype, "mapWidth", {
        //地图宽度
        get: function () {
            return 1280;
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundMapView.prototype.initBg = function () {
        var _this = this;
        this.height = GameConfig.stageHeigth;
        this.width = GameConfig.stageWidth;
        var bgName = this.getBgName();
        this.viewBg = BaseBitmap.create(bgName);
        if (bgName) {
            var bggroup = new BaseDisplayObjectContainer();
            bggroup.width = GameConfig.stageWidth * 2 * this.mapNum;
            bggroup.height = GameConfig.stageHeigth;
            this.addChild(bggroup);
            this._bgGroup = bggroup;
            bggroup.addChild(this.viewBg);
            for (var i = 0; i < this.mapNum; ++i) {
                if (i > 0) {
                    continue;
                }
                var map = BaseBitmap.create(bgName);
                map.name = "map" + i;
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, map, bggroup, [i * this.mapWidth, 0], true);
                bggroup.addChild(map);
                this.viewBg.x = map.x + map.width;
                this.viewBg.y = map.y;
                var _loop_1 = function (j) {
                    if (Number(j) > 6) {
                        return "break";
                    }
                    var unit = this_1.mapPos[j];
                    var idx = i * 12 + Number(j);
                    var info = this_1.vo.getAllInfoById(idx);
                    // info = {
                    //     alliId:1,
                    //     alliName:"2324",
                    //     level:3,
                    //     mid: 400001,
                    //     num: 2,
                    //     period: 1,
                    //     server: 4,
                    //     total:10
                    // };
                    if (!info) {
                        return "continue";
                    }
                    //创建帮会建筑物
                    var mask1 = BaseBitmap.create(this_1.getDefaultRes("battlegroundbuild" + info.level));
                    mask1.anchorOffsetX = mask1.width / 2;
                    mask1.anchorOffsetY = mask1.height / 2;
                    mask1.x = map.x + unit.x + mask1.anchorOffsetX;
                    mask1.y = map.y + unit.y + mask1.anchorOffsetY;
                    mask1.name = "alliancebuild" + info.alliId;
                    mask1.addTouch(function (e) {
                        if (_this._stopTouch) {
                            return;
                        }
                        if (_this.vo.isStart == false) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                            return;
                        }
                        if (Number(info.mid) == Number(Api.playerVoApi.getPlayerAllianceId())) {
                            //跳转
                            _this.moveToMyAlliance();
                        }
                        else {
                            ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDALLIINFOVIEW, {
                                code: _this.code,
                                aid: _this.aid,
                                alliId: info.alliId
                            });
                        }
                    }, this_1, null, true);
                    bggroup.addChild(mask1);
                    if (info.period != 4) {
                        // let fire = ComponentManager.getCustomMovieClip("battlegroundsmapfire",15,70);
                        // fire.setScale(2);
                        // fire.x = mask1.x-60;
                        // fire.y = mask1.y - 64 * fire.scaleY +20;
                        // fire.name = "fire"+info.alliId;
                        // fire.playWithTime(0);
                        // bggroup.addChild(fire);
                        if (info.num <= info.total / 4) {
                            //小于百分之25
                            var fire = ComponentManager.getCustomMovieClip("battlegroundsmapfire", 15, 70);
                            fire.setScale(2);
                            fire.x = mask1.x - 60;
                            fire.y = mask1.y - 64 * fire.scaleY + 20;
                            fire.name = "fire" + info.alliId;
                            fire.playWithTime(0);
                            bggroup.addChild(fire);
                        }
                        else if (info.num <= info.total / 2) {
                            //小于百分之五十
                            var smoke = ComponentManager.getCustomMovieClip("battlegroundsmapsmoke", 10, 70);
                            smoke.setScale(2);
                            smoke.x = mask1.x - 40;
                            smoke.y = mask1.y - 64 * smoke.scaleY;
                            smoke.name = "smoke" + info.alliId;
                            smoke.playWithTime(0);
                            bggroup.addChild(smoke);
                        }
                    }
                    //信息
                    var infobg = BaseBitmap.create("public_lockbg");
                    infobg.name = "alliancebg" + info.alliId;
                    var allinameTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
                    allinameTxt.name = "allianceTxt" + info.alliId;
                    allinameTxt.lineSpacing = 5;
                    allinameTxt.textAlign = egret.HorizontalAlign.CENTER;
                    bggroup.addChild(infobg);
                    bggroup.addChild(allinameTxt);
                };
                var this_1 = this;
                for (var j in this.mapPos) {
                    var state_1 = _loop_1(j);
                    if (state_1 === "break")
                        break;
                }
            }
            var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth);
            var noticescrollView = ComponentManager.getScrollView(bggroup, rect);
            noticescrollView.bounces = false;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, noticescrollView, this);
            noticescrollView.verticalScrollPolicy = 'off';
            bggroup.y = 0;
            this.addChild(noticescrollView);
            //修复拖动地图关闭界面报错
            noticescrollView._getContentWidth = function () {
                if (this._content) {
                    return this._content.$explicitWidth || this._content.width;
                }
            };
            noticescrollView.bindMoveCompleteCallback(function () {
                _this.freshMap();
            }, this);
            this._bgScrollView = noticescrollView;
            this.freshMap();
        }
    };
    //背景地图随可视窗口的创建刷新和移出
    AcBattleGroundMapView.prototype.freshMap = function () {
        var view = this;
        view.tmpX = 0;
        var leftX = view._bgScrollView.scrollLeft;
        //左右箭头
        if (view._leftArrow) {
            view._leftArrow.visible = leftX > 0;
            view._rightArrow.visible = leftX < ((view.mapNum - 1) * this.mapWidth + (this.mapWidth / 2));
        }
        for (var i = 0; i < this.mapNum; ++i) {
            var map = view._bgGroup.getChildByName("map" + i);
            if (!map) {
                map = BaseBitmap.create(this.getBgName());
                var range = [leftX, Math.min(view._bgGroup.width - GameConfig.stageWidth, leftX + GameConfig.stageWidth)];
                var mapleft = i * this.mapWidth;
                if (mapleft + this.mapWidth >= range[0] && mapleft < range[1]) {
                    map.name = "map" + i;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, map, view._bgGroup, [i * this.mapWidth, 0], true);
                    view._bgGroup.addChild(map);
                }
                else {
                    map = null;
                }
            }
            if (map) {
                var mapleft = map.x;
                var range = [leftX, Math.min(view._bgGroup.width - GameConfig.stageWidth, leftX + GameConfig.stageWidth)];
                if (mapleft + this.mapWidth >= range[0] && mapleft < range[1]) {
                    view.freshCity(i);
                }
                else {
                    if (map) {
                        view._bgGroup.removeChild(map);
                    }
                    for (var j in view.mapPos) {
                        view.removeCity(i * 12 + Number(j));
                    }
                }
            }
        }
    };
    //每张地图上的城池状态变化
    AcBattleGroundMapView.prototype.freshCity = function (mapId) {
        var _this = this;
        var view = this;
        var leftX = view._bgScrollView.scrollLeft;
        var map = view._bgGroup.getChildByName("map" + mapId);
        if (map) {
            var range = [leftX, leftX + GameConfig.stageWidth];
            var _loop_2 = function (j) {
                var unit = this_2.mapPos[j];
                var idx = mapId * 12 + Number(j);
                var info = this_2.vo.getAllInfoById(idx);
                if (!info) {
                    return "continue";
                }
                var mask1 = view._bgGroup.getChildByName("alliancebuild" + info.alliId);
                if (!mask1) {
                    mask1 = BaseBitmap.create(this_2.getDefaultRes("battlegroundbuild" + info.level));
                    mask1.anchorOffsetX = mask1.width / 2;
                    mask1.x = map.x + unit.x + mask1.anchorOffsetX;
                    var scrollLeft_1 = mask1.x - mask1.anchorOffsetX;
                    if (scrollLeft_1 < range[1] && scrollLeft_1 + mask1.width >= range[0]) {
                        mask1.anchorOffsetY = mask1.height / 2;
                        mask1.y = map.y + unit.y + mask1.anchorOffsetY;
                        mask1.name = "alliancebuild" + info.alliId;
                        mask1.addTouch(function (e) {
                            if (_this._stopTouch) {
                                return;
                            }
                            if (Number(info.mid) == Number(Api.playerVoApi.getPlayerAllianceId())) {
                                //跳转
                                _this.moveToMyAlliance();
                            }
                            else {
                                ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDALLIINFOVIEW, {
                                    code: _this.code,
                                    aid: _this.aid,
                                    alliId: info.alliId
                                });
                            }
                        }, this_2, null, true);
                        view._bgGroup.addChild(mask1);
                        //信息
                        var infobg = BaseBitmap.create("public_lockbg");
                        infobg.name = "alliancebg" + info.alliId;
                        var allinameTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
                        allinameTxt.name = "allianceTxt" + info.alliId;
                        allinameTxt.lineSpacing = 5;
                        allinameTxt.textAlign = egret.HorizontalAlign.CENTER;
                        view._bgGroup.addChild(infobg);
                        view._bgGroup.addChild(allinameTxt);
                        if (info.num <= info.total / 4) {
                            //小于百分之25
                            var fire = ComponentManager.getCustomMovieClip("battlegroundsmapfire", 15, 70);
                            fire.setScale(2);
                            fire.x = mask1.x - 60;
                            fire.y = mask1.y - 64 * fire.scaleY + 20;
                            fire.name = "fire" + info.alliId;
                            fire.playWithTime(0);
                            view._bgGroup.addChild(fire);
                        }
                        else if (info.num <= info.total / 2) {
                            //小于百分之五十
                            var smoke = ComponentManager.getCustomMovieClip("battlegroundsmapsmoke", 10, 70);
                            smoke.setScale(2);
                            smoke.x = mask1.x - 40;
                            smoke.y = mask1.y - 64 * smoke.scaleY;
                            smoke.name = "smoke" + info.alliId;
                            smoke.playWithTime(0);
                            view._bgGroup.addChild(smoke);
                        }
                    }
                    else {
                        mask1 = null;
                    }
                }
                var scrollLeft = 0;
                if (mask1) {
                    scrollLeft = mask1.x - mask1.anchorOffsetX;
                }
                if (mask1 && scrollLeft < range[1] && scrollLeft + mask1.width >= range[0]) {
                    view.changeCity(info.alliId);
                }
                else {
                    view.removeCity(info.alliId);
                }
            };
            var this_2 = this;
            for (var j in this.mapPos) {
                _loop_2(j);
            }
        }
    };
    AcBattleGroundMapView.prototype.changeCity = function (alliId) {
        var view = this;
        var info = this.vo.getAllInfoById(alliId);
        var mask1 = view._bgGroup.getChildByName("alliancebuild" + info.alliId);
        var smoke = view._bgGroup.getChildByName("smoke" + info.alliId);
        var fire = view._bgGroup.getChildByName("fire" + info.alliId);
        if (info.period == 4) {
            if (smoke) {
                view._bgGroup.removeChild(smoke);
            }
            if (fire) {
                view._bgGroup.removeChild(fire);
            }
            //已经摧毁的建筑物
            mask1.setRes(this.getDefaultRes("battlegroundbuildd"));
        }
        else {
            if (info.num <= info.total / 4) {
                if (!fire) {
                    var fire_1 = ComponentManager.getCustomMovieClip("battlegroundsmapfire", 15, 70);
                    fire_1.setScale(2);
                    fire_1.x = mask1.x - 60;
                    fire_1.y = mask1.y - 64 * fire_1.scaleY + 20;
                    fire_1.name = "fire" + info.alliId;
                    fire_1.playWithTime(0);
                    this._bgGroup.addChild(fire_1);
                }
                if (smoke) {
                    this._bgGroup.removeChild(smoke);
                }
            }
            else if (info.num <= info.total / 2) {
                if (!smoke) {
                    var smoke_1 = ComponentManager.getCustomMovieClip("battlegroundsmapsmoke", 10, 70);
                    smoke_1.setScale(2);
                    smoke_1.x = mask1.x - 40;
                    smoke_1.y = mask1.y - 64 * smoke_1.scaleY;
                    smoke_1.name = "smoke" + info.alliId;
                    smoke_1.playWithTime(0);
                    this._bgGroup.addChild(smoke_1);
                }
            }
        }
        view.freshAlliText(info.alliId);
    };
    AcBattleGroundMapView.prototype.removeCity = function (alliId) {
        var view = this;
        var mask1 = view._bgGroup.getChildByName("alliancebuild" + alliId);
        if (mask1) {
            view._bgGroup.removeChild(mask1);
        }
        var smoke = view._bgGroup.getChildByName("smoke" + alliId);
        var fire = view._bgGroup.getChildByName("fire" + alliId);
        if (smoke) {
            view._bgGroup.removeChild(smoke);
        }
        if (fire) {
            view._bgGroup.removeChild(fire);
        }
        var infobg = view._bgGroup.getChildByName("alliancebg" + alliId);
        var allinameTxt = view._bgGroup.getChildByName("allianceTxt" + alliId);
        if (infobg) {
            view._bgGroup.removeChild(infobg);
        }
        if (allinameTxt) {
            view._bgGroup.removeChild(allinameTxt);
        }
    };
    AcBattleGroundMapView.prototype.freshAlliText = function (id) {
        var view = this;
        var info = this.vo.getAllInfoById(id);
        var mask1 = view._bgGroup.getChildByName("alliancebuild" + info.alliId);
        //信息
        if (mask1) {
            var infobg = view._bgGroup.getChildByName("alliancebg" + info.alliId);
            var allinameTxt = view._bgGroup.getChildByName("allianceTxt" + info.alliId);
            var str = '';
            if (view.vo.isAlliOut(id)) {
                str = info.alliName + "\n<font color=0xff3c3c>" + LanguageManager.getlocal(this.getDefaultCn("acBattleRoundOut")) + "</font>";
                // allinameTxt.textColor = 0xff3c3c;
            }
            else if (view.vo.isChampWin() && view.vo.getWinnerAlliance().mid == Number(info.mid)) {
                str = info.alliName + "\n<font color=0x21eb39>" + LanguageManager.getlocal(this.getDefaultCn("acBattleGroundTip10")) + "</font>";
                var winImg = BaseBitmap.create(this.getDefaultRes("battlegroundwin"));
                App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, winImg, mask1);
                this._bgGroup.addChild(winImg);
            }
            else {
                str = info.alliName + "\n<font color=0x21eb39>(" + info.num + "/" + info.total + ")</font>";
                if (Number(info.mid) == Number(Api.playerVoApi.getPlayerAllianceId())) {
                    allinameTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
                }
            }
            allinameTxt.text = str;
            infobg.width = allinameTxt.textWidth + 100;
            infobg.height = allinameTxt.textHeight + 20;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, infobg, mask1, [0, -infobg.height + 20]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, allinameTxt, infobg);
        }
    };
    /*
      private mapPos = {
        1 : { x : 96, y : 249, width : 180, height : 116},
        2 : { x : 46, y : 466, width : 54, height : 54},
        3 : { x : 201, y : 553, width : 54, height : 54},
        4 : { x : 46, y : 753, width : 54, height : 54},
        5 : { x : 329, y : 383, width : 54, height : 54},
        6 : { x : 409, y : 239, width : 54, height : 54},
        7 : { x : 451, y : 520, width : 54, height : 54},
        8 : { x : 434, y : 746, width : 54, height : 54},
        9 : { x : 689, y : 383, width : 184, height : 124},
        10 : { x : 666, y : 613, width : 54, height : 54},
        11 : { x : 703, y : 803, width : 54, height : 54},
        12 : { x : 894, y : 267, width : 54, height : 54},
        13 : { x : 959, y : 429, width : 54, height : 54},
        14 : { x : 1005, y : 590, width : 54, height : 54},
        15 : { x : 872, y : 702, width : 54, height : 54},
        16 : { x : 1035, y : 782, width : 236, height : 132},
    }
 */
    //
    AcBattleGroundMapView.prototype.initView = function () {
        var _this = this;
        var view = this;
        view._period = view.vo.getCurperiod();
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_BATTLEGROUND_BATTLEEND, view.battleEnd, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_CHALLENGE), view.challengeCallback, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_REVENGE), this.challengeCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_KILL), view.challengeCallback, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST), view.useCallback, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUNDINDEX), view.atkraceCallback, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_HANDLE), view.handleCallback, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_USEEXTRA), view.atkraceCallback, view);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var code = view.code;
        // NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST,{activeId:view.acTivityId});
        view.initTopTip();
        //底部
        var bottomBg = BaseBitmap.create("public_bottombg1");
        bottomBg.addTouchTap(function () { }, this);
        bottomBg.height = 86;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);
        view._bottomBg = bottomBg;
        //聊天
        var chatbg = null;
        if (1) {
            //跨服聊天消息
            chatbg = BaseBitmap.create("mainui_chatbg");
            chatbg.width = GameConfig.stageWidth;
            chatbg.height = 35;
            chatbg.x = 0;
            chatbg.y = bottomBg.y - chatbg.height;
            this.addChild(chatbg);
            chatbg.touchEnabled = true;
            chatbg.addTouchTap(this.chatBgClickHandler, this);
            var chatIcon = BaseBitmap.create(ResourceManager.getRes("mainui_chatIcon"));
            chatIcon.anchorOffsetX = chatIcon.width / 2;
            chatIcon.anchorOffsetY = chatIcon.height / 2;
            chatIcon.x = chatIcon.width / 2 + 10;
            chatIcon.y = chatbg.y + chatbg.height / 2;
            this.addChild(chatIcon);
            egret.Tween.get(chatIcon, {
                loop: true,
            }).to({ scaleX: 0.8, scaleY: 0.8 }, 1000).to({ scaleX: 1, scaleY: 1.0 }, 1000); //设置2000毫秒内 rotation 属性变为360
            var showStr = Api.chatVoApi.getLastAcCrossMessage();
            if (!showStr) {
                showStr = "";
            }
            else {
                var zonename = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, showStr.zoneid);
                showStr = LanguageManager.getlocal('acCrossServeDes', [zonename]) + showStr.sendername + ":" + (showStr.content.message.length > 15 ? (showStr.content.message.substring(0, 16) + "...") : showStr.content.message);
            }
            this._chatTxt = ComponentManager.getTextField(showStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
            this._chatTxt.width = 480;
            this._chatTxt.height = 20;
            this.setLayoutPosition(LayoutConst.leftverticalCenter, this._chatTxt, chatbg, [chatIcon.width + 5, 0]);
            this.addChild(this._chatTxt);
        }
        var detailbtn = ComponentManager.getButton("battleground_detailbtn", null, function () {
            if (view._stopTouch) {
                return;
            }
            if (_this.vo.isStart == false) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            else {
                ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEGROUNDDETAILSVIEW, {
                    aid: view.aid,
                    code: view.code
                });
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, detailbtn, chatbg, [15, chatbg.height + 5]);
        view.addChild(detailbtn);
        var detailTxt = BaseBitmap.create("battleground_detailtxt");
        this.addChild(detailTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, detailTxt, detailbtn);
        // atkracecross_laifa_text
        var logbtn = ComponentManager.getButton("atkracecross_laifa", null, function () {
            if (view._stopTouch) {
                return;
            }
            //打开详情界面
            ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDVISITVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, logbtn, chatbg, [15, chatbg.height + 5]);
        view.addChild(logbtn);
        var loginTxt = BaseBitmap.create("atkracecross_laifa_text");
        this.addChild(loginTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, loginTxt, logbtn);
        view._logBtn = logbtn;
        var randBtn = ComponentManager.getButton(this.getDefaultRes("battlegroundrandombtn"), this.getDefaultCn("acBattleRoundRandFight"), function () {
            if (view._stopTouch) {
                return;
            }
            if (!view.vo.getAttendQuality()) {
                App.CommonUtil.showTip(LanguageManager.getlocal(_this.getDefaultCn("acBattleRoundNoAttend")));
                return;
            }
            if (view.vo.isActyEnd()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
                return;
            }
            if (view.vo.getCurperiod() == 3) {
                App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
                return;
            }
            if (!view.vo.getJoinIn()) {
                App.CommonUtil.showTip(LanguageManager.getlocal(_this.getDefaultCn("acBattleGroundTip4")));
                return;
            }
            if (view._randClick) {
                return;
            }
            view._randClick = true;
            //随机挑战
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUNDINDEX, { activeId: view.acTivityId });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, randBtn, chatbg, [0, chatbg.height + 5]);
        view.addChild(randBtn);
        randBtn.setColor(0x7a4a1a);
        randBtn.name = "randBtn";
        view._randBtn = randBtn;
        randBtn.visible = view.vo.getAttendQuality() && view.vo.getJoinIn();
        view.initBottom();
        view.resetInfo();
        //左右翻页
        var leftArrow = ComponentManager.getButton("btn_leftpage", null, function () {
            if (view._stopTouch) {
                return;
            }
            var startX = Math.max(view._bgScrollView.scrollLeft - GameConfig.stageWidth, 0);
            egret.Tween.get(view._bgScrollView).to({ scrollLeft: startX }, 1000).call(function () {
                view._stopTouch = false;
                view._leftArrow.visible = view._bgScrollView.scrollLeft > 0;
                egret.Tween.removeTweens(view._bgScrollView);
            }, view);
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, leftArrow, view, [10, 0]);
        view._leftArrow = leftArrow;
        leftArrow.setScale(0.6);
        leftArrow.visible = false;
        view.addChild(leftArrow);
        var rightArrow = ComponentManager.getButton("btn_leftpage", null, function () {
            if (view._stopTouch) {
                return;
            }
            var startX = Math.min(view._bgScrollView.scrollLeft + GameConfig.stageWidth, (view.mapNum - 1) * _this.mapWidth + (_this.mapWidth / 2));
            egret.Tween.get(view._bgScrollView).to({ scrollLeft: startX }, 1000).call(function () {
                egret.Tween.removeTweens(view._bgScrollView);
                view._stopTouch = false;
                view._rightArrow.visible = view._bgScrollView.scrollLeft < ((view.mapNum - 1) * _this.mapWidth + (_this.mapWidth / 2));
            }, view);
        }, view);
        rightArrow.anchorOffsetX = rightArrow.width / 2;
        rightArrow.setScale(0.6);
        rightArrow.scaleX = -0.6;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rightArrow, view, [-rightArrow.width * 0.6 + 10, 0]);
        view._rightArrow = rightArrow;
        view.addChild(rightArrow);
        // NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST,{activeId:view.acTivityId});
        this.baseRefreshText();
        //定位
        for (var i = 0; i < this.mapNum; ++i) {
            for (var j in this.mapPos) {
                var unit = this.mapPos[j];
                var idx = i * 12 + Number(j);
                var info = this.vo.getAllInfoById(idx);
                if (info) {
                    if (Number(info.mid) == Number(Api.playerVoApi.getPlayerAllianceId())) {
                        this._curAllianceMap = i;
                        this._curAllianceIdx = Number(j);
                        break;
                    }
                }
            }
        }
        if (this._curAllianceMap > -1) {
            var tmp = 0;
            if ((this._curAllianceMap == 0 && this._curAllianceIdx < 9) || (this._curAllianceMap == this.mapNum - 1 && this._curAllianceIdx > 8)) {
                tmp = this._curAllianceMap * this.mapWidth + (this._curAllianceMap == 0 ? 0 : (this.mapWidth / 2));
            }
            else {
                tmp = this._curAllianceMap * this.mapWidth + this.mapPos[this._curAllianceIdx].x - (320 - 100);
            }
            // view._stopTouch = true;
            if (view._bgScrollView) {
                view._bgScrollView.scrollLeft = tmp;
            }
            // egret.Tween.get(view._bgScrollView).to({scrollLeft : tmp},1000).call(()=>{
            //     view._stopTouch = false;
            //     egret.Tween.removeTweens(view._bgScrollView);
            // },view);
        }
    };
    AcBattleGroundMapView.prototype.useCallback = function (event) {
        if (event.data.ret) {
            if (event.data.data.data.atklist) {
                this._atkraceInfoVoList = [];
                this._atkraceInfoVoList = this.vo.getBattleLog(event.data.data.data.atklist); //;	 
            }
            if (event.data.data.data.extralist) {
                this.vo.setExtraList(event.data.data.data.extralist); //;	 
            }
            this.refreshText();
            if (this._isShowMore) {
                // if(this._scrollList){
                //     this._scrollList.refreshData(this._atkraceInfoVoList,this.code);
                //     this.showList();
                // }
                // this.showList();
                if (this._atkraceInfoVoList.length > 0) {
                    this.isData = true;
                }
                else {
                    this.isData = false;
                }
                this.showList();
                if (this._scrollList) {
                    this._scrollList.refreshData(this._atkraceInfoVoList, this.code);
                }
            }
            if (this.listconditions) {
                this.listconditions.visible = false;
            }
            if (this._atkraceInfoVoList.length > 0) {
                this.isData = true;
            }
            else {
                this.isData = false;
            }
        }
        else {
            this.isData = false;
        }
    };
    AcBattleGroundMapView.prototype.baseRefreshText = function () {
        var data = null;
        if (this._atkraceInfoVoList.length > 0 && this._atkraceInfoVoList[0]) {
            data = this._atkraceInfoVoList[0];
        }
        else {
            data = this.vo.getOneList();
        }
        var news = data;
        if (data) {
            //击败｜｜全歼
            var textStr = LanguageManager.getlocal(this.getDefaultCn("acBattileGroundVisitLog"), [news.alliName, news.playerName, news.uid]);
            var str = "";
            if (this.isData && data.info.type == 1) {
                str = LanguageManager.getlocal("atkracebeat");
            }
            else {
                str = LanguageManager.getlocal("atkraceAnnihilation");
            }
            var currName = Config.ServantCfg.getServantItemById(data.info.sid).name;
            if (data.info.streak && data.info.streak >= 3) {
                var desStr = "acBattleStraight";
                if (data.info.atype && data.info.atype == 2) {
                    desStr = "acBattleStraight_1";
                }
                else if (data.info.atype && data.info.atype == 4) {
                    desStr = "acBattleStraight_4"; //追杀  全歼了
                }
                textStr += LanguageManager.getlocal(desStr, [currName, str, data.info.uname2, data.info.fightnum, data.info.streak]);
            }
            else {
                var desStr2 = "acBattleDescription";
                if (data.info.atype && data.info.atype == 2) {
                    desStr2 = "acBattleDescription_1";
                }
                else if (data.info.atype && data.info.atype == 4) {
                    desStr2 = "acBattleStraight_4_2"; //追杀 
                }
                textStr += LanguageManager.getlocal(desStr2, [currName, str, data.info.uname2, data.info.fightnum]);
            }
            this._bottomLogTxt.text = textStr;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, this._bottomLogTxt, this._bottomBg, [10, 0]);
        }
    };
    AcBattleGroundMapView.prototype.refreshText = function () {
        if (this._atkraceInfoVoList.length > 0 && this._atkraceInfoVoList[0]) {
            var data = this._atkraceInfoVoList[0];
            var news = data;
            // if(news){
            //     let str = LanguageManager.getlocal(`acBattileGroundVisitLog-${this.code}`, [news.alliName,news.playerName,news.uid,news.servantName,news.enermyName,news.enermyNum]);
            //     // if(str.length > 20){
            //     //     str = str.substring(0,20) + `...`
            //     // }${LanguageManager.getlocal(`atkraceyamenid`,[bData.uid])}
            //     this._bottomLogTxt.text = str;
            //     App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, this._bottomLogTxt, this._bottomBg, [10,0]);
            // }
            //击败｜｜全歼
            var textStr = LanguageManager.getlocal(this.getDefaultCn("acBattileGroundVisitLog"), [news.alliName, news.playerName, news.uid]);
            var str = "";
            if (this.isData && data.info.type == 1) {
                str = LanguageManager.getlocal("atkracebeat");
            }
            else {
                str = LanguageManager.getlocal("atkraceAnnihilation");
            }
            var currName = Config.ServantCfg.getServantItemById(data.info.sid).name;
            if (data.info.streak && data.info.streak >= 3) {
                var desStr = "acBattleStraight";
                if (data.info.atype && data.info.atype == 2) {
                    desStr = "acBattleStraight_1";
                }
                else if (data.info.atype && data.info.atype == 4) {
                    desStr = "acBattleStraight_4"; //追杀  全歼了
                }
                textStr += LanguageManager.getlocal(desStr, [currName, str, data.info.uname2, data.info.fightnum, data.info.streak]);
            }
            else {
                var desStr2 = "acBattleDescription";
                if (data.info.atype && data.info.atype == 2) {
                    desStr2 = "acBattleDescription_1";
                }
                else if (data.info.atype && data.info.atype == 4) {
                    desStr2 = "acBattleStraight_4_2"; //追杀 
                }
                textStr += LanguageManager.getlocal(desStr2, [currName, str, data.info.uname2, data.info.fightnum]);
            }
            this._bottomLogTxt.text = textStr;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, this._bottomLogTxt, this._bottomBg, [10, 0]);
            // if(this._nameTxt)
            // {
            // 	this._nameTxt.text = this._atkraceInfoVoList[0].info.name;
            // } 
        }
    };
    //底部
    AcBattleGroundMapView.prototype.initBottom = function () {
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
        var tipTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_WHITE);
        tipTxt.lineSpacing = 3;
        tipTxt.width = 480;
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tipTxt, bottom);
        view._bottomLogTxt = tipTxt;
    };
    AcBattleGroundMapView.prototype.showMoreHandle = function () {
        //test---
        // this.showCalPanel();
        // if(this._stopTouch){
        //     return;
        // } 
        if (this.touchBoo) {
            if (this.vo.isActyEnd()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
                return;
            }
            this._isShowMore = !this._isShowMore;
            this._bottomLogTxt.visible = !this._isShowMore;
            if (this._isShowMore == true) {
                this._moreArrow.scaleY = -1;
                this._moreArrow.y += this._moreArrow.height;
                NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST, { activeId: this.acTivityId });
            }
            else {
                this._moreArrow.scaleY = 1;
                this._moreArrow.y -= this._moreArrow.height;
                this.closeList();
            }
        }
    };
    AcBattleGroundMapView.prototype.killBtnListener = function () {
        if (!this._lastChargeLog) {
            return;
        }
        //追杀            
        if (this._stopTouch) {
            return;
        }
        if (!this.vo.getAttendQuality()) {
            App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundNoAttend")));
            return;
        }
        if (this.vo.isActyEnd()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
            return;
        }
        if (this.vo.getCurperiod() == 3) {
            App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
            return;
        }
        if (!this.vo.getJoinIn()) {
            App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundTip4")));
            return;
        }
        var tmp = [];
        tmp.uid = this._lastChargeLog.uid;
        tmp.battleground = true;
        tmp.code = this.code;
        tmp.type = 3;
        AtkraceChallengeItem.data = tmp;
        // AtkraceChallengeItem.data.type = 3;
        // tmp.type=3;//追杀
        // AtkraceChallengeItem.data = tmp;
        ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECHALLENGEVIEW);
    };
    AcBattleGroundMapView.prototype.challBtnListener = function () {
        if (this._stopTouch) {
            return;
        }
        if (!this.vo.getAttendQuality()) {
            App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundNoAttend")));
            return;
        }
        //挑战
        if (this.vo.isActyEnd()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
            return;
        }
        if (this.vo.getCurperiod() == 3) {
            App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
            return;
        }
        if (!this.vo.getJoinIn()) {
            App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundTip4")));
            return;
        }
        // tmp.type=1;//挑战
        // AtkraceChallengeItem.data = tmp;
        var tmp = [];
        tmp.uid = this._lastChargeLog.uid;
        tmp.battleground = true;
        tmp.code = this.code;
        tmp.type = 1;
        AtkraceChallengeItem.data = tmp;
        // AtkraceChallengeItem.data.type = 1;
        ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECHALLENGEVIEW);
    };
    AcBattleGroundMapView.prototype.showList = function () {
        if (!this.moveContainer) {
            this._currMaskBmp = BaseBitmap.create("public_9_viewmask");
            this._currMaskBmp.width = GameConfig.stageWidth;
            this._currMaskBmp.height = GameConfig.stageHeigth - 86;
            this._currMaskBmp.name = "_currMaskBmp";
            this._currMaskBmp.addTouchTap(function () { }, this);
            this.addChild(this._currMaskBmp);
            this.moveContainer = new BaseDisplayObjectContainer();
            this.moveContainer.name = "moveContainer";
            this.addChild(this.moveContainer);
            this.moreBg = BaseBitmap.create("arena_bottom_bg"); //arena_bottom_bg
            this.moreBg.width = 640;
            this.moreBg.height = GameConfig.stageHeigth - 330;
            this.moveContainer.addChild(this.moreBg);
            this._topBg = BaseBitmap.create("adult_lowbg"); //arena_bottom_bg
            this._topBg.width = 640;
            this._topBg.x = this.moreBg.x + this.moreBg.width / 2 - this._topBg.width / 2;
            this._topBg.y = this._topBg.y - this._topBg.height + 5;
            this.moveContainer.addChild(this._topBg);
            //上次挑战信息
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(""), 20, TextFieldConst.COLOR_WARN_GREEN2);
            this.moveContainer.addChild(tipTxt);
            this._moreTipTxt = tipTxt;
        }
        this._currMaskBmp.visible = true;
        var lastchargelog = this.vo.getLastChargeLog();
        this._moreTipTxt.text = LanguageManager.getlocal(this.getDefaultCn("acBattileGroundLastLog"), [lastchargelog ? lastchargelog.playerName : LanguageManager.getlocal("nothing")]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, this._moreTipTxt, this._topBg, [27, 0]);
        //最后对战的玩家信息
        if (lastchargelog) {
            // let tmp:any =[];
            // tmp.uid=lastchargelog.uid;
            // tmp.battleground = true;
            // tmp.code = this.code;
            // AtkraceChallengeItem.data = tmp;
            this._lastChargeLog = lastchargelog;
            if (!this._killBtn) {
                this._killBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "atkraceVisitTab3", this.killBtnListener, this);
                App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, this._killBtn, this._topBg, [7, 0]);
                this.moveContainer.addChild(this._killBtn);
            }
            if (!this._challBtn) {
                this._challBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "atkraceChallengeViewTitle", this.challBtnListener, this);
                App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, this._challBtn, this._topBg, [138, 0]);
                this.moveContainer.addChild(this._challBtn);
            }
        }
        // 增加 点击区域
        // this._touchBg = BaseBitmap.create("public_9_bg25");  
        // this._touchBg.width = 640;
        // this._touchBg.height =260;
        // this._touchBg.x=0;
        // this._touchBg.y=-240;
        // this._touchBg.alpha =0;
        // this._touchBg.addTouchTap(this.showMoreHandle,this);
        // this.moveContainer.addChild(this._touchBg);
        if (this.isData) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 620, this.moreBg.height - 50);
            if (!this._scrollList) {
                this._scrollList = ComponentManager.getScrollList(AcBattleGroundLogItem, this._atkraceInfoVoList, rect, this.code);
                this.moveContainer.addChild(this._scrollList);
                this._scrollList.bounces = false;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._scrollList, this._topBg, [0, this._topBg.height + 5]);
            }
            else {
                this._scrollList.refreshData(this._atkraceInfoVoList, this.code);
            }
            if (this._moveAtkracedes3) {
                this._moveAtkracedes3.visible = false;
            }
        }
        else {
            if (!this._moveAtkracedes3) {
                this._moveAtkracedes3 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes3"), 20);
                this._moveAtkracedes3.x = 250;
                this._moveAtkracedes3.y = 300;
                this.moveContainer.addChild(this._moveAtkracedes3);
            }
            this._moveAtkracedes3.visible = true;
            // let atkracedes3 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes3"), 20);
        }
        this.moveContainer.y = 1270;
        this.touchBoo = false;
        //描述文字：击败门客20
        var num = this.cfg.getbeatNum();
        if (!this.listconditions) {
            var listconditions = ComponentManager.getTextField(LanguageManager.getlocal("atkracelistconditions", [num + ""]), 20);
            listconditions.x = 30;
            listconditions.name = "listconditions";
            listconditions.y = GameConfig.stageHeigth - 50;
            this.addChild(listconditions);
            this.listconditions = listconditions;
        }
        if (this.listconditions) {
            this.listconditions.visible = false;
        }
        if (this.describeTxt) {
            this.describeTxt.visible = false;
            this._nameTxt.visible = false;
        }
        this.runText();
        egret.Tween.get(this.moveContainer).to({ y: 250 }, 500).call(function () {
            egret.Tween.removeTweens(this.moveContainer);
            this.touchBoo = true;
            if (this.listconditions) {
                this.listconditions.visible = true;
            }
        }, this);
    };
    /**跑马灯 */
    AcBattleGroundMapView.prototype.runText = function () {
        var view = this;
        var strList = view.vo.getKillNoticeInfo();
        var lamp = this.moveContainer.getChildByName("lampContainer");
        if (lamp) {
            this.moveContainer.removeChild(lamp);
        }
        if (strList.length && view.vo.getCurperiod() == 2) {
            var laba = BaseBitmap.create('chatlaba');
            laba.x = 10;
            laba.y = -laba.height - 73;
            this.moveContainer.addChild(laba);
            var lampContainer = new LoopLamp(strList, LayoutConst.verticalCenter);
            lampContainer.name = "lampContainer";
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, lampContainer, laba, [laba.width, 0]);
            lampContainer.mask = new egret.Rectangle(0, -4, GameConfig.stageWidth, 26);
            this.moveContainer.addChild(lampContainer);
        }
        // for (var i = 0; i < this._log.length; i++) {
        // 	let logItem = this._log[i];
        // 	let rewardVo = GameData.formatRewardItem(logItem[2])[0];
        // 	let str = LanguageManager.getlocal("acWealthComingViewRunTxt", [logItem[0], rewardVo.name, rewardVo.num]);
        // 	strList.push(str);
    };
    AcBattleGroundMapView.prototype.closeList = function () {
        this.touchBoo = false;
        if (this.listconditions) {
            this.listconditions.visible = false;
        }
        if (this.describeTxt) {
            this.describeTxt.visible = true;
            this._nameTxt.visible = true;
        }
        if (this.moveContainer) {
            egret.Tween.get(this.moveContainer).to({ y: 1270 }, 500).call(function () {
                this.touchBoo = true;
                // egret.Tween.removeTweens(this.moveContainer);
                // this.moveContainer.dispose();
                // this.moveContainer = null;
                // if(this._scrollList){
                // this._scrollList = null;
                // }
            }, this);
        }
        if (this._currMaskBmp) {
            this._currMaskBmp.visible = false;
            // this._currMaskBmp.parent.removeChild(this._currMaskBmp);
            // this._currMaskBmp.dispose();
            // this._currMaskBmp =null;
        }
        // if(this._touchBg&&this._touchBg.parent)
        // {
        // this._touchBg.parent.removeChild(this._touchBg);
        // this._touchBg.dispose();
        // this._touchBg =null;
        // }
        if (this._bottomLogTxt) {
            this._bottomLogTxt.visible = true;
        }
    };
    AcBattleGroundMapView.prototype.visitHandle = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEVISITVIEW);
    };
    AcBattleGroundMapView.prototype.chatBgClickHandler = function () {
        if (this._stopTouch) {
            return;
        }
        if (!this.vo.getAttendQuality()) {
            App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundNoAttend")));
            return;
        }
        if (Api.switchVoApi.checkCloseChat()) {
            App.CommonUtil.showTip("很抱歉，聊天系统维护中");
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.CHATACTIVITYCROSSVIEW, { activeID: this.vo.aidAndCode });
    };
    //展现统计警告
    AcBattleGroundMapView.prototype.showCalPanel = function () {
        var msg = LanguageManager.getlocal("acBattleGroundViewIsStartCal");
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "itemUseConstPopupViewTitle",
            msg: msg,
            callback: this.calPanelConfirmCallback,
            handler: this,
            needCancel: false,
        });
    };
    AcBattleGroundMapView.prototype.calPanelConfirmCallback = function () {
        ViewController.getInstance().hideAllView();
        ViewController.getInstance().openView("AcBattleGroundView", this.code);
    };
    AcBattleGroundMapView.prototype.tick = function () {
        if (this._curRound == -1) {
            this._curRound = this.vo.getCurRound();
        }
        if (this._curRound > 0) {
            if (this.vo.versionst + this.cfg.weedOut[this._curRound - 1].time == GameData.serverTime) {
                //开始结算
                this.showCalPanel();
            }
        }
        var view = this;
        view._randBtn.visible = view.vo.getAttendQuality() && view.vo.getJoinIn();
        if (this._chatTxt) {
            var showStr = Api.chatVoApi.getLastAcCrossMessage();
            if (!showStr) {
                showStr = "";
            }
            else {
                var zonename = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, showStr.zoneid);
                showStr = LanguageManager.getlocal('acCrossServeDes', [zonename]) + showStr.sendername + ":" + (showStr.content.message.length > 15 ? (showStr.content.message.substring(0, 16) + "...") : showStr.content.message);
            }
            this._chatTxt.text = showStr;
        }
        var curPeriod = view.vo.getCurperiod();
        // if(curPeriod == 4){
        //     App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundCDTxt5-${view.code}`));
        //     view.hide();
        //     return;
        // }
        if (curPeriod !== view._period) {
            this._needFresh = true;
            this.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND, { activeId: view.acTivityId });
        }
        view.freshText();
        view._period = curPeriod;
        if (this._countDownTime > 0) {
            this._countDownTime--;
            if (this._countDownTime <= 0) {
                this._randBtn.setText(this.getDefaultCn("acBattleRoundRandFight"));
                this._curFightType = 1;
            }
            else {
                this._randBtn.setText(this.getCountTimeStr(), false);
            }
        }
        else {
        }
    };
    AcBattleGroundMapView.prototype.initTopTip = function () {
        var _this = this;
        var view = this;
        var code = view.code;
        var tipBg = BaseBitmap.create(this.getDefaultRes("battlegrounddescbg"));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipBg, view.titleBg, [0, view.titleBg.height]);
        view.addChild(tipBg);
        view._cdBg = tipBg;
        tipBg.addTouchTap(function () {
            if (_this._stopTouch) {
                return;
            }
            //排行榜界面
            ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLERANKPOPUPVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        var tipTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.lineSpacing = 5;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        view.addChild(tipTxt);
        view._cdText = tipTxt;
        view.freshText();
    };
    AcBattleGroundMapView.prototype.freshText = function () {
        var view = this;
        var code = view.code;
        var period = view.vo.getCurperiod();
        //提示板信息
        var cd = App.DateUtil.getFormatBySecond(view.vo.getCountCD());
        var str = this.getDefaultCn("acBattleRoundCDTxt" + period); //`acBattleRoundCDTxt${period}-${code}`;
        var param = [];
        var myRank = view.vo.getMyRank();
        if (view.vo.isWaiting()) {
            view._cdText.text = LanguageManager.getlocal(this.getDefaultCn("acBattleGroundTip8"));
        }
        else {
            switch (period) {
                case 1:
                    param.push(cd);
                    break;
                case 2:
                    param.push(cd);
                    var need = view.cfg.weedOut[view.vo.getCurRound() - 1].btmLine;
                    if (period == 2 && view.cfg.weedOut.length == view.vo.getCurRound()) {
                        //最后一轮
                        str = this.getDefaultCn("acBattleRoundCDTxt4"); //`acBattleRoundCDTxt4-${code}`;
                    }
                    else {
                        param.push(need);
                    }
                    if (view.vo.getAttendQuality()) {
                        //没被淘汰
                        if (view.vo.getJoinIn()) {
                            param.push(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundRank"), [myRank.toString()]));
                        }
                        else {
                            param.push(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundCDTxt5")));
                        }
                    }
                    else {
                        param.push(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundNoAttend")));
                    }
                    break;
                case 3:
                case 4:
                    str = this.getDefaultCn("acBattleRoundCDTxt3"); //`acBattleRoundCDTxt3-${code}`;
                    param.push(view.vo.getWinnerAlliance().name);
                    var tyle = 1;
                    if (view.vo.getWinnerAlliance().mid == Number(Api.playerVoApi.getPlayerAllianceId())) {
                        tyle = 9;
                    }
                    else if (view.vo.getAttendQuality()) {
                        tyle = 7;
                    }
                    else {
                        tyle = 8;
                    }
                    param.push(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundCDTxt" + tyle)));
                    break;
            }
            view._cdText.text = LanguageManager.getlocal(str, param);
        }
        // view._cdBg.width = view._cdText.textWidth + 30;
        // view._cdBg.height = view._cdText.textHeight + 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._cdBg, view.titleBg, [0, view.titleBg.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._cdText, view._cdBg, [0, -5]);
    };
    AcBattleGroundMapView.prototype.atkraceCallback = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        view._randClick = false;
        if (data) {
            if (data.bgstats) {
                App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundBgStasTip" + data.bgstats)));
            }
            else {
                if (data.waiting) {
                    view.vo.setWaiting(data.waiting);
                    App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundTip8")));
                }
                else {
                    view.vo.setWaiting(0);
                    if (typeof data.fightflag !== 'undefined' && !data.fightflag) {
                        this._fightflag = false;
                        App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundServantNeed"), [view.cfg.servantLv.toString()]));
                    }
                    else {
                        this._fightflag = true;
                        var myAtkInfo = view.vo.getMyFightInfo();
                        var isHaveServant = myAtkInfo.mesid && myAtkInfo.mesid.sid;
                        view.vo.setRaceInfo(data.battleground);
                        view.resetInfo();
                        //1可以随机挑战 2已经发生战斗没结束 继续战斗 3cd中 4次数耗尽可恢复 5次数耗尽不可恢复
                        switch (this._curFightType) {
                            case 1:
                            case 2:
                                if (data.newRound && data.newRound == 1) {
                                    App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundTip1")));
                                    view.resetInfo();
                                    return;
                                }
                                if (myAtkInfo.handle == 1 || myAtkInfo.atype != 1) {
                                    ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEGROUNDARRESTVIEW, {
                                        aid: this.aid,
                                        code: this.code
                                    });
                                }
                                else {
                                    myAtkInfo = view.vo.getMyFightInfo();
                                    var nameStr = myAtkInfo.getFName();
                                    ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDAGREEPOPUPDIALOG, {
                                        type: 1,
                                        name: nameStr,
                                        sid: myAtkInfo.mesid.sid,
                                        aid: this.aid,
                                        code: this.code
                                    });
                                    //ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEAGREEPOPUPVIEW,{type:1 , name: nameStr ,sid:myAtkInfo.mesid.sid});
                                }
                                break;
                            case 3:
                                App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundContinueFightTip1")));
                                break;
                            case 4:
                                this.clickDialog();
                                break;
                            case 5:
                                App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundContinueFightTip2")));
                                break;
                        }
                    }
                }
            }
        }
    };
    //重置信息
    AcBattleGroundMapView.prototype.resetInfo = function () {
        // this.closeList();
        var view = this;
        if (!view._randBtn) {
            return;
        }
        this._countDownTime = 0;
        //是否无法出战
        var textStr = '';
        if (this._fightflag == false) {
            textStr = LanguageManager.getlocal("atkraceNoServant");
        }
        else {
            //检查是否已有门客
            var myAtkInfo = this.vo.getMyFightInfo();
            if (myAtkInfo && myAtkInfo.mesid && myAtkInfo.mesid.sid) {
                //有门客
                var sid = myAtkInfo.mesid.sid;
                if (myAtkInfo.handle == 1 || myAtkInfo.atype != 1) {
                    textStr = LanguageManager.getlocal(this.getDefaultCn("acBattleGroundContinueFight"));
                    this._curFightType = 2;
                }
                else {
                    textStr = LanguageManager.getlocal(this.getDefaultCn("acBattleRoundRandFight"));
                    this._curFightType = 1;
                    // textStr	= LanguageManager.getlocal("arenaServantSpeak1",[LanguageManager.getlocal("servant_name"+myAtkInfo.mesid.sid)]);
                }
                //1可以随机挑战 2已经发生战斗没结束 继续战斗 3cd中 4次数耗尽
            }
            else {
                //出战次数
                var maxCount = view.cfg.dailyNum;
                var myInfo = this.vo.getMyInfo();
                var myNum = myInfo.num;
                if (myNum >= maxCount) {
                    //次数已满
                    var lv60plus = Api.servantVoApi.getServantCountLevel60Plus();
                    var extraCoefficient = view.cfg.getParameter1();
                    var extraMax = Math.floor(lv60plus / extraCoefficient);
                    if (myInfo.extranum >= extraMax) {
                        //没次数了
                        //1可以随机挑战 2已经发生战斗没结束 继续战斗 3cd中 4次数耗尽 5次数耗尽不可恢复
                        this._curFightType = 5;
                        textStr = LanguageManager.getlocal(this.getDefaultCn("acBattleGroundTip2"));
                        // wordsBg.addTouchTap(this.clickDialog2,this);
                    }
                    else {
                        textStr = LanguageManager.getlocal(this.getDefaultCn("acBattleGroundTip2"));
                        //textStr = LanguageManager.getlocal("arenaAddNum",[myInfo.extranum.toString(),extraMax.toString()]);
                        //1可以随机挑战 2已经发生战斗没结束 继续战斗 3cd中 4次数耗尽 5次数耗尽不可恢复
                        this._curFightType = 4;
                        // wordsBg.addTouchTap(this.clickDialog,this);
                    }
                }
                else {
                    //倒计时
                    this._countDownTime = myInfo.lasttime + Config.AtkraceCfg.getIntervalTime() - GameData.serverTime;
                    if (this._countDownTime <= 0) {
                        this._curFightType = 1;
                        textStr = LanguageManager.getlocal(this.getDefaultCn("acBattleRoundRandFight"));
                    }
                    else {
                        this._curFightType = 3;
                        textStr = this.getCountTimeStr();
                    }
                }
            }
        }
        if (this._randBtn) {
            this._randBtn.setText(textStr, false);
            this._randBtn.setGray(this._curFightType == 5);
        }
    };
    AcBattleGroundMapView.prototype.getCountTimeStr = function () {
        var time = this._countDownTime;
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    AcBattleGroundMapView.prototype.clickDialog2 = function () {
        App.CommonUtil.showTip(LanguageManager.getlocal("atkrace_extro_no_times"));
    };
    AcBattleGroundMapView.prototype.clickDialog = function () {
        var itemId = this.cfg.getFightAdd();
        var needNum = 1;
        var itemVo = Api.itemVoApi.getItemInfoVoById(Number(itemId));
        var numItem = 0;
        if (itemVo) {
            numItem = itemVo.num;
        }
        var message = LanguageManager.getlocal("atkRace_buyChallenge", [LanguageManager.getlocal("itemName_" + itemId)]);
        var mesObj = {
            confirmCallback: this.buyChallenge,
            handler: this,
            icon: "itemicon" + itemId,
            iconBg: Config.ItemCfg.getItemCfgById(itemId).iconBg,
            num: numItem,
            useNum: needNum,
            msg: message,
            id: itemId
        };
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, mesObj);
    };
    AcBattleGroundMapView.prototype.buyChallenge = function () {
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_USEEXTRA, { activeId: this.acTivityId });
    };
    AcBattleGroundMapView.prototype.challengeCallback = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        if (data) {
            if (data.bgstats) {
                App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundBgStasTip" + data.bgstats)));
                ViewController.getInstance().hideView(ViewConst.POPUP.ATKRACECHALLENGEVIEW);
                ViewController.getInstance().hideView(ViewConst.POPUP.ACBATTLEGROUNDSELECTVIEW);
                NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST, { activeId: view.acTivityId });
            }
            else {
                if (data.waiting) {
                    view.vo.setWaiting(data.waiting);
                    App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundTip8")));
                }
                else {
                    view.vo.setWaiting(0);
                    view.vo.setRaceInfo(data.battleground);
                    view.resetInfo();
                    if (AtkraceChallengeItem.data && AtkraceChallengeItem.data.type) {
                        if (this._isShowMore) {
                            this.moveContainer.y = 1270;
                            this._currMaskBmp.visible = false;
                            this._isShowMore = false;
                            this.closeList();
                            this._moreArrow.scaleY = 1;
                            this._moreArrow.y = GameConfig.stageHeigth - 94 / 2 - this._moreArrow.height / 2; // this._moreArrow.height;
                        }
                        var myAtkInfo = view.vo.getMyFightInfo();
                        var isHaveServant = myAtkInfo.mesid && myAtkInfo.mesid.sid;
                        if (isHaveServant) {
                            ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEGROUNDARRESTVIEW, {
                                aid: this.aid,
                                code: this.code
                            });
                        }
                        else {
                            NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUNDINDEX, { activeId: view.acTivityId });
                        }
                    }
                    // this.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUNDINDEX,{activeId:view.acTivityId});
                    ViewController.getInstance().hideView(ViewConst.POPUP.ATKRACECHALLENGEVIEW);
                    ViewController.getInstance().hideView(ViewConst.POPUP.ACBATTLEGROUNDSELECTVIEW);
                    ViewController.getInstance().hideView(ViewConst.POPUP.ACBATTLEGROUNDALLIINFOVIEW);
                }
            }
        }
    };
    AcBattleGroundMapView.prototype.battleEnd = function () {
        var view = this;
        view.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND, { activeId: view.acTivityId });
        view.resetInfo();
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST, { activeId: view.acTivityId });
    };
    AcBattleGroundMapView.prototype.moveToMyAlliance = function () {
        ViewController.getInstance().openView("AcBattleGroundDetailsView", {
            aid: this.aid,
            code: this.code,
            index: 1
            // type: "alliance"
        });
        //跳转至详情-我的帮会
    };
    AcBattleGroundMapView.prototype.handleCallback = function (evt) {
        var view = this;
        if (evt.data.data.data) {
            if (evt.data.data.data.battleground) {
                this.vo.setRaceInfo(evt.data.data.data.battleground);
                this.resetInfo();
            }
            ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEGROUNDARRESTVIEW, {
                aid: this.param.data.aid,
                code: this.param.data.code
            });
        }
    };
    AcBattleGroundMapView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_BATTLEGROUND_BATTLEEND, this.battleEnd, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUNDINDEX), view.atkraceCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_KILL), view.challengeCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST), view.useCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_REVENGE), view.challengeCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_CHALLENGE), view.challengeCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_HANDLE), view.handleCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_USEEXTRA), view.atkraceCallback, view);
        // this._bgScrollView.removeMoveCompleteCallback();
        // TickManager.removeTick(this.tick,this);
        if (view._bgScrollView) {
            egret.Tween.removeTweens(view._bgScrollView);
        }
        view._bgGroup = null;
        view._period = 1;
        view._cdBg.removeTouchTap();
        view._cdBg = null;
        view._cdText = null;
        view._chatTxt = null;
        view._bottomBg = null;
        view.touchBoo = true;
        view.moreBg = null;
        view.describeTxt = null;
        view.moveContainer = null;
        view._moreArrow = null;
        view._isShowMore = false;
        view._touchBg = null;
        view._currMaskBmp = null;
        view.isData = false;
        view.listconditions = null;
        view._scrollList = null;
        view._atkraceInfoVoList = [];
        view._nameTxt = null;
        view._bottomLogTxt = null;
        view._bgScrollView = null;
        view._stopTouch = false;
        view._leftArrow = null;
        view._rightArrow = null;
        view._needFresh = false;
        view._randClick = false;
        view._randBtn = null;
        this._topBg = null;
        this._moreTipTxt = null;
        this._killBtn = null;
        this._challBtn = null;
        this._moveAtkracedes3 = null;
        this._curRound = -1;
        this._lastChargeLog = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundMapView;
}(CommonView));
__reflect(AcBattleGroundMapView.prototype, "AcBattleGroundMapView");
