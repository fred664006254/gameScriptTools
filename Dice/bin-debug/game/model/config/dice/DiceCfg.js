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
    var DiceCfg;
    (function (DiceCfg) {
        DiceCfg.maxStar = 7;
        /**addmst特效组配置*/
        var addmstEffCfg = {
            "102": { timeparam: 70, playnum: 1, width: 46, height: 46, type1scale: 2, type2scale: 1, type3scale: 2, bossscale: 2, add: true },
            "105": { type1scale: 0.7, type2scale: 0.5, type3scale: 1, bossscale: 1, add: true, type1tmpy: 20, type2tmpy: 10, type3tmpy: 30, type4tmpy: 30 },
            "109": { timeparam: 70, playnum: -1, width: 105, height: 105, type1scale: 0.7, type2scale: 0.5, type3scale: 1, bossscale: 1, tmpx: 10 },
            // "109":{type:`around`, playnum : -1, rotation : 360, timeparam : 1500, height : 39, width : 37, type1scale : 1},
            "301": { type: "fly" },
            "302": { timeparam: 70, playnum: 1, width: 77, height: 77, type1scale: 1, type2scale: 2, tmpx: 10 },
            "309": { timeparam: 70, playnum: 1, width: 46, height: 46, type1scale: 2, type2scale: 1, type3scale: 2, bossscale: 2, add: true },
            // "310":{timeparam:70, playnum : 1, width : 37, height : 60, type1scale : 0.8, type2scale : 0.8, type3scale : 0.8, bossscale : 0.8},
            "402_1": { timeparam: 70, playnum: 1, width: 150, height: 150, type1scale: 1, type2scale: 1, type3scale: 1, bossscale: 1 },
            "402_2": { timeparam: 70, playnum: 1, width: 300, height: 300, type1scale: 1, type2scale: 1, type3scale: 1, bossscale: 1 },
            "405": { timeparam: 70, playnum: 1, width: 61, height: 53, type1scale: 1, type2scale: 2, tmpx: 10 },
            "408": { type1scale: 0.7, type2scale: 0.5, type3scale: 1, bossscale: 1, add: true, type1tmpy: 20, type2tmpy: 10, type3tmpy: 30, type4tmpy: 30 },
            "411": { timeparam: 70, playnum: 1, width: 150, height: 150, type1scale: 1, type2scale: 1, type3scale: 1, bossscale: 1, tmpx: 10 },
        };
        /** 可叠加特效配置*/
        var canAddEffCfg = {
            "105": 1,
            "408": 1,
        };
        /**adddice特效组配置*/
        var adddiceEffCfg = {
            "202": { type: "randomFly", tmpy: -41 },
            "205": { type: "randomFly", tmpy: -41 },
            "304": { timeparam: 70, playnum: -1, width: 120, height: 120 },
            "406": { type: "randomFly", tmpy: -41 },
            "415": { timeparam: 70, playnum: -1, width: 120, height: 120, scale: 1 },
        };
        /**没有普通攻击的骰子ID列表 */
        var notNmAtk = {
            '201': 1,
            "202": 1,
            "203": 1,
            "205": 1,
            "308": 1,
            "402": 1,
            "406": 1,
            "413": 1,
            "418": 1,
        };
        /**有额外伤害或者buff的骰子 */
        var hasExtAtk = {
            "101": 1,
            "102": 1,
            "109": 1,
            "405": 1,
            "104": 1,
            "105": 1,
            "203": 1,
            "204": 1,
            "303": 1,
            "309": 1,
            "411": 1,
        };
        /**音效不是攻击而是特殊技能的骰子*/
        var specialSoundAtk = {
            "109": 1,
            "207": 1,
            "301": 1,
            "302": 1,
            "304": 1,
            "308": 1,
            "401": 1,
            "402": 1,
            "403": 1,
            "405": 1,
            "407": 1,
            "408": 1,
            "409": 1,
            "410": 1,
            "411": 1,
            "412": 1,
            "415": 1,
        };
        var diceList = {};
        function formatData(data) {
            // for(var key in data)
            // {
            // 	DiceCfg[key]=data[key];
            // }
            var dice = data.dice;
            for (var id in dice) {
                if (dice.hasOwnProperty(id)) {
                    var item = new DiceCfgItem();
                    item.id = id;
                    item.initData(dice[id]);
                    diceList[id] = item;
                }
            }
        }
        DiceCfg.formatData = formatData;
        /**
         * 检测是否有普通攻击
         * @param id 需要检测的骰子ID
         */
        function checkHasNmAtk(id) {
            return !notNmAtk[id];
        }
        DiceCfg.checkHasNmAtk = checkHasNmAtk;
        function hasSpecialSoundAtk(id) {
            var flag = false;
            if (specialSoundAtk[id]) {
                flag = true;
            }
            return flag;
        }
        DiceCfg.hasSpecialSoundAtk = hasSpecialSoundAtk;
        function checkHasExtAtk(id) {
            return !!hasExtAtk[id];
        }
        DiceCfg.checkHasExtAtk = checkHasExtAtk;
        function getCfgById(id) {
            return diceList[id];
        }
        DiceCfg.getCfgById = getCfgById;
        function getIconById(id, isbig) {
            return getCfgById(id).getIcon(isbig);
        }
        DiceCfg.getIconById = getIconById;
        function getIdceEffect(id, stars) {
            return getCfgById(id).getIdleEffectKey(stars);
        }
        DiceCfg.getIdceEffect = getIdceEffect;
        function getAtkEffect(id, stars) {
            return getCfgById(id).getAtkEffectKey(stars);
        }
        DiceCfg.getAtkEffect = getAtkEffect;
        function getStarByLv(id, starLv) {
            return getCfgById(id).getStarByLv(starLv);
        }
        DiceCfg.getStarByLv = getStarByLv;
        function getTotalDice() {
            return Object.keys(diceList).length;
        }
        DiceCfg.getTotalDice = getTotalDice;
        function getDiceList() {
            return Object.keys(diceList);
        }
        DiceCfg.getDiceList = getDiceList;
        function getAddMstEffById(id) {
            return addmstEffCfg[id];
        }
        DiceCfg.getAddMstEffById = getAddMstEffById;
        function getAddDiceEffById(id) {
            return adddiceEffCfg[id];
        }
        DiceCfg.getAddDiceEffById = getAddDiceEffById;
        function getCanAddEffById(id) {
            return canAddEffCfg[id];
        }
        DiceCfg.getCanAddEffById = getCanAddEffById;
    })(DiceCfg = Config.DiceCfg || (Config.DiceCfg = {}));
    var DiceCfgItem = (function (_super) {
        __extends(DiceCfgItem, _super);
        function DiceCfgItem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.quality = 0; //品质 1：普通 2：稀有 3：史诗 4：传说
            _this.iniGrade = 0; //初始等级
            _this.maxGrade = 0; //最大等级
            _this.weight = 0; //随机权重  控制宝箱调用时候的随机权重
            _this.needLevel = 0; //level等级大于等于 X，才能随机到此骰子
            _this.type = 0; //攻击类型  1:number;//魔法  2：物理  3：异常状态  4：加成  5：安装  6：变换形状  7：合成
            _this.iniCrit = 0; //初始暴击率
            _this.iniAtk = 0; //初始攻击
            _this.gradeAtk = 0; //每次升级增加攻击力
            _this.powerUpAtk = 0; //power up每级攻击力提升值
            _this.iniAtkSpeed = 0; //初始攻击速度
            _this.gradeAtkSpeed = 0; //每次升级提升攻击速度
            _this.powerAtkSpeed = 0; //power up每级攻击速度提升值
            _this.target = 0; //攻击目标类型  1:number;//前边  2：强敌  3：随机（纯随机）  4：随机（优先顺序）
            _this.property1 = 0; //特性1的初始值
            _this.gradeProperty1 = 0; //每次升级增加特性1的值
            _this.powerUpProperty1 = 0; //power up每级特性1提升值
            _this.property2 = 0; //特性2的初始值
            _this.gradeProperty2 = 0; //每次升级增加特性2的值
            _this.powerUpProperty2 = 0; //power up每级特性2提升值
            _this.randomCompose = 0; //机器人合成优先级
            _this.randomPowerUp = 0; //机器人power UP优先级
            _this.timeSpecial = {
                109: { specialDesc2: true },
                203: { specialDesc2: true },
                304: { specialDesc1: true, specialDesc2: true },
                308: { specialDesc2: true },
                403: { specialDesc1: true },
                407: { specialDesc1: true },
                408: { specialDesc2: true },
                413: { specialDesc2: true },
                415: { specialDesc1: true, specialDesc2: true },
            };
            _this.percentSpecial = {
                417: { specialDesc1: true, specialDesc2: true },
            };
            return _this;
        }
        /**升级消耗相同骰子数量 */
        DiceCfgItem.prototype.getNextLvCostNumByLv = function (clv) {
            var idx = Math.min(clv, (this.costNum.length + 1));
            var num = 0;
            if (this.costNum[idx - 2]) {
                num = this.costNum[idx - 2];
            }
            return num;
        };
        /**升级消耗金币数量 */
        DiceCfgItem.prototype.getNextLvCostGoldByLv = function (clv) {
            var idx = Math.min(clv, (this.costGold.length + 1));
            var num = 0;
            if (this.costGold[idx - 2]) {
                num = this.costGold[idx - 2];
            }
            return num;
        };
        /**每次升级，暴击伤害增加值 */
        DiceCfgItem.prototype.getNextLvAddCritDamage = function (clv) {
            var idx = Math.min(clv, (this.addCritDamage.length + 1));
            var num = 0;
            if (this.addCritDamage[idx - 2]) {
                num = this.addCritDamage[idx - 2];
            }
            return num;
        };
        /**icon */
        DiceCfgItem.prototype.getIcon = function (isbig) {
            var iconstr = "" + (isbig ? "bigdice" : "dice") + this.id;
            if (!ResMgr.hasRes(iconstr)) {
                iconstr = "dice101";
            }
            return iconstr;
        };
        DiceCfgItem.prototype.getIdleEffectKey = function (stars) {
            var key = "diceidle" + this.id;
            if (!ResMgr.hasRes(key + "1")) {
                key = null;
            }
            if (this.id == "414" && stars && stars > 1) {
                if (stars == 7) {
                    key += "3";
                }
                else {
                    key += "2";
                }
            }
            return key;
        };
        DiceCfgItem.prototype.getAtkEffectKey = function (stars) {
            var key = "diceatk" + this.id;
            if (this.id == "414" && stars && stars > 1) {
                if (stars == 7) {
                    key += "3";
                }
                else {
                    key += "2";
                }
            }
            if (!ResMgr.hasRes(key + "1")) {
                key = null;
            }
            return key;
        };
        /**
         * 根据星级获取星icon
         */
        DiceCfgItem.prototype.getStarByLv = function (starLv) {
            var starstr = (starLv < 7 ? "dicestar" : "dicesun") + this.id;
            if (!RES.hasRes(starstr)) {
                starstr = "dicestar101";
            }
            return starstr;
        };
        Object.defineProperty(DiceCfgItem.prototype, "name", {
            /**name */
            get: function () {
                return LangMger.getlocal("dice" + this.id + "_name");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DiceCfgItem.prototype, "qualityStr", {
            /**品质文本 */
            get: function () {
                return "<font color=" + GameConfig.getQualityColor(this.quality) + ">" + LangMger.getlocal("quality" + this.quality) + "</font>";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DiceCfgItem.prototype, "desc", {
            /**说明 */
            get: function () {
                return LangMger.getlocal("dicedesc_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        DiceCfgItem.prototype.getBtShawdow = function () {
            return "diceshadow" + (this.quality > 3 ? 4 : 3);
        };
        /*各类型标题*/
        DiceCfgItem.prototype.getAtkIconByType = function (type) {
            var res = "";
            if (type == "specialDesc1" || type == "specialDesc2") {
                res = "dice" + this.id + "special" + type.split("specialDesc")[1];
            }
            else {
                res = "dice" + type;
            }
            if (!RES.hasRes(res)) {
                res = "diceattricon";
            }
            return res;
        };
        /**各类型具体数值 */
        DiceCfgItem.prototype.getAtkDetailByType = function (type, pwlv, lv) {
            if (pwlv === void 0) { pwlv = 1; }
            if (lv === void 0) { lv = 0; }
            var str = "-";
            var info = this.getAtkDetailPowerUpnumByType(type);
            if (!lv) {
                lv = Api.DiceVoApi.getDiceLvById(this.id);
            }
            switch (type) {
                //攻击类型
                case "atkType":
                    if (this.type && LangMger.checkHasKey("diceAtktype" + this.type)) {
                        str = LangMger.getlocal("diceAtktype" + this.type);
                    }
                    break;
                //攻击力
                case "atkNum":
                    var num = this.getAtkByLv(lv) + (pwlv - 1) * info.num;
                    if (num != 0) {
                        str = parseFloat(num.toFixed(2)) + "";
                    }
                    break;
                //攻击速度
                case "atkSpeed":
                    var speed = this.getAtkSpeedByLv(lv) + (pwlv - 1) * info.num;
                    ;
                    if (speed != 0) {
                        str = parseFloat(speed.toFixed(2)) + "s";
                    }
                    break;
                //攻击目标
                case "atkTarget":
                    if (this.target && LangMger.checkHasKey("diceAtktarget" + this.target)) {
                        str = LangMger.getlocal("diceAtktarget" + this.target);
                    }
                    break;
                //特殊值1
                case "specialDesc1":
                    if (this.property1 != 0) {
                        var num_1 = this.property1 + (this.gradeProperty1 * (lv - this.iniGrade)) + (pwlv - 1) * info.num;
                        if (this.gradeProperty1 == 0) {
                            if (this.judgeIsTime(type)) {
                                str = num_1 + "s";
                            }
                            else if (this.judgeIsPercent(type)) {
                                num_1 = parseFloat((num_1 * 100).toFixed(2));
                                str = num_1 + "%";
                            }
                            else {
                                if (num_1 < 1 && num_1 > 0) {
                                    num_1 = parseFloat((num_1 * 100).toFixed(2));
                                }
                                str = "" + num_1 + (this.property1 < 0 ? ("s") : (this.property1 < 1 ? "%" : ""));
                            }
                        }
                        else {
                            if (this.judgeIsTime(type)) {
                                str = num_1 + "s";
                            }
                            else if (this.judgeIsPercent(type)) {
                                num_1 = parseFloat((num_1 * 100).toFixed(2));
                                str = num_1 + "%";
                            }
                            else {
                                if (this.gradeProperty1 < 1 && this.gradeProperty1 > 0) {
                                    num_1 = parseFloat((num_1 * 100).toFixed(2));
                                }
                                str = "" + num_1 + (this.gradeProperty1 < 0 ? ("s") : (this.gradeProperty1 < 1 ? "%" : ""));
                            }
                        }
                    }
                    break;
                //特殊值2
                case "specialDesc2":
                    if (this.property2 != 0) {
                        var num_2 = this.property2 + (this.gradeProperty2 * (lv - this.iniGrade)) + (pwlv - 1) * info.num;
                        if (this.gradeProperty2 == 0) {
                            if (this.judgeIsTime(type)) {
                                str = num_2 + "s";
                            }
                            else if (this.judgeIsPercent(type)) {
                                num_2 = parseFloat((num_2 * 100).toFixed(2));
                                str = num_2 + "%";
                            }
                            else {
                                if (num_2 < 1 && num_2 > 0) {
                                    num_2 = parseFloat((num_2 * 100).toFixed(2));
                                }
                                str = "" + num_2 + (this.property2 < 0 ? ("s") : (this.property2 < 1 ? "%" : ""));
                            }
                        }
                        else {
                            if (this.judgeIsTime(type)) {
                                str = num_2 + "s";
                            }
                            else if (this.judgeIsPercent(type)) {
                                num_2 = parseFloat((num_2 * 100).toFixed(2));
                                str = num_2 + "%";
                            }
                            else {
                                if (this.gradeProperty2 < 1 && this.gradeProperty2 > 0) {
                                    num_2 = parseFloat((num_2 * 100).toFixed(2));
                                }
                                str = "" + num_2 + (this.gradeProperty2 < 0 ? ("s") : (this.gradeProperty2 < 1 ? "%" : ""));
                            }
                        }
                    }
                    break;
            }
            return str;
        };
        DiceCfgItem.prototype.judgeIsTime = function (specialType) {
            var flag = false;
            if (this.timeSpecial[this.id] && this.timeSpecial[this.id][specialType]) {
                flag = true;
            }
            return flag;
        };
        DiceCfgItem.prototype.judgeIsPercent = function (specialType) {
            var flag = false;
            if (this.percentSpecial[this.id] && this.percentSpecial[this.id][specialType]) {
                flag = true;
            }
            return flag;
        };
        /**各类型具体升级每级别数值 */
        DiceCfgItem.prototype.getAtkDetailPernumByType = function (type) {
            var str = "";
            switch (type) {
                //攻击力
                case "atkNum":
                    if (this.gradeAtk != 0) {
                        str = "" + (this.gradeAtk > 0 ? "+" : "") + parseFloat(this.gradeAtk.toFixed(2));
                    }
                    break;
                //攻击速度
                case "atkSpeed":
                    if (this.gradeAtkSpeed != 0) {
                        str = "" + (this.gradeAtkSpeed > 0 ? "+" : "") + parseFloat(this.gradeAtkSpeed.toFixed(2)) + "s";
                    }
                    break;
                //特殊值1
                case "specialDesc1":
                    if (this.property1 && this.gradeProperty1 != 0) {
                        var num = this.gradeProperty1;
                        if (this.judgeIsTime(type)) {
                            str = "" + (this.gradeProperty1 > 0 ? "+" : "") + num + "s";
                        }
                        else if (this.judgeIsPercent(type)) {
                            num = parseFloat((num * 100).toFixed(2));
                            str = "" + (this.gradeProperty1 > 0 ? "+" : "") + num + "%";
                        }
                        else {
                            if (this.gradeProperty1 < 1 && this.gradeProperty1 > 0) {
                                num = parseFloat((num * 100).toFixed(2));
                            }
                            str = "" + (this.gradeProperty1 > 0 ? "+" : "") + num + (this.gradeProperty1 < 0 ? ("s") : (this.gradeProperty1 < 1 ? "%" : ""));
                        }
                    }
                    break;
                //特殊值2
                case "specialDesc2":
                    if (this.property2 && this.gradeProperty2 != 0) {
                        var num = this.gradeProperty2;
                        if (this.judgeIsTime(type)) {
                            str = "" + (this.gradeProperty2 > 0 ? "+" : "") + num + "s";
                        }
                        else if (this.judgeIsPercent(type)) {
                            num = parseFloat((num * 100).toFixed(2));
                            str = "" + (this.gradeProperty1 > 0 ? "+" : "") + num + "%";
                        }
                        else {
                            if (this.gradeProperty1 < 1 && this.gradeProperty2 > 0) {
                                num = parseFloat((num * 100).toFixed(2));
                            }
                            str = "" + (this.gradeProperty2 > 0 ? "+" : "") + num + (this.gradeProperty2 < 0 ? ("s") : (this.gradeProperty2 < 1 ? "%" : ""));
                        }
                    }
                    break;
            }
            return str;
        };
        /**各类型具体powerup每级别数值 */
        DiceCfgItem.prototype.getAtkDetailPowerUpnumByType = function (type) {
            var str = "";
            var num = 0;
            switch (type) {
                //攻击力
                case "atkNum":
                    if (this.powerUpAtk != 0) {
                        num = this.powerUpAtk;
                        str = "" + (this.powerUpAtk > 0 ? "+" : "") + parseFloat(num.toFixed(2));
                    }
                    break;
                //攻击速度
                case "atkSpeed":
                    if (this.powerAtkSpeed != 0) {
                        num = this.powerAtkSpeed;
                        str = "" + (this.powerAtkSpeed > 0 ? "+" : "") + parseFloat(this.powerAtkSpeed.toFixed(2)) + "s";
                    }
                    break;
                //特殊值1
                case "specialDesc1":
                    if (this.powerUpProperty1 != 0) {
                        num = this.powerUpProperty1;
                        if (this.judgeIsTime(type)) {
                            str = "" + (this.powerUpProperty1 > 0 ? "+" : "") + num + "s";
                        }
                        else if (this.judgeIsPercent(type)) {
                            num = parseFloat((num * 100).toFixed(2));
                            str = "" + (this.powerUpProperty1 > 0 ? "+" : "") + num + "%";
                        }
                        else {
                            if (this.powerUpProperty1 < 1 && this.powerUpProperty1 > 0) {
                                num = parseFloat((num * 100).toFixed(2));
                            }
                            str = "" + (this.powerUpProperty1 > 0 ? "+" : "") + num + (this.powerUpProperty1 < 0 ? ("s") : (this.powerUpProperty1 < 1 ? "%" : ""));
                        }
                        num = this.powerUpProperty1;
                    }
                    break;
                //特殊值2
                case "specialDesc2":
                    if (this.powerUpProperty2 != 0) {
                        num = this.powerUpProperty2;
                        if (this.judgeIsTime(type)) {
                            str = "" + (this.powerUpProperty2 > 0 ? "+" : "") + num + "s";
                        }
                        else if (this.judgeIsPercent(type)) {
                            num = parseFloat((num * 100).toFixed(2));
                            str = "" + (this.powerUpProperty2 > 0 ? "+" : "") + num + "%";
                        }
                        else {
                            if (this.gradeProperty1 < 1 && this.powerUpProperty2 > 0) {
                                num = parseFloat((num * 100).toFixed(2));
                            }
                            str = "" + (this.powerUpProperty2 > 0 ? "+" : "") + num + (this.powerUpProperty2 < 0 ? ("s") : (this.powerUpProperty2 < 1 ? "%" : ""));
                        }
                        num = this.powerUpProperty2;
                    }
                    break;
            }
            return {
                str: str,
                num: num
            };
        };
        /**每一次增幅效果*/
        DiceCfgItem.prototype.getPowerUpString = function () {
            var str = '';
            var arr = [{ type: "atkNum" }, { type: "atkSpeed" }, { type: "specialDesc1" }, { type: "specialDesc2" }];
            for (var i = 0; i < arr.length; ++i) {
                var unit = arr[i];
                var type = unit.type;
                var pre = LangMger.getlocal("dice" + type);
                if (type == "specialDesc1" || type == "specialDesc2") {
                    pre = this["get" + type]();
                }
                var info = this.getAtkDetailPowerUpnumByType(type);
                if (info.str != "") {
                    pre += "" + info.str;
                    str += pre + "\n";
                }
            }
            return str;
        };
        /**特殊功能说明1 */
        DiceCfgItem.prototype.getspecialDesc1 = function () {
            var str = "";
            if (this.property1 && LangMger.checkHasKey("dicespecialdesc1_" + this.id)) {
                str = LangMger.getlocal("dicespecialdesc1_" + this.id);
            }
            return str;
        };
        /**特殊功能说明2 */
        DiceCfgItem.prototype.getspecialDesc2 = function () {
            var str = "";
            if (this.property2 && LangMger.checkHasKey("dicespecialdesc2_" + this.id)) {
                str = LangMger.getlocal("dicespecialdesc2_" + this.id);
            }
            return str;
        };
        /**
         * 根据当前等级获取暴击率
         * @param clv 等级
         */
        DiceCfgItem.prototype.getTotalCritByLv = function (clv) {
            var l = this.addCritDamage.length;
            var lv = Math.min(clv, l);
            var totalCrit = 0;
            for (var i = 0; i < lv; i++) {
                totalCrit += this.addCritDamage[i];
            }
            return totalCrit;
        };
        /**
        * 根据当前等级获取攻击速度
        * @param clv 等级
        */
        DiceCfgItem.prototype.getAtkSpeedByLv = function (clv) {
            return this.iniAtkSpeed + (this.gradeAtkSpeed * (clv - this.iniGrade));
        };
        /**
         * 根据当前等级获取攻击力
         * @param clv 等级
         */
        DiceCfgItem.prototype.getAtkByLv = function (clv) {
            return this.iniAtk + (this.gradeAtk * (clv - this.iniGrade));
        };
        DiceCfgItem.prototype.getPowerAtkByLv = function (plv) {
            return this.powerUpAtk * (plv - 1);
        };
        /**
         * 根据骰子等级获取特性1的值
         * @param clv 骰子等级
         */
        DiceCfgItem.prototype.getProperty1ByLv = function (clv) {
            return this.property1 + (this.gradeProperty1 * (clv - this.iniGrade));
        };
        /**
         * 根据骰子能量等级获取属性1加成
         * @param plv 能量等级
         */
        DiceCfgItem.prototype.getPowerProperty1ByLv = function (plv) {
            return this.powerUpProperty1 * (plv - 1);
        };
        /**
         * 根据骰子等级获取特性2的值
         * @param clv 骰子等级
         */
        DiceCfgItem.prototype.getProperty2ByLv = function (clv) {
            return this.property2 + (this.gradeProperty2 * (clv - this.iniGrade));
        };
        /**
         * 根据骰子能量等级获取属性2加成
         * @param plv 能量等级
         */
        DiceCfgItem.prototype.getPowerProperty2ByLv = function (plv) {
            return this.powerUpProperty2 * (plv - 1);
        };
        return DiceCfgItem;
    }(BaseItemCfg));
    __reflect(DiceCfgItem.prototype, "DiceCfgItem", ["IDiceCfgItem"]);
})(Config || (Config = {}));
//# sourceMappingURL=DiceCfg.js.map