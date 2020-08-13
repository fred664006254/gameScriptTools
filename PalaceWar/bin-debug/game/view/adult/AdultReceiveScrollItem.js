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
 *红颜接待item
 * author dky
 * date 2017/10/31
 * @class AdultMarryRequestScrollItem
 */
var AdultReceiveScrollItem = (function (_super) {
    __extends(AdultReceiveScrollItem, _super);
    function AdultReceiveScrollItem() {
        var _this = _super.call(this) || this;
        _this._effectTxt = null;
        return _this;
    }
    //{total:number,fatherName:string,et:number,id:number,aquality:number,st:number,name:string,uid:number,sex:number}
    AdultReceiveScrollItem.prototype.initItem = function (index, data) {
        var view = this;
        view._data = data;
        view.width = 520;
        view.height = 126;
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 455;
        bg.height = 114;
        view.setLayoutPosition(LayoutConst.rightverticalCenter, bg, view);
        view.addChild(bg);
        var wifeGroup = view.getWifestatusIcon(data.wifeid);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, wifeGroup, view);
        view.addChild(wifeGroup);
        var nameTxt = ComponentManager.getTextField(data.name, 20, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, nameTxt, bg, [70, 15]);
        view.addChild(nameTxt);
        var statusTxt = ComponentManager.getTextField(LanguageManager.getlocal('adultAddEffect1', [LanguageManager.getlocal("wifestatusTitle" + data.level), Math.floor(Config.SadunCfg.receptionEffectList[data.level].addExtent * 100).toString()]), 20, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, statusTxt, nameTxt, [0, nameTxt.textHeight + 10]);
        view.addChild(statusTxt);
        //-addExtent  加成幅度  子嗣拜访后属性 = 子嗣属性 + baseEffect + 子嗣属性 * addExtent   向下取整  例：子嗣拜访后武力 = 子嗣拜访前武力 + baseEffect + 子嗣拜访前武力 * （1 + addExtent）
        var childInfo = data.childInfo;
        var addEffect = 0; //Math.floor(Config.SadunCfg.baseEffect[childInfo.aquality - 1] * 4 + childInfo.total * Config.SadunCfg.receptionEffectList[data.level].addExtent);
        for (var i in childInfo.attr) {
            addEffect += (Math.floor(Config.SadunCfg.baseEffect[childInfo.aquality - 1] + childInfo.attr[i] * Config.SadunCfg.receptionEffectList[data.level].addExtent));
        }
        var effectTxt = ComponentManager.getTextField(LanguageManager.getlocal("adultAddEffect2", [addEffect.toString()]), 20, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, effectTxt, statusTxt, [0, statusTxt.textHeight + 10]);
        view.addChild(effectTxt);
        view._effectTxt = effectTxt;
        if (data.isinreceive) {
            var adulthbian = BaseBitmap.create("adultxxzhong");
            view.setLayoutPosition(LayoutConst.rightverticalCenter, adulthbian, bg, [20, 0]);
            view.addChild(adulthbian);
        }
        else {
            var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, 'adultChooseReceive', view.chooseBtnClick, view);
            view.setLayoutPosition(LayoutConst.rightverticalCenter, btn, bg, [20, 0]);
            view.addChild(btn);
        }
        if (Api.wifebanishVoApi.getIsWifeBanishing(String(data.wifeid))) {
            var banishContainer_1 = new BaseDisplayObjectContainer();
            banishContainer_1.setPosition(wifeGroup.x + 15, wifeGroup.y + 20);
            view.addChild(banishContainer_1);
            var banishingbg = BaseBitmap.create("public_9_bg60");
            banishingbg.y = 64;
            banishingbg.height = 24;
            banishingbg.width = 50;
            banishContainer_1.addChild(banishingbg);
            var banishingbg2 = BaseBitmap.create("public_9_bg60");
            banishingbg2.y = 64;
            banishingbg2.height = 24;
            banishingbg2.width = 50;
            banishingbg2.scaleX = -1;
            banishingbg2.x = banishingbg.width + banishingbg2.width;
            banishContainer_1.addChild(banishingbg2);
            var banishingText = BaseBitmap.create("wife_banishing_text");
            banishingText.setPosition(banishingbg.width - banishingText.width / 2, 64);
            banishContainer_1.addChild(banishingText);
            var banishInfo = Api.wifebanishVoApi.getBanishInfoVoByWife(data.wifeid);
            if (banishInfo && banishInfo.et >= GameData.serverTime) {
                egret.Tween.get(banishContainer_1).wait((banishInfo.et - GameData.serverTime) * 1000).call(function () {
                    banishContainer_1.dispose();
                });
            }
        }
    };
    AdultReceiveScrollItem.prototype.chooseClick = function () {
        var view = this;
    };
    AdultReceiveScrollItem.prototype.getWifestatusIcon = function (wifeId) {
        var iconContainer = new BaseDisplayObjectContainer();
        var iconBg = BaseBitmap.create("wifestatus_headbg");
        iconBg.name = "bg2";
        iconContainer.addChild(iconBg);
        var iconStr = Api.wifeVoApi.getWifeIcon(wifeId);
        var icon = BaseLoadBitmap.create(iconStr);
        icon.setPosition(0, 5);
        icon.setScale(0.6);
        if (App.CommonUtil.check_dragon()) {
            var iconMask = BaseBitmap.create("wifestatus_headmask");
            iconMask.setPosition(5, 5);
            iconContainer.addChild(iconMask);
            iconContainer.cacheAsBitmap = true;
            icon.mask = iconMask;
        }
        iconContainer.addChild(icon);
        var adulthbian = BaseBitmap.create("adulthbian");
        adulthbian.setPosition(0, 0);
        iconContainer.addChild(adulthbian);
        return iconContainer;
    };
    AdultReceiveScrollItem.prototype.chooseBtnClick = function () {
        NetManager.request(NetRequestConst.REQUEST_SADUN_AGREEVISIT, {
            fchildId: this._data.childInfo.id.toString(),
            fuid: Number(this._data.childInfo.uid),
            wifeId: this._data.wifeid.toString()
        });
        var addEffect = 0; //Math.floor(Config.SadunCfg.baseEffect[childInfo.aquality - 1] * 4 + childInfo.total * Config.SadunCfg.receptionEffectList[data.level].addExtent);
        for (var i in this._data.childInfo.attr) {
            addEffect += Math.floor(Config.SadunCfg.baseEffect[this._data.childInfo.aquality - 1] + this._data.childInfo.attr[i] * Config.SadunCfg.receptionEffectList[this._data.level].addExtent);
        }
        Api.adultVoApi.setReceiveWifeInfo({
            'wifename': this._data.name,
            'attr': addEffect,
            'childname': this._data.childInfo.name
        });
    };
    AdultReceiveScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AdultReceiveScrollItem.prototype.dispose = function () {
        this._data = null;
        this._effectTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AdultReceiveScrollItem;
}(ScrollListItem));
__reflect(AdultReceiveScrollItem.prototype, "AdultReceiveScrollItem");
//# sourceMappingURL=AdultReceiveScrollItem.js.map