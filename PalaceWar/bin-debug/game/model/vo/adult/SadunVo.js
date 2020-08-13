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
 * 亲家相关vo
 * author qianjun
 * date 2017/10/28
 * @class AdultVo
 */
var SadunVo = (function (_super) {
    __extends(SadunVo, _super);
    function SadunVo() {
        var _this = _super.call(this) || this;
        _this.visited = null;
        _this.receive = null;
        _this.info = null;
        _this.wife = null;
        _this.refuse = null;
        _this.sadunList = null;
        return _this;
    }
    SadunVo.prototype.initData = function (data) {
        if (data && Object.keys(data).length) {
            this.visited = data.sadun.visited; //孩子被接待了
            this.receive = data.sadun.receive;
            this.info = data.sadun.info;
            this.wife = data.sadun.wife;
            this.refuse = data.sadun.refuse;
            if (data.sadunList) {
                this.sadunList = data.sadunList;
            }
            if (this.sadunList) {
                var temp = this.arr2obj(this.sadunList, 'uid');
                for (var i in this.info) {
                    if (temp[i]) {
                        for (var k in temp[i]) {
                            this.info[i][k] = temp[i][k];
                        }
                    }
                }
            }
        }
    };
    SadunVo.prototype.arr2obj = function (arr, key) {
        var obj = {};
        if (arr) {
            var ln = arr.length;
            if (ln) {
                for (var i = 0; i < ln; i++) {
                    var cd = arr[i];
                    obj[cd[key]] = cd;
                }
            }
        }
        return obj;
    };
    SadunVo.prototype.dispose = function () {
        this.visited = null;
        this.receive = null;
        this.info = null;
        this.wife = null;
        this.refuse = null;
        this.sadunList = null;
    };
    return SadunVo;
}(BaseVo));
__reflect(SadunVo.prototype, "SadunVo");
/**
 *
 * sadun":{"visited":{},
 * "lastday":0,
 * "receive":{},
 * "info":{},
 * "uid":1002741,
 * "wife":{},
 * "refuse":""},
 * "sadunList":{}}
 */ 
//# sourceMappingURL=SadunVo.js.map