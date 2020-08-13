/**
 * 任务列表节点
 * author yanyuling
 * date 2017/10/28
 * @class BookroomServantScrollItem
 */
class BookroomServantScrollItem  extends ScrollListItem
{
    private _servantId:string ="";
    static _posId:number = 0;
    
    static _cardType = 0;  //0 正常 ，1月卡，2年卡
    public constructor()
    {
        super();
    }

    protected initItem(index:number,servantId:any)
    {
        // this._cardType = cardFrom;
        this._servantId = servantId;
        let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantId);

        let bottomBg = BaseBitmap.create("public_listbg");//public_9_probiginnerbg
        bottomBg.width = 510;
        bottomBg.height = 125;
        bottomBg.x = 9;
        this.addChild(bottomBg);

        let leftBg = BaseBitmap.create("public_left");
		leftBg.width = 139;
		leftBg.height = 106.5;
		leftBg.x = 15;
		leftBg.y = 5.5;
		this.addChild(leftBg);

        let deltaScale = 0.55;
        let cardbg = BaseLoadBitmap.create( servantInfoObj.qualityBoxImgPath );
        cardbg.width = 194; 
        cardbg.height = 192; 
        cardbg.setScale(deltaScale);
        cardbg.x = 30;
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

        let nameBg = BaseBitmap.create("public_biaoti2");
        nameBg.width = 160;
        nameBg.x = 160;
        nameBg.y = 10 ;

        let nameTxt = ComponentManager.getTextField("",20);
        nameTxt.textColor = TextFieldConst.COLOR_BROWN;//ServantScrollItem.getQualityColor(servantInfoObj.clv);
        nameTxt.text = servantInfoObj.servantName;
        nameTxt.x = nameBg.x + nameBg.width/2 - nameTxt.width/2; //140;
        nameTxt.y = nameBg.y + nameBg.height/2 - nameTxt.height/2; //30;

      
        this.addChild(nameBg);
        this.addChild(nameTxt);

        let skillExpTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
        skillExpTxt.text = LanguageManager.getlocal("bookRoomServantSkillExp",[String(servantInfoObj.skillExp)]);
        // String(servantInfoObj.skillExp);
        skillExpTxt.x = nameBg.x ;
        skillExpTxt.y = nameTxt.y + 50;
        this.addChild(skillExpTxt);

        // 
       if(Api.bookroomVoApi.isStudying( this._servantId)){
            let flagTxt = ComponentManager.getTextField("",24,TextFieldConst.COLOR_BROWN);
            flagTxt.text = LanguageManager.getlocal("bookRoomServant_studyingTxt");
            flagTxt.x = bottomBg.x + bottomBg.width - 130;
            flagTxt.y = bottomBg.y + bottomBg.height/2 - flagTxt.height/2;;
            this.addChild(flagTxt);
        }else{
            let studyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"bookRoomServant_study",this.studyHandler,this);
            studyBtn.x = bottomBg.x + bottomBg.width - 145;
            studyBtn.y = bottomBg.y + bottomBg.height/2 - studyBtn.height/2;
            this.addChild(studyBtn);
        }
    }

    protected studyHandler()
    {
        if (Api.bookroomVoApi.isStudying(this._servantId))
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoomServant_studying"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_BOOKROOM_STUDY,{
            servantid:this._servantId,
            pos:BookroomServantScrollItem._posId,
            ismonthcard:BookroomServantScrollItem._cardType,

        });
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
        
        super.dispose();
    }

}