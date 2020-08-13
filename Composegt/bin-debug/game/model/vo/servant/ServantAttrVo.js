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
        // _1,2,3,4分别代表资质，丹丸，红颜，光环加成
        _this.forceAdd_1 = 0;
        _this.forceAdd_2 = 0;
        _this.forceAdd_3 = 0;
        _this.forceAdd_4 = 0;
        _this.forceAdd_5 = 0;
        // 智力
        _this.brainsTotal = 0;
        _this.brainsAdd_1 = 0;
        _this.brainsAdd_2 = 0;
        _this.brainsAdd_3 = 0;
        _this.brainsAdd_4 = 0;
        _this.brainsAdd_5 = 0;
        // 政治
        _this.politicsTotal = 0;
        _this.politicsAdd_1 = 0;
        _this.politicsAdd_2 = 0;
        _this.politicsAdd_3 = 0;
        _this.politicsAdd_4 = 0;
        _this.politicsAdd_5 = 0;
        // 魅力
        _this.charmTotal = 0;
        _this.charmAdd_1 = 0;
        _this.charmAdd_2 = 0;
        _this.charmAdd_3 = 0;
        _this.charmAdd_4 = 0;
        _this.charmAdd_5 = 0;
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
                this.forceAdd_1 = Number(data.attrAdd[0][0]);
                this.forceAdd_2 = Number(data.attrAdd[0][1]);
                this.forceAdd_3 = Number(data.attrAdd[0][2]);
                this.forceAdd_4 = Number(data.attrAdd[0][3]);
                if (data.attrAdd[0][4]) {
                    this.forceAdd_5 = Number(data.attrAdd[0][4]);
                }
                this.brainsAdd_1 = Number(data.attrAdd[1][0]);
                this.brainsAdd_2 = Number(data.attrAdd[1][1]);
                this.brainsAdd_3 = Number(data.attrAdd[1][2]);
                this.brainsAdd_4 = Number(data.attrAdd[1][3]);
                if (data.attrAdd[1][4]) {
                    this.brainsAdd_5 = Number(data.attrAdd[1][4]);
                }
                this.politicsAdd_1 = Number(data.attrAdd[2][0]);
                this.politicsAdd_2 = Number(data.attrAdd[2][1]);
                this.politicsAdd_3 = Number(data.attrAdd[2][2]);
                this.politicsAdd_4 = Number(data.attrAdd[2][3]);
                if (data.attrAdd[2][4]) {
                    this.politicsAdd_5 = Number(data.attrAdd[2][4]);
                }
                this.charmAdd_1 = Number(data.attrAdd[3][0]);
                this.charmAdd_2 = Number(data.attrAdd[3][1]);
                this.charmAdd_3 = Number(data.attrAdd[3][2]);
                this.charmAdd_4 = Number(data.attrAdd[3][3]);
                if (data.attrAdd[3][4]) {
                    this.charmAdd_5 = Number(data.attrAdd[3][4]);
                }
            }
        }
    };
    ServantAttrVo.prototype.dispose = function () {
        this.forceTotal = 0;
        this.forceAdd_1 = 0;
        this.forceAdd_2 = 0;
        this.forceAdd_3 = 0;
        this.forceAdd_4 = 0;
        this.forceAdd_5 = 0;
        this.brainsTotal = 0;
        this.brainsAdd_1 = 0;
        this.brainsAdd_2 = 0;
        this.brainsAdd_3 = 0;
        this.brainsAdd_4 = 0;
        this.brainsAdd_5 = 0;
        this.politicsTotal = 0;
        this.politicsAdd_1 = 0;
        this.politicsAdd_2 = 0;
        this.politicsAdd_3 = 0;
        this.politicsAdd_4 = 0;
        this.politicsAdd_5 = 0;
        this.charmTotal = 0;
        this.charmAdd_1 = 0;
        this.charmAdd_2 = 0;
        this.charmAdd_3 = 0;
        this.charmAdd_4 = 0;
        this.charmAdd_5 = 0;
    };
    return ServantAttrVo;
}(BaseVo));
__reflect(ServantAttrVo.prototype, "ServantAttrVo");
