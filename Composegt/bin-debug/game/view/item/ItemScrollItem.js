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
var ItemScrollItem = (function (_super) {
    __extends(ItemScrollItem, _super);
    function ItemScrollItem() {
        var _this = _super.call(this) || this;
        _this._numTF = null;
        _this._itemInfoVo = null;
        _this._isGray = false;
        _this._equipedIcon = null;
        _this._shinneIcon = null;
        _this._itembg = null;
        return _this;
    }
    ItemScrollItem.prototype.initItem = function (index, itemInfoVo) {
        this._itemInfoVo = itemInfoVo;
        if (itemInfoVo.id == -1) {
            var itembg_1 = BaseBitmap.create("itembg_0");
            itembg_1.x = itembg_1.y = 5;
            this.addChild(itembg_1);
            return;
        }
        var itembg = BaseBitmap.create(itemInfoVo.iconBg);
        itembg.x = itembg.y = 5;
        this.addChild(itembg);
        this._itembg = itembg;
        var item = BaseLoadBitmap.create(itemInfoVo.icon);
        // item.scaleX = item.scaleY = itembg.width/115;
        item.x = itembg.x + itembg.width / 2 - 100 / 2;
        item.y = itembg.y + itembg.height / 2 - 100 / 2;
        if (itemInfoVo.icon.indexOf("user_head") > -1) {
            item.setScale(0.7);
        }
        this.addChild(item);
        if (itemInfoVo.type == 3 && itemInfoVo.id == 4111) {
            var headContainer = new BaseDisplayObjectContainer();
            this.addChild(headContainer);
            var headEffect = ComponentManager.getCustomMovieClip("ryeharvestheadeffect1-", 14, 70);
            // headEffect.width = 150;
            // headEffect.height = 145;
            headEffect.playWithTime(0);
            headEffect.x = item.x + 100 * item.scaleX / 2 - 150 / 2 + 2;
            headEffect.y = item.y + 100 * item.scaleY / 2 - 145 / 2;
            headContainer.addChild(headEffect);
        }
        this._numTF = ComponentManager.getTextField(String(itemInfoVo.num), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._numTF.x = itembg.x + itembg.width - this._numTF.width - 5;
        this._numTF.y = itembg.y + itembg.height - this._numTF.height - 5;
        this.addChild(this._numTF);
        if (this._itemInfoVo.type == 3) {
            this.setIsGray(this._itemInfoVo.num == -1);
            this._numTF.visible = false;
            if (this._itemInfoVo.num == 0) {
                this._shinneIcon = BaseBitmap.create("itemicon_shinne");
                this._shinneIcon.x = this._shinneIcon.y = 5;
                this.addChild(this._shinneIcon);
                egret.Tween.get(this._shinneIcon, { loop: true }).to({ alpha: 0.2 }, 500).to({ alpha: 1 }, 500);
            }
            else if (this._itemInfoVo.num == 2) {
                this._equipedIcon = BaseBitmap.create("itemicon_equiped");
                this._equipedIcon.x = this._equipedIcon.y = 5;
                this.addChild(this._equipedIcon);
            }
            if (this._itemInfoVo["itemCfg"].group == 4 && this._itemInfoVo.id == Api.playerVoApi.getPlayePicId()) {
                this._equipedIcon = BaseBitmap.create("itemicon_equiped");
                this._equipedIcon.x = this._equipedIcon.y = 5;
                this.addChild(this._equipedIcon);
            }
        }
    };
    ItemScrollItem.prototype.setIsGray = function (isGray) {
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
    ItemScrollItem.prototype.update = function () {
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
    ItemScrollItem.prototype.getSpaceX = function () {
        return 13;
    };
    ItemScrollItem.prototype.getSpaceY = function () {
        return 18;
    };
    ItemScrollItem.prototype.dispose = function () {
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
    return ItemScrollItem;
}(ScrollListItem));
__reflect(ItemScrollItem.prototype, "ItemScrollItem");
