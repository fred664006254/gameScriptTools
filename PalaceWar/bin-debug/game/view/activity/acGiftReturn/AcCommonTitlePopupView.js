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
 * 活动通用头像框板子
 * author 张朝阳
 * date 2019/7/4
 * @class AcCommonTitlePopupView
 */
var AcCommonTitlePopupView = (function (_super) {
    __extends(AcCommonTitlePopupView, _super);
    function AcCommonTitlePopupView() {
        return _super.call(this) || this;
    }
    AcCommonTitlePopupView.prototype.initView = function () {
        var titleId = this.param.data.titleId;
        var topMsg = this.param.data.topMsg;
        var titleCfg = Config.TitleCfg.getTitleCfgById(titleId);
        var bg = BaseLoadBitmap.create("acgiftreturnview_common_titlebg");
        bg.width = 544;
        bg.height = 204;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 30);
        this.addChildToContainer(bg);
        var headCntainer = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(), titleCfg.id);
        headCntainer.setPosition(bg.x + bg.width / 2 - headCntainer.width / 2, bg.y + bg.height / 2 - headCntainer.height / 2 - 10);
        this.addChildToContainer(headCntainer);
        var topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
        topbg.width = 544;
        topbg.height = 36;
        topbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topbg.width / 2, 0);
        this.addChildToContainer(topbg);
        var topDesc = ComponentManager.getTextField(topMsg, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
        this.addChildToContainer(topDesc);
        var titleNameTF = ComponentManager.getTextField(titleCfg.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleNameTF.setPosition(bg.x + bg.width / 2 - titleNameTF.width / 2, bg.y + 172 - titleNameTF.height / 2);
        this.addChildToContainer(titleNameTF);
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
        var buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCommonTitlePopupViewButtomDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 15);
        this.addChildToContainer(buttomTipTxt);
    };
    AcCommonTitlePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcCommonTitlePopupView.prototype.getTitleStr = function () {
        return "acCommonTitlePopupViewTitle";
    };
    AcCommonTitlePopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCommonTitlePopupView;
}(PopupView));
__reflect(AcCommonTitlePopupView.prototype, "AcCommonTitlePopupView");
//# sourceMappingURL=AcCommonTitlePopupView.js.map