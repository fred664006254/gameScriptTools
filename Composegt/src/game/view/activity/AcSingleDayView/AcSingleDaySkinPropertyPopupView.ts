class AcSingleDaySkinPropertyPopupView extends PopupView{
    public constructor(){
        super();
    }

    public initView(){
        let skinId = this.param.data.skinId;
        let itemId = this.param.data.itemId;
        
        let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg.width = 530;
        bg.height = this.getShowHeight() - 100;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 10;
		this.addChildToContainer(bg);

        let innerbg:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		innerbg.width = bg.width - 20;
		innerbg.height = 100;
		innerbg.x = bg.x + 10;
		innerbg.y = bg.y + 10 ;
		this.addChildToContainer(innerbg);

        let innerbg2 = BaseBitmap.create("public_tc_bg03");
		innerbg2.width = innerbg.width;
        innerbg2.height = bg.height - 25 - innerbg.height;
		innerbg2.x = innerbg.x;
		innerbg2.y = innerbg.y + innerbg.height + 5 ;
		this.addChildToContainer(innerbg2);

         let titleBg = BaseBitmap.create("rank_biao");
        titleBg.width = innerbg2.width - 20;
        titleBg.x = this.viewBg.width/2 - titleBg.width/2;
        titleBg.y = innerbg2.y + 14;
		this.addChildToContainer(titleBg);

        let listPosY = titleBg.y+titleBg.height+5;

        let proTxt  = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        proTxt.text = LanguageManager.getlocal("acSingleDaySkin_protxt");
        proTxt.x =  titleBg.x + 110; 
        proTxt.y =  titleBg.y + titleBg.height/2 -proTxt.height/2  ;
        this.addChildToContainer(proTxt);

        let valueTxt  = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        valueTxt.text = LanguageManager.getlocal("acSingleDaySkin_provaltxt");
        valueTxt.x = titleBg.x +320; 
        valueTxt.y = proTxt.y ;
        this.addChildToContainer(valueTxt);

        if(itemId){
            let cfg:Config.TitleItemCfg = Config.TitleCfg.getTitleCfgById(itemId);

            let iconNameTxt  = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
            iconNameTxt.text = cfg.name;
            iconNameTxt.x =  innerbg.x + innerbg.width/2 -iconNameTxt.width/2 ;
            iconNameTxt.y =  innerbg.y + innerbg.height/2  - iconNameTxt.height/2  ;
            this.addChildToContainer(iconNameTxt);

            let proLen = 0;
            if(cfg.effect1){
                proLen += 4;
            }
            if(cfg.effect2){
                proLen += 4;
            }
            for (var index = 1; index <= proLen; index++) {
                 if(index % 2 == 1){
                    let probg = BaseBitmap.create("public_tc_bg05");
                    probg.width = 510;
                    probg.height = 40;
                    probg.x = GameConfig.stageWidth /2 - probg.width/2;;
                    probg.y = titleBg.y + 5 + index *40 ;
                    this.addChildToContainer(probg);
                }

                let proTxt2  = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
                if(index <= 4){
                    proTxt2.text = LanguageManager.getlocal("acSingleDaySkin_pro"+index);
                }else{
                    proTxt2.text = LanguageManager.getlocal("acSingleDaySkin_pro"+ (index-4) );
                }
                proTxt2.x =  proTxt.x + proTxt.width/2 - proTxt2.width/2; 
                proTxt2.y =  titleBg.y + 15 + index *40 ;
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
                valueTxt2.x = valueTxt.x + valueTxt.width/2 - valueTxt2.width/2; 
                valueTxt2.y = proTxt2.y ;
                this.addChildToContainer(valueTxt2);
            }
        }else if(skinId){
            let cfg:Config.WifeSkinItemCfg = Config.WifeskinCfg.getWifeCfgById(skinId);

            let skinNameTxt  = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
            skinNameTxt.text = LanguageManager.getlocal("wifeName_" + cfg.wifeId) + " : " + cfg.name;
            skinNameTxt.x =  innerbg.x + innerbg.width/2 -skinNameTxt.width/2 ;
            skinNameTxt.y =  innerbg.y + innerbg.height/2  - skinNameTxt.height/2  ;
            this.addChildToContainer(skinNameTxt);

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
                 if(index % 2 == 1){
                    let probg = BaseBitmap.create("public_tc_bg05");
                    probg.width = 510;
                    probg.height = 40;
                    probg.x = GameConfig.stageWidth /2 - probg.width/2;;
                    probg.y = titleBg.y + 5 + index *40 ;
                    this.addChildToContainer(probg);
                }
                let proTxt2  = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
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

                proTxt2.x =  proTxt.x + proTxt.width/2 - proTxt2.width/2; 
                proTxt2.y =  titleBg.y + 15 + index *40 ;
                this.addChildToContainer(proTxt2);
                valueTxt2.x = valueTxt.x + valueTxt.width/2 - valueTxt2.width/2; 
                valueTxt2.y = proTxt2.y ;
                this.addChildToContainer(valueTxt2);
            }
        }
        if(skinId){
            let tipTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_RED2);
            tipTxt.text = LanguageManager.getlocal("acSingleDaySkin_tip");
            tipTxt.x =  this.viewBg.x + this.viewBg.width/2 - tipTxt.width/2; 
            tipTxt.y =  innerbg2.y + innerbg2.height - 50 ;
            this.addChildToContainer(tipTxt);
        }

    }

    protected getResourceList():string[]{
		return super.getResourceList().concat([
            "rank_biao",
        ]);
    } 
    
    protected getShowHeight()
    {
        return 700;
    }
    
    public dispose():void{   
        super.dispose();
    }
    
}