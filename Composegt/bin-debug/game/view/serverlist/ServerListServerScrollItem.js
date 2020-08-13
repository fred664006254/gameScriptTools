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
        this.width = 352;
        this.height = 47; //46 +this.getSpaceY();
        var textColor = TextFieldConst.COLOR_WARN_RED3; // 0xff1818;// TextFieldConst.COLOR_WARN_RED3;
        var stateStr = LanguageManager.getlocal("serverListOld");
        if (serverInfo.flag == 1) {
            stateStr = LanguageManager.getlocal("serverListNew");
            textColor = TextFieldConst.COLOR_WARN_GREEN2;
        }
        var itemBg = BaseBitmap.create("load_4");
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
        var fontSize = TextFieldConst.FONTSIZE_CONTENT_COMMON;
        if (PlatformManager.checkIsViSp()) {
            fontSize = TextFieldConst.FONTSIZE_CONTENT_SMALL;
        }
        var serverIdTF = ComponentManager.getTextField(zidStr, fontSize);
        serverIdTF.textColor = 0xfff8e9;
        serverIdTF.x = 20;
        serverIdTF.y = this.height / 2 - serverIdTF.height / 2;
        this.addChild(serverIdTF);
        var serverNameTF = ComponentManager.getTextField(serverInfo.sname, fontSize);
        serverNameTF.textColor = 0xfff8e9;
        serverNameTF.x = this.width / 2 - serverNameTF.width / 2;
        ;
        serverNameTF.y = this.height / 2 - serverNameTF.height / 2;
        this.addChild(serverNameTF);
        var serverStateTF = ComponentManager.getTextField(stateStr, fontSize);
        serverStateTF.textColor = textColor;
        serverStateTF.x = 250;
        serverStateTF.y = this.height / 2 - serverStateTF.height / 2;
        this.addChild(serverStateTF);
        if (serverInfo.inserver == 1) {
            var userIcon = BaseBitmap.create("serverlist_usericon");
            userIcon.x = 300;
            userIcon.y = this.height / 2 - userIcon.height / 2;
            this.addChild(userIcon);
        }
    };
    ServerListServerScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    ServerListServerScrollItem.prototype.dispose = function () {
        this._serverInfo = null;
        _super.prototype.dispose.call(this);
    };
    return ServerListServerScrollItem;
}(ScrollListItem));
__reflect(ServerListServerScrollItem.prototype, "ServerListServerScrollItem");
