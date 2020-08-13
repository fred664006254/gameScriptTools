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
var CityScene = (function (_super) {
    __extends(CityScene, _super);
    function CityScene() {
        return _super.call(this) || this;
    }
    // private _snowBoneNode:BaseLoadDragonBones;
    CityScene.prototype.init = function () {
        _super.prototype.init.call(this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_CITYSCENE_SCROLL, this.doGuideScroll, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_CITYSCENE_SCROLL2, this.doGuideScroll2, this);
    };
    CityScene.prototype.doGuideScroll = function () {
        this._sceneScroll.setScrollLeft(BaseScene.scrollToPos);
        BaseScene.scrollToPos = BaseScene.scrollToCenterPos;
        this._sceneScroll.horizontalScrollPolicy = "off";
    };
    CityScene.prototype.doGuideScroll2 = function () {
        if (this._sceneScroll && this._sceneScroll.horizontalScrollPolicy == "off") {
            this._sceneScroll.horizontalScrollPolicy = "on";
            BaseScene.scrollToPos = -1;
        }
    };
    CityScene.prototype.setLayerPosition = function () {
        _super.prototype.setLayerPosition.call(this);
        // 旧版上对齐，滚动版下对齐
        if (!Api.switchVoApi.checkScrollCityScene()) {
            this._mapLayer.setPosition(0, 0);
        }
    };
    CityScene.prototype.getResourceList = function () {
        var resArr = [
            "citysceneres", "chatcrosstitle", "chat_crosscity_namebg", "chat_crosscity_txtbg",
        ];
        if (Api.switchVoApi.checkScrollCityScene()) {
            resArr.push("cityscenescrollres");
        }
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    CityScene.prototype.refreshAfterShow = function (isfromShow) {
        if (isfromShow === void 0) { isfromShow = false; }
        _super.prototype.refreshAfterShow.call(this, isfromShow);
        this.create_crossGroup();
    };
    CityScene.prototype.create_crossGroup = function () {
        // if(App.CommonUtil.check_dragon())
        // {
        // 	if(!this._snowBoneNode){
        // 		this._snowBoneNode=App.DragonBonesUtil.getLoadDragonBones("xuehuapiaopiao");//xuehua_piaopiao actigertrappass
        // 		this._snowBoneNode.x = GameConfig.stageWidth/2 + 40;
        // 		this._snowBoneNode.y = 200;
        // 		this.addChild(this._snowBoneNode);
        // 	}
        // }
        if (Api.switchVoApi.openCrossChat()) {
            if (this._crosschatGroup) {
                return;
            }
            //跨服聊天消息刷新
            var crosschatGroup = new BaseDisplayObjectContainer();
            crosschatGroup.width = GameConfig.stageWidth; //450;
            crosschatGroup.height = 90;
            this.setLayoutPosition(LayoutConst.lefttop, crosschatGroup, this, [0, 140]);
            this.addChild(crosschatGroup);
            this._crosschatGroup = crosschatGroup;
            crosschatGroup.visible = false;
            var chatbg = BaseBitmap.create(ResourceManager.getRes("chat_crosscity_txtbg"));
            // chatbg.width = 450;
            chatbg.width = GameConfig.stageWidth;
            chatbg.height = 110;
            // chatbg.x=0;
            // chatbg.y= bottomBg.y-chatbg.height-3;
            // this._bottomContiner.addChild(chatbg);
            chatbg.touchEnabled = true;
            chatbg.addTouchTap(this.chatBgClickHandler, this);
            crosschatGroup.setLayoutPosition(LayoutConst.leftverticalCenter, chatbg, crosschatGroup, [0, 0], true);
            crosschatGroup.addChild(chatbg);
            var kuafutitle = BaseBitmap.create(ResourceManager.getRes("chat_crosscity_namebg"));
            crosschatGroup.setLayoutPosition(LayoutConst.lefttop, kuafutitle, chatbg, [30, 10]);
            crosschatGroup.addChild(kuafutitle);
            var corssTxt = ComponentManager.getTextField(LanguageManager.getlocal("chat_crossTxt"), 22);
            crosschatGroup.setLayoutPosition(LayoutConst.lefttop, corssTxt, chatbg, [80, 21]);
            crosschatGroup.addChild(corssTxt);
            var desc = (crosschatGroup.height - 20 - 18) / 3;
            var name_1 = ComponentManager.getTextField('', 20);
            crosschatGroup.setLayoutPosition(LayoutConst.lefttop, name_1, chatbg, [200, 18]);
            crosschatGroup.addChild(name_1);
            this._crossnameTxt = name_1;
            var msg = ComponentManager.getTextField('', 20);
            msg.width = 600;
            msg.lineSpacing = 2;
            msg.multiline = true;
            crosschatGroup.setLayoutPosition(LayoutConst.lefttop, msg, chatbg, [20, 56]);
            crosschatGroup.addChild(msg);
            this._crossmsgTxt = msg;
            this.fresh_crossMsg();
        }
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
                this._crossmsgTxt.text = obj.content.message;
                //暂时先关闭
                // this._crossmsgTxt.text = obj.content.message.length > 50 ? (obj.content.message.substring(0, 50) + '...') : (obj.content.message);
            }
            else {
                this._crosschatGroup.visible = false;
            }
            //let mainui = SceneController.getInstance().get
        }
    };
    CityScene.prototype.tick = function () {
        _super.prototype.tick.call(this);
        this.fresh_crossMsg();
    };
    CityScene.prototype.chatBgClickHandler = function () {
        if (Api.switchVoApi.checkCloseChat()) {
            App.CommonUtil.showTip("很抱歉，聊天系统维护中");
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.CHATVIEWTAB3);
    };
    CityScene.prototype.checkDinnerClose = function () {
        return Api.composemapVoApi.getMaxLv() < Config.DinnerCfg.getNeedLv() ? LanguageManager.getlocal("composeUnlockFuncDesc", [Config.DinnerCfg.getNeedLv() + ""]) : null;
    };
    CityScene.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_CITYSCENE_SCROLL, this.doGuideScroll, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_CITYSCENE_SCROLL2, this.doGuideScroll2, this);
        if (this._crosschatGroup) {
            this._crosschatGroup.dispose();
            this._crosschatGroup = null;
        }
        // this._snowBoneNode = null;
        _super.prototype.dispose.call(this);
    };
    return CityScene;
}(BaseScene));
__reflect(CityScene.prototype, "CityScene");
