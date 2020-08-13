var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NewQuestionnaireCtrl = (function () {
    function NewQuestionnaireCtrl() {
        //待改正
        this.newquestionnaire = new NewQuestionnaireData;
        this.newquestionnaire.initData();
    }
    NewQuestionnaireCtrl.getIns = function () {
        if (this._ins == null) {
            this._ins = new NewQuestionnaireCtrl;
        }
        return this._ins;
    };
    NewQuestionnaireCtrl.prototype.getAnswers = function () {
        return this.newquestionnaire.id_answers;
    };
    NewQuestionnaireCtrl.prototype.getSelectArrById = function (id) {
        var arr = this.newquestionnaire.id_answers[id];
        return arr ? arr : [];
    };
    NewQuestionnaireCtrl.prototype.addSelectId = function (id, indexArr, multipleChoice) {
        this.newquestionnaire.id_answers[id] = indexArr;
    };
    NewQuestionnaireCtrl.prototype.getInputStr = function () {
        return this.newquestionnaire.inputStr;
    };
    NewQuestionnaireCtrl.prototype.setInputStr = function (str) {
        this.newquestionnaire.inputStr = str;
    };
    NewQuestionnaireCtrl.prototype.clearAnswers = function () {
        this.newquestionnaire.initData();
    };
    NewQuestionnaireCtrl.prototype.setInputId = function (id) {
        this.newquestionnaire.inputId = id;
    };
    NewQuestionnaireCtrl.prototype.getInputId = function () {
        return this.newquestionnaire.inputId;
    };
    NewQuestionnaireCtrl._ins = null;
    return NewQuestionnaireCtrl;
}());
__reflect(NewQuestionnaireCtrl.prototype, "NewQuestionnaireCtrl");
var NewQuestionnaireData = (function () {
    function NewQuestionnaireData() {
    }
    NewQuestionnaireData.prototype.initData = function (data) {
        this.id_answers = {};
        this.inputStr = "";
        this.inputId = -1;
    };
    return NewQuestionnaireData;
}());
__reflect(NewQuestionnaireData.prototype, "NewQuestionnaireData");
