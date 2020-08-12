/**
 * 公告--皇室令牌
 */

class NoticeItemVip extends BaseDisplayObjectContainer {
    public constructor () {
        super();
    }

    private _banner: BaseLoadBitmap;

    public initView() {
        this._banner = BaseLoadBitmap.create('notice_popup_banner_3');
        this.addChild(this._banner);
        
        // this.addTouchTap(this.onTouchTap, this);
    }

    // private onTouchTap() {
        
    // }

    public dispose() {
        this.removeTouchTap();
        this._banner = null;
        super.dispose();
    }
}