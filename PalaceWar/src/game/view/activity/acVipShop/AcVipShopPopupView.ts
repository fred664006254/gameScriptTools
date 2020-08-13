class AcVipShopPopupView  extends PopupView
{
    private _scrollList: ScrollList;
    private rewardArrList:Array<any> =[];

    public constructor() {
		super();
	}

    protected getBgName():string
    {
        return "public_9_wordbg";
    }
 
	protected getTitleBgName():string
	{
		return null;
	}

    protected getTitle():string
	{
		return null;
	} 
    protected isTouchMaskClose():boolean
    {
        return true;
    }
    
	protected initView():void
	{

        let simg = BaseLoadBitmap.create("acvipbg_"+ this.param.data.code);
        simg.x=10;
        simg.scaleX =0.4;
        simg.scaleY =0.4;
        simg.y=-240;
        this.addChildToContainer(simg); 


        //文字描述1
        let speadkDes = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        let str = LanguageManager.getlocal("vipshopbuydes1_"+this.param.data.code);
        speadkDes.width=310;
        speadkDes.height=54;
        
        speadkDes.text =str;
        speadkDes.x= 270;
        speadkDes.y=this.viewBg.y-70;
        this.addChildToContainer(speadkDes);

        let speadkDes2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        let str2= LanguageManager.getlocal("vipshopbuydes2");
        speadkDes2.width=320;
        speadkDes2.height=54;
        speadkDes2.text =str2;
        speadkDes2.x= 300;
        speadkDes2.y=speadkDes.y+60;
        this.addChildToContainer(speadkDes2);



        let goToRechargeBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"vipshopbtn",this.clickBtnHandler,this);
        goToRechargeBtn.x = this.viewBg.width/2-goToRechargeBtn.width/2+100;
        goToRechargeBtn.y  =this.viewBg.y+35;
        this.addChildToContainer(goToRechargeBtn);
    }

    protected resetBgSize():void
    {
        super.resetBgSize();
        this.viewBg.height=200;
        this.viewBg.y=this.viewBg.y-100;
        this.closeBtn.y =this.viewBg.y-30;
        this.closeBtn.x =this.closeBtn.x - 20;
        this.titleTF.visible =false
    }
    private clickBtnHandler():void
    {
         ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
         ViewController.getInstance().hideView(ViewConst.POPUP.ACVIPSHOPPOPUPVIEW);
        //  ViewController.getInstance().hideView(ViewConst.COMMON.ACVIPSHOPVIEW);
    }
    private touchHandler():void
    {     
      
        ViewController.getInstance().hideView(ViewConst.POPUP.ACVIPSHOPPOPUPVIEW);
    }

     protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            
		]);
	}
   
        

    public dispose()
    {
        this._scrollList =null;
        this.rewardArrList =[];
        super.dispose()
    }
}