/**
* 防守信息
* date 2020.5.13
* author ycg
* @name SixSection1SeatInfoPopupViewTab2
*/
class SixSection1SeatInfoPopupViewTab2 extends CommonViewTab{
    private _scrollList:ScrollList = null;

    public constructor(data?:any) {
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION1_GETDINFO, this.getDinfoCallback, this);
        NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_GETDINFO, {});
        this.width = 530;
        this.height = 675;
        let bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 675;
        bg.x = 26;
        bg.y = 55;
        this.addChild(bg);

        let data = [];
        let scrollList = ComponentManager.getScrollList(SixSection1SeatInfoScrollItem2, data, new egret.Rectangle(0, 0, bg.width, bg.height - 10));
        scrollList.setPosition(bg.x, bg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));

        let tipBg = BaseBitmap.create("sixsection1_popbottombg");
        tipBg.setPosition(bg.x + bg.width/2 - tipBg.width/2, bg.y + bg.height - 105);
        this.addChild(tipBg);
    }

    private getDinfoCallback(evt:egret.Event){
        if (!evt.data.ret){
            return;
        }
        let data = evt.data.data.data;
        console.log("getDinfoCallback", data);
        // let buildCfg 
        let dataList = data.dinfo;
        if (dataList.length > 1){
            dataList.sort((a, b)=>{
                return b.fightst - a.fightst;
            });
        }
        this._scrollList.refreshData(dataList);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_GETDINFO, this.getDinfoCallback, this);
        this._scrollList = null;

        super.dispose();
    }
}