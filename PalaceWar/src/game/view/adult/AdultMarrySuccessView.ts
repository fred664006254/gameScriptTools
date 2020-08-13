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

		return rewardPic.concat(["childview_getgirl",
		"childview_boyicon","childview_girlicon",
		"wifeget_bg","shareBtn","shareRewardPop","adultzscircle","adultzs1","adultzs2","adultzs3","adultzs4","adultzstop",
			"adultview",
			"adult_1_1","adult_1_2","adult_1_3","adult_1_4","adult_1_5","adult_1_6",
			"adult_2_1","adult_2_2","adult_2_3","adult_2_4","adult_2_5","adult_2_6"
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

		if (!adultInfoVo)
		{	
			this.hide();
			return;
		}

		let bg:BaseDisplayObjectContainer=App.CommonUtil.getContainerByLeftTopRes("wifeget_bg");
		bg.setScale(GameConfig.stageWidth/bg.width);
		this.addChild(bg);

		// lizi.x = 100;
		
		bg.y = 260;

        let myIcon = "adult_boy"
		let otherIcon = "adult_girl"
		if(adultInfoVo.sex == 2){
			myIcon = "adult_girl"
			otherIcon = "adult_boy"
		}
		if(Api.switchVoApi.checkOpenAdultImage() && adultInfoVo.aquality != 7){
			myIcon = `adult_${adultInfoVo.sex}_${adultInfoVo.aquality}`;
			otherIcon = `adult_${3 - adultInfoVo.sex}_${adultInfoVo.aquality}`;
		}

		//获得图片
        let getPic:BaseBitmap = BaseBitmap.create("adult_lovebg");
		getPic.setPosition(this.viewBg.width/2 - getPic.width/2, 100);
		this.addChild(getPic);
        //孩子图片
		let childPic1:BaseLoadBitmap = BaseLoadBitmap.create(myIcon);
		childPic1.width = 332;
		childPic1.height = 375;
		childPic1.setPosition(40, getPic.y + getPic.height + 10);
		this.addChild(childPic1);
		//对面孩子图片
		let childPic2:BaseLoadBitmap = BaseLoadBitmap.create(otherIcon);
		childPic2.width = 332;
		childPic2.height = 375;
		childPic2.setPosition(260, getPic.y + getPic.height + 10);
		this.addChild(childPic2);

		let lookBg:BaseBitmap = BaseBitmap.create("public_9_wordbg");
		// lookBg.scaleX = 2;
		lookBg.height = 200;
		lookBg.setPosition(GameConfig.stageWidth/2 - lookBg.width/2, childPic1.y + childPic1.height);
		this.addChild(lookBg);

		if(adultInfoVo.visit == 2){//adultInfoVo.visit == 2
			getPic.setRes('adultzstop');

			let lightImg = BaseBitmap.create("adultzscircle");
			lightImg.anchorOffsetX = lightImg.width/2;
			lightImg.anchorOffsetY = lightImg.height/2;
			lightImg.setScale(1.2);
			//this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lightImg, getPic);
			lightImg.x = 320;
			lightImg.y = 197;
			this.addChild(lightImg);
			this.swapChildren(lightImg, getPic);
			egret.Tween.get(lightImg,{loop:true}).to({rotation:360},15000);

			let zs1 = BaseBitmap.create('adultzs1');
			this.setLayoutPosition(LayoutConst.horizontalCentertop, zs1, this.viewBg);
			this.addChild(zs1);

			let zs2= BaseBitmap.create('adultzs2');
			zs2.scaleX = -1;
			this.setLayoutPosition(LayoutConst.righttop, zs2, this.viewBg, [zs2.width,80]);
			this.addChild(zs2);

			let zs22 = BaseBitmap.create('adultzs2');
			this.setLayoutPosition(LayoutConst.lefttop, zs22, this.viewBg,  [0,80]);
			this.addChild(zs22);

			let zs3 = BaseBitmap.create('adultzs3');
			this.setLayoutPosition(LayoutConst.lefttop, zs3, lookBg, [5, -20]);
			this.addChild(zs3);

			let zs33 = BaseBitmap.create('adultzs3');
			zs33.scaleX = -1;
			this.setLayoutPosition(LayoutConst.righttop, zs33, lookBg, [5+zs33.width, -20]);
			this.addChild(zs33);

			let zs4 = BaseBitmap.create('adultzs4');
			this.setLayoutPosition(LayoutConst.leftbottom, zs4, lookBg, [10,0]);
			this.addChild(zs4);

			let zs44 = BaseBitmap.create('adultzs4');
			zs44.scaleX = -1;
			this.setLayoutPosition(LayoutConst.rightbottom, zs44, lookBg, [zs44.width,0]);
			this.addChild(zs44);
		}

		//孩子名字
		let nameTf1:BaseTextField = ComponentManager.getTextField( adultInfoVo.name,TextFieldConst.FONTSIZE_TITLE_SMALL);
		nameTf1.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		nameTf1.setPosition(100, lookBg.y + 40);
		this.addChild(nameTf1);

		//lookTip1查看孩子文字
		let f1Str = LanguageManager.getlocal("adultMarryFather") + Api.playerVoApi.getPlayerName();
		let matherTF:BaseTextField = ComponentManager.getTextField( f1Str,TextFieldConst.FONTSIZE_TITLE_SMALL);
		matherTF.setPosition(nameTf1.x, nameTf1.y + nameTf1.height + 20);
		this.addChild(matherTF);

		let att1Str = LanguageManager.getlocal("servant_infoAttr") + adultInfoVo.total;
		let att1TF:BaseTextField = ComponentManager.getTextField( att1Str,TextFieldConst.FONTSIZE_TITLE_SMALL);
		att1TF.setPosition(nameTf1.x, matherTF.y + matherTF.height + 20);
		this.addChild(att1TF);

		//孩子名字
		let nameTf2:BaseTextField = ComponentManager.getTextField( adultInfoVo.fname,TextFieldConst.FONTSIZE_TITLE_SMALL);
		nameTf2.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		nameTf2.setPosition(400, lookBg.y + 40);
		this.addChild(nameTf2);

		let f2Str = LanguageManager.getlocal("adultMarryFather") + adultInfoVo.funame;
		let matherTF2:BaseTextField = ComponentManager.getTextField( f2Str,TextFieldConst.FONTSIZE_TITLE_SMALL);
		matherTF2.setPosition(nameTf2.x, nameTf2.y + nameTf2.height + 20);
		this.addChild(matherTF2);

		let att2Str = LanguageManager.getlocal("servant_infoAttr") + adultInfoVo.ftotal;
		let att2TF:BaseTextField = ComponentManager.getTextField( att2Str,TextFieldConst.FONTSIZE_TITLE_SMALL);
		att2TF.setPosition(nameTf2.x, matherTF2.y + matherTF2.height + 20);
		this.addChild(att2TF);

		if(adultInfoVo.visit){
			let str = adultInfoVo.visit == 1 ? (LanguageManager.getlocal(`adultmarrysuc1`, [adultInfoVo.visitname, Math.floor(Config.SadunCfg.addExtent1 * 100).toString()])) : (LanguageManager.getlocal(`adultmarrysuc2`, [Math.floor(Config.SadunCfg.addExtent2 * 100).toString()]));
			let desc =  ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_TITLE_SMALL);
			this.setLayoutPosition(LayoutConst.horizontalCenterbottom, desc, lookBg, [0,10]);
			this.addChild(desc);
		}

		// let dis = adultInfoVo.ftotal;
		// let pos = egret.Point.create(320,GameConfig.stageHeigth/2);
		// // App.CommonUtil.playRewardFlyAction([{tipMessage:LanguageManager.getlocal("rankpower")+"+"+dis}],pos);
		// let powerFly = new PowerFly();
		// powerFly.init(dis);
		
		// LayerManager.msgLayer.addChild(powerFly);

		if(adultInfoVo.sex == 2){
			childPic1.anchorOffsetX = childPic1.width/2;
			childPic2.anchorOffsetX = childPic2.width/2;
			childPic1.x = childPic1.x + childPic1.width/2;
			childPic2.x = childPic2.x + childPic2.width/2;
			childPic1.skewY = 180;
			childPic2.skewY = 180;
		}

		// 分享按钮
		App.ShareGuideUtil.addShareNode(this.container, App.ShareGuideUtil.TYPE_CHILDMARRY);
		if(adultInfoVo.visit == 2){
			this.container.y = 100;
		}
		// this.swapChildren(this.container, att2TF);

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