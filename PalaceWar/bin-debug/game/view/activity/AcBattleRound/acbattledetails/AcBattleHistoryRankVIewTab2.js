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
var AcBattleHistoryRankVIewTab2 = (function (_super) {
    __extends(AcBattleHistoryRankVIewTab2, _super);
    //private _countDownText:BaseTextField = null;
    function AcBattleHistoryRankVIewTab2(param) {
        var _this = _super.call(this) || this;
        _this._nodeContainer = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcBattleHistoryRankVIewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleHistoryRankVIewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleHistoryRankVIewTab2.prototype, "code", {
        get: function () {
            return String(this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleHistoryRankVIewTab2.prototype, "aid", {
        get: function () {
            return String(this.param.data.aid);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleHistoryRankVIewTab2.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleHistoryRankVIewTab2.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcBattleHistoryRankVIew');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattleHistoryRankVIewTab2.prototype.getListType = function () {
        return 1;
    };
    AcBattleHistoryRankVIewTab2.prototype.initView = function () {
        var view = this;
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
        //帮会名
        var rotationTxt = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank3"), 22);
        rotationTxt.x = yellowline.x + 50;
        rotationTxt.y = yellowline.y + yellowline.height / 2 - rotationTxt.height / 2;
        this.addChild(rotationTxt);
        //区服
        var rotationTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"), 22);
        rotationTxt2.x = yellowline.x + 222;
        rotationTxt2.y = rotationTxt.y;
        this.addChild(rotationTxt2);
        //本轮参加人数
        var rotationTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank7"), 22);
        rotationTxt3.x = yellowline.x + 333;
        rotationTxt3.y = rotationTxt.y;
        this.addChild(rotationTxt3);
        //晋级人数
        var rotationTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank8"), 22);
        rotationTxt4.x = yellowline.x + 510;
        rotationTxt4.y = rotationTxt.y;
        this.addChild(rotationTxt4);
        var arr = baseview.getHistoryArankList();
        var total = 0;
        var alive = 0;
        var status = 0;
        for (var i in arr) {
            if (Number(arr[i].id) == Api.playerVoApi.getPlayerAllianceId()) {
                status = arr[i].status;
            }
            if (arr[i].status != 3) {
                total += 1;
            }
            if (arr[i].status == 1) {
                alive += 1;
            }
            arr[i].pos = [
                { width: rotationTxt.textWidth, x: rotationTxt.x },
                { width: rotationTxt2.textWidth, x: rotationTxt2.x },
                { width: rotationTxt3.textWidth, x: rotationTxt3.x },
                { width: rotationTxt4.textWidth, x: rotationTxt4.x },
            ];
        }
        var tmpRect = new egret.Rectangle(0, 0, view.width, view.height - 180);
        var scrollList = ComponentManager.getScrollList(AcBattleHistoryARankScrollItem, arr, tmpRect, this.param.data.code);
        scrollList.y = yellowline.y + yellowline.height;
        view.addChild(scrollList);
        var txt3 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt3.text = LanguageManager.getlocal("acdemyarank", [LanguageManager.getlocal("battlestaut" + status)]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt3, bottomBg);
        this.addChild(txt3);
        var tiptxt = ComponentManager.getTextField(LanguageManager.getlocal('acBattlearanktip', [total + "", alive + ""]), 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tiptxt, scrollList, [0, scrollList.height + 10]);
        this.addChild(tiptxt);
    };
    AcBattleHistoryRankVIewTab2.prototype.dispose = function () {
        this._nodeContainer = null;
        //this._countDownText = null;
        // TickManager.removeTick(this.tick,this);
        _super.prototype.dispose.call(this);
    };
    return AcBattleHistoryRankVIewTab2;
}(CommonViewTab));
__reflect(AcBattleHistoryRankVIewTab2.prototype, "AcBattleHistoryRankVIewTab2");
//# sourceMappingURL=AcBattleHistoryRankVIewTab2.js.map