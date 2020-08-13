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
    var PracticeCfg;
    (function (PracticeCfg) {
        var list = {};
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!list.hasOwnProperty(String(key))) {
                    list[String(key)] = new PracticeItemCfg();
                }
                itemCfg = list[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
            }
        }
        PracticeCfg.formatData = formatData;
        /**
         * 通过职位获取单个权限配置
         * @param id 权限id
         */
        function getPracticeListByType(type) {
            var result = [];
            for (var key in list) {
                if (list[key].type == type) {
                    result.push(list[key]);
                }
            }
            result.sort(function (itemA, itemB) {
                return itemA.sortId - itemB.sortId;
            });
            return result;
        }
        PracticeCfg.getPracticeListByType = getPracticeListByType;
        function getPracticeShowListByType(type) {
            var result1 = [];
            var result2 = [];
            var result3 = [];
            for (var key in list) {
                var tmpData = list[key];
                if (tmpData.type == type) {
                    //是否被屏蔽
                    if (tmpData.wifeId && Config.WifeCfg.checkIsLockedByGM(tmpData.wifeId)) {
                        continue;
                    }
                    if (tmpData.servantId && Config.ServantCfg.checkIsLockedByGM(tmpData.servantId)) {
                        continue;
                    }
                    var taskVo = Api.practiceVoApi.getPracticeTaskInfo(key);
                    if (taskVo && taskVo.f == 0) {
                        result1.push(tmpData);
                    }
                    else {
                        result2.push(tmpData);
                    }
                }
                //  if (list[key].type == type) {
                // 	 result.push(list[key]);
                //  }
            }
            result1.sort(function (itemA, itemB) {
                return itemA.sortId - itemB.sortId;
            });
            result2.sort(function (itemA, itemB) {
                return itemA.sortId - itemB.sortId;
            });
            return result1.concat(result2).concat(result3);
        }
        PracticeCfg.getPracticeShowListByType = getPracticeShowListByType;
        function getPracticeListById(id) {
            return list[id];
        }
        PracticeCfg.getPracticeListById = getPracticeListById;
    })(PracticeCfg = Config.PracticeCfg || (Config.PracticeCfg = {}));
    var PracticeItemCfg = (function (_super) {
        __extends(PracticeItemCfg, _super);
        function PracticeItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PracticeItemCfg;
    }(BaseItemCfg));
    Config.PracticeItemCfg = PracticeItemCfg;
    __reflect(PracticeItemCfg.prototype, "Config.PracticeItemCfg");
})(Config || (Config = {}));
