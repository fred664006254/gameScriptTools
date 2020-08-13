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
var ReturnRewardPopupView = (function (_super) {
    __extends(ReturnRewardPopupView, _super);
    function ReturnRewardPopupView() {
        return _super.call(this) || this;
    }
    ReturnRewardPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 264;
        bg.setPosition((this.viewBg.width - bg.width) / 2, 10);
        this.addChildToContainer(bg);
        // let iconList:BaseDisplayObjectContainer[]=GameData.getRewardItemIcons(Config.GameprojectCfg.rewardWB6,true);
        var rewardArrList = GameData.formatRewardItem(Config.GameprojectCfg.rewardWB6);
        // let l:number=Config.GameprojectCfg.rewardWB6z?iconList.length:0;
        var itemContainer = new BaseDisplayObjectContainer();
        var l = rewardArrList.length;
        var scaleNum = 0.88;
        var newnum = 0;
        for (var i = 0; i < l; i++) {
            var icon = GameData.getItemIcon(rewardArrList[i]);
            var num = i % 4;
            icon.setPosition((icon.width + 10) * num, (icon.height + 20) * Math.floor(i / 4));
            icon.scaleX = scaleNum;
            icon.scaleY = scaleNum;
            itemContainer.addChild(icon);
            newnum = (icon.height + 10) * Math.floor(i / 4);
        }
        itemContainer.setPosition(this.viewBg.x + (this.viewBg.width - itemContainer.width) / 2, 30);
        this.addChildToContainer(itemContainer);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "wanbaReturnReward", this.confirmHandler, this);
        confirmBtn.setPosition(bg.x + (bg.width - confirmBtn.width) / 2, bg.y + bg.height + 10);
        this.addChildToContainer(confirmBtn);
        this.closeBtn.visible = false;
    };
    ReturnRewardPopupView.prototype.confirmHandler = function () {
        this.request(NetRequestConst.REQUST_USER_GETRETURNREWARD, {});
    };
    ReturnRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    ReturnRewardPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    ReturnRewardPopupView.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.cmd == NetRequestConst.REQUST_USER_GETRETURNREWARD) {
                if (data.data.data.rewards) {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, data.data.data.rewards);
                    this.hide();
                }
            }
        }
    };
    return ReturnRewardPopupView;
}(PopupView));
__reflect(ReturnRewardPopupView.prototype, "ReturnRewardPopupView");
//# sourceMappingURL=ReturnRewardPopupView.js.map