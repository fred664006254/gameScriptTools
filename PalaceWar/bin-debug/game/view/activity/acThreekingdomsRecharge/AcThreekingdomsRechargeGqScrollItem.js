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
/**
 * 三国Item
 * author ycg
 * date 2020.1.14
 * @class AcThreekingdomsRechargeGqScrollItem
 */
var AcThreekingdomsRechargeGqScrollItem = (function (_super) {
    __extends(AcThreekingdomsRechargeGqScrollItem, _super);
    function AcThreekingdomsRechargeGqScrollItem() {
        var _this = _super.call(this) || this;
        _this._mask = null;
        _this._flag = null;
        return _this;
    }
    AcThreekingdomsRechargeGqScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._code = itemParam.code;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(itemParam.aid, this._code);
        // let bgIndex = index + 1;
        // if (bgIndex > 5){
        //     bgIndex = bgIndex - 5;
        // }
        var bgIndex = index % 5 + 1;
        var bgImg = ResourceManager.hasRes("acthreekingdomsrecharge_guanqiaitembg-" + this.getTypeCode() + "_" + bgIndex) ? "acthreekingdomsrecharge_guanqiaitembg-" + this.getTypeCode() + "_" + bgIndex : "acthreekingdomsrecharge_guanqiaitembg-1" + "_" + bgIndex;
        var bg = BaseBitmap.create(bgImg);
        this.addChild(bg);
        this.width = bg.width;
        this.height = bg.height;
        //名字
        var nameBg = BaseBitmap.create("acthreekingdomsrecharge_guanqiaitem_nambg");
        nameBg.setPosition(bg.x + bg.width / 2 - nameBg.width / 2, bg.y + bg.height - nameBg.height);
        this.addChild(nameBg);
        var name = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsRechargeGuanqiaItemName-" + this.getTypeCode() + "_" + (index + 1)), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        name.setPosition(nameBg.x + nameBg.width / 2 - name.width / 2, nameBg.y + nameBg.height / 2 - name.height / 2);
        this.addChild(name);
        //距离
        var distanceBg = BaseBitmap.create("acthreekingdomsrecharge_distancenumbg");
        distanceBg.setPosition(bg.x + bg.width - distanceBg.width, bg.y + 2);
        this.addChild(distanceBg);
        var distance = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsRechargeProgressDistance-" + this.getTypeCode(), ["" + data.specialnum]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        distance.setPosition(distanceBg.x + distanceBg.width / 2 - distance.width / 2, distanceBg.y + distanceBg.height / 2 - distance.height / 2);
        this.addChild(distance);
        //遮罩
        // let mask = BaseBitmap.create("public_9_viewmask");
        // mask.width = bg.width;
        // mask.height = bg.height;
        // mask.setPosition(bg.x, bg.y);
        // this.addChild(mask);
        // mask.visible = false;
        // this._mask = mask;
        //flag
        var flagImg = ResourceManager.hasRes("acthreekingdomsrecharge_killitemflag-" + this.getTypeCode()) ? "acthreekingdomsrecharge_killitemflag-" + this.getTypeCode() : "acthreekingdomsrecharge_killitemflag-1";
        var flag = BaseBitmap.create(flagImg);
        flag.anchorOffsetX = flag.width / 2;
        flag.anchorOffsetY = flag.height / 2;
        flag.setPosition(bg.x + bg.width / 2, bg.y + bg.height / 2);
        this.addChild(flag);
        flag.visible = false;
        this._flag = flag;
        var guanqiaId = vo.getCurrGuanqiaId();
        if (guanqiaId == -1 || guanqiaId > index) {
            flag.visible = true;
        }
        else {
            flag.visible = false;
        }
    };
    AcThreekingdomsRechargeGqScrollItem.prototype.playFlagAni = function () {
        this._flag.visible = true;
        this._flag.setScale(2.5);
        egret.Tween.get(this._flag).wait(200).to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.sineOut).to({ x: this._flag.x + 1, y: this._flag.y + 1 }, 50).to({ x: this._flag.x - 1, y: this._flag.y - 1 }, 80).to({ x: this._flag.x, y: this._flag.y }, 50);
    };
    AcThreekingdomsRechargeGqScrollItem.prototype.getTypeCode = function () {
        if (this._code == "2") {
            return "1";
        }
        else if (this._code == "4") {
            return "3";
        }
        else if (this._code == "6") {
            return "5";
        }
        else if (this._code == "8") {
            return "7";
        }
        else if (this._code == "10") {
            return "9";
        }
        return this._code;
    };
    AcThreekingdomsRechargeGqScrollItem.prototype.getSpaceX = function () {
        return 3;
    };
    AcThreekingdomsRechargeGqScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcThreekingdomsRechargeGqScrollItem;
}(ScrollListItem));
__reflect(AcThreekingdomsRechargeGqScrollItem.prototype, "AcThreekingdomsRechargeGqScrollItem");
//# sourceMappingURL=AcThreekingdomsRechargeGqScrollItem.js.map