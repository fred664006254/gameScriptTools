/**
 * 门客资质升级
 * author yanyuling
 * date 2017/11/18
 * @class ServantBookLevelupPopupView
 */

class ServantBookLevelupPopupView  extends PopupView
{
    
	private _nodeContainer:BaseDisplayObjectContainer;
    private _aindex:number = 0
    private _bookId:string;
    private _servantId:string;
    private _changeTxtList = [];
    private _itemId:string;
    private _upTipStr1:string = "";
    private _upTipStr2:string = "";
    private _upTipStr3:string = "";
    private _isAtTopLv:boolean = false;
    private _curBlv:number = 0;
    private _proChangeValue:number = 0;
    private _skinId:string = undefined;
	private _mainTaskHandKey:string = null;
	public constructor() {
		super();
	}

	public initView():void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY),this.collectHandlerCallBack,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY),this.collectHandlerCallBack,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);
        // public_tcdw_bg01
        let bookId = this.param.data.aid
        this._bookId = String(bookId);
        let servantId = this.param.data.servantId
        this._servantId = servantId;
        this._aindex = this.param.data.index
        // let alv = Api.servantVoApi.getServantObj(this._servantId).ability[this._aindex];

        let alv = 1;

        let servantCfg = Config.ServantCfg.getServantItemById(this._servantId);
        let servantObj = Api.servantVoApi.getServantObj(this._servantId);
        if( servantCfg.isContainsAbility(this._bookId)){
            let tmpability = servantCfg.ability;
            let oriidx = tmpability.indexOf(this._bookId) ;
            if( oriidx> -1){
                alv = servantObj.ability[String(oriidx)];
            }else{
                alv = servantObj.getSkinBookLv2(this._bookId);
            }
        }else{
            alv = servantObj.getSkinBookLv2(this._bookId);
        }

        this._curBlv = alv;

        this._curBlv = alv;

        let bookcfg = GameConfig.config.abilityCfg[bookId];
        let abilitybaseCfg = GameConfig.config.abilitybaseCfg
        let typeList = abilitybaseCfg.typeList ;//
        let ratio = abilitybaseCfg.numList[String(bookcfg.num)].ratio ;
        let itemId = typeList[bookcfg.type];
        this._itemId = itemId;
        let servantAbility = Api.servantVoApi.getServantObj(servantId).ability

        this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

		let bg:BaseBitmap = BaseBitmap.create("public_9v_bg12");
		bg.width = 520;
		bg.height = 700;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this._nodeContainer.addChild(bg); 
        
		// let bg2:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		// bg2.width = 500;
		// bg2.height = 250;
		// bg2.x = this.viewBg.x + this.viewBg.width/2 - bg2.width/2;
		// bg2.y = 19;
		// this._nodeContainer.addChild(bg2);  

        // //花纹 1
        // let public_tcdw_bg01:BaseBitmap = BaseBitmap.create("public_tcdw_bg01"); 
		// public_tcdw_bg01.x = 60;
		// public_tcdw_bg01.y = 25;
		// this._nodeContainer.addChild(public_tcdw_bg01);  

        // //花纹 2
        // let public_tcdw_bg02:BaseBitmap = BaseBitmap.create("public_tcdw_bg02"); 
	    // public_tcdw_bg02.x = 400;
		// public_tcdw_bg02.y = 25;
		// this._nodeContainer.addChild(public_tcdw_bg02);  

        let itemBg = BaseBitmap.create("itemview_daoju_bg02");
        itemBg.x = this.viewBg.width/2 - itemBg.width/2;
        itemBg.y = 10;
        this._nodeContainer.addChild(itemBg);

        let bookBg = BaseBitmap.create("itembg_1");
        bookBg.width = 108;
        bookBg.height = 106;
        bookBg.x = itemBg.x + itemBg.width/2 - bookBg.width/2;//this.viewBg.width/2 - bookBg.width/2;
        bookBg.y = itemBg.y + itemBg.height/2 - bookBg.height/2;//25;
        this._nodeContainer.addChild(bookBg);

        let bookIcon = BaseBitmap.create("servant_infoPro" + bookcfg.type);
        bookIcon.width = 80;
        bookIcon.height = 83;
        bookIcon.x = bookBg.x + bookBg.width/2 - bookIcon.width/2;
        bookIcon.y = bookBg.y + bookBg.height/2 - bookIcon.height/2;
        bookIcon.name = "bookIcon";
        this._nodeContainer.addChild(bookIcon);

        let starImg = this.getStars(bookcfg.num);
        starImg.x = bookIcon.x +bookIcon.width/2 - starImg.width/2;
        starImg.y = bookIcon.y + 65;
        this._nodeContainer.addChild(starImg);

        let namebg = BaseBitmap.create("public_ts_bg01");
		namebg.x = 225;
        namebg.width = 158;
		namebg.y = itemBg.y + itemBg.height + 3;
		this._nodeContainer.addChild(namebg);

        //等级  武力  背景条
        let proNumBg = BaseBitmap.create("public_tc_bg04"); 
        proNumBg.height = 60;
        proNumBg.width = 500;
        proNumBg.x  = 60;
        proNumBg.y = namebg.y + namebg.height ;
        proNumBg.visible = false;
        this._nodeContainer.addChild(proNumBg); 
        
        let nameTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_attrNameTxt"+bookId),20,TextFieldConst.COLOR_BROWN_NEW);
        nameTxt.x = this.viewBg.width/2 - nameTxt.width/2;//namebg.x + namebg.width/2 - nameTxt.width/2;
        nameTxt.y = namebg.y + namebg.height/2 - nameTxt.height/2;
        this._nodeContainer.addChild(nameTxt); 
        namebg.width = nameTxt.width + 100;
        namebg.x = this.viewBg.width/2 - namebg.width/2;

        let LvTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantBookRLv"),20,TextFieldConst.COLOR_BROWN_NEW);
        LvTxt.x = 150;
        LvTxt.y = proNumBg.y + 25;
        this._nodeContainer.addChild(LvTxt);
 
        let proTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN_NEW);
        proTxt.text = LanguageManager.getlocal("servantInfo_attrTxt" + bookcfg.type); 
        proTxt.x = LvTxt.x;
        proTxt.y = LvTxt.y + 25;
        this._nodeContainer.addChild(proTxt); 

        let arrow1 = BaseBitmap.create("public_greenarrow");
        arrow1.x = LvTxt.x +160;
        arrow1.y = LvTxt.y + LvTxt.height/2 - arrow1.height/2;
        this._nodeContainer.addChild(arrow1);

        let arrow2 = BaseBitmap.create("public_greenarrow");
        arrow2.x =  arrow1.x;
        arrow2.y = proTxt.y + proTxt.height/2 - arrow2.height/2;
        this._nodeContainer.addChild(arrow2);

        let LvValueTxt = ComponentManager.getTextField(""+alv,20,TextFieldConst.COLOR_BROWN_NEW);
        LvValueTxt.name = "LvValueTxt";
        LvValueTxt.x = LvTxt.x + 90 + 20;
        LvValueTxt.y = LvTxt.y ;
        this._nodeContainer.addChild(LvValueTxt);
        this._changeTxtList.push(LvValueTxt);

        let LvValueTxt2 = ComponentManager.getTextField(String(alv+1),20,TextFieldConst.COLOR_WARN_GREEN);
        LvValueTxt2.x =LvValueTxt.x + 120;
        LvValueTxt2.name = "LvValueTxt2";
        LvValueTxt2.y = LvValueTxt.y;
        this._nodeContainer.addChild(LvValueTxt2);
        this._changeTxtList.push(LvValueTxt2);

        //资质 值
        let proValueTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN_NEW);
        proValueTxt.x = 260;
        proValueTxt.y = proTxt.y ;
        proValueTxt.name = "proValueTxt";
        this._nodeContainer.addChild(proValueTxt);
        this._changeTxtList.push(proValueTxt);

        let proValueTxt2 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WARN_GREEN);
        proValueTxt2.x = LvValueTxt2.x;
        proValueTxt2.y = proValueTxt.y ;
        proValueTxt2.name = "proValueTxt2";
        this._nodeContainer.addChild(proValueTxt2);
        this._changeTxtList.push(proValueTxt2);

        //卷轴背景
        let baseH = 116;
        let bottomBg = BaseBitmap.create("public_line4");
        bottomBg.width = 498;
        // bottomBg.height = 118;
        bottomBg.x = this.viewBg.width/2 - bottomBg.width/2 ;
        bottomBg.y = namebg.y + namebg.height + 80;//proValueTxt.y + 20;
        this._nodeContainer.addChild(bottomBg);

        let itemStr = "6_"+itemId+"_1";
        let rewardArr =  GameData.formatRewardItem(itemStr);
		let iconItem = GameData.getItemIcon(rewardArr[0]);
        

        iconItem.getChildByName("numLb").visible = false;
        iconItem.x = bottomBg.x + 20;
        iconItem.y = bottomBg.y + baseH/2 - iconItem.height/2 + 13;
        this._nodeContainer.addChild(iconItem);

        let itemNameTxt = ComponentManager.getTextField("",20);
        itemNameTxt.x = iconItem.x + iconItem.width + 42-18;
        itemNameTxt.y = iconItem.y+15;
        itemNameTxt.name = "itemNameTxt";
        this._nodeContainer.addChild(itemNameTxt);
        
        let rateTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
        rateTxt.text  = LanguageManager.getlocal("servantBookRate",[(ratio*100).toFixed(0) + "%"]);
        rateTxt.x = itemNameTxt.x ;
        rateTxt.y = itemNameTxt.y + 35;
        rateTxt.name = "rateTxt";
        this._nodeContainer.addChild(rateTxt);
        this._changeTxtList.push(rateTxt);

        let upgradeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"servantInfoLevelup",this.collectHandler,this,[1]);
        upgradeBtn.x = bottomBg.x + bottomBg.width - 140;
        upgradeBtn.y = bottomBg.y + baseH/2 - upgradeBtn.height/2  + 13;
        this._nodeContainer.addChild(upgradeBtn);

        /**
         * 经验书
         */
        let bottomBg2 = BaseBitmap.create("public_line4");
        bottomBg2.width = bottomBg.width;
        // bottomBg2.height = bottomBg.height;
        bottomBg2.x = bottomBg.x;
        bottomBg2.y = bottomBg.y + baseH + 10;
        this._nodeContainer.addChild(bottomBg2);

        let itemStr2 = itemStr;
        let rewardArr2 =  GameData.formatRewardItem(itemStr2); 
        let iconItem2 = BaseBitmap.create("servant_bookexp_icon"); 
        iconItem2.x = bottomBg2.x + 10;
        iconItem2.y = bottomBg2.y + baseH/2 - iconItem2.height/2  + 13;
        this._nodeContainer.addChild(iconItem2);

        let itemNameTxt2 = ComponentManager.getTextField("",20);
        itemNameTxt2.text = LanguageManager.getlocal("itemName_1020");
        itemNameTxt2.name = "itemNameTxt2";
        itemNameTxt2.x = itemNameTxt.x;
        itemNameTxt2.y = iconItem2.y+15;
        this._nodeContainer.addChild(itemNameTxt2);
        
        let rateTxt2 = ComponentManager.getTextField("",itemNameTxt.size,TextFieldConst.COLOR_BROWN_NEW);
        rateTxt2.text = LanguageManager.getlocal("servantBookRate",["100%"]);
        rateTxt2.x = itemNameTxt2.x ;
        rateTxt2.y = itemNameTxt2.y + 35;
        this._nodeContainer.addChild(rateTxt2);
        this._changeTxtList.push(rateTxt2);

        let upgradeBtn2 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"servantInfoLevelup",this.collectHandler,this,[2]);
        upgradeBtn2.x = upgradeBtn.x;
        upgradeBtn2.y = bottomBg2.y + baseH/2 - upgradeBtn2.height/2  + 13;
        this._nodeContainer.addChild(upgradeBtn2);


        /**
         * 必升经验书
         */
        let itemId3 = "159"+bookcfg.num ;
        let bottomBg3 = BaseBitmap.create("public_line4");
        bottomBg3.width = bottomBg.width;
        // bottomBg3.height = bottomBg.height;
        bottomBg3.x = bottomBg.x;
        bottomBg3.y = bottomBg2.y + baseH + 10;
        this._nodeContainer.addChild(bottomBg3);

        let itemStr3 =  "6_"+itemId3+"_1";
         let rewardArr3 =  GameData.formatRewardItem(itemStr3);
		let iconItem3 = GameData.getItemIcon(rewardArr3[0]);
        iconItem3.getChildByName("numLb").visible = false;
        // let rewardArr3 =  GameData.formatRewardItem(itemStr3); 
        // let iconItem3 = BaseLoadBitmap.create("servant_bookexp_icon"); 
        iconItem3.x = bottomBg3.x + 20;
        iconItem3.y = bottomBg3.y + baseH/2 - iconItem3.height/2  + 13;
        this._nodeContainer.addChild(iconItem3);

        let itemNameTxt3 = ComponentManager.getTextField("",20);
        itemNameTxt3.text = LanguageManager.getlocal("itemName_"+itemId3);
        itemNameTxt3.name = "itemNameTxt3";
        itemNameTxt3.x = itemNameTxt.x;
        itemNameTxt3.y = iconItem3.y+15;
        this._nodeContainer.addChild(itemNameTxt3);
        
        let rateTxt3 = ComponentManager.getTextField("",itemNameTxt.size,TextFieldConst.COLOR_BROWN_NEW);
        rateTxt3.text = LanguageManager.getlocal("servantBookRate",["100%"]);
        rateTxt3.x = itemNameTxt3.x ;
        rateTxt3.y = itemNameTxt3.y + 35;
        this._nodeContainer.addChild(rateTxt3);
        this._changeTxtList.push(rateTxt3);

        let upgradeBtn3 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"servantInfoLevelup",this.collectHandler,this,[3]);
        upgradeBtn3.x = upgradeBtn.x;
        upgradeBtn3.y = bottomBg3.y + baseH/2 - upgradeBtn3.height/2  + 13;
        this._nodeContainer.addChild(upgradeBtn3);



        this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(this._nodeContainer, upgradeBtn.x + upgradeBtn.width/2, upgradeBtn.y + upgradeBtn.height/2, [upgradeBtn], 204, true, function(){
            if (this.param.data.firstBook && this._servantId === Api.servantVoApi.getIdOfTotalMax()) {
                return true;
            } else {
                return false;
            }
        }, this);
        this.refreshUI();
    }

    protected refreshUI()
    {

         let bookcfg = GameConfig.config.abilityCfg[this._bookId];
        let servantObj = Api.servantVoApi.getServantObj(this._servantId)
        let alv = servantObj.ability[this._aindex];
        let servantCfg = Config.ServantCfg.getServantItemById(this._servantId);
        if( servantCfg.isContainsAbility(this._bookId)){
            let tmpability = servantCfg.ability;
            let oriidx = tmpability.indexOf(this._bookId) ;
            if( oriidx> -1){
                alv = servantObj.ability[String(oriidx)];
            }else{
                alv = servantObj.getSkinBookLv2(this._bookId);
            }
        }else{
            alv = servantObj.getSkinBookLv2(this._bookId);
        }

        let curClvCfg = GameConfig.config.servantbaseCfg.servantLvList[String(servantObj.clv)];
        let abilitybaseCfg = GameConfig.config.abilitybaseCfg
        let typeList = abilitybaseCfg.typeList ;//
        let numList = abilitybaseCfg.numList ;//
        let curStarCfg = numList[String(bookcfg.num)] ;
        this._proChangeValue = curStarCfg.abilityExp;

        this._changeTxtList[0].text = String(alv);
        this._changeTxtList[2].text = bookcfg.num * alv;
       
        let upNeed1 = 1;
        let upNeed2 = 1;
        let ownNum2 = servantObj.abilityExp;
        // servantObj.abilityExp
       
        if (alv >= curClvCfg.abilityLv)
        {
            upNeed1 = 0;
            upNeed2 = 0;
            this._isAtTopLv = true;
            this._changeTxtList[1].text = "MAX";
            this._changeTxtList[3].text =  "MAX"; 
        }else
        {
            upNeed2 = curStarCfg.abilityExp;
            this._changeTxtList[1].text = String(alv+1);
            this._changeTxtList[3].text =  String(bookcfg.num * (alv+1));
            
            // this._changeTxtList[4].text = LanguageManager.getlocal("servantBookRate",[(numList[String(alv)].ratio*100).toFixed(0) + "%"]);
        }

        // let bitaoti = BaseBitmap.create("servant_biaoti2");
		// bitaoti.x = 190;
        // bitaoti.width = 240;
		// bitaoti.y = 290
		// this._nodeContainer.addChild(bitaoti);


        // let bitaoti2 = BaseBitmap.create("servant_biaoti2");
		// bitaoti2.x = 190;
        // bitaoti2.width = 240;
		// bitaoti2.y =  420;
		// this._nodeContainer.addChild(bitaoti2);

      
        let itemNameTxt = <BaseTextField>this._nodeContainer.getChildByName("itemNameTxt");
        let itemNameTxt2 = <BaseTextField>this._nodeContainer.getChildByName("itemNameTxt2");
        let itemNameTxt3 = <BaseTextField>this._nodeContainer.getChildByName("itemNameTxt3");
        this._upTipStr1 = "";
        this._upTipStr2 = "";
         this._upTipStr3 = "";

        let ownNum1 = Api.itemVoApi.getItemNumInfoVoById(Number(this._itemId));
        if (ownNum1 >= upNeed1)
        {
            itemNameTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
        }else
        {
            itemNameTxt.textColor =  0xff0000;
            // TextFieldConst.COLOR_WARN_RED;
            this._upTipStr1 = LanguageManager.getlocal("servant_bookUpTip1");
        }
        itemNameTxt.text = LanguageManager.getlocal("itemName_"+  this._itemId) +" : " + ownNum1 + "/" + upNeed1;

        if (ownNum2 >= upNeed2)
        {
            itemNameTxt2.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
        }else
        {
            itemNameTxt2.textColor = 0xff0000;
            this._upTipStr2 = LanguageManager.getlocal("servant_bookUpTip2");
        }
        itemNameTxt2.text = LanguageManager.getlocal("servant_bookExp",[String(ownNum2),String(upNeed2)]) ;

        let ownNum3 = Api.itemVoApi.getItemNumInfoVoById("159"+bookcfg.num)
        if (ownNum3 > 0)
        {
            itemNameTxt3.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
        }else
        {
            itemNameTxt3.textColor = 0xff0000;
            this._upTipStr3 = LanguageManager.getlocal("servant_bookUpTip4");
        }
        itemNameTxt3.text =  LanguageManager.getlocal("itemName_159"+bookcfg.num) + ": " + ownNum3 + "/1";//LanguageManager.getlocal("servant_bookitem_txt",[String(ownNum3)]) ;

    }

    private collectHandlerCallBack(event:egret.Event)
    {
        let rdata = event.data.data;
        if(rdata.ret != 0){
            return;
        }
        // let newBlv =  Api.servantVoApi.getServantObj(this._servantId).ability[this._aindex];
        let servantObj = Api.servantVoApi.getServantObj(this._servantId) ;
        let newBlv = 0;
        let servantCfg = Config.ServantCfg.getServantItemById(this._servantId);
        if( servantCfg.isContainsAbility(this._bookId)){
            let tmpability = servantCfg.ability;
            let oriidx = tmpability.indexOf(this._bookId) ;
            if(oriidx > -1){
                newBlv = servantObj.ability[String(oriidx)];
            }else{
                newBlv = servantObj.getSkinBookLv2(this._bookId);
            }
        }else{
            newBlv = servantObj.getSkinBookLv2(this._bookId);
        }


        if (newBlv > this._curBlv)
        {
            let bcfg = GameConfig.config.abilityCfg[this._bookId];  
            let str = LanguageManager.getlocal("servantInfo_speciality" + bcfg.type) + "+" +  rdata.data.upAttrValue;
            // let str2 = LanguageManager.getlocal("servantInfo_attrTxt" + bcfg.type + "_1") + "+" +  bcfg.num;
            let strList = [{tipMessage:str}];
            App.CommonUtil.playRewardFlyAction(strList);

            /**
             * 升级成功，飘提示
             */
            this._curBlv = newBlv;
            
            let bookIcon = this._nodeContainer.getChildByName('bookIcon');
            let upgradeClip = ComponentManager.getCustomMovieClip("servant_book_lvup",7,100);
            // upgradeClip.setScale(1.3);
            upgradeClip.x = bookIcon.x-75;
            let deltaY = bookIcon.y-165;
            upgradeClip.y = deltaY;
            this._nodeContainer.addChild(upgradeClip);
            upgradeClip.playWithTime(1);
            let tmpNode =  this._nodeContainer;
            egret.Tween.get(upgradeClip,{loop:false}).wait(700).to({y: deltaY},500).call(function(){
                tmpNode.removeChild(upgradeClip);
                upgradeClip = null;
            },this);


            let servant_book_lvup_word = BaseBitmap.create("servant_book_lvup8");
            servant_book_lvup_word.anchorOffsetX = servant_book_lvup_word.width/2;
            servant_book_lvup_word.anchorOffsetY = servant_book_lvup_word.height/2;
            servant_book_lvup_word.x = bookIcon.x + bookIcon.width/2  ;
            let wordY = bookIcon.y + bookIcon.height/2 ;
            servant_book_lvup_word.y = wordY;
            servant_book_lvup_word.setScale(0.3);
            this._nodeContainer.addChild(servant_book_lvup_word);
            egret.Tween.get(servant_book_lvup_word,{loop:false}).to({scaleX:1,scaleY:1},160).wait(800).to({y:wordY,alpha:0},500).call(()=>{
                tmpNode.removeChild(servant_book_lvup_word);
                servant_book_lvup_word = null;
            },this);

            let servant_book_lvup_light = BaseBitmap.create("servant_book_lvup_light");
            servant_book_lvup_light.anchorOffsetX = servant_book_lvup_light.width/2;
            servant_book_lvup_light.anchorOffsetY = servant_book_lvup_light.height/2;
            servant_book_lvup_light.x = bookIcon.x + bookIcon.width/2 ;
            servant_book_lvup_light.y = bookIcon.y + bookIcon.height/2;
            this._nodeContainer.addChild(servant_book_lvup_light);
            servant_book_lvup_light.setScale(0);
            egret.Tween.get(servant_book_lvup_light,{loop:false}).to({scaleX:0.3,scaleY:0.3},40).to({scaleX:1,scaleY:1},40).to({scaleX:1.4,scaleY:0.75,alpha:0},40).call(()=>{
                tmpNode.removeChild(servant_book_lvup_light);
                servant_book_lvup_light = null;
            },this);
        }else
        {
            let bookIcon = this._nodeContainer.getChildByName('bookIcon');
            let fail_flag = BaseBitmap.create("servant_book_lvup_failed");
            fail_flag.x = bookIcon.x + bookIcon.width/2 - fail_flag.width/2;
            fail_flag.y = bookIcon.y + bookIcon.height/2 - fail_flag.height/2;
            this._nodeContainer.addChild(fail_flag);
            let tmpNode =  this._nodeContainer;
            egret.Tween.get(fail_flag,{loop:false}).to({y:fail_flag.y+30},500).call(function(){
                tmpNode.removeChild(fail_flag);
                fail_flag = null;
            });
        }
        
        this.refreshUI();
    }
    protected collectHandler(param:any)
    {
        if ( this._isAtTopLv)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("servant_bookUpTip3"));
            return;
        }
        if(param == 1 && this._upTipStr1 != "" )
        {
            App.CommonUtil.showTip(this._upTipStr1);
            return ;
        }
        if(param == 2 && this._upTipStr2 != "" )
        {
             App.CommonUtil.showTip(this._upTipStr2);
            return ;
        }
        
        if(param == 3 && this._upTipStr3 != "" )
        {
             App.CommonUtil.showTip(this._upTipStr3);
            return ;
        }

        let servantCfg = Config.ServantCfg.getServantItemById(this._servantId);
        if( servantCfg.isContainsAbility(this._bookId)){
            let tmpability = servantCfg.ability;
            let oriidx = tmpability.indexOf(this._bookId) ;
            NetManager.request(NetRequestConst.REQUEST_SERVANT_UPABILITY,{servantId:this._servantId ,upType:param,pos:oriidx});
        }else{
            let skinId = Config.ServantskinCfg.getSkinIdByBid(this._servantId);
            NetManager.request(NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY,{servantId:this._servantId,servantSkinId:skinId,abilityId:this._bookId ,upType:param});
        }

        // NetManager.request(NetRequestConst.REQUEST_SERVANT_UPABILITY,{servantId:this._servantId ,upType:param,pos:this._aindex})
    }
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            // "servant_book_lvup",
            "itemview_daoju_bg02"
        ]);
	}
    protected getStars(num:number)
	{
		let objContainer = new BaseDisplayObjectContainer;

		for (var index = 1; index <= num; index++) {
			let starImg = BaseBitmap.create("servant_star")
			starImg.setScale(0.7);
			starImg.x = (index-1) * starImg.width*0.7;
			starImg.y = 0;
			objContainer.addChild(starImg);
		}
		return objContainer;
	}

    private doGuide()
    {
       this.hide();
    }

    public dispose()
    {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY),this.collectHandlerCallBack,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY),this.collectHandlerCallBack,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);
        this._nodeContainer = null;
        this._aindex = null;
        this._servantId = null;
        this._bookId = null;
        this._changeTxtList = [];
        this._itemId = null;
        this._isAtTopLv = false;
        this._upTipStr1 = null;
        this._upTipStr2 = null;
        this._upTipStr3 = null;

		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        super.dispose();
    }
}