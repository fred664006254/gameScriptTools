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
var AcAC2020SearchPopupView = (function (_super) {
    __extends(AcAC2020SearchPopupView, _super);
    function AcAC2020SearchPopupView() {
        return _super.call(this) || this;
    }
    AcAC2020SearchPopupView.prototype.getResourceList = function () {
        var resArr = ["searchbottombg"];
        var bgname = this.param.data.bgname;
        resArr.push(bgname);
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    AcAC2020SearchPopupView.prototype.initView = function () {
        var bgname = this.param.data.bgname;
        var wifeId = this.param.data.wife;
        var skinId = this.param.data.skin;
        var bg = BaseBitmap.create(bgname);
        bg.setPosition(App.CommonUtil.getCenterX(this.viewBg, bg, true), 0);
        this.addChildToContainer(bg);
        var wifecfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var iconKey = "wife_full_" + wifeId;
        if (skinId) {
            iconKey = "wife_skin_" + skinId;
        }
        var icon = BaseLoadBitmap.create(iconKey);
        icon.setScale(340 / 640);
        icon.setPosition((this.viewBg.width - 330) / 2, bg.y + bg.height - 840 * icon.scaleY + 10);
        this.checkDro(wifeId, icon);
        this.addChildToContainer(icon);
        var nameBg = BaseBitmap.create("public_infobg2");
        nameBg.setPosition(100 + GameData.popupviewOffsetX, 30);
        this.addChildToContainer(nameBg);
        var fontSize = 30;
        var nameTxt = ComponentManager.getTextField(wifecfg.name, fontSize);
        if (PlatformManager.checkIsTextHorizontal()) {
            nameTxt.setPosition(bg.x + bg.width / 2 - nameTxt.width / 2, 2 * bg.height / 3 + 20);
            nameBg.width = nameTxt.width + 20;
            nameBg.setPosition(nameTxt.x + nameTxt.width / 2 - nameBg.width / 2 - 5, nameTxt.y + nameTxt.height / 2 - nameBg.height / 2);
        }
        else {
            nameTxt.width = fontSize + 2;
            var pos = App.CommonUtil.getCenterPos(nameBg, nameTxt, false);
            nameTxt.setPosition(pos.x + 4, pos.y - 3);
        }
        this.addChildToContainer(nameTxt);
        var buttomBg = BaseBitmap.create("searchbottombg");
        buttomBg.width = bg.width;
        buttomBg.height = 78;
        buttomBg.setPosition(bg.x, bg.y + bg.height);
        this.addChildToContainer(buttomBg);
        var talkStr = this.param.data.desc;
        var descTxt = ComponentManager.getTextField(talkStr, 18);
        descTxt.width = buttomBg.width - 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, descTxt, buttomBg, [10, 0]);
        this.addChildToContainer(descTxt);
        this.addTouchTap(this.removeTween, this);
        var ths = this;
        egret.Tween.get(this.container).to({ alpha: 1 }, 500).call(function () {
            ths.removeTouchTap();
            ths.addTouchTap(ths.hide, ths);
        });
    };
    AcAC2020SearchPopupView.prototype.checkDro = function (wifeId, wifeIcon) {
        var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var droWifeIcon;
        var bg2Index = this.container.getChildIndex(wifeIcon);
        var skinId = this.param.data.skin;
        var wifebone = "wife_full_" + wifeId;
        if (skinId) {
            wifebone = "wife_full3_" + skinId;
        }
        if (Api.wifeVoApi.isHaveBone(wifebone + "_ske")) {
            droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifebone);
            this.container.addChildAt(droWifeIcon, bg2Index);
            wifeIcon.visible = false;
        }
        if (droWifeIcon) {
            droWifeIcon.setScale(0.6);
            droWifeIcon.x = wifeIcon.x + 140;
            droWifeIcon.y = wifeIcon.y + 760 * 0.6 - 20;
            wifeIcon.visible = false;
        }
        else {
            wifeIcon.visible = true;
        }
    };
    AcAC2020SearchPopupView.prototype.removeTween = function () {
        if (this.container) {
            egret.Tween.removeTweens(this.container);
            this.container.alpha = 1;
        }
        this.removeTouchTap();
        this.addTouchTap(this.hide, this);
    };
    AcAC2020SearchPopupView.prototype.getBgExtraHeight = function () {
        return 0;
    };
    AcAC2020SearchPopupView.prototype.getTitleStr = function () {
        return this.param.data.title;
    };
    AcAC2020SearchPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcAC2020SearchPopupView.prototype.hide = function () {
        if (this.param.data.f) {
            this.param.data.f.apply(this.param.data.o);
        }
        _super.prototype.hide.call(this);
    };
    AcAC2020SearchPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcAC2020SearchPopupView;
}(PopupView));
__reflect(AcAC2020SearchPopupView.prototype, "AcAC2020SearchPopupView");
//# sourceMappingURL=AcAC2020SearchPopupView.js.map