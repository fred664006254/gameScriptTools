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
var AcSeaWomanVo = /** @class */ (function (_super) {
    __extends(AcSeaWomanVo, _super);
    function AcSeaWomanVo() {
        var _this = _super.call(this) || this;
        /*
        flags: {}
        v: 0
        */
        _this.ainfo = null;
        // 1  
        _this.isfree = 0;
        //1: {icon: 1} isflop 是我翻过的牌子，但是合上了。onlyshow 是唯一显示的
        _this.map = null;
        //剩余次数
        _this.num = 0;
        // public tnum : number = 0;
        //充值数
        _this.v = 0;
        return _this;
    }
    Object.defineProperty(AcSeaWomanVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcSeaWomanVo.prototype.getMapInfo = function (id) {
        return this.map[String(id)];
    };
    AcSeaWomanVo.prototype.getShakeId = function (id) {
        var sid = 0;
        var icon = this.map[String(id)].icon;
        for (var k in this.map) {
            var oneinfo = this.map[k];
            if (k != String(id) && oneinfo.icon == icon && oneinfo.isflop) {
                sid = Number(k);
                break;
            }
        }
        return sid;
    };
    AcSeaWomanVo.prototype.getShowId = function () {
        var id = 0;
        for (var k in this.map) {
            var oneinfo = this.map[k];
            if (oneinfo.onlyshow) {
                id = Number(k);
                break;
            }
        }
        return id;
    };
    AcSeaWomanVo.prototype.getCountDown = function () {
        var num = 0;
        if (this.isInActivity()) {
            num = this.et - this.cfg.extraTime * 86400 - GameData.serverTime;
        }
        else {
            num = 0;
        }
        return num;
    };
    AcSeaWomanVo.prototype.getCountDownTime = function () {
        if (this.isInActivity()) {
            return LanguageManager.getlocal("acFourPeople_acCD", [this.acCountDownNoExtra]);
        }
        else {
            return LanguageManager.getlocal("acPunishEnd");
        }
    };
    AcSeaWomanVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    //再充值x可获得一次游戏次数
    AcSeaWomanVo.prototype.getNextTimeNeedRecharge = function () {
        var v = this.cfg.cost - this.v % this.cfg.cost;
        if (v == 0) {
            v = this.cfg.cost;
        }
        return v;
    };
    Object.defineProperty(AcSeaWomanVo.prototype, "isShowRedDot", {
        //红点
        get: function () {
            return this.isCangetAchieveReward() || this.isCanPlay() || this.isCanExchange();
        },
        enumerable: true,
        configurable: true
    });
    //是否有可领取进度奖励
    AcSeaWomanVo.prototype.isCangetAchieveReward = function () {
        var data = this.cfg.chessNum;
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchieveRewardById(data[i].id)) {
                if (this.ainfo.v >= data[i].needNum) {
                    return true;
                }
            }
        }
        return false;
    };
    /**当前进度奖励是否领取 */
    AcSeaWomanVo.prototype.isGetAchieveRewardById = function (id) {
        if (this.ainfo && this.ainfo.flags && this.ainfo.flags[id]) {
            return true;
        }
        return false;
    };
    //是否有免费次数
    AcSeaWomanVo.prototype.isCanPlay = function () {
        if (this.isInActivity() && (this.isFree() || this.num > 0)) {
            return true;
        }
        return false;
    };
    /**当前进度 */
    AcSeaWomanVo.prototype.getProcessNum = function () {
        if (this.ainfo && this.ainfo.v) {
            return this.ainfo.v;
        }
        return 0;
    };
    //是否免费
    AcSeaWomanVo.prototype.isFree = function () {
        if (this.isfree > 0) {
            return true;
        }
        return false;
    };
    AcSeaWomanVo.prototype.isCanExchange = function () {
        var str = this.cfg.change["needItem"];
        var itemVo = GameData.formatRewardItem(str)[0];
        var itemData = Api.itemVoApi.getItemInfoVoById(itemVo.id);
        var currNum = 0;
        if (itemData) {
            currNum = itemData.num;
        }
        if (currNum >= itemVo.num) {
            return true;
        }
        return false;
    };
    // 1, 2,可领，3,已领
    AcSeaWomanVo.prototype.getAchievementType = function (id) {
        var type = 1;
        if (this.isGetAchieveRewardById(id)) {
            type = 3;
        }
        else {
            var neednum = this.cfg.chessNum[id - 1].needNum;
            if (this.ainfo.v >= neednum) {
                type = 2;
            }
        }
        return type;
    };
    AcSeaWomanVo.prototype.getSortAchievementCfg = function () {
        var achieveData = this.cfg.chessNum;
        var count = achieveData.length;
        var data = [];
        for (var i = 0; i < count; i++) {
            if (this.isGetAchieveRewardById(achieveData[i].id)) {
                achieveData[i].sortId = achieveData[i].id + count;
            }
            else if (this.ainfo.num >= achieveData[i].needNum) {
                achieveData[i].sortId = achieveData[i].id - count;
            }
            else {
                achieveData[i].sortId = achieveData[i].id;
            }
            data.push(achieveData[i]);
        }
        data.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
        return data;
    };
    AcSeaWomanVo.prototype.getShowSkinData = function () {
        var data = this.cfg.change;
        var itemVo = GameData.formatRewardItem(data["needItem"])[0];
        return itemVo;
    };
    AcSeaWomanVo.prototype.dispose = function () {
        this.ainfo = null;
        this.isfree = 0;
        this.map = null;
        this.num = 0;
        this.v = 0;
        _super.prototype.dispose.call(this);
    };
    return AcSeaWomanVo;
}(AcBaseVo));
//# sourceMappingURL=AcSeaWomanVo.js.map