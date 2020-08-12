/**
 * 图层管理
 * author 陈可
 * date 2017/9/8
 * @class LayerManager
 */
var LayerMgr;
(function (LayerMgr) {
    /**
     * 游戏的Main类
     */
    LayerMgr.mainIns = undefined;
    /**
     * 场景，地图，建筑等最底层图层
     */
    LayerMgr.bgLayer = undefined;
    /**
     * 主UI等标题栏，菜单栏等界面图层
     */
    LayerMgr.uiLayer = undefined;
    /**
     * 功能界面图层
     */
    LayerMgr.panelLayer = undefined;
    /**
     * loading，全屏遮罩图层
     */
    LayerMgr.maskLayer = undefined;
    /**
     * 引导层级
     */
    LayerMgr.guideLayer = undefined;
    /**
     * 提示，警告等游戏提示图层
     */
    LayerMgr.msgLayer = undefined;
    /**
     * 初始化游戏图层
     * @param layerContiner 图层父容器
     */
    function initLayer(layerContiner) {
        LayerMgr.mainIns = layerContiner;
        LayerMgr.bgLayer = new BaseDisplayObjectContainer();
        LayerMgr.uiLayer = new BaseDisplayObjectContainer();
        LayerMgr.panelLayer = new BaseDisplayObjectContainer();
        LayerMgr.maskLayer = new BaseDisplayObjectContainer();
        LayerMgr.guideLayer = new BaseDisplayObjectContainer();
        LayerMgr.msgLayer = new BaseDisplayObjectContainer();
        layerContiner.addChild(LayerMgr.bgLayer);
        layerContiner.addChild(LayerMgr.uiLayer);
        layerContiner.addChild(LayerMgr.panelLayer);
        layerContiner.addChild(LayerMgr.maskLayer);
        layerContiner.addChild(LayerMgr.guideLayer);
        layerContiner.addChild(LayerMgr.msgLayer);
        if (App.DeviceUtil.checkIsFullscreen()) {
            var layerY = (GameConfig.stage.stageHeight - GameConfig.stageHeigth) * 0.5;
            LayerMgr.bgLayer.y = layerY;
            LayerMgr.uiLayer.y = layerY;
            LayerMgr.panelLayer.y = layerY;
            LayerMgr.maskLayer.y = layerY;
            LayerMgr.msgLayer.y = layerY;
            LayerMgr.guideLayer.y = layerY;
            GameData.layerPosY = layerY;
        }
        else if (App.DeviceUtil.checkIsIpadScreen() || GameConfig.stage.scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
            var layerX = (GameConfig.stage.stageWidth - GameConfig.stageWidth) / 2;
            LayerMgr.bgLayer.x = layerX;
            LayerMgr.uiLayer.x = layerX;
            LayerMgr.panelLayer.x = layerX;
            LayerMgr.maskLayer.x = layerX;
            LayerMgr.msgLayer.x = layerX;
            LayerMgr.guideLayer.x = layerX;
            GameData.layerPosX = layerX;
        }
        if (PlatMgr.checkIsTest() || PlatMgr.checkIsLocal()) {
            var testTxt = ComponentMgr.getTextField("T", 35);
            testTxt.touchEnabled = false;
            LayerMgr.msgLayer.addChild(testTxt);
            if ((App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) && LocalStorageMgr.get("gametest1000")) {
                var testSp = new BaseShape();
                testSp.graphics.beginFill(0, 0.5);
                testSp.graphics.drawRoundRect(0, 0, 80, 40, 5, 5);
                testSp.graphics.endFill();
                LayerMgr.msgLayer.addChild(testSp);
                testSp.setPosition(0, 500);
                testSp.addTouchTap(function (e) {
                    App.CommonUtil.checkAndJumpToBack();
                }, LayerMgr);
                var text = ComponentMgr.getTextField("切回正式", 14);
                text.setPosition(testSp.x + (testSp.width - text.width) / 2, testSp.y + (testSp.height - text.height) / 2);
                LayerMgr.msgLayer.addChild(text);
            }
        }
    }
    LayerMgr.initLayer = initLayer;
})(LayerMgr || (LayerMgr = {}));
//# sourceMappingURL=LayerMgr.js.map