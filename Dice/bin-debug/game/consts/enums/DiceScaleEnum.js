/**
 * socket骰子缩放比例
 * author 陈可
 * date 2017/9/8
 * @class SocketStateEnum
 */
var DiceScaleEnum;
(function (DiceScaleEnum) {
    DiceScaleEnum[DiceScaleEnum["scale_54"] = 0.54] = "scale_54";
    DiceScaleEnum[DiceScaleEnum["scale_53"] = 0.53] = "scale_53";
    DiceScaleEnum[DiceScaleEnum["scale_41"] = 0.41] = "scale_41";
    DiceScaleEnum[DiceScaleEnum["scale_45"] = 0.45] = "scale_45";
    /**卡组的缩放 */
    DiceScaleEnum[DiceScaleEnum["scale_team"] = 0.85] = "scale_team";
    /**战斗界面卡组缩放 */
    DiceScaleEnum[DiceScaleEnum["scale_fight_team"] = 0.7] = "scale_fight_team";
    /** 战斗记录和对战排位的缩放 */
    DiceScaleEnum[DiceScaleEnum["scale_battle_log"] = 0.75] = "scale_battle_log";
    /** 协同排位的缩放 */
    DiceScaleEnum[DiceScaleEnum["scale_pve"] = 0.35] = "scale_pve";
})(DiceScaleEnum || (DiceScaleEnum = {}));
//# sourceMappingURL=DiceScaleEnum.js.map