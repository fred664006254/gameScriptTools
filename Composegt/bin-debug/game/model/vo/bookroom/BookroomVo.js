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
 * 书院vo
 * author yanyuling
 * date 2017/11/24
 * @class BookroomVo
 */
var BookroomVo = (function (_super) {
    __extends(BookroomVo, _super);
    function BookroomVo() {
        var _this = _super.call(this) || this;
        _this.pos_num = 0; //活跃度
        _this.infoList = {};
        return _this;
    }
    BookroomVo.prototype.initData = function (data) {
        this.pos_num = data.pos_num;
        for (var key in this.infoList) {
            this.infoList[key].dispose();
        }
        this.infoList = {};
        for (var key in data.info) {
            var tmpinfo = data.info[key];
            var infovo = this.infoList[key];
            if (infovo == null) {
                infovo = new BookroomInfoVo();
                this.infoList[key] = infovo;
                infovo.posId = key;
            }
            infovo.initData(tmpinfo);
        }
    };
    BookroomVo.prototype.dispose = function () {
        this.pos_num = 0;
        this.infoList = {};
    };
    return BookroomVo;
}(BaseVo));
__reflect(BookroomVo.prototype, "BookroomVo");
