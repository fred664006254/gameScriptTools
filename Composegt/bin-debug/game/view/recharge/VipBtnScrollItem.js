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
var VipBtnScrollItem = (function (_super) {
    __extends(VipBtnScrollItem, _super);
    function VipBtnScrollItem() {
        var _this = _super.call(this) || this;
        _this._currLevel = 0;
        _this.rechargevie_down = null;
        _this.newIndex = 0;
        _this.leftBg = null;
        _this.discountIcon = null;
        _this.public_dot2 = null;
        _this.vipImg = null;
        return _this;
    }
    VipBtnScrollItem.prototype.initItem = function (index, data) {
        this._currLevel = Api.playerVoApi.getPlayerVipLevel();
        this.newIndex = index += 1;
        if (this._currLevel >= this.newIndex) {
            this.leftBg = BaseBitmap.create("rechargevie_open");
        }
        else {
            this.leftBg = BaseBitmap.create("rechargevie_close");
        }
        this.leftBg.x = 0;
        this.leftBg.y = 0;
        this.addChild(this.leftBg);
        var vipImg = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(this.newIndex).icon);
        this.addChild(vipImg);
        vipImg.x = this.leftBg.width / 2 - 40;
        vipImg.y = this.leftBg.height / 2 - 12;
        this.vipImg = vipImg;
        // if(this.newIndex==1)
        // {
        // 	this.vipImg =vipImg;
        // }
        this.public_dot2 = BaseBitmap.create("public_dot2");
        if (Api.shopVoApi.getVipRewardInfo(this.newIndex)) {
            // console.log("已经领取"+this.newIndex);
            this.public_dot2.visible = false;
        }
        else {
            if (Api.vipVoApi.getVipCfgByLevel(index).reward) {
                if (Api.playerVoApi.getPlayerVipLevel() >= this.newIndex) {
                    var vip1Boo = Api.switchVoApi.checkVip1Privilege();
                    this.public_dot2.visible = true;
                    if (this.newIndex == 1 && vip1Boo == false) {
                        this.public_dot2.visible = false;
                    }
                }
                else {
                    this.public_dot2.visible = false;
                }
            }
            else {
                this.public_dot2.visible = false;
            }
        }
        this.addChild(this.public_dot2);
        this.public_dot2.x = 115;
        this.public_dot2.y = 25;
        if (Api.acVoApi.getActivityVoByAidAndCode("discount", "1") && Api.acVoApi.getActivityVoByAidAndCode("discount", "1").isStart) {
            this.discountIcon = BaseBitmap.create("recharge_discount_left");
            this.discountIcon.x = 0;
            this.discountIcon.y = 0;
            this.addChild(this.discountIcon);
        }
    };
    VipBtnScrollItem.prototype.setRedhot = function () {
        this.public_dot2.visible = false;
    };
    VipBtnScrollItem.prototype.setType = function () {
        this.rechargevie_down = BaseBitmap.create("rechargevie_down");
        this.rechargevie_down.x = this.leftBg.x;
        this.rechargevie_down.y = this.leftBg.y;
        this.addChild(this.rechargevie_down);
        // this.setChildIndex(this.rechargevie_down,this.numChildren-1);
        this.setChildIndex(this.rechargevie_down, this.getChildIndex(this.vipImg));
    };
    VipBtnScrollItem.prototype.removeBitmap = function () {
        if (this.rechargevie_down) {
            // this.removeChild(this.rechargevie_down);
            BaseBitmap.release(this.rechargevie_down);
            this.rechargevie_down = null;
        }
    };
    VipBtnScrollItem.prototype.getSpaceY = function () {
        return 1;
    };
    VipBtnScrollItem.prototype.dispose = function () {
        this.newIndex = 0;
        this.rechargevie_down = null;
        this._currLevel = 0;
        this.leftBg = null;
        this.public_dot2 = null;
        this.vipImg = null;
        _super.prototype.dispose.call(this);
    };
    return VipBtnScrollItem;
}(ScrollListItem));
__reflect(VipBtnScrollItem.prototype, "VipBtnScrollItem");
