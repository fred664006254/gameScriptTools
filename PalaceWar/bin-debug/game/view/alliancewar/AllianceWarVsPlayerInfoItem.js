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
 * desc:帮会战斗item
*/
var AllianceWarVsPlayerInfoItem = (function (_super) {
    __extends(AllianceWarVsPlayerInfoItem, _super);
    function AllianceWarVsPlayerInfoItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    AllianceWarVsPlayerInfoItem.prototype.initItem = function (index, data) {
        var view = this;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        this._data = data;
        this.width = 310;
        this.height = 40 + 10;
        var maskbg = BaseBitmap.create("crossservantplayernamebg");
        view.setLayoutPosition(LayoutConst.horizontalCentertop, maskbg, view);
        view.addChild(maskbg);
        var zidname = LanguageManager.getlocal('allianceWarVsPlayerPos', [LanguageManager.getlocal("allianceMemberPo" + data.allipos)]);
        var serverTxt = ComponentManager.getTextField(zidname, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, serverTxt, maskbg, [20, 0]);
        view.addChild(serverTxt);
        var nameTxt = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, serverTxt, [serverTxt.textWidth + 10, 0]);
        view.addChild(nameTxt);
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            serverTxt.textColor = nameTxt.textColor = TextFieldConst.COLOR_QUALITY_BLUE;
        }
        // else if(Api.mergeServerVoApi.judgeIsSameServer(data.zid,Api.mergeServerVoApi.getTrueZid())){
        // 	serverTxt.textColor = nameTxt.textColor = TextFieldConst.COLOR_QUALITY_BLUE; 
        // }
    };
    AllianceWarVsPlayerInfoItem.prototype.dispose = function () {
        var view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        _super.prototype.dispose.call(this);
    };
    return AllianceWarVsPlayerInfoItem;
}(ScrollListItem));
__reflect(AllianceWarVsPlayerInfoItem.prototype, "AllianceWarVsPlayerInfoItem");
//# sourceMappingURL=AllianceWarVsPlayerInfoItem.js.map