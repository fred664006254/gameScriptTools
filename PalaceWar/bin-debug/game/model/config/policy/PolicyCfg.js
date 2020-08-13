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
    var PolicyCfg;
    (function (PolicyCfg) {
        //早朝时间元宝消耗折扣
        PolicyCfg.leveeGemDiscount = 0;
        //一个政令组合包含政令数目
        PolicyCfg.gdNum = 0;
        //每天最多发布政令次数
        PolicyCfg.maxIssuegd = 1;
        //修改国策后新国策生效时间，次日0点
        PolicyCfg.newspFromDate = 0;
        PolicyCfg.govDecreeList = [];
        PolicyCfg.sPolicyList = {};
        function getGovDecreeByType(type) {
            return PolicyCfg.govDecreeList[type - 1];
        }
        PolicyCfg.getGovDecreeByType = getGovDecreeByType;
        function getGovDecreeById(id) {
            for (var index = 0; index < PolicyCfg.govDecreeList.length; index++) {
                var element = PolicyCfg.govDecreeList[index];
                for (var key in element) {
                    if (key == id) {
                        return element[key];
                    }
                }
            }
        }
        PolicyCfg.getGovDecreeById = getGovDecreeById;
        function getPolicyById(pid) {
            return PolicyCfg.sPolicyList[pid];
        }
        PolicyCfg.getPolicyById = getPolicyById;
        function formatData(data) {
            for (var key in data) {
                if (key != "statePolicyList" && key != "statePolicyList") {
                    PolicyCfg[key] = data[key];
                }
            }
            for (var key in data.statePolicyList) {
                var itemCfg = PolicyCfg.sPolicyList[key];
                if (!itemCfg) {
                    itemCfg = new StatePolicyItem();
                    PolicyCfg.sPolicyList[String(key)] = itemCfg;
                }
                itemCfg.initData(data.statePolicyList[key]);
                itemCfg.id = String(key);
            }
            // for(let key in data.governmentDecreeList)
            for (var index = 0; index < data.governmentDecreeList.length; index++) {
                var tmpData = data.governmentDecreeList[index];
                var tmpList = PolicyCfg.govDecreeList[index];
                if (!tmpList) {
                    tmpList = {};
                    PolicyCfg.govDecreeList.push(tmpList);
                }
                // for (var index = 0; index < tmpData.length; index++) {
                for (var key in tmpData) {
                    var itemCfg = tmpList[key];
                    if (!itemCfg) {
                        itemCfg = new GovernmentDecreeItem();
                        tmpList[key] = itemCfg;
                    }
                    itemCfg.initData(tmpData[key]);
                    itemCfg.id = String(key);
                }
            }
        }
        PolicyCfg.formatData = formatData;
    })(PolicyCfg = Config.PolicyCfg || (Config.PolicyCfg = {}));
    var StatePolicyItem = (function (_super) {
        __extends(StatePolicyItem, _super);
        function StatePolicyItem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = "";
            return _this;
        }
        return StatePolicyItem;
    }(BaseItemCfg));
    Config.StatePolicyItem = StatePolicyItem;
    __reflect(StatePolicyItem.prototype, "Config.StatePolicyItem");
    var GovernmentDecreeItem = (function (_super) {
        __extends(GovernmentDecreeItem, _super);
        function GovernmentDecreeItem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = "";
            return _this;
        }
        return GovernmentDecreeItem;
    }(BaseItemCfg));
    Config.GovernmentDecreeItem = GovernmentDecreeItem;
    __reflect(GovernmentDecreeItem.prototype, "Config.GovernmentDecreeItem");
})(Config || (Config = {}));
//# sourceMappingURL=PolicyCfg.js.map