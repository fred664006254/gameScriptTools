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
 * 红颜vo
 * author dmj
 * date 2017/9/22
 * @class WifeskinInfoVo
 */
var WifeskinInfoVo = (function (_super) {
    __extends(WifeskinInfoVo, _super);
    function WifeskinInfoVo() {
        var _this = _super.call(this) || this;
        // 红颜id
        _this.id = "";
        return _this;
    }
    WifeskinInfoVo.prototype.initData = function (data) {
        if (data) {
            if (data.skin != null) {
                if (Api.switchVoApi.checkOpenWifeskinLvup()) {
                    for (var key in data.skin) {
                        if (this.skin && this.skin[key] && data.skin[key]) {
                            if (data.skin[key]["wlv"] != this.skin[key]["wlv"]) {
                                //皮肤等级发生改变
                                ViewController.getInstance().openView(ViewConst.COMMON.SKINLEVELUPVIEW, { wifeId: this.id, skinId: key, lv: data.skin[key]["wlv"] });
                            }
                        }
                    }
                }
                this.skin = data.skin;
            }
            if (data.equip != null) {
                this.equip = data.equip;
            }
        }
    };
    Object.defineProperty(WifeskinInfoVo.prototype, "name", {
        /**红颜名称 */
        get: function () {
            return this.cfg.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeskinInfoVo.prototype, "desc", {
        /**红颜描述 */
        get: function () {
            return this.cfg.desc;
        },
        enumerable: true,
        configurable: true
    });
    WifeskinInfoVo.prototype.getLvBySkinId = function (skinId) {
        if (this.skin[Number(skinId)] && this.skin[Number(skinId)].wlv) {
            return this.skin[Number(skinId)].wlv;
        }
        else {
            return 1;
        }
    };
    Object.defineProperty(WifeskinInfoVo.prototype, "words", {
        /**红颜说的话 */
        get: function () {
            return this.cfg.words;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeskinInfoVo.prototype, "atkAdd", {
        get: function () {
            if (this.cfg) {
                return this.cfg.atkAdd;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeskinInfoVo.prototype, "inteAdd", {
        get: function () {
            if (this.cfg) {
                return this.cfg.inteAdd;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeskinInfoVo.prototype, "politicsAdd", {
        get: function () {
            if (this.cfg) {
                return this.cfg.politicsAdd;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeskinInfoVo.prototype, "charmAdd", {
        get: function () {
            if (this.cfg) {
                return this.cfg.charmAdd;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeskinInfoVo.prototype, "wifeIntimacy", {
        get: function () {
            if (this.cfg) {
                return this.cfg.wifeIntimacy;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeskinInfoVo.prototype, "wifeGlamour", {
        get: function () {
            if (this.cfg) {
                return this.cfg.wifeGlamour;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeskinInfoVo.prototype, "atkLvUpAdd", {
        get: function () {
            if (this.cfg) {
                return this.cfg.atkLvUpAdd;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeskinInfoVo.prototype, "inteLvUpAdd", {
        get: function () {
            if (this.cfg) {
                return this.cfg.inteLvUpAdd;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeskinInfoVo.prototype, "politicsLvUpAdd", {
        get: function () {
            if (this.cfg) {
                return this.cfg.politicsLvUpAdd;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeskinInfoVo.prototype, "charmLvUpAdd", {
        get: function () {
            if (this.cfg) {
                return this.cfg.charmLvUpAdd;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeskinInfoVo.prototype, "wifeLvUpIntimacy", {
        get: function () {
            if (this.cfg) {
                return this.cfg.wifeLvUpIntimacy;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeskinInfoVo.prototype, "wifeLvUpGlamour", {
        get: function () {
            if (this.cfg) {
                return this.cfg.wifeLvUpGlamour;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeskinInfoVo.prototype, "cfg", {
        get: function () {
            return Config.WifeskinCfg.getWifeCfgById(this.id.toString());
        },
        enumerable: true,
        configurable: true
    });
    WifeskinInfoVo.prototype.dispose = function () {
        this.id = "";
        this.skin = 0;
        this.equip = null;
    };
    return WifeskinInfoVo;
}(BaseVo));
__reflect(WifeskinInfoVo.prototype, "WifeskinInfoVo");
