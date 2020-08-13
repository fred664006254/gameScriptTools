
class BetheKingGetKingPopupView extends PopupView
{	
	public constructor() {
		super();
	}

	private _aid:string;
	private _code:string;
	private _acVo:AcBeTheKingVo;
	private _tipTxt:BaseTextField;
	private _isExAnable:boolean = false;
	private _itemNumberText:BaseTextField;
	private _cfg:Config.AcCfg.BeTheKingCfg;
	protected initView():void
	{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_KINGS_CONVERT,this.exchangeCallBackHandler,this);
		this._aid = this.param.data.aid;
		this._code = this.param.data.code;
		this._acVo = <AcBeTheKingVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid,this._code);

		let rankBg = BaseLoadBitmap.create("betheking_getking_bg");
		rankBg.width = 537;
		rankBg.height = 514;
		rankBg.setPosition(39,10);
		this.addChildToContainer(rankBg);

		let bg02:BaseBitmap = BaseBitmap.create("public_tc_bg02");
		bg02.x = this.viewBg.width/2 - bg02.width/2;
		bg02.y = rankBg.y + rankBg.height + 10;
		this.addChildToContainer(bg02);

		this._cfg =  <Config.AcCfg.BeTheKingCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._aid,this._code);
		let servantExchange = this._cfg.servantExchange["1"];
		let servantID = servantExchange.servantID;
		//综合资质
		let forpeople_qualifications: BaseBitmap = BaseBitmap.create("forpeople_qualifications");
		this.addChildToContainer(forpeople_qualifications);
		forpeople_qualifications.x = bg02.x + 30;
		forpeople_qualifications.y = bg02.y + bg02.height/2 - forpeople_qualifications.height/2;

		//综合资质数字
		let starNum = Api.servantVoApi.getServantStarsNumWithId( servantID);
		let numLb: BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(starNum + "", "recharge_fnt");
		this.addChildToContainer(numLb);
		numLb.x = forpeople_qualifications.x + 130;
		numLb.y = bg02.y + bg02.height/2 - numLb.height/2;

		let sercfg = Config.ServantCfg.getServantItemById( servantID);
		if(sercfg.wifeId){
			//综合资质
			let forpeople_qualifications2: BaseBitmap = BaseBitmap.create("forpeople_qualifications2");
			this.addChildToContainer(forpeople_qualifications2);
			forpeople_qualifications2.x = numLb.x + numLb.width + 40;
			forpeople_qualifications2.y = forpeople_qualifications.y;

			//综合资质数字	
			let starNum2 = Config.WifeCfg.getWifeCfgById(sercfg.wifeId).glamour;//  Api.servantVoApi.getServantStarsNumWithId(data.getServant);
			let numLb2: BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(starNum2 + "", "recharge_fnt");
			this.addChildToContainer(numLb2);
			numLb2.x = forpeople_qualifications2.x + 130;
			numLb2.y = numLb.y;
		}

		let innerBg = BaseBitmap.create("public_tc_bg01");
        innerBg.width = 360;
        innerBg.height  = 120;
		innerBg.x = rankBg.x+ 20;
		innerBg.y = bg02.y+ bg02.height + 10; 
        this.addChildToContainer(innerBg);

		let forpeople_bottom: BaseBitmap = BaseBitmap.create("forpeople_bottom");
		this.addChildToContainer(forpeople_bottom);
		forpeople_bottom.x = innerBg.x + innerBg.width + 20;;
		forpeople_bottom.y = innerBg.y + 20;;

		//道具图片
		let needItem = servantExchange.needItem;
		let iconTab = needItem.split("_");
		let itemBitmap=BaseLoadBitmap.create("itemicon"+iconTab[1]);
		itemBitmap.x= forpeople_bottom.x + forpeople_bottom.width/2 - 40;
		itemBitmap.y = forpeople_bottom.y + forpeople_bottom.height/2 - 50;
		itemBitmap.addTouchTap(this.exchangeHandler,this);
		this.addChildToContainer(itemBitmap);

		//名字底图
		let bottomName=BaseBitmap.create("fourpeople_bottom");
		bottomName.x= itemBitmap.x
		bottomName.y= itemBitmap.y + 70;
		this.addChildToContainer( bottomName);

		//道具数量
		let itemNumberText = ComponentManager.getTextField("1", TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this._itemNumberText =itemNumberText;
		itemNumberText.x = bottomName.x + bottomName.width/2;
		itemNumberText.y = bottomName.y + bottomName.height/2 -  itemNumberText.height/2;
		this.addChildToContainer(itemNumberText);
		this.refreshNums();

		let tipTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
		tipTxt.text = LanguageManager.getlocal("acFourPeoplea_light");
		tipTxt.x = innerBg.x + innerBg.width/2 - tipTxt.width/2;
		tipTxt.y = innerBg.y + 20;
		this.addChildToContainer(tipTxt);

		let line:BaseBitmap = BaseBitmap.create ("public_huawen_bg");
		this.addChild(line);
		line.x = innerBg.x + innerBg.width/2 - line.width/2;
		line.y = tipTxt.y + 25;
		this.addChildToContainer(line);

	

		//武力描述
		let forceText = ComponentManager.getTextField("",18);
		let aura1 = sercfg.aura["1"];
		let message: string = LanguageManager.getlocal("servant_fourPeopleaura"+ aura1.auraIcon);
		let attStr = ""
		
		if(aura1.att.length == 4){
			attStr = LanguageManager.getlocal("wifeSkillAllAttAdd");
		}else{
			for (var index1 = 0; index1 < aura1.att.length; index1++) {
				var element = aura1.att[index1];
				if(index1 == 0){
					attStr = LanguageManager.getlocal("servantInfo_speciality" + element);
				}else{
					attStr = attStr + "、" + LanguageManager.getlocal("servantInfo_speciality" + element);
				}
			}
			attStr = attStr + LanguageManager.getlocal("wifeSkillAttAdd");
		}
		if(aura1.growAtt < 1){
			attStr = attStr + (aura1.growAtt*100) + "%"
		}else{
			attStr =  attStr +  (aura1.growAtt).toString();
		}
		forceText.text = message + ": " + App.StringUtil.formatStringColor(LanguageManager.getlocal("betheKing_perlv")+attStr,TextFieldConst.COLOR_WARN_GREEN2);
		if(PlatformManager.checkIsTextHorizontal()){
			forceText.x = innerBg.x + 12;
			forceText.y = innerBg.y + 60;
			forceText.width =innerBg.width-24;
		} else {
			forceText.x = innerBg.x + 30;
			forceText.y = innerBg.y + 60;
			forceText.width =innerBg.width;
		}
		
		this.addChildToContainer(forceText);

		//属性描述
		let forceText2 = ComponentManager.getTextField("", 18);
		let aura2 = sercfg.aura["2"];
		let message2: string = LanguageManager.getlocal("servant_fourPeopleaura"+ aura2.auraIcon);
		let attStr2 = ""
		
		if(aura2.att.length == 4){
			attStr2 = LanguageManager.getlocal("wifeSkillAllAttAdd");
		}else{
			for (var index1 = 0; index1 < aura2.att.length; index1++) {
				var element = aura2.att[index1];
				if(index1 == 0){
					attStr2 = LanguageManager.getlocal("servantInfo_speciality" + element);
				}else{
					attStr2 = attStr2 + "、" + LanguageManager.getlocal("servantInfo_speciality" + element);
				}
			}
			attStr2 = attStr2 + LanguageManager.getlocal("wifeSkillAttAdd");
		}
		if(aura2.growAtt < 1){
			attStr2 = attStr2 + (aura2.growAtt*100) + "%"
		}else{
			attStr2 =  attStr2 +  (aura2.growAtt).toString();
		}
		forceText2.text =  message2 + ": " + App.StringUtil.formatStringColor(LanguageManager.getlocal("betheKing_perlv")+attStr2,TextFieldConst.COLOR_WARN_GREEN2);
		if(PlatformManager.checkIsTextHorizontal()){
			forceText2.x = innerBg.x + 12;
			forceText2.y = forceText.y + forceText.height +3;
			forceText2.width =innerBg.width - 24;
			innerBg.height = forceText2.y + forceText2.height - innerBg.y + 12;
		} else {
			forceText2.x = innerBg.x + 30;
			forceText2.y = innerBg.y + 90;
			forceText2.width =innerBg.width;
		}
		this.addChildToContainer(forceText2);

	}
	
	private refreshNums()
	{
		let servantExchange = this._cfg.servantExchange["1"];
		let needItem = servantExchange.needItem;
		let iconTab = needItem.split("_");
		let needN = Number(iconTab[2]);
		let owdn = Api.itemVoApi.getItemNumInfoVoById(iconTab[1]);
		if (owdn >= needN ) {
			this._isExAnable = true;
			this._itemNumberText.textColor = TextFieldConst.COLOR_WARN_GREEN2;
		}else {
			this._isExAnable = false;
			this._itemNumberText.textColor = TextFieldConst.COLOR_WARN_YELLOW;
		}
		this._itemNumberText.text = owdn + "/" + needN;
		this._itemNumberText.anchorOffsetX =  this._itemNumberText.width/2;
	}
	protected exchangeCallBackHandler(event:egret.Event):void
	{
        let data:{ret:boolean,data:any}=event.data;
		let ret = data.data.ret;
		if(ret == 0 )
		{
			this.refreshNums();
			// this._tipTxt.text = LanguageManager.getlocal("betheking_my_popularity2",[""+this._acVo.cnum]);
			// NetManager.request(NetRequestConst.REQUEST_KINGS_KINGINFO,{activeId:this._acVo.aidAndCode});
		}
	}
	
	protected exchangeHandler()
	{
		let convStatus = this._acVo.getConvertStatus();
		if(convStatus == 0 ){
			App.CommonUtil.showTip(LanguageManager.getlocal("betheKing_convertTip1"));
			return ;
		}
		let servantExchange = this._cfg.servantExchange["1"];
		let servantID = servantExchange.servantID;
		if( convStatus == 2){
			App.CommonUtil.showTip(LanguageManager.getlocal("betheKing_convertTip2"));
			return ;
		}
		NetManager.request(NetRequestConst.REQUEST_KINGS_CONVERT,{activeId:this._acVo.aidAndCode,vertId:"1"});
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"forpeople_qualifications","forpeople_qualifications2", "recharge_fnt","fourpeople_bottom","forpeople_bottom",
		]);
	}

	public dispose():void
	{	
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_KINGS_CONVERT,this.exchangeCallBackHandler,this);
		this._aid = null;
		this._code = null;
		this._acVo = null;
		this._tipTxt = null;
		this._isExAnable = false;
		this._itemNumberText = null;
		this._cfg = null;

		super.dispose();
	}
}