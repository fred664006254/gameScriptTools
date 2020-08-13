var App;
(function (App) {
    var DragonBonesUtil;
    (function (DragonBonesUtil) {
        function getDragonBones(dbName) {
            var dragonbonesData = ResourceManager.getRes(dbName + "_ske");
            var textureData = ResourceManager.getRes(dbName + "_tex_json");
            var texture = ResourceManager.getRes(dbName + "_tex_png");
            if (!dragonbonesData || !textureData || !texture) {
                return null;
            }
            var egretFactory = dragonBones.EgretFactory.factory;
            if (!egretFactory.getDragonBonesData(dbName) || !egretFactory.getTextureAtlasData(dbName)) {
                removeDragonBones(dbName);
            }
            if (!egretFactory.getDragonBonesData(dbName)) {
                egretFactory.parseDragonBonesData(dragonbonesData);
            }
            if (!egretFactory.getTextureAtlasData(dbName)) {
                egretFactory.parseTextureAtlasData(textureData, texture);
            }
            var armatureDisplay = egretFactory.buildArmatureDisplay(dbName);
            // armatureDisplay.animation.play("run",0);
            return armatureDisplay;
        }
        DragonBonesUtil.getDragonBones = getDragonBones;
        function removeDragonBones(dbName) {
            var egretFactory = dragonBones.EgretFactory.factory;
            egretFactory.removeDragonBonesData(dbName);
            egretFactory.removeTextureAtlasData(dbName);
        }
        DragonBonesUtil.removeDragonBones = removeDragonBones;
        function getLoadDragonBones(dbName, playTimes, idle, completeFunc, completeObj) {
            if (playTimes === void 0) { playTimes = 0; }
            if (idle === void 0) { idle = "idle"; }
            return new BaseLoadDragonBones(dbName, playTimes, idle, completeFunc, completeObj);
        }
        DragonBonesUtil.getLoadDragonBones = getLoadDragonBones;
        function clear() {
            var egretFactory = dragonBones.EgretFactory.factory;
            if (egretFactory) {
                egretFactory.clear();
            }
        }
        DragonBonesUtil.clear = clear;
    })(DragonBonesUtil = App.DragonBonesUtil || (App.DragonBonesUtil = {}));
})(App || (App = {}));
//# sourceMappingURL=DragonBonesUtil.js.map