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
 * 七日好礼门客info
 * @author 张朝阳
 * date 2019/3/21
 * @class SevenDaysSignUpServantInfoPopupView
 */
var SevenDaysSignUpServantInfoPopupView = (function (_super) {
    __extends(SevenDaysSignUpServantInfoPopupView, _super);
    function SevenDaysSignUpServantInfoPopupView() {
        return _super.call(this) || this;
    }
    SevenDaysSignUpServantInfoPopupView.prototype.initView = function () {
        var bg = BaseLoadBitmap.create("sevendayssignupview_infobg_2");
        bg.width = 544;
        bg.height = 462;
        ;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        this.addChildToContainer(bg);
        var rect = new egret.Rectangle(0, 0, 544, 462);
        var maskContan = new BaseDisplayObjectContainer();
        maskContan.width = 544;
        maskContan.height = 462;
        maskContan.mask = rect;
        maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y);
        this.addChildToContainer(maskContan);
        var sid = '1050';
        var servantCfg = Config.ServantCfg.getServantItemById(sid);
        var servantImg = BaseLoadBitmap.create(servantCfg.fullIcon);
        servantImg.width = 405;
        servantImg.height = 467;
        servantImg.anchorOffsetY = servantImg.height;
        servantImg.anchorOffsetX = servantImg.width / 2;
        servantImg.setScale(0.89);
        servantImg.x = maskContan.width / 2;
        servantImg.y = maskContan.y + maskContan.height;
        maskContan.addChild(servantImg);
        var res = "sevendayssignupview_namebg_2";
        if (PlatformManager.checkIsRuSp()) {
            res += "sevendayssignupview_namebg_1_ru";
        }
        var nameTips = BaseLoadBitmap.create(res);
        nameTips.setPosition(bg.x + 5, bg.y + 15);
        this.addChildToContainer(nameTips);
        var descres = "sevendayssignupview_descbg_2";
        if (PlatformManager.checkIsRuSp()) {
            descres += "sevendayssignupview_descbg_1_ru";
        }
        var buttomTip = BaseLoadBitmap.create(descres);
        buttomTip.width = 534;
        buttomTip.height = 33;
        buttomTip.setPosition(bg.x + bg.width / 2 - buttomTip.width / 2, bg.y + bg.height - buttomTip.height);
        this.addChildToContainer(buttomTip);
        //门客角标
        if (servantCfg.quality2) {
            var cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
            cornerImg.x = 480;
            cornerImg.y = 350;
            cornerImg.setScale(1.3);
            this.addChildToContainer(cornerImg);
        }
    };
    SevenDaysSignUpServantInfoPopupView.prototype.getResourceList = function () {
        var arr = [];
        if (PlatformManager.checkIsRuSp()) {
            arr.push("sevendayssignupview_descbg_1_ru", "sevendayssignupview_namebg_1_ru");
        }
        return _super.prototype.getResourceList.call(this).concat(arr);
    };
    SevenDaysSignUpServantInfoPopupView.prototype.getTitleStr = function () {
        return "sevenDaysSignUpServantInfoPopupViewTitle";
    };
    SevenDaysSignUpServantInfoPopupView.prototype.getShowHeight = function () {
        return 525 + 10;
    };
    SevenDaysSignUpServantInfoPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return SevenDaysSignUpServantInfoPopupView;
}(PopupView));
__reflect(SevenDaysSignUpServantInfoPopupView.prototype, "SevenDaysSignUpServantInfoPopupView");
//# sourceMappingURL=SevenDaysSignUpServantInfoPopupView.js.map