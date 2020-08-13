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
var AllianceWarShowPlayerInfoItem = (function (_super) {
    __extends(AllianceWarShowPlayerInfoItem, _super);
    function AllianceWarShowPlayerInfoItem() {
        var _this = _super.call(this) || this;
        _this.serverTxt = null;
        _this.nameTxt = null;
        _this._data = null;
        return _this;
    }
    AllianceWarShowPlayerInfoItem.prototype.initItem = function (index, data) {
        var view = this;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        this._data = data;
        this.width = 255;
        this.height = 20 + 5;
        if (data.empty) {
            return;
        }
        var zidname = LanguageManager.getlocal('allianceWarVsPlayerPos', [LanguageManager.getlocal("allianceMemberPo" + data.allipos)]);
        var serverTxt = ComponentManager.getTextField(zidname, 20);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, serverTxt, view, [20, 0]);
        view.addChild(serverTxt);
        var nameTxt = ComponentManager.getTextField(data.name, 20);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, serverTxt, [serverTxt.textWidth + 10, 0]);
        view.addChild(nameTxt);
        if (index == 0) {
            serverTxt.textColor = nameTxt.textColor = data.type == 'left' ? 0x47c5ff : TextFieldConst.COLOR_QUALITY_YELLOW;
        }
        view.serverTxt = serverTxt;
        view.nameTxt = nameTxt;
        // else if(Api.mergeServerVoApi.judgeIsSameServer(data.zid,Api.mergeServerVoApi.getTrueZid())){
        // 	serverTxt.textColor = nameTxt.textColor = TextFieldConst.COLOR_QUALITY_BLUE; 
        // }
    };
    AllianceWarShowPlayerInfoItem.prototype.refreshTextColor = function () {
        var view = this;
        if (view.serverTxt) {
            view.serverTxt.textColor = view.nameTxt.textColor = this._data.type == 'left' ? 0x47c5ff : TextFieldConst.COLOR_QUALITY_YELLOW;
        }
    };
    AllianceWarShowPlayerInfoItem.prototype.dispose = function () {
        var view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        _super.prototype.dispose.call(this);
    };
    return AllianceWarShowPlayerInfoItem;
}(ScrollListItem));
__reflect(AllianceWarShowPlayerInfoItem.prototype, "AllianceWarShowPlayerInfoItem");
