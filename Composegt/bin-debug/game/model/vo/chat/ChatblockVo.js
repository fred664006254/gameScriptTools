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
 * 聊天屏蔽VO
 * author dky
 * date 2018/3/13
 * @class ChatblockVo
 */
var ChatblockVo = (function (_super) {
    __extends(ChatblockVo, _super);
    function ChatblockVo() {
        var _this = _super.call(this) || this;
        // 屏蔽vo列表
        _this.chatblockVoObj = null;
        return _this;
    }
    ChatblockVo.prototype.initData = function (data) {
        if (data) {
            if (data.info) {
                this.info = data.info;
            }
            if (data.list) {
                this.list = data.list;
            }
        }
    };
    ChatblockVo.prototype.dispose = function () {
        this.chatblockVoObj = null;
        this.info = [];
        this.list = [];
    };
    return ChatblockVo;
}(BaseVo));
__reflect(ChatblockVo.prototype, "ChatblockVo");
