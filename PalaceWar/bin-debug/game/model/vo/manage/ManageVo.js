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
var ManageVo = (function (_super) {
    __extends(ManageVo, _super);
    function ManageVo() {
        var _this = _super.call(this) || this;
        _this.itemsVo = [];
        return _this;
    }
    ManageVo.prototype.initData = function (data) {
        if (data && data.finfo) {
            for (var key in data.finfo) {
                if (!this[key]) {
                    this[key] = new ManageItemVo();
                }
                var itemVo = this[key];
                itemVo.initData(data.finfo[key]);
                itemVo.type = key;
            }
        }
        this.itemsVo.length = 0;
        this.itemsVo = [this.gold, this.food, this.soldier];
    };
    ManageVo.prototype.dispose = function () {
        if (this.gold) {
            this.gold.dispose();
            this.gold = null;
        }
        if (this.food) {
            this.food.dispose();
            this.food = null;
        }
        if (this.soldier) {
            this.soldier.dispose();
            this.soldier = null;
        }
        if (this.itemsVo) {
            this.itemsVo.length = 0;
        }
    };
    return ManageVo;
}(BaseVo));
__reflect(ManageVo.prototype, "ManageVo");
var ManageItemVo = (function (_super) {
    __extends(ManageItemVo, _super);
    function ManageItemVo() {
        var _this = _super.call(this) || this;
        /**
         * 当前可用次数
         * */
        _this.num = 0;
        /**
         * 计时时间
         * */
        _this.st = 0;
        /**
         *需要时间
         */
        _this.need_time = 0;
        /**
         * 类型
         */
        _this.type = null;
        return _this;
    }
    Object.defineProperty(ManageItemVo.prototype, "needRefresh", {
        get: function () {
            return this.num > 0 || GameData.serverTime - this.need_time - this.st > 0;
        },
        enumerable: true,
        configurable: true
    });
    ManageItemVo.prototype.initData = function (data) {
        if (data) {
            if (data.num != null) {
                this.num = Number(data.num);
            }
            if (data.st != null) {
                this.st = Number(data.st);
            }
            if (data.need_time != null) {
                this.need_time = Number(data.need_time);
            }
        }
    };
    Object.defineProperty(ManageItemVo.prototype, "maxNum", {
        get: function () {
            var level = String(Api.playerVoApi.getPlayerLevel());
            return Config.LevelCfg.getCfgByLevel(level)[this.type];
        },
        enumerable: true,
        configurable: true
    });
    ManageItemVo.prototype.dispose = function () {
        this.num = 0;
        this.st = 0;
        this.type = null;
    };
    return ManageItemVo;
}(BaseVo));
__reflect(ManageItemVo.prototype, "ManageItemVo");
//# sourceMappingURL=ManageVo.js.map