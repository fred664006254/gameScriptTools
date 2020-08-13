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
 * 服务器列表
 * author dky
 * date 2017/11/3
 * @class ServerListMyScrollItem
 */
var ServerListMyScrollItem = (function (_super) {
    __extends(ServerListMyScrollItem, _super);
    function ServerListMyScrollItem() {
        return _super.call(this) || this;
    }
    ServerListMyScrollItem.prototype.initItem = function (index, serverInfo) {
        this.width = 538;
        this.height = 46 + this.getSpaceY();
        var textColor = TextFieldConst.COLOR_WARN_RED3;
        var stateStr = LanguageManager.getlocal("serverListOld");
        if (serverInfo.flag == 1) {
            stateStr = LanguageManager.getlocal("serverListNew");
            textColor = TextFieldConst.COLOR_WARN_GREEN2;
        }
        var itemBg = BaseBitmap.create("load_3");
        itemBg.width = this.width;
        itemBg.height = 46;
        itemBg.x = this.width / 2 - itemBg.width / 2;
        itemBg.y = this.height / 2 - itemBg.height / 2;
        this.addChild(itemBg);
        var zidTemp = serverInfo.zid;
        if (serverInfo.old_zid) {
            zidTemp = serverInfo.old_zid;
        }
        var zidStr = null;
        if (PlatformManager.checkIsEnLang()) {
            zidStr = "【" + LanguageManager.getlocal("serverListServer") + zidTemp + "】";
        }
        else {
            zidStr = "【" + zidTemp + LanguageManager.getlocal("serverListServer") + "】";
        }
        var fntSize = TextFieldConst.FONTSIZE_TITLE_SMALL;
        if (PlatformManager.checkIsViSp()) {
            fntSize = TextFieldConst.FONTSIZE_CONTENT_COMMON;
        }
        var serverIdTF = ComponentManager.getTextField(zidStr, fntSize);
        serverIdTF.textColor = 0xfff8e9; //textColor;
        serverIdTF.x = 30;
        serverIdTF.y = this.height / 2 - serverIdTF.height / 2;
        this.addChild(serverIdTF);
        var serverNameTF = ComponentManager.getTextField(serverInfo.sname, fntSize);
        serverNameTF.textColor = 0xfff8e9;
        serverNameTF.x = this.width / 2 - serverNameTF.width / 2;
        ;
        serverNameTF.y = this.height / 2 - serverNameTF.height / 2;
        this.addChild(serverNameTF);
        var serverStateTF = ComponentManager.getTextField(stateStr, fntSize);
        serverStateTF.textColor = textColor;
        serverStateTF.x = 410;
        serverStateTF.y = this.height / 2 - serverStateTF.height / 2;
        this.addChild(serverStateTF);
    };
    ServerListMyScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    ServerListMyScrollItem.prototype.dispose = function () {
        this._serverInfo = null;
        _super.prototype.dispose.call(this);
    };
    return ServerListMyScrollItem;
}(ScrollListItem));
__reflect(ServerListMyScrollItem.prototype, "ServerListMyScrollItem");
