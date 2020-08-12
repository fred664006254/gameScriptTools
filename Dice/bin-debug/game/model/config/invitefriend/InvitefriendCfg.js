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
var Config;
(function (Config) {
    /**
     * 邀请好友配置类
     * author qianjun
     * @class ShopCfg
     */
    var InvitefriendCfg;
    (function (InvitefriendCfg) {
        //使用邀请码可获得
        var useCanGet = "";
        //可获得的积分最大上限
        var pointMax = 0;
        //邀请达到对应积分可获得奖励
        var inviteReward = {};
        //好友填写邀请码，邀请者可获得 X 积分
        var getPoint1 = 0;
        InvitefriendCfg.getPoint2 = {};
        InvitefriendCfg.getPoint3 = {};
        InvitefriendCfg.getPoint4 = {};
        function formatData(data) {
            useCanGet = data.useCanGet;
            pointMax = data.pointMax;
            getPoint1 = data.getPoint1;
            InvitefriendCfg.getPoint2 = data.getPoint2;
            InvitefriendCfg.getPoint3 = data.getPoint3;
            InvitefriendCfg.getPoint4 = data.getPoint4;
            for (var key in data.inviteReward) {
                var itemCfg = void 0;
                if (!inviteReward.hasOwnProperty(String(key))) {
                    inviteReward[String(key)] = new InviteRewardItemCfg();
                }
                itemCfg = inviteReward[String(key)];
                itemCfg.initData(data.inviteReward[key]);
                itemCfg.id = Number(key);
            }
        }
        InvitefriendCfg.formatData = formatData;
        function getUseCanGet() {
            return useCanGet;
        }
        InvitefriendCfg.getUseCanGet = getUseCanGet;
        function getRewardMaxNum() {
            return Object.keys(inviteReward).length;
        }
        InvitefriendCfg.getRewardMaxNum = getRewardMaxNum;
        function getMaxPoint() {
            return pointMax;
        }
        InvitefriendCfg.getMaxPoint = getMaxPoint;
        function getInviteRewardItemById(id) {
            return inviteReward[id];
        }
        InvitefriendCfg.getInviteRewardItemById = getInviteRewardItemById;
        function getInvitePoint1() {
            return getPoint1;
        }
        InvitefriendCfg.getInvitePoint1 = getInvitePoint1;
        function getInvitePoint(type) {
            var str = "";
            var needKey = "";
            if (type == 2) {
                needKey = "needScore";
            }
            else if (type == 3) {
                needKey = "needGem";
            }
            else if (type == 4) {
                needKey = "needTimes";
            }
            var unit = Config.InvitefriendCfg["getPoint" + type];
            var keys = Object.keys(unit);
            for (var i = 0; i < keys.length; ++i) {
                str += unit[keys[i]][needKey] + "/";
            }
            str = str.substring(0, str.length - 1);
            return str;
        }
        InvitefriendCfg.getInvitePoint = getInvitePoint;
    })(InvitefriendCfg = Config.InvitefriendCfg || (Config.InvitefriendCfg = {}));
    var InviteRewardItemCfg = (function (_super) {
        __extends(InviteRewardItemCfg, _super);
        function InviteRewardItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InviteRewardItemCfg;
    }(BaseItemCfg));
    Config.InviteRewardItemCfg = InviteRewardItemCfg;
    __reflect(InviteRewardItemCfg.prototype, "Config.InviteRewardItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=InvitefriendCfg.js.map