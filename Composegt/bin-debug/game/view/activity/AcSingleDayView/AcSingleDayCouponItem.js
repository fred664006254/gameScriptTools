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
var AcSingleDayCouponItem = (function (_super) {
    __extends(AcSingleDayCouponItem, _super);
    function AcSingleDayCouponItem() {
        var _this = _super.call(this) || this;
        _this._numTF = null;
        _this._itemInfoVo = null;
        _this._isGray = false;
        _this._equipedIcon = null;
        _this._shinneIcon = null;
        _this._itembg = null;
        return _this;
    }
    AcSingleDayCouponItem.prototype.initItem = function (index, data) {
        this._itemInfoVo = data;
        if (data.id == -1) {
            var itembg = BaseBitmap.create("itembg_0");
            itembg.x = itembg.y = 5;
            this.addChild(itembg);
            return;
        }
        var icon = GameData.getRewardItemIcons("25_" + data.id + "_" + data.num + "_" + data.value)[0];
        icon.x = icon.y = 5;
        this.addChild(icon);
        // this._numTF = ComponentManager.getTextField(data.num,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
        // this._numTF.x = icon.x + icon.width - this._numTF.width - 5;
        // this._numTF.y = icon.y + icon.height - this._numTF.height - 5;
        //this.addChild(this._numTF);
    };
    AcSingleDayCouponItem.prototype.setIsGray = function (isGray) {
        if (isGray != this._isGray) {
            if (isGray) {
                App.DisplayUtil.changeToGray(this);
            }
            else {
                App.DisplayUtil.changeToNormal(this);
            }
            this._isGray = isGray;
        }
    };
    AcSingleDayCouponItem.prototype.update = function () {
        if (this._numTF) {
            this._numTF.text = String(this._itemInfoVo.num);
            this._numTF.x = this._itembg.x + this._itembg.width - this._numTF.width - 5;
        }
        if (this._itemInfoVo.type == 3) {
            this.setIsGray(this._itemInfoVo.num == -1);
            if (this._itemInfoVo.num > 0 && this._shinneIcon) {
                egret.Tween.removeTweens(this._shinneIcon);
                this.removeChild(this._shinneIcon);
                this._shinneIcon = null;
            }
            else if (this._itemInfoVo.num == 1 && this._equipedIcon) {
                this.removeChild(this._equipedIcon);
                this._equipedIcon = null;
            }
            else if (this._itemInfoVo.num == 2 && this._equipedIcon == null) {
                this._equipedIcon = BaseBitmap.create("itemicon_equiped");
                this._equipedIcon.x = this._equipedIcon.y = 5;
                this.addChild(this._equipedIcon);
            }
        }
    };
    AcSingleDayCouponItem.prototype.getSpaceX = function () {
        return 13;
    };
    AcSingleDayCouponItem.prototype.getSpaceY = function () {
        return 18;
    };
    AcSingleDayCouponItem.prototype.dispose = function () {
        if (this._isGray) {
            App.DisplayUtil.changeToNormal(this);
        }
        this._isGray = false;
        if (this._numTF) {
            this.removeChild(this._numTF);
            this._numTF.dispose();
            this._numTF = null;
        }
        this._itemInfoVo = null;
        this._equipedIcon = null;
        if (this._shinneIcon) {
            egret.Tween.removeTweens(this._shinneIcon);
        }
        this._shinneIcon = null;
        this._itembg = null;
        _super.prototype.dispose.call(this);
    };
    return AcSingleDayCouponItem;
}(ScrollListItem));
__reflect(AcSingleDayCouponItem.prototype, "AcSingleDayCouponItem");
