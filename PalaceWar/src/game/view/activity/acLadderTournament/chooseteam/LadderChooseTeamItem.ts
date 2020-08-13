
/**
 * 门客item
 * author shaoliang
 * @class LadderChooseTeamItem
 */
class LadderChooseTeamItem extends ScrollListItem
{   
    private _sid:string = null;
    private _upBtn:BaseButton = null;
    private _downBtn:BaseButton = null;
    public _status:number = 0; // 1可上阵  2已上阵  3别处上阵了

    private _fuction:Function = null;
    private _fuction2:Function = null;
    private _obj:any = null;

    public constructor() {
		super();
	}

    protected initItem(index:number,data:any,parms:any)
    {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_TEAM_CHOOSE,this.resetInfo,this);

        this._sid = data;
        let type:number = parms.type;

        this._fuction = parms.f;
        this._fuction2 = parms.f2;
        this._obj = parms.o;

        let bg = BaseBitmap.create("wifebattleyonglelistbg");
		this.height = bg.height + this.getSpaceY();
        this.addChild(bg);	

        let servantvo = <ServantInfoVo>Api.servantVoApi.getServantObj(this._sid);
        let servantIcon = BaseLoadBitmap.create(servantvo.halfImgPath);
        servantIcon.width = 125;
        servantIcon.height = 125;
        servantIcon.setPosition(2,2);
        this.addChild(servantIcon);

        let namestr = servantvo.servantName;
        // if(servantvo.equip && servantvo.equip != ``){
        //     let skinCfg = Config.ServantskinCfg.getServantSkinItemById(servantvo.equip);
        //     namestr = namestr + "  " + skinCfg.name;
        // }
        let nameText = ComponentManager.getTextField(namestr,20,TextFieldConst.COLOR_WARN_YELLOW2);
		nameText.setPosition(150,20);
        this.addChild(nameText);
        
        let attrStr = LanguageManager.getlocal("servant_newui_zizhi"+type,[String(servantvo.getTotalBookValue(type))]);
        let attrText = ComponentManager.getTextField(attrStr,18,TextFieldConst.COLOR_BROWN);
		attrText.setPosition(nameText.x,nameText.y+40);
        this.addChild(attrText);
        
        let propStr = LanguageManager.getlocal("acLadder_servantAttr"+type,[String(servantvo.getTotalAttrValye(type))]);
        let propText = ComponentManager.getTextField(propStr,18,TextFieldConst.COLOR_BROWN);
		propText.setPosition(nameText.x,nameText.y+70);
        this.addChild(propText);

        let battleType:number = Api.laddertournamentVoApi.getServantBattleType(this._sid);
        if (battleType>0 && battleType != type)
        {   

            let inbattlebg = BaseLoadBitmap.create("ladder_inbattle_bg"+battleType);
            inbattlebg.width = 138;
            inbattlebg.height = 58;
            inbattlebg.setPosition(370,bg.height/2-inbattlebg.height/2);
            this.addChild(inbattlebg);

            let battlestr = LanguageManager.getlocal("acLadder_team_inbattle"+battleType);
            let battleText = ComponentManager.getTextField(battlestr,18,TextFieldConst.COLOR_WHITE);
            battleText.setPosition(inbattlebg.x+inbattlebg.width/2-battleText.width/2,inbattlebg.y+inbattlebg.height/2-battleText.height/2); ;
            this.addChild(battleText);

            this._status = 3;
        }
        else
        {
            let btn1 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"emperorWarBuzhenUp",this.upHandle,this);
            btn1.setPosition(bg.width-btn1.width-30,bg.height/2-btn1.height/2);
            this.addChild(btn1);

            let btn2 = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED,"countryWarServantCancel",this.downHandle,this);
            btn2.setPosition(btn1.x,btn1.y);
            this.addChild(btn2);

            this._upBtn = btn1;
            this._downBtn = btn2;

            if (battleType != type)
            {
                btn2.visible = false;
                this._status = 1;
            }
            else
            {
                btn1.visible = false;
                this._status = 2;
            }
        }
    }  
    
    private upHandle():void
    {
        this._fuction.apply(this._obj,[this._sid]);
    }
    private downHandle():void
    {
        this._fuction2.apply(this._obj,[this._sid]);
    }

    public resetInfo(event:egret.Event):void
    {
        if (this._status == 3)
        {
            return;
        }

        let sids:string[] = event.data;

        if (GameData.isInArray(this._sid,sids))
        {
            this._upBtn.visible = false;
            this._downBtn.visible = true;
            this._status = 2;
        }
        else
        {
            this._upBtn.visible = true;
            this._downBtn.visible = false;
            this._status = 1;
        }
    }

    public dispose():void
    {   
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_TEAM_CHOOSE,this.resetInfo,this);
        this._sid = null;
        this._upBtn = null;
        this._downBtn = null;
        this._status = 0;
        this._fuction = null;
        this._fuction2 = null;
        this._obj = null;

        super.dispose();
    }
}