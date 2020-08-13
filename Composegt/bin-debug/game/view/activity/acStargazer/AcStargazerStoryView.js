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
 * 20190401
 * 奸臣皮肤兑换
 */
var AcStargazerStoryView = (function (_super) {
    __extends(AcStargazerStoryView, _super);
    function AcStargazerStoryView() {
        var _this = _super.call(this) || this;
        _this._droWifeIcon = undefined;
        _this._skinImg = undefined;
        _this._aid = null;
        _this._code = null;
        return _this;
    }
    //根据资源名字得到完整资源名字
    AcStargazerStoryView.prototype.getDefaultRes = function (resName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (ResourceManager.hasRes(resName + "-" + this._code)) {
            return resName + "-" + this._code;
        }
        else {
            return resName + "-" + defaultCode;
        }
    };
    AcStargazerStoryView.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this._code)) {
            return cnName + "-" + this._code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    AcStargazerStoryView.prototype.initView = function () {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        this._aid = aid;
        this._code = code;
        var acvo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        var cfg = acvo.config;
        var topbg = BaseBitmap.create(this.getDefaultRes("acstargazer_firstbg"));
        topbg.x = GameConfig.stageWidth / 2 - topbg.width / 2;
        topbg.y = GameConfig.stageHeigth / 2 - topbg.height / 2;
        this.addChildToContainer(topbg);
        var searchtxt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        searchtxt1.text = LanguageManager.getlocal(this.getDefaultCn("acStargazer_storybgtxt1"));
        searchtxt1.multiline = true;
        searchtxt1.lineSpacing = 3;
        searchtxt1.width = 484; //topbg.width - 140;
        searchtxt1.x = topbg.x + topbg.width / 2 - searchtxt1.width / 2;
        searchtxt1.y = topbg.y + 56;
        this.addChildToContainer(searchtxt1);
        var nametxt1 = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acStargazer_storyName1")), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nametxt1.x = topbg.x + 245 - nametxt1.width / 2;
        nametxt1.y = topbg.y + 648 - nametxt1.height / 2;
        this.addChildToContainer(nametxt1);
        var nametxt2 = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acStargazer_storyName2")), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nametxt2.x = topbg.x + 127 - nametxt2.width / 2;
        nametxt2.y = topbg.y + 431 - nametxt2.height / 2;
        this.addChildToContainer(nametxt2);
        var nametxt3 = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acStargazer_storyName3")), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nametxt3.x = topbg.x + 471 - nametxt3.width / 2;
        nametxt3.y = topbg.y + 465 - nametxt3.height / 2;
        this.addChildToContainer(nametxt3);
        var nametxt4 = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acStargazer_storyName4")), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nametxt4.x = topbg.x + 451 - nametxt4.width / 2;
        nametxt4.y = topbg.y + 218 - nametxt4.height / 2;
        this.addChildToContainer(nametxt4);
        this.addTouchTap(this.hide, this);
    };
    AcStargazerStoryView.prototype.getBgName = function () {
        return null;
    };
    AcStargazerStoryView.prototype.getResourceList = function () {
        return [];
    };
    AcStargazerStoryView.prototype.getTitleStr = function () {
        return null;
    };
    AcStargazerStoryView.prototype.getButtomLineBg = function () {
        return null;
    };
    AcStargazerStoryView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcStargazerStoryView.prototype.getTitleBgName = function () {
        return null;
    };
    AcStargazerStoryView.prototype.dispose = function () {
        if (this._droWifeIcon) {
            this._droWifeIcon.dispose();
            this._droWifeIcon = null;
        }
        this._skinImg = null;
        this._code = null;
        this._aid = null;
        _super.prototype.dispose.call(this);
    };
    return AcStargazerStoryView;
}(AcCommonView));
__reflect(AcStargazerStoryView.prototype, "AcStargazerStoryView");
