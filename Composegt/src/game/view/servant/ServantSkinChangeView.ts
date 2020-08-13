/**
 * 门客皮肤
 * author yanyuling
 * date 2018/08/13
 * @class ServantSkinChangeView
 */

class ServantSkinChangeView  extends CommonView
{
	private _nodeContainer:BaseDisplayObjectContainer;
    private _servantId:string;
    private _servantSkinId:string;
    private _inflagImg:BaseBitmap =undefined; 
    private _skinItemScrollview:ScrollView = undefined;
    private _skinBtn:BaseButton;
    private _bookNode: BaseDisplayObjectContainer=undefined;
    private _droWifeIcon:BaseLoadDragonBones=undefined;
    private _skinImg:BaseLoadBitmap=undefined;
    private _skinNameTxt:BaseTextField;
    private _notGetTipTxt:BaseTextField;
    private _textBg:BaseBitmap = null;
    private _preSkinId:string = undefined;
    private _infobg:BaseLoadBitmap;
    private _isDisplay:boolean = false;
	public constructor() {
		super();
	}

	public initView():void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP),this.skinkCallback,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVANT_SKIN_SWITCH,this.bgSwitchHandler,this);
        this._servantId = this.param.data.servantId;
        let skinList:string[] = Config.ServantskinCfg.getIdListBySerVantId(this._servantId );
        // Api.servantVoApi.getServantObj(this._servantId).getOwnSkinIdList();
        skinList.unshift("");
        this._isDisplay = this.param.data.isDisplay;
        let serCfg = Config.ServantCfg.getServantItemById(this._servantId);
        let skinImgPath = serCfg.fullIcon;

        let data = this.param.data;

        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.y = -15;
        this.addChildToContainer(this._nodeContainer);

        let bottomBg:BaseBitmap = BaseBitmap.create("public_9v_bg14");
		bottomBg.width = 610
		bottomBg.height = 290;
		bottomBg.x = this.viewBg.width/2 - bottomBg.width/2;
		bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;
		
        bottomBg.name = "probg2";





        let probg =  BaseBitmap.create("wifeview_hongyantyouxiangbg");
		probg.width = 640;
        probg.x = GameConfig.stageWidth/2 - probg.width/2;
		probg.y = bottomBg.y - probg.height +10;
        probg.name = "probg";
        if(this._isDisplay){
            // probg.visible = false;
            // bottomBg.height += 95;
            // bottomBg.y -= 95;
        }
        let infobg = BaseLoadBitmap.create("servantskinbg");//
		infobg.width = 640;
		infobg.height = 720;
		infobg.y = probg.y - infobg.height;
        this._infobg = infobg;
		this._nodeContainer.addChild(infobg);
        this._nodeContainer.addChild(bottomBg);
        




        
        this._inflagImg = BaseBitmap.create("wifeview_in");
		this._inflagImg.x = 490;
		this._inflagImg.y = probg.y - 95;
        

        this._textBg = BaseBitmap.create("wifeview_skingetbg");
		this._textBg.x = 470;
		this._textBg.y = this._inflagImg.y + this._inflagImg.height ;
		this._nodeContainer.addChild(this._textBg);

        this._notGetTipTxt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_WARN_YELLOW_NEW);
        this._notGetTipTxt.x = GameConfig.stageWidth - 10;
        // this._notGetTipTxt.y = this._textBg.y + this._textBg.height/2 - this._notGetTipTxt.height/2;
        this._notGetTipTxt.y = this._textBg.y + 5;
        this._nodeContainer.addChild(this._notGetTipTxt );

        this._skinBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"wifeskinViewTitle",this.skinHander,this,null,0);
		this._skinBtn.x = GameConfig.stageWidth - 20 - this._skinBtn.width;
        // 470;
		this._skinBtn.y = probg.y -60 ;
		this._nodeContainer.addChild(this._skinBtn);
        this._skinBtn.visible = false;

        let wifeOrSerNameStr = LanguageManager.getlocal("servant_name" + this._servantId);
        let skinnamebg = BaseBitmap.create("servant_skinnamebg");
		skinnamebg.y = infobg.y + 240;
        skinnamebg.x = 15;
		this._nodeContainer.addChild(skinnamebg);

        this._nodeContainer.addChild(probg);

                //拼接 tab下背景
		let bottomBorder = BaseBitmap.create("commonview_border1");
		bottomBorder.width = GameConfig.stageWidth;
		bottomBorder.height = 290;
		bottomBorder.x = 0;
		bottomBorder.y = bottomBg.y;
		this._nodeContainer.addChild(bottomBorder);

	    
		let bottomTop = BaseBitmap.create("commonview_border2");
		bottomTop.width = GameConfig.stageWidth;
		bottomTop.scaleY = -1;
		bottomTop.x = 0;
		bottomTop.y = bottomBorder.y + 25;
		this._nodeContainer.addChild(bottomTop);

		let bottomB = BaseBitmap.create("commonview_bottom");
		bottomB.width = GameConfig.stageWidth;
		bottomB.x = 0;
		bottomB.y = bottomBorder.y + bottomBorder.height - bottomB.height;
		this._nodeContainer.addChild(bottomB);

        // let probg2 =  BaseBitmap.create("public_9_bg22");
		// probg2.width = 640;
        // probg2.name = "probg2";
        // probg2.x = GameConfig.stageWidth/2 - probg.width/2;
		// probg2.y = probg.y + probg.height;
        // probg2.height = GameConfig.stageHeigth - this.container.y - probg2.y+15;
		// this._nodeContainer.addChild(probg2);

        let skinNameTxt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_WARN_YELLOW_NEW);
        skinNameTxt.x = skinnamebg.x + skinnamebg.width/2-40;
        skinNameTxt.y = skinnamebg.y + 13;
        this._skinNameTxt = skinNameTxt;
        this._nodeContainer.addChild(skinNameTxt);

        let wifeOrSerNameTxt = ComponentManager.getTextField(wifeOrSerNameStr,24,TextFieldConst.COLOR_WARN_YELLOW_NEW);
        wifeOrSerNameTxt.x = skinNameTxt.x + skinNameTxt.width/2 - wifeOrSerNameTxt.width/2 ;
        wifeOrSerNameTxt.y = skinNameTxt.y + 28;
        this._nodeContainer.addChild(wifeOrSerNameTxt);

        let skinBg = BaseBitmap.create("public_9v_bg12");
        skinBg.width = 580;
        skinBg.height = 140;
        skinBg.x = this.viewBg.width/2 - skinBg.width/2;
        skinBg.y = bottomTop.y+ 50;
        this._nodeContainer.addChild(skinBg);


        let tmpNode = new BaseDisplayObjectContainer();
        if(!this._isDisplay){
            for (var index = 0; index < skinList.length; index++) {
                let element = new ServantSkinScrollItem();
                element.init(skinList[index],index,this._servantId );
                element.x = 10 + (element.width +10 ) * index ;
                // element.y = 10;
                tmpNode.addChild(element);
            }
        }
        
        let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,probg.height + 10);
        this._skinItemScrollview = ComponentManager.getScrollView(tmpNode,rect);
        this._skinItemScrollview.verticalScrollPolicy = "off";
        this._skinItemScrollview.x = 0;
        this._skinItemScrollview.y = probg.y-10;
        this._nodeContainer.addChild(this._skinItemScrollview);

        // let innerbg = BaseBitmap.create("public_9v_bg12");
		// innerbg.width = 606
		// // innerbg.height = 364+promoDeltaH;
		// innerbg.height = bottomBg.height - 60;
		// innerbg.x = bottomBg.width/2 - innerbg.width/2;
		// innerbg.y = bottomBg.y +26;
		// this._nodeContainer.addChild(innerbg);

		// let innerTopBg = BaseBitmap.create("public_up2");
		// innerTopBg.x = bottomBg.width/2 - innerTopBg.width/2;
		// innerTopBg.y = bottomBg.y + 29.5;
		// this._nodeContainer.addChild(innerTopBg);

        // let probg =  BaseBitmap.create("public_ditu");
		// probg.width = 598;
		// probg.height = 34;
		// probg.x =GameConfig.stageWidth/2 - probg.width /2 ;
		// probg.y = 0;
		// this._nodeContainer.addChild(probg);

		// let probg2 =  BaseBitmap.create("public_ditu");
		// probg2.width = 598;
		// probg2.height = 34;
		// probg2.x =GameConfig.stageWidth/2 - probg2.width /2 ;
		// probg2.y = probg.y + probg.height + 34;
		// this._nodeContainer.addChild(probg2);

		// let probg3 = BaseBitmap.create("public_left2");	
		// probg3.width =598 ;
		// probg3.height = 35;
		// probg3.anchorOffsetX = 598/2;
		// // probg3.anchorOffsetY = 17;
		// probg3.x =GameConfig.stageWidth/2;// - probg3.width /2 ;
		// probg3.y = bottomBg.y + bottomBg.height - 75;
		// this._nodeContainer.addChild(probg3);

        let btmTip = ComponentManager.getTextField(LanguageManager.getlocal("skin_servantInTip"),20,TextFieldConst.COLOR_BROWN_NEW);
        btmTip.x = GameConfig.stageWidth/2 - btmTip.width/2;
        btmTip.y = bottomB.y - btmTip.height - 5;
        this._nodeContainer.addChild(btmTip);

        
        
        this._bookNode = new BaseDisplayObjectContainer();
        this._nodeContainer.addChild(this._bookNode);
        this._servantSkinId = Api.servantVoApi.getservantSkinIdInWear(this._servantId) || "";
        if(this._isDisplay){
            this._servantSkinId = this.param.data.skinId;
        }
        this._preSkinId = this._servantSkinId;
        this.refreshInFlag();
        this.refreshServantDragon();
        this._nodeContainer.addChild(this._inflagImg);
    }

    protected refreshServantDragon()
    {   
        let probg = this._nodeContainer.getChildByName("probg");
        let serSkincfg = Config.ServantskinCfg.getServantSkinItemById(this._servantSkinId);

        let boneName = undefined;
        let dagonBonesName = undefined;
        if(serSkincfg && serSkincfg.bone){
            dagonBonesName = serSkincfg.bone;
            boneName = serSkincfg.bone + "_ske";
        }else{
            dagonBonesName = Api.servantVoApi.getServantBoneId(this._servantId);
			boneName = dagonBonesName+ "_ske";
            // return "servant_full2_"+ this.servantId;
        }

        if(!Api.switchVoApi.checkServantCloseBone() && boneName && this._servantId && RES.hasRes(boneName)&&App.CommonUtil.check_dragon() ){
            if(this._skinImg){
                this._skinImg.visible = false;
            }
            if(this._droWifeIcon){
                this._droWifeIcon.dispose();
                this._droWifeIcon = null;
            }
            this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
            this._droWifeIcon.visible = true; 
            this._droWifeIcon.setScale(0.9);
            this._droWifeIcon.anchorOffsetY = this._droWifeIcon.height;
            this._droWifeIcon.anchorOffsetX = this._droWifeIcon.width/2;
            this._droWifeIcon.x = GameConfig.stageWidth/2;
            this._droWifeIcon.y = probg.y + 80;
            this._nodeContainer.addChildAt(this._droWifeIcon,1);
        }else{
             if(this._droWifeIcon){
                this._droWifeIcon.visible = false;
            }
            let serCfg = Config.ServantCfg.getServantItemById(this._servantId);
            let skinImgPath = serCfg.fullIcon;
            if(serSkincfg){
                skinImgPath = serSkincfg.body;
            }
            if(this._skinImg)
            {
                this._skinImg.setload(skinImgPath);
                this._skinImg.visible = true;
                return;
            }
            let skinW =640;
            let skinH = 482;
            let tarScale = 1.0;
            this._skinImg = BaseLoadBitmap.create(skinImgPath);
            this._skinImg.width = skinW;
            this._skinImg.height = skinH;
            this._skinImg.setScale(tarScale);
            this._skinImg.anchorOffsetY = this._skinImg.height;
            this._skinImg.anchorOffsetX = this._skinImg.width/2;
            this._skinImg.x = GameConfig.stageWidth/2;
            this._skinImg.y = probg.y ;
            this._nodeContainer.addChildAt(this._skinImg,3);
        }
    }
    protected refreshSkinAbulity()
    {
        let skinNameStr = LanguageManager.getlocal("servantSkinName" + this._servantSkinId);
        if(!this._servantSkinId){
            skinNameStr = LanguageManager.getlocal("skin_default");
        }
        this._skinNameTxt.text = skinNameStr;
        this._skinNameTxt.anchorOffsetX = this._skinNameTxt.width/2;

        let serSkincfg = Config.ServantskinCfg.getServantSkinItemById(this._servantSkinId);
        let probg2 = <BaseTextField>this._nodeContainer.getChildByName("probg2");
          //书籍信息
        if(serSkincfg){
            this._bookNode.visible = true;
            this._bookNode.removeChildren();

            let skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect"+this._servantSkinId),20,TextFieldConst.COLOR_BROWN_NEW);
            skinTipTxt.width = 590;
            skinTipTxt.textAlign = egret.HorizontalAlign.LEFT;
            skinTipTxt.multiline = true;
            skinTipTxt.lineSpacing = 5;
            skinTipTxt.x = GameConfig.stageWidth/2 - skinTipTxt.textWidth/2;
            skinTipTxt.y = probg2.y + 20;//39;
            this._bookNode.addChild(skinTipTxt);

            let listNode = new BaseDisplayObjectContainer();
            let addAbility = serSkincfg.addAbility;
            let startY = 0;// probg2.y + 100 ;
            
            if(serSkincfg.amulet){
                let amulet = serSkincfg.amulet ;
                let amuCfg = Config.AmuletCfg.getAmucfgIndex(amulet);
                let amuletEffect = amuCfg.amuletEffect;
                // for (var key in amuletEffect) {
                //     if (amuCfg.hasOwnProperty(key)) {
                        let bnode = new ServantSkinAmuletScrollItem();
                        bnode.init(0,amulet,this._servantId);
                        bnode.x = probg2.x + probg2.width/2 - bnode.width/2 ;
                        bnode.y = startY;
                        startY += (bnode.height +5);
                        listNode.addChild(bnode);
                //     }
                // }
                // if(Object.keys(aura).length > 0){
                //     startY += 115;
                // }
            }
            
            // let aura = serSkincfg.aura || [];
            // if(Object.keys(aura).length > 0){
            //     startY += 115;
            // }
            // for (var key in aura) {
            //     if (aura.hasOwnProperty(key)) {
            //        let bnode = new ServantSkinauraScrollItem();
            //         bnode.init(this._servantSkinId,key,this._servantId);
            //         bnode.x = probg2.x + probg2.width/2 - bnode.width/2 ;
            //         bnode.y = startY;
            //         startY += (bnode.height +5);
            //         listNode.addChild(bnode);
            //     }
            // }
            
            for (let index = 0; index < addAbility.length; index++) {
                let bnode = new ServantSkinBookScrollItem();
                bnode.init(this._servantSkinId,index,this._servantId);
                bnode.x = probg2.x + probg2.width/2 - bnode.width/2 ;
                startY += (bnode.height +5)* index;
                bnode.y = startY ;
                listNode.addChild(bnode);
            }

            let srect = new egret.Rectangle(0,0,probg2.width,probg2.height- 175);
            let scrollV = ComponentManager.getScrollView(listNode,srect);
            scrollV.y =  probg2.y + 95 ;
            this._bookNode.addChild(scrollV);

            let noSkinTipTxt = this._nodeContainer.getChildByName("noSkinTipTxt");
            if(noSkinTipTxt){
                noSkinTipTxt.visible = false;
            }
        }else{
            this._bookNode.visible = false;
            let noSkinTipTxt = <BaseTextField>this._nodeContainer.getChildByName("noSkinTipTxt");
            if(!noSkinTipTxt){
                noSkinTipTxt = ComponentManager.getTextField("",40,TextFieldConst.COLOR_BLACK);
                noSkinTipTxt.text = LanguageManager.getlocal("wifeskinNoAdd" ) ;
                noSkinTipTxt.x = probg2.x+probg2.width/2 - noSkinTipTxt.width/2 ;
                noSkinTipTxt.y = probg2.y + probg2.height/2 - noSkinTipTxt.height/2;
                this._nodeContainer.addChild(noSkinTipTxt);
                noSkinTipTxt.name ="noSkinTipTxt";
            }
            noSkinTipTxt.visible = true;
        }
    }

    protected bookTouchHandler(obj:any,param:any)
    {
        let bid = param;
        let uidata = {
            aid:bid,
            bookId:bid,
            servantId:this._servantId,
            index:0,
            skinId:this._servantSkinId,
            isSkin:true,
        }
         
        ViewController.getInstance().openView(ViewConst.POPUP.SERVANTBOOKLEVELUPPOPUPVIEW,uidata)
    }

    protected skinkCallback(event:egret.Event)
    {
        let ret = event.data.data.ret;
        if(ret == 0){
            //  this._servantSkinId = Api.servantVoApi.getservantSkinIdInWear(this._servantId) || "";
            //  this.refreshInFlag();
            this.hide();
        }
    }

    protected skinHander()
    {
        this.request(NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP,{servantId:this._servantId,servantSkinId:this._servantSkinId});
    }
    protected bgSwitchHandler(params:any)
    {
        let sid = params.data.skinId;
        this._servantSkinId = sid;
        this.refreshInFlag();
        this.refreshServantDragon();
    }
    //切换皮肤时刷新
    protected refreshInFlag()
    {
        let wearId = Api.servantVoApi.getservantSkinIdInWear(this._servantId) || "" ;
        if(wearId == this._servantSkinId)
        {
            this._inflagImg.texture = ResourceManager.getRes("wifeview_in");
            this._skinBtn.visible = false;
            this._inflagImg.visible = true;
            this._notGetTipTxt.text = "";
            this._textBg.visible = false;
        }else{
            if(this._servantSkinId == "" ||Api.servantVoApi.isOwnSkinOfSkinId(this._servantSkinId)){
                this._skinBtn.visible = true;
                this._inflagImg.visible = false;
                this._notGetTipTxt.text = "";
                this._textBg.visible = false;
            }else{
                this._inflagImg.texture = ResourceManager.getRes("wifeview_noget");
                this._notGetTipTxt.text = LanguageManager.getlocal("skinDropDesc_"+this._servantSkinId);
                this._textBg.width = this._notGetTipTxt.width + 40;
                this._textBg.x = GameConfig.stageWidth - this._textBg.width
                this._notGetTipTxt.anchorOffsetX = this._notGetTipTxt.width;
                this._skinBtn.visible = false;
                this._inflagImg.visible = true;
                this._textBg.visible = true;
            }
        }
        if(this.param.data.isDisplay){
            this._skinBtn.visible = false;
        }
        this.refreshSkinAbulity();
        
    }
    protected getServantBookStars(num:number)
	{
		let objContainer = new BaseDisplayObjectContainer;
		for (let index = 1; index <= num; index++) {
			let starImg = BaseBitmap.create("servant_star")
			starImg.setScale(0.5);
			starImg.x = (index-1) * starImg.width*0.5;
			starImg.y = 0;
			objContainer.addChild(starImg);
		}
		return objContainer;
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "wifeview_hongyantyouxiangbg","wifeview_hongyantyouxiang1","wifeview_hongyantyouxiang3",
            "wifeview_in", "wifeview_iconmask","wifeview_skingetbg",
            // "tailor_iconBtn","tailor_iconBtn_down",
            "servant_skinnamebg","wifeview_xinxibanbg",
            // "skin_detail_topbg",
            // "skin_rankbtn_down","skin_rankbtn",
            "wifeview_noget","servant_skin_mask",
            "servant_star",
            "commonview_border1",
            "commonview_bottom",
            "commonview_border2"
		]);
	}

    public hide()
    {
        if(this._droWifeIcon){
            this._droWifeIcon.dispose();
            this._droWifeIcon = null;
        }

        let newSid = Api.servantVoApi.getservantSkinIdInWear(this._servantId) || "";
        let _showAni:boolean = false;
        if(this._preSkinId != newSid){
            _showAni = true;
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN,{isShowAni:_showAni,preSkinId:this._preSkinId,servantId:this._servantId});
        super.hide();
    }
    public dispose()
    {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP),this.skinkCallback,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANT_SKIN_SWITCH,this.bgSwitchHandler,this);
        this._nodeContainer = null;
        this._servantSkinId = null;
        this._servantId = null;
        this._inflagImg = null;
        this._skinItemScrollview = null;
        this._skinBtn = null;
        this._bookNode = null;
        this._skinImg = null;
        this._skinNameTxt = null;
        this._infobg = null;
        this._notGetTipTxt = null;
        this._preSkinId = null;
        if(this._droWifeIcon){
			this._droWifeIcon.stop();
			this._droWifeIcon.dispose();
			this._droWifeIcon = null;
		}
        this._isDisplay = false;
        super.dispose();
    }
}