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
        return _super.call(this) || this;
    }
    BookroomVoApi.prototype.getSeatNum = function () {
        return this.bookroomVo.pos_num;
    };
    BookroomVoApi.prototype.getOtherUsedSeatInfo = function (posId) {
        var otherInfo = {};
        for (var key in this.bookroomVo.infoList) {
            if (posId < Number(key)) {
                otherInfo[key] = this.bookroomVo.infoList[key];
            }
        }
        return otherInfo;
    };
    BookroomVoApi.prototype.getSeatInfoByPosId = function (posId) {
        var posinfo = this.bookroomVo.infoList[String(posId)];
        if (posinfo && posinfo.servantid) {
            return posinfo;
        }
        return null;
    };
    BookroomVoApi.prototype.isStudying = function (servantId) {
        for (var key in this.bookroomVo.infoList) {
            if (this.bookroomVo.infoList[key].servantid == servantId)
                return true;
        }
        return false;
    };
    BookroomVoApi.prototype.getPosListInStudy = function () {
        var list = [];
        for (var key in this.bookroomVo.infoList) {
            var tmp = this.bookroomVo.infoList[key];
            if (tmp.et) {
                list.push(key);
            }
        }
        return list;
    };
    BookroomVoApi.prototype.isBatchenable = function () {
        for (var key in this.bookroomVo.infoList) {
            var tmp = this.bookroomVo.infoList[key];
            if (tmp && tmp.et <= GameData.serverTime)
                return true;
        }
        return false;
    };
    BookroomVoApi.prototype.getSeatInfos = function () {
        return this.bookroomVo.infoList;
    };
    BookroomVoApi.prototype.checkNpcMessage = function () {
        var len = Object.keys(this.getPosListInStudy()).length;
        if (this.isBatchenable() || len < this.getSeatNum()) {
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
    BookroomVoApi.prototype.isBatchStudyEnable = function () {
        for (var key in this.bookroomVo.infoList) {
            if (this.bookroomVo.infoList[key].lastservant) {
                return true;
            }
        }
        return false;
    };
    return BookroomVoApi;
}(BaseVoApi));
__reflect(BookroomVoApi.prototype, "BookroomVoApi");
