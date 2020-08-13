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
var Config;
(function (Config) {
    /**
     * 主界面icon图标配置
     * author 陈可
     * date 2018/4/18
     * @class IconOrderCfg
     */
    var IconorderCfg;
    (function (IconorderCfg) {
        var aidIconDic = {};
        var iconOrderList = {};
        function formatData(data) {
            for (var key in data) {
                var acName = data[key] ? data[key].activeName : "";
                if (acName) {
                    var iconOrderItem = void 0;
                    if (!iconOrderList.hasOwnProperty(acName)) {
                        iconOrderList[acName] = new IconOrderItemCfg();
                    }
                    iconOrderItem = iconOrderList[acName];
                    iconOrderItem.initData(data[key]);
                }
            }
        }
        IconorderCfg.formatData = formatData;
        //解析伸缩icon配置
        function getUnfoldList() {
            // {name:"share",isLock:true, orderNum:3}
            var data = null;
            var dataList = [];
            for (var key in iconOrderList) {
                if (iconOrderList[key].unfoldSort) {
                    // if(dataList == null){
                    // 	dataList = [];
                    // }
                    var n = iconOrderList[key].activeName;
                    var oNum = iconOrderList[key].unfoldSort;
                    var islock = !!iconOrderList[key].isLock;
                    data = { name: n, orderNum: oNum, isLock: islock };
                    dataList.push(data);
                }
            }
            return dataList;
        }
        IconorderCfg.getUnfoldList = getUnfoldList;
        function getIconSortIdByName(name) {
            if (iconOrderList[name]) {
                return Number(iconOrderList[name].sortId);
            }
            return 9999;
        }
        function getIconSortIdByCfgName(cfgName) {
            if (iconOrderList[cfgName]) {
                return getIconSortIdByName(cfgName);
            }
            else if (cfgName == "extendicon") {
                return 10000;
            }
            else {
                for (var key in iconOrderList) {
                    if (iconOrderList[key] && iconOrderList[key].icon == cfgName) {
                        return getIconSortIdByName(key);
                    }
                }
            }
            return 9999;
        }
        IconorderCfg.getIconSortIdByCfgName = getIconSortIdByCfgName;
        function getIconNameByName(name) {
            if (iconOrderList[name]) {
                return iconOrderList[name].icon;
            }
        }
        IconorderCfg.getIconNameByName = getIconNameByName;
        function checkHasChildCfgNameByName(name) {
            for (var key in iconOrderList) {
                var item = iconOrderList[key];
                if (key && key.indexOf(".") > -1 && item.aid == name) {
                    return true;
                }
            }
            return false;
        }
        IconorderCfg.checkHasChildCfgNameByName = checkHasChildCfgNameByName;
        function getisFlickByName(cfgName, type) {
            if (iconOrderList[cfgName] && !type) {
                return iconOrderList[cfgName].isFlick;
            }
            else {
                if (type) {
                    if (iconOrderList[cfgName + "." + type]) {
                        return iconOrderList[cfgName + "." + type].isFlick;
                    }
                }
                else {
                    for (var key in iconOrderList) {
                        if (iconOrderList[key] && iconOrderList[key].icon == cfgName) {
                            return iconOrderList[key].isFlick;
                        }
                    }
                }
            }
            return false;
        }
        IconorderCfg.getisFlickByName = getisFlickByName;
        function getAidListByCfgName(cfgName) {
            if (aidIconDic[cfgName]) {
                return aidIconDic[cfgName];
            }
            var idArr = [];
            if (!cfgName) {
                return idArr;
            }
            if (iconOrderList) {
                for (var key in iconOrderList) {
                    if (iconOrderList[key] && iconOrderList[key].icon == cfgName) {
                        if (idArr.indexOf(key) < 0) {
                            idArr.push(key);
                        }
                    }
                }
            }
            aidIconDic[cfgName] = idArr;
            return idArr;
        }
        IconorderCfg.getAidListByCfgName = getAidListByCfgName;
        function getIconCfgByAidAndType(aid, type) {
            aid = type ? aid + "." + type : aid;
            if (iconOrderList[aid]) {
                return iconOrderList[aid];
            }
            return null;
        }
        IconorderCfg.getIconCfgByAidAndType = getIconCfgByAidAndType;
        function getIconBgByAidAndType(aid, type) {
            var cfg = getIconCfgByAidAndType(aid, type);
            if (cfg) {
                return cfg.iconBg;
            }
        }
        IconorderCfg.getIconBgByAidAndType = getIconBgByAidAndType;
    })(IconorderCfg = Config.IconorderCfg || (Config.IconorderCfg = {}));
    var IconOrderItemCfg = (function (_super) {
        __extends(IconOrderItemCfg, _super);
        function IconOrderItemCfg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 活动的底框  0：默认框  1：当前冲榜的特殊框
             */
            _this.iconBg = 0;
            /**
             * icon的炫光特效  0：无特效  1：有特效
             */
            _this.isFlick = 0;
            //功能图标的缩放排序，由1开始，由左及右
            _this.unfoldSort = 0;
            //1是在外侧的，0是在内侧的（被收起来的）
            _this.isLock = 0;
            return _this;
        }
        Object.defineProperty(IconOrderItemCfg.prototype, "aid", {
            get: function () {
                if (this.activeName) {
                    return this.activeName.split(".")[0];
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        return IconOrderItemCfg;
    }(BaseItemCfg));
    Config.IconOrderItemCfg = IconOrderItemCfg;
    __reflect(IconOrderItemCfg.prototype, "Config.IconOrderItemCfg");
})(Config || (Config = {}));
