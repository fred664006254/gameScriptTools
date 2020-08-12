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
 * 获得物品通用弹窗 一般是宝箱类
 * author qianjun
 * 参数 ：title,msg,callback,handler  needCancel
 *
 */
var CommonRewardPopupView = (function (_super) {
    __extends(CommonRewardPopupView, _super);
    function CommonRewardPopupView() {
        return _super.call(this) || this;
    }
    // 打开该面板时，需要传参数msg
    CommonRewardPopupView.prototype.initView = function () {
        var view = this;
        view.name = "CommonRewardPopupView";
        var param = view.param.data;
        var bg = BaseBitmap.create("popupview_content1");
        bg.width = 500;
        bg.x = view.viewBg.x + view.viewBg.width / 2 - bg.width / 2;
        bg.y = 0;
        view.addChildToContainer(bg);
        var rewards = GameData.formatRewardItem(param.rewards);
        var len = Math.min(4, rewards.length);
        var itemGroup = new BaseDisplayObjectContainer();
        itemGroup.width = (len * 108 + (len - 1) * 10);
        view.addChildToContainer(itemGroup);
        var tmpX = (bg.width - len * 108 - (len - 1) * 10) / 2;
        for (var i = 0; i < rewards.length; ++i) {
            var rewardVo = rewards[i];
            var icon = GameData.getItemIcon(rewardVo, rewardVo.num, null, Api.DiceVoApi.notOld(rewardVo.id.toString()));
            itemGroup.addChild(icon);
            icon.setScale(108 / icon.width);
            icon.x = i % 4 * (icon.width * icon.scaleX + 10);
            icon.y = Math.floor(i / 4) * (icon.height * icon.scaleY + 10);
            // let numTxt = ComponentMgr.getTextField(`x${rewardVo.num}`, TextFieldConst.SIZE_CONTENT_COMMON);
            // itemGroup.addChild(numTxt)
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, numTxt, icon, [0,icon.height*icon.scaleY+10]);
        }
        bg.width = itemGroup.width + 40;
        bg.x = view.viewBg.x + view.viewBg.width / 2 - bg.width / 2;
        bg.height = itemGroup.height + 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, itemGroup, bg);
        var conBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, LangMger.getlocal("confirmBtn"), view.clickConHandler, view);
        conBtn.setColor(ColorEnums.white);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, conBtn, bg, [0,bg.height+20]);
        this.addChild(conBtn);
        conBtn.x = 245;
        this._conBtn = conBtn;
        // conBtn.y = 330;
        if (this.param.data.needCancel) {
            var canelStr = "canelStr";
            if (this.param.data.canelTxt) {
                canelStr = this.param.data.canelTxt;
            }
            var cancelBtn = ComponentMgr.getButton(ButtonConst.BTN_CANCEL, LangMger.getlocal(canelStr), view.clickCancelHandler, view);
            cancelBtn.setColor(ColorEnums.white);
            this.addChild(cancelBtn);
            this._cancelBtn = cancelBtn;
            cancelBtn.x = 130;
            cancelBtn.y = conBtn.y;
            conBtn.x = 350;
            // "2_1_2500|100_107_100|100_103_51|100_203_40|100_308_17|100_401_1"
            // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cancelBtn, bg, [10,bg.height+40]);
            // App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, conBtn, bg, [10,bg.height+40]);
        }
        //宝箱连续购买
        if (param.isBoxBuy) {
            var specialBoxId = param.specialBoxId;
            var specialBoxCfg = Config.ShopCfg.getSpecialBoxCfgById(Number(specialBoxId));
            conBtn.setText(specialBoxCfg.costGem1.toString());
            conBtn.addTextIcon("public_icon1");
            var costGroup = new BaseDisplayObjectContainer();
            view.addChildToContainer(costGroup);
            var costicon = BaseBitmap.create("ab_mainui_gem");
            costGroup.addChild(costicon);
            // costicon.setScale(0.64);
            var costTxt = ComponentMgr.getTextField("" + specialBoxCfg.costGem, TextFieldConst.SIZE_CONTENT_COMMON);
            costGroup.addChild(costTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costTxt, costicon, [costicon.width * costicon.scaleX, 2]);
            var shopline = BaseBitmap.create("shopview_line");
            shopline.width = costTxt.width + 20;
            costGroup.addChild(shopline);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, shopline, costTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, costGroup, conBtn, [0, -costGroup.height]);
        }
    };
    CommonRewardPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        var th = this.container.height + 165 + this._titleBg.height;
        this.viewBg.height = (th > this.viewBg.height) ? th : this.viewBg.height;
        if (this._conBtn) {
            if (Api.GameinfoVoApi.checlIsInGuideId(18)) {
                this._conBtn.setText(LangMger.getlocal("guideWarDesc22"));
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.bottom, this._conBtn, this.viewBg, [0, 17]);
        }
        if (this._cancelBtn) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.bottom, this._cancelBtn, this.viewBg, [0, 17]);
        }
    };
    CommonRewardPopupView.prototype.preInit = function () {
        _super.prototype.preInit.call(this);
        if (Api.GameinfoVoApi.checlIsInGuideId(18)) {
            App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
        }
    };
    CommonRewardPopupView.prototype.isTouchMaskClose = function () {
        return (this.param && this.param.data && this.param.data.touchMaskClose) ? true : false;
    };
    CommonRewardPopupView.prototype.clickConHandler = function (data) {
        var param = this.param;
        if (!param.data.clickNotAutoHide) {
            this.hide();
        }
        if (param.data.callback) {
            param.data.callback.apply(param.data.handler, [this]);
        }
    };
    CommonRewardPopupView.prototype.clickCancelHandler = function (data) {
        var param = this.param;
        if (param.data.cancelcallback) {
            param.data.cancelcallback.apply(param.data.handler, [this]);
        }
        this.hide();
    };
    // protected getShowHeight(){
    // 	return 500;
    // }
    CommonRewardPopupView.prototype.getTitleStr = function () {
        return this.param.data.title;
    };
    CommonRewardPopupView.prototype.getCloseBtnName = function () {
        return _super.prototype.getCloseBtnName.call(this); //this.param.data.needClose === 1 ? 
    };
    CommonRewardPopupView.prototype.closeHandler = function () {
        if (Api.GameinfoVoApi.checlIsInGuideId(18)) {
            return;
        }
        var param = this.param;
        if (param.data.closecallback) {
            param.data.closecallback.apply(param.data.handler, [this]);
        }
        _super.prototype.closeHandler.call(this);
    };
    CommonRewardPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    CommonRewardPopupView.prototype.getParent = function () {
        if (this.param.data.inLayer) {
            return this.param.data.inLayer;
        }
        else {
            return _super.prototype.getParent.call(this);
        }
    };
    CommonRewardPopupView.prototype.getResourceList = function () {
        var array = [];
        array.concat(_super.prototype.getResourceList.call(this));
        return array.concat([
            "shopview_line",
        ]);
    };
    CommonRewardPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return CommonRewardPopupView;
}(PopupView));
__reflect(CommonRewardPopupView.prototype, "CommonRewardPopupView");
//# sourceMappingURL=CommonRewardPopupView.js.map