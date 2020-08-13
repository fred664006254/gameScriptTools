var Config;
(function (Config) {
    var QuestionnaireCfg;
    (function (QuestionnaireCfg) {
        var newQuestionCfg = {};
        function formatData(data) {
            // newQuestionCfg = {};
            // for (var key in data) {
            //     let itemCfg: QuestionnaireItemCfg;
            //     if (!newQuestionCfg.hasOwnProperty(String(key))) {
            //         newQuestionCfg[String(key)] = new QuestionnaireItemCfg();
            //     }
            //     itemCfg = newQuestionCfg[String(key)];
            //     itemCfg.initData(data[key]);
            // }
            newQuestionCfg = data;
        }
        QuestionnaireCfg.formatData = formatData;
        function getList() {
            var arr = [], list = newQuestionCfg["poolList"];
            for (var key in list) {
                var item = {
                    itemId: Number(key),
                    answerNum: list[key].answerNum,
                    multipleChoice: list[key].multipleChoice
                };
                arr.push(item);
            }
            return arr;
        }
        QuestionnaireCfg.getList = getList;
        function getReward() {
            return newQuestionCfg["gemReward"];
        }
        QuestionnaireCfg.getReward = getReward;
    })(QuestionnaireCfg = Config.QuestionnaireCfg || (Config.QuestionnaireCfg = {}));
    // class QuestionnaireItemCfg extends BaseItemCfg {
    //     answerNum: number
    //     multipleChoice: number
    // }
})(Config || (Config = {}));
