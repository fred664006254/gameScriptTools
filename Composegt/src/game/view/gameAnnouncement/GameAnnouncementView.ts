class GameAnnouncementView extends PopupView {

    private _scrollList: ScrollList;
    private _announcementList: Array<any> = [];
    public static currNum:number =0;
    private _notice = null;
    public static  NOTICE_LIST = null
    public constructor() {
        super();
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "uncompress",
		]);
	}

    protected initView(): void {
        this.closeBtn.y = 45;
		this.titleTF.x = 294;  
        if(PlatformManager.checkIsViSp())
        {
            this.titleTF.x = 264;
        }
        else if(PlatformManager.checkIsJPSp())
        {
            this.titleTF.x = 264;
        }
		this.titleTF.y = 85;
		this.titleTF.size =TextFieldConst.FONTSIZE_BUTTON_COMMON;
        this.showBg();
        this.showList();
    } 
    protected isShowOpenAni():boolean
	{
		return false;
	}
    public showBg():void
    {
        let bg = BaseBitmap.create("load_2");
		bg.width = 538;
	    bg.height = 630;
        bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
        bg.y = 75;
		this.addChildToContainer(bg);
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
        rect.setTo(0, 0, 518, 590);
        this._scrollList = ComponentManager.getScrollList(AnnouncementScrollItem, this._announcementList, rect);
      
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(65, 90);
        this._scrollList.addTouchTap(this.clickItemHandler, this);

        var _announcementScrollItem: AnnouncementScrollItem = <AnnouncementScrollItem>this._scrollList.getItemByIndex(0);
         _announcementScrollItem.itemListType =true;
         _announcementScrollItem.touchNum += 1;
         this._scrollList.refreshData(this._announcementList);
    }
    public clickItemHandler(event: egret.TouchEvent): void {
        
        GameAnnouncementView.currNum =event.data;
        var _announcementScrollItem: AnnouncementScrollItem = <AnnouncementScrollItem>this._scrollList.getItemByIndex(event.data);
        _announcementScrollItem.touchNum += 1;
        if (_announcementScrollItem.touchNum % 2 == 0) {
            _announcementScrollItem.itemListType = false;
        }
        else {
            _announcementScrollItem.itemListType = true;
        }
        this._scrollList.refreshData(this._announcementList);
        // this._scrollList.setScrollTopByIndex(event.data);
    }

    protected resetBgSize():void
	{
        super.resetBgSize();
	// 	this.viewBg.height = 775;
	// 	this.viewBg.y = 40;
		// this.closeBtn.y = 45;
		this.titleTF.x = 294;  
        if(PlatformManager.checkIsViSp())
        {
            this.titleTF.x = 264;
        }
        else if(PlatformManager.checkIsJPSp())
        {
            this.titleTF.x = 264;
        }
		this.titleTF.y = this.viewBg.y + 30;
		this.titleTF.size =TextFieldConst.FONTSIZE_BUTTON_COMMON;
    //     this.y = 0;
    //     this.y = this.y+GameConfig.stageHeigth/2 -this.viewBg.height/2;
    //     this._maskBmp.y = -this.y;
	}
    protected getShowHeight():number
	{
		return 775;
	}
	protected getCloseBtnName():string
	{
		return "load_closebtn";
	}
	protected getBgName():string
	{
		return "load_bg";
	}
    // protected getSheepType(): number {
    //     return 1;
    // }
    public dispose(): void {
        this._announcementList = [];
        super.dispose();
    }

}