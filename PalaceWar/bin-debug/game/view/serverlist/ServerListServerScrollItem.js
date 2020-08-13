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
 * @class ServerListServerScrollItem
 */
var ServerListServerScrollItem = (function (_super) {
    __extends(ServerListServerScrollItem, _super);
    function ServerListServerScrollItem() {
        return _super.call(this) || this;
    }
    ServerListServerScrollItem.prototype.initItem = function (index, serverInfo) {
        // this.width = 320;
        // this.height = 46 +this.getSpaceY();
        var textColor = TextFieldConst.COLOR_WARN_RED3;
        var serverNameColor = TextFieldConst.COLOR_QUALITY_WHITE;
        var stateStr = LanguageManager.getlocal("serverListOld");
        if (serverInfo.flag == 1) {
            stateStr = LanguageManager.getlocal("serverListNew");
            textColor = TextFieldConst.COLOR_WARN_GREEN;
            serverNameColor = TextFieldConst.COLOR_WARN_GREEN;
        }
        var itemBg = BaseBitmap.create("serverlist_itembg"); //"public_9_probiginnerbg");
        itemBg.width = 353;
        this.addChild(itemBg);
        var zidTemp = serverInfo.zid;
        if (serverInfo.old_zid) {
            zidTemp = serverInfo.old_zid;
        }
        var zidStr = null;
        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsPtLang()) {
            zidStr = "【" + LanguageManager.getlocal("serverListServer") + zidTemp + "】";
        }
        else {
            zidStr = "【" + zidTemp + LanguageManager.getlocal("serverListServer") + "】";
        }
        var serverIdTF = ComponentManager.getTextField(zidStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        serverIdTF.textColor = serverNameColor;
        serverIdTF.x = 20;
        serverIdTF.y = itemBg.height / 2 - serverIdTF.height / 2;
        this.addChild(serverIdTF);
        var serverNameTF = ComponentManager.getTextField(serverInfo.sname, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        serverNameTF.textColor = serverNameColor;
        serverNameTF.x = itemBg.width / 2 - serverNameTF.width / 2;
        ;
        serverNameTF.y = itemBg.height / 2 - serverNameTF.height / 2;
        this.addChild(serverNameTF);
        var serverStateTF = ComponentManager.getTextField(stateStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        serverStateTF.textColor = textColor;
        serverStateTF.x = itemBg.width - 100;
        serverStateTF.y = itemBg.height / 2 - serverStateTF.height / 2;
        this.addChild(serverStateTF);
        if (serverInfo.inserver == 1) {
            var userIcon = BaseBitmap.create("serverlist_usericon");
            userIcon.x = itemBg.width - userIcon.width - 10;
            ;
            userIcon.y = itemBg.height / 2 - userIcon.height / 2;
            this.addChild(userIcon);
        }
    };
    ServerListServerScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    ServerListServerScrollItem.prototype.dispose = function () {
        this._serverInfo = null;
        _super.prototype.dispose.call(this);
    };
    return ServerListServerScrollItem;
}(ScrollListItem));
__reflect(ServerListServerScrollItem.prototype, "ServerListServerScrollItem");
//# sourceMappingURL=ServerListServerScrollItem.js.map