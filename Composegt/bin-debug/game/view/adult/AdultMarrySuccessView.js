/**
 * 结婚成功
 * author dukunayng
 * date 2017/11/1
 * @class AdultMarrySuccessView
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
var AdultMarrySuccessView = (function (_super) {
    __extends(AdultMarrySuccessView, _super);
    function AdultMarrySuccessView() {
        var _this = _super.call(this) || this;
        // id 孩子ID
        _this._childId = null;
        return _this;
    }
    AdultMarrySuccessView.prototype.getResourceList = function () {
        var rewardPic = _super.prototype.getResourceList.call(this);
        if (this.param.data) {
            this._childId = this.param.data;
        }
        return rewardPic.concat([
            "childview_boyicon", "childview_girlicon", "adult_bg", "adult_boy", "adult_girl",
            "wifeget_bg", "servant_huawenleft", "shareBtn", "shareRewardPop", "adultview"
        ]);
    };
    AdultMarrySuccessView.prototype.getTitleBgName = function () {
        return null;
    };
    AdultMarrySuccessView.prototype.getTitleStr = function () {
        return null;
    };
    AdultMarrySuccessView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    AdultMarrySuccessView.prototype.initView = function () {
        this._confirmCallback = this.param.data.confirmCallback;
        this.addTouchTap(this.touchTap, this, null);
        SoundManager.playEffect(SoundConst.EFFECT_UPD);
        this._childId = this.param.data.childId;
        var id = this._childId;
        var adultInfoVo = Api.adultVoApi.getAdultMarryInfoVoById(id);
        var bg = App.CommonUtil.getContainerByLeftTopRes("wifeget_bg");
        bg.setScale(GameConfig.stageWidth / bg.width);
        this.addChildToContainer(bg);
        // lizi.x = 100;
        bg.y = 260;
        var myIcon = "adult_boy";
        var otherIcon = "adult_girl";
        var childSexPic1 = "childview_boyicon";
        var childSexPic2 = "childview_girlicon";
        if (adultInfoVo.sex == 2) {
            myIcon = "adult_girl";
            otherIcon = "adult_boy";
            childSexPic1 = "childview_girlicon";
            childSexPic2 = "childview_boyicon";
        }
        //获得图片
        var getPic = BaseBitmap.create("adult_lovebg");
        getPic.setPosition(this.viewBg.width / 2 - getPic.width / 2, 100);
        this.addChild(getPic);
        //孩子图片
        var childPic1 = BaseBitmap.create(myIcon);
        childPic1.setPosition(40, getPic.y + getPic.height + 10);
        this.addChild(childPic1);
        //对面孩子图片
        var childPic2 = BaseBitmap.create(otherIcon);
        childPic2.setPosition(260, getPic.y + getPic.height + 10);
        this.addChild(childPic2);
        var lookBg = BaseBitmap.create("public_9_wordbg");
        // lookBg.scaleX = 2;
        lookBg.height = 250;
        lookBg.setPosition(GameConfig.stageWidth / 2 - lookBg.width / 2, childPic1.y + childPic1.height);
        this.addChild(lookBg);
        //孩子名字
        var nameTf1 = ComponentManager.getTextField(adultInfoVo.name, TextFieldConst.FONTSIZE_TITLE_SMALL);
        // nameTf1.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        nameTf1.setPosition(100, lookBg.y + 40);
        this.addChild(nameTf1);
        var childIcon1 = BaseBitmap.create(childSexPic1);
        childIcon1.x = nameTf1.x + nameTf1.width + 10;
        childIcon1.y = nameTf1.y;
        childIcon1.setScale(0.8);
        this.addChild(childIcon1);
        var childLine1 = BaseBitmap.create("servant_huawenleft");
        childLine1.x = nameTf1.x;
        childLine1.y = nameTf1.y + nameTf1.height + 10;
        childLine1.setScale(0.8);
        this.addChild(childLine1);
        //lookTip1查看孩子文字
        var f1Str = LanguageManager.getlocal("adultMarryFather") + Api.playerVoApi.getPlayerName();
        var matherTF = ComponentManager.getTextField(f1Str, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        matherTF.setPosition(nameTf1.x, nameTf1.y + nameTf1.height + 40);
        matherTF.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        this.addChild(matherTF);
        var att1Str = LanguageManager.getlocal("servant_infoAttr") + "     " + adultInfoVo.total;
        var att1TF = ComponentManager.getTextField(att1Str, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        att1TF.setPosition(nameTf1.x, matherTF.y + matherTF.height + 40);
        att1TF.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        this.addChild(att1TF);
        //孩子名字
        var nameTf2 = ComponentManager.getTextField(adultInfoVo.fname, TextFieldConst.FONTSIZE_TITLE_SMALL);
        // nameTf2.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        nameTf2.setPosition(400, lookBg.y + 40);
        this.addChild(nameTf2);
        var childLine2 = BaseBitmap.create("servant_huawenleft");
        childLine2.x = nameTf2.x;
        childLine2.y = nameTf2.y + nameTf2.height + 10;
        childLine2.setScale(0.8);
        this.addChild(childLine2);
        var childIcon2 = BaseBitmap.create(childSexPic2);
        childIcon2.setScale(0.8);
        childIcon2.x = nameTf2.x + nameTf2.width + 10;
        childIcon2.y = nameTf2.y;
        this.addChild(childIcon2);
        var f2Str = LanguageManager.getlocal("adultMarryFather") + adultInfoVo.funame;
        var matherTF2 = ComponentManager.getTextField(f2Str, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        matherTF2.setPosition(nameTf2.x, nameTf2.y + nameTf2.height + 40);
        matherTF2.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        this.addChild(matherTF2);
        var att2Str = LanguageManager.getlocal("servant_infoAttr") + "     " + adultInfoVo.ftotal;
        var att2TF = ComponentManager.getTextField(att2Str, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        att2TF.setPosition(nameTf2.x, matherTF2.y + matherTF2.height + 40);
        att2TF.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        this.addChild(att2TF);
        var dis = adultInfoVo.ftotal;
        var pos = egret.Point.create(320, GameConfig.stageHeigth / 2);
        // App.CommonUtil.playRewardFlyAction([{tipMessage:LanguageManager.getlocal("rankpower")+"+"+dis}],pos);
        var powerFly = new PowerFly();
        powerFly.init(dis);
        LayerManager.msgLayer.addChild(powerFly);
        if (adultInfoVo.sex == 2) {
            childPic1.anchorOffsetX = childPic1.width / 2;
            childPic2.anchorOffsetX = childPic2.width / 2;
            childPic1.x = childPic1.x + childPic1.width / 2;
            childPic2.x = childPic2.x + childPic2.width / 2;
            childPic1.skewY = 180;
            childPic2.skewY = 180;
        }
        App.ShareGuideUtil.addShareNode(this.container, App.ShareGuideUtil.TYPE_CHILDMARRY);
    };
    AdultMarrySuccessView.prototype.sureBtnClick = function () {
        ViewController.getInstance().hideAllView();
        // ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
        this._childId = this.param.data;
        ViewController.getInstance().openView(ViewConst.COMMON.CHILDVIEW, { childId: this._childId });
    };
    AdultMarrySuccessView.prototype.isShowOpenAni = function () {
        return false;
    };
    AdultMarrySuccessView.prototype.noBtnClick = function () {
        this.hide();
        // ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
    };
    AdultMarrySuccessView.prototype.touchTap = function () {
        this.hide();
    };
    AdultMarrySuccessView.prototype.hide = function () {
        _super.prototype.hide.call(this);
        if (this.param.data.confirmCallback) {
            this.param.data.confirmCallback.apply(this.param.data.handler, []);
        }
    };
    AdultMarrySuccessView.prototype.dispose = function () {
        this._childId = null;
        _super.prototype.dispose.call(this);
    };
    return AdultMarrySuccessView;
}(BaseView));
__reflect(AdultMarrySuccessView.prototype, "AdultMarrySuccessView");
