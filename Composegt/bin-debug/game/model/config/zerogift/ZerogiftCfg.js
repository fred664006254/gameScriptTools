var Config;
(function (Config) {
    var ZerogiftCfg;
    (function (ZerogiftCfg) {
        var zeroGiftCfg = {};
        function formatData(data) {
            zeroGiftCfg = data;
        }
        ZerogiftCfg.formatData = formatData;
        /**通过页签id获取对应奖励列表 */
        function getList(id) {
            return zeroGiftCfg['giftList'][id]["getReward"];
        }
        ZerogiftCfg.getList = getList;
        /**通过页签id获取对应骨骼id */
        function getBonesById(id) {
            return zeroGiftCfg["giftShow_" + id];
        }
        ZerogiftCfg.getBonesById = getBonesById;
    })(ZerogiftCfg = Config.ZerogiftCfg || (Config.ZerogiftCfg = {}));
})(Config || (Config = {}));
