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
 * 修身阅历仓库
 * author yanyuling
 * date 2018/04/16
 * @class PracticeStoragePopupView
 */
var PracticeStoragePopupView = (function (_super) {
    __extends(PracticeStoragePopupView, _super);
    function PracticeStoragePopupView() {
        return _super.call(this) || this;
    }
    PracticeStoragePopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_COLLECT), this.collectCallbackHandler, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRACTICE_UPSTORAGE), this.upCallbackHandler, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_STORAGE, this.refreshUI, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var startY = 10;
        var bg1 = BaseBitmap.create("public_9_bg4");
        bg1.width = 530;
        bg1.height = 260;
        bg1.x = this.viewBg.x + this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = this.viewBg.y + startY;
        this._nodeContainer.addChild(bg1);
        var deltaY = 70;
        var deltaX = 320;
        var officeTxt = ComponentManager.getTextField("", 22);
        officeTxt.text = LanguageManager.getlocal("practiceStorageoffice", [Api.playerVoApi.getPlayerOffice()]);
        officeTxt.x = bg1.x + 20;
        officeTxt.y = bg1.y + 15;
        this._nodeContainer.addChild(officeTxt);
        var produceTxt = ComponentManager.getTextField("", 22);
        produceTxt.name = "produceTxt";
        produceTxt.x = officeTxt.x;
        produceTxt.y = officeTxt.y + deltaY;
        this._nodeContainer.addChild(produceTxt);
        var produceAddTxt = ComponentManager.getTextField("", 20);
        produceAddTxt.name = "produceAddTxt";
        produceAddTxt.x = produceTxt.x + deltaX;
        produceAddTxt.y = produceTxt.y;
        this._nodeContainer.addChild(produceAddTxt);
        var detailImg = ComponentManager.getButton("servant_detailBtn", "", this.detailClickHandler, this);
        detailImg.x = bg1.x + bg1.width - detailImg.width - 10;
        detailImg.y = produceAddTxt.y + produceAddTxt.height / 2 - detailImg.height / 2;
        this._nodeContainer.addChild(detailImg);
        var capacityTxt = ComponentManager.getTextField("0", 22);
        capacityTxt.x = produceTxt.x;
        capacityTxt.y = produceTxt.y + deltaY;
        capacityTxt.name = "capacityTxt";
        this._nodeContainer.addChild(capacityTxt);
        var capacityAddTxt = ComponentManager.getTextField("0", 22);
        capacityAddTxt.x = produceAddTxt.x;
        capacityAddTxt.y = capacityTxt.y;
        capacityAddTxt.name = "capacityAddTxt";
        this._nodeContainer.addChild(capacityAddTxt);
        if (PlatformManager.checkIsEnLang()) {
            capacityAddTxt.x = produceAddTxt.x - 40;
        }
        var adddlImg = ComponentManager.getButton("practice_plus", "", this.addClickHandler, this);
        adddlImg.x = detailImg.x;
        adddlImg.y = capacityAddTxt.y + capacityAddTxt.height / 2 - adddlImg.height / 2;
        this._nodeContainer.addChild(adddlImg);
        adddlImg.name = "adddlImg";
        var icon = BaseBitmap.create("public_icon12");
        icon.x = produceTxt.x;
        icon.y = capacityTxt.y + deltaY - 15;
        this._nodeContainer.addChild(icon);
        this._progressBar = ComponentManager.getProgressBar("progress3", "progress3_bg", 450);
        this._progressBar.x = icon.x + icon.width + 7;
        this._progressBar.y = icon.y + icon.height / 2 - this._progressBar.height / 2;
        this._progressBar.setTextSize(18);
        this._nodeContainer.addChild(this._progressBar);
        var collectBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "practice_collect", this.collectHandler, this);
        collectBtn.x = bg1.x + bg1.width / 2 - collectBtn.width / 2;
        collectBtn.y = bg1.y + bg1.height + 10;
        this._nodeContainer.addChild(collectBtn);
        this.refreshUI();
    };
    PracticeStoragePopupView.prototype.refreshUI = function () {
        var produceTxt = this._nodeContainer.getChildByName("produceTxt");
        var produceAddTxt = this._nodeContainer.getChildByName("produceAddTxt");
        var capacityTxt = this._nodeContainer.getChildByName("capacityTxt");
        var capacityAddTxt = this._nodeContainer.getChildByName("capacityAddTxt");
        var basecfg = GameConfig.config.practicebaseCfg;
        if (Api.practiceVoApi.getStorageLv() == basecfg.storeAddMax) {
            var adddlImg = this._nodeContainer.getChildByName("adddlImg");
            adddlImg.visible = false;
            if (!this._nodeContainer.getChildByName("maxImg")) {
                var maxImg = BaseBitmap.create("practice_max");
                maxImg.x = adddlImg.x;
                maxImg.y = adddlImg.y;
                this._nodeContainer.addChild(maxImg);
                maxImg.name = "maxImg";
            }
        }
        var slv = Api.practiceVoApi.getStorageLv();
        slv = slv ? slv : 0;
        //加成容量
        var addLimitRate = basecfg.storeAdd * 100 * slv;
        var totalLimit = Api.practiceVoApi.getStorageRealLimit();
        capacityTxt.text = LanguageManager.getlocal("practiceStoragecapacity", ["" + totalLimit]);
        capacityAddTxt.text = LanguageManager.getlocal("practiceStoragecapacityAdd", [addLimitRate.toFixed(0)]);
        var spAdd = Api.practiceVoApi.getspdAdd();
        var speed = basecfg.level[Api.playerVoApi.getPlayerLevel() - 1] * (1 + spAdd);
        produceTxt.text = LanguageManager.getlocal("practiceStorageproduct", [speed.toFixed(0)]);
        produceAddTxt.text = LanguageManager.getlocal("practiceStorageproductAdd", ["" + (spAdd * 100).toFixed(0)]);
        var st = Api.practiceVoApi.getStorageInfo().st;
        var deltaT = basecfg.time;
        var getV = Api.practiceVoApi.getCurStorageValue();
        if (getV >= totalLimit) {
            getV = totalLimit;
        }
        this._progressBar.setText(getV.toFixed(0) + "/" + totalLimit);
        this._progressBar.setPercentage(getV / totalLimit);
    };
    PracticeStoragePopupView.prototype.collectCallbackHandler = function (event) {
        var ret = event.data.data.ret;
        if (ret == 0) {
            var resName = "public_icon12";
            var params = [];
            var resNum = event.data.data.data.expnum;
            App.CommonUtil.playRewardFlyAction([{ icon: resName, tipMessage: "" + resNum }]);
        }
        this.hide();
    };
    PracticeStoragePopupView.prototype.collectHandler = function () {
        if (Api.practiceVoApi.isCollectEnable()) {
            NetManager.request(NetRequestConst.REQUEST_REQUEST_COLLECT, {});
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("practice_collectNoNum"));
        }
        // NetManager.request(NetRequestConst.REQUEST_REQUEST_COLLECT,{});
    };
    PracticeStoragePopupView.prototype.detailClickHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.PRACTICEGETPOPUPVIEW, { pnum: 100 });
    };
    PracticeStoragePopupView.prototype.addClickHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.PRACTICEEXPANDPOPUPVIEW, {});
    };
    PracticeStoragePopupView.prototype.upCallbackHandler = function (event) {
        var ret = event.data.data.ret;
        if (ret != 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("practice_storage_upFailed"));
            return;
        }
        App.CommonUtil.showTip(LanguageManager.getlocal("practice_storage_upSuccess"));
        this.refreshUI();
    };
    PracticeStoragePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress3", "progress3_bg", "servant_detailBtn", "servant_detailBtn_down",
            "practice_max", "practice_plus_down", "practice_plus",
        ]);
    };
    PracticeStoragePopupView.prototype.getShowHeight = function () {
        return 420;
    };
    PracticeStoragePopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_COLLECT), this.collectCallbackHandler, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRACTICE_UPSTORAGE), this.upCallbackHandler, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_STORAGE, this.refreshUI, this);
        this._progressBar = null;
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return PracticeStoragePopupView;
}(PopupView));
__reflect(PracticeStoragePopupView.prototype, "PracticeStoragePopupView");
//# sourceMappingURL=PracticeStoragePopupView.js.map