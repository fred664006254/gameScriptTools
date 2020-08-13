class ServantExileBuffServantItem extends ScrollListItem
{   
    private _posId:number = null;
    private _sid:string = null;
    /**
	 * "3":{
			"servantId":"1007",
			"st":1595815367,
			"freeEndTime":1595901767,
			"et":1604455367,
			"buffSid":"1001"
		}
	*/
    private _seatInfo:any = null;
    private _buffSid:string = null;

    private _addBtn:BaseBitmap = null;
    private _servantIconbg:BaseLoadBitmap = null;
    private _servantIcon:BaseLoadBitmap = null;
    private _reddot:BaseBitmap = null;
    private _buffText:BaseTextField = null;
    private _nametext:BaseTextField = null;
    private _nonametext:BaseTextField = null;
    private _function:Function = null;
    private _obj:any = null;

    public constructor() 
	{
		super();
	}

	public initItem(index:number,sid:any,parms:any):void
    {   
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_BANISHBUFF, this.requestCallback, this);
        this._sid = sid;
        this._posId = Api.servantExileVoApi.getPosIdByServantId(sid);

        this._function = parms.f;
        this._obj = parms.o;


        let bgBg:BaseBitmap = BaseBitmap.create("public_popupscrollitembg");
		this.addChild(bgBg);

        let posx1 = bgBg.x+108;
        let posx2 = bgBg.x+bgBg.width-108;

        let servantbg1=BaseBitmap.create("exile_servant_buffbg1")
        servantbg1.setPosition(posx1-servantbg1.width/2,30);
        this.addChild(servantbg1);

        let servantbg2=BaseBitmap.create("exile_servant_buffbg2")
        servantbg2.setPosition(posx2-servantbg1.width/2,30);
        this.addChild(servantbg2);
        servantbg2.addTouchTap(this.addTouchHandle,this);

        let arrow=BaseBitmap.create("exile_buff_arrow")
        arrow.setPosition(bgBg.x+bgBg.width/2-arrow.width/2,80);
        this.addChild(arrow);

        let bottombg=BaseBitmap.create("exile_servant_barbg2")
        bottombg.width = 500;
        bottombg.setPosition(bgBg.x+bgBg.width/2-bottombg.width/2,200);
        this.addChild(bottombg);

        this._seatInfo = Api.servantExileVoApi.getServantExileInfoForKey(String(this._posId));
        this._buffSid = this.getBuffSid();
        let stringArray = Api.servantVoApi.getOneExileBuffStrings(this._sid);
        let posy = 8;
        for (let i =0; i<stringArray.length; i++)
        {
            let oneText = ComponentManager.getTextField(stringArray[i][1],20,TextFieldConst.COLOR_WHITE);
            oneText.width = 460;
            oneText.lineSpacing =3;
            oneText.textAlign = egret.HorizontalAlign.CENTER;            
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, oneText, bottombg , [0,posy]);
            this.addChild(oneText);
            posy += oneText.height+6;
        }
        bottombg.height = posy+2;
        bgBg.height =bottombg.y+ posy + 12;
		
        let text1 = ComponentManager.getTextField(LanguageManager.getlocal("exileBuff_servant_tip1"),20,TextFieldConst.COLOR_WARN_GREEN2);
		text1.setPosition(posx1-text1.width/2,15);
		this.addChild(text1);

        let servantInfo = Config.ServantCfg.getServantItemById(this._sid);

        let text2 = ComponentManager.getTextField(servantInfo.name,22,TextFieldConst.COLOR_BROWN);
		text2.setPosition(posx1-text2.width/2,text1.y+text1.height+5);
		this.addChild(text2);

        let servantInfoVo = Api.servantVoApi.getServantObj(this._sid);
        let iconBgBt: BaseBitmap = BaseLoadBitmap.create(servantInfoVo.qualityBoxImgPathNew);
        iconBgBt.width=108;
        iconBgBt.height=108;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconBgBt, servantbg1 , [0,0]);
		this.addChild(iconBgBt);

        let sicon = BaseLoadBitmap.create(servantInfoVo.halfImgPath);
        sicon.width = 100;
        sicon.height = 100;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, sicon, servantbg1 , [0,0]);
        this.addChild(sicon);

        let text3 = ComponentManager.getTextField(LanguageManager.getlocal("exileBuff_servant_tip2"),20,TextFieldConst.COLOR_WARN_GREEN2);
		text3.setPosition(posx2-text3.width/2,text1.y);
		this.addChild(text3);
        this._buffText= text3;


        let text4 = ComponentManager.getTextField(" ",22,TextFieldConst.COLOR_BROWN);
        text4.width = 180;
        text4.textAlign = egret.HorizontalAlign.CENTER;           
		text4.setPosition(posx2-text4.width/2,text2.y);
		this.addChild(text4);
        this._nametext = text4;

        let text5 = ComponentManager.getTextField(LanguageManager.getlocal("exileBuff_servant_tip3"),20,TextFieldConst.COLOR_QUALITY_RED);
		text5.setPosition(posx2-text5.width/2,text1.y+10);
		this.addChild(text5);
        this._nonametext= text5;


        let add = BaseBitmap.create("exile_buff_plus");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, add, servantbg2);
       
        this._addBtn = add;

        let iconBgBt2 = BaseLoadBitmap.create(servantInfoVo.qualityBoxImgPathNew);
        iconBgBt2.width=108;
        iconBgBt2.height=108;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconBgBt2, servantbg2 , [0,0]);
		this.addChild(iconBgBt2);
        this._servantIconbg=iconBgBt2;

         this.addChild(add);

        let sicon2 = BaseLoadBitmap.create("childview_addicon");
        sicon2.width = 100;
        sicon2.height = 100;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, sicon2, servantbg2);
        this.addChild(sicon2);
        this._servantIcon = sicon2;

        let toolAddRed = BaseBitmap.create("public_dot2");
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, toolAddRed, sicon2,[-15,-15]);
        this.addChild(toolAddRed);
        this._reddot = toolAddRed;

        this.resetInfo();
    }

    private getBuffSid():string
    {
        let sid = "";
        if (this._seatInfo && this._seatInfo.buffSid)
        {
            sid = this._seatInfo.buffSid;
        }
        return sid;
    }

    private resetInfo():void
    {
        if (this._buffSid)
        {   
            this._addBtn.visible = false;
            this._servantIcon.visible = true;
            this._buffText.visible = true;
            this._nametext.visible = true;
            this._nonametext.visible = false;
            this._reddot.visible = false;
            
            let servantcfg = Config.ServantCfg.getServantItemById(this._buffSid);
            this._nametext.text = servantcfg.name;
            let servantInfoVo = Api.servantVoApi.getServantObj(this._buffSid);
            this._servantIcon.setload(servantInfoVo.halfImgPath);
            this._servantIconbg.setload(servantInfoVo.qualityBoxImgPathNew);
        }
        else 
        {
            this._addBtn.visible = true;
            this._servantIcon.visible = false;
            this._buffText.visible = false;
            this._nametext.visible = false;
            this._nonametext.visible = true;
            this._reddot.visible = true;
        }
    }


    private addTouchHandle():void
    {   
        if (this._posId > 100)
        {
            if (!this._seatInfo || this._seatInfo.et< GameData.serverTime)
            {   
                this._function.apply(this._obj);
                
                return;
            }
        }
        ViewController.getInstance().openView(ViewConst.POPUP.SERVANTEXILEBUFFCHOOSEVIEW,{pos:this._posId, f:this.chooseCallback,o:this});
    }

    private chooseCallback(sid:string):void
    {
        NetManager.request(NetRequestConst.REQUEST_SERVANT_BANISHBUFF,{servantId:sid,pos:this._posId});
    }

     private requestCallback(evt:egret.Event):void{
        if (!evt.data.ret){
            return;
        }
        this._seatInfo = Api.servantExileVoApi.getServantExileInfoForKey(String(this._posId));

         if (!this._seatInfo || this._seatInfo.et< GameData.serverTime)
            {   
                this._function.apply(this._obj);
                App.CommonUtil.showTip(LanguageManager.getlocal("exileBuff_timeout"));
                return;
            }

        if (this._buffSid != this.getBuffSid())
        {
            this._buffSid = this.getBuffSid();
            this.resetInfo();
        }
        
    }


    public dispose():void
	{   
         App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_BANISHBUFF, this.requestCallback, this);
        this._posId = null;
        this._sid = null;
        this._seatInfo = null;
        this._buffSid = null;
        this._addBtn = null;
        this._servantIcon = null;
        this._reddot = null;
        this._buffText = null;
        this._nametext = null;
        this._nonametext = null;
        this._servantIconbg = null;
        this._obj = null;
        this._function = null;

		super.dispose();
	}
}