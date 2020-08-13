/**
 * 金榜题名
 * author dukunayng
 * date 2017/10/28
 * @class ChildUpdView
 */
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
var ChildUpdView = (function (_super) {
    __extends(ChildUpdView, _super);
    function ChildUpdView() {
        var _this = _super.call(this) || this;
        // id 孩子ID
        _this._childId = null;
        return _this;
    }
    ChildUpdView.prototype.getResourceList = function () {
        var rewardPic = _super.prototype.getResourceList.call(this);
        if (this.param.data) {
            this._childId = this.param.data;
        }
        return rewardPic.concat(["adult_updtitle", "childview_getgirl", "wifeview_namebg"
        ]);
    };
    ChildUpdView.prototype.getTitleBgName = function () {
        return null;
    };
    ChildUpdView.prototype.getTitleStr = function () {
        return null;
    };
    ChildUpdView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    ChildUpdView.prototype.initView = function () {
        // if(Api.adultVoApi.getAdultMarryNum() == 0 && Api.adultVoApi.getAdultNum() == 1){
        // 	Api.rookieVoApi.curGuideKey = "adult";
        // 	Api.rookieVoApi.insertWaitingGuide({"idx":"adult_1"},true);
        // }
        //分阶段引导
        this.addTouchTap(this.touchTap, this, null);
        this.viewBg.touchEnabled = true;
        SoundManager.playEffect(SoundConst.EFFECT_UPD);
        var id = this._childId;
        var adultInfoVo = Api.adultVoApi.getAdultInfoVoById(id);
        // App.LogUtil.log("sex:" + childrenInfoVo.sex)
        var tipBB = BaseBitmap.create("public_rotatelight");
        tipBB.scaleX = 2;
        tipBB.scaleY = 2;
        tipBB.anchorOffsetX = tipBB.width / 2;
        tipBB.anchorOffsetY = tipBB.height / 2;
        tipBB.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
        // App.CommonUtil.getCenterPos
        this.addChild(tipBB);
        egret.Tween.get(tipBB, { loop: true })
            .to({ rotation: 360 }, 3000);
        var sexPicStr = Api.adultVoApi.getAdultPic(id);
        //获得图片
        var getPic = BaseBitmap.create("adult_updtitle");
        getPic.setPosition(170, tipBB.y - 400);
        this.addChild(getPic);
        //孩子图片
        var childPic = BaseLoadBitmap.create(sexPicStr);
        childPic.width = 332;
        childPic.height = 375;
        childPic.setPosition(GameConfig.stageWidth / 2 - childPic.width / 2, getPic.y + getPic.height + 30);
        this.addChild(childPic);
        //名字竖版改成横版
        if (PlatformManager.checkIsTextHorizontal()) {
            var qualityBg = BaseBitmap.create("wifeview_namebg");
            qualityBg.x = childPic.x + childPic.width / 2 - qualityBg.width / 2;
            qualityBg.y = childPic.y + childPic.height - qualityBg.height / 2 - 40;
            this.addChild(qualityBg);
            var qualityBB = BaseBitmap.create("adult_q" + adultInfoVo.aquality);
            qualityBB.x = childPic.x + childPic.width / 2 - qualityBB.width / 2;
            qualityBB.y = childPic.y + childPic.height - qualityBB.height / 2 - 40;
            this.addChild(qualityBB);
        }
        else {
            //孩子资质背景
            var qualityBg = BaseBitmap.create("public_get_namebg");
            qualityBg.x = childPic.x - qualityBg.width - 20;
            qualityBg.y = childPic.y;
            this.addChild(qualityBg);
            var qualityBB = BaseBitmap.create("adult_q" + adultInfoVo.aquality);
            qualityBB.x = qualityBg.x + qualityBg.width / 2 - qualityBB.width / 2;
            qualityBB.y = qualityBg.y + 45;
            this.addChild(qualityBB);
        }
        // //资质图片
        // let qualityPicStr = "childview_q" + childrenInfoVo.quality;
        // let qualityPic:BaseBitmap = BaseBitmap.create(qualityPicStr);
        // qualityPic.setPosition(GameConfig.stageWidth - qualityPic.width-25, tipBB.y + tipBB.height - 65);
        // this.addChild(qualityPic);
        var lookBg = BaseBitmap.create("public_9_wordbg");
        // lookBg.scaleX = 2;
        lookBg.height = 300;
        lookBg.setPosition(GameConfig.stageWidth / 2 - lookBg.width / 2, childPic.y + childPic.height);
        this.addChild(lookBg);
        //孩子名字
        var nameTf = ComponentManager.getTextField(adultInfoVo.name, TextFieldConst.FONTSIZE_TITLE_SMALL);
        nameTf.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        nameTf.setPosition(265, lookBg.y + 40);
        this.addChild(nameTf);
        //lookTip1查看孩子文字
        var wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(adultInfoVo.motherId);
        var wStr = LanguageManager.getlocal("childMother", [wifeInfoVo.name]);
        var matherTF = ComponentManager.getTextField(wStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        matherTF.setPosition(nameTf.x, nameTf.y + nameTf.height + 10);
        this.addChild(matherTF);
        var att1Str = LanguageManager.getlocal("servant_infoAttr") + adultInfoVo.attrVo.attTotal;
        var att1TF = ComponentManager.getTextField(att1Str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        att1TF.setPosition(nameTf.x, matherTF.y + matherTF.height + 10);
        this.addChild(att1TF);
        var att2Str = LanguageManager.getlocal("servantInfo_speciality1") + "：" + adultInfoVo.attrVo.forceTotal;
        var att2TF = ComponentManager.getTextField(att2Str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        att2TF.setPosition(nameTf.x, att1TF.y + att1TF.height + 10);
        this.addChild(att2TF);
        var att3Str = LanguageManager.getlocal("servantInfo_speciality2") + "：" + adultInfoVo.attrVo.brainsTotal;
        var att3TF = ComponentManager.getTextField(att3Str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        att3TF.setPosition(nameTf.x, att2TF.y + att2TF.height + 10);
        this.addChild(att3TF);
        var att4Str = LanguageManager.getlocal("servantInfo_speciality3") + "：" + adultInfoVo.attrVo.politicsTotal;
        var att4TF = ComponentManager.getTextField(att4Str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        att4TF.setPosition(nameTf.x, att3TF.y + att3TF.height + 10);
        this.addChild(att4TF);
        var att5Str = LanguageManager.getlocal("servantInfo_speciality4") + "：" + adultInfoVo.attrVo.charmTotal;
        var att5TF = ComponentManager.getTextField(att5Str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        att5TF.setPosition(nameTf.x, att4TF.y + att4TF.height + 10);
        this.addChild(att5TF);
    };
    ChildUpdView.prototype.sureBtnClick = function () {
        ViewController.getInstance().hideAllView();
        // ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
        this._childId = this.param.data;
        ViewController.getInstance().openView(ViewConst.COMMON.CHILDVIEW, { childId: this._childId });
    };
    ChildUpdView.prototype.noBtnClick = function () {
        this.hide();
        // ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
    };
    ChildUpdView.prototype.touchTap = function () {
        this.hide();
    };
    ChildUpdView.prototype.dispose = function () {
        this._childId = null;
        _super.prototype.dispose.call(this);
    };
    return ChildUpdView;
}(BaseView));
__reflect(ChildUpdView.prototype, "ChildUpdView");
//# sourceMappingURL=ChildUpdView.js.map