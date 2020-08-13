/**
 * 实名认证领取奖励
 * author shaoliang
 * date 2019/2/26
 * @class NewversionPopupView
 */

class NewversionPopupView  extends PopupView
{
    private _inputContainer:BaseDisplayObjectContainer = null;

    private _rechargeBtn:BaseButton = null;
    private _nameInput:BaseTextField = null;
    private _idInput:BaseTextField = null;

    public constructor() 
	{
		super();
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
                "newversionviewbg",
                "newversionviewbtn",	
        ]);
	}

    protected initBg():void
	{
		this.viewBg = BaseBitmap.create("newversionviewbg");		
		// this.viewBg.width = 640;
		// this.viewBg.height = 861;
		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2,GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg);
	}
	public initView():void
	{	
        // let bg:BaseBitmap = BaseBitmap.create("realnamerewards_bg");
        // bg.setPosition(this.viewBg.width/2-bg.width/2,0);
        // this.addChildToContainer(bg);

        let desc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("newversion_desc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		desc.width = 240;
        desc.lineSpacing = 10;
        desc.setPosition(270 , 190);
		this.addChildToContainer(desc);

    
		let submitBtn:BaseButton = ComponentManager.getButton("newversionviewbtn","",this.okBtnClick,this);
		submitBtn.setText("",false)
		submitBtn.setPosition(this.width/2 - submitBtn.width/2,600);
		this.addChildToContainer(submitBtn);

    }

    private okBtnClick():void
    {
        if(App.DeviceUtil.IsHtml5())
		{
			window.open("https://play.google.com/store/apps/details?id=com.jsmr.ggplay.htcthd");
		}
	}

    

    //不显示标题名字
	protected getTitleStr():string
	{
		return null;
	}
    protected getTitleBgName():string
    {
        return null;
    }
    // 不使用组件的关闭按钮
	// protected getCloseBtnName():string
	// {
	// 	return null;
	// }
    /**
	 * 重新一下关闭按钮 
	 * 
	 */
	protected getCloseBtnName():string
	{
		return "btn_win_closebtn";
	}


    private rechargeHandle():void
    {
    }


    // protected getTitleStr():string
	// {
	// 	return "realname2PopupViewTitle";
	// }

    protected getBgExtraHeight():number
	{
		return 0;
	}

    

    public dispose():void
	{	 
        this._inputContainer = null;
        this._nameInput = null;
        this._idInput = null;
        
		super.dispose();
	}
}