/**
 * 门客招募UI
 * author yanyuling
 * date 2017/10/19
 * @class ServantGetView
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
var ServantGetView = (function (_super) {
    __extends(ServantGetView, _super);
    function ServantGetView() {
        var _this = _super.call(this) || this;
        _this._servantInfoBg = null;
        _this._checkBox = null;
        return _this;
    }
    ServantGetView.prototype.initView = function () {
        //设置本次人物id
        this._personId = this.param.data.shift();
        //设置类型
        this.targetType = "1";
        //设置回调函数
        this.initCallbackFunc(this.createView);
        //开始创建窗口
        _super.prototype.startView.call(this);
    };
    ServantGetView.prototype.createView = function () {
        console.log("create view-----");
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        if (typeof (this.param.data) == "string") {
            this.param.data = [this.param.data];
        }
        var servantId = this._personId; //this.param.data.shift();
        // let servantId = this.param.data
        var servantCfg = GameConfig.config.servantCfg[servantId];
        var ability = servantCfg.ability;
        var servantInfoObj = Api.servantVoApi.getServantObj(servantId);
        SoundManager.playEffect(servantInfoObj.sound);
        // this.showGetBtn();
        // this.addTouchTap(this.clickHandler,this)
        var servant_get_word = BaseBitmap.create("servant_get_word");
        servant_get_word.x = GameConfig.stageWidth / 2 - servant_get_word.width / 2;
        servant_get_word.y = 20;
        this._nodeContainer.addChild(servant_get_word);
        var nameBg = BaseBitmap.create("servant_alv_namebg");
        this._nodeContainer.addChild(nameBg);
        if (PlatformManager.checkIsTextHorizontal()) {
        }
        else {
            nameBg.x = 76;
            nameBg.y = 277;
        }
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        if (PlatformManager.checkIsTextHorizontal()) {
        }
        else {
            nameTxt.multiline = true;
            nameTxt.width = 26;
        }
        // nameTxt.textColor = ServantScrollItem.QUALITYCFG[servantCfg.quality];
        nameTxt.textColor = TextFieldConst.COLOR_QUALITY_WHITE;
        nameTxt.text = LanguageManager.getlocal("servant_name" + servantId);
        if (PlatformManager.checkIsTextHorizontal()) {
            nameBg.width = nameTxt.width + 40;
            nameBg.x = GameConfig.stageWidth / 2 - nameBg.width / 2;
            nameBg.y = GameConfig.stageHeigth - 465;
            nameTxt.x = nameBg.x + nameBg.width / 2 - nameTxt.width / 2;
            nameTxt.y = nameBg.y + nameBg.height / 2 - nameTxt.height / 2;
        }
        else {
            nameTxt.x = nameBg.x + nameBg.width / 2 - nameTxt.width / 2;
            nameTxt.y = nameBg.y + 80 - nameTxt.height / 2;
        }
        this._nodeContainer.addChild(nameTxt);
        var bottomBg = BaseBitmap.create("public_9_wordbg");
        this._servantInfoBg = bottomBg;
        bottomBg.touchEnabled = true;
        bottomBg.height = 375;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height;
        this._nodeContainer.addChild(bottomBg);
        var servantFullImg = BaseLoadBitmap.create(Api.servantVoApi.getFullImgPathWithId(servantId));
        servantFullImg.width = 640;
        servantFullImg.height = 482;
        servantFullImg.x = GameConfig.stageWidth / 2 - servantFullImg.width / 2;
        servantFullImg.y = bottomBg.y - servantFullImg.height;
        this._nodeContainer.addChildAt(servantFullImg, 0);
        var lightImg = BaseBitmap.create("public_rotatelight");
        lightImg.anchorOffsetX = lightImg.width / 2;
        lightImg.anchorOffsetY = lightImg.height / 2;
        lightImg.x = GameConfig.stageWidth / 2;
        lightImg.y = servantFullImg.y + servantFullImg.height / 2 - 20;
        lightImg.setScale(2);
        this._nodeContainer.addChildAt(lightImg, 0);
        egret.Tween.get(lightImg, { loop: true }).to({ rotation: 360 }, 15000);
        var starNumTxt = 0;
        var totalStar = 0;
        var posX = 50;
        var posY = bottomBg.y + 30;
        posY = 0;
        var tmpScrNode = new BaseDisplayObjectContainer();
        for (var index2 = 0; index2 < ability.length; index2++) {
            var aid = ability[index2];
            var tmpAcfg = GameConfig.config.abilityCfg[aid];
            if (index2 % 2 == 1) {
                posX = GameConfig.stageWidth / 2 + 4;
            }
            else {
                posX = 50;
            }
            var attrIcon = BaseBitmap.create("servant_infoPro" + tmpAcfg.type);
            attrIcon.x = posX + 15;
            attrIcon.y = posY;
            tmpScrNode.addChild(attrIcon);
            var starImg = this.getStars(tmpAcfg.num);
            starImg.x = attrIcon.x + attrIcon.width / 2 - starImg.width / 2;
            starImg.y = attrIcon.y + 65;
            tmpScrNode.addChild(starImg);
            var attrNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_attrNameTxt" + aid), 20, TextFieldConst.COLOR_WHITE);
            attrNameTxt.x = attrIcon.x + 77;
            attrNameTxt.y = posY + 20;
            tmpScrNode.addChild(attrNameTxt);
            var attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_attrTxt" + tmpAcfg.type), 18, TextFieldConst.COLOR_WHITE);
            attrTxt.x = attrNameTxt.x + 13;
            attrTxt.y = attrNameTxt.y + 35;
            tmpScrNode.addChild(attrTxt);
            var attrValueTxt = ComponentManager.getTextField(tmpAcfg.num.toString(), 18, TextFieldConst.COLOR_WHITE);
            attrValueTxt.x = attrTxt.x + attrTxt.width + 5;
            attrValueTxt.y = attrTxt.y;
            tmpScrNode.addChild(attrValueTxt);
            totalStar += tmpAcfg.num;
            if (index2 % 2 == 1) {
                posY += 95;
            }
        }
        var rect = new egret.Rectangle(0, 0, bottomBg.width, bottomBg.height - 40);
        var tmpScrollList = ComponentManager.getScrollView(tmpScrNode, rect);
        tmpScrollList.y = bottomBg.y + 30;
        this._nodeContainer.addChild(tmpScrollList);
        // let str = LanguageManager.getlocal("servantInfo_title"+ String(totalStar),[servantInfoObj.getTotalBookValue()]);
        var str = LanguageManager.getlocal("servantInfo_title", ["" + servantInfoObj.getTotalBookValue()]);
        var totalTxt = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        totalTxt.x = GameConfig.stageWidth - totalTxt.width - 20;
        totalTxt.y = bottomBg.y - 30;
        this._nodeContainer.addChild(totalTxt);
        //添加出现action
        this._nodeContainer.alpha = 0;
        egret.Tween.get(this._nodeContainer, { loop: false }).to({ alpha: 1 }, 800);
        this.showGetBtn();
        // 分享按钮
        // App.ShareGuideUtil.addShareNode(this._nodeContainer, App.ShareGuideUtil.TYPE_SERVANTGET);
        var qualityIcon = GameData.getServantQualityIconBySid(servantId);
        if (qualityIcon) {
            this._nodeContainer.addChild(qualityIcon);
            qualityIcon.setPosition(-33, 166 - 41);
        }
        // 羁绊
        var _fetterBtn = ComponentManager.getButton("servantjibanicon", "", this.onFetterTap, this, null, 0);
        var _fetterText = BaseBitmap.create("servantjibantxt");
        _fetterText.width = 67;
        _fetterText.height = 43;
        _fetterBtn.addChild(_fetterText);
        _fetterText.setPosition((_fetterBtn.width - _fetterText.width) / 2, _fetterBtn.height - _fetterText.height);
        this._nodeContainer.addChild(_fetterBtn);
        _fetterBtn.setPosition(26, bottomBg.y - 110);
        _fetterBtn.setScale(100 / _fetterBtn.width);
        var skillBar = ComponentManager.getSkillBar(servantId, 86);
        this._nodeContainer.addChild(skillBar);
        skillBar.setPosition(150, bottomBg.y - 100);
    };
    /**羁绊详情 */
    ServantGetView.prototype.onFetterTap = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.SERVANTJIBANBUFFPOPUPVUEW, { sid: this._personId });
    };
    ServantGetView.prototype.showGetBtn = function () {
        if (PlatformManager.checkGetShare()) {
            // 显示勾选分享
            this._checkBox = ComponentManager.getCheckBox(LanguageManager.getlocal("shareFriendGiftText"), false, 18, 0x987160, "public_select_down2", "public_select2");
            var collectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "shareFriendCollect", this.collectBtnListener, this);
            // let checkBoxBg = BaseBitmap.create("public_icontimebg");
            // checkBoxBg.setScale(1);
            // this._nodeContainer.addChild(checkBoxBg);
            collectBtn.x = this.viewBg.width / 2 - collectBtn.width / 2;
            collectBtn.y = this._servantInfoBg.y - 5 - collectBtn.height;
            this._nodeContainer.addChild(collectBtn);
            // this._checkBox.x = this.viewBg.width / 2 - this._checkBox.width/2 - 5;
            // this._checkBox.y = collectBtn.y - 15 - this._checkBox.height;
            this._checkBox.x = GameConfig.stageWidth - 147 - 20 + 147 / 2 - this._checkBox.width / 2; //this.viewBg.width - 20 - this._checkBox.width;
            this._checkBox.y = collectBtn.y;
            // checkBoxBg.x = this._checkBox.x + this._checkBox.width / 2 - checkBoxBg.width * checkBoxBg.scaleX/2 + 20;
            // checkBoxBg.y = this._checkBox.y + this._checkBox.height / 2 - checkBoxBg.height * checkBoxBg.scaleY/2;
            this._nodeContainer.addChild(this._checkBox);
            var otherinfo = Api.otherInfoVoApi.getOtherInfo().info;
            this._checkBox.isSelected = !(otherinfo.notshareservant);
        }
        else {
            this.viewBg.addTouchTap(this.clickHandler, this);
        }
    };
    ServantGetView.prototype.collectBtnListener = function () {
        var otherinfo = Api.otherInfoVoApi.getOtherInfo().info;
        var oldState = !!otherinfo.notshareservant;
        var curState = !this._checkBox.isSelected;
        if (oldState != curState) {
            //值发生改变
            NetManager.request(NetRequestConst.REQUST_OTHERINFO_CHANGSHARE, { scene: "servantget", changshare: curState ? 1 : 0 });
        }
        if (!curState) {
            console.log("分享");
            // PlatformManager.share(App.ShareGuideUtil.SHARETYPE_SHARE_MENKEAUTO,()=>{},this);
            this.shareCollect();
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                "needCancel": 1,
                // "callback":this.,
                "clickNotAutoHide": false,
                "cancelcallback": this.commonCollect,
                "title": "confirmShareCollectTitle",
                "msg": LanguageManager.getlocal("confirmShareCollectServantTip"),
                "canelTxt": "canelTxt",
                "handler": this
            });
        }
    };
    ServantGetView.prototype.shareCollect = function () {
        var _this = this;
        if (PlatformManager.checkIsLocal()) {
            App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETTYPESHAREREWARD, this.flyReward, this);
            NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETTYPESHAREREWARD, { typeid: this._personId });
            this.clickHandler();
        }
        else {
            PlatformManager.share(App.ShareGuideUtil.SHARETYPE_SHARE_MENKEAUTO, function () {
                App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETTYPESHAREREWARD, _this.flyReward, _this);
                NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETTYPESHAREREWARD, { typeid: _this._personId });
                _this.clickHandler();
            }, this);
        }
        //此处添加获得物品请求
    };
    ServantGetView.prototype.flyReward = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETTYPESHAREREWARD, this.flyReward, this);
        var rewards = event.data.data.data.rewards;
        var rewardList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardList);
    };
    ServantGetView.prototype.commonCollect = function () {
        this.clickHandler();
    };
    ServantGetView.prototype.clickHandler = function () {
        console.log("servant get view---click handler");
        _super.prototype.hide.call(this);
        Api.rookieVoApi.checkNextStep();
        var servantId = this.param.data;
        // super.hide();
        if (servantId && servantId[0]) {
            ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW, servantId);
        }
    };
    ServantGetView.prototype.getStars = function (num) {
        var objContainer = new BaseDisplayObjectContainer;
        for (var index = 1; index <= num; index++) {
            var starImg = BaseBitmap.create("servant_star");
            starImg.setScale(0.5);
            starImg.x = (index - 1) * starImg.width * 0.5;
            starImg.y = 0;
            objContainer.addChild(starImg);
        }
        return objContainer;
    };
    ServantGetView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "servant_star", "shareBtn", "shareRewardPop",
            "servant_infoPro1", "servant_infoPro2", "servant_infoPro3", "servant_infoPro4",
            "servant_alv_namebg", "public_rotatelight",
            "servantjibanicon", "servantjibantxt",
        ]);
    };
    ServantGetView.prototype.dispose = function () {
        this._nodeContainer = null;
        this._servantInfoBg = null;
        this._checkBox = null;
        _super.prototype.dispose.call(this);
    };
    return ServantGetView;
}(DialogueGetBaseView));
__reflect(ServantGetView.prototype, "ServantGetView");
