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
 * author:qianjun
 * desc:区服排行榜单item
*/
var AcConquerMainLandRankItem = (function (_super) {
    __extends(AcConquerMainLandRankItem, _super);
    function AcConquerMainLandRankItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    AcConquerMainLandRankItem.prototype.initItem = function (index, data) {
        var view = this;
        view._data = data;
        view.width = GameConfig.stageWidth;
        view.height = 35;
        var pos = data.pos[0];
        var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        rankTxt.text = String(index + 1);
        rankTxt.x = pos.x + (pos.width - rankTxt.textWidth) / 2;
        rankTxt.y = view.height / 2 - rankTxt.textHeight / 2;
        view.addChild(rankTxt);
        pos = data.pos[1];
        var zidname = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, data.zid);
        var serverTxt = ComponentManager.getTextField(zidname, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        serverTxt.x = pos.x + (pos.width - serverTxt.textWidth) / 2;
        ; //GameConfig.stageWidth/2 - serverTxt.textWidth/2;
        serverTxt.y = view.height / 2 - serverTxt.textHeight / 2;
        view.addChild(serverTxt);
        pos = data.pos[2];
        var scoreTxt = ComponentManager.getTextField(App.StringUtil.changeIntToText(data.zscore, 4), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        scoreTxt.x = pos.x + (pos.width - scoreTxt.textWidth) / 2; //GameConfig.stageWidth/2 + 155 - scoreTxt.textWidth/2;
        scoreTxt.y = view.height / 2 - scoreTxt.textHeight / 2;
        view.addChild(scoreTxt);
        if (Api.mergeServerVoApi.judgeIsSameServer(data.zid, Api.mergeServerVoApi.getTrueZid())) {
            serverTxt.textColor = scoreTxt.textColor = TextFieldConst.COLOR_QUALITY_BLUE;
            if (rankTxt) {
                rankTxt.textColor = TextFieldConst.COLOR_QUALITY_BLUE;
            }
        }
        // this.addTouchTap(this.rankClick, this);
    };
    AcConquerMainLandRankItem.prototype.rankClick = function () {
        var view = this;
        if (view._data.type == 'rank') {
            ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSRANKLISTVIEW, {
                zid: this._data.zid,
                acid: this._data.acid,
            });
        }
        // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK, {
        // 	zid : this._data.zid,
        // });
        //
    };
    AcConquerMainLandRankItem.prototype.dispose = function () {
        var view = this;
        view.removeTouchTap();
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandRankItem;
}(ScrollListItem));
__reflect(AcConquerMainLandRankItem.prototype, "AcConquerMainLandRankItem");
//# sourceMappingURL=AcConquerMainLandRankItem.js.map