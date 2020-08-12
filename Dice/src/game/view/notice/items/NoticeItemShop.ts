/**
 * 公告--商店信息
 */

class NoticeItemShop extends BaseDisplayObjectContainer {
    public constructor () {
        super();
    }

    private readonly BannerNameCfg = [{
        index: ShopConst.SHOP_DISCOUNTSHOP_INDEX,
        bannerName: 'notice_popup_banner_2'
    }, {
        index: ShopConst.SHOP_SPECIALVIP_INDEX,
        bannerName: 'notice_popup_banner_3'
    }]

    private getBannerName():string {
        let _rsl: string = "";
        let index = this._shopIndex || 0;

        let _fl = this.BannerNameCfg.filter((v, i) => {
            return v.index == index;
        });
        if (_fl[0] && _fl[0].bannerName) {
            _rsl = _fl[0].bannerName;
        }

        // if (index == ShopConst.SHOP_DISCOUNTSHOP_INDEX) {
        //     _rsl += `_${this._shopData? this._shopData.id || 0}`
        // }

        return _rsl
    }

    private _shopIndex: number = null;
    private _shopType: string;
    private _shopData: any;
    private _banner: BaseLoadBitmap;

    public initView(params: {shopIndex: number, shopType: string, shopData?: any}) {

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
    }

    /**
     * 每日礼包底部提示
     */
    private bottomTipForIndex0() {
        let _mask = BaseLoadBitmap.create('notice_popup_mask');
        _mask.width = 510;
        _mask.height = 42;
        this.addChild(_mask);
        _mask.x = 0;
        _mask.y = 197 - 44;

        let _tips: BaseTextField = ComponentMgr.getTextField(LangMger.getlocal('noticePopupText3'), TextFieldConst.SIZE_20, 0xffffff);
        _tips.bold = true;
        _tips.stroke = 2;
        _tips.strokeColor = 0x7d36b8;
        this.addChild(_tips);
        _tips.x = (_mask.width - _tips.width) / 2;
        _tips.y = _mask.y + (_mask.height - _tips.height) / 2;
    }

    /**
     * 皇室令牌底部提示
     */
    private bottomTipForIndex2() {
        let _mask = BaseLoadBitmap.create('notice_popup_mask');
        _mask.width = 510;
        _mask.height = 42;
        this.addChild(_mask);
        _mask.x = 0;
        _mask.y = 197 - 44;

        let _tips: BaseTextField = ComponentMgr.getTextField(LangMger.getlocal('noticePopupText4'), TextFieldConst.SIZE_20, 0xffffff);
        _tips.bold = true;
        _tips.stroke = 2;
        _tips.strokeColor = 0x883D05;
        this.addChild(_tips);
        _tips.x = (_mask.width - _tips.width) / 2;
        _tips.y = _mask.y + (_mask.height - _tips.height) / 2;
    }

    private onTouchTap() {
        App.MsgHelper.dispEvt(MsgConst.CLOSE_NOTICE_POPUP);
        ViewController.getInstance().hideView(ViewConst.NOTICEPOPUPVIEW);
        App.MsgHelper.dispEvt(MsgConst.GOSHOP, {index: this._shopIndex, type: this._shopType});
    }

    public dispose() {
        this.removeTouchTap();
        this._shopType = null;
        this._shopIndex = null;
        this._shopData = null;
        this._banner = null;
        super.dispose();
    }
}