class AcAskGodSkinRewardScrollItem extends ScrollListItem {
    private _aid:string = null;
    private _code:string = null;
    private _data:Config.AcCfg.AskGodShopItem=null;

    public constructor() {
        super();
    }

    private get vo():AcAskGodVo{
        return <AcAskGodVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.AskGodCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get code():string{
        return this._code;
    }

    private get aid():string{
        return this._aid;
    }

    private get typeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }
    
    protected initItem(index: number, data: any, itemParam: any) {
        this._aid = itemParam.aid;
        this._code = itemParam.code;

        //item bg
        let bg = BaseBitmap.create("acaskgod_exchangebg-"+this.typeCode);
        this.addChild(bg);
 
        this.width = bg.width;
        this.height = bg.height;

        let thisData = data as Config.AcCfg.AskGodShopItem;
        this._data = thisData;
        let type = parseInt(thisData.getReward.split("_")[0]);
        let id = parseInt(thisData.getReward.split("_")[1]);
        let num = parseInt(thisData.getReward.split("_")[2]);

        let titleTxtStr = LanguageManager.getlocal("");
        let icon:egret.DisplayObject = null;
        let imgstr = "";
        let tipStr = "";
        let title = "";

        let rewardsArr:Array<RewardItemVo> = GameData.formatRewardItem(thisData.getReward);
        icon = GameData.getItemIcon(rewardsArr[0],true);
        if(type == 6)
        {
            let itemConfig=Config.ItemCfg.getItemCfgById(id);

            let getStr = itemConfig.getRewards;
            if(getStr && getStr.split("_")[0] == "19")
            {
                let itemSerCfg = Config.ServantskinCfg.getServantSkinItemById(getStr.split("_")[1]);
                let servantid = itemSerCfg.servantId;
                let servantCfg = Config.ServantCfg.getServantItemById(servantid);
                titleTxtStr = LanguageManager.getlocal("acAskGodExchangeItemTitle-"+this.typeCode,[itemSerCfg.name]);
                title = itemSerCfg.name;
            
                // icon = BaseBitmap.create(itemSerCfg.body);
                // icon.scaleX = icon.scaleY = 0.45;

                // icon = itemConfig.getIconContainer();

                // imgstr = "acaskgod_servantbg";

                // if(Api.servantVoApi.isOwnSkinOfSkinId(id+""))
                // {
                //     tipStr = "acAskGodExchangeTips3";
                // }
            }else
            {
                titleTxtStr = LanguageManager.getlocal("acAskGodExchangeItemTitle-"+this.typeCode,[itemConfig.name]);
                title = itemConfig.name;
                // icon = itemConfig.getIconContainer();
                // imgstr = "acaskgod_servantbg";
            }
        }else if(type == 11)
        {
            let itemCfg=Config.TitleCfg.getTitleCfgById(id);
            titleTxtStr = LanguageManager.getlocal("acAskGodExchangeItemTitle-"+this.typeCode,[itemCfg.name]);
            title = itemCfg.name;

            // icon = itemCfg.getIconContainer();
            // imgstr = "acaskgod_servantbg";
        }else if(type == 16)
        {
            let itemCfg = Config.WifeskinCfg.getWifeCfgById(id);
            let wifeid = itemCfg.wifeId;
            let wifeCfg = Config.WifeCfg.getWifeCfgById(wifeid);
            titleTxtStr = LanguageManager.getlocal("acAskGodExchangeItemTitle-"+this.typeCode,[itemCfg.name]);
            title = itemCfg.name;
        
            // icon = BaseBitmap.create(itemCfg.body);
            // icon.scaleX = icon.scaleY = 0.23;
            // imgstr = "acaskgod_wifebg";

            // if(Api.wifeSkinVoApi.isOwnSkinOfSkinId(id))
            // {
            //     tipStr = "acAskGodExchangeTips4";
            // }
        }else if(type == 19)
        {
            let itemCfg = Config.ServantskinCfg.getServantSkinItemById(id);
            let servantid = itemCfg.servantId;
            let servantCfg = Config.ServantCfg.getServantItemById(servantid);
            titleTxtStr = LanguageManager.getlocal("acAskGodExchangeItemTitle-"+this.typeCode,[itemCfg.name]);
            title = itemCfg.name;
        
            // icon = BaseBitmap.create(itemCfg.body);
            // icon.scaleX = icon.scaleY = 0.45;

            // imgstr = "acaskgod_servantbg";

            // if(Api.servantVoApi.isOwnSkinOfSkinId(id+""))
            // {
            //     tipStr = "acAskGodExchangeTips3";
            // }
        }

        // if(imgstr)
        // {
        //     let img = BaseBitmap.create(imgstr);
        //     img.x = this.width/2 - img.width/2;
        //     img.y = 20;
        //     this.addChild(img);
        // }

        if(icon)
        {
            icon.x = this.width/2 - icon.width*icon.scaleX/2;
            icon.y = this.height/2 - icon.height*icon.scaleY/2 - 15;
            this.addChild(icon);
        }

        let titleTxt = ComponentManager.getTextField(title, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        titleTxt.x = this.width/2 - titleTxt.width/2;
        titleTxt.y = bg.y + 13;
        this.addChild(titleTxt);

        // let bot = BaseBitmap.create("acaskgod_maskbg");
        // bot.x = this.width/2 - bot.width/2;
        // bot.y = bg.y + bg.height - 115;
        // this.addChild(bot);

        // if(tipStr)
        // {
        //     let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(tipStr), 16, TextFieldConst.COLOR_WARN_GREEN);
        //     tipTxt.x = this.width/2 - tipTxt.width/2;
        //     tipTxt.y = bot.y + bot.height/2 - tipTxt.height/2 + 3;
        //     this.addChild(tipTxt);
        // }
        
        let btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "", () => 
        {
            if ((!this.vo.isStart))
            {
                this.vo.showAcEndTip();
                return;
            }
            let times = this.vo.getExchangeTimes(thisData.id+"");
            if(times < thisData.limitTime)
            {
                if(Api.itemVoApi.getItemNumInfoVoById(thisData.needItem) >= thisData.needNum)
                {
                    NetManager.request(NetRequestConst.REQUEST_ACASKGOD_SHOPEXCHANGE, { activeId: this.vo.aidAndCode, shopId: data.id}); 
                }else
                {
                    let message: string = LanguageManager.getlocal("acAskGodExchangeNotEnough");
                    ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                        msg : message,
                        title : "itemUseConstPopupViewTitle",
                        touchMaskClose : true,
                        callback : ()=>
                        {
                            ViewController.getInstance().hideView(ViewConst.POPUP.ACASKGODSKINREWARDPOPVIEW);
                        },
                        handler : this,
                        needClose : 1,
                        needCancel : true
                    });                    
                }
            }else
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("acAskGodExchangeTimesNotEnough"));
            }
        }, this);
        btn.x = this.width/2 - btn.width*btn.scaleX/2;
        btn.y = bg.y+bg.height-btn.height*btn.scaleY-15;
        this.addChild(btn);

        let times = this.vo.getExchangeTimes(thisData.id+"");
        if(times >= thisData.limitTime)
        {
            btn.setGray(true);
        }else
        {
            btn.setGray(false);
        }

        let needItemCfg = Config.ItemCfg.getItemCfgById(thisData.needItem);
        let needIcon = BaseBitmap.create(needItemCfg.icon);
        needIcon.setScale(0.45);
        needIcon.x = 20;
        needIcon.y = btn.height/2 - needIcon.height*needIcon.scaleY/2;
        btn.addChild(needIcon);

        let numTxt = ComponentManager.getTextField(String(thisData.needNum), 22,TextFieldConst.COLOR_BROWN);
        numTxt.x = needIcon.x + needIcon.width*needIcon.scaleX + 10;
        numTxt.y = btn.height/2 - numTxt.height/2;
        btn.addChild(numTxt);

        let detailImg = ComponentManager.getButton("servant_info_detail","",this.showDetail,this);
        detailImg.setScale(0.7);
        detailImg.setPosition(bg.width-detailImg.width*detailImg.scaleX,0);
        this.addChild(detailImg);

        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsRuLang()){
            detailImg.y = 35;
        }

        if(icon)
        {
            let flagImg = BaseBitmap.create("acaskgod_flag");
            flagImg.setPosition(icon.x,icon.y+4);
            this.addChild(flagImg);

            if(thisData.showTag == 1)
            {
                let effect = ComponentManager.getCustomMovieClip("acaskgodexchangeeff", 15, 70);
                effect.setPosition(flagImg.x-11,flagImg.y-11);
                this.addChild(effect);
                effect.playWithTime(0);
            }

            let left = thisData.limitTime - this.vo.getExchangeTimes(thisData.id+"");
            let tipTimesTxt = ComponentManager.getTextField(LanguageManager.getlocal("acAskGodExchangeTips5",[left+""]), 16, TextFieldConst.COLOR_LIGHT_YELLOW);
            tipTimesTxt.x = flagImg.x + 4;
            tipTimesTxt.y = flagImg.y + flagImg.height/2 - tipTimesTxt.height/2;
            this.addChild(tipTimesTxt);        
        }
    }

    private showDetail():void
    {
        let data = this._data;

        let type = parseInt(data.getReward.split("_")[0]);
        let id = parseInt(data.getReward.split("_")[1]);

        let needItemCfg = Config.ItemCfg.getItemCfgById(data.needItem);

        if(type == 6)
        {
            let itemCfg=Config.ItemCfg.getItemCfgById(id);
            let getStr = itemCfg.getRewards;
            if(getStr && getStr.split("_")[0] == "19")
            {          
                let wifeBg = "previewbg_servantskin";
                let wifeType = Config.ServantskinCfg.formatRewardItemVoStr(getStr.split("_")[1]);
                let wifeCfg = Config.ServantskinCfg.getServantSkinItemById(getStr.split("_")[1]);
                let cfg = Config.ServantCfg.getServantItemById(wifeCfg.servantId);
                let adata = {data:[
                    {idType:wifeType, topMsg:LanguageManager.getlocal("acAskGodTopMsg",[data.needNum+"",needItemCfg.name,wifeCfg.name+"-"+cfg.name]), bgName:wifeBg, scale:0.8},
                ]};
                ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, adata); 
            }else
            {
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW,id);
            }
        }else if(type == 8)
        {
            let wifeBg = "previewbg_servantskin";
            let wifeType = Config.ServantCfg.formatRewardItemVoStr(id);
            let wifeCfg = Config.ServantCfg.getServantItemById(id);
            let adata = {data:[
                {idType:wifeType, topMsg:LanguageManager.getlocal("acAskGodTopMsg",[data.needNum+"",needItemCfg.name,wifeCfg.name]), bgName:wifeBg, scale:0.8},
            ]};
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, adata);             
        }else if(type == 10)
        {
            let wifeBg = "acthrowarrowview_wifeskinbg";
            let wifeType = Config.WifeCfg.formatRewardItemVoStr(id);
            let wifeCfg = Config.WifeCfg.getWifeCfgById(id);
            let adata = {data:[
                {idType:wifeType, topMsg:LanguageManager.getlocal("acAskGodTopMsg",[data.needNum+"",needItemCfg.name,wifeCfg.name]), bgName:wifeBg, scale:0.6},
            ]};
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, adata);             
        }else if(type == 11)
        {
            let rewardsArr:Array<RewardItemVo> = GameData.formatRewardItem(this._data.getReward);
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW,rewardsArr[0]);
        }else if(type == 16)
        {
            let wifeBg = "acthrowarrowview_wifeskinbg";
            let wifeType = Config.WifeskinCfg.formatRewardItemVoStr(id);
            let wifeCfg = Config.WifeskinCfg.getWifeCfgById(id);
            let cfg = Config.WifeCfg.getWifeCfgById(wifeCfg.wifeId);
            let adata = {data:[
                {idType:wifeType, topMsg:LanguageManager.getlocal("acAskGodTopMsg",[data.needNum+"",needItemCfg.name,wifeCfg.name+"-"+cfg.name]), bgName:wifeBg, scale:0.6},
            ]};
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, adata);            
        }else if(type == 19)
        {
            let wifeBg = "previewbg_servantskin";
            let wifeType = Config.ServantskinCfg.formatRewardItemVoStr(id);
            let wifeCfg = Config.ServantskinCfg.getServantSkinItemById(id);
            let cfg = Config.ServantCfg.getServantItemById(wifeCfg.servantId);
            let adata = {data:[
                {idType:wifeType, topMsg:LanguageManager.getlocal("acAskGodTopMsg",[data.needNum+"",needItemCfg.name,wifeCfg.name+"-"+cfg.name]), bgName:wifeBg, scale:0.8},
            ]};
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, adata);             
        }       
    }

    public getSpaceX(): number {
        return 0;
    }
	/**
	 * 不同格子Y间距
	 */
    public getSpaceY(): number {
        return 5;
    }
    
    public dispose(): void {
        this._aid = null;
        this._code = null;
        super.dispose();
    }
}