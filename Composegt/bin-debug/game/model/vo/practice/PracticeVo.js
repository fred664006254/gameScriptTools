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
 * 修身
 * author yanyuling
 * date 2018/04/18
 * @class PracticeVo
 */
var PracticeVo = (function (_super) {
    __extends(PracticeVo, _super);
    function PracticeVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /*"修身属性",
            [0] "修身属性:武力",
            [1] "修身属性:智力",
            [2] "修身属性:政治",
            [3] "修身属性:魅力",
        */
        _this.attr = [];
        _this.level = 0; //  "修身等级",
        _this.exp = 0; //  "修身阅历",
        _this.spd = 0; //  "修身阅历生产速度",
        /**
         * "修身资质信息",
         * "修身资质属性:武力",
         * "修身资质属性:智力",
         * "修身资质属性:政治",
         * "修身资质属性:魅力",
         */
        _this.ability = [];
        _this.task = {}; //  "资质任务详情",
        return _this;
    }
    PracticeVo.prototype.initData = function (data) {
        if (data) {
            this.attr = data.attr;
            this.level = data.level;
            this.exp = data.exp;
            this.spd = data.spd;
            this.storage = data.storage;
            this.ability = data.ability;
            this.info = data.info;
            if (data.task) {
                if (!this.task) {
                    this.task = {};
                }
                for (var key in data.task) {
                    var taskvo = this.task[key];
                    if (!taskvo) {
                        taskvo = new PracticeTaskVo();
                        this.task[key] = taskvo;
                    }
                    taskvo.initData(data.task[key]);
                    taskvo.id = key;
                }
            }
        }
    };
    PracticeVo.prototype.dispose = function () {
        this.attr = [];
        this.ability = [];
        this.info = null;
        this.level = 0;
        this.exp = 0;
        this.spd = 0;
        this.storage = null;
    };
    return PracticeVo;
}(BaseVo));
__reflect(PracticeVo.prototype, "PracticeVo");
var PracticeTaskVo = (function (_super) {
    __extends(PracticeTaskVo, _super);
    function PracticeTaskVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.stage = 0;
        _this.v = 0;
        _this.f = 0; //"成就领取情况0未完成 1已完成",
        _this.id = "";
        return _this;
    }
    PracticeTaskVo.prototype.initData = function (data) {
        if (data) {
            this.stage = data.stage;
            this.v = data.v;
            this.f = data.f;
        }
    };
    Object.defineProperty(PracticeTaskVo.prototype, "curV", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    PracticeTaskVo.prototype.dispose = function () {
        this.stage = 0;
        this.v = 0;
        this.f = 0;
        this.id = "";
    };
    return PracticeTaskVo;
}(BaseVo));
__reflect(PracticeTaskVo.prototype, "PracticeTaskVo");
