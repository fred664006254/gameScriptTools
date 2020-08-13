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
 * 门客战主界面门客item
 * author qianjun
 * date 2017/10/12
 */
var CountryWayServantItem = (function (_super) {
    __extends(CountryWayServantItem, _super);
    function CountryWayServantItem() {
        var _this = _super.call(this) || this;
        _this._Index = 0;
        return _this;
    }
    CountryWayServantItem.prototype.initItem = function (index, data, itemParam) {
        var view = this;
        view._data = data;
        view._Index = index;
        view.width = 78;
        view.height = 78 + 10;
        if (itemParam && itemParam.width && itemParam.height) {
            this.width = itemParam.width;
            this.height = itemParam.height;
        }
        view._servantInfoVo = data.servantItemCfg;
        view.initServantIcon(data.servantItemCfg, itemParam);
    };
    CountryWayServantItem.prototype.initServantIcon = function (servantInfoVo, itemParam) {
        var view = this;
        var temW = 78;
        if (itemParam && itemParam.temW) {
            temW = itemParam.temW;
        }
        var iconBgBt = BaseLoadBitmap.create('servant_cardbg_0', null, { callback: function () {
                iconBgBt.scaleX = temW / 194;
                iconBgBt.scaleY = temW / 192;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, iconBgBt, view, [0, 0], true);
                var iconBt = BaseLoadBitmap.create(servantInfoVo ? servantInfoVo.halfIcon : 'servant_half_empty', null, { callback: function () {
                        iconBt.scaleX = (temW - 10) / 180;
                        iconBt.scaleY = (temW - 10) / 177;
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconBt, iconBgBt);
                        view.addChild(iconBt);
                        if (!Api.servantVoApi.getServantObj(servantInfoVo.id)) {
                            App.DisplayUtil.changeToGray(iconBt);
                            var mask = BaseBitmap.create("public_9_bg20");
                            mask.width = itemParam ? 110 : 78;
                            mask.height = itemParam ? 110 : 78;
                            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, mask, iconBgBt);
                            view.addChild(mask);
                            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal('CountryWarNoServant'), itemParam ? 20 : 17, TextFieldConst.COLOR_WARN_RED3);
                            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, iconBgBt);
                            view.addChild(tipTxt);
                        }
                        var namebg = BaseBitmap.create("countrywarservantnamebg");
                        namebg.setScale(temW / 108);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, namebg, iconBgBt, [0, 3]);
                        view.addChild(namebg);
                        var nameSize = 14;
                        if (itemParam && itemParam.temW) {
                            nameSize = itemParam.nameSize;
                        }
                        var nameTxt = ComponentManager.getTextField(servantInfoVo.name, nameSize);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, nameTxt, iconBgBt, [0, 4]);
                        view.addChild(nameTxt);
                        var numbg = BaseBitmap.create("countrywarservantnumbg");
                        view.addChild(numbg);
                        var numTxtScale = 0.7;
                        if (itemParam && itemParam.temW) {
                            numTxtScale = itemParam.numTxtScale;
                        }
                        var numTxt = ComponentManager.getBitmapText("+" + Math.round(view._data.powerUp * 100) + "%", TextFieldConst.FONTNAME_ITEMTIP);
                        numTxt.setScale(numTxtScale);
                        numbg.setScale(temW / 108);
                        if (!itemParam) {
                            numbg.width = numTxt.width + 67;
                            numbg.height = 110;
                        }
                        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, numbg, iconBgBt);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, numTxt, iconBgBt, [5, 0]);
                        view.addChild(numTxt);
                    }, callbackThisObj: view });
            }, callbackThisObj: view });
        view.addChild(iconBgBt);
    };
    CountryWayServantItem.prototype.getSpaceY = function () {
        return 10;
    };
    CountryWayServantItem.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return CountryWayServantItem;
}(ScrollListItem));
__reflect(CountryWayServantItem.prototype, "CountryWayServantItem");
//# sourceMappingURL=CountryWayServantItem.js.map