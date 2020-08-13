class NewQuestionnaireItem extends ScrollListItem {
    private _maskImg: BaseBitmap;
    private _rowIdx = 0;
    private _uiData = undefined;
    //
    private _q1aList: Array<CheckBox> = [];
    private _inputMsg: BaseTextField;
    /**是否是多选 */
    private multipleChoice = 0;
    /**本条item的id */
    private itemId: number;

    public constructor() {
        super();
    }
    protected initItem(index: number, data: Config.QuestionnaireItem) {
        this._uiData = data;
        this.width = 500;
        /**
         */
        this.itemId = data.itemId;

        let qbg1 = BaseBitmap.create("public_tc_bg05");
        qbg1.width = 510;
        qbg1.height = 40;
        qbg1.x = 0;
        qbg1.y = 0;
        this.addChild(qbg1);

        let q1Text = ComponentManager.getTextField(LanguageManager.getlocal(`newquestion_37wd_${this.itemId}`), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        q1Text.x = 9;
        q1Text.y = 10;
        this.addChild(q1Text);
        let view_data = NewQuestionnaireCtrl.getIns();
        //判断类型
        if (data.answerNum > 0) {//选择框
            let selectRes = "public_select4";
            let selectDownRes = "public_select_down4";
            this.multipleChoice = data.multipleChoice;//多选还是单选
            if (this.multipleChoice > 0) {//多选加一条描述
                let q2Text = ComponentManager.getTextField(LanguageManager.getlocal('newquestion_37wd_tip_4', ['' + data.multipleChoice]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
                q2Text.x = q1Text.x + q1Text.width;
                q2Text.y = 10;
                this.addChild(q2Text);
                selectRes = null;
                selectDownRes = "public_select_down5";
            }
            let answerNum = data.answerNum, selectArr = view_data.getSelectArrById(this.itemId);
            let X = 45//92;
            for (let i = 0; i < answerNum; i++) {
                let checkbox = ComponentManager.getCheckBox(null, null, null, null, selectDownRes, selectRes);
                checkbox.setScale(0.8);
                checkbox.x = X;
                checkbox.y = 54 + i * 51;
                this.addChild(checkbox);
                this._q1aList.push(checkbox);
                checkbox.addTouchTap(this.q1Handler, this, [i]);
                checkbox.setSelected(selectArr.indexOf(i) >= 0);

                let q2a4Text = ComponentManager.getTextField(LanguageManager.getlocal(`newquestion_37wd_${this.itemId}_${i + 1}`), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
                q2a4Text.x = X + checkbox.width + 5;
                q2a4Text.y = checkbox.y + 10;
                this.addChild(q2a4Text);
            }
            this.height = 54 + (answerNum - 1) * 51 + 36;
        } else {//输入框
            let inc = 180;
            let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 466, inc + 134, "public_tc_srkbg05", LanguageManager.getlocal("questionnaireQ4Tip"), TextFieldConst.COLOR_WHITE);
            inputTF.y = 57;
            this.addChild(inputTF);
            let _inputMsg = <BaseTextField>inputTF.getChildByName("textField");
            _inputMsg.y = 10;
            _inputMsg.height = inc + 86//130;
            _inputMsg.width = 456;
            _inputMsg.maxChars = 200;
            _inputMsg.multiline = true;
            inputTF.x = 16;
            if (view_data.getInputStr() != "") {
                _inputMsg.text = view_data.getInputStr();
            }
            _inputMsg.addEventListener(egret.Event.FOCUS_OUT, () => {
                if (_inputMsg.text && _inputMsg.text != "") {
                    view_data.setInputStr(_inputMsg.text);
                }
            }, this);
            view_data.setInputId(this.itemId);
            this._inputMsg = _inputMsg;
            this.height = 195 + inc;
        }
    }
    private q1Handler(event, ii) {
        /**单选的 */
        let length = this._q1aList.length, view_data = NewQuestionnaireCtrl.getIns();
        if (this.multipleChoice == 0) {
            for (let index = 0; index < length; index++) {
                let element = this._q1aList[index];
                if (ii != index) {
                    element.setSelected(false);
                }
            }
            let selectIndex = -1;
            for (let index = 0; index < length; index++) {
                let element = this._q1aList[index];
                if (element.checkSelected() == true) {
                    selectIndex = index + 1;
                    break;
                }
            }
            if (selectIndex == -1) {
                view_data.addSelectId(this.itemId, [], this.multipleChoice);
            } else {
                view_data.addSelectId(this.itemId, [selectIndex], this.multipleChoice);
            }
        } else {
            let selectIdArr = [];
            for (let index = 0; index < length; index++) {
                let element = this._q1aList[index];
                if (element.checkSelected() == true) {
                    selectIdArr.push(index + 1);
                }
            }
            if (selectIdArr.length <= this.multipleChoice) {
                view_data.addSelectId(this.itemId, selectIdArr, this.multipleChoice);
            } else {
                //选择的超过数量，提示？
                this._q1aList[ii].setSelected(false);
                App.CommonUtil.showTip(LanguageManager.getlocal("newquestion_37wd_tip_1", ['' + this.multipleChoice]));
            }
        }
    }

    public getSpaceX(): number {
        return 10;
    }
	/**
	 * 不同格子Y间距
	 */
    public getSpaceY(): number {
        return 1;
    }
    public dispose(): void {
        super.dispose();
        this._maskImg = null;
        this._rowIdx = null;
        this._uiData = null;
        this.cacheAsBitmap = false;
        this._q1aList = [];
        if (this._inputMsg) {
            NewQuestionnaireCtrl.getIns().setInputStr(this._inputMsg.text);
        }
        this._inputMsg = null;
    }
}
