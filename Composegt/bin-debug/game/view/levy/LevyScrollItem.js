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
var LevyScrollItem = (function (_super) {
    __extends(LevyScrollItem, _super);
    function LevyScrollItem() {
        var _this = _super.call(this) || this;
        //场景
        _this._contentBg = null;
        //锁
        _this._lockBm = null;
        _this._progress = null;
        _this._starList = [];
        return _this;
    }
    LevyScrollItem.prototype.initItem = function (index, data) {
        this._index = index;
        var itemBg = BaseBitmap.create("levy_itembg");
        this.width = itemBg.width;
        this.height = itemBg.height;
        this.addChild(itemBg);
        var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("levy_levyitem_title" + index), 24, TextFieldConst.COLOR_TITLE_NAME);
        titleTxt.setPosition(this.width / 2 - titleTxt.width / 2, 5);
        this.addChild(titleTxt);
        var contentBg = BaseLoadBitmap.create("levy_itemcontentbg" + index, new egret.Rectangle(0, 0, 572, 166));
        contentBg.setPosition(this.width / 2 - contentBg.width / 2, 35.5);
        this.addChild(contentBg);
        this._contentBg = contentBg;
        var starBg = BaseBitmap.create("levy_starbg");
        starBg.setPosition(this.width / 2 - starBg.width / 2, 45);
        this.addChild(starBg);
        this.refreshItem();
    };
    LevyScrollItem.prototype.refreshItem = function () {
        var isUnlock = Api.levyVoApi.checkLevyItemUnlock(this._index);
        this.refreshStars(isUnlock);
        this.refreshProgressBar(isUnlock);
        this.refreshBottom(isUnlock);
        this.refreshLock(isUnlock);
    };
    LevyScrollItem.prototype.refreshLock = function (isUnlock) {
        if (isUnlock) {
            if (this._lockBm) {
                this._lockBm.visible = false;
            }
        }
        else {
            if (!this._lockBm) {
                var lockBm = BaseBitmap.create("levy_lock");
                lockBm.setPosition(this.width / 2 - lockBm.width / 2, this._contentBg.y + this._contentBg.height / 2 - lockBm.height / 2);
                this.addChild(lockBm);
                this._lockBm = lockBm;
            }
            this._lockBm.visible = !isUnlock;
        }
        var funcName = isUnlock ? "changeToNormal" : "changeToGray";
        App.DisplayUtil[funcName](this);
    };
    LevyScrollItem.prototype.getResIcons = function (index, rateName, rateNum) {
        var resbgPath = "public_hb_bg03";
        var diffX = 175;
        var resBg = null;
        if (this.getChildByName("resBg" + index)) {
            resBg = this.getChildByName("resBg" + index);
        }
        else {
            resBg = BaseBitmap.create(resbgPath);
            resBg.name = "resBg" + index;
            resBg.setPosition(60 + index * diffX, this._contentBg.y + this._contentBg.height - resBg.height - 10);
            this.addChild(resBg);
        }
        var resName;
        var resNum;
        var type;
        var interval = Config.LevyCfg.LevyItemList[this._index].interval;
        if (rateName == "grate") {
            resName = "public_icon2";
            type = "gold";
        }
        else if (rateName == "frate") {
            resName = "public_icon3";
            type = "food";
        }
        else if (rateName == "srate") {
            resName = "public_icon4";
            type = "soldier";
        }
        resNum = rateNum;
        var resIcon = null;
        if (this.getChildByName("resIcon" + index)) {
            resIcon = this.getChildByName("resIcon" + index);
        }
        else {
            resIcon = BaseBitmap.create(resName);
            resIcon.name = "resIcon" + index;
            resIcon.setPosition(resBg.x - 10, resBg.y - 10);
            this.addChild(resIcon);
        }
        var resColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        if (resNum < 0) {
            resColor = 0xff5a5a;
        }
        var resNumText = null;
        if (this.getChildByName("resNumText" + index)) {
            resNumText = this.getChildByName("resNumText" + index);
            resNumText.text = LanguageManager.getlocal("levy_addnum_withinterval", [App.StringUtil.changeIntToText3(resNum), interval]);
            resNumText.setColor(resColor);
        }
        else {
            resNumText = ComponentManager.getTextField(LanguageManager.getlocal("levy_addnum_withinterval", [App.StringUtil.changeIntToText3(resNum), interval]), 20, resColor);
            resNumText.name = "resNumText" + index;
            resNumText.setPosition(resBg.x + 45, resBg.y + (resBg.height - resNumText.height) / 2);
            this.addChild(resNumText);
        }
    };
    LevyScrollItem.prototype.refreshProgressBar = function (isUnlock) {
        if (this._progress) {
            this._progress.dispose();
            this._progress = null;
        }
        var rateObj = {};
        var itemRate = Api.levyVoApi.getLevyItemRate(this._index);
        var haveSpeed = false;
        if ((Math.abs(itemRate.frate) + Math.abs(itemRate.grate) + Math.abs(itemRate.srate)) > 0) {
            haveSpeed = true;
        }
        if (haveSpeed) {
            rateObj = itemRate;
            var progress = Api.levyVoApi.getLevyProgressBar(this._index);
            progress.x = 45;
            progress.y = this.height - progress.height - 50;
            this.addChild(progress);
            this._progress = progress;
        }
        else {
            var rateCfg = Config.LevyCfg.LevyItemList[this._index];
            rateObj.grate = rateCfg.gold || 0;
            rateObj.frate = rateCfg.food || 0;
            rateObj.srate = rateCfg.soldier || 0;
            if (isUnlock) {
                var progress = Api.levyVoApi.getLevyStopProgressBar();
                progress.x = 45;
                progress.y = this.height - progress.height - 45;
                this.addChild(progress);
                this._progress = progress;
            }
        }
        var index = 0;
        if (rateObj.grate) {
            this.getResIcons(index, "grate", rateObj["grate"]);
            index++;
        }
        if (rateObj.frate) {
            this.getResIcons(index, "frate", rateObj["frate"]);
            index++;
        }
        if (rateObj.srate) {
            this.getResIcons(index, "srate", rateObj["srate"]);
            index++;
        }
    };
    //初始化底部,进度条/解锁信息/派遣信息
    LevyScrollItem.prototype.refreshBottom = function (isUnlock) {
        if (isUnlock) {
            var infoBtn = null;
            if (this._index == 0) {
                infoBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "levy_scrollitem_btnname1", this.infoBtnHandle_first, this);
            }
            else {
                if (Api.levyVoApi.checkLevyItemIsLaunch(this._index)) {
                    infoBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE, "levy_scrollitem_btnname2", this.infoBtnHandle, this);
                }
                else {
                    infoBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "levy_scrollitem_btnname3", this.infoBtnHandle, this);
                    if (Api.levyVoApi.checkItemRedPoint(this._index)) {
                        App.CommonUtil.addIconToBDOC(infoBtn);
                    }
                }
            }
            this.addChild(infoBtn);
            infoBtn.setPosition(this.width - infoBtn.width - 30, this.height - infoBtn.height - 32);
        }
        else {
            var unlockPersonLv = Api.levyVoApi.getLevyUnlockList()[this._index];
            var lockTip = ComponentManager.getTextField(LanguageManager.getlocal("levy_locktip", [unlockPersonLv]), 26, TextFieldConst.COLOR_BROWN_NEW);
            this.addChild(lockTip);
            lockTip.setPosition(GameConfig.stageWidth / 2 - lockTip.width / 2, this.y + this.height - lockTip.height - 45);
        }
    };
    LevyScrollItem.prototype.refreshStars = function (isUnlock) {
        if (isUnlock) {
            var buffGroup = Config.LevyCfg.LevyItemList[this._index].buffGroup || {};
            var baseNum = Object.keys(buffGroup).length;
            var starNum = Api.levyVoApi.getBuffStarNum(this._index);
            var starSpace = 10;
            var startX = this.width / 2 - (baseNum * 50 + (baseNum - 1) * starSpace) / 2;
            for (var i = 0; i < baseNum; i++) {
                var starRes = "levy_star" + (i < starNum ? 2 : 1);
                if (this._starList && this._starList[i]) {
                    this._starList[i].setRes("starRes");
                }
                else {
                    var star = BaseBitmap.create(starRes);
                    star.setPosition(startX + i * (star.width + starSpace), 70);
                    this.addChild(star);
                    this._starList.push(star);
                }
            }
        }
    };
    LevyScrollItem.prototype.infoBtnHandle = function () {
        Api.rookieVoApi.checkNextStep();
        ViewController.getInstance().openView(ViewConst.COMPOSE.LEVYSCROLLITEMDETAILPOPUPVIEW, { index: this._index });
    };
    LevyScrollItem.prototype.infoBtnHandle_first = function () {
        ViewController.getInstance().openView(ViewConst.COMPOSE.LEVYSCROLLITEM1DETAILPOPUPVIEW);
    };
    LevyScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    LevyScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    LevyScrollItem.prototype.dispose = function () {
        this._contentBg = null;
        this._lockBm = null;
        if (this._progress) {
            egret.Tween.removeTweens(this._progress);
        }
        this._progress = null;
        this._starList = [];
        _super.prototype.dispose.call(this);
    };
    return LevyScrollItem;
}(ScrollListItem));
__reflect(LevyScrollItem.prototype, "LevyScrollItem");
