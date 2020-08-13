/**
 * 玩家信息item
 * author ycg
 * date 2019.10.21
 * @class AcFirstSightLoveUserMsgPopupView
 */
class AcFirstSightLoveUserMsgItem extends ScrollListItem
{   
    private _data : any = null;
    private _textTab:BaseTextField[] = [];
    private _btnTab:BaseButton[] = [];
    private _showIdx:number = 0;
    private _maxLength:number = 0;
    private _showEff : boolean = false;
    private _function:Function = null;
    private _obj :any = null;

    public constructor(){
		super();
    }
    
    protected initItem(index:number,data:any,itemParam?:any)
    {
        let view = this;
		view._data = data;
        view.width = 560-32;
        
        this._function = itemParam.f;
        this._obj = itemParam.o;

        App.LogUtil.log("initItem: "+index);
        let name1 = ComponentManager.getTextField( String(index+1)+".",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
        this.addChild(name1);
        name1.x = 10;
        name1.y = 5;
        let name = ComponentManager.getTextField(LanguageManager.getlocal("usermsg_name"+data),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
        name.x = name1.width + name1.x;
        name.width = 520-32;
        name.lineSpacing =5;
        name.y = name1.y;
        this.addChild(name);

        //名字
        if(data == 1)
        {   
            this._maxLength = 200;
            let inputTF2 = ComponentManager.getInputTextField(TextFieldConst.COLOR_LIGHT_YELLOW, TextFieldConst.FONTSIZE_TITLE_SMALL,530-32, 100,"public_9_bg5",LanguageManager.getlocal(`acQuestionTip3-1`),0xb1b1b1);
            inputTF2.name = `inputTF2`;
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, inputTF2, name1, [5, name.textHeight + 10]);
            view.addChild(inputTF2);

            let inputMaxText = ComponentManager.getTextField(LanguageManager.getlocal(`acQuestionAnswerWord-1`,[this._maxLength+""]), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0xc2b89e);
            inputMaxText.name = `inputMaxText`;
            inputTF2.addChild(inputMaxText); 

            let inputtxt = <BaseTextField>inputTF2.getChildByName("textField");
            inputtxt.maxChars = this._maxLength;
            inputtxt.y = 10;
            inputtxt.height = 50;
            inputtxt.width = 510-32;
            inputtxt.multiline = true;
            inputtxt.addEventListener(egret.TextEvent.CHANGE,this.callbackInput, this, false, 2);

            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, inputMaxText, inputTF2, [0,10], true);
            view.height = inputTF2.y + inputTF2.height + 30;
        }
        //生日
        else if(data == 3)
        {   
            let bg1 = BaseBitmap.create("public_9_bg5");
            bg1.setPosition(70,name.y+name.height+20);
            bg1.width = 100;
            bg1.height = 40;
            this.addChild(bg1);

            let input1 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
            input1.setPosition(bg1.x+8,bg1.y+11);
            this.addChild(input1);

            let inputName1 = ComponentManager.getTextField(LanguageManager.getlocal("date_year"),20,TextFieldConst.COLOR_BROWN);
            inputName1.setPosition(bg1.x+bg1.width+3,input1.y);
            this.addChild(inputName1);

            let btn1 = ComponentManager.getButton("common_arrow_3",null,this.arrowClickHandler,this,[1]);
            btn1.anchorOffsetY = btn1.height/2;
            btn1.setPosition(bg1.x+bg1.width-2-btn1.width-6,bg1.y+bg1.height/2);
            this.addChild(btn1);

            this._textTab.push(input1);
            this._btnTab.push(btn1);

            let bg2 = BaseBitmap.create("public_9_bg5");
            bg2.setPosition(inputName1.x+inputName1.width+10,bg1.y);
            bg2.width = 77;
            bg2.height = 40;
            this.addChild(bg2);

            let input2 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
            input2.setPosition(bg2.x+8,input1.y);
            this.addChild(input2);

            let inputName2 = ComponentManager.getTextField(LanguageManager.getlocal("date_month"),20,TextFieldConst.COLOR_BROWN);
            inputName2.setPosition(bg2.x+bg2.width+3,input1.y);
            this.addChild(inputName2);

            let btn2 = ComponentManager.getButton("common_arrow_3",null,this.arrowClickHandler,this,[2]);
            btn2.anchorOffsetY = btn2.height/2;
            btn2.setPosition(bg2.x+bg2.width-2-btn2.width-6,btn1.y);
            this.addChild(btn2);

            this._textTab.push(input2);
            this._btnTab.push(btn2);

            let bg3 = BaseBitmap.create("public_9_bg5");
            bg3.setPosition(inputName2.x+inputName2.width+10,bg1.y);
            bg3.width = 77;
            bg3.height = 40;
            this.addChild(bg3);

            let input3 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
            input3.setPosition(bg3.x+8,input1.y);
            this.addChild(input3);

            let inputName3 = ComponentManager.getTextField(LanguageManager.getlocal("date_day"),20,TextFieldConst.COLOR_BROWN);
            inputName3.setPosition(bg3.x+bg3.width+3,input1.y);
            this.addChild(inputName3);

            let btn3 = ComponentManager.getButton("common_arrow_3",null,this.arrowClickHandler,this,[3]);
            btn3.setPosition(bg3.x+bg3.width-2-btn3.width-6,btn1.y);
            btn3.anchorOffsetY = btn3.height/2;
            this.addChild(btn3);
            
            this._textTab.push(input3);
            this._btnTab.push(btn3);

            btn1.scaleY = -1;
            btn2.scaleY = -1;
            btn3.scaleY = -1;

            view.height = bg1.y + bg1.height + 20;
        }
        //电话
        else if(data == 4)
        {   
            this._maxLength = 20;
            let inputTF2 = ComponentManager.getInputTextField(TextFieldConst.COLOR_LIGHT_YELLOW, TextFieldConst.FONTSIZE_TITLE_SMALL,530-32,100,"public_9_bg5",LanguageManager.getlocal(`acQuestionTip3-1`),0xb1b1b1);
            inputTF2.name = `inputTF2`;
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, inputTF2, name1, [5, name.textHeight + 10]);
            view.addChild(inputTF2);

            // let input = <BaseTextField>inputTF2.getChildByName("textField");
            // input.inputType = egret.TextFieldInputType.TEL;

            let inputMaxText = ComponentManager.getTextField(LanguageManager.getlocal(`acQuestionAnswerWord-1`,[this._maxLength+""]), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0xc2b89e);
            inputMaxText.name = `inputMaxText`;
            inputTF2.addChild(inputMaxText); 

            let inputtxt = <BaseTextField>inputTF2.getChildByName("textField");
            inputtxt.maxChars = this._maxLength;
            inputtxt.y = 10;
            inputtxt.height = 50;
            inputtxt.width = 510-32;
            inputtxt.multiline = true;
            inputtxt.addEventListener(egret.TextEvent.CHANGE,this.callbackInput, this, false, 2);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, inputMaxText, inputTF2, [0,10], true);
            view.height = inputTF2.y + inputTF2.height + 20;
        }
        //邮箱
        else if(data == 5)
        {   
            this._maxLength = 200;
            let inputTF2 = ComponentManager.getInputTextField(TextFieldConst.COLOR_LIGHT_YELLOW, TextFieldConst.FONTSIZE_TITLE_SMALL,530-32,90,"public_9_bg5",LanguageManager.getlocal(`acQuestionTip3-1`),0xb1b1b1);
            inputTF2.name = `inputTF2`;
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, inputTF2, name1, [5, name.textHeight + 10]);
            view.addChild(inputTF2);

            let inputMaxText = ComponentManager.getTextField(LanguageManager.getlocal(`acQuestionAnswerWord-1`,[this._maxLength+""]), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0xc2b89e);
            inputMaxText.name = `inputMaxText`;
            inputTF2.addChild(inputMaxText); 

            let inputtxt = <BaseTextField>inputTF2.getChildByName("textField");
            inputtxt.maxChars = this._maxLength;
            inputtxt.y = 10;
            inputtxt.height = 50;
            inputtxt.width = 510-32;
            inputtxt.multiline = true;
            view.height = inputTF2.y + inputTF2.height + 20;
            inputtxt.addEventListener(egret.TextEvent.CHANGE,this.callbackInput, this, false, 2);

            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, inputMaxText, inputTF2, [0,10], true);
            view.height = inputTF2.y + inputTF2.height + 20;
        
        }

        let line = BaseBitmap.create(`public_line1`);
        line.width = view.width;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, view, [0, 5], true);
        view.addChild(line);
    }

    private arrowClickHandler(idx:number)
    {
        this._showIdx = idx;
        let info:any = {};
        info["index"] = idx;
        
        if (idx == 3)
        {
            if (!this._textTab[0].text || !this._textTab[1].text)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("usermsg_day_tip1"));
                return;
            }
            info["year"] = this._textTab[0].text;
            info["month"] = this._textTab[1].text;
        }
        info["o"] = this;
        info["f"] = this.setBirthday;
        info["x"] = this._textTab[idx-1].x+23;
        info["y"] = this.y;

        this._btnTab[idx-1].scaleY = 1;

        this._function.apply(this._obj,[info]);
    }

    private setBirthday(str:string):void
    {
        this._btnTab[this._showIdx-1].scaleY = -1;
        if (str)
        {
            this._textTab[this._showIdx-1].text = str;
        }
        if (this._showIdx != 3)
        {
            if(this._textTab[0].text && this._textTab[1].text && this._textTab[2].text){
                let year = Number(this._textTab[0].text);
                let month = Number(this._textTab[1].text);
                let maxDays = GameData.getMonthDayByYearAndMonth(year,month);
                let day = Number(this._textTab[2].text);
                if (day > maxDays)
                {
                    this._textTab[2].text = String(maxDays);
                }
            }
        }
    }

    private callbackInput(event:egret.TextEvent)
    {  
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
		inputMaxText.text = LanguageManager.getlocal(`acQuestionAnswerWord-1`,[newlength1+""]); 
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
		// if(Config.ShieldCfg.checkShield(inputtxt.text)==false)
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
		// 	return;
		// }

		if(App.StringUtil.checkChar(inputtxt.text))
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
			return;
		}
    }

    private _nameTab = ["name","address","birthday","tel","email"]

    public checkAnwser():{index : number,name : string, answer : string}{
        let view = this;
        let answer : string = null;
        let msg:string = '';
        if (this._data == 3)
        {   
            if(this._textTab[0].text && this._textTab[1].text && this._textTab[2].text){
                msg = this._textTab[0].text + "-" +this._textTab[1].text + "-" +this._textTab[2].text;
            }
        }
        else
        {
            let inputTF2 = <BaseDisplayObjectContainer>view.getChildByName(`inputTF2`);
            let inputtxt = <BaseTextField>inputTF2.getChildByName("textField");
            msg=inputtxt.text;
        }
       
        if(msg != '')
        {
            if((App.StringUtil.checkChar(msg) )){//|| Config.ShieldCfg.checkOnlyShield(msg)==false || Config.ShieldCfg.checkShield(msg)==false
                App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            }
            else{
                answer = msg;
            }
        }

        return {
            index : view._index,
            name : this._nameTab[this._data-1],
            answer : answer,
        };
    }

    public getIsAnswer():boolean{
        let view = this;
        let flag = false;

        if (this._data == 3)
        {
            if(this._textTab[0].text && this._textTab[1].text && this._textTab[2].text){
                flag = true;
            }
        }
        else
        {
            let inputTF2 = <BaseDisplayObjectContainer>view.getChildByName(`inputTF2`);
            let inputtxt = <BaseTextField>inputTF2.getChildByName("textField");
            let msg:string=inputtxt.text;
            if(msg != ''){
                flag = true;
            }
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

    public dispose():void{

        this._data = null;
        this._textTab.length = 0;
        this._maxLength = 0;
        this._showEff = false;
        this._showIdx = 0;
        this._function = null;
        this._obj = null;

		super.dispose();
	}
}