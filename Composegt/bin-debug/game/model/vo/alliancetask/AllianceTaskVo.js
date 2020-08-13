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
 * 军团建设系统vo
 * author yanyuling
 * date 2018/07/23
 * @class AllianceTaskVo
 */
var AllianceTaskVo = (function (_super) {
    __extends(AllianceTaskVo, _super);
    function AllianceTaskVo() {
        var _this = _super.call(this) || this;
        _this.buff = null;
        _this.id = "";
        _this.tinfo = [];
        _this.v = 0;
        _this.overNum = 0;
        return _this;
    }
    AllianceTaskVo.prototype.initData = function (data) {
        if (data) {
            for (var key in data) {
                this[key] = data[key];
            }
            this.checkOverNum();
        }
    };
    AllianceTaskVo.prototype.checkOverNum = function () {
        this.overNum = 0;
        var date = new Date(GameData.serverTime * 1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var ymstr = year + "" + month;
        if (month < 10) {
            ymstr = year + "0" + month;
        }
        if (this.tinfo[ymstr]) {
            for (var tid in this.tinfo[ymstr]) {
                var taskInfo = this.tinfo[ymstr][tid];
                if (taskInfo && taskInfo.flag > 0) {
                    this.overNum = this.overNum + 1;
                }
            }
        }
    };
    AllianceTaskVo.prototype.dispose = function () {
        this.buff = null;
        this.id = "";
        this.tinfo = [];
        this.v = 0;
    };
    return AllianceTaskVo;
}(BaseVo));
__reflect(AllianceTaskVo.prototype, "AllianceTaskVo");
