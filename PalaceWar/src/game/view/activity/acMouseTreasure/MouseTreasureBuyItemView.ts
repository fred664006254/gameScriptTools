/**
 * 购买体力
 * author shaoliang
 * @class MouseTreasureBuyItemView
 */
class MouseTreasureBuyItemView  extends PopupView
{   
    private _limittext :BaseTextField = null;
    public constructor() 
	{
		super();
	}

    protected get uiType():string
	{
		return "2";
	}

	protected getFrameName():string
	{
		return "popup_frame1";
	}

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get vo():AcMouseTreasureVo{
        return <AcMouseTreasureVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.MouseTreasureCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    protected getTitleStr():string{
        return "mouseTreasure_buyitemTitle";
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				"popupview_itemsbg","itembg_4"
		]);
	}


    protected initView():void
    {    
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MOUSETREASURE_BUYNUM, this.requestCallback, this);
        let code = this.param.data.uicode;
        let bg:BaseBitmap = BaseBitmap.create("popupview_itemsbg");
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 0;
		this.addChildToContainer(bg);

        let itembg = BaseBitmap.create("itembg_4");
        itembg.setPosition(this.viewBg.x + this.viewBg.width/2 - itembg.width/2,20);
		this.addChildToContainer(itembg);

        let icon1 = BaseLoadBitmap.create(App.CommonUtil.getResByCode("mousetreasure_strengthicon",code));
        icon1.width = 100;
        icon1.height = 100;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,icon1,itembg);
        this.addChildToContainer(icon1);
        let iconBg = itembg;
        let numLb:BaseTextField = ComponentManager.getTextField("1",16,TextFieldConst.COLOR_WHITE);
        let numbg:BaseBitmap = BaseBitmap.create("public_9_itemnumbg");
        numbg.name="numbg";
        numbg.setPosition(iconBg.x+iconBg.width-numbg.width-4,iconBg.y+iconBg.height-numbg.height-4);
        numLb.setPosition(iconBg.x+iconBg.width-numLb.width-12, numbg.y+numbg.height/2-numLb.height/2 );

        this.addChildToContainer(numbg);
        this.addChildToContainer(numLb);

        let nameTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("mouseTreasure_itemname1"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		let namebg = BaseBitmap.create(`public_9_bg95`);
		namebg.width = nameTF.width+80;
		namebg.x = this.viewBg.x + this.viewBg.width/2 - namebg.width/2;
		namebg.y = bg.y+bg.height+ 10;
		this.addChildToContainer(namebg);
		
		nameTF.setColor(TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF, namebg);
		this.addChildToContainer(nameTF);

        let effect = ComponentManager.getTextField(LanguageManager.getlocal("effectTitle"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_BLACK);
		effect.setPosition(64,namebg.y + namebg.height + 10);
		this.addChildToContainer(effect);

        let effectDescTF:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("mouseTreasure_itemdesc1"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
		effectDescTF.lineSpacing=4;
		effectDescTF.x = effect.x+effect.width;
		effectDescTF.y = effect.y;
		effectDescTF.width = this.viewBg.width-effect.x-effect.width-60;
		this.addChildToContainer(effectDescTF);

        let line = BaseBitmap.create("public_cut_line");
		line.x = bg.x + bg.width/2 - line.width/2;
		line.y = effectDescTF.y +effectDescTF.height+ 40;
		this.addChildToContainer(line);

        let curNum = this.vo.buylimit;
        let limittext:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("mouseTreasure_limit",[String(curNum),String(this.cfg.buyLimit)]),
        TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		limittext.setPosition(this.viewBg.width/2-limittext.width/2,line.y+line.height+20);
        this.addChildToContainer(limittext);
        this._limittext= limittext;
        this.resetText();

		let useBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW,"",this.useHandler,this);
		useBtn.x = bg.x + bg.width/2 - useBtn.width/2;
		useBtn.y = limittext.y + 30;
		useBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(useBtn);

        let icon = BaseBitmap.create(`public_icon1`);
        icon.setPosition(40,useBtn.height/2-icon.height/2);
        useBtn.addChild(icon);

        let cost1:BaseTextField=ComponentManager.getTextField(String(this.cfg.cost1),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		cost1.setPosition(95,useBtn.height/2-cost1.height/2);
		useBtn.addChild(cost1);
    }

    private useHandler():void
    {   


        if (!this.vo.isInActivity()) 
        {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }       
        if (this.vo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }  
        if (this.vo.buylimit >= this.cfg.buyLimit)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("mouseTreasure_buyTip2"));
            return;
        }   

        let haveNumber= Api.playerVoApi.getPlayerGem();
        let cost = this.cfg.cost1;
        if(haveNumber < cost)
        {
            let message: string = LanguageManager.getlocal("findsame_game_notbuy");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                msg : message,
                title : "itemUseConstPopupViewTitle",
                touchMaskClose : true,
                callback : ()=>
                {
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW, {rechargeId: cost});
                },
                handler : this,
                needClose : 1,
                needCancel : true
            });
            return;
        }

        NetManager.request(NetRequestConst.REQUEST_MOUSETREASURE_BUYNUM, 
        {
            activeId: this.param.data.aid + "-" + this.param.data.code,
            isTenPlay: 0
        });
    }

    protected getBgExtraHeight():number
	{
		return 25;
	}

    private requestCallback(evt:egret.Event):void{
        if (!evt.data.ret){
            return;
        }
        App.CommonUtil.showTip(LanguageManager.getlocal("mouseTreasure_buyTip1"));
        this.resetText();
    }

    private resetText():void
    {
        let curNum = this.cfg.buyLimit - this.vo.buylimit;
        if (curNum>0)
        {
            this._limittext.text = LanguageManager.getlocal("mouseTreasure_limit",[String(curNum),String(this.cfg.buyLimit)]);
        }
        else
        {
            this._limittext.text = LanguageManager.getlocal("mouseTreasure_limit2",[String(curNum),String(this.cfg.buyLimit)]);
        }        
    }

    public dispose():void
    {   
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MOUSETREASURE_BUYNUM, this.requestCallback, this);  
        this._limittext = null;

        super.dispose();
    }
}