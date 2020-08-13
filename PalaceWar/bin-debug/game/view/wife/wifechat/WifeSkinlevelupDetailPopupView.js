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
 * 解锁道具详情弹板
 * author qianjun
 * date 2017/9/19
 * @class ItemInfoPopupView
 */
var WifeSkinlevelupDetailPopupView = (function (_super) {
    __extends(WifeSkinlevelupDetailPopupView, _super);
    function WifeSkinlevelupDetailPopupView() {
        var _this = _super.call(this) || this;
        _this._sound = "";
        return _this;
    }
    WifeSkinlevelupDetailPopupView.prototype.initView = function () {
        var _this = this;
        var data = this.param.data;
        var skinLevel = Api.wifeSkinVoApi.getWifeSkinLV(data.skinId);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 220;
        bg.x = 20 + GameData.popupviewOffsetX;
        bg.y = 19;
        this.addChildToContainer(bg);
        var itemName = data.text;
        var effectDesc = LanguageManager.getlocal("wifeskinlevelupget" + data.data.type);
        var dropDesc = LanguageManager.getlocal("wifeskinlevelupunlock", [data.data.level]);
        var effectTitle = LanguageManager.getlocal("wifeSkillLock");
        var dropTitle = LanguageManager.getlocal("wifeskinlevelupUnLockNeed");
        this.titleTF.text = itemName;
        var icon = BaseBitmap.create(data.icon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, bg, [24 + GameData.popupviewOffsetX, 0]);
        this.addChildToContainer(icon);
        var iconnamebg = BaseBitmap.create("wifeskinleveliconbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, iconnamebg, icon, [0, -10]);
        this.addChildToContainer(iconnamebg);
        var iconTxt = ComponentManager.getTextField(itemName, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconTxt, iconnamebg);
        this.addChildToContainer(iconTxt);
        var effectTitleTF = ComponentManager.getTextField(effectTitle, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        ;
        effectTitleTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        effectTitleTF.x = 200 + GameData.popupviewOffsetX;
        effectTitleTF.y = 95;
        this.addChildToContainer(effectTitleTF);
        var effectDescTF = ComponentManager.getTextField(effectDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        effectDescTF.x = effectTitleTF.x + effectTitleTF.width;
        effectDescTF.y = effectTitleTF.y;
        effectDescTF.width = 300;
        this.addChildToContainer(effectDescTF);
        var dropTitleTF = ComponentManager.getTextField(dropTitle, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        ;
        dropTitleTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        dropTitleTF.x = 200 + GameData.popupviewOffsetX;
        dropTitleTF.y = 140;
        this.addChildToContainer(dropTitleTF);
        // if ((effectDescTF.y+effectDescTF.height)>100)
        // {
        // 	dropTitleTF.y = effectDescTF.y+effectDescTF.height+12;
        // }
        var dropDescTF = ComponentManager.getTextField(dropDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL, skinLevel >= data.data.level ? 0xffffff : TextFieldConst.COLOR_WARN_RED3);
        dropDescTF.x = dropTitleTF.x + dropTitleTF.width;
        dropDescTF.y = dropTitleTF.y;
        dropDescTF.width = 300;
        this.addChildToContainer(dropDescTF);
        var btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "wifeskinlevelupbtn" + data.data.type, function () {
            var skincfg = Config.WifeskinCfg.getWifeCfgById(data.skinId);
            var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(skincfg.wifeId);
            var lv = data.data.level;
            var id = skincfg.levelUp[lv - 1].levelUpUnlock;
            if (data.data.type == "avg") {
                if (btn.getIsGray()) {
                    var cfg = Config.WifeskinCfg.getWifeCfgById(data.skinId);
                    App.CommonUtil.showTip(LanguageManager.getlocal("wifeskinlvunlock2", [cfg.name, data.data.level]));
                }
                else {
                    var cfg = Config.WifeconversationCfg.getConversatiById(id);
                    if (cfg) {
                        ViewController.getInstance().openView(ViewConst.COMMON.WIFECHATAVGVIEW, {
                            lv: data.data.level,
                            skinId: data.skinId,
                        });
                    }
                    else {
                        App.CommonUtil.showTip(LanguageManager.getlocal("\u6CA1\u6709\u914D\u7F6E"));
                    }
                    // ViewController.getInstance().openView(ViewConst.POPUP.WIFECHATSELECTVIEW, {
                    //     skinId : data.skinId,
                    // });
                    _this.hide();
                }
            }
            else if (data.data.type == "scene") {
                var baseview = ViewController.getInstance().getView(ViewConst.POPUP.WIFESKINNEWVIEW);
                if (baseview) {
                    baseview.clickChangeToBg(data.skinId + "_" + data.data.data.levelUpUnlock);
                    var view2 = ViewController.getInstance().getView(ViewConst.COMMON.WIFESKINLEVELUPVIEW);
                    view2.hide();
                    _this.hide();
                }
            }
            else if (data.data.type == "sound") {
                SoundManager.playEffect("effect_wifeskin_" + id);
                btn.setEnable(false);
                _this._sound = "effect_wifeskin_" + id;
                egret.Tween.get(_this).wait(5000).call(function () {
                    btn.setEnable(true);
                }, _this);
            }
        }, this);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, bg, [0, bg.height + 10]);
        this.addChildToContainer(btn);
        if (data.isnew) {
            var isnew = BaseBitmap.create("wifeskinleveltip");
            isnew.setScale(0.5);
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, isnew, btn, [-isnew.width / 4, -isnew.height / 4]);
            this.addChildToContainer(isnew);
        }
        if (data.data.type == "avg" && skinLevel < data.data.level) {
            btn.setGray(true);
        }
    };
    WifeSkinlevelupDetailPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    WifeSkinlevelupDetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    WifeSkinlevelupDetailPopupView.prototype.dispose = function () {
        if (this._sound != "") {
            SoundManager.stopEffect(this._sound);
            this._sound = "";
        }
        _super.prototype.dispose.call(this);
    };
    return WifeSkinlevelupDetailPopupView;
}(PopupView));
__reflect(WifeSkinlevelupDetailPopupView.prototype, "WifeSkinlevelupDetailPopupView");
//# sourceMappingURL=WifeSkinlevelupDetailPopupView.js.map