var Api;
(function (Api) {
    var GameinfoVoApi;
    (function (GameinfoVoApi) {
        var gameinfoVo;
        GameinfoVoApi.curGuideId = 0;
        function formatData(data) {
            if (!gameinfoVo) {
                gameinfoVo = new GameinfoVo();
                GameinfoVoApi.curGuideId = data.newerGuild;
            }
            if (data.newerGuild == GuideCfg.rookieCfg["guideSteps"]) {
                GameinfoVoApi.curGuideId = data.newerGuild;
            }
            gameinfoVo.initData(data);
        }
        GameinfoVoApi.formatData = formatData;
        function getGnum() {
            var num = 0;
            if (gameinfoVo) {
                num = gameinfoVo.gnum;
            }
            return num;
        }
        GameinfoVoApi.getGnum = getGnum;
        function getIsBuyRoyalPass() {
            var flag = false;
            if (gameinfoVo && gameinfoVo.svip == 1) {
                flag = true;
            }
            return flag;
        }
        GameinfoVoApi.getIsBuyRoyalPass = getIsBuyRoyalPass;
        function getIsBuyAssitance() {
            var flag = false;
            if (gameinfoVo && gameinfoVo.jvip == 1) {
                flag = true;
            }
            return flag;
        }
        GameinfoVoApi.getIsBuyAssitance = getIsBuyAssitance;
        function canGetRoyalPassReward() {
            var flag = false;
            var cfg = Config.RoyalpassCfg.getRoyalPassCfgList();
            for (var i in cfg) {
                var unit = cfg[i];
                if (!isGetRoyalPassReward(unit.id) && Api.UserinfoVoApi.getMaxScore() >= unit.needScore) {
                    flag = true;
                    break;
                }
            }
            return flag;
        }
        GameinfoVoApi.canGetRoyalPassReward = canGetRoyalPassReward;
        function getRoyalFirstNotReward(score) {
            // if(getIsBuyRoyalPass()){
            var cfg = Config.RoyalpassCfg.getRoyalPassCfgList();
            var scorerst = Config.RoyalpassCfg.getNextNeedByScore(score);
            for (var i in cfg) {
                var unit = cfg[i];
                if (!isGetRoyalPassReward(unit.id) && score >= unit.needScore) {
                    scorerst = unit.needScore;
                    break;
                }
            }
            return scorerst == 0 ? 4000 : scorerst;
            // } else {
            // 	return Config.RoyalpassCfg.getNextNeedByScore(score);
            // }
        }
        GameinfoVoApi.getRoyalFirstNotReward = getRoyalFirstNotReward;
        //type 1普通 2高级
        function canGetRoyalPassRewardByLevel(level, type) {
            var flag = false;
            // 1primary 2advanced
            var unit = Config.RoyalpassCfg.getRoyalPassCfgById(level);
            var getflag = type == 1 ? (gameinfoVo.royalPass[level] && gameinfoVo.royalPass[level].primary && gameinfoVo.royalPass[level].primary == 1) : (gameinfoVo.royalPass[level] && gameinfoVo.royalPass[level].advanced && gameinfoVo.royalPass[level].advanced == 1);
            if (!getflag && Api.UserinfoVoApi.getMaxScore() >= unit.needScore) {
                flag = true;
            }
            return flag;
        }
        GameinfoVoApi.canGetRoyalPassRewardByLevel = canGetRoyalPassRewardByLevel;
        //type 1普通 2高级
        function isGetRoyalPassReward(level, type) {
            var flag = false;
            // 1primary 2advanced
            if (gameinfoVo && gameinfoVo.royalPass) {
                if (type == 1) {
                    flag = gameinfoVo.royalPass[level] && gameinfoVo.royalPass[level].primary && gameinfoVo.royalPass[level].primary == 1;
                }
                else if (type == 2) {
                    if (Api.GameinfoVoApi.getIsBuyRoyalPass()) {
                        flag = gameinfoVo.royalPass[level] && gameinfoVo.royalPass[level].advanced && gameinfoVo.royalPass[level].advanced == 1; //gameinfoVo.royalPass[level].primary && gameinfoVo.royalPass[level].primary == 1 
                    }
                }
                else {
                    if (Api.GameinfoVoApi.getIsBuyRoyalPass()) {
                        flag = gameinfoVo.royalPass[level] && gameinfoVo.royalPass[level].primary && gameinfoVo.royalPass[level].primary == 1 && gameinfoVo.royalPass[level].advanced && gameinfoVo.royalPass[level].advanced == 1;
                    }
                    else {
                        flag = gameinfoVo.royalPass[level] && gameinfoVo.royalPass[level].primary && gameinfoVo.royalPass[level].primary == 1;
                    }
                }
            }
            return flag;
        }
        GameinfoVoApi.isGetRoyalPassReward = isGetRoyalPassReward;
        function checkRedPoint() {
            var flag = false;
            if (canGetRoyalPassReward()) {
                flag = true;
            }
            return flag;
        }
        GameinfoVoApi.checkRedPoint = checkRedPoint;
        function isGetAllRoyalPassReard() {
            var flag = true;
            var cfg = Config.RoyalpassCfg.getRoyalPassCfgList();
            for (var i in cfg) {
                var unit = cfg[i];
                if (!isGetRoyalPassReward(unit.id) || Api.UserinfoVoApi.getMaxScore() < unit.needScore) {
                    flag = false;
                    break;
                }
            }
            return flag;
        }
        GameinfoVoApi.isGetAllRoyalPassReard = isGetAllRoyalPassReard;
        /**
         * 获得剩余的协同次数
         */
        function getOperationNum() {
            return Config.TogetherCfg.getOperationMaxNum() - gameinfoVo.jnum;
        }
        GameinfoVoApi.getOperationNum = getOperationNum;
        /**
         * 获取当天购买累计次数
         */
        function getOperationBuyNum() {
            return gameinfoVo.buynum;
        }
        GameinfoVoApi.getOperationBuyNum = getOperationBuyNum;
        function getIsGuiding() {
            return GameinfoVoApi.curGuideId < GuideCfg.rookieCfg["guideSteps"] && GameinfoVoApi.curGuideId >= 0;
        }
        GameinfoVoApi.getIsGuiding = getIsGuiding;
        function getIsFinishNewGuide() {
            return GameinfoVoApi.curGuideId == GuideCfg.rookieCfg["guideSteps"];
        }
        GameinfoVoApi.getIsFinishNewGuide = getIsFinishNewGuide;
        function getCurGudingId() {
            if (getIsFinishNewGuide()) {
                return gameinfoVo.stepId;
            }
            else {
                return GameinfoVoApi.curGuideId;
            }
        }
        GameinfoVoApi.getCurGudingId = getCurGudingId;
        function checlIsInGuideId(guidid) {
            return getIsGuiding() && getCurGudingId() == guidid;
        }
        GameinfoVoApi.checlIsInGuideId = checlIsInGuideId;
        function checlIsInStepId(guidid) {
            return getIsFinishNewGuide() && getCurGudingId() == guidid;
        }
        GameinfoVoApi.checlIsInStepId = checlIsInStepId;
        function setCurGudingId(num) {
            if (getIsFinishNewGuide()) {
                gameinfoVo.stepId = num;
            }
            else {
                GameinfoVoApi.curGuideId = num;
            }
        }
        GameinfoVoApi.setCurGudingId = setCurGudingId;
        //阶段性引导 升级、协作宝箱
        function getIsFinishStepGuide(guideid) {
            return Api.GameinfoVoApi.getIsFinishNewGuide() && gameinfoVo.stepGuild && gameinfoVo.stepGuild[guideid];
            // gameinfoVo.curGuideId = num;
        }
        GameinfoVoApi.getIsFinishStepGuide = getIsFinishStepGuide;
        //游戏注册时间
        function getRegdt() {
            return gameinfoVo ? gameinfoVo.regdt : 0;
        }
        GameinfoVoApi.getRegdt = getRegdt;
        function getADhuo() {
            return gameinfoVo && (gameinfoVo.zengfu == 1);
        }
        GameinfoVoApi.getADhuo = getADhuo;
        function dispose() {
            if (gameinfoVo) {
                gameinfoVo.dispose();
                GameinfoVoApi.curGuideId = 0;
                gameinfoVo = null;
            }
        }
        GameinfoVoApi.dispose = dispose;
    })(GameinfoVoApi = Api.GameinfoVoApi || (Api.GameinfoVoApi = {}));
})(Api || (Api = {}));
//# sourceMappingURL=GameinfoVoApi.js.map