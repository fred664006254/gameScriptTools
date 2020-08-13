/**
* 
* date 2020.
* author ycg
* @name SixSection1SelectServantScrollItem1
*/
class SixSection1SelectServantScrollItem1 extends ScrollListItem{
    private _useBtn:BaseButton = null;
    private _selFlag:BaseBitmap = null;
    private _isSel:boolean = false;

    public constructor() {
        super();
    }

    public initItem(index: number, data: any, param: any): void {
        this.width = 510;
        let servantId = data;
        let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(servantId);

        let bg = BaseBitmap.create("public_popupscrollitembg");
        this.addChild(bg);

        let deltaScale = 0.55;
        let cardbg = BaseLoadBitmap.create(servantInfoObj.qualityBoxImgPath);
        cardbg.width = 194; 
        cardbg.height = 192; 
        cardbg.setScale(deltaScale);
        cardbg.x = bg.x + 20;
        cardbg.y = bg.y + 10;
        cardbg.name = "cardbg";
        this.addChild(cardbg);

        let servantImg = BaseLoadBitmap.create(servantInfoObj.halfImgPath);
        servantImg.width = 180;
        servantImg.height = 177;
        servantImg.x = cardbg.x + cardbg.width/2-servantImg.width/2-5;
        servantImg.y = cardbg.y+ cardbg.height/2-servantImg.height/2-2;
        servantImg.setScale(deltaScale);
        this.addChild(servantImg);

        let nameBg = BaseBitmap.create("public_titlebg");
        nameBg.setPosition(cardbg.x + cardbg.width * deltaScale + 8, cardbg.y);
        this.addChild(nameBg);

        let nameTxt = ComponentManager.getTextField(servantInfoObj.servantName, 22, ServantScrollItem.getQualityColor(servantInfoObj.clv));
        nameTxt.x = nameBg.x + 10;
        nameTxt.y = nameBg.y + nameBg.height/2 - nameTxt.height/2;
        this.addChild(nameTxt);

        let lvTxt = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SelectServantLevel", [""+servantInfoObj.level]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        lvTxt.setPosition(nameTxt.x, nameBg.y + nameBg.height + 5);
        this.addChild(lvTxt);

        let talentTxt = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SelectServantTalent", [""+servantInfoObj.getTotalBookValue(1)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        talentTxt.setPosition(lvTxt.x, lvTxt.y + lvTxt.height + 5);
        this.addChild(talentTxt);

        // let totalAttr = App.StringUtil.changeIntToText(servantInfoObj.total);
        let totalAttr = App.StringUtil.changeIntToText(servantInfoObj.getTotalAttrValye(1));
        let attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SelectServantAttr", [""+totalAttr]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        attrTxt.setPosition(lvTxt.x, talentTxt.y + talentTxt.height + 5);
        this.addChild(attrTxt);

        let useBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "sixSection1SelectServantUse", ()=>{
            if (param.callback){
                let isCan = param.callback.apply(param.obj);
                if (!isCan){
                    App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1SelectServantFullTip"));
                    return;
                }
            }
            this.update(true);
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SIXSECTION1_SELSERVANT_REFRESH, {type: "servant", id: servantId, index:index});
        }, this);
        useBtn.setPosition(bg.x + bg.width - useBtn.width - 15 , bg.y + bg.height/2 - useBtn.height/2);
        this.addChild(useBtn);
        this._useBtn = useBtn;

        let useFlag = BaseBitmap.create("awservantstate1");
        useFlag.setScale(1);
        useFlag.setPosition(bg.x + bg.width - useFlag.width * useFlag.scaleX - 15, bg.y + bg.height/2 - useFlag.height * useFlag.scaleY/2);
        this.addChild(useFlag);
        useFlag.visible = false;
        this._selFlag = useFlag;

        if (Api.sixsection1VoApi.isUsedServant(servantId)){
            this.update(true);
        }
        else{
            this.update(false);
        }
    }

    public update(isSel:boolean):void{
        this._isSel = isSel;
        if (this._isSel){
            this._useBtn.visible = false;
            this._selFlag.visible = true;
        }
        else{
            this._useBtn.visible = true;
            this._selFlag.visible = false;
        }
    }

    public getSpaceX():number{
        return 5;
    }

    public getSpaceY():number{
        return 5;
    }

    public dispose():void{
        this._selFlag = null;
        this._useBtn = null;
        this._isSel = false;

        super.dispose();
    }
}