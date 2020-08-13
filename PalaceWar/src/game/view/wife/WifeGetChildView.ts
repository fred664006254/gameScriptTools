/**
 * 得到孩子界面
 * author dukunayng
 * date 2017/10/10
 * @class WifeGetChildView
 */

class WifeGetChildView extends BaseView
{

	// id 孩子ID
	private _childId:string = null;


	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		let rewardPic:string[] = super.getResourceList();

        if (this.param.data ) {
			this._childId = this.param.data;
		}
		return rewardPic.concat(["childview_baby","childview_get","childview_getboy","childview_getgirl","shareBtn","shareRewardPop"
		]);
	}


	protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getBgName():string
	{
		return "public_9_bg8";
	}

	protected initView():void
	{

		//分阶段引导
		if(Api.childVoApi.getChildNum() ==1 && Api.adultVoApi.getAdultNum() == 0 && Api.adultVoApi.getAdultMarryNum() == 0 ){
			Api.rookieVoApi.curGuideKey = "child";
			Api.rookieVoApi.insertWaitingGuide({"idx":"child_1"},true);
			//功能解锁
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT);	
		}
		// this.addTouchTap(this.touchTap,this,null);

		SoundManager.playEffect(SoundConst.EFFECT_GETCHILD);
        let id = this._childId
		let childrenInfoVo:ChildInfoVo = Api.childVoApi.getChildrenInfoVoById(id);

		let dis = childrenInfoVo.attrVo.attTotal;
		let pos = egret.Point.create(320,GameConfig.stageHeigth/2);
		// App.CommonUtil.playRewardFlyAction([{tipMessage:LanguageManager.getlocal("rankpower")+"+"+dis}],pos);
		let powerFly = new PowerFly();
		powerFly.init(dis);
		LayerManager.msgLayer.addChild(powerFly);

        // App.LogUtil.log("sex:" + childrenInfoVo.sex)
		let tipBB:BaseBitmap = BaseBitmap.create("public_rotatelight");
		tipBB.scaleX = 2;
		tipBB.scaleY = 2;
		tipBB.anchorOffsetX = tipBB.width/2;
		tipBB.anchorOffsetY = tipBB.height/2;
		tipBB.setPosition(GameConfig.stageWidth/2 , GameConfig.stageHeigth/2 );
		// App.CommonUtil.getCenterPos
		this.addChild(tipBB);
	
		egret.Tween.get(tipBB,{loop:true})
			.to({rotation: 360}, 3000)
			

        let sexPicStr = "childview_getboy"
        if (childrenInfoVo.sex == 2){
            sexPicStr = "childview_getgirl";
        }
		//获得图片
        let getPic:BaseBitmap = BaseBitmap.create("childview_get");
		getPic.setPosition(170, tipBB.y - 330);
		this.addChild(getPic);
		let posy = getPic.y;
		if(Api.switchVoApi.checkCloseText2())
		{
			let wifeInfoVo: WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(childrenInfoVo.motherId);
			let sexstr = childrenInfoVo.sex==1?LanguageManager.getlocal("childBoyName"):LanguageManager.getlocal("childGirlName");
			getPic.y -= 80;
			let txtbg = BaseLoadBitmap.create("childview_getchildtextbg");
			txtbg.width = 567;
			txtbg.height = 127;
			txtbg.setPosition(GameConfig.stageWidth / 2 - txtbg.width / 2,getPic.y + getPic.height - 5);
			this.addChildToContainer(txtbg);
			let descType:string =String(Math.floor((Math.random()*10)) + 1);
			let txtTF = ComponentManager.getTextField(LanguageManager.getlocal("getcChildDes" + descType,[wifeInfoVo.name,sexstr]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW);
			txtTF.width = 450;
			txtTF.setPosition(txtbg.x + txtbg.width / 2 -txtTF.width/2,txtbg.y + txtbg.height / 2 -txtTF.height/2);
			this.addChildToContainer(txtTF);
			

		}
        //性别图片
        let sexPic:BaseBitmap = BaseBitmap.create(sexPicStr);
		sexPic.setPosition(getPic.x + getPic.width,getPic.y);
		this.addChild(sexPic);
        //孩子图片
        let childPic:BaseBitmap = BaseBitmap.create("childview_baby");
		childPic.setPosition(GameConfig.stageWidth/2 - childPic.width/2, posy + sexPic.height + 30);
		this.addChild(childPic);


        // //资质图片
        // let qualityPicStr = "childview_q" + childrenInfoVo.quality;
        // let qualityPic:BaseBitmap = BaseBitmap.create(qualityPicStr);
		// qualityPic.setPosition(GameConfig.stageWidth - qualityPic.width-25, tipBB.y + tipBB.height - 65);
		// this.addChild(qualityPic);

		let qualityStr = LanguageManager.getlocal("child_quality") + LanguageManager.getlocal("child_quality" + childrenInfoVo.quality);
		let qualityTF:BaseTextField = ComponentManager.getTextField( qualityStr,TextFieldConst.FONTSIZE_TITLE_SMALL);
		qualityTF.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		qualityTF.setPosition(GameConfig.stageWidth/2 - qualityTF.width/2, childPic.y + childPic.height + 30 );
		this.addChild(qualityTF);
		
		let lookBg:BaseBitmap = BaseBitmap.create("public_9_wordbg");
		// lookBg.scaleX = 2;
		lookBg.height = 200;
		lookBg.setPosition(GameConfig.stageWidth/2 - lookBg.width/2, qualityTF.y + qualityTF.height + 30);
		this.addChild(lookBg);

		//lookTip1查看孩子文字
		let lookTip:BaseTextField = ComponentManager.getTextField( LanguageManager.getlocal("wifeLookChild"),TextFieldConst.FONTSIZE_TITLE_SMALL);
		lookTip.setPosition(GameConfig.stageWidth/2 - lookTip.width/2, lookBg.y + 60);
		this.addChild(lookTip);

		let sureBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "wifeLookChildYes" ,this.sureBtnClick,this);
		sureBtn.setPosition(lookBg.x + lookBg.width/4*3 - sureBtn.width/2, lookBg.y + 120);
		this.addChild(sureBtn);

        let noBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "wifeLookChildNo" ,this.noBtnClick,this);
		noBtn.setColor(TextFieldConst.COLOR_BLACK);
		noBtn.setPosition(lookBg.x + lookBg.width/4 - noBtn.width/2, lookBg.y + 120);
		this.addChild(noBtn);

		//如果不是第一个孩子  第一个孩子会强弹分享(此处会判断平台和开关和第一个孩子的条件)
		if(!Api.shareVoApi.checkCanShowShare(ShareVoApi.TYPE_CHILD,null)){
			// 分享按钮
			App.ShareGuideUtil.addShareNode(this.container, App.ShareGuideUtil.TYPE_CHILDGET);
		}

	}

	private sureBtnClick():void
	{	
		//添加强制分享逻辑
		Api.shareVoApi.showShare(ShareVoApi.TYPE_CHILD,null,this.sureBtnClickEvent,this);
	}
	private sureBtnClickEvent():void
	{
		//分阶段引导
		if(Api.childVoApi.getChildNum() ==1 && Api.adultVoApi.getAdultNum() == 0 && Api.adultVoApi.getAdultMarryNum() == 0 ){
			this.hide();
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHILD_GUIDE);
			return;
		}

		ViewController.getInstance().hideAllView();
		// ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
		this._childId = this.param.data;
		ViewController.getInstance().openView(ViewConst.COMMON.CHILDVIEW,{childId:this._childId});
	}

    private noBtnClick():void
	{
		//添加强制分享逻辑
		Api.shareVoApi.showShare(ShareVoApi.TYPE_CHILD,null,this.noBtnClickEvent,this);	
		// ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
	}
	private noBtnClickEvent(): void
	{
		this.hide();
	}

	private touchTap():void
	{
		this.hide();
	}

	public dispose():void
	{
		this._childId = null;
		super.dispose();
	}

}