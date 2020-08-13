/**
 * 门客信息，妻妾技能
 * author yanyuling
 * date 2017/11/21
 * @class ServantInfoWifeItemScrollItem
 */

class ServantInfoWifeItemScrollItem extends ScrollListItem
{
    public static servantId = "";
    private _wifeId:string;
	private _wifeindex:number = 0;
	private _topLvTxt:BaseTextField;
	private servantNameBg:BaseBitmap=null;
	private newAttStr:string ="";
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:any)
    {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL),this.refreshAfterLv,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_LOVE),this.refreshAfterLv,this);

 
		this._wifeindex = index; 
		let wifecfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
		let skillItem = data;
        
     	let bottomBg = BaseBitmap.create("public_listbg3");
		bottomBg.width = 599;
		bottomBg.height = 138;
		// bottomBg.x = 10; 
		bottomBg.x = GameConfig.stageWidth/2 - bottomBg.width/2;
		bottomBg.y = 0;
		this.addChild(bottomBg); 

		
		// let servantNameBg =  BaseBitmap.create("servant_biaoti2");
		// servantNameBg.x=bottomBg.x + 35;
		// servantNameBg.y=bottomBg.y+12;
		// this.servantNameBg =servantNameBg;
		

        let skillName = ComponentManager.getTextField("",24,TextFieldConst.COLOR_BROWN_NEW);
        // skillName.textColor = TextFieldConst.COLOR_QUALITY_ORANGE;
        skillName.x = bottomBg.x + 60;
        skillName.y = bottomBg.y+ 13;
		skillName.name = "skillName";
        this.addChild(skillName); 
		// this.addChild(servantNameBg); 
		
		let curValueTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
        curValueTxt.x = skillName.x;
        curValueTxt.y = skillName.y + 40;
		curValueTxt.name = "curValueTxt";
        this.addChild(curValueTxt);

        let nextValueTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
        nextValueTxt.x = skillName.x;
        nextValueTxt.y = curValueTxt.y + 35;
		nextValueTxt.name = "nextValueTxt";
        this.addChild(nextValueTxt);

		let goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"servantWife_goBtn",this.goBtnHandler,this);
		goBtn.x = bottomBg.x + bottomBg.width - 140;
		goBtn.y = bottomBg.y + bottomBg.height/2 - goBtn.height/2;
		goBtn.name = "goBtn";
		goBtn.visible = false;
		this.addChild(goBtn);

		this._topLvTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkillMaxShow"),TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_WARN_RED);
		this._topLvTxt.x = goBtn.x + goBtn.width/2 - this._topLvTxt.width/2;
		this._topLvTxt.y = goBtn.y + goBtn.height/2 - this._topLvTxt.height/2;
		this._topLvTxt.visible = false;
		this.addChild(this._topLvTxt);

		this.refreshAfterLv();
	}

	protected refreshAfterLv()
	{
	 
		let servantId = ServantInfoWifeItemScrollItem.servantId;
        let servantcfg = Config.ServantCfg.getServantItemById(servantId);
		this._wifeId =  servantcfg.wifeId;
        let wifeVo = Api.wifeVoApi.getWifeInfoVoById(this._wifeId);
        let skillLv = 1;
		if (wifeVo)
		{
			skillLv = wifeVo.skill[this._wifeindex];
		}
		let wifeSkill = Config.WifeCfg.getWifeCfgById(this._wifeId).wifeSkill;
		let data = wifeSkill[this._wifeindex];
        //是否解锁
		let str1 = ""
		let str2 = ""
		let str3 = ""
		let attStr = ""

		if(data.att.length == 4){
			
			if (PlatformManager.checkIsViSp()){
				attStr =  LanguageManager.getlocal("wifeSkillAllAttAdd")  ;
			}else{
				attStr = servantcfg.name + LanguageManager.getlocal("wifeSkillAllAttAdd");
			}
		}else{
			for (var index1 = 0; index1 < data.att.length; index1++) {
				var element = data.att[index1];
				if(index1 == 0){
					attStr = LanguageManager.getlocal("servantInfo_speciality" + element);
				}else{
					attStr = attStr + "、" + LanguageManager.getlocal("servantInfo_speciality" + element);
				}
			}
			if (PlatformManager.checkIsViSp()){
				attStr = attStr + LanguageManager.getlocal("wifeSkillAttAdd")  ;
			}else{
				attStr = servantcfg.name + attStr + LanguageManager.getlocal("wifeSkillAttAdd");
			}
		}
	
		//是否解锁
		let textColor = 0xb1b1b1;
		let textColor2 = TextFieldConst.COLOR_WARN_GREEN;
		let add1 = ""
        let isOpen = false;
        let goEnable = "";
        let isTopLv = false;
		if(wifeVo && data.condition <= wifeVo.intimacy){
            isOpen = true;
			textColor = TextFieldConst.COLOR_WHITE;
			let addNum1 = "";
			let addNum2 = "";

			let nextIndex = this._wifeindex + 1;
			let nextLvAdd = 1;
			//是否满级
			if(skillLv >= Config.WifebaseCfg.wifeSkillMax){
				nextIndex = this._wifeindex;
				nextLvAdd = 0;
				isTopLv = true;
			}

			if(data.growAtt < 1){
				addNum1 = (data.growAtt*100* skillLv ) + "%"
				addNum2 = (data.growAtt*100*( skillLv +nextLvAdd)) + "%"
			}else{
				addNum1 = (data.growAtt* skillLv).toString();
				addNum2 = (data.growAtt*( skillLv + nextLvAdd)).toString();
			}

			let needExp = Config.WifebaseCfg["wifeSkill" + (this._wifeindex + 1)][ skillLv -1];
			if (needExp <= wifeVo.exp)
            {
                goEnable = LanguageManager.getlocal("servantWife_goBtnEnable"); 
            }
            add1 = addNum1;
			this.newAttStr = addNum1;
			str1  = LanguageManager.getlocal("wifeSkillCur") + attStr + addNum1;
			str2  = LanguageManager.getlocal("wifeSkillNext") + attStr + addNum2;
		}
		else{
            isOpen = false;
			let addNum1 = "";
			if(data.growAtt < 1){
				addNum1 = (data.growAtt*100* skillLv) + "%"
			}else{
				addNum1 = (data.growAtt* skillLv).toString();
			}
			textColor2 = 0xb1b1b1;
			str1  = LanguageManager.getlocal("wifeSkillLock") + attStr + addNum1;
			str2 = LanguageManager.getlocal("wifeSkillUnLockNeed") + data.condition;
			this.newAttStr = addNum1;
        }

		let goBtn = <BaseButton>this.getChildByName("goBtn");
		let skillName = <BaseTextField>this.getChildByName("skillName");
		let curValueTxt = <BaseTextField>this.getChildByName("curValueTxt");
		let nextValueTxt = <BaseTextField>this.getChildByName("nextValueTxt");
        
		let wifeCfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
		let maleStr = "wifeSkill_" +this._wifeId +"_" + (this._wifeindex+1)
		if(Api.switchVoApi.checkIsInBlueWife()&&wifeCfg.isBule())
		{
			maleStr = maleStr + "_male"
		}

		let nameStr = LanguageManager.getlocal(maleStr);

		
        skillName.text = LanguageManager.getlocal("servant_wifeSkillName",[nameStr,String(skillLv),goEnable]);
		curValueTxt.text = str1;
		nextValueTxt.text = str2;
		// this.servantNameBg.width = skillName.textWidth+40;

        if (isOpen)
        {
            goBtn.visible = true;
			skillName.textColor =  TextFieldConst.COLOR_BROWN_NEW;
            curValueTxt.textColor = TextFieldConst.COLOR_BROWN_NEW;
            nextValueTxt.textColor = TextFieldConst.COLOR_BROWN_NEW;
			if(isTopLv)
			{
				this._topLvTxt.visible = true;
				goBtn.visible = false;
			}else
			{
				this._topLvTxt.visible = false;
				goBtn.visible = true;
			}
        }
        else
        {
			goBtn.visible = false;
			skillName.textColor = TextFieldConst.COLOR_BROWN_NEW;
            curValueTxt.textColor = TextFieldConst.COLOR_BROWN_NEW;
            nextValueTxt.textColor = TextFieldConst.COLOR_BROWN_NEW;
        }

		if(!data.condition)
		{
			goBtn.visible = false;
			nextValueTxt.visible =false;
			curValueTxt.textColor = TextFieldConst.COLOR_BROWN_NEW;
			curValueTxt.text =  LanguageManager.getlocal("wifeSkillCur") + attStr + this.newAttStr;
		}
    }
	

	
    protected goBtnHandler()
    {
        let tmpWifeId = this._wifeId;
        ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW,{id:tmpWifeId,handler:this});
    }
    public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL),this.refreshAfterLv,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_LOVE),this.refreshAfterLv,this);

		this.servantNameBg =null;
		this._wifeindex = 0;
        this._wifeId =  null;
		this.newAttStr=null;

		super.dispose();
	}
}