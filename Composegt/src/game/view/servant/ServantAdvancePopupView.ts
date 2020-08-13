/**
 * 门客资质升级
 * author yanyuling
 * date 2017/11/22
 * @class ServantAdvancePopupView
 */

class ServantAdvancePopupView  extends PopupView
{

	private _nodeContainer:BaseDisplayObjectContainer;
    private _servantId:string;
    private _tipStr:string = "";
	public constructor() {
		super();
	}

	public initView():void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE),this.clvBtntHandlerCallback,this);
        this._servantId = this.param.data;
        let servantObj = Api.servantVoApi.getServantObj(this._servantId);
        let servantLvList = GameConfig.config.servantbaseCfg.servantLvList;

        this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

        let bg:BaseBitmap = BaseBitmap.create("public_9v_bg12");
		bg.width = 520;
		bg.height = 520;//498;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this._nodeContainer.addChild(bg);

        // let bg2:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		// bg2.width = 500;
		// bg2.height = 280;
		// bg2.x = 60
		// bg2.y = 20;
		// this._nodeContainer.addChild(bg2);


        let bg3:BaseBitmap = BaseBitmap.create("public_line4");
		bg3.width = 470;
		// bg3.height = 180;
		bg3.x = this.viewBg.width/2 - bg3.width/2;
		bg3.y = 20 + 280 + 10;
		this._nodeContainer.addChild(bg3);

        let innerbg1:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		innerbg1.width = 236;
		innerbg1.height = 268;
		innerbg1.x = bg.x + 0;
		innerbg1.y = bg.y + 5;
        innerbg1.visible =false;
		this._nodeContainer.addChild(innerbg1);

         let innerbg2:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		innerbg2.width = innerbg1.width;
		innerbg2.height = innerbg1.height;
		innerbg2.x = bg.x + bg.width - 0 - innerbg2.width;//innerbg1.x + 242;
		innerbg2.y = innerbg1.y;
		this._nodeContainer.addChild(innerbg2);
        innerbg2.visible =false;
        
        let servant_arrow:BaseBitmap = BaseBitmap.create("public_greenarrow2");   
		servant_arrow.x = this.viewBg.width/2 - servant_arrow.width/2
		servant_arrow.y = innerbg2.y +  innerbg2.height/2 - servant_arrow.height/2-20;
		this._nodeContainer.addChild(servant_arrow);
        
        
        for (var index = 1; index <= 2; index++) {
            let tmpClv = servantObj.clv + index - 1;
            let tmpcfg = servantLvList[String(tmpClv)] ;
            let tmpNode = innerbg1;
            if (index == 2)
            {
                tmpNode = innerbg2;
            }
            let qualityBg = BaseLoadBitmap.create("servant_cardbg_" + tmpClv);
            qualityBg.width = 194;
            qualityBg.height = 192;
            qualityBg.x = tmpNode.x + tmpNode.width/2 - qualityBg.width/2;
            qualityBg.y = tmpNode.y + 15;
            this._nodeContainer.addChild(qualityBg)
            
            let headIcon = BaseLoadBitmap.create(servantObj.halfImgPath);
            headIcon.width = 180;
            headIcon.height = 177;
            headIcon.x = qualityBg.x + qualityBg.width/2 - headIcon.width/2;
            headIcon.y = qualityBg.y + qualityBg.height -headIcon.height-10 ;
            this._nodeContainer.addChild(headIcon);
            
            
            // if (tmpClv > 0)
            // {
            //     let clvIcon = BaseLoadBitmap.create("servant_adv_icon" + tmpClv);
            //     clvIcon.x = qualityBg.x ;
            //     clvIcon.y = qualityBg.y;
            //     this._nodeContainer.addChild(clvIcon);
            // }
            
            let clvTxt = ComponentManager.getTextField("",24);
            
            let clvStr = LanguageManager.getlocal("servant_clvStr"+tmpClv,);
            let clvColorStr = LanguageManager.getlocal("servant_clvColorTxt"+tmpClv,[clvStr] );
            clvTxt.text = LanguageManager.getlocal("servant_clvTxt1",[ clvColorStr]);
            clvTxt.x = qualityBg.x + qualityBg.width/2 - clvTxt.width/2;
            clvTxt.y = qualityBg.y + qualityBg.height +5; 
            this._nodeContainer.addChild(clvTxt);

            let lvTopTxt = ComponentManager.getTextField("",24);
            let clvColorStr2 = LanguageManager.getlocal("servant_clvColorTxt"+tmpClv,[String(tmpcfg.upLv)] );
            lvTopTxt.text = LanguageManager.getlocal("servant_clvTxt2",[clvColorStr2] );
            lvTopTxt.x = clvTxt.x ;
            lvTopTxt.y = clvTxt.y + clvTxt.height +10;
            lvTopTxt.textColor =TextFieldConst.COLOR_BROWN;
            this._nodeContainer.addChild(lvTopTxt);

        }
        let needItem = servantLvList[String(servantObj.clv+1)].needItem;
        if(needItem)
        {
            let idx = 1;
            for (var key in needItem) {  
               let itemcfg = Config.ItemCfg.getItemCfgById(Number(key));
               
                // let itembg = BaseBitmap.create(itemcfg.iconBg);
                // itembg.width = 108;
                // itembg.height = 106;
                // itembg.x = this.viewBg.x + this.viewBg.width/2 - itembg.width/2  + (idx -2)*180;
                // itembg.y = bg3.y + 25;
                // this._nodeContainer.addChild(itembg);

                // let itemIcon = BaseLoadBitmap.create(itemcfg.icon);
                // itemIcon.width = itemIcon.height = 100;
                // itemIcon.x = itembg.x +itembg.width/2 - itemIcon.width/2 ;
                // itemIcon.y = itembg.y +itembg.height/2 - itemIcon.height/2 ;
                // this._nodeContainer.addChild(itemIcon);
                
                let icon = GameData.getItemIcon(itemcfg,true);
				icon.x = this.viewBg.x + this.viewBg.width/2 - icon.width/2  + (idx -2)*180;
				icon.y = bg3.y + 25;
				// icon.scaleX = icon.scaleY = temScale;
				this._nodeContainer.addChild(icon);

                let itemName = ComponentManager.getTextField(itemcfg.name,22,TextFieldConst.COLOR_BROWN);
                itemName.x = icon.x +icon.width/2 - itemName.width/2 ;
                itemName.y = icon.y +icon.height + 10 ;
                this._nodeContainer.addChild(itemName);

                // let numBg = BaseBitmap.create("public_biaoti2");
                // numBg.width = 136;
                // // numBg.height = 41;
                // numBg.x = itembg.x +itembg.width/2 - numBg.width/2 ;
                // numBg.y = itembg.y +itembg.height + 5 ;
                // this._nodeContainer.addChild(numBg);

                let numTxt = ComponentManager.getTextField("",22);
                
                let ownNum =  Api.itemVoApi.getItemNumInfoVoById(Number(key))
                if (ownNum >=  needItem[key])
                {
                    numTxt.textColor = TextFieldConst.COLOR_WARN_GREEN_NEW;
                }else{
                    numTxt.textColor = TextFieldConst.COLOR_WARN_RED_NEW;
                }
                numTxt.text = ownNum+ "/" + needItem[key];
                numTxt.x = icon.x +icon.width/2 - numTxt.width/2 ;//numBg.x + numBg.width/2 - numTxt.width/2;
                numTxt.y = icon.y +icon.height + 40 ; ;//numBg.y + numBg.height/2 - numTxt.height/2;
                this._nodeContainer.addChild(numTxt);
                if (this._tipStr == "" &&  ownNum <  needItem[key])
                {
                    this._tipStr = LanguageManager.getlocal("servant_clvTipStr");
                    // LanguageManager.getlocal("servant_clvTipStr",[itemcfg.name])
                }
                idx ++ ;
            }
        }

        let clvBtn =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"servant_clvUpBtn",this.clvBtntHandler,this);
        clvBtn.x = bg.x + bg.width/2 - clvBtn.width/2;
        clvBtn.y = bg.y + bg.height + 10;
        this._nodeContainer.addChild(clvBtn);
    }

    private clvBtntHandlerCallback(event:egret.Event)
    {
        let rdata = event.data.data;
        if(rdata.ret == 0)
        {
            ViewController.getInstance().openView(ViewConst.BASE.SERVANTADVANCEVIEW,this._servantId)
            this.hide();
        }else
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("servant_advfailedTip"));
        }
        
    }
    private clvBtntHandler()
    {
        if ( this._tipStr != "")
        {
            App.CommonUtil.showTip( this._tipStr);
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_SERVANT_CHANGE,{servantId:this._servantId});
    }
    public dispose()
	{
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE),this.clvBtntHandlerCallback,this);
        this._nodeContainer = null;
        this._servantId = null;
        this._tipStr = "";
        
        super.dispose();
    }
}