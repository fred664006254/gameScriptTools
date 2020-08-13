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
 * 合成vo
 * author 陈可
 * date 2019/12/02
 * @class ComposemapVo
 */
var ComposemapVo = (function (_super) {
    __extends(ComposemapVo, _super);
    function ComposemapVo() {
        var _this = _super.call(this) || this;
        _this.mapInfoList = {};
        _this.mapInfoLvList = {};
        _this.delList = [];
        _this.addList = [];
        _this.needRefreshList = {};
        _this.minX = 0;
        _this.maxX = 0;
        _this.minY = 0;
        _this.maxY = 0;
        _this.isInit = false;
        return _this;
    }
    ComposemapVo.prototype.initData = function (data) {
        this.mapInfoLvList = {};
        this.addList.length = 0;
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
        if (data.attinfo) {
            this.attinfo = { st: data.attinfo.st, num: data.attinfo.num };
        }
        if (this.info) {
            var curKeys = Object.keys(this.mapInfoList);
            this.minLvData = null;
            for (var key in this.info) {
                if (this.info.hasOwnProperty(key)) {
                    var item = null;
                    var lv = 0;
                    var nlv = lv;
                    if (this.mapInfoList[key]) {
                        item = this.mapInfoList[key];
                        lv = item.lv;
                    }
                    else {
                        item = new ComposemapItemVo();
                        this.mapInfoList[key] = item;
                    }
                    item.initData(this.info[key], key);
                    this.minX = Math.min(this.minX, item.x);
                    this.maxX = Math.max(this.maxX, item.x);
                    this.minY = Math.min(this.minY, item.y);
                    this.maxY = Math.max(this.maxY, item.y);
                    nlv = item.lv;
                    var cidx = curKeys.indexOf(key);
                    if (cidx >= 0) {
                        if (nlv || !lv) {
                            curKeys.splice(cidx, 1);
                        }
                    }
                    if (lv == 0 && nlv > 0) {
                        this.addList.push(key);
                    }
                    this.formatListData(item);
                }
            }
            if (this.minLvData && this.minLvData.num == 1) {
            }
            this.delList = curKeys;
        }
    };
    ComposemapVo.prototype.formatListData = function (item) {
        if (item.lv) {
            if (!this.mapInfoLvList[item.lv]) {
                this.mapInfoLvList[item.lv] = [item.id];
            }
            else {
                this.mapInfoLvList[item.lv].push(item.id);
            }
            if (!this.minLvData) {
                this.minLvData = { lv: item.lv, num: 0, item: item };
            }
            if (item.lv < this.minLvData.lv) {
                this.minLvData.lv = item.lv;
                this.minLvData.num = 1;
                this.minLvData.item = item;
            }
            else if (item.lv == this.minLvData.lv) {
                this.minLvData.num++;
            }
            return true;
        }
        return false;
    };
    ComposemapVo.prototype.delClientitem = function () {
        if (this.delList && this.delList.length > 0) {
            var l = this.delList.length;
            for (var i = 0; i < this.delList.length; i++) {
                var id = this.delList[i];
                this.mapInfoList[id].clear();
            }
        }
    };
    ComposemapVo.prototype.addClientItem = function (id, lv) {
        var result = false;
        var item = this.mapInfoList[id];
        if (item && item.lv == 0 && lv > 0) {
            item.initData({ lv: lv }, id);
            item.client = true;
            this.addList.push(item.id);
            result = this.formatListData(item);
            this.delList.push(item.id);
            result = true;
        }
        return result;
    };
    ComposemapVo.prototype.move = function (oid, nid) {
        var oitem = this.mapInfoList[oid];
        var nitem = this.mapInfoList[nid];
        // this.mapInfoLvList[oitem.lv]
        var olv = oitem.lv;
        var nlv = nitem.lv;
        oitem.move(nid);
        this.mapInfoList[nid] = oitem;
        nitem.move(oid);
        this.mapInfoList[oid] = nitem;
        if (olv != nlv) {
            var oidx = this.mapInfoLvList[olv].indexOf(oid);
            this.mapInfoLvList[olv][oidx] = nid;
            if (this.mapInfoLvList[nlv]) {
                var nidx = this.mapInfoLvList[nlv].indexOf(nid);
                this.mapInfoLvList[nlv][nidx] = oid;
            }
        }
    };
    ComposemapVo.prototype.removeData = function (id) {
        var item = this.mapInfoList[id];
        if (item) {
            item.clear();
        }
    };
    ComposemapVo.prototype.dispose = function () {
        this.info = null;
        this.maxinfo = null;
        this.attinfo = null;
        this.mapInfoLvList = {};
        this.maxX = this.maxY = this.minX = this.minY = 0;
        this.minLvData = null;
        this.addList.length = 0;
        this.delList.length = 0;
        App.CommonUtil.clearData(this.mapInfoList);
    };
    return ComposemapVo;
}(BaseVo));
__reflect(ComposemapVo.prototype, "ComposemapVo");
var ComposemapItemVo = (function (_super) {
    __extends(ComposemapItemVo, _super);
    function ComposemapItemVo() {
        var _this = _super.call(this) || this;
        _this.lv = 0;
        _this.client = false;
        _this.unlocking = false;
        return _this;
    }
    ComposemapItemVo.prototype.initData = function (data, id) {
        this.clear();
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
        this.move(id);
    };
    ComposemapItemVo.prototype.move = function (id) {
        this.id = String(id);
        var _a = Config.MapinfoCfg.getPosById(id), x = _a.x, y = _a.y;
        this.x = x;
        this.y = y;
    };
    ComposemapItemVo.prototype.clear = function () {
        this.lv = 0;
        this.client = false;
        this.x = this.y = NaN;
        this.id = null;
        this.unlocking = false;
    };
    ComposemapItemVo.prototype.dispose = function () {
    };
    return ComposemapItemVo;
}(BaseVo));
__reflect(ComposemapItemVo.prototype, "ComposemapItemVo");
