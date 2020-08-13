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
var LevyScrollItem1DetailPopupViewItem = (function (_super) {
    __extends(LevyScrollItem1DetailPopupViewItem, _super);
    function LevyScrollItem1DetailPopupViewItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    LevyScrollItem1DetailPopupViewItem.prototype.initItem = function (index, data, item) {
        this._data = data;
        var rectScale = 0.75;
        var rect = new egret.Rectangle(0, 0, ComposeStatus.renSize.width * rectScale, ComposeStatus.renSize.height * rectScale);
        this.width = 520;
        this.height = rect.height + 10;
        var tarColor = TextFieldConst.COLOR_BROWN_NEW;
        var pos = data.pos[0];
        var personImg = BaseLoadBitmap.create(Config.MapinfoCfg.getPersonRes(data.level), rect);
        personImg.setPosition(pos.x - 40, -5);
        this.addChild(personImg);
        var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        rankTxt.text = LanguageManager.getlocal("levy_scrollitem1detailtxt1", [Config.PersoninfoCfg.getPersonLocalNameByLv(data.level), Config.PersoninfoCfg.getPersonLocalLvByLv(data.level)]);
        rankTxt.x = pos.x + (pos.width - rankTxt.width) / 2 + 15;
        rankTxt.y = this.height / 2 - rankTxt.height / 2;
        this.addChild(rankTxt);
        pos = data.pos[1];
        var foodTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        var foodStr = this.getAddNum("gold");
        foodTxt.text = foodStr;
        foodTxt.x = pos.x + (pos.width - foodTxt.width) / 2 - 25;
        foodTxt.y = this.height / 2 - foodTxt.height / 2;
        ;
        this.addChild(foodTxt);
        pos = data.pos[2];
        var numTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        numTxt.text = data.num;
        numTxt.x = pos.x + (pos.width - numTxt.width) / 2 - 25;
        numTxt.y = foodTxt.y;
        this.addChild(numTxt);
        var line = BaseBitmap.create("public_line4");
        this.addChild(line);
        line.width = this.width - 10;
        line.x = 8;
        line.y = this.height - line.height;
    };
    LevyScrollItem1DetailPopupViewItem.prototype.getAddNum = function (type) {
        var level = this._data.level;
        var num = this._data.num;
        var personInfo = Config.PersoninfoCfg.getPersonCfgByLv(level);
        var interval = Config.LevyCfg.LevyItemList[0].interval;
        var AddNum = (personInfo[type] || 0);
        return String(AddNum);
        //return LanguageManager.getlocal("levy_scrollitem1detailtxt2",[AddNum.toString(),interval]) ;
    };
    /**
     * 不同格子Y间距
     */
    LevyScrollItem1DetailPopupViewItem.prototype.getSpaceY = function () {
        return 0;
    };
    LevyScrollItem1DetailPopupViewItem.prototype.dispose = function () {
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    return LevyScrollItem1DetailPopupViewItem;
}(ScrollListItem));
__reflect(LevyScrollItem1DetailPopupViewItem.prototype, "LevyScrollItem1DetailPopupViewItem");
