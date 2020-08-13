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
 * 门客选择
 * author qianjun
 * date 2017/9/28
 */
var ZhenqifangSelectServantItem = (function (_super) {
    __extends(ZhenqifangSelectServantItem, _super);
    // 属性文本
    function ZhenqifangSelectServantItem() {
        return _super.call(this) || this;
    }
    ZhenqifangSelectServantItem.prototype.initItem = function (index, data) {
        this._selectedIndex = index;
        this._data = data;
        var servantInfoVo;
        if (data.support) {
            var equip = "";
            if (!data.equip || data.equip == "") {
                equip = "servant_half_" + data.servantId;
            }
            else {
                var skincfg = Config.ServantskinCfg.getServantSkinItemById(data.equip);
                equip = skincfg.icon;
            }
            var servantcfg = Config.ServantCfg.getServantItemById(data.servantId);
            servantInfoVo = {
                qualityBoxImgPath: "servant_cardbg_" + data.clv,
                level: data.level,
                clv: data.clv ? data.clv : 1,
                halfImgPath: equip,
                servantName: servantcfg.name,
                total: data.total
            };
        }
        else {
            servantInfoVo = Api.servantVoApi.getServantObj(data.servantId);
        }
        this._servantInfoVo = servantInfoVo;
        var bg = BaseBitmap.create("public_9_bg44");
        bg.width = 500;
        bg.height = 120;
        this.addChild(bg);
        this.initServantIcon(servantInfoVo);
        this.initServantInfo();
        if (data.inBuzhen) {
            var selected = BaseBitmap.create("zqfinsend");
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, selected, bg, [30, 0]);
            this.addChild(selected);
        }
        else {
            var useBtn = ComponentManager.getButton(this.getBtnResName(), this.getBtnLocalName(), this.clickBtnHandler, this);
            useBtn.setColor(TextFieldConst.COLOR_BLACK);
            useBtn.x = bg.width - useBtn.width - 10;
            useBtn.y = bg.height / 2 - useBtn.height / 2;
            this.addChild(useBtn);
            if (data.need && data.need > data.value) {
                var sxbg = BaseBitmap.create("acchristmasview_smalldescbg");
                sxbg.width = 95;
                this.addChild(sxbg);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, sxbg, useBtn, [0, useBtn.height + 5]);
                var notTxt = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangnotmanzu"), 15, TextFieldConst.COLOR_WARN_RED3);
                this.addChild(notTxt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, notTxt, sxbg);
                if (this._data.support) {
                    sxbg.visible = notTxt.visible = false;
                }
            }
            if (data.insend) {
                var notTxt = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangcdtip17"), 15);
                this.addChild(notTxt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, notTxt, useBtn, [0, -notTxt.height - 3]);
            }
        }
    };
    ZhenqifangSelectServantItem.prototype.initServantIcon = function (servantInfoVo) {
        var temW = 100;
        var iconBgBt = BaseLoadBitmap.create(this._data.support ? "servant_cardbg_0" : servantInfoVo.qualityBoxImgPath); //
        iconBgBt.x = 10;
        iconBgBt.y = 12;
        this.addChild(iconBgBt);
        iconBgBt.scaleX = temW / 194;
        iconBgBt.scaleY = temW / 192;
        var iconBt = BaseLoadBitmap.create(servantInfoVo.halfImgPath);
        iconBt.x = iconBgBt.x + 5;
        iconBt.y = iconBgBt.y + 5;
        this.addChild(iconBt);
        iconBt.scaleX = (temW - 10) / 180;
        iconBt.scaleY = (temW - 10) / 177;
    };
    /**重写该方法 */
    ZhenqifangSelectServantItem.prototype.initServantInfo = function () {
        var nameTF = ComponentManager.getTextField(this._servantInfoVo.servantName, 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameTF.x = 120;
        nameTF.y = 18;
        this.addChild(nameTF);
        if (this._data.support) {
            if (this._data.need) {
                var flag = this._data.need && this._data.need <= this._data.value;
                var attrTF = ComponentManager.getTextField(LanguageManager.getlocal(flag ? "zhenqifangcdtip22" : "zhenqifangcdtip23"), 18);
                attrTF.x = 120;
                attrTF.y = 65;
                this.addChild(attrTF);
            }
        }
        else {
            var levelTF = ComponentManager.getTextField(LanguageManager.getlocal("servant_infoLv") + '：' + ("<font color=" + TextFieldConst.COLOR_WARN_YELLOW + ">" + this._servantInfoVo.level + "</font>"), 18);
            levelTF.x = 120;
            levelTF.y = 41;
            this.addChild(levelTF);
            var attrTF = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangnotetotal") + '：' + ("<font color=" + TextFieldConst.COLOR_WARN_YELLOW + ">" + App.StringUtil.changeIntToText(this._servantInfoVo.total) + "</font>"), 18);
            attrTF.x = 120;
            attrTF.y = 64;
            this.addChild(attrTF);
            //LanguageManager.getlocal(attr) + '：' + App.StringUtil.changeIntToText(mainAtr),
            if (LanguageManager.getlocal("zhenqifangnotetotal") !== this.getAttrStr() && LanguageManager.getlocal("servant_infoLv") !== this.getAttrStr()) {
                this._attrTF = ComponentManager.getTextField(this.getAttrStr() + '：' + ("<font color=" + TextFieldConst.COLOR_WARN_YELLOW + ">" + App.StringUtil.changeIntToText(this._data.support ? this._data.total : this._data.value) + "</font>"), 18);
                this._attrTF.x = 120;
                this._attrTF.y = 87;
                this.addChild(this._attrTF);
            }
            else {
                nameTF.y = 20;
                levelTF.y = 50;
                attrTF.y = 80;
            }
        }
    };
    Object.defineProperty(ZhenqifangSelectServantItem.prototype, "api", {
        get: function () {
            return Api.zhenqifangVoApi;
        },
        enumerable: true,
        configurable: true
    });
    ZhenqifangSelectServantItem.prototype.getAttrStr = function () {
        return this._data.text;
    };
    /**按钮文字 */
    ZhenqifangSelectServantItem.prototype.getBtnLocalName = function () {
        var view = this;
        return view._data.inBuzhen ? "allianceTaskSendBtnTxt2" : "allianceTaskSendBtnTxt";
    };
    ZhenqifangSelectServantItem.prototype.clickBtnHandler = function (param) {
        var data = this._data;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SELECTED_SERVANT, {
            "index": this._selectedIndex,
            "id": data.servantId,
            clv: data.clv,
            equip: data.equip,
            value: data.value,
        });
    };
    ZhenqifangSelectServantItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ZhenqifangSelectServantItem;
}(ServantSelectedScrollItem));
__reflect(ZhenqifangSelectServantItem.prototype, "ZhenqifangSelectServantItem");
//# sourceMappingURL=ZhenqifangSelectServantItem.js.map