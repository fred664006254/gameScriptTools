
class AcFourPeopleScrollItem extends ScrollListItem {
	private _fourPeopleNameText: BaseTextField = null;
	private _fourPeopleLvText: BaseTextField = null;
	private _itemNumberText: BaseTextField = null;
	private _label_Text: BaseTextField = null; 
	private _servantId: number = 0;
	private _itemNum: number = 0;
	private _needNum: number = 0;
	private _curr_index: number = 0;
	private _AcFourPeopleVo: AcFourPeopleVo = null;
	private _achRedDotSp: BaseBitmap = null;
	private itemBitmap:BaseBitmap =null;
	private  bottomName:BaseBitmap =null;
	private  currNum:number =0;
	private  _data : any = null;
	public static CODE:string ="1";
	private _peopleType:number = 0;

	public constructor() {
		super();
	}

	private getItemTypeCode():string{
		if (this._peopleType == 1){
			return "5";
		}
		else if (this._peopleType == 2){
			return "1";
		}
		else if (this._peopleType == 3){
			return "2";
		}
		return AcFourPeopleScrollItem.CODE;
	}

	protected initItem(index: number, data: any, itemParam?:any) 
	{	
		this.width = 640;
		this.height = 331;

		if (itemParam ){
			if (itemParam.type){
				this._peopleType = itemParam.type;
			}
			if (itemParam.code){
				AcFourPeopleScrollItem.CODE = itemParam.code;
			}
		}
		
		this.showBg(index);

		this._servantId = data.getServant;
		this._data = data;
		// 当前拥有多少道具
		this._itemNum = Api.itemVoApi.getItemNumInfoVoById(data.needItem);
		this._needNum = data.needNum;
		this._curr_index = index;

		//人物半身相
		let servant: BaseBitmap = BaseLoadBitmap.create(data.servantIcon);
		servant.anchorOffsetX = servant.width / 2;
		servant.anchorOffsetY = servant.height / 2;
		servant.scaleX = 0.6;
		servant.scaleY = 0.6;
		servant.x = servant.x + 30;
		servant.y = servant.y;
		this.addChild(servant);


		//黑色长条
		let fourpeople_mask: BaseBitmap = BaseBitmap.create("fourpeople_mask");
		this.addChild(fourpeople_mask);
		fourpeople_mask.width = 640;
		fourpeople_mask.x = 0;
		fourpeople_mask.y = 260;

		if (PlatformManager.checkIsEnLang()){
			this.height += 20;
			fourpeople_mask.height += 15;
		}
		let servantCfg2 = Config.ServantCfg.getServantItemById(this._servantId); 
		let ability2 = servantCfg2.ability;
		if(ability2.length>6)
		{

			this.height += 40;
			fourpeople_mask.height += 35;
		}

		if (PlatformManager.checkIsEnLang()){
			if(ability2.length>6)
			{
				this.height += 20;
				fourpeople_mask.height += 15;
			}
		}


		//字体背景图片
		let fontbg: BaseBitmap = BaseBitmap.create("public_infobg2");
		this.addChild(fontbg);
		fontbg.x = 10;
		fontbg.y = 10;


		//综合资质
		let forpeople_qualifications: BaseBitmap = BaseBitmap.create("forpeople_qualifications");
		this.addChild(forpeople_qualifications);
		forpeople_qualifications.x = 25;
		forpeople_qualifications.y = 220;

		//综合资质数字
		let starNum = Api.servantVoApi.getServantAptitude(data.getServant);
		let numLb: BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(starNum + "", "recharge_fnt");
		this.addChild(numLb);
		numLb.x = forpeople_qualifications.x + 130;
		numLb.y = forpeople_qualifications.y;

		//道具底图
		let forpeople_bottom: BaseBitmap = BaseBitmap.create("forpeople_bottom");
		this.addChild(forpeople_bottom);
		forpeople_bottom.x = 500;
		forpeople_bottom.y = 150;

		this._achRedDotSp = BaseBitmap.create("public_dot2");
		this._achRedDotSp.x = forpeople_bottom.x + forpeople_bottom.width - 10;//this._itemBtn.x + this._itemBtn.width - this._achRedDotSp.width - 20;
		this._achRedDotSp.y = forpeople_bottom.y;//this._itemBtn.y + 2;
		this.addChild(this._achRedDotSp);


		let servantInfoVo: ServantInfoVo = Api.servantVoApi.getServantObj(data.getServant);
		if (servantInfoVo) {

			let alreadyReceived: BaseBitmap = BaseBitmap.create("achievement_state3");
			this.addChild(alreadyReceived);
			// alreadyReceived.x = this.width - 160;
			// alreadyReceived.y = this.height - 180;
			alreadyReceived.x = forpeople_bottom.x - 15;
			alreadyReceived.y = forpeople_bottom.y + 10;
			// if(AcFourPeopleScrollItem.CODE=="5")
			// {
			// 	alreadyReceived.y = this.height - 200;
			// }

			if (this._achRedDotSp) {
				this.removeChild(this._achRedDotSp);
			}
		}
		else 
		{
			//道具图片
			let code = this.getItemTypeCode();
			this._achRedDotSp.visible = true; 
			if(code=="5")
			{
				this.itemBitmap = BaseLoadBitmap.create("itemicon2006");
			}
			else if(code=="3")
			{
				this.itemBitmap = BaseLoadBitmap.create("itemicon2004");
			}
			else
			{
				this.itemBitmap = BaseLoadBitmap.create("itemicon200"+code);	
			}
	
			this.itemBitmap.x= this.width - this.itemBitmap.width - 140;
			this.itemBitmap.y = this.height / 2 - this.itemBitmap.height / 2 -15;
			if(code=="5")
			{
				this.itemBitmap.y =	this.itemBitmap.y -20;
			}
			if (PlatformManager.checkIsEnLang()){
				this.itemBitmap.y =	this.itemBitmap.y - 20;
			}
			this.addChild(this.itemBitmap);
			this.itemBitmap.name =index+"";
			this.itemBitmap.addTouchTap(this.itemHandler,this);


			 //名字底图
			this.bottomName=BaseBitmap.create("fourpeople_bottom");
			this.bottomName.x= forpeople_bottom.x
			this.bottomName.y= forpeople_bottom.y+80;
			this.addChild(this.bottomName);
		

	   

			//道具数量
			this._itemNumberText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON);
			this._itemNumberText.x = forpeople_bottom.x + 26;
			this._itemNumberText.y = forpeople_bottom.y + 82;
			if (this._itemNum >= data.needNum) {
				this._itemNumberText.textColor = TextFieldConst.COLOR_WARN_GREEN;
				// this._AcFourPeopleVo.red = true; 
				this._achRedDotSp.visible = true;

			}
			else {
				this._itemNumberText.textColor = TextFieldConst.COLOR_WARN_YELLOW;
				// this._AcFourPeopleVo.red = false;
				this._achRedDotSp.visible = false;

			}
			this._itemNumberText.text = this._itemNum + "/" + data.needNum;
			this.addChild(this._itemNumberText);

		}


		//名字
		this._fourPeopleNameText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_TITLE_COMMON);

		// this._fourPeopleNameText.height = 80;
		this._fourPeopleNameText.text = data.servantName;
		if(PlatformManager.checkIsTextHorizontal())
		{
			fontbg.width = this._fourPeopleNameText.width + 40;
			fontbg.setPosition(25,160);
			this._fourPeopleNameText.setPosition(fontbg.x + fontbg.width / 2 - this._fourPeopleNameText.width / 2,fontbg.y + fontbg.height / 2 - this._fourPeopleNameText.height / 2);
		}
		else{
			this._fourPeopleNameText.x = fontbg.x + 25;
			this._fourPeopleNameText.y = fontbg.y + 30;
			this._fourPeopleNameText.width = 28;
		}
		this.addChild(this._fourPeopleNameText);


		let servantCfg = Config.ServantCfg.getServantItemById(this._servantId);
		let ability = servantCfg.ability;
		if (PlatformManager.checkIsEnLang()){
			//英文版每行两条属性
			for (var i = 0; i < ability.length; i++) {
				let aid = ability[i];
				let tmpAcfg = GameConfig.config.abilityCfg[aid];

				let attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_attrNameTxt" + aid), 20);
				attrTxt.x = 315 * (i % 2) + 15;
				attrTxt.y = 265 + Math.floor(i / 2) * 28;
				this.addChild(attrTxt);
	

				let starsIcon: BaseBitmap = BaseBitmap.create("servant_star");
				starsIcon.x = attrTxt.x + 235//attrTxt.width;// + 125;
				starsIcon.y = attrTxt.y - 4;
				this.addChild(starsIcon);

				let attrValueTxt = ComponentManager.getTextField("x" + tmpAcfg.num.toString(), 20);
				attrValueTxt.x = starsIcon.x + 35;
				attrValueTxt.y = attrTxt.y;
				this.addChild(attrValueTxt)
			}


		} else {
			for (var i = 0; i < ability.length; i++) {
				let aid = ability[i];
				let tmpAcfg = GameConfig.config.abilityCfg[aid];

				let attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_attrNameTxt" + aid), 20);
				attrTxt.x = 210 * i + 20;
				attrTxt.y = 275;
				this.addChild(attrTxt);
				if (i >= 3) {
					attrTxt.x = (i - 3) * 210 + 20;
					attrTxt.y = 305;
				}
				if(i>=6)
				{
					attrTxt.x = (i - 6) * 210 + 20;
					attrTxt.y = 335;
				}

				let starsIcon: BaseBitmap = BaseBitmap.create("servant_star");
				starsIcon.x = attrTxt.x + 125//attrTxt.width;// + 125;
				starsIcon.y = attrTxt.y - 4;
				this.addChild(starsIcon);

				let attrValueTxt = ComponentManager.getTextField("x" + tmpAcfg.num.toString(), 20);
				attrValueTxt.x = starsIcon.x + 35;
				attrValueTxt.y = attrTxt.y;
				this.addChild(attrValueTxt)
			}
		}

            if(servantCfg.quality2)
			{	
				let cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
				cornerImg.x = 250;
				cornerImg.y = 180;
				cornerImg.setScale(1.3);
				this.addChild(cornerImg);
			}

		//特殊光环
		this.speciaLaura();
		// this.checkBtnState();
	}
	public speciaLaura(): void {
		let code = this.getItemTypeCode();
		//九宫格
		let bg1: BaseBitmap = BaseBitmap.create("fourfloor");
		bg1.y = + 70;
		bg1.x = 180;
		bg1.width = 312;
		bg1.height = 110;
		bg1.x = this.width - bg1.width - 20;
		bg1.y = 20;
		this.addChild(bg1);

		//特殊光环文字
		let lauraImg: BaseBitmap = BaseBitmap.create("fourpecialaura");
		this.addChild(lauraImg);
		lauraImg.x = bg1.x + 90;
		lauraImg.y = bg1.y + 12;

		//武力描述
		let forceText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(),18);
		let message: string = LanguageManager.getlocal("acFourPeoplea_force"+code);
		forceText.x = bg1.x + 16;
		forceText.y = bg1.y + 50;
		forceText.text = message;
		forceText.width =bg1.width;
		this.addChild(forceText);

		//属性描述
		let forceText2 = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), 18);
		let message2: string = LanguageManager.getlocal("acFourPeoplea_attribute"+code);
		forceText2.x = bg1.x + 16;
		forceText2.y = bg1.y + 80;
		forceText2.width =bg1.width;
		forceText2.text = message2;
		this.addChild(forceText2);
		if(PlatformManager.checkIsTextHorizontal() )
		{
			lauraImg.y -= 6;
			forceText.y -= 12;
			forceText2.y -= 2;
		}
		if(PlatformManager.checkIsEnLang()){
			forceText.width =bg1.width - 32;
			forceText2.width =bg1.width - 32;
			bg1.height +=15;
		}



	}

	public itemHandler(evt:egret.TouchEvent): void {
		let code = this.getItemTypeCode();
		var itemStr = "itemicon200"+code;
		if(code=="5")
		{
			itemStr = "itemicon2006";
		}
		else if(code=="3")
		{
			itemStr = "itemicon2004";
		}
		var num:number =Number(evt.currentTarget.name);
		num+=1;
		this.currNum = num;
		if (this._peopleType){
			this.currNum = this._data.id;
		}
		if (this._itemNum >= this._needNum) {
			let message: string = LanguageManager.getlocal("acFourPeoplea_de"+code, [App.StringUtil.toString(this._needNum), "11"]);  
			
			ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.confirmCallbackHandler, handler: this, icon: itemStr, iconBg: "itembg_7", num: this._itemNum, msg: message, id : this._data.needItem,useNum:this._needNum});
		}
		else {
			let message: string = LanguageManager.getlocal("acFourPeoplea_de"+code, [App.StringUtil.toString(this._needNum), "11"]);
			ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.confirmCallbackHandler2, handler: this, icon: itemStr, iconBg: "itembg_7", num: this._itemNum, msg: message, id : this._data.needItem,useNum:this._needNum});	
		}
	}
	public confirmCallbackHandler(): void {
	
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_EXCHANGEFOURPEOPLE, { "activeId": "fourPeople-"+AcFourPeopleScrollItem.CODE, "rkey": this.currNum });
	}

	public confirmCallbackHandler2():void
	{
		let code = this.getItemTypeCode();
		App.CommonUtil.showTip(LanguageManager.getlocal("acFourPeoplea_token"+code));
	}

	public showBg(index: number = 0): void {
		let bg: BaseBitmap; 
		let code = this.getItemTypeCode();
		if(code=="1")
		{
			var num:number =index+1;	
			bg = BaseBitmap.create("fourpeople_bg_"+num); 
			// console.log("fourpeople_bg_"+num);
			
		}
		else if(code=="2")
		{
			bg = BaseBitmap.create("forpeople_bg2"); 
		} 
		else if(code=="3")
		{
			bg = BaseBitmap.create("forpeople_bg3"); 
		} 
		else if(code=="5")
		{
			bg = BaseBitmap.create("forpeople_bg5"); 
		} 
		else
		{
			bg = BaseBitmap.create("fourpeople_bg_"+num); 
		}
		this.addChild(bg);
	}
	public getSpaceY(): number {
		return 10;
	}
	public getSpaceX(): number {
		return 0;
	}
	public dispose(): void {

		this._fourPeopleNameText = null;
		this._fourPeopleLvText = null;
		this._itemNumberText = null; 
		this.itemBitmap = null;
		this._servantId = 0;
		this._itemNum = 0;
		this._needNum = 0;
		this._curr_index = 0;
		this._achRedDotSp = null;
		this.bottomName =null;
		this.currNum  =0
		// AcFourPeopleScrollItem.CODE="1";
		this._peopleType = 0;
		super.dispose();
	}
}