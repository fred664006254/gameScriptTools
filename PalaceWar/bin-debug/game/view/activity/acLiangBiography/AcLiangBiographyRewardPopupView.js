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
 * 财神祝福
 * author 张朝阳
 * date 2018/12/25
 * @class AcWealthComingRewardPopupView
 */
var AcLiangBiographyRewardPopupView = (function (_super) {
    __extends(AcLiangBiographyRewardPopupView, _super);
    function AcLiangBiographyRewardPopupView() {
        return _super.call(this) || this;
    }
    AcLiangBiographyRewardPopupView.prototype.initView = function () {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
        var topTF = ComponentManager.getTextField(LanguageManager.getlocal("acLiangBiographyRewardPopupViewTopDesc-" + code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        topTF.setPosition(this.viewBg.x + this.viewBg.width / 2 - topTF.width / 2, 15);
        this.addChildToContainer(topTF);
        var rewards = cfg.rewardPoolList();
        var rewardVo = GameData.formatRewardItem(rewards);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 525;
        bg.height = Math.round(rewardVo.length / 4) * 130 + 20;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, topTF.y + topTF.height + 10);
        this.addChildToContainer(bg);
        for (var i = 0; i < rewardVo.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVo[i], true, true);
            rewardDB.setPosition(bg.x + 20 + ((rewardDB.width + 18) * (i % 4)), bg.y + 20 + ((rewardDB.height + 18) * Math.floor(i / 4)));
            this.addChildToContainer(rewardDB);
        }
    };
    AcLiangBiographyRewardPopupView.prototype.getTitleStr = function () {
        return "acLiangBiographyRewardPopupViewTitle-" + this.param.data.code;
    };
    AcLiangBiographyRewardPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcLiangBiographyRewardPopupView;
}(PopupView));
__reflect(AcLiangBiographyRewardPopupView.prototype, "AcLiangBiographyRewardPopupView");
//# sourceMappingURL=AcLiangBiographyRewardPopupView.js.map