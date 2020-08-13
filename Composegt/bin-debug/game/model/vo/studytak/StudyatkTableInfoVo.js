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
 * 演武场
 * author yanyuling
 * date 2017/11/28
 * @class StudyatkTableInfoVo
 */
var StudyatkTableInfoVo = (function (_super) {
    __extends(StudyatkTableInfoVo, _super);
    function StudyatkTableInfoVo() {
        var _this = _super.call(this) || this;
        // 门客vo列表
        _this.atklist = [];
        return _this;
    }
    StudyatkTableInfoVo.prototype.initData = function (data) {
        if (data.studyatk) {
        }
    };
    StudyatkTableInfoVo.prototype.dispose = function () {
    };
    return StudyatkTableInfoVo;
}(BaseVo));
__reflect(StudyatkTableInfoVo.prototype, "StudyatkTableInfoVo");
