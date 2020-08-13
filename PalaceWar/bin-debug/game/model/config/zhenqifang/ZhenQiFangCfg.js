var Config;
(function (Config) {
    /**
     * 珍器坊配置
     */
    var ZhenqifangCfg;
    (function (ZhenqifangCfg) {
        /*--珍器坊任务-个人
        --getFreeTask:自动增加任务时间
        --deduction:不满足要求,奖励扣除奖励比例
        --freeFresh:每日免费更换任务次数
        --gemBuyTask:元宝刷新数组(超过上限取上限)
        --getTaskNum:使用道具获得一个任务时，消耗和还需要的时间是有关系的！  所需道具数量（向上取整） = getFreeTask / getTaskNum  道具不足，不能用！！
        --getTaskNeed:使用 X 个道具立即获得一个任务
        */
        ZhenqifangCfg.individual = null;
        /**
         * --珍器坊任务-好友(按天刷新，删除没做的任务)，每日不可使用道具增加任务，只能更换任务
         *  --freeFresh:每日免费更换任务次数
            --deduction:不满足要求扣除奖励比例
            --gemBuyTask:元宝刷新数组(超过上限取上限)
        */
        ZhenqifangCfg.friend = null;
        /**
         * 亲家加成
        */
        ZhenqifangCfg.rltvByMarr = [];
        /**
         * --珍器坊等级-任务关系。默认0级。
            --needExp:需要经验值升级至下一级
            --taskSlotIndiv:任务槽最大数量-个人
            --taskSlotFid:好友任务，每日刷新数量
            --taskSlotFidMax:好友任务最大数量
            --ratio:个人任务刷新任务概率，品质由低到高（DCBAS）。
        */
        ZhenqifangCfg.taskHouse = null;
        /**
         * --使用免费次数和元宝刷新机制
            --取当前珍器坊等级的权重，取当前要刷新任务等级以上(包括本身等级)的新权重组合刷新
        */
        /**
         * --个人任务
            --weight:任务权重
            --servantNeed:门客需求数
            --specialServant:有要求门客数
            --time:完成时间(秒)
            --exp:增加珍器坊经验值
            --getReward1:奖励1：随珍器坊等级，奖励数量变化的道具  最终数量 = 珍器坊等级 * 数量
            --getReward2:奖励2：不随珍器坊等级变化的奖励
            --getReward3Ratio:奖励3：随机到该任务时，有可能出现的奖励的几率  千分制
            --getReward3:奖励3
        */
        ZhenqifangCfg.indivT = null;
        /**
         *   --个人任务要求表
            --note:备注
            --weight:权重
            --requirement:需求
        */
        ZhenqifangCfg.indivR = null;
        /**
         *   --好友任务
            --weight:任务权重
            --servantNeed:门客需求数
            --specialServant:有要求门客数
            --needFriend:所需好友数量
            --time:完成时间(秒)
            --exp:增加珍器坊经验值
            --getReward1:奖励1：随珍器坊等级，奖励数量变化的道具  最终数量 = 珍器坊等级 * 数量
            --getReward2:奖励2：不随珍器坊等级变化的奖励
            --getReward3Ratio:奖励3：随机到该任务时，有可能出现的奖励的几率
            --getReward3:奖励3
        */
        ZhenqifangCfg.fridT = null;
        /**
         *  --个人任务要求表
            --note:备注
            --weight:权重
            --requirement:需求
        */
        ZhenqifangCfg.fridR = null;
        function formatData(data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
        ZhenqifangCfg.formatData = formatData;
        function getTaskCfgById(quality, id) {
            return this.indivT[quality][id];
        }
        ZhenqifangCfg.getTaskCfgById = getTaskCfgById;
        function getTaskHouseCfgByLevel(level) {
            return this.taskHouse[level];
        }
        ZhenqifangCfg.getTaskHouseCfgByLevel = getTaskHouseCfgByLevel;
        function getInviTaskNeedByType(type, id) {
            return this.indivR[type][id];
        }
        ZhenqifangCfg.getInviTaskNeedByType = getInviTaskNeedByType;
        ZhenqifangCfg.needItem = 2040;
    })(ZhenqifangCfg = Config.ZhenqifangCfg || (Config.ZhenqifangCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=ZhenQiFangCfg.js.map