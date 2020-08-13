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
//攻城期普通攻城战奖励item
var AcThreeKingdomsRankViewTab2Tab2Item = (function (_super) {
    __extends(AcThreeKingdomsRankViewTab2Tab2Item, _super);
    function AcThreeKingdomsRankViewTab2Tab2Item() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._btn = null;
        _this._stateimg = null;
        _this._click = false;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsRankViewTab2Tab2Item.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab2Tab2Item.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab2Tab2Item.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab2Tab2Item.prototype, "aid", {
        get: function () {
            return AcConst.AID_THREEKINGDOMS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab2Tab2Item.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsRankViewTab2Tab2Item.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcThreeKingdomsRankViewTab2Tab2Item.prototype.initItem = function (index, data, itemparam) {
        var _this = this;
        var view = this;
        view._data = data;
        view._code = itemparam;
        var code = view.getUiCode();
        // let rewardcfg = view.cfg.
        view.width = 610;
        view.height = 230;
        //激战期分荆州赤壁 
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = view.width;
        bg.height = view.height;
        view.addChild(bg);
        var descBg = BaseBitmap.create("common_titlebg");
        view.addChild(descBg);
        descBg.y = 5;
        //防御自己 夺取敌人
        var isdefense = index < 2;
        var attacktype = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRank2Tip" + (isdefense ? 8 : 9), code));
        var cityname = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdoms" + data.kingdoms + "City" + ((data.cityid % 2 == 0 ? 2 : 1) + 3) + "Name", code));
        var descTxt = ComponentManager.getTextField("" + attacktype + cityname, 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(descTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, descTxt, descBg, [15, 0]);
        var rewardcfg = view.cfg.cityReward[isdefense ? 0 : 1];
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRank2Tip10", code), [data.num, attacktype, cityname, rewardcfg.addKingdomScore]), 20, TextFieldConst.COLOR_BROWN);
        tipTxt.lineSpacing = 5;
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, bg, [20, 60]);
        var rewardbg = BaseBitmap.create("public_9_managebg");
        rewardbg.width = 420;
        rewardbg.height = 105;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, rewardbg, bg, [10, 10]);
        view.addChild(rewardbg);
        //本周激战期
        var week = view.vo.getCurWeek();
        var start = view.vo.activeSt + (week - 1) * (7 * 86400);
        var unit = view.cfg.activeTime[data.num % 2 == 1 ? 2 : 3];
        //周六
        var tmp = data.num < 3 ? 6 : 7;
        var datest = start;
        var dateet = start + 4 * 86400;
        var st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
        var et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;
        var timeparam2 = App.DateUtil.getFormatBySecond(st, 15) + "-" + App.DateUtil.getFormatBySecond(et, 15);
        //奖励
        var rewardstr = "1046_1_" + rewardcfg.specialReward2 + "|" + rewardcfg.getReward;
        var rewardTab = rewardstr.split('|');
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 410, 88);
        var rewardNode = new BaseDisplayObjectContainer();
        var delscale = 0.8;
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
            element.setScale(delscale);
            rewardNode.addChild(element);
        }
        else {
            for (var index_1 = 0; index_1 < rIcons.length; index_1++) {
                var element = rIcons[index_1];
                element.anchorOffsetX = element.width / 2;
                element.anchorOffsetY = element.height / 2;
                element.setScale(delscale);
                element.x = tmpX + 45;
                element.y = 45;
                tmpX += (element.width * element.scaleX + 5);
                if (tmpX >= GameConfig.stageWidth) {
                    tmpX = 0;
                    scroStartY += element.height + 15;
                    element.x = tmpX + 45;
                    element.y = scroStartY + 45;
                    tmpX += (element.width * element.scaleX + 5);
                }
                //egret.Tween.get(element,{loop:false}).wait(100*index).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:1.0,scaleY:1.0},50);
                rewardNode.addChild(element);
            }
        }
        // let listbg = BaseBitmap.create(`public_9_downbg`);
        // listbg.width = 398;
        // listbg.height = 105;
        // view.addChild(listbg);
        var scrollView = ComponentManager.getScrollView(rewardNode, rect);
        scrollView.verticalScrollPolicy = "off";
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollView, rewardbg);
        view.addChild(scrollView);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, listbg, scrollView);
        // scrollView.x = 196;
        // listbg.x = 196;
        var collectBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "DragonBoatDayLq", function () {
            if (_this.vo.et < GameData.serverTime) {
                App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
                return;
            }
            if (GameData.serverTime < st) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRank2Tip11", code), [data.num]));
                return;
            }
            if (GameData.serverTime < et) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRank2Tip12", code), [data.num]));
                return;
            }
            var citywarinfo = view.vo.getCityWarInfo(view._data.cityid, view._data.num);
            if (citywarinfo.kingdoms == view.vo.getMyKingdoms()) {
                if (citywarinfo.ischange) {
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRank2Tip5", code)));
                }
                else {
                    if (!view._click) {
                        view._click = true;
                        _this.vo.lastidx = _this._index;
                        _this.vo.lastpos = collectBtn.localToGlobal(collectBtn.width / 2 + 50, 20);
                        NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_CITYREWARD, {
                            activeId: _this.vo.aidAndCode,
                            round: view.vo.getCurWeek(),
                            day: data.num < 3 ? 6 : 7,
                            ftype: data.num % 2 == 1 ? 3 : 4,
                            mainland: data.cityid
                        });
                    }
                }
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRank2Tip4", code)));
            }
            // NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_HEROREWARD,{
            //     rkey : data,
            //     activeId : this.vo.aidAndCode
            // });
        }, this);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, collectBtn, rewardbg, [rewardbg.width + 20, 0]);
        view.addChild(collectBtn);
        view._btn = collectBtn;
        var stateimg = BaseBitmap.create(view.vo.isGetCityReward(data.cityid, data.num) ? "collectflag" : "threekingdomsheroattackstate4");
        stateimg.anchorOffsetX = stateimg.width / 2;
        stateimg.anchorOffsetY = stateimg.height / 2;
        stateimg.setScale(131 / stateimg.width);
        stateimg.setPosition(530, 160);
        //App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, stateimg, rewardbg, [rewardbg.width,0]);
        view.addChild(stateimg);
        view._stateimg = stateimg;
        if (!view.vo.isGetCityReward(data.cityid, data.num)) {
            App.DisplayUtil.changeToGray(stateimg);
        }
        TickManager.addTick(view.tick, view);
        view.tick();
    };
    AcThreeKingdomsRankViewTab2Tab2Item.prototype.refreshUI = function () {
        var view = this;
        view._btn.visible = false;
        /**
         * 展示已领取
         */
        view._stateimg.visible = false;
        view._stateimg.setRes("collectflag");
        var scale = 131 / view._stateimg.width;
        view._stateimg.anchorOffsetX = view._stateimg.width / 2;
        view._stateimg.anchorOffsetY = view._stateimg.height / 2;
        view._stateimg.setScale(scale);
        App.DisplayUtil.changeToNormal(view._stateimg);
        view._stateimg.setPosition(530, 160);
        view._stateimg.setScale(1.3);
        view._stateimg.visible = true;
        egret.Tween.get(view._stateimg).to({ scaleX: scale, scaleY: scale }, 300);
        view._click = false;
    };
    AcThreeKingdomsRankViewTab2Tab2Item.prototype.tick = function () {
        var view = this;
        //本周激战期
        var week = view.vo.getCurWeek();
        var start = view.vo.activeSt + (week - 1) * (7 * 86400);
        var unit = view.cfg.activeTime[view._data.num % 2 == 1 ? 2 : 3];
        //周六 周日
        var tmp = view._data.num < 3 ? 6 : 7;
        var datest = start;
        var dateet = start + 4 * 86400;
        var st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
        var et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;
        view._stateimg.visible = false;
        view._btn.visible = true;
        if (GameData.serverTime < et) {
            view._btn.setGray(true);
        }
        else {
            var citywarinfo = view.vo.getCityWarInfo(view._data.cityid, view._data.num);
            if (citywarinfo.kingdoms == view.vo.getMyKingdoms()) {
                if (citywarinfo.ischange) {
                    //结算后才转阵营而来
                    view._btn.setGray(true);
                }
                else {
                    if (view.vo.isGetCityReward(view._data.cityid, view._data.num)) {
                        view._btn.visible = false;
                        view._stateimg.visible = true;
                    }
                    else {
                        view._btn.setGray(false);
                    }
                }
            }
            else {
                //未达成
                view._stateimg.setRes("threekingdomsheroattackstate4");
                view._stateimg.anchorOffsetX = view._stateimg.width / 2;
                view._stateimg.anchorOffsetY = view._stateimg.height / 2;
                view._stateimg.setScale(131 / view._stateimg.width);
                App.DisplayUtil.changeToGray(view._stateimg);
                view._stateimg.setPosition(530, 160);
                view._btn.visible = false;
                view._stateimg.visible = true;
            }
        }
    };
    // private getHeroIsWin(day : number):boolean{
    //     let view = this;
    //     let flag = false;
    //     let herolist = view._herolist;
    //     if(herolist && typeof herolist[day] != `undefined`){
    //         flag = herolist[day] == 0;
    //     }
    //     return flag;
    // }
    AcThreeKingdomsRankViewTab2Tab2Item.prototype.dispose = function () {
        var view = this;
        view._click = false;
        TickManager.removeTick(view.tick, view);
        this._data = null;
        this._btn = null;
        view._stateimg = null;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsRankViewTab2Tab2Item;
}(ScrollListItem));
__reflect(AcThreeKingdomsRankViewTab2Tab2Item.prototype, "AcThreeKingdomsRankViewTab2Tab2Item");
//# sourceMappingURL=AcThreeKingdomsRankViewTab2Tab2Item.js.map