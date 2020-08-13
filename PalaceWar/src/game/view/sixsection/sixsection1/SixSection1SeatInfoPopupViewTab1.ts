/**
* 我的据点
* date 2020.5.13
* author ycg
* @name SixSection1SeatInfoPopupViewTab1
*/
class SixSection1SeatInfoPopupViewTab1 extends CommonViewTab{
    private _scrollList:ScrollList = null;

    public constructor(data?:any) {
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION1_COLLECT, this.collectCallback, this);
        
        this.width = 530;
        this.height = 675;
        let bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 675;
        bg.x = 26;
        bg.y = 55;
        this.addChild(bg);

        let data = Api.sixsection1VoApi.getSortMyBuildData();
        let scrollList = ComponentManager.getScrollList(SixSection1SeatInfoScrollItem1, data, new egret.Rectangle(0, 0, bg.width, bg.height - 10));
        scrollList.setPosition(bg.x, bg.y + 5);
        this.addChild(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        this._scrollList = scrollList;

        let tipBg = BaseBitmap.create("sixsection1_popbottombg");
        tipBg.setPosition(bg.x + bg.width/2 - tipBg.width/2, bg.y + bg.height - 105);
        this.addChild(tipBg);

        let tip = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SeatInfoPointGoTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tip.setPosition(tipBg.x + tipBg.width/2 - tip.width/2, tipBg.y + tipBg.height - 38);
        this.addChild(tip);
    }

    public refreshWhenSwitchBack():void{
        App.LogUtil.log("SixSection1SeatInfoPopupViewTab1 refreshWhenSwitchBack");
        let dataList = Api.sixsection1VoApi.getSortMyBuildData();
        this._scrollList.refreshData(dataList);
	}

    private collectCallback(evt:egret.Event){
        if (!evt.data.ret){
            return;
        }
        let data = evt.data.data.data;
        App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1SeatInfoCollectGet", [""+data.getResource]));
        // console.log("collectCallback ", data);
        if (data.map){
            Api.sixsection1VoApi.setMapInfo(data.map);
        }
        let dataList = Api.sixsection1VoApi.getSortMyBuildData();
        this._scrollList.refreshData(dataList);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_COLLECT, this.collectCallback, this);

        super.dispose();
    }
}