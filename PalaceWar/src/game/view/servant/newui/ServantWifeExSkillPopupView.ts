/**
 * 佳人技能
 * author shaoliang
 * date 2020/04/08
 * @class ServantWifeExSkillPopupView
 */

class ServantWifeExSkillPopupView  extends PopupView
{
    public constructor() {
		super();
	}

     protected getTitleStr():string
	{
		return "wifeExSkill";
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "wifeexskill_bg",
            "servant_infoPro1","servant_infoPro2","servant_infoPro3","servant_infoPro4",
            "wifeexskill_icon","commonview_smalltitlebg",
        ]);
	}

    public initView():void
    {   
        let bg2 = BaseBitmap.create("public_9_bg4");
        bg2.width = 530;
        bg2.height = 542;
        bg2.setPosition(this.viewBg.x + (this.viewBg.width - bg2.width) / 2,5);
        this.addChildToContainer(bg2);

        let bg:BaseBitmap = BaseBitmap.create("wifeexskill_bg");
		bg.x = this.viewBg.x + (this.viewBg.width - bg.width) / 2;
		bg.y = bg2.y+3;
		this.addChildToContainer(bg);

        let skillIcon = BaseBitmap.create("wifeexskill_icon");
        skillIcon.setPosition(bg.x+bg.width/2-skillIcon.width/2,bg.y+21);
        this.addChildToContainer(skillIcon);

         let clip = ComponentManager.getCustomMovieClip("wifeexskill_effect",12,120);
        clip.setPosition(skillIcon.x-12,skillIcon.y-25);
        clip.playWithTime(0);
        clip.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(clip);


        let wifeId = this.param.data.wifeId;
        let servantId = this.param.data.servantId;
        let servantCfg = Config.ServantCfg.getServantItemById(servantId);
        let skillLv = Api.wifeVoApi.getExSkillLevel(wifeId);
        let skillLvStr = LanguageManager.getlocal("wifeExSkill_lv",[String(skillLv)]);
        let nexteffectstr = LanguageManager.getlocal("zhenqifangnotebook"+(skillLv%4+1));
        let nextStr = LanguageManager.getlocal("wifeExSkill_nextlv",[nexteffectstr,"0x21eb39"]);
        let nextneed = (skillLv+1)*Config.WifebaseCfg.exSkill;
        let nextneedstr = LanguageManager.getlocal("wifeExSkill_nextneed",[String(nextneed),"0x21eb39"]);
        let wifeVo = Api.wifeVoApi.getWifeInfoVoById(wifeId);
        if (wifeVo.isExSkillLevelMax())
        {
            nextStr = LanguageManager.getlocal("wifeExSkill_nextlv_max",["0x21eb39"]);
            nextneedstr = LanguageManager.getlocal("wifeExSkill_nextneed_max",["0x21eb39"]);
        }

        let lvText = ComponentManager.getTextField(skillLvStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
        lvText.setPosition(bg.x+bg.width/2-lvText.width/2,skillIcon.y+skillIcon.height+2);
        this.addChildToContainer(lvText);

        let nextText = ComponentManager.getTextField(nextStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        nextText.setPosition(bg.x+bg.width/2-nextText.width/2,lvText.y+lvText.height+5);
        this.addChildToContainer(nextText);

        let nextNeedText = ComponentManager.getTextField(nextneedstr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        nextNeedText.setPosition(bg.x+bg.width/2-nextNeedText.width/2,nextText.y+nextText.height+5);
        this.addChildToContainer(nextNeedText);


        let bg3:BaseBitmap = BaseBitmap.create("newinvitelistbg2");
		bg3.width = 512;
        bg3.height = 256;
        bg3.setPosition(this.viewBg.x + (this.viewBg.width - bg3.width) / 2,bg.y+bg.height+5);
		this.addChildToContainer(bg3);

        let titlebg = BaseBitmap.create("commonview_smalltitlebg");
        titlebg.y = bg3.y+18;
		this.addChildToContainer(titlebg);

        let effectStr = LanguageManager.getlocal("wifeExSkill_effect",[servantCfg.name,String(skillLv)]);
        let effectText = ComponentManager.getTextField(effectStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        effectText.setPosition(bg.x+bg.width/2-effectText.width/2,titlebg.y+titlebg.height/2-effectText.height/2);
        this.addChildToContainer(effectText);

        titlebg.width = effectText.width+120;
        titlebg.x = this.viewBg.x + (this.viewBg.width - titlebg.width) / 2;

        for (let i=1; i<=4; i++)
        {
			let attrbg = BaseBitmap.create("public_9_managebg");
			attrbg.width = 213;
			attrbg.height = 71;//100;
			attrbg.x = bg3.x+290 - i%2*253;
            attrbg.y = bg3.y+70+Math.floor((i-1)/2)*90;
			this.addChildToContainer(attrbg);

			let attrIcon = BaseBitmap.create("servant_infoPro"+i);
			attrIcon.x = attrbg.x-36;
			attrIcon.y = attrbg.y-5;
			this.addChildToContainer(attrIcon);

            let lv = Math.floor(skillLv/4)+ (skillLv%4>=i?1:0);
            let attrNameTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
            attrNameTxt.text = LanguageManager.getlocal("wifeExSkill_book"+i) + "Lv"+ String(lv);
            attrNameTxt.x = attrIcon.x + 72;
            attrNameTxt.y = attrbg.y + 13;
            this.addChildToContainer(attrNameTxt);

            let attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_newui_zizhi" + i,[String(lv)]),20,TextFieldConst.COLOR_BROWN);
			attrTxt.x = attrNameTxt.x+7;
			attrTxt.y = attrNameTxt.y +attrNameTxt.height+7;
            this.addChildToContainer(attrTxt);
        }

    }

    protected getBgExtraHeight():number
	{
		return 10;
	}

}