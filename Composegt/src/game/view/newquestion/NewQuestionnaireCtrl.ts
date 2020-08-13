class NewQuestionnaireCtrl {
    private static _ins: NewQuestionnaireCtrl = null;
    public static getIns(): NewQuestionnaireCtrl {
        if (this._ins == null) {
            this._ins = new NewQuestionnaireCtrl;
        }
        return this._ins;
    }

    private newquestionnaire: NewQuestionnaireData;
    public constructor() {
        //待改正
        this.newquestionnaire = new NewQuestionnaireData;
        this.newquestionnaire.initData();
    }
    public getAnswers() {
        return this.newquestionnaire.id_answers;
    }

    public getSelectArrById(id): number[] {
        let arr = this.newquestionnaire.id_answers[id];
        return arr ? arr : [];
    }
    public addSelectId(id, indexArr: number[], multipleChoice) {
        this.newquestionnaire.id_answers[id] = indexArr;
    }
    public getInputStr() {
        return this.newquestionnaire.inputStr;
    }
    public setInputStr(str) {
        this.newquestionnaire.inputStr = str;
    }
    public clearAnswers() {
        this.newquestionnaire.initData();
    }
    public setInputId(id) {
        this.newquestionnaire.inputId = id;
    }
    public getInputId() {
        return this.newquestionnaire.inputId;
    }
}
class NewQuestionnaireData {
    /**选择框的已选择的数组 */
    public id_answers: { [id: number]: number[] };
    /** */
    public inputStr: string;
    /** */
    public inputId: number;

    public initData(data?: any): void {
        this.id_answers = {};
        this.inputStr = "";
        this.inputId = -1;
    }
}
