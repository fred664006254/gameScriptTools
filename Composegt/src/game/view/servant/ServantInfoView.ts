/**
 * 门客信息
 * author yanyuling
 * date 2017/9/25
 * @class ServantInfoView
 */
class ServantInfoView  extends CommonView
{
	static CALPHA:number =0;
	
	private _nodeContainer:BaseDisplayObjectContainer;
	private _bottomnodeContainer:BaseDisplayObjectContainer;
	// private _goldNumTxt:BaseTextField;
	private _servantId:string=null;
	private _leveupNeedTxt:BaseTextField;
	private _servantInfoObj:any = null;
	private _proTxtList:BaseTextField[] = null;
	private _servantProCfg:Object[] = null;
	private _progressBar:ProgressBar;
	private _curLvNeedGold:number = 0 ;
	private _oldLv:number;
	private _lastUseTime=0;
	private _checkFlag:BaseBitmap;
	private _bottomNodeList=[];
	private _bottomBg:BaseBitmap;
	private _levelupBtn:BaseButton;
	private _nameTxt:BaseTextField;
	private _alvImg:BaseBitmap;

	private _clickHand:BaseBitmap;
	private _servantFullImg:BaseLoadBitmap;
	private _lvText:BaseTextField;
	private _serverList:string[] = undefined;
	private _specialityIconList=[];
	private _toprefreshNode:BaseDisplayObjectContainer;
	private _toprefreshNode2:BaseDisplayObjectContainer;
	private _switchDelta:number = 500;
	private _decreeGoldCost:number = 0;
	private _task4ClickTimes:number = 0;
	private _droSkinBg:BaseLoadDragonBones=undefined;
	private _droWifeIcon:BaseLoadDragonBones=undefined;
	private _droSkinFg:BaseLoadDragonBones=undefined;
	private _servantRoleNode:BaseDisplayObjectContainer;

	private _qualityTag: BaseDisplayObjectContainer;

	private _tabbarGroup:TabBarGroup = undefined;
	private _tabScroll:ScrollView = undefined;
	private arrow_rightBtn:BaseButton = undefined;
	private	arrow_leftBtn:BaseButton = undefined;
	private _servant_infobg:BaseLoadBitmap = undefined;
	// private _goldNumTxt:BaseTextField;
	private _nameBg:BaseBitmap;
	private _jibanicon : BaseButton = null;
	private _jibannumbg : BaseBitmap = null;
	private _jibantxt : BaseTextField = null;
    public constructor() {
		super();

	}

	// public show(data?:{tab?:string}):void{
	// 	super.show(data);
	// 	Api.mainTaskVoApi.checkShowGuide("servantview");
	// }
	public initView():void
	{

		Api.rookieVoApi.checkNextStep();
		Api.mainTaskVoApi.checkShowGuide("servantview");
		// servantview
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT),this.refreshInfoAfterUpdate,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN),this.refreshInfoAfterUpdate,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_SERVANT,this.refreshServantProTxt,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE),this.refreshInfoAfterUpdate,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY),this.refreshServantProTxt,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL),this.refreshServantProTxt,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY),this.refreshServantProTxt,this);
		App.MessageHelper.addEventListener(MessageConst.SERVANT_CHANGE,this.freshServant,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND,this.showHand,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA),this.refreshServantProTxt,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST,this.checkRedPoints,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN,this.backFromServantSkin,this);
		this._proTxtList = [];
		this.resetServantId(this.param.data);
		// this._servantId = this.param.data
		let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantId);
		this._servantInfoObj = servantInfoObj;
		this._curLvNeedGold = GameConfig.config.servantbaseCfg.upgradeNeed[this._servantInfoObj.level-1];
 
		this.playEffect(servantInfoObj.sound,true);

		let servantCfg = GameConfig.config.servantCfg[this._servantId]; 
		this._nodeContainer = new BaseDisplayObjectContainer()
		this.addChildToContainer(this._nodeContainer);
		this._toprefreshNode = new  BaseDisplayObjectContainer();
		this.addChildToContainer(this._toprefreshNode);


		this._bottomnodeContainer = new  BaseDisplayObjectContainer();
		this._bottomnodeContainer.name = "_bottomnodeContainer";
		this.addChildToContainer(this._bottomnodeContainer); 

		this._toprefreshNode2 = new  BaseDisplayObjectContainer();
		this.addChildToContainer(this._toprefreshNode2);
		this._toprefreshNode2.name = "_toprefreshNode2";

		let resBar:ResBar = ComponentManager.getResBar(2,true,175);
		resBar.setPosition( PlatformManager.hasSpcialCloseBtn()?450:10,24);
		this.addChild(resBar);

		let servant_infobg = BaseLoadBitmap.create("servant_infobg"); 
		servant_infobg.width = 640;
		servant_infobg.height = 690;
		this._servant_infobg = servant_infobg;
		this._nodeContainer.addChild(servant_infobg);

		this._servantRoleNode = new  BaseDisplayObjectContainer();
		this._nodeContainer.addChild(this._servantRoleNode);
		let servantFullImg = BaseLoadBitmap.create(servantInfoObj.fullImgPath);
		servantFullImg.width = 640;
		servantFullImg.height = 482;
		servantFullImg.anchorOffsetY = servantFullImg.height;
		servantFullImg.x = 0; 
		servantFullImg.y = 515; 
		this._servantRoleNode.addChild(servantFullImg);
		this._servantFullImg = servantFullImg;

		let nameBg = BaseBitmap.create("servant_alv_namebg");
        nameBg.x = 515;
        nameBg.y = 108;
		this._nameBg = nameBg;
        this._toprefreshNode.addChild(nameBg);

		this._alvImg = BaseBitmap.create("servant_alv_1");
		this._alvImg.visible = false;
	
		if (servantInfoObj.clv > 0)
		{
			this._alvImg.setRes("servant_alv_" + servantInfoObj.clv);
			this._alvImg.visible = true;
		}
		this._toprefreshNode.addChild(this._alvImg);

		// let tag = BaseLoadBitmap.create(`servant_qualitytag${servantCfg.quality}`);
		// tag.width = 148;
		// tag.height = 230;
		// this._toprefreshNode.addChild(tag);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, tag, this._nameBg, [-90]);
		// tag.y = -30;

		// 需要特效ICON
		this._qualityTag = GameData.getServantQualityIconBySid(servantInfoObj.servantId);
		if (this._qualityTag) {
			this._toprefreshNode.addChild(this._qualityTag);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, this._qualityTag, this._nameBg, [-90]);
			this._qualityTag.y -= 80;
		}

		if(Config.ServentcombinationCfg.isHaveCombine(this._servantId)){
			let jibanicon = ComponentManager.getButton(`servantjibanicon`, ``, ()=>{
				ViewController.getInstance().openView(ViewConst.POPUP.SERVANTJIBANBUFFPOPUPVUEW,{sid : this._servantId})
			}, this);
			jibanicon.setScale(0.8);
			this._toprefreshNode.addChild(jibanicon);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, jibanicon, this._toprefreshNode, [10,15]);
			this._jibanicon = jibanicon;
			if(Api.servantVoApi.checkHaveBuffActive(this._servantId)){
				App.CommonUtil.addIconToBDOC(jibanicon)
			}
	
			let jibantxt = BaseBitmap.create(`servantjibantxt`);
			jibantxt.setPosition(20,71);
			jibanicon.addChild(jibantxt);
	
			let jibannumbg = BaseBitmap.create(`servantjibannumbg`);
			this._toprefreshNode.addChild(jibannumbg);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, jibannumbg, jibanicon, [0,jibanicon.height*jibanicon.scaleY]);
			this._jibannumbg = jibannumbg;
	
			let buffstr = Api.servantVoApi.getServantActiveJiban(this._servantId);
			let jibanTxt = ComponentManager.getTextField(`${buffstr.active}/${buffstr.total}`, 22);
			this._toprefreshNode.addChild(jibanTxt);
			this._jibantxt = jibanTxt;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, jibanTxt, jibannumbg);
		}

		let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_COMMON);
        this._nameTxt = nameTxt;
		nameTxt.multiline = true;
		nameTxt.name = "nameTxt";
        this._toprefreshNode.addChild(nameTxt);

		let servant_mask = BaseBitmap.create("servant_middlebg2");
		servant_mask.width = GameConfig.stageWidth/2;//servant_infobg.width;
		servant_mask.x = 0;
		servant_mask.y = 452;//servant_infobg.y + servant_infobg.height - servant_mask.height;
		this._nodeContainer.addChild(servant_mask);

		let servant_mask2 = BaseBitmap.create("servant_middlebg2");
		servant_mask2.width = GameConfig.stageWidth/2;//servant_infobg.width;
		servant_mask2.scaleX = -1;
		servant_mask2.x = GameConfig.stageWidth;
		servant_mask2.y = servant_mask.y;//servant_infobg.y + servant_infobg.height - servant_mask.height;
		this._nodeContainer.addChild(servant_mask2);

		if(Api.switchVoApi.checkOpenServantSkin()){
			let skinBtn = ComponentManager.getButton("servant_skinicon","",this.skinBtnHandler,this);
			skinBtn.x = 7;
			skinBtn.y = servant_mask.y - skinBtn.height - 10;
			skinBtn.name = "skinBtn";
			this._toprefreshNode.addChild(skinBtn);
			if(Api.servantVoApi.isShowSkinRedForEnter(this._servantId)){
				App.CommonUtil.addIconToBDOC(skinBtn);
			}
			this.refreshSkinBtn(skinBtn);
			let skinName = BaseBitmap.create("servant_skinname");
			skinName.x = skinBtn.width/2 -skinName.width/2;
			skinName.y = 102 - skinName.height;
			skinBtn.addChild(skinName);

			if(Config.ServantskinCfg.isSkinDeploy( this._servantId)){
				skinBtn.visible = true;
			}else{
				skinBtn.visible = false;
			}
		
		}

		//红色属性背景条
		let servant_attributemap = BaseBitmap.create("servant_canvas01")
		servant_attributemap.x = 180;
		servant_attributemap.y = 382;
		this._toprefreshNode.addChild(servant_attributemap);

		//等级蓝色背景图
		let servant_levebg = BaseBitmap.create("servant_levebg")
		servant_levebg.x = 15;
		servant_levebg.y = 450;
		this._nodeContainer.addChild(servant_levebg);

		for(var i=0;i<4;i++)
		{	
			let fontbg = BaseBitmap.create("servant_shuzitiao");
			let num= i%2; 
			fontbg.x=160+num*200;
			fontbg.width =125;
			fontbg.y=465+ 32*Math.floor(i/2);
			this._nodeContainer.addChild(fontbg);

			let attributeText =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,0xe6caac);
			attributeText.x = 95+num*200;
			attributeText.y = 465+ 32*Math.floor(i/2) +3;
			attributeText.text = LanguageManager.getlocal("servant_attribute"+(i+1));   
			this._nodeContainer.addChild(attributeText);
		}


		this._progressBar = ComponentManager.getProgressBar("progress_type1_yellow2","progress_type3_bg",465);
		this._progressBar.x = 20;
		this._progressBar.y = 530;
		this._progressBar.setTextSize(18);
		// this._progressBar.setPercentage(1);
		this._progressBar.setPercentage(this._servantInfoObj.hasexp/this._curLvNeedGold);
		this._nodeContainer.addChild(this._progressBar);

		//勾选底
		let probg = BaseBitmap.create("servant_duigoudikuang")
		probg.x = 500;//this._progressBar.x+this._progressBar.width+20;
		probg.y = 460;//this._progressBar.y-5;
		this._nodeContainer.addChild(probg);

		//连升十级
		let tenTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		tenTxt.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        tenTxt.text = LanguageManager.getlocal("servantInfo_tenTips");
        tenTxt.x =probg.x+45;
        tenTxt.y =probg.y+8;
        this._nodeContainer.addChild( tenTxt);

		this._checkFlag = BaseLoadBitmap.create("hold_dinner_check");
		this._checkFlag.width = this._checkFlag.height = 38;
		this._checkFlag.x = probg.x;
		this._checkFlag.y = tenTxt.y - 10;
		this._checkFlag.alpha = ServantInfoView.CALPHA;
		this._nodeContainer.addChild(this._checkFlag);
		this._checkFlag.addTouchTap(this.changeCheckFlagStatus,this);
		this.changeProgressText();
		
		this._servantProCfg =[
			{
				txt: this.getProStringWithProId(1),
				txtcolor:TextFieldConst.COLOR_QUALITY_ORANGE,
				txtId:1,
			},
			{
				txt:LanguageManager.getlocal("servant_infoSpecialty") +"" ,
				txtcolor:TextFieldConst.COLOR_QUALITY_ORANGE,
				txtId:2,
			},
			{
				txt:this.getProStringWithProId(3),
				txtcolor:TextFieldConst.COLOR_QUALITY_ORANGE,
				txtId:3,
			},
			{
				txt:this.getProStringWithProId(4),
				txtcolor:0xddd5c7,
				txtId:4,
			},
			{
				txt:this.getProStringWithProId(5),
				txtcolor:0xddd5c7,
				txtId:5,
			},
			{
				txt:this.getProStringWithProId(6),
				txtcolor:0xddd5c7,
				txtId:6,
			},
			{
				txt: this.getProStringWithProId(7),
				txtcolor:0xddd5c7,
				txtId:7,
			},
		];
		let proX = probg.x + 30;
		let proY = probg.y + 35;

		let detailImg = ComponentManager.getButton("servant_detailBtn","",this.detailClickHandler,this)
		detailImg.x = 400;//probg.x + probg.width - detailImg.width/2-10;
		detailImg.y = 370;//probg.y - detailImg.height/2+15;
		this._toprefreshNode.addChild(detailImg);

		for (var index = 0; index < this._servantProCfg.length; index++) {
			var element:any = this._servantProCfg[index];
			let proTxt = ComponentManager.getTextField("",20,element.txtcolor);
			if (index == 1)
			{
				proTxt.text = element.txt
			}else
			{
				proTxt.text = this.getProStringWithProId(element.txtId);
			}
			proTxt.x = proX;
			proTxt.y = proY;
			// proTxt.width = 125;
			// proTxt.textAlign =TextFieldConst.ALIGH_CENTER;

			//等级
			if(element.txtId==1)
			{ 
				proTxt.width=80;
				proTxt.textAlign ="center";
				proTxt.size =30;
				proTxt.textColor =TextFieldConst.COLOR_LIGHT_YELLOW;
				this.setLayoutPosition(LayoutConst.horizontalCenter,proTxt,servant_levebg)
				proTxt.y= 490;
			}
			if(element.txtId==2)
			{
				proTxt.visible =false;
			}
			//属性
			if(element.txtId==3)
			{
				proTxt.x=200;
				proTxt.y=394;
				proTxt.width=190;
				proTxt.size =22;
				proTxt.textAlign ="center";
				proTxt.textColor = 0xe6caac;
			}
			//属性武力
			if(element.txtId==4)
			{
				proTxt.x=170;
				proTxt.y=467;
				proTxt.size =20;
				proTxt.textColor = 0xe6caac;
			}
			//属性智力
			if(element.txtId==5)
			{
				proTxt.x=365;
				proTxt.y=467;
				proTxt.size =20;
				proTxt.textColor = 0xe6caac;
			}
			//属性政治
			if(element.txtId==6)
			{
				proTxt.x=170;
				proTxt.y=499;
				proTxt.size =20;
				proTxt.textColor = 0xe6caac;
			}
			//属性魅力
			if(element.txtId==7)
			{
				proTxt.x=365;
				proTxt.y=499;
				proTxt.size =20;
				proTxt.textColor = 0xe6caac;
			}
			if(element.txtId==3){
				this._toprefreshNode.addChild( proTxt);
			}else{
				this._nodeContainer.addChild( proTxt);
			}
			// this._nodeContainer.addChild( proTxt);
			proY += 28;
			this._proTxtList.push(proTxt);
		}

		let levelupBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"",this.levelupBtnClickHandler,this);
		if (this._servantInfoObj.isLvEnableForAdvance())
		{
			levelupBtn.setText("servant_clvUpBtn");
		}else
		{
			levelupBtn.setText("servantInfoLevelup");
		}
		levelupBtn.x = 497//490; 
		levelupBtn.y = 503; 
		// levelupBtn.setColor(TextFieldConst.COLOR_BLACK);
		levelupBtn.scaleX = 1;
		levelupBtn.scaleY = 1; 
		this._nodeContainer.addChild(levelupBtn);
		this._levelupBtn = levelupBtn;
		this.changeLvBtnStatus();

		let btY = servant_infobg.y + servant_infobg.height

		if (btY + this.container.y  + 406 > GameConfig.stageHeigth)
		{
			let bgy = 554  - servant_infobg.height - this.container.y;
			bgy = bgy >= 0 ? 0 :bgy;
			servant_infobg.y = bgy+50+120-86;
			servant_infobg.mask = new egret.Rectangle(0,this.container.y-50,GameConfig.stageWidth,servant_infobg.height)
			this._bottomnodeContainer.y = 565;//GameConfig.stageHeigth - 406 - this.container.y;
			servantFullImg.y = servant_infobg.y + servant_infobg.height-75-120+106;
		}
		else
		{
			this._bottomnodeContainer.y =565;
		} 

		this._progressBar.y =530;  

		let woodBg = BaseBitmap.create("commonview_woodbg");
		woodBg.width = GameConfig.stageWidth;
		woodBg.height = 500;
		woodBg.x = 0 ;
		woodBg.y = 0;
		// woodBg.height = 
		this._bottomnodeContainer.addChild(woodBg);
		// let woodBg = BaseBitmap.create("commonview_woodbg");
		// woodBg.width = GameConfig.stageWidth;
		// woodBg.height = 70;
		// woodBg.x = 0 ;
		// woodBg.y = 0;
		// // woodBg.height = 
		// this._bottomnodeContainer.addChild(woodBg);
		
		// let bottomBorder = BaseBitmap.create("commonview_border1");
		// bottomBorder.width = GameConfig.stageWidth;
		// let targetHeight = GameConfig.stageHeigth - this._bottomnodeContainer.y  - this.container.y -5;
		// bottomBorder.height = targetHeight;
		// bottomBorder.x = 0;
		// bottomBorder.y = 0;
		// this._bottomnodeContainer.addChild(bottomBorder);

		// //拼接 tab下背景
		// let bottomTop = BaseBitmap.create("commonview_border2");
		
		// bottomTop.width = GameConfig.stageWidth;
		// bottomTop.scaleY = -1;
		// bottomTop.x = 0;
		// bottomTop.y = 25
		// this._bottomnodeContainer.addChild(bottomTop);

		// let bottomB = BaseBitmap.create("commonview_bottom");
		// bottomB.width = GameConfig.stageWidth;
		// bottomB.x = 0;
		// bottomB.y = bottomBorder.y + bottomBorder.height - bottomB.height;
		// this._bottomnodeContainer.addChild(bottomB);

		// let bottomMid = BaseBitmap.create("commonview_border3")
		// bottomMid.width = 624;
		// bottomMid.x = GameConfig.stageWidth/ 2 - bottomMid.width/2;
		// bottomMid.y = bottomTop.y + 35;
		// this._bottomnodeContainer.addChild(bottomMid);

		// let bottomRed = BaseBitmap.create("commonview_redtitle")
		// bottomRed.x = GameConfig.stageWidth/ 2 - bottomRed.width/2;
		// bottomRed.y = bottomMid.y;
		// this._bottomnodeContainer.addChild(bottomRed);


		// let bottomBg:BaseBitmap = BaseBitmap.create("servant_yeqiankuang");
		// bottomBg.x = 0 ;
		// bottomBg.y = 65;
		// let attrLineNum = Math.ceil(servantCfg.ability.length / 2);
		// let targetHeight = GameConfig.stageHeigth - this._bottomnodeContainer.y  - this.container.y-70;
		// bottomBg.height = targetHeight;
		// this._bottomnodeContainer.addChild(bottomBg);
		// this._bottomBg = bottomBg;  
		// bottomBg.width =640;
		
		// let arrow_leftBtn = ComponentManager.getButton("btn_leftpagenew","",this.switchHandler,this,["left"]);
		// arrow_leftBtn.x = 5;
		// arrow_leftBtn.y = 70;
		// this._bottomnodeContainer.addChild(arrow_leftBtn);

		// let arrow_rightBtn = ComponentManager.getButton("btn_leftpagenew","",this.switchHandler,this,["right"]);
		// arrow_rightBtn.scaleX = -1;
		// let tarRightPosX = GameConfig.stageWidth - arrow_leftBtn.x  ;
		// arrow_rightBtn.x = tarRightPosX;
		// arrow_rightBtn.y = arrow_leftBtn.y;
		// this._bottomnodeContainer.addChild(arrow_rightBtn);
		// this.arrow_rightBtn = arrow_rightBtn;
		// this.arrow_leftBtn = arrow_leftBtn;

		// let arrowSer_leftBtn = ComponentManager.getButton("btn_leftpagenew","",this.switchServantHandler,this,["left"]);
		// arrowSer_leftBtn.x = 20;
		// arrowSer_leftBtn.y = this._bottomnodeContainer.y - 300;
		// this._toprefreshNode2.addChild(arrowSer_leftBtn);

		// let arrowSer_rightBtn = ComponentManager.getButton("btn_leftpagenew","",this.switchServantHandler,this,["right"]);
		// arrowSer_rightBtn.scaleX = -1;
		// arrowSer_rightBtn.x = GameConfig.stageWidth - arrowSer_leftBtn.x ;
		// arrowSer_rightBtn.y = arrowSer_leftBtn.y;
		// this._toprefreshNode2.addChild(arrowSer_rightBtn);

		let arrowSer_leftBtn = ComponentManager.getButton("btn_leftpagenew","",this.switchServantHandler,this,["left"]);
		arrowSer_leftBtn.x = 20;
		arrowSer_leftBtn.y = this._bottomnodeContainer.y - 300;
		this._toprefreshNode2.addChild(arrowSer_leftBtn);

		let arrowSer_rightBtn = ComponentManager.getButton("btn_leftpagenew","",this.switchServantHandler,this,["right"]);
		arrowSer_rightBtn.scaleX = -1;
		arrowSer_rightBtn.x = GameConfig.stageWidth - arrowSer_leftBtn.x ;
		arrowSer_rightBtn.y = arrowSer_leftBtn.y;
		this._toprefreshNode2.addChild(arrowSer_rightBtn);
		this.initBorders();
		this.refreshBaseUIInfo(); //0611
		
	}
	
	private freshServant(evt : egret.Event):void{
		let sid = evt.data.sid;
		this.switchServantHandler({}, sid)
	}

	protected initBookInfo(tmpNode:BaseDisplayObjectContainer,bottomH:number)
	{
		let servantInfoBookItems = new ServantInfoBookItems();
		servantInfoBookItems.init(this._servantId,bottomH-30);
		servantInfoBookItems.y =10;
		tmpNode.addChild(servantInfoBookItems);
		if(Api.rookieVoApi.isInGuiding){
			let pos = servantInfoBookItems.localToGlobal(servantInfoBookItems.y,20);
			Api.rookieVoApi.waitingPosY = pos.y + 80 + GameData.layerPosY;
		}
	}

	protected initWifeInfo(tmpNode:BaseDisplayObjectContainer,bottomH:number)
	{
		let servantInfoWifeItem = new ServantInfoWifeItem();
		servantInfoWifeItem.init(this._servantId,bottomH);
		servantInfoWifeItem.y =10;
		tmpNode.addChild(servantInfoWifeItem);
	}

	protected iniSkillInfo(tmpNode:BaseDisplayObjectContainer,bottomH:number)
	{
		let servantInfoSkillsItem = new ServantInfoSkillsItem();
		servantInfoSkillsItem.init(this._servantId,bottomH);
		servantInfoSkillsItem.y =10;
		tmpNode.addChild(servantInfoSkillsItem);
	}

	protected initFourInfo(tmpNode:BaseDisplayObjectContainer,bottomH:number)
	{
		let servantInfoFourItems = new ServantInfoFourItems();
		servantInfoFourItems.y=10;
		servantInfoFourItems.init(this._servantId,bottomH);
		tmpNode.addChild(servantInfoFourItems);
	}
	protected initItemsInfo(tmpNode:BaseDisplayObjectContainer,bottomH:number)
	{
		let servantInfoItems = new ServantInfoItems();
		servantInfoItems.y =10;
		servantInfoItems.init(this._servantId,bottomH);
		tmpNode.addChild(servantInfoItems);
		servantInfoItems.name = "servantUpEquip";
	}

	protected initAmuInfo(tmpNode:BaseDisplayObjectContainer,bottomH:number)
	{
		let servantInfoAmulettems = new ServantInfoAmuletItems();
		servantInfoAmulettems.y=10;
		servantInfoAmulettems.init(this._servantId,bottomH);
		tmpNode.addChild(servantInfoAmulettems);

	}
	protected skinBtnHandler()
	{
		if(!Config.ServantskinCfg.isSkinDeploy( this._servantId) )
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("skin_servantNoSkinTips"));
			return;
		}

		ViewController.getInstance().openView(ViewConst.COMMON.SERVANTSKINCHANGEVIEW,{servantId:this._servantId});
		if(this._droWifeIcon){
			this._droWifeIcon.stop();
			this._droWifeIcon.dispose();
			this._droWifeIcon = null;
		}
		
	}
	protected switchServantHandler(param:any,sid?)
	{	
		let curS = egret.getTimer();
		if( curS - this._switchDelta < 300)
		{
			return;	
		}
		this._switchDelta = curS;

		if(!this._serverList){
			this._serverList =  Api.servantVoApi.getServantInfoIdListWithSort(Api.otherInfoVoApi.getServantSortId());
		}
		let newserId = "";
		if(sid){
			newserId = sid;
		}
		else{
			let len = this._serverList.length
			for (var index = 0; index < len; index++) {
				if(this._serverList[index] == this._servantId)
				{
					if(param == "left"){
						if(index == 0){
							
							newserId = this._serverList[len-1];
						}else{
							newserId = this._serverList[index-1];
						}
					}else if(param == "right"){
						if(index == len-1){
							newserId = this._serverList[0];
						}else{
							newserId = this._serverList[index+1];
						}
					}
					break;
				}
			}
		}
		if(newserId && newserId == this._servantId){
			return;
		}
		this.resetServantId(newserId); //重置门客id
		this._toprefreshNode.stopAllActions();
		this._toprefreshNode.alpha=1;
		egret.Tween.get(this._toprefreshNode,{loop:false}).to({alpha:0},200).call(()=>{
			let jibanVisible=Config.ServentcombinationCfg.isHaveCombine( this._servantId);
			this._jibanicon&&(this._jibanicon.visible=jibanVisible);
			this._jibannumbg&&(this._jibannumbg.visible=jibanVisible);
			this._jibantxt&&(this._jibantxt.visible=jibanVisible);
			this.refreshBaseUIInfo();
		},this).wait(300).to({alpha:1},200);
		// this.refreshBaseUIInfo(); //刷新重置id后的基础文本信息& 按钮状态
		let tarPosX1 = this._servantFullImg.x -this._servantFullImg.width/2-20;
		let tarPosX2 = this._servantFullImg.x + GameConfig.stageWidth+ this._servantFullImg.width/2 + 20;
		 if(param == "left"){
			 tarPosX2 = this._servantFullImg.x - this._servantFullImg.width-20;
			 tarPosX1 = this._servantFullImg.x + GameConfig.stageWidth + this._servantFullImg.width/2 + 20;
		}
		egret.Tween.get(this._servantRoleNode,{loop:false}).set({visible:false}).to({x:tarPosX1},200).wait(100).call(this.refreshServantRoleImg,this).set({visible:true,x:tarPosX2}).to({x:0},200);//GameConfig.stageWidth/2
	}
	private initBorders()
	{

		
		let bottomBorder = BaseBitmap.create("commonview_border1");
		bottomBorder.width = GameConfig.stageWidth;
		let targetHeight = GameConfig.stageHeigth - this._bottomnodeContainer.y  - this.container.y -5;
		bottomBorder.height = targetHeight;
		bottomBorder.x = 0;
		bottomBorder.y = 0;
		this._bottomnodeContainer.addChild(bottomBorder);

		//拼接 tab下背景
		let bottomTop = BaseBitmap.create("commonview_border2");
		
		bottomTop.width = GameConfig.stageWidth;
		bottomTop.scaleY = -1;
		bottomTop.x = 0;
		bottomTop.y = 25
		this._bottomnodeContainer.addChild(bottomTop);

		let bottomB = BaseBitmap.create("commonview_bottom");
		bottomB.width = GameConfig.stageWidth;
		bottomB.x = 0;
		bottomB.y = bottomBorder.y + bottomBorder.height - bottomB.height;
		this._bottomnodeContainer.addChild(bottomB);

		let bottomMid = BaseBitmap.create("commonview_border3")
		bottomMid.width = 624;
		bottomMid.x = GameConfig.stageWidth/ 2 - bottomMid.width/2;
		bottomMid.y = bottomTop.y + 35;
		this._bottomnodeContainer.addChild(bottomMid);

		let bottomRed = BaseBitmap.create("commonview_redtitle")
		bottomRed.x = GameConfig.stageWidth/ 2 - bottomRed.width/2;
		bottomRed.y = bottomMid.y;
		this._bottomnodeContainer.addChild(bottomRed);


		let arrow_leftBtn = ComponentManager.getButton("btn_leftpagenew","",this.switchHandler,this,["left"]);
		arrow_leftBtn.x = 5;
		arrow_leftBtn.y = 60;
		this._bottomnodeContainer.addChild(arrow_leftBtn);

		let arrow_rightBtn = ComponentManager.getButton("btn_leftpagenew","",this.switchHandler,this,["right"]);
		arrow_rightBtn.scaleX = -1;
		let tarRightPosX = GameConfig.stageWidth - arrow_leftBtn.x  ;
		arrow_rightBtn.x = tarRightPosX;
		arrow_rightBtn.y = arrow_leftBtn.y;
		this._bottomnodeContainer.addChild(arrow_rightBtn);
		this.arrow_rightBtn = arrow_rightBtn;
		this.arrow_leftBtn = arrow_leftBtn;



	}

		/**
	 * 左右切换门客后，刷新UI
	 */
	protected refreshBaseUIInfo()
	{
		this.dealBottomTabGroups();
		this.dealSpecialityIcons();
		this._progressBar.setPercentage(this._servantInfoObj.hasexp/this._curLvNeedGold);
		this.refreshServantProTxt();
		// this.refreshInfoAfterUpdate();
		this.resreshUITextInfoAndBtnStatus();
	}
	protected dealBottomTabGroups()
	{	
		let tabbarGroup = <TabBarGroup>this._bottomnodeContainer.getChildByName("tabbarGroup")
		if(tabbarGroup){
			this._bottomnodeContainer.removeChild(tabbarGroup);
		}

		let tabScroll = <ScrollView>this._bottomnodeContainer.getChildByName("tabScroll")
		if(tabScroll){
			this._bottomnodeContainer.removeChild(tabScroll);
		}

		let servantCfg = GameConfig.config.servantCfg[this._servantId]; 
		let tabName = ["servant_info_tab1","servant_info_tab2","servant_info_tab3"];
		let saura = this._servantInfoObj.getAllSkinAuraList();
		if(servantCfg.aura || Object.keys(saura).length > 0 )
		{
			tabName.push("servant_info_tab4")
		}
		if (servantCfg.wifeId)
		{
			tabName.push("servant_info_tab5")
		}
		let  isshowAmulate = false;
		let seramu = this._servantInfoObj.getAmuletAuraList();
		if( (seramu && Object.keys(seramu).length > 0) || Api.amuletVoApi.isServantOwnAmulate(this._servantId) ){
			tabName.push("servant_info_tab6");
			isshowAmulate = true;
		}
		
		tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_NEWTAB2,tabName,this.tabBtnClickHandler,this);
		tabbarGroup.setSpace(-5);
		tabbarGroup.name = "tabbarGroup";
		this._tabbarGroup = tabbarGroup;
		
		if(tabName.length > 4){
			tabbarGroup.x = GameConfig.stageWidth/2 - 620/2-9;
			let newRect = new egret.Rectangle(0,0,617,tabbarGroup.height+15);
			let _tmoNode = new BaseDisplayObjectContainer();
			tabbarGroup.y = 11//10;//15;
			_tmoNode.addChild(tabbarGroup);
			// _tmoNode.width = GameConfig.stageWidth * Math.ceil(tabbarGroup.width / GameConfig.stageWidth);
			tabScroll = ComponentManager.getScrollView(_tmoNode,newRect);
			tabScroll.y = -5;
			tabScroll.x = 10;
			tabScroll.bounces = false;
			tabScroll.name = "tabScroll";
			this._bottomnodeContainer.addChild(tabScroll);
			this._tabScroll = tabScroll;
			this._tabScroll.horizontalScrollPolicy = "off";
			this._tabScroll.verticalScrollPolicy = "off";
			this.arrow_rightBtn.visible = true;
			this.arrow_leftBtn.visible = false;
		}else{
			tabbarGroup.x = GameConfig.stageWidth/2 - 620/2 + 1;
			tabbarGroup.y = 6//5;//10; 
			this._bottomnodeContainer.addChild(tabbarGroup);
			this.arrow_leftBtn.visible = this.arrow_rightBtn.visible = false;
		}
		
		let bottomH = GameConfig.stageHeigth - this._bottomnodeContainer.y - this.container.y; 
		for (var index = 0; index < tabName.length; index++) {
			let tmpNode = <BaseDisplayObjectContainer>this._bottomNodeList[index];
			if(!tmpNode){	
				tmpNode = new BaseDisplayObjectContainer();
				this._bottomNodeList.push(tmpNode);
				tmpNode.visible = false;
				this._bottomnodeContainer.addChild(tmpNode);
			}
			tmpNode.removeChildren();
		} 
		this.iniSkillInfo(this._bottomNodeList[0],bottomH);
		this.initBookInfo(this._bottomNodeList[1],bottomH);
		this.initItemsInfo(this._bottomNodeList[2],bottomH);
		if(servantCfg.aura || Object.keys(saura).length > 0 ){
			this.initFourInfo(this._bottomNodeList[3],bottomH);
			if (servantCfg.wifeId){
				this.initWifeInfo(this._bottomNodeList[4],bottomH);
				if(isshowAmulate){
					this.initAmuInfo(this._bottomNodeList[5],bottomH)
				}
			}else{
				if(isshowAmulate){
					this.initAmuInfo(this._bottomNodeList[4],bottomH)
				}
			}
		}else{
			if (servantCfg.wifeId){
				this.initWifeInfo(this._bottomNodeList[3],bottomH);
				if(isshowAmulate){
					this.initAmuInfo(this._bottomNodeList[4],bottomH)
				}
			}else{
				if(isshowAmulate){
					this.initAmuInfo(this._bottomNodeList[3],bottomH)
				}
			}
		}


		tabbarGroup.selectedIndex = this.param.tab?parseInt(this.param.tab):0;
		this.tabBtnClickHandler({index:this.param.tab?parseInt(this.param.tab):0}); 
		this.checkRedPoints();
		this.refreshServantRoleImg();
	}

	protected dealSpecialityIcons()
	{
		let servantCfg = GameConfig.config.servantCfg[this._servantId]; 
		this._qualityTag && this._qualityTag.dispose();
		this._qualityTag = GameData.getServantQualityIconBySid(this._servantId);
		if (this._qualityTag) {
			this._toprefreshNode.addChild(this._qualityTag);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, this._qualityTag, this._nameBg, [-90]);
			this._qualityTag.y -= 80;
		}
		let specialAbility  = servantCfg.speciality;
		let len = specialAbility.length > this._specialityIconList.length ? specialAbility.length : this._specialityIconList.length
		for (var index = 0; index < len; index++) {
			var element = specialAbility[index];
			//图 
			let specialityIcon = this._specialityIconList[index];
			if(!specialityIcon){
				if(!element){
					continue;
				}
				specialityIcon = BaseBitmap.create("servant_speciality"+element);
				specialityIcon.name = "specialityIcon"+index;
				this._specialityIconList.push(specialityIcon);
				this._toprefreshNode.addChild(specialityIcon);
			}else{
				if(!element){
					specialityIcon.visible = false;
					continue;
				}
				specialityIcon.visible = true;
				specialityIcon.texture = ResourceManager.getRes("servant_speciality"+element);
			}

			if(specialityIcon){
				specialityIcon.x = 530//520+50*index;
				specialityIcon.y = 300+index*specialityIcon.height+10;
			}
		}
	}

	private adjustNameTxtAndAlvimg()
	{
		if(PlatformManager.checkIsTextHorizontal()){
			this._nameTxt.text = LanguageManager.getlocal("servant_name"+this._servantId);
			this._nameTxt.x = GameConfig.stageWidth / 2 - this._nameTxt.width/2; 
			this._nameTxt.y = 0;
			this._nameBg.width = this._nameTxt.width + 50;
			this._nameBg.x = this._nameTxt.x + this._nameTxt.width / 2 - this._nameBg.width/2;
			this._nameBg.y = 310;  
			this._nameTxt.textColor = ServantScrollItem.getQualityColor(this._servantInfoObj.clv);

			this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,this._nameTxt,this._nameBg);  
			this._alvImg.x = this._nameBg.x - this._alvImg.width/2-11+20;
			this._alvImg.y = this._nameBg.y + this._nameBg.height/2  - this._alvImg.height/2 - 5+10;
		} else  {
			this._nameBg.scaleX=this._nameBg.scaleY = 0.88;
			this._alvImg.x = this._nameBg.x + this._nameBg.width/2-6;
			this._alvImg.anchorOffsetX = this._alvImg.width/2;
			this._alvImg.y = this._nameBg.y -30;
			this._nameTxt.width = 26;  
        	this._nameTxt.text =  LanguageManager.getlocal("servant_name"+this._servantId);
			this._nameTxt.x = 542;  
			this._nameTxt.textColor = ServantScrollItem.getQualityColor(this._servantInfoObj.clv);
			this._nameTxt.textAlign =TextFieldConst.ALIGH_MIDDLE;

			egret.superSetter(BaseTextField,this._nameTxt,"size",26);
			if(this._alvImg.visible){
				this._nameTxt.y = this._alvImg.y+ 120; 
				if(this._nameTxt.height > 26*3){
					egret.superSetter(BaseTextField,this._nameTxt,"size",20);
					this._nameTxt.x = 545; 
				}
				this._nameTxt.anchorOffsetY = this._nameTxt.height/2;
			}else{
				this._nameTxt.y = this._alvImg.y+ 110;
				this._nameTxt.anchorOffsetY = this._nameTxt.height/2;
			} 
		}
	}

	/**刷新基础的文本和按钮状态 */
	protected resreshUITextInfoAndBtnStatus()
	{
		let skinBtn  = <BaseButton>this._toprefreshNode.getChildByName("skinBtn");
		if(skinBtn){
			if(Api.servantVoApi.isShowSkinRedForEnter(this._servantId)){
				App.CommonUtil.addIconToBDOC(skinBtn);
			}else{
				App.CommonUtil.removeIconFromBDOC(skinBtn);
			}
			if(Api.switchVoApi.checkOpenServantSkin()&&Config.ServantskinCfg.isSkinDeploy( this._servantId)){
				skinBtn.visible = true;
			}else{
				skinBtn.visible = false;
			}
		}
		this._nameTxt.text = LanguageManager.getlocal("servant_name"+this._servantId);
		if (this._servantInfoObj.clv > 0){
			this._alvImg.setRes("servant_alv_" + this._servantInfoObj.clv);
			this._alvImg.visible = true;
		}else{
			this._alvImg.visible = false;
		}

		this.adjustNameTxtAndAlvimg();
		this._servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
		this._curLvNeedGold = GameConfig.config.servantbaseCfg.upgradeNeed[this._servantInfoObj.level-1];
		
		this.changeProgressText();
		this.changeLvBtnStatus();
		this.checkRedPoints();
	}



	protected switchHandler(param:any)
	{	
		if(this._toprefreshNode)
		{
			let skinBtn  = <BaseButton>this._toprefreshNode.getChildByName("skinBtn");
			if(skinBtn){
				this.refreshSkinBtn(skinBtn)
			}

		}
		
		
		let toLeft = this._tabScroll.scrollLeft;
		let max = this._tabScroll.getMaxScrollLeft();
		if(toLeft == 0 && param == "right"){
			this._tabScroll.scrollLeft = max;//  this._tabScroll.width - GameConfig.stageWidth;
			this.arrow_rightBtn.visible = false;
			this.arrow_leftBtn.visible = true;
		}

		if(toLeft == max && param == "left"){
			this._tabScroll.scrollLeft = 0;
			this.arrow_rightBtn.visible = true;
			this.arrow_leftBtn.visible = false;
		}
	}


	/**
	 * 检测红点
	 */
	protected checkRedPoints()
	{
		let leftArrRed:boolean = false;
		this._servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
		// aura
		let servantCfg = GameConfig.config.servantCfg[this._servantId]; 
		if(this._servantInfoObj.isBookLvUpEnable()){
			this._tabbarGroup.addRedPoint(1,null,null,-3);
			leftArrRed = true;
		}else{
			this._tabbarGroup.removeRedPoint(1);
		}

		if (this._servantInfoObj.isSkillLvUpEnable())
		{
			this._tabbarGroup.addRedPoint(0,null,null,-3);
			leftArrRed = true;
		}else{
			this._tabbarGroup.removeRedPoint(0);
		}

		if (Api.servantVoApi.isShowRedForItem(this._servantId))
		{
			this._tabbarGroup.addRedPoint(2,null,null,-3);
			leftArrRed = true;
		}else{
			this._tabbarGroup.removeRedPoint(2);
		}
		let seramu = this._servantInfoObj.getAmuletAuraList();
		let isRedForAmulet = false;
		if( this._servantInfoObj.isShowRedForAmuletAura() ){
			isRedForAmulet = true;
		}

		let saura = this._servantInfoObj.getAllSkinAuraList();
		if( servantCfg.aura || Object.keys(saura).length > 0 ){
			if (this._servantInfoObj.isShowRedForaura())
			{
				this._tabbarGroup.addRedPoint(3,null,null,-3);
				leftArrRed = true;
			}else{
				this._tabbarGroup.removeRedPoint(3);
			}

			if (servantCfg.wifeId ){
				if( isRedForAmulet ){
					this._tabbarGroup.addRedPoint(5,null,null,-3);
					leftArrRed = isRedForAmulet;
				}else{
					this._tabbarGroup.removeRedPoint(5);
					leftArrRed = isRedForAmulet;
				}
			}else{
				if( isRedForAmulet ){
					this._tabbarGroup.addRedPoint(4,null,null,-3);
					leftArrRed = isRedForAmulet;
				}else{
					this._tabbarGroup.removeRedPoint(4);
					leftArrRed = isRedForAmulet;
				}
			}
		}else{
			if (servantCfg.wifeId){
				if( isRedForAmulet ){
					this._tabbarGroup.addRedPoint(4);
					leftArrRed = isRedForAmulet;
				}else{
					this._tabbarGroup.removeRedPoint(4);
					leftArrRed = isRedForAmulet;
				}
			}else{
				if( isRedForAmulet ){
					this._tabbarGroup.addRedPoint(3);
					leftArrRed = isRedForAmulet;
				}else{
					this._tabbarGroup.removeRedPoint(3);
					leftArrRed = isRedForAmulet;
				}
			}
		}


		if(Api.servantVoApi.checkHaveBuffActive(this._servantId)){
			App.CommonUtil.addIconToBDOC(this._jibanicon)
		}
		else{
			App.CommonUtil.removeIconFromBDOC(this._jibanicon)
		}
	}

	protected refreshSkinBtn(skinBtn:BaseButton){
		// if(!Config.ServantskinCfg.isSkinDeploy( this._servantId) )
		// {
		// 	App.DisplayUtil.changeToGray(skinBtn);
		// }else{
		// 	App.DisplayUtil.changeToNormal(skinBtn);
		// }
		if(Api.switchVoApi.checkOpenServantSkin()&&Config.ServantskinCfg.isSkinDeploy( this._servantId)){
			skinBtn.visible = true;
		}else{
			skinBtn.visible = false;
		}
	}
	protected backFromServantSkin(param:any)
	{
		let _isShowAni = param.data.isShowAni;
		let skinBtn  = <BaseButton>this._toprefreshNode.getChildByName("skinBtn");
		if(skinBtn){
			if(Api.servantVoApi.isShowSkinRedForEnter(this._servantId)){
				App.CommonUtil.addIconToBDOC(skinBtn);
			}else{
				App.CommonUtil.removeIconFromBDOC(skinBtn);
			}
			if(Api.switchVoApi.checkOpenServantSkin()&&Config.ServantskinCfg.isSkinDeploy( this._servantId)){
				skinBtn.visible = true;
			}else{
				skinBtn.visible = false;
			}
		}
		
		if(!_isShowAni){
			this.refreshServantRoleImg();
			return;
		}
		let preSkinId = param.data.preSkinId; //皮肤
		if(preSkinId && preSkinId != ""){
			this.refreshServantRoleImg(preSkinId);
		}

		this._toprefreshNode.alpha = 0;
		this._toprefreshNode2.alpha = 0;
		// let servantBlueBg = this._nodeContainer.getChildByName("servantBlueBg");
		let changeDbone = App.DragonBonesUtil.getLoadDragonBones("menke_hz");
		let deltaS = 0.7;
		changeDbone.setScale(deltaS);
		changeDbone.anchorOffsetY = changeDbone.height * deltaS;
		changeDbone.anchorOffsetX = changeDbone.width/2 * deltaS;
		changeDbone.x = GameConfig.stageWidth/2;
		// changeDbone.y = servantBlueBg.y-100;
		changeDbone.y = 452-100;
		this._nodeContainer.addChildAt(changeDbone,3);
		egret.Tween.get(this._nodeContainer,{loop:false}).wait(500).call(this.refreshServantRoleImg,this).wait(900).call(()=>{
			this._nodeContainer.removeChild(changeDbone);
			changeDbone.stop();
			changeDbone.dispose();
			changeDbone = null;
		},this);

		//序列帧
		let skinClip = ComponentManager.getCustomMovieClip("servant_skin_effect",13,100);
		let deltaS2 = 2;
		skinClip.width = 320*deltaS2;
		skinClip.height = 332*deltaS2;
		skinClip.anchorOffsetY = skinClip.height ;
		skinClip.anchorOffsetX = skinClip.width/2 ;
		skinClip.blendMode = egret.BlendMode.ADD;
		skinClip.x = GameConfig.stageWidth/2;
		skinClip.y = 452 +2;
		this._nodeContainer.addChildAt(skinClip,3);

		if(skinBtn){
			skinBtn.touchEnabled = false;
		}
		egret.Tween.get(skinClip,{loop:false}).wait(500).call(()=>{
			skinClip.playWithTime(1);
		},this).wait(1300).call(()=>{
			this._nodeContainer.removeChild(skinClip);
			skinClip = null;
		},this);
		
		egret.Tween.get(this._toprefreshNode,{loop:false}).wait(1800).to({alpha:1.0},300);
		egret.Tween.get(this._toprefreshNode2,{loop:false}).wait(1800).to({alpha:1.0},300).call(()=>{
			if(skinBtn){
				skinBtn.touchEnabled = true;
			}
		},this);
		
	}
	//背景龙骨
	private createDroSkinBg(wear){
		let dagonBonesName = "servant_skineffect_bg_" + wear;
		if(wear && !Api.switchVoApi.checkServantCloseBone() && RES.hasRes(dagonBonesName + "_ske") && App.CommonUtil.check_dragon()){
			if(this._droSkinBg){
				this._droSkinBg.stop();
				this._droSkinBg.dispose();
				this._droSkinBg = null;
			}
			this._droSkinBg=App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
			this._droSkinBg.visible = true; 
			// this._droSkinBg.setScale(0.9);
			this._droSkinBg.anchorOffsetY = this._droSkinBg.height;
			this._droSkinBg.anchorOffsetX = this._droSkinBg.width/2;
			this._droSkinBg.x = GameConfig.stageWidth/2;
			this._droSkinBg.y = this._servant_infobg.y + this._servant_infobg.height/2;//this._servantFullImg.y +80 - 15;
			this._servantRoleNode.addChildAt(this._droSkinBg,1);
			
		} else {
			if(this._droSkinBg){
				this._droSkinBg.stop();
				this._droSkinBg.dispose();
				this._droSkinBg = null;
			}
		}
	}


	//前景龙骨
	private createDroSkinFg(wear){
		let dagonBonesName = "servant_skineffect_fg_" + wear;
		if(wear && !Api.switchVoApi.checkServantCloseBone() && RES.hasRes(dagonBonesName + "_ske") && App.CommonUtil.check_dragon()){
			if(this._droSkinFg){
				this._droSkinFg.stop();
				this._droSkinFg.dispose();
				this._droSkinFg = null;
			}
			this._droSkinFg=App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
			this._droSkinFg.visible = true; 
			// this._droSkinFg.setScale(0.9);
			this._droSkinFg.anchorOffsetY = this._droSkinFg.height;
			this._droSkinFg.anchorOffsetX = this._droSkinFg.width/2;
			this._droSkinFg.x = GameConfig.stageWidth/2;
			this._droSkinFg.y = this._servantFullImg.y +80 - 15;
			this._servantRoleNode.addChildAt(this._droSkinFg,3);
			
		} else {
			if(this._droSkinFg){
				this._droSkinFg.stop();
				this._droSkinFg.dispose();
				this._droSkinFg = null;
			}
		}
	}
	protected refreshServantRoleImg(wear?:string)
	{
		let serImg = this._servantInfoObj.fullImgPath;//
		let bgImgStr = "servant_infobg";
		if(!wear){
			wear = Api.servantVoApi.getservantSkinIdInWear(this._servantId);
			if(wear && ResourceManager.hasRes("servant_skinbg_" + wear)){
				bgImgStr = "servant_skinbg_" + wear ;
			}
		}
		
		this._servant_infobg.setload(bgImgStr);
		if (!Api.switchVoApi.checkServantCloseBone())
		{
			let boneName = undefined;
			let skincfg = null;
			let dagonBonesName = null;
			if( wear && wear != "")
			{
				skincfg = Config.ServantskinCfg.getServantSkinItemById(wear);
				serImg = skincfg.body;
				if(skincfg && skincfg.bone){
					boneName = skincfg.bone + "_ske";
					dagonBonesName = skincfg.bone;
				}
			}
			else
			{
				dagonBonesName = Api.servantVoApi.getServantBoneId(this._servantId);
				boneName = dagonBonesName+ "_ske";
			}
			this.createDroSkinBg(wear);
			if(boneName &&  RES.hasRes(boneName)&&App.CommonUtil.check_dragon()&&Api.servantVoApi.isHaveBone(boneName) ){
				if(this._servantFullImg){
					this._servantFullImg.visible = false;
				}
				if(this._droWifeIcon){
					this._droWifeIcon.stop();
					this._droWifeIcon.dispose();
					this._droWifeIcon = null;
				}
				this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
				this._droWifeIcon.visible = true; 
				this._droWifeIcon.setScale(0.9);
				this._droWifeIcon.anchorOffsetY = this._droWifeIcon.height;
				this._droWifeIcon.anchorOffsetX = this._droWifeIcon.width/2;
				this._droWifeIcon.x = GameConfig.stageWidth/2;
				this._droWifeIcon.y = this._servantFullImg.y +80 - 15;
				this._servantRoleNode.addChildAt(this._droWifeIcon,2);
			}else{
				if(this._droWifeIcon){
					this._droWifeIcon.stop();
					this._droWifeIcon.dispose();
					this._droWifeIcon = null;
				}
				this._servantFullImg.setload(serImg); //0611
				this._servantFullImg.visible = true;
			}
			this.createDroSkinFg(wear);


		}else{
			if(this._droWifeIcon){
				this._droWifeIcon.stop();
				this._droWifeIcon.dispose();
				this._droWifeIcon = null;
			}
			if(this._droSkinBg){
				this._droSkinBg.stop();
				this._droSkinBg.dispose();
				this._droSkinBg = null;
			}
			if(this._droSkinFg){
				this._droSkinFg.stop();
				this._droSkinFg.dispose();
				this._droSkinFg = null;
			}
			this._servantFullImg.setload(serImg); //0611
			this._servantFullImg.visible = true;
		}
	}

	protected resetServantId(newServantId:string)
	{
		this._servantId = newServantId;
		let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantId);
		this._servantInfoObj = servantInfoObj;
		this._curLvNeedGold = GameConfig.config.servantbaseCfg.upgradeNeed[this._servantInfoObj.level-1];
		this.playEffect(this._servantInfoObj.sound,true);
	}

	protected changeCheckFlagStatus()
	{
		this._task4ClickTimes = 1;
		this._checkFlag.alpha = (this._checkFlag.alpha+1)%2;
		ServantInfoView.CALPHA = this._checkFlag.alpha;
		if (this._checkFlag.alpha == 1)
		{
			// App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_tenTips2"));
		}
		this.changeProgressText();
	}
	protected changeProgressText()
	{
		// this._curLvNeedGold = GameConfig.config.servantbaseCfg.upgradeNeed[this._servantInfoObj.level-1];
		let needGold = (this._curLvNeedGold - this._servantInfoObj.hasexp) ;
		let cnKey = "servantInfo_levelupNeed" ;
		if (this._checkFlag.alpha == 1)
		{
			cnKey = "servantInfo_levelupNeed2" ;
			let curLv = this._servantInfoObj.level;
			for (var index = curLv; index < curLv+9; index++) {
				let needNextLv = GameConfig.config.servantbaseCfg.upgradeNeed[index];
				if(needNextLv)
				{
					needGold += needNextLv;
				}else
				{
					break;
				}
			}
		}
		// this._curLvNeedGold = needGold
		let needGoldStr = App.StringUtil.changeIntToText(needGold);
		this._progressBar.setText(LanguageManager.getlocal(cnKey) + needGoldStr + LanguageManager.getlocal("servantInfo_levelupNeedGold"));
	}
	protected tabBtnClickHandler(params:any)
    {
		for (var index = 0; index < this._bottomNodeList.length; index++) {
			this._bottomNodeList[index].visible = false;
		}
		this._bottomNodeList[params.index].visible = true;

		if (params.index == 2 && Api.rookieVoApi.curGuideKey == "upequip") {
			Api.rookieVoApi.waitingPosY = Api.rookieVoApi.waitingPosX = null;
			if (GameConfig.stageHeigth < 1000) {
				Api.rookieVoApi.waitingPosY = 798;
				let _node: ServantInfoItems = <ServantInfoItems>(<BaseDisplayObjectContainer>(this._bottomNodeList[params.index]).getChildByName("servantUpEquip"));
				_node.scrollTopForGuide && _node.scrollTopForGuide();
			}
			
			Api.rookieVoApi.checkNextStep();
		}
    }
	protected getProStringWithProId(id:number):string
	{
		if(!this._servantInfoObj)
		{
			return
		}
		if(id == 1)
		{
			return App.StringUtil.changeIntToText(this._servantInfoObj.level);
			// this._servantInfoObj.level +""; //LanguageManager.getlocal("servant_infoLv") +this._servantInfoObj.level ;
		}
		if(id == 3)
		{
			return LanguageManager.getlocal("servant_infoAttr") +App.StringUtil.changeIntToText(this._servantInfoObj.total);
		}
		if(id == 4)
		{
			return App.StringUtil.changeIntToText(this._servantInfoObj.attrVo.forceTotal);//LanguageManager.getlocal("servant_force",[String(this._servantInfoObj.attrVo.forceTotal)]) ;
		}
		if(id == 5)
		{
			return App.StringUtil.changeIntToText(this._servantInfoObj.attrVo.brainsTotal);//LanguageManager.getlocal("servant_inte",[String(this._servantInfoObj.attrVo.brainsTotal)]);
		}
		if(id == 6)
		{
			return App.StringUtil.changeIntToText(this._servantInfoObj.attrVo.politicsTotal);
			//LanguageManager.getlocal("servant_policy",[String(this._servantInfoObj.attrVo.politicsTotal)]);
		}
		if(id == 7)
		{
			return App.StringUtil.changeIntToText(this._servantInfoObj.attrVo.charmTotal);//LanguageManager.getlocal("servant_charm",[String(this._servantInfoObj.attrVo.charmTotal)]);
		}
		return "";
	}

	//升级之后刷新数据
	protected refreshInfoAfterUpdate(p?:any)
	{
		if(p instanceof egret.Event)
		{
			let data=p.data;
			if(data&&data.ret==false&&data.data)
			{
				if(data.data.cmd==NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN&&data.data.ret==-3)
				{
					if(MainUI.getInstance().getUnlockIndex()>=10)
					{
						ViewController.getInstance().openView(ViewConst.POPUP.COMPOSENEEDGOLDPOPUPVIEW);
					
					}else{
						App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip3"));
						
					}
				}
			}
		}
		Api.rookieVoApi.checkNextStep();

		if (this._servantInfoObj.clv > 0)
		{
			this._alvImg.setRes("servant_alv_" + this._servantInfoObj.clv);
			this._alvImg.anchorOffsetX = this._alvImg.width/2;
			this._alvImg.visible = true;
			if(!PlatformManager.checkIsTextHorizontal()){
				this._nameTxt.y = this._alvImg.y+ 120; 
				if(this._nameTxt.height > 26*3){
					egret.superSetter(BaseTextField,this._nameTxt,"size",20);
					this._nameTxt.x = 545; 
					// this._nameTxt.y = this._alvImg.y+ 90-2;
				}
				this._nameTxt.anchorOffsetY = this._nameTxt.height/2;
			}
		}else{
			this._alvImg.visible = false;
		}
		this._servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
		this._nameTxt.text = LanguageManager.getlocal("servant_name"+this._servantId);
		this._nameTxt.textColor = ServantScrollItem.getQualityColor(this._servantInfoObj.clv); 

		this._curLvNeedGold = GameConfig.config.servantbaseCfg.upgradeNeed[this._servantInfoObj.level-1];
		this.changeProgressText();
		this.changeLvBtnStatus();
		this.checkRedPoints();
		if(!p )
		{
			return;
		}
		let newPer = this._servantInfoObj.hasexp/this._curLvNeedGold
		let oldPer = this._progressBar.getPercent();
		let deltaT = 500;
		if (  this._oldLv < this._servantInfoObj.level)
		{
			let addLv = this._servantInfoObj.level - this._oldLv;
			egret.Tween.get(this._progressBar,{loop:false}).to({percent:1},(1-oldPer)*deltaT).wait(100).set({percent:0},0).to({percent:newPer},deltaT*newPer);

			if (p.data.ret == true && p.data.data.data.lucky) {
				App.CommonUtil.showGodbless("servantLv");
			}

			this.showUpgradeEffect(addLv)
		}else
		{
			egret.Tween.get(this._progressBar,{loop:false}).to({percent:newPer},(newPer-oldPer)*deltaT);
		}

		//功能解锁
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT);
	}
	
	protected changeLvBtnStatus()
	{
		if (this._servantInfoObj.isLvEnableForAdvance()){
			this._levelupBtn.setText("servant_clvUpBtn");
		}else{
			this._levelupBtn.setText("servantInfoLevelup");
		}

		if(this._servantInfoObj.isAdvanceEnable())
		{
			App.DisplayUtil.changeToNormal(this._levelupBtn);
		}else{
			if(this._curLvNeedGold - this._servantInfoObj.hasexp > Api.playerVoApi.getPlayerGold() || this._servantInfoObj.isAtTopLv() ){
				App.DisplayUtil.changeToGray(this._levelupBtn);
			}else{
				App.DisplayUtil.changeToNormal(this._levelupBtn);
			}
		}
	}
	protected refreshServantProTxt()
	{
		for (var index = 0; index <this._servantProCfg.length; index++) {
			var element:any = this._servantProCfg[index];
			let proTxt:BaseTextField = this._proTxtList[index];
			if (index == 1)
			{
				proTxt.text = element.txt;
			}else
			{
				proTxt.text = this.getProStringWithProId(element.txtId);
			}
		}

		if(this._jibantxt){
			let buffstr = Api.servantVoApi.getServantActiveJiban(this._servantId);
			this._jibantxt.text = `${buffstr.active}/${buffstr.total}`;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._jibantxt, this._jibannumbg);
		}

		this.checkRedPoints();
	}
	//播放升级成功动画
	protected showUpgradeEffect(addLv:number)
	{	
		SoundManager.playEffect(SoundConst.EFFECT_UPD); 

		let servant_upgrade_word = ComponentManager.getBitmapText(LanguageManager.getlocal("servant_xLv",[String(addLv)]),TextFieldConst.FONTNAME_BOSS_SCORE);
	 
		servant_upgrade_word.x = 240;
		servant_upgrade_word.y = 200
	

		let upgradeClip = ComponentManager.getCustomMovieClip("servant_upgrade_frame",5,100);
		upgradeClip.setScale(1.8);
		upgradeClip.x = 70;
		upgradeClip.y = 20;
		this._toprefreshNode.addChild(upgradeClip);
		upgradeClip.playWithTime(1);
		

		this._toprefreshNode.addChild(servant_upgrade_word);
		egret.Tween.get(servant_upgrade_word,{loop:false}).to({y:150},800).to({alpha:0},100);

		let tmpthis = this;
		egret.Tween.get(this,{loop:false}).wait(500).call(function(){
			// tmpthis._goldNumTxt.text = Api.playerVoApi.getPlayerGoldStr();
			//字体刷新加个延时
			tmpthis.refreshServantProTxt();
			tmpthis._toprefreshNode.removeChild(upgradeClip);
			upgradeClip = null;
			tmpthis._toprefreshNode.removeChild(servant_upgrade_word);
			servant_upgrade_word = null;
		})
	}

	protected detailClickHandler()
	{
		if(Api.rookieVoApi.getIsGuiding()){
			return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.SERVANTATTRDETAILPOPUPVIEW,this._servantId);
	}
	protected levelupBtnClickHandler()
	{
		if(Api.switchVoApi.checkOpenLimitS250Lv()&&this._servantInfoObj.level>=250)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip11"));
			return;
		}
		if (this._servantInfoObj.isLvEnableForAdvance())
		{
			ViewController.getInstance().openView(ViewConst.POPUP.SERVANTADVANCEPOPUPVIEW,this._servantId);
			/**
			 * 打开提拔界面
			 */
			return;
		}

		let newT = egret.getTimer();
		if (newT - this._lastUseTime < 800)
		{
			return;
		}
		this._lastUseTime = newT;
		if(this._servantInfoObj.isAtTopLv())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip1"));
			return;
		}
	 
		if (Api.playerVoApi.getPlayerGold() == 0 )
		{
			if(MainUI.getInstance().getUnlockIndex()>=10)
            {
                ViewController.getInstance().openView(ViewConst.POPUP.COMPOSENEEDGOLDPOPUPVIEW);
				return false;
            }else{
                App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip3"));
                return false;
            }
		}

		let needGold = (this._curLvNeedGold - this._servantInfoObj.hasexp);
		if (this._checkFlag.alpha == 1)
		{
			let curLv = this._servantInfoObj.level;
			for (var index = curLv; index < curLv+9; index++) {
				let needNextLv = GameConfig.config.servantbaseCfg.upgradeNeed[index];
				if(needNextLv)
				{
					needGold += needNextLv;
				}else
				{
					break;
				}
			}
		}
		if (Api.playerVoApi.getPlayerGold() < needGold)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip3"));
            return false;
		}

		PlatformManager.analytics37Point("custom_active","patrons_levelup",1);
		this._oldLv = this._servantInfoObj.level;
		this._task4ClickTimes = 2;
		if (this._checkFlag.alpha == 0)
		{
			NetManager.request(NetRequestConst.REQUEST_UPGRADE_SERVANT,{servantId:this._servantId});
		}else{
			NetManager.request(NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN,{servantId:this._servantId});
		}
	}

	public hide():void
	{
		if(Api.rookieVoApi.isInGuiding){
			Api.rookieVoApi.checkWaitingGuide();
			ViewController.getInstance().getView(ViewConst.COMMON.SERVANTVIEW).hide();
		 
		}
		super.hide();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat( [
			"commonview_redtitle",
			"servant_topresbg","servant_detailBtn",
			// "servant_bottombg",
			"servant_infobg",
			"servant_infoPro1","servant_infoPro2","servant_infoPro3","servant_infoPro4", 
			// "servant_upgrade_frame",
			// "levelup_lizi","levelup_lizi_json",
			"servant_mask",
			"guide_hand",
			
			"servant_attributemap",
			"servant_levebg",
			"hold_dinner_box",
		
		
			"playerview_powerbg",
			"servant_alv_namebg",
			"servant_speciality1","servant_speciality2","servant_speciality3","servant_speciality4","servant_speciality5","servant_speciality6",

			
	
			"progress_type3_bg","progress_type3_yellow","progress_type1_yellow2",
			"servant_star"

			,"servant_skinicon","servant_skinname",
			"commonview_border2",
			"commonview_border1",
			"commonview_bottom",
			"commonview_border3",
			"commonview_woodbg"
		]);
	}
	private showHand()
	{
		this._clickHand = BaseBitmap.create("guide_hand");
		if (!PlatformManager.hasSpcialCloseBtn()){
			this._clickHand.skewY = 180;
		}
		this._clickHand.x = PlatformManager.hasSpcialCloseBtn()?57:620;
		// this._clickHand.x = 620;
		this._clickHand.y = 30;
		this.addChild(this._clickHand);

		egret.Tween.get(this._clickHand,{loop:true})
				.to({scaleX: 0.9,scaleY:0.9}, 500)
				.to({scaleX: 1,scaleY:1}, 500)
	}

	protected tick()
	{
		if(this._levelupBtn)
		{
			this.changeLvBtnStatus();
		}
		if(Api.mainTaskVoApi.getCurMainTaskId() == "26" && this._servantId == "1001" && this._servantInfoObj.level < 10 ){
			if(!this._clickHand){
				this.showHand();
			}
			this._clickHand.skewY = 0;
			if(this._checkFlag.alpha == 0 && this._task4ClickTimes == 0){
				this._clickHand.x = this._checkFlag.x + 10;
				this._clickHand.y = this._checkFlag.y + 10  + this.container.y;
			}else{
				this._clickHand.x = this._levelupBtn.x + 50;
				this._clickHand.y = this._levelupBtn.y + 10  + this.container.y;
			}
			if(this._task4ClickTimes >= 2){
				this._clickHand.visible = false;
			}
		}else{
			if(!Api.rookieVoApi.isInGuiding && this._clickHand){
				this._clickHand.visible = false;
			}
		}
		return true;
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT),this.refreshInfoAfterUpdate,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN),this.refreshInfoAfterUpdate,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_SERVANT,this.refreshServantProTxt,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE),this.refreshInfoAfterUpdate,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY),this.refreshServantProTxt,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL),this.refreshServantProTxt,this);

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND,this.showHand,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA),this.refreshServantProTxt,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST,this.checkRedPoints,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN,this.backFromServantSkin,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY),this.refreshServantProTxt,this);
		App.MessageHelper.removeEventListener(MessageConst.SERVANT_CHANGE,this.freshServant,this);
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SERVANTBONE);
		
		Api.mainTaskVoApi.hideGuide();

		this._nodeContainer = null;
		// this._goldNumTxt = null;
		this._servantId = "";
		this.param = null;
		this._leveupNeedTxt = null;
		this._servantInfoObj = null;
		this._proTxtList =null;
		this._servantProCfg = null;
		this._progressBar = null;
		this._checkFlag = null;
		this._bottomNodeList = [];
		this._bottomBg = null;
		this._levelupBtn = null;
		this._nameTxt = null;
		this._alvImg = null;
		this._oldLv = null;
		this._bottomnodeContainer = null;
		this._curLvNeedGold = null;
		this._lastUseTime = null;
		this._clickHand = null;
		this._serverList = null;
		this._servantFullImg = null;
		this._lvText = null;
		this._serverList = null;
		this._specialityIconList = [];
		this._switchDelta = 0;
		this._decreeGoldCost = 0;
		this._task4ClickTimes = 0;

		if(this._clickHand){
			egret.Tween.removeTweens(this._clickHand);
			this._clickHand = null;
		}	
		if(this._droWifeIcon){
			this._droWifeIcon.stop();
			this._droWifeIcon.dispose();
			this._droWifeIcon = null;
		}
		if(this._droSkinBg){
			this._droSkinBg.stop();
			this._droSkinBg.dispose();
			this._droSkinBg = null;
		}
		if(this._droSkinFg){
			this._droSkinFg.stop();
			this._droSkinFg.dispose();
			this._droSkinFg = null;
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN);//门客冲榜的跳转需要
		this._toprefreshNode2 = null;
		this._tabbarGroup = null;
		this._servantRoleNode = null;
		this.arrow_rightBtn = null;
		this.arrow_leftBtn = null;
		this._servant_infobg = null;
		this._nameBg = null;
		this._tabScroll = null;
		this._qualityTag = null;
		
		super.dispose();
	}
}