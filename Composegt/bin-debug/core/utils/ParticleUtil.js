var App;
(function (App) {
    var ParticleUtil;
    (function (ParticleUtil) {
        /**
         * 获取粒子动画
         * @param resName png文件名
         * @param jsonName json文件名，可选，默认规则是，renName_json文件名，多个配置公用同一个png时候需要传json名
         */
        function getParticle(resName, jsonName) {
            var texture = ResourceManager.getRes(resName);
            var config = null;
            if (RES.hasRes(resName + "_json")) {
                config = ResourceManager.getRes(resName + "_json");
            }
            else {
                config = ResourceManager.getRes(jsonName);
            }
            var systemParticle = new particle.GravityParticleSystem(texture, config);
            return systemParticle;
        }
        ParticleUtil.getParticle = getParticle;
    })(ParticleUtil = App.ParticleUtil || (App.ParticleUtil = {}));
})(App || (App = {}));
