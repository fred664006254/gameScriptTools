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
var ExtendTip = (function (_super) {
    __extends(ExtendTip, _super);
    function ExtendTip(res) {
        var _this = _super.call(this) || this;
        _this._res = "";
        _this.bg = null;
        if (res) {
            _this._res = res;
        }
        else {
            _this._res = "public_update_bg";
        }
        return _this;
    }
    ExtendTip.prototype.init = function (str, point, top, width, textAlign, hideTime) {
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var mask = BaseBitmap.create("public_alpha");
        mask.width = view.width;
        mask.height = view.height;
        view.addChild(mask);
        if (hideTime) {
            view.alpha = 0;
            egret.Tween.get(view).to({ alpha: 1 }, 1000).wait(hideTime).to({ alpha: 0 }, 1000).call(function () {
                view.dispose();
            }, view);
        }
        else {
            mask.addTouchTap(function () {
                view.dispose();
                view = null;
            }, view);
        }
        var bubbleGroup = new BaseDisplayObjectContainer();
        view.addChild(bubbleGroup);
        var bubblebg = BaseBitmap.create(this._res);
        this.bg = bubblebg;
        bubbleGroup.addChild(bubblebg);
        var tipTxt = ComponentMgr.getTextField(str, TextFieldConst.SIZE_CONTENT_COMMON, ColorEnums.black);
        if (width && width > 0) {
            tipTxt.width = width;
            tipTxt.wordWrap = true;
        }
        bubbleGroup.addChild(tipTxt);
        tipTxt.lineSpacing = 2;
        tipTxt.textAlign = textAlign || egret.HorizontalAlign.CENTER;
        var arrow = BaseBitmap.create("public_triangle");
        arrow.anchorOffsetX = arrow.width / 2;
        arrow.anchorOffsetY = arrow.height / 2;
        arrow.scaleY = top ? 1 : -1;
        if (this._res == "public_update_bg") {
            bubbleGroup.addChild(arrow);
            bubblebg.width = tipTxt.width + 40;
            bubblebg.height = tipTxt.height + 20;
            bubbleGroup.width = bubblebg.width;
            bubbleGroup.height = bubblebg.height + arrow.height;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bubblebg, bubbleGroup, [0, 0], true);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, bubblebg, [4, -3]);
        }
        else {
            bubblebg.width = tipTxt.width + 60;
            bubblebg.height = tipTxt.height + 60;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bubblebg, bubbleGroup, [0, 0], true);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, bubblebg, [4, -10]);
        }
        var posX = point.x - (bubbleGroup.width / 2);
        if (posX < 0) {
            posX = 0;
        }
        else if ((posX + bubbleGroup.width) > view.width) {
            posX = view.width - bubbleGroup.width - 5;
        }
        var posY = top ? (point.y + 10) : (point.y - bubbleGroup.height + 10);
        if (posY < 0) {
            posY = 0;
        }
        else if (posY + bubbleGroup.height > GameConfig.stageHeigth) {
            posY = GameConfig.stageHeigth - bubbleGroup.height;
        }
        bubbleGroup.setPosition(posX, posY);
        arrow.x = point.x - bubbleGroup.x; //point.x - ();
        arrow.y = top ? (bubblebg.y - arrow.anchorOffsetY + 1) : (bubblebg.y + bubblebg.height - 6 + arrow.anchorOffsetY);
    };
    ExtendTip.prototype.dispose = function () {
        this._res = "";
        this.bg = null;
        _super.prototype.dispose.call(this);
    };
    return ExtendTip;
}(BaseDisplayObjectContainer));
__reflect(ExtendTip.prototype, "ExtendTip");
//# sourceMappingURL=ExtendTip.js.map