/**
 * 门客升爵成功
 * author yanyuling
 * date 2017/11/22
 * @class ServantAdvanceView
 */

class ServantAdvanceView  extends BaseView
{

	private _nodeContainer:BaseDisplayObjectContainer;
	public constructor() {
		super();
	}
	
	public initView():void
	{
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        
        let servantId = this.param.data
        let servantCfg = GameConfig.config.servantCfg[servantId];
		let servantObj = Api.servantVoApi.getServantObj(servantId)
		let servantLvList = Config.ServantBaseCfg.getServantLvList();
		let curLvcfg = servantLvList[String(servantObj.clv)];
		 
        this.addTouchTap(this.clickHandler,this)
        let servant_get_word = BaseBitmap.create("servant_advance_word");
        servant_get_word.x = GameConfig.stageWidth/2 - servant_get_word.width/2;
        servant_get_word.y = 70;
        this._nodeContainer.addChild(servant_get_word);

        let nameBg =  BaseLoadBitmap.create("servant_adv_icon" + servantObj.clv);
        nameBg.x = 50;
        nameBg.y = 180;
        this._nodeContainer.addChild(nameBg);

        let bottomBg = BaseBitmap.create("public_9_wordbg");
        bottomBg.height = 166;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height-100;
        this._nodeContainer.addChild(bottomBg);

		let nameTxt = ComponentManager.getTextField("",30,TextFieldConst.COLOR_LIGHT_YELLOW);
		// nameTxt.textColor = ServantScrollItem.QUALITYCFG[servantCfg.quality];
        nameTxt.text = LanguageManager.getlocal("servant_name"+ servantId);
        nameTxt.x = bottomBg.x + bottomBg.width/2-nameTxt.width/2;
        nameTxt.y = bottomBg.y+ 30;
        this._nodeContainer.addChild( nameTxt);


		let clvTxt1 = ComponentManager.getTextField("",22,TextFieldConst.COLOR_WARN_GREEN);
        clvTxt1.text = LanguageManager.getlocal("servant_clvTxt1",[LanguageManager.getlocal("servant_clvStr"+servantObj.clv)]);
        clvTxt1.x = 70;
        clvTxt1.y = bottomBg.y+ 80;
        this._nodeContainer.addChild( clvTxt1);

		let clvTxt2 = ComponentManager.getTextField("",22,TextFieldConst.COLOR_WARN_GREEN);
		if (servantObj.clv>Config.ServantBaseCfg.commonMaxClv())
		{
			clvTxt2.text = LanguageManager.getlocal("servant_advtxt2",[LanguageManager.getlocal("servant_advtxt2_servantlv")]);
		}
		else
		{	
			clvTxt2.text = LanguageManager.getlocal("servant_advtxt2",[curLvcfg.abilityLv ]);
		}
        
        clvTxt2.x =  330;
		// GameConfig.stageWidth - clvTxt1.x - clvTxt2.width;
        clvTxt2.y = clvTxt1.y;
        this._nodeContainer.addChild( clvTxt2);

		let clvTxt3 = ComponentManager.getTextField("",22,TextFieldConst.COLOR_WARN_GREEN);
        clvTxt3.text = LanguageManager.getlocal("servant_advtxt3",[curLvcfg.upLv ]);
        clvTxt3.x = clvTxt1.x;
        clvTxt3.y = clvTxt1.y+ 30;
        this._nodeContainer.addChild( clvTxt3);

		let clvTxt4 = ComponentManager.getTextField("",22,TextFieldConst.COLOR_WARN_GREEN);
        clvTxt4.text = LanguageManager.getlocal("servant_advtxt4",[String(curLvcfg.reward)]);
        clvTxt4.x = clvTxt2.x;
        clvTxt4.y = clvTxt3.y;
        this._nodeContainer.addChild( clvTxt4);

		let serImg = Api.servantVoApi.getFullImgPathWithId(servantId);
        let wear = Api.servantVoApi.getservantSkinIdInWear(servantId);
        if (wear && wear != "")
        {
            serImg = Config.ServantskinCfg.getServantSkinItemById(wear).body
        }

        let servantFullImg = BaseLoadBitmap.create(serImg);
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

        // let starNumTxt=0;
        // let totalStar =0;
        // let posX = 50;
		// let posY = bottomBg.y + 30;
        // for (var index2 = 0; index2 < ability.length; index2++) {
		// 	let aid = ability[index2];
		// 	let tmpAcfg = GameConfig.config.abilityCfg[aid];
		// 	if (index2%2 == 1)
		// 	{
		// 		posX = GameConfig.stageWidth/2+4;
		// 	}else
		// 	{
		// 		posX = 50;
		// 	}

		// 	let attrIcon = BaseBitmap.create("servant_infoPro"+tmpAcfg.type);
		// 	attrIcon.x = posX +15;
		// 	attrIcon.y = posY ;
		// 	this._nodeContainer.addChild(attrIcon);

		// 	let starImg = this.getStars(tmpAcfg.num);
		// 	starImg.x = attrIcon.x +attrIcon.width/2 - starImg.width/2;
		// 	starImg.y = attrIcon.y + 65;
		// 	this._nodeContainer.addChild(starImg);

		// 	let attrNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_attrNameTxt"+aid),20,TextFieldConst.COLOR_WHITE);
		// 	attrNameTxt.x = attrIcon.x + 77;
		// 	attrNameTxt.y = posY+20;
		// 	this._nodeContainer.addChild(attrNameTxt);
 
		// 	let attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_attrTxt" + tmpAcfg.type),18,TextFieldConst.COLOR_WHITE);
		// 	attrTxt.x = attrNameTxt.x+13;
		// 	attrTxt.y = attrNameTxt.y + 35;
		// 	this._nodeContainer.addChild(attrTxt);

		// 	let attrValueTxt = ComponentManager.getTextField(tmpAcfg.num.toString(),18,TextFieldConst.COLOR_WHITE);
		// 	attrValueTxt.x = attrTxt.x + attrTxt.width + 5;
		// 	attrValueTxt.y = attrTxt.y ;
		// 	this._nodeContainer.addChild(attrValueTxt);
		// 	totalStar += tmpAcfg.num;
		// 	if (index2%2 == 1)
		// 	{
		// 		posY += 95;
		// 	}
		// }

        // let totalTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_title")+ String(totalStar),TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        // totalTxt.x = GameConfig.stageWidth - totalTxt.width - 20;
        // totalTxt.y = bottomBg.y - 30;
        // this._nodeContainer.addChild(totalTxt);
        // //添加出现action
        // this._nodeContainer.alpha = 0;
        // egret.Tween.get( this._nodeContainer,{loop:false}).to({alpha:1},800);
    }

    protected clickHandler()
    {
        super.hide()
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
			"servant_advance_word",
            "servant_star",
            "servant_infoPro1","servant_infoPro2","servant_infoPro3","servant_infoPro4",
		]);
	}

	public dispose():void
	{
		this._nodeContainer = null;
		super.dispose();
	}
}