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
  * 圣诞奖励new item
  * author ycg
  * date 2018.11.26
  * @class AcChristmasNewRewardScrollItem
  */
var AcChristmasNewRewardScrollItem = (function (_super) {
    __extends(AcChristmasNewRewardScrollItem, _super);
    function AcChristmasNewRewardScrollItem() {
        var _this = _super.call(this) || this;
        _this._aid = null;
        _this._code = null;
        return _this;
    }
    //data: {id:string,reward: string, weight: number, isLight: boolean}
    AcChristmasNewRewardScrollItem.prototype.initItem = function (index, itemData, itemParam) {
        var aid = itemParam.aid;
        var code = itemParam.code;
        this._aid = aid;
        this._code = code;
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 606;
        bg.height = 100;
        bg.setPosition(2, 0);
        this.addChild(bg);
        var titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
        titleBg.width = 600;
        titleBg.height = 35;
        titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 10);
        this.addChild(titleBg);
        var titleStr = "";
        if (itemData.id <= 3) {
            titleStr = LanguageManager.getlocal("acChristmasAchieve-" + this.getTypeCode() + "_floorTitle_" + (itemData.id), ["" + this.cfg.getFloorCost(String(itemData.id)), "" + this.vo.getOtherFloorValue(itemData.id)]);
        }
        else {
            var list = this.cfg.getFloorRewardPoolList("" + (itemData.id));
            titleStr = LanguageManager.getlocal("acChristmasAchieve-" + this.getTypeCode() + "_floorTitle_" + (itemData.id), ["" + this.cfg.getFloorCost(String(itemData.id)), "" + list.length]);
        }
        var titleTf = ComponentManager.getTextField(titleStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTf.setPosition(titleBg.x + titleBg.width / 2 - titleTf.width / 2, titleBg.y + titleBg.height / 2 - titleTf.height / 2);
        this.addChild(titleTf);
        bg.height = titleBg.y + titleBg.height;
        var itemBg = BaseBitmap.create("public_9_bg21");
        itemBg.width = bg.width - 20;
        itemBg.setPosition(bg.x + bg.width / 2 - itemBg.width / 2, titleBg.y + titleBg.height + 5);
        this.addChild(itemBg);
        itemBg.height = 100;
        var itemH = 0;
        for (var i = 0; i < itemData.data.length; i++) {
            var item = new AcChristmasRewardScrollItem();
            item.initItem(i, itemData.data[i], { aid: aid, code: code, scale: 0.9, floor: itemData.id });
            item.setPosition(itemBg.x + 7 + (item.width + 6) * (i % 5), itemBg.y + Math.floor(i / 5) * (item.height + 0));
            itemH = item.height;
            this.addChild(item);
        }
        itemBg.height = Math.ceil(itemData.data.length / 5) * (itemH);
        bg.height = itemBg.height + 60;
        this.height = bg.height;
        this.width = 610;
        var viewMask = BaseBitmap.create("public_9_viewmask");
        viewMask.width = this.width;
        viewMask.height = this.height;
        this.addChild(viewMask);
        viewMask.alpha = 0.9;
        var maskTipBgStr = ResourceManager.hasRes("acchristmas-" + this.getTypeCode() + "_dressbg1") ? "acchristmas-" + this.getTypeCode() + "_dressbg1" : "acchristmas-8_dressbg1";
        var maskTipBg = BaseBitmap.create(maskTipBgStr);
        maskTipBg.setPosition(this.width / 2 - maskTipBg.width / 2, this.height / 2 - maskTipBg.height / 2);
        this.addChild(maskTipBg);
        var maskTip = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED3);
        maskTip.anchorOffsetX = maskTip.width / 2;
        maskTip.setPosition(maskTipBg.x + 70, maskTipBg.y + maskTipBg.height / 2 - maskTip.height / 2 + 5);
        this.addChild(maskTip);
        var currFloor = this.vo.getFloor();
        if (currFloor > (itemData.id)) {
            viewMask.visible = true;
            maskTipBg.visible = true;
            maskTip.visible = true;
            maskTipBgStr = ResourceManager.hasRes("acchristmas-" + this.getTypeCode() + "_dressbg2") ? "acchristmas-" + this.getTypeCode() + "_dressbg2" : "acchristmas-8_dressbg2";
            maskTipBg.setRes(maskTipBgStr);
            maskTip.text = LanguageManager.getlocal("acChristmasAchieve-" + this.getTypeCode() + "_end");
            maskTip.anchorOffsetX = maskTip.width / 2;
            maskTip.x = maskTipBg.x + maskTipBg.width / 2;
        }
        else if (currFloor == itemData.id) {
            viewMask.visible = false;
            maskTipBg.visible = false;
            maskTip.visible = false;
        }
        else if (currFloor < itemData.id) {
            viewMask.visible = true;
            maskTipBg.visible = true;
            maskTip.visible = true;
            maskTip.text = LanguageManager.getlocal("acChristmasAchieve-" + this.getTypeCode() + "_notOpen");
            maskTip.anchorOffsetX = maskTip.width / 2;
            maskTip.x = maskTipBg.x + 60 + 277 / 2;
        }
    };
    Object.defineProperty(AcChristmasNewRewardScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChristmasNewRewardScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcChristmasNewRewardScrollItem.prototype.getTypeCode = function () {
        if (this._code == "9" || this._code == "10") {
            return "8";
        }
        return this._code;
    };
    // public getSpaceY():number{
    // 	return 20;
    // }
    AcChristmasNewRewardScrollItem.prototype.dispose = function () {
        this._aid = null;
        this._code = null;
        _super.prototype.dispose.call(this);
    };
    return AcChristmasNewRewardScrollItem;
}(ScrollListItem));
__reflect(AcChristmasNewRewardScrollItem.prototype, "AcChristmasNewRewardScrollItem");
//# sourceMappingURL=AcChristmasNewRewardScrollItem.js.map