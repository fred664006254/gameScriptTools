/**
 * 图层管理
 * author 陈可
 * date 2017/9/8
 * @class LayerManager
 */
var LayerManager;
(function (LayerManager) {
    /**
     * 场景，地图，建筑等最底层图层
     */
    LayerManager.bgLayer = undefined;
    /**
     * 主UI等标题栏，菜单栏等界面图层
     */
    LayerManager.uiLayer = undefined;
    /**
     * 功能界面图层
     */
    LayerManager.panelLayer = undefined;
    /**
     * loading，全屏遮罩图层
     */
    LayerManager.maskLayer = undefined;
    /**
     * 提示，警告等游戏提示图层
     */
    LayerManager.msgLayer = undefined;
    /**
     * 初始化游戏图层
     * @param layerContiner 图层父容器
     */
    function initLayer(layerContiner) {
        LayerManager.bgLayer = new BaseDisplayObjectContainer();
        LayerManager.uiLayer = new BaseDisplayObjectContainer();
        LayerManager.panelLayer = new BaseDisplayObjectContainer();
        LayerManager.maskLayer = new BaseDisplayObjectContainer();
        LayerManager.msgLayer = new BaseDisplayObjectContainer();
        // if(PlatformManager.checkIsFB())
        // {
        // 	let bg:BaseShape=new BaseShape();
        // 	bg.graphics.beginFill(0x131F2C);
        // 	bg.graphics.drawRect(0,0,GameConfig.stage.stageWidth,GameConfig.stage.stageHeight);
        // 	GameConfig.stage.addChildAt(bg,0);
        // }
        layerContiner.addChild(LayerManager.bgLayer);
        layerContiner.addChild(LayerManager.uiLayer);
        layerContiner.addChild(LayerManager.panelLayer);
        layerContiner.addChild(LayerManager.maskLayer);
        layerContiner.addChild(LayerManager.msgLayer);
        if (App.DeviceUtil.checkIsFullscreen()) {
            var layerY = (GameConfig.stage.stageHeight - GameConfig.stageHeigth) * 0.5;
            LayerManager.bgLayer.y = layerY;
            LayerManager.uiLayer.y = layerY;
            LayerManager.panelLayer.y = layerY;
            LayerManager.maskLayer.y = layerY;
            LayerManager.msgLayer.y = layerY;
            GameData.layerPosY = layerY;
        }
        if (PlatformManager.checkIsTest() || PlatformManager.checkIsLocal()) {
            var testTxt = ComponentManager.getTextField("T", 20);
            testTxt.touchEnabled = false;
            LayerManager.msgLayer.addChild(testTxt);
            if ((App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) && LocalStorageManager.get("gametest1000")) {
                var testSp = new BaseShape();
                testSp.graphics.beginFill(0, 0.5);
                testSp.graphics.drawRoundRect(0, 0, 80, 40, 5, 5);
                testSp.graphics.endFill();
                LayerManager.msgLayer.addChild(testSp);
                testSp.setPosition(0, 500);
                testSp.addTouchTap(function (e) {
                    App.CommonUtil.checkAndJumpToBack();
                }, LayerManager);
                var text = ComponentManager.getTextField("切回正式", 14);
                text.setPosition(testSp.x + (testSp.width - text.width) / 2, testSp.y + (testSp.height - text.height) / 2);
                LayerManager.msgLayer.addChild(text);
            }
        }
    }
    LayerManager.initLayer = initLayer;
    function getParentLayer(display) {
        var stage = GameConfig.stage;
        var stageChildNum = stage.numChildren;
        for (var i = 0; i < stageChildNum; i++) {
            var stageChild = stage.getChildAt(i);
            if (stageChild instanceof egret.DisplayObjectContainer) {
                var num = stageChild.numChildren;
                for (var index = 0; index < num; index++) {
                    var displayContainer = stageChild.getChildAt(index);
                    if (displayContainer instanceof egret.DisplayObjectContainer) {
                        if (displayContainer.contains(display)) {
                            return displayContainer;
                        }
                    }
                }
            }
        }
        return GameConfig.stage;
    }
    LayerManager.getParentLayer = getParentLayer;
    /**
     * 隐藏游戏图层
     * 用于ar
     */
    function hideLayer() {
        LayerManager.bgLayer.visible = false;
        LayerManager.uiLayer.visible = false;
        LayerManager.panelLayer.visible = false;
        LayerManager.msgLayer.visible = false;
        LayerManager.maskLayer.visible = false;
    }
    LayerManager.hideLayer = hideLayer;
    /**
     * 显示游戏图层
     * 用于ar
     */
    function showLayer() {
        LayerManager.bgLayer.visible = true;
        LayerManager.uiLayer.visible = true;
        LayerManager.panelLayer.visible = true;
        LayerManager.msgLayer.visible = true;
        LayerManager.maskLayer.visible = true;
    }
    LayerManager.showLayer = showLayer;
})(LayerManager || (LayerManager = {}));
