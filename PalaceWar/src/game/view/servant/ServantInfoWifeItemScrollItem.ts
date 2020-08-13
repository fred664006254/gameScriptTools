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
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:any)
    {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL),this.refreshAfterLv,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_LOVE),this.refreshAfterLv,this);
		// let wifeSkillIdx = index;
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIIFE_SETSEXSETTING,this.refreshAfterLv,this);
		this._wifeindex = index;
        // let 
		let wifecfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
		let skillItem = data;
        
        let bottomBg = BaseBitmap.create("public_9_managebg");
        bottomBg.width = 592;
        bottomBg.height = 84;// 126;
        // bottomBg.x = 24;
        bottomBg.y = 0;
        this.addChild(bottomBg);

        let skillName = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        skillName.textColor = TextFieldConst.COLOR_BROWN;
        skillName.x = bottomBg.x + 20;
        skillName.y = bottomBg.y+10;
		skillName.name = "skillName";
        this.addChild(skillName);

		let curValueTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        curValueTxt.x = skillName.x;
        curValueTxt.y = skillName.y + 25;
		curValueTxt.name = "curValueTxt";
        this.addChild(curValueTxt);

        let nextValueTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        nextValueTxt.x = skillName.x;
        nextValueTxt.y = curValueTxt.y + 25;
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
		if(!ServantInfoWifeItemScrollItem.servantId)
		{
			return;
		}
		let servantId = ServantInfoWifeItemScrollItem.servantId;
        let servantcfg = Config.ServantCfg.getServantItemById(servantId);
		if(!servantcfg || !servantcfg.wifeId)
		{
			return ;
		}
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
			attStr = servantcfg.name + LanguageManager.getlocal("wifeSkillAllAttAdd");
		}else{
			for (var index1 = 0; index1 < data.att.length; index1++) {
				var element = data.att[index1];
				if(index1 == 0){
					attStr = LanguageManager.getlocal("servantInfo_speciality" + element);
				}else{
					attStr = attStr + "、" + LanguageManager.getlocal("servantInfo_speciality" + element);
				}
			}
			attStr = servantcfg.name + attStr + LanguageManager.getlocal("wifeSkillAttAdd");
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
			textColor = TextFieldConst.COLOR_BROWN;
			let addNum1 = "";
			let addNum2 = "";

			let nextIndex = this._wifeindex + 1;
			let nextLvAdd = 1;
			//是否满级
			if(skillLv >= Config.WifebaseCfg.getWifeSkillMax()){
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
        skillName.text = LanguageManager.getlocal("servant_wifeSkillName",[String((this._wifeindex+1)),nameStr,String(skillLv),goEnable]);
		curValueTxt.text = str1;
		nextValueTxt.text = str2;

		
        if (isOpen)
        {
            goBtn.visible = true;
			skillName.textColor =  TextFieldConst.COLOR_BROWN;
            curValueTxt.textColor = textColor;
            nextValueTxt.textColor = textColor;
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
			skillName.textColor = TextFieldConst.COLOR_BROWN;
            curValueTxt.textColor = TextFieldConst.COLOR_BROWN;
            nextValueTxt.textColor = TextFieldConst.COLOR_BROWN;
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
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIIFE_SETSEXSETTING,this.refreshAfterLv,this);
		// this._scrollView = null;
		this._wifeindex = 0;
        this._wifeId =  null;

		super.dispose();
	}
}