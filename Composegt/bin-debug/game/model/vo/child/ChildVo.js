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
 * 子嗣系统vo
 * author dmj
 * date 2017/9/23
 * @class ChildVo
 */
var ChildVo = (function (_super) {
    __extends(ChildVo, _super);
    function ChildVo() {
        var _this = _super.call(this) || this;
        //
        _this.cnum = 0; //当前子嗣
        // 子嗣扩展槽
        _this.posnum = 0;
        // 子嗣vo列表
        _this.childInfoVoObj = null;
        return _this;
    }
    ChildVo.prototype.initData = function (data) {
        if (data) {
            // this.childInfoVoObj = null;
            if (data.posnum) {
                this.posnum = Number(data.posnum);
            }
            if (data.cnum != null) {
                this.cnum = data.cnum;
            }
            if (data.info) {
                if (this.childInfoVoObj == null) {
                    this.childInfoVoObj = {};
                }
                for (var key in data.info) {
                    if (this.childInfoVoObj[key]) {
                        this.childInfoVoObj[key].initData(data.info[key]);
                    }
                    else {
                        var childrenInfoVo = new ChildInfoVo();
                        childrenInfoVo.id = key;
                        childrenInfoVo.initData(data.info[key]);
                        this.childInfoVoObj[key] = childrenInfoVo;
                    }
                }
                for (var key in this.childInfoVoObj) {
                    if (!data.info[key]) {
                        delete this.childInfoVoObj[key];
                    }
                }
            }
        }
    };
    ChildVo.prototype.dispose = function () {
        if (this.childInfoVoObj) {
            for (var key in this.childInfoVoObj) {
                (this.childInfoVoObj[key]);
                {
                    this.childInfoVoObj[key].dispose();
                    this.childInfoVoObj[key] = null;
                }
            }
        }
        this.posnum = 0;
        this.childInfoVoObj = null;
    };
    return ChildVo;
}(BaseVo));
__reflect(ChildVo.prototype, "ChildVo");
