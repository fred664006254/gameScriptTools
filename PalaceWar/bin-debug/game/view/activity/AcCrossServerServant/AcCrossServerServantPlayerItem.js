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
 * desc:门客擂台item
*/
var AcCrossServerServantPlayerItem = (function (_super) {
    __extends(AcCrossServerServantPlayerItem, _super);
    function AcCrossServerServantPlayerItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    AcCrossServerServantPlayerItem.prototype.initItem = function (index, data) {
        var type = data.type;
        var view = this;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        this._data = data;
        this.width = 310;
        this.height = 40 + 10;
        var maskbg = BaseBitmap.create("crossservantplayernamebg");
        view.setLayoutPosition(LayoutConst.horizontalCentertop, maskbg, view);
        view.addChild(maskbg);
        var nameTxt = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, maskbg, [20, 0]);
        view.addChild(nameTxt);
        var zidname = Api.mergeServerVoApi.getAfterMergeSeverName(data.uid);
        var serverTxt = ComponentManager.getTextField(zidname, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        view.setLayoutPosition(LayoutConst.rightverticalCenter, serverTxt, maskbg, [20, 0]);
        view.addChild(serverTxt);
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            serverTxt.textColor = nameTxt.textColor = TextFieldConst.COLOR_QUALITY_BLUE;
        }
        // else if(Api.mergeServerVoApi.judgeIsSameServer(data.zid,Api.mergeServerVoApi.getTrueZid())){
        // 	serverTxt.textColor = nameTxt.textColor = TextFieldConst.COLOR_QUALITY_BLUE; 
        // }
    };
    AcCrossServerServantPlayerItem.prototype.dispose = function () {
        var view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerServantPlayerItem;
}(ScrollListItem));
__reflect(AcCrossServerServantPlayerItem.prototype, "AcCrossServerServantPlayerItem");
//# sourceMappingURL=AcCrossServerServantPlayerItem.js.map