/**
 * 20190401
 * 奸臣皮肤兑换
 */
class AcStargazerSingleExchangePopupView extends PopupView {

	public constructor() {
		super();
	}

	private _ownTxt:BaseTextField;
  	private _droWifeIcon:BaseLoadDragonBones=undefined;
	private _skinImg:BaseLoadBitmap=undefined;
	private _acvo:AcStargazerSingleVo = undefined;
	private _exchangeBtn:BaseButton;

	private _skinTipTxt:BaseTextField;
	private _ownerTxt:BaseTextField;
	private _skinNameTxt:BaseTextField;
	private _skinnamebg:BaseBitmap;
	private _innerTopBg:BaseBitmap;

	private _rect:egret.Rectangle;
	private _scrollView:ScrollView;
	private _tarY:number;
	private _servantContainer: BaseDisplayObjectContainer;
	private _skinIdIndex:number = 0;
	private _innerbg:BaseBitmap = null;
	private aid:string = null;
	private code :string = null;
	private get cfg(){
		let cfg = <Config.AcCfg.StargazerSingleCfg>this._acvo.config;
		return cfg
	}
	protected initView(): void {

		// {"aid":this.aid,"code":this.code}
		let aid = this.param.data.aid;
		let code = this.param.data.code;
		this.code = code;
		this.aid = aid;
		

		this._acvo = <AcStargazerSingleVo> Api.acVoApi.getActivityVoByAidAndCode(aid,code);

		

		// this._skinIdIndex = 0;//this._acvo.canExchangeIndex();
		// let exchangeShopItem = this.cfg.getRewardSkinIdByIndex(this._skinIdIndex);


		let skincfg = Config.ServantskinCfg.getServantSkinItemById(this.cfg.TraitorSkinId);
		let bg:BaseBitmap = BaseBitmap.create(this.getDefaultRes("acstargazer_changebg"));//acstargazer_changebg
		bg.setPosition((this.viewBg.width-bg.width)/2,90);
		this.addChildToContainer(bg);
		
		let topflag =  BaseBitmap.create("ransackTraitor_txt3");
		topflag.setPosition(bg.x + bg.width/2 - topflag.width/2,0);
		this.addChildToContainer(topflag);
		
		let leftflag =  BaseBitmap.create("ransackTraitor_leftimg");
		leftflag.setPosition(0,65);
		this.addChildToContainer(leftflag);
		this._servantContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._servantContainer);

		this.showDBDragon(skincfg.id,bg.y + bg.height);

		// let leftBtn = ComponentManager.getButton("ransackTraitorSP_leftbtn",null,this.leftBtnHandler,this);
		// leftBtn.x = this.viewBg.x + 10;
		// leftBtn.y = this.viewBg.y + 400;
		// this.addChildToContainer(leftBtn);

		// let rightBtn = ComponentManager.getButton("ransackTraitorSP_leftbtn",null,this.rightBtnHandler,this);
		// // rightBtn.skewX
		// // rightBtn.rotation = 180;
		// rightBtn.scaleX = -1
		// rightBtn.x = this.viewBg.x + this.viewBg.width  - 10;
		// rightBtn.y = this.viewBg.y + 400;
		// this.addChildToContainer(rightBtn);

		let skinnamebg = BaseBitmap.create(this.getDefaultRes("acstargazer_namebg"));
        skinnamebg.x = bg.x + 10;
        skinnamebg.y = bg.y + 30;
		this.addChildToContainer(skinnamebg);
		this._skinnamebg = skinnamebg;
 
		let skinNameTxt = ComponentManager.getTextField(skincfg.getSkinName(),20,0xfde28e);
        skinNameTxt.x = skinnamebg.x + 35;
        skinNameTxt.y = skinnamebg.y + 16;
        this.addChildToContainer(skinNameTxt);
		this._skinNameTxt = skinNameTxt;

		let ownerTxt = ComponentManager.getTextField("",20,0xfde28e);
		ownerTxt.text = LanguageManager.getlocal("servant_name"+ skincfg.servantId);
        ownerTxt.x = skinNameTxt.x  ;
        ownerTxt.y = skinNameTxt.y + 23;
        this.addChildToContainer(ownerTxt);
		this._ownerTxt = ownerTxt;

        let bottomBg:BaseBitmap = BaseBitmap.create("wifeview_xinxibanbg");
		bottomBg.width = 550;
		bottomBg.height = 390;
		bottomBg.x = bg.x+bg.width/2 - bottomBg.width/2;
		bottomBg.y = bg.y + bg.height -80;
        this.addChildToContainer(bottomBg);

		let servantcfg = Config.ServantCfg.getServantItemById(skincfg.servantId);
		let aura = servantcfg.aura;
		let auraIdList = [];
		for (var key in aura) {
			if (aura.hasOwnProperty(key)) {
				var element = aura[key];
				if(element.startDemand){
					let did = element.startDemand.split("_")[1];
					if(did && did == skincfg.id)
					{
						auraIdList.push(key);
					}
				}
			}
		}

        let innerbg = BaseBitmap.create("public_9v_bg09");
		innerbg.width = 520
		innerbg.height = bottomBg.height - 60;
		innerbg.x = bottomBg.x + bottomBg.width/2 - innerbg.width/2;
		innerbg.y = bottomBg.y +26;
		this.addChildToContainer(innerbg);
		this._innerbg = innerbg;

		let innerTopBg = BaseBitmap.create("public_up3");
		innerTopBg.width = innerbg.width - 10;
		innerTopBg.height = 50;
		innerTopBg.x = bottomBg.x + bottomBg.width/2 - innerTopBg.width/2;
		innerTopBg.y = bottomBg.y + 29.5;
		this.addChildToContainer(innerTopBg);
		this._innerTopBg = innerTopBg;
		
		this._ownTxt = ComponentManager.getTextField("",18,TextFieldConst.COLOR_BROWN);
		this._ownTxt.text = LanguageManager.getlocal("acStargazer_ownTxt",[this._acvo.getItemNumByIndex(String(this.cfg.RansackItemID)) + "/"+this.cfg.RansackItemNum]);
	    this._ownTxt.x = innerTopBg.x + 70 ;
	    this._ownTxt.y = innerTopBg.y + innerTopBg.height/2 - this._ownTxt.height/2;
	    this.addChildToContainer(this._ownTxt);

		let exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"acStargazer_btn3",this.exchangeBtnHandler,this,null,null,36);
		exchangeBtn.setScale(0.6);
		exchangeBtn.x = innerTopBg.x + innerTopBg.width/2 + 20;
		exchangeBtn.y = innerTopBg.y + innerTopBg.height/2 - exchangeBtn.height/2 * exchangeBtn.scaleX;
		this.addChildToContainer(exchangeBtn);
		this._exchangeBtn = exchangeBtn;

		// if(Api.servantVoApi.isOwnSkinOfSkinId(String(exchangeShopItem.skinID))){
		// 	// exchangeBtn.
		// 	App.DisplayUtil.changeToGray(this._exchangeBtn);
		// 	this._exchangeBtn.setText("acStargazer_btn4");
		// 	this._ownTxt.text = LanguageManager.getlocal("acStargazer_ownTxt",["0/"+exchangeShopItem["proofNum"]]);
		// } else {
		// 	App.DisplayUtil.changeToNormal(this._exchangeBtn);
		// 	this._exchangeBtn.setText("acStargazer_btn3");
		// }


		if(Api.servantVoApi.isOwnSkinOfSkinId(String(this.cfg.TraitorSkinId))){
			// exchangeBtn.
			App.DisplayUtil.changeToGray(exchangeBtn);
			this._exchangeBtn.setText("acStargazer_btn4");
		} else {
			App.DisplayUtil.changeToNormal(this._exchangeBtn);
			this._exchangeBtn.setText("acStargazer_btn3");

		}
		let isexcge =  this._acvo.isExchangeEnable();//(this._skinIdIndex);
		if(isexcge){
			App.CommonUtil.addIconToBDOC(this._exchangeBtn);
		}else{
			App.CommonUtil.removeIconFromBDOC(this._exchangeBtn);
		}
	 	let skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect"+this.cfg.TraitorSkinId),18,TextFieldConst.COLOR_BROWN);
	    skinTipTxt.width = innerbg.width - 10;
	    skinTipTxt.textAlign = egret.HorizontalAlign.LEFT;
	    skinTipTxt.multiline = true;
	    skinTipTxt.lineSpacing = 5;
	    skinTipTxt.x = innerbg.x + 5;
	    skinTipTxt.y = innerTopBg.y + innerTopBg.height + 3;
	    this.addChildToContainer(skinTipTxt);
		this._skinTipTxt = skinTipTxt;

		let rect = new egret.Rectangle(0,0,innerTopBg.width,innerbg.height - 150 - (skinTipTxt.height - 41));
		this._rect = rect;
		let listNode = new BaseDisplayObjectContainer();
		let addAbility = skincfg.addAbility;
		let startY = 0;

		AcStargazerScrollItem.servantId = skincfg.servantId; 
		for (let index = 0; index < auraIdList.length; index++) {
			let element = auraIdList[index];
			let bnode = new AcStargazerScrollItem();
			bnode.init(element);
			bnode.x = 5 ;
			bnode.y = startY ;
			startY += bnode.height +5;
			listNode.addChild(bnode);
		}

 		for (let index2 = 0; index2 < addAbility.length; index2++) {
			let bnode = new AcStargazerBookScrollItem();
			bnode.init(skincfg.id,index2,skincfg.servantId);
			bnode.x = 5 ;
			bnode.y = startY ;
			startY += bnode.height +5;
			listNode.addChild(bnode);
        }
		listNode.height += 10;
		let scrollView = ComponentManager.getScrollView(listNode,rect);
		scrollView.x = innerTopBg.x;;
		scrollView.y = skinTipTxt.y + skinTipTxt.height + 5;;
		scrollView.horizontalScrollPolicy = "off";
		this._scrollView = scrollView;
		this.addChildToContainer(scrollView);

		let probg3 = BaseBitmap.create("public_left2");	
		probg3.width = innerTopBg.width ;
		probg3.height = 35;
		probg3.x = innerTopBg.x  ;
		probg3.y = bottomBg.y + bottomBg.height - 75;
		this.addChildToContainer(probg3);

        let btmTip = ComponentManager.getTextField(LanguageManager.getlocal("skin_servantInTip"),18,TextFieldConst.COLOR_BROWN);
        btmTip.x = bottomBg.x + bottomBg.width/2 - btmTip.width/2;
        btmTip.y = probg3.y + probg3.height/2 - btmTip.height/2;
        this.addChildToContainer(btmTip);

		this.closeBtn.y = 40;
	}
    private decode():string{
        if(this.code == "1" || this.code == "5"){
            return "1";
        } else if(this.code == "2" || this.code == "6"){
            return "2";
        } else if(this.code == "3" || this.code == "7"){
            return "3";
        } else if(this.code == "4" || this.code == "8"){
            return "4";
        }
    }
    //根据资源名字得到完整资源名字
    protected getDefaultRes(resName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(ResourceManager.hasRes(resName+"-"+this.decode())){
            return resName+"-"+this.decode();
        } else {
            return resName+"-"+defaultCode;
        }
    }
    protected getDefaultCn(cnName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(LanguageManager.checkHasKey(cnName+"-"+this.decode())){
            return cnName + "-" + this.decode();
        } else {
            return cnName + "-" + defaultCode;
        }
    }

	private leftBtnHandler(){
		this._skinIdIndex --;
		if(this._skinIdIndex < 0){
			this._skinIdIndex = 3;
		}
		this.refreshView();
	}
	private rightBtnHandler(){
		this._skinIdIndex ++;
		if(this._skinIdIndex > 3){
			this._skinIdIndex = 0;
		}
		this.refreshView();
	}
	private refreshView(){
		// let exchangeShopItem = this.cfg.getRewardSkinIdByIndex(this._skinIdIndex);
		let skincfg = Config.ServantskinCfg.getServantSkinItemById(this.cfg.TraitorSkinId);
		
		this.showDBDragon(skincfg.id);

		this._skinNameTxt.text = skincfg.getSkinName();
		this._skinNameTxt.x = this._skinnamebg.x + 35;
        this._skinNameTxt.y = this._skinnamebg.y + 16;

		this._ownerTxt.text = LanguageManager.getlocal("servant_name"+ skincfg.servantId);
		this._ownerTxt.x = this._skinNameTxt.x  ;
        this._ownerTxt.y = this._skinNameTxt.y + 23;

		let servantcfg = Config.ServantCfg.getServantItemById(skincfg.servantId);
		let aura = servantcfg.aura;
		let auraIdList = [];
		for (var key in aura) {
			if (aura.hasOwnProperty(key)) {
				var element = aura[key];
				if(element.startDemand){
					let did = element.startDemand.split("_")[1];
					if(did && did == skincfg.id)
					{
						auraIdList.push(key);
					}
				}
			}
		}

		this._ownTxt.text = LanguageManager.getlocal("acStargazer_ownTxt",[this._acvo.getItemNumByIndex(String(this.cfg.RansackItemID)) + "/"+this.cfg.RansackItemNum]);

		if(Api.servantVoApi.isOwnSkinOfSkinId(String(this.cfg.TraitorSkinId))){
			// exchangeBtn.
			App.DisplayUtil.changeToGray(this._exchangeBtn);
			this._exchangeBtn.setText("acStargazer_btn4");
			this._ownTxt.text = LanguageManager.getlocal("acStargazer_ownTxt",["0/"+this.cfg.RansackItemNum]);
		} else {
			App.DisplayUtil.changeToNormal(this._exchangeBtn);
			this._exchangeBtn.setText("acStargazer_btn3");
		}
		this._ownTxt.x = this._innerTopBg.x + 70 ;
	    this._ownTxt.y = this._innerTopBg.y + this._innerTopBg.height/2 - this._ownTxt.height/2;

		let isexcge =  this._acvo.isExchangeEnable();//(this._skinIdIndex);
		if(isexcge){
			App.CommonUtil.addIconToBDOC(this._exchangeBtn);
		}else{
			App.CommonUtil.removeIconFromBDOC(this._exchangeBtn);
		}

		this._skinTipTxt.text = LanguageManager.getlocal("servantSkinEffect"+this.cfg.TraitorSkinId);

		this.container.removeChild(this._scrollView);
		let listNode = new BaseDisplayObjectContainer();
		let addAbility = skincfg.addAbility;
		let startY = 0;

		AcStargazerScrollItem.servantId = skincfg.servantId; 
		for (let index = 0; index < auraIdList.length; index++) {
			let element = auraIdList[index];
			let bnode = new AcStargazerScrollItem();
			bnode.init(element);
			bnode.x = 5 ;
			bnode.y = startY ;
			startY += bnode.height +5;
			listNode.addChild(bnode);
		}

 		for (let index2 = 0; index2 < addAbility.length; index2++) {
			let bnode = new AcStargazerBookScrollItem();
			bnode.init(skincfg.id,index2,skincfg.servantId);
			bnode.x = 5 ;
			bnode.y = startY ;
			startY += bnode.height +5;
			listNode.addChild(bnode);
        }
		listNode.height += 10;
		// this._rect = new egret.Rectangle(0,0,innerTopBg.width,innerbg.height - 150 - (skinTipTxt.height - 41));
		// this._rect = rect;
		// this._rect.height 
		let rect = new egret.Rectangle(0,0,this._rect.width,this._innerbg.height - 150 - (this._skinTipTxt.height - 41));
		let scrollView = ComponentManager.getScrollView(listNode,rect);
		scrollView.x = this._innerTopBg.x;;
		scrollView.y = this._skinTipTxt.y + this._skinTipTxt.height + 5;;
		scrollView.horizontalScrollPolicy = "off";
		this._scrollView = scrollView;
		this.addChildToContainer(scrollView);


	}

	private exchangeBtnHandler()
	{ 
		
		
		if(!this._acvo.isStart){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
		// let exchangeShopItem = this.cfg.getRewardSkinIdByIndex(this._skinIdIndex);
		let skincfg = Config.ServantskinCfg.getServantSkinItemById(this.cfg.TraitorSkinId);

		if(Api.servantVoApi.isOwnSkinOfSkinId(String(this.cfg.TraitorSkinId))){
			App.CommonUtil.showTip(LanguageManager.getlocal("acStargazer_nettip3"));
			return;
		}
		



		if(this._acvo.getItemNumByIndex(String(this.cfg.RansackItemID)) < this.cfg.RansackItemNum){
			// App.CommonUtil.showTip(LanguageManager.getlocal("acStargazer_nettip1" + String(this._skinIdIndex + 1)));
			App.CommonUtil.showTip(LanguageManager.getlocal("acStargazer_nettip1" + this.decode()));
			return;
		}

		

		let sid = Config.ServantskinCfg.getServantSkinItemById(this.cfg.TraitorSkinId).servantId;
		if(!Api.servantVoApi.getServantObj(sid))
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acStargazer_nettip2"));
			return;
		}

		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_SGREDEEMSKIN,this.searchHandlerNetBack,this);
		let _activeId = this.param.data.aid + "-" + this.param.data.code;
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_SGREDEEMSKIN,{activeId:_activeId,shopid:this._skinIdIndex+1})
	}

	private searchHandlerNetBack(event:egret.Event)
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_SGREDEEMSKIN,this.searchHandlerNetBack,this);
		if (event.data.data.ret === 0) {
			let rdata = event.data.data.data;
			let rewards = rdata.rewards;
	
			// this._ownTxt.text = LanguageManager.getlocal("acStargazer_ownTxt",[this._acvo.chipnum + "/"+this._acvo.config.RansackItemNum]);
			ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {"rewards":rewards,"otherRewards":null,"isPlayAni":true});
			App.CommonUtil.removeIconFromBDOC(this._exchangeBtn);

			App.DisplayUtil.changeToGray(this._exchangeBtn);
			this._exchangeBtn.setText("acStargazer_btn4");
		//////////
			this._ownTxt.text = LanguageManager.getlocal("acStargazer_ownTxt",["0/"+this.cfg.RansackItemNum]);
			this._ownTxt.x = this._innerTopBg.x + 70 ;
			this._ownTxt.y = this._innerTopBg.y + this._innerTopBg.height/2 - this._ownTxt.height/2;
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_STARGAZERSINGLEVO_REFRESH);
			let isexcge =  this._acvo.isExchangeEnable();//(this._skinIdIndex);
			if(isexcge){
				App.CommonUtil.addIconToBDOC(this._exchangeBtn);
			}else{
				App.CommonUtil.removeIconFromBDOC(this._exchangeBtn);
			}
		}
	}

	 private showDBDragon(skinId:string,tarY?:number)
	{
		if(tarY) {
			this._tarY = tarY;
		} else {
			tarY = this._tarY;
		}
		let serSkincfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
		// let sercfg = Config.ServantCfg.getServantItemById(serSkincfg.servantId);
        let boneName = "";
        let dagonBonesName = serSkincfg.bone;
        if(serSkincfg && serSkincfg.bone){
            boneName = serSkincfg.bone + "_ske";
        }
        if(  !Api.switchVoApi.checkServantCloseBone() && boneName && RES.hasRes(boneName)&&App.CommonUtil.check_dragon() ){
            if(this._skinImg){
                this._skinImg.visible = false;
            }
            if(this._droWifeIcon){
				this._servantContainer.removeChild(this._droWifeIcon);
                this._droWifeIcon.dispose();
                this._droWifeIcon = null;
            }
            this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
            this._droWifeIcon.visible = true; 
            this._droWifeIcon.setScale(0.9 * 0.85);
            this._droWifeIcon.anchorOffsetY = this._droWifeIcon.height;
            this._droWifeIcon.anchorOffsetX = this._droWifeIcon.width/2 *this._droWifeIcon.scaleX;
            this._droWifeIcon.x = GameConfig.stageWidth/2;
			this._droWifeIcon.y = tarY - this._droWifeIcon.height * 0.9+80 - 80;
			// this._droWifeIcon.mask = new egret.Rectangle(-292,-680,584,600);//526  263
			// this._droWifeIcon.mask = new egret.Rectangle(-263,-680,526,600);
			// this._droWifeIcon.mask = new egret.Rectangle(-292,-680,584,600); old
			this._droWifeIcon.mask = new egret.Rectangle(-343.5,-680,687,600);



            // this._droWifeIcon.y = GameConfig.stageHeigth - this.container.y - 120;
            this._servantContainer.addChild(this._droWifeIcon);
        }else{
			if(this._skinImg){
				this._servantContainer.removeChild(this._skinImg);
				this._skinImg = null;

			}

			let skinW =640;
			let skinH = 482;
			let tarScale = 0.85;
			let skinImgPath = serSkincfg.body;
			this._skinImg = BaseLoadBitmap.create(skinImgPath);
			this._skinImg.width = skinW;
			this._skinImg.height = skinH;
			this._skinImg.setScale(tarScale);
			// this._skinImg.anchorOffsetY = this._skinImg.height;
			this._skinImg.anchorOffsetX = this._skinImg.width/2;
			
			this._skinImg.x = GameConfig.stageWidth/2;
			this._skinImg.y = tarY - this._skinImg.height;
			// this._skinImg.mask = new egret.Rectangle((640-526)/2,(482 - 512)/2,526,512);
			this._skinImg.mask = new egret.Rectangle((640-687)/2,(482 - 512)/2,687,512);
			this._servantContainer.addChild(this._skinImg);

		}
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			// "ransackTraitor_bg4",
			// "ransackTraitor_bg2",
			// "ransackTraitor_leftimg",
			// "servant_skinnamebg",
			// "wifeview_xinxibanbg",
			// "servant_star",
		]);
	}
	// protected getShowHeight():number
	// {
	// 	return 800;
	// }
	// // 计算背景高度时使用，在container高度的基础上添加该高度
	// protected getBgExtraHeight():number
	// {
	// 	return 40;
	// }

	protected getTitleStr():string
	{
		return null;
	}

	protected getBgName():string
	{
		// return "ransackTraitor_bg2";
		return this.getDefaultRes("acstargazer_changefb");
	}

	public dispose(): void {
		this._ownTxt = null;
  		this._droWifeIcon=undefined;
		this._skinImg=undefined;
		this._acvo = undefined;
		this._exchangeBtn = null;

		this._skinTipTxt = null;
		this._ownerTxt = null;
		this._skinNameTxt = null;
		this._skinnamebg = null;
		this._innerTopBg = null;

		this._rect  = null;
		this._scrollView = null;
		this._tarY = 0;
		this._servantContainer = null;
		this._skinIdIndex = 0;
		this._innerbg = null;
		this.aid = null;
		this.code = null;
		super.dispose();
	}

}