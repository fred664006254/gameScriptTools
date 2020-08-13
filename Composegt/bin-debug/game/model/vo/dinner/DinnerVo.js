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
var DinnerVo = (function (_super) {
    __extends(DinnerVo, _super);
    function DinnerVo() {
        var _this = _super.call(this) || this;
        /**
         * 当前宴会人数
         */
        _this.num = 0;
        /**
         * 当前宴会分数
         */
        _this.point = 0;
        /**
         * 总宴会分数
         */
        _this.total_point = 0;
        /**
         * 当前宴会类型： 1家宴 2官宴
         */
        _this.dtype = 0;
        /**
         * 宴会是否公开 1公开 0不公开
         */
        _this.is_open = 0;
        /**
         * 宴会结束时间
         */
        _this.end_time = 0;
        /**
         * 参宴次数
         */
        _this.day_num = 0;
        /**
         * 当前举办宴会的来宾信息
         * *.name 来宾name
         * *.type 来宾赴宴方式
         * *.join_time 来宾赴宴时间
         */
        _this.jinfo = [];
        /**
         * 总积分
         */
        _this.total_score = 0;
        /**
         * 商店刷新次数
         */
        _this.shop_num = 0;
        /**
         * 记录自动刷新时间
         */
        _this.shop_last_time = 0;
        /**
         * 积分商店道具信息[shoid1,shopid2]
         */
        _this.shop_info = [];
        /**
         * 积分购买的道具信息[shoid1:1,shopid2:1]
         */
        _this.buy_info = null;
        /**
         * 请求处理最后时间
         */
        _this.lastday = 0;
        /**
         * 积分商店道具信息[shoid1,shopid2]
         */
        _this.name = null;
        _this.pic = null;
        _this.level = null;
        _this.title = null;
        _this.other_info = null;
        _this.phototitle = null;
        return _this;
    }
    DinnerVo.prototype.initData = function (data) {
        if (data) {
            if (data.num != null) {
                this.num = data.num;
            }
            if (data.point != null) {
                this.point = data.point;
            }
            if (data.dtype != null) {
                this.dtype = data.dtype;
            }
            if (data.is_open != null) {
                this.is_open = data.is_open;
            }
            if (data.end_time != null) {
                this.end_time = data.end_time;
            }
            if (data.day_num != null) {
                this.day_num = data.day_num;
            }
            if (data.jinfo != null) {
                this.jinfo = data.jinfo;
            }
            if (data.total_score != null) {
                this.total_score = data.total_score;
            }
            if (data.total_point != null) {
                this.total_point = data.total_point;
            }
            if (data.shop_num != null) {
                this.shop_num = data.shop_num;
            }
            if (data.shop_last_time != null) {
                this.shop_last_time = data.shop_last_time;
            }
            if (data.shop_info != null) {
                this.shop_info = data.shop_info;
            }
            if (data.buy_info != null) {
                this.buy_info = data.buy_info;
            }
            if (data.lastday != null) {
                this.lastday = data.lastday;
            }
            if (data.name != null) {
                this.name = data.name;
            }
            if (data.pic != null) {
                this.pic = data.pic;
            }
            if (data.level != null) {
                this.level = data.level;
            }
            if (data.title != null) {
                this.title = data.title;
            }
            if (data.other_info != null) {
                this.other_info = data.other_info;
            }
            if (data.phototitle != null) {
                this.phototitle = data.phototitle;
            }
        }
    };
    DinnerVo.prototype.dispose = function () {
        this.num = 0;
        this.point = 0;
        this.dtype = 0;
        this.is_open = 0;
        this.end_time = 0;
        this.day_num = 0;
        this.jinfo.length = 0;
        this.total_score = 0;
        this.total_point = 0;
        this.shop_num = 0;
        this.shop_last_time = 0;
        this.shop_info.length = 0;
        this.buy_info = null;
        this.lastday = 0;
        this.name = null;
        this.other_info = null;
        this.pic = 0;
        this.level = 0;
        this.title = null;
        this.phototitle = null;
    };
    return DinnerVo;
}(BaseVo));
__reflect(DinnerVo.prototype, "DinnerVo");
