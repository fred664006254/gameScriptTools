class GameAnnouncementView extends PopupView {

    private _scrollList: ScrollList;
    private _announcementList: Array<any> = [];
    public static currNum:number =0;
    private _notice = null;
    public static  NOTICE_LIST = null
    // private _bg:BaseBitmap=null;
    private _titleBmp:BaseBitmap=null;
    private _checkBox:CheckBox=null;
    public constructor() {
        super();
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"public_9_bg4",
            "uncompress",
            "announcement_itembg1",
            "announcement_title",
		]);
	}

    protected initView(): void {
        // this.showBg();
        let titleBmp:BaseBitmap=BaseBitmap.create("announcement_title");
        this.addChild(titleBmp);
        this._titleBmp=titleBmp;
    }

    protected getTitleStr():string
	{
		return null;
	}

    protected getBgName():string
	{
		return "announcementbg";
	}

    protected resetBgSize(): void 
    {
        this.viewBg.height = 508;
        this.viewBg.x = GameConfig.stageWidth-this.viewBg.width;
        this.viewBg.y = (GameConfig.stageHeigth-this.viewBg.height)*0.5-50;
        this._titleBmp.setPosition(this.viewBg.x+(this.viewBg.width-this._titleBmp.width)/2-18,this.viewBg.y+14);
        this.closeBtn.x =this.viewBg.x +this.viewBg.width-44-this.closeBtn.width/2;
        this.closeBtn.y = this.viewBg.y+70;
        this.showList();
        this._scrollList.setPosition(this.viewBg.x+49.5, this.viewBg.y+100);
        this._scrollList.refreshData(this._announcementList);

        let guideBmp:BaseLoadBitmap=BaseLoadBitmap.create("announcement_guide");
        guideBmp.y=this.viewBg.y+52;
        this.addChild(guideBmp);

        let isLogin = false;
        if(this.param&&this.param.data&&this.param.data.name=="login")
        {
            isLogin = true;
        }else
        {
            // let shape:BaseShape=new BaseShape();
            // this.addChild(shape);
            // let checkBox:CheckBox=ComponentManager.getCheckBox(LanguageManager.getlocal("activityPopTip"));
            // this.addChild(checkBox);
            // checkBox.setPosition(this.viewBg.x+this.viewBg.width-80-checkBox.width,this.viewBg.y+this.viewBg.height);
            // checkBox.addTouchTap((e:egret.TouchEvent)=>{
                // if(checkBox.checkSelected())
                // {
                //     LocalStorageManager.set(LocalStorageConst.LOCAL_ANNOUNCEMENT_SHOW+Api.playerVoApi.getPlayerID(),String(GameData.announcementLastestT)+"-"+String(GameData.serverTime));
                // }
                // else
                // {
                //     LocalStorageManager.remove(LocalStorageConst.LOCAL_ANNOUNCEMENT_SHOW+Api.playerVoApi.getPlayerID());
                // }
            // },this);
            // this._checkBox=checkBox;
            // shape.graphics.beginFill(0,0.6);
            // shape.graphics.drawRoundRect(0,0,checkBox.width-35,30,5,5);
            // shape.graphics.endFill();
            // shape.setPosition(checkBox.x+40,checkBox.y+(checkBox.height-shape.height)/2-2);
        }
        let shape:BaseShape=new BaseShape();
        this.addChild(shape);
        let checkBox:CheckBox=ComponentManager.getCheckBox(LanguageManager.getlocal("activityPopTip"));
        this.addChild(checkBox);
        checkBox.setPosition(this.viewBg.x+this.viewBg.width-80-checkBox.width,this.viewBg.y+this.viewBg.height);
        checkBox.addTouchTap((e:egret.TouchEvent)=>{
            if (isLogin){
                if(checkBox.checkSelected())
                {
                    LocalStorageManager.set(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW+LoginManager.getLocalUserName(),String(GameData.announcementLoginLastTime));
                }
                else
                {
                    LocalStorageManager.remove(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW+LoginManager.getLocalUserName());
                }
            }
            else{
                if(checkBox.checkSelected())
                {
                    LocalStorageManager.set(LocalStorageConst.LOCAL_ANNOUNCEMENT_SHOW+Api.playerVoApi.getPlayerID(),String(GameData.announcementLastestT)+"-"+String(GameData.serverTime));
                }
                else
                {
                    LocalStorageManager.remove(LocalStorageConst.LOCAL_ANNOUNCEMENT_SHOW+Api.playerVoApi.getPlayerID());
                }
            }
        },this);
        this._checkBox=checkBox;
        shape.graphics.beginFill(0,0.6);
        shape.graphics.drawRoundRect(0,0,checkBox.width-35,30,5,5);
        shape.graphics.endFill();
        shape.setPosition(checkBox.x+40,checkBox.y+(checkBox.height-shape.height)/2-2);
        if (isLogin){
            let localT = LocalStorageManager.get(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW+LoginManager.getLocalUserName());
            if (localT && GameData.checkShowNoticeIsTodayInLogin()){
                checkBox.setSelected(true);
            }
        }
    }

    protected getCloseBtnName():string
	{
		return "sharepopupview_closebtn";
	}
    private showList(): void {
        if(this.param.data.name=="login")
        {   
            if(this.param.data&&this.param.data.notice)
            {
                this._notice =this.param.data.notice;
                this._announcementList  = this._notice;
                GameAnnouncementView.NOTICE_LIST =  this._announcementList; 
            } 
            else
            {
                 this._announcementList = GameAnnouncementView.NOTICE_LIST;
            } 
        }
        else
        {
             this._announcementList = this.param.data;
        }
      
        let rect = egret.Rectangle.create();
        rect.setTo(0, 0, 396, 508-138);
        this._scrollList = ComponentManager.getScrollList(AnnouncementScrollItem, this._announcementList, rect);
      
        this.addChildToContainer(this._scrollList);
        // this._scrollList.setPosition(this.viewBg.x+50, this.viewBg.y+88);
        this._scrollList.addTouchTap(this.clickItemHandler, this);

    }
    public clickItemHandler(event: egret.TouchEvent): void {
        
        GameAnnouncementView.currNum =event.data;
        this._scrollList.refreshData(this._announcementList);
    }
    
    protected getSheepType(): number {
        return 1;
    }
    public dispose(): void {
        if(this._checkBox)
        {
            if(this._checkBox.checkSelected())
            {
                LocalStorageManager.set(LocalStorageConst.LOCAL_ANNOUNCEMENT_SHOW+Api.playerVoApi.getPlayerID(),String(GameData.announcementLastestT)+"-"+String(GameData.serverTime));
            }
            else
            {
                LocalStorageManager.remove(LocalStorageConst.LOCAL_ANNOUNCEMENT_SHOW+Api.playerVoApi.getPlayerID());
            }
        }
        this._announcementList = [];
        GameAnnouncementView.currNum = 0;
        this._titleBmp=null;
        this._scrollList=null;
        this._checkBox=null;
        super.dispose();
    }

}