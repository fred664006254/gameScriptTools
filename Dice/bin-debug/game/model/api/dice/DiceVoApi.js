var Api;
(function (Api) {
    var DiceVoApi;
    (function (DiceVoApi) {
        var diceVo;
        var oldDiceInfo = {};
        var addDiceInfo = {};
        var newGetDiceInfo = {};
        DiceVoApi.needfreshDice = false;
        function formatData(data) {
            if (!diceVo) {
                diceVo = new DiceVo();
                oldDiceInfo = data.info;
            }
            diceVo.initData(data);
            newGetDiceInfo = {};
            for (var i in diceVo.info) {
                if (!oldDiceInfo[i]) {
                    addDiceInfo[i] = 1;
                    newGetDiceInfo[i] = 1;
                }
            }
            oldDiceInfo = diceVo.info;
        }
        DiceVoApi.formatData = formatData;
        function dispose() {
            if (diceVo) {
                diceVo.dispose();
                diceVo = null;
            }
            oldDiceInfo = null;
            addDiceInfo = null;
            newGetDiceInfo = null;
            DiceVoApi.needfreshDice = false;
        }
        DiceVoApi.dispose = dispose;
        //是否是新获得的
        function isNewGet(id) {
            var flag = false;
            if (addDiceInfo && addDiceInfo[id]) {
                flag = true;
            }
            return flag;
        }
        DiceVoApi.isNewGet = isNewGet;
        function notOld(id) {
            var flag = false;
            if (newGetDiceInfo && newGetDiceInfo[id]) {
                flag = true;
            }
            return flag;
        }
        DiceVoApi.notOld = notOld;
        function getNewGetNum() {
            var num = 0;
            if (addDiceInfo) {
                num = Object.keys(addDiceInfo).length;
            }
            return num;
        }
        DiceVoApi.getNewGetNum = getNewGetNum;
        function deleteNew(id) {
            if (addDiceInfo && addDiceInfo[id]) {
                delete addDiceInfo[id];
            }
        }
        DiceVoApi.deleteNew = deleteNew;
        //获取骰子总类型多少种
        function getDiceTotalType() {
            var num = 0;
            if (diceVo && diceVo.info) {
                num = Object.keys(diceVo.info).length;
            }
            return num;
        }
        DiceVoApi.getDiceTotalType = getDiceTotalType;
        //获取骰子暴击伤害加成比
        function getDiceCrit() {
            var num = 0;
            if (diceVo && diceVo.crivalue) {
                num = diceVo.crivalue;
            }
            return num;
        }
        DiceVoApi.getDiceCrit = getDiceCrit;
        //获取已有骰子信息
        function getDiceInfoList() {
            var arr = [];
            if (diceVo && diceVo.info) {
                for (var i in diceVo.info) {
                    arr.push(i);
                }
            }
            return arr.concat(this.getNotGetDiceInfoList());
        }
        DiceVoApi.getDiceInfoList = getDiceInfoList;
        //获取未获得骰子信息
        function getNotGetDiceInfoList() {
            var dicelist = Config.DiceCfg.getDiceList();
            var arr = [];
            for (var i in dicelist) {
                var diceid = dicelist[i];
                if (!Api.DiceVoApi.isHaveDiceById(diceid)) {
                    arr.push(diceid);
                }
            }
            return arr;
        }
        DiceVoApi.getNotGetDiceInfoList = getNotGetDiceInfoList;
        //获取骰子等级
        function getDiceLvById(id) {
            var level = 1;
            if (diceVo && diceVo.info && diceVo.info[id] && diceVo.info[id].lv) {
                level = diceVo.info[id].lv;
            }
            else {
                var cfg = Config.DiceCfg.getCfgById(id);
                level = cfg.iniGrade;
            }
            return level;
        }
        DiceVoApi.getDiceLvById = getDiceLvById;
        //是否有某个骰子
        function isHaveDiceById(id) {
            var flag = false;
            if (diceVo && diceVo.info && diceVo.info[id]) {
                flag = true;
            }
            return flag;
        }
        DiceVoApi.isHaveDiceById = isHaveDiceById;
        //某个骰子数量 有可能是0
        function getDiceNumById(id) {
            var num = 0;
            if (diceVo && diceVo.info && diceVo.info[id] && diceVo.info[id].num) {
                num = diceVo.info[id].num;
            }
            return num;
        }
        DiceVoApi.getDiceNumById = getDiceNumById;
        //获取当前可升级的骰子数
        function getDiceCanLevelUpNum() {
            var total = 0;
            if (diceVo && diceVo.info) {
                for (var i in diceVo.info) {
                    var unit = diceVo.info[i];
                    var num = unit.num;
                    var lv = unit.lv;
                    var cfg = Config.DiceCfg.getCfgById(i);
                    var needNum = cfg.getNextLvCostNumByLv(lv + 1);
                    if (needNum && num >= needNum && lv < cfg.maxGrade) {
                        ++total;
                    }
                }
            }
            return total;
        }
        DiceVoApi.getDiceCanLevelUpNum = getDiceCanLevelUpNum;
    })(DiceVoApi = Api.DiceVoApi || (Api.DiceVoApi = {}));
})(Api || (Api = {}));
//# sourceMappingURL=DiceVoApi.js.map