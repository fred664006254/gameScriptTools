var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var QuestionnaireCfg = (function () {
            function QuestionnaireCfg() {
            }
            /**
             * 初始化数据
             */
            QuestionnaireCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                }
            };
            QuestionnaireCfg.prototype.getQuestiuonCfgById = function (id) {
                var questionCfg = null;
                if (this.questionList && this.questionList[id - 1]) {
                    questionCfg = this.questionList[id - 1];
                }
                return questionCfg;
            };
            return QuestionnaireCfg;
        }());
        AcCfg.QuestionnaireCfg = QuestionnaireCfg;
        __reflect(QuestionnaireCfg.prototype, "Config.AcCfg.QuestionnaireCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=QuestionnaireCfg.js.map