/**
 * 公告--公平竞技场
 */

class NoticeItemArean extends BaseDisplayObjectContainer {
    public constructor () {
        super();
    }

    private _banner: BaseLoadBitmap;

    private _startTimer: number = new Date().getTime();

    public initView() {
        this._banner = BaseLoadBitmap.create('notice_popup_banner_1');
        this.addChild(this._banner);

        let _mask = BaseLoadBitmap.create('notice_popup_mask');
        _mask.width = 510;
        _mask.height = 42;
        this.addChild(_mask);
        _mask.x = 0;
        _mask.y = 197 - 44;

        let _tips: BaseTextField = ComponentMgr.getTextField(LangMger.getlocal('noticePopupText2',
            [this.formatTime(this._startTimer)]), TextFieldConst.SIZE_20, 0xffffff);
        _tips.bold = true;
        _tips.stroke = 2;
        _tips.strokeColor = 0x0960af;
        this.addChild(_tips);
        _tips.x = (_mask.width - _tips.width) / 2;
        _tips.y = _mask.y + (_mask.height - _tips.height) / 2;
        
        // this.addTouchTap(this.onTouchTap, this);
    }

    // private onTouchTap() {
    //     console.log('jump to special advance......');
    // }

    private formatTime(timestamp: number): string {
        const d = new Date(timestamp);
        const yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();
        return `${yyyy}.${mm<10?"0"+mm:mm}.${dd<10?"0"+dd:dd}`;
    }

    public dispose() {
        // this.removeTouchTap();
        this._banner = null;
        super.dispose();
    }
}