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
    private _needitem:string = null;

    private _bookRuleBtn: BaseButton = null;
    private _bookMaxLv: number = 0;
    private _bookextraLevelMax: number = 0;
    private _bookextraLevelMax2: number = 0;
    private _booknowLv: number = 0;

	public constructor() {
		super();
	}

    protected getBgName():string{
		return `popupview_bg3`;
	}

	protected getCloseBtnName():string{
		return `popupview_closebtn2`;
	}

	public initView():void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY),this.collectHandlerCallBack,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY),this.collectHandlerCallBack,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);

        let bookId = this.param.data.aid
        this._bookId = String(bookId);
        let servantId = this.param.data.servantId
        this._servantId = servantId;
        this._aindex = this.param.data.index
        let isSkin = this.param.data.isSkin;
        let skinId = this.param.data.skinId;
        this._skinId = skinId;
        let alv = 1;

        let servantCfg = Config.ServantCfg.getServantItemById(this._servantId);
        let servantObj:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantId);
        if( servantCfg.isContainsAbility(this._bookId)){
            // alv = servantObj.ability[this._aindex];
            // let servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
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

        let bookcfg = GameConfig.config.abilityCfg[bookId];
        let abilitybaseCfg = GameConfig.config.abilitybaseCfg
        let typeList = abilitybaseCfg.typeList ;//
        let ratio = abilitybaseCfg.numList[String(bookcfg.num)].ratio ;
        let itemId = typeList[bookcfg.type];
        this._itemId = itemId;

        this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

        let bg:BaseBitmap = BaseBitmap.create("popupview_itemsbg");
		bg.x = this.viewBg.x + (this.viewBg.width - bg.width) / 2;
		bg.y = 0;
		this._nodeContainer.addChild(bg);

        let bookBg = BaseBitmap.create("itembg_1");
        bookBg.width = 108;
        bookBg.height = 106;
        bookBg.x = this.viewBg.width/2 - bookBg.width/2;
        bookBg.y = 20;
        this._nodeContainer.addChild(bookBg);

        let iconStr = "";
        if (servantObj.isSkinAbility(bookId))
        {
            iconStr = "servant_skin_book"+bookcfg.type;
        }
        else
        {
            iconStr = "servant_infoPro"+bookcfg.type;
        }
        let bookIcon = BaseBitmap.create(iconStr);
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

        let nameTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_attrNameTxt"+bookId),20,TextFieldConst.COLOR_BROWN);

        let namebg = BaseBitmap.create("public_9_bg95");
		namebg.y = bookBg.y + bookBg.height + 50;
        namebg.width = nameTxt.width+80;
        if (namebg.width<220)
        {
            namebg.width=220;
        }
		this._nodeContainer.addChild(namebg);
       
        nameTxt.y = namebg.y + namebg.height/2 - nameTxt.height/2;
        this._nodeContainer.addChild(nameTxt);
        if(nameTxt.width > namebg.width - 20){
            namebg.width = nameTxt.width + 20;
        }
        namebg.x = bookBg.x + bookBg.width/2 - namebg.width/2;
        nameTxt.x = namebg.x + namebg.width/2 - nameTxt.width/2;
        

       
    
        let lvNumBg = BaseBitmap.create("public_9_bg40");
        lvNumBg.width = 374;
        lvNumBg.height = 30;
        lvNumBg.x =this.viewBg.width/2 - lvNumBg.width/2;;
        lvNumBg.y = namebg.y + 50;
        this._nodeContainer.addChild(lvNumBg);

        let LvTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantBookRLv"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        LvTxt.x = lvNumBg.x+10;
        LvTxt.y = lvNumBg.y+lvNumBg.height/2-LvTxt.height/2
        this._nodeContainer.addChild(LvTxt);


        let proNumBg = BaseBitmap.create("public_9_bg40");
        proNumBg.width = 374;
        proNumBg.height = 30;
        proNumBg.x =lvNumBg.x ;
        proNumBg.y = lvNumBg.y+38;
        this._nodeContainer.addChild(proNumBg);


        let proTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
        proTxt.text = LanguageManager.getlocal("servantInfo_attrTxt" + bookcfg.type);
        proTxt.x = lvNumBg.x+10;
        proTxt.y = proNumBg.y+proNumBg.height/2-LvTxt.height/2
        this._nodeContainer.addChild(proTxt);

        if(PlatformManager.checkIsEnLang() || PlatformManager.checkIsPtLang() || PlatformManager.checkIsRuLang())
        {
            
            proTxt.x = 45;
            proNumBg.x = proTxt.x + proTxt.width + 7;
            lvNumBg.x = proNumBg.x;
            LvTxt.x= lvNumBg.x - LvTxt.width - 7;
            
        }
        this._bookRuleBtn = ComponentManager.getButton("btn_rule", "", () => { 
            ViewController.getInstance().openView(ViewConst.POPUP.SERVANTBOOKMAXRULEPOPUPVIEW,{
                bookMaxLv:this._bookMaxLv,
                bookextraLevelMax:this._bookextraLevelMax,
                booknowLv:this._booknowLv,
                bookextraLevelMax2:this._bookextraLevelMax2
            })
        }, this);
        this._bookRuleBtn.setScale(0.5)
        this._bookRuleBtn.x = lvNumBg.x + lvNumBg.width;
        this._bookRuleBtn.y = lvNumBg.y + lvNumBg.height / 2- this._bookRuleBtn.height *0.5/ 2;
        this._nodeContainer.addChild(this._bookRuleBtn);

        let arrow1 = BaseLoadBitmap.create("servant_arrow");
        arrow1.x =lvNumBg.x +222 ;
        arrow1.y = lvNumBg.y + 5;
        this._nodeContainer.addChild(arrow1);

        let arrow2 = BaseLoadBitmap.create("servant_arrow");
        arrow2.x =  arrow1.x  ;
        arrow2.y = proNumBg.y + 5;
        this._nodeContainer.addChild(arrow2);

        let LvValueTxt = ComponentManager.getTextField(""+alv,20);
        LvValueTxt.name = "LvValueTxt";
        LvValueTxt.x =lvNumBg.x + 153;
        LvValueTxt.y = LvTxt.y ;
        this._nodeContainer.addChild(LvValueTxt);
        this._changeTxtList.push(LvValueTxt);

        let LvValueTxt2 = ComponentManager.getTextField(String(alv+1),20,TextFieldConst.COLOR_WARN_GREEN);
        LvValueTxt2.x =lvNumBg.x + 291;
        LvValueTxt2.name = "LvValueTxt2";
        LvValueTxt2.y = LvValueTxt.y;
        this._nodeContainer.addChild(LvValueTxt2);
        this._changeTxtList.push(LvValueTxt2);

        let proValueTxt = ComponentManager.getTextField("",20);
        proValueTxt.x = LvValueTxt.x;
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


        if(PlatformManager.checkIsEnLang() || PlatformManager.checkIsPtLang() || PlatformManager.checkIsRuLang())
        {
            
            arrow1.x -= 42;
            arrow2.x -= 42;
            LvValueTxt.x -= 42;
            LvValueTxt2.x -= 42;
            proValueTxt.x -= 42;
            proValueTxt2.x -= 42;
        }

        let bottomBg = BaseBitmap.create("public_9_bg94");
        bottomBg.width = 498;
        bottomBg.height = 118;
        bottomBg.x = this.viewBg.width/2 - bottomBg.width/2 ;
        bottomBg.y = proNumBg.y + 45;
        this._nodeContainer.addChild(bottomBg);

        let itemStr = "6_"+itemId+"_1";
        let rewardArr =  GameData.formatRewardItem(itemStr);
		let iconItem = GameData.getItemIcon(rewardArr[0]);
        // numLb
        iconItem.getChildByName("numLb").visible = false;
        if (iconItem.getChildByName("numbg"))
        {
            iconItem.getChildByName("numbg").visible = false;
        }
        iconItem.x = bottomBg.x + 10;
        iconItem.y = bottomBg.y + bottomBg.height/2 - iconItem.height/2;
        this._nodeContainer.addChild(iconItem);

        let itemNameTxt = ComponentManager.getTextField("",20);
        itemNameTxt.x = iconItem.x + iconItem.width + 10;
        itemNameTxt.y = iconItem.y+20;
        itemNameTxt.name = "itemNameTxt";
        this._nodeContainer.addChild(itemNameTxt);
        
        let rateTxt = ComponentManager.getTextField("",itemNameTxt.size,TextFieldConst.COLOR_BROWN);
        rateTxt.text  = LanguageManager.getlocal("servantBookRate",[(ratio*100).toFixed(0) + "%"]);
        rateTxt.x = itemNameTxt.x ;
        rateTxt.y = itemNameTxt.y + 30;
        rateTxt.name = "rateTxt";
        this._nodeContainer.addChild(rateTxt);
        this._changeTxtList.push(rateTxt);

        let upgradeBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,"servantInfoLevelup",this.collectHandler,this,[1]);
        // upgradeBtn.setTextSize(20);
        upgradeBtn.x = bottomBg.x + bottomBg.width - 145;
        upgradeBtn.y = bottomBg.y + bottomBg.height/2 - upgradeBtn.height/2;
        this._nodeContainer.addChild(upgradeBtn);

        /**
         * 经验书
         */
        let bottomBg2 = BaseBitmap.create("public_9_bg94");
        bottomBg2.width = bottomBg.width;
        bottomBg2.height = bottomBg.height;
        bottomBg2.x = bottomBg.x;
        bottomBg2.y = bottomBg.y + bottomBg.height + 5;
        this._nodeContainer.addChild(bottomBg2);

        let itemStr2 = itemStr;
        let rewardArr2 =  GameData.formatRewardItem(itemStr2);
		// let iconItem2 = GameData.getItemIcon(rewardArr2[0]);
        let iconItem2 = BaseBitmap.create("servant_bookexp_icon");
        // numLb
        iconItem2.x = bottomBg2.x + 10;
        iconItem2.y = bottomBg2.y + bottomBg2.height/2 - iconItem2.height/2;
        this._nodeContainer.addChild(iconItem2);

        let itemNameTxt2 = ComponentManager.getTextField("",20);
        itemNameTxt2.text = LanguageManager.getlocal("itemName_1020");
        itemNameTxt2.name = "itemNameTxt2";
        itemNameTxt2.x = itemNameTxt.x;
        itemNameTxt2.y = iconItem2.y+20;
        this._nodeContainer.addChild(itemNameTxt2);
        
        let rateTxt2 = ComponentManager.getTextField("",itemNameTxt.size,TextFieldConst.COLOR_BROWN);
        rateTxt2.text = LanguageManager.getlocal("servantBookRate",["100%"]);
        rateTxt2.x = itemNameTxt2.x ;
        rateTxt2.y = itemNameTxt2.y + 30;
        this._nodeContainer.addChild(rateTxt2);
        this._changeTxtList.push(rateTxt2);

        let upgradeBtn2 = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,"servantInfoLevelup",this.collectHandler,this,[2]);
        // upgradeBtn2.setTextSize(20);
        upgradeBtn2.x = upgradeBtn.x;
        upgradeBtn2.y = bottomBg2.y + bottomBg2.height/2 - upgradeBtn2.height/2;
        this._nodeContainer.addChild(upgradeBtn2);

        /**
         * 升星宝典
         */
        let bottomBg3:BaseBitmap = BaseBitmap.create("public_9_bg94");
        bottomBg3.width = bottomBg.width;
        bottomBg3.height = bottomBg.height;
        bottomBg3.x = bottomBg.x;
        bottomBg3.y = bottomBg2.y + bottomBg2.height + 5;
        this._nodeContainer.addChild(bottomBg3);

        this._needitem = abilitybaseCfg.numList[String(bookcfg.num)].needItem;
        let itemStr3:string = "6_"+this._needitem+"_1";
        let rewardArr3:RewardItemVo[] =  GameData.formatRewardItem(itemStr3);
		let itemIcon:BaseDisplayObjectContainer = GameData.getItemIcon(rewardArr3[0]);
        itemIcon.x = bottomBg3.x + 10;
        itemIcon.y = bottomBg3.y + bottomBg3.height/2 - itemIcon.height/2;
        this._nodeContainer.addChild(itemIcon);
        itemIcon.getChildByName("numLb").visible = false;
        if (itemIcon.getChildByName("numbg"))
        {
            itemIcon.getChildByName("numbg").visible = false;
        }

        let itemNameTxt3:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("itemName_"+this._needitem),20);
        itemNameTxt3.name = "itemNameTxt3";
        itemNameTxt3.x = itemNameTxt.x;
        itemNameTxt3.y = itemIcon.y+20;
        this._nodeContainer.addChild(itemNameTxt3);

        let rateTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("servantBookRate",["100%"]),itemNameTxt.size,TextFieldConst.COLOR_BROWN);
        rateTxt3.x = itemNameTxt3.x ;
        rateTxt3.y = itemNameTxt3.y + 30;
        this._nodeContainer.addChild(rateTxt3);
        this._changeTxtList.push(rateTxt3);

        let upgradeBtn3 = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,"servantInfoLevelup",this.collectHandler,this,[3]);
        // upgradeBtn3.setTextSize(20);
        upgradeBtn3.x = upgradeBtn.x;
        upgradeBtn3.y = bottomBg3.y + bottomBg3.height/2 - upgradeBtn3.height/2;
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
        let alv2 = servantObj.ability[this._aindex];
        let servantCfg = Config.ServantCfg.getServantItemById(this._servantId);
        if( servantCfg.isContainsAbility(this._bookId)){
            // alv = servantObj.ability[this._aindex];
            // let servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
            let tmpability = servantCfg.ability;
            let oriidx = tmpability.indexOf(this._bookId) ;
            if( oriidx> -1){
                alv2 = servantObj.ability[String(oriidx)];
            }else{
                alv2 = servantObj.getSkinBookLv2(this._bookId);
            }
        }else{
            alv2 = servantObj.getSkinBookLv2(this._bookId);
        }

        let curClvCfg = Config.ServantBaseCfg.getServantLvList()[String(servantObj.clv)];

        let abilitybaseCfg = GameConfig.config.abilitybaseCfg
        let typeList = abilitybaseCfg.typeList ;//
        let numList = abilitybaseCfg.numList ;//
        let curStarCfg = numList[String(bookcfg.num)] ;
        this._proChangeValue = curStarCfg.abilityExp;

        this._changeTxtList[0].text = String(alv2);
        this._changeTxtList[2].text = bookcfg.num * alv2;
       
        let upNeed1 = 1;
        let upNeed2 = 1;
        let ownNum2 = servantObj.abilityExp;
        // servantObj.abilityExp
        let dataList = Config.StudyatkCfg.getStudyatkList();
        let studylevel = Api.studyatkVoApi.getStudySkillInfoLv();
        let extraLevelMax = 0;
        for(let i in dataList){
            let unit = dataList[i];
			if(Number(i) <= studylevel && Number(unit.ability) == Number(this._bookId)){
                extraLevelMax += unit.upLv;
            }
            if(studylevel < Number(i)){
                break;
            }
		}
        let maxLv:number = curClvCfg.abilityLv + extraLevelMax;
        if (servantObj.clv > Config.ServantBaseCfg.commonMaxClv())
        {
            maxLv =  servantObj.level + extraLevelMax;
        }

        let bookextraLevelMax2 = 0;
        if(Api.switchVoApi.checkOpenWifeBattle()){
            let dataList = Config.WifebattleCfg.getWifeStudyCfgList();
            let statusNum = Api.wifestatusVoApi.getStatusWifeNum();
            let itemHaveNum = Api.itemVoApi.getItemNumInfoVoById(Config.WifebattleCfg.costItem);;//
            let curLv = Api.wifebattleVoApi.wifebattleVo.info.ylinfo?Api.wifebattleVoApi.wifebattleVo.info.ylinfo.lv:0;
            for(let i in dataList){
                let unit = dataList[i];
                let needStatusNum = unit.unlock;
                let itemNeedNum = unit.costNum;
                if(statusNum >= needStatusNum && curLv >= (Number(unit.id) + 1)){
                    if(Number(this._bookId) == Number(unit.abilityID) && Number(this._servantId) == Number(unit.servantID)){
                        bookextraLevelMax2 += 1;
                    }
                }
            }   
            maxLv += bookextraLevelMax2;
        }
        this._bookMaxLv = maxLv;
        this._bookextraLevelMax = extraLevelMax;
        this._booknowLv = alv2;
        this._bookextraLevelMax2 = bookextraLevelMax2;
        if (this._bookextraLevelMax > 0 || this._bookextraLevelMax2 > 0) {
            this._bookRuleBtn.setVisible(true);
        }
        else {
            this._bookRuleBtn.setVisible(false);
        }
        if (alv2 >= maxLv)
        {
            upNeed1 = 0;
            upNeed2 = 0;
            this._isAtTopLv = true;
            this._changeTxtList[1].text = "MAX";
            this._changeTxtList[3].text =  "MAX";
            // this._changeTxtList[4].text = LanguageManager.getlocal("servantBookRate",["0%"]);
        }else
        {
            upNeed2 = curStarCfg.abilityExp;
            this._changeTxtList[1].text = String(alv2+1);
            this._changeTxtList[3].text =  String(bookcfg.num * (alv2+1));
            
            // this._changeTxtList[4].text = LanguageManager.getlocal("servantBookRate",[(numList[String(alv)].ratio*100).toFixed(0) + "%"]);
        }
      
        let itemNameTxt = <BaseTextField>this._nodeContainer.getChildByName("itemNameTxt");
        let itemNameTxt2 = <BaseTextField>this._nodeContainer.getChildByName("itemNameTxt2");
        let itemNameTxt3 = <BaseTextField>this._nodeContainer.getChildByName("itemNameTxt3");
        this._upTipStr1 = "";
        this._upTipStr2 = "";
        this._upTipStr3 = "";
        
        let ownNum1 = Api.itemVoApi.getItemNumInfoVoById(Number(this._itemId));
        if (ownNum1 >= upNeed1)
        {
            itemNameTxt.textColor = TextFieldConst.COLOR_WARN_GREEN4;
        }else
        {
            itemNameTxt.textColor = TextFieldConst.COLOR_WARN_RED;
            // TextFieldConst.COLOR_WARN_RED;
            this._upTipStr1 = LanguageManager.getlocal("servant_bookUpTip1");
        }
        itemNameTxt.text = LanguageManager.getlocal("itemName_"+  this._itemId) +" : " + ownNum1 + "/" + upNeed1;

        if (ownNum2 >= upNeed2)
        {
            itemNameTxt2.textColor = TextFieldConst.COLOR_WARN_GREEN4;
        }else
        {
            itemNameTxt2.textColor = TextFieldConst.COLOR_WARN_RED;
            this._upTipStr2 = LanguageManager.getlocal("servant_bookUpTip2");
        }
        itemNameTxt2.text = LanguageManager.getlocal("servant_bookExp",[String(ownNum2),String(upNeed2)]) ;


        let ownNum3 = Api.itemVoApi.getItemNumInfoVoById(Number(this._needitem));
        if (ownNum3 >= 1)
        {
            itemNameTxt3.textColor = TextFieldConst.COLOR_WARN_GREEN4;
        }else
        {
            itemNameTxt3.textColor = TextFieldConst.COLOR_WARN_RED;
            this._upTipStr3 = LanguageManager.getlocal("itemNumNotEnough");
        }
        itemNameTxt3.text = LanguageManager.getlocal("itemName_"+  this._needitem) +" : " + ownNum3 + "/1";
    }
    private collectHandlerCallBack(event:egret.Event)
    {
        let rdata = event.data.data;
        if(rdata.ret != 0){
            return;
        }
        let servantObj = Api.servantVoApi.getServantObj(this._servantId) ;
        let newBlv = 0;
        let servantCfg = Config.ServantCfg.getServantItemById(this._servantId);
        if( servantCfg.isContainsAbility(this._bookId)){
            // newBlv = servantObj.ability[this._aindex];
            // let servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
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
            // let servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
            let tmpability = servantCfg.ability;
            let oriidx = tmpability.indexOf(this._bookId) ;
            NetManager.request(NetRequestConst.REQUEST_SERVANT_UPABILITY,{servantId:this._servantId ,upType:param,pos:oriidx});
        }else{
            let obj = Config.ServantskinCfg.getServantSkinItemByBook(this._bookId,this._servantId);
            let skinid = '';
            if(obj){
                skinid = obj.id;
            }
            NetManager.request(NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY,{servantId:this._servantId,servantSkinId:skinid,abilityId:this._bookId ,upType:param});
        }
        
    }
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "popupview_itemsbg",
            "servant_book_lvup","servant_book_lvup_failed","servant_bookexp_icon","servant_book_lvup_light",
            "servant_book_lvup8",
        ]);
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

    private doGuide()
    {
       this.hide();
    }

    protected getBgExtraHeight():number
	{
		return 20;
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
        this._needitem = null;
        super.dispose();
    }
}