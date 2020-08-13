/**
 * 门客新UI 神器资质图标
 * 神器加工
 * author shaoliang
 * date 2019/8/1
 * @class ServantNewAttrIcon
 */
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
var ServantNewAttrIcon = (function (_super) {
    __extends(ServantNewAttrIcon, _super);
    function ServantNewAttrIcon() {
        var _this = _super.call(this) || this;
        _this._numbg = null;
        _this._plusNum = null;
        _this._starTab = [];
        _this._icon = null;
        return _this;
    }
    // t 1,2,3,4 武智政魅
    ServantNewAttrIcon.prototype.init = function (t) {
        var icon = BaseBitmap.create("weapon_infopro" + t);
        icon.y = 10;
        this.addChild(icon);
        this._icon = icon;
        var numbg = BaseBitmap.create("weapon_numbg");
        numbg.x = 55;
        this.addChild(numbg);
        this._numbg = numbg;
        this._plusNum = ComponentManager.getTextField("0", 16, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._plusNum.width = numbg.width;
        this._plusNum.textAlign = egret.HorizontalAlign.CENTER;
        this._plusNum.setPosition(numbg.x, numbg.height / 2 - this._plusNum.height / 2);
        this.addChild(this._plusNum);
        var starbg = BaseBitmap.create("weapon_star_bg");
        starbg.x = 0;
        starbg.y = 70;
        this.addChild(starbg);
        icon.x = starbg.width / 2 - icon.width / 2;
    };
    ServantNewAttrIcon.prototype.setInfo = function (info) {
        var star = info[0];
        var plus = info[1];
        var show = info[2];
        for (var i = 0; i < this._starTab.length; i++) {
            this._starTab[i].dispose();
        }
        this._starTab.length = 0;
        //  star = 5;
        //  plus = 2;
        if (star <= 5) {
            var objContainer = new BaseDisplayObjectContainer;
            for (var index = 0; index < star; index++) {
                var starImg = BaseBitmap.create("servant_star");
                starImg.width = 30;
                starImg.height = 28;
                starImg.setScale(0.5);
                starImg.x = index * starImg.width * 0.5;
                starImg.y = 2;
                objContainer.addChild(starImg);
            }
            objContainer.setPosition(47 - objContainer.width / 2, 71);
            this.addChild(objContainer);
            this._starTab.push(objContainer);
        }
        else {
            var starImg = BaseBitmap.create("servant_star");
            starImg.width = 30;
            starImg.height = 28;
            starImg.setScale(0.5);
            starImg.x = 22;
            starImg.y = 71;
            this.addChild(starImg);
            var starNum = ComponentManager.getTextField(String(star), 16, TextFieldConst.COLOR_WHITE);
            starNum.setPosition(starImg.x + 18, starImg.y);
            this.addChild(starNum);
        }
        if (plus) {
            this._plusNum.visible = true;
            this._numbg.visible = true;
            this._plusNum.text = "+" + plus;
        }
        else {
            this._plusNum.visible = false;
            this._numbg.visible = false;
        }
        if (show) {
            App.DisplayUtil.changeToNormal(this._icon);
        }
        else {
            App.DisplayUtil.changeToGray(this._icon);
        }
    };
    ServantNewAttrIcon.prototype.dispose = function () {
        this._plusNum = null;
        this._starTab.length = 0;
        this._numbg = null;
        this._icon = null;
        _super.prototype.dispose.call(this);
    };
    return ServantNewAttrIcon;
}(BaseDisplayObjectContainer));
__reflect(ServantNewAttrIcon.prototype, "ServantNewAttrIcon");
//# sourceMappingURL=ServantNewAttrIcon.js.map