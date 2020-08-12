/**
 * 商店voapi
 * author:qianjun
 */
var Api;
(function (Api) {
    var FairArenaVoApi;
    (function (FairArenaVoApi) {
        var fairarenaVo;
        var freshFairarena = true;
        FairArenaVoApi.tweenPro = false;
        /**记录上一次打开的活动界面 */
        FairArenaVoApi.sceneName = "active";
        function formatData(data) {
            if (!fairarenaVo) {
                fairarenaVo = new FairArenaVo();
            }
            fairarenaVo.initData(data);
        }
        FairArenaVoApi.formatData = formatData;
        function dispose() {
            if (fairarenaVo) {
                fairarenaVo.dispose();
                fairarenaVo = null;
            }
            freshFairarena = true;
            FairArenaVoApi.sceneName = "active";
        }
        FairArenaVoApi.dispose = dispose;
        // 设置刷新开关
        function setFreshFair(value) {
            if (value == freshFairarena) {
                return;
            }
            freshFairarena = value;
            if (freshFairarena) {
                App.MsgHelper.dispEvt(MsgConst.MODEL_FAIRARENA);
            }
        }
        FairArenaVoApi.setFreshFair = setFreshFair;
        function getFreshFair() {
            return freshFairarena;
        }
        FairArenaVoApi.getFreshFair = getFreshFair;
        //是否开启了jjc
        function isJoinJJC() {
            var flag = false;
            if (fairarenaVo && fairarenaVo.status == 2) {
                flag = true;
            }
            return flag; //flag;
        }
        FairArenaVoApi.isJoinJJC = isJoinJJC;
        //获取胜利场次
        function getWinNum() {
            var num = 0;
            if (fairarenaVo && fairarenaVo.winNum) {
                num = fairarenaVo.winNum;
            }
            return num;
        }
        FairArenaVoApi.getWinNum = getWinNum;
        //获取失败场次
        function getLoseNum() {
            var num = 0;
            if (fairarenaVo && fairarenaVo.loseNum) {
                num = fairarenaVo.loseNum;
            }
            return num;
        }
        FairArenaVoApi.getLoseNum = getLoseNum;
        /**
         * 返回选择队列
         */
        function getLine() {
            var line = [];
            if (fairarenaVo && fairarenaVo.line) {
                line = fairarenaVo.line;
                for (var idx = 0; idx < line.length; idx++) {
                    line[idx]["showLevel"] = 2;
                }
            }
            return line;
        }
        FairArenaVoApi.getLine = getLine;
        function getFairModle() {
            return fairarenaVo;
        }
        FairArenaVoApi.getFairModle = getFairModle;
        /**
         * index 从 1 开始
         * @param index
         */
        function getDicePoolInfo(index) {
            var poolinfo = {};
            if (fairarenaVo && fairarenaVo.pool) {
                poolinfo = fairarenaVo.pool[index];
            }
            return poolinfo;
        }
        FairArenaVoApi.getDicePoolInfo = getDicePoolInfo;
        function getCurDicePool() {
            if (!fairarenaVo)
                return null;
            var num = Math.min(fairarenaVo.line.length, 4);
            return getDicePoolInfo(num + 1)["list"];
        }
        FairArenaVoApi.getCurDicePool = getCurDicePool;
        /**
         * 判断是否有还未领取的奖励
         */
        function getHasReward() {
            var flag = false;
            if (fairarenaVo) {
                var winnum = fairarenaVo.winNum;
                var reward = fairarenaVo.rewards;
                var keys = Object.keys(reward);
                if (winnum > 0 && winnum > keys.length) {
                    flag = true;
                }
            }
            return flag;
        }
        FairArenaVoApi.getHasReward = getHasReward;
        /**
         * 返回 item 的状态
         * 1 已经领取
         * 2 未领取
         * 3 不可领取
         */
        function getRewardStatusByID(id) {
            if (!fairarenaVo) {
                return 3;
            }
            if (!fairarenaVo.rewards) {
                return 3;
            }
            if (id > fairarenaVo.winNum) {
                return 3;
            }
            if (!fairarenaVo.rewards[id]) {
                return 2;
            }
            if (fairarenaVo.rewards[id] == 1) {
                return 1;
            }
        }
        FairArenaVoApi.getRewardStatusByID = getRewardStatusByID;
        function getFirstReward() {
            var idx = 0;
            var winnum = fairarenaVo.winNum;
            if (winnum > 0) {
                var rewards = fairarenaVo.rewards;
                for (var index = 1; index <= winnum; index++) {
                    if (!(rewards[index] && rewards[index] == 1)) {
                        idx = index;
                        break;
                    }
                }
            }
            return idx;
        }
        FairArenaVoApi.getFirstReward = getFirstReward;
    })(FairArenaVoApi = Api.FairArenaVoApi || (Api.FairArenaVoApi = {}));
})(Api || (Api = {}));
//# sourceMappingURL=FairArenaVoApi.js.map