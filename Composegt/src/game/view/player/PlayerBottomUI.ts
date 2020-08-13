/**
 * author yanyuling
 * date 2018/04/18
 * @class PlayerBottomUI
 */
class PlayerBottomUI extends BaseLoadDisplayObjectContiner
{
    private _btnList:BaseButton[]= [];
    private _openIdx:number=0;
	public constructor() 
	{
		super();
        // this.show();
	}
    public show(data?:any):void
	{
		// super.show(data);
        ViewController.getInstance().openView(ViewConst.COMMON.PLAYERVIEW);

	}
	/**
	 * 填内容
	 */
	protected init():void
	{
        this.height = 0;
        if (Api.practiceVoApi.isPracticeOPen() )
        {
            App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED,this.checkRedPoints,this);
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_INDEX),this.checkRedPoints,this);
            NetManager.request(NetRequestConst.REQUEST_REQUEST_INDEX,{});
            let bg = BaseBitmap.create("wifeskin_barbg");
            bg.x = 0;
            bg.y = GameConfig.stageHeigth - bg.height;
            this.addChild(bg);

            let resList=[
               "", "player_tab1","player_tab3","player_tab2"
            ]
            for (var index = 1; index <= 3; index++) {
                // let btnImg = "practice_btn";
                // let btnText = "practice_bottomBtnTxt"+index;
                let btnImg = resList[index];
                let btnText = "";
                let tabBtn = ComponentManager.getButton(btnImg,btnText,this.btnHandler,this,[index]);
                tabBtn.x = bg.width/2 + (index -2) * 200 - tabBtn.width/2;
                tabBtn.y = bg.y +bg.height/2 -tabBtn.height/2;
                this.addChild(tabBtn);
                this._btnList.push(tabBtn);
                if(index == 3 && !Api.practiceVoApi.isPracticeUnlock())
                {
                    // tabBtn.visible = false;
                    // tabBtn.setEnable(false);
                    // tabBtn.updateButtonImage(BaseButton.BTN_STATE3);
                    App.DisplayUtil.changeToGray(tabBtn); 
                }
            }
            this.height = bg.height;
            this.checkRedPoints();
        }
         /**
         * 默认打开官品UI
         */
        this.btnHandler(1);
        
    }
    public checkRedPoints()
    {
        if (!Api.practiceVoApi.isPracticeOPen() || this._btnList.length == 0 )
        {
            return
        }
        if(Api.practiceVoApi.isPracticeUnlock())
        {
            App.DisplayUtil.changeToNormal(this._btnList[2]); 
            this._btnList[2].visible = true;
        }
        if(Api.practiceVoApi.isShowRedForPBottom() && Api.practiceVoApi.isPracticeUnlock())
		{
			App.CommonUtil.addIconToBDOC(this._btnList[2]);
            let reddot = this._btnList[2].getChildByName("reddot");
            reddot.x = 90;
            reddot.y = 5;
		}else{
			App.CommonUtil.removeIconFromBDOC(this._btnList[2]);
		}

        /**
         * 升官红点
         */
        let curLv = Api.playerVoApi.getPlayerLevel()
		let nextLvCfg =  Config.LevelCfg.getCfgByLevel((curLv+1).toString());
		if (nextLvCfg && Api.playerVoApi.getPlayerExp() >=  nextLvCfg.exp)
        {
            App.CommonUtil.addIconToBDOC(this._btnList[0]);
            let reddot = this._btnList[0].getChildByName("reddot");
            reddot.x = 90;
            reddot.y = 5;
        }else{
            App.CommonUtil.removeIconFromBDOC(this._btnList[0]);
        }
        /**
         * 称帝红点
         */
        if (Api.prestigeVoApi.isShowRedDot)
		{
			App.CommonUtil.addIconToBDOC(this._btnList[1]);
            let reddot = this._btnList[1].getChildByName("reddot");
            reddot.x = 90;
            reddot.y = 5;
		}else{
            App.CommonUtil.removeIconFromBDOC(this._btnList[1]);
        }
    }
 
    public btnHandler(param:number)
    {
        let openKey = "";
        let keyList=[
            ViewConst.COMMON.PLAYERVIEW,
            ViewConst.COMMON.PRACTICEVIEW,
            ViewConst.COMMON.PRESTIGEVIEW,
        ]
        if(param == 1)
        {
            openKey = ViewConst.COMMON.PLAYERVIEW ;
        }else if(param == 3)
        {
            if(!Api.practiceVoApi.isPracticeUnlock())
            {
                App.CommonUtil.showTip(Api.practiceVoApi.getUnlockStr());
                return;
            }
            openKey = ViewConst.COMMON.PRACTICEVIEW;
        }else if(param == 2)
        {
            openKey = ViewConst.COMMON.PRESTIGEVIEW;
        }
        ViewController.getInstance().openView(openKey);
        
        // let tmpview = ViewController.getInstance().getView(openKey) ;
        // let idx = tmpview.parent.getChildIndex(tmpview);
        // egret.callLater(()=>{
        //     this.getParent().addChild(this);
        // },this)

        for (var key in keyList) {
            if(keyList[key] != openKey)
            {
                ViewController.getInstance().hideView(keyList[key]);
            }
        }
        for (var index = 0; index < this._btnList.length; index++) {
            if(index == param-1)
            {
                this._btnList[index].updateButtonImage(BaseButton.BTN_STATE2);
            }else{
                this._btnList[index].updateButtonImage(BaseButton.BTN_STATE1);
            }
        }
    }

    public dispose():void
	{
        this._btnList = [];
        this._openIdx = 0;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_INDEX),this.checkRedPoints,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED,this.checkRedPoints,this);

		super.dispose();
	}
    protected getResourceList():string[]
	{
        return [
            // "wifeskin_barbg",
            
            "practice_btn_down",
            "practice_btn",
            "player_tab1","player_tab1_down",
            "player_tab2","player_tab2_down",
            "player_tab3","player_tab3_down",
        ];
    }

    public hide(isForce?:boolean):void
	{
		if(isForce){
            super.hide();
        }
	}

    protected getParent():egret.DisplayObjectContainer
	{
		return LayerManager.panelLayer;
        // return LayerManager.maskLayer
	}
    public get showHeight():number
    {
        return this.height;
    }
    
	private static _instance:PlayerBottomUI;
    public static getInstance():PlayerBottomUI
	{
		if(!PlayerBottomUI._instance)
		{
			PlayerBottomUI._instance= new PlayerBottomUI();
		}
        return PlayerBottomUI._instance;
	}
        public static checkInstance():boolean
     {
        if(PlayerBottomUI._instance)
        {
            return true;
        }
        return false;
     }
}