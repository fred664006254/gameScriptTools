/**
 * 商店voapi
 * author:qianjun
 */
var Api;
(function (Api) {
    var InviteFriendVoApi;
    (function (InviteFriendVoApi) {
        var invitefriendVo;
        function formatData(data) {
            if (!invitefriendVo) {
                invitefriendVo = new InviteFriendVo();
            }
            invitefriendVo.initData(data);
        }
        InviteFriendVoApi.formatData = formatData;
        function dispose() {
            if (invitefriendVo) {
                invitefriendVo.dispose();
                invitefriendVo = null;
            }
        }
        InviteFriendVoApi.dispose = dispose;
        function getMyCode() {
            return invitefriendVo ? invitefriendVo.code : "";
        }
        InviteFriendVoApi.getMyCode = getMyCode;
        function getMyScore() {
            return invitefriendVo ? invitefriendVo.score : 0;
        }
        InviteFriendVoApi.getMyScore = getMyScore;
        function getIsFinishBind() {
            var flag = false;
            if (invitefriendVo && invitefriendVo.iuid) {
                flag = invitefriendVo.iuid > 0;
            }
            return flag;
        }
        InviteFriendVoApi.getIsFinishBind = getIsFinishBind;
        function checkRedPoint() {
            var flag = false;
            if (canGetInviteReward()) {
                flag = true;
            }
            return flag;
        }
        InviteFriendVoApi.checkRedPoint = checkRedPoint;
        function canGetInviteReward(id) {
            if (id === void 0) { id = 0; }
            var flag = false;
            var score = getMyScore();
            if (id) {
                var unit = Config.InvitefriendCfg.getInviteRewardItemById(id);
                if (unit && unit.needPoint <= score && !isGetReward(id)) {
                    flag = true;
                }
            }
            else {
                var len = Config.InvitefriendCfg.getRewardMaxNum();
                for (var i = 1; i <= len; ++i) {
                    var unit = Config.InvitefriendCfg.getInviteRewardItemById(i);
                    if (unit && unit.needPoint <= score && !isGetReward(i)) {
                        flag = true;
                        break;
                    }
                }
            }
            return flag;
        }
        InviteFriendVoApi.canGetInviteReward = canGetInviteReward;
        function getCurJinduId() {
            var len = Config.InvitefriendCfg.getRewardMaxNum();
            var score = getMyScore();
            var id = 0;
            for (var i = 1; i <= len; ++i) {
                var unit = Config.InvitefriendCfg.getInviteRewardItemById(i);
                if (unit && unit.needPoint <= score) {
                    id = i;
                }
            }
            return id;
        }
        InviteFriendVoApi.getCurJinduId = getCurJinduId;
        function isGetReward(id) {
            var flag = false;
            if (invitefriendVo && invitefriendVo.rinfo[id]) {
                flag = invitefriendVo.rinfo[id] == 1;
            }
            return flag;
        }
        InviteFriendVoApi.isGetReward = isGetReward;
    })(InviteFriendVoApi = Api.InviteFriendVoApi || (Api.InviteFriendVoApi = {}));
})(Api || (Api = {}));
//# sourceMappingURL=InviteFriendVoApi.js.map