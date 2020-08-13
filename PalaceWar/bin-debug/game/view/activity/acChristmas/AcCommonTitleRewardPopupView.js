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
 * 	通用头衔预览
 * @author yangchengguo
 * date 2019.8.1
 * @class AcCommonTitleRewardPopupView
 */
var AcCommonTitleRewardPopupView = (function (_super) {
    __extends(AcCommonTitleRewardPopupView, _super);
    function AcCommonTitleRewardPopupView() {
        var _this = _super.call(this) || this;
        _this._TITLE_TYPE_COMMON = 1;
        _this._TITLE_TYPE_JINTONGYUNV = 2;
        _this._TITLE_TYPE_JIULANGZHINV = 3;
        _this._titleIds = [];
        return _this;
    }
    AcCommonTitleRewardPopupView.prototype.initView = function () {
        var titleIds = this.param.data.titleIds;
        var bgType = this.param.data.bgType;
        var topMsg = this.param.data.topMsg;
        this._titleIds = titleIds;
        var bgStr = "accommontitlereward_bg" + bgType; //acchristmasview_rewardmidbg_4
        var bg = BaseLoadBitmap.create(bgStr);
        bg.width = 544;
        bg.height = 400;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        this.addChildToContainer(bg);
        var rect = new egret.Rectangle(0, 0, 544, 364);
        var maskContaner = new BaseDisplayObjectContainer();
        maskContaner.width = 544;
        maskContaner.height = 364;
        maskContaner.mask = rect;
        maskContaner.setPosition(bg.x + bg.width / 2 - maskContaner.width / 2, bg.y + 30);
        this.addChildToContainer(maskContaner);
        var picId = Api.playerVoApi.getPlayePicId();
        //一个人
        if (titleIds.length == 1 || (PlatformManager.checkIsKRSp() && titleIds.length == 2)) {
            var body = this.getBodyImgById(titleIds[0]);
            if (PlatformManager.checkIsKRSp() && ResourceManager.hasRes(titleIds[0] + "_1")) {
                body = this.getBodyImgById(titleIds[0] + "_1");
            }
            var skinImg = BaseLoadBitmap.create(body);
            skinImg.width = 382;
            skinImg.height = 618;
            skinImg.anchorOffsetX = skinImg.width / 2;
            skinImg.x = maskContaner.width / 2;
            skinImg.y = maskContaner.height / 2 - 93;
            maskContaner.addChild(skinImg);
            if (Api.playerVoApi.getUserSex(picId) == 2) {
                //女的
                var head = Api.playerVoApi.getUserHeadContainer();
                head.setPosition(maskContaner.width / 2 - head.width / 2 - 4, 0);
                maskContaner.addChild(head);
            }
            else {
                //男的
                var head = Api.playerVoApi.getUserHeadContainer();
                head.setPosition(maskContaner.width / 2 - head.width / 2 - 4, 0);
                maskContaner.addChild(head);
            }
        }
        else {
            //两人
            //女
            var body2 = this.getBodyImgById(titleIds[1] + "_2");
            var skinImg2 = BaseLoadBitmap.create(body2);
            skinImg2.width = 382;
            skinImg2.height = 618;
            skinImg2.anchorOffsetX = skinImg2.width / 2;
            skinImg2.x = maskContaner.width / 4 * 3 - 30;
            skinImg2.y = maskContaner.height / 2 - 40;
            maskContaner.addChild(skinImg2);
            //男
            var body1 = this.getBodyImgById(titleIds[0] + "_1");
            var skinImg1 = BaseLoadBitmap.create(body1);
            skinImg1.width = 382;
            skinImg1.height = 618;
            skinImg1.anchorOffsetX = skinImg1.width / 2;
            skinImg1.x = maskContaner.width / 4 + 30;
            skinImg1.y = maskContaner.height / 2 - 80;
            maskContaner.addChild(skinImg1);
            if (Api.playerVoApi.getUserSex(picId) == 2) {
                //女的
                var head1 = Api.playerVoApi.getUserHeadContainer();
                head1.setPosition(maskContaner.width / 4 * 3 - head1.width / 2 - 35, 50);
                maskContaner.addChild(head1);
                var head2 = Api.playerVoApi.getUserHeadContainer(1);
                head2.setPosition(maskContaner.width / 4 - head2.width / 2 + 23, 9);
                maskContaner.addChild(head2);
            }
            else {
                //男的
                var head1 = Api.playerVoApi.getUserHeadContainer();
                head1.setPosition(maskContaner.width / 4 - head1.width / 2 + 23, 9);
                maskContaner.addChild(head1);
                var head2 = Api.playerVoApi.getUserHeadContainer(6);
                head2.setPosition(maskContaner.width / 4 * 3 - head2.width / 2 - 35, 50);
                maskContaner.addChild(head2);
            }
        }
        var topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
        topbg.width = 544;
        topbg.height = 36;
        topbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topbg.width / 2, 0);
        this.addChildToContainer(topbg);
        var topDesc = ComponentManager.getTextField(topMsg, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
        this.addChildToContainer(topDesc);
        var buttomBg = BaseBitmap.create("public_9_probiginnerbg");
        buttomBg.width = 530;
        buttomBg.height = 246;
        buttomBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
        this.addChildToContainer(buttomBg);
        var buttomBg2 = BaseBitmap.create("public_9_bg14");
        buttomBg2.width = 525;
        buttomBg2.height = 234;
        buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
        this.addChildToContainer(buttomBg2);
        var titleTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("headEffect" + titleIds[0]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        titleTipTxt.width = 480;
        titleTipTxt.lineSpacing = 3;
        titleTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - titleTipTxt.width / 2, buttomBg2.y + 20);
        this.addChildToContainer(titleTipTxt);
        var infoBg = BaseBitmap.create("public_9_managebg");
        infoBg.width = 510;
        infoBg.height = 104;
        infoBg.setPosition(buttomBg2.x + buttomBg2.width / 2 - infoBg.width / 2, titleTipTxt.y + titleTipTxt.height + 13);
        this.addChildToContainer(infoBg);
        var resultStrList = this.dealAttrChangeInfo(titleIds[0]);
        var startY = 13;
        for (var index = 0; index < resultStrList.length; index++) {
            var desc = ComponentManager.getTextField(resultStrList[index], TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            var posX = index % 2 == 0 ? infoBg.x + 15 : infoBg.x + 280;
            var posY = infoBg.y + startY;
            desc.setPosition(posX, posY);
            this.addChildToContainer(desc);
            if (index % 2 > 0) {
                startY = startY + 28;
            }
        }
        var buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCommonWifeSkinRewardPopupViewButtomDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 15);
        this.addChildToContainer(buttomTipTxt);
    };
    AcCommonTitleRewardPopupView.prototype.dealAttrChangeInfo = function (titleId) {
        var titleCfg = Config.TitleCfg.getTitleCfgById(titleId);
        var effect = titleCfg.effect1;
        var resultStr = [];
        if (effect) {
            var effectStr = String(effect);
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd1", [effectStr]));
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd2", [effectStr]));
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd3", [effectStr]));
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd4", [effectStr]));
        }
        return resultStr;
    };
    AcCommonTitleRewardPopupView.prototype.getBodyImgById = function (id) {
        return "user_body_full_" + id;
    };
    AcCommonTitleRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "skin_detail_namebg",
        ]);
    };
    AcCommonTitleRewardPopupView.prototype.getTitleStr = function () {
        return "titleClothPriviewTitle";
    };
    // protected getShowHeight() {
    // 	return 720;
    // }
    AcCommonTitleRewardPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCommonTitleRewardPopupView;
}(PopupView));
__reflect(AcCommonTitleRewardPopupView.prototype, "AcCommonTitleRewardPopupView");
//# sourceMappingURL=AcCommonTitleRewardPopupView.js.map