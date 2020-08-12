/**
 * socket骰子缩放比例
 * author 陈可
 * date 2017/9/8
 * @class SocketStateEnum
 */
enum DiceScaleEnum
{
    scale_54=0.54,
    scale_53=0.53,
    scale_41=0.41,//战斗用
    scale_45=0.45,//战斗底部骰子升级用
    /**卡组的缩放 */
    scale_team = 0.85,
    /**战斗界面卡组缩放 */
    scale_fight_team = 0.7,
    /** 战斗记录和对战排位的缩放 */
    scale_battle_log = 0.75,
    /** 协同排位的缩放 */
    scale_pve = 0.35,
}