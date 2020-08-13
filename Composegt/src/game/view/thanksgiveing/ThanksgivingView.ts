class ThanksgivingView  extends CommonView
{
  
    private  bottomBg:BaseBitmap=null; 
    public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat(
        [
             "thanksgivingview_bg", 
             "thanksgivingview_top",
             "thanksgivingview_bg_font",
             "common_9_bg",
             "recharge2_fnt",
             
        ]);
	} 
    public initView():void
	{
        let myContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(myContainer);
        myContainer.y =-10;

        let thanksgbg = BaseBitmap.create("thanksgivingview_bg");  
		myContainer.addChild(thanksgbg);

        this.bottomBg = BaseBitmap.create("common_9_bg");
		this.bottomBg.y = thanksgbg.height;
		this.bottomBg.height = GameConfig.stageHeigth - 89 - thanksgbg.height;
        this.bottomBg.width = 640;
		myContainer.addChild(this.bottomBg);


        let bitmapFont = BaseBitmap.create("thanksgivingview_bg_font");
        bitmapFont.x = 25;
        bitmapFont.y = this.bottomBg.y +20;
        myContainer.addChild(bitmapFont);

        let rewaredContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(rewaredContainer);
        myContainer.addChild(rewaredContainer);

        let rechargeArr2=Config.RechargeCfg.getNormalRechargeCfg();
        let rechargeArr =[];
		for(var i:number=0;i<rechargeArr2.length;i++)
		{
			 let _id =rechargeArr2[i].id;
			 let boo = Config.FirstchargeCfg.getneedRecharge(_id);
			 if(boo)
			 {
				 rechargeArr.push(rechargeArr2[i])
			 }
		}
		rechargeArr = rechargeArr.reverse(); 
        for(var i:number =0;i<rechargeArr.length; i++)
        {   
            let currBitmap = BaseBitmap.create("public_9_managebg");
            currBitmap.width =141;
            currBitmap.height =277; 
            currBitmap.x = (currBitmap.width+10)*i;
            currBitmap.y = this.bottomBg.y+70;
            rewaredContainer.addChild(currBitmap); 

            //top2
            let top2Bitmap = BaseBitmap.create("thanksgivingview_top");
            top2Bitmap.width =currBitmap.width;
            top2Bitmap.height =40; 
            top2Bitmap.x = currBitmap.x;
            top2Bitmap.y = currBitmap.y;
            rewaredContainer.addChild(top2Bitmap);  

            let costStr = LanguageManager.getlocal("thanksgivingRecharge1",[rechargeArr[i].cost+""]);
            let topTxt:BaseTextField  = ComponentManager.getTextField(costStr,TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
            topTxt.x = top2Bitmap.x//+20;
            topTxt.y = top2Bitmap.y+8; 
            topTxt.width =top2Bitmap.width;
            topTxt.textAlign ="center";
            rewaredContainer.addChild(topTxt);
        
        	let givestr  = LanguageManager.getlocal("rechargegivedes");//送//rechargegivedes;
            let giveImg:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(givestr,"recharge2_fnt");
			giveImg.x = topTxt.x+50;
			giveImg.y = topTxt.y+45;
			rewaredContainer.addChild(giveImg);

            let extraClient:number = 3; //Config.FirstchargeCfg.getextra();
            let acerNum =rechargeArr[i].gemCost*extraClient;
            let acerStr = LanguageManager.getlocal("thanksgivingAcer",[acerNum+""]);
            let acerTxt:BaseTextField  = ComponentManager.getTextField(acerStr,TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_BROWN)
            acerTxt.x = topTxt.x;
            acerTxt.y = giveImg.y+60; 
            acerTxt.width=topTxt.width;
            acerTxt.textAlign ="center";
            rewaredContainer.addChild(acerTxt);


            let rechIcon:BaseBitmap = BaseLoadBitmap.create("recharge_new_itemicon"+rechargeArr[i].sortId); 
            rewaredContainer.addChild(rechIcon);
            rechIcon.x= currBitmap.x+13
            rechIcon.y = currBitmap.y+150; 
        } 
        rewaredContainer.setPosition((this.bottomBg.width-rewaredContainer.width)/2,rewaredContainer.y);
		let getBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"gotocharge",this.clickBtnHandler,this);
		getBtn.x = 230;
		getBtn.y = GameConfig.stageHeigth - 80;
        this.addChild(getBtn); 
    }
    private clickBtnHandler(evt:egret.TouchEvent):void
    {   
        ViewController.getInstance().hideView(ViewConst.COMMON.THANKSGIVINGVIEW);
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
 
    }

	public dispose(): void 
    {
        this.bottomBg = null;
		super.dispose();
	}
}