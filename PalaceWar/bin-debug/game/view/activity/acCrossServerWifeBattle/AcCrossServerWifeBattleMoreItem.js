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
var AcCrossServerWifeBattleMoreItem = (function (_super) {
    __extends(AcCrossServerWifeBattleMoreItem, _super);
    function AcCrossServerWifeBattleMoreItem() {
        var _this = _super.call(this) || this;
        _this.id = 0;
        _this._data = null;
        _this._aidAndCode = null;
        return _this;
    }
    AcCrossServerWifeBattleMoreItem.prototype.initItem = function (index, data, itemParam) {
        this.id = data.id;
        this._data = data;
        this.height = 130;
        this._aidAndCode = itemParam.aidAndCode;
        var rankinglist_line = BaseBitmap.create("rankinglist_line");
        rankinglist_line.x = 10;
        this.addChild(rankinglist_line);
        rankinglist_line.y = 130;
        var timerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        timerTxt.text = App.DateUtil.getFormatBySecond(data.st, 2);
        timerTxt.x = 20;
        timerTxt.y = 15; //describeTxt.y+52;
        this.addChild(timerTxt);
        //描述    
        var namestr = "" + data.aname + LanguageManager.getlocal("atkraceyamenid", [data.auid]) + "(" + Api.mergeServerVoApi.getRankServerName(data.auid) + ")";
        var ennamestr = data.dname + "(" + Api.mergeServerVoApi.getRankServerName(data.duid) + ")";
        var str = LanguageManager.getlocal("wifeBattleMoreDetail", [namestr, ennamestr, data.atotalwinnum, data.agetpoint]);
        var describeTxt = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        describeTxt.width = 450;
        describeTxt.lineSpacing = 7;
        describeTxt.x = timerTxt.x;
        describeTxt.y = timerTxt.y + 43;
        this.addChild(describeTxt);
        //时间  
        //查看按钮
        var lookBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "wifeBattleMoreBtn", this.lookBtnHandler, this);
        lookBtn.setScale(0.85);
        lookBtn.x = GameConfig.stageWidth - lookBtn.width - 10;
        lookBtn.y = 60;
        this.addChild(lookBtn);
    };
    //挑战
    AcCrossServerWifeBattleMoreItem.prototype.lookBtnHandler = function (evt) {
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_FIGHTREVIEW, { logid: this._data.id, activeId: this._aidAndCode });
    };
    AcCrossServerWifeBattleMoreItem.prototype.getSpaceY = function () {
        return 1;
    };
    AcCrossServerWifeBattleMoreItem.prototype.getSpaceX = function () {
        return 0;
    };
    AcCrossServerWifeBattleMoreItem.prototype.dispose = function () {
        this.id = 0;
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWifeBattleMoreItem;
}(ScrollListItem));
__reflect(AcCrossServerWifeBattleMoreItem.prototype, "AcCrossServerWifeBattleMoreItem");
//# sourceMappingURL=AcCrossServerWifeBattleMoreItem.js.map