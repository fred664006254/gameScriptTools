/**
 * 门客招募UI
 * author yanyuling
 * date 2017/10/19
 * @class ServantGetView
 */

class ServantGetView  extends DialogueGetBaseView
{
	private _servantInfoBg = null;
	private _checkBox = null;
	private _nodeContainer:BaseDisplayObjectContainer;
	public static _composeLv: number = 0;


	public constructor() {
		super();
	}

	
	public initView():void
	{
		//设置本次人物id
		this._personId = this.param.data.shift();
		//合成小人等级
		// this._composeLv = this.param.data.compose || 0;
		//设置类型
		this.targetType = "1";
		//设置回调函数
		this.initCallbackFunc(this.createView);
		//开始创建窗口
		super.startView();

    }

	

	protected createView()
	{
		console.log("create view-----");
		
 		this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        
		if(typeof(this.param.data) == "string"){
			this.param.data = [this.param.data];
		}
		
		let servantId = this._personId;//this.param.data.shift();

        // let servantId = this.param.data
        let servantCfg = GameConfig.config.servantCfg[servantId];
        let ability = servantCfg.ability
		let servantInfoObj = Api.servantVoApi.getServantObj(servantId);

		SoundManager.playEffect(servantInfoObj.sound);
		// this.showGetBtn();
        // this.addTouchTap(this.clickHandler,this)
		
        let servant_get_word = BaseBitmap.create("servant_get_word");
        servant_get_word.x = GameConfig.stageWidth/2 - servant_get_word.width/2;
        servant_get_word.y = 20;
        this._nodeContainer.addChild(servant_get_word);

        let bottomBg = BaseBitmap.create("public_9_wordbg");
		this._servantInfoBg = bottomBg;
		bottomBg.touchEnabled = true;
        bottomBg.height = 375;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height;
        this._nodeContainer.addChild(bottomBg);

		

        let servantFullImg = BaseLoadBitmap.create(Api.servantVoApi.getFullImgPathWithId(servantId));
		servantFullImg.width = 640;
		servantFullImg.height = 482;
		servantFullImg.x = GameConfig.stageWidth/2 - servantFullImg.width/2;
		servantFullImg.y = bottomBg.y - servantFullImg.height;
		this._nodeContainer.addChildAt(servantFullImg,0);


        let nameBg =  BaseBitmap.create("servant_alv_namebg");

        this._nodeContainer.addChild(nameBg);
		if(PlatformManager.checkIsTextHorizontal()){
			
		} else {
			// nameBg.x = 76
			// nameBg.y = 277;
			nameBg.setPosition(76, servantFullImg.y + 40)
		}

        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);

		if(PlatformManager.checkIsTextHorizontal()){
			
		} else {
			nameTxt.multiline = true;
			nameTxt.width = 26;
		}
		// nameTxt.textColor = ServantScrollItem.QUALITYCFG[servantCfg.quality];
		nameTxt.textColor = TextFieldConst.COLOR_QUALITY_WHITE;
        nameTxt.text = LanguageManager.getlocal("servant_name"+ servantId);
		if(PlatformManager.checkIsTextHorizontal()){
			nameBg.width = nameTxt.width + 40;
			nameBg.x = GameConfig.stageWidth/2 - nameBg.width/2;
			nameBg.y = GameConfig.stageHeigth - 465;
			nameTxt.x = nameBg.x + nameBg.width/2 - nameTxt.width/2;
			nameTxt.y = nameBg.y + nameBg.height/2 - nameTxt.height/2;
		} else {
			nameTxt.x =nameBg.x + nameBg.width/2-nameTxt.width/2;
        	nameTxt.y = nameBg.y+ 80 - nameTxt.height/2;
		}

		
        this._nodeContainer.addChild(nameTxt);

        let lightImg = BaseBitmap.create("public_rotatelight");
        lightImg.anchorOffsetX = lightImg.width/2;
        lightImg.anchorOffsetY = lightImg.height/2;
		lightImg.x =  GameConfig.stageWidth/2;
		lightImg.y = servantFullImg.y + servantFullImg.height/2-20;
		lightImg.setScale(2);
        
		this._nodeContainer.addChildAt(lightImg,0);
        egret.Tween.get(lightImg,{loop:true}).to({rotation:360},15000);

        let starNumTxt=0;
        let totalStar =0;
        let posX = 50;
		let posY = bottomBg.y + 30;
		posY = 0;
		let tmpScrNode = new BaseDisplayObjectContainer();
        for (var index2 = 0; index2 < ability.length; index2++) {
			let aid = ability[index2];
			let tmpAcfg = GameConfig.config.abilityCfg[aid];
			if (index2%2 == 1)
			{
				posX = GameConfig.stageWidth/2+4;
			}else
			{
				posX = 50;
			}

			let attrIcon = BaseBitmap.create("servant_infoPro"+tmpAcfg.type);
			attrIcon.x = posX +15;
			attrIcon.y = posY ;
			tmpScrNode.addChild(attrIcon);

			let starImg = this.getStars(tmpAcfg.num);
			starImg.x = attrIcon.x +attrIcon.width/2 - starImg.width/2;
			starImg.y = attrIcon.y + 65;
			tmpScrNode.addChild(starImg);

			let attrNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_attrNameTxt"+aid),20,TextFieldConst.COLOR_WHITE);
			attrNameTxt.x = attrIcon.x + 77;
			attrNameTxt.y = posY+20;
			tmpScrNode.addChild(attrNameTxt);
 
			let attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_attrTxt" + tmpAcfg.type),18,TextFieldConst.COLOR_WHITE);
			attrTxt.x = attrNameTxt.x+13;
			attrTxt.y = attrNameTxt.y + 35;
			tmpScrNode.addChild(attrTxt);

			let attrValueTxt = ComponentManager.getTextField(tmpAcfg.num.toString(),18,TextFieldConst.COLOR_WHITE);
			attrValueTxt.x = attrTxt.x + attrTxt.width + 5;
			attrValueTxt.y = attrTxt.y ;
			tmpScrNode.addChild(attrValueTxt);
			totalStar += tmpAcfg.num;
			if (index2%2 == 1)
			{
				posY += 95;
			}
		}
		let rect = new egret.Rectangle(0,0,bottomBg.width,bottomBg.height-40);
		let tmpScrollList = ComponentManager.getScrollView(tmpScrNode,rect);
		tmpScrollList.y = bottomBg.y + 30;
		this._nodeContainer.addChild(tmpScrollList);

		// let str = LanguageManager.getlocal("servantInfo_title"+ String(totalStar),[servantInfoObj.getTotalBookValue()]);
		let totalBg = BaseBitmap.create("public_starBg");
		totalBg.width = 249;
		totalBg.height = 48;
		this._nodeContainer.addChild(totalBg);
		totalBg.setPosition((GameConfig.stageWidth - totalBg.width)/2, bottomBg.y - 156);

		let str = LanguageManager.getlocal("servantInfo_title",[""+servantInfoObj.getTotalBookValue()]);
        let totalTxt = ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        // totalTxt.x = GameConfig.stageWidth - totalTxt.width - 20;
        // totalTxt.y = bottomBg.y - 30;
		totalTxt.width = totalBg.width;
		totalTxt.textAlign = TextFieldConst.ALIGH_CENTER;
		totalTxt.setPosition(totalBg.x, totalBg.y + 11);
        this._nodeContainer.addChild(totalTxt);
        //添加出现action
        this._nodeContainer.alpha = 0;
        egret.Tween.get( this._nodeContainer,{loop:false}).to({alpha:1},800);
		this.showGetBtn();
		// 分享按钮
		// App.ShareGuideUtil.addShareNode(this._nodeContainer, App.ShareGuideUtil.TYPE_SERVANTGET);

		let qualityIcon = GameData.getServantQualityIconBySid(servantId);
		if (qualityIcon) {
			this._nodeContainer.addChild(qualityIcon);
			qualityIcon.setPosition(-33, servantFullImg.y - 111);
		}

		// 羁绊
		let _fetterBtn = GameData.getServantFetterBtn(servantId);
		if (_fetterBtn) {
			this._nodeContainer.addChild(_fetterBtn);
			_fetterBtn.setPosition(GameConfig.stageWidth - 130, bottomBg.y - 110);
			_fetterBtn.setScale(100/_fetterBtn.width);
		}

		let skillBar = ComponentManager.getSkillBar(servantId, 86);
		this._nodeContainer.addChild(skillBar);
		skillBar.setPosition(130, bottomBg.y - 100);
		skillBar.labelWidth = GameConfig.stageWidth - 260;

		if (skillBar.emptySkill) {
			totalBg.y += 80;
			totalTxt.y += 80;
		}

		let _newIcon = BaseBitmap.create("searchstoryview_newservant");
		this._nodeContainer.addChild(_newIcon);
		_newIcon.setPosition(
			(GameConfig.stageWidth - _newIcon.width)/2,
			servantFullImg.y - _newIcon.height - 4 >= 100 ? 100 : servantFullImg.y - _newIcon.height - 4
		);
	}

	/**羁绊详情 */
	private onFetterTap() {
		ViewController.getInstance().openView(ViewConst.POPUP.SERVANTJIBANBUFFPOPUPVUEW,{sid : this._personId})
	}

	private showGetBtn():void
	{
		

		if(PlatformManager.checkGetShare()){

			// 显示勾选分享

			this._checkBox = ComponentManager.getCheckBox(LanguageManager.getlocal("shareFriendGiftText"),false,18,0x987160,"public_select_down2","public_select2");

			let collectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"shareFriendCollect",this.collectBtnListener,this);
			// let checkBoxBg = BaseBitmap.create("public_icontimebg");
			// checkBoxBg.setScale(1);
			// this._nodeContainer.addChild(checkBoxBg);

			collectBtn.x = this.viewBg.width / 2 - collectBtn.width/2;
			collectBtn.y = this._servantInfoBg.y - 5 - collectBtn.height;
			this._nodeContainer.addChild(collectBtn);

			
			// this._checkBox.x = this.viewBg.width / 2 - this._checkBox.width/2 - 5;
			// this._checkBox.y = collectBtn.y - 15 - this._checkBox.height;
			
			this._checkBox.x = GameConfig.stageWidth - 147 - 20 + 147/2 - this._checkBox.width/2;//this.viewBg.width - 20 - this._checkBox.width;
			this._checkBox.y = collectBtn.y;

			// checkBoxBg.x = this._checkBox.x + this._checkBox.width / 2 - checkBoxBg.width * checkBoxBg.scaleX/2 + 20;
			// checkBoxBg.y = this._checkBox.y + this._checkBox.height / 2 - checkBoxBg.height * checkBoxBg.scaleY/2;
			this._nodeContainer.addChild(this._checkBox);	
			let otherinfo = Api.otherInfoVoApi.getOtherInfo().info;
			this._checkBox.isSelected = !(otherinfo.notshareservant);
				

		} else {
			this.viewBg.addTouchTap(this.clickHandler,this)
		}

	}
	private collectBtnListener():void
	{
		let otherinfo = Api.otherInfoVoApi.getOtherInfo().info;
		let oldState = !!otherinfo.notshareservant;
		let curState = !this._checkBox.isSelected
		if(oldState != curState){
			//值发生改变
			NetManager.request(NetRequestConst.REQUST_OTHERINFO_CHANGSHARE,{scene:"servantget",changshare:curState?1:0});
		}
		if(!curState){
			console.log("分享");
			// PlatformManager.share(App.ShareGuideUtil.SHARETYPE_SHARE_MENKEAUTO,()=>{},this);
			this.shareCollect();
		} else {
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				"needCancel":1,
				// "callback":this.,
				"clickNotAutoHide":false,
				"cancelcallback":this.commonCollect,
				"title":"confirmShareCollectTitle",
				"msg":LanguageManager.getlocal("confirmShareCollectServantTip"),
				"canelTxt":"canelTxt",
				"handler":this
			});
		}
		
	}
	private shareCollect():void
	{
		if(PlatformManager.checkIsLocal()){
			App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETTYPESHAREREWARD,this.flyReward,this);
			NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETTYPESHAREREWARD,{typeid:this._personId});
			this.clickHandler();

		} else {
			PlatformManager.share(App.ShareGuideUtil.SHARETYPE_SHARE_MENKEAUTO,()=>{
				App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETTYPESHAREREWARD,this.flyReward,this);
				NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETTYPESHAREREWARD,{typeid:this._personId});
				this.clickHandler();
			},this);
		}

		//此处添加获得物品请求
		
	}
	private flyReward(event):void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETTYPESHAREREWARD,this.flyReward,this);
		let rewards = event.data.data.data.rewards;
		let rewardList =  GameData.formatRewardItem(rewards);
		App.CommonUtil.playRewardFlyAction(rewardList);


	}
	private commonCollect():void
	{
		this.clickHandler();
	}
    protected clickHandler()
    {
		
		console.log("servant get view---click handler");
		
        super.hide()
		Api.rookieVoApi.checkNextStep();
		let servantId:string=this.param.data;
		// super.hide();
		if(servantId&&servantId[0]) {
			ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW,servantId);
		}
    }
    protected getStars(num:number)
	{
		let objContainer = new BaseDisplayObjectContainer;

		for (var index = 1; index <= num; index++) {
			let starImg = BaseBitmap.create("servant_star")
			starImg.setScale(0.5);
			starImg.x = (index-1) * starImg.width*0.5;
			starImg.y = 0;
			objContainer.addChild(starImg);
		}
		return objContainer;
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "servant_star","shareBtn","shareRewardPop",
            "servant_infoPro1","servant_infoPro2","servant_infoPro3","servant_infoPro4",
			"servant_alv_namebg","public_rotatelight","searchstoryview_newservant"
		]);
	}

	public dispose():void
	{
		this._nodeContainer = null;
		this._servantInfoBg = null;
		this._checkBox = null;
		super.dispose();
		if (this.param.data && this.param.data.length > 0) return;
		if (ServantGetView._composeLv == 9) {
			Api.rookieVoApi._waitingGuide.length=0;
            Api.rookieVoApi.curGuideKey = "levy";
            Api.rookieVoApi.insertWaitingGuide({"idx":"levy_1"});
			Api.rookieVoApi.checkWaitingGuide();
		}

		ServantGetView._composeLv = 0;
	}
}