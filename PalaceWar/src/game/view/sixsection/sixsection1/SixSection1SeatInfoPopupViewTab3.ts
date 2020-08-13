/**
* 仇人信息
* date 2020.5.13
* author ycg
* @name SixSection1SeatInfoPopupViewTab3
*/
class SixSection1SeatInfoPopupViewTab3 extends CommonViewTab{
    private _data:any[] = [];
    private _scrollList:ScrollList = null;

    public constructor(data?:any) {
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_SEATINFO_REFRESH, this.freshData, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION1_GETEINFO, this.getEinfoCallback, this);
        NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_GETEINFO, {});
        this.width = 530;
        this.height = 675;
        let bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 675;
        bg.x = 26;
        bg.y = 55;
        this.addChild(bg);

        // let data:any[] = [];
        // for (let i=0; i < 6; i++){
        //     let cfg = {data: i, isShowAll: false};
        //     data[i] = cfg;
        // }
        let dataList = [];
        let scrollList = ComponentManager.getScrollList(SixSection1SeatInfoScrollItem3, dataList, new egret.Rectangle(0, 0, bg.width, bg.height - 10));
        scrollList.setPosition(bg.x, bg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));

        let tipBg = BaseBitmap.create("sixsection1_popbottombg");
        tipBg.setPosition(bg.x + bg.width/2 - tipBg.width/2, bg.y + bg.height - 105);
        this.addChild(tipBg);
    }

    private getEinfoCallback(evt:egret.Event){
        if (!evt.data.ret){
            return;
        }
        let data = evt.data.data.data;
        // console.log("getEinfoCallback", data);
        this.formatEinfoData(data.einfo);
        this._scrollList.refreshData(this._data);
    }

    private formatEinfoData(data:any){
        this._data = [];
        let uids:any = {};
        let dirUids:any = {};
        for (let i=0; i < data.length; i++){
            // if (data[i].type == "director"){
            //     let atkInfo = data[i].uinfo;
            //     if (!dirUids[atkInfo.uid]){
            //         dirUids[atkInfo.uid] = [];
            //     }
            //     dirUids[atkInfo.uid].push(data[i]);
            // }
            // else{
            //     // let attInfo = data[i].pklogs[0][3];
            //     let attInfo = data[i].minfo;
            //     if (!uids[attInfo.uid]){
            //         uids[attInfo.uid] = [];
            //     }
            //     uids[attInfo.uid].push(data[i]);
            // } 
            if (data[i].type == "director"){
                let atkInfo = data[i].uinfo;
                if (!uids[atkInfo.uid]){
                    uids[atkInfo.uid] = [];
                }
                uids[atkInfo.uid].push(data[i]);
            }
            else{
                // let attInfo = data[i].pklogs[0][3];
                let attInfo = data[i].minfo;
                if (!uids[attInfo.uid]){
                    uids[attInfo.uid] = [];
                }
                uids[attInfo.uid].push(data[i]);
            } 
        }
        for (let key in uids){
            if (uids[key].length > 1){
                uids[key].sort((a, b)=>{
                    return b.fightst - a.fightst;
                });
            };
            let tmpData = {data: uids[key], isShowAll: false};
            this._data.push(tmpData);
        }

        // for (let key in dirUids){
        //     if (dirUids[key].length > 1){
        //         dirUids[key].sort((a, b)=>{
        //             return b.fightst - a.fightst;
        //         });
        //     };
        //     let tmpData = {data: dirUids[key], isShowAll: false};
        //     this._data.push(tmpData);
        // }

        if (this._data.length > 1){
            this._data.sort((a, b)=>{
                return b.data[0].fightst - a.data[0].fightst;
            });
        }
    }

    private freshData(evt:egret.Event){
        if (evt && evt.data){
            let index = evt.data.index;
            for (let i=0; i < this._data.length; i++){
                this._data[i].isShowAll = false;
            }
            this._data[index].isShowAll = evt.data.isShowAll;
        }
        this._scrollList.refreshData(this._data);
    }


    public dispose():void{
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_SEATINFO_REFRESH, this.freshData, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_GETEINFO, this.getEinfoCallback, this);
        this._data = [];
        this._scrollList = null;

        super.dispose();
    }
}