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
//攻城奖励 周六第1场
var AcThreeKingdomsRankViewTab2Tab2 = (function (_super) {
    __extends(AcThreeKingdomsRankViewTab2Tab2, _super);
    function AcThreeKingdomsRankViewTab2Tab2(param) {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this._number = 1;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsRankViewTab2Tab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab2Tab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab2Tab2.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab2Tab2.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab2Tab2.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsRankViewTab2Tab2.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcThreeKingdomsRankViewTab2Tab2.prototype.getListType = function () {
        return 1;
    };
    AcThreeKingdomsRankViewTab2Tab2.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETMAPINFO, view.mapinfoback, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_CITYREWARD, view.rewardback, view);
        var baseview = ViewController.getInstance().getView(ViewConst.COMMON.ACTHREEKINGDOMSRANKVIEW);
        view.height = baseview.tabHeight - 46;
        view.width = baseview.tabWidth;
        var code = view.getUiCode();
        var tipbg = BaseLoadBitmap.create("countrywarrewardview_itembg");
        tipbg.width = 560;
        tipbg.height = 85;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipbg, this, [0, 15], true);
        view.addChild(tipbg);
        var citywarRankBtn = ComponentManager.getButton("threekingdomscitywarrank", "", function () {
            if (!view.vo.getMyKingdoms()) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsTip43", code)));
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSCITYWARPRANKVIEW, {
                aid: view.aid,
                code: view.code,
                number: view._number
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, citywarRankBtn, tipbg);
        view.addChild(citywarRankBtn);
        //本周六的第一场攻城战
        var week = view.vo.getCurWeek();
        var start = view.vo.activeSt + (week - 1) * (7 * 86400);
        var unit = view.cfg.activeTime[view._number % 2 == 1 ? 2 : 3];
        //周六
        var tmp = view._number < 3 ? 6 : 7;
        var st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
        var et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;
        // let st2 = start + (7 - 1) * 86400 + unit.popularityRange[0] * 3600;
        // let et2 = start + (7 - 1) * 86400 + unit.popularityRange[1] * 3600;
        var timeparam = App.DateUtil.getFormatBySecond(st, 15) + "-" + App.DateUtil.getFormatBySecond(et, 15);
        // let timeparam2 = `${App.DateUtil.getFormatBySecond(st2,15)}-${App.DateUtil.getFormatBySecond(et2,15)}`;
        var dateTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRank2Tip7", code), [view._number.toString(), timeparam]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(dateTxt);
        dateTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, dateTxt, citywarRankBtn, [citywarRankBtn.width + 7, 0]);
        var arr = [];
        var obj = {
            1: [1, 2, 3, 4, 5, 6],
            2: [3, 4, 5, 6, 1, 2],
            3: [5, 6, 1, 2, 3, 4]
        };
        var cfg = obj[view.vo.getMyKingdoms()];
        for (var i = 1; i <= 6; ++i) {
            arr.push({
                cityid: cfg[i - 1],
                num: view._number,
                kingdoms: Math.ceil(cfg[i - 1] / 2)
            });
        }
        var list = ComponentManager.getScrollList(AcThreeKingdomsRankViewTab2Tab2Item, arr, new egret.Rectangle(0, 0, 610, view.height - tipbg.height - 50), view.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, tipbg, [0, tipbg.height + 15]);
        view.addChild(list);
        view._list = list;
        TickManager.addTick(view.tick, view);
        view.tick();
    };
    AcThreeKingdomsRankViewTab2Tab2.prototype.rewardback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var rData = evt.data.data.data;
            if (rData.ftype == 3 && rData.day == 6) {
                var rewards = rData.rewards;
                var cfg = view.cfg.cityReward[view.vo.lastidx < 2 ? 0 : 1];
                var str = "1046_1_" + cfg.specialReward2 + "|" + rewards;
                var rewardList = GameData.formatRewardItem(str);
                var pos = this.vo.lastpos;
                App.CommonUtil.playRewardFlyAction(rewardList, pos);
                var item = view._list.getItemByIndex(view.vo.lastidx);
                if (item) {
                    item.refreshUI();
                }
                this.vo.lastidx = null;
            }
            // if(!rData){
            //     App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            //     return;
            // }
        }
    };
    // public tick():void{	
    // 	if (this._countDownText)
    // 	{
    // 		let countDownTime = this.vo.getCountDown();
    // 		if(countDownTime > 0) {
    // 			this._countDownText.text = LanguageManager.getlocal(`acFourPeople_acCD`, [App.DateUtil.getFormatBySecond(countDownTime)]);
    // 		}
    // 		else{
    // 			this._countDownText.text = LanguageManager.getlocal("acPunishEnd");
    // 		}
    // 	}
    // }
    AcThreeKingdomsRankViewTab2Tab2.prototype.getCountTimeStr = function (time) {
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    AcThreeKingdomsRankViewTab2Tab2.prototype.mapinfoback = function (evt) {
        var view = this;
        if (evt.data.ret && (evt.data.data.data.day == 6 && evt.data.data.data.ftype == 3)) {
            var data = evt.data.data.data;
            var roundMainlandScore = data.roundMainlandScore;
            view.vo.setMainLandScore(roundMainlandScore);
        }
        // if(evt.data.data.data){
        // 	this.vo.setPrankinfo(evt.data.data.data);
        // 	let rankstr = '';
        // 	let rankV = this.vo.getMyPrank();
        // 	if(rankV == 0){
        // 		rankstr = LanguageManager.getlocal('atkracedes4');
        // 	}
        // 	else{
        // 		rankstr = rankV.toString();
        // 	}
        // 	let color = String(0x21eb39);
        // 	if(this.vo.getCurPeriod() == 1){
        // 		rankstr = LanguageManager.getlocal('acBattleRoundNotStart-1');
        // 	}
        // 	else{
        // 		if(!this.vo.isCanJoin()){
        // 			rankstr = LanguageManager.getlocal('crossImacyNoAccess');
        // 			color = String(0xff3c3c);
        // 		}
        // 	}
        // 	this._rankTxt.text = LanguageManager.getlocal(`acConquerMainLandrank1-${this.uiCode}`, [color,rankstr]);
        // }
    };
    AcThreeKingdomsRankViewTab2Tab2.prototype.tick = function () {
        var view = this;
        //本周激战期
        var week = view.vo.getCurWeek();
        var start = view.vo.activeSt + (week - 1) * (7 * 86400);
        var unit = view.cfg.activeTime[view._number % 2 == 1 ? 2 : 3];
        //周六 周日
        var tmp = view._number < 3 ? 6 : 7;
        var st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
        var et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;
        if (GameData.serverTime == et) {
            var weekday = view.vo.getTodayWeek();
            NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_GETMAPINFO, {
                activeId: view.acTivityId,
                all: 1
            });
        }
    };
    AcThreeKingdomsRankViewTab2Tab2.prototype.dispose = function () {
        var view = this;
        TickManager.removeTick(view.tick, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_CITYREWARD, view.rewardback, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETMAPINFO, view.mapinfoback, view);
        view._list = null;
        //this._countDownText = null;
        // TickManager.removeTick(this.tick,this);
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsRankViewTab2Tab2;
}(CommonViewTab));
__reflect(AcThreeKingdomsRankViewTab2Tab2.prototype, "AcThreeKingdomsRankViewTab2Tab2");
//# sourceMappingURL=AcThreeKingdomsRankViewTab2Tab2.js.map