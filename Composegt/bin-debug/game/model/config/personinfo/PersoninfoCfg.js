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
    var PersoninfoCfg;
    (function (PersoninfoCfg) {
        /**
         * 家丁信息原始配置
         */
        PersoninfoCfg.person = {};
        /**
         * 解析后家丁信息配置
         */
        PersoninfoCfg.personList = {};
        /**
         * 最大等级
         */
        var maxLv = 0;
        /**
         * 解锁征收的家丁id列表
         */
        PersoninfoCfg.levyUnlockPersonList = {};
        function formatData(data) {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    PersoninfoCfg[key] = data[key];
                }
            }
            for (var lv in PersoninfoCfg.person) {
                var item = new PersoninfoItemCfg();
                item.lv = Number(lv);
                item.initData(PersoninfoCfg.person[lv]);
                PersoninfoCfg.personList[lv] = item;
                if (Number(lv) > maxLv) {
                    maxLv = Number(lv);
                }
                if (PersoninfoCfg.person[lv].levyID) {
                    PersoninfoCfg.levyUnlockPersonList[PersoninfoCfg.person[lv].levyID] = lv;
                }
            }
        }
        PersoninfoCfg.formatData = formatData;
        /**
         * 根据等级获取奖励，如果等级不存则取不到值
         * @param lv 等级
         */
        function getPersonCfgByLv(lv) {
            return PersoninfoCfg.personList[lv];
        }
        PersoninfoCfg.getPersonCfgByLv = getPersonCfgByLv;
        /**
         * 根据等级获取名字
         * @param lv 等级
         */
        function getPersonLocalNameByLv(lv) {
            return PersoninfoCfg.personList[lv] ? PersoninfoCfg.personList[lv].getLocalName() : "";
        }
        PersoninfoCfg.getPersonLocalNameByLv = getPersonLocalNameByLv;
        /**
         * 根据等级获取等级显示
         * @param lv 等级
         */
        function getPersonLocalLvByLv(lv) {
            return PersoninfoCfg.personList[lv] ? PersoninfoCfg.personList[lv].getLocalLv() : "" + lv;
        }
        PersoninfoCfg.getPersonLocalLvByLv = getPersonLocalLvByLv;
        /**
         * 根据等级获取价格
         * @param lv 等级
         */
        // export function getGoldCostByLv(lv:number):number
        // {
        //     let cfg=getPersonCfgByLv(lv)||getPersonCfgByLv(getMaxLv());
        //     return cfg.goldCost;
        // }
        /**
         * 根据等级获取次数恢复时间
         * @param lv 等级
         */
        function getBuyTimeByLv(lv) {
            var cfg = getPersonCfgByLv(Math.min(lv, getMaxLv()));
            return cfg.buyTime;
        }
        PersoninfoCfg.getBuyTimeByLv = getBuyTimeByLv;
        /**
         * 获取最大等级
         */
        function getMaxLv() {
            return maxLv;
        }
        PersoninfoCfg.getMaxLv = getMaxLv;
        function getCostStr() {
            return Config.RewardCfg.getRewardStr(String(ItemEnums.gold), 0, PersoninfoCfg.goldCost);
        }
        PersoninfoCfg.getCostStr = getCostStr;
        function getRewardsByLv(lv) {
            var cfg = getPersonCfgByLv(lv);
            return cfg ? cfg.rewards : "";
        }
        PersoninfoCfg.getRewardsByLv = getRewardsByLv;
    })(PersoninfoCfg = Config.PersoninfoCfg || (Config.PersoninfoCfg = {}));
    var PersoninfoItemCfg = (function (_super) {
        __extends(PersoninfoItemCfg, _super);
        function PersoninfoItemCfg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**初次奖励政绩 */
            _this.exp = 0;
            /**购买家丁等级权重（家丁等级范围是[当前合成最高等级-4，当前合成最高等级] */
            _this.weight = [];
            /** 雇佣银两 */
            _this.goldCost = 0;
            _this.lv = 0;
            /**buyTime:招募回复时间 */
            _this.buyTime = 0;
            return _this;
        }
        PersoninfoItemCfg.prototype.getLocalName = function () {
            return LanguageManager.getlocal("composePersonLv" + this.lv);
        };
        PersoninfoItemCfg.prototype.getLocalLv = function () {
            return "Lv." + this.lv;
        };
        return PersoninfoItemCfg;
    }(BaseItemCfg));
    __reflect(PersoninfoItemCfg.prototype, "PersoninfoItemCfg");
})(Config || (Config = {}));
