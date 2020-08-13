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
    var MapinfoCfg;
    (function (MapinfoCfg) {
        var map;
        var mapGroup;
        MapinfoCfg.mapList = {};
        var groupListCfg = {};
        MapinfoCfg.groupIdArr = [];
        MapinfoCfg.idArr = [];
        MapinfoCfg.buildIdArr = [];
        function formatData(data) {
            MapinfoCfg.groupIdArr.length = 0;
            MapinfoCfg.idArr.length = 0;
            MapinfoCfg.buildIdArr.length = 0;
            groupListCfg = {};
            MapinfoCfg.mapList = {};
            map = {};
            mapGroup = {};
            if (data) {
                map = data.map;
                mapGroup = data.mapGroup;
            }
            if (map) {
                MapinfoCfg.idArr = Object.keys(map);
                for (var key in map) {
                    if (map.hasOwnProperty(key)) {
                        var cfg = map[key];
                        var itemCfg = new MapinfoItemCfg();
                        itemCfg.initData(cfg);
                        itemCfg.id = String(key);
                        MapinfoCfg.mapList[itemCfg.id] = itemCfg;
                        if (!groupListCfg[itemCfg.group]) {
                            groupListCfg[itemCfg.group] = [];
                        }
                        groupListCfg[itemCfg.group].push(itemCfg);
                        var goupNum = itemCfg.group;
                        if (MapinfoCfg.groupIdArr.indexOf(goupNum) < 0) {
                            MapinfoCfg.groupIdArr.push(goupNum);
                        }
                        if (itemCfg.building && MapinfoCfg.buildIdArr.indexOf(itemCfg.group) < 0) {
                            MapinfoCfg.buildIdArr.push(itemCfg.group);
                        }
                    }
                }
                //组排序，左下，右下，左上，右上
                for (var group in groupListCfg) {
                    if (groupListCfg.hasOwnProperty(group)) {
                        groupListCfg[group].sort(function (a, b) {
                            return a.x - b.x;
                        });
                    }
                }
                MapinfoCfg.groupIdArr.sort(function (a, b) {
                    return Number(a) - Number(b);
                });
            }
        }
        MapinfoCfg.formatData = formatData;
        /**
         * 根据组获取解锁关卡ID
         * @param group 组
         */
        function getUnlockByGroup(group) {
            return mapGroup[group].unlock || 0;
        }
        MapinfoCfg.getUnlockByGroup = getUnlockByGroup;
        /**
         * 根据组获取数据
         * @param group 组
         */
        function getGroupData(group) {
            return mapGroup[group];
        }
        MapinfoCfg.getGroupData = getGroupData;
        function getCfgByGroup(group) {
            return groupListCfg[group];
        }
        MapinfoCfg.getCfgByGroup = getCfgByGroup;
        function getStartPosCfgByGroup(group) {
            return getCfgByGroup(group)[0];
        }
        MapinfoCfg.getStartPosCfgByGroup = getStartPosCfgByGroup;
        function getCfgByPos(x, y) {
            var id = getIdByPos(x, y);
            return MapinfoCfg.mapList[id] || null;
        }
        MapinfoCfg.getCfgByPos = getCfgByPos;
        function getNextUnlockGroup(cid) {
            var group = '';
            var unlock = -1;
            var l = MapinfoCfg.groupIdArr.length;
            var unlockNum = 0;
            for (var i = 0; i < l; i++) {
                var tmpgroup = MapinfoCfg.groupIdArr[i];
                var tmpunlock = mapGroup[tmpgroup].unlock || 0;
                if (tmpunlock > cid) {
                    if (unlock == -1 || tmpunlock < unlock) {
                        unlock = tmpunlock;
                        group = String(tmpgroup);
                    }
                }
            }
            return String(group);
        }
        MapinfoCfg.getNextUnlockGroup = getNextUnlockGroup;
        function getUnlockGroupList(cid) {
            var groupArr = [];
            var l = MapinfoCfg.groupIdArr.length;
            for (var i = 0; i < l; i++) {
                var tmpgroup = MapinfoCfg.groupIdArr[i];
                var tmpunlock = mapGroup[tmpgroup].unlock || 0;
                if (tmpunlock <= cid) {
                    groupArr.push(String(tmpgroup));
                }
            }
            return groupArr;
        }
        MapinfoCfg.getUnlockGroupList = getUnlockGroupList;
        function getPersonRes(lv) {
            var res = "composelv" + lv;
            while (!ResourceManager.hasRes(res)) {
                lv--;
                res = "composelv" + lv;
                if (lv < 2) {
                    break;
                }
            }
            return res;
        }
        MapinfoCfg.getPersonRes = getPersonRes;
        function getPersonResBig(lv) {
            var res = "composebiglv" + lv;
            while (!ResourceManager.hasRes(res)) {
                lv--;
                res = "composebiglv" + lv;
                if (lv < 2) {
                    break;
                }
            }
            return res;
        }
        MapinfoCfg.getPersonResBig = getPersonResBig;
        function checkHasPos(x, y) {
            var result = false;
            var cfg = getCfgByPos(x, y);
            if (cfg) {
                result = true;
            }
            return result;
        }
        MapinfoCfg.checkHasPos = checkHasPos;
        /**
         * 根据地块ID取坐标
         * @param id
         */
        function getPosById(id) {
            var x = Number(id.substr(1, 2));
            var y = Number(id.substr(3, 2));
            return { x: x, y: y };
        }
        MapinfoCfg.getPosById = getPosById;
        /**
         * 根据坐标取ID
         * @param x
         * @param y
         */
        function getIdByPos(x, y) {
            var xStr = String(x);
            var yStr = String(y);
            if (xStr.length < 2) {
                xStr = "0" + xStr;
            }
            if (yStr.length < 2) {
                yStr = "0" + yStr;
            }
            return "1" + xStr + yStr;
        }
        MapinfoCfg.getIdByPos = getIdByPos;
    })(MapinfoCfg = Config.MapinfoCfg || (Config.MapinfoCfg = {}));
    var MapinfoItemCfg = (function (_super) {
        __extends(MapinfoItemCfg, _super);
        function MapinfoItemCfg() {
            var _this = _super.call(this) || this;
            /**
             *building:)建筑（1 兵营 雇佣家丁;2 府衙  经营;3 城镇 进城
             */
            _this.building = 0;
            return _this;
        }
        MapinfoItemCfg.prototype.initData = function (data) {
            if (data) {
                for (var key in data) {
                    this[key] = data[key];
                }
                var posArr = this.coordinate.split(",");
                this.x = Number(posArr[0]);
                this.y = Number(posArr[1]);
            }
        };
        Object.defineProperty(MapinfoItemCfg.prototype, "defaultOpen", {
            get: function () {
                return this.state == 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapinfoItemCfg.prototype, "buildRes", {
            get: function () {
                if (this.building) {
                    return "composebuild" + this.building;
                }
                else {
                    return this.randomRes;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapinfoItemCfg.prototype, "randomRes", {
            get: function () {
                return "composebuild" + this.building + "_1"; //+((this.x%4+this.y%4)%4+1);
            },
            enumerable: true,
            configurable: true
        });
        return MapinfoItemCfg;
    }(BaseItemCfg));
    __reflect(MapinfoItemCfg.prototype, "MapinfoItemCfg");
})(Config || (Config = {}));
