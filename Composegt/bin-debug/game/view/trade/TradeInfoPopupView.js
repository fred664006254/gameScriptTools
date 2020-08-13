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
 * 商贸 胜利界面
 */
var TradeInfoPopupView = (function (_super) {
    __extends(TradeInfoPopupView, _super);
    function TradeInfoPopupView() {
        var _this = _super.call(this) || this;
        _this.scrollView = null;
        _this._moveCountainer = null;
        _this.rewardArrList = [];
        _this._strArr = [];
        _this._iconArr = [];
        _this._itemStringContainer = null;
        _this._itemContainer = null;
        return _this;
    }
    TradeInfoPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "battle_win_word",
            "fire_flake_json",
            "battle_win_light",
            "fire_flake",
        ]);
    };
    TradeInfoPopupView.prototype.isShowMask = function () {
        return true;
    };
    TradeInfoPopupView.prototype.getTitleStr = function () {
        return null;
    };
    TradeInfoPopupView.prototype.initView = function () {
        this._itemStringContainer = new BaseDisplayObjectContainer();
        this._itemContainer = new BaseDisplayObjectContainer();
        this.touchEnabled = true;
        this.addTouchTap(this.hide, this);
        this.viewBg.visible = false;
        var infoBg = BaseBitmap.create("public_9_wordbg");
        infoBg.width = 640;
        infoBg.height = 600;
        infoBg.setPosition(GameConfig.stageWidth / 2 - infoBg.width / 2, GameConfig.stageHeigth / 2 - infoBg.height / 2);
        this.addChildToContainer(infoBg);
        //胜利背景光效
        // let winLight:BaseBitmap = BaseBitmap.create("battle_win_light");
        // winLight.scaleY = 0.5;
        // winLight.setPosition(50,-10);
        // this.addChildToContainer(winLight);
        // winLight.alpha = 0;
        // egret.Tween.get(winLight).wait(100).to({alpha:1},100).wait(90).to({alpha:0},10);
        //胜利文字大小
        var winBitmap = BaseBitmap.create("battle_win_word");
        winBitmap.anchorOffsetX = winBitmap.width / 2;
        winBitmap.anchorOffsetY = winBitmap.height / 2;
        winBitmap.setPosition(GameConfig.stageWidth / 2, infoBg.y);
        this.addChildToContainer(winBitmap);
        winBitmap.scaleX = 1.5;
        winBitmap.scaleY = 1.5;
        egret.Tween.get(winBitmap).to({ scaleX: 0.9, scaleY: 0.9 }, 120).to({ scaleX: 1, scaleY: 1 }, 50);
        //粒子效果
        this._fire_lizi = App.ParticleUtil.getParticle("fire_flake");
        this._fire_lizi.y = -150;
        this.addChildToContainer(this._fire_lizi);
        this.showAnim();
        var _data = this.param.data;
        if (_data) {
            var _windesTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
            _windesTxt.text = LanguageManager.getlocal("tradeWindes", [_data.consumeGold, _data.tradeName]);
            _windesTxt.multiline = true;
            _windesTxt.lineSpacing = 5;
            _windesTxt.setPosition(30, infoBg.y + 120);
            _windesTxt.width = 580;
            _windesTxt.textAlign = "center";
            this.addChildToContainer(_windesTxt);
        }
        this._moveCountainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._moveCountainer);
        // this._moveCountainer.y = _windesTxt.y+10;
        var scrollRect = new egret.Rectangle(0, 0, 640, 540);
        if (this.scrollView == null) {
            this.scrollView = ComponentManager.getScrollView(this._moveCountainer, scrollRect);
            this.scrollView.x = 10;
            this.scrollView.y = infoBg.y + 170;
            this.addChildToContainer(this.scrollView);
        }
        var curr_data = this.param.data.rdata;
        if (curr_data && curr_data.data.trade.info && curr_data.data.trade.info.rewards) {
            var rewards = this.param.data.rewards || curr_data.data.rewards;
        }
        else {
            rewards = "";
        }
        this.rewardArrList = [];
        if (rewards) {
            this.rewardArrList = GameData.formatRewardItem(rewards);
            this.rewardArrList.sort(function (a, b) {
                if (a.type > b.type)
                    return 1;
                else if (a.type == b.type)
                    return 0;
                return -1;
            });
        }
        var l = this.rewardArrList.length;
        this._strArr = [];
        this._iconArr = [];
        // tradeWindes贸易积分
        if (curr_data && curr_data.data.batchpoint) {
            var str = LanguageManager.getlocal("tradepointdes", [curr_data.data.batchpoint + ""]);
            this._strArr.push(str);
        }
        for (var i = 0; i < l; i++) {
            var curTypeNum = this.rewardArrList[i].type;
            if (curTypeNum == 6 || curTypeNum == 1) {
                this._iconArr.push(this.rewardArrList[i]);
            }
            else {
                //红颜
                if (curTypeNum == 12) {
                    var wifeCfg = Config.WifeCfg.getWifeCfgById(this.rewardArrList[i].id);
                    this._strArr.push(wifeCfg.name + this.rewardArrList[i].tipMessage);
                }
                else if (curTypeNum == 14 || curTypeNum == 15) {
                    var servantCfg = Config.ServantCfg.getServantItemById(this.rewardArrList[i].id);
                    this._strArr.push(servantCfg.name + this.rewardArrList[i].message);
                }
                else {
                    this._strArr.push(this.rewardArrList[i].name + this.rewardArrList[i].tipMessage);
                }
            }
        }
        this.showItemIcon();
        this.showTxt();
    };
    TradeInfoPopupView.prototype.showItemIcon = function () {
        var scaleNum = 0.88;
        var newnum = 0;
        this._iconArr.sort(function (a, b) {
            if (a.id > b.id)
                return 1;
            else if (a.id == b.id)
                return 0;
            return -1;
        });
        //icon 图标
        for (var i = 0; i < this._iconArr.length; i++) {
            var icon = GameData.getItemIcon(this._iconArr[i], true);
            var num = i % 4;
            icon.setPosition((icon.width + 5) * num, (icon.height + 20) * Math.floor(i / 4));
            icon.scaleX = scaleNum;
            icon.scaleY = scaleNum;
            this._itemContainer.addChild(icon);
            newnum = (icon.height + 20) * Math.floor(i / 5);
        }
        this._itemContainer.setPosition(80, this._itemStringContainer.y + 50 + this._itemStringContainer.height);
        this._moveCountainer.addChild(this._itemContainer);
    };
    TradeInfoPopupView.prototype.showTxt = function () {
        //文字字段
        for (var j = 0; j < this._strArr.length; j++) {
            var _desTxt = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2); //COLOR_WARN_GREEN2  
            _desTxt.text = this._strArr[j];
            var num = j % 2;
            _desTxt.setPosition(90 + (260) * num, (_desTxt.height + 20) * Math.floor(j / 2));
            this._itemStringContainer.addChild(_desTxt);
        }
        this._itemStringContainer.setPosition(0, 10);
        this._moveCountainer.addChild(this._itemStringContainer);
    };
    TradeInfoPopupView.prototype.showAnim = function () {
        this._fire_lizi.start();
        var tmpthis = this;
        egret.Tween.get(this._fire_lizi, { loop: false }).wait(500).to({ alpha: 0 }, 200).call(function () {
            if (this._fire_lizi) {
                tmpthis.removeChildFromContainer(this._fire_lizi);
                this._fire_lizi = null;
            }
        });
    };
    //  protected resetBgSize():void
    // {
    //     // super.resetBgSize();
    //     this.closeBtn.y = this.viewBg.y;
    //     this.closeBtn.x =this.viewBg.x +this.viewBg.width-80;
    // }
    TradeInfoPopupView.prototype.hide = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_TRADE_AFTER_FIGHT);
        _super.prototype.hide.call(this);
    };
    TradeInfoPopupView.prototype.dispose = function () {
        this._moveCountainer = null;
        this.rewardArrList = [];
        this.scrollView = null;
        this._strArr = [];
        this._iconArr = [];
        this._fire_lizi = null;
        this._itemStringContainer = null;
        this._itemContainer = null;
        _super.prototype.dispose.call(this);
    };
    return TradeInfoPopupView;
}(BaseView));
__reflect(TradeInfoPopupView.prototype, "TradeInfoPopupView");
