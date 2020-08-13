/**
* buff item
* date 2020.
* author ycg
* @name SixSection1SelectServantScrollItem2
*/
class SixSection1SelectServantScrollItem2 extends ScrollListItem{
    private _gemIcon:BaseBitmap = null;
    private _gemNum:BaseTextField = null;
    private _selNum:BaseTextField = null;
    private _currNum:number = 0;
    private _data:any = null;

    public constructor() {
        super();
    }

    public initItem(index: number, data: any, param: any): void {
        this.width = 510;
        this._data = data;
        let bg = BaseBitmap.create("public_popupscrollitembg");
        this.addChild(bg);

        let buffIconImg = "atkrace_icon_1_1";
        if (data.buffType == 2){
            buffIconImg = "atkrace_icon_2_2";
        }
        else if (data.buffType == 3){
            buffIconImg = "atkrace_icon_3_1";
        }

        let deltaScale = 1;
        let buffIcon = BaseLoadBitmap.create(buffIconImg);
        buffIcon.width = 107; 
        buffIcon.height = 106; 
        buffIcon.setScale(deltaScale);
        buffIcon.x = bg.x + 20;
        buffIcon.y = bg.y + 10;
        this.addChild(buffIcon);

        let nameBg = BaseBitmap.create("public_titlebg");
        nameBg.setPosition(buffIcon.x + buffIcon.width * deltaScale + 8, buffIcon.y);
        this.addChild(nameBg);

        let nameTxt = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SelectServantBuff"+data.buffType), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameTxt.x = nameBg.x + 5;
        nameTxt.y = nameBg.y + nameBg.height/2 - nameTxt.height/2;
        this.addChild(nameTxt);

        let effectTxt = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SelectServantBuffNum"+data.buffType, [""+(data.buffValue * 100) + "%"]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        effectTxt.setPosition(nameTxt.x, nameBg.y + nameBg.height + 10);
        this.addChild(effectTxt);

        let needTxt = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SelectServantBuffNeed"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        needTxt.setPosition(effectTxt.x, effectTxt.y + effectTxt.height + 10);
        this.addChild(needTxt);

        let gemIcon = BaseLoadBitmap.create("itemicon1");
        gemIcon.width = 100;
        gemIcon.height = 100;
        this.addChild(gemIcon);
        this._gemIcon = gemIcon;
        gemIcon.setScale(0.4);
        gemIcon.setPosition(needTxt.x + needTxt.width, needTxt.y - 10);

        let needGem = data.cost[0];
        let gemNum = ComponentManager.getTextField(""+needGem, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        gemNum.setPosition(gemIcon.x + gemIcon.width * gemIcon.scaleX, needTxt.y);
        this.addChild(gemNum);
        this._gemNum = gemNum;

        let selBg = BaseBitmap.create("public_9_bg26");
        selBg.width = 100;
        this.addChild(selBg);
        selBg.setPosition(bg.x + bg.width - selBg.width - 25 , bg.y + bg.height/2 - selBg.height/2 + 10);

        let selNum = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
        selNum.anchorOffsetX = selNum.width/2;
        selNum.setPosition(selBg.x + selBg.width/2, selBg.y + selBg.height/2 - selNum.height/2);
        this.addChild(selNum);
        this._selNum = selNum;
        
        let decrBtn = ComponentManager.getButton("sixsectionmainui_decreasebtn" , "", this.selBtnClick, this, [0]);
        decrBtn.setPosition(selBg.x - decrBtn.width/2 + 10 , selBg.y + selBg.height/2 - decrBtn.height/2 - 3);
        this.addChild(decrBtn);

        let addBtn = ComponentManager.getButton("sixsectionmainui_addbtn" , "", this.selBtnClick, this, [1]);
        addBtn.setPosition(selBg.x + selBg.width - addBtn.width/2 - 10, selBg.y + selBg.height/2 - addBtn.height/2 - 3);
        this.addChild(addBtn);
    }

    private selBtnClick(index:number){
        //减少 0 增加 1
        if (index == 0){
            if (this._currNum < 1){
                return;
            }
            this._currNum -= 1;
        }
        else{
            //增加
            if (this._currNum + 1 > this._data.maxNum){
                App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1SelectServantBuffMaxTip"));
                return ;
            }
            // let currNum = this._currNum + 1;
            // let needCost = this._data.cost[currNum-1];
            // if (currNum < 1){
            //     needCost = this._data.fristCost;
            // }
            // let pGem = Api.playerVoApi.getPlayerGem();
            // if (pGem < needCost){
            //     App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1SelectServantRechargeTip"));
            //     return;
            // }
            this._currNum +=1;
        }
        
        this._selNum.text = this._currNum+"";
        this._selNum.anchorOffsetX = this._selNum.width/2;
        this._gemIcon.visible = false;
        if (this._currNum >= this._data.maxNum){
            this._gemNum.text = LanguageManager.getlocal("sixSection1SelectServantBuffNeedMax");
            this._gemNum.x = this._gemIcon.x;
        }
        else{
            let cost = this._data.cost[this._currNum];
            this._gemNum.text = ""+cost;
            this._gemIcon.visible = true;
            this._gemNum.x = this._gemIcon.x + this._gemIcon.width * this._gemIcon.scaleX;
        }
        
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SIXSECTION1_SELSERVANT_REFRESH, {type: "buff", buffType: this._data.buffType, num: this._currNum});
    }

    public getSpaceX():number{
        return 5;
    }

    public getSpaceY():number{
        return 5;
    }

    public dispose():void{
        this._gemIcon = null;
        this._gemNum = null;
        this._selNum = null;
        this._currNum = 0;
        this._data = null;

        super.dispose();
    }
}