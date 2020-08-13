class ComposeNeedGoldPopupView extends PopupView
{
    constructor()
    {
        super();
    }
    protected initView():void
    {

        let txt1 = ComponentManager.getTextField(LanguageManager.getlocal(`composeneedGold1`),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        txt1.width = 140;
        txt1.textAlign = TextFieldConst.ALIGH_CENTER;
        txt1.setPosition(75,440);
        this.addChildToContainer(txt1);

        let btnKey1 = "composegoShop";
        let btn1 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,btnKey1,()=>{
            ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
            this.hide();
        },this);
        btn1.setPosition(82,510);
        this.addChildToContainer(btn1);

        let txt2 = ComponentManager.getTextField(LanguageManager.getlocal(`composeneedGold2`),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        txt2.width = 140;
        txt2.textAlign = TextFieldConst.ALIGH_CENTER;
        txt2.setPosition(253,440);
        this.addChildToContainer(txt2);

        let btnKey2 = "composegoChallenge";
        let btn2 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,btnKey2,()=>{
            ViewController.getInstance().openView(ViewConst.COMMON.CHALLENGEVIEW);
            this.hide();
        },this);
        btn2.setPosition(260,510);
        this.addChildToContainer(btn2);

        let txt3 = ComponentManager.getTextField(LanguageManager.getlocal(`composeneedGold3`),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        txt3.width = 140;
        txt3.textAlign = TextFieldConst.ALIGH_CENTER;
        txt3.setPosition(429,440);
        this.addChildToContainer(txt3);

        let btnKey3 = "composegoLevy";
        let btn3 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,btnKey3,()=>{
            ViewController.getInstance().openView(ViewConst.COMMON.LEVYVIEW);
            this.hide();
        },this);
        btn3.setPosition(432,510);
        this.addChildToContainer(btn3);

        
    }

    protected getTitleStr():string
    {
        return null;
    }
    
    protected getCloseBtnName():string
	{
		return "btn_win_closebtn";
    }
    
    protected getBgName():string
	{
		return "composeneedgoldviewbg";
    }
    
    protected resetBgSize():void
	{
        super.resetBgSize();
        this.closeBtn.y = this.viewBg.y+5;
    }

    protected getResourceList():string[]
    {
        let resArr=[
            "composeneedlvupviewbg_new_tipbg"
        ];
        return super.getResourceList().concat(resArr);
    }
    public dispose():void
    {
        super.dispose();
    }
}