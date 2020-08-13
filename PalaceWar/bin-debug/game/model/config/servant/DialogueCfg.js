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
    var DialogueCfg;
    (function (DialogueCfg) {
        var dialogueListCfg = {};
        function formatData(data) {
            for (var key in data) {
                if (!dialogueListCfg.hasOwnProperty(String(key))) {
                    dialogueListCfg[String(key)] = new DialogueItemCfg();
                }
                dialogueListCfg[String(key)].initData(data[key]);
                dialogueListCfg[String(key)].id = String(key);
            }
        }
        DialogueCfg.formatData = formatData;
        function getDialogueItemById(id) {
            return dialogueListCfg[String(id)];
        }
        DialogueCfg.getDialogueItemById = getDialogueItemById;
    })(DialogueCfg = Config.DialogueCfg || (Config.DialogueCfg = {}));
    var DialogueItemCfg = (function (_super) {
        __extends(DialogueItemCfg, _super);
        function DialogueItemCfg() {
            return _super.call(this) || this;
        }
        Object.defineProperty(DialogueItemCfg.prototype, "nameStr", {
            get: function () {
                switch (this.icon) {
                    case "0":
                        return null;
                    case "1":
                        return LanguageManager.getlocal("dialogueNameYou");
                    case "2":
                        if (this.targetType == "1") {
                            var servantCfg = Config.ServantCfg.getServantItemById(this.targetId);
                            return servantCfg.name;
                        }
                        else if (this.targetType == "2") {
                            var wifeCfg = Config.WifeCfg.getWifeCfgById(this.targetId);
                            return wifeCfg.name;
                        }
                        else {
                            console.log("DialogueCfg没有设置targetType");
                            return null;
                        }
                    default:
                        return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DialogueItemCfg.prototype, "fullIconStr", {
            get: function () {
                switch (this.icon) {
                    case "0":
                        return null;
                    case "1":
                        return "user_body" + Api.playerVoApi.getPlayerLevel();
                    case "2":
                        if (this.targetType == "1") {
                            var servantCfg = Config.ServantCfg.getServantItemById(this.targetId);
                            return servantCfg.fullIcon;
                        }
                        else if (this.targetType == "2") {
                            var wifeCfg = Config.WifeCfg.getWifeCfgById(this.targetId);
                            return wifeCfg.body;
                        }
                        else {
                            console.log("DialogueCfg没有设置targetType");
                            return null;
                        }
                    default:
                        return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DialogueItemCfg.prototype, "bgName", {
            get: function () {
                if (this.background == "1") {
                    return "homescene";
                }
                else if (this.background == "2") {
                    return "searchbg1";
                }
                else {
                    return "homescene";
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DialogueItemCfg.prototype, "dialogStr", {
            get: function () {
                return LanguageManager.getlocal("substitution" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        return DialogueItemCfg;
    }(BaseItemCfg));
    __reflect(DialogueItemCfg.prototype, "DialogueItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=DialogueCfg.js.map