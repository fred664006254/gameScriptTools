/**
 * 门客新UI 上部3 
 * 神器信息
 * author shaoliang
 * date 2019/7/31
 * @class ServantNewUITopNode3
 */

class ServantNewUITopNode3 extends BaseDisplayObjectContainer
{ 
    private _servantId:string = null;
    private _weaponVo:WeaponInfoVo = null;
    private _weaponCfg:Config.ServantWeaponItemCfg = null;
    private _weaponImg:BaseLoadBitmap = null;
	private _weaponEf:BaseLoadBitmap = null;

    private _attrBtnNode:BaseDisplayObjectContainer[] = [];
	private _attrType:number = 1;//显示类型 1 属性 2 资质
    private _lvText:BaseTextField=null;
	private _attrTexts:BaseTextField[]=[];

    public constructor()
	{
		super();
	}


    public init(servantId:string):void
	{	


		App.MessageHelper.addEventListener(MessageConst.MESSAGE_SELECTED_WEAPON_PROMATION,this.switchTab,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_WEAPON_UPLEVEL,this.playAnim,this);
		

        this._servantId = servantId;
        this._weaponVo = Api.weaponVoApi.getWeaponInfoVoByServantId(servantId);



        this._weaponCfg = Config.ServantweaponCfg.getWeaponItemByServantId(servantId);

		let weaponbg = BaseLoadBitmap.create("weapon_show_bg");
		weaponbg.width = 221;
		weaponbg.height = 223;
		weaponbg.anchorOffsetY = weaponbg.height/2;
        weaponbg.anchorOffsetX = weaponbg.width / 2;
        weaponbg.setPosition(195,255);
		this.addChild(weaponbg);

		let clip = ComponentManager.getCustomMovieClip("weapon_show_ef_",10,100);
		clip.setPosition(195-403.5,255-202-25);
		this.addChild(clip);
		clip.playWithTime(0);
		clip.blendMode = egret.BlendMode.ADD;

        this._weaponImg = BaseLoadBitmap.create(this._weaponCfg.icon);
		this._weaponImg.width = 346;
        this._weaponImg.height = 346;
        this._weaponImg.anchorOffsetY = this._weaponImg.height/2;
        this._weaponImg.anchorOffsetX = this._weaponImg.width / 2;
        this._weaponImg.setPosition(195,225);
		this.addChild(this._weaponImg);
		if ((this._weaponCfg.id == "2003"))
		{
			 this._weaponImg.y = 253;
		}

		this._weaponEf = BaseLoadBitmap.create(this._weaponCfg.icon);
		this._weaponEf.width = 346;
        this._weaponEf.height = 346;
        this._weaponEf.anchorOffsetY = this._weaponEf.height/2;
        this._weaponEf.anchorOffsetX = this._weaponEf.width / 2;
        this._weaponEf.setPosition(195,this._weaponImg.y);
		this._weaponEf.blendMode = egret.BlendMode.ADD;
		this._weaponEf.alpha = 0.7;
		this.addChild(this._weaponEf);

		let oldY = this._weaponImg.y;
		egret.Tween.get(this._weaponImg,{loop:true}).to({y:oldY+2},1000).to({y:oldY},1000);
		egret.Tween.get(this._weaponEf,{loop:true}).to({alpha:0,y:oldY+2},1000).to({alpha:0.7,y:oldY},1000);

        let nameBg = BaseLoadBitmap.create("wifestatus_namebg");
        nameBg.width = 220;
        nameBg.height = 36;
        nameBg.setPosition(88,409);
        this.addChild(nameBg);

        let nameTxt = ComponentManager.getTextField(this._weaponCfg.name,TextFieldConst.FONTSIZE_CONTENT_SMALL);
        nameTxt.width = 180;
        nameTxt.textAlign = egret.HorizontalAlign.CENTER;
        nameTxt.multiline = true;
        nameTxt.text = LanguageManager.getlocal("weapon_name_"+this._servantId);
        nameTxt.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		nameTxt.setPosition(nameBg.x+20,nameBg.y+nameBg.height/2-nameTxt.height/2);
		this.addChild(nameTxt);
		if (PlatformManager.checkIsEnLang()){
			nameTxt.x = nameBg.x + 5;
		}

        //详情
		let detailImg = ComponentManager.getButton("servant_info_detail","",this.detailClickHandler,this)
		detailImg.x = 250;
		detailImg.y = 396;
		this.addChild(detailImg);

		if (!this._weaponVo)
		{
			detailImg.visible = false;
		}

        // 属性
		let rightBg = BaseBitmap.create("servant_attr_bg");
		rightBg.width = 193;
		rightBg.height = 500;
		rightBg.setPosition(433, -10);
		this.addChild(rightBg);

		if(Api.switchVoApi.checkZhenQiFangOpen())
		{
			let goToBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"goto_jewellery_shop",this.goToHandle,this);
			goToBtn.x = rightBg.x+rightBg.width/2-goToBtn.width/2;
			goToBtn.y = 380;
			goToBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChild(goToBtn);

			if(!Api.zhenqifangVoApi.isShowNpc())
			{
				App.DisplayUtil.changeToGray(goToBtn);
			}

			if(Api.zhenqifangVoApi.checkNpcMessage()){
				
				App.CommonUtil.addIconToBDOC(goToBtn);
				// goToBtn.getChildByName("reddot").x += 7;
				// goToBtn.getChildByName("reddot").y -= 5;
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(goToBtn);
			}
		}
	

        // let attrNode1 = new BaseDisplayObjectContainer();
		// attrNode1.x = rightBg.x+20;
		// this.addChild(attrNode1);
		// let attrNode2 = new BaseDisplayObjectContainer();
		// attrNode2.x = rightBg.x+20;
		// this.addChild(attrNode2);

		// this._attrBtnNode= [attrNode1,attrNode2];

		// let divisor1 = BaseBitmap.create("servant_attr_divisor");
		// divisor1.setPosition(92+20,74);
		// attrNode1.addChild(divisor1);

		// let divisor2 = BaseBitmap.create("servant_attr_divisor");
		// divisor2.setPosition(divisor1.x,divisor1.y);
		// attrNode2.addChild(divisor2);

		// let attr1Node1 = BaseBitmap.create("servant_attr_left1");
		// attr1Node1.setPosition(16,62);
		// attrNode1.addChild(attr1Node1);

		// let attr2Node1 = BaseBitmap.create("servant_attr2_right1");
		// attr2Node1.setPosition(98,62);
		// attrNode1.addChild(attr2Node1);
		// attr2Node1.addTouchTap(this.clickSwitchAttr,this,[2]);

		// let attr1Node2 = BaseBitmap.create("servant_attr_left2");
		// attr1Node2.setPosition(16,62);
		// attrNode2.addChild(attr1Node2);
		// attr1Node2.addTouchTap(this.clickSwitchAttr,this,[1]);

		// let attr2Node2 = BaseBitmap.create("servant_attr2_right2");
		// attr2Node2.setPosition(98,62);
		// attrNode2.addChild(attr2Node2);

		
		let divisor1 = BaseLoadBitmap.create("weapon_attribute_text");
		divisor1.setPosition(rightBg.x+rightBg.width/2-67,58);
		this.addChild(divisor1);

		let attrLine = BaseBitmap.create("servant_attr_line");
		attrLine.setPosition(rightBg.x+rightBg.width/2-attrLine.width/2,101);
		this.addChild(attrLine);

		
		this._lvText = ComponentManager.getTextField("0",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this._lvText.textColor = TextFieldConst.COLOR_QUALITY_ORANGE;
		this._lvText.setPosition(rightBg.x+20,122);
		this._lvText.bold = true;
		this.addChild(this._lvText);

		let label1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		label1.textColor = TextFieldConst.COLOR_QUALITY_ORANGE;
		label1.setPosition(this._lvText.x,this._lvText.y+30);
		label1.bold = true;
		this.addChild(label1);
		this._attrTexts.push(label1);

		for (let i = 0; i<4; i++)
		{
			let labelone = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
			labelone.textColor = TextFieldConst.COLOR_WHITE;
			labelone.setPosition(label1.x,195+i*29);
			labelone.bold = true;
			this.addChild(labelone);
			this._attrTexts.push(labelone);
		}
		this._attrTexts.push(this._lvText);

		// for (let i = 0; i<8; i++)
		// {
		// 	let labelone = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
		// 	labelone.textColor = TextFieldConst.COLOR_WHITE;
		// 	labelone.setPosition(label1.x,130+i*29);
		// 	this.addChild(labelone);
		// 	labelone.bold = true;
		// 	this._attrTexts0.push(labelone);
		// }

		this.resetAttr();
		this.resetLvText();
    }

	private resetInfo():void
	{
		this.resetAttr();
		this.resetLvText();
	}

	private switchTab(event:egret.Event):void
	{
		this.clickSwitchAttr(null,event.data);
	}

    private clickSwitchAttr(event,type:number):void
	{	
		if (this._attrType == type)
		{
			return;
		}
		// this._attrType = type;
		this.resetAttr();
	}

    private resetAttr():void
	{	

		// if (this._attrType == 1)
		// {
		// 	this._attrBtnNode[0].visible = true;
		// 	this._attrBtnNode[1].visible = false;
		// }
		// else
		// {
		// 	this._attrBtnNode[0].visible = false;
		// 	this._attrBtnNode[1].visible = true;
		// }


		// if (this._attrType == 2)
		// {
		// 	for (let k in this._attrTexts)
		// 	{
		// 		this._attrTexts[k].visible = false;
		// 	}
		// 	// for (let k in this._attrTexts0)
		// 	// {
		// 	// 	this._attrTexts0[k].visible = true;
		// 	// }
		// }
		// else
		// {
		// 	for (let k in this._attrTexts)
		// 	{
		// 		this._attrTexts[k].visible = true;
		// 	}
		// 	// for (let k in this._attrTexts0)
		// 	// {
		// 	// 	this._attrTexts0[k].visible = false;
		// 	// }
		// }

		if (this._attrType ==1)
		{
			for (let i = 0; i<=4; i++)
			{
				this._attrTexts[i].text = LanguageManager.getlocal("servant_newui_attr"+i,[this.getAttr1ById(i)]);
			}
			if (!this._weaponVo)
			{
				this._lvText.text = LanguageManager.getlocal("weapon_level",["0"]);
			}
			else
			{
				this._lvText.text = LanguageManager.getlocal("weapon_level",[String(this._weaponVo.lv)]);
			}
			
		}
		else
		{	
			// for (let i = 1; i<=8; i++)
			// {	
			// 	this._attrTexts0[i-1].text = LanguageManager.getlocal("weapon_speciality_"+i,[this.getAttr2ById(i)]);
			// }

			// for (let i = 0; i<=4; i++)
			// {
			// 	this._attrTexts[i].text = LanguageManager.getlocal("weapon_speciality2_name"+i,[this.getAttr2ById(i)]);
			// }
			// if (!this._weaponVo)
			// {
			// 	this._lvText.text = LanguageManager.getlocal("weapon_promotion_level",["0"]);
			// }
			// else
			// {	
			// 	this._lvText.text = LanguageManager.getlocal("weapon_promotion_level",[String(this._weaponVo.clv)]);
			// }	
			
		}
	}

	private resetLvText():void
	{	
		if (!this._weaponVo)
		{
			// if (this._attrType ==1)
			// {
			// 	this._lvText.text = LanguageManager.getlocal("weapon_level",["0"]);
			// }
			// else
			// {
				this._lvText.text = LanguageManager.getlocal("weapon_level",["0"]);
			// }
		}
		else
		{
			// if (this._attrType ==1)
			// {
			// 	this._lvText.text = LanguageManager.getlocal("weapon_level",[String(this._weaponVo.lv)]);
			// }
			// else
			// {
				this._lvText.text = LanguageManager.getlocal("weapon_level",[String(this._weaponVo.lv)]);
			// }
		}
		
	}

    protected getAttr1ById(id:number):string
	{
		if(!this._weaponVo){
			return "0";
		}
		if(id == 0){
			return App.StringUtil.changeIntToText(this._weaponVo.total);
		}
		if(id == 1){
			return App.StringUtil.changeIntToText(this._weaponVo.attr[0]);
		}
		if(id == 2){
			return App.StringUtil.changeIntToText(this._weaponVo.attr[1]);
		}
		if(id == 3){
			return App.StringUtil.changeIntToText(this._weaponVo.attr[2]);
		}
		if(id == 4){
			return App.StringUtil.changeIntToText(this._weaponVo.attr[3]);
		}
		return "0";
	}


    protected getAttr2ById(id:number):string
	{
        if(!this._weaponVo){
			return "0";
		}
		return App.StringUtil.changeIntToText(this._weaponVo.getSpecialityByType(id));
    }


    protected detailClickHandler()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.WEAPONATTRDETAILSPOPUPVIEW,{id:this._weaponVo.id});
	}

    private goToHandle():void
    {
		let view = this;
		if(Api.zhenqifangVoApi.isShowNpc()){
			ViewController.getInstance().openView(ViewConst.COMMON.ZHENQIFANGVIEW);

			if (ViewController.getInstance().getView(ViewConst.COMMON.SERVANTVIEW))
			{
				ViewController.getInstance().getView(ViewConst.COMMON.SERVANTVIEW).hide();
			}
			if (ViewController.getInstance().getView(ViewConst.COMMON.SERVANTNEWUIVIEW))
			{
				ViewController.getInstance().getView(ViewConst.COMMON.SERVANTNEWUIVIEW).hide();
			}
		}
		else{
			App.CommonUtil.showTip(LanguageManager.getlocal("reachLvelUnlockDesc",[Api.playerVoApi.getPlayerOfficeByLevel(Config.ServantweaponCfg.lvNeed)]));
		}
    }

	private playAnim():void
	{	
		SoundManager.playEffect(SoundConst.EFFECT_UPD); 

		let weaponEf = BaseLoadBitmap.create(this._weaponCfg.icon);
		weaponEf.width = this._weaponEf.width;
		weaponEf.height = this._weaponEf.height;
        weaponEf.anchorOffsetY = this._weaponEf.height/2;
        weaponEf.anchorOffsetX = this._weaponEf.width / 2;
        weaponEf.setPosition(this._weaponEf.x,this._weaponEf.y);
		weaponEf.blendMode = egret.BlendMode.ADD;
		weaponEf.alpha = 0.5;
		weaponEf.setScale(1.1)
		this.addChild(weaponEf);

		egret.Tween.get(weaponEf).to({alpha:1,scaleX:1.2,scaleY:1.2},100).to({alpha:0,scaleX:1.25,scaleY:1.25},400);

		let clip = ComponentManager.getCustomMovieClip("weapon_upgrade_ef_",10,100);
		clip.setPosition(weaponEf.x-292,weaponEf.y-292+20);
		this.addChild(clip);
		clip.blendMode = egret.BlendMode.ADD;
		let view = this;
		clip.setEndCallBack(()=>{
			weaponEf.dispose();
			clip.dispose();
			view.resetInfo();

			let sweeplight = ComponentManager.getCustomMovieClip("sweeplight_effect",8,80);
			sweeplight.x = 432;
			sweeplight.y = 0;
			sweeplight.scaleX = 194/185;
			view.addChild(sweeplight);
			sweeplight.playWithTime(1);
			sweeplight.setEndCallBack(()=>{
				sweeplight.dispose();
			},view);

		},this)
		clip.playWithTime(1);

		//飘字
		if (Api.weaponVoApi.recentUpType)
		{	
			let picStr = "";
			if (Api.weaponVoApi.recentUpType ==1)
			{
				picStr = "weapon_level_up";
			}
			else if (Api.weaponVoApi.recentUpType ==2)
			{
				picStr = "weapon_process_level_up";
			}
			else 
			{
				picStr = "";
			}
			Api.weaponVoApi.recentUpType = 0;
			let upgrade = BaseBitmap.create(picStr);
			upgrade.setPosition(200-upgrade.width/2,320);
			this.addChild(upgrade);
			egret.Tween.get(upgrade,{loop:false}).to({y:150},600).call(()=>{
				upgrade.dispose();
				Api.rookieVoApi.checkWaitingGuide();
			});
		}
		
	}


    public dispose()
    {   

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SELECTED_WEAPON_PROMATION,this.switchTab,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WEAPON_UPLEVEL,this.playAnim,this);

        this._servantId = null;
        this._weaponVo = null;
        this._weaponImg = null;
		this._weaponEf = null;
		this._weaponCfg = null;
		this._attrTexts.length = 0;
		this._attrBtnNode.length = 0;
		this._lvText = null;
		this._attrType = 1;
		
		super.dispose();
    }
}