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
/**
 * 新服预约 tab1
 * date 2020.6.29
 * author ycg
 */
var AcNewappointPreviewViewTab1 = /** @class */ (function (_super) {
    __extends(AcNewappointPreviewViewTab1, _super);
    function AcNewappointPreviewViewTab1(data) {
        var _this = _super.call(this) || this;
        _this._scrollView = null;
        _this._giftContainer = null;
        _this._giftList = [];
        _this._appointBtn = null;
        _this._goBtn = null;
        _this._appointSuccess = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcNewappointPreviewViewTab1.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg93");
        bg.width = 540;
        bg.height = 450;
        bg.setPosition(50, 0);
        this.addChild(bg);
        var topInfoBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_toptxtbg", this.getTypeCode()));
        topInfoBg.setPosition(bg.x + bg.width / 2 - topInfoBg.width / 2, bg.y + 10);
        this.addChild(topInfoBg);
        var topInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewGiftTop", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        topInfo.setPosition(topInfoBg.x + topInfoBg.width / 2 - topInfo.width / 2, topInfoBg.y + topInfoBg.height / 2 - topInfo.height / 2);
        this.addChild(topInfo);
        var giftBottomBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_giftbottombg", this.getTypeCode()));
        giftBottomBg.setPosition(bg.x + bg.width / 2 - giftBottomBg.width / 2, topInfoBg.y + topInfoBg.height);
        this.addChild(giftBottomBg);
        var giftContainer = new BaseDisplayObjectContainer();
        this._giftContainer = giftContainer;
        var scrollView = ComponentManager.getScrollView(giftContainer, new egret.Rectangle(0, 0, giftBottomBg.width, giftBottomBg.height));
        this.addChild(scrollView);
        scrollView.horizontalScrollPolicy = "on";
        scrollView.verticalScrollPolicy = "off";
        scrollView.bounces = false;
        scrollView.setPosition(giftBottomBg.x, giftBottomBg.y);
        this._scrollView = scrollView;
        var data = this.cfg.getGiftListCfg();
        for (var i = 0; i < data.length; i++) {
            var container = new BaseDisplayObjectContainer();
            giftContainer.addChild(container);
            var giftBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_giftitembg1", this.getTypeCode()));
            container.width = giftBg.width;
            container.height = scrollView.height;
            container.addChild(giftBg);
            giftBg.setPosition(0, container.height - giftBg.height + 2);
            var giftImgIndex = i % 3 + 1;
            var gift = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_gift" + giftImgIndex, this.getTypeCode()));
            gift.setPosition(giftBg.x + giftBg.width / 2 - gift.width / 2, container.height - gift.height - 30);
            container.addChild(gift);
            var giftName = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointGiftName" + (i + 1), this.getTypeCode())), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            giftName.setPosition(giftBg.x + giftBg.width / 2 - giftName.width / 2, giftBg.y + 34);
            container.addChild(giftName);
            container.setPosition(5 + i * (container.width + 10), 0);
            container.addTouchTap(this.giftClickHandler, this, [i]);
            var giftItem = { giftBg: giftBg, gift: gift, container: container };
            this._giftList.push(giftItem);
        }
        //预约介绍
        var info = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewInfo", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        info.width = 510;
        info.lineSpacing = 5;
        info.setPosition(giftBottomBg.x + giftBottomBg.width / 2 - info.width / 2, giftBottomBg.y + giftBottomBg.height + 15);
        this.addChild(info);
        //预约按钮
        var appointBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, App.CommonUtil.getCnByCode("acNewappointPreviewappointBtn1", this.getTypeCode()), this.appointBtnClick, this, null, null, null, TextFieldConst.COLOR_BLACK);
        appointBtn.setPosition(bg.x + bg.width / 2 - appointBtn.width / 2, bg.y + bg.height - appointBtn.height - 10);
        this.addChild(appointBtn);
        this._appointBtn = appointBtn;
        //前往按钮
        var goBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, App.CommonUtil.getCnByCode("acNewappointPreviewappointBtn2", this.getTypeCode()), this.goBtnClick, this, null, null, null, TextFieldConst.COLOR_BLACK);
        goBtn.setPosition(bg.x + bg.width / 2 - goBtn.width / 2, bg.y + bg.height - goBtn.height - 10);
        this.addChild(goBtn);
        goBtn.visible = false;
        this._goBtn = goBtn;
        //预约成功
        var appointSuccess = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewappointSuccess", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN4);
        appointSuccess.setPosition(giftBottomBg.x + giftBottomBg.width / 2 - appointSuccess.width / 2, appointBtn.y + appointBtn.height / 2 - appointSuccess.height / 2);
        this.addChild(appointSuccess);
        appointSuccess.visible = false;
        this._appointSuccess = appointSuccess;
        //预约时间
        var timeInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewTime", this.getTypeCode()), [Api.acnewappointApi.getStartTime()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        timeInfo.width = 510;
        timeInfo.lineSpacing = 5;
        timeInfo.setPosition(giftBottomBg.x + giftBottomBg.width / 2 - timeInfo.width / 2, appointBtn.y - timeInfo.height - 10);
        this.addChild(timeInfo);
        this.refreshView();
    };
    //预约按钮点击事件
    AcNewappointPreviewViewTab1.prototype.appointBtnClick = function () {
        if (Api.acnewappointApi.isInActivity()) {
            var acData = Api.acnewappointApi.getAcData();
            var ast = acData.yrst;
            var newZid = acData.newzid;
            var reqData = { t: "mackappinitment", pid: LoginManager.getLocalUserName(), yrst: ast, newzid: newZid };
            NetManager.http.get(ServerCfg.svrCfgUrl, reqData, this.appointCallback, this.appointErrorCallback, this);
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewappointTip2", this.getTypeCode())));
        }
    };
    AcNewappointPreviewViewTab1.prototype.appointCallback = function (data) {
        if (data && data.ret) {
            if (data.ret == -1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("requestFailCode-1"));
            }
            else if (data.ret == -2) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewappointTip2", this.getTypeCode())));
            }
            return;
        }
        if (data && data.activeData) {
            Api.acnewappointApi.setAcData(data.activeData);
            this.refreshView();
        }
    };
    AcNewappointPreviewViewTab1.prototype.appointErrorCallback = function () {
        App.CommonUtil.showTip(LanguageManager.getlocal("requestFailCode-1"));
    };
    //前往按钮点击事件
    AcNewappointPreviewViewTab1.prototype.goBtnClick = function () {
        if (Api.acnewappointApi.isStart) {
            if (!Api.acnewappointApi.isInActivity()) {
                ServerCfg.setAcNewServerData(Api.acnewappointApi.getNewServerInfo());
                var baseView = ViewController.getInstance().getView("AcNewappointPreviewView");
                baseView.hide();
            }
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewappointTip2", this.getTypeCode())));
        }
    };
    AcNewappointPreviewViewTab1.prototype.giftClickHandler = function (target, index) {
        App.LogUtil.log("giftClickHandler " + index);
        var data = this.cfg.getGiftListCfg();
        var itemCfg = data[index];
        ViewController.getInstance().openView(ViewConst.POPUP.ACNEWAPPOINTPREVIEWGIFTDETAILPOPUPVIEW, { aid: this.aid, code: this.code, rewards: itemCfg.getReward });
    };
    AcNewappointPreviewViewTab1.prototype.refreshView = function () {
        if (Api.acnewappointApi.isInActivity()) {
            if (Api.acnewappointApi.isJoin()) {
                this._appointBtn.visible = false;
                this._appointSuccess.visible = true;
                this._goBtn.visible = false;
            }
            else {
                this._appointBtn.visible = true;
                this._appointSuccess.visible = false;
                this._goBtn.visible = false;
            }
        }
        else {
            if (Api.acnewappointApi.isJoin()) {
                this._appointBtn.visible = false;
                this._appointSuccess.visible = false;
                this._goBtn.visible = true;
            }
            else {
                this._appointBtn.visible = true;
                this._appointSuccess.visible = false;
                this._goBtn.visible = false;
            }
        }
    };
    Object.defineProperty(AcNewappointPreviewViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewappointPreviewViewTab1.prototype, "code", {
        get: function () {
            return Api.acnewappointApi.code ? Api.acnewappointApi.code : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewappointPreviewViewTab1.prototype, "aid", {
        get: function () {
            return "newappoint";
        },
        enumerable: true,
        configurable: true
    });
    AcNewappointPreviewViewTab1.prototype.getTypeCode = function () {
        return this.code;
    };
    AcNewappointPreviewViewTab1.prototype.dispose = function () {
        this._scrollView = null;
        this._giftContainer = null;
        this._giftList = [];
        this._appointBtn = null;
        this._goBtn = null;
        this._appointSuccess = null;
        _super.prototype.dispose.call(this);
    };
    return AcNewappointPreviewViewTab1;
}(CommonViewTab));
//# sourceMappingURL=AcNewappointPreviewViewTab1.js.map