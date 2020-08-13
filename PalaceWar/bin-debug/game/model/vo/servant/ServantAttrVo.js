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
 * 门客属性vo
 * author dmj
 * date 2017/9/22
 * @class ServantAttrVo
 */
var ServantAttrVo = (function (_super) {
    __extends(ServantAttrVo, _super);
    function ServantAttrVo() {
        var _this = _super.call(this) || this;
        // 武力
        _this.forceTotal = 0;
        // _1,2,3,4分别代表资质，丹丸，红颜，光环加成 衣装加成
        _this.forceAdd_1 = 0;
        _this.forceAdd_2 = 0;
        _this.forceAdd_3 = 0;
        _this.forceAdd_4 = 0;
        _this.forceAdd_5 = 0;
        _this.forceAdd_6 = 0;
        _this.forceAdd_7 = 0;
        _this.forceAdd_9 = 0;
        // 智力
        _this.brainsTotal = 0;
        _this.brainsAdd_1 = 0;
        _this.brainsAdd_2 = 0;
        _this.brainsAdd_3 = 0;
        _this.brainsAdd_4 = 0;
        _this.brainsAdd_5 = 0;
        _this.brainsAdd_6 = 0;
        _this.brainsAdd_7 = 0;
        _this.brainsAdd_9 = 0;
        // 政治
        _this.politicsTotal = 0;
        _this.politicsAdd_1 = 0;
        _this.politicsAdd_2 = 0;
        _this.politicsAdd_3 = 0;
        _this.politicsAdd_4 = 0;
        _this.politicsAdd_5 = 0;
        _this.politicsAdd_6 = 0;
        _this.politicsAdd_7 = 0;
        _this.politicsAdd_9 = 0;
        // 魅力
        _this.charmTotal = 0;
        _this.charmAdd_1 = 0;
        _this.charmAdd_2 = 0;
        _this.charmAdd_3 = 0;
        _this.charmAdd_4 = 0;
        _this.charmAdd_5 = 0;
        _this.charmAdd_6 = 0;
        _this.charmAdd_7 = 0;
        return _this;
    }
    ServantAttrVo.prototype.initData = function (data) {
        if (data) {
            if (data.attr) {
                this.forceTotal = Number(data.attr[0]);
                this.brainsTotal = Number(data.attr[1]);
                this.politicsTotal = Number(data.attr[2]);
                this.charmTotal = Number(data.attr[3]);
            }
            if (data.attrAdd) {
                var arr = ["forceAdd_", "brainsAdd_", "politicsAdd_", "charmAdd_"];
                for (var i in arr) {
                    var unit = arr[i];
                    for (var j = 1; j <= 9; ++j) {
                        //门客神器暂无	
                        // if(j == 8){
                        // 	continue;
                        // }
                        if (data.attrAdd[Number(i)][j - 1]) {
                            this["" + unit + j] = Number(data.attrAdd[Number(i)][j - 1]);
                        }
                    }
                }
            }
        }
    };
    ServantAttrVo.prototype.dispose = function () {
        var arr = ["forceAdd_", "brainsAdd_", "politicsAdd_", "charmAdd_"];
        for (var i in arr) {
            var unit = arr[i];
            for (var j = 1; j <= 7; ++j) {
                var temp = this["" + unit + j];
                if (temp) {
                    this["" + unit + j] = 0;
                }
            }
        }
    };
    return ServantAttrVo;
}(BaseVo));
__reflect(ServantAttrVo.prototype, "ServantAttrVo");
//# sourceMappingURL=ServantAttrVo.js.map