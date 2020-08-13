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
var AcBattlePassViewTab1ScrollItem = /** @class */ (function (_super) {
    __extends(AcBattlePassViewTab1ScrollItem, _super);
    function AcBattlePassViewTab1ScrollItem() {
        var _this = _super.call(this) || this;
        _this._code = '';
        _this._data = null;
        _this._specialGroup = null;
        _this._lqbtn = null;
        _this._iconbg = null;
        _this._collectflag = null;
        _this._levelTxt = null;
        return _this;
    }
    Object.defineProperty(AcBattlePassViewTab1ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_BATTLEPASS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab1ScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEPASS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab1ScrollItem.prototype, "acTivityId", {
        get: function () {
            return AcConst.AID_BATTLEPASS + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab1ScrollItem.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcBattlePassView');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab1ScrollItem.prototype, "newCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcBattlePassView');
            var code = baseview.getNewCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattlePassViewTab1ScrollItem.prototype.initSpecialReward = function (data, item) {
        var view = this;
        view.width = 618;
        view.height = 80;
        view._code = item;
        var code = view.uiCode;
        var newCode = view.newCode;
        view._data = data;
        var curLevel = view.vo.getLevel();
        //等级展示
        var iconbgstr = this.vo.isNewUi() ? "battlepassrewardlevelbg3-" + newCode : "acarcherview_numBg";
        var iconbg = BaseBitmap.create(iconbgstr);
        iconbg.name = "iconbg";
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, iconbg, view, [-6, -5]);
        view.addChild(iconbg);
        var fontname = this.vo.isNewUi() ? "battlepass_fnt" : TextFieldConst.FONTNAME_ITEMTIP;
        var levelTxt = ComponentManager.getBitmapText("" + data.level, fontname);
        levelTxt.name = "levelTxt";
        view.addChild(levelTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, levelTxt, iconbg, [0, 10]);
        if (this.vo.isNewUi()) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, iconbg, view, [155, -5]);
            var hudie = BaseBitmap.create("battlepasshudie");
            hudie.setPosition(iconbg.x + iconbg.width - 35, iconbg.y - 10);
            view.addChild(hudie);
        }
        var collectFlag = BaseBitmap.create(App.CommonUtil.getResByCode("battlepasscollect5", code));
        collectFlag.name = "collectFlag";
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, collectFlag, iconbg);
        view.addChild(collectFlag);
        collectFlag.visible = view.vo.getLevelReward(data.level);
        levelTxt.visible = !collectFlag.visible;
        var specialGroup = new BaseDisplayObjectContainer();
        specialGroup.width = view.width;
        specialGroup.height = view.height;
        view.addChild(specialGroup);
        view._specialGroup = specialGroup;
        view.createIcon(data, true);
        var numbg = null;
        if (this.vo.isNewUi()) {
            numbg = BaseBitmap.create('battlepasstxtbg');
            numbg.name = "numbg";
            numbg.x = iconbg.x + iconbg.width / 2 - numbg.width / 2;
            numbg.y = iconbg.y + iconbg.height - 15;
            view.addChild(numbg);
            numbg.visible = !collectFlag.visible;
        }
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("battlepasscanget"), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipTxt, iconbg, [0, 3]);
        view.addChild(tipTxt);
        tipTxt.name = "tipTxt";
        tipTxt.visible = !collectFlag.visible;
        if (numbg) {
            tipTxt.y = numbg.y + numbg.height / 2 - tipTxt.height / 2;
        }
    };
    AcBattlePassViewTab1ScrollItem.prototype.freshSpecialReward = function (data, code) {
        var view = this;
        var levelTxt = view.getChildByName("levelTxt");
        levelTxt.text = "" + data.level;
        var flag = view.getChildByName("collectFlag");
        flag.visible = view.vo.getLevelReward(data.level);
        var tipTxt = view.getChildByName("tipTxt");
        tipTxt.visible = !flag.visible;
        levelTxt.visible = !flag.visible;
        var numbg = view.getChildByName("numbg");
        if (numbg) {
            numbg.visible = !flag.visible;
        }
        var iconbg = view.getChildByName("iconbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, levelTxt, iconbg, [0, 8]);
        if (view._data.level == data.level) {
            return;
        }
        view._specialGroup.dispose();
        view._specialGroup = null;
        var specialGroup = new BaseDisplayObjectContainer();
        specialGroup.width = view.width;
        specialGroup.height = view.height;
        view.addChild(specialGroup);
        view._specialGroup = specialGroup;
        view._data = data;
        view.createIcon(data, true);
        return;
    };
    AcBattlePassViewTab1ScrollItem.prototype.initItem = function (index, data, item) {
        var view = this;
        view._code = item;
        var code = view.uiCode;
        var newcode = view.newCode;
        view._data = data;
        view.width = 618;
        view.height = data.level == view.cfg.segmentation ? 120 : 90;
        /**
         *  --expNeed:升级需要经验
        --specialGift:特殊档位标识。1
        --primary:普通政令奖励
        --intermediate:黄金政令奖励
        --advanced:传世政令奖励
        --level
        */
        //起始参考点
        var curLevel = view.vo.getLevel();
        //等级展示
        var iconbg = BaseBitmap.create(App.CommonUtil.getResByCode("battlepassrewardlevelbg" + (data.level > curLevel ? 1 : 2), newcode));
        view._iconbg = iconbg;
        var isline = data.level > view.cfg.segmentation;
        if (this.vo.isNewUi()) {
            isline = false;
        }
        iconbg.setScale(isline ? 0.8 : 1);
        var iconbgx = isline ? 20 : 15;
        if (this.vo.isNewUi()) {
            iconbgx += 140;
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, iconbg, view, [iconbgx, 13]);
        if (data.level != 1) {
            if (this.vo.isNewUi()) {
                var point = BaseBitmap.create("battlepasspro" + (data.level > curLevel ? '2' : '1'));
                point.height = 60;
                point.x = iconbg.x + iconbg.width * iconbg.scaleX / 2 - point.width / 2;
                point.y = iconbg.y - point.height * point.scaleY + 20;
                view.addChild(point);
            }
            else {
                var point = BaseBitmap.create("progress13" + (data.level > curLevel ? '_bg' : ''));
                point.name = "point" + data.level;
                point.width = (data.level == view.cfg.segmentation + 1) ? 64 : (isline ? (data.level > curLevel ? 51 : 45) : (data.level > curLevel ? 45 : 36));
                point.height = data.level > curLevel ? 20 : 35;
                point.rotation = 90;
                point.x = data.level > curLevel ? 52 : 59;
                point.y = (data.level == view.cfg.segmentation + 1) ? -51 : (isline ? (data.level > curLevel ? -36 : -32) : (data.level > curLevel ? -28 : -22));
                // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, point, iconbg, [20, iconbg.height - 10]);
                view.addChild(point);
            }
        }
        view.addChild(iconbg);
        var levelTxt = ComponentManager.getTextField("" + data.level, 24);
        levelTxt.textColor = data.level > curLevel ? TextFieldConst.COLOR_WHITE : TextFieldConst.COLOR_BLACK;
        levelTxt.setScale(isline ? 0.8 : 1);
        view.addChild(levelTxt);
        this._levelTxt = levelTxt;
        if (this.vo.isNewUi()) {
            levelTxt.x = iconbg.x + iconbg.width * iconbg.scaleX / 2 - levelTxt.width * levelTxt.scaleX / 2;
            levelTxt.y = iconbg.y + iconbg.height * iconbg.scaleY / 2 - levelTxt.height * levelTxt.scaleY / 2;
        }
        else {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, levelTxt, iconbg, [isline ? -4 : -6, 0]);
        }
        //可领取
        var lqbtn = ComponentManager.getButton("battlepasslqbtn", "taskCollect", function () {
            if (view.vo.isEnd) {
                App.CommonUtil.showTip(LanguageManager.getlocal('acBattlePassTimeEnd'));
                return;
            }
            // if(!view.vo.checkRedPoint1){
            // 	App.CommonUtil.showTip(LanguageManager.getlocal(`acBattlePassNoReward-${code}`));
            // 	return;
            // }
            //领奖
            view.vo.selIdx = index;
            NetManager.request(NetRequestConst.REQUEST_BATTLEPASS_GETLVRWD, {
                activeId: view.acTivityId
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lqbtn, iconbg, [-3, 0]);
        view.addChild(lqbtn);
        view._lqbtn = lqbtn;
        lqbtn.visible = data.level <= curLevel && !view.vo.getLevelReward(data.level);
        var collectFlag = BaseBitmap.create(App.CommonUtil.getResByCode("battlepasscollect5", code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, collectFlag, lqbtn);
        view.addChild(collectFlag);
        view._collectflag = collectFlag;
        collectFlag.visible = view.vo.getLevelReward(data.level);
        if (data.level == (view.vo.getHaveGetLevel() + 1)) {
            lqbtn.setEnable(true);
            if (data.level <= curLevel) {
                if (this.vo.isNewUi() && lqbtn.visible) {
                    var getimg = void 0;
                    if (PlatformManager.checkIsThSp()) {
                        getimg = BaseBitmap.create(App.CommonUtil.getResByCode("battlepassgetimg", code));
                    }
                    else {
                        getimg = ComponentManager.getBitmapText("a", "battlepass_fnt");
                    }
                    getimg.name = "getimg";
                    getimg.x = iconbg.x + iconbg.width * iconbg.scaleX / 2 - getimg.width / 2;
                    getimg.y = iconbg.y + iconbg.height * iconbg.scaleY / 2 - getimg.height / 2;
                    view.addChild(getimg);
                    iconbg.setRes("battlepassrewardlevelbg3-" + newcode);
                    levelTxt.visible = false;
                    var hudie = BaseBitmap.create("battlepasshudie");
                    hudie.name = "hudie";
                    hudie.setPosition(view._iconbg.x + view._iconbg.width - 35, view._iconbg.y - 10);
                    view.addChild(hudie);
                }
            }
        }
        else {
            lqbtn.setEnable(false);
        }
        if (this.vo.isNewUi()) {
            view._lqbtn.visible = false;
        }
        iconbg.addTouchTap(function () {
            if (view.vo.isEnd) {
                App.CommonUtil.showTip(LanguageManager.getlocal('acBattlePassTimeEnd'));
                return;
            }
            view.vo.selIdx = index;
            NetManager.request(NetRequestConst.REQUEST_BATTLEPASS_GETLVRWD, {
                activeId: view.acTivityId
            });
        }, view, null);
        iconbg.touchEnabled = (data.level <= curLevel) && (!view.vo.getLevelReward(data.level)) && (data.level == (view.vo.getHaveGetLevel() + 1));
        //物品奖励
        var specialGroup = new BaseDisplayObjectContainer();
        specialGroup.width = view.width;
        specialGroup.height = view.height;
        view.addChild(specialGroup);
        view._specialGroup = specialGroup;
        view.createIcon(data);
    };
    AcBattlePassViewTab1ScrollItem.prototype.createIcon = function (data, flag) {
        if (flag === void 0) { flag = false; }
        var view = this;
        var code = view.uiCode;
        /**
         *  --expNeed:升级需要经验
        --specialGift:特殊档位标识。1
        --primary:普通政令奖励
        --intermediate:黄金政令奖励
        --advanced:传世政令奖励
        --level
        */
        //起始参考点
        var rect = {
            1: { 1: { x: 0, width: 90 }, 2: { x: 90, width: 170 }, 3: { x: 250, width: 355 } },
            2: { 1: { x: 0, width: 90 }, 2: { x: 90, width: 175 }, 3: { x: 259, width: 175 }, 4: { x: 437, width: 175 } },
            3: { 1: { x: 0, width: 90 }, 2: { x: 90, width: 160 }, 3: { x: 250, width: 355 } }
        };
        var param = rect[code] ? rect[code] : rect[3];
        //阶段奖励物品
        var levelarr = ["primary", "intermediate", "advanced"];
        for (var i in levelarr) {
            var type = levelarr[i];
            var tmp2 = param[Number(i) + 2];
            if (data["" + type] || data["special" + (Number(i) + 1)]) {
                var zhanling = data["special" + (Number(i) + 1)];
                var rewardStr = [];
                if (zhanling) {
                    rewardStr.push(["1009_0_" + zhanling + "_" + view._code, 0]);
                }
                if (data["" + type]) {
                    rewardStr = rewardStr.concat(data["" + type]);
                }
                // let rewardvos = GameData.formatRewardItem(rewardStr);
                var iconList = [];
                //头像框开关检测
                for (var i_1 in rewardStr) {
                    var rewardvo = GameData.formatRewardItem(rewardStr[i_1][0])[0];
                    if (rewardvo.type == 11 && !Api.switchVoApi.checkIsTitleState(rewardvo.id.toString())) {
                        continue;
                    }
                    iconList.push({
                        info: rewardvo,
                        show: rewardStr[i_1][1] == 1
                    });
                }
                // let iconList = GameData.getRewardItemIcons(rewardStr, true);
                var left = (tmp2.width - iconList.length * 75 - (iconList.length - 1) * 5) / 2;
                if (type == "primary" && iconList.length > 1) {
                    left -= 6;
                }
                if (type == "primary" && this.vo.isNewUi()) {
                    left -= 85;
                }
                for (var j in iconList) {
                    var unit = iconList[j];
                    var rewardvo = unit.info;
                    var icon = GameData.getItemIcon(rewardvo, true);
                    icon.setScale(0.75);
                    icon.name = "icon" + type + j;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, view._specialGroup, [tmp2.x + left + (Number(j) * (icon.width * icon.scaleX + 5)), 0], flag);
                    view._specialGroup.addChild(icon);
                    if (!flag) {
                        if (data.level > view.vo.getLevel() || (view.vo.getMyBattleLevel() < (Number(i) + 1))) {
                            App.DisplayUtil.changeToGray(icon);
                        }
                    }
                    if (unit.show) {
                        var iconbg = icon.getChildByName("iconBg");
                        iconbg.setRes(App.CommonUtil.getResByCode("battlepassspecialbg", code));
                        var iconimg = icon.getChildByName("icon");
                        if (rewardvo.type == 8 || rewardvo.type == 10 || rewardvo.type == 16 || rewardvo.type == 19 || rewardvo.type == 24) {
                            var circle = new egret.Shape();
                            circle.graphics.beginFill(0x0000ff);
                            circle.graphics.drawCircle(49, 49, 49);
                            circle.graphics.endFill();
                            icon.addChild(circle);
                            iconimg.mask = circle;
                        }
                        var light = BaseBitmap.create("public_rotatelight");
                        light.name = "lightup" + rewardvo.id;
                        light.anchorOffsetX = light.width / 2;
                        light.anchorOffsetY = light.height / 2;
                        light.setScale(0.5);
                        light.setPosition(iconbg.width / 2, iconbg.height / 2);
                        egret.Tween.get(light, { loop: true }).to({ rotation: 360 }, 3000);
                        icon.addChildAt(light, icon.getChildIndex(iconbg) + 1);
                    }
                    // let collectFlag = BaseBitmap.create(`battlepasscollect5-${code}`);
                    // collectFlag.name = `collectFlag${type}${j}`;
                    // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, collectFlag, icon);
                    // view._specialGroup.addChild(collectFlag);
                    // collectFlag.visible = view.vo.getMyBattleLevel() >= (Number(i) + 1) ? view.vo.getLevelReward(data.level) : false;
                }
                if (flag) {
                }
                else {
                    var line = null;
                    if (data.level == view.cfg.segmentation) {
                    }
                    else {
                        line = BaseBitmap.create(App.CommonUtil.getResByCode("battlepassrewardline", code));
                        line.width = tmp2.width - 30;
                        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, line, view, [tmp2.x + (tmp2.width - line.width) / 2, 5]);
                        view.addChild(line);
                        if (this.vo.isNewUi) {
                            line.visible = false;
                        }
                    }
                }
            }
        }
        if (!flag && data.level == view.cfg.segmentation) {
            var line = BaseBitmap.create(App.CommonUtil.getResByCode("battlepassline", code));
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, line, view, [90, 5]);
            view.addChild(line);
            if (this.vo.isNewUi) {
                line.visible = false;
            }
        }
    };
    AcBattlePassViewTab1ScrollItem.prototype.refreshItem = function () {
        var view = this;
        var code = view.uiCode;
        var newcode = view.newCode;
        var curLevel = view.vo.getLevel();
        view._lqbtn.visible = view._data.level <= curLevel && !view.vo.getLevelReward(view._data.level);
        view._iconbg.setRes(App.CommonUtil.getResByCode("battlepassrewardlevelbg" + (view._data.level > curLevel ? 1 : 2), code));
        view._collectflag.visible = view.vo.getLevelReward(view._data.level);
        view._levelTxt.visible = true;
        view._iconbg.touchEnabled = (view._data.level <= curLevel) && (!view.vo.getLevelReward(view._data.level)) && (view._data.level == (view.vo.getHaveGetLevel() + 1));
        if (view._data.level == (view.vo.getHaveGetLevel() + 1)) {
            view._lqbtn.setEnable(true);
            if (view._data.level <= curLevel) {
                if (this.vo.isNewUi()) {
                    var getimg = ComponentManager.getBitmapText("a", "battlepass_fnt");
                    getimg.name = "getimg";
                    getimg.x = view._iconbg.x + view._iconbg.width * view._iconbg.scaleX / 2 - getimg.width / 2;
                    getimg.y = view._iconbg.y + view._iconbg.height * view._iconbg.scaleY / 2 - getimg.height / 2;
                    view.addChild(getimg);
                    view._iconbg.setRes("battlepassrewardlevelbg3-" + newcode);
                    view._levelTxt.visible = false;
                    var hudie = BaseBitmap.create("battlepasshudie");
                    hudie.name = "hudie";
                    hudie.setPosition(view._iconbg.x + view._iconbg.width - 35, view._iconbg.y - 10);
                    view.addChild(hudie);
                }
            }
        }
        else {
            view._lqbtn.setEnable(false);
            var getimg = view.getChildByName("getimg");
            if (getimg) {
                getimg.visible = false;
            }
            var hudie = view.getChildByName("hudie");
            if (hudie) {
                hudie.visible = false;
            }
        }
        if (this.vo.isNewUi()) {
            view._lqbtn.visible = false;
        }
    };
    /**
     * 不同格子X间距
     */
    AcBattlePassViewTab1ScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcBattlePassViewTab1ScrollItem.prototype.getSpaceY = function () {
        if (this.vo.isNewUi()) {
            return 10;
        }
        return 5;
    };
    AcBattlePassViewTab1ScrollItem.prototype.dispose = function () {
        this._data = null;
        this._specialGroup.dispose();
        this._lqbtn = null;
        this._iconbg = null;
        this._collectflag = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattlePassViewTab1ScrollItem;
}(ScrollListItem));
//# sourceMappingURL=AcBattlePassViewTab1ScrollItem.js.map