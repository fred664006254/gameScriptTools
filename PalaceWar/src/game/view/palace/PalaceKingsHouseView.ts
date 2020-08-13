/**
 * 皇宫-金銮殿
 * author yanyuling
 * date 2018/05/30
 * @class PalaceKingsHouseView
 */

class PalaceKingsHouseView  extends CommonView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _collectNode:BaseDisplayObjectContainer;
    private _curRoleImg:PalaceRoleInfoItem;
    private _editBtn:BaseButton;
    private _palace_rewardbg:BaseBitmap;
    private _collectBtn:BaseButton;
    private _curTitleId:string;
    private _kingsList = null;
    private _kingsSign = "";
    private _topTxtBg:BaseBitmap;
	private _signTxt:BaseTextField;
    private _tailImg:BaseBitmap;
    private _decree_policyBtn:BaseButton;
    private _decree_paperBtn:BaseButton;
    private _mainTaskHandKey:string;
    
    public constructor() {
        super();
	}

	// 标题背景名称
	protected getTitleStr():string
	{
		return "palace_buildingName"+this.param.data.buildingId;
	}
	public initView():void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PROMOTE_INDEX), this.getPromoteList, this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_INDEX),this.indexHandlerCallback,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_GETSALARY),this.collectBtnClickHandlerCallback,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_SETSIGN),this.showSignAfterEdit,this);
        NetManager.request(NetRequestConst.REQUEST_PROMOTE_INDEX,{});//分封的相关数据
        
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        this._curTitleId = this.param.data.titleId;

        let palace_bg = BaseBitmap.create("palace_bg5")
        palace_bg.y = GameConfig.stageHeigth - this.container.y - palace_bg.height;
        this._nodeContainer.addChild(palace_bg);

        //npc
        let npc1Btn = ComponentManager.getButton("decree_npc1","",this.npcBtnHandler,this,[1]);
        // npc1Btn.setScale(1.2);
        npc1Btn.name = "npc1Btn";
        npc1Btn.x = 77;
        npc1Btn.y = palace_bg.y + 527;
        this._nodeContainer.addChild(npc1Btn);

        let npc2Btn = ComponentManager.getButton("decree_npc2","",this.npcBtnHandler,this,[2]);
        // npc2Btn.setScale(1.2);
        npc2Btn.name = "npc2Btn";
        npc2Btn.x = 472;
        npc2Btn.y = palace_bg.y + 536;
        this._nodeContainer.addChild(npc2Btn);
        this.refreshRedPoints();

        this._collectNode = new BaseDisplayObjectContainer();
        this._nodeContainer.addChild( this._collectNode);
        let decree_collectbg = BaseBitmap.create("decree_collectbg");
        decree_collectbg.width = 180;
        decree_collectbg.height = 40;
        decree_collectbg.x = npc2Btn.x + npc2Btn.width/2 - decree_collectbg.width/2;
        decree_collectbg.y = npc2Btn.y + npc2Btn.height/2 +15;
        this._collectNode.addChild(decree_collectbg);

        let gem = Config.LevelCfg.getCfgByLevel(String(Api.playerVoApi.getPlayerLevel())).gem;
        let collectTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
        collectTxt.text = LanguageManager.getlocal("decreeKings_collect",["       " + gem])
        collectTxt.x = decree_collectbg.x + 10;
        collectTxt.y = decree_collectbg.y + 10;
        this._collectNode.addChild(collectTxt);
        
        let goldIcon =  BaseLoadBitmap.create("itemicon1");
        goldIcon.setScale(0.41);
        goldIcon.x = collectTxt.x + 80;
        goldIcon.y = collectTxt.y - 11;
        this._collectNode.addChild(goldIcon);
        if(PlatformManager.checkIsEnLang())
        {
             goldIcon.x = collectTxt.x + 100;
        }

         if (Api.otherInfoVoApi.getPalaceFlag() == 1){
             this.makeCollectFlag();
             npc2Btn.touchEnabled = false;
         }

        //国策btn
        let decree_policyBtn = ComponentManager.getButton("decree_policyBtn","",this.policyBtnHandler,this);
        decree_policyBtn.x = 30;
        decree_policyBtn.y = GameConfig.stageHeigth - this.container.y - 260;
        this._decree_policyBtn = decree_policyBtn;
        this._nodeContainer.addChild(decree_policyBtn);

         //政令btn
        let decree_paperBtn = ComponentManager.getButton("decree_paperBtn","",this.paperBtnHandler,this);
        decree_paperBtn.x = GameConfig.stageWidth - 130;
        decree_paperBtn.y = decree_policyBtn.y;
        this._decree_paperBtn = decree_paperBtn;
        this._nodeContainer.addChild(decree_paperBtn);

        let bseH = 0;
        this._editBtn = ComponentManager.getButton("palace_editBtn2","",this.editBtnClickHandler,this);
        this._editBtn.x = GameConfig.stageWidth - this._editBtn.width - 30;
        this._editBtn.y =  20;//- this._editBtn.height;
        // this._editBtn.visible = false;
        this._nodeContainer.addChild(this._editBtn);

        let onlineBtn = ComponentManager.getButton("decree_onlineBtn","",this.onlineBtnHandler,this);
        onlineBtn.x = this._editBtn.x + this._editBtn.width/2 - onlineBtn.width/2;
        onlineBtn.y =  this._editBtn.y + this._editBtn.height + 10;
        this._nodeContainer.addChild(onlineBtn);

        
	    if(!Api.switchVoApi.checkOpenShenhe())
		{
            let hisBtn = ComponentManager.getButton("palace_hisBtn1","",this.hisBtnClickHandler,this);
            hisBtn.x = -10;
            hisBtn.y = bseH-7;
            bseH += 130;
            this._nodeContainer.addChild(hisBtn);
        }

        let kingsBtn = ComponentManager.getButton("palace_kingslogBtn","",this.kingsBtnClickHandler,this);
        kingsBtn.x = -10;
        kingsBtn.y = bseH - 25;
        this._nodeContainer.addChild(kingsBtn);

        this._topTxtBg = BaseBitmap.create("public_9_bg25");
		this._topTxtBg.x = this.width/2 + 10;
		this._topTxtBg.height = 100;
		this._topTxtBg.width = 200;
		this._topTxtBg.y = GameConfig.stageHeigth - 480;
		this._topTxtBg.alpha = 0;
		this.addChild(this._topTxtBg);

        let tailImg =  BaseBitmap.create("public_9_bg42_tail");
		tailImg.x = this._topTxtBg.x + 20;
		tailImg.y = this._topTxtBg.y +this._topTxtBg.height-4;
		this.addChild(tailImg);
		this._tailImg = tailImg;
		this._tailImg.alpha = 0;

		let txt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		txt.multiline = true;
		txt.lineSpacing = 5;
		txt.width = this._topTxtBg.width - 40;
		txt.x = this._topTxtBg.x + 20;
		txt.y = this._topTxtBg.y + 20;
		this._signTxt =txt;
		this._signTxt.alpha = 0;
		this.addChild(txt);
        this.tick();
         if(this._kingsSign != "")
        {
            egret.Tween.get(this,{loop:false}).wait(500).call(this.showRoleSign,this);
        }

        //主线引导
        if (Api.otherInfoVoApi.getPalaceFlag() == 0){
            this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(
                npc2Btn,
                npc2Btn.width/2 - 10,
                10,
                [npc2Btn],
                115,
                true,
                function(){
                    return true;
                },
                this
            );
        }
    }

    private onlineBtnHandler()
    {
        ViewController.getInstance().openView(ViewConst.POPUP.DECREEONLINESETTINGPOPUPVIEW);
    }
    protected policyBtnHandler()
    {
        if(Api.promoteVoApi.getSpid())
        {
            let newSpid =Number( Api.promoteVoApi.getSinfo().nextinfo.spid );
            if (newSpid && newSpid > 0)
            {
                ViewController.getInstance().openView(ViewConst.POPUP.DECREEPOLICYCHANGEPOPUPVIEW);
            }else{
                ViewController.getInstance().openView(ViewConst.POPUP.DECREEPOLICYDETAILPOPUPVIEW);
            }
        }else{
            ViewController.getInstance().openView(ViewConst.POPUP.DECREEPOLICYLISTPOPUPVIEW);
        }
        // ViewController.getInstance().openView(ViewConst.POPUP.DECREERESCRIPTDISPLAYPOPUPVIEW);
    }

    protected refreshRedPoints()
    {   
        let npc1Btn = <BaseDisplayObjectContainer>this._nodeContainer.getChildByName("npc1Btn");
        let npc2Btn = <BaseDisplayObjectContainer>this._nodeContainer.getChildByName("npc2Btn");
        if (Api.otherInfoVoApi.getPalaceFlag() == 0){
            App.CommonUtil.addIconToBDOC(npc2Btn);
            let reddot = npc2Btn.getChildByName("reddot");
            reddot.x = 90;
            reddot.y = npc2Btn.height/2-30;
        }else{
             App.CommonUtil.removeIconFromBDOC(npc2Btn);
        }

        if(Api.promoteVoApi.isPositionEmpty()){
            App.CommonUtil.addIconToBDOC(npc1Btn);
            let reddot = npc1Btn.getChildByName("reddot");
            reddot.x = 95;
            reddot.y = npc1Btn.height/2-20;
        }else{
             App.CommonUtil.removeIconFromBDOC(npc1Btn);
        }

    }

    protected npcBtnHandler(params:any)
    {
        if(params == 1)
        {
             ViewController.getInstance().openView(ViewConst.COMMON.PROMOTEVIEW);
        }else if(params == 2 &&  (Api.otherInfoVoApi.getPalaceFlag() == 0) ){
             NetManager.request(NetRequestConst.REQUEST_PALACE_GETSALARY,{});
        }
    }
    protected paperBtnHandler()
    {
        let gid = Number(Api.promoteVoApi.getGdinfo().gdid);
        if(gid && gid > 0)
        {
            ViewController.getInstance().openView(ViewConst.POPUP.DECREEPAPERDETAILPOPUPVIEW);
        }else{
            ViewController.getInstance().openView(ViewConst.BASE.DECREEPAPERVIEW);
        }
    }

    protected editBtnClickHandler()
    {
        ViewController.getInstance().openView(ViewConst.POPUP.PALACEEDITSIGNPOPUPVIEW,this._curTitleId);
    }

    protected kingsBtnClickHandler()
    {
        Api.emperorwarVoApi.openEmpView();
        this.hide();
    }

    protected makeCollectFlag(isShowAni:boolean = false)
    {
        let npc2Btn = <BaseDisplayObjectContainer>this._nodeContainer.getChildByName("npc2Btn");
        npc2Btn.touchEnabled = false;
        let collectFlag = BaseBitmap.create("palace_collectflag2");
        // collectFlag.setScale(0.7);
        collectFlag.anchorOffsetX = collectFlag.width/2;
        collectFlag.anchorOffsetY = collectFlag.height/2;
        collectFlag.x = npc2Btn.x + npc2Btn.width/2;
        collectFlag.y = npc2Btn.y + npc2Btn.height/2-10 ;
        this._nodeContainer.addChild(collectFlag);
        if(isShowAni){
            collectFlag.setScale(1.3);
            collectFlag.visible = true;
            egret.Tween.get(collectFlag,{loop:false}).to({scaleX:1.0,scaleY:1.0},300);
        }
    }

    //领取俸禄
    protected collectBtnClickHandlerCallback(event:egret.Event)
    {
        if(event && event.data && event.data.ret)
        {
            let rData = event.data.data;
            //  this._collectNode.visible = false;
            let gem = Config.LevelCfg.getCfgByLevel(String(Api.playerVoApi.getPlayerLevel())).gem;
            let rewardStr = "1_0_"+String(gem);
            let rList = GameData.formatRewardItem(rewardStr);
            App.CommonUtil.playRewardFlyAction(rList);
            this.makeCollectFlag(true);
            App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
            this._mainTaskHandKey = null;
        }
    }
   
    protected collectBtnClickHandler()
    {
        NetManager.request(NetRequestConst.REQUEST_PALACE_GETSALARY,{});
    }
    protected hisBtnClickHandler()
    {
        ViewController.getInstance().openView(ViewConst.POPUP.PALACEHISTORYPOPUPVIEW,{titleId:this._curTitleId,dataList:this._kingsList});
    }

    protected receiveData(data: { ret: boolean, data: any }): void
    {
        
        if(data && data.ret)
        {
            let rData = data.data;
            this._kingsList = rData.data.kinglist;
            this._kingsSign = rData.data.info.sign;
            // if(this._kingsSign != "")
            // {
            //     egret.Tween.get(this,{loop:false}).wait(500).call(this.showRoleSign,this);
            // }
        }
    }

    protected getRequestData():{requestType:string,requestData:any} 
	{
		return {requestType:NetRequestConst.REQUEST_POLICY_INDEX,requestData:{}};
	}

    protected getPromoteList(evt : egret.Event):void{
        if (evt && evt.data && evt.data.ret){
            let list = evt.data.data.data;
            if(list){
                Api.promoteVoApi.initListData(list);
            }
        }
    }

    protected showSignAfterEdit(event:egret.Event)
	{
        if(event && event.data && event.data.ret)
        {
            let data = event.data.data;
            App.CommonUtil.showTip(LanguageManager.getlocal("palace_edit_succeed"));
            let signStr = data.data.sign;
            this.showRoleSign(signStr);
        }
	}
    protected showRoleSign(signStr?:string)
	{
        if(!signStr)
        {
            signStr = this._kingsSign;
        }
		if (signStr && signStr != "" && this._topTxtBg)
		{
			egret.Tween.removeTweens(this._topTxtBg);
			egret.Tween.removeTweens(this._signTxt);
			egret.Tween.removeTweens(this._tailImg);
			this._topTxtBg.alpha = 1;
			this._signTxt.alpha = 1;
			this._tailImg.alpha = 1;
			this._signTxt.text = signStr;
            this._topTxtBg.height=this._signTxt.height+40;
            this._tailImg.y = this._topTxtBg.y +this._topTxtBg.height-4;
			egret.Tween.get(this._topTxtBg,{loop:false}).wait(3000).to({alpha:0},1000);
			egret.Tween.get(this._signTxt,{loop:false}).wait(3000).to({alpha:0},1000);
			egret.Tween.get(this._tailImg,{loop:false}).wait(3000).to({alpha:0},1000);
		}
	}
    protected tick()
    {
        if(Api.promoteVoApi.getKingEndtime() == GameData.serverTime)
        {
            let msg = LanguageManager.getlocal("decree_kingsOutTime");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                title:"itemUseConstPopupViewTitle",
                msg:msg,
                callback:this.hide,
                handler:this,
                needCancel:false
            });
        }
        this.refreshRedPoints();
        let spidN = Number(Api.promoteVoApi.getSpid()) ;
        let gdidN = Number(Api.promoteVoApi.getGdinfo().gdid) ;
        if(spidN && spidN != 0)
        {
            App.CommonUtil.removeIconFromBDOC(this._decree_policyBtn);
        }else{
            App.CommonUtil.addIconToBDOC(this._decree_policyBtn);

            let reddot = this._decree_policyBtn.getChildByName("reddot");
            reddot.x = 70;
            reddot.y = 80;
        }

        if(gdidN && gdidN != 0)
        {
            App.CommonUtil.removeIconFromBDOC(this._decree_paperBtn);
        }else{
            App.CommonUtil.addIconToBDOC(this._decree_paperBtn);
            let reddot = this._decree_paperBtn.getChildByName("reddot");
            reddot.x = 70;
            reddot.y = 80;
        }

        return true;
    }
    protected kingsOutTimeHandler()
    {
        this.hide();
    }
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "palace_kingslogBtn_down","palace_kingslogBtn","palace_hisBtn1","palace_hisBtn1_down",
            "palace_editBtn2_down","palace_editBtn2","palace_bg5",

             ,"palace_titlebg","palace_role_shadow",
            "palace_role_empty","palace_historyBtn", "palace_historyBtn_down" ,"wifeview_bottombg",
            "palace_rewardbg","servant_attributemap",
            "palace_editBtn_down","palace_editBtn","palace_collectflag2",

            "decree_appointBtn_down","decree_appointBtn","decree_collectBtn_down",
            "decree_collectBtn","decree_paperBtn_down","decree_paperBtn","decree_policyBtn_down","decree_policyBtn",
            "decree_npc1","decree_npc1_down",
            "decree_npc2","decree_npc2_down","decree_collectbg","popupview_closebtn1",
            "decree_onlineBtn","decree_onlineBtn_down",
        ]);
	}

    protected getRuleInfo():string
	{
		return "palaceKingshouse_roleinfo";
	}
     protected getRuleInfoParam():string[]
	{ 
        var zoneStr:number = 0;  
        zoneStr =  App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;
        return [zoneStr+""];
    }

	public dispose():void
	{
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_SETSIGN),this.showSignAfterEdit,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_GETSALARY),this.collectBtnClickHandlerCallback,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PROMOTE_INDEX), this.getPromoteList, this);

        this._nodeContainer = null;
        this._collectNode = null;
        this._curRoleImg = null;
        this._editBtn = null;
        this._palace_rewardbg = null;
        this._collectBtn = null;
        this._curTitleId = null;
        this._kingsList = null;
        this._kingsSign = null;
        this._topTxtBg = null;
		this._signTxt = null;
        this._tailImg = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;

		super.dispose();
	}
}