/**
 * 门客招募UI
 * author yanyuling
 * date 2017/10/19
 * @class ServantGetView
 */

class ServantGetView  extends DialogueGetBaseView
{

	private _nodeContainer:BaseDisplayObjectContainer;


	public constructor() {
		super();
	}

	
	public initView():void
	{
		//设置本次人物id
		this._personId = this.param.data.shift();
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
		
        this.addTouchTap(this.clickHandler,this)
		
        let servant_get_word = BaseBitmap.create("servant_get_word");
        servant_get_word.x = GameConfig.stageWidth/2 - servant_get_word.width/2;
        servant_get_word.y = 20;
        this._nodeContainer.addChild(servant_get_word);


        let bottomBg = BaseBitmap.create("public_9_wordbg");
		bottomBg.touchEnabled = true;
        bottomBg.height = 325;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height-15;
        this._nodeContainer.addChild(bottomBg);

        let nameBg =  BaseBitmap.create("public_get_namebg");
		// if(PlatformManager.checkIsTextHorizontal())
		// {
		// 	nameBg.setPosition(servant_get_word.x + servant_get_word.width / 2 - nameBg.width / 2,
		// 	servant_get_word.y + 2 * servant_get_word.height);
		// }
		// else
		// {
        	nameBg.x = 50
    		nameBg.y = 180;
		// }

        this._nodeContainer.addChild(nameBg);

        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_COMMON);
		nameTxt.textColor = ServantScrollItem.QUALITYCFG[servantCfg.quality];
        nameTxt.text = LanguageManager.getlocal("servant_name"+ servantId);

		if(PlatformManager.checkIsTextHorizontal())
		{
			nameTxt.setPosition(GameConfig.stageWidth / 2 - nameTxt.width / 2,bottomBg.y - 2 * nameTxt.height);
			nameBg.width = nameTxt.width + 30
			nameBg.setPosition(nameTxt.x + nameTxt.width / 2 - nameBg.width / 2 ,nameTxt.y + nameTxt.height / 2 - nameBg.height / 2)
		}
		else
		{
			nameTxt.multiline = true;
			nameTxt.width = 26;

			nameTxt.x =nameBg.x + nameBg.width/2-nameTxt.width/2;
			nameTxt.y = nameBg.y+ 80 - nameTxt.height/2;
		}

        this._nodeContainer.addChild( nameTxt);

        let servantFullImg = BaseLoadBitmap.create(Api.servantVoApi.getFullImgPathWithId(servantId));
		servantFullImg.width = 405;
		servantFullImg.height = 467;
		servantFullImg.x = GameConfig.stageWidth/2 - servantFullImg.width/2;
		servantFullImg.y = bottomBg.y - servantFullImg.height;
		this._nodeContainer.addChildAt(servantFullImg,0);

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
		let str = LanguageManager.getlocal("servantInfo_title",[servantInfoObj.getTotalBookValue()]);
        let totalTxt = ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        totalTxt.x = GameConfig.stageWidth - totalTxt.width - 20;
        totalTxt.y = bottomBg.y - 30;
        this._nodeContainer.addChild(totalTxt);
        //添加出现action
        this._nodeContainer.alpha = 0;
        egret.Tween.get( this._nodeContainer,{loop:false}).to({alpha:1},800);

		// 分享按钮
		App.ShareGuideUtil.addShareNode(this._nodeContainer, App.ShareGuideUtil.TYPE_SERVANTGET);
	}

    protected clickHandler()
    {
		console.log("servant get view---click handler");
        super.hide()
		let servantId:string=this.param.data;
		// super.hide();
		if(servantId&&servantId[0])
		{
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
			"servant_get_word",
            "servant_star",
            "servant_infoPro1","servant_infoPro2","servant_infoPro3","servant_infoPro4",
			"shareBtn","shareRewardPop"

		]);
	}

	public dispose():void
	{
		this._nodeContainer = null;




		super.dispose();
	}
}