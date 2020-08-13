/**
 * 聊天系统api
 * author dky
 * date 2017/9/26
 * @class ChallengeVoApi
 */
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
        _this.priOldObj = [];
        //跨服聊天
        _this.crossVoObj = [];
        _this.crossOldObj = [];
        //跨服活动聊天
        _this.accrossVoObj = [];
        _this.accrossOldObj = [];
        //赛季阵营聊天
        _this.accrossVoObjSeason = [];
        _this.accrossOldSeasonObj = [];
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
    ChatVoApi.prototype.getChatList = function () {
        return this.chatVo ? this.chatVo.chatVoObj : [];
    };
    ChatVoApi.prototype.getWorldList = function () {
        return this.chatVo ? this.chatVo.worldVoObj : [];
    };
    //除去分享
    ChatVoApi.prototype.getWorldList1 = function () {
        var array = [];
        if (this.chatVo && this.chatVo.worldVoObj) {
            for (var key in this.chatVo.worldVoObj) {
                var item = this.chatVo.worldVoObj[key];
                if (item.content && !item.content.stype) {
                    array.push(item);
                }
            }
        }
        return array;
    };
    //分享
    ChatVoApi.prototype.getWorldList2 = function () {
        var array = [];
        if (this.chatVo && this.chatVo.worldVoObj) {
            for (var key in this.chatVo.worldVoObj) {
                var item = this.chatVo.worldVoObj[key];
                if (item.content && item.content.stype) {
                    array.push(item);
                }
            }
        }
        return array;
    };
    ChatVoApi.prototype.getAllianceList = function () {
        return this.chatVo ? this.chatVo.allianceVoObj : [];
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
    ChatVoApi.prototype.getacCrossSeasonList = function () {
        var arr = [];
        this.accrossVoObjSeason.sort(function (a, b) {
            return a.ts - b.ts;
        });
        for (var i in this.accrossVoObjSeason) {
            var unit = this.accrossVoObjSeason[i];
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
                        hideVip: unit.hideVip,
                        vip: unit.vip
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
            var oneVo = {
                content: {
                    headBg: unit.headBg,
                    message: unit.content,
                    pic: unit.pic,
                    title: unit.title,
                    vip: unit.vip,
                    hideVip: unit.hideVip
                },
                sender: unit.uid,
                sendername: unit.name,
                ts: unit.ts,
                chattype: 'cross',
                zoneid: unit.zid,
                seq: unit.seq,
                transType: TransType.Cross
            };
            for (var key in this.crossOldObj) {
                var oneOld = this.crossOldObj[key];
                if (oneOld.sender == oneVo.sender && oneOld.ts == oneVo.ts && oneOld.content.trans) {
                    oneVo.content.trans = oneOld.content.trans;
                    break;
                }
            }
            this.crossVoObj.push(oneVo);
        }
        this.crossVoObj.sort(function (a, b) {
            return a.ts - b.ts;
        });
        this._isRead = false;
    };
    ChatVoApi.prototype.setAccrossChatList = function (data) {
        for (var _i = 0, _a = data.crosschat; _i < _a.length; _i++) {
            var unit = _a[_i];
            var oneVo = {
                content: {
                    headBg: unit.headBg,
                    message: unit.content,
                    pic: unit.pic,
                    title: unit.title,
                    vip: unit.vip,
                    hideVip: unit.hideVip
                },
                sender: unit.uid,
                sendername: unit.name,
                ts: unit.ts,
                chattype: 'cross',
                zoneid: unit.zid,
                seq: unit.seq,
                transType: TransType.CrossAc,
                kingdom: unit.kingdom,
                lastroundRank: unit.lastroundRank
            };
            for (var key in this.accrossOldObj) {
                var oneOld = this.accrossOldObj[key];
                if (oneOld.sender == oneVo.sender && oneOld.ts == oneVo.ts && oneOld.content.trans) {
                    oneVo.content.trans = oneOld.content.trans;
                    break;
                }
            }
            this.accrossVoObj.push(oneVo);
        }
        this.accrossVoObj.sort(function (a, b) {
            return a.ts - b.ts;
        });
        this._isRead = false;
    };
    ChatVoApi.prototype.setAccrossChatSeasonList = function (data) {
        for (var _i = 0, _a = data.crosschat; _i < _a.length; _i++) {
            var unit = _a[_i];
            var oneVo = {
                content: {
                    headBg: unit.headBg,
                    message: unit.content,
                    pic: unit.pic,
                    title: unit.title,
                    vip: unit.vip,
                    hideVip: unit.hideVip
                },
                sender: unit.uid,
                sendername: unit.name,
                ts: unit.ts,
                chattype: 'cross',
                zoneid: unit.zid,
                seq: unit.seq,
                transType: TransType.CrossAc,
                kingdom: unit.kingdom,
                lastroundRank: unit.lastroundRank
            };
            for (var key in this.accrossOldSeasonObj) {
                var oneOld = this.accrossOldSeasonObj[key];
                if (oneOld.sender == oneVo.sender && oneOld.ts == oneVo.ts && oneOld.content.trans) {
                    oneVo.content.trans = oneOld.content.trans;
                    break;
                }
            }
            this.accrossVoObjSeason.push(oneVo);
        }
        this.accrossVoObjSeason.sort(function (a, b) {
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
            for (var j in key_arr) {
                var sortid = key_arr[j];
                var unit = chatobj.content[sortid];
                var isself = unit.sender == Api.playerVoApi.getPlayerID();
                arr.push({
                    content: {
                        title: isself ? Api.playerVoApi.getTitleInfo() : chatobj.title,
                        headBg: isself ? Api.playerVoApi.getPlayerPtitle() : chatobj.headBg,
                        pic: isself ? Api.playerVoApi.getPlayePicId() : chatobj.pic,
                        vip: isself ? Api.playerVoApi.getPlayerVipLevel() : chatobj.vip,
                        message: unit.message,
                        ket: chatobj.ket,
                        ts: unit.ts,
                        trans: unit.trans,
                        hideVip: chatobj.hideVip
                    },
                    sender: unit.sender,
                    sendername: unit.sendername,
                    transType: TransType.Pri
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
    ChatVoApi.prototype.setPriTrans = function (trans, info) {
        for (var key in this.prichatVoObj[info.sender].content) {
            var oneVo = this.prichatVoObj[info.sender].content[key];
            if (oneVo.sender == info.sender && oneVo.ts == info.content.ts) {
                oneVo.trans = trans;
                break;
            }
        }
    };
    ChatVoApi.prototype.clearPriChatList = function () {
        this.priOldObj = this.prichatVoObj;
        for (var i in this.prichatVoObj) {
            this.prichatVoObj[i] = null;
            delete this.prichatVoObj[i];
        }
        this.prichatVoObj = {};
    };
    ChatVoApi.prototype.clearCrossChatList = function () {
        this.crossOldObj = this.crossVoObj;
        this.crossVoObj = [];
    };
    ChatVoApi.prototype.clearAcCrossChatList = function () {
        this.accrossOldObj = this.accrossVoObj;
        this.accrossVoObj = [];
    };
    ChatVoApi.prototype.clearAcCrossChatSeasonList = function () {
        this.accrossOldSeasonObj = this.accrossVoObjSeason;
        this.accrossVoObjSeason = [];
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
            var messageStr = data.content.message;
            if (Api.chatVoApi.isShieldEmoji()) {
                messageStr = Api.chatVoApi.checkShieldEmoji(messageStr);
                if (messageStr == "") {
                    messageStr = LanguageManager.getlocal("chatEmojiShield");
                }
            }
            var chatMesaage = titleStr + "<font color=" + TextFieldConst.COLOR_LIGHT_YELLOW + ">" + data.sendername + "</font>" + ":" + messageStr;
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
    ChatVoApi.prototype.getLastAcCrossMessageSeason = function () {
        var obj = this.accrossVoObjSeason;
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
    ChatVoApi.prototype.checkMianUIRedDot = function () {
        if (Api.chatVoApi.isNewMsg()) {
            return true;
        }
        // for (let i:number = 0;i<3;i++)
        // {
        // 	let lastTime:number = Api.chatVoApi.getLastTime(i);
        // 	if (lastTime == -1)
        // 	{
        // 		continue;
        // 	}
        // 	else
        // 	{	
        // 		let localtime:number = 0;
        // 		let t:string = LocalStorageManager.get(LocalStorageConst.LOCAL_CHAT_LASTTIME+Api.playerVoApi.getPlayerID()+"_chat"+i);
        // 		if(!t || t == "")
        // 		{
        // 			// continue;
        // 		}
        // 		else
        // 		{	
        // 			localtime = Number(t);
        // 		}
        // 		if (lastTime > localtime)
        // 		{
        // 			return true;
        // 		}
        // 	}
        // }
        return false;
    };
    ChatVoApi.prototype.getLastTime = function (type) {
        var time = -1;
        var chatVo = null;
        if (type == 0) {
            var tempAarry = Api.chatVoApi.getWorldList1();
            if (tempAarry.length > 0) {
                chatVo = tempAarry[tempAarry.length - 1];
            }
        }
        else if (type == 1) {
            var tempAarry = Api.chatVoApi.getWorldList2();
            if (tempAarry.length > 0) {
                chatVo = tempAarry[tempAarry.length - 1];
            }
        }
        else {
            var tempAarry = Api.chatVoApi.getAllianceList();
            if (tempAarry.length > 0) {
                chatVo = tempAarry[tempAarry.length - 1];
            }
        }
        if (chatVo) {
            time = chatVo.ts || chatVo.content.ts;
        }
        return time;
    };
    /**
     * 检测对话是否需要触发告警统计
     * @param chatStr 对话内容
     */
    ChatVoApi.prototype.checkShieldAndReportChat = function (chatStr) {
        Config.ShieldCfg.checkShieldReport(chatStr);
    };
    ChatVoApi.prototype.isShieldEmoji = function () {
        // return true;
        if (App.DeviceUtil.isRuntime2() && App.DeviceUtil.isIOS()) {
            return true;
        }
        return false;
    };
    ChatVoApi.prototype.checkShieldEmoji = function (name) {
        if (this.isShieldEmoji()) {
            //name = name.replace(/[\u2190-\u21FF]|[\u2600-\u26FF]|[\u2700-\u27BF]|[\u3000-\u303F]|[\u1F300-\u1F64F]|[\u1F680-\u1F6FF]/g, "");
            //name = name.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
            var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
            name = name.replace(regStr, "");
        }
        return name;
    };
    ChatVoApi.prototype.checkHasEmoji = function (name) {
        var oldName = name;
        name = this.checkShieldEmoji(name);
        return oldName != name;
    };
    ChatVoApi.prototype.dispose = function () {
        this.chatVo = null;
        this._lastMessage = "";
        this._lastTime = null;
        this.chatblockVo = null;
        this.prichatVoObj = null;
        this.crossVoObj = [];
        this.crossOldObj = [];
        this.priOldObj = [];
        this.accrossVoObj = [];
        this.accrossOldObj = [];
        this.accrossVoObjSeason = [];
        this.accrossOldSeasonObj = [];
        _super.prototype.dispose.call(this);
    };
    return ChatVoApi;
}(BaseVoApi));
__reflect(ChatVoApi.prototype, "ChatVoApi");
//# sourceMappingURL=ChatVoApi.js.map