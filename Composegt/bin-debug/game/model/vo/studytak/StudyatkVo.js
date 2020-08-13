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
 * @class StudyatkVo
 */
var StudyatkVo = (function (_super) {
    __extends(StudyatkVo, _super);
    function StudyatkVo() {
        var _this = _super.call(this) || this;
        _this.atkList = [];
        _this.goout_time = 0;
        _this.join_uid = 0;
        _this.skillrate = 0;
        _this.create_time = 0;
        _this.join_st = 0;
        return _this;
    }
    StudyatkVo.prototype.initData = function (data) {
        if (data.studyatk) {
            if (data.studyatk.atklist) {
                var atklist = data.studyatk.atklist;
                for (var index = 0; index < atklist.length; index++) {
                    var tableVo = this.atkList[index];
                    if (tableVo == null) {
                        tableVo = new StudyatkTableInfoVo();
                        this.atkList.push(tableVo);
                    }
                    tableVo.initData(atklist[index]);
                }
            }
            if (data.studyatk.skillinfo != null) {
                this.skillinfo = data.studyatk.skillinfo;
            }
            if (data.studyatk.goout_time != null) {
                this.goout_time = data.studyatk.goout_time;
            }
            if (data.studyatk.finishinfo != null) {
                this.finishinfo = data.studyatk.finishinfo;
            }
            if (data.studyatk.join_uid != null) {
                this.join_uid = data.studyatk.join_uid;
            }
            if (data.studyatk.skillrate != null) {
                this.skillrate = data.studyatk.skillrate;
            }
            if (data.studyatk.create_time != null) {
                this.create_time = data.studyatk.create_time;
            }
            if (data.studyatk.join_st != null) {
                this.join_st = data.studyatk.join_st;
            }
            if (data.studyatk.atkinfo != null) {
                this.atkinfo = data.studyatk.atkinfo;
            }
        }
    };
    StudyatkVo.prototype.dispose = function () {
        this.atkList = [];
        this.skillinfo = null;
        this.finishinfo = null;
        this.goout_time = 0;
        this.join_uid = 0;
        this.skillrate = 0;
        this.create_time = 0;
        this.join_st = 0;
        this.atkinfo = null;
    };
    return StudyatkVo;
}(BaseVo));
__reflect(StudyatkVo.prototype, "StudyatkVo");
