/**
 * 神器属性详情
 * author shaoliang
 * date 2019/8/6
 * @class WeaponAttrDetailsPopupView
 */

class WeaponAttrDetailsPopupView  extends PopupView
{
    private _weaponId:string=null;
    private _weaponVo:WeaponInfoVo = null;
    private _weaponCfg:Config.ServantWeaponItemCfg = null;
    private _container:BaseDisplayObjectContainer =null;

    private _scrollview:ScrollView = null;

    private _lookPromationText:BaseTextField = null;
 
    public constructor() 
    {
		super();
	}

    protected getCloseBtnName():string 
    {
         return "sharepopupview_closebtn";   
    }
 	protected getBgName():string
    {
         return "servant_detailsbg";   
    }

    protected getTitleStr():string
	{
        return null;
    } 

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"servant_detailsbg",
			"weapon_attrinfo_bg",
			"servant_namebg2",
			"servant_fl",
			"servant_detailstitles",
			"servant_detailsline",
			"servant_detailsfontbg",
			"weapon_attrinfo_title", 
			"sharepopupview_closebtn",
            "weapon_attrinfo_line1","weapon_attrinfo_line2",
            "weapon_diamond"
		]);
	}

    protected initView():void
    {
        // this.resetBgSize();
    }

    protected resetBgSize():void
    { 

        this.viewBg.height = 810;
        this.viewBg.x= (this.width-this.viewBg.width)*0.5;
        this.viewBg.y= (this.height-this.viewBg.height)*0.5;
        if(GameConfig.stageHeigth>960)
        {
            this.viewBg.y = (GameConfig.stageHeigth - this.viewBg.height+60)*0.5;
        } 
        this._container = new BaseDisplayObjectContainer();
        // this._container.setPosition(60,this.viewBg.y+45);
        // this.addChild(this._container);
        let rect = new egret.Rectangle();
        rect.setTo(0,0,520,707);
        let scrollView = ComponentManager.getScrollView(this._container,rect);
        scrollView.x = 60;
        scrollView.y = this.viewBg.y+35;
        scrollView.horizontalScrollPolicy = "off";
        this.addChild(scrollView);
        
        this.closeBtn.x =this.closeBtn.x -20;
        this.closeBtn.y =this.viewBg.y-30;

        this._weaponId = this.param.data.id;
        this._weaponVo = Api.weaponVoApi.getWeaponInfoVoById(this._weaponId);
        this._weaponCfg = Config.ServantweaponCfg.getWeaponItemById(this._weaponId);

        let itemBg:BaseBitmap = BaseBitmap.create("weapon_attrinfo_bg");
		itemBg.width = 520;
		itemBg.height = 202; 
		this._container.addChild(itemBg); 

        //翅膀
        let titlefont2:BaseBitmap = BaseBitmap.create("servant_detailstitles"); 
		this.addChildToContainer(titlefont2);

        let titlefont:BaseBitmap = BaseBitmap.create("weapon_attrinfo_title"); 
        titlefont.x = (this.width-titlefont.width)*0.5;
        titlefont.y = this.viewBg.y-titlefont.height+40;
		this.addChildToContainer(titlefont); 

        titlefont2.width = 520;
        titlefont2.x = 60
        titlefont2.y = titlefont.y+5;  

        var picName:string = this._weaponCfg.icon; 
        var weapon =  BaseLoadBitmap.create(picName);
        weapon.setScale(0.55); 
        weapon.x = 10;
        weapon.y = 5;
        this._container.addChild(weapon);
        
         //人物名称
        let penameTxt=  ComponentManager.getTextField(this._weaponCfg.name,26,0x3f1f10);
        penameTxt.y = 20;   
        this._container.addChild(penameTxt); 

        let flimg:BaseBitmap = BaseBitmap.create("servant_fl")  
        flimg.x = 210;
        flimg.y = penameTxt.y+5;
		this._container.addChild(flimg);
        penameTxt.x = flimg.x+flimg.width+10;

        let flimg2:BaseBitmap = BaseBitmap.create("servant_fl")  
        flimg2.x = penameTxt.x+penameTxt.width+10;
        flimg2.y = flimg.y;
		this._container.addChild(flimg2);

        
         //神器详情
        let peDesTxt=  ComponentManager.getTextField(LanguageManager.getlocal("weapon_pesc_"+this._weaponId),20,TextFieldConst.COLOR_BROWN);
        peDesTxt.x = flimg.x;
        peDesTxt.y = 60;
        peDesTxt.width = 300;
        peDesTxt.lineSpacing = 5;
        this._container.addChild(peDesTxt);

        //线条
        for(var i:number=0;i<1;i++)
        {
            var lineBit= BaseBitmap.create("servant_detailsline");
            lineBit.x =peDesTxt.x;
            lineBit.y = 82+i*25;
            this._container.addChild(lineBit);
        }

         //神器描述
        let weaponDesc =  ComponentManager.getTextField(this._weaponCfg.desc,20,0x775108);
        weaponDesc.x = 210;
        weaponDesc.y = peDesTxt.y+peDesTxt.height+16;
        weaponDesc.width = 300;
        weaponDesc.lineSpacing = 5;
        this._container.addChild(weaponDesc);

        //神器属性
        let desFontBg1:BaseBitmap = BaseBitmap.create("servant_detailsfontbg");
		desFontBg1.width = 520; 
        desFontBg1.height = 114;
        desFontBg1.y = itemBg.y+itemBg.height+25;
		this._container.addChild(desFontBg1);

        let namebg1:BaseBitmap = BaseBitmap.create("servant_namebg2"); 
        namebg1.y = desFontBg1.y-13;
        namebg1.width =236;
        namebg1.x = (desFontBg1.width - namebg1.width)*0.5; 
        this._container.addChild(namebg1); 

        let title1 =  ComponentManager.getTextField(LanguageManager.getlocal("weapon_attr"),TextFieldConst.FONTSIZE_CONTENT_SMALL,0x943e0d);
        title1.x = namebg1.x +(namebg1.width - title1.width)*0.5; 
        title1.y = namebg1.y+(namebg1.height- title1.height)*0.5;
        this._container.addChild(title1);

        let flower11:BaseBitmap = BaseBitmap.create("servant_fl") ;
        flower11.x = 6;
        flower11.y = desFontBg1.y+27;
        this._container.addChild(flower11);

        let attrTotal = ComponentManager.getTextField(LanguageManager.getlocal("servant_newui_attr0",[String(this._weaponVo.total)]),
        TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        attrTotal.x = flower11.x+flower11.width+3; 
        attrTotal.y = desFontBg1.y+25;
        this._container.addChild(attrTotal);

        for (let i = 1; i<=4; i++)
        {
            let oneAttr = ComponentManager.getTextField(LanguageManager.getlocal("servant_newui2_attr"+i,[String(this._weaponVo.attr[i-1])]),
            TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BROWN);
            oneAttr.x = 50 + Math.floor((i-1)%2)*200; 
            oneAttr.y = attrTotal.y+4+Math.ceil(i/2)*27;
            this._container.addChild(oneAttr);
        }

        //神器特性
        let posY = desFontBg1.y+ desFontBg1.height+26;

        let desFontBg2:BaseBitmap = BaseBitmap.create("servant_detailsfontbg");
		desFontBg2.width = 520; 
        desFontBg2.height = 275;
        desFontBg2.y = posY;
		this._container.addChild(desFontBg2);

        let namebg2:BaseBitmap = BaseBitmap.create("servant_namebg2"); 
        namebg2.y = desFontBg2.y-13;
        namebg2.width =236;
        namebg2.x = (desFontBg2.width - namebg1.width)*0.5; 
        this._container.addChild(namebg2); 

        let title2 =  ComponentManager.getTextField(LanguageManager.getlocal("weapon_speciality"),TextFieldConst.FONTSIZE_CONTENT_SMALL,0x943e0d);
        title2.x = namebg2.x +(namebg2.width - title2.width)*0.5; 
        title2.y = namebg2.y+(namebg2.height- title2.height)*0.5;
        this._container.addChild(title2);

        

        //机缘特性
        let flower12:BaseBitmap = BaseBitmap.create("servant_fl") ;
        flower12.x = 6;
        flower12.y = desFontBg2.y+27;
        this._container.addChild(flower12);

        let attribute3 = ComponentManager.getTextField(LanguageManager.getlocal("weapon_attribute3",[String(this._weaponVo.total)]),
        TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        attribute3.x = flower12.x+flower12.width+3; 
        attribute3.y = desFontBg2.y+25;
        this._container.addChild(attribute3);

        for (let i = 1; i<=1; i++)
        {
            let oneSpeciality = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_WARN_YELLOW2);
            let str = LanguageManager.getlocal("weapon_attribute_type"+i+"_power"+this._weaponCfg.attributeType1,[String(this._weaponVo.getAttributeValueByType(i))]);
            let vo = <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_THREEKINGDOMS);
            // str+=(vo?LanguageManager.getlocal("weapon_attribute_status1"):LanguageManager.getlocal("weapon_attribute_status2"));
            oneSpeciality.text = str;
            oneSpeciality.x = 130; 
            oneSpeciality.y = attribute3.y+(i-1)*27+2;
            this._container.addChild(oneSpeciality);
        }


        let flower13:BaseBitmap = BaseBitmap.create("servant_fl") ;
        flower13.x = 6;
        flower13.y = attribute3.y+33;
        this._container.addChild(flower13);

        let attr1 =  ComponentManager.getTextField(LanguageManager.getlocal("weapon_attribute1"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        attr1.x = flower12.x+flower12.width+3; 
        attr1.y = flower13.y-2;
        this._container.addChild(attr1);

        for (let i = 5; i<=8; i++)
        {   
            let oneSpeciality = ComponentManager.getTextField(LanguageManager.getlocal("weapon_speciality2_"+i,[String(this._weaponVo.getSpecialityByType(i))]),
            TextFieldConst.FONTSIZE_ACTIVITY_COMMON,0xe16a32);
            oneSpeciality.x = 130; 
            oneSpeciality.y = attr1.y+(i-5)*27+2;
            this._container.addChild(oneSpeciality);
        }

        let flower14:BaseBitmap = BaseBitmap.create("servant_fl") ;
        flower14.x = 6;
        flower14.y = attr1.y+113;
        this._container.addChild(flower14);

        let attr2 =  ComponentManager.getTextField(LanguageManager.getlocal("weapon_attribute2"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        attr2.x = flower12.x+flower12.width+3; 
        attr2.y = flower14.y-2;
        this._container.addChild(attr2);

        for (let i = 1; i<=4; i++)
        {   
            let oneSpeciality = ComponentManager.getTextField(LanguageManager.getlocal("weapon_speciality2_"+i,[String(this._weaponVo.getSpecialityByType(i))]),
            TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BROWN);
            oneSpeciality.x = 130; 
            oneSpeciality.y = attr2.y+(i-1)*27+2;
            this._container.addChild(oneSpeciality);
        }

        //神器提升引导
         posY = desFontBg2.y+ desFontBg2.height+26;
        let desFontBg3:BaseBitmap = BaseBitmap.create("servant_detailsfontbg");
		desFontBg3.width = 520; 
        desFontBg3.height = 688;
        desFontBg3.y = posY;
		this._container.addChild(desFontBg3);

        let namebg3:BaseBitmap = BaseBitmap.create("servant_namebg2"); 
        namebg3.y = desFontBg3.y-8-5;
        namebg3.width =236;
        namebg3.x = (desFontBg3.width - namebg3.width)*0.5; 
        this._container.addChild(namebg3); 

        let fontTxt1 =  ComponentManager.getTextField(LanguageManager.getlocal("weapon_popdesfont"),TextFieldConst.FONTSIZE_CONTENT_SMALL,0x943e0d);
        fontTxt1.x = namebg3.x +(namebg3.width - fontTxt1.width)*0.5; 
        fontTxt1.y = 1+namebg3.y+(namebg3.height- fontTxt1.height)*0.5;
        this._container.addChild(fontTxt1);

        let flower1:BaseBitmap = BaseBitmap.create("servant_fl")  
        flower1.x = 6;
        flower1.y = desFontBg3.y+29;
        this._container.addChild(flower1);

        let popName1 = ComponentManager.getTextField(LanguageManager.getlocal("weapon_pop_name1"),
        TextFieldConst.FONTSIZE_CONTENT_SMALL,0x3f1f10);
        popName1.setPosition(flower1.x+flower1.width+3,flower1.y - 2);
        this._container.addChild(popName1);

        let popeDesc1 = ComponentManager.getTextField(LanguageManager.getlocal("weapon_pop_desc1",[String(this._weaponCfg.getMaxLv())]),
            TextFieldConst.FONTSIZE_CONTENT_SMALL,0x775108);
        popeDesc1.width = 485;
        popeDesc1.lineSpacing= 6;
        popeDesc1.setPosition(popName1.x,popName1.y+popName1.height+8);
        this._container.addChild(popeDesc1);

        let line1 = BaseBitmap.create("public_line1");
        line1.setPosition(flower1.x,popeDesc1.y+popeDesc1.height+10);
        this._container.addChild(line1);

        let flower2:BaseBitmap = BaseBitmap.create("servant_fl")  
        flower2.x = 6;
        flower2.y = line1.y+16;
        this._container.addChild(flower2);

        let popName2 = ComponentManager.getTextField(LanguageManager.getlocal("weapon_pop_name2"),
        TextFieldConst.FONTSIZE_CONTENT_SMALL,0x3f1f10);
        popName2.setPosition(popName1.x,flower2.y - 2);
        this._container.addChild(popName2);

        let popeDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("weapon_pop_desc2",[String(this._weaponCfg.getMaxPromotionLv())]),
            TextFieldConst.FONTSIZE_CONTENT_SMALL,0x775108);
        popeDesc2.width = 485;
        popeDesc2.lineSpacing= 6;
        popeDesc2.setPosition(popName2.x,popName2.y+popName2.height+8);
        this._container.addChild(popeDesc2);

        posY = popeDesc2.y+popeDesc2.height+10;
        let cellheght = 218;

        let attrTab = [
            ["5","6","7","8","1"],
            ["5","6","7","8","2"],
            ["5","6","7","8","3"],
            ["5","6","7","8","4"]
        ];

        if (this._weaponCfg.attributeType1 == 2 || this._weaponCfg.attributeType1 == 5)
        {
            attrTab[1].splice(0,0,"a"+this._weaponCfg.attributeType1);
        }
        else
        {
            attrTab[0].splice(0,0,"a"+this._weaponCfg.attributeType1);
        }

        for (let i = 0 ; i<4; i++)
        {   
            let oneNode = new BaseDisplayObjectContainer();
            oneNode.setPosition(8+i%2*256,posY + Math.floor(i/2)*(cellheght+7));
            this._container.addChild(oneNode);

            let onebg = BaseBitmap.create("public_9_bg78");
            onebg.width = 250;
            onebg.height = cellheght;
            oneNode.addChild(onebg);

            let oneIcon = BaseBitmap.create("weapon_infopro"+(i+1));
            oneIcon.setPosition(18,12);
           

            let onenamebg = BaseBitmap.create("weapon_star_bg");
            onenamebg.height = 30
            onenamebg.width = 134;
            onenamebg.setPosition(oneIcon.x+oneIcon.width-14,oneIcon.y+oneIcon.height/2-onenamebg.height/2);
            oneNode.addChild(onenamebg);

             oneNode.addChild(oneIcon);

            let oneName = ComponentManager.getTextField(LanguageManager.getlocal("weapon_speciality_name"+(i+1)),
            TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
            oneName.setPosition(onenamebg.x+20,oneIcon.y+oneIcon.height/2-oneName.height/2);
            oneNode.addChild(oneName);
            onenamebg.width = oneName.width+40;

            // let oneDesc = ComponentManager.getTextField(LanguageManager.getlocal("weapon_speciality_desc"+(i+1)),
            // 18,TextFieldConst.COLOR_BROWN);
            // oneDesc.width = 200;
            // oneDesc.lineSpacing =5;
            // oneDesc.setPosition(20,oneIcon.y+oneIcon.height+6);
            // oneNode.addChild(oneDesc);

            let colorArray1 = ["1","2","3","4"];
            let colorArray2 = ["5","6","7","8"];

            for (let j = 0; j<attrTab[i].length; j++)
            {   
                let diamond = BaseBitmap.create("weapon_diamond");
                diamond.setPosition(25,oneIcon.y+oneIcon.height+6+j*22);
                oneNode.addChild(diamond);
                
                let v = attrTab[i][j];
                let oneSpeciality = ComponentManager.getTextField(LanguageManager.getlocal("weapon_speciality_type_"+v),18);
                if (GameData.isInArray(v,colorArray1))
                {
                    oneSpeciality.textColor = TextFieldConst.COLOR_BROWN;
                }
                else if (GameData.isInArray(v,colorArray2))
                {
                    oneSpeciality.textColor = 0xe16a32;
                }
                else
                {
                    oneSpeciality.textColor = TextFieldConst.COLOR_WARN_YELLOW2;
                }
                oneSpeciality.x = diamond.x+diamond.width+5; 
                oneSpeciality.y = diamond.y+5-oneSpeciality.height/2;
                oneNode.addChild(oneSpeciality);
            }
        }

        this._lookPromationText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN2);   
        this._lookPromationText.width = desFontBg3.width;
        this._lookPromationText.textAlign = egret.HorizontalAlign.CENTER;
        let lineStr = LanguageManager.getlocal("weapon_line_text");
        this._lookPromationText.textFlow = new Array<egret.ITextElement>(
			{ text: lineStr, style: { "underline": true} }
		);
        this._lookPromationText.setPosition(0,posY+cellheght*2+20);
        this._lookPromationText.addTouchTap(this.clickLookPromation,this,[]);
        this._container.addChild(this._lookPromationText);

        let line2 = BaseBitmap.create("public_line1");
        line2.setPosition(line1.x,this._lookPromationText.y+this._lookPromationText.height+12);
        this._container.addChild(line2);

        let flower3:BaseBitmap = BaseBitmap.create("servant_fl")  
        flower3.x = 6;
        flower3.y = line2.y+16;
        this._container.addChild(flower3);

        let popName3 = ComponentManager.getTextField(LanguageManager.getlocal("weapon_pop_name3"),
        TextFieldConst.FONTSIZE_CONTENT_SMALL,0x3f1f10);
        popName3.setPosition(popName1.x,flower3.y - 2);
        this._container.addChild(popName3);

        let popeDesc3 = ComponentManager.getTextField(LanguageManager.getlocal("weapon_pop_desc3",[String(this._weaponCfg.getMaxSoulLv())]),
            TextFieldConst.FONTSIZE_CONTENT_SMALL,0x775108);
        popeDesc3.width = 485;
        popeDesc3.lineSpacing= 6;
        popeDesc3.setPosition(popName3.x,popName3.y+popName3.height+8);
        this._container.addChild(popeDesc3);

        desFontBg3.height = popeDesc3.y+popeDesc3.height+ 20 - desFontBg3.y;


        let descTipTxt =  ComponentManager.getTextField(LanguageManager.getlocal("weapon_storyTip"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        descTipTxt.x =  (this.viewBg.width - descTipTxt.width);
        descTipTxt.y =  this.viewBg.y + this.viewBg.height-12;
        this.addChildToContainer(descTipTxt);

        if (this.param.data.showAttr)
        {
            scrollView.setScrollTop(830);
        }
    }

    private clickLookPromation(evt:egret.Event):void
    {
        ViewController.getInstance().openView(ViewConst.POPUP.WEAPONPROMATIONLISTPOPUPVIEW,this._weaponVo.id);
    }

    protected getShowHeight():number
	{
		return 880;
    }
    
    protected isShowOpenAni():boolean{
        return false;
    }

    public dispose():void
	{
		this._weaponId = null;
        this._container = null;
        this._scrollview = null;
        this._lookPromationText = null;

		super.dispose();

	}
}