class AcChargeReturnGemView extends PopupView
{
	private bg2:BaseBitmap = null;
	private timeText:BaseTextField = null;
	private desc1:BaseTextField = null;
	private desc2:BaseTextField = null;
	private goButton:BaseButton = null;
	private readonly aid = "chargeReturnGem";
	private _limitTF:BaseTextField = null;
	private _timeBg:BaseBitmap = null;
	public constructor() 
	{
		super();
	}
	protected initView():void
	{	
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		// const code = "1";
		let code = String(this.param.data);
		let vo: AcChargeReturnGemVo = <AcChargeReturnGemVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,code);
		if (this.getTypeCode() == "13"){
			App.LogUtil.log("w: "+this.viewBg.width + "returngem: "+this.viewBg.height);
			this.viewBg.setPosition(GameConfig.stageWidth/2 - this.viewBg.width/2, GameConfig.stageHeigth/2 - this.viewBg.height/2 - 30);
			this.closeBtn.setPosition(this.viewBg.x + this.viewBg.width - this.closeBtn.width - 60, this.viewBg.y + 10);
		}
		else {
			// 上面的背景
			this.bg2 = BaseBitmap.create("acchargereturngem_bg2");
			this.addChildToContainer(this.bg2);	
			// 时间
			this.timeText = ComponentManager.getTextField(vo.getAcLocalTime(true), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
			this.addChildToContainer(this.timeText);
		}

		let cfg:Config.AcCfg.ChargeReturnGemCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, code);
		// 描述1
		let desc1Str:string =null;
		if(code == "1")
		{
			desc1Str = LanguageManager.getlocal("chargeReturnGem_desc1",[String(Math.floor(cfg.rebateRate * 100))]);
		}
		else
		{
			desc1Str = LanguageManager.getlocal("chargeReturnGem_desc1-" + code,[String(Math.floor(cfg.rebateRate * 100))])
		}
		this.desc1 = ComponentManager.getTextField(desc1Str,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		this.addChildToContainer(this.desc1);

		// 描述2
		let desc2Str:string =null;
		if(code == "1")
		{
			desc2Str = LanguageManager.getlocal("chargeReturnGem_desc2");
		}
		else
		{
			desc2Str = LanguageManager.getlocal("chargeReturnGem_desc2-"+code);
		}
		this.desc2 = ComponentManager.getTextField(desc2Str,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		this.addChildToContainer(this.desc2);	

		this._limitTF = ComponentManager.getTextField(LanguageManager.getlocal("chargeReturnGem_Limit-"+code),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		this.addChildToContainer(this._limitTF);	
		// 前往充值
		let btnBg = ButtonConst.BTN_BIG_YELLOW;
		if (this.getTypeCode() == "13"){
			btnBg = ButtonConst.BTN2_BIG_YELLOW;
		}
		this.goButton = ComponentManager.getButton(btnBg,"gotocharge",this.confirmHandler,this);
		this.addChildToContainer(this.goButton);

		if (this.getTypeCode() == "13"){
			//活动倒计时

			//返利数字
			let numBgStr = ResourceManager.hasRes("acchargereturngem_num-"+this.getTypeCode()) ? "acchargereturngem_num-"+this.getTypeCode() : "acchargereturngem_num-13";
			let numBg = BaseBitmap.create(numBgStr);
			numBg.setPosition(this.viewBg.x + 390, this.viewBg.y + 150);
			this.addChildToContainer(numBg);

			//返利数字特效
			let numBgEffectStr = ResourceManager.hasRes("acchargereturngem_"+this.getTypeCode()+"_num_effect") ? "acchargereturngem_"+this.getTypeCode()+"_num_effect" : "acchargereturngem_13_num_effect";
			let numBgEffect = ComponentManager.getCustomMovieClip(numBgEffectStr, 8, 70);// 240, 129          
			numBgEffect.setPosition(numBg.x + numBg.width/2 - 119, numBg.y + numBg.height/2 - 60);
			numBgEffect.playWithTime(0);
			numBgEffect.blendMode = egret.BlendMode.ADD;
			this.addChildToContainer(numBgEffect);

			this.desc1.width = 520;
			this.desc1.lineSpacing = 5;
			this.desc1.setPosition(60, this.viewBg.y + 238);
			this.desc2.width = 440;
			this.desc2.lineSpacing = 5;
			this.desc2.setPosition(100, this.desc1.y + this.desc1.height + 15);
			this._limitTF.setPosition(this.viewBg.x + this.viewBg.width/2 - this._limitTF.width/2, this.desc2.y + this.desc2.height + 15);
			this.goButton.setPosition(this.viewBg.x + this.viewBg.width/2 - this.goButton.width/2, this.viewBg.y + this.viewBg.height - this.goButton.height - 80);

			this._timeBg = BaseBitmap.create("public_9_bg61");
			this._timeBg.y = this.goButton.y - 50;
			this.addChildToContainer(this._timeBg);
			this.timeText = ComponentManager.getTextField(LanguageManager.getlocal("chargeReturnGemTimeCountDown", [vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
			this._timeBg.width = 60 + this.timeText.width;
			this._timeBg.x = this.viewBg.x + this.viewBg.width/2 - this._timeBg.width/2;
			this.timeText.setPosition(this._timeBg.x + this._timeBg.width / 2 - this.timeText.width / 2, this._timeBg.y + this._timeBg.height / 2 - this.timeText.height / 2);
			this.addChildToContainer(this.timeText);

			this.refreshView();
		}

		if (vo.isShowRedDot) {
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_READACTIVE,{activename:this.aid + "-" + code});
		}
	}

	public tick(){
		if (this.getTypeCode() == "13"){
			let vo: AcChargeReturnGemVo = <AcChargeReturnGemVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, String(this.param.data));
			this.timeText.text = LanguageManager.getlocal("chargeReturnGemTimeCountDown", [vo.getCountDown()]);
			this._timeBg.width = 60 + this.timeText.width;
			this._timeBg.x = this.viewBg.x + this.viewBg.width/2 - this._timeBg.width/2;
			this.timeText.x = this._timeBg.x + this._timeBg.width / 2 - this.timeText.width / 2;
		}
	}

	/**
	 * 重新一下关闭按钮 
	 * 仅适用于新的分享
	 */
	protected getCloseBtnName():string
	{
		return "sharepopupview_closebtn";
	}

	/**
	 * 重置背景的高度 主要设置 btn的位置
	 * 仅适用于新的分享
	 */
	protected resetBgSize():void
	{
		// this.viewBg.height = 466;
		if (this.getTypeCode() != "13"){
			this.viewBg.height = 498;
			this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2,GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
			this.closeBtn.setPosition(this.viewBg.x + this.viewBg.width - this.closeBtn.width,this.viewBg.y+10);
			this.titleBg.setPosition(this.viewBg.x + this.viewBg.width/2 - this.titleBg.width/2, this.viewBg.y-5);
			this.bg2.setPosition(this.viewBg.x + this.viewBg.width/2 - this.bg2.width/2, this.viewBg.y + 70);
			this.timeText.setPosition(this.bg2.x + 285 - this.timeText.width/2, this.bg2.y + 175 - this.timeText.height/2);
			this.desc1.setPosition(this.bg2.x+5, this.bg2.y + this.bg2.height + 5);
			this.desc2.setPosition(this.bg2.x+5, this.bg2.y + this.bg2.height + 70);
			this._limitTF.setPosition(this.bg2.x+this.bg2.width/2-this._limitTF.width/2, this.desc2.y + this.desc2.height + 10);
			this.goButton.setPosition(this.viewBg.x + this.viewBg.width/2 - this.goButton.width/2, this.viewBg.y + this.viewBg.height - this.goButton.height - 18);
			this.refreshView();
		}

		let descTipTxt =  ComponentManager.getTextField(LanguageManager.getlocal("acChargeReturnGemTip"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        descTipTxt.width = 600;
		descTipTxt.lineSpacing = 5;
		descTipTxt.textAlign = egret.HorizontalAlign.CENTER;
	    descTipTxt.x =  (this.viewBg.width - descTipTxt.width)/2;
        descTipTxt.y =  this.viewBg.y + this.viewBg.height+10;
		
        this.addChildToContainer(descTipTxt);
	}

	private refreshView()
	{
		let code = String(this.param.data);
		let vo: AcChargeReturnGemVo = <AcChargeReturnGemVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, code);
		let cfg: Config.AcCfg.ChargeReturnGemCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, code);
		let num = cfg.rebateLimit - vo.getNum() >= 0 ? cfg.rebateLimit - vo.getNum() : 0;
		this._limitTF.text = LanguageManager.getlocal("chargeReturnGem_Limit-" + code, [String(num)]);
		if (this.getTypeCode() == "13"){
			this._limitTF.x = this.viewBg.x + this.viewBg.width/2 - this._limitTF.width/2;
		}
		else{
			this._limitTF.x = this.bg2.x + this.bg2.width / 2 - this._limitTF.width / 2;
		}
	}

	private getTypeCode():string{
		return String(this.param.data);
	}

	protected getBgName():string
	{	
		if (this.getTypeCode() == "13"){
			return ResourceManager.hasRes("acchargereturngem_bg_"+this.getTypeCode()) ? "acchargereturngem_bg_"+this.getTypeCode() : "acchargereturngem_bg_13";
		}
		return "acchargereturngem_bg";
	}

	protected getTitleBgName():string
	{
		if (this.getTypeCode() == "13"){
			return null;
		}
		let code = String(this.param.data);
		if(ResourceManager.hasRes("acchargereturngem_title_"+code))
		{
			return "acchargereturngem_title_"+code;
		}
		if(Number(code)>0)
		{
			for(let i=Number(code)-1;i>0;i--)
			{
				if(ResourceManager.hasRes("acchargereturngem_title_"+i))
				{
					return "acchargereturngem_title_"+i;
				}
			}
		}
		return "acchargereturngem_title"
	}

	protected getTitleStr():string
	{
		return ""
	}
	
	private confirmHandler():void
	{		
		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
		this.hide();
	}

	protected getResourceList():string[]
	{
		let list:string[] = [];
		if (this.getTypeCode() == "13"){
			list = [
				"acchargereturngem_bg_"+this.getTypeCode(), "acchargereturngem_num-"+this.getTypeCode()
			];
		}
		return super.getResourceList().concat([
			"acchargereturngem_bg","sharepopupview_closebtn_down","sharepopupview_closebtn","acchargereturngem_bg2"
		]).concat(list);
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		this.bg2 = null;
		this.timeText = null;
		this.desc1 = null;
		this.desc2 = null;
		this.goButton = null;
		this._limitTF = null;
		this._timeBg = null;
		super.dispose();
	}
}