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
    /**功能解锁 弹特效 */
    var Unlocklist2Cfg;
    (function (Unlocklist2Cfg) {
        var unlockList = {};
        function formatData(data) {
            for (var key in data) {
                if (!unlockList.hasOwnProperty(String(key))) {
                    unlockList[String(key)] = new Unlocklist2ItemCfg();
                }
                var itemCfg = unlockList[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = key;
            }
        }
        Unlocklist2Cfg.formatData = formatData;
        //功能解锁列表
        function getUnLockCfgList() {
            var arr = [];
            for (var key in unlockList) {
                arr.push(unlockList[key]);
            }
            return arr;
        }
        Unlocklist2Cfg.getUnLockCfgList = getUnLockCfgList;
        //需要展示解锁弹窗列表
        function getUnlockCfgListByShow(isNeedShow) {
            var arr = [];
            for (var key in unlockList) {
                if (isNeedShow) {
                    if (unlockList[key].unlockOpen) {
                        arr.push(unlockList[key]);
                    }
                }
                else {
                    if (unlockList[key].unlockOpen == 0) {
                        arr.push(unlockList[key]);
                    }
                }
            }
            return arr;
        }
        Unlocklist2Cfg.getUnlockCfgListByShow = getUnlockCfgListByShow;
        /**府内 府外展示列表 1: 府内  2:府外  0:功能内部 */
        function getNeedShowCfgListByType(type) {
            var arr = [];
            var list = this.getUnLockCfgList();
            for (var i = 0; i < list.length; i++) {
                if (list[i].position == type) {
                    arr.push(list[i]);
                }
            }
            return arr;
        }
        Unlocklist2Cfg.getNeedShowCfgListByType = getNeedShowCfgListByType;
        function getUnlockCfgByName(name) {
            if (!name) {
                return null;
            }
            var list = this.getUnLockCfgList();
            for (var i = 0; i < list.length; i++) {
                if (list[i].gameName == name) {
                    return list[i];
                }
            }
            return null;
        }
        Unlocklist2Cfg.getUnlockCfgByName = getUnlockCfgByName;
        // export function getUnlockItemCfgList():Array<Unlocklist2ItemCfg>
        // {
        // 	let arr:Array<Unlocklist2ItemCfg> = new Array();
        // 	for(let key in unlockList)
        // 	{
        // 		if(unlockList[key].gameName)
        // 		{ 
        // 			let functionName:string = "checkOpen"+App.StringUtil.firstCharToUper(unlockList[key].gameName);
        // 			if(Api.switchVoApi[functionName])
        // 			{
        // 				if(Api.switchVoApi[functionName]())
        // 				{
        // 					arr.push(unlockList[key]);
        // 				}
        // 			}
        // 			else
        // 			{
        // 				arr.push(unlockList[key]);
        // 			}
        // 		} 
        // 	}
        // 	arr.sort(function(a: any,b: any):number
        // 	{
        // 		if(a.sortId > b.sortId) return 1;
        // 		else if(a.sortId == b.sortId) return 0;
        // 		return -1;
        // 	});
        // 	return arr; 
        // } 
        var Unlocklist2ItemCfg = (function (_super) {
            __extends(Unlocklist2ItemCfg, _super);
            function Unlocklist2ItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.gameName = null;
                return _this;
            }
            return Unlocklist2ItemCfg;
        }(BaseItemCfg));
        Unlocklist2Cfg.Unlocklist2ItemCfg = Unlocklist2ItemCfg;
        __reflect(Unlocklist2ItemCfg.prototype, "Config.Unlocklist2Cfg.Unlocklist2ItemCfg");
    })(Unlocklist2Cfg = Config.Unlocklist2Cfg || (Config.Unlocklist2Cfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=Unlocklist2Cfg.js.map