var Config;
(function (Config) {
    var ServentcombinationCfg;
    (function (ServentcombinationCfg) {
        var relationship = {};
        function formatData(data) {
            relationship = data;
        }
        ServentcombinationCfg.formatData = formatData;
        /**
         * --combinationDetail  组合元素
        --attributeType  加成属性类型  1.擂台中增加攻击 2擂台中增加血量
        --addValue  羁绊加成值
        --needAbility  所需等级
        
        ["10011"]={       ----元芳----
            ["combinationDetail"]={"1001","1002","1003","1004","1005"},
            ["attributeType"]=1,
            ["addValue"]={0.05,0.1,0.15},
            ["needAbility"]={100,200,300},
        },
        */
        function isHaveCombine(sid) {
            return relationship && typeof relationship[sid + "1"] !== "undefined";
        }
        ServentcombinationCfg.isHaveCombine = isHaveCombine;
        function getCombineNums(sid) {
            var num = 0;
            if (isHaveCombine(sid)) {
                var id = 1;
                while (relationship[sid + id]) {
                    ++id;
                    ++num;
                }
            }
            return num;
        }
        ServentcombinationCfg.getCombineNums = getCombineNums;
        function getCombineInfoById(sid, id) {
            var info = undefined;
            if (relationship && relationship[sid + id]) {
                info = relationship[sid + id];
            }
            return info;
        }
        ServentcombinationCfg.getCombineInfoById = getCombineInfoById;
    })(ServentcombinationCfg = Config.ServentcombinationCfg || (Config.ServentcombinationCfg = {}));
})(Config || (Config = {}));
