var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CityScene = /** @class */ (function (_super) {
    __extends(CityScene, _super);
    function CityScene() {
        var _this = _super.call(this) || this;
        _this._iconList = [];
        return _this;
    }
    CityScene.prototype.init = function () {
        _super.prototype.init.call(this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_CITYSCENE_SCROLL, this.doGuideScroll, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_CITYSCENE_SCROLL2, this.doGuideScroll2, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHECK_FUNCTION_CITYSCENE_SCROLL, this.openFunctionScroll, this);
    };
    CityScene.prototype.doGuideScroll = function () {
        if (this._sceneScroll && this._isScroll) {
            this._sceneScroll.setScrollLeft(BaseScene.scrollToPos);
            BaseScene.scrollToPos = -1;
            this._sceneScroll.horizontalScrollPolicy = "off";
        }
        else {
            BaseScene.scrollToPos = -1;
        }
    };
    CityScene.prototype.doGuideScroll2 = function () {
        if (this._sceneScroll && this._isScroll && this._sceneScroll.horizontalScrollPolicy == "off") {
            this._sceneScroll.horizontalScrollPolicy = "on";
            BaseScene.scrollToPos = -1;
        }
        else {
            BaseScene.scrollToPos = -1;
        }
    };
    CityScene.prototype.openFunctionScroll = function (evt) {
        var data = evt.data.data;
        var scrollX = data.scrollX;
        if (this._sceneScroll && this._isScroll) {
            this._sceneScroll.horizontalScrollPolicy = "on";
            this._sceneScroll.setScrollLeft(scrollX);
        }
    };
    CityScene.prototype.setLayerPosition = function () {
        _super.prototype.setLayerPosition.call(this);
        if (Api.otherInfoVoApi.getCurSceneId(this._sceneName) != "205") {
            this._mapLayer.setPosition(0, 0);
        }
        // this.dealDecreeIcons();
    };
    CityScene.prototype.create_crossGroup = function () {
        if (Api.switchVoApi.openCrossChat()) {
            if (this._crosschatGroup) {
                return;
            }
            //跨服聊天消息刷新
            var crosschatGroup = new BaseDisplayObjectContainer();
            crosschatGroup.width = 450;
            crosschatGroup.height = 70;
            this.setLayoutPosition(LayoutConst.lefttop, crosschatGroup, this, [0, 125]);
            this.addChild(crosschatGroup);
            this._crosschatGroup = crosschatGroup;
            crosschatGroup.visible = false;
            var chatbg = BaseBitmap.create(ResourceManager.getRes("mainui_chatbg"));
            chatbg.width = 450;
            chatbg.height = 70;
            // chatbg.x=0;
            // chatbg.y= bottomBg.y-chatbg.height-3;
            // this._bottomContiner.addChild(chatbg);
            chatbg.touchEnabled = true;
            chatbg.addTouchTap(this.chatBgClickHandler, this);
            crosschatGroup.setLayoutPosition(LayoutConst.leftverticalCenter, chatbg, crosschatGroup, [0, 0], true);
            crosschatGroup.addChild(chatbg);
            var kuafutitle = BaseBitmap.create(ResourceManager.getRes("chatcrosstitle"));
            crosschatGroup.setLayoutPosition(LayoutConst.leftverticalCenter, kuafutitle, chatbg);
            crosschatGroup.addChild(kuafutitle);
            var desc = (crosschatGroup.height - 20 - 18) / 3;
            var name_1 = ComponentManager.getTextField('', 20);
            crosschatGroup.setLayoutPosition(LayoutConst.lefttop, name_1, chatbg, [kuafutitle.x + kuafutitle.width + 5, 5]);
            crosschatGroup.addChild(name_1);
            this._crossnameTxt = name_1;
            // let fontSizeNum:number = 18;
            // if(PlatformManager.checkIsEnLang())
            // {
            // 	fontSizeNum =14
            // }
            var msg = ComponentManager.getTextField('', 18);
            msg.width = 400;
            if (PlatformManager.checkIsEnLang()) {
                msg.width = 360;
            }
            crosschatGroup.setLayoutPosition(LayoutConst.lefttop, msg, name_1, [0, 20 + 3]);
            crosschatGroup.addChild(msg);
            this._crossmsgTxt = msg;
            this.fresh_crossMsg();
        }
    };
    CityScene.prototype.refreshAfterShow = function () {
        _super.prototype.refreshAfterShow.call(this);
        this.create_crossGroup();
        if (!Api.switchVoApi.checkEmperorOpen()) {
            return;
        }
        if (this._decreeNode) {
            return;
        }
        //国策btn
        this._decreeNode = new BaseDisplayObjectContainer();
        this.addChild(this._decreeNode);
        var startX = GameConfig.stageWidth - 50;
        var gdid = Api.promoteVoApi.getGdinfo().gdid;
        var policyId = Api.promoteVoApi.getSpid();
        var commonbg = BaseBitmap.create("decree_citybg");
        commonbg.setScale(1.1);
        commonbg.x = GameConfig.stageWidth - commonbg.width - 20;
        commonbg.y = 110;
        this._decreeNode.addChild(commonbg);
        this._decreeNode.visible = false;
        commonbg.addTouchTap(this.openEmpriorUI, this);
        var deltaS = 0.7;
        this._decree_policy = new BaseDisplayObjectContainer();
        this._decree_policy.x = commonbg.x + 27;
        this._decree_policy.y = 128;
        this._decree_policy.setScale(deltaS);
        this._decreeNode.addChild(this._decree_policy);
        var decree_policy_iconbg = BaseBitmap.create("decree_bookbg");
        decree_policy_iconbg.alpha = 0.7;
        this._decree_policy.addChild(decree_policy_iconbg);
        decree_policy_iconbg.addTouchTap(this.openDecreeDisplay, this, [1]);
        var policyIcon = BaseLoadBitmap.create("decree_policy_icon" + policyId);
        policyIcon.name = "policyIcon";
        policyIcon.x = decree_policy_iconbg.x + decree_policy_iconbg.width / 2 * deltaS - 50 * deltaS;
        policyIcon.y = decree_policy_iconbg.y + decree_policy_iconbg.height / 2 * deltaS - 50 * deltaS;
        this._decree_policy.addChild(policyIcon);
        this._decree_paper = new BaseDisplayObjectContainer();
        this._decree_paper.x = commonbg.x + 98;
        this._decree_paper.y = this._decree_policy.y;
        this._decree_paper.setScale(deltaS);
        this._decreeNode.addChild(this._decree_paper);
        var decree_paper_iconbg = BaseBitmap.create("decree_bookbg");
        decree_paper_iconbg.alpha = 0.7;
        this._decree_paper.addChild(decree_paper_iconbg);
        decree_paper_iconbg.addTouchTap(this.openDecreeDisplay, this, [2]);
        var papericon_str = "decree_paper_icon0";
        if (Number(gdid) > 0) {
            papericon_str = "decree_book";
        }
        var paperIcon = BaseLoadBitmap.create(papericon_str);
        paperIcon.name = "paperIcon";
        paperIcon.x = decree_paper_iconbg.x + decree_paper_iconbg.width / 2 * deltaS - 50 * deltaS;
        paperIcon.y = decree_paper_iconbg.y + decree_paper_iconbg.height / 2 * deltaS - 50 * deltaS;
        this._decree_paper.addChild(paperIcon);
        // let num =18; 
        this._kingsCDTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_WARN_RED);
        this._kingsCDTxt.multiline = true;
        this._kingsCDTxt.lineSpacing = 1;
        this._kingsCDTxt.textAlign = egret.HorizontalAlign.CENTER;
        this._kingsCDTxt.width = 100;
        this._kingsCDTxt.x = commonbg.x + 45;
        this._kingsCDTxt.y = commonbg.y + 21;
        this._decreeNode.addChild(this._kingsCDTxt);
        if (PlatformManager.checkIsEnSp()) {
            this._kingsCDTxt.width = 150;
            this._kingsCDTxt.x = 470;
            this._kingsCDTxt.y = 134;
        }
        this.tick();
    };
    CityScene.prototype.fresh_crossMsg = function () {
        var view = this;
        if (view._crosschatGroup) {
            var api = Api.chatVoApi;
            var obj = api.getLastCrossMessage();
            if (obj && !api.getIsReadCross()) {
                this._crosschatGroup.visible = true;
                var zonename = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, obj.zoneid);
                this._crossnameTxt.text = LanguageManager.getlocal('accrosschattitle', [obj.sendername, zonename]);
                var msgStr = Api.emoticonVoApi.chatStrChangeLocal(obj.content.message);
                this._crossmsgTxt.text = msgStr.length > 35 ? (msgStr.substring(0, 35) + '...') : (msgStr);
                if (PlatformManager.checkIsEnLang()) {
                    this._crossmsgTxt.text = msgStr.length > 60 ? (msgStr.substring(0, 60) + '...') : (msgStr);
                }
            }
            else {
                this._crosschatGroup.visible = false;
            }
            //let mainui = SceneController.getInstance().get
        }
    };
    CityScene.prototype.chatBgClickHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.CHATVIEWTAB3);
    };
    CityScene.prototype.openDecreeDisplay = function (obj, params) {
        if ((params == 1 && Api.promoteVoApi.isShowRedForPolicyRead()) || (params == 2 && Api.promoteVoApi.isShowRedForDecreeRead())) {
            NetManager.request(NetRequestConst.REQUEST_POLICY_SETREAD, { dtype: params });
        }
        ViewController.getInstance().openView(ViewConst.POPUP.DECREERESCRIPTDISPLAYPOPUPVIEW);
    };
    /**
     * 打开夺帝界面
     */
    CityScene.prototype.openEmpriorUI = function () {
        if (this._decree_paper.visible) {
            return;
        }
        Api.emperorwarVoApi.openEmpView();
    };
    CityScene.prototype.tick = function () {
        _super.prototype.tick.call(this);
        this.fresh_crossMsg();
        if (!Api.switchVoApi.checkEmperorOpen()) {
            return;
        }
        if (this._decreeNode) {
            this._decreeNode.visible = Api.emperorwarVoApi.emperorwarActiveVo.hasOpen;
        }
        var cdStr = Api.emperorwarVoApi.getEmperorEndCD();
        if (cdStr) {
            this._kingsCDTxt.text = LanguageManager.getlocal("decreeKings_cdTxt", [cdStr]);
            this._decree_policy.visible = false;
            this._decree_paper.visible = false;
            return;
        }
        this._kingsCDTxt.text = "";
        var gdid = Api.promoteVoApi.getGdinfo().gdid;
        var policyId = Api.promoteVoApi.getSpid();
        var policyIcon = this._decree_policy.getChildByName("policyIcon");
        policyIcon.setload("decree_policy_icon" + policyId);
        var paperIcon = this._decree_paper.getChildByName("paperIcon");
        if (Number(gdid) > 0) {
            paperIcon.setload("decree_book");
        }
        else {
            paperIcon.setload("decree_paper_icon0");
        }
        this._decree_policy.visible = true;
        this._decree_paper.visible = true;
        //国策红点
        if (Api.promoteVoApi.isShowRedForPolicyRead()) {
            App.CommonUtil.addIconToBDOC(this._decree_policy);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._decree_policy);
        }
        //政令红点
        if (Api.promoteVoApi.isShowRedForDecreeRead()) {
            App.CommonUtil.addIconToBDOC(this._decree_paper);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._decree_paper);
        }
        //this.fresh_crossMsg();
    };
    CityScene.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "decree_paperBtn", "decree_paperBtn_down", "decree_citybg",
            "decree_policy_iconbg", "decree_bookbg", "chatlaba", "chatcrosstitle"
        ]);
    };
    CityScene.prototype.checkDinnerClose = function () {
        return Api.playerVoApi.getPlayerLevel() < Config.DinnerCfg.getNeedLv() ? LanguageManager.getlocal("reachLvelUnlockDesc", [Api.playerVoApi.getPlayerOfficeByLevel(Config.DinnerCfg.getNeedLv())]) : null;
    };
    CityScene.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_CITYSCENE_SCROLL, this.doGuideScroll, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_CITYSCENE_SCROLL2, this.doGuideScroll2, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHECK_FUNCTION_CITYSCENE_SCROLL, this.openFunctionScroll, this);
        this._decree_policy = null;
        this._decree_paper = null;
        this._decreeNode = null;
        this._kingsCDTxt = null;
        this._crossmsgTxt = null;
        this._crossnameTxt = null;
        if (this._crosschatGroup) {
            this._crosschatGroup.dispose();
            this._crosschatGroup = null;
        }
        _super.prototype.dispose.call(this);
    };
    return CityScene;
}(BaseScene));
//# sourceMappingURL=CityScene.js.map