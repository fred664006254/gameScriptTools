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
  * 诸葛亮传活动充值奖励
  * @author 张朝阳
  * date 2019/5/16
  * @class AcLiangBiographyScrollPopupView
  */
var AcLiangBiographyScrollPopupView = (function (_super) {
    __extends(AcLiangBiographyScrollPopupView, _super);
    function AcLiangBiographyScrollPopupView() {
        return _super.call(this) || this;
    }
    AcLiangBiographyScrollPopupView.prototype.initView = function () {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var id = this.param.data.id;
        var volumeContaner = new BaseDisplayObjectContainer();
        volumeContaner.width = 553;
        volumeContaner.height = 77 + 682 + 41;
        this.addChildToContainer(volumeContaner);
        var titleBg = BaseLoadBitmap.create("acliangbiographyview_common_volumetop");
        titleBg.width = 553;
        titleBg.height = 77;
        volumeContaner.addChild(titleBg);
        if (Number(code) <= 2) {
            var titleBM_1 = BaseLoadBitmap.create("acliangbiographyview_title" + id + "-" + code, null, {
                callback: function () {
                    titleBM_1.setPosition(titleBg.x + titleBg.width / 2 - titleBM_1.width / 2, titleBg.y + titleBg.height / 2 - titleBM_1.height / 2);
                }, callbackThisObj: this, callbackParams: null
            });
            volumeContaner.addChild(titleBM_1);
        }
        else {
            var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acLiangBiographyScrollPopupViewTitle" + id + "-" + code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
            titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
            volumeContaner.addChild(titleTF);
        }
        var maskRect = new egret.Rectangle(0, -2, 553, 686);
        var midContainer = new BaseDisplayObjectContainer();
        midContainer.width = 553;
        midContainer.height = 682;
        midContainer.setPosition(titleBg.x + titleBg.width / 2 - midContainer.width / 2, titleBg.y + titleBg.height);
        volumeContaner.addChild(midContainer);
        midContainer.mask = maskRect;
        var midBg = BaseLoadBitmap.create("acliangbiographyview_common_volumemid");
        midBg.width = 553;
        midBg.height = 682;
        midContainer.addChild(midBg);
        var descBM = BaseLoadBitmap.create("acliangbiographyview_scrollbg" + id + "-" + code);
        descBM.width = 404;
        descBM.height = 180;
        descBM.setPosition(midBg.x + midBg.width / 2 - descBM.width / 2, midBg.y + 5);
        midContainer.addChild(descBM);
        // let lookBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acLiangBiographyScrollPopupViewlookBtn-" + code, () => {
        // 	ViewController.getInstance().openView(ViewConst.POPUP.ACLIANGBIOGRAPHYPROCESSPOPUPVIEW, { aid: aid, code: code, id: id });
        // }, this);
        // lookBtn.setPosition(descBM.x + descBM.width - lookBtn.width - 10, descBM.y + descBM.height - lookBtn.height - 10);
        // midContainer.addChild(lookBtn);
        var lookBg = BaseBitmap.create("public_9_bg15");
        var lookTF = ComponentManager.getTextField(LanguageManager.getlocal("acLiangBiographyScrollPopupViewlookBtn-" + code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        lookBg.width = lookTF.width + 40;
        lookBg.setPosition(descBM.x + descBM.width - lookBg.width - 5, descBM.y + descBM.height - lookBg.height - 5);
        lookTF.setPosition(lookBg.x + lookBg.width / 2 - lookTF.width / 2, lookBg.y + lookBg.height / 2 - lookTF.height / 2);
        midContainer.addChild(lookBg);
        midContainer.addChild(lookTF);
        lookTF.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACLIANGBIOGRAPHYPROCESSPOPUPVIEW, { aid: aid, code: code, id: id });
        }, this, null);
        var tfContainer = new BaseDisplayObjectContainer();
        var rect = new egret.Rectangle(0, 0, 400, midBg.height - descBM.height - 25);
        var sv = ComponentManager.getScrollView(tfContainer, rect);
        sv.setPosition(descBM.x + descBM.width / 2 - sv.width / 2, descBM.y + descBM.height + 10);
        midContainer.addChild(sv);
        var descTF = ComponentManager.getTextField(LanguageManager.getlocal("acLiangBiographyScrollPopupViewDesc" + id + "-" + code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        descTF.width = 400;
        descTF.setPosition(0, 5);
        descTF.lineSpacing = 3;
        tfContainer.addChild(descTF);
        tfContainer.height = descTF.height + 10;
        var buttomBg = BaseLoadBitmap.create("acliangbiographyview_common_volumebuttom");
        buttomBg.width = 553;
        buttomBg.height = 41;
        buttomBg.setPosition(midContainer.x + midContainer.width / 2 - buttomBg.width / 2, midContainer.y + midContainer.height);
        volumeContaner.addChild(buttomBg);
        volumeContaner.setPosition(GameConfig.stageWidth / 2 - volumeContaner.width / 2, GameConfig.stageHeigth / 2 - volumeContaner.height / 2);
        this.closeBtn.setPosition(volumeContaner.x + volumeContaner.width - 40, volumeContaner.y - 10);
        //播放动画了
        midContainer.mask.height = 0;
        midContainer.mask = midContainer.mask;
        buttomBg.y = midContainer.y;
        egret.Tween.get(midContainer.mask, { loop: false, onChange: function () {
                if (midContainer) {
                    midContainer.mask = midContainer.mask;
                }
            }, onChangeObj: this }).to({ height: 686 }, 500).call(function () {
            if (midContainer) {
                midContainer.mask = midContainer.mask;
            }
            egret.Tween.removeTweens(midContainer.mask);
        }, this);
        var offestY = midContainer.y + midContainer.height;
        egret.Tween.get(buttomBg).to({ y: offestY }, 500).call(function () {
            egret.Tween.removeTweens(buttomBg);
        }, this);
    };
    AcLiangBiographyScrollPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    AcLiangBiographyScrollPopupView.prototype.getBgName = function () {
        return null;
    };
    AcLiangBiographyScrollPopupView.prototype.getCloseBtnName = function () {
        return "sharepopupview_closebtn";
    };
    AcLiangBiographyScrollPopupView.prototype.getTitleStr = function () {
        return null;
    };
    AcLiangBiographyScrollPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcLiangBiographyScrollPopupView;
}(PopupView));
__reflect(AcLiangBiographyScrollPopupView.prototype, "AcLiangBiographyScrollPopupView");
//# sourceMappingURL=AcLiangBiographyScrollPopupView.js.map