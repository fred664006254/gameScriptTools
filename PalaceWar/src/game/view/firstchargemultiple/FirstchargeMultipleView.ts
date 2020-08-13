class FirstchargeMultipleView  extends CommonView
{
  
    private  bottomBg:BaseBitmap=null; 
    // private  _payId:string = "";
    public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat(
        [
             "multiple_bg",
             "recharge4",
           
             "multiple_font",
             "common_9_bg",
             "recharge2_fnt",
             
        ]);
	} 
    public initView():void
	{
        let myContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(myContainer);
        myContainer.y =-10;

        let thanksgbg = BaseBitmap.create("multiple_bg");  
		myContainer.addChild(thanksgbg);

        this.bottomBg = BaseBitmap.create("common_9_bg");
		this.bottomBg.y = thanksgbg.height;
		this.bottomBg.height = GameConfig.stageHeigth - 89 - thanksgbg.height;
        this.bottomBg.width = 640;
		myContainer.addChild(this.bottomBg);


        let bitmapFont = BaseBitmap.create("multiple_font");
        bitmapFont.x = 25;
        bitmapFont.y = this.bottomBg.y +20;
        myContainer.addChild(bitmapFont);

        let rewaredContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(rewaredContainer);
        myContainer.addChild(rewaredContainer);

        let rechargeArr2=Config.ExtraRechargeCfg.getNormalRechargeCfg();
        
        for(var i:number =0;i<rechargeArr2.length; i++)
        {   
            let currBitmap = BaseBitmap.create("public_9_managebg");
            currBitmap.width =141;
            currBitmap.height =198; 
            currBitmap.x = (currBitmap.width+10)*i;
            currBitmap.y = this.bottomBg.y+70;
            rewaredContainer.addChild(currBitmap); 

            let recharge4:BaseBitmap = BaseLoadBitmap.create("recharge4"); 
            rewaredContainer.addChild(recharge4);
            recharge4.x=  currBitmap.x;
            recharge4.y = currBitmap.y; 


            let num =i+1;
            let rechIcon:BaseBitmap = BaseLoadBitmap.create("recharge_new_itemicon"+num); 
            rechIcon.width =116;
            rechIcon.height =116;
            rewaredContainer.addChild(rechIcon);
            rechIcon.x= currBitmap.x+13
            rechIcon.y = currBitmap.y+25; 

            //top2
            let top2Bitmap = BaseBitmap.create("public_9_bg33_down");
            top2Bitmap.width =currBitmap.width-2;
            top2Bitmap.height =40; 
            top2Bitmap.x = currBitmap.x+2;
            top2Bitmap.y = currBitmap.y+150+7;  
            rewaredContainer.addChild(top2Bitmap);  

            // let extraClient:number = 3;
            let acerNum =rechargeArr2[i].gemCost;//*extraClient;
            let acerStr = LanguageManager.getlocal("thanksgivingAcer",[acerNum+""]);
            let topTxt:BaseTextField  = ComponentManager.getTextField(acerStr,TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
            topTxt.x = top2Bitmap.x;
            topTxt.y = top2Bitmap.y+8; 
            topTxt.width =top2Bitmap.width;
            topTxt.textAlign ="center";
            rewaredContainer.addChild(topTxt);  
        }  
       
        rewaredContainer.setPosition((this.bottomBg.width-rewaredContainer.width)/2,rewaredContainer.y);
		let getBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"gotocharge",this.clickBtnHandler,this);
		getBtn.x = (GameConfig.stageWidth-getBtn.width)/2-20;
		getBtn.y = this.bottomBg.y+300;
        rewaredContainer.addChild(getBtn); 



        //文本线
		let lineSp = BaseBitmap.create("public_line1");
		lineSp.setPosition(this.x + this.width / 2 - lineSp.width / 2,getBtn.y+150);//getBtn.y+getBtn.height+30);
		rewaredContainer.addChild(lineSp);

        let desTxt:BaseTextField  = ComponentManager.getTextField(LanguageManager.getlocal("thaiThirdPartyFirstRechargeDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN)
        desTxt.x = 20;
        desTxt.y = lineSp.y+20; 
        desTxt.width= 550;
        desTxt.lineSpacing = 6;
        desTxt.textAlign ="center";
        rewaredContainer.addChild(desTxt); 
    }
    private clickBtnHandler(evt:egret.TouchEvent):void
    {   
        if (GameData.idcardSwitch==true && GameData.idcardNormal==1 && Api.gameinfoVoApi.getRealnameRewards()==null)
		{	
			ViewController.getInstance().openView(ViewConst.POPUP.REALNAMEREWARDSPOPUPVIEW);
            return;
		}
        PlatformManager.pay("g1"); 
        ViewController.getInstance().hideView(ViewConst.COMMON.THANKSGIVINGVIEW);  
    }

	public dispose(): void 
    {
        this.bottomBg = null;
        // this._payId =null;
		super.dispose();
	}
}