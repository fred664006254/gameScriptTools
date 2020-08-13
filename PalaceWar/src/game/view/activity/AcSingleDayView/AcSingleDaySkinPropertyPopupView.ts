class AcSingleDaySkinPropertyPopupView extends BaseView{
    public constructor(){
        super();
    }

    public initView(){
        let skinId = this.param.data.skinId;
        let titleId = this.param.data.titleId;
        let itemId = this.param.data.itemId;
        
        let bg:BaseBitmap = BaseBitmap.create("public_rule_bg");
		bg.y = GameConfig.stageHeigth/2 -bg.height/2 -30;
		this.addChildToContainer(bg);

        let bg2:BaseBitmap = BaseBitmap.create("public_rule_bg");
        bg2.anchorOffsetX = bg2.width;
        bg2.scaleX = -1;
		bg2.x = GameConfig.stageWidth/2;
		bg2.y = bg.y;
		this.addChildToContainer(bg2);

        let title = BaseBitmap.create("acsingleday_attrtitle");
		title.x = GameConfig.stageWidth/2 - title.width/2;
		title.y = bg.y + 5 ;
		this.addChildToContainer(title);

        let listPosY = bg.y + 60 ;
        if(titleId){
            let cfg:Config.TitleItemCfg = Config.TitleCfg.getTitleCfgById(titleId);

            let iconNameTxt  = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_YELLOW);
            iconNameTxt.text = cfg.name;
            iconNameTxt.x =  bg.x + 70 ;
            iconNameTxt.y =  listPosY  ;
            this.addChildToContainer(iconNameTxt);
            listPosY += 25;

            let attrTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
            attrTxt.text = LanguageManager.getlocal("servant_infoAttr");
            attrTxt.x =  iconNameTxt.x + iconNameTxt.width + 10 ;
            attrTxt.y =  iconNameTxt.y  ;
            this.addChildToContainer(attrTxt);
            
            let proLen = 0;
            if(cfg.effect1){
                proLen += 4;
            }
            if(cfg.effect2){
                proLen += 4;
            }
            for (var index = 1; index <= proLen; index++) {
               
                let proTxt2  = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
                if(index <= 4){
                    proTxt2.text = LanguageManager.getlocal("acSingleDaySkin_pro"+index);
                }else{
                    proTxt2.text = LanguageManager.getlocal("acSingleDaySkin_pro"+ (index-4) );
                }
                 
                if(index % 2 == 0){
                    proTxt2.x = GameConfig.stageWidth /2 + 60;
                }else{
                    proTxt2.x =  iconNameTxt.x  ;
                }
                proTxt2.y =  listPosY + 15 + (Math.ceil(index/2) -1) * 30 ;
                this.addChildToContainer(proTxt2);

                let valueTxt2  = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN);
                if(index <= 4){
                    if(cfg.effect1){
                        valueTxt2.text = "+" + cfg.effect1;
                    }else if(cfg.effect2){
                        valueTxt2.text = "+" + (cfg.effect2 *100) + "%";
                    }
                }else{
                     if(cfg.effect2){
                        valueTxt2.text = "+" + (cfg.effect2 *100) + "%";
                    }
                }
                valueTxt2.x = proTxt2.x + proTxt2.width  + 2;
                valueTxt2.y = proTxt2.y ;
                this.addChildToContainer(valueTxt2);
            }
        }else if(skinId){
            let cfg:Config.WifeSkinItemCfg = Config.WifeskinCfg.getWifeCfgById(skinId);

            let skinNameTxt  = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_YELLOW);
            skinNameTxt.text = LanguageManager.getlocal("wifeName_" + cfg.wifeId) + "  " + cfg.name;
            skinNameTxt.x =  bg.x + 70 ;
            skinNameTxt.y =  listPosY  ;
            this.addChildToContainer(skinNameTxt);
            listPosY += 25;

            let attrTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
            attrTxt.text = LanguageManager.getlocal("servant_infoAttr");
            attrTxt.x =  skinNameTxt.x + skinNameTxt.width + 10 ;
            attrTxt.y =  skinNameTxt.y  ;
            this.addChildToContainer(attrTxt);

            let proLen = 6;
            let keyCfg = [
                cfg.atkAdd,cfg.inteAdd,cfg.politicsAdd,cfg.charmAdd,
                cfg.wifeIntimacy,cfg.wifeGlamour, cfg.childReduce,cfg.searchReduce, cfg.wifeReduce,
            ]
            for (var index = 1; index <= keyCfg.length; index++) {
                let tmpKey = keyCfg[index -1];
                if(!tmpKey){
                    break;
                }
                let proTxt2  = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
                let valueTxt2  = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN);
                if(index <= 4){
                    proTxt2.text = LanguageManager.getlocal("acSingleDaySkin_pro"+index);
                    if(tmpKey[0] == 1){
                        valueTxt2.text = "+" + tmpKey[1];
                    }else if(tmpKey[0] == 2){
                        valueTxt2.text = "+" + (tmpKey[1] *100) + "%";
                    }
                }else{
                    proTxt2.text = LanguageManager.getlocal("acSingleDaySkin_wpro"+index);
                    valueTxt2.text = "+" + tmpKey ;
                }

                if(index % 2 == 0){
                    proTxt2.x = GameConfig.stageWidth /2 + 60;
                }else{
                    proTxt2.x =  skinNameTxt.x  ;
                }
                proTxt2.y =  listPosY + 15 + (Math.ceil(index/2) -1) * 30 ;

                this.addChildToContainer(proTxt2);
                valueTxt2.x = proTxt2.x + proTxt2.width  + 2;
                valueTxt2.y = proTxt2.y ;
                this.addChildToContainer(valueTxt2);
            }
        }else if (itemId){
            let cfg = Config.ItemCfg.getItemCfgById(itemId);
            let iconNameTxt  = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_YELLOW);
            iconNameTxt.text = cfg.name;
            iconNameTxt.x =  bg.x + 70 ;
            iconNameTxt.y =  listPosY  ;
            this.addChildToContainer(iconNameTxt);
            listPosY += 25;

            let attrTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
            attrTxt.text = LanguageManager.getlocal("acSingleDaySkin_proEffect");
            attrTxt.x =  iconNameTxt.x + iconNameTxt.width + 10 ;
            attrTxt.y =  iconNameTxt.y  ;
            this.addChildToContainer(attrTxt);

            let detailTip = ComponentManager.getTextField(cfg.desc, TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
            detailTip.width = GameConfig.stageWidth - 140;
            detailTip.lineSpacing = 7;
            detailTip.setPosition(iconNameTxt.x, iconNameTxt.y + iconNameTxt.height + 10);
            this.addChildToContainer(detailTip);
        }
        if(skinId){
            let tipbg = BaseBitmap.create("public_searchdescbg");
            tipbg.x = this.viewBg.x + this.viewBg.width/2 - tipbg.width/2; 
            tipbg.y = bg.y + bg.height -5 ;
            this.addChildToContainer(tipbg);
            
            let tipTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
            tipTxt.text = LanguageManager.getlocal("acSingleDaySkin_tip");
            tipTxt.x =  this.viewBg.x + this.viewBg.width/2 - tipTxt.width/2; 
            tipTxt.y =  tipbg.y + tipbg.height/2 - tipTxt.height/2 ;
            this.addChildToContainer(tipTxt);
            if(PlatformManager.checkIsEnLang())
            {
                tipbg.width = tipTxt.width + 70;
                tipbg.x = this.viewBg.x + this.viewBg.width/2 - tipbg.width/2; 
                tipbg.y = bg.y + bg.height -5 ;
                tipTxt.x =  this.viewBg.x + this.viewBg.width/2 - tipTxt.width/2; 
                tipTxt.y =  tipbg.y + tipbg.height/2 - tipTxt.height/2 ;
            }
        }
        this.viewBg.addTouchTap(this.hide,this);
    }

    protected getResourceList():string[]{
		return super.getResourceList().concat([
            "acsingleday_attrtitle",
        ]);
    } 
    
    public dispose():void{   
        super.dispose();
    }
    
}