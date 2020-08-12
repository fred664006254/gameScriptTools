/**
 * 邮件列表弹板
 * author dmj
 * date 2017/10/31
 * @class MailPopupView
 */
/*
 *@description: 邮件列表弹版从江山美人修改到 dice
 *@author: bToTd 
 *@update date: 2020-04-11 09:46:37
 *@version 
 */

class MailPopupView extends PopupView
{
	private mainInfoList = [];
	private listView:ScrollList;
	

	public constructor() 
	{
		super();
	}
	protected getMsgConstEventArr():string[]{
		return [
            MsgConst.MODEL_MYMAIL
		];
	}

	protected msgEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
            case MsgConst.MODEL_MYMAIL:
                view.refreshList(evt);
                break;
        }
    }
	protected initView():void
	{	
		this.initMailInfo();
		this.listView = ComponentMgr.getScrollList(MailScrollItem, this.mainInfoList, new egret.Rectangle(0, 0, 503, 730));
		this.addChildToContainer(this.listView);
		this.listView.x = (this.viewBg.width - this.listView.width) / 2;
		// this.listView.y = 18;
		// this.listView.setScrollTop(40);
		if(!this.mainInfoList || this.mainInfoList.length <= 0){
			let nomailIcon = BaseBitmap.create("mail_view_nomail");
			this.addChildToContainer(nomailIcon);
			nomailIcon.x = 89;
			nomailIcon.y = 80;

			let noMailText = ComponentMgr.getTextField(LangMger.getlocal("noemail"), TextFieldConst.SIZE_30, 0x6B7DA3);
			noMailText.x = 0;
			noMailText.bold = true
			noMailText.width = this.viewBg.width;
			noMailText.textAlign = egret.HorizontalAlign.CENTER;
			noMailText.y = nomailIcon.y + nomailIcon.height + 20;
			this.addChildToContainer(noMailText);
		}
	}

	protected initBg(){
		super.initBg();
		this.viewBg.width = this.getShowWidth();
	}

	private initMailInfo(){
		this.mainInfoList = Api.MymailVoApi.getMailIDs();
	}

	private refreshList(event){
		this.mainInfoList = Api.MymailVoApi.getMailIDs();
		if(this.listView != null){
			this.listView.refreshData(this.mainInfoList);
		}
	}

	public getResourceList(){
		return super.getResourceList().concat(["updatenotice_tab", "mail_unread_icon"])
	}

	protected getRequestData():{requestType:string,requestData:any}
	{
		return {
			requestType: NetConst.MAIN_LIST,
			requestData: null
		};
	}

	protected getShowHeight():number
	{
		return 841;
	}
	// 背景图名称
    protected getBgName():string
    {
        return "ab_task_view_bg";
    }

	public dispose():void
	{
		this.listView = null;
		this.mainInfoList = [];
		super.dispose();
	}

}