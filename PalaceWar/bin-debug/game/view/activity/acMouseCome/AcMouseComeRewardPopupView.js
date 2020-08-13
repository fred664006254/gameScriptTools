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
 * 鼠来如意 奖励
 */
var AcMouseComeRewardPopupView = (function (_super) {
    __extends(AcMouseComeRewardPopupView, _super);
    function AcMouseComeRewardPopupView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        _this._infoList = [];
        _this._scrollContainer = undefined;
        _this._fightBtn = null;
        _this._containerTab = [];
        _this._curShowIdx = 0;
        _this._scrollView = null;
        _this._oldSoldier = 0;
        _this._oldCid = 0;
        _this._oldKill = 0;
        return _this;
    }
    AcMouseComeRewardPopupView.prototype.getTitleStr = function () {
        return null;
    };
    // protected isShowOpenAni():boolean
    // {
    // 	return false;
    // }
    // 关闭按钮图标名称
    AcMouseComeRewardPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcMouseComeRewardPopupView.prototype.getBgName = function () {
        return null;
    };
    AcMouseComeRewardPopupView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcMouseComeRewardPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseComeRewardPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcMouseComeRewardPopupView.prototype.initView = function () {
        var _this = this;
        if (this.param.data && this.param.data.callback && this.param.data.obj) {
            this._obj = this.param.data.obj;
            this._callbackF = this.param.data.callback;
        }
        this._infoList = this.param.data.data;
        var bg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_rewardbg", this.getTypeCode()));
        this.addChildToContainer(bg);
        if (this._infoList.length > 1) {
            bg.height = GameConfig.stageHeigth - 100;
        }
        bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, GameConfig.stageHeigth / 2 - bg.height / 2);
        var titleTxt = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_rewardtxt", this.getTypeCode()));
        titleTxt.setPosition(bg.x + bg.width / 2 - titleTxt.width / 2, bg.y + 30);
        this.addChildToContainer(titleTxt);
        var enterTxt = ComponentManager.getTextField(LanguageManager.getlocal("confirmBtn"), 28, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChildToContainer(enterTxt);
        var enterTouch = BaseBitmap.create("public_alphabg");
        enterTouch.width = 200;
        enterTouch.height = 68;
        this.addChildToContainer(enterTouch);
        enterTouch.setPosition(bg.x + 198, bg.y + bg.height - 68);
        enterTxt.setPosition(enterTouch.x + enterTouch.width / 2 - enterTxt.width / 2, enterTouch.y + enterTouch.height / 2 - enterTxt.height / 2);
        enterTouch.addTouchTap(function () {
            _this.confirmClick();
        }, this);
        if (this._infoList.length <= 1) {
            var data = this._infoList[0];
            var rewardIconList = GameData.getRewardItemIcons(data.poolreward, true, true);
            var scale = 1;
            var item = rewardIconList[0];
            item.setPosition(bg.x + bg.width / 2 - item.width / 2, bg.y + 160);
            this.addChildToContainer(item);
            var line = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_rewardline", this.getTypeCode()));
            this.addChildToContainer(line);
            line.setPosition(bg.x + bg.width / 2 - line.width / 2, item.y + item.height + 15);
            var bigTipStr = App.CommonUtil.getCnByCode("acMouseComeRewardTip2", this.getTypeCode());
            var typeName = "";
            if (data.type) {
                bigTipStr = App.CommonUtil.getCnByCode("acMouseComeRewardTip1", this.getTypeCode());
                typeName = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeDetailPoolItemName" + data.type, this.getTypeCode()));
            }
            var bigTip = ComponentManager.getTextField(LanguageManager.getlocal(bigTipStr, [typeName]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            bigTip.setPosition(bg.x + bg.width / 2 - bigTip.width / 2, line.y + line.height + 15);
            if (!data.type) {
                bigTip.y = line.y + line.height + 40;
            }
            this.addChildToContainer(bigTip);
            bigTip.textAlign = TextFieldConst.ALIGH_CENTER;
            bigTip.lineSpacing = 5;
            if (data.bigreward) {
                var rewardIconList_1 = GameData.getRewardItemIcons(data.bigreward, true, true);
                var len = rewardIconList_1.length;
                var scale_1 = 0.7;
                var itemHeight = 108;
                var itemWidth = 108;
                var spaceX = 10;
                var spaceY = 10;
                var stX = bg.x + 56 + (480 - (itemWidth * scale_1 + spaceX) * len + spaceX) / 2;
                var stY = bigTip.y + bigTip.height + 20;
                for (var i = 0; i < len; i++) {
                    var rewardDB = rewardIconList_1[i];
                    rewardDB.setScale(scale_1);
                    rewardDB.setPosition(stX + (rewardDB.width * scale_1 + spaceX) * i, stY);
                    this.addChildToContainer(rewardDB);
                }
            }
        }
        else {
            //147 + 172 = 319
            this._scrollContainer = new BaseDisplayObjectContainer();
            this._scrollContainer.width = 480;
            var rect = new egret.Rectangle(0, 0, 480, bg.height - 172 - 147);
            this._scrollView = ComponentManager.getScrollView(this._scrollContainer, rect);
            this.addChildToContainer(this._scrollView);
            this._scrollView.horizontalScrollPolicy = "off";
            this._scrollView.setPosition(bg.x + 56, bg.y + 147);
            for (var i = 0; i < this._infoList.length; i++) {
                var c = this.getRewardInfoContainer(this._infoList[i], i + 1);
                this._containerTab.push(c);
            }
            this._scrollView.touchEnabled = false;
            this._scrollContainer.touchEnabled = false;
            this.showContainerAnim();
        }
    };
    AcMouseComeRewardPopupView.prototype.getContainerOffY = function (index) {
        var offY = 0;
        for (var i = 0; i < this._containerTab.length; i++) {
            if (i < index) {
                offY += this._containerTab[i].height;
            }
        }
        return offY;
    };
    AcMouseComeRewardPopupView.prototype.showContainerAnim = function () {
        if (this._containerTab.length > this._curShowIdx) {
            var tempContainer = this._containerTab[this._curShowIdx];
            this._scrollContainer.addChild(tempContainer);
            tempContainer.y = this.getContainerOffY(this._curShowIdx);
            this._scrollView.setScrollTop(this._scrollView.getMaxScrollTop(), 300);
            this._curShowIdx++;
            tempContainer.x = -tempContainer.width;
            egret.Tween.get(tempContainer).wait(100).to({ x: 0 }, 300);
            egret.Tween.get(this._scrollContainer).wait(700).call(this.showContainerAnim, this);
        }
        else {
            this._scrollView.touchEnabled = true;
            this._scrollContainer.touchEnabled = true;
        }
    };
    AcMouseComeRewardPopupView.prototype.getRewardInfoContainer = function (data, index) {
        var bgContainer = new BaseDisplayObjectContainer();
        bgContainer.width = 480;
        var bg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_rewarditembg", this.getTypeCode()));
        bg.width = 420;
        bg.setPosition(bgContainer.width / 2 - bg.width / 2, 0);
        bgContainer.addChild(bg);
        var titleBg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_rewardtitleinfobg", this.getTypeCode()));
        // titleBg.width = bg.width - 140;
        titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 10);
        bgContainer.addChild(titleBg);
        var title = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeRewardItemNum", this.getTypeCode()), ["" + index]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        title.setPosition(bg.x + bg.width / 2 - title.width / 2, titleBg.y + titleBg.height / 2 - title.height / 2);
        bgContainer.addChild(title);
        var rewardIconList = GameData.getRewardItemIcons(data.poolreward, true, true);
        var scale = 1;
        var item = rewardIconList[0];
        item.setPosition(bg.x + bg.width / 2 - item.width / 2, titleBg.y + titleBg.height + 10);
        bgContainer.addChild(item);
        var line = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_rewardline", this.getTypeCode()));
        bgContainer.addChild(line);
        line.setPosition(bg.x + bg.width / 2 - line.width / 2, item.y + item.height + 15);
        var bigTipStr = App.CommonUtil.getCnByCode("acMouseComeRewardTip2", this.getTypeCode());
        var typeName = "";
        if (data.type) {
            bigTipStr = App.CommonUtil.getCnByCode("acMouseComeRewardTip1", this.getTypeCode());
            typeName = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeDetailPoolItemName" + data.type, this.getTypeCode()));
        }
        var bigTip = ComponentManager.getTextField(LanguageManager.getlocal(bigTipStr, [typeName]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        bigTip.setPosition(bg.x + bg.width / 2 - bigTip.width / 2, line.y + line.height + 15);
        bgContainer.addChild(bigTip);
        bigTip.textAlign = TextFieldConst.ALIGH_CENTER;
        bigTip.lineSpacing = 5;
        if (data.bigreward) {
            var rewardIconList_2 = GameData.getRewardItemIcons(data.bigreward, true, true);
            var len = rewardIconList_2.length;
            var scale_2 = 0.7;
            var itemHeight = 108;
            var itemWidth = 108;
            var spaceX = 10;
            var spaceY = 10;
            var stX = bg.x + (bg.width - (itemWidth * scale_2 + spaceX) * len + spaceX) / 2;
            var stY = bigTip.y + bigTip.height + 20;
            for (var i = 0; i < len; i++) {
                var rewardDB = rewardIconList_2[i];
                rewardDB.setScale(scale_2);
                rewardDB.setPosition(stX + (rewardDB.width * scale_2 + spaceX) * i, stY);
                bgContainer.addChild(rewardDB);
            }
            bg.height = stY + itemHeight * scale_2 + 15;
        }
        else {
            bg.height = bigTip.y + bigTip.height + 20;
        }
        bgContainer.height = bg.height + 5;
        return bgContainer;
    };
    AcMouseComeRewardPopupView.prototype.confirmClick = function () {
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj, []);
        }
        this.hide();
    };
    AcMouseComeRewardPopupView.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        this._infoList.length = 0;
        if (this._scrollContainer) {
            egret.Tween.removeTweens(this._scrollContainer);
        }
        this._scrollContainer = undefined;
        this._containerTab.length = 0;
        this._curShowIdx = 0;
        this._scrollView = null;
        _super.prototype.dispose.call(this);
    };
    return AcMouseComeRewardPopupView;
}(PopupView));
__reflect(AcMouseComeRewardPopupView.prototype, "AcMouseComeRewardPopupView");
//# sourceMappingURL=AcMouseComeRewardPopupView.js.map