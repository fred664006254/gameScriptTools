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
var ActivityPopView = /** @class */ (function (_super) {
    __extends(ActivityPopView, _super);
    function ActivityPopView() {
        var _this = _super.call(this) || this;
        _this._checkBtn = null;
        _this._sureBtn = null;
        _this._isCheck = false;
        _this._itemTab = [];
        _this._infoTab = [];
        _this._posY = 0;
        return _this;
    }
    ActivityPopView.prototype.getResourceList = function () {
        this._infoTab = this.param.data.info; //Api.acVoApi.getAcPopInfo();
        var picArray = ["acpop_effect"];
        for (var i = 0; i < this._infoTab.length; i++) {
            var info = this._infoTab[i];
            var bgres = info.p + (info.vo && info.vo.zids && info.vo.isCrossLeague() ? "_multicross" : "");
            if (info.vo && info.vo.zids && info.vo.isCrossFengYun()) {
                bgres = info.p + "_fengyun";
            }
            picArray.push(bgres);
        }
        if (Api.otherInfoVoApi.checkHasNewYear()) {
            picArray.push("acpopicon_newyear");
        }
        if (Api.otherInfoVoApi.checkHasHomeNewYear()) {
            picArray.push("acpopicon_homenewyear");
        }
        return _super.prototype.getResourceList.call(this).concat(picArray);
    };
    ActivityPopView.prototype.initView = function () {
        if (this._infoTab.length == 0) {
            this.hide();
            return;
        }
        if (Api.rookieVoApi.isGuiding) {
            var view = ViewController.getInstance().getView(ViewConst.BASE.ROOKIEVIEW);
            if (view) {
                view.hide();
            }
        }
        var scrollBg = BaseBitmap.create("activitypop_itembg");
        scrollBg.width = 538;
        scrollBg.height = 516;
        scrollBg.setPosition(this.viewBg.width / 2 - scrollBg.width / 2, 10);
        this.addChildToContainer(scrollBg);
        this._checkBtn = BaseBitmap.create("activitypop_check1");
        this._checkBtn.y = scrollBg.y + scrollBg.height + 5;
        this._checkBtn.addTouchTap(this.checkHandle, this);
        this.addChildToContainer(this._checkBtn);
        var tipText = ComponentManager.getTextField(LanguageManager.getlocal("activityPopTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        tipText.y = this._checkBtn.y + 10;
        tipText.x = this.viewBg.width - tipText.width - 50;
        this.addChildToContainer(tipText);
        this._checkBtn.x = tipText.x - this._checkBtn.width - 3;
        this._sureBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW, "activityPopSureTip", this.clickSureHandler, this);
        this._sureBtn.setPosition(GameConfig.stageWidth / 2 - this._sureBtn.width / 2, GameConfig.stageHeigth / 2 + 380);
        this.addChild(this._sureBtn);
        var scrollContainer = new BaseDisplayObjectContainer();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 580, 510);
        var scrollView = ComponentManager.getScrollView(scrollContainer, rect);
        this.addChildToContainer(scrollView);
        scrollView.setPosition(scrollBg.x + 3, scrollBg.y + 3);
        var posY = 0;
        for (var i = 0; i < this._infoTab.length; i++) {
            if (GameData.serverTime > this._infoTab[i].vo.et) {
                this._itemTab.splice(i, 1);
            }
            else {
                var item = new ActivityPopItem();
                item.init(this._infoTab[i]);
                scrollContainer.addChild(item);
                this._itemTab.push(item);
            }
        }
        if (Api.otherInfoVoApi.checkHasNewYear()) {
            App.MessageHelper.addEventListener(MessageConst.MESSAGE_DINNER_GUIDE, this.hide, this);
            var item = new ActivityPopItem();
            item.init({ label: 5, p: "acpopicon_newyear", sortId: 0, vo: { aid: "newyear" } });
            scrollContainer.addChild(item);
            this._itemTab.push(item);
        }
        if (Api.otherInfoVoApi.checkHasHomeNewYear()) {
            var item = new ActivityPopItem();
            item.init({ label: 5, p: "acpopicon_homenewyear", sortId: 0, vo: { aid: "homenewyear" } });
            scrollContainer.addChild(item);
            this._itemTab.push(item);
        }
        this.sortItems();
        var descbg = BaseBitmap.create("public_searchdescbg");
        descbg.width = 540;
        descbg.height = 46;
        descbg.setPosition(GameConfig.stageWidth / 2 - descbg.width / 2, GameConfig.stageHeigth / 2 + 320);
        this.addChild(descbg);
        var descTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("activityPopClickTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTipTxt.x = GameConfig.stageWidth / 2 - descTipTxt.width / 2;
        descTipTxt.y = descbg.y + descbg.height / 2 - descTipTxt.height / 2;
        this.addChild(descTipTxt);
    };
    ActivityPopView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        if (!Api.rookieVoApi.isInGuiding && Api.switchVoApi.checkShowOpenViewAni() && this.isShowOpenAni()) {
            this.y = GameConfig.stageHeigth / 2 - 60;
            this._maskBmp.y = 60;
        }
        else {
            this.y = -60;
            this._maskBmp.y = 60;
        }
    };
    ActivityPopView.prototype.playOpenViewEffect = function () {
        if (!Api.rookieVoApi.isInGuiding && Api.switchVoApi.checkShowOpenViewAni() && this.isShowOpenAni()) {
            //打开特效
            this.alpha = 0;
            this.scaleX = 0.5;
            this.scaleY = 0.5;
            this.anchorOffsetX = GameConfig.stageWidth / 2;
            this.anchorOffsetY = GameConfig.stageHeigth / 2;
            this.x = GameConfig.stageWidth / 2;
            this.y = GameConfig.stageHeigth / 2;
            if (this._maskBmp) {
                this._maskBmp.setScale(2);
                this._maskBmp.x = -GameConfig.stageWidth / 2;
                this._maskBmp.y = -GameConfig.stageHeigth / 2;
            }
            egret.Tween.get(this, { loop: false }).to({ scaleX: 1.1, scaleY: 1.1, alpha: 1 }, 200).to({ scaleX: 1, scaleY: 1 }, 100)
                .call(function () {
                egret.Tween.removeTweens(this);
                if (this._maskBmp) {
                    this._maskBmp.setScale(1);
                    this._maskBmp.x = 0;
                    this._maskBmp.y = 60;
                }
            }, this);
        }
    };
    ActivityPopView.prototype.sortItems = function () {
        this._itemTab.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
        var posY = 0;
        for (var i = 0; i < this._itemTab.length; i++) {
            this._itemTab[i].y = posY;
            posY += this._itemTab[i].height + 2;
        }
    };
    ActivityPopView.prototype.checkHandle = function () {
        if (this._isCheck) {
            this._isCheck = false;
            this._checkBtn.texture = ResourceManager.getRes("activitypop_check1");
        }
        else {
            this._isCheck = true;
            this._checkBtn.texture = ResourceManager.getRes("activitypop_check2");
        }
    };
    ActivityPopView.prototype.tick = function () {
        var needSort = false;
        if (this._itemTab.length > 0) {
            for (var i = 0; i < this._itemTab.length; i++) {
                var type = this._itemTab[i].tick();
                if (type > 0) {
                    needSort = true;
                }
                if (type == 2) {
                    this._itemTab[i].dispose();
                    this._itemTab.splice(i, 1);
                }
            }
            if (needSort) {
                this.sortItems();
            }
        }
    };
    ActivityPopView.prototype.clickSureHandler = function () {
        this.hide();
    };
    ActivityPopView.prototype.hide = function () {
        if (this._isCheck) {
            NetManager.request(NetRequestConst.REQYEST_OTHER_INFO_SETACTIVITYPOP, {});
        }
        // if(Api.switchVoApi.checkOpenReback() && Api.playerReturnVoApi.version > 0 && Api.playerReturnVoApi.isInActTime())
        // {
        // 	if(Api.playerReturnVoApi.getRebackRewards() != ''){
        // 		ViewController.getInstance().openView(ViewConst.POPUP.REBACKPOPUPVIEW);
        //     }
        //     else{
        //         if(Api.rookieVoApi.curGuideKey == "zhenqifang"){
        //             App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_NEEDGUIDE);
        //         }
        //     }
        // }
        // else{
        //     if(Api.rookieVoApi.curGuideKey == "zhenqifang"){
        //         App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_NEEDGUIDE);
        //     }
        // }
        GameData.acPopTime = GameData.serverTime;
        _super.prototype.hide.call(this);
    };
    ActivityPopView.prototype.getBgExtraHeight = function () {
        return 10;
    };
    // protected isShowOpenAni():boolean{
    //     return false;
    // }
    ActivityPopView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DINNER_GUIDE, this.hide, this);
        this._checkBtn = null;
        this._isCheck = false;
        this._sureBtn = null;
        this._itemTab.length = 0;
        this._infoTab.length = 0;
        _super.prototype.dispose.call(this);
    };
    return ActivityPopView;
}(PopupView));
//# sourceMappingURL=ActivityPopView.js.map