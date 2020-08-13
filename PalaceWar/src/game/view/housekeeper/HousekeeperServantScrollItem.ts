/**
 * 自动选择门课客item
 * author shaoliang
 * date 2020.4.26
 * @class HousekeeperServantScrollItem
 */
class HousekeeperServantScrollItem  extends ScrollListItem
{
    private _servantId:string ="";
    private _isSelect:boolean = false;
    private _selectBg:BaseBitmap = null;

    public constructor()
    {
        super();
    }

    protected initItem(index:number, data:any, itemParam:any)
    {
        this._servantId = data.id;
        let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantId);

        let bottomBg = BaseBitmap.create("public_9_probiginnerbg");
        bottomBg.width = 510;
        bottomBg.height = 120;
        bottomBg.x = 9;
        this.addChild(bottomBg);

        let deltaScale = 0.55;
        let cardbg = BaseLoadBitmap.create( servantInfoObj.qualityBoxImgPath );
        cardbg.width = 194; 
        cardbg.height = 192; 
        cardbg.setScale(deltaScale);
        cardbg.x = 20;
        cardbg.y = 8;
        cardbg.name = "cardbg";
        this.addChild(cardbg);

        let servantImg = BaseLoadBitmap.create(servantInfoObj.halfImgPath );
        servantImg.width = 180;
        servantImg.height = 177;
        servantImg.x = cardbg.x + cardbg.width/2-servantImg.width/2-5;
        servantImg.y = cardbg.y+ cardbg.height/2-servantImg.height/2-2;
        servantImg.setScale(deltaScale);
        this.addChild(servantImg);

        let nameTxt = ComponentManager.getTextField("",20);
        nameTxt.textColor = ServantScrollItem.getQualityColor(servantInfoObj.clv);
        nameTxt.text = servantInfoObj.servantName;
        nameTxt.x = cardbg.x + cardbg.width * deltaScale + 10;
        nameTxt.y = 13;
        this.addChild(nameTxt);

        let lvTxt = ComponentManager.getTextField(LanguageManager.getlocal("bookRoomServantLevel", [""+servantInfoObj.level]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        lvTxt.setPosition(nameTxt.x, nameTxt.y + nameTxt.height + 4);
        this.addChild(lvTxt);

        let bookExpTxt = ComponentManager.getTextField(LanguageManager.getlocal("bookRoomServantBookExp", [""+servantInfoObj.abilityExp]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        bookExpTxt.setPosition(nameTxt.x, lvTxt.y + lvTxt.height + 4);
        this.addChild(bookExpTxt);

        let skillExpTxt = ComponentManager.getTextField("",20);
        skillExpTxt.text = LanguageManager.getlocal("bookRoomServantSkillExp",[String(servantInfoObj.skillExp)]);
        skillExpTxt.x = nameTxt.x;
        skillExpTxt.y = bookExpTxt.y + bookExpTxt.height + 4;
        this.addChild(skillExpTxt);

        let selectBg = BaseBitmap.create("public_select");
        selectBg.setPosition(bottomBg.x + bottomBg.width - selectBg.width - 20, bottomBg.y + bottomBg.height/2 - selectBg.height/2);
        this.addChild(selectBg);
        selectBg.addTouchTap(this.selectBtnClick, this);
        this._selectBg = selectBg;
        if (data.type == 1){
            this._isSelect = true;
            this._selectBg.setRes("public_select_down")
        }
    
    }

    private selectBtnClick(target:any, param:any):void{
        let autoSelView = <BookroomAutoSelectServantPopupView>ViewController.getInstance().getView(ViewConst.COMMON.HOUSEKEEPERSERVANTPOPUPVIEW);
        this._isSelect = !this._isSelect;
        let selBtnImg = "public_select";
        if (this._isSelect){
            selBtnImg = "public_select_down";
            if (!autoSelView.isCanSelect()){
                App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_autoPosIsFull"));
                return;
            }
        }
        if (this._selectBg){
            this._selectBg.setRes(selBtnImg);
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_AUTOSTUDY_SELECTSERVANT, {servantId: this._servantId, isSelect: this._isSelect});
    }

    public getSpaceX():number
	{
		return 0;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 5;
    }
    
    public dispose():void
    {
        this._servantId ="";
        this._isSelect = false;
        this._selectBg = null;

        super.dispose();
    }

}