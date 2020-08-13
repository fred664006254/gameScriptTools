var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var WifeBathingCfg = (function () {
            function WifeBathingCfg() {
                this.AVGDialog_code1 = {
                    first: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "", "nameId": "storyNPCName0", "clickContinue": true, "resEndId": "302" },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "wife_full_302", "nameId": "wifeName_302", "clickContinue": true, "resEndId": "302" },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "302" },
                        "4": { "nextId": "5", "descId": 4, "bgId": 6, "personPic": "wife_full_302", "nameId": "wifeName_302", "clickContinue": true, "resEndId": "302" },
                        "5": { "nextId": null, "descId": 5, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "302" },
                    }
                };
            }
            WifeBathingCfg.prototype.formatData = function (data) {
                if (data.wifeId) {
                    this.wifeId = data.wifeId;
                }
                if (data.wifeBathingId) {
                    this.wifeBathingId = data.wifeBathingId;
                }
                if (data.exchange) {
                    this.exchange = data.exchange;
                }
                if (data.need) {
                    this.need = data.need;
                }
            };
            WifeBathingCfg.prototype.getDialogById = function (id, code) {
                var ccode = null;
                if (this["AVGDialog_code" + code]) {
                    ccode = code;
                }
                else {
                    ccode = 1;
                }
                if (id == "first") {
                    return this["AVGDialog_code" + ccode]["first"];
                }
                else {
                    return this["AVGDialog_code" + ccode]["id" + id];
                }
            };
            Object.defineProperty(WifeBathingCfg.prototype, "AVGDialog_code2", {
                get: function () {
                    return { first: {
                            "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "", "nameId": "storyNPCName0", "clickContinue": true, "resEndId": this.wifeId },
                            "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "wife_full_" + this.wifeId, "nameId": "wifeName_" + this.wifeId, "clickContinue": true, "resEndId": this.wifeId },
                            "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": "wife_full_" + this.wifeId, "nameId": "wifeName_" + this.wifeId, "clickContinue": true, "resEndId": this.wifeId },
                            "4": { "nextId": "5", "descId": 4, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": this.wifeId },
                            "5": { "nextId": null, "descId": 5, "bgId": 6, "personPic": "wife_full_" + this.wifeId, "nameId": "wifeName_" + this.wifeId, "clickContinue": true, "resEndId": this.wifeId },
                        }
                    };
                },
                enumerable: true,
                configurable: true
            });
            ;
            return WifeBathingCfg;
        }());
        AcCfg.WifeBathingCfg = WifeBathingCfg;
        __reflect(WifeBathingCfg.prototype, "Config.AcCfg.WifeBathingCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
