var Api;
(function (Api) {
    var SigninfoVoApi;
    (function (SigninfoVoApi) {
        var signinfoVo;
        function formatData(data) {
            if (!signinfoVo) {
                signinfoVo = new SignInfoVo();
            }
            signinfoVo.initData(data);
        }
        SigninfoVoApi.formatData = formatData;
        /**
         * 获取改名次数
         */
        function getRenameNum() {
            var num = 0;
            if (signinfoVo && signinfoVo.renameNum) {
                num = signinfoVo.renameNum;
            }
            return num;
        }
        SigninfoVoApi.getRenameNum = getRenameNum;
        function getReWordData() {
            var signDay = parseInt(String(signinfoVo.days % 7));
            if (signDay == 0) {
                signDay = 7;
            }
            if (this.getSignWeek()) {
                return Config.SignCfg.getSignInfoByID(String(signDay + 7));
            }
            else {
                return Config.SignCfg.getSignInfoByID(String(signDay));
            }
        }
        SigninfoVoApi.getReWordData = getReWordData;
        //展示七日奖励
        function getShowWordData() {
            if (this.getSignWeek()) {
                return Config.SignCfg.getSignInfoByID(String(14));
            }
            else {
                return Config.SignCfg.getSignInfoByID(String(7));
            }
        }
        SigninfoVoApi.getShowWordData = getShowWordData;
        //判断签到是否过一周
        function getSignWeek() {
            if (signinfoVo) {
                if (signinfoVo.days == 7 && signinfoVo.hasSign == 0) {
                    return true;
                }
                if (signinfoVo.days > 7) {
                    return true;
                }
            }
            return false;
        }
        SigninfoVoApi.getSignWeek = getSignWeek;
        //判断是否是第七天
        function isSignWeek() {
            if (signinfoVo) {
                if (parseInt(String(signinfoVo.days % 7)) == 6) {
                    return true;
                }
            }
            return false;
        }
        SigninfoVoApi.isSignWeek = isSignWeek;
        //判断是否已签到
        function getSignCom(days) {
            var signCom = getSignDay();
            var signDay = parseInt(String(days % 7));
            if (signCom + 1 == signDay && signinfoVo.hasSign == 0) {
                return true;
            }
            else {
                return false;
            }
        }
        SigninfoVoApi.getSignCom = getSignCom;
        //判断是否是签到日
        function getSign(days) {
            var signCom = getSignDay();
            var signDay = parseInt(String(days % 7));
            if (signCom == 0 && signinfoVo.hasSign == 1) {
                return true;
            }
            if (signCom >= signDay) {
                return true;
            }
            else {
                return false;
            }
        }
        SigninfoVoApi.getSign = getSign;
        function getSignSeven() {
            var signCom = getSignDay();
            if (signCom == 0 && signinfoVo.hasSign == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        SigninfoVoApi.getSignSeven = getSignSeven;
        function getSignDay() {
            if (signinfoVo) {
                var signDay = parseInt(String(signinfoVo.days % 7));
                return signDay;
            }
            return null;
        }
        SigninfoVoApi.getSignDay = getSignDay;
        function getSignData() {
            if (this.getSignWeek()) {
                return Config.SignCfg.getSgnLoopIDs();
            }
            else {
                return Config.SignCfg.getSgnIDs();
            }
        }
        SigninfoVoApi.getSignData = getSignData;
        function getSignInfoByID(id) {
            return Config.SignCfg.getSignInfoByID(id);
        }
        SigninfoVoApi.getSignInfoByID = getSignInfoByID;
        function gethasSign() {
            console.log(signinfoVo.hasSign);
            if (signinfoVo && Number(signinfoVo.hasSign) == 0) {
                return false;
            }
            else {
                return true;
            }
        }
        SigninfoVoApi.gethasSign = gethasSign;
        //icon是否可点击
        function getSignTou(day) {
            var signCom = getSignDay();
            var signDay = parseInt(String(day % 7));
            if (Number(signinfoVo.hasSign) == 0) {
                if (signCom + 1 < signDay) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                if (signDay == 0) {
                    return false;
                }
                if (signCom < signDay) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        SigninfoVoApi.getSignTou = getSignTou;
        //获取红点信息
        function getSignHsa() {
            if (signinfoVo) {
                if (signinfoVo.hasSign == 0) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        SigninfoVoApi.getSignHsa = getSignHsa;
        /**
         * 获取首冲状态
         * 0 未首冲;
         * 1 已首冲，未领奖;
         * 2 已首冲，已领奖;
         */
        function isFirstRecharge() {
            return signinfoVo ? signinfoVo.payFlag : 0;
        }
        SigninfoVoApi.isFirstRecharge = isFirstRecharge;
        //是否展示金币
        function getShowBool(type) {
            if (type == 1 || type == 2) {
                return true;
            }
            else {
                return false;
            }
        }
        SigninfoVoApi.getShowBool = getShowBool;
    })(SigninfoVoApi = Api.SigninfoVoApi || (Api.SigninfoVoApi = {}));
})(Api || (Api = {}));
//# sourceMappingURL=SigninfoVoApi.js.map