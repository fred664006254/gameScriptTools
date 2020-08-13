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
var WifebattleMoreItem = (function (_super) {
    __extends(WifebattleMoreItem, _super);
    function WifebattleMoreItem() {
        var _this = _super.call(this) || this;
        _this.id = 0;
        _this._data = null;
        return _this;
    }
    WifebattleMoreItem.prototype.initItem = function (index, data) {
        this.id = data.id;
        this._data = data;
        this.height = 130;
        var rankinglist_line = BaseBitmap.create("atkrace_xian_1");
        rankinglist_line.x = 10;
        this.addChild(rankinglist_line);
        rankinglist_line.y = 130;
        // let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
        // rankTxt.text = String(index+1);
        // rankTxt.x = 20;
        // rankTxt.y = 15;
        // rankTxt.width = 30;
        // rankTxt.textAlign= TextFieldConst.ALIGH_CENTER;
        // this.addChild(rankTxt);
        //名称  
        // let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
        // nameTxt.text = data.name;
        // nameTxt.x = rankTxt.x+40;
        // nameTxt.y = rankTxt.y;
        // this.addChild(nameTxt);
        var timerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        timerTxt.text = App.DateUtil.getFormatBySecond(data.st, 2);
        timerTxt.x = 20;
        timerTxt.y = 15; //describeTxt.y+52;
        this.addChild(timerTxt);
        //描述    
        var str = LanguageManager.getlocal("wifeBattleMoreDetail", [data.aname, data.dname, data.atotalwinnum, data.agetpoint]);
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
    WifebattleMoreItem.prototype.lookBtnHandler = function (evt) {
        NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_FIGHTREVIEW, { logid: this._data.id });
        // NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_FIGHTREVIEW, {logid:1});
    };
    WifebattleMoreItem.prototype.getSpaceY = function () {
        return 1;
    };
    WifebattleMoreItem.prototype.getSpaceX = function () {
        return 0;
    };
    WifebattleMoreItem.prototype.dispose = function () {
        this.id = 0;
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    return WifebattleMoreItem;
}(ScrollListItem));
__reflect(WifebattleMoreItem.prototype, "WifebattleMoreItem");
