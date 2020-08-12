var Api;
(function (Api) {
    var LineVoApi;
    (function (LineVoApi) {
        var lineVo;
        function formatData(data) {
            if (!lineVo) {
                lineVo = new LineVo();
            }
            lineVo.initData(data);
        }
        LineVoApi.formatData = formatData;
        function getCurLine() {
            return lineVo ? lineVo.cur : 1;
        }
        LineVoApi.getCurLine = getCurLine;
        function getCurLineInfo() {
            return lineVo ? lineVo["info" + lineVo.cur] : null;
        }
        LineVoApi.getCurLineInfo = getCurLineInfo;
        function getLineInfoById(lineid) {
            return lineVo ? lineVo["info" + lineid] : null;
        }
        LineVoApi.getLineInfoById = getLineInfoById;
        function getDiceIsInLineById(dice, lineid) {
            var flag = false;
            if (lineVo && lineVo["info" + lineid]) {
                for (var i in lineVo["info" + lineid]) {
                    if (String(dice) === String(lineVo["info" + lineid][i].id)) {
                        flag = true;
                        break;
                    }
                }
            }
            return flag;
        }
        LineVoApi.getDiceIsInLineById = getDiceIsInLineById;
        function getHadSkins() {
            return lineVo ? lineVo.scene : null;
        }
        LineVoApi.getHadSkins = getHadSkins;
        function getUseSkinID() {
            return lineVo ? lineVo.sid : null;
        }
        LineVoApi.getUseSkinID = getUseSkinID;
        function getNotHadSkins() {
            var tem = [];
            var allSkins = Config.BattleskinCfg.getSkinIDs();
            var hads = lineVo.scene;
            for (var index = 0; index < allSkins.length; index++) {
                var item = allSkins[index];
                if (index == 0 || hads.indexOf(item) >= 0)
                    continue;
                tem.push(item);
            }
            return tem;
        }
        LineVoApi.getNotHadSkins = getNotHadSkins;
        function getCurSkin() {
            return lineVo ? lineVo.sid : null;
        }
        LineVoApi.getCurSkin = getCurSkin;
        function dispose() {
            if (lineVo) {
                lineVo.dispose();
                lineVo = null;
            }
        }
        LineVoApi.dispose = dispose;
    })(LineVoApi = Api.LineVoApi || (Api.LineVoApi = {}));
})(Api || (Api = {}));
//# sourceMappingURL=LineVoApi.js.map