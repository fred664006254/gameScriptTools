/**
 * 七日签到配置
 * author jiangliuyang
 * date 2018/10/23
 * @class SignUpCfg
 */
var Config;
(function (Config) {
    var SignupCfg;
    (function (SignupCfg) {
        var signup = {};
        var signupReward = {};
        var signupRewardShared = {};
        function formatData(data) {
            for (var key in data) {
                if (key == "signup") {
                    signup = data["signup"];
                }
                if (key == "signupReward") {
                    signupReward = data["signupReward"];
                }
                if (key == "signupRewardShared") {
                    signupRewardShared = data["signupRewardShared"];
                }
            }
        }
        SignupCfg.formatData = formatData;
        function getSignup() {
            return signup;
        }
        SignupCfg.getSignup = getSignup;
        function getSignupReward() {
            return signupReward;
        }
        SignupCfg.getSignupReward = getSignupReward;
        function getSignupRewardShared() {
            return signupRewardShared;
        }
        SignupCfg.getSignupRewardShared = getSignupRewardShared;
    })(SignupCfg = Config.SignupCfg || (Config.SignupCfg = {}));
})(Config || (Config = {}));
