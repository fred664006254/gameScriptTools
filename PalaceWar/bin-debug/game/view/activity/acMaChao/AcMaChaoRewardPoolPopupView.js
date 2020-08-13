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
 * 马超活动奖池
 * @author 张朝阳
 * date 2019/1/15
 * @class AcMaChaoRewardPoolPopupView
 */
var AcMaChaoRewardPoolPopupView = (function (_super) {
    __extends(AcMaChaoRewardPoolPopupView, _super);
    function AcMaChaoRewardPoolPopupView() {
        return _super.call(this) || this;
    }
    AcMaChaoRewardPoolPopupView.prototype.initView = function () {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
        var rewards = cfg.getRewardPool();
        var rewardVo = GameData.formatRewardItem(rewards);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 525;
        bg.height = Math.round(rewardVo.length / 4) * 130 + 55;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
        this.addChildToContainer(bg);
        var topTF = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoRewardPoolPopupViewTopDesc-" + code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        topTF.setPosition(this.viewBg.x + this.viewBg.width / 2 - topTF.width / 2, bg.y + 24 - topTF.height / 2);
        this.addChildToContainer(topTF);
        var rewardbg = BaseBitmap.create("public_9_probiginnerbg");
        rewardbg.width = 510;
        rewardbg.height = Math.round(rewardVo.length / 4) * 130;
        rewardbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rewardbg.width / 2, topTF.y + topTF.height + 5);
        this.addChildToContainer(rewardbg);
        for (var i = 0; i < rewardVo.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVo[i], true, true);
            rewardDB.setPosition(rewardbg.x + 16 + ((rewardDB.width + 16) * (i % 4)), rewardbg.y + 20 + ((rewardDB.height + 18) * Math.floor(i / 4)));
            this.addChildToContainer(rewardDB);
        }
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", this.hide, this);
        confirmBtn.setPosition(this.viewBg.x + this.viewBg.width / 2 - confirmBtn.width / 2, bg.y + bg.height + 10);
        this.addChildToContainer(confirmBtn);
    };
    AcMaChaoRewardPoolPopupView.prototype.getTitleStr = function () {
        return "acMaChaoRewardPoolPopupViewTitle-" + this.param.data.code;
    };
    AcMaChaoRewardPoolPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcMaChaoRewardPoolPopupView;
}(PopupView));
__reflect(AcMaChaoRewardPoolPopupView.prototype, "AcMaChaoRewardPoolPopupView");
//# sourceMappingURL=AcMaChaoRewardPoolPopupView.js.map