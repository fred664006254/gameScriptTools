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
var TitleScrollItem = (function (_super) {
    __extends(TitleScrollItem, _super);
    function TitleScrollItem() {
        return _super.call(this) || this;
    }
    TitleScrollItem.prototype.initItem = function (index, itemInfoVo) {
        _super.prototype.initItem.call(this, index, itemInfoVo);
        if (Api.switchVoApi.checkOpenTitleLv() && itemInfoVo.isLvUp == 1) {
            var bgres = "public_lvupbg";
            var textcolor = TextFieldConst.COLOR_BROWN;
            var itemCfg = itemInfoVo.itemCfg;
            var lv = itemInfoVo.lv;
            if (itemCfg.emperorLvUpNeed && itemCfg.emperorLvUpNeed.length > 0) {
                bgres = "public_lvupbg2";
                textcolor = TextFieldConst.COLOR_WHITE;
                if (itemInfoVo.tnum == 0) {
                    lv = undefined;
                }
            }
            if (lv) {
                var lvbg = BaseBitmap.create(bgres);
                lvbg.setPosition(this._itembg.width - lvbg.width + 2, 5);
                this.addChild(lvbg);
                var levelTf = ComponentManager.getTextField("Lv." + String(itemInfoVo.lv), 16, textcolor);
                levelTf.x = lvbg.x + lvbg.width / 2 - levelTf.width / 2;
                levelTf.y = lvbg.y;
                this.addChild(levelTf);
            }
        }
    };
    return TitleScrollItem;
}(ItemScrollItem));
__reflect(TitleScrollItem.prototype, "TitleScrollItem");
