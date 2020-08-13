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
author : qinajun
date : 2018.4.14
desc : 世界杯竞猜活动
*/
var AcWorldCupViewTab1 = (function (_super) {
    __extends(AcWorldCupViewTab1, _super);
    function AcWorldCupViewTab1() {
        var _this = _super.call(this) || this;
        _this._daypoint1 = null;
        _this._daypoint2 = null;
        _this._daypoint3 = null;
        _this._dateDescText1 = null;
        _this._dateDescText2 = null;
        _this._dateDescText3 = null;
        _this._list = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcWorldCupViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcWorldCupViewTab1.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPVOTE), view.voteCallbackHandle, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPINFO), view.fresh_day, view);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPINFO, {
            activeId: view.acTivityId
        });
        var mainview = ViewController.getInstance().getView('AcWorldCupView');
        view.height = mainview.tabHeight;
        view.width = mainview.tabWidth;
        var line = BaseBitmap.create('worldcupline');
        view.setLayoutPosition(LayoutConst.horizontalCentertop, line, view, [0, 20]);
        view.addChild(line);
        //进度点
        var pos = {
            1: { Layout: LayoutConst.leftverticalCenter, desc: [120, 0] },
            2: { Layout: LayoutConst.horizontalCenterverticalCenter, desc: [0, 0] },
            3: { Layout: LayoutConst.rightverticalCenter, desc: [120, 0] }
        };
        for (var i in pos) {
            var point = BaseLoadBitmap.create('worldcupin_3');
            point.width = 21;
            point.height = 21;
            var unit = pos[i];
            view.setLayoutPosition(unit.Layout, point, line, unit.desc);
            view["_daypoint" + i] = point;
            view.addChild(point);
            var dateText = ComponentManager.getTextField(LanguageManager.getlocal("AcWorldCupDate" + i), 22, TextFieldConst.COLOR_BLACK); //
            view.setLayoutPosition(LayoutConst.horizontalCentertop, dateText, point, [0, 8 + point.height]);
            view.addChild(dateText);
            var dateDescText = ComponentManager.getTextField(LanguageManager.getlocal("AcWorldCupDateDesc" + i), 22, 0xa28d6a); //
            view.setLayoutPosition(LayoutConst.horizontalCentertop, dateDescText, dateText, [0, 6 + dateText.textHeight]);
            view["_dateDescText" + i] = dateDescText;
            view.addChild(dateDescText);
        }
        // let countryArr = [
        // 	{
        // 		'country' : 'DEU',
        // 	},
        // 	{
        // 		'country' : 'PRT',
        // 	},
        // 	{
        // 		'country' : 'BRA',
        // 	},
        // 	{
        // 		'country' : 'ESP',
        // 	}
        // ];
        var tmpRect = new egret.Rectangle(0, 0, 570, view.height - 160 - (view._dateDescText1.y + view._dateDescText1.textHeight));
        var scrollList = ComponentManager.getScrollList(AcWorldCupTab1Item, [], tmpRect, view.code);
        //scrollList.addTouchTap(this.clickItemHandler, this);
        view._list = scrollList;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [0, view._dateDescText1.y + view._dateDescText1.textHeight + 20]);
        view.addChild(scrollList);
    };
    AcWorldCupViewTab1.prototype.fresh_day = function (evt) {
        var view = this;
        var curPeriod = view.vo.getCurPeriod();
        for (var i = 1; i < 4; ++i) {
            var point = view["_daypoint" + i];
            if (point) {
                var pointPeriod = i;
                var stauts = '3';
                if (curPeriod > pointPeriod) {
                    stauts = '2';
                }
                else if (curPeriod == pointPeriod) {
                    stauts = '1';
                }
                view["_dateDescText" + i].textColor = Number(stauts) < 3 ? TextFieldConst.COLOR_WARN_YELLOW2 : 0xa28d6a;
                point.setload("worldcupin_" + stauts);
            }
        }
        var data = evt.data.data.data;
        var arr = [];
        if (data.win) {
            view.vo.setChamp(data.win);
        }
        for (var i in data.fightFour) {
            var unit = data.fightFour[i];
            for (var key in unit) {
                arr.push({
                    'country': key,
                    'points': unit[key],
                    'champ': data.win ? data.win : '0'
                });
            }
        }
        view._list.refreshData(arr, view.code);
    };
    AcWorldCupViewTab1.prototype.fresh_jindu = function () {
        var view = this;
    };
    AcWorldCupViewTab1.prototype.voteCallbackHandle = function (evt) {
        if (evt.data.data.ret < 0) {
            return;
        }
        App.CommonUtil.showTip(LanguageManager.getlocal("AcWorldCupVoteSuc"));
        var voteview = ViewController.getInstance().getView('AcWorldCupVoteView');
        if (voteview) {
            voteview.hide();
        }
        var view = this;
        var data = evt.data.data.data;
        var arr = [];
        for (var i in data.fightFour) {
            var unit = data.fightFour[i];
            for (var key in unit) {
                arr.push({
                    'country': key,
                    'points': unit[key],
                    'champ': data.win ? data.win : '0'
                });
            }
        }
        if (arr.length) {
            view._list.refreshData(arr);
        }
        // let data = evt.data.data.data;
    };
    AcWorldCupViewTab1.prototype.refreshWhenSwitchBack = function () {
        var view = this;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPINFO, {
            activeId: view.acTivityId
        });
    };
    AcWorldCupViewTab1.prototype.update = function () {
        var view = this;
        if (!this.vo) {
            return;
        }
    };
    AcWorldCupViewTab1.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPVOTE), view.voteCallbackHandle, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPINFO), view.fresh_day, view);
        _super.prototype.dispose.call(this);
    };
    return AcWorldCupViewTab1;
}(AcCommonViewTab));
__reflect(AcWorldCupViewTab1.prototype, "AcWorldCupViewTab1");
//# sourceMappingURL=AcWorldCupViewTab1.js.map