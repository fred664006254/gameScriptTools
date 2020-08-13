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
 * 册封Item
 * author dky
 * date 2018/4/24
 * @class WifestatusScrollItem
 */
var WifestatusScrollItem = (function (_super) {
    __extends(WifestatusScrollItem, _super);
    function WifestatusScrollItem() {
        var _this = _super.call(this) || this;
        _this.itemListType = false;
        _this.touchNum = 0;
        return _this;
    }
    WifestatusScrollItem.prototype.initItem = function (index, data) {
        this.width = 616;
        // this.height = 200 + this.getSpaceY();
        var wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
        this._data = data;
        var id = data.id;
        var bgImg = "wifestatus_itembg2";
        if (Number(id) <= Number(wifestatusVo.level) || id == "2") {
            bgImg = "wifestatus_itembg";
            // this.showIcons(index,data);
        }
        else {
            // this.showUnlock(index,data);
        }
        this._bgBB = BaseBitmap.create(bgImg);
        // this._bgBB.width = this.width;
        this._bgBB.height = 162;
        this.addChild(this._bgBB);
        //解锁动画
        if (data.id == WifestatusView.unlockLevel) {
            this._bgBB2 = BaseBitmap.create("wifestatus_itembg3");
            this._bgBB2.height = 135;
            this.addChild(this._bgBB2);
            this._lock1 = BaseBitmap.create("wifestatus_yun1");
            this._lock1.x = 0;
            this.addChild(this._lock1);
            this._lock2 = BaseBitmap.create("wifestatus_yun2");
            // this._lock2.skewY = 180;
            this._lock2.x = 348;
            this.addChild(this._lock2);
        }
        // if (this.itemListType|| index < 3) {
        // 	if(WifestatusView.currNum ==index || index < 3)
        // 	{
        // 		this.touchNum+=1;
        // 		this.showDes(index,data);
        // 	}
        // }
        // else {
        // 	// this.closeDes();
        // 	this._bgBB.height = 130;
        // }
        var titleSte = "wifestatus_title" + id;
        if (Api.switchVoApi.checkIsInBlueWife()) {
            titleSte = "wifestatus_title" + id + "_blueType";
        }
        this._titleBB = BaseLoadBitmap.create(titleSte);
        this._titleBB.x = 40;
        this._titleBB.y = this._bgBB.y - 10;
        this.addChild(this._titleBB);
        if (Number(id) <= Number(wifestatusVo.level) || id == "2") {
            this.showIcons(index, data);
        }
        else {
            this.showUnlock(index, data);
            App.DisplayUtil.changeToGray(this._titleBB);
        }
        if (data.id == WifestatusView.unlockLevel) {
            App.DisplayUtil.changeToGray(this._titleBB);
        }
        // let line1 = BaseBitmap.create("public_line3");
        // line1.width = this.width - 150;
        // line1.x = this.width/2 - line1.width/2;
        // line1.y = 60;
        // this.addChild(line1);
        var numStr = LanguageManager.getlocal("wifeStatusCurWifeNum") + Api.wifestatusVoApi.getWifesNumByLevel(data.id) + "/" + data.maxNum;
        ;
        if (data.id == "1") {
            numStr = LanguageManager.getlocal("wifeStatusCurWifeNum") + Api.wifestatusVoApi.getNoStatusWife().length;
        }
        var numTF = ComponentManager.getTextField(numStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        numTF.textColor = TextFieldConst.COLOR_BROWN_NEW;
        numTF.x = 30;
        numTF.y = 60;
        this.addChild(numTF);
        if (data.id == "1") {
            var rewardTitleTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeStatusReward") + ": " + LanguageManager.getlocal("nothing"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
            rewardTitleTF.textColor = TextFieldConst.COLOR_BROWN_NEW;
            // rewardTitleTF.x = this.width/2 - rewardTitleTF.width/2;
            rewardTitleTF.x = 30;
            rewardTitleTF.y = this.height - 42;
            this.addChild(rewardTitleTF);
        }
        else {
            var unluckTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeStatusNeed"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            unluckTF.textColor = TextFieldConst.COLOR_BROWN_NEW;
            unluckTF.x = 30;
            unluckTF.y = this.height - 42;
            this.addChild(unluckTF);
            var intimacyIcon = BaseBitmap.create("wifeview_vigoricon");
            intimacyIcon.x = unluckTF.x + unluckTF.width + 5;
            intimacyIcon.y = unluckTF.y - 3;
            intimacyIcon.setScale(0.67);
            this.addChild(intimacyIcon);
            var intimacyTF = ComponentManager.getTextField(data.needIntimacy, TextFieldConst.FONTSIZE_CONTENT_COMMON);
            intimacyTF.textColor = TextFieldConst.COLOR_BROWN_NEW;
            intimacyTF.x = intimacyIcon.x + intimacyIcon.width * 0.67 + 5;
            intimacyTF.y = unluckTF.y;
            this.addChild(intimacyTF);
            var meiliIcon = BaseBitmap.create("wifeview_charmicon");
            meiliIcon.x = intimacyTF.x + intimacyTF.width + 5;
            meiliIcon.y = intimacyIcon.y;
            meiliIcon.setScale(0.67);
            this.addChild(meiliIcon);
            var glamourTF = ComponentManager.getTextField(data.needGlamour, TextFieldConst.FONTSIZE_CONTENT_COMMON);
            glamourTF.textColor = TextFieldConst.COLOR_BROWN_NEW;
            glamourTF.x = meiliIcon.x + meiliIcon.width * 0.67 + 5;
            glamourTF.y = unluckTF.y;
            this.addChild(glamourTF);
            var rewardTitleTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeStatusReward"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
            rewardTitleTF.textColor = TextFieldConst.COLOR_BROWN_NEW;
            rewardTitleTF.x = this.width - rewardTitleTF.width - 95;
            rewardTitleTF.y = unluckTF.y;
            this.addChild(rewardTitleTF);
            var add1Icon = BaseBitmap.create("wifestatus_icon");
            add1Icon.x = rewardTitleTF.x + rewardTitleTF.width + 5;
            add1Icon.setScale(0.67);
            add1Icon.y = rewardTitleTF.y - 3;
            this.addChild(add1Icon);
            var rewardTF = ComponentManager.getTextField(data.getStar, TextFieldConst.FONTSIZE_CONTENT_COMMON);
            rewardTF.textColor = TextFieldConst.COLOR_BROWN_NEW;
            rewardTF.x = add1Icon.x + add1Icon.width * 0.67 + 5;
            rewardTF.y = unluckTF.y;
            this.addChild(rewardTF);
        }
        if (Number(id) <= Number(wifestatusVo.level) || id == "2") {
            // this.showIcons(index,data);
        }
        else {
            // this.showUnlock(index,data);
            // App.DisplayUtil.changeToGray(this._titleBB);
            this._lock1 = BaseBitmap.create("wifestatus_yun1");
            this._lock1.x = 0;
            this._lock1.y = 100;
            this.addChild(this._lock1);
            this._lock2 = BaseBitmap.create("wifestatus_yun2");
            // this._lock2.skewY = 180;
            this._lock2.x = 348;
            this.addChild(this._lock2);
        }
        // this.cacheAsBitmap=true;
        // this.showUnlockAni();
    };
    WifestatusScrollItem.prototype.showUnlock = function (index, data) {
        var container = new BaseDisplayObjectContainer();
        this._bgBB.height = 180;
        var lock1TF = ComponentManager.getTextField(LanguageManager.getlocal("wifeStatusUnlock1"), TextFieldConst.FONTSIZE_TITLE_SMALL);
        // lock1TF.textColor = TextFieldConst.COLOR_WARN_RED3;
        lock1TF.x = 0;
        container.addChild(lock1TF);
        if (PlatformManager.checkIsJPSp() || PlatformManager.checkIsKRSp() || PlatformManager.checkIsKRNewSp()) {
            lock1TF.visible = false;
        }
        var add1Icon = BaseBitmap.create("wifestatus_icon");
        add1Icon.x = lock1TF.x + lock1TF.width + 3;
        add1Icon.y = 0;
        container.addChild(add1Icon);
        lock1TF.y = container.height / 2 - lock1TF.height / 2;
        var lock2TF = ComponentManager.getTextField(LanguageManager.getlocal("wifeStatusUnlock2", [data.needStar]), TextFieldConst.FONTSIZE_TITLE_SMALL);
        // lock2TF.textColor = TextFieldConst.COLOR_WARN_RED3;
        lock2TF.x = add1Icon.x + add1Icon.width + 3;
        lock2TF.y = lock1TF.y;
        container.addChild(lock2TF);
        this.addChild(container);
        container.x = this.width / 2 - container.width / 2;
        container.y = 90;
    };
    WifestatusScrollItem.prototype.showIcons = function (index, data) {
        var itemBB = BaseBitmap.create("wifestatus_itembg_9");
        itemBB.width = this.width - 30;
        itemBB.height = 130;
        itemBB.x = 17;
        itemBB.y = 88;
        this.addChild(itemBB);
        var statusContanier = new BaseDisplayObjectContainer();
        var wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
        for (var index = 0; index < Api.wifestatusVoApi.getWifesNumByLevel(data.id); index++) {
            var wifeId = Api.wifestatusVoApi.getWifestatusVo().info[data.id][index];
            var wifeIcon = this.getWifestatusIcon(data, wifeId);
            // wifeIcon.setScale(0.6)
            wifeIcon.x = (wifeIcon.width + 20) * index;
            var num = index % 4;
            wifeIcon.x = 10 * (num + 1) + wifeIcon.width * num - 10;
            wifeIcon.y = (wifeIcon.height + 5) * (Math.floor((index) / 4));
            statusContanier.addChild(wifeIcon);
        }
        if (data.id == "1") {
            for (var index = 0; index < Api.wifestatusVoApi.getNoStatusWife().length; index++) {
                var element = Api.wifestatusVoApi.getNoStatusWife()[index];
                var wifeIcon = this.getWifestatusIcon(data, element);
                // wifeIcon.setScale(0.6)
                wifeIcon.x = (wifeIcon.width + 20) * index;
                var num = index % 4;
                wifeIcon.x = 10 * (num + 1) + wifeIcon.width * num - 10;
                wifeIcon.y = (wifeIcon.height + 5) * (Math.floor((index) / 4));
                statusContanier.addChild(wifeIcon);
            }
        }
        this.addChild(statusContanier);
        statusContanier.x = this.width / 2 - statusContanier.width / 2;
        statusContanier.y = 90;
        var wifenum = Api.wifestatusVoApi.getWifesNumByLevel(data.id);
        var addH = 150 * (Math.ceil((wifenum) / 4));
        if (data.id == "1") {
            var num_1 = Api.wifestatusVoApi.getNoStatusWife().length;
            addH = 150 * (Math.ceil((num_1) / 4));
        }
        if (!addH) {
            addH = 0;
            itemBB.visible = false;
        }
        itemBB.height = addH;
        this._bgBB.height = 135 + addH;
    };
    WifestatusScrollItem.prototype.getWifestatusIcon = function (data, wifeId) {
        var iconContainer = new BaseDisplayObjectContainer();
        iconContainer.width = 125;
        var iconBg = BaseBitmap.create("wifestatus_headbg");
        // nameBg.width = this.width;
        iconBg.name = "bg2";
        iconContainer.addChild(iconBg);
        // let iconStr = "wifestatus_headnull";
        // if(data.id == "1"){
        var iconStr = Api.wifeVoApi.getWifeIcon(wifeId);
        // }
        var icon = BaseLoadBitmap.create(iconStr);
        // let icon = BaseBitmap.create(iconStr);
        // icon.setScale(0.5);
        // icon.mask = egret.Rectangle.create().setTo(0,0,userContainer.width,500);
        // var circle:egret.Shape = new egret.Shape();
        // circle.graphics.beginFill(0x0000ff);
        // circle.graphics.drawCircle(55,44,44);
        // circle.graphics.endFill();
        // iconContainer.addChild(circle);
        icon.setPosition(10, 8);
        // let iconMask = BaseBitmap.create("wifestatus_headmask");
        // iconMask.setPosition(5,5)
        // iconContainer.addChild(iconMask);
        // icon.mask = iconMask;
        // if(data.id == "1"){
        icon.setScale(0.52);
        // }
        iconContainer.cacheAsBitmap = true;
        iconContainer.addChild(icon);
        iconContainer.addTouchTap(this.clickItemHandler, this, [wifeId]);
        var nameBg = BaseBitmap.create("wifestatus_namebg");
        nameBg.setPosition(iconContainer.width / 2 - nameBg.width / 2, 105);
        iconContainer.addChild(nameBg);
        nameBg.visible = false;
        var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var nameTF = ComponentManager.getTextField(wifeCfg.name, 18);
        // nameTF.textColor = TextFieldConst.COLOR_BROWN_NEW;
        nameTF.x = nameBg.x + nameBg.width / 2 - nameTF.width / 2;
        nameTF.y = nameBg.y + nameBg.height / 2 - nameTF.height / 2 + 3;
        iconContainer.addChild(nameTF);
        if (Api.wifestatusVoApi.getIsConferById(wifeId)) {
            var redDotSp = BaseBitmap.create("public_dot2");
            redDotSp.x = 100;
            redDotSp.y = 10;
            iconContainer.addChild(redDotSp);
        }
        return iconContainer;
    };
    WifestatusScrollItem.prototype.clickItemHandler = function (event, wifeId) {
        // let index: number = Number(event.data);
        // let achList = Api.achievementVoApi.getAchievementInfoVoList();
        // let achVo = achList[index]
        ViewController.getInstance().openView(ViewConst.POPUP.WIFESTATUSWIFEPOPUPVIEW, { wifeId: wifeId, level: this._data.id });
    };
    WifestatusScrollItem.prototype.showUnlockAni = function () {
        if (!this._lock1) {
            return;
        }
        // let contanier = new BaseDisplayObjectContainer();
        // let upgradeClip = ComponentManager.getCustomMovieClip("wifestatus_unluck",11,150);
        // // let upgradeClip = ComponentManager.getCustomMovieClip("wifestatus_frame",5,100);
        // contanier.addChild(upgradeClip);
        // upgradeClip.setScale(2);
        // upgradeClip.x = -27;
        // upgradeClip.y = -40;
        // this.addChildAt(contanier,10);
        // upgradeClip.playWithTime(1);
        // let upgradeClip2 = ComponentManager.getCustomMovieClip("wifestatus_unluck",11,150);
        // // let upgradeClip = ComponentManager.getCustomMovieClip("wifestatus_frame",5,100);
        // contanier.addChild(upgradeClip2);
        // upgradeClip2.skewY = 180
        // upgradeClip2.setScale(2);
        // upgradeClip2.x = 627;
        // upgradeClip2.y = -40;
        // upgradeClip2.playWithTime(1);
        // this.removeChild(this._lock1);
        // this.removeChild(this._lock2);
        egret.Tween.get(this._bgBB2)
            .wait(500).to({ alpha: 0 }, 300);
        // let text1 = BaseBitmap.create("wifestatus_itemeffect");
        // // text1.setScale(2)
        // text1.x = -7;
        // text1.y = -4;
        // text1.alpha = 0;
        // contanier.addChild(text1);
        App.DisplayUtil.changeToNormal(this._titleBB);
        // egret.Tween.get(text1)
        // // .to({y:-80},1000)
        // .to({alpha:1},800).to({alpha:0},800)
        // .call(function(tf:BaseDisplayObjectContainer){
        // 	egret.Tween.removeTweens(tf);
        // 	// self._tfPool.push(tf);
        // 	if(tf.parent){
        // 		tf.parent.removeChild(tf);
        // 	}
        // 	App.DisplayUtil.changeToNormal(this._titleBB);
        // },this,[contanier])
        // this.visible = false;
        egret.Tween.get(this._lock1)
            .to({ x: this._lock1.x - 280 }, 1000);
        egret.Tween.get(this._lock2)
            .to({ x: this._lock2.x + 280 }, 1000);
        WifestatusView.unlockLevel = null;
    };
    WifestatusScrollItem.prototype.refreshData = function (index) {
        // let achList = Api.achievementVoApi.getAchievementInfoVoList();
        // let achInfoVo = achList[index];
        // let achInfoVo = Api.achievementVoApi.getAchievementInfoVoById(this._achInfo.id);
        // let achCfg = Config.AchievementCfg.getAchievementCfgById(achInfoVo.id);
        // let curValue = achCfg.value[Api.achievementVoApi.getAchProById(achInfoVo.id)];
        // let achProStr = achInfoVo.v + "/" + curValue;
        // this._achProTF.text = achProStr;
    };
    WifestatusScrollItem.prototype.getSpaceY = function () {
        return 0;
    };
    WifestatusScrollItem.prototype.dispose = function () {
        this._achProTF = null;
        //册封图片
        // this._achIcon = null;
        //册封标题
        this._getBtn = null;
        // 状态图片
        this._stateIcon = null;
        this._data = null;
        // this.cacheAsBitmap=false;
        this._bgBB2 = null;
        this._lock1 = null;
        this._lock2 = null;
        _super.prototype.dispose.call(this);
    };
    return WifestatusScrollItem;
}(ScrollListItem));
__reflect(WifestatusScrollItem.prototype, "WifestatusScrollItem");
