/**
 * 称号道具vo
 * author shaoliang
 * date 2017/10/28
 * @class TitleInfoVo
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
var TitleInfoVo = (function (_super) {
    __extends(TitleInfoVo, _super);
    function TitleInfoVo() {
        var _this = _super.call(this) || this;
        // 道具id
        _this.id = 0;
        // 道具状态 -1 没有 0 有， 1，已使用 ，2已装配
        _this.num = -1;
        _this._lv = 0;
        _this.showLv = null;
        return _this;
    }
    TitleInfoVo.prototype.initData = function (data) {
        if (data.id != null) {
            this.id = Number(data.id);
        }
        else {
        }
        if (data.num != null) {
            this.num = Number(data.num);
        }
        else {
            this.num = -1;
        }
    };
    Object.defineProperty(TitleInfoVo.prototype, "lv", {
        get: function () {
            if (this.isTitle == 1 && (this.titleType < 3 || this.titleType == 7) && Api.switchVoApi.checkTitleUpgrade()) {
                var info = Api.titleupgradeVoApi.getTitleInfo(this.id);
                var curlv = info.level;
                this._lv = curlv;
            }
            else {
                if (this._lv == 0) {
                    return 1;
                }
            }
            return this._lv;
        },
        set: function (l) {
            if (l != this._lv) {
                if (this._lv > 0 && l > this._lv) {
                    // ViewController.getInstance().openView(ViewConst.COMMON.TITLELEVELUPVIEW,{titleId:this.id,lv:l});
                    Api.itemVoApi.insertWaitingTitleLvUp({ titleId: this.id, lv: l });
                }
                this._lv = l;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "name", {
        // 道具名称
        get: function () {
            return this.itemCfg.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "desc", {
        // 道具描述
        get: function () {
            if (this.isLvUp == 1) {
                var parms = [];
                if (this.effect1) {
                    var value = this.effect1;
                    if (this.lvUpEffect1) {
                        value += this.lvUpEffect1 * (this.lv - 1);
                    }
                    parms.push(String(value));
                }
                if (this.effect2) {
                    var value = this.effect2;
                    if (this.lvUpEffect2) {
                        value += this.lvUpEffect2 * (this.lv - 1);
                    }
                    parms.push(String(value * 100 + "%"));
                }
                if (this.atkEffect) {
                    var value = this.atkEffect * this.lv;
                    parms.push(String(Math.ceil(value * 100)));
                }
                return LanguageManager.getlocal("itemDesc_" + this.id, parms);
            }
            else {
                return this.itemCfg.desc;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "dropDesc", {
        get: function () {
            return this.itemCfg.dropDesc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "icon", {
        // icon图
        get: function () {
            return this.itemCfg.icon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "iconBg", {
        // 背景图片
        get: function () {
            return this.itemCfg.iconBg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "quality", {
        // 资质
        get: function () {
            if (this.itemCfg) {
                return this.itemCfg.quality;
            }
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "isShowUseBtn", {
        // 是否显示使用按钮
        get: function () {
            if (this.itemCfg) {
                return this.itemCfg.isUse == 1;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "isOnly", {
        // 是否是全服唯一称号
        get: function () {
            if (this.itemCfg) {
                return this.itemCfg.isOnly == 1;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "sortId", {
        // 排序id
        get: function () {
            if (this.itemCfg) {
                return this.itemCfg.sortId;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "type", {
        // 类型，1：道具 2：合成 3：时装
        get: function () {
            if (this.itemCfg) {
                return this.itemCfg.type;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "isLvUp", {
        get: function () {
            if (this.itemCfg) {
                return this.itemCfg.isLvUp;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "lvUpEffect1", {
        get: function () {
            if (this.itemCfg && this.itemCfg.lvUpEffect1) {
                return this.itemCfg.lvUpEffect1;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "lvUpEffect2", {
        get: function () {
            if (this.itemCfg && this.itemCfg.lvUpEffect2) {
                return this.itemCfg.lvUpEffect2;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "effect1", {
        get: function () {
            if (this.itemCfg) {
                return this.itemCfg.effect1;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "effect2", {
        get: function () {
            if (this.itemCfg) {
                return this.itemCfg.effect2;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "atkEffect", {
        get: function () {
            if (this.itemCfg) {
                return this.itemCfg.atkEffect;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "lvLimit", {
        get: function () {
            if (this.itemCfg) {
                return this.itemCfg.lvLimit;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "titleType", {
        get: function () {
            if (this.itemCfg) {
                return this.itemCfg.titleType;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "isTitle", {
        get: function () {
            if (this.itemCfg) {
                return this.itemCfg.isTitle;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "titleKey", {
        get: function () {
            if (this.itemCfg.isTitle == 1) {
                return String(this.itemCfg.isTitle) + "_" + this.itemCfg.titleType;
            }
            else {
                return String(this.itemCfg.isTitle);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "itemCfg", {
        // 该道具配置
        get: function () {
            return Config.TitleCfg.getTitleCfgById(this.id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleInfoVo.prototype, "titleIcon3", {
        get: function () {
            var icon3 = this.itemCfg.titleIcon3;
            if (this.isLvUp) {
                var newicon3 = icon3 + "_" + this._lv;
                if (ResourceManager.hasRes(newicon3)) {
                    return newicon3;
                }
                for (var i = this._lv - 1; i > 0; i--) {
                    newicon3 = icon3 + "_" + i;
                    if (ResourceManager.hasRes(newicon3)) {
                        return newicon3;
                    }
                }
            }
            return icon3;
        },
        enumerable: true,
        configurable: true
    });
    TitleInfoVo.prototype.dispose = function () {
        this.id = 0;
        this.num = -1;
        this._lv = 0;
    };
    return TitleInfoVo;
}(BaseVo));
__reflect(TitleInfoVo.prototype, "TitleInfoVo");
//# sourceMappingURL=TitleInfoVo.js.map