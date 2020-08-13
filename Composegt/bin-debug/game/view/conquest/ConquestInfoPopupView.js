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
 * 一键征战 纪录
 */
var ConquestInfoPopupView = (function (_super) {
    __extends(ConquestInfoPopupView, _super);
    function ConquestInfoPopupView() {
        var _this = _super.call(this) || this;
        _this.scrollView = null;
        _this._moveCountainer = null;
        _this.rewardArrList = [];
        _this.strArr = [];
        _this.iconArr = [];
        return _this;
    }
    ConquestInfoPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "battle_win_word",
            "fire_flake_json",
            "battle_win_light",
            "fire_flake",
        ]);
    };
    ConquestInfoPopupView.prototype.isShowMask = function () {
        return true;
    };
    ConquestInfoPopupView.prototype.getTitleStr = function () {
        return null;
    };
    ConquestInfoPopupView.prototype.initView = function () {
        this.viewBg.visible = false;
        var infoBg = BaseBitmap.create("public_9_wordbg");
        infoBg.height = 640;
        infoBg.setPosition(-20, 20);
        infoBg.width = 670;
        infoBg.height = 700;
        this.addChildToContainer(infoBg);
        //胜利背景光效
        var winLight = BaseBitmap.create("battle_win_light");
        winLight.scaleY = 0.5;
        winLight.setPosition(50, -10);
        this.addChildToContainer(winLight);
        winLight.alpha = 0;
        egret.Tween.get(winLight).wait(100).to({ alpha: 1 }, 100).wait(90).to({ alpha: 0 }, 10);
        //胜利文字大小
        var winBitmap = BaseBitmap.create("battle_win_word");
        winBitmap.setPosition(0, -100 - 70);
        this.addChildToContainer(winBitmap);
        winBitmap.scaleX = 2.5;
        winBitmap.scaleY = 2.5;
        egret.Tween.get(winBitmap).to({ x: 160, y: -40 - 70, scaleX: 0.9, scaleY: 0.9 }, 120).to({ x: 40, y: -40 - 70, scaleX: 1, scaleY: 1 }, 50);
        //粒子效果
        this._fire_lizi = App.ParticleUtil.getParticle("fire_flake");
        this._fire_lizi.y = -150;
        this.addChildToContainer(this._fire_lizi);
        this.showAnim();
        this._moveCountainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._moveCountainer);
        if (this.param && this.param.data) {
            // var str = "6_1030_1|6_1020_1|5_1_355|14_1004_10|15_1004_30|12_210_10|14_1001_20|12_208_7|15_1001_20|6_1219_1|6_1205_3|14_1005_10|6_1217_1|15_1003_40|12_101_3|6_1203_1|14_1003_20|15_1002_40|6_1208_3|14_1002_10|6_1202_2|6_1210_3|6_1204_2|6_1209_4|12_209_10|12_207_5|6_1207_2|6_1204_2|6_1209_4|12_209_10|12_207_5|6_1207_2|6_1204_2|6_1209_4|12_209_10|12_207_5|6_1207_2|6_1204_2|6_1209_4|12_209_10|12_207_5|6_1207_2|6_1204_2|6_1209_4|12_209_10|12_207_5|6_1207_2"
            var rewards = this.param.data.rewards;
        }
        else {
            return;
        }
        var titleFntSize = TextFieldConst.FONTSIZE_BUTTON_COMMON;
        var contentFntSize = TextFieldConst.FONTSIZE_CONTENT_COMMON;
        if (PlatformManager.checkIsViSp()) {
            titleFntSize = TextFieldConst.FONTSIZE_CONTENT_SMALL;
            contentFntSize = TextFieldConst.FONTSIZE_ACTIVITY_COMMON;
        }
        var _windesTxt = ComponentManager.getTextField("", titleFntSize, TextFieldConst.COLOR_WHITE);
        _windesTxt.text = LanguageManager.getlocal("conquestInfodes", [this.param.data.fightnum + ""]);
        // _windesTxt.setPosition(110,80);
        _windesTxt.x = this.viewBg.width / 2 - _windesTxt.width / 2;
        _windesTxt.y = 80;
        this.addChildToContainer(_windesTxt);
        var itemContainer = new BaseDisplayObjectContainer();
        var itemStringContainer = new BaseDisplayObjectContainer();
        this.rewardArrList = [];
        this.rewardArrList = GameData.formatRewardItem(rewards);
        this.rewardArrList.sort(function (a, b) {
            if (a.type > b.type)
                return 1;
            else if (a.type == b.type)
                return 0;
            return -1;
        });
        var l = this.rewardArrList.length;
        var scaleNum = 0.88;
        var newnum = 0;
        this.strArr = [];
        this.iconArr = [];
        if (this.param.data && this.param.data.batchpoint) {
            var str = LanguageManager.getlocal("conquestpointsdes", [this.param.data.batchpoint + ""]);
            this.strArr.push(str);
        }
        for (var i = 0; i < l; i++) {
            if (this.rewardArrList[i].type == 6) {
                this.iconArr.push(this.rewardArrList[i]);
            }
            else {
                //红颜
                if (this.rewardArrList[i].type == 12) {
                    var wifeCfg = Config.WifeCfg.getWifeCfgById(this.rewardArrList[i].id);
                    this.strArr.push(wifeCfg.name + this.rewardArrList[i].tipMessage);
                }
                else if (this.rewardArrList[i].type == 14 || this.rewardArrList[i].type == 15) {
                    var servantCfg = Config.ServantCfg.getServantItemById(this.rewardArrList[i].id);
                    this.strArr.push(servantCfg.name + this.rewardArrList[i].message);
                }
                else {
                    this.strArr.push(this.rewardArrList[i].name + this.rewardArrList[i].tipMessage);
                }
            }
        }
        //文字字段
        if (this.strArr.length > 0) {
            for (var j = 0; j < this.strArr.length; j++) {
                var _desTxt = ComponentManager.getTextField("0", contentFntSize, TextFieldConst.COLOR_WARN_GREEN2);
                _desTxt.text = this.strArr[j];
                var num = j % 2;
                if (PlatformManager.checkIsViSp()) {
                    _desTxt.setPosition(60 + (275) * num, (_desTxt.height + 20) * Math.floor(j / 2) - 20);
                }
                else {
                    _desTxt.setPosition(90 + (260) * num, (_desTxt.height + 20) * Math.floor(j / 2) - 20);
                }
                itemStringContainer.addChild(_desTxt);
            }
        }
        itemStringContainer.setPosition(0, -10);
        this._moveCountainer.addChild(itemStringContainer);
        this.iconArr.sort(function (a, b) {
            if (a.id > b.id)
                return 1;
            else if (a.id == b.id)
                return 0;
            return -1;
        });
        //icon 图标
        for (var i = 0; i < this.iconArr.length; i++) {
            var icon = GameData.getItemIcon(this.iconArr[i], true);
            var num = i % 4;
            icon.setPosition((icon.width + 5) * num, (icon.height + 20) * Math.floor(i / 4));
            icon.scaleX = scaleNum;
            icon.scaleY = scaleNum;
            itemContainer.addChild(icon);
            newnum = (icon.height + 20) * Math.floor(i / 5);
        }
        itemContainer.setPosition(80, itemStringContainer.y + 50 + itemStringContainer.height);
        this._moveCountainer.addChild(itemContainer);
        this._moveCountainer.y = _windesTxt.y;
        this._moveCountainer.height = this._moveCountainer.height + 100;
        var moveImage = BaseBitmap.create("public_9_bg28");
        moveImage.width = this._moveCountainer.width;
        moveImage.height = this._moveCountainer.height;
        moveImage.x = 80;
        moveImage.alpha = 0;
        this._moveCountainer.addChild(moveImage);
        this._moveCountainer.setChildIndex(moveImage, 0);
        this._moveCountainer.y = _windesTxt.y; //+10;
        var scrollRect = new egret.Rectangle(0, 0, 640, 450);
        if (this.scrollView == null) {
            this.scrollView = ComponentManager.getScrollView(this._moveCountainer, scrollRect);
            this.scrollView.x = 10;
            this.scrollView.y = _windesTxt.y + 50;
            this.addChildToContainer(this.scrollView);
        }
    };
    ConquestInfoPopupView.prototype.showAnim = function () {
        if (this._fire_lizi) {
            this._fire_lizi.start();
            var tmpthis_1 = this;
            egret.Tween.get(this._fire_lizi, { loop: false }).wait(500).to({ alpha: 0 }, 200).call(function () {
                if (this._fire_lizi) {
                    tmpthis_1.removeChildFromContainer(this._fire_lizi);
                    this._fire_lizi = null;
                }
            });
        }
    };
    ConquestInfoPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.closeBtn.y = this.viewBg.y;
        this.closeBtn.x = this.viewBg.x + this.viewBg.width - 80;
    };
    ConquestInfoPopupView.prototype.dispose = function () {
        this._moveCountainer = null;
        this.rewardArrList = [];
        this.scrollView = null;
        this.strArr = [];
        this.iconArr = [];
        this._fire_lizi = null;
        _super.prototype.dispose.call(this);
    };
    return ConquestInfoPopupView;
}(PopupView));
__reflect(ConquestInfoPopupView.prototype, "ConquestInfoPopupView");
