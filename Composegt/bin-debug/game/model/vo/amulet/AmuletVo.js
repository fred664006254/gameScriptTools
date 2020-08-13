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
var AmuletVo = (function (_super) {
    __extends(AmuletVo, _super);
    function AmuletVo() {
        var _this = _super.call(this) || this;
        _this.amuletInfoVoList = [];
        return _this;
    }
    AmuletVo.prototype.initData = function (data) {
        if (data.info) {
            for (var key in data.info) {
                var vo = this.amuletInfoVoList[key];
                if (!vo) {
                    vo = new AmuletInfoVo();
                    this.amuletInfoVoList[key] = vo;
                }
                vo.initData(data.info[key]);
                vo.servantId = key;
            }
        }
    };
    AmuletVo.prototype.getAmuListById = function (serId) {
        return this.amuletInfoVoList["" + serId];
    };
    AmuletVo.prototype.dispose = function () {
        this.amuletInfoVoList = [];
    };
    return AmuletVo;
}(BaseVo));
__reflect(AmuletVo.prototype, "AmuletVo");
var AmuletInfoVo = (function (_super) {
    __extends(AmuletInfoVo, _super);
    // public amuletId:string;
    // public amuletNum:number = 0;
    // public obligate:string;
    // public skinId:string;
    function AmuletInfoVo() {
        var _this = _super.call(this) || this;
        _this.amuletList = [];
        return _this;
    }
    AmuletInfoVo.prototype.initData = function (data) {
        if (data) {
            this.amuletList = data;
            // for (var key in data) {
            //     if (data.hasOwnProperty(key)) {
            //         this[key] = data[key]
            //     }
            // }
        }
    };
    AmuletInfoVo.prototype.dispose = function () {
        this.servantId = "";
        this.amuletList = [];
        // this.amuletId = "";
        // this.amuletNum = 0;
        // this.obligate = "";
        // this.skinId = "";
    };
    return AmuletInfoVo;
}(BaseVo));
__reflect(AmuletInfoVo.prototype, "AmuletInfoVo");
