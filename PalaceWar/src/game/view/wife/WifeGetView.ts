class WifeGetView extends DialogueGetBaseView
{
	
	private _isHas310:boolean=false;
	public constructor() 
	{
		super();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"wifeget_bg",
			"wifeget",
			"wifeget_json",
			"shareBtn","shareRewardPop"
			]);
	}

	private getWifeid():string
	{
		if(typeof(this.param.data.wifeIdList) == "string"){
			this.param.data.wifeIdList = [this.param.data.wifeIdList];
		}
		
		let wifeId =  this.param.data.wifeIdList.shift();

		// //触发分阶段引导
		// if(wifeId == "101"){
		// 	Api.rookieVoApi.curGuideKey = "wife";
		// 	Api.rookieVoApi.insertWaitingGuide({"idx":"wife_1"},true);
		// }
		return wifeId;
	}

	private getWaitServantId():string
	{
		if(typeof(this.param.data)=="object")
		{
			return this.param.data.servantId;
		}
		return null;
	}
	



	public initView():void
	{
			// SoundManager.pauseBg()
		// SoundManager.playEffect(SoundConst.EFFECT_WIFE_LOVE);
		
		this.reFreshView();
	}

	private reFreshView()
	{
		//删除这个界面的触摸回调
		this.removeTouchTap();
		App.DisplayUtil.destory(this.container)
		// super.dispose();
		//释放上级对话框的内存
		this.releaseFunc();
		//设置本次人物id
		this._personId = this.getWifeid();
		if(this._isHas310==false)
		{
			this._isHas310=(String(this._personId)=="310");
		}
		//设置类型
		this.targetType = "2";
		//设置结束回调
		this.initCallbackFunc(this.reFreshViewNext);
		//开始创建窗口
		super.startView();

	}
	private reFreshViewNext()
	{
		SoundManager.pauseBg();
		let itemCfg=Config.WifeCfg.getWifeCfgById(this._personId);
		

		
		this.reFreshView2(itemCfg);
	}
	private reFreshView2(itemCfg)
	{
		let wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(Number(itemCfg.id))
		SoundManager.playEffect(wifeInfoVo.sound);

		// let bg:BaseBitmap=BaseBitmap.create("wifeget_bg");
		let bg:BaseDisplayObjectContainer=App.CommonUtil.getContainerByLeftTopRes("wifeget_bg");
		bg.setScale(GameConfig.stageWidth/bg.width);
		this.addChildToContainer(bg);

		let lizi=App.ParticleUtil.getParticle("wifeget");
		this.addChildToContainer(lizi);
		lizi.start();

		let rect:egret.Rectangle=egret.Rectangle.create();
		rect.setTo(0,0,640,840);
		let wifeIcon:BaseLoadBitmap=BaseLoadBitmap.create(itemCfg.body,rect);
		wifeIcon.setScale(0.7);
		let pos=App.CommonUtil.getCenterPos(this.viewBg,wifeIcon,false);
		wifeIcon.setPosition(pos.x,pos.y);
		this.addChildToContainer(wifeIcon);

		if(Api.wifeVoApi.isHaveBone(itemCfg.bone + "_ske"))
		{

			let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(itemCfg.bone);
			// droWifeIcon.setScale(0.7)
			droWifeIcon.x = wifeIcon.x + 210;
			droWifeIcon.y = wifeIcon.y + 760*0.7 + 70;
			this.addChildToContainer(droWifeIcon);
			wifeIcon.visible = false;
		}

		bg.setPosition(App.CommonUtil.getCenterX(this.viewBg,bg,false),wifeIcon.y+wifeIcon.height*wifeIcon.scaleY-bg.height*bg.scaleY);

		lizi.y=wifeIcon.y - 100;
		lizi.x = -350;
		let wifeInfoBg:BaseBitmap=BaseBitmap.create("public_9_wordbg");
		wifeInfoBg.height=200;
		wifeInfoBg.setPosition(0,wifeIcon.y+wifeIcon.height*wifeIcon.scaleY);
		this.addChildToContainer(wifeInfoBg);
		
		// let txt1:BaseTextField=ComponentManager.getTextField();
		
		//红颜名字背景
		let nameBg:BaseBitmap = BaseBitmap.create("public_get_namebg");
		// if(PlatformManager.checkIsTextHorizontal())
		// {
		// 	nameBg.setPosition(wifeInfoBg.x + wifeInfoBg.width / 2 - nameBg.width / 2,wifeInfoBg.y + 2 * wifeInfoBg.height);
		// }
		// else
		// {
			nameBg.x = wifeIcon.x-nameBg.width-20;
			nameBg.y = wifeIcon.y;
		// }
		this.addChildToContainer(nameBg);
		//红颜名字
		let nameTF = ComponentManager.getTextField(itemCfg.name,TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		if(PlatformManager.checkIsTextHorizontal())
		{
			nameTF.setPosition(GameConfig.stageWidth / 2 - nameTF.width / 2 , wifeInfoBg.y - 2 * nameTF.height);
			nameBg.width = nameTF.width + 30;
			nameBg.setPosition(nameTF.x + nameTF.width / 2 - nameBg.width / 2 ,nameTF.y + nameTF.height / 2 - nameBg.height / 2);
		}
		else
		{
			nameTF.width = 27;
			nameTF.x = nameBg.x + (nameBg.width - nameTF.width)*0.5;
			nameTF.y = nameBg.y + (nameBg.height - nameTF.height)/2-20;
		}

		this.addChildToContainer(nameTF);

		//红颜说的话背景
		let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg25");
		// wordsBg.height=200;
		// wordsBg.x = 140;
		// wordsBg.y = wifeIcon.y-wordsBg.height-10;
		// this.addChildToContainer(wordsBg);
		wordsBg.width = 330;
		wordsBg.height = 90;
		wordsBg.x = Api.switchVoApi.checkOpenShareGate()?80:280;
		wordsBg.y = wifeIcon.y - 120;
		this.addChildToContainer(wordsBg);

		let wordsCornerBg:BaseBitmap = BaseBitmap.create("public_9_bg25_tail");
		wordsCornerBg.x = wordsBg.x+wordsBg.width/2;
		wordsCornerBg.y = wifeIcon.y - 120 + 87;
		if (Api.switchVoApi.checkOpenShareGate()) {
			wordsCornerBg.scaleX = -1;
		}
		this.addChildToContainer(wordsCornerBg);

		//红颜说的话
		let wifeWordsText:BaseTextField = ComponentManager.getTextField(itemCfg.words ,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		wifeWordsText.width=wordsBg.width-40;
		wifeWordsText.x = wordsBg.x+20;
		wifeWordsText.y = wordsBg.y+(wordsBg.height-wifeWordsText.height)/2;
		this.addChildToContainer(wifeWordsText);

		let searchPersonCfg=Config.SearchCfg.getPersonItemCfgByWifeId(itemCfg.id);
		if(searchPersonCfg)
		{
			let ofx=10;
			let ofy=10;
			let identityTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("identityDesc")+LanguageManager.getlocal("syscolonDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
			identityTxt.setPosition(40,wifeInfoBg.y+40);
			this.addChildToContainer(identityTxt);
			let identityDescTxt:BaseTextField=ComponentManager.getTextField(searchPersonCfg.shortDesc,TextFieldConst.FONTSIZE_CONTENT_SMALL);
			identityDescTxt.setPosition(identityTxt.x+identityTxt.width+ofx,identityTxt.y);
			this.addChildToContainer(identityDescTxt);

			let meiliTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_speciality4")+LanguageManager.getlocal("syscolonDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
			meiliTxt.setPosition(identityTxt.x,identityTxt.y+identityTxt.height+ofy);
			this.addChildToContainer(meiliTxt);
			let meiliDescTxt:BaseTextField=ComponentManager.getTextField(Api.wifeVoApi.getWifeInfoVoById(Number(itemCfg.id)).glamour.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			meiliDescTxt.setPosition(meiliTxt.x+meiliTxt.width+ofx,meiliTxt.y);
			this.addChildToContainer(meiliDescTxt);

			let memoirTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("memoirDesc")+LanguageManager.getlocal("syscolonDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
			memoirTxt.setPosition(meiliTxt.x,meiliTxt.y+meiliTxt.height+ofy);
			this.addChildToContainer(memoirTxt);
			let memoirDescTxt:BaseTextField=ComponentManager.getTextField(searchPersonCfg.desc,TextFieldConst.FONTSIZE_CONTENT_SMALL);
			memoirDescTxt.setPosition(memoirTxt.x+memoirTxt.width+ofx,memoirTxt.y);
			memoirDescTxt.width=wifeInfoBg.width-memoirDescTxt.x-30;
			this.addChildToContainer(memoirDescTxt);
		}
		this.addTouchTap(this.removeTween,this);
		this.container.alpha=0;
		let ths=this;
		egret.Tween.get(this.container).to({alpha:1},500).call(function(){
			ths.removeTouchTap();
			ths.addTouchTap(ths.checkView,ths);
		});

		//如果不是第二个红颜  第二个红颜会强弹分享(此处会判断平台和开关和第二个红颜的条件)
		if(!Api.shareVoApi.checkCanShowShare(ShareVoApi.TYPE_WIFE,null)){
			// 分享按钮
			App.ShareGuideUtil.addShareNode(this.container, App.ShareGuideUtil.TYPE_WIFEGET);
		}

	}

	private removeTween():void
	{
		if(this.container)
		{
			egret.Tween.removeTweens(this.container);
			this.container.alpha=1;
		}
		this.removeTouchTap();
		this.addTouchTap(this.checkView,this);
	}


	private checkView()
	{
		if(this.param.data.wifeIdList.length <= 0){

			//添加强制分享逻辑 不满足强弹条件 ，则调用回调函数
			Api.shareVoApi.showShare(ShareVoApi.TYPE_WIFE,null,this.hide,this);
		}
		else{
			this.reFreshView();
		}
	}


	public hide():void
	{
		if(this._isHas310)
		{
			PlatformManager.openAppStoreScore();
		}
		let servantId:string=this.getWaitServantId();
		super.hide();
		if(servantId)
		{
			ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW,servantId);
		}
		
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getBgName():string
	{
		return "wifeview_lovebg";
	}

	public dispose():void
	{
		this._isHas310=false;
		super.dispose();
	}
}