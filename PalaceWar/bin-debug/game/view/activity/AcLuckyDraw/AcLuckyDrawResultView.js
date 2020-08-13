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
var AcLuckyDrawResultView = (function (_super) {
    __extends(AcLuckyDrawResultView, _super);
    function AcLuckyDrawResultView() {
        var _this = _super.call(this) || this;
        _this._agreeType = 0;
        _this._fightName = null;
        _this._sid = null;
        _this._callbackF = null;
        _this._obj = null;
        _this._myContiner = null;
        _this._scrollView = null;
        _this._scrollContainerTab = [];
        _this._showedIndx = 0;
        _this._myConfirmBtn = null;
        return _this;
    }
    Object.defineProperty(AcLuckyDrawResultView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLuckyDrawResultView.prototype.getTitleStr = function () {
        return "acLuckyDrawResultTitle-" + this.code;
    };
    AcLuckyDrawResultView.prototype.initView = function () {
        var view = this;
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 620;
        bg.setPosition(this.viewBg.width / 2 - bg.width / 2, 20);
        this.addChildToContainer(bg);
        var typeBg = BaseBitmap.create("public_9_probiginnerbg");
        typeBg.width = 500;
        typeBg.height = 590;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, typeBg, bg);
        this.addChildToContainer(typeBg);
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, typeBg.width, typeBg.height - 15);
        this._myContiner = new BaseDisplayObjectContainer();
        this._scrollView = ComponentManager.getScrollView(this._myContiner, rect2);
        this._scrollView.setPosition(typeBg.x, typeBg.y + 10);
        this.addChildToContainer(this._scrollView);
        var index = 1;
        var containerY = 0;
        var winCount = 0;
        var scoreCount = 0;
        var data = view.param.data.batchList;
        var info = [];
        for (var i in data) {
            info.push({
                card: data[i][1],
                reward: data[i][0],
            });
        }
        var tmpY = 0;
        for (var k in info) {
            var unit = info[k];
            var scrollContiner = new BaseDisplayObjectContainer();
            scrollContiner.width = 460;
            scrollContiner.x = 20;
            scrollContiner.y = tmpY;
            // scrollContiner.y = containerY;
            if (index == 1) {
                this._myContiner.addChild(scrollContiner);
            }
            var containerBg = BaseBitmap.create("public_alphabg");
            containerBg.width = 460;
            containerBg.x = 10;
            containerBg.y = 0;
            scrollContiner.addChild(containerBg);
            var awardArr = GameData.formatRewardItem(unit.reward);
            var rewardStr = '';
            for (var i in awardArr) {
                var tmp = awardArr[i];
                rewardStr += "<font color=" + tmp.nameColor + ">" + tmp.name + "*" + tmp.num + "</font>\uFF0C";
            }
            rewardStr = rewardStr.substring(0, rewardStr.length - 1);
            var resultStr = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyDrawGetAllItemInfo-" + view.code, [String(index), unit.card, rewardStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            resultStr.lineSpacing = 5;
            resultStr.width = 440;
            resultStr.setPosition(18, 15);
            scrollContiner.addChild(resultStr);
            scrollContiner.height = resultStr.y + resultStr.textHeight + 15;
            tmpY += (scrollContiner.height + 10);
            index++;
            var line = BaseBitmap.create("public_line1");
            line.width = 460;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, scrollContiner, [0, 0], true);
            // line.x = 0;
            // line.y = tmpY - 10;
            scrollContiner.addChild(line);
            this._scrollContainerTab.push(scrollContiner);
        }
        egret.Tween.get(this._myContiner).wait(200).call(this.showOneContainer, this);
        this._myConfirmBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", this.hide, this);
        this._myConfirmBtn.setPosition(this.viewBg.width / 2 - this._myConfirmBtn.width / 2, typeBg.y + 20 + typeBg.height);
        this.addChildToContainer(this._myConfirmBtn);
        this._myConfirmBtn.setEnable(false);
    };
    AcLuckyDrawResultView.prototype.showOneContainer = function () {
        // this._scrollContainerTab[this._showedIndx].visible = true;
        this._showedIndx++;
        if (this._scrollContainerTab.length > this._showedIndx) {
            this._scrollContainerTab[this._showedIndx].y = this._myContiner.height;
            this._myContiner.addChild(this._scrollContainerTab[this._showedIndx]);
            var moveH = this._myContiner.height - 450;
            moveH = moveH < 0 ? 0 : moveH;
            this._scrollView.setScrollTop(moveH, 200);
            egret.Tween.get(this._myContiner).wait(200).call(this.showOneContainer, this);
            // this._scrollContainerTab[this._showedIndx].visible = false;
        }
        else {
            this._myConfirmBtn.setEnable(true);
        }
    };
    AcLuckyDrawResultView.prototype.hide = function () {
        //ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEAGREEPOPUPVIEW,{type:this._agreeType , name: this._fightName, sid:this._sid});
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        _super.prototype.hide.call(this);
        // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESET_ATKRACE);
        // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESET_ATKRACECROSS);
    };
    // 计算背景高度时使用，在container高度的基础上添加该高度
    AcLuckyDrawResultView.prototype.getBgExtraHeight = function () {
        return 15;
    };
    AcLuckyDrawResultView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcLuckyDrawResultView.prototype.dispose = function () {
        egret.Tween.removeTweens(this._myContiner);
        this._myContiner = null;
        this._agreeType = 0;
        this._fightName = null;
        this._sid = null;
        this._scrollView = null;
        this._scrollContainerTab.length = 0;
        this._showedIndx = 0;
        this._myConfirmBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcLuckyDrawResultView;
}(PopupView));
__reflect(AcLuckyDrawResultView.prototype, "AcLuckyDrawResultView");
//# sourceMappingURL=AcLuckyDrawResultView.js.map