var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Config;
(function (Config) {
    /**
     * 七天好礼
     */
    var SevendayssignupCfg;
    (function (SevendayssignupCfg) {
        SevendayssignupCfg.firstDayNeedTime = 3600;
        SevendayssignupCfg.firstDay = '8_1033_1|2_1_100000|4_1_1000000';
        SevendayssignupCfg.signUpItemCfgList = [];
        SevendayssignupCfg.signUp3ItemCfgList = {};
        SevendayssignupCfg.taskItemCfgList = [];
        ;
        SevendayssignupCfg.picItemCfgList = [];
        function formatData(data) {
            if (data.firstDay) {
                SevendayssignupCfg.firstDay = data.firstDay;
                SevendayssignupCfg.firstDayNeedTime = data.firstDayNeedTime;
            }
            for (var i = 0; i < data.signUp.length; i++) {
                var itemcfg = new SignUpItemCfg();
                itemcfg.initData(data.signUp[i]);
                itemcfg.id = String(i + 1);
                SevendayssignupCfg.signUpItemCfgList.push(itemcfg);
            }
            for (var key_1 in data.allTask) {
                var id = String(Number(key_1) + 1);
                var allTaskItemCfgList = [];
                for (var i = 0; i < data.allTask[key_1].length; i++) {
                    var itemcfg = new AllTaskItemCfg();
                    itemcfg.initData(data.allTask[key_1][i]);
                    itemcfg.id = String(i + 1);
                    allTaskItemCfgList.push(itemcfg);
                }
                SevendayssignupCfg.taskItemCfgList.push({ id: id, allTaskItemCfgList: allTaskItemCfgList });
            }
            for (var i = 0; i < data.pic.length; i++) {
                var itemcfg = new PicItemCfg();
                itemcfg.initData(data.pic[i]);
                itemcfg.id = String(i + 1);
                SevendayssignupCfg.picItemCfgList.push(itemcfg);
            }
            for (var key in data.signUp3) {
                var itemCfg = void 0;
                var id = Number(key) + 1;
                if (!this.signUp3ItemCfgList[id]) {
                    this.signUp3ItemCfgList[id] = new SignUp3ItemCfg();
                }
                itemCfg = this.signUp3ItemCfgList[id];
                itemCfg.initData(data.signUp3[key]);
                itemCfg.id = id;
            }
        }
        SevendayssignupCfg.formatData = formatData;
        /** 第一个页签 的 某一天*/
        function getSignUpCfgById(id) {
            for (var key in SevendayssignupCfg.signUpItemCfgList) {
                if (SevendayssignupCfg.signUpItemCfgList[key].id == id) {
                    if (Number(id) == 1 && PlatformManager.checkIsRuSp()) {
                        SevendayssignupCfg.signUpItemCfgList[key].specialReward = Config.SevendayssignupCfg.firstDay;
                    }
                    if (Number(id) == 1 && Api.sevenDaysSignupLoginVoApi.isEnSp()) {
                        SevendayssignupCfg.signUpItemCfgList[key].specialReward = Config.SevendayssignupCfg.firstDay;
                    }
                    return SevendayssignupCfg.signUpItemCfgList[key];
                }
            }
        }
        SevendayssignupCfg.getSignUpCfgById = getSignUpCfgById;
        /** 第二个页签 的 某一天 的任务list*/
        function getTaskCfgById(id) {
            for (var key in SevendayssignupCfg.taskItemCfgList) {
                if (SevendayssignupCfg.taskItemCfgList[key].id == id) {
                    return SevendayssignupCfg.taskItemCfgList[key].allTaskItemCfgList;
                }
            }
            return null;
        }
        SevendayssignupCfg.getTaskCfgById = getTaskCfgById;
        /** 第三个页签 的 某一天 展示图片以及描述*/
        function getPicCfgById(id) {
            for (var key in SevendayssignupCfg.picItemCfgList) {
                if (SevendayssignupCfg.picItemCfgList[key].id == id) {
                    return SevendayssignupCfg.picItemCfgList[key];
                }
            }
            return null;
        }
        SevendayssignupCfg.getPicCfgById = getPicCfgById;
        function getSignup3CfgById(id) {
            return SevendayssignupCfg.signUp3ItemCfgList[id];
        }
        SevendayssignupCfg.getSignup3CfgById = getSignup3CfgById;
    })(SevendayssignupCfg = Config.SevendayssignupCfg || (Config.SevendayssignupCfg = {}));
    /**签到奖励Item */
    var SignUpItemCfg = (function (_super) {
        __extends(SignUpItemCfg, _super);
        function SignUpItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SignUpItemCfg;
    }(BaseItemCfg));
    Config.SignUpItemCfg = SignUpItemCfg;
    __reflect(SignUpItemCfg.prototype, "Config.SignUpItemCfg");
    /*每日任务Item */
    var AllTaskItemCfg = (function (_super) {
        __extends(AllTaskItemCfg, _super);
        function AllTaskItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AllTaskItemCfg;
    }(BaseItemCfg));
    Config.AllTaskItemCfg = AllTaskItemCfg;
    __reflect(AllTaskItemCfg.prototype, "Config.AllTaskItemCfg");
    /**图片数量Item */
    var PicItemCfg = (function (_super) {
        __extends(PicItemCfg, _super);
        function PicItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PicItemCfg;
    }(BaseItemCfg));
    Config.PicItemCfg = PicItemCfg;
    __reflect(PicItemCfg.prototype, "Config.PicItemCfg");
    /**每日领取奖励 */
    var SignUp3ItemCfg = (function (_super) {
        __extends(SignUp3ItemCfg, _super);
        function SignUp3ItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SignUp3ItemCfg;
    }(BaseItemCfg));
    Config.SignUp3ItemCfg = SignUp3ItemCfg;
    __reflect(SignUp3ItemCfg.prototype, "Config.SignUp3ItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=SevendayssignupCfg.js.map