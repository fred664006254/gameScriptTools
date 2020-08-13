/**
 * 得到孩子界面
 * author dukunayng
 * date 2017/10/10
 * @class WifeGetChildView
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
var WifeGetChildView = (function (_super) {
    __extends(WifeGetChildView, _super);
    function WifeGetChildView() {
        var _this = _super.call(this) || this;
        // id 孩子ID
        _this._childId = null;
        return _this;
    }
    WifeGetChildView.prototype.getResourceList = function () {
        var rewardPic = _super.prototype.getResourceList.call(this);
        if (this.param.data) {
            this._childId = this.param.data;
        }
        return rewardPic.concat(["childview_baby", "childview_get", "childview_getboy", "childview_getgirl", "shareBtn", "shareRewardPop"
        ]);
    };
    WifeGetChildView.prototype.getTitleBgName = function () {
        return null;
    };
    WifeGetChildView.prototype.getTitleStr = function () {
        return null;
    };
    WifeGetChildView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    WifeGetChildView.prototype.initView = function () {
        //分阶段引导
        if (Api.childVoApi.getChildNum() == 1 && Api.adultVoApi.getAdultNum() == 0 && Api.adultVoApi.getAdultMarryNum() == 0) {
            Api.rookieVoApi.curGuideKey = "child";
            Api.rookieVoApi.insertWaitingGuide({ "idx": "child_1" }, true);
            //功能解锁
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT);
        }
        // this.addTouchTap(this.touchTap,this,null);
        SoundManager.playEffect(SoundConst.EFFECT_GETCHILD);
        var id = this._childId;
        var childrenInfoVo = Api.childVoApi.getChildrenInfoVoById(id);
        var dis = childrenInfoVo.attrVo.attTotal;
        var pos = egret.Point.create(320, GameConfig.stageHeigth / 2);
        // App.CommonUtil.playRewardFlyAction([{tipMessage:LanguageManager.getlocal("rankpower")+"+"+dis}],pos);
        var powerFly = new PowerFly();
        powerFly.init(dis);
        LayerManager.msgLayer.addChild(powerFly);
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
        var sexPicStr = "childview_getboy";
        if (childrenInfoVo.sex == 2) {
            sexPicStr = "childview_getgirl";
        }
        //获得图片
        var getPic = BaseBitmap.create("childview_get");
        getPic.setPosition(170, tipBB.y - 330);
        this.addChild(getPic);
        var posy = getPic.y;
        if (Api.switchVoApi.checkCloseText2()) {
            var wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(childrenInfoVo.motherId);
            var sexstr = childrenInfoVo.sex == 1 ? LanguageManager.getlocal("childBoyName") : LanguageManager.getlocal("childGirlName");
            getPic.y -= 80;
            var txtbg = BaseLoadBitmap.create("childview_getchildtextbg");
            txtbg.width = 567;
            txtbg.height = 127;
            txtbg.setPosition(GameConfig.stageWidth / 2 - txtbg.width / 2, getPic.y + getPic.height - 5);
            this.addChildToContainer(txtbg);
            var descType = String(Math.floor((Math.random() * 10)) + 1);
            var txtTF = ComponentManager.getTextField(LanguageManager.getlocal("getcChildDes" + descType, [wifeInfoVo.name, sexstr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
            txtTF.width = 450;
            txtTF.setPosition(txtbg.x + txtbg.width / 2 - txtTF.width / 2, txtbg.y + txtbg.height / 2 - txtTF.height / 2);
            this.addChildToContainer(txtTF);
        }
        //性别图片
        var sexPic = BaseBitmap.create(sexPicStr);
        sexPic.setPosition(getPic.x + getPic.width, getPic.y);
        this.addChild(sexPic);
        //孩子图片
        var childPic = BaseBitmap.create("childview_baby");
        childPic.setPosition(GameConfig.stageWidth / 2 - childPic.width / 2, posy + sexPic.height + 30);
        this.addChild(childPic);
        // //资质图片
        // let qualityPicStr = "childview_q" + childrenInfoVo.quality;
        // let qualityPic:BaseBitmap = BaseBitmap.create(qualityPicStr);
        // qualityPic.setPosition(GameConfig.stageWidth - qualityPic.width-25, tipBB.y + tipBB.height - 65);
        // this.addChild(qualityPic);
        var qualityStr = LanguageManager.getlocal("child_quality") + LanguageManager.getlocal("child_quality" + childrenInfoVo.quality);
        var qualityTF = ComponentManager.getTextField(qualityStr, TextFieldConst.FONTSIZE_TITLE_SMALL);
        qualityTF.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        qualityTF.setPosition(GameConfig.stageWidth / 2 - qualityTF.width / 2, childPic.y + childPic.height + 30);
        this.addChild(qualityTF);
        var lookBg = BaseBitmap.create("public_9_wordbg");
        // lookBg.scaleX = 2;
        lookBg.height = 200;
        lookBg.setPosition(GameConfig.stageWidth / 2 - lookBg.width / 2, qualityTF.y + qualityTF.height + 30);
        this.addChild(lookBg);
        //lookTip1查看孩子文字
        var lookTip = ComponentManager.getTextField(LanguageManager.getlocal("wifeLookChild"), TextFieldConst.FONTSIZE_TITLE_SMALL);
        lookTip.setPosition(GameConfig.stageWidth / 2 - lookTip.width / 2, lookBg.y + 60);
        this.addChild(lookTip);
        var sureBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "wifeLookChildYes", this.sureBtnClick, this);
        sureBtn.setPosition(lookBg.x + lookBg.width / 4 * 3 - sureBtn.width / 2, lookBg.y + 120);
        this.addChild(sureBtn);
        var noBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "wifeLookChildNo", this.noBtnClick, this);
        noBtn.setColor(TextFieldConst.COLOR_BLACK);
        noBtn.setPosition(lookBg.x + lookBg.width / 4 - noBtn.width / 2, lookBg.y + 120);
        this.addChild(noBtn);
        //如果不是第一个孩子  第一个孩子会强弹分享(此处会判断平台和开关和第一个孩子的条件)
        if (!Api.shareVoApi.checkCanShowShare(ShareVoApi.TYPE_CHILD, null)) {
            // 分享按钮
            App.ShareGuideUtil.addShareNode(this.container, App.ShareGuideUtil.TYPE_CHILDGET);
        }
    };
    WifeGetChildView.prototype.sureBtnClick = function () {
        //添加强制分享逻辑
        Api.shareVoApi.showShare(ShareVoApi.TYPE_CHILD, null, this.sureBtnClickEvent, this);
    };
    WifeGetChildView.prototype.sureBtnClickEvent = function () {
        //分阶段引导
        if (Api.childVoApi.getChildNum() == 1 && Api.adultVoApi.getAdultNum() == 0 && Api.adultVoApi.getAdultMarryNum() == 0) {
            this.hide();
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHILD_GUIDE);
            return;
        }
        ViewController.getInstance().hideAllView();
        // ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
        this._childId = this.param.data;
        ViewController.getInstance().openView(ViewConst.COMMON.CHILDVIEW, { childId: this._childId });
    };
    WifeGetChildView.prototype.noBtnClick = function () {
        //添加强制分享逻辑
        Api.shareVoApi.showShare(ShareVoApi.TYPE_CHILD, null, this.noBtnClickEvent, this);
        // ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
    };
    WifeGetChildView.prototype.noBtnClickEvent = function () {
        this.hide();
    };
    WifeGetChildView.prototype.touchTap = function () {
        this.hide();
    };
    WifeGetChildView.prototype.dispose = function () {
        this._childId = null;
        _super.prototype.dispose.call(this);
    };
    return WifeGetChildView;
}(BaseView));
__reflect(WifeGetChildView.prototype, "WifeGetChildView");
//# sourceMappingURL=WifeGetChildView.js.map