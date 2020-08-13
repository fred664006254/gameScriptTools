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
     * 帮战配置
     */
    var AlliancewarCfg;
    (function (AlliancewarCfg) {
        /**
         * --帮会等级达到X级后开启功能
         */
        AlliancewarCfg.allianceLevelNeed = 0;
        /**
         * --开战日:每周一、三、五
         */
        AlliancewarCfg.warTime = [];
        /**
         * --备战日:每周二、四、六、日
         */
        AlliancewarCfg.preWarTime = [];
        /**
         * --开战日0点开始备战 时间：秒
         */
        AlliancewarCfg.beginTime = 0;
        /**
         * --开战日12点05结束备战,时间：秒
         */
        AlliancewarCfg.endTime1 = 0;
        /**
         * --开战日24点结束,时间：秒
         */
        AlliancewarCfg.endTime2 = 0;
        /**
         * ----备战日截止派遣门客时间,时间：秒
         */
        AlliancewarCfg.deadline = 0;
        /**
         * ----每个门客每月只可参战X次
         */
        AlliancewarCfg.servantLimit = 0;
        /**
         * --每月重置：每月1日的0点
         */
        AlliancewarCfg.resetTime = 0;
        /**
     * --参战条件：报名参战的门客大于等于 X
     */
        AlliancewarCfg.servantNum = 0;
        /**
         * --帮会战经验奖励的系数帮战胜利：奖励经验 = 敌方帮会等级 * addExp + 帮战榜加成   帮战失败：奖励经验 = addExp
         */
        AlliancewarCfg.addExp = 0;
        /**
         * ----帮会战个人贡献奖励的系数  帮战胜利：贡献奖励 = 敌方帮会等级 * addContribution + 帮战榜加成   帮战失败： 贡献奖励 = addContribution 【注：这个贡献个人是在帮会商店兑换用的，不增加帮会的任何值】
         */
        AlliancewarCfg.addContribution = 0;
        /**
         * --盟战胜利，个人额外奖励
         */
        AlliancewarCfg.extraReward = '';
        /**
         * --每轮战斗，可使用的锦囊次数
         */
        AlliancewarCfg.useItemNum = 0;
        /**
         * --每个门客，最大连胜次数
         */
        AlliancewarCfg.servantMaxWin = 0;
        /**
         *  --【锦 囊 列 表】
         */
        AlliancewarCfg.itemList = {};
        /**
        *  --【职 位 加 成】
        */
        AlliancewarCfg.allianceOfficer = {};
        /**
         *  --【战榜奖励加成】
         */
        AlliancewarCfg.rankAdd = {};
        function formatData(data) {
            AlliancewarCfg.allianceLevelNeed = data.allianceLevelNeed;
            AlliancewarCfg.warTime = data.warTime;
            AlliancewarCfg.preWarTime = data.preWarTime;
            AlliancewarCfg.beginTime = data.beginTime;
            AlliancewarCfg.endTime1 = data.endTime1;
            AlliancewarCfg.endTime2 = data.endTime2;
            AlliancewarCfg.deadline = data.deadline;
            AlliancewarCfg.servantLimit = data.servantLimit;
            AlliancewarCfg.resetTime = data.resetTime;
            AlliancewarCfg.servantNum = data.servantNum;
            AlliancewarCfg.addExp = data.addExp;
            AlliancewarCfg.addContribution = data.addContribution;
            AlliancewarCfg.extraReward = data.extraReward;
            AlliancewarCfg.useItemNum = data.useItemNum;
            AlliancewarCfg.servantMaxWin = data.servantMaxWin;
            for (var key in data.itemList) {
                var itemCfg = void 0;
                if (!AlliancewarCfg.itemList.hasOwnProperty((Number(key) + 1).toString())) {
                    AlliancewarCfg.itemList[Number(key) + 1] = new ItemListCfg();
                }
                itemCfg = AlliancewarCfg.itemList[Number(key) + 1];
                itemCfg.initData(data.itemList[key]);
                itemCfg.id = Number(key) + 1;
            }
            for (var key in data.allianceOfficer) {
                var itemCfg = void 0;
                if (!AlliancewarCfg.allianceOfficer.hasOwnProperty((Number(key) + 1).toString())) {
                    AlliancewarCfg.allianceOfficer[Number(key) + 1] = new AllianceOfficerCfg();
                }
                itemCfg = AlliancewarCfg.allianceOfficer[Number(key) + 1];
                itemCfg.initData(data.allianceOfficer[key]);
                itemCfg.id = Number(key) + 1;
            }
            for (var key in data.rankAdd) {
                var itemCfg = void 0;
                if (!AlliancewarCfg.rankAdd.hasOwnProperty((Number(key) + 1).toString())) {
                    AlliancewarCfg.rankAdd[Number(key) + 1] = new RankAddCfg();
                }
                itemCfg = AlliancewarCfg.rankAdd[Number(key) + 1];
                itemCfg.initData(data.rankAdd[key]);
                itemCfg.id = Number(key) + 1;
            }
        }
        AlliancewarCfg.formatData = formatData;
        /**
         * 各等级的加成
         */
        function getAddition(po) {
            var info = null;
            var id = null;
            var addition;
            var addvalue;
            for (var key in AlliancewarCfg.allianceOfficer) {
                if (Api.allianceVoApi.getAllianceVo().level == AlliancewarCfg.allianceOfficer[key].level) {
                    id = key;
                    break;
                }
            }
            switch (po) {
                case 1:
                    addition = String(Math.round(Number(AlliancewarCfg.allianceOfficer[id].leader_add) * 100)) + "%";
                    addvalue = Math.round(Number(AlliancewarCfg.allianceOfficer[id].leader_add)) + 1;
                    break;
                case 2:
                    addition = String(Math.round(Number(AlliancewarCfg.allianceOfficer[id].associate_add) * 100)) + "%";
                    addvalue = Math.round(Number(AlliancewarCfg.allianceOfficer[id].associate_add)) + 1;
                    break;
                case 3:
                    addition = String(Math.round(Number(AlliancewarCfg.allianceOfficer[id].elite_add) * 100)) + "%";
                    addvalue = Math.round(Number(AlliancewarCfg.allianceOfficer[id].elite_add)) + 1;
                    break;
                case 4:
                    addition = String(Math.round(Number(AlliancewarCfg.allianceOfficer[id].member_add) * 100)) + "%";
                    addvalue = Math.round(Number(AlliancewarCfg.allianceOfficer[id].member_add)) + 1;
                    break;
            }
            info = { level: AlliancewarCfg.allianceOfficer[id].level, addition: addition, addvalue: addvalue };
            return info;
        }
        AlliancewarCfg.getAddition = getAddition;
        /**
         *  --获取锦囊列表数据
         */
        function getItemList() {
            return getArr(AlliancewarCfg.itemList);
        }
        AlliancewarCfg.getItemList = getItemList;
        /**
         *  --获取职位加成
         */
        function getAllianceOfficer() {
            return getArr(AlliancewarCfg.allianceOfficer);
        }
        AlliancewarCfg.getAllianceOfficer = getAllianceOfficer;
        /**
         *  --获取战榜奖励加成
         */
        function getRankAdd() {
            return getArr(AlliancewarCfg.rankAdd);
        }
        AlliancewarCfg.getRankAdd = getRankAdd;
        function getArr(key) {
            var arr = [];
            if (key) {
                var list = key;
                for (var i in list) {
                    var currObj = list[i];
                    if (currObj) {
                        arr.push(currObj);
                    }
                }
            }
            return arr;
        }
    })(AlliancewarCfg = Config.AlliancewarCfg || (Config.AlliancewarCfg = {}));
    /**
     * --【锦 囊 列 表】
    --item：道具ID
    --powerup：自己提升战斗力
    --powerdown：敌方减少战斗力
    --moreguest：额外派遣门客数量
    --wins：本轮连胜上限
    */
    var ItemListCfg = (function (_super) {
        __extends(ItemListCfg, _super);
        function ItemListCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ItemListCfg;
    }(BaseItemCfg));
    Config.ItemListCfg = ItemListCfg;
    __reflect(ItemListCfg.prototype, "Config.ItemListCfg");
    /**
     *
    --【职 位 加 成】
    --level：联盟等级
    --leader_add：盟主加成
    --associate_add：副盟主加成
    --elite_add：精英加成
    --member_add：成员加成
    */
    var AllianceOfficerCfg = (function (_super) {
        __extends(AllianceOfficerCfg, _super);
        function AllianceOfficerCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AllianceOfficerCfg;
    }(BaseItemCfg));
    Config.AllianceOfficerCfg = AllianceOfficerCfg;
    __reflect(AllianceOfficerCfg.prototype, "Config.AllianceOfficerCfg");
    /**
     *
   --【帮战榜奖励加成】
    --rank：名次 排名区间
    --reward_guild：胜利奖励联盟经验
    --reward_member：胜利奖励个人贡献
    */
    var RankAddCfg = (function (_super) {
        __extends(RankAddCfg, _super);
        function RankAddCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(RankAddCfg.prototype, "minRank", {
            get: function () {
                return this.rank[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RankAddCfg.prototype, "maxRank", {
            get: function () {
                return this.rank[1];
            },
            enumerable: true,
            configurable: true
        });
        return RankAddCfg;
    }(BaseItemCfg));
    Config.RankAddCfg = RankAddCfg;
    __reflect(RankAddCfg.prototype, "Config.RankAddCfg");
})(Config || (Config = {}));
