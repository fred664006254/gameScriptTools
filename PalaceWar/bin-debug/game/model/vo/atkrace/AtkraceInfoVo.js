var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AtkraceInfoVo = /** @class */ (function (_super) {
    __extends(AtkraceInfoVo, _super);
    function AtkraceInfoVo() {
        var _this = _super.call(this) || this;
        /**
         * 上次出战时间
         */
        _this.lasttime = 0;
        /**
         * 战斗次数
         */
        _this.num = 0;
        /**
         * 是否使用出师令
         */
        _this.isuse = 0;
        /**
         * {id1,id2}战斗过的门客
         */
        _this.asids = [];
        /**
         * 额外出师次数
         */
        _this.extranum = 0;
        /**
         * 连胜次数
         */
        _this.streak = 0;
        /**
         * 士气值
         */
        _this.morale = 0;
        /**
         * 连续上榜次数
         */
        _this.rankover = 0;
        /**
         * 上次攻打人的uid
         */
        _this.lastuid = 0;
        /**
         * 上次攻打人的姓名
         */
        _this.lastname = '';
        _this.lastKillerInfo = null;
        _this.usesp = null;
        /**
         * 江湖名望 席位数据
         */
        _this.director = null;
        return _this;
    }
    AtkraceInfoVo.prototype.initData = function (data) {
        if (data) {
            this.lasttime = data.lasttime;
            this.num = data.num;
            this.isuse = data.isuse;
            if (data.asids && data.asids.length > 0) {
                this.asids = data.asids;
            }
            else {
                this.asids.length = 0;
            }
            this.extranum = data.extranum;
            this.streak = data.streak;
            this.morale = data.morale;
            this.rankover = data.rankover;
            this.lastuid = data.lastuid;
            this.lastname = data.lastname;
            this.director = data.director;
            if (data.lastKillerInfo) {
                if (data.lastKillerInfo.uid) {
                    this.lastKillerInfo = data.lastKillerInfo;
                }
                else {
                    this.lastKillerInfo = null;
                }
            }
            if (data.usesp) {
                this.usesp = data.usesp;
            }
            else {
                this.usesp = null;
            }
        }
    };
    AtkraceInfoVo.prototype.dispose = function () {
        this.lasttime = 0;
        this.num = 0;
        this.isuse = 0;
        this.asids.length = 0;
        this.extranum = 0;
        this.streak = 0;
        this.morale = 0;
        this.rankover = 0;
        this.lastuid = 0;
        this.lastname = '';
        this.lastKillerInfo = null;
        this.usesp = null;
        this.director = null;
    };
    return AtkraceInfoVo;
}(BaseVo));
//# sourceMappingURL=AtkraceInfoVo.js.map