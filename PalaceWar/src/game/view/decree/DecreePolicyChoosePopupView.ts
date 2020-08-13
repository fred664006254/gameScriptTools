/**
 * 政令选择确认框UI
 * author yanyuling
 * date 2018/05/28
 * @class DecreePolicyChoosePopupView
 */
class DecreePolicyChoosePopupView extends PopupView
{
	private _nodeContainer:BaseDisplayObjectContainer;
	private _costGemNum:number = 0;
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_SETSP),this.setPolicyCallback,this);

        this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);
		let spid = this.param.data.spid;

		let bg:BaseBitmap = BaseBitmap.create("public_9_bg46");
		bg.width = 528;
		bg.height = 250;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this._nodeContainer.addChild(bg);
		
		// let rbg:BaseBitmap = BaseBitmap.create("public_9_bg45");
		// rbg.width = 510;
		// rbg.height = 180;
		// rbg.x = this.viewBg.x + this.viewBg.width/2 - rbg.width/2;
		// rbg.y = bg.y;
		// this._nodeContainer.addChild(rbg);

		let iconbg = BaseBitmap.create("decree_bookbg");
		iconbg.x =this.viewBg.x + this.viewBg.width/2 - iconbg.width/2;
		iconbg.y = bg.y + 20;
		this._nodeContainer.addChild(iconbg);

		let policyIcon = BaseBitmap.create("decree_policy_icon"+spid);
		policyIcon.x = iconbg.x + iconbg.width/2 - policyIcon.width/2;
		policyIcon.y = iconbg.y + iconbg.height/2 - policyIcon.height/2;
		this._nodeContainer.addChild(policyIcon);

		let sinfo = Api.promoteVoApi.getSinfo();
		let num = sinfo.nextinfo.num ;
		let costNUm =  0;
		let amendspNeedGem = Config.PolicyCfg.amendspNeedGem;
		if(num >= amendspNeedGem.length -1)
		{
			costNUm = amendspNeedGem[amendspNeedGem.length-1];
		}else{
			costNUm = amendspNeedGem[num];
		}
		this._costGemNum = costNUm;
		let policyeName = LanguageManager.getlocal("decreePolicy_Name"+ spid)

		let chooseTxt1 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
		chooseTxt1.multiline = true;
		chooseTxt1.lineSpacing = 5;
		chooseTxt1.text = LanguageManager.getlocal("decreePolicyChooseTxt2",[policyeName]);
		chooseTxt1.x = this.viewBg.x + this.viewBg.width/2 - chooseTxt1.width/2;
		chooseTxt1.y = policyIcon.y + policyIcon.height + 10;
		this._nodeContainer.addChild(chooseTxt1);

		let chooseTxt2 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
		chooseTxt2.text = LanguageManager.getlocal("decreePolicyChooseTxt3");
		chooseTxt2.x = this.viewBg.x + 50 + GameData.popupviewOffsetX;
		chooseTxt2.y = chooseTxt1.y + chooseTxt1.height + 15;
		this._nodeContainer.addChild(chooseTxt2);
		
		let policyCfg = Config.PolicyCfg.getPolicyById(spid);
		let addaddExtent = "" + (policyCfg.addExtent*100) ;
		let chooseTxt3 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
		chooseTxt3.multiline = true;
		chooseTxt3.lineSpacing = 5;
		chooseTxt3.width = 350;
		let addaddExtent2 = policyCfg.emAddExtent*100;
		
		if(policyCfg.id == "2")
		{
			chooseTxt3.text = LanguageManager.getlocal("decreePolicy_Desc"+policyCfg.id,[""+policyCfg.addTimes,""+policyCfg.emAddTimes]);
		}else{
			chooseTxt3.text = LanguageManager.getlocal("decreePolicy_Desc"+policyCfg.id,[""+policyCfg.addTimes,""+addaddExtent,""+addaddExtent2]);
		}

		chooseTxt3.x = chooseTxt2.x + chooseTxt2.width + 10 ;
		chooseTxt3.y = chooseTxt2.y
		this._nodeContainer.addChild(chooseTxt3);

		let confirmBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"sysConfirm",this.confirmBtnHandler,this);
		confirmBtn.x = bg.x + bg.width/2  + 50;
		confirmBtn.y = bg.y + bg.height + 10;
		confirmBtn.setColor(TextFieldConst.COLOR_BLACK);
		this._nodeContainer.addChild(confirmBtn);

		let cancelBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED,"cancelBtn",this.hide,this);
		cancelBtn.x = bg.x + bg.width/2 - cancelBtn.width - 50;
		cancelBtn.y = confirmBtn.y;
		cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
		this._nodeContainer.addChild(cancelBtn);

    }

	protected setPolicyCallback(event:egret.Event)
    {
        if(event && event.data && event.data.ret)
        {
			let rData = event.data.data;
			 App.CommonUtil.showTip(LanguageManager.getlocal("decree_policy_setSuccessTip"));
			// let nextSpid = Api.promoteVoApi.getSinfo().nextinfo.spid;
			// if(nextSpid)
			// {
			// 	ViewController.getInstance().openView(ViewConst.POPUP.DECREEPOLICYCHANGEPOPUPVIEW);
			// }else{
			// 	ViewController.getInstance().openView(ViewConst.POPUP.DECREEPOLICYDETAILPOPUPVIEW);
			// }
			ViewController.getInstance().openView(ViewConst.POPUP.DECREEPOLICYDETAILPOPUPVIEW);
			ViewController.getInstance().hideView(ViewConst.POPUP.DECREEPOLICYLISTPOPUPVIEW);
        }
		this.hide();
    }
	protected confirmBtnHandler()
	{
		// if(Api.playerVoApi.getPlayerGem() < this._costGemNum)
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("decreePolicyChangeCostTxt"));
		// 	return;
		// }
		let spid = this.param.data.spid;
		NetManager.request(NetRequestConst.REQUEST_POLICY_SETSP,{spid:spid});
	}
    protected getShowHeight():number
	{
		return 400;
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"decree_popbg","decree_policy_icon1","decree_policy_stamp","decree_policy_icon2","decree_policy_icon3","decree_policy_icon4",
    	]);
	}

    public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_SETSP),this.setPolicyCallback,this);

		this._nodeContainer = null;
		this._costGemNum = 0;

		super.dispose();
	}
}