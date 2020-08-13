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
		let servantLvList = GameConfig.config.servantbaseCfg.servantLvList;
		let curLvcfg = servantLvList[String(servantObj.clv)];
		 
        this.addTouchTap(this.clickHandler,this)
        let servant_get_word = BaseBitmap.create("servant_advance_word");
        servant_get_word.x = GameConfig.stageWidth/2 - servant_get_word.width/2;
        servant_get_word.y = 20;
        this._nodeContainer.addChild(servant_get_word);

        // let nameBg =  BaseLoadBitmap.create("servant_adv_icon" + servantObj.clv);
        // nameBg.x = 50;
        // nameBg.y = 180;
        // this._nodeContainer.addChild(nameBg); 

		let bottomBg = BaseBitmap.create("arena_bottom_bg"); 
		bottomBg.y = GameConfig.stageHeigth - bottomBg.height-100+30;
		this._nodeContainer.addChild(bottomBg);

		
		
 

		let nameTxt = ComponentManager.getTextField("",30,TextFieldConst.COLOR_LIGHT_YELLOW); 
        nameTxt.text = LanguageManager.getlocal("servant_name"+ servantId);
		if(PlatformManager.checkIsViSp()){
			nameTxt.x = bottomBg.x + bottomBg.width/2-nameTxt.width/2;
		} else {
			nameTxt.x = bottomBg.x + bottomBg.width/2-nameTxt.width/2-10;
		}
        
        nameTxt.y = bottomBg.y+ 60;
        this._nodeContainer.addChild(nameTxt);

		let huawen =  BaseBitmap.create("servant_huawenleft");
        huawen.x = nameTxt.x - 10 - huawen.width;//70;
        huawen.y = nameTxt.y+10;
        this._nodeContainer.addChild(huawen); 

		let huawen2 =  BaseBitmap.create("servant_huawenleft");
		huawen2.scaleX =-1;
        huawen2.x = nameTxt.x + nameTxt.width + 10 + huawen2.width;//nameTxt.x+nameTxt.width+210;
        huawen2.y = huawen.y;
        this._nodeContainer.addChild(huawen2); 

		var colorfont:number  = 0xe6caac;
		//爵位身份
		let advance_font1 =  BaseBitmap.create("servant_advance_font1");
		advance_font1.x = 70;
        advance_font1.y = bottomBg.y+ 150;
		this._nodeContainer.addChild(advance_font1);
		let fntSize = 22;
		let offY = 0;
		if(PlatformManager.checkIsViSp()){
			fntSize = 18;
			offY = 2;
		}
		let clvTxt1 = ComponentManager.getTextField("",fntSize,colorfont);
		clvTxt1.text = LanguageManager.getlocal("servant_clvStr"+servantObj.clv);
        this._nodeContainer.addChild(clvTxt1);
		this.setLayoutPosition(LayoutConst.verticalCenter,clvTxt1,advance_font1);
		clvTxt1.x = advance_font1.width+advance_font1.x+10;
		clvTxt1.y += offY;
		//书籍上限
		let advance_font2 =  BaseBitmap.create("servant_advance_font2");
		advance_font2.x = 330;
        advance_font2.y = advance_font1.y;
		this._nodeContainer.addChild(advance_font2);

		let clvTxt2 = ComponentManager.getTextField("",fntSize,colorfont);
        clvTxt2.text =curLvcfg.abilityLv; 
		this.setLayoutPosition(LayoutConst.verticalCenter,clvTxt2,advance_font2);
        this._nodeContainer.addChild(clvTxt2);
		clvTxt2.x =  advance_font2.width+advance_font2.x+10;
		clvTxt2.y += offY;
		//等级上限
		let advance_font3 =  BaseBitmap.create("servant_advance_font3");
		advance_font3.x = advance_font1.x;
        advance_font3.y = advance_font1.y+70;
		this._nodeContainer.addChild(advance_font3);

		let clvTxt3 = ComponentManager.getTextField("",fntSize,colorfont);
        clvTxt3.text = curLvcfg.upLv; 
		this.setLayoutPosition(LayoutConst.verticalCenter,clvTxt3,advance_font3);
        this._nodeContainer.addChild(clvTxt3);
		clvTxt3.x = advance_font3.width+advance_font3.x+10;
		clvTxt3.y += offY;

		//书籍上限
		let advance_font4 =  BaseBitmap.create("servant_advance_font4");
		advance_font4.x = advance_font2.x;
        advance_font4.y = advance_font3.y;
		this._nodeContainer.addChild(advance_font4);

		let clvTxt4 = ComponentManager.getTextField("",fntSize,colorfont);
        clvTxt4.text = LanguageManager.getlocal("servant_advtxt4",[String(curLvcfg.reward)]); 
		this.setLayoutPosition(LayoutConst.verticalCenter,clvTxt4,advance_font4);
        this._nodeContainer.addChild(clvTxt4);
		clvTxt4.x = advance_font4.width+advance_font4.x+10;
		clvTxt4.y += offY;
		
		let servantFullImgBg = BaseBitmap.create("servant_beijngguang"); 
		servantFullImgBg.anchorOffsetX =servantFullImgBg.width/2;
		servantFullImgBg.anchorOffsetY =servantFullImgBg.height/2;
		
		servantFullImgBg.scaleX =4;
		servantFullImgBg.scaleY =4; 
		servantFullImgBg.x= 320; 
		servantFullImgBg.y = 450+30;
		this._nodeContainer.addChildAt(servantFullImgBg,0);
       
	    let servantFullImg = BaseLoadBitmap.create(Api.servantVoApi.getFullImgPathWithId(servantId));
		servantFullImg.width = 640;
		servantFullImg.height = 482;
		servantFullImg.x = GameConfig.stageWidth/2 - servantFullImg.width/2;
		servantFullImg.y = bottomBg.y - servantFullImg.height+10+30;
		this._nodeContainer.addChildAt(servantFullImg,1);
		
        let lightImg = BaseBitmap.create("public_rotatelight");
        lightImg.anchorOffsetX = lightImg.width/2;
        lightImg.anchorOffsetY = lightImg.height/2;
		lightImg.x =  GameConfig.stageWidth/2;
		lightImg.y = servantFullImg.y + servantFullImg.height/2-20+30;
		lightImg.setScale(2);
        
		this._nodeContainer.addChildAt(lightImg,0);
        egret.Tween.get(lightImg,{loop:true}).to({rotation:360},15000); 
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

	protected getTitleStr():string
    {
        return null;
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"servant_advance_word",
            "servant_star",
            "servant_infoPro1","servant_infoPro2","servant_infoPro3","servant_infoPro4",
			"arena_bottom_bg","servant_huawenleft","servant_advance_font1","servant_advance_font2",
			"servant_advance_font3","servant_advance_font4","servant_beijngguang","public_rotatelight",
		]);
	}

	public dispose():void
	{
		this._nodeContainer = null;
		super.dispose();
	}
}