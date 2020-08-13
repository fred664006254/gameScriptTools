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
        _this.pos_num = 0; //普通席位
        _this.infoList = {};
        _this.vip_pos = null;
        _this.month_pos = [];
        _this.year_pos = [];
        _this.base_pos = [];
        _this.item_pos = [];
        return _this;
    }
    BookroomVo.prototype.initData = function (data) {
        this.month_pos = [];
        this.year_pos = [];
        this.base_pos = [];
        this.item_pos = [];
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
                if (100 < Number(key) && Number(key) < 200) {
                    this.month_pos.push(tmpinfo);
                }
                if (Number(key) > 200 && Number(key) < 300) {
                    this.year_pos.push(tmpinfo);
                }
                if (Number(key) < 100) {
                    this.base_pos.push(tmpinfo);
                }
                if (Number(key) > 300 && Number(key) < 400) {
                    this.item_pos.push(tmpinfo);
                }
            }
            infovo.initData(tmpinfo);
        }
    };
    // 解锁的月卡就有两个席位，lock解锁就是0;
    BookroomVo.prototype.ismonthunlock = function () {
        var num = 0;
        for (var i = 0; i < this.month_pos.length; i++) {
            if (this.month_pos[i].lock == 0 || this.month_pos[i].et > 0) {
                num += 1;
            }
        }
        return num;
    };
    BookroomVo.prototype.ismonthTimer = function () {
        if (this.month_pos[0]) {
            return this.month_pos[0].lastet;
        }
        return 0;
    };
    BookroomVo.prototype.isitemTimer = function () {
        if (this.item_pos[0]) {
            return this.item_pos[0].lastet;
        }
        return 0;
    };
    //年卡长度
    BookroomVo.prototype.yearLength = function () {
        var num = 0;
        for (var i = 0; i < this.year_pos.length; i++) {
            if (this.year_pos[i] && this.year_pos[i].lock == 0 || this.year_pos[i].et > 0) {
                num += 1;
            }
        }
        return num;
    };
    //道具卡使用数量
    BookroomVo.prototype.itemLength = function () {
        var num = 0;
        for (var i = 0; i < this.item_pos.length; i++) {
            if (this.item_pos[i] && (this.item_pos[i].lock == 0 || this.item_pos[i].et > 0)) {
                num += 1;
            }
        }
        return num;
    };
    //未解锁的年卡
    BookroomVo.prototype.unluckYearArr = function () {
        var num = 0;
        for (var i = 0; i < this.year_pos.length; i++) {
            if (this.year_pos[i] && this.year_pos[i].lock == 1) {
                this.year_pos[i].year = 2;
                return this.year_pos[i];
            }
        }
    };
    BookroomVo.prototype.getYearneedLevel = function () {
        var needlv = 0;
        for (var i = 0; i < this.year_pos.length; i++) {
            needlv = this.year_pos[i].needLevel;
        }
        return needlv;
    };
    // 终身卡最大数量 8
    BookroomVo.prototype.vipyearMaxnum = function () {
        var bookroomCfg = GameConfig.config.bookroomCfg;
        var maxNum = bookroomCfg.permPos.length;
        return maxNum;
    };
    // 道具卡最大数量
    BookroomVo.prototype.itemMaxnum = function () {
        var bookroomCfg = GameConfig.config.bookroomCfg;
        var maxNum = bookroomCfg.temporaryMax;
        return maxNum;
    };
    //月卡最大数量 2
    BookroomVo.prototype.vipmonthMaxnum = function () {
        return 2;
    };
    BookroomVo.prototype.dispose = function () {
        this.year_pos = [];
        this.month_pos = [];
        this.pos_num = 0;
        this.infoList = {};
        this.item_pos = [];
    };
    return BookroomVo;
}(BaseVo));
__reflect(BookroomVo.prototype, "BookroomVo");
//# sourceMappingURL=BookroomVo.js.map