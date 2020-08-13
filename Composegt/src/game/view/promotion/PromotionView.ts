/**
 * 升官主界面
 * author yanyuling
 * date 2017/9/29
 * @class PromotionView
 **/
 class PromotionView extends CommonView
{
	protected _nodeContainer:BaseDisplayObjectContainer;
	// protected _scrollview:ScrollView;
	private _progressBar:ProgressBar;
	private _expTipTxt:BaseTextField;
	private _leftPrivilegeTxt:BaseTextField;
	private _leftRoleContainer:BaseDisplayObjectContainer;
	private _leftOfficerTxt:BaseTextField;
	private _leftofficerbg:BaseBitmap;

	private _rightPrivilegeTxt:BaseTextField;
	private _rightRoleContainer:BaseDisplayObjectContainer;
	private _rightOfficerTxt:BaseTextField;
	private _rightofficerbg:BaseBitmap;

	public constructor() 
	{
		super();
		
	}

	public initView():void
	{	
		App.MessageHelper.addEventListener(NetManager.getMessageName
		(NetRequestConst.REQUEST_USER_UPGRADE),this.refreshInfoAfterUpgrade,this);
		this._nodeContainer = new BaseDisplayObjectContainer()
		// let scrollview = ComponentManager.getScrollView(this._nodeContainer,new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth-this.container.y-20));//
		this._nodeContainer.y = -20;
		// scrollview.y = -15;
		this.addChildToContainer(this._nodeContainer);
		// this._scrollview = scrollview;

		let bg0:BaseBitmap = BaseBitmap.create("playerview_bg2");
		bg0.y = 0;
		this._nodeContainer.addChild(bg0);

		let promotion_arrow = BaseBitmap.create("promotion_arrow");
		promotion_arrow.x = bg0.width/2 - promotion_arrow.width / 2;
		promotion_arrow.y = bg0.height /2 - promotion_arrow.height / 2;
		this._nodeContainer.addChild(promotion_arrow);

		//下面属性背景
		let childItemBg: BaseBitmap = BaseBitmap.create("public_9_bg22");
		// childItemBg.height = GameConfig.stageHeigth - childItemBg.y  - this.container.y+25;
		childItemBg.height = 480;
		childItemBg.y = GameConfig.stageHeigth - this.container.y - childItemBg.height+20;
		// childItemBg.height = GameConfig.stageHeigth - childItemBg.y  - this.container.y+25;
		childItemBg.x = 0;
		
		let curLv = Api.playerVoApi.getPlayerLevel();
		let curLvCfg = Config.LevelCfg.getCfgByLevel(curLv.toString());
		let nextLvCfg =  Config.LevelCfg.getCfgByLevel((curLv+1).toString());

		this._leftRoleContainer = Api.playerVoApi.getPlayerPortrait(curLv,Api.playerVoApi.getPlayePicId());
		this._leftRoleContainer.scaleX = 0.85;
		this._leftRoleContainer.scaleY = 0.85;
		this._leftRoleContainer.x = 40;
		let  tmpPosy = childItemBg.y - this._leftRoleContainer.height * this._leftRoleContainer.scaleY;
		// if (tmpPosy < 15){
			tmpPosy = 15;
		// }
		this._leftRoleContainer.y = tmpPosy;
		
		this._nodeContainer.addChild(this._leftRoleContainer);
		if (nextLvCfg)
		{
			this._rightRoleContainer = Api.playerVoApi.getPlayerPortrait(curLv + 1,Api.playerVoApi.getPlayePicId());
			this._rightRoleContainer.scaleX = this._leftRoleContainer.scaleX;
			this._rightRoleContainer.scaleY = this._leftRoleContainer.scaleY;
			this._rightRoleContainer.x = 340;
			this._rightRoleContainer.y = this._leftRoleContainer.y;
			this._nodeContainer.addChild(this._rightRoleContainer);
			// this._leftRoleContainer.x = 2;
		}else
		{
			promotion_arrow.visible = false;
			this._leftRoleContainer.x = GameConfig.stageWidth/2 - this._leftRoleContainer.width* this._leftRoleContainer.scaleX/2;
		}
		
		
		this._nodeContainer.addChild(childItemBg);

		//正常配置
		let uiCfg = [
			{
				lvData:curLvCfg,
				lv:curLv,
				roleImgPosX:40,
				roleImgPosY:41,
				officerbgX:35,
				officerbgY:childItemBg.y - 60,
				probgPosX:27,
				probgPosY:childItemBg.y + 30,
			},
			{
				lvData:nextLvCfg,
				lv:curLv+1,
				roleImgPosX:372,
				roleImgPosY:41,
				officerbgX:340,
				officerbgY:childItemBg.y - 60,
				probgPosX:324,
				probgPosY:childItemBg.y + 30,
			},
		];
		//达到等级上限的配置
		let topLvCfg = [
			{
				lvData:curLvCfg,
				lv:curLv,
				roleImgPosX:206,
				roleImgPosY:41,
				officerbgX:187,
				officerbgY:childItemBg.y - 60,
				probgPosX:27,
				probgPosY:childItemBg.y + 30,
				roleImg:"user_body1",
			},
		];
		
		// "promotion_privilege1":"经营商产累计上限提升至X",
		// "promotion_privilege2":"经营农产累计上限提升至X",
		// "promotion_privilege3":"招募士兵累计上限提升至X",
		// "promotion_privilege4":"处理政务累计上限提升至X",
		// "promotion_privilege5":"门客等级上限提升至X",
		 
		 let topUIOver = false
		for (var index = 0; index < uiCfg.length; index++) {
			let tmpCfg = uiCfg[index]
			let lvData = tmpCfg.lvData
			if (!nextLvCfg )
			{
				if ( index == 0)
				{
					tmpCfg = topLvCfg[0];
				}else{
					topUIOver = true
				}
			}
			let officerTxt ;
			let promotion_officerbg1;
			if (topUIOver == false)
			{
				
				promotion_officerbg1 = BaseBitmap.create("prisonview_1");
				promotion_officerbg1.x = tmpCfg.officerbgX ;
				promotion_officerbg1.y =tmpCfg.officerbgY ;
				this._nodeContainer.addChild(promotion_officerbg1);

				officerTxt = ComponentManager.getTextField("",24,TextFieldConst.COLOR_LIGHT_YELLOW);
				officerTxt.text = LanguageManager.getlocal("officialTitle" + tmpCfg.lv);
				officerTxt.x =promotion_officerbg1.x  + promotion_officerbg1.width/2 - officerTxt.width/2;
				officerTxt.y = promotion_officerbg1.y  + promotion_officerbg1.height/2 - officerTxt.height/2;
				this._nodeContainer.addChild( officerTxt);
			}

			let leftProBg = BaseBitmap.create("public_9_probiginnerbg");
			leftProBg.width = 290;
			leftProBg.height = 270;
			leftProBg.x = tmpCfg.probgPosX;
			leftProBg.y = tmpCfg.probgPosY;
			this._nodeContainer.addChild(leftProBg);

			let proTxt = ComponentManager.getTextField(LanguageManager.getlocal("promotion_privilege"),24,TextFieldConst.COLOR_LIGHT_YELLOW);
			proTxt.x = leftProBg.x + 20;
			proTxt.y = leftProBg.y + 20;
			this._nodeContainer.addChild( proTxt);

			let tipTxt1 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WHITE);
			tipTxt1.multiline = true;
			tipTxt1.lineSpacing = 13;
			if (index == 0)
			{
				tipTxt1.text = Api.playerVoApi.getCurLevelPrivilegeTxtStr(curLv);
				this._leftOfficerTxt = officerTxt;
				this._leftPrivilegeTxt = tipTxt1; 
				this._leftofficerbg = promotion_officerbg1;

			}else
			{
				tipTxt1.text = Api.playerVoApi.getCurLevelPrivilegeTxtStr(curLv+1);
				this._rightOfficerTxt = officerTxt;
				this._rightPrivilegeTxt = tipTxt1;
				this._rightPrivilegeTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
				this._rightofficerbg = promotion_officerbg1;
			}
			if (!lvData )
			{
				tipTxt1.x = leftProBg.x + leftProBg.width/2 - tipTxt1.width /2 ;
				tipTxt1.y = leftProBg.y + leftProBg.height/2 - tipTxt1.height /2;
			}else
			{
				tipTxt1.x = proTxt.x ;
				tipTxt1.y = proTxt.y + 35;
			}
			
			this._nodeContainer.addChild( tipTxt1);
		}
		
		let levelupTxt = ComponentManager.getTextField(LanguageManager.getlocal("promptLevelTip"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		levelupTxt.x = this._nodeContainer.width/2 - levelupTxt.width/2;
        levelupTxt.y = childItemBg.y + 330;
        this._nodeContainer.addChild( levelupTxt);

		
		this._progressBar = ComponentManager.getProgressBar("progress_type1_yellow","progress_type1_bg",566);//,562,19);
		this._progressBar.x = 32;
		this._progressBar.y = levelupTxt.y + 25;
		this._nodeContainer.addChild(this._progressBar);

		this._expTipTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		this.refreshProgressAndTxt();
		this._expTipTxt.x = GameConfig.stageWidth/2 - this._expTipTxt.width/2;
        this._expTipTxt.y = this._progressBar.y + this._progressBar.height / 2 -this._expTipTxt.height/2 ;
        this._nodeContainer.addChild( this._expTipTxt);

		let levelupBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"promotionViewUpd",this.levelupBtnClickHandler,this);
		levelupBtn.x = GameConfig.stageWidth/2 - levelupBtn.width/2 ;
		levelupBtn.y = this._progressBar.y + 40;
		// levelupBtn.setColor(TextFieldConst.COLOR_BLACK);
		this._nodeContainer.addChild(levelupBtn);

    }

	protected levelupBtnClickHandler()
	{
		let curLv = Api.playerVoApi.getPlayerLevel()
		let nextLvCfg =  Config.LevelCfg.getCfgByLevel((curLv+1).toString());
		if(!nextLvCfg)
		{
			//已升到最大官阶
			App.CommonUtil.showTip(LanguageManager.getlocal("promotion_upgradeTip1"));
			return;
		}
		if (Api.playerVoApi.getPlayerExp()  <  nextLvCfg.exp)
		{
			//政绩不足，无法升级
			App.CommonUtil.showTip(LanguageManager.getlocal("promotion_upgradeTip2"));
			return;
		}
		NetManager.request(NetRequestConst.REQUEST_USER_UPGRADE,{});
	}
	protected refreshProgressAndTxt()
	{	
		let curLv = Api.playerVoApi.getPlayerLevel()
		let nextLvCfg =  Config.LevelCfg.getCfgByLevel((curLv+1).toString());
		if (nextLvCfg)
		 {
			this._progressBar.setPercentage( Api.playerVoApi.getPlayerExp()/ nextLvCfg.exp);
			this._expTipTxt.text = LanguageManager.getlocal("playerview_exp") + Api.playerVoApi.getPlayerExp() + " / "+ nextLvCfg.exp;
		 }else
		 {
			this._progressBar.setPercentage(1);
			this._expTipTxt.text =  LanguageManager.getlocal("promotion_topLevel")
			this._expTipTxt.x =  GameConfig.stageWidth/2 - this._expTipTxt.width/2;
		 }
	}
	//升级成功后刷新
	protected refreshInfoAfterUpgrade(event:egret.Event)
	{
		let rData = event.data.data;
		if(rData.ret != 0)
			return;

		ViewController.getInstance().openView(ViewConst.COMMON.PROMOTIONSUCCESSVIEW);
		let curLv = Api.playerVoApi.getPlayerLevel()
		let nextLvCfg =  Config.LevelCfg.getCfgByLevel((curLv+1).toString());
		this.refreshProgressAndTxt();
		this._leftOfficerTxt.text = LanguageManager.getlocal("officialTitle" + curLv);
		this._leftPrivilegeTxt.text =  Api.playerVoApi.getCurLevelPrivilegeTxtStr(curLv);
		this._rightPrivilegeTxt.text =  Api.playerVoApi.getCurLevelPrivilegeTxtStr(curLv+1); 
		
		if (nextLvCfg)
		{
			this._rightOfficerTxt.text = LanguageManager.getlocal("officialTitle" + (curLv+1));
			this._rightOfficerTxt.textColor = TextFieldConst.COLOR_WHITE;
			let leftImg:BaseLoadBitmap =  <BaseLoadBitmap>this._leftRoleContainer.getChildByName("myBody");
			let rightImg:BaseLoadBitmap =  <BaseLoadBitmap>this._rightRoleContainer.getChildByName("myBody");
			rightImg.setload("user_body"+ String(curLv+1));
			leftImg.setload("user_body"+curLv);
		}else
		{
			//右侧隐藏
			if (this._rightRoleContainer)
			{
				this._rightRoleContainer.visible = false;
				this._rightOfficerTxt.visible = false;
				this._rightofficerbg.visible = false;
				this._rightPrivilegeTxt.y = 564;
				this._rightPrivilegeTxt.x = 399;
			}
			//左侧居中
			let leftImg:BaseLoadBitmap =  <BaseLoadBitmap>this._leftRoleContainer.getChildByName("myBody");
			leftImg.setload("user_body"+curLv);
			this._leftRoleContainer.x = GameConfig.stageWidth/2 - this._leftRoleContainer.width* this._leftRoleContainer.scaleX/2;
			this._leftOfficerTxt.x  =   GameConfig.stageWidth / 2 -this._leftOfficerTxt.width/2;
			this._leftofficerbg.x =   GameConfig.stageWidth / 2 -this._leftofficerbg.width/2;
		}
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat( [
			"playerview_bg2","prisonview_1","promotion_arrow",
			"progress_type1_yellow","progress_type1_bg","public_9_bg22"
		]);
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName
		(NetRequestConst.REQUEST_USER_UPGRADE),this.refreshInfoAfterUpgrade,this);
		// this._nodeContainer.removeChildren();
		// this._nodeContainer.dispose()
		this._nodeContainer = null;
		this._rightRoleContainer = null;
		this._leftRoleContainer = null;
		// this._scrollview = null;
		this._progressBar = null;
		this._expTipTxt = null;
		this._leftPrivilegeTxt = null;
		this._leftOfficerTxt = null;
		this._leftofficerbg = null;
		this._rightPrivilegeTxt = null;
		this._rightOfficerTxt = null;;
		this._rightofficerbg = null;

		super.dispose();
	}

}