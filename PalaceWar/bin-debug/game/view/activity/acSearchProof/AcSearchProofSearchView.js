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
 * 宝箱奖励
 * author 张朝阳
 * date 2019/6/26
 * @class AcSearchProofSearchView
 */
var AcSearchProofSearchView = (function (_super) {
    __extends(AcSearchProofSearchView, _super);
    function AcSearchProofSearchView() {
        return _super.call(this) || this;
    }
    AcSearchProofSearchView.prototype.initView = function () {
        var code = this.param.data.code;
        var aid = this.param.data.aid;
        var skin = this.param.data.skin;
        var name = this.param.data.name;
        var desc = this.param.data.desc;
        var sceneContainer = new BaseDisplayObjectContainer();
        sceneContainer.width = 640;
        sceneContainer.height = 960;
        sceneContainer.setPosition(GameConfig.stageWidth / 2 - sceneContainer.width / 2, GameConfig.stageHeigth / 2 - sceneContainer.height / 2);
        this.addChildToContainer(sceneContainer);
        // 550 156
        var scrollbg = BaseLoadBitmap.create("acsearchproofview_common_scrollbg");
        scrollbg.width = 592;
        scrollbg.height = 222;
        scrollbg.setPosition(sceneContainer.width / 2 - scrollbg.width / 2, 29);
        sceneContainer.addChild(scrollbg);
        var descTF = ComponentManager.getTextField(desc, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        descTF.width = 550;
        descTF.height = 156;
        descTF.verticalAlign = egret.VerticalAlign.MIDDLE;
        descTF.setPosition(scrollbg.x + scrollbg.width / 2 - descTF.width / 2, scrollbg.y + scrollbg.height / 2 - descTF.height / 2);
        sceneContainer.addChild(descTF);
        var continueTF = ComponentManager.getTextField(LanguageManager.getlocal("clickContinue"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
        continueTF.setPosition(descTF.x + descTF.width - continueTF.width, descTF.y + descTF.height - continueTF.height);
        sceneContainer.addChild(continueTF);
        var leftscroll = BaseLoadBitmap.create("acsearchproofview_common_scroll");
        leftscroll.width = 25;
        leftscroll.height = 280;
        sceneContainer.addChild(leftscroll);
        var rightscroll = BaseLoadBitmap.create("acsearchproofview_common_scroll");
        rightscroll.width = 25;
        rightscroll.height = 280;
        rightscroll.setPosition(sceneContainer.width - rightscroll.width, 0);
        sceneContainer.addChild(rightscroll);
        var paper = BaseLoadBitmap.create("acsearchproofview_common_searchbg");
        paper.width = 560;
        paper.height = 707;
        paper.setPosition(sceneContainer.width / 2 - paper.width / 2, scrollbg.y + scrollbg.height + 2);
        sceneContainer.addChild(paper);
        var skinImgScale = 0.95;
        var skinImg = BaseLoadBitmap.create(skin);
        skinImg.width = 405;
        skinImg.height = 467;
        skinImg.setScale(skinImgScale);
        skinImg.setPosition(sceneContainer.width / 2 - skinImg.width / 2 * skinImgScale, paper.y + 185);
        sceneContainer.addChild(skinImg);
        var nameBg = BaseBitmap.create("acsearchproofview_common_namebg");
        nameBg.setPosition(paper.x + 55, paper.y + 203);
        sceneContainer.addChild(nameBg);
        var nameTF = ComponentManager.getTextField(name, TextFieldConst.FONTSIZE_TITLE_BIG, TextFieldConst.COLOR_WHITE);
        if (PlatformManager.checkIsEnLang()) {
            nameTF.size = TextFieldConst.FONTSIZE_ACTIVITY_COMMON;
        }
        nameTF.setPosition(nameBg.x + nameBg.width / 2 - nameTF.width / 2, nameBg.y + nameBg.height / 2 - nameTF.height / 2);
        sceneContainer.addChild(nameTF);
        var stamp = BaseBitmap.create("acsearchproofview_common_stamp");
        stamp.setPosition(paper.x + paper.width - stamp.width - 40, paper.y + paper.height - stamp.height - 100);
        sceneContainer.addChild(stamp);
        var search = BaseLoadBitmap.create("acsearchproofview_common_searchtitlebg");
        search.width = 394;
        search.height = 101;
        search.setPosition(sceneContainer.width / 2 - search.width / 2, paper.y + 85);
        sceneContainer.addChild(search);
        this._maskBmp.addTouchTap(this.closeView, this);
    };
    AcSearchProofSearchView.prototype.getBgName = function () {
        return null;
    };
    AcSearchProofSearchView.prototype.getTitleBgName = function () {
        return null;
    };
    AcSearchProofSearchView.prototype.getTitleStr = function () {
        return null;
    };
    AcSearchProofSearchView.prototype.closeView = function () {
        this.hide();
    };
    AcSearchProofSearchView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["acsearchproofview_common_namebg", "acsearchproofview_common_stamp"
        ]);
    };
    AcSearchProofSearchView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcSearchProofSearchView;
}(BaseView));
__reflect(AcSearchProofSearchView.prototype, "AcSearchProofSearchView");
//# sourceMappingURL=AcSearchProofSearchView.js.map