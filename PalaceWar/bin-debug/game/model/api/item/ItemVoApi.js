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
        var _this = _super.call(this) || this;
        //等待展示的称号升级弹窗
        _this._waitingTitleLvUp = [];
        return _this;
    }
    ItemVoApi.prototype.insertWaitingTitleLvUp = function (t) {
        if (ViewController.getInstance().getView(ViewConst.COMMON.TITLELEVELUPVIEW) && ViewController.getInstance().getView(ViewConst.COMMON.TITLELEVELUPVIEW).isShow()) {
            this._waitingTitleLvUp.push(t);
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMON.TITLELEVELUPVIEW, t);
        }
    };
    ItemVoApi.prototype.checkWaitingTitleLvUp = function () {
        if (this._waitingTitleLvUp.length > 0) {
            var a = this._waitingTitleLvUp.shift();
            ViewController.getInstance().openView(ViewConst.COMMON.TITLELEVELUPVIEW, a);
        }
    };
    /**
     * 根据类型获取道具vo列表
     * @param type 类型，1：道具 2：合成 3：时装
     */
    ItemVoApi.prototype.getItemVoListByType = function (type) {
        var itemInfoVoObj = this.itemVo.itemInfoVoObj;
        var arr = new Array();
        for (var key in itemInfoVoObj) {
            if (itemInfoVoObj[key].num > 0) {
                arr.push(itemInfoVoObj[key]);
            }
        }
        if (Api.rookieVoApi.getIsGuiding()) {
            arr.sort(function (a, b) {
                if (Number(a.id) == 2401) {
                    return -1;
                }
                else if (Number(b.id) == 2401) {
                    return 1;
                }
                else {
                    return a.sortId - b.sortId;
                }
            });
        }
        else {
            arr.sort(this.sortA);
        }
        return arr;
    };
    /**
     * 根据类型获取道具vo列表
     * @param type 类型，3：时装   4装扮
     */
    ItemVoApi.prototype.getTitleVoListByType = function (type) {
        var titleInfoVoObj = this.itemVo.titleInfoVoObj;
        var arr = new Array();
        for (var key in titleInfoVoObj) {
            if (type == titleInfoVoObj[key].type) {
                if (key == "4001" && titleInfoVoObj[key].itemCfg.unlock != 0) {
                    if (Api.switchVoApi.checkVip1Privilege()) {
                        arr.push(titleInfoVoObj[key]);
                    }
                }
                else if (key == "3801" && titleInfoVoObj[key].itemCfg.unlock != 0) {
                    if (Api.switchVoApi.checkOpenPrestige()) {
                        arr.push(titleInfoVoObj[key]);
                    }
                }
                else if (key == "4017" && titleInfoVoObj[key].itemCfg.unlock != 0) {
                    if (Api.switchVoApi.checkIsTitleState("4017")) {
                        arr.push(titleInfoVoObj[key]);
                    }
                }
                else {
                    var isHas = false;
                    if (!PlatformManager.checkIsFkylcSp()) {
                        isHas = titleInfoVoObj[key].num != -1;
                    }
                    if (isHas || titleInfoVoObj[key].itemCfg.unlock != 0) 
                    // if ( titleInfoVoObj[key].itemCfg.unlock != 0)
                    {
                        if (type == 4 && titleInfoVoObj[key].itemCfg.isTitle == 4) {
                            if (Api.switchVoApi.checkOpenTitleList()) {
                                arr.push(titleInfoVoObj[key]);
                            }
                        }
                        else {
                            arr.push(titleInfoVoObj[key]);
                        }
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
            if (titleInfoVoObj[key].type == 3 || titleInfoVoObj[key].type == 4) {
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
    // 排序
    ItemVoApi.prototype.sortB = function (a, b) {
        return b.sortId - a.sortId;
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
    /**是否有这个称号  */
    ItemVoApi.prototype.isHasTitle = function (id) {
        if (this.itemVo && this.itemVo.tinfo[id]) {
            return true;
        }
        return false;
    };
    /**称号信息  */
    ItemVoApi.prototype.getTitleInfo = function () {
        if (this.itemVo && this.itemVo.tinfo) {
            return this.itemVo.tinfo;
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
        listArr.sort(this.sortA);
        var l = listArr.length;
        for (var i = l - 1; i >= 0; i--) {
            var itemCfg = listArr[i];
            if (itemCfg.timeLimit && (this.itemVo.cinfo.et <= GameData.serverTime)) {
                //过期了删除
                listArr.splice(i, 1);
            }
            if (!Api.switchVoApi.checkOpenServantLevel450()) {
                if (GameData.isInArray(itemCfg.itemId, ["1719", "1720", "1721"])) {
                    listArr.splice(i, 1);
                }
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
                if (Config.GameprojectCfg.checkComposeNotShowRedPointById(itemCfg.itemId)) {
                    isEnough = false;
                }
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
        var needItemCfgList = itemCfg.needItemCfgList;
        var l = needItemCfgList.length;
        var isEnough = true;
        if (Config.GameprojectCfg.checkComposeNotShowRedPointById(itemCfg.itemId)) {
            isEnough = false;
        }
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
            if (id == 2115) {
                //此处不需要判断截止时间，如果开第二期活动可以使用
                if (this.itemVo.sinfo[id].st <= GameData.serverTime) {
                    return true;
                }
            }
            else if ((this.itemVo.sinfo[id].st <= GameData.serverTime) && (this.itemVo.sinfo[id].et > GameData.serverTime)) {
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
    ItemVoApi.prototype.getTitleUpgradeInfo = function (titleid) {
        var obj = {
            num: 0,
            level: 0
        };
        if (this.itemVo && this.itemVo.titleupgrade && this.itemVo.titleupgrade[titleid]) {
            obj.num = this.itemVo.titleupgrade[titleid].v;
            obj.level = this.itemVo.titleupgrade[titleid].tlv;
        }
        return obj;
    };
    ItemVoApi.prototype.getMaxTitleLv = function () {
        var v = 0;
        for (var k in this.itemVo.tinfo) {
            var cfg = Config.TitleCfg.getTitleCfgById(k);
            if (cfg.isTitle == 1) {
                if (v == 0) {
                    v = cfg.titleType;
                }
                else if (v > cfg.titleType) {
                    v = cfg.titleType;
                }
            }
        }
        return v;
    };
    ItemVoApi.prototype.getMaxTitleId = function () {
        var v = 0;
        var id = 0;
        for (var k in this.itemVo.tinfo) {
            var cfg = Config.TitleCfg.getTitleCfgById(k);
            if (cfg.isTitle == 1) {
                if (v == 0) {
                    v = cfg.titleType;
                    id = Number(k);
                }
                else if (v > cfg.titleType) {
                    v = cfg.titleType;
                    id = Number(k);
                }
            }
        }
        return id;
    };
    //判断是否是门客皮肤道具
    ItemVoApi.prototype.checkIsServantSkinItem = function (id) {
        var itemCfg = Config.ItemCfg.getItemCfgById(id);
        if (itemCfg.servantSkinID) {
            return true;
        }
        return false;
    };
    ItemVoApi.prototype.dispose = function () {
        this.itemVo = null;
        this._waitingTitleLvUp.length = 0;
        _super.prototype.dispose.call(this);
    };
    return ItemVoApi;
}(BaseVoApi));
__reflect(ItemVoApi.prototype, "ItemVoApi");
//# sourceMappingURL=ItemVoApi.js.map