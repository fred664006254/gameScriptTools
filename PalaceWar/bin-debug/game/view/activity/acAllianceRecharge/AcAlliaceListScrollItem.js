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
 * 帮会充值列表节点
 * author yanyuling
 * date 2017/11/06
 * @class AcRankListScrollItem
 */
var AcAlliaceListScrollItem = (function (_super) {
    __extends(AcAlliaceListScrollItem, _super);
    function AcAlliaceListScrollItem() {
        return _super.call(this) || this;
    }
    AcAlliaceListScrollItem.prototype.initItem = function (index, data) {
        this.height = 52;
        this._data = data;
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (data.uid) {
            if (data.uid == Api.playerVoApi.getPlayerID()) {
                tarColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }
        else {
            if (data.id == Api.playerVoApi.getPlayerAllianceId()) {
                tarColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }
        var startY = 16;
        // if (index > 2)
        // {
        var titleTxt1 = ComponentManager.getTextField("", 20, tarColor);
        titleTxt1.text = String(index + 1);
        titleTxt1.x = 90 - titleTxt1.width / 2;
        titleTxt1.y = startY;
        this._nodeContainer.addChild(titleTxt1);
        // }
        // else
        // {
        //     let rankImg = BaseLoadBitmap.create("rank_"+String(index+1));
        //     rankImg.width = 51;
        //     rankImg.height = 47;
        //     rankImg.x = 90-rankImg.width/2;
        //     rankImg.y = 3 ;
        //     this.addChild(rankImg);
        // }
        var titleTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        if (data[0]) {
            titleTxt2.text = data[0] + ""; //LanguageManager.getlocal("acRankList_allianceQuit",[data.name]);
            titleTxt2.x = 245 - titleTxt2.width / 2 + 30;
        }
        // else
        // {
        //     titleTxt2.text = data.name;
        //     titleTxt2.x = 245- titleTxt2.width/2;
        // }
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);
        var titleTxt3 = ComponentManager.getTextField("", titleTxt2.size, tarColor);
        // if(data.value > 0){
        //     titleTxt3.text = App.StringUtil.changeIntToText(data.value);
        // }else{
        titleTxt3.text = LanguageManager.getlocal("allianceMemberPo" + data[1]); //"" +data.value;
        // }
        titleTxt3.x = 460 - titleTxt3.width / 2;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);
        var lineImg = BaseLoadBitmap.create("rank_line");
        lineImg.width = 500;
        lineImg.height = 2;
        lineImg.x = 30;
        lineImg.y = 50;
        this._nodeContainer.addChild(lineImg);
        // this.addTouchTap(()=>{
        //     NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT,{ruid:data.uid,rzid:Api.mergeServerVoApi.getTrueZid(data.uid)});
        // },this);
    };
    // private userShotCallback(event:egret.Event)
    // {
    //     let data = event.data.data.data;
    //     if(String(data.ruid) == this._data.uid)
    //     {
    //         if(event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT)
    //         {
    //             data["crossZone"] = 1;
    //             data['zid'] = Api.mergeServerVoApi.getTrueZid();
    //         }
    //         ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
    //     }
    // }
    AcAlliaceListScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcAlliaceListScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcAlliaceListScrollItem.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
        _super.prototype.dispose.call(this);
    };
    return AcAlliaceListScrollItem;
}(ScrollListItem));
__reflect(AcAlliaceListScrollItem.prototype, "AcAlliaceListScrollItem");
//# sourceMappingURL=AcAlliaceListScrollItem.js.map