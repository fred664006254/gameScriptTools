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
  * 筑阁祭天活动Skin view
  * @author 张朝阳
  * date 2019/5/24
 * @class AcWorshipSkinRewardPopupView
 */
var AcWorshipSkinRewardPopupView = (function (_super) {
    __extends(AcWorshipSkinRewardPopupView, _super);
    function AcWorshipSkinRewardPopupView() {
        return _super.call(this) || this;
    }
    AcWorshipSkinRewardPopupView.prototype.initView = function () {
    };
    AcWorshipSkinRewardPopupView.prototype.resetBgSize = function () {
        var _this = this;
        _super.prototype.resetBgSize.call(this);
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
        var bg = BaseLoadBitmap.create("acworshipview_skinbg");
        bg.width = 615;
        bg.height = 559;
        bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, GameConfig.stageHeigth / 2 - bg.height / 2);
        this.addChildToContainer(bg);
        var titlebg = BaseLoadBitmap.create("acworshipview_skintitlebg");
        titlebg.width = 337;
        titlebg.height = 104;
        titlebg.setPosition(bg.x + bg.width / 2 - titlebg.width / 2, bg.y - titlebg.height / 2 + 20);
        this.addChildToContainer(titlebg);
        var desc1TF = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipSkinRewardPopupViewDesc1-" + code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc1TF.setPosition(bg.x + 130, bg.y + 370);
        this.addChildToContainer(desc1TF);
        var desc2TF = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipSkinRewardPopupViewDesc2-" + code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc2TF.setPosition(desc1TF.x, desc1TF.y + desc1TF.height + 8);
        this.addChildToContainer(desc2TF);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", function () {
            _this.hide();
        }, this);
        confirmBtn.setPosition(bg.x + bg.width / 2 - confirmBtn.width / 2, bg.y + bg.height - confirmBtn.height - 50);
        this.addChildToContainer(confirmBtn);
        var container = Api.playerVoApi.getUserHeadContainer();
        container.setPosition(bg.x + 248, bg.y + 57);
        this.addChildToContainer(container);
        this.closeBtn.setPosition(bg.x + bg.width - 120, bg.y + 40);
    };
    AcWorshipSkinRewardPopupView.prototype.getCloseBtnName = function () {
        return "sharepopupview_closebtn";
    };
    AcWorshipSkinRewardPopupView.prototype.getBgName = function () {
        return null;
    };
    AcWorshipSkinRewardPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    AcWorshipSkinRewardPopupView.prototype.getTitleStr = function () {
        return null;
    };
    AcWorshipSkinRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["sharepopupview_closebtn"
        ]);
    };
    AcWorshipSkinRewardPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcWorshipSkinRewardPopupView;
}(PopupView));
__reflect(AcWorshipSkinRewardPopupView.prototype, "AcWorshipSkinRewardPopupView");
//# sourceMappingURL=AcWorshipSkinRewardPopupView.js.map