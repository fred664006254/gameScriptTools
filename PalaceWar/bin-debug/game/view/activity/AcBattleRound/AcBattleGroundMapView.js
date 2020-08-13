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
        _this._cheerBtn = null;
        _this.tmpX = 0;
        _this.mapPos = {
            1: { x: 96, y: 249, width: 180, height: 116 },
            2: { x: 46, y: 466, width: 54, height: 54 },
            3: { x: 201, y: 553, width: 54, height: 54 },
            4: { x: 46, y: 753, width: 54, height: 54 },
            5: { x: 329, y: 383, width: 54, height: 54 },
            6: { x: 409, y: 239, width: 54, height: 54 },
            7: { x: 451, y: 520, width: 54, height: 54 },
            8: { x: 434, y: 746, width: 54, height: 54 },
            9: { x: 689, y: 383, width: 184, height: 124 },
            10: { x: 666, y: 613, width: 54, height: 54 },
            11: { x: 703, y: 803, width: 54, height: 54 },
            12: { x: 894, y: 267, width: 54, height: 54 },
            13: { x: 959, y: 429, width: 54, height: 54 },
            14: { x: 1005, y: 590, width: 54, height: 54 },
            15: { x: 872, y: 702, width: 54, height: 54 },
            16: { x: 1035, y: 782, width: 236, height: 132 },
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
    AcBattleGroundMapView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
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
        return "acBattleRoundViewTitle-" + this.getUiCode();
    };
    AcBattleGroundMapView.prototype.getUIcode = function () {
        var code = this.code;
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
                ;
        }
        return code;
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
        var code = this.getUiCode();
        ret = ret.concat([
            "battlegroundbg-" + code, "battleground1-" + code, "battleground2-" + code, "battleground3-" + code, "battleground4-" + code, "battlegroundmap-" + code,
            "servant_mask", "arena_bottom_bg", "battlegrounddestroy", "battlegroundsmoke", "battlegrounddestroy",
            "battlegroundsmapsmoke", "battlegroundsmoke2_", "battlegroundsmoke3_", "battlegroundsmoke4_", "arena_arrow", "arena_more_down", "arena_more", "chatlaba", "rankinglist_line", "rankinglist_rankbg",
            "battlegroundfire" + this.getUIcode() + "_"
        ]);
        return ret;
    };
    // 背景图名称
    AcBattleGroundMapView.prototype.getBgName = function () {
        return 'battlegroundbg-' + this.getUiCode();
    };
    AcBattleGroundMapView.prototype.getRuleInfo = function () {
        if (Api.switchVoApi.checkServantRefuseBattle() && this.getUiCode() == '1' && Api.switchVoApi.checkOpenAtkracegChangegpoint()) {
            return "acBattleRoundRule-1_newRule_withOpenRefusal";
        }
        return Api.switchVoApi.checkOpenAtkracegChangegpoint() ? ("acBattleRoundRule-" + this.getUiCode() + "_newRule") : ("acBattleRoundRule-" + this.getUiCode());
    };
    AcBattleGroundMapView.prototype.getRuleInfoParam = function () {
        var tmp = [];
        if (Api.switchVoApi.checkOpenAtkracegChangegpoint()) {
            tmp.push(this.cfg.lowestScore.toString());
        }
        tmp.push(this.cfg.disableTime.toString());
        return tmp;
    };
    Object.defineProperty(AcBattleGroundMapView.prototype, "mapNum", {
        //获取此次活动需要创建的地图数目
        get: function () {
            var servernum = this.vo.getMapLenth();
            var mapNum = Math.ceil(servernum / 16);
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
        this.viewBg = BaseBitmap.create(bgName); //`battlegroundmask-${this.code}`
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
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, map, bggroup, [i * this.mapWidth, 0], true);
                bggroup.addChild(map);
                this.viewBg.x = map.x + map.width;
                this.viewBg.y = map.y;
                var _loop_1 = function (j) {
                    if (Number(j) > 8) {
                        return "break";
                    }
                    var unit = this_1.mapPos[j];
                    var idx = i * 16 + Number(j);
                    var info = this_1.vo.getAllInfoById(idx);
                    if (!info) {
                        return "continue";
                    }
                    var mask1 = BaseBitmap.create("battleground" + info.period + "-" + this_1.getUiCode());
                    mask1.anchorOffsetX = mask1.width / 2;
                    mask1.anchorOffsetY = mask1.height / 2;
                    mask1.x = map.x + unit.x + mask1.anchorOffsetX;
                    mask1.y = map.y + unit.y + mask1.anchorOffsetY;
                    mask1.name = "alliancebuild" + info.alliId;
                    // let cheerbg = BaseBitmap.create(`battlegroundcheericon-${this.getUIcode()}`);
                    // cheerbg.setScale(0.7);
                    // cheerbg.name = `alliancecheer${info.alliId}`;
                    // let cheertxt = ComponentManager.getBitmapText(info.cheerlv, `crit_fnt`);
                    // cheertxt.name = `alliancecheertxt${info.alliId}`;
                    // if(this.vo.isAlliOut(info.alliId)){
                    //     App.DisplayUtil.changeToGray(cheerbg);
                    //     App.DisplayUtil.changeToGray(cheertxt);
                    // }
                    if (Number(j) == 1) {
                        var smoke = ComponentManager.getCustomMovieClip("battlegroundsmapsmoke", 10, 70);
                        smoke.width = 74;
                        smoke.height = 176;
                        smoke.anchorOffsetX = smoke.width / 2;
                        smoke.anchorOffsetY = smoke.height / 2;
                        smoke.x = 349;
                        smoke.y = map.y + 240;
                        smoke.setScale(2);
                        smoke.rotation = 17;
                        bggroup.addChild(smoke);
                        smoke.name = 'mapsmoke';
                        smoke.playWithTime(0);
                    }
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
                    }, this_1, null, true);
                    bggroup.addChild(mask1);
                    //信息
                    var infobg = BaseBitmap.create("battlegroundallibg-" + this_1.getUiCode());
                    infobg.name = "alliancebg" + info.alliId;
                    var allinameTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
                    allinameTxt.name = "allianceTxt" + info.alliId;
                    allinameTxt.lineSpacing = 5;
                    allinameTxt.textAlign = egret.HorizontalAlign.CENTER;
                    bggroup.addChild(infobg);
                    bggroup.addChild(allinameTxt);
                    // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cheerbg, mask1, [-20,85]);
                    // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cheertxt, cheerbg, [0, 10]);
                    // bggroup.addChild(cheerbg);
                    // bggroup.addChild(cheertxt);
                    // if(info.cheerlv > 0 && !this.vo.isAlliOut(info.alliId)){      
                    //     let fire = ComponentManager.getCustomMovieClip(`battlegroundfire${this.getUIcode()}_`, 9);
                    //     fire.name = `fire${info.alliId}`;
                    //     fire.width = 311;
                    //     fire.height = 416;
                    //     fire.anchorOffsetX = fire.width / 2;
                    //     fire.anchorOffsetY = fire.height / 2;
                    //     fire.setScale(0.5);
                    //     fire.playWithTime(-1);
                    //     App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, fire, cheerbg, [0,0]);
                    //     bggroup.addChild(fire);
                    // }
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
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, map, view._bgGroup, [i * this.mapWidth, 0], true);
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
                        view.removeCity(i * 16 + Number(j));
                    }
                }
            }
        }
        var mapsmoke = view._bgGroup.getChildByName("mapsmoke");
        if (mapsmoke) {
            view._bgGroup.setChildIndex(mapsmoke, 99999);
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
                var unit = view.mapPos[j];
                var idx = mapId * 16 + Number(j);
                var info = view.vo.getAllInfoById(idx);
                if (!info) {
                    return "continue";
                }
                var mask1 = view._bgGroup.getChildByName("alliancebuild" + info.alliId);
                // let cheerbg : any = view._bgGroup.getChildByName(`alliancecheer${info.alliId}`);
                // let cheertxt : any = view._bgGroup.getChildByName(`alliancecheertxt${info.alliId}`);
                if (!mask1) {
                    mask1 = BaseBitmap.create("battleground" + info.period + "-" + this_2.getUiCode());
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
                        var infobg = BaseBitmap.create("battlegroundallibg-" + this_2.getUiCode());
                        infobg.name = "alliancebg" + info.alliId;
                        var allinameTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
                        allinameTxt.name = "allianceTxt" + info.alliId;
                        allinameTxt.lineSpacing = 5;
                        allinameTxt.textAlign = egret.HorizontalAlign.CENTER;
                        view._bgGroup.addChild(infobg);
                        view._bgGroup.addChild(allinameTxt);
                        // if(!cheertxt){
                        //     cheerbg = BaseBitmap.create(`battlegroundcheericon-${this.getUIcode()}`);
                        //     cheerbg.setScale(0.7);
                        //     App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cheerbg, mask1, [-20,85]);
                        //     cheerbg.name = `alliancecheer${info.alliId}`;
                        //     cheertxt = ComponentManager.getBitmapText(info.cheerlv, `crit_fnt`);
                        //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cheertxt, cheerbg, [0, 10]);
                        //     cheertxt.name = `alliancecheertxt${info.alliId}`;
                        //     if(view.vo.isAlliOut(info.alliId)){
                        //         App.DisplayUtil.changeToGray(cheerbg);
                        //         App.DisplayUtil.changeToGray(cheertxt);
                        //     }
                        //     view._bgGroup.addChild(cheerbg);
                        //     view._bgGroup.addChild(cheertxt);
                        //}
                        // let fire = view._bgGroup.getChildByName(`fire${info.alliId}`);
                        // if(info.cheerlv > 0 && !fire && !view.vo.isAlliOut(info.alliId)){
                        //     let fire = ComponentManager.getCustomMovieClip(`battlegroundfire${this.getUIcode()}_`, 9);
                        //     fire.name = `fire${info.alliId}`;
                        //     fire.width = 311;
                        //     fire.height = 416;
                        //     fire.anchorOffsetX = fire.width / 2;
                        //     fire.anchorOffsetY = fire.height / 2;
                        //     fire.setScale(0.5);
                        //     fire.playWithTime(-1);
                        //     App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, fire, cheerbg, [0,0]);
                        //     view._bgGroup.addChild(fire);
                        // }
                    }
                    else {
                        mask1 = null;
                    }
                }
                var scrollLeft = 0;
                if (mask1) {
                    scrollLeft = mask1.x - mask1.anchorOffsetX;
                }
                // if(cheertxt){
                //     cheertxt.text = info.cheerlv;
                //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cheertxt, cheerbg, [0, 10]);
                // }
                if (mask1 && scrollLeft < range[1] && scrollLeft + mask1.width >= range[0]) {
                    view.changeCity(info.alliId);
                }
                else {
                    view.removeCity(info.alliId);
                }
            };
            var this_2 = this;
            for (var j in view.mapPos) {
                _loop_2(j);
            }
        }
    };
    AcBattleGroundMapView.prototype.changeCity = function (alliId) {
        var view = this;
        var info = this.vo.getAllInfoById(alliId);
        var mask1 = view._bgGroup.getChildByName("alliancebuild" + info.alliId);
        mask1.setRes("battleground" + info.period + "-" + view.getUiCode());
        var smoke = view._bgGroup.getChildByName("smoke" + info.alliId);
        var destroy = view._bgGroup.getChildByName("destroy" + info.alliId);
        if (smoke) {
            view._bgGroup.removeChild(smoke);
        }
        if (destroy) {
            egret.Tween.removeTweens(destroy);
            view._bgGroup.removeChild(destroy);
        }
        if (info.period > 1) {
            var clip = ComponentManager.getCustomMovieClip("battlegroundsmoke" + info.period + "_", 10, 70);
            clip.name = "smoke" + info.alliId;
            var tmp = [];
            switch (info.period) {
                case 2:
                    clip.width = 164;
                    clip.height = 94;
                    tmp = [-30, -8];
                    break;
                case 3:
                    clip.width = 190;
                    clip.height = 168;
                    tmp = [-2, -66];
                    break;
                case 4:
                    clip.width = 25;
                    clip.height = 33;
                    tmp = [-2, -64];
                    break;
            }
            clip.anchorOffsetX = clip.width / 2;
            clip.anchorOffsetY = clip.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clip, mask1, tmp);
            view._bgGroup.addChild(clip);
            clip.playWithTime(0);
        }
        if (info.period == 4) {
            var destroy_1 = BaseBitmap.create("battlegrounddestroy");
            destroy_1.name = "destroy" + info.alliId;
            destroy_1.anchorOffsetX = destroy_1.width / 2;
            destroy_1.anchorOffsetY = destroy_1.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, destroy_1, mask1, [-15, -13]);
            view._bgGroup.addChild(destroy_1);
            destroy_1.alpha = 0.1;
            egret.Tween.get(destroy_1, { loop: true }).to({ alpha: 0.7 }, 1000).to({ alpha: 0.1 }, 1000);
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
        var destroy = view._bgGroup.getChildByName("destroy" + alliId);
        if (smoke) {
            view._bgGroup.removeChild(smoke);
        }
        if (destroy) {
            egret.Tween.removeTweens(destroy);
            view._bgGroup.removeChild(destroy);
        }
        var infobg = view._bgGroup.getChildByName("alliancebg" + alliId);
        var allinameTxt = view._bgGroup.getChildByName("allianceTxt" + alliId);
        if (infobg) {
            view._bgGroup.removeChild(infobg);
        }
        if (allinameTxt) {
            view._bgGroup.removeChild(allinameTxt);
        }
        // let cheerbg : any = view._bgGroup.getChildByName(`alliancecheer${alliId}`);
        // let cheertxt : any = view._bgGroup.getChildByName(`alliancecheertxt${alliId}`);
        // if(cheerbg){
        //     view._bgGroup.removeChild(cheerbg);
        // }
        // if(cheertxt){
        //     view._bgGroup.removeChild(cheertxt);
        // }
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
                str = info.alliName + "\n<font color=0xff3c3c>" + LanguageManager.getlocal("acBattleRoundOut-" + view.getUiCode()) + "</font>";
                // allinameTxt.textColor = 0xff3c3c;
            }
            else if (view.vo.isChampWin() && view.vo.getWinnerAlliance().mid == Number(info.mid)) {
                str = info.alliName + "\n<font color=0x21eb39>" + LanguageManager.getlocal("acBattleGroundTip10-" + view.getUiCode()) + "</font>";
                var winImg = BaseBitmap.create("battlegroundwin-" + view.getUiCode());
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
    //
    AcBattleGroundMapView.prototype.initView = function () {
        var _this = this;
        var view = this;
        view._period = view.vo.getCurperiod();
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_BATTLEGROUND_BATTLEEND, view.battleEnd, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_BATTLEGROUND_MAPFRESH, view.afterCheer, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_CHALLENGE), view.challengeCallback, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_REVENGE), this.challengeCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_KILL), view.challengeCallback, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST), view.useCallback, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUNDINDEX), view.atkraceCallback, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_HANDLE), view.handleCallback, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_USEEXTRA), view.atkraceCallback, view);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var code = view.getUiCode();
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST, { activeId: view.acTivityId });
        view.initTopTip();
        //底部
        var bottomBg = BaseBitmap.create("battlegroundbottombg-" + code);
        bottomBg.height = 86;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);
        view._bottomBg = bottomBg;
        //聊天
        var chatbg = null;
        if (1) {
            //跨服聊天消息
            chatbg = BaseBitmap.create("battlegroundbottomchatbg-" + view.getUiCode());
            chatbg.width = GameConfig.stageWidth;
            chatbg.x = 0;
            chatbg.y = bottomBg.y - 25;
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
            var emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr);
            if (emoticonStr) {
                showStr = emoticonStr;
            }
            this._chatTxt = ComponentManager.getTextField(showStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
            this._chatTxt.width = 480;
            this._chatTxt.height = 20;
            this.setLayoutPosition(LayoutConst.leftverticalCenter, this._chatTxt, chatbg, [chatIcon.width + 5, 0]);
            this.addChild(this._chatTxt);
        }
        var detailbtn = ComponentManager.getButton("battlegrounddetail-" + view.getUiCode(), '', function () {
            if (view._stopTouch) {
                return;
            }
            if (_this.vo.isStart == false) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            else {
                ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEDETAILSVIEW, {
                    aid: view.aid,
                    code: view.code
                });
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, detailbtn, chatbg, [0, chatbg.height]);
        view.addChild(detailbtn);
        var cheerbtn = ComponentManager.getButton("battlegroundguess-" + view.getUiCode(), '', function () {
            if (view._stopTouch) {
                return;
            }
            if (_this.vo.isStart == false) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            else {
                ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEGROUNDCHEERVIEW, {
                    aid: view.aid,
                    code: view.code
                });
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, cheerbtn, detailbtn, [0, detailbtn.height + 10]);
        view.addChild(cheerbtn);
        view._cheerBtn = cheerbtn;
        cheerbtn.visible = !view.vo.getAttendQuality();
        if (view.vo.getRedPot2()) {
            App.CommonUtil.addIconToBDOC(cheerbtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(cheerbtn);
        }
        var logbtn = ComponentManager.getButton("battlegroundlog-" + view.getUiCode(), '', function () {
            if (view._stopTouch) {
                return;
            }
            //打开详情界面
            ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDVISITVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, logbtn, chatbg, [0, chatbg.height]);
        view.addChild(logbtn);
        view._logBtn = logbtn;
        var randBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acBattleRoundRandFight-" + view.getUiCode(), function () {
            if (view._stopTouch) {
                return;
            }
            if (!view.vo.getAttendQuality()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNoAttend-" + code));
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
                App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundTip4-" + view.getUiCode()));
                return;
            }
            if (Api.servantVoApi.getServantCountLevel60Plus() == 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundTip24-1"));
                return;
            }
            if (view._randClick) {
                return;
            }
            view._randClick = true;
            //随机挑战
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUNDINDEX, { activeId: view.acTivityId });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, randBtn, chatbg, [0, chatbg.height + 15]);
        view.addChild(randBtn);
        view._randBtn = randBtn;
        randBtn.visible = view.vo.getAttendQuality() && view.vo.getJoinIn();
        view.initBottom();
        view.resetInfo();
        //左右翻页
        var leftArrow = ComponentManager.getButton("battlegroundmaparrow-" + view.getUiCode(), '', function () {
            if (view._stopTouch) {
                return;
            }
            var startX = Math.max(view._bgScrollView.scrollLeft - GameConfig.stageWidth / 2, 0);
            egret.Tween.get(view._bgScrollView).to({ scrollLeft: startX }, 1000).call(function () {
                view._stopTouch = false;
                view._leftArrow.visible = view._bgScrollView.scrollLeft > 0;
                egret.Tween.removeTweens(view._bgScrollView);
            }, view);
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, leftArrow, view);
        view._leftArrow = leftArrow;
        leftArrow.visible = false;
        view.addChild(leftArrow);
        var rightArrow = ComponentManager.getButton("battlegroundmaparrow-" + view.getUiCode(), '', function () {
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
        rightArrow.scaleX = -1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rightArrow, view);
        view._rightArrow = rightArrow;
        view.addChild(rightArrow);
        //定位
        for (var i = 0; i < this.mapNum; ++i) {
            for (var j in this.mapPos) {
                var unit = this.mapPos[j];
                var idx = i * 16 + Number(j);
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
            view._bgScrollView.scrollLeft = tmp;
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
            if (this._atkraceInfoVoList.length > 0) {
                this.isData = true;
            }
            else {
                this.isData = false;
            }
            this.refreshText();
            if (this._isShowMore) {
                if (this._scrollList) {
                    this._scrollList.refreshData(this._atkraceInfoVoList, this.code);
                }
                else {
                    this.showList();
                }
            }
            if (this.listconditions) {
                this.listconditions.visible = false;
            }
        }
        else {
            this.isData = false;
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
            var textStr = LanguageManager.getlocal("acBattileGroundVisitLog-" + this.getUiCode(), [news.alliName, news.playerName, news.uid]);
            if (news.info.weedout) {
                textStr += "<font color=0xff3c3c>\u3010" + LanguageManager.getlocal("battlestaut3") + "\u3011</font>";
            }
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
                textStr += LanguageManager.getlocal(desStr, [LanguageManager.getlocal(data.info.support == 1 ? "actracksupport" : "actrackservant"), currName, str, data.info.uname2, data.info.fightnum, data.info.streak]);
            }
            else {
                var desStr2 = "acBattleDescription";
                if (data.info.atype && data.info.atype == 2) {
                    desStr2 = "acBattleDescription_1";
                }
                else if (data.info.atype && data.info.atype == 4) {
                    desStr2 = "acBattleStraight_4_2"; //追杀 
                }
                textStr += LanguageManager.getlocal(desStr2, [LanguageManager.getlocal(data.info.support == 1 ? "actracksupport" : "actrackservant"), currName, str, data.info.uname2, data.info.fightnum]);
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
        var tipTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.lineSpacing = 3;
        tipTxt.width = 480;
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tipTxt, bottom);
        view._bottomLogTxt = tipTxt;
    };
    AcBattleGroundMapView.prototype.showMoreHandle = function () {
        if (this._stopTouch) {
            return;
        }
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
    AcBattleGroundMapView.prototype.showList = function () {
        var _this = this;
        this.moveContainer = new BaseDisplayObjectContainer();
        this.addChild(this.moveContainer);
        this.moreBg = BaseBitmap.create("arena_bottom_bg"); //public_9_bg14
        this.moreBg.width = 640;
        this.moreBg.height = GameConfig.stageHeigth - 330;
        this.moveContainer.addChild(this.moreBg);
        var topbg = BaseBitmap.create("public_9_bg71"); //"public_9_bg21");//arena_bottom_bg
        topbg.width = 620;
        topbg.height = 80;
        topbg.x = 10;
        topbg.y = 10;
        this.moveContainer.addChild(topbg);
        //上次挑战信息
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(""), 20);
        var lastchargelog = this.vo.getLastChargeLog();
        tipTxt.text = LanguageManager.getlocal("acBattileGroundLastLog-1", [lastchargelog ? lastchargelog.playerName : LanguageManager.getlocal("nothing")]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tipTxt, topbg, [27, 0]);
        this.moveContainer.addChild(tipTxt);
        if (lastchargelog) {
            var tmp_1 = [];
            tmp_1.uid = lastchargelog.uid;
            tmp_1.battleground = true;
            tmp_1.code = this.code;
            var killBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "atkraceVisitTab3", function () {
                //追杀
                if (_this._stopTouch) {
                    return;
                }
                if (!_this.vo.getAttendQuality()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNoAttend-" + _this.getUiCode()));
                    return;
                }
                if (_this.vo.isActyEnd()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
                    return;
                }
                if (_this.vo.getCurperiod() == 3) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
                    return;
                }
                if (!_this.vo.getJoinIn()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundTip4-" + _this.getUiCode()));
                    return;
                }
                tmp_1.type = 3; //追杀
                AtkraceChallengeItem.data = tmp_1;
                ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDCHALLENGEVIEW);
            }, this);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, killBtn, topbg, [7, 0]);
            this.moveContainer.addChild(killBtn);
            var challBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "atkraceChallengeViewTitle", function () {
                if (_this._stopTouch) {
                    return;
                }
                if (!_this.vo.getAttendQuality()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNoAttend-" + _this.getUiCode()));
                    return;
                }
                //挑战
                if (_this.vo.isActyEnd()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
                    return;
                }
                if (_this.vo.getCurperiod() == 3) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
                    return;
                }
                if (!_this.vo.getJoinIn()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundTip4-" + _this.getUiCode()));
                    return;
                }
                tmp_1.type = 1; //挑战
                AtkraceChallengeItem.data = tmp_1;
                ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDCHALLENGEVIEW);
            }, this);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, challBtn, topbg, [138, 0]);
            this.moveContainer.addChild(challBtn);
        }
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
        if (this.isData) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 5, GameConfig.stageWidth, this.moreBg.height - 110);
            this._scrollList = ComponentManager.getScrollList(AcBattleGroundLogItem, this._atkraceInfoVoList, rect, this.code);
            this.moveContainer.addChild(this._scrollList);
            this._scrollList.bounces = false;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._scrollList, topbg, [0, topbg.height]);
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
        var num = this.cfg.getbeatNum();
        var listconditions = ComponentManager.getTextField(LanguageManager.getlocal("atkracelistconditions", [num + ""]), 20);
        listconditions.x = 30;
        listconditions.y = GameConfig.stageHeigth - 50;
        this.addChild(listconditions);
        this.listconditions = listconditions;
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
        var strList = view.vo.getKillNoticeInfo(this.getUiCode());
        if (strList.length && view.vo.getCurperiod() == 2) {
            var laba = BaseBitmap.create('chatlaba');
            laba.x = 10;
            laba.y = -laba.height;
            this.moveContainer.addChild(laba);
            var lampContainer = new LoopLamp(strList, LayoutConst.verticalCenter);
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
    AcBattleGroundMapView.prototype.visitHandle = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEVISITVIEW);
    };
    AcBattleGroundMapView.prototype.chatBgClickHandler = function () {
        if (this._stopTouch) {
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.CHATACTIVITYCROSSVIEW, { activeID: this.vo.aidAndCode });
    };
    AcBattleGroundMapView.prototype.tick = function () {
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
            var emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr);
            if (emoticonStr) {
                showStr = emoticonStr;
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
                this._randBtn.setText("acBattleRoundRandFight-" + view.getUiCode());
                this._curFightType = 1;
            }
            else {
                this._randBtn.setText(this.getCountTimeStr(), false);
            }
        }
        else {
        }
        if (view.vo.getRedPot2()) {
            App.CommonUtil.addIconToBDOC(view._cheerBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._cheerBtn);
        }
    };
    AcBattleGroundMapView.prototype.initTopTip = function () {
        var view = this;
        var code = view.getUiCode();
        var tipBg = BaseBitmap.create("battlegrounddescbg-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipBg, view.titleBg, [0, view.titleBg.height]);
        view.addChild(tipBg);
        view._cdBg = tipBg;
        tipBg.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEDETAILSVIEW, {
                aid: view.aid,
                code: view.code,
                type: "rank"
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
        var code = view.getUiCode();
        var period = view.vo.getCurperiod();
        //提示板信息
        //提示板信息
        var cd = App.DateUtil.getFormatBySecond(view.vo.getCountCD());
        var str = "acBattleRoundCDTxt" + view._period + "-" + code;
        var param = [];
        var myRank = view.vo.getMyRank();
        if (view.vo.isWaiting()) {
            view._cdText.text = LanguageManager.getlocal("acBattleGroundTip8-" + view.getUiCode());
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
                        str = "acBattleRoundCDTxt4-" + code;
                    }
                    else {
                        param.push(need);
                    }
                    if (view.vo.getAttendQuality()) {
                        //没被淘汰
                        if (view.vo.getJoinIn()) {
                            param.push(LanguageManager.getlocal("acBattleRoundRank-" + code, [String(myRank <= need ? 0x21eb39 : 0xff3c3c), myRank.toString()]));
                        }
                        else {
                            param.push(LanguageManager.getlocal("acBattleRoundCDTxt5-" + code));
                        }
                    }
                    else {
                        if (view.vo.getCurRound() == 1) {
                            param.push(LanguageManager.getlocal("acBattleRoundCDTxt11-" + code));
                        }
                        else {
                            if (view.vo.getCheerALlianceOut()) {
                                param.push(LanguageManager.getlocal("acBattleRoundCDTxt13-" + code));
                            }
                            else {
                                param.push(LanguageManager.getlocal("acBattleRoundCDTxt12-" + code));
                            }
                            // param.push(LanguageManager.getlocal(`acBattleRoundCDTxt11-${code}`));
                        }
                        // param.push(LanguageManager.getlocal(`acBattleRoundNoAttend-${code}`));
                    }
                    break;
                case 3:
                case 4:
                    str = "acBattleRoundCDTxt3-" + code;
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
                    param.push(LanguageManager.getlocal("acBattleRoundCDTxt" + tyle + "-" + view.getUiCode()));
                    break;
            }
            if (this._needFresh) {
                view._cdText.text = LanguageManager.getlocal("acBattleGroundTip8-" + view.getUiCode());
            }
            else {
                view._cdText.text = LanguageManager.getlocal(str, param);
            }
        }
        view._cdBg.width = view._cdText.textWidth + 30;
        view._cdBg.height = view._cdText.textHeight + 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._cdBg, view.titleBg, [0, view.titleBg.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._cdText, view._cdBg, [0, -5]);
    };
    AcBattleGroundMapView.prototype.atkraceCallback = function (evt) {
        if (evt.data.ret == false) {
            return;
        }
        var view = this;
        var data = evt.data.data.data;
        view._randClick = false;
        if (data) {
            if (data.bgstats) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundBgStasTip" + data.bgstats + "-" + view.getUiCode()));
            }
            else {
                if (data.waiting) {
                    view.vo.setWaiting(data.waiting);
                    App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundTip8-" + view.getUiCode()));
                }
                else {
                    view.vo.setWaiting(0);
                    if (typeof data.fightflag !== 'undefined' && !data.fightflag) {
                        this._fightflag = false;
                        App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundServantNeed-" + view.getUiCode(), [view.cfg.servantLv.toString()]));
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
                                    App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundTip1-" + this.getUiCode()));
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
                                    var sid = myAtkInfo.mesid.sid;
                                    var myInfo = myAtkInfo.mesid;
                                    var nameStr = myAtkInfo.getFName();
                                    ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDAGREEPOPUPDIALOG, {
                                        type: 1,
                                        name: nameStr,
                                        sid: sid,
                                        aid: this.aid,
                                        code: this.code,
                                        ishelp: myAtkInfo.support == 1,
                                        equip: myInfo.equip
                                    });
                                    //ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEAGREEPOPUPVIEW,{type:1 , name: nameStr ,sid:myAtkInfo.mesid.sid});
                                }
                                break;
                            case 3:
                                App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundContinueFightTip1-" + view.getUiCode()));
                                break;
                            case 4:
                                this.clickDialog();
                                break;
                            case 5:
                                App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundContinueFightTip2-" + view.getUiCode()));
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
                    textStr = LanguageManager.getlocal("acBattleGroundContinueFight-" + view.getUiCode());
                    this._curFightType = 2;
                }
                else {
                    textStr = LanguageManager.getlocal("acBattleRoundRandFight-" + view.getUiCode());
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
                        textStr = LanguageManager.getlocal("acBattleGroundTip2-" + this.getUiCode());
                        // wordsBg.addTouchTap(this.clickDialog2,this);
                    }
                    else {
                        textStr = LanguageManager.getlocal("acBattleGroundTip2-" + this.getUiCode());
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
                        textStr = LanguageManager.getlocal("acBattleRoundRandFight-" + view.getUiCode());
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
        if (evt.data.ret == false) {
            return;
        }
        var view = this;
        var data = evt.data.data.data;
        if (data) {
            if (data.bgstats) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundBgStasTip" + data.bgstats + "-" + view.getUiCode()));
                ViewController.getInstance().hideView(ViewConst.POPUP.ACBATTLEGROUNDCHALLENGEVIEW);
                ViewController.getInstance().hideView(ViewConst.POPUP.ACBATTLEGROUNDSELECTVIEW);
                NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST, { activeId: view.acTivityId });
            }
            else {
                if (data.waiting) {
                    view.vo.setWaiting(data.waiting);
                    App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundTip8-" + view.getUiCode()));
                }
                else {
                    view.vo.setWaiting(0);
                    view.vo.setRaceInfo(data.battleground);
                    view.resetInfo();
                    if (AtkraceChallengeItem.data && AtkraceChallengeItem.data.type) {
                        if (this._isShowMore) {
                            this.moveContainer.y = 1150;
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
                    ViewController.getInstance().hideView(ViewConst.POPUP.ACBATTLEGROUNDCHALLENGEVIEW);
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
        ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEDETAILSVIEW, {
            aid: this.aid,
            code: this.code,
            type: "alliance"
        });
        //跳转至详情-我的帮会
    };
    AcBattleGroundMapView.prototype.handleCallback = function (evt) {
        if (evt.data.ret == false) {
            return;
        }
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
    AcBattleGroundMapView.prototype.afterCheer = function () {
        var view = this;
        view._needFresh = true;
        view.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND, { activeId: view.acTivityId });
    };
    AcBattleGroundMapView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_BATTLEGROUND_MAPFRESH, view.afterCheer, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_BATTLEGROUND_BATTLEEND, this.battleEnd, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUNDINDEX), view.atkraceCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_KILL), view.challengeCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST), view.useCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_REVENGE), view.challengeCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_CHALLENGE), view.challengeCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_HANDLE), view.handleCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_USEEXTRA), view.atkraceCallback, view);
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
        view._cheerBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundMapView;
}(CommonView));
__reflect(AcBattleGroundMapView.prototype, "AcBattleGroundMapView");
//# sourceMappingURL=AcBattleGroundMapView.js.map