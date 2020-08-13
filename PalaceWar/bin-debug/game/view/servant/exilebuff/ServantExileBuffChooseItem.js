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
var ServantExileBuffChooseItem = (function (_super) {
    __extends(ServantExileBuffChooseItem, _super);
    function ServantExileBuffChooseItem() {
        var _this = _super.call(this) || this;
        _this._itemparam = null;
        _this._sid = null;
        _this._needCost = false;
        return _this;
    }
    ServantExileBuffChooseItem.prototype.initItem = function (index, sid, itemparam) {
        this._sid = sid[0];
        var type = sid[1];
        this._needCost = sid[2];
        this._itemparam = itemparam;
        var data = Api.servantVoApi.getServantObj(this._sid);
        var bg = BaseBitmap.create("public_popupscrollitembg");
        bg.width = 510;
        bg.height = 136;
        this.addChild(bg);
        var scaleVale = 106 / 184;
        var iconBgBt = BaseLoadBitmap.create(data.qualityBoxImgPath);
        iconBgBt.width = 184;
        iconBgBt.height = 184;
        iconBgBt.setScale(scaleVale);
        iconBgBt.setPosition(bg.x + 16, bg.y + bg.height / 2 - iconBgBt.height / 2 * scaleVale);
        this.addChild(iconBgBt);
        var iconBt = BaseLoadBitmap.create(data.halfImgPath);
        iconBt.width = 180;
        iconBt.height = 177;
        iconBt.setScale(scaleVale);
        iconBt.setPosition(iconBgBt.x + iconBgBt.width / 2 * scaleVale - iconBt.width / 2 * scaleVale, iconBgBt.y + iconBgBt.height / 2 * scaleVale - iconBt.height / 2 * scaleVale);
        this.addChild(iconBt);
        var itemNameBg = BaseBitmap.create("public_titlebg");
        itemNameBg.x = iconBgBt.x + 115;
        itemNameBg.y = iconBgBt.y;
        this.addChild(itemNameBg);
        var servantNameTxt = ComponentManager.getTextField(data.servantName, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        servantNameTxt.setPosition(itemNameBg.x + 15, itemNameBg.y + itemNameBg.height / 2 - servantNameTxt.height / 2);
        this.addChild(servantNameTxt);
        var servantLevelTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantExileSelectServantPopupViewServantLevel", [String(data.level)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        servantLevelTxt.setPosition(servantNameTxt.x, servantNameTxt.y + servantNameTxt.height + 13);
        this.addChild(servantLevelTxt);
        var servantSpecialityTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantExileSelectServantPopupViewServantPower", [String(data.total)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        servantSpecialityTxt.setPosition(servantNameTxt.x, servantLevelTxt.y + servantLevelTxt.height + 3);
        this.addChild(servantSpecialityTxt);
        var servantFightTxt = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_servant_total", [String(data.getTotalBookValue())]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        servantFightTxt.setPosition(servantNameTxt.x, servantSpecialityTxt.y + servantSpecialityTxt.height + 2);
        this.addChild(servantFightTxt);
        if (type != 2) {
            var tispstr = LanguageManager.getlocal("exileBuff_choosetype" + type);
            var tiptext = ComponentManager.getTextField(tispstr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            tiptext.setPosition(bg.x + bg.width - tiptext.width / 2 - 80, bg.y + bg.height / 2);
            this.addChild(tiptext);
        }
        else {
            var useServantBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "adultChoose", this.useServantClick, this);
            useServantBtn.setPosition(bg.x + bg.width - useServantBtn.width - 15, bg.y + bg.height / 2);
            this.addChild(useServantBtn);
            if (sid[2]) {
                var goldIcon = BaseLoadBitmap.create("itemicon1");
                goldIcon.width = 50;
                goldIcon.height = 50;
                goldIcon.x = useServantBtn.x + 20;
                goldIcon.y = bg.y + bg.height / 2 - goldIcon.height - 2;
                this.addChild(goldIcon);
                var coststr = LanguageManager.getlocal("acChristmasViewUseNum", [String(Config.ExileCfg.changeBuffCost)]);
                var tiptext = ComponentManager.getTextField(coststr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
                tiptext.setPosition(goldIcon.x + goldIcon.width, goldIcon.y + goldIcon.height / 2 - tiptext.height / 2);
                this.addChild(tiptext);
            }
        }
    };
    ServantExileBuffChooseItem.prototype.useServantClick = function () {
        var cfg = Config.ServantCfg.getServantItemById(this._sid);
        if (this._needCost) {
            var needgem = Config.ExileCfg.changeBuffCost;
            if (needgem > Api.playerVoApi.getPlayerGem()) {
                App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
                return;
            }
            var msg = LanguageManager.getlocal("exileBuff_change_tip2", [cfg.name, String(needgem)]);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: msg,
                callback: this.useCallback,
                handler: this,
                needCancel: true
            });
        }
        else {
            var msg = LanguageManager.getlocal("exileBuff_change_tip1", [cfg.name]);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: msg,
                callback: this.useCallback,
                handler: this,
                needCancel: true
            });
        }
    };
    ServantExileBuffChooseItem.prototype.useCallback = function () {
        var f = this._itemparam.f;
        var o = this._itemparam.o;
        f.apply(o, [this._sid]);
    };
    ServantExileBuffChooseItem.prototype.dispose = function () {
        this._sid = null;
        this._itemparam = null;
        this._needCost = false;
        _super.prototype.dispose.call(this);
    };
    return ServantExileBuffChooseItem;
}(ScrollListItem));
__reflect(ServantExileBuffChooseItem.prototype, "ServantExileBuffChooseItem");
//# sourceMappingURL=ServantExileBuffChooseItem.js.map