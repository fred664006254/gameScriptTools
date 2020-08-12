/**
 * 公告--商店信息
 */
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
var NoticeItemShop = (function (_super) {
    __extends(NoticeItemShop, _super);
    function NoticeItemShop() {
        var _this = _super.call(this) || this;
        _this.BannerNameCfg = [{
                index: ShopConst.SHOP_DISCOUNTSHOP_INDEX,
                bannerName: 'notice_popup_banner_2'
            }, {
                index: ShopConst.SHOP_SPECIALVIP_INDEX,
                bannerName: 'notice_popup_banner_3'
            }];
        _this._shopIndex = null;
        return _this;
    }
    NoticeItemShop.prototype.getBannerName = function () {
        var _rsl = "";
        var index = this._shopIndex || 0;
        var _fl = this.BannerNameCfg.filter(function (v, i) {
            return v.index == index;
        });
        if (_fl[0] && _fl[0].bannerName) {
            _rsl = _fl[0].bannerName;
        }
        // if (index == ShopConst.SHOP_DISCOUNTSHOP_INDEX) {
        //     _rsl += `_${this._shopData? this._shopData.id || 0}`
        // }
        return _rsl;
    };
    NoticeItemShop.prototype.initView = function (params) {
        this._shopIndex = params.shopIndex;
        this._shopType = params.shopType;
        this._shopData = params.shopData;
        this._banner = BaseLoadBitmap.create(this.getBannerName());
        this.addChild(this._banner);
        switch (this._shopIndex) {
            case ShopConst.SHOP_DISCOUNTSHOP_INDEX:
                this.bottomTipForIndex0();
                break;
            case ShopConst.SHOP_SPECIALVIP_INDEX:
                this.bottomTipForIndex2();
                break;
            default:
                break;
        }
        this.addTouchTap(this.onTouchTap, this);
    };
    /**
     * 每日礼包底部提示
     */
    NoticeItemShop.prototype.bottomTipForIndex0 = function () {
        var _mask = BaseLoadBitmap.create('notice_popup_mask');
        _mask.width = 510;
        _mask.height = 42;
        this.addChild(_mask);
        _mask.x = 0;
        _mask.y = 197 - 44;
        var _tips = ComponentMgr.getTextField(LangMger.getlocal('noticePopupText3'), TextFieldConst.SIZE_20, 0xffffff);
        _tips.bold = true;
        _tips.stroke = 2;
        _tips.strokeColor = 0x7d36b8;
        this.addChild(_tips);
        _tips.x = (_mask.width - _tips.width) / 2;
        _tips.y = _mask.y + (_mask.height - _tips.height) / 2;
    };
    /**
     * 皇室令牌底部提示
     */
    NoticeItemShop.prototype.bottomTipForIndex2 = function () {
        var _mask = BaseLoadBitmap.create('notice_popup_mask');
        _mask.width = 510;
        _mask.height = 42;
        this.addChild(_mask);
        _mask.x = 0;
        _mask.y = 197 - 44;
        var _tips = ComponentMgr.getTextField(LangMger.getlocal('noticePopupText4'), TextFieldConst.SIZE_20, 0xffffff);
        _tips.bold = true;
        _tips.stroke = 2;
        _tips.strokeColor = 0x883D05;
        this.addChild(_tips);
        _tips.x = (_mask.width - _tips.width) / 2;
        _tips.y = _mask.y + (_mask.height - _tips.height) / 2;
    };
    NoticeItemShop.prototype.onTouchTap = function () {
        App.MsgHelper.dispEvt(MsgConst.CLOSE_NOTICE_POPUP);
        ViewController.getInstance().hideView(ViewConst.NOTICEPOPUPVIEW);
        App.MsgHelper.dispEvt(MsgConst.GOSHOP, { index: this._shopIndex, type: this._shopType });
    };
    NoticeItemShop.prototype.dispose = function () {
        this.removeTouchTap();
        this._shopType = null;
        this._shopIndex = null;
        this._shopData = null;
        this._banner = null;
        _super.prototype.dispose.call(this);
    };
    return NoticeItemShop;
}(BaseDisplayObjectContainer));
__reflect(NoticeItemShop.prototype, "NoticeItemShop");
//# sourceMappingURL=NoticeItemShop.js.map