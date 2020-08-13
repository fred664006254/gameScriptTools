/**
 * 门客详情new 资质信息部分
 * author shaoliang
 * date 2019/7/25
 * @class ServantNewUIBookItems
 */
class ServantNewUIBookItems extends BaseDisplayObjectContainer
{
    private _servantId:string = null;
	private _bookNameTxtList = [];
    private _servantInfoObj:any = null;
	private _redPList = [];
	private _mainTaskHandKey:string = null;
    public constructor()
	{
		super();
	}
	public init(servantId:string,bottomH:number):void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY),this.refreshBookLevelup,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY),this.refreshBookLevelup,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE),this.checkRedPoints,this);

        this._servantId = servantId;
		let servantCfg = Config.ServantCfg.getServantItemById(this._servantId); 

		//下部信息
		
		this._servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        let ability = this._servantInfoObj.getAbilityIdList();
        let attrVo = this._servantInfoObj.attrVo;

		let lineNum = Math.ceil(ability.length/2)

        let titlebg = BaseBitmap.create("servant_title_bg");
		titlebg.width = 440;
		if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()){
            titlebg.width = 528;
        }
        titlebg.setPosition(GameConfig.stageWidth/2-titlebg.width/2,20);
        this.addChild( titlebg); 

		let starNumTxt:BaseTextField =  null;
		let titleTxt:BaseTextField =  null;
		titleTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		titleTxt.name = "titleTxt";
		titleTxt.x = 160;
		titleTxt.y = titlebg.y+8;
		this.addChild( titleTxt); 

        let titleTxt2 =  ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_title2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
        titleTxt2.x = 350;
        titleTxt2.y = titleTxt.y;
        this.addChild( titleTxt2);

        let starImg = BaseBitmap.create("servant_star");
        starImg.width = 30;
        starImg.height = 28;
        starImg.x = titleTxt2.x + titleTxt2.width+ 10;
        starImg.y = titleTxt2.y+ titleTxt2.height/2-starImg.height/2-3;
        this.addChild(starImg);

        starNumTxt =  ComponentManager.getTextField("100",titleTxt.size,titleTxt.textColor);
        starNumTxt.x = starImg.x + starImg.width +2;
        starNumTxt.y = titleTxt2.y;
        this.addChild( starNumTxt);


		
		let posX = 25;
		let posY = 0;
		let totalStar=0;
        let totalBookV = 0;
		//需支持滑动，属性数量并不固定
		let proNode = new BaseDisplayObjectContainer();
		this.addChild(proNode)
		proNode.y = 10;
		// 找第一个未满级的书
		var firstFlag = false;
		var firstPosX = 0;
		var firstPosY = 0;
		var firstIndex2 = -1;
		var firstAttrBg = null;
		for (var index2 = 0; index2 < ability.length; index2++) {

			if(index2 == 0){
				 App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);
			}
			let aid = ability[index2];
			
			if (index2%2 == 1)
			{
				posX = GameConfig.stageWidth/2+4;
			}else
			{
				posX = 23;
			}
			
			let probg = "public_9_managebg";
			let attrbg = BaseBitmap.create(probg);
			attrbg.width = 280;
			attrbg.height = 71;//100;
			attrbg.x = posX+10;
			attrbg.y = posY;
			proNode.addChild(attrbg);
			let tmpAcfg =undefined;
			let aLv:number =0;

            tmpAcfg = GameConfig.config.abilityCfg[aid];
            let tmpability = servantCfg.ability;
            let oriidx = tmpability.indexOf(aid) ;
            if( oriidx> -1){
                aLv = this._servantInfoObj.ability[String(oriidx)];
            }else{
                aLv = this._servantInfoObj.getSkinBookLv2(aid);
            }
            let curClvCfg = Config.ServantBaseCfg.getServantLvList()[String(this._servantInfoObj.clv)];
            if(aLv < curClvCfg.abilityLv && !firstFlag){
                firstFlag = true;
                //第一个未满级
                firstPosX = posX;
                firstPosY = posY;
                firstIndex2 = index2;
                firstAttrBg = attrbg;
            }

			attrbg.addTouchTap(this.showBookLvup,this,[{aid:aid,servantId:this._servantId,aLv:aLv,index:index2,firstBook:(firstIndex2 === index2)}]);

            let iconStr = "";
            if (this._servantInfoObj.isSkinAbility(aid))
            {
                iconStr = "servant_skin_book"+tmpAcfg.type;
            }
            else
            {
                iconStr = "servant_infoPro"+tmpAcfg.type;
            }
			let attrIcon = BaseBitmap.create(iconStr);
			attrIcon.x = posX +2;//+15;
			attrIcon.y = posY + attrbg.height/2 -attrIcon.height/2;
			proNode.addChild(attrIcon);

			let attrColor = TextFieldConst.COLOR_LIGHT_YELLOW;
                attrColor = TextFieldConst.COLOR_BLACK;
            let starImg = this.getStars(tmpAcfg.num);
            starImg.x = attrIcon.x +attrIcon.width/2 - starImg.width/2;
            starImg.y = attrIcon.y + 65;
            proNode.addChild(starImg);
        
            let attrNameTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
            attrNameTxt.text = LanguageManager.getlocal("servant_attrNameTxt"+aid) + "Lv"+ String(aLv);
            attrNameTxt.x = attrIcon.x + 77;
            attrNameTxt.y = posY + 10;//25;
            proNode.addChild(attrNameTxt);
			this._bookNameTxtList.push(attrNameTxt);
			if (PlatformManager.checkIsEnLang()){
				attrNameTxt.size = TextFieldConst.FONTSIZE_ACTIVITY_COMMON;
			}

			let attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_attrTxt" + tmpAcfg.type),20,TextFieldConst.COLOR_BROWN);
			attrTxt.x = attrIcon.x + 90;
			attrTxt.y = attrbg.y + attrbg.height/2 -attrTxt.height/2;

			attrTxt.y = posY + 40;
			proNode.addChild(attrTxt);

			let attrValueTxt = ComponentManager.getTextField((aLv * tmpAcfg.num).toString(),20,TextFieldConst.COLOR_BROWN);
			attrValueTxt.x = attrTxt.x + attrTxt.width + 5;
			attrValueTxt.y = attrTxt.y ;
			proNode.addChild(attrValueTxt);
            this._bookNameTxtList.push(attrValueTxt);
			totalStar += tmpAcfg.num;
			if (index2%2 == 1)
			{
				posY += 92;
			}
            totalBookV += aLv * tmpAcfg.num;

            let redP = BaseBitmap.create("public_dot2");
            redP.x = attrbg.x + attrbg.width-15;
            redP.y = attrbg.y-5 ;
            redP.name = "redP" + index2;
            proNode.addChild(redP);
            this._redPList.push(redP);
        
		}

		//佳人技能
		if (servantCfg.wifeId && Api.wifeVoApi.isUnlockExSkill(servantCfg.wifeId))
		{
			if (ability.length%2 == 1)
			{
				posX = GameConfig.stageWidth/2+4;
			}else
			{
				posX = 23;
			}
			
			let probg = "public_9_managebg";
			let attrbg = BaseBitmap.create(probg);
			attrbg.width = 280;
			attrbg.height = 71;
			attrbg.x = posX+10;
			attrbg.y = posY;
			proNode.addChild(attrbg);

			attrbg.addTouchTap(()=>{
				ViewController.getInstance().openView(ViewConst.POPUP.SERVANTWIFEEXSKILLPOPUPVIEW,{servantId:this._servantId,wifeId:servantCfg.wifeId});
			},this);

			let attrIcon = BaseBitmap.create("wifeexskill_icon2");
			attrIcon.x = posX +2;
			attrIcon.y = posY + attrbg.height/2 -attrIcon.height/2;
			proNode.addChild(attrIcon);


			 let clip = ComponentManager.getCustomMovieClip("wifeexskill_effect",12,120);
			clip.setPosition(attrIcon.x-9,attrIcon.y-13);
			clip.setScale(0.6);
			clip.playWithTime(0);
			clip.blendMode = egret.BlendMode.ADD;
			proNode.addChild(clip);

			let skilllv = Api.wifeVoApi.getExSkillLevel(servantCfg.wifeId);
			let attrNameTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
            attrNameTxt.text = LanguageManager.getlocal("servant_attrWifeExSkill") + "Lv"+ String(skilllv);
            attrNameTxt.x = attrIcon.x + 77;
            attrNameTxt.y = posY + 10;//25;
            proNode.addChild(attrNameTxt);
			this._bookNameTxtList.push(attrNameTxt);
			if (PlatformManager.checkIsEnLang()){
				attrNameTxt.size = TextFieldConst.FONTSIZE_ACTIVITY_COMMON;
			}

			let attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_title",[String(skilllv)]),20,TextFieldConst.COLOR_BROWN);
			attrTxt.x = attrIcon.x + 90;
			attrTxt.y = attrbg.y + attrbg.height/2 -attrTxt.height/2;
			attrTxt.y = posY + 40;
			proNode.addChild(attrTxt);

		}
		
		if (firstFlag) {
			this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(proNode,firstPosX+50, firstPosY+50, [firstAttrBg], 204, true, function(){
				if (this._servantId === Api.servantVoApi.getIdOfTotalMax()) {
					return true;
				} else {
					return false;
				}
			}, this);
		}
		totalBookV = this._servantInfoObj.getTotalBookValue();
		titleTxt.text = LanguageManager.getlocal("servantInfo_title",[ totalBookV.toString()]);

		if(starNumTxt)
		{
			starNumTxt.text = totalStar.toString();
		}
		
		let tmpY = 60;
		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomH-tmpY-10);
		let scrolView = ComponentManager.getScrollView(proNode,rect);
		scrolView.y = tmpY;
		this.addChild(scrolView);
		this.checkRedPoints();
    }
	protected checkRedPoints()
	{
		let idxList = this._servantInfoObj.isBookLvUpEnable();

		for (var index = 0; index < this._redPList.length; index++) {
			let isSHow = idxList[String(index)] != null;;
			if(Api.servantExileVoApi.getServantExileInfoForServantId(this._servantId))
			{
				isSHow = false;
			}
			this._redPList[index].visible = isSHow;
		}
	}

    protected getStars(num:number)
	{
		let objContainer = new BaseDisplayObjectContainer;

		for (var index = 1; index <= num; index++) {
			let starImg = BaseBitmap.create("servant_star");
			starImg.width = 30;
			starImg.height = 28;
			starImg.setScale(0.5);
			starImg.x = (index-1) * starImg.width*0.5;
			starImg.y = 0;
			objContainer.addChild(starImg);
		}
		return objContainer;
	}


    protected showBookLvup(param1:any,params:any)
	{
		ViewController.getInstance().openView(ViewConst.POPUP.SERVANTBOOKLEVELUPPOPUPVIEW,params);
	}


    private doGuide()
    {
		ViewController.getInstance().openView(ViewConst.POPUP.SERVANTBOOKLEVELUPPOPUPVIEW,{aid:"201",servantId:this._servantId,aLv:1,index:0});		
    }

	protected getcfgWhenPractice()
	{
		let attrV:number[] = Api.practiceVoApi.geAbilityValues();
		let ability = [{type:1,num:attrV[0]},{type:2,num:attrV[1]},{type:3,num:attrV[2]},{type:4,num:attrV[3]}]
		return ability;
	}
    	/**
	 * 资质升级后刷新
	 */
	protected refreshBookLevelup()
	{
		let ability = this._servantInfoObj.getAbilityIdList();
		let servantCfg = Config.ServantCfg.getServantItemById(this._servantId); 

        let totalBookV = 0;
		for (var index2 = 0; index2 < ability.length; index2++) {
			let tmpAcfg =undefined;
			let aLv:number =0;
			let aid = ability[index2];

            tmpAcfg = GameConfig.config.abilityCfg[aid];
            let tmpability = servantCfg.ability;
            let oriidx = tmpability.indexOf(aid) ;
            if( oriidx> -1){
                aLv = this._servantInfoObj.ability[String(oriidx)];
            }else{
                aLv = this._servantInfoObj.getSkinBookLv2(aid);
            }
			

            let txtIdx = index2 
			let attrValueTxt = this._bookNameTxtList[txtIdx];
	
            txtIdx = index2*2 ;
            let attrNameTxt = this._bookNameTxtList[txtIdx];
            attrValueTxt = this._bookNameTxtList[txtIdx+1];
			attrNameTxt.text = LanguageManager.getlocal("servant_attrNameTxt"+aid) + "Lv"+ String(aLv);
			if (PlatformManager.checkIsEnLang()){
				attrNameTxt.size = TextFieldConst.FONTSIZE_ACTIVITY_COMMON;
			}
			
            attrValueTxt.text = String(aLv * tmpAcfg.num);
            totalBookV += aLv * tmpAcfg.num;
        }
		totalBookV = this._servantInfoObj.getTotalBookValue();

        let titleTxt = <BaseTextField>this.getChildByName("titleTxt");
        titleTxt.text = LanguageManager.getlocal("servantInfo_title",[ totalBookV.toString()]);
		this.checkRedPoints();
	}

    public dispose()
    {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY),this.refreshBookLevelup,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE),this.checkRedPoints,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY),this.refreshBookLevelup,this);

		this._bookNameTxtList = [];
        this._servantInfoObj = null
		this._redPList = null;
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;

        super.dispose();
    }
}