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
//神将突袭奖励item
var AcThreeKingdomsHeroAttackItem = (function (_super) {
    __extends(AcThreeKingdomsHeroAttackItem, _super);
    function AcThreeKingdomsHeroAttackItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._btn = null;
        _this._herolist = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsHeroAttackItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsHeroAttackItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsHeroAttackItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsHeroAttackItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_THREEKINGDOMS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsHeroAttackItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsHeroAttackItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcThreeKingdomsHeroAttackItem.prototype.initItem = function (index, data, itemparam) {
        var _this = this;
        var view = this;
        view._data = data;
        view._code = itemparam.code;
        view._herolist = itemparam.heroHpList;
        var bosshp = itemparam.bosshp;
        var code = view.getUiCode();
        var tarColor = TextFieldConst.COLOR_BROWN;
        var islock = view.vo.getCurWeek() < 4;
        // let rewardcfg = view.cfg.
        view.width = 639;
        view.height = 289 + 10;
        var bg = BaseBitmap.create("threekingdomsprankofficerlistbg");
        view.addChild(bg);
        var arr = {
            1: [2014, 2015, 1038, 1037, 1033],
            2: [1038, 1037, 1058, 1020, 1033],
            3: [1058, 1020, 2014, 2015, 1033]
        };
        var sid = arr[view.vo.getMyKingdoms()][data - 1];
        var cfg = Config.ServantCfg.getServantItemById(sid);
        var hero = null;
        if (islock) {
            hero = BaseBitmap.create("threekingdomsprankofficerunkown");
            view.addChild(hero);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, hero, bg, [40, 15]);
        }
        else {
            if (data > view.vo.getTodayWeek()) {
                hero = BaseBitmap.create("threekingdomsprankofficerunkown");
                view.addChild(hero);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, hero, bg, [40, 15]);
            }
            else {
                hero = BaseLoadBitmap.create(cfg.fullIcon);
                hero.width = 405;
                hero.height = 467;
                hero.setScale(0.5);
                view.addChild(hero);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, hero, bg, [40, 15]);
                var inattack = BaseBitmap.create("threekingdomsprankofficerinattack");
                view.addChild(inattack);
                inattack.visible = false;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, inattack, hero, [0, 60]);
                var namebg = BaseBitmap.create("specialview_commoni_namebg");
                var nameTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acthreekingdomsheroattacktip5", code), [cfg.name]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
                namebg.width = nameTxt.width + 40;
                view.addChild(namebg);
                view.addChild(nameTxt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, namebg, inattack, [0, inattack.height]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, namebg);
                if (data == view.vo.getTodayWeek()) {
                    if (view.vo.isInTuxiTime()) {
                        inattack.visible = true;
                        var light = BaseBitmap.create("public_9_bg57");
                        light.width = 600;
                        light.height = 310;
                        light.setPosition(20, -10);
                        this.addChild(light);
                        egret.Tween.get(light, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
                    }
                }
                //是否已被击败
                if (view.getHeroIsWin(data)) {
                    inattack.visible = false;
                    App.DisplayUtil.changeToGray(hero);
                    var txt = BaseBitmap.create("threekingdomsheroattackstate2");
                    view.addChild(txt);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt, hero, [0, 0]);
                }
            }
        }
        var descBg = BaseBitmap.create("alliance_taskwotdbg1");
        descBg.width = 340;
        descBg.height = 80;
        descBg.alpha = 0.4;
        view.addChild(descBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descBg, bg, [235, 25]);
        //第四周
        var start = view.vo.activeSt + (4 - 1) * (7 * 86400);
        var unit = view.cfg.activeTime[1];
        var tmp = data;
        var datest = start;
        var dateet = start + 4 * 86400;
        var st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
        var et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;
        var timeparam2 = App.DateUtil.getFormatBySecond(st, 15) + "-" + App.DateUtil.getFormatBySecond(et, 15);
        var addExp = view.cfg.addHeroExp;
        var dateTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acthreekingdomsheroattacktip6", code), [timeparam2, addExp.toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(dateTxt);
        dateTxt.lineSpacing = 6;
        dateTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, dateTxt, descBg);
        //奖励
        var rewardTab = view.cfg.officer2.split('|');
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 386, 110);
        var rewardNode = new BaseDisplayObjectContainer();
        var len = Math.min(5, rewardTab.length);
        var tmpX = 0;
        var scroStartY = 0; //(bottomBg.height - (Math.ceil(rewardTab.length / 5) * 106 + (Math.ceil(rewardTab.length / 5) - 1) * 20)) / 2;//15;
        var rIcons = GameData.getRewardItemIcons(rewardTab.join("|"), true, false);
        if (rIcons.length == 1) {
            var element = rIcons[0];
            element.anchorOffsetX = element.width / 2;
            element.anchorOffsetY = element.height / 2;
            element.x = GameConfig.stageWidth / 2;
            element.y = scroStartY + element.height / 2;
            element.setScale(0.8);
            rewardNode.addChild(element);
        }
        else {
            for (var index_1 = 0; index_1 < rIcons.length; index_1++) {
                var element = rIcons[index_1];
                element.anchorOffsetX = element.width / 2;
                element.anchorOffsetY = element.height / 2;
                element.setScale(0.8);
                element.x = tmpX + element.width / 2;
                element.y = scroStartY + element.height / 2;
                tmpX += (element.width * element.scaleX + 5);
                if (tmpX >= GameConfig.stageWidth) {
                    tmpX = 0;
                    scroStartY += element.height + 15;
                    element.x = tmpX + element.width / 2;
                    element.y = scroStartY + element.height / 2;
                    tmpX += (element.width * element.scaleX + 5);
                }
                //egret.Tween.get(element,{loop:false}).wait(100*index).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:1.0,scaleY:1.0},50);
                rewardNode.addChild(element);
            }
        }
        var listbg = BaseBitmap.create("public_9_downbg");
        listbg.width = 398;
        listbg.height = 105;
        view.addChild(listbg);
        var scrollView = ComponentManager.getScrollView(rewardNode, rect);
        scrollView.verticalScrollPolicy = "off";
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollView, descBg, [0, descBg.height]);
        view.addChild(scrollView);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, listbg, scrollView);
        scrollView.x = 196;
        listbg.x = 196;
        var collectBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "DragonBoatDayLq", function () {
            if (_this.vo.et < GameData.serverTime) {
                App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
                return;
            }
            _this.vo.lastidx = _this._index;
            _this.vo.lastpos = collectBtn.localToGlobal(collectBtn.width / 2 + 50, 20);
            NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_HEROREWARD, {
                rkey: data,
                activeId: _this.vo.aidAndCode
            });
        }, this);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, collectBtn, scrollView, [0, scrollView.height - 5]);
        view.addChild(collectBtn);
        view._btn = collectBtn;
        if (islock) {
            collectBtn.setEnable(false);
        }
        else {
            if (view.vo.getMyKingdoms() && view.vo.canGetHeroAttackReward(data)) {
                if (view.vo.isGetHeroWinReward(data)) {
                    collectBtn.visible = false;
                    var collectFlag = BaseBitmap.create("collectflag");
                    collectFlag.anchorOffsetX = collectFlag.width / 2;
                    collectFlag.anchorOffsetY = collectFlag.height / 2;
                    collectFlag.setScale(0.7);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, collectFlag, collectBtn, [0, -20]);
                    this.addChild(collectFlag);
                }
                else {
                    if (data <= view.vo.getTodayWeek()) {
                        if (view.getHeroIsWin(data)) {
                            collectBtn.setEnable(true);
                        }
                        else {
                            if (data == view.vo.getTodayWeek()) {
                                collectBtn.setEnable(false);
                            }
                            else {
                                collectBtn.visible = false;
                                //击退失败
                                var txt = BaseBitmap.create("threekingdomsheroattackstate1");
                                view.addChild(txt);
                                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt, collectBtn);
                            }
                        }
                    }
                    else {
                        collectBtn.setEnable(false);
                    }
                }
            }
            else {
                collectBtn.visible = false;
                //未参与
                var txt = BaseBitmap.create("threekingdomsheroattackstate3");
                view.addChild(txt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt, collectBtn);
            }
        }
    };
    AcThreeKingdomsHeroAttackItem.prototype.refreshUI = function () {
        var view = this;
        view._btn.visible = false;
        /**
         * 展示已领取
         */
        var collectFlag = BaseBitmap.create("collectflag");
        collectFlag.anchorOffsetX = collectFlag.width / 2;
        collectFlag.anchorOffsetY = collectFlag.height / 2;
        collectFlag.setScale(0.7);
        this.addChild(collectFlag);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, collectFlag, view._btn, [0, -20]);
        collectFlag.visible = false;
        collectFlag.setScale(1.3);
        collectFlag.visible = true;
        egret.Tween.get(collectFlag).to({ scaleX: 0.7, scaleY: 0.7 }, 300);
    };
    AcThreeKingdomsHeroAttackItem.prototype.getHeroIsWin = function (day) {
        var view = this;
        var flag = false;
        var herolist = view._herolist;
        if (herolist && typeof herolist[day] != "undefined") {
            flag = herolist[day] <= 0;
        }
        return flag;
    };
    AcThreeKingdomsHeroAttackItem.prototype.dispose = function () {
        this._data = null;
        this._btn = null;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsHeroAttackItem;
}(ScrollListItem));
__reflect(AcThreeKingdomsHeroAttackItem.prototype, "AcThreeKingdomsHeroAttackItem");
//# sourceMappingURL=AcThreeKingdomsHeroAttackItem.js.map