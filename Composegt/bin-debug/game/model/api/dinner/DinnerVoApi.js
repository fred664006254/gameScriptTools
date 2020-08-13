/**
 * 宴会api
 * author shaoliang
 * date 2017/11/1
 * @class DinnerVoApi
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
var DinnerVoApi = (function (_super) {
    __extends(DinnerVoApi, _super);
    // [{"dtype":"2","uid":"1000559","num":"0","name":"真英勋"},{"dtype":"1","uid":"1000559","num":"0","name":"端倰"},
    // {"dtype":"1","uid":"1000559","num":"10","name":"繁悦爱"},{"dtype":"2","uid":"1000559","num":"0","name":"秋辅"},
    // {"dtype":"1","uid":"1000559","num":"0","name":"秋辅"},{"dtype":"2","uid":"1000559","num":"0","name":"秋辅"}];
    function DinnerVoApi() {
        var _this = _super.call(this) || this;
        _this.lastShareTime = [0, 0];
        _this.totalNum = 0;
        /**
         * 当前宴会人数
         */
        _this.viewList = [];
        return _this;
    }
    /**
     * 当前宴会人数
     */
    DinnerVoApi.prototype.getNum = function () {
        return this.dinnerVo.num;
    };
    /**
     * 当前宴会分数
     */
    DinnerVoApi.prototype.getPoint = function () {
        return this.dinnerVo.point;
    };
    /**
     * 当前宴会类型： 1家宴 2官宴
     */
    DinnerVoApi.prototype.getDtype = function () {
        return this.dinnerVo.dtype;
    };
    /**
     * 宴会是否公开 1公开 0不公开
     */
    DinnerVoApi.prototype.getIsOpen = function () {
        return this.dinnerVo.is_open;
    };
    /**
     * 宴会结束时间
     */
    DinnerVoApi.prototype.getEndTime = function () {
        return this.dinnerVo.end_time;
    };
    /**
     * 参宴次数
     */
    DinnerVoApi.prototype.getDayNum = function () {
        return this.dinnerVo.day_num;
    };
    /**
     * 当前举办宴会的来宾信息
     */
    DinnerVoApi.prototype.getJinfo = function () {
        // return [{name:"XSaf",pic:1,dtype:1},{name:"XSsdaf",pic:1,dtype:2},{name:"X1Saf",pic:1,dtype:3},{name:"XSffffaf",pic:1,dtype:4},
        // {name:"XSaf",pic:1,dtype:1},{name:"XSsdaf",pic:1,dtype:2},{name:"X1Saf",pic:1,dtype:3},{name:"XSffffaf",pic:1,dtype:4},];
        return this.dinnerVo.jinfo;
    };
    /**
     * 总积分
     */
    DinnerVoApi.prototype.getTotalScore = function () {
        return this.dinnerVo.total_score;
    };
    DinnerVoApi.prototype.getTotalPoint = function () {
        return this.dinnerVo.total_point;
    };
    /**
     * 商店刷新次数
     */
    DinnerVoApi.prototype.getShopNum = function () {
        return this.dinnerVo.shop_num;
    };
    /**
     * 记录自动刷新时间
     */
    DinnerVoApi.prototype.getShopLastTime = function () {
        return this.dinnerVo.shop_last_time;
    };
    /**
     * 积分商店道具信息[shoid1,shopid2]
     */
    DinnerVoApi.prototype.getShopInfo = function () {
        return this.dinnerVo.shop_info;
    };
    /**
     * 积分购买的道具信息[shoid1:1,shopid2:1]
     */
    DinnerVoApi.prototype.getBuyInfo = function () {
        return this.dinnerVo.buy_info;
    };
    /**
     * 请求处理最后时间
     */
    DinnerVoApi.prototype.getLastDay = function () {
        return this.dinnerVo.lastday;
    };
    DinnerVoApi.prototype.getName = function () {
        return this.dinnerVo.name;
    };
    DinnerVoApi.prototype.getPic = function () {
        return this.dinnerVo.pic;
    };
    DinnerVoApi.prototype.getLevel = function () {
        return this.dinnerVo.level;
    };
    DinnerVoApi.prototype.getTitle = function () {
        return this.dinnerVo.title;
    };
    DinnerVoApi.prototype.getPhototitle = function () {
        return this.dinnerVo.phototitle;
    };
    DinnerVoApi.prototype.getListInfo = function (idx) {
        if (this.viewList.length > idx && this.viewList[idx] && this.viewList[idx].uid) {
            return this.viewList[idx];
        }
        else {
            return null;
        }
    };
    DinnerVoApi.prototype.getListInfoLength = function () {
        return this.viewList.length;
    };
    DinnerVoApi.prototype.setTotalNum = function (count) {
        this.totalNum = count;
    };
    DinnerVoApi.prototype.getTotalNum = function () {
        return this.totalNum;
    };
    DinnerVoApi.prototype.setListInfo = function (info) {
        if (info) {
            this.viewList = info;
        }
    };
    DinnerVoApi.prototype.getShareTime = function () {
        if (this.dinnerVo.other_info && this.dinnerVo.other_info["isshare"]) {
            return this.dinnerVo.other_info["isshare"];
        }
        return 0;
    };
    DinnerVoApi.prototype.isShowNpc = function () {
        return Api.composemapVoApi.getMaxLv() >= Config.DinnerCfg.getNeedLv() && Api.switchVoApi.checkOpenCrossDinner();
    };
    DinnerVoApi.prototype.getLockedString = function () {
        var returnStr = "";
        if (Api.switchVoApi.checkOpenCrossDinner() == false) {
            returnStr = LanguageManager.getlocal("dinnerViewTitle") + LanguageManager.getlocal("sysWaitOpen");
        }
        else {
            returnStr = LanguageManager.getlocal("composeUnlockFuncDesc", [Config.DinnerCfg.getNeedLv() + ""]);
        }
        return returnStr;
    };
    DinnerVoApi.prototype.getNeedItem = function () {
        return Config.DinnerCfg.getNeedItem();
    };
    DinnerVoApi.prototype.dispose = function () {
        this.viewList.length = 0;
        this.lastShareTime = [0, 0];
        this.totalNum = 0;
        _super.prototype.dispose.call(this);
    };
    return DinnerVoApi;
}(BaseVoApi));
__reflect(DinnerVoApi.prototype, "DinnerVoApi");
