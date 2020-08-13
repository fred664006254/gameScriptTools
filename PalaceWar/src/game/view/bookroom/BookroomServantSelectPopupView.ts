/**
 * 书院选择门客
 * author yanyuling
 * date 2017/11/24
 * @class BookroomServantSelectPopupView
 */
class BookroomServantSelectPopupView  extends PopupView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _posId;
    public constructor() 
	{
		super();
	}

	public initView():void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY),this.studyCallBack,this);
        this._posId = this.param.data.posId;
        
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        let bookCfg = GameConfig.config.bookroomCfg;
        
        let txt1 = ComponentManager.getTextField("",20);
        txt1.textColor = TextFieldConst.COLOR_BROWN;
        txt1.text = LanguageManager.getlocal("bookRoomServantSelecttxt1",[String(bookCfg.getBookExp),String(bookCfg.getSkillExp)]);
        txt1.x = 40+GameData.popupviewOffsetX;
        txt1.y = 20;
        this._nodeContainer.addChild(txt1);

        let txt2 = ComponentManager.getTextField("",20);
        txt2.textColor =txt1.textColor; 
        txt2.text = LanguageManager.getlocal("bookRoomServantSelecttxt2",["3" + LanguageManager.getlocal("date_hour2")]);
        txt2.x = txt1.x;
        txt2.y = txt1.y + 30;
        this._nodeContainer.addChild(txt2);


        let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 528;
		bg.height = 634;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = txt2.y +30;
		this._nodeContainer.addChild(bg);

        let rect = new egret.Rectangle(0,0,bg.width,bg.height-10);
        let idList= Api.servantVoApi.getServantInfoIdListWithSort(2);
        

        let idList1=[];
        let idList2=[];
        for (var index = 0; index < idList.length; index++) {
            let key = idList[index];
            if (! Api.bookroomVoApi.isStudying(key))
            {
                idList1.push(key);
            }else
            {
                idList2.push(key);
            }
        }
		let keys = idList1.concat(idList2);
        BookroomServantScrollItem._posId = this._posId;
        BookroomServantScrollItem._data = this.param.data;
        let scrollList = ComponentManager.getScrollList(BookroomServantScrollItem,keys,rect);
		scrollList.x = bg.x;
        scrollList.y = bg.y+5;
		this._nodeContainer.addChild(scrollList);

    }

    protected getShowHeight():number
    {
        return 800;
    }
    
    protected studyCallBack(event:egret.Event)
    {
        // let rdata = event.data.data;
        // egret.log(">>>>>>>");
        this.hide();
    }
 
    public dispose():void
	{
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY),this.studyCallBack,this);
        this._nodeContainer = null;
        this._posId = null;
        
        super.dispose();
    }
}


