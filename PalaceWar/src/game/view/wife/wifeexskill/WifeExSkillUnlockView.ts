class WifeExSkillUnlockView extends PopupView
{
    
    public constructor()
	{
		super();
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				
				"wifeexskill_text","specialvieweffect"
		]);
	}

    protected isShowOpenAni():boolean{
		return false;
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getCloseBtnName():string
	{
		return null;
	}

	protected isTouchMaskClose():boolean
	{
		return true;
	}

	protected getBgExtraHeight():number
	{
		return 40;
	}

	protected getBgName():string
	{
		return "public_9_wordbg";
	}

    protected initView():void
    {
        this.addTouchTap(this.hide,this);


        let wifeId = this.param.data.wifeId;

		let clip = ComponentManager.getCustomMovieClip("specialvieweffect", 10, 100);
        let moveClipBM = BaseBitmap.create("specialvieweffect1");
        clip.scaleX = 1.15;
        clip.scaleY = 1.2;
        clip.setPosition(GameConfig.stageWidth / 2 - moveClipBM.width * 1.15/2+20, -moveClipBM.height+30);
        this.addChildToContainer(clip);
        clip.playWithTime(-1);

        let title:BaseBitmap=BaseBitmap.create("wifeexskill_text");
		title.setPosition((this.viewBg.width-title.width)/2,-45);
		this.addChildToContainer(title);

        let cfg = Config.WifeCfg.getWifeCfgById(wifeId);
        let servantCfg = Config.ServantCfg.getServantItemById(cfg.servantId);
        let wifeInfoVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(wifeId);

        let unlockStr = LanguageManager.getlocal("wifeExSkill_unlock2",[cfg.name,String(wifeInfoVo.intimacy)]);
        let unlocText = ComponentManager.getTextField(unlockStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
        unlocText.setPosition(42,72);
        this.addChildToContainer(unlocText);

        let effectText = ComponentManager.getTextField(LanguageManager.getlocal("wifeExSkill_unlockEffect"),
        TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
        effectText.setPosition(unlocText.x , unlocText.y+unlocText.height+40);
        this.addChildToContainer(effectText);

        let oldIntimacy = this.param.data.old;
        let newLv = wifeInfoVo.getExSkillLevel();
        let oldLv = Math.floor(oldIntimacy/Config.WifebaseCfg.exSkill);
        if (oldIntimacy<1000)
        {
            oldLv = 0;
        }
        let tab = [0,0,0,0];
        for (let i = oldLv; i<newLv; i++)
        {
            tab[i%4]++;
        }
        let tabObj = {};
        for (let i=0; i<4; i++)
        {
            if (tab[i]>0)
            {
                tabObj[String(i+1)] = tab[i];
            }
        }

        let posx =effectText.x+effectText.width;
        let index = 0;
        for (let k in tabObj)
        {   
            let v = tabObj[k];
            index++;
            let attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeExSkill_unlockEffect" + k,[servantCfg.name,String(v)]),20,TextFieldConst.COLOR_WHITE);
            attrTxt.x = posx + (index-1)%2*210;
            attrTxt.y = effectText.y+ Math.floor((index-1)/2)*31;
            this.addChildToContainer(attrTxt);
            
        }
    }
}