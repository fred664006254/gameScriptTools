/**
 * 红点api
 */
var Api;
(function (Api) {
    var RedpointVoApi;
    (function (RedpointVoApi) {
        var redpointVo;
        var initRedpoint = null;
        function checkHaveRedPointByAid(aid, type) {
            var flag = false;
            if (this.redpointVo) {
                flag = this.redpointVo.checkHavePointByAid(aid, type);
            }
            return flag;
        }
        RedpointVoApi.checkHaveRedPointByAid = checkHaveRedPointByAid;
        function formatInitRedpoint(data) {
            this.initRedpoint = data;
        }
        RedpointVoApi.formatInitRedpoint = formatInitRedpoint;
        /**
         * 检测红点,暂时只支持initRedpoint字段，后续功能统一红点需扩展
         * @param model
         */
        function checkRedPoint(model) {
            return !!this.initRedpoint[model];
        }
        RedpointVoApi.checkRedPoint = checkRedPoint;
        function setRedPointStatus(model, status) {
            this.initRedpoint[model] = status;
        }
        RedpointVoApi.setRedPointStatus = setRedPointStatus;
        function dispose() {
            this.initRedpoint = null;
            this.redpointVo = null;
        }
        RedpointVoApi.dispose = dispose;
    })(RedpointVoApi = Api.RedpointVoApi || (Api.RedpointVoApi = {}));
})(Api || (Api = {}));
//# sourceMappingURL=RedpointVoApi.js.map