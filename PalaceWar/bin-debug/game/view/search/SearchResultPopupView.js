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
var SearchResultPopupView = /** @class */ (function (_super) {
    __extends(SearchResultPopupView, _super);
    function SearchResultPopupView() {
        var _this = _super.call(this) || this;
        _this._isDoubleFly = false;
        _this._bg = null;
        return _this;
    }
    // protected isShowOpenAni():boolean
    // {
    // 	return false;
    // }
    SearchResultPopupView.prototype.getResourceList = function () {
        var resArr = ["progress3", "progress3_bg", "searchbottombg", "progress3_bg", "progress3"];
        var buildId = Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId()).build;
        resArr.push("searchnpcbg" + buildId);
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    SearchResultPopupView.prototype.checkBoneName = function (name) {
        if (this._isDoubleFly) {
            return name + "_1";
        }
        return name;
    };
    SearchResultPopupView.prototype.initView = function () {
        var spaceBuild = this.checkSpaceBuild();
        var itemCfg = Config.SearchCfg.getPersonItemCfgByPersonId(this.getPersonId());
        var buildId = itemCfg.build;
        var bg = BaseBitmap.create("searchnpcbg" + buildId);
        this.addChildToContainer(bg);
        this._bg = bg;
        bg.setPosition(App.CommonUtil.getCenterX(this.viewBg, bg, true), 0);
        var word = LanguageManager.getlocal("searchPersonTalk" + this.getPersonId());
        // itemCfg.wifeId = "246";
        if (!spaceBuild) {
            if (Api.switchVoApi.checkOpenNewSound()) {
                var sound = '';
                //是红颜
                if (itemCfg.wifeId) {
                    var wifeinfovo = Api.wifeVoApi.getWifeInfoVoById(itemCfg.wifeId);
                    if (wifeinfovo) {
                        var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeinfovo.id);
                        if (wifeSkinVo && wifeSkinVo.equip != "") {
                            var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
                            sound = skinCfg.sound;
                            word = skinCfg.words;
                        }
                        else {
                            sound = wifeinfovo.sound;
                            word = wifeinfovo.words;
                        }
                    }
                    else {
                        //未迎娶
                        sound = itemCfg.sound;
                        word = itemCfg.words;
                    }
                }
                else if (itemCfg.servantId) {
                    var servantcfg = Config.ServantCfg.getServantItemById(itemCfg.servantId);
                    if (servantcfg) {
                        sound = servantcfg.sound;
                        word = servantcfg.words;
                    }
                }
                else if (itemCfg.personId) {
                    sound = itemCfg.sound;
                    word = itemCfg.words;
                }
                if (sound != '') {
                    this.playEffect(sound, true);
                }
            }
            var iconKey = itemCfg.personFullIcon;
            var icon = BaseLoadBitmap.create(iconKey);
            var size = itemCfg.fullIconSize;
            if (itemCfg.wifeId) {
                icon.setScale(340 / size.width);
                icon.setPosition((this.viewBg.width - 330) / 2, bg.y + bg.height - size.height * icon.scaleY + 10);
                this.checkDro(itemCfg.wifeId, icon);
            }
            else {
                icon.setScale(390 / size.width);
                icon.setPosition((this.viewBg.width - 360) / 2, bg.y + bg.height - size.height * icon.scaleY);
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
            // var shp:egret.Shape = new egret.Shape();
            // shp.graphics.beginFill( 0xff0000, 1);
            // shp.graphics.drawRect(0,0,bg.width,bg.height);
            // shp.graphics.endFill();
            // shp.x = bg.x;
            // shp.y = bg.y;		
            // this.addChildToContainer(shp);
            // icon.mask = shp;
            var nameBg = BaseBitmap.create("public_infobg2");
            nameBg.setPosition(100, 30);
            this.addChildToContainer(nameBg);
            var fontSize = 30;
            var nameTxt = ComponentManager.getTextField(itemCfg.name, fontSize);
            if (PlatformManager.checkIsTextHorizontal()) {
                nameTxt.setPosition(bg.x + bg.width / 2 - nameTxt.width / 2, 2 * bg.height / 3 + 20);
                nameBg.width = nameTxt.width + 20;
                nameBg.setPosition(nameTxt.x + nameTxt.width / 2 - nameBg.width / 2 - 5, nameTxt.y + nameTxt.height / 2 - nameBg.height / 2);
            }
            else {
                nameTxt.width = fontSize + 2;
                var pos = App.CommonUtil.getCenterPos(nameBg, nameTxt, false);
                nameTxt.setPosition(pos.x + 4, pos.y - 3);
            }
            this.addChildToContainer(nameTxt);
        }
        var buttomBg = BaseBitmap.create("searchbottombg");
        buttomBg.width = bg.width;
        buttomBg.height = 78;
        buttomBg.setPosition(bg.x, bg.y + bg.height);
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
                talkStr = word;
            }
        }
        var descTxt = ComponentManager.getTextField(talkStr, 18);
        descTxt.width = buttomBg.width - 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, descTxt, buttomBg, [10, 0]);
        this.addChildToContainer(descTxt);
        if (itemCfg.wifeId && itemCfg.value) {
            // let buttomBg1:BaseBitmap;
            // for(var i:number=0;i<2;i++)
            // {
            // 	buttomBg1=BaseBitmap.create("public_9_bg20");
            // 	buttomBg1.width=bg.width;
            // 	buttomBg1.height=30;
            // 	buttomBg1.setPosition(buttomBg.x,buttomBg.y+buttomBg.height);
            // 	this.addChildToContainer(buttomBg1);
            // }
            if (!this.checkGetWife()) {
                // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descTxt, buttomBg, [10,10]);
                // let prograssBar=ComponentManager.getProgressBar("progress3","progress3_bg",505);
                // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, prograssBar, buttomBg, [0,10]);
                // this.addChildToContainer(prograssBar);
                // let lastValue:number=Math.max(0,Api.searchVoApi.getWifeValueById(this.getPersonId()));
                // let tmpValue=lastValue/itemCfg.value;
                // prograssBar.setPercentage(tmpValue,lastValue+"/"+itemCfg.value);
            }
            else {
                // prograssBar.setPercentage(value,Api.searchVoApi.getWifeValueById(this.getPersonId())+"/"+itemCfg.value);
            }
        }
        this.showRewards();
        this.addTouchTap(this.removeTween, this);
        // this.container.alpha=0;
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
        this._isDoubleFly = (wifeId == "236");
        if (0) //Api.wifeSkinVoApi.isHaveSkin(wifeId)
         {
            var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeId);
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
                    wifeIcon.visible = false;
                }
            }
        }
        else {
            var bonename = wifeCfg.bone;
            if (this._isDoubleFly) {
                bonename = bonename + "_1";
            }
            if (Api.wifeVoApi.isHaveBone(bonename + "_ske")) {
                droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(bonename);
                this.container.addChildAt(droWifeIcon, bg2Index);
                wifeIcon.visible = false;
            }
        }
        if (droWifeIcon) {
            // var shp:egret.Shape = new egret.Shape();
            // shp.graphics.beginFill( 0xff0000, 1);
            // shp.graphics.drawRect(0,0,this._bg.width,this._bg.height);
            // shp.graphics.endFill();
            // shp.x = this._bg.x;
            // shp.y = this._bg.y;		
            // this.addChildToContainer(shp);
            // droWifeIcon.mask = shp;
            droWifeIcon.setScale(0.7);
            droWifeIcon.x = wifeIcon.x + 180;
            droWifeIcon.y = wifeIcon.y + 760 * 0.7 - 80;
            if (wifeId == "212") {
                droWifeIcon.y = wifeIcon.y + 760 * 0.7 - 70;
            }
            else if (wifeId == "246") {
                droWifeIcon.setScale(0.60);
                droWifeIcon.x = wifeIcon.x + 200;
                droWifeIcon.y = wifeIcon.y + 760 * 0.6;
            }
            wifeIcon.visible = false;
            if (this._isDoubleFly) {
                var twoName = this.getDoubleFlyBoneByName(droWifeIcon.getBoneName());
                if (Api.wifeVoApi.isHaveBone(twoName + "_ske")) {
                    var droWifeIcon2 = App.DragonBonesUtil.getLoadDragonBones(twoName);
                    this.container.addChildAt(droWifeIcon2, this.container.getChildIndex(droWifeIcon));
                    this.removeChildFromContainer(droWifeIcon);
                    this.addChildToContainer(droWifeIcon);
                    droWifeIcon2.setScale(droWifeIcon.scaleX);
                    droWifeIcon2.x = droWifeIcon.x;
                    droWifeIcon2.y = droWifeIcon.y;
                }
            }
        }
        else {
            wifeIcon.visible = true;
        }
    };
    SearchResultPopupView.prototype.getDoubleFlyBoneByName = function (name) {
        if (this._isDoubleFly) {
            var doubleName = name.substr(0, name.length - 1) + "2";
            return doubleName;
        }
        return name;
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
            var descBg = BaseBitmap.create("public_searchdescbg");
            // descBg.x = GameConfig.stageWidth/2 - descBg.width/2;
            // descBg.y = this.viewBg.y + this.viewBg.height + 30;
            descContainer.addChild(descBg);
            descBg.x = GameConfig.stageWidth / 2 - descBg.width / 2;
            var descTxt = ComponentManager.getTextField(personValueLocalStr, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
            descTxt.x = GameConfig.stageWidth / 2 - descTxt.width / 2;
            descTxt.y = descBg.y + descBg.height / 2 - descTxt.height / 2;
            descContainer.addChild(descTxt);
            // descContainer.x = GameConfig.stageWidth/2 - descContainer.width/2;
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
    SearchResultPopupView.prototype.hide = function () {
        // let wifeId=this.checkGetWife();
        // if(wifeId)
        // {
        // 	ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW,wifeId);
        // }
        if (Api.biographyVoApi.showInfo) {
            ViewController.getInstance().openView(ViewConst.COMMON.BIOGRAPHYSHOWVIEW, {});
        }
        else {
            var rData = Api.wifeVoApi.getWaitShowWife();
            if (rData) {
                // ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW,{wifeIdList:rData.unlockWife,servantId:rData.unlockServant});
                Api.verifySpecialReward(rData.unlockWife, false);
                Api.verifySpecialReward(rData.unlockServant, true);
                Api.openSpecialView();
            }
        }
        //手动调用体力限时礼包强弹
        // Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.POWER_EMPTY);
        Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap2.POWER);
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
    SearchResultPopupView.prototype.getBgExtraHeight = function () {
        return 0;
    };
    SearchResultPopupView.prototype.getPersonId = function () {
        return this.param.data.personId;
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
//# sourceMappingURL=SearchResultPopupView.js.map