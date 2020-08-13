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
 * 情人节活动头像框奖励
 * author 张朝阳
 * date 2018/11/27
 * @class AcChristmasTitleRewardPopupView
 */
var AcChristmasTitleRewardPopupView = (function (_super) {
    __extends(AcChristmasTitleRewardPopupView, _super);
    function AcChristmasTitleRewardPopupView() {
        return _super.call(this) || this;
    }
    AcChristmasTitleRewardPopupView.prototype.initView = function () {
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;
        var acCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var titleCfg = Config.TitleCfg.getTitleCfgById(acCfg.skin);
        var bg = BaseLoadBitmap.create("acchristmasview_rewardmidbg_" + this.code);
        bg.width = 544;
        bg.height = 204;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 30);
        this.addChildToContainer(bg);
        // let clip = ComponentManager.getCustomMovieClip("headcircle_effect", 10, 100)
        // let clipBM = BaseBitmap.create("headcircle_effect1");
        // clip.setPosition(bg.x + bg.width / 2 - clipBM.width / 2 - 5, bg.y + bg.height / 2 - clipBM.height / 2 - 10);
        // this.addChildToContainer(clip)
        // clip.playWithTime(-1);
        var headCntainer = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(), titleCfg.id);
        headCntainer.setPosition(bg.x + bg.width / 2 - headCntainer.width / 2, bg.y + bg.height / 2 - headCntainer.height / 2 - 10);
        this.addChildToContainer(headCntainer);
        var topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
        topbg.width = 544;
        topbg.height = 36;
        topbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topbg.width / 2, 0);
        this.addChildToContainer(topbg);
        var topDesc = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasBigRewardPopupViewTopDesc_" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
        this.addChildToContainer(topDesc);
        // let skinnamebg = BaseBitmap.create("skin_detail_namebg");
        // skinnamebg.setPosition(bg.x, bg.y + 20);
        // this.addChildToContainer(skinnamebg);
        // let skinNameTxt = ComponentManager.getTextField(titleCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        // skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
        // this.addChildToContainer(skinNameTxt);
        // let servantNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
        // servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
        // this.addChildToContainer(servantNameTxt);
        var buttomBg = BaseBitmap.create("public_9_probiginnerbg");
        buttomBg.width = 530;
        buttomBg.height = 210;
        buttomBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
        this.addChildToContainer(buttomBg);
        var buttomBg2 = BaseBitmap.create("public_9_bg14");
        buttomBg2.width = 526;
        buttomBg2.height = 206;
        buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
        this.addChildToContainer(buttomBg2);
        var titleTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("headEffect" + titleCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        titleTipTxt.width = 480;
        titleTipTxt.lineSpacing = 3;
        titleTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - titleTipTxt.width / 2, buttomBg2.y + 20);
        this.addChildToContainer(titleTipTxt);
        var infoBg = BaseBitmap.create("public_9_managebg");
        infoBg.width = 510;
        infoBg.height = 74;
        infoBg.setPosition(buttomBg2.x + buttomBg2.width / 2 - infoBg.width / 2, titleTipTxt.y + titleTipTxt.height + 13);
        this.addChildToContainer(infoBg);
        for (var index = 0; index < 4; index++) {
            var desc = ComponentManager.getTextField(LanguageManager.getlocal("acTailAttrAdd" + String(index + 1), [String(titleCfg.effect1)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            var posX = index % 2 == 0 ? infoBg.x + 15 : infoBg.x + 280;
            var posY = index > 1 ? infoBg.y + 41 : infoBg.y + 13;
            desc.setPosition(posX, posY);
            this.addChildToContainer(desc);
        }
        var buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasBigRewardPopupViewButtomDesc_" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 15);
        this.addChildToContainer(buttomTipTxt);
    };
    AcChristmasTitleRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcChristmasTitleRewardPopupView.prototype.getTitleStr = function () {
        return "acChristmasBigRewardPopupViewTitle";
    };
    AcChristmasTitleRewardPopupView.prototype.dispose = function () {
        this.aid = null;
        this.code = null;
        _super.prototype.dispose.call(this);
    };
    return AcChristmasTitleRewardPopupView;
}(PopupView));
__reflect(AcChristmasTitleRewardPopupView.prototype, "AcChristmasTitleRewardPopupView");
//# sourceMappingURL=AcChristmasTitleRewardPopupView.js.map