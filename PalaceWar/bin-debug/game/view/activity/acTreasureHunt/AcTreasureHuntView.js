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
desc : 元旦活动
*/
var AcTreasureHuntView = (function (_super) {
    __extends(AcTreasureHuntView, _super);
    function AcTreasureHuntView() {
        var _this = _super.call(this) || this;
        _this._cdText = null;
        _this._rewardGroup = null;
        _this._circleBg = null;
        _this._circleText = null;
        _this._circleBottomText = null;
        _this._boxNumBg = null;
        _this._boxText = null;
        _this._boxAdd = null;
        _this._boxClip = null;
        _this._bgGroup = null;
        _this._rewardScrollView = null;
        _this._noticescrollView = null;
        _this._prevRoundReward = '';
        _this._rewardBtn = null;
        _this._carGroup = null;
        _this._car = null;
        _this._carTip = null;
        _this._stopPlay = false;
        _this._stopClick = null;
        _this._checkBox = null;
        _this._oneKeySearchStatus = false;
        _this.mapPos = {
            1: { x: 40, y: 835, width: 180, height: 116 },
            2: { x: 34, y: 729, width: 54, height: 54 },
            3: { x: 27, y: 602, width: 54, height: 54 },
            4: { x: 55, y: 465, width: 54, height: 54 },
            5: { x: 163, y: 385, width: 54, height: 54 },
            6: { x: 290, y: 385, width: 54, height: 54 },
            7: { x: 395, y: 447, width: 54, height: 54 },
            8: { x: 533, y: 470, width: 54, height: 54 },
            9: { x: 593, y: 406, width: 184, height: 124 },
            10: { x: 802, y: 466, width: 54, height: 54 },
            11: { x: 875, y: 372, width: 54, height: 54 },
            12: { x: 1035, y: 379, width: 54, height: 54 },
            13: { x: 1164, y: 407, width: 54, height: 54 },
            14: { x: 1064, y: 491, width: 54, height: 54 },
            15: { x: 964, y: 581, width: 54, height: 54 },
            16: { x: 1046, y: 660, width: 236, height: 132 },
            17: { x: 1177, y: 776, width: 54, height: 54 },
            18: { x: 1115, y: 868, width: 54, height: 54 },
            19: { x: 986, y: 799, width: 54, height: 54 },
            20: { x: 875, y: 868, width: 54, height: 54 },
            21: { x: 793, y: 798, width: 54, height: 54 },
            22: { x: 718, y: 702, width: 54, height: 54 },
            23: { x: 526, y: 734, width: 188, height: 124 },
            24: { x: 521, y: 652, width: 54, height: 54 },
            25: { x: 394, y: 597, width: 54, height: 54 },
            26: { x: 241, y: 551, width: 54, height: 54 },
            27: { x: 268, y: 677, width: 54, height: 54 },
            28: { x: 349, y: 769, width: 54, height: 54 },
            29: { x: 241, y: 846, width: 54, height: 54 },
        };
        _this._rewardData = null;
        _this._count = 0;
        return _this;
    }
    Object.defineProperty(AcTreasureHuntView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcTreasureHuntView.prototype.getTitleBgName = function () {
        return "treasuretitlebg-" + this.code;
    };
    AcTreasureHuntView.prototype.getTitleStr = function () {
        return "acTreasureHuntViewTitle-" + this.code;
    };
    Object.defineProperty(AcTreasureHuntView.prototype, "uiType", {
        get: function () {
            return "";
        },
        enumerable: true,
        configurable: true
    });
    AcTreasureHuntView.prototype.getResourceList = function () {
        var ret = _super.prototype.getResourceList.call(this);
        ret = ret.concat([
            "treasurebg-" + this.code, "treasurebox" + this.code + "-", "treasurescene1mask-" + this.code,
            "treasurescene9mask-" + this.code, "treasurescene16mask-" + this.code, "treasurescene23mask-" + this.code,
            "treasurecarbg-" + this.code, "treasurecar" + this.code + "-", 'ac_tw_bubble', "treasuregquan-" + this.code, "treasuregquan" + this.code + "-",
            "treasurecarmove" + this.code + "-", "treasurecarscale-" + this.code
        ]);
        return ret;
    };
    // 背景图名称
    AcTreasureHuntView.prototype.getBgName = function () {
        return 'treasurebg-' + this.code;
    };
    AcTreasureHuntView.prototype.getRuleInfo = function () {
        return "acTreasureHuntRule-" + this.code;
    };
    AcTreasureHuntView.prototype.initBg = function () {
        var _this = this;
        this.height = GameConfig.stageHeigth;
        this.width = GameConfig.stageWidth;
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            var bggroup = new BaseDisplayObjectContainer();
            bggroup.width = this.viewBg.width;
            bggroup.height = GameConfig.stageHeigth;
            this.addChild(bggroup);
            this._bgGroup = bggroup;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this.viewBg, bggroup, [0, 0], true);
            bggroup.addChild(this.viewBg);
            var _loop_1 = function (i) {
                var unit = this_1.cfg.map[i];
                if (unit.pointType == 1) {
                    var info = GameData.formatRewardItem(unit.getReward);
                    info[0].num = 0;
                    var itemIcon = GameData.getItemIcon(info[0], true);
                    var iconbg = itemIcon.getChildByName("iconBg");
                    if (iconbg) {
                        iconbg.alpha = 0;
                    }
                    itemIcon.setScale(0.75);
                    itemIcon.x = this_1.mapPos[unit.pointID].x - 10;
                    itemIcon.y = this_1.viewBg.y + this_1.mapPos[unit.pointID].y - 5;
                    itemIcon.name = "item" + unit.pointID;
                    bggroup.addChild(itemIcon);
                }
                else {
                    var mask1_1 = BaseBitmap.create("treasurescene" + unit.pointID + "mask-" + this_1.code);
                    mask1_1.x = this_1.mapPos[unit.pointID].x;
                    mask1_1.y = this_1.viewBg.y + this_1.mapPos[unit.pointID].y;
                    mask1_1.setScale(4);
                    mask1_1.alpha = 0;
                    mask1_1.name = "item" + unit.pointID;
                    mask1_1.addTouch(function (e) {
                        if (_this._stopClick) {
                            return;
                        }
                        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
                            if (mask1_1.alpha == 0) {
                                mask1_1.alpha = 0.3;
                            }
                            else {
                                mask1_1.alpha = 0;
                            }
                        }
                        else if (e.type == egret.TouchEvent.TOUCH_CANCEL) {
                            mask1_1.alpha = 0;
                        }
                        if (e.type == egret.TouchEvent.TOUCH_END) {
                            mask1_1.alpha = 0;
                            var viewName = '';
                            var mapId = unit.pointID;
                            switch (mapId) {
                                case 1:
                                    viewName = ViewConst.POPUP.ACTREASUREHUNTMARKETVIEW;
                                    break;
                                case 9:
                                    viewName = ViewConst.POPUP.ACTREASUREHUNTWEALTHVIEW;
                                    break;
                                case 16:
                                    viewName = ViewConst.POPUP.ACTREASUREHUNTMARKETVIEW;
                                    break;
                                case 23:
                                    viewName = ViewConst.POPUP.ACTREASUREHUNTMARKETVIEW;
                                    break;
                            }
                            ViewController.getInstance().openView(viewName, {
                                code: _this.code,
                                aid: _this.aid,
                                mapId: mapId
                            });
                        }
                    }, this_1, null, true);
                    bggroup.addChild(mask1_1);
                    var str = '';
                    switch (unit.pointID) {
                        case 1:
                            str = "treasurestart-" + this_1.code;
                            break;
                        case 9:
                            str = "treasurewealthname-" + this_1.code;
                            break;
                        case 16:
                            str = "treasuremarket-" + this_1.code;
                            break;
                        case 23:
                            str = "treasurehotel-" + this_1.code;
                            break;
                    }
                    var nameImg = BaseBitmap.create(str);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, nameImg, mask1_1, [0, -nameImg.height + 15]);
                    bggroup.addChild(nameImg);
                }
            };
            var this_1 = this;
            for (var i in this.cfg.map) {
                _loop_1(i);
            }
            var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth);
            var noticescrollView = ComponentManager.getScrollView(bggroup, rect);
            noticescrollView.bounces = false;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, noticescrollView, this);
            noticescrollView.verticalScrollPolicy = 'off';
            bggroup.y = 0;
            this.addChild(noticescrollView);
            this._noticescrollView = noticescrollView;
            //this.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
            // 
            // this.viewBg.height = GameConfig.stageHeigth;
            // let mask = BaseLoadBitmap.create('empvsmask');
            // this.addChild(mask);
            // mask.width = GameConfig.stageWidth;
            // mask.height = GameConfig.stageHeigth;
            // this.viewBg.y = 0 - Math.floor((1136 - GameConfig.stageHeigth) / 2);
        }
    };
    //
    AcTreasureHuntView.prototype.initView = function () {
        var _this = this;
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREBOXPLAY), view.playBoxCallback, view);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var code = view.code;
        var topBg = BaseBitmap.create("treasurewealthtopbg-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view.titleBg, [0, view.titleBg.height]);
        view.addChild(topBg);
        var cdBg = BaseBitmap.create("public_itemtipbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cdBg, topBg, [0, topBg.height]);
        view.addChild(cdBg);
        var cdText = ComponentManager.getTextField(LanguageManager.getlocal("acTreasureTimeTip" + (view.vo.isInActy() ? 1 : 2) + "-" + code, [view.vo.getCountCd()]), 20);
        cdBg.width = cdText.textWidth + 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, cdText, cdBg, [10, 0]);
        view.addChild(cdText);
        view._cdText = cdText;
        var btn = ComponentManager.getButton("treasurescene-" + code, '', function () {
            if (_this._stopClick) {
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACTREASUREHUNTOFFICEVIEW, {
                code: view.code,
                aid: view.aid
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, btn, topBg, [10, 0]);
        view.addChild(btn);
        var tipText = ComponentManager.getTextField(LanguageManager.getlocal("acTreasureHuntTip-" + code, [view.vo.acTimeAndHour]), 20);
        tipText.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tipText, btn, [btn.width + 20, 0]);
        view.addChild(tipText);
        var bottomBg = BaseBitmap.create("treasurebottombg-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);
        var roundbottomTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTreasureRoundReward-" + code, [(view.vo.getCurRound() + 1).toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        roundbottomTxt.lineSpacing = 5;
        roundbottomTxt.textAlign = egret.HorizontalAlign.CENTER;
        view._circleBottomText = roundbottomTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, roundbottomTxt, bottomBg, [10, 0]);
        view.addChild(roundbottomTxt);
        var rewardbtn = ComponentManager.getButton("treasurereward-" + code, '', function () {
            if (_this._stopClick) {
                return;
            }
            //打开奖励弹窗
            ViewController.getInstance().openView(ViewConst.POPUP.ACTREASUREHUNTROUNDREWARDVIEW, {
                aid: view.aid,
                code: view.code,
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rewardbtn, bottomBg);
        view.addChild(rewardbtn);
        view._rewardBtn = rewardbtn;
        var curCircleBg = BaseBitmap.create('public_itemtipbg');
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, curCircleBg, bottomBg, [0, bottomBg.height]);
        view._circleBg = curCircleBg;
        view.addChild(curCircleBg);
        var curCircleText = ComponentManager.getTextField('', 20);
        view._circleText = curCircleText;
        view.addChild(curCircleText);
        view._carGroup = new BaseDisplayObjectContainer();
        view._carGroup.width = GameConfig.stageWidth;
        view._carGroup.height = GameConfig.stageHeigth; // - 80 - 119 - view.titleBg.height;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._carGroup, view);
        view._carGroup.addTouchTap(function () {
            view._stopPlay = true;
            view.moveCar();
            view._carGroup.removeChildren();
        }, view);
        var boxNumBg = BaseBitmap.create("treasurerightbg-" + code);
        view._boxNumBg = boxNumBg;
        view.addChild(boxNumBg);
        var boxText = ComponentManager.getTextField('', 20);
        view._boxText = boxText;
        view.addChild(boxText);
        var boxAdd = ComponentManager.getButton("treasureadd-" + code, '', function () {
            if (_this._stopClick) {
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.ACTREASUREREWARDVIEW, {
                aid: _this.aid,
                code: _this.code,
            });
            //增加筛子次数
        }, view);
        boxAdd.width = 26;
        boxAdd.height = 26;
        view._boxAdd = boxAdd;
        view.addChild(boxAdd);
        var boxbg = BaseBitmap.create("treasureboxbg-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, boxbg, bottomBg, [0, bottomBg.height + 30]);
        view.addChild(boxbg);
        var effbgclip = ComponentManager.getCustomMovieClip("treasuregquan" + code + "-", 10, 70);
        effbgclip.width = 151;
        effbgclip.height = 151;
        effbgclip.setScale(1.2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, effbgclip, boxbg);
        view.addChild(effbgclip);
        effbgclip.playWithTime(-1);
        var effbg = BaseBitmap.create("treasuregquan-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, effbg, boxbg);
        view.addChild(effbg);
        effbg.alpha = 0;
        egret.Tween.get(effbg, { loop: true, onChange: function () {
                effbgclip.visible = effbg.visible = (view.vo.getBoxNum() > 0 && view.vo.isInActy());
            }, onChangeObj: view }).wait(130).to({ alpha: 1 }, 70).to({ alpha: 0.5 }, 70).to({ alpha: 1 }, 130).to({ alpha: 0.5 }, 130).to({ alpha: 1 }, 140).to({ alpha: 0.5 }, 130).to({ alpha: 0 }, 130);
        var effectClip = ComponentManager.getCustomMovieClip("treasurebox" + code + "-", 13, 100);
        effectClip.width = 100;
        effectClip.height = 100;
        effectClip.anchorOffsetX = effectClip.width / 2;
        effectClip.anchorOffsetY = effectClip.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, effectClip, boxbg);
        view.addChild(effectClip);
        effectClip.setStopFrame(0);
        effectClip.addTouchTap(function () {
            if (_this._stopClick) {
                return;
            }
            if (view.vo.isInActy()) {
                //发送消息
                if (view.vo.getBoxNum() > 0) {
                    view._stopClick = true;
                    NetManager.request(NetRequestConst.REQUST_ACTIVITY_TREASUREBOXPLAY, {
                        activeId: view.acTivityId
                    });
                }
                else {
                    ViewController.getInstance().openView(ViewConst.COMMON.ACTREASUREREWARDVIEW, {
                        aid: _this.aid,
                        code: _this.code,
                    });
                    // App.CommonUtil.showTip(LanguageManager.getlocal(`acTreasureBoxTip-${view.code}`));
                    // return;
                }
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            /**
             * activity.treasurehuntroll
            参数 activeId
            返回 data     rewards, wealthGodRewards, specialRand
            返回 model  activity
            */
            //view.playBoxCallback(null);
        }, view);
        // effectClip.frameRate = 100;
        view._boxClip = effectClip;
        egret.Tween.get(effectClip, { loop: true, onChangeObj: view }).to({ scaleX: 1.1, scaleY: 1.1 }, 200).wait(600).to({ scaleX: 1, scaleY: 1 }, 200);
        egret.Tween.get(effectClip, { loop: true }).wait(130).to({ rotation: -20 }, 70).to({ rotation: 16 }, 70).to({ rotation: -14 }, 130).to({ rotation: 12 }, 130).to({ rotation: -10 }, 140).to({ rotation: 8 }, 130).to({ rotation: 0 }, 130);
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH,this.fresh_jindu,this); 
        var boxnamebg = BaseBitmap.create("treasureboxname-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, boxnamebg, boxbg, [0, 0]);
        view.addChild(boxnamebg);
        var rewardgroup = new BaseDisplayObjectContainer();
        rewardgroup.height = 90;
        view.addChild(rewardgroup);
        view._rewardGroup = rewardgroup;
        var rewardStr = view.vo.getCurRoundReward();
        var rewardArr = GameData.getRewardItemIcons(rewardStr, true, false);
        var tmpX = (455 - rewardArr.length * 80 - (rewardArr.length - 1) * 5) / 2;
        if (rewardArr.length > 5) {
            tmpX = 5;
        }
        for (var i in rewardArr) {
            var icon = rewardArr[i];
            icon.setScale(80 / 108);
            icon.x = tmpX + 85 * Number(i);
            icon.y = 5;
            rewardgroup.addChild(icon);
        }
        var rect = new egret.Rectangle(0, 0, 455, 90);
        var noticescrollView = ComponentManager.getScrollView(rewardgroup, rect);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, noticescrollView, bottomBg);
        view.addChild(noticescrollView);
        view._prevRoundReward = rewardStr;
        var car = BaseBitmap.create("treasureacar-" + view.code);
        view._bgGroup.addChild(car);
        view._car = car;
        var carTip = BaseBitmap.create(view.vo.isInWeaith() ? " treasurewealthtip-" + view.code : "treasurecartip-" + view.code);
        view._bgGroup.addChild(carTip);
        view._carTip = carTip;
        egret.Tween.get(view._carTip, { loop: true }).to({ y: view._carTip.y - 15 }, 500).to({ y: view._carTip.y }, 500);
        var checkBoxbg = BaseBitmap.create("public_itemtipbg2");
        view.addChild(checkBoxbg);
        var checkBox = ComponentManager.getCheckBox(LanguageManager.getlocal("acTreasureSkipMovie"));
        this.addChildToContainer(checkBox);
        checkBox.setSelected(this._oneKeySearchStatus);
        view._checkBox = checkBox;
        view.addChild(checkBox);
        checkBoxbg.width = checkBox.width + 40;
        checkBoxbg.height = 30;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, checkBoxbg, bottomBg, [0, -checkBoxbg.height - 5]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, checkBox, checkBoxbg);
        view.freshView();
        view.moveCar(false);
        view.initBubbleTip();
        view.addChild(view._carGroup);
    };
    AcTreasureHuntView.prototype.freshView = function () {
        var view = this;
        var code = view.code;
        //圈数、筛子次数
        view._circleBottomText.text = LanguageManager.getlocal("acTreasureRoundReward-" + code, [(view.vo.getCurRound() + 1).toString()]);
        view._circleText.text = LanguageManager.getlocal("acTreasureHuntCurRound-" + code, [view.vo.getCurRound().toString()]);
        view._circleBg.width = view._circleText.textWidth + 50;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._circleText, view._circleBg, [10, 0]);
        view._boxText.text = LanguageManager.getlocal("acTreasureBoxNum-" + view.code, [view.vo.getBoxNum().toString()]);
        view._boxText.textColor = view.vo.getBoxNum() > 0 ? TextFieldConst.COLOR_WHITE : TextFieldConst.COLOR_WARN_RED3;
        view._boxNumBg.width = view._boxText.textWidth + 60;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, view._boxNumBg, view, [0, 120]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._boxText, view._boxNumBg, [50, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._boxAdd, view._boxNumBg, [5, 0]);
        var rewardStr = view.vo.getCurRoundReward();
        if (view._prevRoundReward !== rewardStr) {
            view._rewardGroup.removeChildren();
            var rewardArr = GameData.getRewardItemIcons(rewardStr, true, false);
            var tmpX = (455 - rewardArr.length * 80 - (rewardArr.length - 1) * 5) / 2;
            if (rewardArr.length > 5) {
                tmpX = 5;
            }
            for (var i in rewardArr) {
                var icon = rewardArr[i];
                icon.setScale(80 / 108);
                icon.x = tmpX + 85 * Number(i);
                icon.y = 5;
                view._rewardGroup.addChild(icon);
            }
        }
        view._prevRoundReward = rewardStr;
    };
    AcTreasureHuntView.prototype.showAvg = function () {
        var view = this;
        var mapId = view.vo.getCurMapId();
        var data = view._rewardData;
        var key = data.specialRand;
        ViewController.getInstance().openView(ViewConst.BASE.ACTREASUREHUNTAVGVIEW, {
            aid: view.aid,
            code: view.code,
            mapId: mapId,
            key: key,
            callBack: function () {
                view.showReward(data);
            },
            obj: view
        });
    };
    AcTreasureHuntView.prototype.playBoxCallback = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        view._rewardData = null;
        view._rewardData = data;
        if (evt.data.data.ret < 0) {
            view._stopClick = false;
            App.CommonUtil.showTip(LanguageManager.getlocal('limitedCollectErrorTips'));
            return;
        }
        view._stopPlay = false;
        view._oneKeySearchStatus = view._checkBox.checkSelected();
        ViewController.getInstance().openView(ViewConst.BASE.ACTREASUREHUNTBOXRESULTVIEW, {
            aid: view.aid,
            code: view.code,
            result: data.randNumber,
            skip: view._oneKeySearchStatus,
            confirmCallback: function () {
                if (view._oneKeySearchStatus) {
                    view.moveCar(false);
                    view.showBoxEnd();
                }
                else {
                    view._boxClip.setStopFrame(0);
                    if (view._carGroup) {
                        view._carGroup.removeChildren();
                    }
                    view.setChildIndex(view._carGroup, 99999);
                    var bg = BaseBitmap.create("public_9_viewmask");
                    bg.height = view._carGroup.height; //GameConfig.stageHeigth - 80 - 119 - view.titleBg.height;
                    bg.width = GameConfig.stageWidth;
                    view._carGroup.addChild(bg);
                    var carbg = BaseBitmap.create("treasurecarbg-" + view.code);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, carbg, view._carGroup, [0, 0], true);
                    view._carGroup.addChild(carbg);
                    var carbg2 = BaseBitmap.create("treasurecarbg-" + view.code);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, carbg2, carbg, [carbg.width, 0]);
                    view._carGroup.addChild(carbg2);
                    var boatclip = ComponentManager.getCustomMovieClip("treasurecar" + view.code + "-", 6, 100);
                    boatclip.width = 368;
                    boatclip.height = 170;
                    view.setLayoutPosition(LayoutConst.horizontalCentertop, boatclip, view._carGroup, [0, carbg.y + carbg.height - boatclip.height - 35], true);
                    view._carGroup.addChild(boatclip);
                    boatclip.playWithTime(-1);
                    var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTreasurecarTip1-" + view.code), 22, TextFieldConst.COLOR_BLACK);
                    view.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, view._carGroup, [0, carbg.y + 20], true);
                    view._carGroup.addChild(tipTxt);
                    var tipBg = BaseBitmap.create("public_itemtipbg2");
                    view._carGroup.addChild(tipBg);
                    var tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acTreasurecarTip2-" + view.code), 22);
                    view._carGroup.addChild(tipTxt2);
                    tipBg.width = tipTxt2.textWidth + 60;
                    view.setLayoutPosition(LayoutConst.horizontalCentertop, tipBg, view._carGroup, [0, carbg.y + carbg.height + 15], true);
                    view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt2, tipBg);
                    egret.Tween.get(carbg, { loop: true }).
                        to({ x: -carbg.width }, 5000).
                        to({ x: carbg.width - 10 }, 1).
                        to({ x: 0 }, 5000);
                    egret.Tween.get(carbg2, { loop: true }).
                        to({ x: -carbg2.width }, 10000).
                        to({ x: carbg2.width - 10 }, 1);
                    egret.Tween.get(carbg).wait(1500).call(function () {
                        if (!view._stopPlay) {
                            view.moveCar();
                            //
                            view._carGroup.removeChildren();
                        }
                    }, view);
                }
            },
            handler: view
        });
        // ViewController.getInstance().openView(ViewConst.BASE.ACTREASUREHUNTWEALTHSUCVIEW,{
        //     aid : view.aid,
        //     code : view.code
        // });
    };
    AcTreasureHuntView.prototype.moveCar = function (flag) {
        if (flag === void 0) { flag = true; }
        var view = this;
        //小车位置
        var curMap = view.vo.getCurMapId();
        var item = view._bgGroup.getChildByName("item" + curMap);
        var info = view.mapPos[curMap];
        var curLeft = view._noticescrollView.scrollLeft;
        if (flag) {
            //
            var lamp_1 = ComponentManager.getCustomMovieClip("treasurecarmove" + view.code + "-", 15, 50);
            lamp_1.blendMode = egret.BlendMode.ADD;
            lamp_1.width = 407;
            lamp_1.height = 154;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lamp_1, view._car);
            lamp_1.playWithTime(1);
            egret.Tween.get(view._car).to({ alpha: 0 }, 230).call(function () {
                view._carTip.alpha = 0;
            }, view);
            lamp_1.setEndCallBack(function () {
                if (lamp_1) {
                    view._bgGroup.removeChild(lamp_1);
                }
                egret.Tween.get(view._car).wait(200).call(function () {
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view._car, item, [-15, item.height * item.scaleY + (view.cfg.map[curMap].pointType == 1 ? -20 : -35)]);
                    var posX = view._car.x + view._car.width / 2 - GameConfig.stageWidth / 2;
                    var left = Math.min(Math.max(0, posX), view.viewBg.width / 2);
                    egret.Tween.get(view._noticescrollView).to({ scrollLeft: left }, 500).wait(500).call(function () {
                        var car1 = BaseBitmap.create("treasurecarscale-" + view.code);
                        car1.anchorOffsetX = car1.width / 2;
                        car1.anchorOffsetY = car1.height / 2;
                        car1.setScale(2);
                        view._bgGroup.addChild(car1);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, car1, view._car, [40, 32.5]);
                        egret.Tween.get(car1).to({ scaleX: 1, scaleY: 1 }, 170).wait(230).call(function () {
                            egret.Tween.removeTweens(car1);
                            view._bgGroup.removeChild(car1);
                        }, view);
                        var car2 = BaseBitmap.create("treasurecarscale-" + view.code);
                        car2.alpha = 0.08;
                        car2.anchorOffsetX = car2.width / 2;
                        car2.anchorOffsetY = car2.height / 2;
                        car2.setScale(2);
                        view._bgGroup.addChild(car2);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, car2, view._car, [40, 32.5]);
                        egret.Tween.get(car2).wait(130).to({ scaleX: 1, scaleY: 1, alpha: 0.75 }, 170).wait(100).call(function () {
                            egret.Tween.removeTweens(car2);
                            view._bgGroup.removeChild(car2);
                        }, view);
                        var car3 = BaseBitmap.create("treasurecarscale-" + view.code);
                        car3.alpha = 0.08;
                        car3.anchorOffsetX = car3.width / 2;
                        car3.anchorOffsetY = car3.height / 2;
                        car3.setScale(2);
                        view._bgGroup.addChild(car3);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, car3, view._car, [40, 32.5]);
                        egret.Tween.get(car3).wait(260).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 140).call(function () {
                            egret.Tween.removeTweens(car3);
                            view._bgGroup.removeChild(car3);
                        }, view).call(function () {
                            var lamp2 = ComponentManager.getCustomMovieClip("treasurecarmove" + view.code + "-", 15, 50);
                            lamp2.blendMode = egret.BlendMode.ADD;
                            lamp2.width = 407;
                            lamp2.height = 154;
                            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lamp2, view._car);
                            lamp2.playWithTime(1);
                            view._car.alpha = 1;
                            lamp2.setEndCallBack(function () {
                                if (lamp2) {
                                    egret.Tween.get(lamp2).to({ alpha: 0 }, 200).call(function () {
                                        view._carTip.setRes(view.vo.isInWeaith() ? "treasurewealthtip-" + view.code : "treasurecartip-" + view.code);
                                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._carTip, item, [0, -view._carTip.height]);
                                        egret.Tween.removeTweens(view._carTip);
                                        view._carTip.alpha = 1;
                                        egret.Tween.get(view._carTip, { loop: true }).to({ y: view._carTip.y - 15 }, 500).to({ y: view._carTip.y }, 500);
                                    }, view).wait(200).call(function () {
                                        egret.Tween.removeTweens(lamp2);
                                        view._bgGroup.removeChild(lamp2);
                                        view.showBoxEnd();
                                    }, view);
                                }
                            }, view);
                            view._bgGroup.addChild(lamp2);
                        }, view);
                        egret.Tween.removeTweens(view._noticescrollView);
                    }, view);
                }, view);
            }, view);
            view._bgGroup.addChild(lamp_1);
        }
        else {
            if (item) {
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view._car, item, [-15, item.height * item.scaleY + (view.cfg.map[curMap].pointType == 1 ? -20 : -35)]);
                var posX = view._car.x + view._car.width / 2 - GameConfig.stageWidth / 2;
                var left = Math.min(Math.max(0, posX), view.viewBg.width / 2);
                view._noticescrollView.scrollLeft = left;
                view._carTip.setRes(view.vo.isInWeaith() ? "treasurewealthtip-" + view.code : "treasurecartip-" + view.code);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._carTip, item, [0, -view._carTip.height]);
                egret.Tween.removeTweens(view._carTip);
                egret.Tween.get(view._carTip, { loop: true }).to({ y: view._carTip.y - 15 }, 500).to({ y: view._carTip.y }, 500);
            }
        }
        // view._noticescrollView.scrollLeft = Math.min(Math.max(0,posX), view.viewBg.width / 2)
    };
    AcTreasureHuntView.prototype.showBoxEnd = function () {
        var view = this;
        var info = view.cfg.map[view.vo.getCurMapId()];
        var data = view._rewardData;
        view.freshView();
        if (info.pointType == 2) {
            ViewController.getInstance().openView(ViewConst.POPUP.ACTREASUREHUNTGETREWARDVIEW, {
                aid: view.aid,
                code: view.code,
                rewards: data.rewards,
                extra: data.wealthGodRewards,
                confirmCallback: function () {
                    ViewController.getInstance().openView(ViewConst.BASE.ACTREASUREHUNTWEALTHSUCVIEW, {
                        aid: view.aid,
                        code: view.code,
                    });
                },
                handler: view
            });
        }
        else if (info.pointType == 3) {
            if (view._oneKeySearchStatus) {
                view.showReward(data);
            }
            else {
                view.showAvg();
            }
        }
        else {
            view.showReward(data);
        }
        view._stopClick = false;
    };
    AcTreasureHuntView.prototype.showReward = function (data) {
        var view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ACTREASUREHUNTGETREWARDVIEW, {
            aid: view.aid,
            code: view.code,
            rewards: data.rewards,
            extra: data.wealthGodRewards,
        });
    };
    AcTreasureHuntView.prototype.tick = function () {
        var view = this;
        if (view.vo.taskHotredBoo) {
            App.CommonUtil.addIconToBDOC(view._boxAdd);
            var redDot = view._boxAdd.getChildByName("reddot");
            if (redDot) {
                redDot.x = 15;
                redDot.y = -10;
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._boxAdd);
        }
        view._boxText.text = LanguageManager.getlocal("acTreasureBoxNum-" + view.code, [view.vo.getBoxNum().toString()]);
        view._boxText.textColor = view.vo.getBoxNum() > 0 ? TextFieldConst.COLOR_WHITE : TextFieldConst.COLOR_WARN_RED3;
        view._boxNumBg.width = view._boxText.textWidth + 60;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, view._boxNumBg, view, [0, 120]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._boxText, view._boxNumBg, [50, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._boxAdd, view._boxNumBg, [5, 0]);
        view._cdText.text = LanguageManager.getlocal("acTreasureTimeTip" + (view.vo.isInActy() ? 1 : 2) + "-" + view.code, [view.vo.getCountCd()]);
        if (view.vo.canGetRoundReward()) {
            App.CommonUtil.addIconToBDOC(view._rewardBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._rewardBtn);
        }
        if (view.vo.isInActy()) {
            if (view._count == 20) {
                view.initBubbleTip();
                view._count = 0;
            }
            ++view._count;
        }
        else {
            egret.Tween.pauseTweens(view._boxClip);
            view._boxClip.setScale(1);
            view._boxClip.rotation = 0;
        }
    };
    AcTreasureHuntView.prototype.initBubbleTip = function () {
        var view = this;
        var bulle = new AcTreasureHuntTip();
        var rewardStr = view.vo.getCurRoundReward();
        var rewardArr = GameData.formatRewardItem(rewardStr);
        var str = '';
        for (var i in rewardArr) {
            var unit = rewardArr[i];
            if (Number(i) == (rewardArr.length - 1)) {
                str += unit.name + "*" + unit.num + "\u3002";
            }
            else {
                str += unit.name + "*" + unit.num + "\uFF0C";
            }
        }
        var qpstr = LanguageManager.getlocal("acTreasureBubbleTip-" + view.code, [str]);
        bulle.init(qpstr, 1, false);
        view._bgGroup.addChild(bulle);
        var curMap = 1;
        var posX = view.mapPos[curMap].x;
        if (posX + bulle.width > view.viewBg.width) {
            posX = view.viewBg.width - bulle.width;
        }
        bulle.setPosition(posX, view.viewBg.y + view.mapPos[curMap].y - 15);
    };
    AcTreasureHuntView.prototype.showDialog = function (buildId) {
        var view = this;
        // console.log(buildId);
        // if(view.vo.getAvgConfig(buildId, this.code)){
        //     ViewController.getInstance().openView(ViewConst.BASE.ACDOUBLESEVENTHAVGVIEW,{
        //         f : view.avgendCallback,
        //         o : view,
        //         idx : 1,
        //         buidId : buildId,
        //         aid : this.aid,
        //         code : this.code
        //     });
        // }
    };
    AcTreasureHuntView.prototype.avgendCallback = function () {
        var view = this;
    };
    AcTreasureHuntView.prototype.lqBtnClick = function () {
        // let view = this;
        // let chargeNum = view.vo.getChargeNum();
        // let descNum = view.cfg.recharge[view._lqjindu].needGem - chargeNum;
        // if(!view.vo.isInActivity()){
        //     App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
        //     return;
        // }
        // if(view.vo.isGetRecharge(view._lqjindu)){
        //     App.CommonUtil.showTip(LanguageManager.getlocal('acDoubleSeventhChargeTip3'));
        //     return;
        // }
        // if(view._showAVG){
        //     return;
        // }
        // if(descNum <= 0){
        //     view._showAVG = true;
        //     view._gquan.visible = true;
        //     egret.Tween.get(view._gquan).to({scaleX : 1.71,scaleY : 1.71}, 160).to({scaleX : 2.22,scaleY : 2.22}, 160).to({scaleX : 2.4,scaleY : 2.4}, 180).
        //     call(()=>{
        //         egret.Tween.removeTweens(view._gquan);
        //         view._gquan.visible = false;
        //         view._gquan.scaleX = view._gquan.scaleY = 1;
        //         view._gquan.alpha = 1;
        //         let lamp;
        //         if (String(this.code) === "2") {
        //             lamp = ComponentManager.getCustomMovieClip("nangualight",10,70);
        //         } else {
        //             lamp = ComponentManager.getCustomMovieClip("dbsevenlamp",10,83);
        //         }
        //         lamp.blendMode = egret.BlendMode.ADD;
        //         if (String(this.code) === "2") {
        //             lamp.width = 324;
        //             lamp.height = 304;
        //             lamp.setScale(1.1);
        //             view.setLayoutPosition(LayoutConst.horizontalCentertop, lamp, view._lqbtn, [3,-93]);
        //         } else {
        //             lamp.width = 407;
        //             lamp.height = 259;
        //             view.setLayoutPosition(LayoutConst.horizontalCentertop, lamp, view._lqbtn, [10,-45]);
        //         }
        //         view.addChild(lamp);
        //         lamp.playWithTime(1);
        //         lamp.setEndCallBack(()=>{
        //             lamp.dispose();
        //             lamp = null;
        //             NetManager.request(NetRequestConst.REQUST_DOUBLESEVEN_GETREWARD,{activeId:this.acTivityId,rechargeId:this._lqjindu});
        //         },view);
        //     },view);
        //     egret.Tween.get(view._gquan).wait(80).to({alpha : 0}, 590);
        // }
        // else{
        //     App.CommonUtil.showTip(LanguageManager.getlocal('acDoubleSeventhChargeTip2' + this.codeResStr, [descNum.toString()]));
        // }
    };
    AcTreasureHuntView.prototype.getRuleInfoParam = function () {
        var zoneStr = 0;
        zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;
        return [zoneStr + ""];
    };
    AcTreasureHuntView.prototype.closeHandler = function () {
        if (this._stopClick) {
            return;
        }
        _super.prototype.hide.call(this);
    };
    AcTreasureHuntView.prototype.dispose = function () {
        var view = this;
        if (this._checkBox) {
            this._oneKeySearchStatus = this._checkBox.checkSelected();
        }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREBOXPLAY), view.playBoxCallback, view);
        view._cdText = null;
        view._circleBg = null;
        view._circleText = null;
        view._boxNumBg = null;
        view._boxText = null;
        view._boxAdd = null;
        view._boxClip = null;
        view._rewardBtn = null;
        view._bgGroup = null;
        if (view._carGroup) {
            view._carGroup.removeTouchTap();
            view._carGroup.dispose();
            view._carGroup = null;
        }
        view._count = 0;
        view._car = null;
        egret.Tween.removeTweens(view._carTip);
        view._carTip = null;
        view._noticescrollView = null;
        view._stopPlay = false;
        view._stopClick = false;
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_DOUBLESEVEN_GETREWARD),view.getrewardCallback,view);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH,this.fresh_jindu,this); 
        _super.prototype.dispose.call(this);
    };
    return AcTreasureHuntView;
}(AcCommonView));
__reflect(AcTreasureHuntView.prototype, "AcTreasureHuntView");
//# sourceMappingURL=AcTreasureHuntView.js.map