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
var AcWipeBossVo = (function (_super) {
    __extends(AcWipeBossVo, _super);
    function AcWipeBossVo() {
        var _this = _super.call(this) || this;
        _this.ainfo = null; // 活动商铺各项购买数量
        _this.binfo = null; //积分商城各项购买数量
        _this.cinfo = null; //出战过的门客状态 servantId = nil 未出战，1已出战，0使用了出战令，2使用出战令后再次已出战
        _this.buysearch = 0; //元宝购买探索的次数
        _this.search = null; //剩余探索次数和上次更新探索次数的时间
        _this.shopscore = 0; //商店积分
        _this.bossMaxHp = {};
        return _this;
    }
    AcWipeBossVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        this.ainfo = data.ainfo;
        this.binfo = data.binfo;
        this.cinfo = data.cinfo;
        this.buysearch = data.buysearch;
        this.search = data.search;
        this.shopscore = data.shopscore;
        this.bossMaxHp = data.bossMaxHp;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIPEBOSS_REFRESH);
    };
    AcWipeBossVo.prototype.dispose = function () {
        this.ainfo = null;
        this.binfo = null;
        this.cinfo = null;
        this.buysearch = 0;
        this.search = null;
        this.shopscore = 0;
        this.bossMaxHp = null;
        _super.prototype.dispose.call(this);
    };
    AcWipeBossVo.prototype.getServantFightInfo = function (servantId) {
        var v = this.cinfo[servantId];
        if (v == null) {
            v = 0;
        }
        return v;
    };
    Object.defineProperty(AcWipeBossVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWipeBossVo.prototype.getpublicRedhot1 = function () {
        var flag = false;
        //有探索次数
        if (this.isInTansuoTime() && this.isInFightTime() && this.search.v > 0) {
            flag = true;
        }
        return flag;
    };
    AcWipeBossVo.prototype.getpublicRedhot2 = function () {
        var flag = false;
        //有可积分兑换的
        if (this.isInActivity() && this.getActPoints() > 0) {
            var arr = this.getArr('scoreMarket');
            for (var i in arr) {
                var unit = arr[i];
                var curNum = unit.limit - this.getPointChangeLimitnum(unit.id);
                if (this.getActPoints() >= unit.costScore && curNum > 0) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    };
    AcWipeBossVo.prototype.getBuySearchNum = function () {
        return this.buysearch;
    };
    Object.defineProperty(AcWipeBossVo.prototype, "isShowRedDot", {
        get: function () {
            for (var i = 1; i < 3; ++i) {
                if (this["getpublicRedhot" + i]()) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 鳌拜活动 今日加成
    */
    AcWipeBossVo.prototype.getMyAdd = function () {
        var effect = this.cfg.actMarket[0].effect;
        var num = this.ainfo[1] || 0;
        return num * 100 * effect;
    };
    Object.defineProperty(AcWipeBossVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcWipeBossVo.prototype.getCountDownTime = function () {
        var et = this.et - 86400;
        return et - GameData.serverTime;
    };
    AcWipeBossVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    AcWipeBossVo.prototype.isInTansuoTime = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400;
    };
    AcWipeBossVo.prototype.isInFightTime = function () {
        var cfg = this.cfg;
        var today0 = App.DateUtil.getWeeTs(GameData.serverTime);
        var flag = false;
        if (GameData.serverTime >= (today0 + cfg.actTime[0] * 3600) && GameData.serverTime < (today0 + cfg.actTime[1] * 3600)) {
            flag = true;
        }
        return flag;
    };
    AcWipeBossVo.prototype.getNextOpenTime = function () {
        var cfg = this.cfg;
        var today0 = App.DateUtil.getWeeTs(GameData.serverTime);
        var time = 0;
        if (GameData.serverTime < (today0 + cfg.actTime[0] * 3600)) {
            time = today0 + cfg.actTime[0] * 3600 - GameData.serverTime;
        }
        else {
            time = today0 + cfg.actTime[0] * 3600 + 3600 * 24 - GameData.serverTime;
        }
        return time;
    };
    AcWipeBossVo.prototype.getArr = function (key) {
        var arr = [];
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return [];
        }
        var list = cfg;
        for (var i in list) {
            if (i == key) {
                for (var key2 in list[i]) {
                    if (list[i][key2]) {
                        var currObj = list[i][key2];
                        if (currObj.rank || currObj.needGem || currObj.limit || currObj.bossScore) {
                            list[i][key2].key = Number(key2) + 1;
                            if (list[i][key2].key) {
                                arr.push(list[i][key2]);
                            }
                        }
                    }
                }
            }
        }
        return arr;
    };
    //获取元宝商店限购物品次数
    AcWipeBossVo.prototype.getShopBuyLimitnum = function (id) {
        var info = this.ainfo;
        var buyNum = 0;
        if (info && info[id]) {
            buyNum += info[id];
        }
        return buyNum;
    };
    //获取积分兑换物品次数
    AcWipeBossVo.prototype.getPointChangeLimitnum = function (id) {
        var info = this.binfo;
        var buyNum = 0;
        if (info && info[id]) {
            buyNum += info[id];
        }
        return buyNum;
    };
    AcWipeBossVo.prototype.getActPoints = function () {
        return this.shopscore;
    };
    /**
     * 剩余探索数
     * 1鳌拜未出现 2鳌拜出现未被击杀 3鳌拜出现被击杀
    */
    AcWipeBossVo.prototype.getTanSuoNum = function () {
        var obj = {};
        var lasttime = this.search.lasttime;
        var timecost = this.cfg.renewTime[Api.playerVoApi.getPlayerLevel() - this.cfg.needLv];
        var num = Math.min(this.search.v + Math.floor((GameData.serverTime - lasttime) / timecost), this.cfg.initialExplore);
        var killAll = Api.wipeBossVoApi.getIsKillAll();
        obj['killAll'] = killAll;
        if (num > 0) {
            obj['num'] = num;
        }
        else {
            obj['time'] = lasttime + timecost - GameData.serverTime;
        }
        return obj;
    };
    /**
     * 鳌拜活动 宝箱钥匙
    */
    AcWipeBossVo.prototype.getWipeBossBoxKeyNum = function (boxId) {
        var itemid = this.cfg.getBossNpcItemCfgById(boxId).needKey;
        return Api.itemVoApi.getItemNumInfoVoById(itemid);
    };
    /**
     */
    AcWipeBossVo.prototype.getWipeBossMaxHp = function (id) {
        if (this.bossMaxHp) {
            return this.bossMaxHp[id];
        }
        else {
            var cfg = this.cfg.getBossNpcItemCfgById(id);
            return cfg.bossHP;
        }
    };
    return AcWipeBossVo;
}(AcBaseVo));
__reflect(AcWipeBossVo.prototype, "AcWipeBossVo");
