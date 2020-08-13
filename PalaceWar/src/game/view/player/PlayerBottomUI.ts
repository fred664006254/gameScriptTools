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
        this.show();
	}
    public show(data?:any):void
	{
		super.show(data);
	}
	/**
	 * 填内容
	 */
	protected init():void
	{ 
        this.height = 0;
        let resList=[
            "player_tab1","player_tab3","player_tab2"
        ];

        if (Api.switchVoApi.checkOpenOfficialCareer())
        {
            resList.push("player_tab4");
        }

        if (Api.unlocklist2VoApi.checkShowOpenFunc()){
            resList = ["player_tab1","player_tab3","player_tab2","player_tab4"];
        }
        
        if (( Api.practiceVoApi.isPracticeOPen() || Api.switchVoApi.checkOpenPrestige() )  )
        {
            App.MessageHelper.addEventListener(MessageConst.MESSAGE_TITLEUPGRADE_MODEL,this.checkRedPoints,this);
            App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED,this.checkRedPoints,this);
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_INDEX),this.checkRedPoints,this);
            App.MessageHelper.addEventListener(MessageConst.MESSAGE_ENCOUNTER_MODEL,this.checkRedPoints,this);
            NetManager.request(NetRequestConst.REQUEST_REQUEST_INDEX,{});
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.PRACTICE_UPSKILLEXP),this.checkRedPoints,this);
            App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN, this.freshOpenFunc, this);
  
            let bg = BaseBitmap.create("wifeskin_barbg");
            bg.x = 0;
            bg.y = GameConfig.stageHeigth - bg.height;
            this.addChild(bg);

            for (var index = 1; index <= resList.length; index++) {
           
                let btnImg = resList[index-1];
                let tabBtn = ComponentManager.getButton(btnImg,"",this.btnHandler,this,[index]);
                if (Api.unlocklist2VoApi.checkShowOpenFunc()){
                    if (index == 2){
                        if (Api.switchVoApi.checkOpenPrestige()){
                            App.DisplayUtil.changeToGray(tabBtn);
                        }
                        else{
                            App.DisplayUtil.changeToNormal(tabBtn);
                        }
                    }
                    if (index == 3 || index == 4){
                        let name = "";
                        if (index == 3){
                            name = "practice";
                        }
                        else if (index == 4){
                            name = "officialCareer";
                        }
                        if (name && Api.unlocklist2VoApi.checkIsCanShowFunc(name)){
                            tabBtn.visible = true;
                        }
                        else{
                            tabBtn.visible = false;
                        }
                    }
                    tabBtn.x = GameConfig.stageWidth/resList.length * (index-0.5)-tabBtn.width/2;
                    tabBtn.y = bg.y +bg.height/2 -tabBtn.height/2;
                    this.addChild(tabBtn);
                    this._btnList.push(tabBtn);
                }
                else{
                    tabBtn.x = GameConfig.stageWidth/resList.length * (index-0.5)-tabBtn.width/2;
                    tabBtn.y = bg.y +bg.height/2 -tabBtn.height/2;
                    this.addChild(tabBtn);
                    this._btnList.push(tabBtn);
                    if(index == 3 && (!Api.practiceVoApi.isPracticeUnlock() || !Api.practiceVoApi.isPracticeOPen() ) )
                    {
                        App.DisplayUtil.changeToGray(tabBtn); 
                    }

                    if(index == 2 && !Api.switchVoApi.checkOpenPrestige() )
                    {
                        App.DisplayUtil.changeToGray(tabBtn); 
                    }
                    else if(index == 4 && Api.playerVoApi.getPlayerLevel() < Config.CareerCfg.getStoryNeedLv())
                    {
                        App.DisplayUtil.changeToGray(tabBtn); 
                    }
                }
            }
            if (Api.unlocklist2VoApi.checkShowOpenFunc()){
                this.resetBottomBtnPos();
            }
            this.height = bg.height;
            this.checkRedPoints();
        }
         /**
         * 默认打开官品UI
         */
        this.btnHandler(1);
        
    }

    public resetBottomBtnPos():void{
        let showBtnList:any[] = [];
        for (let i=0; i < this._btnList.length; i++){
            let btn = this._btnList[i];
            if (btn && btn.visible){
                showBtnList.push(btn);
            }
        }
        for (let i=1; i <= showBtnList.length; i++){
            let btn = showBtnList[i-1];
            btn.x = GameConfig.stageWidth/showBtnList.length * (i-0.5)-btn.width/2;
        }
    }

    private freshOpenFunc(evt:egret.Event):void{
        if (evt && evt.data){
            let key = evt.data.key;
            App.LogUtil.log("key "+key);
            if (key == "practice"){
                if (Api.unlocklist2VoApi.checkIsCanShowFunc(key)){
                    this._btnList[2].visible = true;
                    this.resetBottomBtnPos();
                }
            }
            else if (key == "officialCareer"){
                if (Api.unlocklist2VoApi.checkIsCanShowFunc(key)){
                    this._btnList[3].visible = true;
                    this.resetBottomBtnPos();
                }
            }
        }
    }

    public checkRedPoints()
    {
        if ( this._btnList.length == 0 )
        {
            return
        }
        // !Api.practiceVoApi.isPracticeOPen() ||
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_PRACTICE_RED2);

        if(Api.practiceVoApi.isPracticeUnlock() && Api.practiceVoApi.isPracticeOPen())
        {
            App.DisplayUtil.changeToNormal(this._btnList[2]); 
            // this._btnList[2].visible = true;
        }

        if( Api.switchVoApi.checkOpenPrestige() )
        {
            App.DisplayUtil.changeToNormal(this._btnList[1]); 
            // this._btnList[2].visible = true;
        }
        if (Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv())
        {
            if (this._btnList[3])
            {
                App.DisplayUtil.changeToNormal(this._btnList[3]); 
            }
        }

        //修身技能红点
        if(Api.practiceVoApi.isShowRedForPBottom() && Api.practiceVoApi.isPracticeUnlock()||Api.practiceVoApi.skillRed()==true)
		{
             if(Api.practiceVoApi.isPracticeOPen())
             {  
                let unlockLv = GameConfig.config.practicebaseCfg.unlockLv;
                var mylv =Api.playerVoApi.getPlayerLevel();
                if(mylv>=unlockLv)
                {
                    App.CommonUtil.addIconToBDOC(this._btnList[2]);
                    let reddot = this._btnList[2].getChildByName("reddot");
                    reddot.x = 90;
                    reddot.y = 5;
                } 
             }
		
		}else{
			App.CommonUtil.removeIconFromBDOC(this._btnList[2]);
        }
        
        let qingyuanflag = false;
        //情缘绘卷红点
        if(Api.switchVoApi.checkOpenOfficialCareer() && Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv()){
            if(Api.encounterVoApi.isShowNpc() && Api.switchVoApi.checkOpenQingYuanHuiJuan())
            {
                if(Api.practiceVoApi.isPracticeOPen())
                {  
                    qingyuanflag = true;
                }
            
            }else{
                qingyuanflag = false;
            }
        }

        let titleupgradeflag = false;
        //帝王霸业红点
        if(Api.switchVoApi.checkOpenOfficialCareer() && Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv()){
            if((Api.titleupgradeVoApi.checkNpcMessage() || (Api.switchVoApi.checkOpenEmperorsAchievement() &&Api.emperorAchieveVoApi.isShowKingAchieveRedDot())) && Api.switchVoApi.checkTitleUpgrade())
            {
                if(Api.practiceVoApi.isPracticeOPen())
                {  
                    titleupgradeflag = true;
                }
            
            }else{
                titleupgradeflag = false;
                
            }
        }
        if(qingyuanflag ||  titleupgradeflag){
            App.CommonUtil.addIconToBDOC(this._btnList[3]);
            let reddot = this._btnList[3].getChildByName("reddot");
            reddot.x = 90;
            reddot.y = 5;
        }
        else{
            App.CommonUtil.removeIconFromBDOC(this._btnList[3]);
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
        if (Api.prestigeVoApi.isShowRedForPBottom() )
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
            ViewConst.COMMON.OFFICIALCAREERVIEW,
        ]
        if(param == 1)
        {
            openKey = ViewConst.COMMON.PLAYERVIEW ;
        }
        else if(param == 3)
        {
            if(!Api.practiceVoApi.isPracticeOPen())
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("practice_unlockTip2"));
                return;
            }
            if(!Api.practiceVoApi.isPracticeUnlock())
            {
                App.CommonUtil.showTip(Api.practiceVoApi.getUnlockStr());
                return;
            }
            openKey = ViewConst.COMMON.PRACTICEVIEW;
        }else if(param == 2)
        {
            if(!Api.switchVoApi.checkOpenPrestige())
            {
                 App.CommonUtil.showTip(Api.prestigeVoApi.getUnlockStr());
                return;
            }
            openKey = ViewConst.COMMON.PRESTIGEVIEW;
        }
        else if(param == 4)
        {   
            if (Api.playerVoApi.getPlayerLevel() < Config.CareerCfg.getStoryNeedLv() )
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("mianUIFriendBtnTip",[LanguageManager.getlocal("officialTitle" + Config.CareerCfg.getStoryNeedLv())]));
                return;
            }
            openKey = ViewConst.COMMON.OFFICIALCAREERVIEW;
        }
        this._openIdx = param;
        ViewController.getInstance().openView(openKey);
        // this.visible = true;
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
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_TITLEUPGRADE_MODEL,this.checkRedPoints,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.PRACTICE_UPSKILLEXP),this.checkRedPoints,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ENCOUNTER_MODEL,this.checkRedPoints,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN, this.freshOpenFunc, this);
		super.dispose();
	}
    protected getResourceList():string[]
	{
        return [
            "wifeskin_barbg",
            "practice_btn_down.",
            "practice_btn",
            "player_tab1","player_tab1_down",
            "player_tab2","player_tab2_down",
            "player_tab3","player_tab3_down",
            "player_tab4","player_tab4_down",
        ];
    }

    public hide(isForce?:boolean):void
	{
		if(isForce){
            super.hide();
            PlayerBottomUI._instance = null;
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
            PlayerBottomUI._instance.visible = false;
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