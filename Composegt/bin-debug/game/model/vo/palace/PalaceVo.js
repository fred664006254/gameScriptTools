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
 * 皇宫vo
 * author yanyuling
 * date 2017/11/01
 * @class PalaceVo
 */
var PalaceVo = (function (_super) {
    __extends(PalaceVo, _super);
    function PalaceVo() {
        var _this = _super.call(this) || this;
        _this.palace = {};
        _this.gpalace = {};
        _this.isInit = false;
        _this.isCross = false;
        return _this;
    }
    PalaceVo.prototype.initData = function (data) {
        this.isInit = true;
        if (data.palace) {
            for (var key in data.palace) {
                var tmpRoleVo = this.palace[key];
                if (!tmpRoleVo) {
                    tmpRoleVo = new PalaceRoleInfoVo();
                    this.palace[key] = tmpRoleVo;
                }
                tmpRoleVo.initData(data.palace[key]);
                tmpRoleVo.titleId = key;
            }
        }
        this.isCross = data.isCross;
        // if (data.gpalace)
        // {
        //     for (var key in data.gpalace) {
        //         let tmpRoleVo:PalaceRoleInfoVo =  this.gpalace[key];
        //         if(! tmpRoleVo)
        //         {
        //             tmpRoleVo = new PalaceRoleInfoVo();
        //             this.gpalace[key] = tmpRoleVo;
        //         }
        //         tmpRoleVo.initData(data.gpalace[key]);
        //         tmpRoleVo.titleId = key;
        //     }
        // }
    };
    PalaceVo.prototype.dispose = function () {
        this.palace = {};
        this.gpalace = {};
        this.isInit = false;
        this.isCross = false;
    };
    return PalaceVo;
}(BaseVo));
__reflect(PalaceVo.prototype, "PalaceVo");
