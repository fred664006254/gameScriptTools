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
        /**
         * icon列表，存储格式为{icon:[acname1,acname2]}，解析配置时候存下来，提升游戏内每次查找遍历的性能
         */
        var iconNameList = {};
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
                    if (iconOrderItem.icon) {
                        if (!iconNameList[iconOrderItem.icon]) {
                            iconNameList[iconOrderItem.icon] = [];
                        }
                        iconNameList[iconOrderItem.icon].push(iconOrderItem.activeName);
                    }
                }
            }
        }
        IconorderCfg.formatData = formatData;
        /**
         * 根据icon获取相同icon的所有活动
         * @param icon 必须为icon名字
         */
        function getAcNameListByIcon(icon) {
            return iconNameList[icon] || [];
        }
        IconorderCfg.getAcNameListByIcon = getAcNameListByIcon;
        /**
         * 根据活动id获取相同icon的所有活动
         * @param aid 活动id，仅支持id，不支持传code
         */
        function getAcNameListByAid(aid) {
            var list = null;
            var icon = getIconNameByName(aid);
            if (icon) {
                list = getAcNameListByIcon(icon);
            }
            return list || [];
        }
        IconorderCfg.getAcNameListByAid = getAcNameListByAid;
        /**
         * 检测活动是否在活动组里面
         */
        function checkAcInGroup(aid, code) {
            if (code) {
                if (getAcNameListByAid(aid + "-" + code).length > 1) {
                    return getAcNameListByAid(aid + "-" + code).length > 1;
                }
            }
            return getAcNameListByAid(aid).length > 1;
        }
        IconorderCfg.checkAcInGroup = checkAcInGroup;
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
                return 1000000000;
            }
            else if (cfgName == "thgift") {
                return 27.5;
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
        /**
         * 获得icon的name
         */
        function getIconNameByName(name, code) {
            if (code) {
                if (iconOrderList[name + "-" + code]) {
                    return iconOrderList[name + "-" + code].icon;
                }
            }
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
                else if (key && key.indexOf("-") > -1 && item.aid == name) {
                    return true;
                }
            }
            return false;
        }
        IconorderCfg.checkHasChildCfgNameByName = checkHasChildCfgNameByName;
        /**
         * 检测cfg活动名称 是否存在code
         * 如果存在，则返回这个code
         */
        function checkHasChildCodeCfgNameByName(aid, code) {
            var tmpCode = null;
            for (var key in iconOrderList) {
                var item = iconOrderList[key];
                if (key && key.indexOf("-") > -1 && item.aid == aid) {
                    if (key.split('-')[1] == code) {
                        tmpCode = code;
                    }
                    // return key.split('-')[1] == code?code:null;
                }
            }
            return tmpCode;
        }
        IconorderCfg.checkHasChildCodeCfgNameByName = checkHasChildCodeCfgNameByName;
        /**
         * 检测cfg活动名称 是否存在atype
         * 如果存在，则返回这个atype
         */
        function checkHasChildAtypeCfgNameByName(aid, atype) {
            for (var key in iconOrderList) {
                var item = iconOrderList[key];
                if (key && key.indexOf(".") > -1 && item.aid == aid) {
                    return key.split('.')[1] == atype ? atype : null;
                }
            }
            return null;
        }
        IconorderCfg.checkHasChildAtypeCfgNameByName = checkHasChildAtypeCfgNameByName;
        /**
         * 配置里面是否有这个icon，并且是否大于1
         */
        function checkHasIconLengthGreater1ThanByCfg(icon) {
            if (getAcNameListByIcon(icon).length > 1) {
                return true;
            }
            return false;
        }
        IconorderCfg.checkHasIconLengthGreater1ThanByCfg = checkHasIconLengthGreater1ThanByCfg;
        function getisFlickByName(cfgName, type) {
            if (iconOrderList[cfgName] && !type) {
                return Boolean(iconOrderList[cfgName].isFlick);
            }
            else {
                if (type) {
                    if (iconOrderList[cfgName + "." + type]) {
                        return Boolean(iconOrderList[cfgName + "." + type].isFlick);
                    }
                }
                else {
                    for (var key in iconOrderList) {
                        if (iconOrderList[key] && iconOrderList[key].icon == cfgName) {
                            return Boolean(iconOrderList[key].isFlick);
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
        /**
         * 	通过aid 和type 或者是code 来获取IconOrderItemCfg
         *  暂时只会提供 aid.type 组合 和 aid-code 组合
         * 	不会提供aid-code.type 组合,也不会提供检测
         */
        function getIconCfgByAidAndType(aid, type, code) {
            // aid=type?aid+"."+type:aid;
            // aid=code?aid+"-"+code:aid;
            // aid=type?aid+"."+type:aid;
            if (type) {
                aid = aid + "." + type;
            }
            else {
                aid = code ? aid + "-" + code : aid;
            }
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
            return _this;
        }
        Object.defineProperty(IconOrderItemCfg.prototype, "aid", {
            get: function () {
                if (this.activeName) {
                    var splitArr = [".", "-"];
                    for (var i = 0; i < splitArr.length; i++) {
                        if (this.activeName.indexOf(splitArr[i]) > -1) {
                            var strArr = this.activeName.split(splitArr[i]);
                            return strArr[0];
                        }
                    }
                }
                // if(this.activeName)
                // {
                // 	let strArr:string[] = this.activeName.split(".");
                // 	if(strArr.length > 1)
                // 	{
                // 		return strArr[0];
                // 	}
                // 	// return this.activeName.split(".")[0];
                // }
                // if(this.activeName)
                // {
                // 	let strArr:string[] = this.activeName.split("-");
                // 	if(strArr.length > 1)
                // 	{
                // 		return strArr[0];
                // 	}
                // }
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
//# sourceMappingURL=IconorderCfg.js.map