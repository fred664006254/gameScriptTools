/**
 * 实名认证领取奖励
 * author dky
 * date 2019/7/9
 * @class NewversionPopupView
 */

class TxgamePopupView  extends PopupView
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
                "txgame_bg",
                "txgame_icon_closebtn",	
        ]);
	}

    protected initBg():void
	{
		this.viewBg = BaseBitmap.create("txgame_bg");		
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

        this.viewBg.addTouchTap(this.okBtnClick,this)

    }

    private okBtnClick():void
    {
        if(App.DeviceUtil.IsHtml5())
		{
			window.open("https://iwan.qq.com/fun/mindex?ADTAG=txsp.wd.xyx&hidetitlebar=1&autoplay=1");
            this.hide();
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