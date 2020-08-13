/**
 * 自动选择门课客item
 * author ycg
 * date 2020.3.2
 * @class BookroomAutoSelServantScrollItem
 */
class BookroomAutoSelServantScrollItem  extends ScrollListItem
{
    private _servantId:string ="";
    private _isSelect:boolean = false;
    private _selectBg:BaseBitmap = null;

    public constructor()
    {
        super();
    }

    protected initItem(index:number, servantId:any, itemParam:any)
    {
        this._servantId = servantId;
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

        // let ability = servantInfoObj.getAbilityIdList();
        // let totalBookV = 0;
        // for (let i= 0; i < ability.length; i++) {

		// 	let aid = ability[i];
		// 	let tmpAcfg = GameConfig.config.abilityCfg[aid];
		// 	let aLv:number =0;

        //     tmpAcfg = GameConfig.config.abilityCfg[aid];
        //     let servantCfg = GameConfig.config.servantCfg[this._servantId];
        //     let tmpability = servantCfg.ability;
        //     let oriidx = tmpability.indexOf(aid) ;
        //     if( oriidx> -1){
        //         aLv = servantInfoObj.ability[String(oriidx)];
        //     }else{
        //         aLv = servantInfoObj.getSkinBookLv2(aid);
        //     }
        //     totalBookV += aLv * tmpAcfg.num;
        // }

        let bookExpTxt = ComponentManager.getTextField(LanguageManager.getlocal("bookRoomServantBookExp", [""+servantInfoObj.abilityExp]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        bookExpTxt.setPosition(nameTxt.x, lvTxt.y + lvTxt.height + 4);
        this.addChild(bookExpTxt);

        let skillExpTxt = ComponentManager.getTextField("",20);
        skillExpTxt.text = LanguageManager.getlocal("bookRoomServantSkillExp",[String(servantInfoObj.skillExp)]);
        skillExpTxt.x = nameTxt.x;
        skillExpTxt.y = bookExpTxt.y + bookExpTxt.height + 4;
        this.addChild(skillExpTxt);

        // 
       if(Api.bookroomVoApi.isStudying(this._servantId)){
            let flagTxt = ComponentManager.getTextField("",24);
            flagTxt.text = LanguageManager.getlocal("bookRoomServant_studyingTxt");
            flagTxt.x = bottomBg.x + bottomBg.width - 130;
            flagTxt.y = bottomBg.y + bottomBg.height/2 - flagTxt.height/2;;
            this.addChild(flagTxt);
        }else{
            let selectBg = BaseBitmap.create("public_select");
            selectBg.setPosition(bottomBg.x + bottomBg.width - selectBg.width - 20, bottomBg.y + bottomBg.height/2 - selectBg.height/2);
            this.addChild(selectBg);
            selectBg.addTouchTap(this.selectBtnClick, this);
            this._selectBg = selectBg;
            if (itemParam.data){
                for (let i=0; i < itemParam.data.length; i++){
                    if (String(itemParam.data[i]) == String(this._servantId)){
                        this._isSelect = true;
                        this._selectBg.setRes("public_select_down");
                        break;
                    }
                }
            }
        }
    }

    private selectBtnClick(target:any, param:any):void{
        let autoSelView = <BookroomAutoSelectServantPopupView>ViewController.getInstance().getView(ViewConst.POPUP.BOOKROOMAUTOSELECTSERVANTPOPUPVIEW);
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

    protected studyHandler()
    {
        if (Api.bookroomVoApi.isStudying(this._servantId))
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoomServant_studying"));
            return;
        }
        // var posType:string =null;
        if(BookroomServantScrollItem._data)
        {   
            let posId:number=BookroomServantScrollItem._posId;
            let info = Api.bookroomVoApi.getInfoByPosId(posId);
            if(posId > 300 && posId < 400 && info && info.lastet > 0 && info.lastet < GameData.serverTime){
                App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_useSeatTip5"));
                return;
            }
        }
        // if(posType!=null)
        // {
        //     NetManager.request(NetRequestConst.REQUEST_BOOKROOM_STUDY,{servantid:this._servantId,pos:BookroomServantScrollItem._posId});
        // }
        // else
        // {
            NetManager.request(NetRequestConst.REQUEST_BOOKROOM_STUDY,{servantid:this._servantId,pos:BookroomServantScrollItem._posId+""});
        // } 
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