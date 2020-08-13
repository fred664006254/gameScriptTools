/**
 * 国策列表UI
 * author yanyuling
 * date 2018/05/28
 * @class DecreePolicyChangePopupView
 */
class DecreePolicyChangePopupView extends PopupView
{
	private _nodeContainer:BaseDisplayObjectContainer;
	private _tipTxt:BaseTextField;
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
        this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

		let newSpid = Api.promoteVoApi.getSinfo().nextinfo.spid;
		// this.param.data.spid;
		let startY = 70;
		let spidList = [
			Api.promoteVoApi.getSpid(),newSpid,
		]
		for (var index = 0; index <= 1; index++) {
			let tmpSpid = spidList[index]
			var policyCfg:Config.StatePolicyItem = Config.PolicyCfg.getPolicyById(tmpSpid);
			
			let policybg = BaseBitmap.create("decree_policy_bg"+tmpSpid);
			policybg.x = this.viewBg.width/2 - policybg.width/2;
			policybg.y = startY;
			this._nodeContainer.addChild(policybg);
			policybg.touchEnabled = true;

			let iconbg = BaseBitmap.create("decree_bookbg");
			iconbg.x = policybg.x + 15;
			iconbg.y = policybg.y + policybg.height/2 - iconbg.height/2;
			this._nodeContainer.addChild(iconbg);

			let policyIcon = BaseBitmap.create("decree_policy_icon"+tmpSpid);
			policyIcon.x = iconbg.x + iconbg.width/2 - policyIcon.width/2
			policyIcon.y = iconbg.y + iconbg.height/2 - policyIcon.height/2;
			this._nodeContainer.addChild(policyIcon);

			let nameTxt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_BROWN);
			nameTxt.text = LanguageManager.getlocal("decreePolicy_Name"+tmpSpid);
			nameTxt.x = policybg.x + 110;
			nameTxt.y = policyIcon.y+6;
			this._nodeContainer.addChild(nameTxt);

			let descTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
			descTxt.multiline = true;
			descTxt.lineSpacing = 1;
			descTxt.width = policybg.width - 165;
			let addaddExtent = "" + (policyCfg.addExtent*100);
			let addaddExtent2 = policyCfg.emAddExtent*100;
			if(policyCfg.id == "2")
			{
				descTxt.text = LanguageManager.getlocal("decreePolicy_Desc"+policyCfg.id,[""+policyCfg.addTimes,""+policyCfg.emAddTimes]);
			}else{
				descTxt.text = LanguageManager.getlocal("decreePolicy_Desc"+policyCfg.id,[""+policyCfg.addTimes,""+addaddExtent,""+addaddExtent2]);
			}
			descTxt.x = nameTxt.x;
			descTxt.y = nameTxt.y + nameTxt.height + 3;
			this._nodeContainer.addChild(descTxt);
			if(index == 0){
				let arrow = BaseBitmap.create("decree_arrow1");
				arrow.x =   this.viewBg.width/2 - arrow.width/2;
				arrow.y = policybg.y + policybg.height;
				this._nodeContainer.addChild(arrow);
				startY =  startY + arrow.height + 20; 

				let stampImg = BaseBitmap.create("decree_policy_stamp");
				stampImg.x =  policybg.x + + policybg.width - stampImg.width -15;
				stampImg.y = policybg.y + policybg.height/2 - stampImg.height/2;;
				this._nodeContainer.addChild(stampImg);
			}
			startY += 100;
		}

		let tipTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WARN_YELLOW);
		tipTxt.x = this.viewBg.width/2;
		tipTxt.y = startY + 50;
		this._nodeContainer.addChild(tipTxt);
		this._tipTxt = tipTxt;
		this.tick();
    }

	protected tick()
	{
		let zeroSec = App.DateUtil.getWeeTs(GameData.serverTime);
		let lastSec = zeroSec + 60*60*24;
		let str = App.DateUtil.getFormatBySecond(lastSec - GameData.serverTime,1);
		this._tipTxt.text = LanguageManager.getlocal("decreePolicyTipTxt",[str]);
		this._tipTxt.anchorOffsetX = this._tipTxt.width/2;
		return true;
	} 
    protected getShowHeight():number
	{
		return 380;
	}

    // 背景图名称
	protected getBgName():string
	{
		return "decree_popbg";
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"decree_policy_detailbg","decree_policy_bg1","decree_policy_bg2","decree_policy_bg3","decree_policy_bg4","decree_arrow1",
			"decree_popbg","decree_policy_icon1","decree_policy_stamp","decree_policy_icon2","decree_policy_icon3","decree_policy_icon4",
			"decree_bookbg",
    	]);
	}

    public dispose():void
	{
		this._nodeContainer = null;
		this._tipTxt = null;
		
		super.dispose();
	}
}