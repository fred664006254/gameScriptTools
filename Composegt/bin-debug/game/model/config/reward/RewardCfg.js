var Config;
(function (Config) {
    var RewardCfg;
    (function (RewardCfg) {
        function getNameByTypeAndId(type, id) {
            return LanguageManager.getlocal("itemName_" + getLocalKey(type, id));
        }
        RewardCfg.getNameByTypeAndId = getNameByTypeAndId;
        function getIconByTypeAndId(type, id) {
            return "itemicon" + getLocalKey(type, id);
        }
        RewardCfg.getIconByTypeAndId = getIconByTypeAndId;
        function getLocalKey(type, id) {
            if (typeof (type) != "number") {
                type = ItemEnums[type];
            }
            var localKey;
            if (Number(type) > 0 && Number(type) < 6) {
                localKey = type;
            }
            else {
                if (id) {
                    localKey = id;
                }
                else {
                    localKey = type;
                }
            }
            return String(localKey);
        }
        function getNotEnoughLocalTip(type, id) {
            return LanguageManager.getlocal("resNotEnoughDesc", [getNameByTypeAndId(type, id)]);
        }
        RewardCfg.getNotEnoughLocalTip = getNotEnoughLocalTip;
        function getRewardStr(type, id, num) {
            if (!id) {
                id = 1;
            }
            if (!num) {
                num = 1;
            }
            return type + "_" + id + "_" + num;
        }
        RewardCfg.getRewardStr = getRewardStr;
    })(RewardCfg = Config.RewardCfg || (Config.RewardCfg = {}));
})(Config || (Config = {}));
