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
var SearchResultPopupView = (function (_super) {
    __extends(SearchResultPopupView, _super);
    function SearchResultPopupView() {
        return _super.call(this) || this;
    }
    SearchResultPopupView.prototype.getResourceList = function () {
        var resArr = ["progress_type1_yellow", "progress_type1_bg"];
        // let buildId:number = Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId()).build;
        // resArr.push("searchnpcbg"+buildId);
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    SearchResultPopupView.prototype.initView = function () {
        var spaceBuild = this.checkSpaceBuild();
        var itemCfg = Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId());
        var buildId = itemCfg.build;
        // let bg0:BaseBitmap = BaseBitmap.create("public_tc_bg01");
        // bg0.x =40;
        // bg0.y =10;
        // bg0.width = 540;
        // bg0.height = 432;
        // this.addChildToContainer(bg0);
        var bg = BaseLoadBitmap.create("searchnpcbg" + buildId);
        bg.width = 546;
        bg.height = 404;
        this.addChildToContainer(bg);
        bg.setPosition(App.CommonUtil.getCenterX(this.viewBg, bg, true), -3);
        if (!spaceBuild) {
            var iconKey = itemCfg.personFullIcon;
            var icon = BaseLoadBitmap.create(iconKey);
            var size = itemCfg.fullIconSize;
            if (itemCfg.wifeId) {
                // console.log(111111);
                // icon.setScale(340/size.width);
                icon.setScale(0.5);
                icon.setPosition((this.viewBg.width - 330) / 2, 0);
                this.checkDro(itemCfg.wifeId, icon);
            }
            else if (itemCfg.servantId) {
                // console.log(2222222);
                icon.setScale(0.8);
                // icon.setPosition((this.viewBg.width-360 - 90)/2,51)
                icon.setPosition((this.viewBg.width - 360 - 90) / 2, 14);
            }
            else {
                // console.log(3333333);
                icon.setScale(0.8);
                icon.setPosition((this.viewBg.width - 360) / 2, 25);
            }
            if (itemCfg.type == 2) {
                // icon.setScale(0.6);
                // icon.y = bg.y+bg.height-size.height*icon.scaleY + 50;
            }
            // else
            // {
            // 	icon.setPosition(140,20);
            // }
            this.addChildToContainer(icon);
            var nameBg = BaseBitmap.create("public_infobg2");
            this.addChildToContainer(nameBg);
            var fontSize = 30;
            var nameTxt = ComponentManager.getTextField(itemCfg.name, fontSize, TextFieldConst.COLOR_WARN_YELLOW);
            if (PlatformManager.checkIsTextHorizontal()) {
                nameBg.rotation = -90;
                nameBg.height = nameTxt.width + 30;
                nameBg.x = this.viewBg.width / 2 - nameBg.height / 2;
                nameBg.y = bg.y + bg.height - 70;
                nameTxt.x = nameBg.x + nameBg.height / 2 - nameTxt.width / 2;
                nameTxt.y = nameBg.y + nameBg.width / 2 - nameTxt.height / 2 - nameBg.width;
            }
            else {
                nameBg.setPosition(100, 30);
                nameTxt.width = fontSize + 2;
                var pos = App.CommonUtil.getCenterPos(nameBg, nameTxt, false);
                nameTxt.setPosition(pos.x + 4, pos.y - 3);
            }
            this.addChildToContainer(nameTxt);
        }
        var buttomBg = BaseBitmap.create("public_9v_bg10");
        buttomBg.width = bg.width;
        buttomBg.height = 78;
        buttomBg.setPosition(bg.x, bg.y + bg.height - buttomBg.height);
        this.addChildToContainer(buttomBg);
        var talkStr;
        if (spaceBuild) {
            talkStr = LanguageManager.getlocal("searchBuildTalk" + spaceBuild);
        }
        else {
            var person = Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId());
            var wifeCfg = Config.WifeCfg.getWifeCfgById(person.wifeId);
            if (wifeCfg && wifeCfg.isBule() && LanguageManager.checkHasKey("searchPersonTalk" + this.getPersonId() + "_male")) {
                talkStr = LanguageManager.getlocal("searchPersonTalk" + this.getPersonId() + "_male");
            }
            else {
                talkStr = LanguageManager.getlocal("searchPersonTalk" + this.getPersonId());
            }
        }
        var descTxt = ComponentManager.getTextField(talkStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW_NEW);
        descTxt.width = buttomBg.width - 20;
        descTxt.setPosition(App.CommonUtil.getCenterX(buttomBg, descTxt, false), App.CommonUtil.getCenterY(buttomBg, descTxt, false));
        this.addChildToContainer(descTxt);
        if (itemCfg.wifeId && itemCfg.value) {
            if (!this.checkGetWife()) {
                // console.log(11111);
                //本次没有获得红颜
                //1.已经领取了红颜 2.没有领取红颜 进度不足
                //检查如果已经有这个红颜 则是条件1.不显示进度条
                var person = Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId());
                if (Api.wifeVoApi.getWifeInfoVoById(person.wifeId)) {
                }
                else {
                    var progressBar = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", 504);
                    progressBar.setPlusEffect("progress_type1_yellow_top", "progress_type1_yellow_toplight");
                    progressBar.x = this.viewBg.width / 2 - progressBar.width / 2;
                    progressBar.y = buttomBg.y + buttomBg.height - progressBar.height + 20;
                    this.addChildToContainer(progressBar);
                    progressBar.setTextColor(TextFieldConst.COLOR_WARN_YELLOW);
                    var value = Api.searchVoApi.getWifeValueById(this.getPersonId());
                    var curValue = value / itemCfg.value;
                    var curText = Math.floor(curValue * 100) + "%";
                    progressBar.setPercentage(curValue, curText, null, 1 / itemCfg.value);
                    descTxt.y = buttomBg.y + 10;
                }
            }
            else {
                //本次获得红颜
                var progressBar = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", 504);
                progressBar.setPlusEffect("progress_type1_yellow_top", "progress_type1_yellow_toplight");
                progressBar.x = this.viewBg.width / 2 - progressBar.width / 2;
                progressBar.y = buttomBg.y + buttomBg.height - progressBar.height + 20;
                this.addChildToContainer(progressBar);
                progressBar.setTextColor(TextFieldConst.COLOR_WARN_YELLOW);
                var value = Api.searchVoApi.getWifeValueById(this.getPersonId());
                var curValue = value / itemCfg.value;
                var curText = Math.floor(curValue * 100) + "%";
                progressBar.setPercentage(curValue, curText, null, 1 / itemCfg.value);
                descTxt.y = buttomBg.y + 10;
            }
        }
        if (itemCfg.servantId && itemCfg.value) {
            if (!this.checkGetServant()) {
                // console.log(11111);
                //本次没有获得红颜
                //1.已经领取了红颜 2.没有领取红颜 进度不足
                //检查如果已经有这个红颜 则是条件1.不显示进度条
                var person = Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId());
                if (Api.servantVoApi.getServantObj(person.servantId)) {
                }
                else {
                    var progressBar = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", 504);
                    progressBar.setPlusEffect("progress_type1_yellow_top", "progress_type1_yellow_toplight");
                    progressBar.x = this.viewBg.width / 2 - progressBar.width / 2;
                    progressBar.y = buttomBg.y + buttomBg.height - progressBar.height + 20;
                    this.addChildToContainer(progressBar);
                    progressBar.setTextColor(TextFieldConst.COLOR_WARN_YELLOW);
                    var value = Api.searchVoApi.getWifeValueById(this.getPersonId());
                    var curValue = value / itemCfg.value;
                    var curText = Math.floor(curValue * 100) + "%";
                    progressBar.setPercentage(curValue, curText, null, 1 / itemCfg.value);
                    descTxt.y = buttomBg.y + 10;
                }
            }
            else {
                //本次获得红颜
                var progressBar = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", 504);
                progressBar.setPlusEffect("progress_type1_yellow_top", "progress_type1_yellow_toplight");
                progressBar.x = this.viewBg.width / 2 - progressBar.width / 2;
                progressBar.y = buttomBg.y + buttomBg.height - progressBar.height + 20;
                this.addChildToContainer(progressBar);
                progressBar.setTextColor(TextFieldConst.COLOR_WARN_YELLOW);
                var value = Api.searchVoApi.getWifeValueById(this.getPersonId());
                var curValue = value / itemCfg.value;
                var curText = Math.floor(curValue * 100) + "%";
                progressBar.setPercentage(curValue, curText, null, 1 / itemCfg.value);
                descTxt.y = buttomBg.y + 10;
            }
        }
        this.showRewards();
        this.addTouchTap(this.removeTween, this);
        this.container.alpha = 0;
        var ths = this;
        egret.Tween.get(this.container).to({ alpha: 1 }, 500).call(function () {
            ths.removeTouchTap();
            ths.addTouchTap(ths.hide, ths);
        });
    };
    SearchResultPopupView.prototype.checkDro = function (wifeId, wifeIcon) {
        var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var droWifeIcon;
        var bg2Index = this.container.getChildIndex(wifeIcon);
        if (Api.wifeSkinVoApi.isHaveSkin(wifeIcon)) {
            var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeIcon);
            if (wifeSkinVo && wifeSkinVo.equip != "") {
                var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
                if (Api.wifeVoApi.isHaveBone(skinCfg.bone + "_ske")) {
                    droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                    this.container.addChildAt(droWifeIcon, bg2Index);
                    wifeIcon.visible = false;
                }
            }
            else {
                if (Api.wifeVoApi.isHaveBone(wifeCfg.bone + "_ske")) {
                    droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
                    this.container.addChildAt(droWifeIcon, bg2Index);
                }
            }
        }
        else {
            if (Api.wifeVoApi.isHaveBone(wifeCfg.bone + "_ske")) {
                droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
                this.container.addChildAt(droWifeIcon, bg2Index);
                wifeIcon.visible = false;
            }
        }
        if (droWifeIcon) {
            droWifeIcon.setScale(0.7);
            droWifeIcon.x = wifeIcon.x + 180;
            droWifeIcon.y = wifeIcon.y + 760 * 0.7 - 120;
            // let testMask = new BaseDisplayObjectContainer();
            // testMask.x = -405;
            // testMask.y = -595;
            // testMask.width = 540/0.7;
            // testMask.height = 432 / 0.7;
            // testMask.name = "testMask";
            // droWifeIcon.addChild(testMask);
            // droWifeIcon.mask = egret.Rectangle.create().setTo(-405,-595,540/0.7,432/0.7-5);
            // droWifeIcon.mask = egret.Rectangle.create().setTo(-405,-595,540/0.7,432/0.7-5);
            var mask = BaseBitmap.create("public_9v_bg01");
            mask.width = 546;
            mask.height = 404;
            mask.x = this.viewBg.width / 2 - mask.width / 2;
            mask.y = -3;
            this.container.addChild(mask);
            droWifeIcon.mask = mask;
            if (wifeCfg.isBule()) {
                droWifeIcon.y = droWifeIcon.y + 50;
            }
        }
        else {
            wifeIcon.visible = true;
            var mask = BaseBitmap.create("public_9v_bg01");
            mask.width = 546;
            mask.height = 404;
            mask.x = this.viewBg.width / 2 - mask.width / 2;
            mask.y = -3;
            this.container.addChild(mask);
            wifeIcon.mask = mask;
            // wifeIcon.mask = egret.Rectangle.create().setTo(0,0,);
            // wifeIcon.mask = 
        }
    };
    SearchResultPopupView.prototype.removeTween = function () {
        if (this.container) {
            egret.Tween.removeTweens(this.container);
            this.container.alpha = 1;
        }
        this.removeTouchTap();
        this.addTouchTap(this.hide, this);
    };
    SearchResultPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        var personValueLocalStr = Api.searchVoApi.getPersonValueLocalStr(this.getPersonId());
        var rewards = this.getRewards();
        if (rewards) {
            var l = rewards.length;
            for (var i = l - 1; i >= 0; i--) {
                if (!rewards[i].num) {
                    var itemCfg = Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId());
                    personValueLocalStr = null;
                    break;
                }
            }
        }
        if (personValueLocalStr) {
            var itemCfg = Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId());
            if (itemCfg.wifeId) {
                if (Api.wifeVoApi.getWifeInfoVoById(itemCfg.wifeId)) {
                    if (!this.checkGetWife()) {
                        return;
                    }
                }
            }
            var descContainer = new BaseDisplayObjectContainer();
            this.addChild(descContainer);
            var descBg = BaseBitmap.create("public_lockbg"); //public_tc_bg02   487  47
            descBg.scaleX = 487 / 223;
            descBg.scaleY = 47 / 38;
            descBg.x = 8; //GameConfig.stageWidth/2 - descBg.width/2;
            descBg.y = 20; //this.viewBg.y + this.viewBg.height + 30;
            descContainer.addChild(descBg);
            var descTxt = ComponentManager.getTextField(personValueLocalStr, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            descTxt.x = descBg.width * descBg.scaleX / 2 - descTxt.width / 2;
            descTxt.y = descBg.y + descBg.height * descBg.scaleY / 2 - descTxt.height / 2;
            descContainer.addChild(descTxt);
            descContainer.x = GameConfig.stageWidth / 2 - descContainer.width / 2;
            descContainer.y = this.viewBg.y + this.viewBg.height + 30;
            descContainer.alpha = 0;
            egret.Tween.get(descContainer, { loop: false }).wait(1000).to({ alpha: 1 }, 500);
        }
    };
    SearchResultPopupView.prototype.checkSpaceBuild = function () {
        var buildId = null;
        var rewards = this.getRewards();
        if (rewards) {
            var l = rewards.length;
            for (var i = l - 1; i >= 0; i--) {
                if (!rewards[i].num) {
                    var itemCfg = Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId());
                    buildId = itemCfg.build;
                    break;
                }
            }
        }
        return buildId;
    };
    SearchResultPopupView.prototype.checkGetWife = function () {
        var rewards = this.getRewards();
        if (!rewards) {
            var itemCfg = Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId());
            if (itemCfg.type == 2) {
                if (Api.searchVoApi.getWifeValueById(this.getPersonId()) >= itemCfg.value) {
                    //得到红颜
                    if (itemCfg.wifeId) {
                        return itemCfg.wifeId;
                    }
                }
            }
        }
        return null;
    };
    SearchResultPopupView.prototype.checkGetServant = function () {
        var rewards = this.getRewards();
        if (!rewards) {
            var itemCfg = Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId());
            if (itemCfg.type == 2) {
                if (Api.searchVoApi.getWifeValueById(this.getPersonId()) >= itemCfg.value) {
                    //得到红颜
                    if (itemCfg.servantId) {
                        return itemCfg.servantId;
                    }
                }
            }
        }
        return null;
    };
    SearchResultPopupView.prototype.hide = function () {
        // let wifeId=this.checkGetWife();
        // if(wifeId)
        // {
        // 	ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW,wifeId);
        // }
        var rData = Api.wifeVoApi.getWaitShowWife();
        if (rData) {
            ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW, { wifeIdList: rData.unlockWife, servantId: rData.unlockServant });
        }
        var rData2 = Api.servantVoApi.getWaitShowData();
        if (rData2) {
            var servantCfg = GameConfig.config.servantCfg[rData2.unlockServant];
            if (servantCfg && servantCfg.getStoryID) {
                ViewController.getInstance().openView(ViewConst.COMMON.SEARCHSTORYVIEW, { storyId: servantCfg.getStoryID, callback: function (unlockServant) {
                        ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW, unlockServant);
                    }, target: this, params: rData2.unlockServant });
            }
            else {
                ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW, rData2.unlockServant);
            }
        }
        //手动调用体力限时礼包强弹
        Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.POWER_EMPTY);
        Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.POWER_EMPTY2);
        _super.prototype.hide.call(this);
    };
    SearchResultPopupView.prototype.showRewards = function () {
        var ths = this;
        var rewards = ths.getRewards();
        if (!rewards) {
            return;
        }
        var l = rewards.length;
        for (var i = l - 1; i >= 0; i--) {
            if (!rewards[i].num) {
                rewards.splice(i, 1);
            }
        }
        var timeNum = egret.setTimeout(function () {
            if (rewards && rewards.length > 0) {
                App.CommonUtil.playRewardFlyAction(rewards);
            }
            if (timeNum) {
                egret.clearTimeout(timeNum);
                timeNum = NaN;
            }
        }, this, 300);
    };
    SearchResultPopupView.prototype.getShowHeight = function () {
        return 490;
    };
    SearchResultPopupView.prototype.getBgExtraHeight = function () {
        return 0;
    };
    SearchResultPopupView.prototype.getPersonId = function () {
        return this.param.data.personId;
        // return "31"
    };
    SearchResultPopupView.prototype.getRewards = function () {
        if (this.param.data.rewards) {
            return GameData.formatRewardItem(this.param.data.rewards);
        }
        return null;
    };
    SearchResultPopupView.prototype.getTitleStr = function () {
        var buildId = Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId()).build;
        return "searchBuild" + buildId;
    };
    SearchResultPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    SearchResultPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return SearchResultPopupView;
}(PopupView));
__reflect(SearchResultPopupView.prototype, "SearchResultPopupView");
