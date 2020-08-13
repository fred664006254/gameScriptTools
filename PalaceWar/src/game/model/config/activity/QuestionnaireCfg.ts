namespace Config {
    export namespace AcCfg {
        export class QuestionnaireCfg {
            /**奖 */
            public getReward:string;
            /**总问题数 */
            public questionNum:number;
            /*--问题列表
            --type:问题类型：1-单选  2-多选  3-问答
            --selectNum:选项数量
            --maxSelect:多选最大限制*/
            public questionList:any;
            
            /**
             * 初始化数据
             */
            public formatData(data: any): void {
                for (let key in data) {
                    this[key] = data[key];
                }
            }

            public getQuestiuonCfgById(id : number):any{
                let questionCfg = null;
                if(this.questionList && this.questionList[id - 1]){
                    questionCfg = this.questionList[id - 1];
                }
                return questionCfg;
            }
        }
    }
}