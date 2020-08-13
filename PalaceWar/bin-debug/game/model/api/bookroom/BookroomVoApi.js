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
 * 书院api
 * author yanyuling
 * date 2017/11/24
 * @class BookroomVoApi
 */
var BookroomVoApi = (function (_super) {
    __extends(BookroomVoApi, _super);
    function BookroomVoApi() {
        var _this = _super.call(this) || this;
        _this.unlockArr = [];
        return _this;
    }
    BookroomVoApi.prototype.getSeatNum = function () {
        return this.bookroomVo.pos_num;
    };
    BookroomVoApi.prototype.getSeatInfoByPosId = function (posId) {
        if (this.bookroomVo.infoList[String(posId)] && this.bookroomVo.infoList[String(posId)].et) {
            return this.bookroomVo.infoList[String(posId)];
        }
        return null;
    };
    BookroomVoApi.prototype.getInfoByPosId = function (posId) {
        var info = null;
        if (this.bookroomVo.infoList[String(posId)]) {
            info = this.bookroomVo.infoList[String(posId)];
        }
        return info;
    };
    //普通席位 数组
    BookroomVoApi.prototype.getptBookList = function () {
        var arr = [];
        for (var key in this.bookroomVo.infoList) {
            if (Number(key) >= 0 && Number(key) <= 100) {
                arr.push(this.bookroomVo.infoList[key]);
            }
        }
        return arr;
    };
    //月卡席位 数组
    BookroomVoApi.prototype.getMothBookList = function () {
        var arr = [];
        for (var key in this.bookroomVo.infoList) {
            if (Number(key) > 100 && Number(key) < 200) {
                arr.push(this.bookroomVo.infoList[key]);
            }
        }
        return arr;
    };
    //道具卡席位 数组
    BookroomVoApi.prototype.getItemBookList = function () {
        var arr = [];
        for (var key in this.bookroomVo.infoList) {
            if (Number(key) > 300 && Number(key) < 400) {
                arr.push(this.bookroomVo.infoList[key]);
            }
        }
        arr.sort(function (a, b) {
            return b.lastet - a.lastet;
        });
        return arr;
    };
    //年卡席位 数组
    BookroomVoApi.prototype.getYearBookList = function () {
        var arr = [];
        this.unlockArr = [];
        for (var key in this.bookroomVo.infoList) {
            if (Number(key) > 200 && Number(key) < 300) {
                if (this.bookroomVo.infoList[key].lock == 0) {
                    arr.push(this.bookroomVo.infoList[key]);
                }
                else {
                    this.bookroomVo.infoList[key].year = 2;
                    this.unlockArr.push(this.bookroomVo.infoList[key]);
                }
            }
        }
        return arr;
    };
    //获取年卡未解锁的
    BookroomVoApi.prototype.getUnlockArr = function () {
        return this.unlockArr;
    };
    //当前解锁的总的
    BookroomVoApi.prototype.getMaxleng = function () {
        var vipyearMaxnum = 0;
        if (Api.switchVoApi.checkOpenSeat()) {
            vipyearMaxnum = this.bookroomVo.pos_num + this.geItemNum + this.getMonthNum + this.getYearlengh;
        }
        else {
            vipyearMaxnum = this.bookroomVo.pos_num + this.geItemNum;
        }
        return vipyearMaxnum;
    };
    BookroomVoApi.prototype.isStudying = function (servantId) {
        for (var key in this.bookroomVo.infoList) {
            if (this.bookroomVo.infoList[key].et && this.bookroomVo.infoList[key].servantid == servantId)
                return true;
        }
        return false;
    };
    BookroomVoApi.prototype.getPosListInStudy = function () {
        var keys = [];
        var list = null;
        if (Api.switchVoApi.checkOpenSeat()) {
            list = this.bookroomVo.infoList;
        }
        else {
            list = this.bookroomVo.base_pos;
        }
        for (var key in list) {
            if (list[key].et) {
                keys.push(key);
            }
        }
        return keys;
    };
    BookroomVoApi.prototype.isBatchenable = function () {
        for (var key in this.bookroomVo.infoList) {
            if (this.bookroomVo.infoList[key].et && this.bookroomVo.infoList[key].et <= GameData.serverTime)
                return true;
        }
        return false;
    };
    BookroomVoApi.prototype.checkNpcMessage = function () {
        var len = 0;
        len = Object.keys(this.getPosListInStudy()).length;
        if (this.isBatchenable() || len < this.getMaxleng()) {
            return true;
        }
        return false;
    };
    /**
     * 是否有门客在学习
     */
    BookroomVoApi.prototype.isServantStudy = function () {
        for (var key in this.bookroomVo.infoList) {
            if (this.bookroomVo.infoList[key].et) {
                return true;
            }
        }
        return false;
    };
    /**
     * 正在学习的门客数量
     */
    BookroomVoApi.prototype.getInStudyServantNum = function () {
        var count = 0;
        for (var key in this.bookroomVo.infoList) {
            if (this.bookroomVo.infoList[key].et) {
                count += 1;
            }
        }
        return count;
    };
    /**
     * 当前可用席位列表
     */
    BookroomVoApi.prototype.getCanUseSeat = function (data) {
        var arr = [];
        if (!data || data.length <= 0) {
            return arr;
        }
        for (var i = 0; i < data.length; i++) {
            if (data[i]) {
                // App.LogUtil.log("getCanUseSeat "+data[i].posId+" .item "+data[i].item+" year "+data[i].year+" month "+data[i].month);
                var roomInfo = this.getSeatInfoByPosId(Number(data[i].posId));
                if (data[i].year == 1 || data[i].month == 1) {
                    if (data[i].item) {
                        if (data[i].lastet - GameData.serverTime > 0 && (!roomInfo)) {
                            arr.push(data[i]);
                        }
                    }
                    else {
                        if (!roomInfo) {
                            arr.push(data[i]);
                        }
                    }
                }
                else if (data[i].year == 0 && data[i].month == 0) {
                    if (data[i].item) {
                        if (data[i].lastet - GameData.serverTime > 0 && (!roomInfo)) {
                            arr.push(data[i]);
                        }
                    }
                    else {
                        if (!roomInfo) {
                            arr.push(data[i]);
                        }
                    }
                }
            }
        }
        App.LogUtil.log("getCanUseSeat " + arr.length);
        return arr;
    };
    /**
     * 上次所选的数据
     */
    BookroomVoApi.prototype.isLastSelectServant = function (id) {
        var infoList = this.bookroomVo.infoList;
        for (var key in this.bookroomVo.infoList) {
            if (infoList[key] && (!this.isStudying(String(id))) && infoList[key].lastservant == String(id)) {
                return true;
            }
        }
        return false;
    };
    BookroomVoApi.prototype.getLastSelectServant = function (data) {
        var arr = [];
        if (data && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                if (this.isLastSelectServant(data[i])) {
                    arr.push(data[i]);
                }
            }
        }
        App.LogUtil.log("getLastSelectServant " + arr.length);
        return arr;
    };
    //管家用
    BookroomVoApi.prototype.isLastSelectServant2 = function (id) {
        var infoList = this.bookroomVo.infoList;
        for (var key in this.bookroomVo.infoList) {
            if (infoList[key] && infoList[key].lastservant == String(id)) {
                return true;
            }
        }
        return false;
    };
    BookroomVoApi.prototype.getLastSelectServant2 = function (data) {
        var arr = [];
        if (data && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                if (this.isLastSelectServant2(data[i])) {
                    arr.push(data[i]);
                }
            }
        }
        App.LogUtil.log("getLastSelectServant " + arr.length);
        return arr;
    };
    //未学习的最靠前的门客
    BookroomVoApi.prototype.getNotInStudyServantIndex = function () {
        var idList = Api.servantVoApi.getServantInfoIdListWithSort(2);
        var idList1 = [];
        var idList2 = [];
        for (var index = 0; index < idList.length; index++) {
            var key = idList[index];
            if (!this.isStudying(key)) {
                idList1.push(key);
            }
            else {
                idList2.push(key);
            }
        }
        if (idList1.length > 0) {
            return 0;
        }
        return -1;
    };
    Object.defineProperty(BookroomVoApi.prototype, "getMonthNum", {
        // 月卡解锁席位，购买＝2 else ＝0; 
        get: function () {
            return this.bookroomVo.ismonthunlock();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookroomVoApi.prototype, "geItemNum", {
        // 道具卡解锁席位，购买＝2 else ＝0; 
        get: function () {
            return this.bookroomVo.itemLength();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookroomVoApi.prototype, "getMonthTimer", {
        //月卡时间
        get: function () {
            return this.bookroomVo.ismonthTimer();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookroomVoApi.prototype, "getYearlengh", {
        //解锁的年卡数量
        get: function () {
            return this.bookroomVo.yearLength();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookroomVoApi.prototype, "vipyearMaxnum", {
        //年卡最大数量席位
        get: function () {
            return this.bookroomVo.vipyearMaxnum();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookroomVoApi.prototype, "vipmonthMaxnum", {
        //月卡最大数量席位
        get: function () {
            return this.bookroomVo.vipmonthMaxnum();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookroomVoApi.prototype, "itemMaxnum", {
        //道具临时卡最大数量
        get: function () {
            return this.bookroomVo.itemMaxnum();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookroomVoApi.prototype, "getItemTimer", {
        //道具临时卡时间
        get: function () {
            return this.bookroomVo.isitemTimer();
        },
        enumerable: true,
        configurable: true
    });
    BookroomVoApi.prototype.needVip = function () {
        return this.bookroomVo.getYearneedLevel();
    };
    return BookroomVoApi;
}(BaseVoApi));
__reflect(BookroomVoApi.prototype, "BookroomVoApi");
//# sourceMappingURL=BookroomVoApi.js.map