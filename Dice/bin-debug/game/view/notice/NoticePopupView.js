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
var NoticePopupView = (function (_super) {
    __extends(NoticePopupView, _super);
    // /**
    //  * 弹出公告
    //  * @param isOrder 是否强制弹出，默认false
    //  */
    // public static showTip(isOrder: boolean = false) {
    //     if (isOrder) {
    //         ViewController.getInstance().openView(ViewConst.NOTICEPOPUPVIEW, {})
    //     } else {
    //         let isDaliy: boolean = true;
    //         // let __isDaliyTip:number = parseInt(localStorage.getItem(LocalStorageConst.LOCAL_NOTICE_NOT_TIP));
    //         let __isDaliyTip:number = parseInt(App.CommonUtil.getLocalStorageWithUid(LocalStorageConst.LOCAL_NOTICE_NOT_TIP));
    //         if (!__isDaliyTip) {
    //             isDaliy = false
    //         } else {
    //             let _now: number = Math.floor(new Date().getTime() / 1000);
    //             isDaliy = App.DateUtil.isSameDay(_now, __isDaliyTip);
    //         }
    //         if (!isDaliy) {
    //             ViewController.getInstance().openView(ViewConst.NOTICEPOPUPVIEW, {})
    //         }
    //     }
    // }
    // /**
    //  * 关闭公告
    //  */
    // public static hideTip() {
    //     App.MsgHelper.dispEvt(MsgConst.CLOSE_NOTICE_POPUP);
    //     ViewController.getInstance().hideView(ViewConst.NOTICEPOPUPVIEW);
    // }
    function NoticePopupView() {
        return _super.call(this) || this;
    }
    NoticePopupView.prototype.initView = function () {
        this.updateList();
        this._check_tip = ComponentMgr.getTextField(LangMger.getlocal('noticePopupText1'), TextFieldConst.SIZE_20, 0xffffff);
        this.addChildToContainer(this._check_tip);
        this._check_tip.x = (this.getShowWidth() - this._check_tip.width) / 2 + 26;
        this._check_tip.stroke = 2;
        this._check_tip.strokeColor = 0x000000;
        this.DaliyTipCheck = ComponentMgr.getCheckBox('', 'notice_popup_sel');
        this.addChildToContainer(this.DaliyTipCheck);
        this.DaliyTipCheck.x = this._check_tip.x - 52;
        this.DaliyTipCheck.setSelected(this.checkDaliyTipSet());
        this.DaliyTipCheck.addChangeStatusHanlder(this.hanldeDaliyTipCheck, this);
        App.MsgHelper.addEvt(MsgConst.CLOSE_NOTICE_POPUP, this.hanldeDaliyTipCheck, this);
    };
    NoticePopupView.prototype.hanldeDaliyTipCheck = function () {
        console.log('******* handle lock ********');
        if (this.DaliyTipCheck.checkSelected()) {
            var _now = Math.floor(new Date().getTime() / 1000).toString();
            // localStorage.setItem(LocalStorageConst.LOCAL_NOTICE_NOT_TIP, _now);
            App.CommonUtil.setLocalStorageWithUid(LocalStorageConst.LOCAL_NOTICE_NOT_TIP, _now);
        }
        else {
            // localStorage.removeItem(LocalStorageConst.LOCAL_NOTICE_NOT_TIP)
            App.CommonUtil.removeLocalStorageWithUid(LocalStorageConst.LOCAL_NOTICE_NOT_TIP);
        }
    };
    NoticePopupView.prototype.checkDaliyTipSet = function () {
        var __isDaliyTip = parseInt(App.CommonUtil.getLocalStorageWithUid(LocalStorageConst.LOCAL_NOTICE_NOT_TIP));
        if (!__isDaliyTip) {
            return false;
        }
        var _now = Math.floor(new Date().getTime() / 1000);
        return App.DateUtil.isSameDay(_now, __isDaliyTip);
    };
    NoticePopupView.prototype.closeHandler = function () {
        this.hanldeDaliyTipCheck();
        _super.prototype.closeHandler.call(this);
    };
    NoticePopupView.prototype.clickConfirmHandler = function () {
        this.closeHandler();
    };
    NoticePopupView.prototype.updateList = function () {
        this.formatListData();
        if (!this.listview) {
            var list_h = 610;
            this.listview = ComponentMgr.getScrollList(NoticeViewItem, [], new egret.Rectangle(0, 0, 510, list_h));
            this.addChildToContainer(this.listview);
            this.listview.x = (this.viewBg.width - 510) / 2;
            this.listview.y = 0;
        }
        this.listview.refreshData(this._list_db);
    };
    NoticePopupView.prototype.formatListData = function () {
        this._list_db = [{
                type: NoticeItemType.Arean
            }];
        this._list_db = this._list_db.concat(this.getShopItems());
    };
    NoticePopupView.prototype.getShopItems = function () {
        var _rsl = [];
        var discounts = Api.ShopVoApi.getTodayDiscountShopList();
        discounts.forEach(function (_data) {
            _rsl.push({
                type: NoticeItemType.Shop,
                params: {
                    shopIndex: ShopConst.SHOP_DISCOUNTSHOP_INDEX,
                    shopType: ShopConst.SHOP_DISCOUNTSHOP,
                    shopData: _data
                }
            });
        });
        _rsl.push({
            type: NoticeItemType.Shop,
            params: {
                shopIndex: ShopConst.SHOP_SPECIALVIP_INDEX,
                shopType: ShopConst.SHOP_SPECIALVIP
            }
        });
        return _rsl;
    };
    NoticePopupView.prototype.initBg = function () {
        this.viewBg = BaseBitmap.create(this.getBgName());
        this.addChild(this.viewBg);
        this.viewBg.width = this.getShowWidth();
    };
    NoticePopupView.prototype.getBgName = function () {
        return "notice_popup_bg";
    };
    NoticePopupView.prototype.getTitleBgName = function () {
        return "notice_popup_title";
    };
    NoticePopupView.prototype.getShowWidth = function () {
        return 544;
    };
    NoticePopupView.prototype.getShowHeight = function () {
        return 688;
    };
    NoticePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "notice_popup_bg",
            "notice_popup_mask",
            "notice_popup_title",
            "notice_popup_sel",
            "notice_popup_sel_down",
            "notice_popup_banner_1",
            "notice_popup_banner_2",
            "notice_popup_banner_3"
        ]);
    };
    NoticePopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this._titleBg.x = (GameConfig.stageWidth - this._titleBg.width) / 2;
        this._titleBg.y = this.viewBg.y - 60;
        this.titleTF.x = (GameConfig.stageWidth - this.titleTF.width) / 2;
        this.titleTF.y = this._titleBg.y + 26;
        this.titleTF.size = TextFieldConst.SIZE_36;
        this.titleTF.bold = true;
        this.titleTF.stroke = 2;
        this.titleTF.strokeColor = 0x870100;
        this.container.y = this.viewBg.y + 58;
        this.closeBtn.x = this.viewBg.x + this.viewBg.width - this.closeBtn.measuredWidth;
        this.closeBtn.y = this.viewBg.y - 24;
        this.DaliyTipCheck.y = this.viewBg.height + this.viewBg.y - this.container.y + 35 - this.DaliyTipCheck.height / 2;
        this._check_tip.y = this.DaliyTipCheck.y + ((this.DaliyTipCheck.height - this._check_tip.height) / 2);
        this._confirmBtn.y = this.viewBg.y + this.viewBg.height + 70;
    };
    // 确认按钮名称
    NoticePopupView.prototype.getConfirmBtnName = function () {
        return _super.prototype.getConfirmBtnName.call(this);
    };
    NoticePopupView.prototype.getConfirmBtnStr = function () {
        return LangMger.getlocal('confirmBtn');
    };
    NoticePopupView.prototype.dispose = function () {
        this.listview = null;
        this._list_db = null;
        this.DaliyTipCheck = null;
        this._check_tip = null;
        App.MsgHelper.removeEvt(MsgConst.CLOSE_NOTICE_POPUP, this.hanldeDaliyTipCheck, this);
        _super.prototype.dispose.call(this);
    };
    return NoticePopupView;
}(PopupView));
__reflect(NoticePopupView.prototype, "NoticePopupView");
//# sourceMappingURL=NoticePopupView.js.map