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
* 仇人信息
* date 2020.5.13
* author ycg
* @name SixSection1SeatInfoPopupViewTab3
*/
var SixSection1SeatInfoPopupViewTab3 = (function (_super) {
    __extends(SixSection1SeatInfoPopupViewTab3, _super);
    function SixSection1SeatInfoPopupViewTab3(data) {
        var _this = _super.call(this) || this;
        _this._data = [];
        _this._scrollList = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    SixSection1SeatInfoPopupViewTab3.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_SEATINFO_REFRESH, this.freshData, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION1_GETEINFO, this.getEinfoCallback, this);
        NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_GETEINFO, {});
        this.width = 530;
        this.height = 675;
        var bg = BaseBitmap.create("public_9_bg93");
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
        var dataList = [];
        var scrollList = ComponentManager.getScrollList(SixSection1SeatInfoScrollItem3, dataList, new egret.Rectangle(0, 0, bg.width, bg.height - 10));
        scrollList.setPosition(bg.x, bg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        var tipBg = BaseBitmap.create("sixsection1_popbottombg");
        tipBg.setPosition(bg.x + bg.width / 2 - tipBg.width / 2, bg.y + bg.height - 105);
        this.addChild(tipBg);
    };
    SixSection1SeatInfoPopupViewTab3.prototype.getEinfoCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        var data = evt.data.data.data;
        // console.log("getEinfoCallback", data);
        this.formatEinfoData(data.einfo);
        this._scrollList.refreshData(this._data);
    };
    SixSection1SeatInfoPopupViewTab3.prototype.formatEinfoData = function (data) {
        this._data = [];
        var uids = {};
        var dirUids = {};
        for (var i = 0; i < data.length; i++) {
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
            if (data[i].type == "director") {
                var atkInfo = data[i].uinfo;
                if (!uids[atkInfo.uid]) {
                    uids[atkInfo.uid] = [];
                }
                uids[atkInfo.uid].push(data[i]);
            }
            else {
                // let attInfo = data[i].pklogs[0][3];
                var attInfo = data[i].minfo;
                if (!uids[attInfo.uid]) {
                    uids[attInfo.uid] = [];
                }
                uids[attInfo.uid].push(data[i]);
            }
        }
        for (var key in uids) {
            if (uids[key].length > 1) {
                uids[key].sort(function (a, b) {
                    return b.fightst - a.fightst;
                });
            }
            ;
            var tmpData = { data: uids[key], isShowAll: false };
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
        if (this._data.length > 1) {
            this._data.sort(function (a, b) {
                return b.data[0].fightst - a.data[0].fightst;
            });
        }
    };
    SixSection1SeatInfoPopupViewTab3.prototype.freshData = function (evt) {
        if (evt && evt.data) {
            var index = evt.data.index;
            for (var i = 0; i < this._data.length; i++) {
                this._data[i].isShowAll = false;
            }
            this._data[index].isShowAll = evt.data.isShowAll;
        }
        this._scrollList.refreshData(this._data);
    };
    SixSection1SeatInfoPopupViewTab3.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_SEATINFO_REFRESH, this.freshData, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_GETEINFO, this.getEinfoCallback, this);
        this._data = [];
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return SixSection1SeatInfoPopupViewTab3;
}(CommonViewTab));
__reflect(SixSection1SeatInfoPopupViewTab3.prototype, "SixSection1SeatInfoPopupViewTab3");
//# sourceMappingURL=SixSection1SeatInfoPopupViewTab3.js.map