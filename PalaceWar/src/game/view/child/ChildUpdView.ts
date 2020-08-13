/**
 * 金榜题名
 * author dukunayng
 * date 2017/10/28
 * @class ChildUpdView
 */

class ChildUpdView extends BaseView
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

		return rewardPic.concat(["adult_updtitle","childview_getgirl","wifeview_namebg"
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
		// if(Api.adultVoApi.getAdultMarryNum() == 0 && Api.adultVoApi.getAdultNum() == 1){
		// 	Api.rookieVoApi.curGuideKey = "adult";
		// 	Api.rookieVoApi.insertWaitingGuide({"idx":"adult_1"},true);
		// }
		

		//分阶段引导

		this.addTouchTap(this.touchTap,this,null);
		this.viewBg.touchEnabled = true;

		SoundManager.playEffect(SoundConst.EFFECT_UPD);
        let id = this._childId
		let adultInfoVo:AdultInfoVo = Api.adultVoApi.getAdultInfoVoById(id);

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
			

        let sexPicStr = Api.adultVoApi.getAdultPic(id);

		//获得图片
        let getPic:BaseBitmap = BaseBitmap.create("adult_updtitle");
		getPic.setPosition(170, tipBB.y - 400);
		this.addChild(getPic);

        //孩子图片
		let childPic:BaseLoadBitmap = BaseLoadBitmap.create(sexPicStr);
		childPic.width = 332;
		childPic.height = 375;
		childPic.setPosition(GameConfig.stageWidth/2 - childPic.width/2, getPic.y + getPic.height + 30);
		this.addChild(childPic);

		//名字竖版改成横版
		if(PlatformManager.checkIsTextHorizontal()){
			let qualityBg:BaseBitmap = BaseBitmap.create("wifeview_namebg");
			qualityBg.x = childPic.x + childPic.width/2 - qualityBg.width/2;
			qualityBg.y = childPic.y + childPic.height - qualityBg.height/2 - 40;
			this.addChild(qualityBg);


			let qualityBB:BaseBitmap = BaseBitmap.create("adult_q" + adultInfoVo.aquality);
			qualityBB.x = childPic.x + childPic.width/2 - qualityBB.width/2;
			qualityBB.y = childPic.y + childPic.height - qualityBB.height/2 - 40;
			this.addChild(qualityBB);



		} else {
			//孩子资质背景
			let qualityBg:BaseBitmap = BaseBitmap.create("public_get_namebg");
			qualityBg.x = childPic.x-qualityBg.width-20;
			qualityBg.y = childPic.y;
			this.addChild(qualityBg);


			let qualityBB:BaseBitmap = BaseBitmap.create("adult_q" + adultInfoVo.aquality);
			qualityBB.x = qualityBg.x + qualityBg.width/2 - qualityBB.width/2;
			qualityBB.y = qualityBg.y + 45;
			this.addChild(qualityBB);

		}




        // //资质图片
        // let qualityPicStr = "childview_q" + childrenInfoVo.quality;
        // let qualityPic:BaseBitmap = BaseBitmap.create(qualityPicStr);
		// qualityPic.setPosition(GameConfig.stageWidth - qualityPic.width-25, tipBB.y + tipBB.height - 65);
		// this.addChild(qualityPic);

		
		let lookBg:BaseBitmap = BaseBitmap.create("public_9_wordbg");
		// lookBg.scaleX = 2;
		lookBg.height = 300;
		lookBg.setPosition(GameConfig.stageWidth/2 - lookBg.width/2, childPic.y + childPic.height);
		this.addChild(lookBg);


		//孩子名字
		let nameTf:BaseTextField = ComponentManager.getTextField( adultInfoVo.name,TextFieldConst.FONTSIZE_TITLE_SMALL);
		nameTf.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		nameTf.setPosition(265, lookBg.y + 40);
		this.addChild(nameTf);

		//lookTip1查看孩子文字
		let wifeInfoVo: WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(adultInfoVo.motherId);
		let wStr = LanguageManager.getlocal("childMother", [wifeInfoVo.name]);
		let matherTF:BaseTextField = ComponentManager.getTextField( wStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		matherTF.setPosition(nameTf.x, nameTf.y + nameTf.height + 10);
		this.addChild(matherTF);

		let att1Str = LanguageManager.getlocal("servant_infoAttr") + adultInfoVo.attrVo.attTotal;
		let att1TF:BaseTextField = ComponentManager.getTextField( att1Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		att1TF.setPosition(nameTf.x, matherTF.y + matherTF.height + 10);
		this.addChild(att1TF);

		let att2Str = LanguageManager.getlocal("servantInfo_speciality1") +"："+ adultInfoVo.attrVo.forceTotal;
		let att2TF:BaseTextField = ComponentManager.getTextField( att2Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		att2TF.setPosition(nameTf.x, att1TF.y + att1TF.height + 10);
		this.addChild(att2TF);

		let att3Str = LanguageManager.getlocal("servantInfo_speciality2")  +"："+  adultInfoVo.attrVo.brainsTotal;
		let att3TF:BaseTextField = ComponentManager.getTextField( att3Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		att3TF.setPosition(nameTf.x, att2TF.y + att2TF.height + 10);
		this.addChild(att3TF);

		let att4Str = LanguageManager.getlocal("servantInfo_speciality3") +"："+  adultInfoVo.attrVo.politicsTotal;
		let att4TF:BaseTextField = ComponentManager.getTextField( att4Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		att4TF.setPosition(nameTf.x, att3TF.y + att3TF.height + 10);
		this.addChild(att4TF);

		let att5Str = LanguageManager.getlocal("servantInfo_speciality4") +"："+  adultInfoVo.attrVo.charmTotal;
		let att5TF:BaseTextField = ComponentManager.getTextField( att5Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		att5TF.setPosition(nameTf.x, att4TF.y + att4TF.height + 10);
		this.addChild(att5TF);



	}

	private sureBtnClick():void
	{
		ViewController.getInstance().hideAllView();
		// ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
		this._childId = this.param.data;
		ViewController.getInstance().openView(ViewConst.COMMON.CHILDVIEW,{childId:this._childId});
	}

    private noBtnClick():void
	{
		this.hide();
		// ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
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