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
var SearchVo = (function (_super) {
    __extends(SearchVo, _super);
    function SearchVo() {
        var _this = _super.call(this) || this;
        /**
         * 红颜id和红颜进度值{id:值}
         */
        _this.info = {};
        _this.lucky = {};
        return _this;
    }
    SearchVo.prototype.initData = function (data) {
        if (data) {
            this.reset();
            if (data.strength) {
                this.strength = data.strength;
            }
            if (data.info) {
                for (var key in data.info) {
                    var item = this.info[key];
                    if (!item) {
                        item = new SearchInfoItemVo();
                        this.info[key] = item;
                    }
                    item.initData(data.info[key]);
                    item.personId = Number(key);
                }
                var dataKeys = Object.keys(data.info);
                for (var key in this.info) {
                    if (dataKeys.indexOf(key) < 0) {
                        delete this.info[key];
                    }
                }
            }
            if (data.lucky) {
                this.lucky = data.lucky;
            }
        }
    };
    Object.defineProperty(SearchVo.prototype, "maxSearchNum", {
        get: function () {
            return Config.VipCfg.getVipCfgByLevel(Api.playerVoApi.getPlayerVipLevel()).maxStrength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchVo.prototype, "searchNum", {
        get: function () {
            var num = Math.floor((GameData.serverTime - this.strength.st) / Config.SearchbaseCfg.needTime) + this.strength.num;
            return Math.max(Math.min(num, this.maxSearchNum), 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchVo.prototype, "leftTime", {
        get: function () {
            var leftnum = 0;
            var num = Math.floor((GameData.serverTime - this.strength.st) / Config.SearchbaseCfg.needTime) + this.strength.num;
            if (num >= this.maxSearchNum) {
                leftnum = 0;
            }
            else {
                num = Config.SearchbaseCfg.needTime - (GameData.serverTime - this.strength.st) % Config.SearchbaseCfg.needTime;
            }
            return num;
        },
        enumerable: true,
        configurable: true
    });
    SearchVo.prototype.reset = function () {
        this.strength = null;
        this.lucky = {};
        // if(this.info)
        // {
        // 	for(let key in this.info)
        // 	{
        // 		delete this.info[key];
        // 	}
        // }
    };
    SearchVo.prototype.dispose = function () {
    };
    return SearchVo;
}(BaseVo));
__reflect(SearchVo.prototype, "SearchVo");
var SearchInfoItemVo = (function (_super) {
    __extends(SearchInfoItemVo, _super);
    function SearchInfoItemVo() {
        return _super.call(this) || this;
    }
    SearchInfoItemVo.prototype.initData = function (data) {
        this.progress = Number(data);
    };
    SearchInfoItemVo.prototype.dispose = function () {
    };
    return SearchInfoItemVo;
}(BaseVo));
__reflect(SearchInfoItemVo.prototype, "SearchInfoItemVo");
