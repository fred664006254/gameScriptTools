/**
 * 帝王成就vo
 * author yangchengguo
 * date 2019.12.10
 * @class EmperorAchieveVo
 */
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
var EmperorAchieveVo = (function (_super) {
    __extends(EmperorAchieveVo, _super);
    function EmperorAchieveVo() {
        var _this = _super.call(this) || this;
        _this.outingList = [];
        _this.shownotice = null;
        _this.popularity = 0;
        return _this;
    }
    EmperorAchieveVo.prototype.initData = function (data) {
        if (data.achieve) {
            this.achieveKing1 = data.achieve.king1;
            this.achieveKing2 = data.achieve.king2;
        }
        if (data.info) {
            this.info = data.info;
            if (data.info.shownotice) {
                this.shownotice = data.info.shownotice;
            }
            if (data.info.barragePool) {
                this.barragePool = data.info.barragePool;
            }
            if (data.info.barrage) {
                this.barrage = data.info.barrage;
            }
            if (data.info.getPopularityRwd) {
                this.getPopularityRwd = data.info.getPopularityRwd;
            }
            if (data.info.bonus) {
                this.bonus = data.info.bonus;
            }
            if (data.info.getBonus) {
                this.getBonus = data.info.getBonus;
            }
            if (data.info.barrageNum) {
                this.barrageNum = data.info.barrageNum;
            }
        }
        if (data.outingArr) {
            this.outingArr = data.outingArr;
            this.formatOutingArr();
            if (data.outingArr.popularity) {
                this.popularity = data.outingArr.popularity;
            }
        }
        if (data.outingst || data.outingst == 0) {
            this.outingst = data.outingst;
        }
    };
    //获取人气值
    EmperorAchieveVo.prototype.getPopularScoreByUid = function (uid) {
        var data = this.outingList;
        for (var i = 0; i < data.length; i++) {
            if (data[i].uid == uid) {
                return data[i].data.popularity;
            }
        }
        return 0;
    };
    //出巡列表排序
    EmperorAchieveVo.prototype.formatOutingArr = function () {
        var length = Object.keys(this.outingArr).length;
        if (length <= 0) {
            this.outingList = [];
            return;
        }
        this.outingList = [];
        var arr = [];
        var pUid = Api.playerVoApi.getPlayerID();
        for (var key in this.outingArr) {
            var sortId = this.outingArr[key].outingst;
            if (pUid == Number(key)) {
                sortId = 0;
            }
            var st = this.outingArr[key].outingst;
            if (GameData.serverTime >= st && GameData.serverTime < (st + Config.EmperoroutingCfg.lastTime)) {
                var _data = { uid: Number(key), st: this.outingArr[key].outingst, data: this.outingArr[key], sortId: sortId };
                this.outingList.push(_data);
            }
            // let _data = {uid: Number(key), st: this.outingArr[key].outingst, data: this.outingArr[key], sortId: sortId};
            // this.outingList.push(_data);
        }
        if (length > 1) {
            // for (let i = 0; i < this.outingList.length; i++){
            //     let tmp:any = this.outingList[i];
            //     if (pUid == this.outingList[i].uid){
            //         let first:any = this.outingList[0];
            //         this.outingList[i] = first;
            //         this.outingList[0] = tmp;
            //     }
            // }
            this.outingList.sort(function (a, b) { return a.sortId - b.sortId; });
        }
    };
    EmperorAchieveVo.prototype.dispose = function () {
        this.outingList = [];
    };
    return EmperorAchieveVo;
}(BaseVo));
__reflect(EmperorAchieveVo.prototype, "EmperorAchieveVo");
//# sourceMappingURL=EmperorAchieveVo.js.map