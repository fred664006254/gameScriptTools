
/**
 * 修身阅历仓库
 * author yanyuling
 * date 2018/04/16
 * @class PracticeStoragePopupView
 */
class PracticeStoragePopupView extends PopupView
{
	// 滑动列表
    protected _nodeContainer:BaseDisplayObjectContainer;
	private _progressBar:ProgressBar;

    public constructor() 
	{
		super();
	}
	public initView():void
	{	
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_COLLECT),this.collectCallbackHandler,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRACTICE_UPSTORAGE),this.upCallbackHandler,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_STORAGE,this.refreshUI,this);
    
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        let startY = 10;
        let bg1= BaseBitmap.create("public_9_bg4");
        bg1.width = 530;
        bg1.height = 260;
        bg1.x = this.viewBg.x +this.viewBg.width/2 - bg1.width/2;
        bg1.y = this.viewBg.y +startY;
        this._nodeContainer.addChild(bg1);

        let deltaY = 70;
        let deltaX = 320;
        let officeTxt = ComponentManager.getTextField("",22);
        officeTxt.text = LanguageManager.getlocal("practiceStorageoffice",[Api.playerVoApi.getPlayerOffice()]);
        officeTxt.x = bg1.x + 20;
        officeTxt.y = bg1.y + 15;
        this._nodeContainer.addChild(officeTxt);

        let produceTxt = ComponentManager.getTextField("",22);
        produceTxt.name = "produceTxt";
        produceTxt.x = officeTxt.x;
        produceTxt.y = officeTxt.y + deltaY;
        this._nodeContainer.addChild(produceTxt);

        let produceAddTxt = ComponentManager.getTextField("",20);
        produceAddTxt.name = "produceAddTxt";
        produceAddTxt.x = produceTxt.x + deltaX;
        produceAddTxt.y = produceTxt.y ;
        this._nodeContainer.addChild(produceAddTxt);

        let detailImg = ComponentManager.getButton("servant_detailBtn","",this.detailClickHandler,this)
		detailImg.x = bg1.x + bg1.width - detailImg.width - 10;
		detailImg.y = produceAddTxt.y + produceAddTxt.height/2 - detailImg.height/2;
		this._nodeContainer.addChild(detailImg);

        let capacityTxt = ComponentManager.getTextField("0",22);
        capacityTxt.x = produceTxt.x
        capacityTxt.y = produceTxt.y + deltaY;
        capacityTxt.name = "capacityTxt";
        this._nodeContainer.addChild(capacityTxt);

        let capacityAddTxt = ComponentManager.getTextField("0",22);
        capacityAddTxt.x = produceAddTxt.x;
        capacityAddTxt.y = capacityTxt.y ;
        capacityAddTxt.name = "capacityAddTxt";
        this._nodeContainer.addChild(capacityAddTxt);

        if(PlatformManager.checkIsEnLang())
        {
            capacityAddTxt.x = produceAddTxt.x - 40;
        }

        let adddlImg = ComponentManager.getButton("practice_plus","",this.addClickHandler,this)
		adddlImg.x = detailImg.x;
		adddlImg.y = capacityAddTxt.y + capacityAddTxt.height/2 - adddlImg.height/2;
		this._nodeContainer.addChild(adddlImg);
        adddlImg.name = "adddlImg";

        let icon = BaseBitmap.create("public_icon12");
        icon.x = produceTxt.x;
        icon.y = capacityTxt.y + deltaY-15;
        this._nodeContainer.addChild(icon);

        this._progressBar = ComponentManager.getProgressBar("progress3","progress3_bg",450);
		this._progressBar.x = icon.x + icon.width + 7;
		this._progressBar.y = icon.y + icon.height/2 - this._progressBar.height/2 ;
		this._progressBar.setTextSize(18);
        
		this._nodeContainer.addChild(this._progressBar);

        let collectBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"practice_collect",this.collectHandler,this);
		collectBtn.x = bg1.x + bg1.width/2 - collectBtn.width/2;
		collectBtn.y = bg1.y + bg1.height + 10;
		this._nodeContainer.addChild(collectBtn);

        this.refreshUI();
    }
    public refreshUI()
    {   
    
        let produceTxt:BaseTextField = <BaseTextField>this._nodeContainer.getChildByName("produceTxt");
        let produceAddTxt:BaseTextField = <BaseTextField>this._nodeContainer.getChildByName("produceAddTxt");
        let capacityTxt:BaseTextField = <BaseTextField>this._nodeContainer.getChildByName("capacityTxt");
        let capacityAddTxt:BaseTextField = <BaseTextField>this._nodeContainer.getChildByName("capacityAddTxt");
        let basecfg = GameConfig.config.practicebaseCfg;
         if(Api.practiceVoApi.getStorageLv() == basecfg.storeAddMax)
         {
             let adddlImg = this._nodeContainer.getChildByName("adddlImg");
             adddlImg.visible = false;
             if(!this._nodeContainer.getChildByName("maxImg"))
             {
                let maxImg = BaseBitmap.create("practice_max");
                maxImg.x = adddlImg.x;
                maxImg.y = adddlImg.y;
                this._nodeContainer.addChild(maxImg);
                maxImg.name = "maxImg";
             }
             
         }
        let slv = Api.practiceVoApi.getStorageLv();
        slv = slv? slv : 0;

        //加成容量
        let addLimitRate = basecfg.storeAdd  * 100 * slv
        let totalLimit = Api.practiceVoApi.getStorageRealLimit();
        capacityTxt.text = LanguageManager.getlocal("practiceStoragecapacity",["" + totalLimit]);
        capacityAddTxt.text = LanguageManager.getlocal("practiceStoragecapacityAdd",[ addLimitRate.toFixed(0) ]);
        let spAdd = Api.practiceVoApi.getspdAdd();
        let speed = basecfg.level[Api.playerVoApi.getPlayerLevel()-1] *(1+spAdd);
        
        produceTxt.text = LanguageManager.getlocal("practiceStorageproduct",[speed.toFixed(0)]);
        produceAddTxt.text = LanguageManager.getlocal("practiceStorageproductAdd",[""+(spAdd * 100).toFixed(0)]);

        let st = Api.practiceVoApi.getStorageInfo().st;
		let deltaT = basecfg.time;
        let getV = Api.practiceVoApi.getCurStorageValue();
		if( getV >= totalLimit)
		{
			 getV = totalLimit ;
		}

        this._progressBar.setText(getV.toFixed(0) +"/"+totalLimit);
        this._progressBar.setPercentage(getV/totalLimit);
    }
    public collectCallbackHandler(event?:egret.Event):void
	{
        let ret = event.data.data.ret
        if (ret == 0 )
        {
            let resName:string = "public_icon12";
            let params:any[]=[]
            let resNum = event.data.data.data.expnum
            App.CommonUtil.playRewardFlyAction([{icon:resName,tipMessage:""+resNum}]);
        }        
        this.hide();
    }
    protected collectHandler()
    {
        if(Api.practiceVoApi.isCollectEnable())
        {
            NetManager.request(NetRequestConst.REQUEST_REQUEST_COLLECT,{});
        }else
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("practice_collectNoNum"));
        }
        // NetManager.request(NetRequestConst.REQUEST_REQUEST_COLLECT,{});
    }

    protected detailClickHandler()
	{
        ViewController.getInstance().openView(ViewConst.POPUP.PRACTICEGETPOPUPVIEW,{pnum:100});
    }
    protected addClickHandler()
	{
        ViewController.getInstance().openView(ViewConst.POPUP.PRACTICEEXPANDPOPUPVIEW,{});
    }
    protected upCallbackHandler(event?:egret.Event):void
	{
        let ret = event.data.data.ret
        if (ret != 0 )
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("practice_storage_upFailed"));
            return ;
        }
        App.CommonUtil.showTip(LanguageManager.getlocal("practice_storage_upSuccess"));
       this.refreshUI();
    }
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"progress3","progress3_bg","servant_detailBtn","servant_detailBtn_down",
            "practice_max","practice_plus_down","practice_plus",
		]);
	}

	protected getShowHeight():number
	{
		return 420;
	}
    public dispose():void
	{
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_COLLECT),this.collectCallbackHandler,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PRACTICE_UPSTORAGE),this.upCallbackHandler,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_STORAGE,this.refreshUI,this);

        this._progressBar = null;
        this._nodeContainer = null;

		super.dispose();
	}
}