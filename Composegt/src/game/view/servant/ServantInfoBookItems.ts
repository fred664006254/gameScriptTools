
/**
 * 门客详情 资质信息部分
 * author yanyuling
 * date 2017/11/23
 * @class ServantInfoBookItems
 */
class ServantInfoBookItems extends BaseDisplayObjectContainer
{
    private _servantId:string = null;
	private _bookNameTxtList = [];
    private _servantInfoObj:any = null;
	private _redPList = [];
	private _isPractice:boolean = false;
	private _mainTaskHandKey:string = null;
    public constructor()
	{
		super();
	}
	public init(servantId:string,bottomH:number,isPractice:boolean = false):void
	{
       if(isPractice)
		{
			App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UNLOCK),this.practiceLevelupCallBackHandler,this);
		 	App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED,this.checkRedPoints,this);

		}else{
			App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY),this.refreshBookLevelup,this);
			App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE),this.checkRedPoints,this);
			App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UPGRADE),this.practiceLevelupCallBackHandler,this);
			App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY),this.refreshBookLevelup,this);
		}
		
		// let public_biaoti = BaseBitmap.create("servant_biaotinew"); 
		// public_biaoti.x = 15;
		// public_biaoti.y = 70;
		// public_biaoti.width = 610;
		// this.addChild(public_biaoti);
		let baseY = 87;
 
		this._isPractice = isPractice;
        this._servantId = servantId; 

		//下部信息
		let ability = [];
		let servantCfg = GameConfig.config.servantCfg[this._servantId];
		if (this._isPractice == false)
		{
			this._servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
			let attrVo = this._servantInfoObj.attrVo;
			// ability = servantCfg.ability
			ability = this._servantInfoObj.getAbilityIdList();
		}else{
			ability = this.getcfgWhenPractice();
		}
		let lineNum = Math.ceil(ability.length/2);

		let starNumTxt:BaseTextField =  null;
		let titleTxt:BaseTextField =  null;
		titleTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		titleTxt.name = "titleTxt";
		titleTxt.x = 160;
		titleTxt.y = 78; 
		this.addChild( titleTxt); 
		
		let posX = 25;
		let posY = 0;
		let totalStar=0;
        let totalBookV = 0;
		//需支持滑动，属性数量并不固定
		let proNode = new BaseDisplayObjectContainer();
		this.addChild(proNode);
		proNode.y = 5;
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
			
			// if (index2%2 == 1)
			// {
			// 	posX = GameConfig.stageWidth/2+4;
			// }else
			// {
			// 	posX = 23;
			// }
			
			

			let probg = "public_listbg3";
			if (this._isPractice)
			{
				probg = "public_9v_bg04";
			}
			let attrbg = BaseBitmap.create(probg);
			attrbg.width = (599-10)  / 2 ;  //297;
			attrbg.height = 127;
			// posX = GameConfig.stageWidth / 2 - (599 - 10)/2
			
			attrbg.x = GameConfig.stageWidth / 2 - (599 )/2 + (index2 % 2) * (attrbg.width + 10);
			attrbg.y = posY;
			proNode.addChild(attrbg);
			posX = attrbg.x;



			// let leftBg = BaseBitmap.create("public_left");
			// leftBg.width = 119;
			// leftBg.height = 108;
			// leftBg.x =  attrbg.x+5;
			// leftBg.y =  attrbg.y +6;
			// proNode.addChild(leftBg);

			let tmpAcfg =undefined;
			let aLv:number =0;
			if (this._isPractice == false)
			{
				tmpAcfg = GameConfig.config.abilityCfg[aid];
				let tmpability = servantCfg.ability;
				let oriidx = tmpability.indexOf(aid) ;
				if( oriidx> -1){
					aLv = this._servantInfoObj.ability[String(oriidx)];
				}else{
					aLv = this._servantInfoObj.getSkinBookLv2(aid);
				}
				let curClvCfg = GameConfig.config.servantbaseCfg.servantLvList[String(this._servantInfoObj.clv)];
				if(aLv < curClvCfg.abilityLv && !firstFlag){
					firstFlag = true;
					//第一个未满级
					firstPosX = posX;
					firstPosY = posY;
					firstIndex2 = index2;
					firstAttrBg = attrbg;
				}
			}else{
				tmpAcfg = ability[index2];
				aLv = 1;
			}
			attrbg.addTouchTap(this.showBookLvup,this,[{aid:aid,servantId:this._servantId,aLv:aLv,index:index2,firstBook:(firstIndex2 === index2)}]);
			let attrIcon = BaseBitmap.create("servant_infoPro"+tmpAcfg.type);
			attrIcon.x = posX+15;
			attrIcon.y = posY + attrbg.height/2 -attrIcon.height/2;//-10;
			proNode.addChild(attrIcon);

			let attrColor = TextFieldConst.COLOR_LIGHT_YELLOW;
			if (this._isPractice == false)
			{
				attrColor = TextFieldConst.COLOR_BLACK;

				let starImg = this.getStars(tmpAcfg.num);
				starImg.x = attrIcon.x +attrIcon.width/2 - starImg.width/2+140;
				starImg.y = attrIcon.y + 105-40;
				proNode.addChild(starImg);
				
				//书名字
				let attrNameTxt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_BROWN_NEW);
				attrNameTxt.text = LanguageManager.getlocal("servant_attrNameTxt"+aid) + "Lv"+ String(aLv);
				attrNameTxt.x = attrIcon.x + 47+70-25;//attrIcon.x + 47+70-15;
				attrNameTxt.y = posY + 13;
				attrNameTxt.width =175;
				// if(PlatformManager.checkIsViSp()||PlatformManager.checkIsViSp())
				// {
					attrNameTxt.size =18;
				// }
			
				attrNameTxt.textAlign =TextFieldConst.ALIGH_CENTER;
				proNode.addChild(attrNameTxt);
				this._bookNameTxtList.push(attrNameTxt);
			}

			let attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_attrTxt" + tmpAcfg.type),18,TextFieldConst.COLOR_BROWN_NEW);
			attrTxt.x = attrIcon.x + 130;
			if(PlatformManager.checkIsViSp())
			{  
				attrTxt.x = attrIcon.x + 130-3;
			}
			attrTxt.y = attrbg.y + attrbg.height/2 -attrTxt.height/2-40;
			if (this._isPractice == false)
			{
				attrTxt.y = posY + 50;
			}
			proNode.addChild(attrTxt); 

			let attrValueTxt = ComponentManager.getTextField((aLv * tmpAcfg.num).toString(),18,TextFieldConst.COLOR_BROWN_NEW);
			attrValueTxt.x = attrTxt.x + attrTxt.width + 15;
			attrValueTxt.y = attrTxt.y;
			proNode.addChild(attrValueTxt);
            this._bookNameTxtList.push(attrValueTxt);
			totalStar += tmpAcfg.num;
			if (index2%2 == 1)
			{
				posY += 132;
			}
            totalBookV += aLv * tmpAcfg.num;
			// if (this._isPractice == false)
			{
				let redP = BaseBitmap.create("public_dot2");
				redP.x = attrbg.x + attrbg.width-20;
				redP.y = attrbg.y-5 ;
				redP.name = "redP" + index2;
				proNode.addChild(redP);
				this._redPList.push(redP);
			}
			if(starNumTxt)
			{
				starNumTxt.text = totalStar.toString();
			}
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

		//综合资质 图
		let servant_zonghe = BaseBitmap.create("servant_zonghe"); 
		this.addChild(servant_zonghe);  
		// this.setLayoutPosition(LayoutConst.verticalCenter,servant_zonghe,public_biaoti);
		servant_zonghe.y = baseY - servant_zonghe.height/2;
		servant_zonghe.x = 140;

		titleTxt.x = servant_zonghe.x +servant_zonghe.width+10; 
		titleTxt.text = totalBookV.toString();
		if (this._isPractice )
		{
			titleTxt.anchorOffsetX = titleTxt.width/2;
		}

		// if(starNumTxt)
		// {
		// 	starNumTxt.text = totalStar.toString();
		// }

		let tmpY = 100; 

		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomH-tmpY-15-25);
		let scrolView = ComponentManager.getScrollView(proNode,rect);
		scrolView.y = 120;
		this.addChild(scrolView);
		// if (this._isPractice == false)
		if (PlatformManager.checkIsKRNewSp())
		{ 
			//星级  图
			// let servant_xingji = BaseBitmap.create("servant_xingji"); 
			// this.addChild(servant_xingji); 
			// this.setLayoutPosition(LayoutConst.verticalCenter,servant_xingji,public_biaoti);
			// servant_xingji.x = titleTxt.x+titleTxt.width+20; //360;
			servant_zonghe.x = 190;
			let starImg = BaseBitmap.create("servant_star"); 
			this.addChild(starImg); 
			// this.setLayoutPosition(LayoutConst.verticalCenter,starImg,public_biaoti);
			starImg.y = baseY - starImg.height/2;

			
			starImg.x =  GameConfig.stageWidth/2+30;
			titleTxt.x =starImg.x+starImg.width+20;

			// starNumTxt =  ComponentManager.getTextField("100",titleTxt.size);
			// this.addChild(starNumTxt); 
			// this.setLayoutPosition(LayoutConst.verticalCenter,starNumTxt,public_biaoti);
			// starNumTxt.x = starImg.x+starImg.width+10;
			// starNumTxt.text = totalStar.toString();
			// starNumTxt.y = starImg.y;

		}else
		{
			// titleTxt.y = 80;
			// titleTxt.x = GameConfig.stageWidth/2;
			//星级  图
			let servant_xingji = BaseBitmap.create("servant_xingji"); 
			this.addChild(servant_xingji); 
			// this.setLayoutPosition(LayoutConst.verticalCenter,servant_xingji,public_biaoti);

			
			servant_xingji.x = titleTxt.x+titleTxt.width+20; //360;
			servant_xingji.y = baseY - servant_xingji.height/2
			let starImg = BaseBitmap.create("servant_star"); 
			this.addChild(starImg); 
			// this.setLayoutPosition(LayoutConst.verticalCenter,starImg,public_biaoti);
			starImg.x = servant_xingji.x+servant_xingji.width;
			starImg.y = baseY - starImg.height/2

			starNumTxt =  ComponentManager.getTextField("100",titleTxt.size);
			this.addChild(starNumTxt); 
			// this.setLayoutPosition(LayoutConst.verticalCenter,starNumTxt,public_biaoti);
			starNumTxt.x = starImg.x+starImg.width+4;
			starNumTxt.y = baseY - starNumTxt.height/2
			starNumTxt.text = totalStar.toString();
		}
		

		this.checkRedPoints();
    }
	protected checkRedPoints()
	{
		let idxList = undefined;
		if (this._isPractice)
		{
			idxList = Api.practiceVoApi.practiceAttrRedList();
		}else{
			idxList = this._servantInfoObj.isBookLvUpEnable();
		}
		for (var index = 0; index < this._redPList.length; index++) {
			let isSHow = false;
			if (this._isPractice)
			{
				isSHow = idxList[String(index+1)];
			}else{
				isSHow = idxList[String(index)] != null;
			}
			this._redPList[index].visible = isSHow;
		}
	}

    protected getStars(num:number)
	{
		let objContainer = new BaseDisplayObjectContainer;

		for (var index = 1; index <= num; index++) {
			let starImg = BaseBitmap.create("servant_star")
			starImg.setScale(0.6);
			starImg.x = (index-1) * starImg.width*0.6;
			starImg.y = 0;
			objContainer.addChild(starImg);
		}
		return objContainer;
	}


    protected showBookLvup(param1:any,params:any)
	{
		if(Api.rookieVoApi.isInGuiding){
			return;
		}
		if (this._isPractice)
		{
			let type = params["index"];
			ViewController.getInstance().openView(ViewConst.COMMON.PRACTICEABILITYVIEW,{type:type});
		}else{
			ViewController.getInstance().openView(ViewConst.POPUP.SERVANTBOOKLEVELUPPOPUPVIEW,params);
		}
	}


    private doGuide()
    {
		if(Api.rookieVoApi.curGuideKey != "servant")
		{
			return;
		}
		// this.showBookLvup(this,[{aid:"201",servantId:this._servantId,aLv:1,index:0}])
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
		let ability = undefined;
		let servantCfg = GameConfig.config.servantCfg[this._servantId];
		if (this._isPractice)
		{
			ability = this.getcfgWhenPractice();
		}else{
			// let servantCfg = GameConfig.config.servantCfg[this._servantId];
			// ability = servantCfg.ability;
			ability = this._servantInfoObj.getAbilityIdList();
		}
        let totalBookV = 0;
		for (var index2 = 0; index2 < ability.length; index2++) {
			let tmpAcfg =undefined;
			let aLv:number =0;
			let aid = ability[index2];
			if (this._isPractice == false)
			{
				// tmpAcfg = GameConfig.config.abilityCfg[aid];
			 	// aLv = this._servantInfoObj.ability[String(index2)];

				tmpAcfg = GameConfig.config.abilityCfg[aid];
				let tmpability = servantCfg.ability;
				let oriidx = tmpability.indexOf(aid) ;
				if( oriidx> -1){
					aLv = this._servantInfoObj.ability[String(oriidx)];
				}else{
					aLv = this._servantInfoObj.getSkinBookLv2(aid);
				}

			}else{
				tmpAcfg = ability[index2];
				aLv = 1;
			}

            let txtIdx = index2 
			let attrValueTxt = this._bookNameTxtList[txtIdx];
			if (this._isPractice == false)
			{
				txtIdx = index2*2 ;
				let attrNameTxt = this._bookNameTxtList[txtIdx];
				attrValueTxt = this._bookNameTxtList[txtIdx+1];
				attrNameTxt.text = LanguageManager.getlocal("servant_attrNameTxt"+aid) + "Lv"+ String(aLv);
			}
            // let attrValueTxt = this._bookNameTxtList[txtIdx+1];
            attrValueTxt.text = String(aLv * tmpAcfg.num);
            totalBookV += aLv * tmpAcfg.num;
        }
        let titleTxt = <BaseTextField>this.getChildByName("titleTxt");
        titleTxt.text = totalBookV.toString();
		if (this._isPractice )
		{
			titleTxt.anchorOffsetX = titleTxt.width/2;
		}else{
			this.checkRedPoints();
		}
		
	}
	protected practiceLevelupCallBackHandler(event:egret.Event)
    {
        let rdata = event.data.data;
        if(rdata.ret == 0 && this._isPractice)
        {
            this.refreshBookLevelup();
			this.checkRedPoints();
        }
	}
    public dispose()
    {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY),this.refreshBookLevelup,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE),this.checkRedPoints,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UPGRADE),this.practiceLevelupCallBackHandler,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_UNLOCK),this.practiceLevelupCallBackHandler,this);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_INDEX),this.checkRedPoints,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED,this.checkRedPoints,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY),this.refreshBookLevelup,this);

		this._bookNameTxtList = [];
        this._servantInfoObj = null
		this._redPList = null;
		this._isPractice = false;
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;

        super.dispose();
    }
}