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
 * 道具vo
 * author dmj
 * date 2017/9/22
 * @class ItemInfoVo
 */
var ItemInfoVo = (function (_super) {
    __extends(ItemInfoVo, _super);
    function ItemInfoVo() {
        var _this = _super.call(this) || this;
        // 道具id
        _this.id = 0;
        // 道具数量
        _this.num = 0;
        return _this;
    }
    ItemInfoVo.prototype.initData = function (data) {
        if (data.id != null) {
            this.id = Number(data.id);
        }
        if (data.num != null) {
            this.num = Number(data.num);
        }
    };
    Object.defineProperty(ItemInfoVo.prototype, "name", {
        // 道具名称
        get: function () {
            return this.itemCfg.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemInfoVo.prototype, "desc", {
        // 道具描述
        get: function () {
            return this.itemCfg.desc;
        },
        enumerable: true,
        configurable: true
    });
    ItemInfoVo.prototype.getDescTxt = function (showEffectStr) {
        return this.itemCfg.getDescTxt(showEffectStr);
    };
    Object.defineProperty(ItemInfoVo.prototype, "dropDesc", {
        // 道具掉落描述
        get: function () {
            return this.itemCfg.dropDesc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemInfoVo.prototype, "icon", {
        // icon图
        get: function () {
            return this.itemCfg.icon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemInfoVo.prototype, "iconBg", {
        // 背景图片
        get: function () {
            return this.itemCfg.iconBg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemInfoVo.prototype, "quality", {
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
    Object.defineProperty(ItemInfoVo.prototype, "qualityColor", {
        get: function () {
            if (this.itemCfg) {
                return this.itemCfg.qualityColor;
            }
            return TextFieldConst.COLOR_QUALITY_WHITE_NEW;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemInfoVo.prototype, "isShowUseBtn", {
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
    Object.defineProperty(ItemInfoVo.prototype, "isOnly", {
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
    Object.defineProperty(ItemInfoVo.prototype, "sortId", {
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
    Object.defineProperty(ItemInfoVo.prototype, "target", {
        // 目标  1:角色 2：门客
        get: function () {
            if (this.itemCfg) {
                return this.itemCfg.target;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemInfoVo.prototype, "type", {
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
    Object.defineProperty(ItemInfoVo.prototype, "itemCfg", {
        // 该道具配置
        get: function () {
            return Config.ItemCfg.getItemCfgById(this.id);
        },
        enumerable: true,
        configurable: true
    });
    ItemInfoVo.prototype.dispose = function () {
        this.id = 0;
        this.num = 0;
    };
    return ItemInfoVo;
}(BaseVo));
__reflect(ItemInfoVo.prototype, "ItemInfoVo");
