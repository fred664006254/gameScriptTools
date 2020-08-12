var BattleFrameHelper;
(function (BattleFrameHelper) {
    var lastFrameT = 0;
    var timeOutFrame = 0;
    var startTotalFrame = 0;
    var checkValue = 50;
    var isEnough = false;
    var hasEvt = false;
    function startCheck() {
        if ((!isEnough) && (!hasEvt)) {
            hasEvt = true;
            GameConfig.stage.addEventListener(egret.Event.ENTER_FRAME, checkStopEffect, BattleFrameHelper);
        }
    }
    BattleFrameHelper.startCheck = startCheck;
    function removeEvt() {
        hasEvt = false;
        GameConfig.stage.removeEventListener(egret.Event.ENTER_FRAME, checkStopEffect, BattleFrameHelper);
    }
    function checkStopEffect(e) {
        if (isEnough) {
            return isEnough;
        }
        var t = egret.getTimer();
        if (!lastFrameT) {
            lastFrameT = t;
        }
        else {
            if (t - lastFrameT > checkValue) {
                timeOutFrame++;
            }
            startTotalFrame++;
            if (startTotalFrame == 100) {
                if ((timeOutFrame / startTotalFrame) >= 0.5) {
                    removeEvt();
                    isEnough = true;
                    BattleStatus.stopActEffect = isEnough;
                }
                else {
                    startTotalFrame = 0;
                    timeOutFrame = 0;
                }
            }
            lastFrameT = t;
        }
        return isEnough;
    }
})(BattleFrameHelper || (BattleFrameHelper = {}));
//# sourceMappingURL=BattleFrameHelper.js.map