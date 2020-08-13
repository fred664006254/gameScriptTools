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
//
var AcBattleHistoryRankVIewTab1 = (function (_super) {
    __extends(AcBattleHistoryRankVIewTab1, _super);
    function AcBattleHistoryRankVIewTab1(param) {
        var _this = _super.call(this) || this;
        _this._nodeContainer = null;
        //private _countDownText:BaseTextField = null;
        _this._rankindex = 0;
        _this._list = null;
        _this._pos = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcBattleHistoryRankVIewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleHistoryRankVIewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleHistoryRankVIewTab1.prototype, "code", {
        get: function () {
            return String(this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleHistoryRankVIewTab1.prototype, "aid", {
        get: function () {
            return String(this.param.data.aid);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleHistoryRankVIewTab1.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleHistoryRankVIewTab1.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcBattleHistoryRankVIew');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattleHistoryRankVIewTab1.prototype.getListType = function () {
        return 1;
    };
    AcBattleHistoryRankVIewTab1.prototype.initView = function () {
        var _this = this;
        var view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_BATTLEGROUND_GETANK, this.rankCallBack, this);
        var baseview = ViewController.getInstance().getView('AcBattleHistoryRankVIew');
        view.height = baseview.tabHeight + 65;
        view.width = baseview.tabWidth;
        // 膜拜背景
        var bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.height = 65;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);
        var yellowline = BaseBitmap.create("battlerank2");
        yellowline.width = view.width;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, yellowline, view, [0, 35]);
        view.addChild(yellowline);
        //排名
        var rotationTxt = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank1"), 22);
        rotationTxt.x = yellowline.x + 28;
        rotationTxt.y = yellowline.y + yellowline.height / 2 - rotationTxt.height / 2;
        this.addChild(rotationTxt);
        //成员名称
        var rotationTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank2"), 22);
        rotationTxt2.x = yellowline.x + 131;
        rotationTxt2.y = rotationTxt.y;
        this.addChild(rotationTxt2);
        // 帮会名
        var rotationTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank3"), 22);
        rotationTxt3.x = yellowline.x + 298;
        rotationTxt3.y = rotationTxt.y;
        this.addChild(rotationTxt3);
        // 分数
        var rotationTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank4"), 22);
        rotationTxt4.x = yellowline.x + 450;
        rotationTxt4.y = rotationTxt.y;
        this.addChild(rotationTxt4);
        var rotationTxt5 = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank6"), 22);
        rotationTxt5.x = yellowline.x + 546;
        rotationTxt5.y = rotationTxt.y;
        this.addChild(rotationTxt5);
        var arr = baseview.getHistoryPrankList();
        var total = 0;
        var alive = 0;
        var rankV = 0;
        this._pos = [
            { width: rotationTxt.textWidth, x: rotationTxt.x },
            { width: rotationTxt2.textWidth, x: rotationTxt2.x },
            { width: rotationTxt3.textWidth, x: rotationTxt3.x },
            { width: rotationTxt4.textWidth, x: rotationTxt4.x },
            { width: rotationTxt5.textWidth, x: rotationTxt5.x },
        ];
        for (var i in arr) {
            if (Number(arr[i].uid) == Api.playerVoApi.getPlayerID()) {
                rankV = Number(i) + 1;
            }
            if (arr[i].status != 3) {
                total += 1;
            }
            if (arr[i].status == 1) {
                alive += 1;
            }
            arr[i].pos = this._pos;
            arr[i].rankindex = this._rankindex;
        }
        var tmpRect = new egret.Rectangle(0, 0, view.width, view.height - 180);
        var scrollList = ComponentManager.getScrollList(AcBattleHistoryPRankScrollItem, arr, tmpRect, this.param.data.code);
        scrollList.y = yellowline.y + yellowline.height;
        view.addChild(scrollList);
        scrollList.bindMoveCompleteCallback(function () {
            var view = _this;
            var index = _this._rankindex;
            if (!scrollList.checkShowArrow()) {
                index += 100;
            }
            else if (scrollList.scrollTop == 0) {
                index = Math.max(0, index - 100);
            }
            if (_this._rankindex != index) {
                _this.request(NetRequestConst.REQUEST_BATTLEGROUND_GETANK, { activeId: _this.param.data.aid + "-" + _this.param.data.code, index: index, test: 1, needround: _this.param.data.round });
            }
        }, this);
        this._list = scrollList;
        var txt3 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        var rankstr = '';
        //榜单寻找
        if (rankV == 0) {
            rankstr = LanguageManager.getlocal('atkracedes4');
        }
        else {
            rankstr = rankV.toString();
        }
        if (view.vo.getCurperiod() == 1) {
            rankstr = LanguageManager.getlocal('acBattleRoundNotStart-1');
        }
        else {
            if (!view.vo.getAttendQuality()) {
                rankstr = LanguageManager.getlocal('crossImacyNoAccess');
            }
        }
        txt3.text = LanguageManager.getlocal("acdemyprank", [rankstr]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt3, bottomBg);
        this.addChild(txt3);
        var tiptxt = ComponentManager.getTextField(LanguageManager.getlocal('acBattlepranktip', [total + "", alive + ""]), 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tiptxt, scrollList, [0, scrollList.height + 10]);
        this.addChild(tiptxt);
    };
    AcBattleHistoryRankVIewTab1.prototype.rankCallBack = function (event) {
        if (event.data.ret) {
            var zidRank = event.data.data.data.rankArr; //个人排行
            if (zidRank && zidRank.length) {
                this._rankindex = event.data.data.data.index;
                var arr = [];
                for (var i in zidRank) {
                    var unit = zidRank[i];
                    var status_1 = unit.alive ? (unit.rise ? 1 : 2) : (3);
                    arr.push({
                        myrank: Number(i) + 1,
                        name: unit.name,
                        alliname: unit.gname,
                        value: unit.value,
                        status: status_1,
                        uid: unit.uid,
                        pos: this._pos,
                        rankindex: this._rankindex
                    });
                }
                this._list.refreshData(arr, this.param.data.code);
                this._list.scrollTop = 0;
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundTip13-" + this.uiCode));
            }
        }
    };
    AcBattleHistoryRankVIewTab1.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_BATTLEGROUND_GETANK, this.rankCallBack, this);
        this._nodeContainer = null;
        this._rankindex = 0;
        this._list = null;
        this._pos = null;
        //this._countDownText = null;
        // TickManager.removeTick(this.tick,this);
        _super.prototype.dispose.call(this);
    };
    return AcBattleHistoryRankVIewTab1;
}(CommonViewTab));
__reflect(AcBattleHistoryRankVIewTab1.prototype, "AcBattleHistoryRankVIewTab1");
//# sourceMappingURL=AcBattleHistoryRankVIewTab1.js.map