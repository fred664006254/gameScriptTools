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
var BetheKingExPopupView = (function (_super) {
    __extends(BetheKingExPopupView, _super);
    function BetheKingExPopupView() {
        return _super.call(this) || this;
    }
    BetheKingExPopupView.prototype.initView = function () {
        this._aid = this.param.data.aid;
        this._code = this.param.data.code;
        this._acVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        var bg02 = BaseBitmap.create("public_tc_bg02");
        bg02.x = this.viewBg.width / 2 - bg02.width / 2;
        bg02.y = 10;
        this.addChildToContainer(bg02);
        this._cdTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._cdTxt.x = bg02.x + bg02.width / 2;
        this._cdTxt.y = bg02.y + 15;
        this.addChildToContainer(this._cdTxt);
        var bg1 = BaseBitmap.create("public_tc_bg01");
        bg1.width = 540;
        bg1.height = 670;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = bg02.y + bg02.height + 15;
        this.addChildToContainer(bg1);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, bg1.width - 20, bg1.height - 20);
        BetheKingExScrollItem._ACVO = this._acVo;
        var tmpList = []; //Object.keys(cfg.voteExchange);
        for (var key in cfg.voteExchange) {
            if (cfg.voteExchange.hasOwnProperty(key)) {
                var element = cfg.voteExchange[key];
                element["id"] = key;
                tmpList.push(element);
            }
        }
        tmpList.sort(function (dataA, dataB) {
            return Number(dataA.id) - Number(dataB.id);
        });
        var _scrollList = ComponentManager.getScrollList(BetheKingExScrollItem, tmpList, rect);
        _scrollList.setPosition(bg1.x + 10, bg1.y + 10);
        this.addChildToContainer(_scrollList);
        TickManager.addTick(this.tick, this);
        this.tick();
    };
    BetheKingExPopupView.prototype.tick = function () {
        var presecs = this._acVo.et - 86400 - GameData.serverTime;
        if (presecs >= 0) {
            var secStr = App.DateUtil.getFormatBySecond(presecs, 8);
            this._cdTxt.text = LanguageManager.getlocal("betheKing_excdTxt1", [secStr]);
        }
        else {
            this._cdTxt.text = LanguageManager.getlocal("betheKing_excdTxt2");
        }
        this._cdTxt.anchorOffsetX = this._cdTxt.width / 2;
        return true;
    };
    BetheKingExPopupView.prototype.dispose = function () {
        TickManager.removeTick(this.tick, this);
        this._aid = null;
        this._code = null;
        this._acVo = null;
        this._cdTxt = null;
        _super.prototype.dispose.call(this);
    };
    return BetheKingExPopupView;
}(PopupView));
__reflect(BetheKingExPopupView.prototype, "BetheKingExPopupView");
