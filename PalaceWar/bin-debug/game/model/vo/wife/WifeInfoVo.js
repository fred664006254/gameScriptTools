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
 * @class WifeInfoVo
 */
var WifeInfoVo = (function (_super) {
    __extends(WifeInfoVo, _super);
    function WifeInfoVo() {
        var _this = _super.call(this) || this;
        // id
        _this.id = 0;
        // 亲密度
        _this.intimacy = 0;
        // 魅力
        _this.glamour = 0;
        // 经验
        _this.exp = 0;
        // 儿子数量
        _this.child = 0;
        _this.bgId = '';
        _this.artistry = 0;
        _this.talent = 0;
        // "红颜的性别 大于等于1表示男红颜 否则为正常",
        _this.sexflag = 0;
        return _this;
    }
    WifeInfoVo.prototype.initData = function (data) {
        if (data) {
            if (data.intimacy != null) {
                var oldIntimacy = this.intimacy;
                this.intimacy = Number(data.intimacy);
                if (oldIntimacy && Api.switchVoApi.checkOpenWifeExSkill() && this.intimacy >= Config.WifebaseCfg.exSkillNeed) {
                    var curEXLv = this.getExSkillLevel();
                    var oldLv = Math.floor(oldIntimacy / Config.WifebaseCfg.exSkill);
                    if (curEXLv > oldLv) {
                        ViewController.getInstance().openView(ViewConst.POPUP.WIFEEXSKILLUNLOCKVIEW, { wifeId: String(this.id), old: oldIntimacy });
                    }
                }
            }
            if (data.exp != null) {
                this.exp = Number(data.exp);
            }
            if (data.child != null) {
                this.child = Number(data.child);
            }
            if (data.skill != null) {
                this.skill = data.skill;
            }
            if (data.skill2 != null) {
                this.skill2 = data.skill2;
            }
            if (data.glamour != null) {
                this.glamour = Number(data.glamour);
            }
            if (data.bgId) {
                this.bgId = data.bgId;
            }
            else {
                this.bgId = "";
            }
            if (data.artistry != null) {
                this.artistry = Number(data.artistry);
            }
            //才情值 = 参数1*魅力 + 参数2*亲密 + 参数3*才情
            this.talent = Config.WifebaseCfg.talentParam1 * this.glamour + Config.WifebaseCfg.talentParam2 * this.intimacy + Config.WifebaseCfg.talentParam3 * this.artistry;
            if (data.sexflag != null) {
                this.sexflag = data.sexflag;
            }
            else {
                this.sexflag = 0;
            }
        }
    };
    Object.defineProperty(WifeInfoVo.prototype, "name", {
        /**红颜名称 */
        get: function () {
            return this.cfg.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeInfoVo.prototype, "desc", {
        /**红颜描述 */
        get: function () {
            return this.cfg.desc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeInfoVo.prototype, "words", {
        /**红颜说的话 */
        get: function () {
            return this.cfg.words;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeInfoVo.prototype, "unlock", {
        /**红颜解锁条件 */
        get: function () {
            return this.cfg.wifeunlock;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeInfoVo.prototype, "bg", {
        /**红颜背景 */
        get: function () {
            return this.cfg.bg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeInfoVo.prototype, "icon", {
        /**红颜icon */
        get: function () {
            return this.cfg.icon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeInfoVo.prototype, "body", {
        /**红颜半身像 */
        get: function () {
            return this.cfg.body;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeInfoVo.prototype, "body2", {
        /**红颜脱衣半身像 */
        get: function () {
            return this.cfg.body2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeInfoVo.prototype, "bone", {
        /**红颜骨骼 */
        get: function () {
            return this.cfg.bone;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeInfoVo.prototype, "bone2", {
        /**红颜脱衣服骨骼 */
        get: function () {
            return this.cfg.bone2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeInfoVo.prototype, "sound", {
        get: function () {
            return this.cfg.sound;
        },
        enumerable: true,
        configurable: true
    });
    //根据序号去蓝颜声音,默认随机前3句
    WifeInfoVo.prototype.getBlueSound = function (index) {
        if (!index) {
            //随机取前3句
            index = App.MathUtil.getRandom(1, 4);
        }
        return this.cfg.getBlueSoundBySoundId(index);
    };
    Object.defineProperty(WifeInfoVo.prototype, "bgRes", {
        get: function () {
            var bgres = "wifeview_optbg";
            if (this.bgId && this.bgId != "") {
                bgres = "wifeskinbg" + this.bgId;
            }
            else {
                if (this.cfg.isBule()) {
                    bgres = "malewifebg";
                }
            }
            return bgres;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeInfoVo.prototype, "cfg", {
        get: function () {
            return Config.WifeCfg.getWifeCfgById(this.id.toString());
        },
        enumerable: true,
        configurable: true
    });
    WifeInfoVo.prototype.isUnlockExSkill = function () {
        if (Api.switchVoApi.checkOpenWifeExSkill() && this.intimacy >= Config.WifebaseCfg.exSkillNeed) {
            return true;
        }
        return false;
    };
    WifeInfoVo.prototype.getExSkillLevel = function () {
        if (this.intimacy < Config.WifebaseCfg.exSkillNeed) {
            return 0;
        }
        var need = Config.WifebaseCfg.exSkill;
        var intimacy = this.intimacy;
        if (intimacy > Config.WifebaseCfg.exSkillMax) {
            intimacy = Config.WifebaseCfg.exSkillMax;
        }
        return Math.floor(intimacy / need);
    };
    WifeInfoVo.prototype.isExSkillLevelMax = function () {
        return this.intimacy >= Config.WifebaseCfg.exSkillMax;
    };
    WifeInfoVo.prototype.dispose = function () {
        this.id = 0;
        this.intimacy = 0;
        this.exp = 0;
        this.child = 0;
        this.skill = null;
        this.skill2 = [];
        this.glamour = 0;
        this.artistry = 0;
        this.talent = 0;
        this.sexflag = 0;
    };
    return WifeInfoVo;
}(BaseVo));
__reflect(WifeInfoVo.prototype, "WifeInfoVo");
//# sourceMappingURL=WifeInfoVo.js.map