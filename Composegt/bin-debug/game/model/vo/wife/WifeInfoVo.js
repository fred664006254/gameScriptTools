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
        //才艺
        _this.artistry = 0;
        // 经验
        _this.exp = 0;
        // 儿子数量
        _this.child = 0;
        //红颜的子嗣技能信息
        _this.extraskill = [0, 0];
        // "红颜的性别 大于等于1表示男红颜 否则为正常",
        _this.sexflag = 0;
        //场景宠幸
        _this.scene = null;
        return _this;
    }
    WifeInfoVo.prototype.initData = function (data) {
        if (data) {
            if (data.intimacy != null) {
                this.intimacy = Number(data.intimacy);
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
            if (data.extraskill != null) {
                this.extraskill = data.extraskill;
            }
            if (data.glamour != null) {
                this.glamour = Number(data.glamour);
            }
            if (data.artistry != null) {
                this.artistry = Number(data.artistry);
            }
            if (data.scene != null) {
                this.scene = data.scene;
            }
            if (data.sexflag != null) {
                this.sexflag = data.sexflag;
            }
        }
    };
    WifeInfoVo.prototype.checkHaveScene = function (sceneId) {
        // console.log("check have scene",this.scene);
        if (!this.scene) {
            return false;
        }
        if (this.scene[sceneId]) {
            return true;
        }
        return false;
    };
    Object.defineProperty(WifeInfoVo.prototype, "name", {
        /**红颜名称 */
        get: function () {
            return this.cfg.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WifeInfoVo.prototype, "nameJP", {
        /**红颜名称 */
        get: function () {
            return this.cfg.nameJP;
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
    //获取同Id的蓝颜说话和语音
    WifeInfoVo.prototype.getBlueWordsAndSound = function (index) {
        return {
            words: LanguageManager.getlocal("wifeWords_male_" + this.id + "_" + index),
            sound: this.cfg.getBlueSoundBySoundId(index)
        };
    };
    Object.defineProperty(WifeInfoVo.prototype, "cfg", {
        get: function () {
            return Config.WifeCfg.getWifeCfgById(this.id.toString());
        },
        enumerable: true,
        configurable: true
    });
    WifeInfoVo.prototype.dispose = function () {
        this.id = 0;
        this.intimacy = 0;
        this.exp = 0;
        this.child = 0;
        this.skill = null;
        this.extraskill = null;
        this.glamour = 0;
        this.artistry = 0;
        this.scene = null;
        this.sexflag = 0;
    };
    return WifeInfoVo;
}(BaseVo));
__reflect(WifeInfoVo.prototype, "WifeInfoVo");
