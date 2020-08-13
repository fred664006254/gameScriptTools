/**
 * 国策列表UI
 * author yanyuling
 * date 2018/05/28
 * @class DecreePolicyDetailPopupView
 */
class DecreePolicyDetailPopupView  extends PopupView
{
	private _nodeContainer:BaseDisplayObjectContainer;
	private _policyIdx:string;
	private _isShowAni:boolean = false;
	public constructor() 
	{
		super();
	}

	protected initView():void
	{

		if(this.param && this.param.data && this.param.data.isShowAni)
		{
			this._isShowAni = this.param.data.isShowAni;
		}
		this._policyIdx = Api.promoteVoApi.getSpid();
		// this.param.data.spid;
        this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

		let decree_wordbg = BaseBitmap.create("decree_policy_detailbg");
		decree_wordbg.anchorOffsetX = decree_wordbg.width/2;
		decree_wordbg.x = this.viewBg.width/2;
		decree_wordbg.y = 70;
		this._nodeContainer.addChild(decree_wordbg);
		
		let startY = decree_wordbg.y + decree_wordbg.height + 10;
		let policybg = BaseBitmap.create("decree_policy_bg"+this._policyIdx);
		policybg.x = this.viewBg.width/2 - policybg.width/2;
		policybg.y = startY;
		policybg.name = "policybg";
		this._nodeContainer.addChild(policybg);

		
		let policyIconbg = BaseBitmap.create("decree_bookbg");
		policyIconbg.x = policybg.x + 15;
		policyIconbg.y = policybg.y + policybg.height/2 - policyIconbg.height/2;
		this._nodeContainer.addChild(policyIconbg);

		let policyIcon = BaseBitmap.create("decree_policy_icon"+this._policyIdx);
		policyIcon.x = policyIconbg.x + policyIconbg.width/2 - policyIcon.width/2;
		policyIcon.y = policyIconbg.y + policyIconbg.height/2 - policyIcon.height/2;
		this._nodeContainer.addChild(policyIcon);
			
		let nameTxt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_BROWN);
		nameTxt.text = LanguageManager.getlocal("decreePolicy_Name"+this._policyIdx);
		nameTxt.x = policybg.x + 110;
		nameTxt.y = policyIcon.y+6;
		this._nodeContainer.addChild(nameTxt);

		let policyCfg = Config.PolicyCfg.getPolicyById(this._policyIdx);
		let addaddExtent = String(policyCfg.addExtent*100);
		let addaddExtent2 = policyCfg.emAddExtent*100;
		
		let descTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
		descTxt.multiline = true;
		descTxt.lineSpacing = 1;
		descTxt.width = policybg.width - 165;
		if(policyCfg.id == "2")
		{
			descTxt.text = LanguageManager.getlocal("decreePolicy_Desc"+this._policyIdx,[""+policyCfg.addTimes,""+policyCfg.emAddTimes]);
		}else{
			// descTxt.text = LanguageManager.getlocal("decreePolicy_Desc"+this._policyIdx,[""+policyCfg.addTimes,addaddExtent,""+addaddExtent2]);
			descTxt.text = LanguageManager.getlocal("decreePolicy_Desc"+this._policyIdx,[""+policyCfg.addTimes,addaddExtent,""+addaddExtent2]);
		}
		descTxt.x = nameTxt.x;
		descTxt.y = nameTxt.y + nameTxt.height + 3;
		this._nodeContainer.addChild(descTxt);

		startY += policybg.height + 10;

		let goldIcon =  BaseLoadBitmap.create("itemicon1");
		goldIcon.setScale(0.45);
		goldIcon.x = this.viewBg.width/2 - 50;
		goldIcon.y = startY;
		this._nodeContainer.addChild(goldIcon);

		let changeNum = Api.promoteVoApi.getSinfo().nextinfo.num ;
		let costNum = Config.PolicyCfg.amendspNeedGem[changeNum];
		let costTxt = ComponentManager.getTextField("",22);
		costTxt.text = "" + costNum;
		costTxt.x = goldIcon.x + 48;
		costTxt.y = startY + 15;
		this._nodeContainer.addChild(costTxt);
		startY += costTxt.height + 18;

		let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"decreePolicy_changeBtnTxt",this.ProlicyBtnClickHandler,this);
		btn.x = this.viewBg.width/2 - btn.width/2;
		btn.y = startY;
		this._nodeContainer.addChild(btn);
		if(this._isShowAni)
		{
			this.doStampAni();
		}else{
			this.addStampFlag();
		}
    }

	protected doStampAni()
	{
			// let rData =  盖戳
		let stampImg = this.addStampFlag();
		stampImg.setScale(1.5);
		egret.Tween.get(stampImg,{loop:false}).to({scaleX:1,scaleY:1},300)
	}

	protected addStampFlag()
	{
		let policybg = this._nodeContainer.getChildByName("policybg");
		let stampImg = BaseBitmap.create("decree_policy_stamp");
		stampImg.name = "stampImg";
		stampImg.anchorOffsetX = stampImg.width/2;
		stampImg.anchorOffsetY = stampImg.height/2;
		stampImg.x =  policybg.x + + policybg.width - stampImg.width/2 -15;
		stampImg.y = policybg.y + policybg.height/2 ;
		this._nodeContainer.addChild(stampImg);
		return stampImg;
	}
	protected ProlicyBtnClickHandler()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.DECREEPOLICYLISTPOPUPVIEW);
	}

    protected getShowHeight():number
	{
		return 560;
	}

    // 背景图名称
	protected getBgName():string
	{
		return "decree_popbg";
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"decree_policy_detailbg","decree_policy_bg1","decree_policy_bg2","decree_policy_bg3","decree_policy_bg4",
			"decree_popbg","decree_policy_icon1","decree_policy_stamp","decree_policy_icon2","decree_policy_icon3","decree_policy_icon4",
    	]);
	}
	// 标题背景名称
	protected getTitleBgName():string
	{
		return null;
	}

	protected resetBgSize():void
	{
		super.resetBgSize();
		this.titleTF.y = this.viewBg.y+22;
	}

    public dispose():void
	{
		this._nodeContainer = null;
		this._policyIdx = null;
		this._isShowAni = false;
		
		super.dispose();
	}
}