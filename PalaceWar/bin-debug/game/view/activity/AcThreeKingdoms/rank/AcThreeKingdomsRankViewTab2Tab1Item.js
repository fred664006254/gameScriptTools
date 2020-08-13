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
//攻城期激战中心城市奖励item
var AcThreeKingdomsRankViewTab2Tab1Item = (function (_super) {
    __extends(AcThreeKingdomsRankViewTab2Tab1Item, _super);
    function AcThreeKingdomsRankViewTab2Tab1Item() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._btn = null;
        _this._stateimg = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsRankViewTab2Tab1Item.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab2Tab1Item.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab2Tab1Item.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab2Tab1Item.prototype, "aid", {
        get: function () {
            return AcConst.AID_THREEKINGDOMS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab2Tab1Item.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsRankViewTab2Tab1Item.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcThreeKingdomsRankViewTab2Tab1Item.prototype.initItem = function (index, data, itemparam) {
        var _this = this;
        var view = this;
        view._data = data;
        view._code = itemparam;
        // let rewardcfg = view.cfg.
        view.width = 640;
        view.height = 370 + 10;
        var isjingzhou = index == 0;
        var title = BaseBitmap.create("threekingdomsrankcityrewawrdtitle" + (isjingzhou ? 2 : 1));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, title, view, [0, 0], true);
        //激战期分荆州赤壁 
        var bg = BaseBitmap.create("threekingdomsrankcityrewawrdbg" + (isjingzhou ? 2 : 1));
        view.addChild(bg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, title, [0, title.height / 2]);
        view.addChild(title);
        var descBg = BaseBitmap.create("alliance_taskwotdbg1");
        descBg.width = 490;
        descBg.height = 80;
        descBg.alpha = 0.4;
        view.addChild(descBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, bg, [0, 35]);
        //本周激战期
        var week = view.vo.getCurWeek();
        var start = view.vo.activeSt + (week - 1) * (7 * 86400);
        var unit = view.cfg.activeTime[4];
        //周六
        var tmp = isjingzhou ? 6 : 7;
        var datest = start;
        var dateet = start + 4 * 86400;
        var st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
        var et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;
        var timeparam2 = App.DateUtil.getFormatBySecond(st, 15) + "-" + App.DateUtil.getFormatBySecond(et, 15);
        var code = view.getUiCode();
        var cfg = view.cfg.cityReward[isjingzhou ? 2 : 3];
        var dateTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRank2Tip2", code), [timeparam2, LanguageManager.getlocal("acThreeKingdomscenterCityName_" + (isjingzhou ? 1 : 2) + "-1"), cfg.addKingdomScore.toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(dateTxt);
        dateTxt.lineSpacing = 6;
        dateTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, dateTxt, descBg);
        //奖励
        var rewardstr = cfg.getReward;
        var rewardTab = rewardstr.split('|');
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 520, 110);
        var rewardNode = new BaseDisplayObjectContainer();
        var len = Math.min(5, rewardTab.length);
        var tmpX = (520 - (len * 108 * 0.9 + (len - 1) * 5)) / 2;
        var scroStartY = 0; //(bottomBg.height - (Math.ceil(rewardTab.length / 5) * 106 + (Math.ceil(rewardTab.length / 5) - 1) * 20)) / 2;//15;
        var rIcons = GameData.getRewardItemIcons(rewardTab.join("|"), true, false);
        if (rIcons.length == 1) {
            var element = rIcons[0];
            element.anchorOffsetX = element.width / 2;
            element.anchorOffsetY = element.height / 2;
            element.x = GameConfig.stageWidth / 2;
            element.y = scroStartY + element.height / 2;
            element.setScale(0.9);
            rewardNode.addChild(element);
        }
        else {
            for (var index_1 = 0; index_1 < rIcons.length; index_1++) {
                var element = rIcons[index_1];
                element.anchorOffsetX = element.width / 2;
                element.anchorOffsetY = element.height / 2;
                element.setScale(0.9);
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
        // let listbg = BaseBitmap.create(`public_9_downbg`);
        // listbg.width = 398;
        // listbg.height = 105;
        // view.addChild(listbg);
        var scrollView = ComponentManager.getScrollView(rewardNode, rect);
        scrollView.verticalScrollPolicy = "off";
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollView, descBg, [0, descBg.height]);
        view.addChild(scrollView);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, listbg, scrollView);
        // scrollView.x = 196;
        // listbg.x = 196;
        var collectBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "DragonBoatDayLq", function () {
            if (_this.vo.et < GameData.serverTime) {
                App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
                return;
            }
            var week = view.vo.getCurWeek();
            var start = view.vo.activeSt + (week - 1) * (7 * 86400);
            var tmp = isjingzhou ? 6 : 7;
            var datest = start;
            var dateet = start + 4 * 86400;
            var st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
            var et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;
            if (GameData.serverTime < st) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRank2Tip3", code)));
                return;
            }
            if (GameData.serverTime < et) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRank2Tip6", code)));
                return;
            }
            var centercitywarinfo = view.vo.getCenterCityWarInfo(isjingzhou ? 1 : 2);
            if (centercitywarinfo.kingdoms == view.vo.getMyKingdoms()) {
                if (centercitywarinfo.ischange) {
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRank2Tip5", code)));
                }
                else {
                    _this.vo.lastidx = _this._index;
                    _this.vo.lastpos = collectBtn.localToGlobal(collectBtn.width / 2 + 50, 20);
                    NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_CITYREWARD, {
                        activeId: _this.vo.aidAndCode,
                        round: view.vo.getCurWeek(),
                        day: isjingzhou ? 6 : 7,
                        ftype: 5,
                        mainland: 7
                    });
                }
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRank2Tip4", code)));
            }
        }, this);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, collectBtn, scrollView, [0, scrollView.height + 20]);
        view.addChild(collectBtn);
        view._btn = collectBtn;
        var stateimg = BaseBitmap.create(view.vo.isGetCenterCityReward(isjingzhou ? 1 : 2) ? "collectflag" : "threekingdomsheroattackstate4");
        stateimg.anchorOffsetX = stateimg.width / 2;
        stateimg.anchorOffsetY = stateimg.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, stateimg, collectBtn);
        view.addChild(stateimg);
        stateimg.setScale(131 / stateimg.width);
        view._stateimg = stateimg;
        if (!view.vo.isGetCenterCityReward(isjingzhou ? 1 : 2)) {
            App.DisplayUtil.changeToGray(stateimg);
        }
        TickManager.addTick(view.tick, view);
        view.tick();
    };
    AcThreeKingdomsRankViewTab2Tab1Item.prototype.refreshUI = function () {
        var view = this;
        view._btn.visible = false;
        /**
         * 展示已领取
         */
        view._stateimg.visible = false;
        view._stateimg.setRes("collectflag");
        view._stateimg.anchorOffsetX = view._stateimg.width / 2;
        view._stateimg.anchorOffsetY = view._stateimg.height / 2;
        var scale = 131 / view._stateimg.width;
        view._stateimg.setScale(scale);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._stateimg, view._btn);
        App.DisplayUtil.changeToNormal(view._stateimg);
        view._stateimg.setScale(1.3);
        view._stateimg.visible = true;
        egret.Tween.get(view._stateimg).to({ scaleX: scale, scaleY: scale }, 300);
    };
    AcThreeKingdomsRankViewTab2Tab1Item.prototype.tick = function () {
        var view = this;
        //本周激战期
        var week = view.vo.getCurWeek();
        var start = view.vo.activeSt + (week - 1) * (7 * 86400);
        var unit = view.cfg.activeTime[4];
        //周六 周日
        var isjingzhou = view._index == 0;
        var tmp = isjingzhou ? 6 : 7;
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
            var centercitywarinfo = view.vo.getCenterCityWarInfo(isjingzhou ? 1 : 2);
            if (centercitywarinfo.kingdoms == view.vo.getMyKingdoms()) {
                if (centercitywarinfo.ischange) {
                    //结算后才转阵营而来
                    view._btn.setGray(true);
                }
                else {
                    if (view.vo.isGetCenterCityReward(isjingzhou ? 1 : 2)) {
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
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._stateimg, view._btn);
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
    AcThreeKingdomsRankViewTab2Tab1Item.prototype.dispose = function () {
        var view = this;
        TickManager.removeTick(view.tick, view);
        this._data = null;
        this._btn = null;
        view._stateimg = null;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsRankViewTab2Tab1Item;
}(ScrollListItem));
__reflect(AcThreeKingdomsRankViewTab2Tab1Item.prototype, "AcThreeKingdomsRankViewTab2Tab1Item");
//# sourceMappingURL=AcThreeKingdomsRankViewTab2Tab1Item.js.map