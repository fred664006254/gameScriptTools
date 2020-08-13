/**
 * 门客新UI 上部2 
 * 门客衣装
 * author shaoliang
 * date 2019/7/30
 * @class ServantNewUITopNode2
 */

class ServantNewUITopNode2 extends BaseDisplayObjectContainer
{
    private _servantId:string = null;
	private _servantSkinId:string;
    private _nameBgNode:BaseDisplayObjectContainer = null;
	private _nameTxt:BaseTextField;

	private _inBB:BaseBitmap = null;//穿戴中
	private _noGetBB:BaseBitmap = null;//未获得
	private _skinBtn:BaseButton;
	private _servantInfoObj:any = null;

	private _buttonTab:ServantNewSkinButton[] = [];

    public constructor()
	{
		super();
	}

	public init(servantId:string):void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP),this.callback,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVANTSKIN_AURA,this.checkServantRed,this);

        this._servantId = servantId;
		this._servantSkinId = Api.servantVoApi.getservantSkinIdInWear(this._servantId) || "";
		this._servantInfoObj =  Api.servantVoApi.getServantObj(this._servantId);

        //名字
		this._nameBgNode = new BaseDisplayObjectContainer();
		this.addChild(this._nameBgNode);


        //详情
		let detailImg = ComponentManager.getButton("servant_info_detail","",this.detailClickHandler,this)
		detailImg.x = 300;
		detailImg.y = 396;
		this.addChild(detailImg);
		if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang() || PlatformManager.checkIsKRSp()){
			detailImg.y = 407;
		}


		//绳子
		let tmpNode = new BaseDisplayObjectContainer();
		
		let top = BaseBitmap.create(`wifeskinropetop`);
		top.setPosition(37,10);
		
		let rope = BaseBitmap.create(`wifeskinrope`);
		rope.setPosition(top.x+top.width/2-rope.width/2,0);
		tmpNode.addChild(rope);
			

		let rope2 = BaseBitmap.create(`wifeskinrope`);
		rope2.setPosition(rope.x,top.y+top.height-10);
		tmpNode.addChild(rope2);

		tmpNode.addChild(top);	

		let skinList:string[] = Config.ServantskinCfg.getIdListBySerVantId(this._servantId);
		skinList.splice(0,0,"");
		
        for (var index = 0; index < skinList.length; index++) {
            let element = new ServantNewSkinButton();
            element.init(skinList[index],this._servantId,this.clickSkinIcon,this );
            element.x = 3;
            element.y = 55+index*125;
           
			this._buttonTab.push(element);
			if(skinList[index] && Api.servantVoApi.getSkinOneRed(this._servantId,skinList[index]) || Api.servantVoApi.isShowAuralevelUpRed(this._servantId,skinList[index]))
			{
				if(Api.switchVoApi.checkOpenServantSkinAura())
				{
					App.CommonUtil.addIconToBDOC(element);
					element.getChildByName("reddot").x = 78;
					element.getChildByName("reddot").y = 28;
				}
			}

			let onerope = BaseBitmap.create(`wifeskinrope`);
			onerope.setPosition(rope.x,element.y+93);
			tmpNode.addChild(onerope);

			tmpNode.addChild(element);
        }
        
        let rect = new egret.Rectangle(0,0,130,410);
        let skinItemScrollview = ComponentManager.getScrollView(tmpNode,rect);
        skinItemScrollview.x = 487;
        skinItemScrollview.y = 0;
		this.addChild(skinItemScrollview);
		skinItemScrollview.horizontalScrollPolicy = "off";
		skinItemScrollview.bounces = false;

		this._skinBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"wifeskinViewTitle",this.skinHander,this,null,0);
		this._skinBtn.x = skinItemScrollview.x+skinItemScrollview.width/2-this._skinBtn.width/2;
		this._skinBtn.y = 414	;
		this.addChild(this._skinBtn);
        this._skinBtn.visible = false;

		this._inBB = BaseBitmap.create("wifeview_in");
		this._inBB.x = skinItemScrollview.x+skinItemScrollview.width/2-this._inBB.width/2+3;
		this._inBB.y = 404	;
		this.addChild(this._inBB);

		this._noGetBB = BaseBitmap.create("wifeview_noget");
		this._noGetBB.x = skinItemScrollview.x+skinItemScrollview.width/2-this._noGetBB.width/2-10;
		this._noGetBB.y = 434	;
		this.addChild(this._noGetBB);


		this.refreshInfo();

		if (Api.servantVoApi.showSkinId)
		{	
			this.clickSkinIcon(Api.servantVoApi.showSkinId);
			Api.servantVoApi.showSkinId = null;
		}
    }

	private clickSkinIcon(sid:string):void
	{
		if (sid != this._servantSkinId)
		{
			this._servantSkinId = sid;
			this.refreshInfo();
		}
		else
		{
			return;
		}
		if (!sid)
		{
			sid = "0";
		}

		for (let i=0; i<this._buttonTab.length; i++)
		{
			if (this._buttonTab[i]._servantSkinId == sid && !Api.servantVoApi.isShowAuralevelUpRed(this._servantId,sid))
			{
				App.CommonUtil.removeIconFromBDOC(this._buttonTab[i]);
				break;
			}
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SELECTED_SERVANT_SKIN,sid);
	}


	protected skinHander()
    {
		NetManager.request(NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP,{servantId:this._servantId,servantSkinId:this._servantSkinId});
    }

	private callback(evt : egret.Event):void
	{
        let rdata = evt.data.data
        if(rdata.ret != 0)
        {
            return;
        }

		this.refreshInfo();

		let wearId = this._servantSkinId;
		ViewController.getInstance().openView(ViewConst.POPUP.SERVANTNEWCHANGESKIN, {servantId:this._servantId,skinId:wearId})
	}

	private refreshInfo():void
	{

		let wearId = Api.servantVoApi.getservantSkinIdInWear(this._servantId) || "" ;
        if(wearId == this._servantSkinId)
		{
			this._inBB.visible = true;
			this._noGetBB.visible = false;
			this._skinBtn.visible = false;
		}
		 else
		 {
            if(this._servantSkinId == "" ||Api.servantVoApi.isOwnSkinOfSkinId(this._servantSkinId))
			{
				this._inBB.visible = false;
				this._noGetBB.visible = false;
				this._skinBtn.visible = true;
			}
			else
			{
				this._inBB.visible = false;
				this._noGetBB.visible = true;
				this._skinBtn.visible = false;
			}

			if(this._servantSkinId && Api.servantVoApi.getSkinOneRed(this._servantId,this._servantSkinId))
			{
				NetManager.request(NetRequestConst.REQUEST_UPGRADE_SERVANT_REDSKINRED,{servantId:this._servantId,servantSkinId:this._servantSkinId});
			}
		 }

		 for (let i=0; i<this._buttonTab.length; i++)
		 {	
			 let onebtn = this._buttonTab[i]
			 onebtn.setSelect(onebtn._servantSkinId == this._servantSkinId);
		 }

		 this.resetName();
	}

    private resetName():void
	{
		this._nameBgNode.removeChildren();
		let wearId = this._servantSkinId;//Api.servantVoApi.getservantSkinIdInWear(this._servantId) || null ;
		if (wearId)
		{	
			let nameBg = BaseBitmap.create("servant_name_advanced");
			nameBg.setPosition(118,400);
			this._nameBgNode.addChild(nameBg);

			let clip = ComponentManager.getCustomMovieClip("servant_name_ef",12);
            clip.x = nameBg.x-8;
            clip.y = nameBg.y-16;
            this._nameBgNode.addChild(clip);
            clip.playWithTime(0);
			if (PlatformManager.checkIsEnSp() ||PlatformManager.checkIsRuSp())
            {
                clip.x = nameBg.x-11;
                clip.y = nameBg.y-19;
            }

			this._nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._nameTxt.width = 180;
			this._nameTxt.textAlign = egret.HorizontalAlign.CENTER;
			this._nameTxt.multiline = true;
			this._nameTxt.text = LanguageManager.getlocal("servant_newui_skinname",[LanguageManager.getlocal("servantSkinName"+wearId),LanguageManager.getlocal("servant_name"+this._servantId)]);
			this._nameTxt.textColor = TextFieldConst.COLOR_QUALITY_WHITE;//ServantScrollItem.getQualityColor(this._servantInfoObj.clv);
			this._nameTxt.setPosition(nameBg.x+15,nameBg.y+14);
			this._nameBgNode.addChild(this._nameTxt);
		}
		else
		{
			let nameBg = BaseLoadBitmap.create("wifestatus_namebg");
			nameBg.width = 220;
			nameBg.height = 30;
			nameBg.setPosition(128,409);
			this._nameBgNode.addChild(nameBg);

			this._nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._nameTxt.width = 180;
			this._nameTxt.textAlign = egret.HorizontalAlign.CENTER;
			this._nameTxt.multiline = true;
			this._nameTxt.text = LanguageManager.getlocal("servant_name"+this._servantId);
			this._nameTxt.textColor = TextFieldConst.COLOR_QUALITY_WHITE;//ServantScrollItem.getQualityColor(this._servantInfoObj.clv);
			this._nameTxt.setPosition(nameBg.x+20,nameBg.y+nameBg.height/2-this._nameTxt.height/2);
			this._nameBgNode.addChild(this._nameTxt);
		}
	}

    protected detailClickHandler()
	{
		if(Api.rookieVoApi.getIsGuiding()){
			return;
		} 

		if(Api.switchVoApi.checkBiography())
		{
			ViewController.getInstance().openView(ViewConst.POPUP.SERVANTATTRDETAILSPOPUPVIEW,this._servantId);
		}
		else
		{
			ViewController.getInstance().openView(ViewConst.POPUP.SERVANTATTRDETAILPOPUPVIEW,this._servantId);
		}
	}

	private checkServantRed():void
	{
		for (let i=0; i<this._buttonTab.length; i++)
		{
			if (this._buttonTab[i]._servantSkinId == this._servantSkinId && !Api.servantVoApi.isShowAuralevelUpRed(this._servantId,this._servantSkinId))
			{
				App.CommonUtil.removeIconFromBDOC(this._buttonTab[i]);
				break;
			}
		}
	}

    public dispose()
    {
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP),this.callback,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANTSKIN_AURA,this.checkServantRed,this);

		this._servantId = null;
		this._servantSkinId = null;
		this._nameBgNode = null;
		this._nameTxt = null;
		this._inBB = null;
		this._noGetBB = null;
		this._skinBtn = null;
		this._servantInfoObj = null;
		this._buttonTab.length = 0;

        super.dispose();
    }
}