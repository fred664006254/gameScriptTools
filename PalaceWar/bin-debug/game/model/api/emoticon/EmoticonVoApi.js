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
 * 表情包Api
 * author yangchengguo
 * date 2019.8.12
 * @class EmoticonVoApi
 */
var EmoticonVoApi = (function (_super) {
    __extends(EmoticonVoApi, _super);
    function EmoticonVoApi() {
        var _this = _super.call(this) || this;
        _this.emoticonVo = null;
        _this.emoticonData1 = [];
        return _this;
    }
    EmoticonVoApi.prototype.formatData = function (data) {
        if (this.emoticonVo == null) {
            this.emoticonVo = new EmoticonVo();
        }
        this.emoticonVo.initData(data);
        _super.prototype.formatData.call(this, data);
    };
    //表情分组
    EmoticonVoApi.prototype.getEmotiocnGroupId = function () {
        var typeArr = this.cfg.emoticonTypeArr;
        //判断表情包系列开关
        var groupList = [];
        for (var i = 0; i < typeArr.length; i++) {
            if (Api.switchVoApi.checkEmoticonGroupOpen(typeArr[i])) {
                groupList.push(typeArr[i]);
            }
        }
        var recentId = this.getRecentEmoticonId();
        App.LogUtil.log("getEmotiocnGroupId:" + recentId + " recentId.length:" + recentId.length);
        if (recentId && recentId.length > 0 && groupList[0] != 0) {
            App.LogUtil.log("recentid **:" + recentId);
            groupList.unshift(0);
        }
        groupList.sort(function (a, b) { return a - b; });
        return groupList;
    };
    //是否已获得表情
    EmoticonVoApi.prototype.isGetEmoticon = function (id) {
        var data = this.emoticonVo.emoticonId;
        for (var key in data) {
            if (data[key] == id) {
                return true;
            }
        }
        return false;
    };
    //表情数据排序
    EmoticonVoApi.prototype.sortEmoticonData = function (data, groupId) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].unlock == 1) {
                data[i].sortId = Number(data[i].id) - data.length + 1;
                data[i].status = 1;
            }
            else if (data[i].unlock == 2) {
                if (this.emoticonVo.emoticonId && this.isGetEmoticon(data[i].id)) {
                    data[i].sortId = Number(data[i].id) - data.length + 1;
                    data[i].status = 1;
                }
                else {
                    data[i].sortId = Number(data[i].id) + data.length + 1;
                    data[i].status = 0;
                }
            }
            else if (data[i].unlock == 3) {
                var level = Api.playerVoApi.getPlayerLevel();
                if (level >= data[i].need) {
                    data[i].sortId = Number(data[i].id) - data.length + 1;
                    data[i].status = 1;
                }
                else {
                    data[i].sortId = Number(data[i].id) + data.length + 1;
                    data[i].status = 0;
                }
            }
            else if (data[i].unlock == 4) {
                var level = Api.playerVoApi.getPlayerVipLevel();
                if (level >= data[i].need) {
                    data[i].sortId = Number(data[i].id) - data.length + 1;
                    data[i].status = 1;
                }
                else {
                    data[i].sortId = Number(data[i].id) + data.length + 1;
                    data[i].status = 0;
                }
            }
        }
        if (groupId != 0) {
            data.sort(function (a, b) { return a.sortId - b.sortId; });
        }
        return data;
    };
    //判断表情是否已解锁
    EmoticonVoApi.prototype.isEmoticonUnlock = function (id) {
        var emoticonList = this.cfg.emoticonList;
        var data = emoticonList[id];
        if (data) {
            if (data.unlock == 1) {
                return true;
            }
            else if (data.unlock == 2) {
                if (this.emoticonVo.emoticonId && this.isGetEmoticon(data.id)) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (data.unlock == 3) {
                var level = Api.playerVoApi.getPlayerLevel();
                if (level >= data.need) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (data.unlock == 4) {
                var level = Api.playerVoApi.getPlayerVipLevel();
                if (level >= data.need) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        return false;
    };
    //获取排序后的数据
    EmoticonVoApi.prototype.getSortEmoticonDataByGroup = function (group) {
        if (group != 0) {
            var dataList = [];
            var emoticonList = this.cfg.emoticonList;
            for (var key in emoticonList) {
                var data = emoticonList[key];
                if (data.group == group) {
                    dataList.push(data);
                }
            }
            return this.sortEmoticonData(dataList, group);
        }
        else {
            var emoticonData = this.getRecentEmoticonData();
            return this.sortEmoticonData(emoticonData, group);
        }
    };
    //最近使用
    EmoticonVoApi.prototype.setRecentEmoticon = function (id) {
        var key = "emoticon" + Api.playerVoApi.getPlayerID();
        var value = LocalStorageManager.get(key);
        if (value) {
            var idArr = this.getRecentEmoticonId();
            for (var i = 0; i < idArr.length; i++) {
                if (idArr[i] == id) {
                    idArr.splice(i, 1);
                    break;
                }
            }
            if (idArr.length >= 10) {
                idArr.shift();
            }
            idArr.push(id);
            var idStr = "";
            for (var i = 0; i < idArr.length; i++) {
                idStr = idStr + idArr[i] + "-";
            }
            var str = idStr.substring(0, idStr.length - 1);
            LocalStorageManager.set(key, String(str));
        }
        else {
            LocalStorageManager.set(key, String(id));
        }
    };
    //最近使用id
    EmoticonVoApi.prototype.getRecentEmoticonId = function () {
        var key = "emoticon" + Api.playerVoApi.getPlayerID();
        var emoticonId = LocalStorageManager.get(key);
        var idArr = [];
        App.LogUtil.log("getRecentEmoticonId:" + emoticonId);
        if (emoticonId && emoticonId != "") {
            idArr = emoticonId.split("-");
        }
        return idArr;
    };
    //最近使用数据
    EmoticonVoApi.prototype.getRecentEmoticonData = function () {
        var idArr = this.getRecentEmoticonId();
        var dataList = [];
        var emoticonList = this.cfg.emoticonList;
        for (var i = idArr.length - 1; i >= 0; i--) {
            for (var key in emoticonList) {
                var data = emoticonList[key];
                if (data.id == idArr[i]) {
                    dataList.push(data);
                }
            }
        }
        return dataList;
    };
    //聊天主页面字符转化
    EmoticonVoApi.prototype.chatStrChangeLocal = function (msg) {
        if (msg == "") {
            return "";
        }
        var strArr = msg.split("-");
        var searchIndex = msg.search(GameData.emoticonMsgStr);
        if (strArr.length > 1 && searchIndex >= 0) {
            var str = msg.substring(searchIndex, searchIndex + GameData.emoticonMsgStr.length + 5);
            var desStr = LanguageManager.getlocal("emoticonChatShowMsg");
            var s = msg.replace(str, desStr);
            return s;
        }
        return msg;
    };
    //聊天转表情
    EmoticonVoApi.prototype.chatStrChangeToEmoticon = function (msg) {
        var strArr = msg.split("-");
        if (strArr.length == 2) {
            var searchIndex = strArr[0].search(GameData.emoticonMsgStr);
            if (searchIndex == 0) {
                return strArr[1];
            }
        }
        return null;
    };
    //聊天未解锁提示
    EmoticonVoApi.prototype.getEmoticonUnlockMsg = function (id) {
        var data = this.cfg.getEmoticonCfgById(id);
        var str = "";
        if (data.unlock == 2) {
            //活动解锁
            str = LanguageManager.getlocal("emoticonUnlockActicity");
        }
        else if (data.unlock == 3) {
            //官职解锁
            var officalStr = LanguageManager.getlocal("officialTitle" + data.need);
            str = LanguageManager.getlocal("emoticonUnlockOffical", [officalStr]);
        }
        else if (data.unlock == 4) {
            //vip解锁
            str = LanguageManager.getlocal("emoticonUnlockVip", [String(data.need)]);
        }
        return str;
    };
    Object.defineProperty(EmoticonVoApi.prototype, "vo", {
        get: function () {
            return this.emoticonVo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmoticonVoApi.prototype, "cfg", {
        get: function () {
            return Config.EmoticonCfg;
        },
        enumerable: true,
        configurable: true
    });
    EmoticonVoApi.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return EmoticonVoApi;
}(BaseVoApi));
__reflect(EmoticonVoApi.prototype, "EmoticonVoApi");
//# sourceMappingURL=EmoticonVoApi.js.map