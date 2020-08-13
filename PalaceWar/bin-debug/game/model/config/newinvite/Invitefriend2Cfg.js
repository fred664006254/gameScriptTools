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
    // 邀请有礼配置
    var Invitefriend2Cfg;
    (function (Invitefriend2Cfg) {
        // 被邀请的人，绑定后获得奖励
        Invitefriend2Cfg.bindReward = '';
        // 邀请任务。
        Invitefriend2Cfg.inviteTask = [];
        // 势力任务
        Invitefriend2Cfg.powerTask = [];
        function formatData(data) {
            this.bindReward = data.bindReward;
            for (var key in data.inviteTask) {
                var itemCfg = void 0;
                var id = Number(key) + 1;
                if (!this.inviteTask.hasOwnProperty(String(key))) {
                    this.inviteTask[String(key)] = new InviteTaskCfg();
                }
                itemCfg = this.inviteTask[String(key)];
                itemCfg.initData(data.inviteTask[key]);
                itemCfg.id = id;
            }
            for (var key in data.powerTask) {
                var itemCfg = void 0;
                var id = Number(key) + 1;
                if (!this.powerTask.hasOwnProperty(String(key))) {
                    this.powerTask[String(key)] = new InvitePowerTaskCfg();
                }
                itemCfg = this.powerTask[String(key)];
                itemCfg.initData(data.powerTask[key]);
                itemCfg.id = id;
            }
        }
        Invitefriend2Cfg.formatData = formatData;
    })(Invitefriend2Cfg = Config.Invitefriend2Cfg || (Config.Invitefriend2Cfg = {}));
    var InviteTaskCfg = (function (_super) {
        __extends(InviteTaskCfg, _super);
        function InviteTaskCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InviteTaskCfg;
    }(BaseItemCfg));
    Config.InviteTaskCfg = InviteTaskCfg;
    __reflect(InviteTaskCfg.prototype, "Config.InviteTaskCfg");
    var InvitePowerTaskCfg = (function (_super) {
        __extends(InvitePowerTaskCfg, _super);
        function InvitePowerTaskCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InvitePowerTaskCfg;
    }(BaseItemCfg));
    Config.InvitePowerTaskCfg = InvitePowerTaskCfg;
    __reflect(InvitePowerTaskCfg.prototype, "Config.InvitePowerTaskCfg");
})(Config || (Config = {}));
//# sourceMappingURL=Invitefriend2Cfg.js.map