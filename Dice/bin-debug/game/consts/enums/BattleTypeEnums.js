/**
 * 战斗类型模式枚举
 * author 陈可
 * date 2020/4/23
 * @class BattleTypeEnums
 */
var BattleTypeEnums;
(function (BattleTypeEnums) {
    /**对战模式 */
    BattleTypeEnums["type1"] = "1";
    /**协同模式 */
    BattleTypeEnums["type2"] = "2";
    /**公平竞技场 */
    BattleTypeEnums["type3"] = "3";
    /**对战大类型，PVP形式，比如对战模式 */
    BattleTypeEnums[BattleTypeEnums["bigType1"] = 1] = "bigType1";
    /**对战大类型，PVE形式，比如协同战 */
    BattleTypeEnums[BattleTypeEnums["bigType2"] = 2] = "bigType2";
})(BattleTypeEnums || (BattleTypeEnums = {}));
//# sourceMappingURL=BattleTypeEnums.js.map