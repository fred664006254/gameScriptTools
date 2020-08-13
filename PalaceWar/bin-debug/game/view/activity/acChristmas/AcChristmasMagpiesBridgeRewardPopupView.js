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
 * 鹊桥相会奖励牛郎织女皮肤预览
 * author yangchengguo
 * date 2019/7/16
 * @class AcChristmasView
 */
var AcChristmasMagpiesBridgeRewardPopupView = (function (_super) {
    __extends(AcChristmasMagpiesBridgeRewardPopupView, _super);
    function AcChristmasMagpiesBridgeRewardPopupView() {
        return _super.call(this) || this;
    }
    AcChristmasMagpiesBridgeRewardPopupView.prototype.initView = function () {
    };
    AcChristmasMagpiesBridgeRewardPopupView.prototype.resetBgSize = function () {
        var _this = this;
        _super.prototype.resetBgSize.call(this);
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
        var bg = BaseLoadBitmap.create("acchristmasview_popbg_6");
        bg.width = 615;
        bg.height = 559;
        bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, GameConfig.stageHeigth / 2 - bg.height / 2);
        this.addChildToContainer(bg);
        var titlebg = BaseLoadBitmap.create("acchristmasview_poptitlebg_6");
        titlebg.width = 337;
        titlebg.height = 104;
        titlebg.setPosition(bg.x + bg.width / 2 - titlebg.width / 2, bg.y - titlebg.height / 2 + 20);
        this.addChildToContainer(titlebg);
        var desc1TF = ComponentManager.getTextField(LanguageManager.getlocal("acWealthComingSkinRewardPopupViewDesc1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc1TF.setPosition(bg.x + 130, bg.y + 370);
        this.addChildToContainer(desc1TF);
        var desc2TF = ComponentManager.getTextField(LanguageManager.getlocal("acWealthComingSkinRewardPopupViewDesc2"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc2TF.setPosition(desc1TF.x, desc1TF.y + desc1TF.height + 8);
        this.addChildToContainer(desc2TF);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", function () {
            _this.hide();
        }, this);
        confirmBtn.setPosition(bg.x + bg.width / 2 - confirmBtn.width / 2, bg.y + bg.height - confirmBtn.height - 50);
        this.addChildToContainer(confirmBtn);
        var picId = Api.playerVoApi.getPlayePicId();
        if (Api.playerVoApi.getUserSex(picId) == 2) {
            //女的
            var container = Api.playerVoApi.getUserHeadContainer();
            container.setPosition(bg.x + 412 - container.width / 2, bg.y + 220 - container.height + 18);
            this.addChildToContainer(container);
            if (PlatformManager.checkIsKRSp()) {
                container.setPosition(bg.x + 319 - container.width / 2, bg.y + 208 - container.height);
            }
            else {
                var container2 = Api.playerVoApi.getUserHeadContainer(1);
                container2.setPosition(bg.x + 233 - container.width / 2, bg.y + 188 - container2.height + 18);
                this.addChildToContainer(container2);
            }
        }
        else {
            //男的
            var container = Api.playerVoApi.getUserHeadContainer();
            container.setPosition(bg.x + 233 - container.width / 2, bg.y + 188 - container.height + 18);
            this.addChildToContainer(container);
            if (PlatformManager.checkIsKRSp()) {
                container.setPosition(bg.x + 319 - container.width / 2, bg.y + 208 - container.height);
            }
            else {
                var container2 = Api.playerVoApi.getUserHeadContainer(6);
                container2.setPosition(bg.x + 412 - container.width / 2, bg.y + 220 - container2.height + 18);
                this.addChildToContainer(container2);
            }
        }
        this.closeBtn.setPosition(bg.x + bg.width - 120, bg.y + 40);
    };
    AcChristmasMagpiesBridgeRewardPopupView.prototype.getCloseBtnName = function () {
        return "sharepopupview_closebtn";
    };
    AcChristmasMagpiesBridgeRewardPopupView.prototype.getBgName = function () {
        return null;
    };
    AcChristmasMagpiesBridgeRewardPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    AcChristmasMagpiesBridgeRewardPopupView.prototype.getTitleStr = function () {
        return null;
    };
    AcChristmasMagpiesBridgeRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["sharepopupview_closebtn"
        ]);
    };
    AcChristmasMagpiesBridgeRewardPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcChristmasMagpiesBridgeRewardPopupView;
}(PopupView));
__reflect(AcChristmasMagpiesBridgeRewardPopupView.prototype, "AcChristmasMagpiesBridgeRewardPopupView");
//# sourceMappingURL=AcChristmasMagpiesBridgeRewardPopupView.js.map