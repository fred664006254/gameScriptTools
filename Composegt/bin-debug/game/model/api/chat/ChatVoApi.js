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
 * 聊天系统api
 * author dky
 * date 2017/9/26
 * @class ChallengeVoApi
 */
var TransType;
(function (TransType) {
    TransType[TransType["World"] = 1] = "World";
    TransType[TransType["Alliance"] = 2] = "Alliance";
    TransType[TransType["Pri"] = 3] = "Pri";
    TransType[TransType["Cross"] = 4] = "Cross";
    TransType[TransType["CrossAc"] = 5] = "CrossAc";
})(TransType || (TransType = {}));
var ChatVoApi = (function (_super) {
    __extends(ChatVoApi, _super);
    function ChatVoApi() {
        var _this = _super.call(this) || this;
        _this._lastMessage = "";
        _this._lastTime = 0;
        _this._chatID = 0;
        _this._lastAllianceId = 0;
        _this._isRead = false;
        //私聊
        _this.prichatVoObj = {};
        //跨服聊天
        _this.crossVoObj = [];
        //跨服活动聊天
        _this.accrossVoObj = [];
        _this._lastMsgst = 0; //最新一条消息的时间戳
        _this._lastAlliMsgst = 0; //最新一条帮会消息的时间戳
        _this._isNewAlliMsg = false; //是否有新消息
        return _this;
    }
    ChatVoApi.prototype.formatData2 = function (data) {
        if (this.chatblockVo == null) {
            var className = this.getClassName();
            var voClassName = "ChatblockVo";
            var voClass = egret.getDefinitionByName(voClassName);
            this.chatblockVo = new voClass();
            // this.chatblockVo.initData(data);
            this[App.StringUtil.firstCharToLower(voClassName)] = this.chatblockVo;
        }
        this.chatblockVo.initData(data);
    };
    ChatVoApi.prototype.getChatBlockVo = function () {
        return this.chatblockVo;
    };
    ChatVoApi.prototype.getIsBlock = function (uid) {
        for (var index = 0; index < this.chatblockVo.info.length; index++) {
            var element = this.chatblockVo.info[index];
            if (element == uid) {
                return true;
            }
        }
        return false;
    };
    ChatVoApi.prototype.getCrossList = function () {
        var arr = [];
        this.crossVoObj.sort(function (a, b) {
            return a.ts - b.ts;
        });
        for (var i in this.crossVoObj) {
            var unit = this.crossVoObj[i];
            if (this.getIsBlock(unit.sender)) {
                continue;
            }
            else {
                arr.push(unit);
            }
        }
        return arr;
    };
    ChatVoApi.prototype.getacCrossList = function () {
        var arr = [];
        this.accrossVoObj.sort(function (a, b) {
            return a.ts - b.ts;
        });
        for (var i in this.accrossVoObj) {
            var unit = this.accrossVoObj[i];
            if (this.getIsBlock(unit.sender)) {
                continue;
            }
            else {
                arr.push(unit);
            }
        }
        return arr;
    };
    /*---------------------获取数据接口------------------------------ */
    //object深度复制，规避js原有的引用传递
    ChatVoApi.prototype.object_clone = function (source) {
        var data = {};
        for (var key in source) {
            if (source[key] == null) {
                continue;
            }
            if (this.getType(source[key]) == 'object') {
                data[key] = this.object_clone(source[key]);
            }
            else if (this.getType(source[key]) == "array") {
                data[key] = this.arr_clone(source[key]);
            }
            else {
                data[key] = source[key];
            }
        }
        return data;
    };
    //arr深度复制,对所有复杂arr均有效，规避js原有的引用传递
    ChatVoApi.prototype.arr_clone = function (source) {
        var destination = [];
        for (var key in source) {
            var p = parseInt(key);
            if (this.getType(source[p]) == "array") {
                destination[p] = [];
                arguments.callee(destination[p], source[p]);
            }
            else if (this.getType(source[p]) == "object") {
                destination[p] = {};
                destination[p] = this.object_clone(source[p]);
            }
            else {
                destination[p] = source[p];
            }
        }
        return destination;
    };
    ChatVoApi.prototype.getType = function (o) {
        var _t;
        return ((_t = typeof (o)) == "object" ? o == null && "null" || Object.prototype.toString.call(o).slice(8, -1) : _t).toLowerCase();
    };
    ChatVoApi.prototype.getTabChatList = function () {
        var arr = [];
        var obj = this.prichatVoObj;
        for (var i in obj) {
            if (this.getIsBlock(i)) {
                continue;
            }
            var unit = obj[i];
            var key_arr = Object.keys(unit.content);
            if (unit && key_arr.length) {
                key_arr.sort(function (a, b) {
                    return Number(a) - Number(b);
                });
                arr.push({
                    content: {
                        title: unit.title,
                        headBg: unit.headBg,
                        pic: unit.pic,
                        message: unit.content[key_arr[key_arr.length - 1]].message,
                        titleLv: unit.titleLv,
                        tlv: unit.tlv
                    },
                    sender: i,
                    sendername: unit.name,
                    updated_at: unit.updated_at
                });
            }
            else {
                arr.push({});
            }
        }
        arr.sort(function (a, b) {
            return b.updated_at - a.updated_at;
        });
        return arr;
    };
    ChatVoApi.prototype.getCrossChatList = function () {
        return this.crossVoObj;
    };
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
    ChatVoApi.prototype.setCrossChatList = function (data) {
        //crosschat
        for (var _i = 0, _a = data.crosschat; _i < _a.length; _i++) {
            var unit = _a[_i];
            var contentData = {
                headBg: unit.headBg,
                message: unit.content,
                pic: unit.pic,
                title: unit.title,
                vip: unit.vip,
                titleLv: unit.titleLv,
                tlv: unit.tlv,
            };
            if (unit.stype) {
                contentData['stype'] = unit.stype;
            }
            if (unit.sinfo) {
                contentData['sinfo'] = unit.sinfo;
            }
            this.crossVoObj.push({
                content: contentData,
                sender: unit.uid,
                sendername: unit.name,
                ts: unit.ts,
                chattype: 'cross',
                zoneid: unit.zid,
                seq: unit.seq
            });
        }
        this.crossVoObj.sort(function (a, b) {
            return a.ts - b.ts;
        });
        this._isRead = false;
    };
    ChatVoApi.prototype.setAccrossChatList = function (data) {
        for (var _i = 0, _a = data.crosschat; _i < _a.length; _i++) {
            var unit = _a[_i];
            this.accrossVoObj.push({
                content: {
                    headBg: unit.headBg,
                    message: unit.content,
                    pic: unit.pic,
                    title: unit.title,
                    vip: unit.vip,
                },
                sender: unit.uid,
                sendername: unit.name,
                ts: unit.ts,
                chattype: 'cross',
                zoneid: unit.zid,
                seq: unit.seq
            });
        }
        this.accrossVoObj.sort(function (a, b) {
            return a.ts - b.ts;
        });
        this._isRead = false;
    };
    ChatVoApi.prototype.getPriChatList = function (uid) {
        var arr = [];
        if (this.getIsBlock(uid)) {
            return arr;
        }
        var obj = this.prichatVoObj;
        if (obj && obj[uid]) {
            var chatobj = obj[uid];
            var key_arr = Object.keys(chatobj.content);
            key_arr.sort(function (a, b) {
                return Number(a) - Number(b);
            });
            var tlv = "1";
            var ttitleid = Api.playerVoApi.getTitleid();
            var titleInfo2 = Api.itemVoApi.getTitleInfoVoById(Number(ttitleid));
            if (titleInfo2) {
                var itemCfg = titleInfo2.itemCfg;
                if (itemCfg && itemCfg.emperorLvUpNeed && itemCfg.emperorLvUpNeed.length > 0) {
                    tlv = "" + titleInfo2.lv;
                }
            }
            for (var j in key_arr) {
                var sortid = key_arr[j];
                var unit = chatobj.content[sortid];
                var isself = unit.sender == Api.playerVoApi.getPlayerID();
                var titleInfo = Api.itemVoApi.getTitleInfoVoById(Number(Api.playerVoApi.getVipHeadID()));
                arr.push({
                    content: {
                        title: isself ? Api.playerVoApi.getTitleid() : chatobj.title,
                        headBg: isself ? Api.playerVoApi.getVipHeadBg() : chatobj.headBg,
                        pic: isself ? Api.playerVoApi.getPlayePicId() : chatobj.pic,
                        vip: isself ? Api.playerVoApi.getPlayerVipLevel() : chatobj.vip,
                        titleLv: isself ? (titleInfo ? titleInfo.lv : 0) : chatobj.titleLv,
                        message: unit.message,
                        ket: chatobj.ket,
                        ts: unit.ts,
                        tlv: isself ? tlv : chatobj.tlv,
                    },
                    sender: unit.sender,
                    sendername: unit.sendername,
                });
            }
        }
        return arr;
    };
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
    ChatVoApi.prototype.setPriChatList = function (data) {
        for (var i in data) {
            // if(this.getIsBlock(i)){
            // 	continue;
            // }
            var unit = data[i];
            var temp = this.prichatVoObj[i];
            if (!temp) {
                this.prichatVoObj[i] = {
                    content: {},
                };
                // this.chatVo.prichatVoObj[i].info = unit.
            }
            //填写用户信息
            for (var j in unit) {
                if (j != 'content') {
                    this.prichatVoObj[i][j] = unit[j];
                }
            }
            //填写聊天历史
            for (var k in unit.content) {
                var text = unit.content[k];
                if (!this.prichatVoObj[i].content[k]) {
                    this.prichatVoObj[i].content[k] = text;
                }
            }
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_PRICHAT_FRESHVIEW);
    };
    ChatVoApi.prototype.arr2obj = function (arr, key) {
        var obj = {};
        if (arr) {
            var ln = arr.length;
            if (ln) {
                for (var i = 0; i < ln; i++) {
                    var cd = arr[i];
                    obj[cd[key]] = cd;
                }
            }
        }
        return obj;
    };
    ChatVoApi.prototype.getChatList = function () {
        return this.chatVo ? this.chatVo.chatVoObj : [];
    };
    ChatVoApi.prototype.getWorldList = function () {
        if (Api.otherInfoVoApi.getShareblock() == 1) {
            return this.chatVo ? this.chatVo.worldVoObj2 : [];
        }
        return this.chatVo ? this.chatVo.worldVoObj : [];
    };
    ChatVoApi.prototype.getBlockWorldList = function () {
        return this.chatVo ? this.chatVo.worldVoObj2 : [];
    };
    ChatVoApi.prototype.getAllianceList = function () {
        if (Api.otherInfoVoApi.getAllianceShareblock() == 1) {
            return this.chatVo ? this.chatVo.allianceVoObj2 : [];
        }
        return this.chatVo ? this.chatVo.allianceVoObj : [];
    };
    ChatVoApi.prototype.clearPriChatList = function () {
        for (var i in this.prichatVoObj) {
            this.prichatVoObj[i] = null;
            delete this.prichatVoObj[i];
        }
        this.prichatVoObj = {};
    };
    ChatVoApi.prototype.clearCrossChatList = function () {
        this.crossVoObj = [];
    };
    ChatVoApi.prototype.clearAcCrossChatList = function () {
        this.accrossVoObj = [];
    };
    ChatVoApi.prototype.judgeIsHaveNewMsg = function (uid, time) {
        var count = 0;
        var obj = this.prichatVoObj[uid];
        if (obj) {
            var unit = obj.content;
            for (var i in unit) {
                var element = unit[i];
                if (!this.getIsBlock(uid) && element.ts >= time && element.isread == 0 && element.sender != Api.playerVoApi.getPlayerID()) {
                    ++count;
                }
            }
        }
        return count > 0;
    };
    ChatVoApi.prototype.isNewMsg = function () {
        var obj = this.getpublicRedhot();
        return Object.keys(obj).length > 0;
    };
    ChatVoApi.prototype.getpublicRedhot = function () {
        var unread = {};
        for (var i in this.prichatVoObj) {
            if (this.getIsBlock(i)) {
                continue;
            }
            var count = 0;
            var unit = this.prichatVoObj[i].content;
            for (var j in unit) {
                if (unit[j].sender != Api.playerVoApi.getPlayerID() && unit[j].isread == 0) {
                    ++count;
                }
            }
            if (count) {
                unread[i] = count;
            }
        }
        return unread;
    };
    ChatVoApi.prototype.setMsgRead = function (uid) {
        var data = this.prichatVoObj[uid];
        if (data && data.content) {
            for (var i in data.content) {
                data.content[i].isread = 1;
            }
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_PRICHAT_FRESHVIEW);
        }
    };
    ChatVoApi.prototype.getUnreadMsgNum = function (uid) {
        var unread = this.getpublicRedhot();
        var count = 0;
        if (uid) {
            count = unread[uid] || 0;
        }
        else {
            for (var i in unread) {
                count += unread[i];
            }
        }
        return count;
    };
    ChatVoApi.prototype.setLastMessage = function (message) {
        this._lastMessage = message;
    };
    ChatVoApi.prototype.refreshLastMessage = function () {
        if (Api.playerVoApi.getPlayerAllianceId() == 0 && this.chatVo && this.chatVo.worldVoObj.length > 0) {
            var data = this.chatVo.worldVoObj[this.chatVo.worldVoObj.length - 1];
            var titleStr = LanguageManager.getlocal("chatWorldTitle");
            var chatMesaage = titleStr + "<font color=" + TextFieldConst.COLOR_LIGHT_YELLOW + ">" + data.sendername + "</font>" + ":" + data.content.message;
            this._lastMessage = chatMesaage;
        }
    };
    ChatVoApi.prototype.getLastMessage = function () {
        return this._lastMessage;
    };
    ChatVoApi.prototype.getChatSign = function () {
        this._chatID++;
        return this._chatID.toString() + GameData.serverTime + Api.playerVoApi.getPlayerID().toString();
    };
    ChatVoApi.prototype.clearChat = function () {
        if (this.chatVo) {
            this.chatVo.worldVoObj = [];
            this.chatVo.chatVoObj = [];
            this.chatVo.allianceVoObj = [];
        }
    };
    ChatVoApi.prototype.getLabaNum = function () {
        //1651
        return Api.itemVoApi.getItemNumInfoVoById(1651);
    };
    ChatVoApi.prototype.getLastCrossMessage = function () {
        var obj = this.crossVoObj;
        obj.sort(function (a, b) {
            return b.ts - a.ts;
        });
        for (var i in obj) {
            if (this.getIsBlock(obj[i].sender)) {
                continue;
            }
            else {
                return obj[i];
            }
        }
        return null;
    };
    ChatVoApi.prototype.getLastAcCrossMessage = function () {
        var obj = this.accrossVoObj;
        obj.sort(function (a, b) {
            return b.ts - a.ts;
        });
        for (var i in obj) {
            if (this.getIsBlock(obj[i].sender)) {
                continue;
            }
            else {
                return obj[i];
            }
        }
        return null;
    };
    ChatVoApi.prototype.getIsReadCross = function () {
        return this._isRead;
    };
    ChatVoApi.prototype.setIsReadCross = function (flag) {
        this._isRead = flag;
    };
    Object.defineProperty(ChatVoApi.prototype, "lastPublicMsgst", {
        get: function () {
            return this._lastMsgst;
        },
        //最新的世界聊天时间戳
        set: function (st) {
            this._lastMsgst = st;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatVoApi.prototype, "lastAlliMsgst", {
        get: function () {
            return this._lastAlliMsgst;
        },
        //最新的帮会聊天时间戳
        set: function (st) {
            this._lastAlliMsgst = st;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatVoApi.prototype, "isNewAlliMsg", {
        get: function () {
            return this._isNewAlliMsg;
        },
        //最新的帮会聊天时间戳
        set: function (st) {
            this._isNewAlliMsg = st;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 检测对话是否需要触发告警统计
     * @param chatStr 对话内容
     */
    ChatVoApi.prototype.checkShieldAndReportChat = function (chatStr, channel) {
        // Config.ShieldCfg.checkShieldReport(chatStr);
        StatisticsHelper.reportShieldChat(chatStr, channel);
    };
    ChatVoApi.prototype.isShowRedForAllianeChat = function () {
        return Api.playerVoApi.firstCMDst() <= this.lastAlliMsgst && this.isNewAlliMsg;
    };
    ChatVoApi.prototype.dispose = function () {
        this.chatVo = null;
        this._lastMessage = "";
        this._lastTime = null;
        this.chatblockVo = null;
        this.prichatVoObj = null;
        this.crossVoObj = [];
        this._lastMsgst = 0; //最新一条消息的时间戳
        this._lastAlliMsgst = 0; //最新一条帮会消息的时间戳
        _super.prototype.dispose.call(this);
    };
    return ChatVoApi;
}(BaseVoApi));
__reflect(ChatVoApi.prototype, "ChatVoApi");
