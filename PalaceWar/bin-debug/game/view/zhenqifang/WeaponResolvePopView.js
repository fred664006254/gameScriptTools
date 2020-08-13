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
 * 神器分解弹板
 * author wxz
 * date 2020/5.25
 * @class WeaponResolvePopView
 */
var WeaponResolvePopView = /** @class */ (function (_super) {
    __extends(WeaponResolvePopView, _super);
    function WeaponResolvePopView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._nullTxt = null;
        return _this;
    }
    Object.defineProperty(WeaponResolvePopView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    WeaponResolvePopView.prototype.getTitleStr = function () {
        return "weaponResolveTitle1";
    };
    WeaponResolvePopView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WEAPON_RESOLVE, this.requestCallback, this);
        var bg = BaseBitmap.create("weaponresolvebg");
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 0;
        this.addChildToContainer(bg);
        var rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 520;
        rewardBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rewardBg.width / 2, bg.y + bg.height + 5);
        this.addChildToContainer(rewardBg);
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal("weaponResolveDesc1"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.textAlign = egret.HorizontalAlign.CENTER;
        descTxt.lineSpacing = 3;
        descTxt.x = this.viewBg.x + this.viewBg.width / 2 - descTxt.width / 2;
        descTxt.y = 30;
        this.addChildToContainer(descTxt);
        var dataList = this.getDatas();
        var rect = new egret.Rectangle(0, 0, 530, rewardBg.height - 10);
        var scrollList = ComponentManager.getScrollList(WeaponResolveItem, dataList, rect, null);
        scrollList.setPosition(45, rewardBg.y + 5);
        this.addChildToContainer(scrollList);
        this._scrollList = scrollList;
        var nullTxt = ComponentManager.getTextField(LanguageManager.getlocal("weaponResolveNullDesc"), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        nullTxt.x = this.viewBg.x + this.viewBg.width / 2 - nullTxt.width / 2;
        nullTxt.y = scrollList.y + scrollList.height / 2 - nullTxt.height / 2;
        this.addChildToContainer(nullTxt);
        this._nullTxt = nullTxt;
        this._nullTxt.visible = dataList.length == 0;
    };
    WeaponResolvePopView.prototype.requestCallback = function (event) {
        if (!event.data.ret) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if (rData.rewards) {
            // let rewardVoList = GameData.formatRewardItem(rData.rewards);
            // App.CommonUtil.playRewardFlyAction(rewardVoList);
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rData.rewards, "isPlayAni": true, "callback": null, "handler": null });
        }
        var dataList = this.getDatas();
        this._scrollList.refreshData(dataList);
        this._nullTxt.visible = dataList.length == 0;
    };
    WeaponResolvePopView.prototype.getDatas = function () {
        var dataList = [];
        var weaponInfoVoObj = Api.weaponVoApi.getWeaponVo().getWeaponInfoVo();
        var maxSoul;
        for (var item in weaponInfoVoObj) {
            maxSoul = Config.ServantweaponCfg.getWeaponItemById(weaponInfoVoObj[item].id).maxSoul;
            if (weaponInfoVoObj[item].skill2 >= maxSoul) {
                var cfg = weaponInfoVoObj[item].cfg;
                if (Api.itemVoApi.getItemNumInfoVoById(cfg.itemID) > 0) {
                    dataList.push(weaponInfoVoObj[item]);
                }
            }
        }
        return dataList;
    };
    WeaponResolvePopView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "weaponresolvebg", "public_popupscrollitembg"
        ]);
    };
    WeaponResolvePopView.prototype.getBgExtraHeight = function () {
        return 10;
    };
    WeaponResolvePopView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WEAPON_RESOLVE, this.requestCallback, this);
        _super.prototype.dispose.call(this);
    };
    return WeaponResolvePopView;
}(PopupView));
var WeaponResolveItemUsePopView = /** @class */ (function (_super) {
    __extends(WeaponResolveItemUsePopView, _super);
    function WeaponResolveItemUsePopView() {
        return _super.call(this) || this;
    }
    WeaponResolveItemUsePopView.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this.freshCost();
        this._effect.visible = false;
        this._desc.y = 250;
        this._desc.textAlign = egret.HorizontalAlign.CENTER;
        this.titleTF.text = LanguageManager.getlocal("weaponResolveTitle1");
        this._useBtn.setText("weaponResolveBtnTxt");
    };
    WeaponResolveItemUsePopView.prototype.dragCallback = function (curNum) {
        _super.prototype.dragCallback.call(this, curNum);
        this.freshCost();
    };
    WeaponResolveItemUsePopView.prototype.useHandler = function (param) {
        var _this = this;
        this._paraData = this.param;
        this._num = this._useNum;
        var itemId = this._paraData.data.itemId;
        var iteminfo = Api.itemVoApi.getItemInfoVoById(itemId);
        var cost = this._paraData.data.cost;
        var message = LanguageManager.getlocal("weaponResolveSureTxt", [String(this._useNum), iteminfo.name, String(cost * this._useNum)]);
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            msg: message,
            title: "itemUseConstPopupViewTitle",
            touchMaskClose: true,
            callback: function () {
                _this.hide();
                NetManager.request(NetRequestConst.REQUEST_WEAPON_RESOLVE, { weaponId: _this._paraData.data.wid, num: _this._num });
            },
            handler: this,
            needClose: 1,
            needCancel: true
        });
    };
    WeaponResolveItemUsePopView.prototype.freshCost = function () {
        var itemId = this.param.data.itemId;
        var iteminfo = Api.itemVoApi.getItemInfoVoById(itemId);
        var cost = this.param.data.cost;
        this._desc.text = LanguageManager.getlocal("weaponResolveDesc2", [String(this._useNum), iteminfo.name, String(this._useNum * cost)]);
        this._desc.x = this.viewBg.x + this.viewBg.width / 2 - this._desc.width / 2;
    };
    return WeaponResolveItemUsePopView;
}(ItemUsePopupView));
//# sourceMappingURL=WeaponResolvePopView.js.map