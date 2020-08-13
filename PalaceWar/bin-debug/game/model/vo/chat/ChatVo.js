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
var ChatVo = (function (_super) {
    __extends(ChatVo, _super);
    function ChatVo() {
        var _this = _super.call(this) || this;
        // 聊天vo列表
        _this.chatVoObj = [];
        //世界聊天
        _this.worldVoObj = [];
        //帮会聊天
        _this.allianceVoObj = [];
        /*
        * uid 作为唯一标识属性 {
            '10002147' : {
                chattext : {//消息记录
                    1 : {message : '', sender : ''},
                    2 : {},
                },
                info : 1002147的玩家相关信息
            }
        }
        */
        _this.chatSign = {};
        _this.maxL = 30;
        if (PlatformManager.checkIsRuLang()) {
            _this.maxL = 50;
        }
        return _this;
    }
    ChatVo.prototype.initData = function (data) {
        if (data) {
            //判断屏蔽
            // if(LocalStorageManager.get("shield" + data.sender))
            if (Api.chatVoApi.getIsBlock(data.sender)) {
                return;
            }
            //判断重复
            if (data.sign) {
                if (this.chatSign[data.sign]) {
                    return;
                }
                else {
                    this.chatSign[data.sign] = true;
                }
            }
            if (data.channel >= 10000 && data.channel != Api.playerVoApi.getPlayerAllianceId()) {
                return;
            }
            if (data.sender != Api.playerVoApi.getPlayerID()) {
                //判断刷广告
                var num = 0;
                for (var index = 0; index < this.chatVoObj.length; index++) {
                    var element = this.chatVoObj[index];
                    if (data.sender == element.sender) {
                        if (data.content.message == element.content.message && !data.content.sinfo) {
                            num++;
                        }
                        else {
                            num = 0;
                        }
                        if (num > 2) {
                            return;
                        }
                    }
                }
            }
            this.chatVoObj.push(data);
            if (this.chatVoObj.length > this.maxL) {
                this.chatVoObj.shift();
            }
            if (data.channel < 10000) {
                this.worldVoObj.push(data);
                if (this.worldVoObj.length > this.maxL) {
                    this.worldVoObj.shift();
                }
            }
            else {
                this.allianceVoObj.push(data);
                if (this.allianceVoObj.length > this.maxL) {
                    this.allianceVoObj.shift();
                }
            }
            var titleStr = LanguageManager.getlocal("chatWorldTitle");
            if (data.channel > 10000) {
                titleStr = LanguageManager.getlocal("chatallianceTitle");
            }
            var messageStr = data.content.message;
            if (Api.chatVoApi.isShieldEmoji()) {
                messageStr = Api.chatVoApi.checkShieldEmoji(messageStr);
                if (messageStr == "") {
                    messageStr = LanguageManager.getlocal("chatEmojiShield");
                }
            }
            var chatMesaage = titleStr + "<font color=" + TextFieldConst.COLOR_LIGHT_YELLOW + ">" + data.sendername + "</font>" + ":" + messageStr;
            Api.chatVoApi.setLastMessage(chatMesaage);
        }
    };
    ChatVo.prototype.dispose = function () {
        this.chatVoObj = null;
        this.worldVoObj = null;
        this.allianceVoObj = null;
        this.chatSign = {};
    };
    return ChatVo;
}(BaseVo));
__reflect(ChatVo.prototype, "ChatVo");
//# sourceMappingURL=ChatVo.js.map