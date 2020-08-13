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
var AcStargazerSingleStoryView = (function (_super) {
    __extends(AcStargazerSingleStoryView, _super);
    function AcStargazerSingleStoryView() {
        var _this = _super.call(this) || this;
        _this._droWifeIcon = undefined;
        _this._skinImg = undefined;
        _this._aid = null;
        _this._code = null;
        return _this;
    }
    //根据资源名字得到完整资源名字
    AcStargazerSingleStoryView.prototype.decode = function () {
        if (this._code == "1" || this._code == "5") {
            return "1";
        }
        else if (this._code == "2" || this._code == "6") {
            return "2";
        }
        else if (this._code == "3" || this._code == "7") {
            return "3";
        }
        else if (this._code == "4" || this._code == "8") {
            return "4";
        }
    };
    //根据资源名字得到完整资源名字
    AcStargazerSingleStoryView.prototype.getDefaultRes = function (resName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (ResourceManager.hasRes(resName + "-" + this.decode())) {
            return resName + "-" + this.decode();
        }
        else {
            return resName + "-" + defaultCode;
        }
    };
    AcStargazerSingleStoryView.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.decode())) {
            return cnName + "-" + this.decode();
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    AcStargazerSingleStoryView.prototype.initView = function () {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        this._aid = aid;
        this._code = code;
        var acvo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        var cfg = acvo.config;
        var topbg = BaseBitmap.create(this.getDefaultRes("acstargazersingle_firstbg"));
        topbg.x = GameConfig.stageWidth / 2 - topbg.width / 2;
        topbg.y = GameConfig.stageHeigth / 2 - topbg.height / 2;
        this.addChildToContainer(topbg);
        var searchtxt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        searchtxt1.text = LanguageManager.getlocal(this.getDefaultCn("acStargazerSingle_storybgtxt1"));
        searchtxt1.multiline = true;
        searchtxt1.lineSpacing = 3;
        searchtxt1.width = 430; //topbg.width - 140;
        searchtxt1.x = topbg.x + topbg.width / 2 - searchtxt1.width / 2;
        searchtxt1.y = topbg.y + 640;
        this.addChildToContainer(searchtxt1);
        var nametxt1 = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acStargazer_storyName1")), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nametxt1.x = topbg.x + 141 - nametxt1.width / 2;
        nametxt1.y = topbg.y + 93 - nametxt1.height / 2;
        this.addChildToContainer(nametxt1);
        // let nametxt2 = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acStargazer_storyName2")) , TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        // nametxt2.x = topbg.x + 127 - nametxt2.width/2;
        // nametxt2.y = topbg.y + 431 - nametxt2.height/2;
        // this.addChildToContainer(nametxt2);
        // let nametxt3 = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acStargazer_storyName3")) , TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        // nametxt3.x = topbg.x + 471 - nametxt3.width/2;
        // nametxt3.y = topbg.y + 465 - nametxt3.height/2;
        // this.addChildToContainer(nametxt3);
        // let nametxt4 = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acStargazer_storyName4")) , TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        // nametxt4.x = topbg.x + 451 - nametxt4.width/2;
        // nametxt4.y = topbg.y + 218 - nametxt4.height/2;
        // this.addChildToContainer(nametxt4);
        this.addTouchTap(this.hide, this);
    };
    AcStargazerSingleStoryView.prototype.getBgName = function () {
        return null;
    };
    AcStargazerSingleStoryView.prototype.getResourceList = function () {
        return [];
    };
    AcStargazerSingleStoryView.prototype.getTitleStr = function () {
        return null;
    };
    AcStargazerSingleStoryView.prototype.getButtomLineBg = function () {
        return null;
    };
    AcStargazerSingleStoryView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcStargazerSingleStoryView.prototype.getTitleBgName = function () {
        return null;
    };
    AcStargazerSingleStoryView.prototype.dispose = function () {
        if (this._droWifeIcon) {
            this._droWifeIcon.dispose();
            this._droWifeIcon = null;
        }
        this._skinImg = null;
        this._code = null;
        this._aid = null;
        _super.prototype.dispose.call(this);
    };
    return AcStargazerSingleStoryView;
}(AcCommonView));
__reflect(AcStargazerSingleStoryView.prototype, "AcStargazerSingleStoryView");
