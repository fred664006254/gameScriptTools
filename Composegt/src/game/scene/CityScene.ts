class CityScene extends BaseScene
{
	public constructor()
	{
		super();
	}
	private _crosschatGroup:BaseDisplayObjectContainer;
	private _crossnameTxt:BaseTextField;
	private _crossmsgTxt:BaseTextField;
	// private _snowBoneNode:BaseLoadDragonBones;

	protected init() {
		super.init();

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_CITYSCENE_SCROLL,this.doGuideScroll,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_CITYSCENE_SCROLL2,this.doGuideScroll2,this);
	}
	private doGuideScroll() {
		this._sceneScroll.setScrollLeft(BaseScene.scrollToPos);
		BaseScene.scrollToPos = BaseScene.scrollToCenterPos;
		this._sceneScroll.horizontalScrollPolicy = "off";
	}
	private doGuideScroll2() {
		if (this._sceneScroll && this._sceneScroll.horizontalScrollPolicy == "off") {
			this._sceneScroll.horizontalScrollPolicy = "on";
			BaseScene.scrollToPos = -1;
		}
	}
	protected setLayerPosition():void
	{
		super.setLayerPosition();
		// 旧版上对齐，滚动版下对齐
		if (!Api.switchVoApi.checkScrollCityScene()) {
			this._mapLayer.setPosition(0,0);
		}
	}

		protected getResourceList():string[]
	{
		let resArr = [
			"citysceneres","chatcrosstitle","chat_crosscity_namebg","chat_crosscity_txtbg",
		]
		if (Api.switchVoApi.checkScrollCityScene()) {
			resArr.push("cityscenescrollres");
		}
		return super.getResourceList().concat(resArr);
	}

	protected refreshAfterShow(isfromShow:boolean = false)
	{	
		super.refreshAfterShow(isfromShow);
		this.create_crossGroup();
	}

	private create_crossGroup():void{
		// if(App.CommonUtil.check_dragon())
        // {
		// 	if(!this._snowBoneNode){
		// 		this._snowBoneNode=App.DragonBonesUtil.getLoadDragonBones("xuehuapiaopiao");//xuehua_piaopiao actigertrappass
				
		// 		this._snowBoneNode.x = GameConfig.stageWidth/2 + 40;
		// 		this._snowBoneNode.y = 200;
			
		// 		this.addChild(this._snowBoneNode);
		// 	}

		// }


		if(Api.switchVoApi.openCrossChat()){
			if(this._crosschatGroup){
				return;
			}
			//跨服聊天消息刷新
			let crosschatGroup = new BaseDisplayObjectContainer();
			crosschatGroup.width = GameConfig.stageWidth;//450;
			crosschatGroup.height = 90;



			this.setLayoutPosition(LayoutConst.lefttop, crosschatGroup, this, [0,140]);
			this.addChild(crosschatGroup);
			this._crosschatGroup = crosschatGroup;
			crosschatGroup.visible = false;

			let chatbg = BaseBitmap.create(ResourceManager.getRes("chat_crosscity_txtbg"));
			// chatbg.width = 450;
			chatbg.width = GameConfig.stageWidth;
			chatbg.height = 110;
			// chatbg.x=0;
			// chatbg.y= bottomBg.y-chatbg.height-3;
			// this._bottomContiner.addChild(chatbg);
			chatbg.touchEnabled = true;
			chatbg.addTouchTap(this.chatBgClickHandler,this);
			crosschatGroup.setLayoutPosition(LayoutConst.leftverticalCenter, chatbg, crosschatGroup, [0,0], true);
			crosschatGroup.addChild(chatbg);

			let kuafutitle = BaseBitmap.create(ResourceManager.getRes("chat_crosscity_namebg"));
			crosschatGroup.setLayoutPosition(LayoutConst.lefttop, kuafutitle, chatbg,[30,10]);
			crosschatGroup.addChild(kuafutitle);

			let corssTxt = ComponentManager.getTextField(LanguageManager.getlocal("chat_crossTxt"), 22);
			crosschatGroup.setLayoutPosition(LayoutConst.lefttop, corssTxt, chatbg, [80, 21]);
			crosschatGroup.addChild(corssTxt);

			let desc = (crosschatGroup.height - 20 - 18) / 3;
			let name = ComponentManager.getTextField('', 20);
			crosschatGroup.setLayoutPosition(LayoutConst.lefttop, name, chatbg, [200, 18]);
			crosschatGroup.addChild(name);
			this._crossnameTxt = name;

			let msg = ComponentManager.getTextField('', 20);
			msg.width = 600;
			msg.lineSpacing = 2;
			msg.multiline = true;
			crosschatGroup.setLayoutPosition(LayoutConst.lefttop, msg, chatbg, [20,56]);
			crosschatGroup.addChild(msg);
			this._crossmsgTxt = msg;	
			this.fresh_crossMsg();
		}
	}

	private fresh_crossMsg():void{
		let view = this;
		if(view._crosschatGroup){
			let api = Api.chatVoApi;
			let obj = api.getLastCrossMessage();
			if(obj && !api.getIsReadCross()){
				this._crosschatGroup.visible = true;
				let zonename = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,obj.zoneid);
				this._crossnameTxt.text = LanguageManager.getlocal('accrosschattitle', [obj.sendername, zonename]);
				this._crossmsgTxt.text = obj.content.message
				//暂时先关闭
				// this._crossmsgTxt.text = obj.content.message.length > 50 ? (obj.content.message.substring(0, 50) + '...') : (obj.content.message);
			}
			else{
				this._crosschatGroup.visible = false;
			}
			//let mainui = SceneController.getInstance().get
		}
	}

	protected tick():void
	{
		super.tick();
		this.fresh_crossMsg();
	}
	private chatBgClickHandler():void{
		if(Api.switchVoApi.checkCloseChat())
		{
			App.CommonUtil.showTip("很抱歉，聊天系统维护中");
			return;
		}
		ViewController.getInstance().openView(ViewConst.COMMON.CHATVIEWTAB3);
	}


	private checkDinnerClose():string
	{
		return Api.composemapVoApi.getMaxLv() < Config.DinnerCfg.getNeedLv()?LanguageManager.getlocal("composeUnlockFuncDesc",[Config.DinnerCfg.getNeedLv()+""]):null;
	}
	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_CITYSCENE_SCROLL,this.doGuideScroll,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_CITYSCENE_SCROLL2,this.doGuideScroll2,this);
		if(this._crosschatGroup){
			this._crosschatGroup.dispose();
			this._crosschatGroup = null;
		}
		// this._snowBoneNode = null;
		super.dispose();
	}
}