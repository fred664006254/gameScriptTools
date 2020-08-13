/**
 * 结婚成功
 * author dukunayng
 * date 2017/11/1
 * @class AdultMarrySuccessView
 */

class AdultMarrySuccessView extends BaseView
{

	// id 孩子ID
	private _childId:string = null;
	private _confirmCallback:Function;
	

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		let rewardPic:string[] = super.getResourceList();

        if (this.param.data ) {
			this._childId = this.param.data;
		}

		return rewardPic.concat([
		"childview_boyicon","childview_girlicon","adult_bg","adult_boy","adult_girl",
		"wifeget_bg","servant_huawenleft","shareBtn","shareRewardPop","adultview"
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

		this._confirmCallback = this.param.data.confirmCallback;
		this.addTouchTap(this.touchTap,this,null);

		SoundManager.playEffect(SoundConst.EFFECT_UPD);
		this._childId = this.param.data.childId
        let id = this._childId
		let adultInfoVo:AdultMarryInfoVo = Api.adultVoApi.getAdultMarryInfoVoById(id);


		let bg:BaseDisplayObjectContainer=App.CommonUtil.getContainerByLeftTopRes("wifeget_bg");
		bg.setScale(GameConfig.stageWidth/bg.width);
		this.addChildToContainer(bg);

		// lizi.x = 100;
		
		bg.y = 260;

        let myIcon = "adult_boy"
		let otherIcon = "adult_girl"
		let childSexPic1 = "childview_boyicon";
		let childSexPic2 = "childview_girlicon";
		if(adultInfoVo.sex == 2){
			myIcon = "adult_girl"
			otherIcon = "adult_boy"
			childSexPic1 = "childview_girlicon";	
			childSexPic2 = "childview_boyicon";	
		}

		//获得图片
        let getPic:BaseBitmap = BaseBitmap.create("adult_lovebg");
		getPic.setPosition(this.viewBg.width/2 - getPic.width/2, 100);
		this.addChild(getPic);

        //孩子图片
        let childPic1:BaseBitmap = BaseBitmap.create(myIcon);
		childPic1.setPosition(40, getPic.y + getPic.height + 10);
		this.addChild(childPic1);

		//对面孩子图片
        let childPic2:BaseBitmap = BaseBitmap.create(otherIcon);
		childPic2.setPosition(260, getPic.y + getPic.height + 10);
		this.addChild(childPic2);

		
		let lookBg:BaseBitmap = BaseBitmap.create("public_9_wordbg");
		// lookBg.scaleX = 2;
		lookBg.height = 250;
		lookBg.setPosition(GameConfig.stageWidth/2 - lookBg.width/2, childPic1.y + childPic1.height);
		this.addChild(lookBg);
		

		//孩子名字
		let nameTf1:BaseTextField = ComponentManager.getTextField( adultInfoVo.name,TextFieldConst.FONTSIZE_TITLE_SMALL);
		// nameTf1.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		nameTf1.setPosition(100, lookBg.y + 40);
		this.addChild(nameTf1);



		let childIcon1:BaseBitmap = BaseBitmap.create(childSexPic1);
		childIcon1.x =  nameTf1.x + nameTf1.width + 10;
		childIcon1.y = nameTf1.y;
		childIcon1.setScale(0.8);
		this.addChild(childIcon1);

		let childLine1:BaseBitmap = BaseBitmap.create("servant_huawenleft");
		childLine1.x =  nameTf1.x;
		childLine1.y = nameTf1.y + nameTf1.height + 10;
		childLine1.setScale(0.8);
		this.addChild(childLine1);

		//lookTip1查看孩子文字
		let f1Str = LanguageManager.getlocal("adultMarryFather") + Api.playerVoApi.getPlayerName();
		let matherTF:BaseTextField = ComponentManager.getTextField( f1Str,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		matherTF.setPosition(nameTf1.x, nameTf1.y + nameTf1.height + 40);
		matherTF.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		this.addChild(matherTF);

		let att1Str = LanguageManager.getlocal("servant_infoAttr") + "     " + adultInfoVo.total;
		let att1TF:BaseTextField = ComponentManager.getTextField( att1Str,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		att1TF.setPosition(nameTf1.x, matherTF.y + matherTF.height + 40);
		att1TF.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		this.addChild(att1TF);

		//孩子名字
		let nameTf2:BaseTextField = ComponentManager.getTextField( adultInfoVo.fname,TextFieldConst.FONTSIZE_TITLE_SMALL);
		// nameTf2.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		nameTf2.setPosition(400, lookBg.y + 40);
		this.addChild(nameTf2);

		let childLine2:BaseBitmap = BaseBitmap.create("servant_huawenleft");
		childLine2.x =  nameTf2.x;
		childLine2.y = nameTf2.y + nameTf2.height + 10;
		childLine2.setScale(0.8);
		this.addChild(childLine2);

		let childIcon2:BaseBitmap = BaseBitmap.create(childSexPic2);
		childIcon2.setScale(0.8);
		childIcon2.x =  nameTf2.x + nameTf2.width + 10;
		childIcon2.y = nameTf2.y;
		this.addChild(childIcon2);

		let f2Str = LanguageManager.getlocal("adultMarryFather") + adultInfoVo.funame;
		let matherTF2:BaseTextField = ComponentManager.getTextField( f2Str,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		matherTF2.setPosition(nameTf2.x, nameTf2.y + nameTf2.height + 40);
		matherTF2.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		this.addChild(matherTF2);

		let att2Str = LanguageManager.getlocal("servant_infoAttr") + "     " + adultInfoVo.ftotal;
		let att2TF:BaseTextField = ComponentManager.getTextField( att2Str,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		att2TF.setPosition(nameTf2.x, matherTF2.y + matherTF2.height + 40);
		att2TF.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		this.addChild(att2TF);

		let dis = adultInfoVo.ftotal;
		let pos = egret.Point.create(320,GameConfig.stageHeigth/2);
		// App.CommonUtil.playRewardFlyAction([{tipMessage:LanguageManager.getlocal("rankpower")+"+"+dis}],pos);
		let powerFly = new PowerFly();
		powerFly.init(dis);
		
		LayerManager.msgLayer.addChild(powerFly);

		if(adultInfoVo.sex == 2){
			childPic1.anchorOffsetX = childPic1.width/2;
			childPic2.anchorOffsetX = childPic2.width/2;
			childPic1.x = childPic1.x + childPic1.width/2;
			childPic2.x = childPic2.x + childPic2.width/2;
			childPic1.skewY = 180;
			childPic2.skewY = 180;
		}
		App.ShareGuideUtil.addShareNode(this.container, App.ShareGuideUtil.TYPE_CHILDMARRY);

	}

	private sureBtnClick():void
	{
		ViewController.getInstance().hideAllView();
		// ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
		this._childId = this.param.data;
		ViewController.getInstance().openView(ViewConst.COMMON.CHILDVIEW,{childId:this._childId});
	}

	protected isShowOpenAni():boolean
	{
		return false;
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

	public hide()
	{
		super.hide();
		if(this.param.data.confirmCallback){
			this.param.data.confirmCallback.apply(this.param.data.handler,[]);
		}
		
	}
	public dispose():void
	{
		this._childId = null;
		super.dispose();
	}

}