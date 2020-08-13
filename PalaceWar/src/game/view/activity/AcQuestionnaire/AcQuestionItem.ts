/**
 * 问题item
 * author qianjun
 */
class AcQuestionItem  extends ScrollListItem
{
	private _data : any = null;
    private _code : string;
    private _curCheckBox : number = 0;
    private _mulCheckBox : number[] = [];
    private _showEff : boolean = false;
    private _maxLength:number = 0;
	public constructor(){
		super();
	}

	private get cfg() : Config.AcCfg.QuestionnaireCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this._code);
    }

    private get vo() : AcQuestionnaireVo{
        return <AcQuestionnaireVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this._code);
    }

    private get aid():string{
        return AcConst.AID_QA;
	}

	private get code():string{
        return this._code;
	}

	private get acTivityId() : string{
        return `${this.aid}-${this._code}`;
    }

    protected getUiCode():string
	{
        let currCode = ``;
        switch(Number(this.code)){
            default:
                currCode = `1`;
                break;
        }
        return currCode;
	}

	protected initItem(index:number,data:any,itemParam?:any){
		let view = this;
		view._data = data;
		view.width = 585;
        view._code = itemParam;
        view._mulCheckBox = [];
        this._maxLength = 500;
        if(PlatformManager.checkIsEnLang())
        {
            this._maxLength = 800;
        }
        let qaTxt = ComponentManager.getTextField(`${index + 1}.${LanguageManager.getlocal(`acQuestion${index + 1}-${view.code}`)}<font color=0xff3c3c>${LanguageManager.getlocal(`acQuestionType${data.type}-${view.code}${data.type == 2 ? (data.maxSelect ? `b` : `a`) : ``}`, [data.maxSelect])}</font>`, 20, TextFieldConst.COLOR_BLACK);
        qaTxt.width = 580;
        qaTxt.lineSpacing = 5;
        qaTxt.textAlign = egret.HorizontalAlign.LEFT;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, qaTxt, view, [0,0], true);
        view.addChild(qaTxt);
        let answer = view.vo.getQuestionAnswer(index + 1);
        //单选
        if(data.type == 1){
            for(let i = 1; i <= data.selectNum; ++ i){
                let checkBox = ComponentManager.getCheckBox(``, `qaselcet-${view.getUiCode()}`);
                checkBox.name = `qabox${i}`;
                checkBox.addTouchTap(()=>{
                    let box = <CheckBox>view.getChildByName(`qabox${view._curCheckBox}`);
                    if(box && i != view._curCheckBox){
                        box.setSelected(false);
                    }
                    view._curCheckBox = i;
                }, view, [i]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, checkBox, qaTxt, [20, qaTxt.textHeight + 13 + (i - 1) * (checkBox.height + 5)]);
                view.addChild(checkBox);

                if(answer != '' && i == Number(answer.split(`_`)[1])){
                    checkBox.setSelected(true);
                    view._curCheckBox = i;
                }

                let boxTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acQuestionAnswer${index + 1}_${i}-${view.code}`), 18, TextFieldConst.COLOR_BLACK);
                boxTxt.addTouchTap(()=>{
                    let box = <CheckBox>view.getChildByName(`qabox${view._curCheckBox}`);
                    if(box && i != view._curCheckBox){
                        box.setSelected(false);
                    }
                    view._curCheckBox = i;
                }, view, [i]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, boxTxt, checkBox, [checkBox.width + 10, 0]);
                view.addChild(boxTxt);
                if(i == data.selectNum){
                    view.height = checkBox.y + 40;
                }
            }
        }
        //多选
        else if(data.type == 2){
            let str : any = ``;
            if(answer != ''){
                str = answer.split(`_`)[1];
            }
            
            for(let i = 1; i <= data.selectNum; ++ i){
                let checkBox = ComponentManager.getCheckBox();
                checkBox.removeClilck();
                checkBox.setScale(0.6);
                checkBox.name = `qabox${i}`;
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, checkBox, qaTxt, [20, qaTxt.textHeight + 13 + (i - 1) * (checkBox.height * 0.6 + 5)]);
                view.addChild(checkBox);

                checkBox.addTouchTap(()=>{
                    let index = view._mulCheckBox.indexOf(i);
                    if(index > -1){
                        view._mulCheckBox.splice(index,1);
                        checkBox.selectHandler();
                    }
                    else{
                        if(view._mulCheckBox.length < data.maxSelect){
                            view._mulCheckBox.push(i);
                            checkBox.selectHandler();
                        }
                    }
                }, view, [i]);

                for(let j in str){
                    if(Number(str[j]) == i){
                        checkBox.setSelected(true);
                        view._mulCheckBox.push(i);
                        break;
                    }
                }

                let boxTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acQuestionAnswer${index + 1}_${i}-${view.code}`), 18, TextFieldConst.COLOR_BLACK);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, boxTxt, checkBox, [checkBox.width * 0.6 + 8, 0]);
                boxTxt.addTouchTap(()=>{
                    let index = view._mulCheckBox.indexOf(i);
                    if(index > -1){
                        view._mulCheckBox.splice(index,1);
                        checkBox.selectHandler();
                    }
                    else{
                        if(view._mulCheckBox.length < data.maxSelect){
                            view._mulCheckBox.push(i);
                            checkBox.selectHandler();
                        }
                    }
                }, view, [i]);
                view.addChild(boxTxt);
                if(i == data.selectNum){
                    view.height = checkBox.y + 40;
                }
            }
        }
        //问答 150字限制
        else if(data.type == 3){
            //剩余输入字数 
            let newfontNum = this._maxLength;
            if(answer != ''){
                newfontNum = this._maxLength - answer.length;
            }
            
            let inputTF2 = ComponentManager.getInputTextField(TextFieldConst.COLOR_LIGHT_YELLOW, TextFieldConst.FONTSIZE_TITLE_SMALL,535,90,"public_9_bg5",LanguageManager.getlocal(`acQuestionTip3-${view.code}`),0xb1b1b1,answer);
            inputTF2.name = `inputTF2`;
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, inputTF2, qaTxt, [20, qaTxt.textHeight + 10]);
            view.addChild(inputTF2);

            let inputMaxText = ComponentManager.getTextField(LanguageManager.getlocal(`acQuestionAnswerWord-${view.code}`,[newfontNum+""]), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0xc2b89e);
            inputMaxText.name = `inputMaxText`;
            inputTF2.addChild(inputMaxText); 

            let inputtxt = <BaseTextField>inputTF2.getChildByName("textField");
            inputtxt.maxChars = this._maxLength;
            inputtxt.y = 10;
            inputtxt.height = 50;
            inputtxt.width = 530;
            inputtxt.multiline = true;
            inputtxt.addEventListener(egret.TextEvent.CHANGE,this.callbackInput, this, false, 2);

            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, inputMaxText, inputTF2, [0,10], true);
            view.height = inputTF2.y + inputTF2.height + 20;
        }    
        let line = BaseBitmap.create(`public_line1`);
        line.width = view.width;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, view, [0, 5], true);
        view.addChild(line);
    }
    
    private callbackInput(event:egret.TextEvent){  
        let view = this;
        let inputTF2 = <BaseDisplayObjectContainer>view.getChildByName(`inputTF2`);
        let inputtxt = <BaseTextField>inputTF2.getChildByName("textField");
        let inputMaxText = <BaseTextField>inputTF2.getChildByName("inputMaxText");
        let _length = inputtxt.text.length;//+nNum;
		let newlength1:number = this._maxLength -_length;
		if(newlength1<0)
		{
			newlength1=0;
		}
		inputMaxText.text = LanguageManager.getlocal(`acQuestionAnswerWord-${view.code}`,[newlength1+""]); 
		if(newlength1==0)
		{
			inputMaxText.textColor = TextFieldConst.COLOR_WARN_RED3;
		}
		else
		{
			inputMaxText.textColor = 0xc2b89e;
        }
        if(inputtxt.text === ''){
            return;
        }
		if(Config.ShieldCfg.checkShield(inputtxt.text)==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
			return;
		}

		if(App.StringUtil.checkChar(inputtxt.text))
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
			return;
		}
    }
    
    public checkAnwser(save : boolean):{index : number, answer : string}{
        let view = this;
        let answer : string = null;
        switch(view._data.type){
            case 1:
                for(let i = 1; i <= view._data.selectNum; ++ i){
                    let checkBox = <CheckBox>view.getChildByName(`qabox${i}`);
                    if(checkBox && checkBox.checkSelected()){
                        answer = `${view._index + 1}_${i}`
                        break;
                    }
                }
                break;
            case 2:
                for(let i in view._mulCheckBox){
                    if(Number(i) == 0){
                        answer = `${view._index + 1}_`;
                    }
                    let checkBox = <CheckBox>view.getChildByName(`qabox${view._mulCheckBox[i]}`);
                    if(checkBox && checkBox.checkSelected()){
                        answer += `${view._mulCheckBox[i]}`;
                    }
                }
                break;
            case 3:
                let inputTF2 = <BaseDisplayObjectContainer>view.getChildByName(`inputTF2`);
                let inputtxt = <BaseTextField>inputTF2.getChildByName("textField");
                let msg:string=inputtxt.text;
                if(msg != ''){
                    if(save){
                        answer = msg;
                    }
                    else{
                        if((App.StringUtil.checkChar(msg) || Config.ShieldCfg.checkOnlyShield(msg)==false || Config.ShieldCfg.checkShield(msg)==false)){
                            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
                        }
                        else{
                            answer = msg;
                        }
                    }
                }
                break;
        }
        return {
            index : view._index,
            answer : answer,
        };
    }

    public getIsAnswer():boolean{
        let view = this;
        let flag = false;
        switch(view._data.type){
            case 1:
                for(let i = 1; i <= view._data.selectNum; ++ i){
                    let checkBox = <CheckBox>view.getChildByName(`qabox${i}`);
                    if(checkBox && checkBox.checkSelected()){
                        flag = true;
                        break;
                    }
                }
                break;
            case 2:
                for(let i in view._mulCheckBox){
                    let checkBox = <CheckBox>view.getChildByName(`qabox${view._mulCheckBox[i]}`);
                    if(checkBox && checkBox.checkSelected()){
                        flag = true;
                        break;
                    }
                }
                break;
            case 3:
                let inputTF2 = <BaseDisplayObjectContainer>view.getChildByName(`inputTF2`);
                let inputtxt = <BaseTextField>inputTF2.getChildByName("textField");
                let msg:string=inputtxt.text;
                if(msg != ''){
                    flag = true;
                }
                break;
        }
        return flag;
    }

    public showEffect():void{
        let view = this;
        if(view._showEff){
            return;
        }
        view._showEff = true;
        let light = BaseBitmap.create("public_9_bg57")
        light.width = view.width + 20;
        light.height = view.height + 25;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, light, view, [0,-5], true);
        view.addChild(light);
        egret.Tween.get(light).
        to({alpha:0},500).to({alpha:1},500).
        to({alpha:0},500).to({alpha:1},500).
        to({alpha:0},500).to({alpha:1},500).
        call(()=>{
            egret.Tween.removeTweens(light);
            view.removeChild(light);
            light = null;
            view._showEff = false;
        }, view);
 
    }
	
	public getSpaceY():number{
		return 0;
	}
	
	public dispose():void{
        let view = this;
        view._showEff = false;
        view._curCheckBox = 0;
        view._data = null;
        view._code = '';
        view._mulCheckBox = [];
        this._maxLength = 0;
		super.dispose();
	}
}