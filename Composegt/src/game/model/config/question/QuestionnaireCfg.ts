namespace Config {
    export namespace QuestionnaireCfg {
        let newQuestionCfg: Object = {};
        export function formatData(data: any): void {
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
        export function getList(): QuestionnaireItem[] {
            let arr = [], list = newQuestionCfg["poolList"];
            for (let key in list) {//待改正
                let item: QuestionnaireItem = {
                    itemId: Number(key),
                    answerNum: list[key].answerNum,
                    multipleChoice: list[key].multipleChoice
                };
                arr.push(item);
            }
            return arr;
        }
        export function getReward() {
            return newQuestionCfg["gemReward"];
        }
    }
    export interface QuestionnaireItem {
        itemId: number,
        answerNum: number,
        multipleChoice: number
    }
    // class QuestionnaireItemCfg extends BaseItemCfg {
    //     answerNum: number
    //     multipleChoice: number
    // }
}