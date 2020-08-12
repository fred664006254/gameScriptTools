var Api;
(function (Api) {
    var BattlelogVoApi;
    (function (BattlelogVoApi) {
        var battleloVo;
        var lastidx = -1;
        function formatData(data) {
            if (!battleloVo) {
                battleloVo = new BattlelogVo();
            }
            battleloVo.initData(data);
        }
        BattlelogVoApi.formatData = formatData;
        function getbattleLog() {
            var arr = [];
            if (battleloVo && battleloVo.info && battleloVo.info.length) {
                arr = battleloVo.info;
            }
            return arr;
        }
        BattlelogVoApi.getbattleLog = getbattleLog;
        function setlastindex(id) {
            lastidx = id;
        }
        BattlelogVoApi.setlastindex = setlastindex;
        function getlastidx() {
            return lastidx;
        }
        BattlelogVoApi.getlastidx = getlastidx;
        function dispose() {
            if (battleloVo) {
                battleloVo.dispose();
                battleloVo = null;
            }
            lastidx = -1;
        }
        BattlelogVoApi.dispose = dispose;
    })(BattlelogVoApi = Api.BattlelogVoApi || (Api.BattlelogVoApi = {}));
})(Api || (Api = {}));
//# sourceMappingURL=BattlelogVoApi.js.map