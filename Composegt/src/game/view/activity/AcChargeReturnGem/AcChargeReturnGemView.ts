class AcChargeReturnGemView extends PopupView
{
	private numImg: BaseBitmap = null;
	private timeText:BaseTextField = null;
	private desc1:BaseTextField = null;
	private desc2:BaseTextField = null;
	private goButton:BaseButton = null;

	private aid:string = null;
	public constructor() 
	{
		super();
		this.aid=App.StringUtil.firstCharToLower(this.getClassName().replace("Ac","").replace("View",""));
	}
    private get vo() : AcChargeReturnGemVo{
        return <AcChargeReturnGemVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
;
    }
	protected get code():string
	{
		if(this.param && this.param.data){
			return this.param.data;
		} else {
			return "";
		}
		
	}
	protected initView():void
	{	
		
		// let vo: AcChargeReturnGemVo = <AcChargeReturnGemVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
		// 上面的背景
		this.numImg = BaseBitmap.create("acchargereturngemview_dis_" + this.code);
		this.numImg.x = this.viewBg.x + 107;
		this.numImg.y = this.viewBg.y - 40 + 228;
		this.addChildToContainer(this.numImg);
		let stTxt = App.DateUtil.getFormatBySecond(this.vo.st, 9);
		let etTxt = App.DateUtil.getFormatBySecond(this.vo.et, 9);
		// 时间
		this.timeText = ComponentManager.getTextField(LanguageManager.getlocal("acChargeReturnGemViewTime",[stTxt,etTxt]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		this.timeText.x = this.viewBg.width / 2 - this.timeText.width / 2;
		this.timeText.y = this.viewBg.y - 40 + 404;
		this.addChildToContainer(this.timeText);

		let cfg:Config.AcCfg.ChargeReturnGemCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		// 描述1
		this.desc1 = ComponentManager.getTextField(LanguageManager.getlocal("acChargeReturnGemViewDesc1",[String(Math.floor(cfg.rebateRate * 100))]),TextFieldConst.FONTSIZE_CONTENT_SMALL,0x5f0707);
		this.desc1.x = this.viewBg.width / 2 - this.desc1.width/2;
		this.desc1.y = this.viewBg.y - 40 + 603;
		this.addChildToContainer(this.desc1);	
		// 描述2
		this.desc2 = ComponentManager.getTextField(LanguageManager.getlocal("acChargeReturnGemViewDesc2"),16,0xd0491e);
		this.desc2.x = this.viewBg.width / 2 - this.desc2.width/2;
		this.desc2.y = this.viewBg.y - 40 + 710;
		this.addChildToContainer(this.desc2);	
		// 前往充值
		this.goButton = ComponentManager.getButton("firstchargebutton02","acChargeReturnGemViewBtn",this.confirmHandler,this);
		this.goButton.x = this.viewBg.width / 2 - this.goButton.width/2;
		this.goButton.y = this.viewBg.y - 40 + 760;
		this.addChildToContainer(this.goButton);

		if (this.vo.isShowRedDot) {
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_READACTIVE,{activename:this.aid + "-" + this.code});
		}
	}

	protected initBg():void
    {
        this.viewBg = BaseLoadBitmap.create("acchargereturngemview_bg");
        this.viewBg.width = 640;
        this.viewBg.height = 885;
		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2,GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg);
    }
	/**
	 * 重新一下关闭按钮 
	 * 仅适用于新的分享
	 */
	protected getCloseBtnName():string
	{
		return "btn_lantern";
	}

	/**
	 * 重置背景的高度 主要设置 btn的位置
	 * 仅适用于新的分享
	 */
	protected resetBgSize():void
	{
		this.closeBtn.setPosition(this.viewBg.x + this.viewBg.width - this.closeBtn.width - 50,this.viewBg.y+50);

	}
	protected getBgName():string
	{
		return "acchargereturngem_bg"
	}

	protected getTitleStr():string
	{
		return null;
	}
	
	private confirmHandler():void
	{		
		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
		this.hide();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					// "acchargereturngem_bg","acchargereturngem_title","sharepopupview_closebtn_down","sharepopupview_closebtn","acchargereturngem_bg2"
				"firstchargebutton02"
					]);
	}

	public dispose():void
	{
		this.numImg = null;
		this.timeText = null;
		this.desc1 = null;
		this.desc2 = null;
		this.goButton = null;
		super.dispose();
	}
}