/**
 * 主界面解锁配置
 */
var MainUIUnLockCfg;
(function (MainUIUnLockCfg) {
    /**
     * 主界面解锁配置
     */
    var mainUIUnLockCfg = {
        "newGuideStep": 2,
        "mainuiTop": 1,
        "mainuiBottom": 1,
        "mianuiGold": 2,
        "mianuiRecruit": 1,
        "mianuiTask": 1,
        "mainuiSoldierFood": 5,
        "mainuiChallenge": 9,
        "mainuiLevy": 8,
        "mainuiServant": 7,
        "mainuiCity": 9,
    };
    function getMainUIUnLockCfg() {
        return mainUIUnLockCfg;
    }
    MainUIUnLockCfg.getMainUIUnLockCfg = getMainUIUnLockCfg;
    function getMainUIUnLockCfgByKey(key) {
        return mainUIUnLockCfg[key];
    }
    MainUIUnLockCfg.getMainUIUnLockCfgByKey = getMainUIUnLockCfgByKey;
    function getIsUnLockByKey(key) {
        var unlockIndex = MainUI.getInstance().getUnlockIndex();
        return unlockIndex >= mainUIUnLockCfg[key];
    }
    MainUIUnLockCfg.getIsUnLockByKey = getIsUnLockByKey;
})(MainUIUnLockCfg || (MainUIUnLockCfg = {}));
