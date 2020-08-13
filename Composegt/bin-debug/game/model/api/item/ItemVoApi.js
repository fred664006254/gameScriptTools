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
 * 道具信息api
 * author dmj
 * date 2017/9/22
 * @class ItemVoApi
 */
var ItemVoApi = (function (_super) {
    __extends(ItemVoApi, _super);
    function ItemVoApi() {
        return _super.call(this) || this;
    }
    /**
     * 根据类型获取道具vo列表
     * @param type 类型，1：道具 2：合成 3：时装
     */
    ItemVoApi.prototype.getItemVoListByType = function (type) {
        var itemInfoVoObj = this.itemVo.itemInfoVoObj;
        var arr = new Array();
        for (var key in itemInfoVoObj) {
            if (type == itemInfoVoObj[key].type && itemInfoVoObj[key].num > 0) {
                arr.push(itemInfoVoObj[key]);
            }
        }
        arr.sort(this.sortA);
        return arr;
    };
    /**
     * 根据类型获取道具vo列表
     * @param type 类型，3：时装
     */
    ItemVoApi.prototype.getTitleVoListByType = function (type) {
        var titleInfoVoObj = this.itemVo.titleInfoVoObj;
        var arr = new Array();
        for (var key in titleInfoVoObj) {
            if (type == titleInfoVoObj[key].type) {
                if (key == "4001") {
                    if (Api.switchVoApi.checkVip1Privilege()) {
                        arr.push(titleInfoVoObj[key]);
                    }
                }
                else {
                    if (titleInfoVoObj[key].num != -1 || titleInfoVoObj[key].itemCfg.unlock != 0) {
                        arr.push(titleInfoVoObj[key]);
                    }
                }
                // arr.push(titleInfoVoObj[key]);
            }
        }
        arr.sort(this.sortA);
        return arr;
    };
    /**
     * 获取当前称号index
     */
    ItemVoApi.prototype.getCurTitleIndex = function () {
        var titleInfoVoObj = this.itemVo.titleInfoVoObj;
        var curIndex = 0;
        for (var key in titleInfoVoObj) {
            if (titleInfoVoObj[key].type == 3) {
                if (Api.playerVoApi.getTitleid() == titleInfoVoObj[key].id) {
                    return curIndex;
                }
                curIndex++;
            }
        }
        return null;
    };
    // 排序
    ItemVoApi.prototype.sortA = function (a, b) {
        return a.sortId - b.sortId;
    };
    /**
     * 根据id获取titleInfovo
     * @param id 时装id
     */
    ItemVoApi.prototype.getTitleInfoVoById = function (id) {
        var itemInfoVoObj = this.itemVo.titleInfoVoObj;
        if (itemInfoVoObj && itemInfoVoObj[id.toString()]) {
            return itemInfoVoObj[id.toString()];
        }
        return null;
    };
    /**
     * 根据id获取itemInfovo
     * @param id 道具id
     */
    ItemVoApi.prototype.getItemInfoVoById = function (id) {
        var itemInfoVoObj = this.itemVo.itemInfoVoObj;
        if (itemInfoVoObj && itemInfoVoObj[id.toString()]) {
            return itemInfoVoObj[id.toString()];
        }
        return null;
    };
    /**
     * 根据id获取item数量
     * @param id 道具id
     */
    ItemVoApi.prototype.getItemNumInfoVoById = function (id) {
        var itemInfoVoObj = this.itemVo.itemInfoVoObj;
        if (itemInfoVoObj && itemInfoVoObj[id.toString()]) {
            return itemInfoVoObj[id.toString()].num;
        }
        return 0;
    };
    /**
     * 获取门客中可以使用的丹药
     */
    ItemVoApi.prototype.getItemVoListForServant = function () {
        var itemInfoVoObj = this.itemVo.itemInfoVoObj;
        var arr = new Array();
        for (var key in itemInfoVoObj) {
            var itemCfg = itemInfoVoObj[key].itemCfg;
            if (itemCfg.target && itemCfg.target == 2 && itemInfoVoObj[key].num > 0) {
                arr.push(itemInfoVoObj[key]);
            }
        }
        arr.sort(this.sortA);
        return arr;
    };
    ItemVoApi.prototype.getComposeItemList = function () {
        // if(!this.getComposeVersion())
        // {
        // 	return [];
        // }
        var listArr = Config.ComposeCfg.getComposeList(this.getComposeVersion()).concat();
        var l = listArr.length;
        for (var i = l - 1; i >= 0; i--) {
            var itemCfg = listArr[i];
            if (itemCfg.timeLimit && (this.itemVo.cinfo.et <= GameData.serverTime)) {
                //过期了删除
                listArr.splice(i, 1);
            }
        }
        return listArr;
    };
    ItemVoApi.prototype.getComposeVersion = function () {
        return this.itemVo.cinfo.version;
    };
    ItemVoApi.prototype.refreshComposeData = function (data) {
        if (this.itemVo) {
            this.itemVo.setcinfo(data);
        }
    };
    ItemVoApi.prototype.getComposeNumById = function (id) {
        var num = 0;
        if (this.itemVo && this.itemVo.cinfo.info) {
            if (this.itemVo.cinfo.info[id] != null) {
                num = Number(this.itemVo.cinfo.info[id]);
            }
        }
        return num;
    };
    ItemVoApi.prototype.getComposeLimitLeft = function (id) {
        var leftTime = 0;
        var cfg = Config.ComposeCfg.getItemCfgById(id, Api.itemVoApi.getComposeVersion());
        if (cfg.timeLimit) {
            leftTime = this.itemVo.cinfo.et - GameData.serverTime;
        }
        return Math.max(0, leftTime);
    };
    ItemVoApi.prototype.checkRedPoint = function () {
        return this.checkCanCompose();
    };
    ItemVoApi.prototype.checkCanCompose = function () {
        var result = false;
        var list = this.getComposeItemList();
        if (list) {
            var l = list.length;
            for (var ii = 0; ii < l; ii++) {
                var itemCfg = list[ii];
                var needItemCfgList = itemCfg.needItemCfgList;
                var l_1 = needItemCfgList.length;
                var isEnough = true;
                var needItemNameStr = "";
                for (var i = 0; i < l_1; i++) {
                    var itemId = needItemCfgList[i].id;
                    var ownNum = Api.itemVoApi.getItemNumInfoVoById(itemId);
                    var needNum = itemCfg.getNeedItemNumById(itemId);
                    if (ownNum < needNum) {
                        isEnough = false;
                    }
                }
                if (itemCfg.needGem) {
                    var ownNum = Api.playerVoApi.getPlayerGem();
                    var needNum = itemCfg.needGem;
                    if (ownNum < needNum) {
                        isEnough = false;
                    }
                }
                if (isEnough) {
                    if (itemCfg.composeLimit) {
                        if (Api.itemVoApi.getComposeNumById(itemCfg.id) < itemCfg.composeLimit) {
                            return true;
                        }
                    }
                    else {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    ItemVoApi.prototype.checkCanComposeById = function (id) {
        var result = false;
        var itemCfg = Config.ComposeCfg.getItemCfgById(id, this.getComposeVersion());
        if (!itemCfg) {
            return false;
        }
        var needItemCfgList = itemCfg.needItemCfgList;
        var l = needItemCfgList.length;
        var isEnough = true;
        var needItemNameStr = "";
        for (var i = 0; i < l; i++) {
            var itemId = needItemCfgList[i].id;
            var ownNum = Api.itemVoApi.getItemNumInfoVoById(itemId);
            var needNum = itemCfg.getNeedItemNumById(itemId);
            if (ownNum < needNum) {
                isEnough = false;
            }
        }
        if (itemCfg.needGem) {
            var ownNum = Api.playerVoApi.getPlayerGem();
            var needNum = itemCfg.needGem;
            if (ownNum < needNum) {
                isEnough = false;
            }
        }
        if (isEnough) {
            if (itemCfg.composeLimit) {
                if (Api.itemVoApi.getComposeNumById(itemCfg.id) < itemCfg.composeLimit) {
                    return true;
                }
            }
            else {
                return true;
            }
        }
        return false;
    };
    ItemVoApi.prototype.isStart = function (id) {
        if (this.itemVo.sinfo && this.itemVo.sinfo[id]) {
            if ((this.itemVo.sinfo[id].st <= GameData.serverTime) && (this.itemVo.sinfo[id].et > GameData.serverTime)) {
                return true;
            }
        }
        return false;
    };
    ItemVoApi.prototype.isEnd = function (id) {
        if (this.itemVo.sinfo[id] && this.itemVo.sinfo[id].et < GameData.serverTime) {
            return true;
        }
        return false;
    };
    //获取是否有兵符类道具
    ItemVoApi.prototype.isHaveBingfu = function () {
        var itemInfoVoObj = this.itemVo.itemInfoVoObj;
        var arr = new Array();
        var bingfukeys = {
            "1003": 1,
            "1006": 1,
            "1081": 1,
            "1082": 1,
            "1083": 1,
            "1084": 1,
            "1085": 1,
        };
        for (var key in itemInfoVoObj) {
            var itemCfg = itemInfoVoObj[key].itemCfg;
            if (bingfukeys[key] && itemInfoVoObj[key].num > 0) {
                return true;
            }
        }
        return false;
    };
    ItemVoApi.prototype.dispose = function () {
        this.itemVo = null;
        _super.prototype.dispose.call(this);
    };
    return ItemVoApi;
}(BaseVoApi));
__reflect(ItemVoApi.prototype, "ItemVoApi");
