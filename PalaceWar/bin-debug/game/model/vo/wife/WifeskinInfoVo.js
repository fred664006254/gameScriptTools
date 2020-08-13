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
                // if(Api.switchVoApi.checkOpenSkinLvup()){
                // 	for (var key in this.skin) {
                // 		let olv = this.skin[key].wlv;
                // 		let nlv = data.skin[key].wlv;
                // 		if(nlv > olv)
                // 		{
                // 			//弹出皮肤升级UI
                // 			ViewController.getInstance().openView(ViewConst.COMMON.SKINLEVELUPVIEW,{skinId:key});
                // 			break;
                // 		}
                // 	}
                // }
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
    Object.defineProperty(WifeskinInfoVo.prototype, "words", {
        /**红颜说的话 */
        get: function () {
            return this.cfg.words;
        },
        enumerable: true,
        configurable: true
    });
    /**红颜剧情选项进度*/
    WifeskinInfoVo.prototype.avgSelect = function (skinId, level) {
        var arr = [];
        if (this.skin && this.skin[skinId] && this.skin[skinId].chatselect && this.skin[skinId].chatselect[level]) {
            for (var i in this.skin[skinId].chatselect[level]) {
                var unit = this.skin[skinId].chatselect[level][i];
                arr.push(unit);
            }
        }
        return arr;
    };
    //是否重置过
    WifeskinInfoVo.prototype.havereset = function (skinId, lv) {
        var flag = false;
        if (this.skin && this.skin[skinId] && this.skin[skinId].chatHistory && this.skin[skinId].chatHistory[lv]) {
            flag = Object.keys(this.skin[skinId].chatHistory[lv]).length > 0;
        }
        return flag;
    };
    /**红颜剧情当前进度*/
    WifeskinInfoVo.prototype.getCuravgId = function (skinId, level) {
        var num = 1;
        if (this.skin && this.skin[skinId] && this.skin[skinId].chatselect && this.skin[skinId].chatselect[level]) {
            var keys = Object.keys(this.skin[skinId].chatselect[level]);
            if (keys.length) {
                keys.sort(function (a, b) {
                    return Number(b) - Number(a);
                });
                num = Number(keys[0]);
            }
        }
        return num;
    };
    /**红颜当前季度选项*/
    WifeskinInfoVo.prototype.isAvgSelected = function (skinId, level, id, sel) {
        var flag = false;
        if (this.skin && this.skin[skinId] && this.skin[skinId].chatHistory && this.skin[skinId].chatHistory[level] && this.skin[skinId].chatHistory[level][id]) {
            var index = this.skin[skinId].chatHistory[level][id].indexOf(Number(sel));
            flag = index > -1;
        }
        return flag;
    };
    /**红颜历史选项*/
    WifeskinInfoVo.prototype.getNowAvgSelected = function (skinId, level, id) {
        var sel = 1;
        if (this.skin && this.skin[skinId] && this.skin[skinId].chatHistory && this.skin[skinId].chatHistory[level] && this.skin[skinId].chatselect[level][id]) {
            sel = this.skin[skinId].chatselect[level][id];
        }
        return sel;
    };
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
//# sourceMappingURL=WifeskinInfoVo.js.map