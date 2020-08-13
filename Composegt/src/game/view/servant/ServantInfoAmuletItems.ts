/**
 * 门客详情 突破部分
 * author yanyuling
 * date 2017/11/21
 * @class ServantInfoAmuletItems
 */
class ServantInfoAmuletItems extends BaseDisplayObjectContainer
{
    private _servantId:string = null;
	private _scrollView:ScrollList = null;
    public constructor()
	{
		super();
	}
	public init(servantId:string,bottomH:number):void
	{

		let public_biaoti = BaseBitmap.create("servant_biaotinew"); 
		public_biaoti.x = 15;
		public_biaoti.y = 70;
		public_biaoti.width = 610;
		this.addChild(public_biaoti);

		this._servantId = servantId;
		let servantcfg = Config.ServantCfg.getServantItemById(this._servantId);

		let amuletList = Api.servantVoApi.getServantObj(this._servantId).getAmuletAuraList();
		let amuletKeys = Object.keys(amuletList);
		let ownNUm = Api.amuletVoApi.getAmuletNum(this._servantId);
		let numTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
		numTxt.text = LanguageManager.getlocal("servant_amuletAura_num")  +ownNUm ;
        numTxt.x = public_biaoti.x + 110;
        numTxt.y = public_biaoti.y+public_biaoti.height/2 - numTxt.height/2+1;
		numTxt.name = "numTxt";
        this.addChild(numTxt);

		let isShowList = true;
		let amucfg = Config.AmuletCfg.getAmucfgIndex(amuletKeys[0]);
		if(!amucfg){
			isShowList = false;
			amucfg = Config.AmuletCfg.getAmucfgBySerId(this._servantId);
		}
		let attStr = "";
		let amuletEffect = amucfg.amuletEffect;
		if(amuletEffect.att.length == 4){
			attStr = LanguageManager.getlocal("wifeSkillAllAttAdd");
		}else{
			for (var index1 = 0; index1 < amuletEffect.att.length; index1++) {
				var element = amuletEffect.att[index1];
				if(index1 == 0){
					attStr = LanguageManager.getlocal("servantInfo_speciality" + element);
				}else{
					attStr = attStr + "、" + LanguageManager.getlocal("servantInfo_speciality" + element);
				}
			}
			attStr = attStr + LanguageManager.getlocal("wifeSkillAttAdd");
		}

		let proTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
		proTxt.text =  attStr +  amucfg.amuletEffect.attNum * ownNUm;
        proTxt.x = public_biaoti.x + public_biaoti.width - proTxt.width - 110;
        proTxt.y = numTxt.y;
		proTxt.name = "proTxt";
        this.addChild(proTxt);

		if(!isShowList){
			let _emptyTip = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_emulateEmpty"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			_emptyTip.x = GameConfig.stageWidth/2 - _emptyTip.width/2;
			_emptyTip.y = bottomH/2;
			// _emptyTip.visible = false;
			this.addChild(_emptyTip);
			return;
		}
		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomH-145);
		ServantInfoFourItemScrollItem.servantId = this._servantId; 
		let scrollView = ComponentManager.getScrollList(ServantInfoAmuletScrollItem,amuletKeys,rect);
		scrollView.x = 24;
		scrollView.y = 115;
		this._scrollView = scrollView;
		this.addChild(scrollView);
	}

    private servantWifeLevelupHandler()
    {
        
    }

    public dispose():void
	{
		this._scrollView = null;
        this._servantId =  null;
		super.dispose();
	}

}