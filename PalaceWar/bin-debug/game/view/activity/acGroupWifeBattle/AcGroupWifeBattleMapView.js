var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
author : qianjun----wxz
desc : 风华群芳活动
*/
var AcGroupWifeBattleMapView = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleMapView, _super);
    function AcGroupWifeBattleMapView() {
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
        _this._buildingNum = 11;
        _this._protectTxt = null;
        _this.tmpX = 0;
        _this.mapPos = {
            1: { x: 6, y: 497, width: 180, height: 116 },
            2: { x: 106, y: 647, width: 54, height: 54 },
            3: { x: 207, y: 400, width: 54, height: 54 },
            4: { x: 366, y: 649, width: 54, height: 54 },
            5: { x: 416, y: 490, width: 54, height: 54 },
            6: { x: 571, y: 227, width: 54, height: 54 },
            7: { x: 610, y: 777, width: 54, height: 54 },
            8: { x: 698, y: 353, width: 54, height: 54 },
            9: { x: 818, y: 698, width: 184, height: 124 },
            10: { x: 1003, y: 330, width: 54, height: 54 },
            11: { x: 1047, y: 574, width: 54, height: 54 }
        };
        return _this;
    }
    AcGroupWifeBattleMapView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE, requestData: {
                activeId: view.vo.aidAndCode
            } };
    };
    AcGroupWifeBattleMapView.prototype.receiveData = function (data) {
        var view = this;
        if (data.data.data) {
            if (data.data.data.waiting) {
                view.vo.setWaiting(data.data.data.waiting);
            }
            else {
                view.vo.setWaiting(0);
                if (data.data.data && data.data.cmd == NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE) {
                    if (data.data.data.groupwifebattle.fightflag == false) {
                        this._fightflag = false;
                    }
                    else {
                        this._fightflag = true;
                    }
                    if (data.data.data.groupwifebattle) {
                        view.vo.setRaceInfo(data.data.data.groupwifebattle);
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
    };
    AcGroupWifeBattleMapView.prototype.getResourceList = function () {
        var ret = _super.prototype.getResourceList.call(this);
        var code = this.getUiCode();
        ret = ret.concat([
            "acgroupwifebattle_battlebg-" + code, "groupwifebattle1-" + code, "groupwifebattle2-" + code, "groupwifebattle3-" + code, "groupwifebattle4-" + code, "battlegroundmap-" + code,
            "servant_mask", "arena_bottom_bg", "battlegrounddestroy", "battlegroundsmoke", "battlegrounddestroy",
            "battlegroundsmapsmoke", "battlegroundsmoke2_", "battlegroundsmoke3_", "battlegroundsmoke4_", "arena_more", "chatlaba", "rankinglist_line", "rankinglist_rankbg",
            "battlegroundfire" + this.getUiCode() + "_"
        ]);
        return ret;
    };
    // 背景图名称
    AcGroupWifeBattleMapView.prototype.getBgName = function () {
        return 'acgroupwifebattle_battlebg-' + this.getUiCode();
    };
    AcGroupWifeBattleMapView.prototype.getRuleInfo = function () {
        var code = this.getUiCode();
        // if(Api.switchVoApi.checkServantRefuseBattle() && this.getUiCode() == '1' &&Api.switchVoApi.checkOpenAtkracegChangegpoint()){
        // 	return "acBattleRoundRule-1_newRule_withOpenRefusal";
        // }
        // return Api.switchVoApi.checkOpenAtkracegChangegpoint() ? (`acBattleRoundRule-${this.getUiCode()}_newRule`) : (`acBattleRoundRule-${this.getUiCode()}`);
        return "acGroupWifeBattleRule-" + code;
    };
    AcGroupWifeBattleMapView.prototype.getRuleInfoParam = function () {
        return this.vo.getRuleInfoParam();
    };
    Object.defineProperty(AcGroupWifeBattleMapView.prototype, "mapNum", {
        //获取此次活动需要创建的地图数目
        get: function () {
            // let servernum = this.vo.getMapLenth();
            // let mapNum = Math.ceil(servernum / this._buildingNum);
            // return mapNum;
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleMapView.prototype, "mapWidth", {
        //地图宽度
        get: function () {
            return 1280;
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleMapView.prototype.initBg = function () {
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
                    var idx = i * this_1._buildingNum + Number(j);
                    var info = this_1.vo.getAllInfoById(idx);
                    if (!info) {
                        return "continue";
                    }
                    var mask1 = BaseBitmap.create("groupwifebattle" + info.period + "-" + this_1.getUiCode());
                    mask1.anchorOffsetX = mask1.width / 2;
                    mask1.anchorOffsetY = mask1.height / 2;
                    mask1.x = map.x + unit.x + mask1.anchorOffsetX;
                    mask1.y = map.y + unit.y + mask1.anchorOffsetY;
                    mask1.name = "alliancebuild" + info.alliId;
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
                            ViewController.getInstance().openView(ViewConst.POPUP.ACGROUPWIFEBATTLEALLIINFOVIEW, {
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
    AcGroupWifeBattleMapView.prototype.freshMap = function () {
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
                        view.removeCity(i * this._buildingNum + Number(j));
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
    AcGroupWifeBattleMapView.prototype.freshCity = function (mapId) {
        var _this = this;
        var view = this;
        var leftX = view._bgScrollView.scrollLeft;
        var map = view._bgGroup.getChildByName("map" + mapId);
        if (map) {
            var range = [leftX, leftX + GameConfig.stageWidth];
            var _loop_2 = function (j) {
                var unit = view.mapPos[j];
                var idx = mapId * this_2._buildingNum + Number(j);
                var info = view.vo.getAllInfoById(idx);
                if (!info) {
                    return "continue";
                }
                var mask1 = view._bgGroup.getChildByName("alliancebuild" + info.alliId);
                if (!mask1) {
                    mask1 = BaseBitmap.create("groupwifebattle" + info.period + "-" + this_2.getUiCode());
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
                                ViewController.getInstance().openView(ViewConst.POPUP.ACGROUPWIFEBATTLEALLIINFOVIEW, {
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
            for (var j in view.mapPos) {
                _loop_2(j);
            }
        }
    };
    AcGroupWifeBattleMapView.prototype.changeCity = function (alliId) {
        var view = this;
        var info = this.vo.getAllInfoById(alliId);
        var mask1 = view._bgGroup.getChildByName("alliancebuild" + info.alliId);
        mask1.setRes("groupwifebattle" + info.period + "-" + view.getUiCode());
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
    AcGroupWifeBattleMapView.prototype.removeCity = function (alliId) {
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
    AcGroupWifeBattleMapView.prototype.freshAlliText = function (id) {
        var view = this;
        var info = this.vo.getAllInfoById(id);
        var mask1 = view._bgGroup.getChildByName("alliancebuild" + info.alliId);
        //信息
        if (mask1) {
            var infobg = view._bgGroup.getChildByName("alliancebg" + info.alliId);
            var allinameTxt = view._bgGroup.getChildByName("allianceTxt" + info.alliId);
            var str = '';
            if (view.vo.isAlliOut(id)) {
                str = info.alliName + "\n<font color=0xff3c3c>" + LanguageManager.getlocal("acGroupWifeBattleOut-" + view.getUiCode()) + "</font>";
                // allinameTxt.textColor = 0xff3c3c;
            }
            else if (view.vo.isChampWin() && view.vo.getWinnerAlliance().mid == Number(info.mid)) {
                str = info.alliName + "\n<font color=0x21eb39>" + LanguageManager.getlocal("acGroupWifeBattleTip10-" + view.getUiCode()) + "</font>";
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
    AcGroupWifeBattleMapView.prototype.initView = function () {
        var _this = this;
        var view = this;
        view._period = view.vo.getCurperiod();
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_BATTLEGROUND_BATTLEEND, view.battleEnd, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CHALLENGE), this.challengeCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST), view.useCallback, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_SEARCH), view.searchCallback, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_FIGHT), view.fightCallback, view);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var code = view.getUiCode();
        if (view.vo.getMyFightInfo()) {
            ViewController.getInstance().openView(ViewConst.COMMON.ACGROUPWIFEBATTLESEARCHRESULTVIEW, { callback: this.closeSearchCallback, target: this, aid: this.aid, code: this.code });
        }
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST, { activeId: view.acTivityId });
        view.initTopTip();
        //底部
        var bottomBg = BaseBitmap.create("acgroupwifebattlebottombg-" + code);
        bottomBg.height = 86;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);
        view._bottomBg = bottomBg;
        //聊天
        var chatbg = null;
        if (1) {
            //跨服聊天消息
            chatbg = BaseBitmap.create("acgroupwifebattlebottomchatbg-" + view.getUiCode());
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
                loop: true
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
        var detailbtn = ComponentManager.getButton("acgroupwifebattle_detail-" + view.getUiCode(), '', function () {
            if (view._stopTouch) {
                return;
            }
            if (_this.vo.isStart == false) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            else { //活动详情界面
                ViewController.getInstance().openView(ViewConst.COMMON.ACGROUPWIFEBATTLEDETAILSVIEW, {
                    aid: view.aid,
                    code: view.code
                });
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, detailbtn, chatbg, [0, chatbg.height]);
        view.addChild(detailbtn);
        var protectbtn = ComponentManager.getButton("acgroupwifebattle_protect-" + view.getUiCode(), '', function () {
            if (view._stopTouch) {
                return;
            }
            if (_this.vo.isStart == false || _this.vo.checkIsInEndShowTime()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            else {
                // if(!view.vo.getJoinIn())
                // {
                //     App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleTip4-${code}`));
                //     return;
                // }
                //金兰之令界面
                ViewController.getInstance().openView(ViewConst.POPUP.ACGROUPWIFEBATTLEPROTECTVIEW, {
                    aid: view.aid,
                    code: view.code
                });
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, protectbtn, detailbtn, [0, detailbtn.height + 10]);
        view.addChild(protectbtn);
        var cheerbtn = ComponentManager.getButton("acgroupwifebattle_guess-" + view.getUiCode(), '', function () {
            if (view._stopTouch) {
                return;
            }
            if (_this.vo.isStart == false) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            else { //竞猜界面
                ViewController.getInstance().openView(ViewConst.COMMON.ACGROUPWIFEBATTLEGUESSVIEW, {
                    aid: view.aid,
                    code: view.code
                });
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, cheerbtn, protectbtn, [0, protectbtn.height + 10]);
        view.addChild(cheerbtn);
        view._cheerBtn = cheerbtn;
        // cheerbtn.visible = !view.vo.getAttendQuality();
        cheerbtn.visible = view.vo.getAttendQuality();
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
            var curPeriod = _this.vo.getCurperiod();
            if (curPeriod == 1) {
                var str = LanguageManager.getlocal("acNewYearisOpen");
                App.CommonUtil.showTip(str);
                return;
            }
            //来访消息界面
            ViewController.getInstance().openView(ViewConst.POPUP.ACGROUPWIFEBATTLEVISITVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, logbtn, chatbg, [0, chatbg.height]);
        view.addChild(logbtn);
        view._logBtn = logbtn;
        var caiqingbtn = ComponentManager.getButton("acgroupwifebattle_caiqing-" + view.getUiCode(), '', function () {
            if (view._stopTouch) {
                return;
            }
            //提升才情界面
            ViewController.getInstance().openView(ViewConst.POPUP.ACGROUPWIFEBATTLETALENTVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, caiqingbtn, logbtn, [0, logbtn.height + 10]);
        view.addChild(caiqingbtn);
        var randBtn = ComponentManager.getButton("acgroupwifebattle_fightbtn", null, function () {
            if (view._stopTouch) {
                return;
            }
            if (!view.vo.getAttendQuality()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acGroupWifeBattleNoAttend-" + code));
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
                App.CommonUtil.showTip(LanguageManager.getlocal("acGroupWifeBattleTip4-" + code));
                return;
            }
            if (_this.vo.getStatusWifeNum() < _this.cfg.unlock_wifeStar) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acGroupWifeBattleTip24-" + code, [_this.cfg.unlock_wifeStar + ""]));
                return;
            }
            if (view._randClick) {
                return;
            }
            view._randClick = true;
            //随机挑战
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_SEARCH, { activeId: view.acTivityId, thetype: 1 });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, randBtn, chatbg, [0, chatbg.height - 10]);
        view.addChild(randBtn);
        view._randBtn = randBtn;
        // randBtn.visible = view.vo.getAttendQuality() && view.vo.getJoinIn();
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
                var idx = i * this._buildingNum + Number(j);
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
    AcGroupWifeBattleMapView.prototype.closeSearchCallback = function () {
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_FIGHT, { activeId: this.acTivityId });
    };
    AcGroupWifeBattleMapView.prototype.useCallback = function (event) {
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
    AcGroupWifeBattleMapView.prototype.refreshText = function () {
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
    AcGroupWifeBattleMapView.prototype.initBottom = function () {
        var view = this;
        var bottom = view._bottomBg;
        var maskDown = BaseBitmap.create("servant_mask");
        maskDown.width = GameConfig.stageWidth;
        maskDown.y = GameConfig.stageHeigth - bottom.height - maskDown.height;
        this.addChild(maskDown);
        this.swapChildren(maskDown, this.container);
        var showMore = ComponentManager.getButton("atkracecross_moretxt", "", this.showMoreHandle, this);
        showMore.setPosition(GameConfig.stageWidth - showMore.width - 18, GameConfig.stageHeigth - bottom.height / 2 - showMore.height / 2);
        this.addChild(showMore);
        this._moreArrow = BaseBitmap.create("atkracecross_upflag");
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
    AcGroupWifeBattleMapView.prototype.showMoreHandle = function () {
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
    AcGroupWifeBattleMapView.prototype.showList = function () {
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
            var killBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acGroupWifeBattleVisitTip1-" + this.getUiCode(), function () {
                //比拼
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
                    App.CommonUtil.showTip(LanguageManager.getlocal("acGroupWifeBattleTip4-" + _this.getUiCode()));
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
                    App.CommonUtil.showTip(LanguageManager.getlocal("acGroupWifeBattleTip4-" + _this.getUiCode()));
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
            this._scrollList = ComponentManager.getScrollList(AcGroupWifeBattleLogItem, this._atkraceInfoVoList, rect, this.code);
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
        var num = this.cfg.dataParameter2;
        var listconditions = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleListConditions", [num + ""]), 20);
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
    AcGroupWifeBattleMapView.prototype.runText = function () {
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
    AcGroupWifeBattleMapView.prototype.closeList = function () {
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
    AcGroupWifeBattleMapView.prototype.visitHandle = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEVISITVIEW);
    };
    AcGroupWifeBattleMapView.prototype.chatBgClickHandler = function () {
        if (this._stopTouch) {
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.CHATACTIVITYCROSSVIEW, { activeID: this.vo.aidAndCode });
    };
    AcGroupWifeBattleMapView.prototype.tick = function () {
        var view = this;
        // view._randBtn.visible = view.vo.getAttendQuality() && view.vo.getJoinIn();
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
        if (curPeriod !== view._period) {
            this._needFresh = true;
            this.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND, { activeId: view.acTivityId });
        }
        view.freshText();
        view._period = curPeriod;
        if (this._countDownTime > 0) {
            this._countDownTime--;
            if (this._countDownTime <= 0) {
                // this._randBtn.setText(`acBattleRoundRandFight-${view.getUiCode()}`);
                this._curFightType = 1;
            }
            else {
                // this._randBtn.setText(this.getCountTimeStr(), false);
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
    AcGroupWifeBattleMapView.prototype.initTopTip = function () {
        var view = this;
        var code = view.getUiCode();
        var tipBg = BaseBitmap.create("acgroupwifebattledescbg-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipBg, view.titleBg, [0, view.titleBg.height - 10]);
        view.addChild(tipBg);
        view._cdBg = tipBg;
        tipBg.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.COMMON.ACGROUPWIFEBATTLEDETAILSVIEW, {
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
        view._protectTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WHITE);
        view._protectTxt.textFlow = [
            { text: LanguageManager.getlocal("acGroupWifeBattleMapProtectTxt", [""]), style: { underline: true } }
        ];
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._protectTxt, view._cdBg, [0, view._cdBg.height + 5]);
        view.addChild(view._protectTxt);
        view.freshText();
    };
    AcGroupWifeBattleMapView.prototype.freshText = function () {
        var view = this;
        var code = view.getUiCode();
        var period = view.vo.getCurperiod();
        //提示板信息
        //提示板信息
        var cd = App.DateUtil.getFormatBySecond(view.vo.getCountCD());
        var str = "acGroupWifeBattleCDTxt" + view._period + "-" + code;
        var param = [];
        var myRank = view.vo.getMyRank();
        if (view.vo.isWaiting()) {
            view._cdText.text = LanguageManager.getlocal("acGroupWifeBattleTip8-" + view.getUiCode());
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
                        str = "acGroupWifeBattleCDTxt4-" + code;
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
                            param.push(LanguageManager.getlocal("acGroupWifeBattleCDTxt5-" + code));
                        }
                    }
                    else {
                        if (view.vo.getCurRound() == 1) {
                            param.push(LanguageManager.getlocal("acGroupWifeBattleCDTxt11-" + code));
                        }
                        else {
                            if (view.vo.getCheerALlianceOut()) {
                                param.push(LanguageManager.getlocal("acGroupWifeBattleCDTxt13-" + code));
                            }
                            else {
                                param.push(LanguageManager.getlocal("acGroupWifeBattleCDTxt12-" + code));
                            }
                        }
                    }
                    break;
                case 3:
                case 4:
                    str = "acGroupWifeBattleCDTxt3-" + code;
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
                    param.push(LanguageManager.getlocal("acGroupWifeBattleCDTxt" + tyle + "-" + view.getUiCode()));
                    break;
            }
            if (this._needFresh) {
                view._cdText.text = LanguageManager.getlocal("acGroupWifeBattleTip8-" + view.getUiCode());
            }
            else {
                view._cdText.text = LanguageManager.getlocal(str, param);
            }
        }
        view._cdBg.width = view._cdText.textWidth + 60;
        view._cdBg.height = view._cdText.textHeight + 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._cdBg, view.titleBg, [0, view.titleBg.height - 10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._cdText, view._cdBg, [0, -5]);
        view.freshProtectTxt();
    };
    AcGroupWifeBattleMapView.prototype.freshProtectTxt = function () {
        var view = this;
        var id = "123456";
        if (id) {
            view._protectTxt.textFlow = [
                { text: LanguageManager.getlocal("acGroupWifeBattleMapProtectTxt", [id]), style: { underline: true } }
            ];
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._protectTxt, view._cdBg, [0, view._cdBg.height + 5]);
            view.addChild(view._protectTxt);
        }
        else {
            view._protectTxt.visible = false;
        }
    };
    AcGroupWifeBattleMapView.prototype.searchCallback = function (evt) {
        if (evt.data.ret == false) {
            return;
        }
        if (evt.data.data.data) {
            this.handleSearch(evt.data.data.data);
        }
    };
    AcGroupWifeBattleMapView.prototype.handleSearch = function (data) {
        var view = this;
        view._randClick = false;
        if (data) {
            if (data.bgstats) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acGroupWifeBattleBgStasTip" + data.bgstats + "-" + view.getUiCode()));
            }
            else {
                if (data.waiting) {
                    view.vo.setWaiting(data.waiting);
                    App.CommonUtil.showTip(LanguageManager.getlocal("acGroupWifeBattleTip8-" + view.getUiCode()));
                }
                else {
                    view.vo.setWaiting(0);
                    this._fightflag = true;
                    view.vo.setRaceInfo(data.groupwifebattle);
                    if (data.groupwifebattle) {
                        this.vo.setWifebattleInfo(data.groupwifebattle);
                    }
                    view.resetInfo();
                    //1可以随机挑战 2已经发生战斗没结束 继续战斗 3cd中 4次数耗尽可恢复 5次数耗尽不可恢复
                    switch (this._curFightType) {
                        case 1:
                        case 2:
                            if (data.newRound && data.newRound == 1) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("acGroupWifeBattleTip1-" + this.getUiCode()));
                                view.resetInfo();
                                return;
                            }
                            ViewController.getInstance().openView(ViewConst.COMMON.ACGROUPWIFEBATTLESEARCHRESULTVIEW, { callback: this.closeSearchCallback, target: this, aid: this.aid, code: this.code });
                            break;
                        case 3:
                            this.clickDialog(true);
                            break;
                        case 4:
                            this.clickDialog();
                            break;
                        case 5:
                            App.CommonUtil.showTip(LanguageManager.getlocal("acGroupWifeBattleContinueFightTip2-" + view.getUiCode()));
                            break;
                        case 6:
                            App.CommonUtil.showTip(LanguageManager.getlocal("acGroupWifeBattleContinueFightTip1-" + view.getUiCode()));
                            break;
                    }
                }
            }
        }
    };
    //重置信息
    AcGroupWifeBattleMapView.prototype.resetInfo = function () {
        // this.closeList();
        var view = this;
        if (!view._randBtn) {
            return;
        }
        this._countDownTime = 0;
        //是否无法出战
        var textStr = '';
        //检查是否已有门客
        if (this.vo.getMyFightInfo()) {
            this._curFightType = 2;
            //1可以随机挑战 2已经发生战斗没结束 继续战斗 3cd中 4次数耗尽
        }
        else {
            //出战次数
            var maxCount = view.cfg.freeTime;
            var myInfo = this.vo.getMyInfo();
            var myNum = myInfo.num;
            if (myNum >= maxCount) {
                //次数已满
                var lv60plus = this.vo.getStatusWifeNum();
                var extraMax = Math.floor(lv60plus / view.cfg.refreshLimit2) + view.cfg.refreshLimit1;
                if (myInfo.extranum >= extraMax) {
                    //没次数了
                    //1可以随机挑战 2已经发生战斗没结束 继续战斗 3cd中 4次数耗尽 5次数耗尽不可恢复
                    this._curFightType = 5;
                }
                else {
                    //1可以随机挑战 2已经发生战斗没结束 继续战斗 3cd中 4次数耗尽 5次数耗尽不可恢复
                    this._curFightType = 4;
                }
            }
            else {
                //倒计时
                this._countDownTime = myInfo.lasttime + this.cfg.coolDownTime - GameData.serverTime;
                if (this._countDownTime <= 0) {
                    this._curFightType = 1;
                }
                else {
                    this._curFightType = 3;
                    textStr = this.getCountTimeStr();
                    var lv60plus = this.vo.getStatusWifeNum();
                    var extraMax = Math.floor(lv60plus / view.cfg.refreshLimit2) + view.cfg.refreshLimit1;
                    if (myInfo.extranum >= extraMax) {
                        this._curFightType = 6;
                    }
                }
            }
        }
        if (this._randBtn) {
            this._randBtn.setGray(this._curFightType >= 5);
        }
    };
    AcGroupWifeBattleMapView.prototype.getCountTimeStr = function () {
        var time = this._countDownTime;
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    AcGroupWifeBattleMapView.prototype.clickDialog = function (isCD) {
        if (isCD === void 0) { isCD = false; }
        var itemId = this.cfg.needItem.refresh;
        var needNum = 1;
        var itemVo = Api.itemVoApi.getItemInfoVoById(Number(itemId));
        var numItem = 0;
        if (itemVo) {
            numItem = itemVo.num;
        }
        var str = isCD ? "acGroupWifeBattle_buyChallenge_CD" : "acGroupWifeBattle_buyChallenge";
        var message = LanguageManager.getlocal(str, [LanguageManager.getlocal("itemName_" + itemId)]);
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
    AcGroupWifeBattleMapView.prototype.buyChallenge = function () {
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_SEARCH, { activeId: this.acTivityId, thetype: 2 });
    };
    AcGroupWifeBattleMapView.prototype.challengeCallback = function (evt) {
        if (evt.data.ret == false) {
            return;
        }
        if (evt.data.data.data) {
            ViewController.getInstance().hideView(ViewConst.POPUP.ACGROUPWIFEBATTLEVISITVIEW);
            this.handleSearch(evt.data.data.data);
        }
    };
    AcGroupWifeBattleMapView.prototype.battleEnd = function () {
        // let view = this;
        // view.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND,{activeId:view.acTivityId});
        // view.resetInfo();
        // NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST,{activeId:view.acTivityId});
    };
    AcGroupWifeBattleMapView.prototype.moveToMyAlliance = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.ACGROUPWIFEBATTLEDETAILSVIEW, {
            aid: this.aid,
            code: this.code,
            type: "alliance"
        });
        //跳转至详情-我的帮会
    };
    AcGroupWifeBattleMapView.prototype.fightCallback = function (event) {
        if (event.data.ret && event.data.data.ret == 0) {
            var data = event.data.data.data;
            var fightarr = data.fightarr;
            var point = data.point;
            var rewardnum = data.rewardnum;
            var winflag = data.winflag;
            if (event && event.data.data.data.groupwifebattle) {
                this.vo.setWifebattleInfo(event.data.data.data.groupwifebattle);
            }
            ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERWIFEBATTLEBATTLEVIEW, {
                fightarr: fightarr,
                point: point,
                rewardnum: rewardnum,
                winflag: winflag,
                callback: this.checkShowSearch,
                isReview: false,
                target: this
            });
        }
    };
    AcGroupWifeBattleMapView.prototype.checkShowSearch = function (event) {
        // console.log("checkShowSearch",data);
        if (!this.vo) {
            return;
        }
        if (event && event.data.data.data.groupwifebattle) {
            this.vo.setWifebattleInfo(event.data.data.data.groupwifebattle);
        }
    };
    Object.defineProperty(AcGroupWifeBattleMapView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleMapView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleMapView.prototype, "code", {
        get: function () {
            return String(this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleMapView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    Object.defineProperty(AcGroupWifeBattleMapView.prototype, "aid", {
        get: function () {
            return String(this.param.data.aid);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleMapView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleMapView.prototype.getTitleStr = function () {
        return null;
    };
    AcGroupWifeBattleMapView.prototype.getRuleBtnName = function () {
        return ButtonConst.BTN2_RULE;
    };
    AcGroupWifeBattleMapView.prototype.getTitleBgName = function () {
        return "acgroupwifebattle_title2-" + this.getUiCode();
    };
    AcGroupWifeBattleMapView.prototype.getCloseBtnName = function () {
        return "acchaoting_closebtn";
    };
    AcGroupWifeBattleMapView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_BATTLEGROUND_BATTLEEND, this.battleEnd, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_SEARCH), view.searchCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST), view.useCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CHALLENGE), view.challengeCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_FIGHT), view.fightCallback, view);
        view._bgGroup = null;
        view._period = 1;
        if (view._cdBg) {
            view._cdBg.removeTouchTap();
            view._cdBg = null;
        }
        if (view._protectTxt) {
            view._protectTxt.dispose();
            view._protectTxt = null;
        }
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
    return AcGroupWifeBattleMapView;
}(CommonView));
//# sourceMappingURL=AcGroupWifeBattleMapView.js.map