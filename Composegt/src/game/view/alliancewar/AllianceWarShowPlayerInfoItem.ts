/**
 * author:qianjun
 * desc:帮会战斗item
*/
class AllianceWarShowPlayerInfoItem extends ScrollListItem
{
    private serverTxt : BaseTextField = null;
    private nameTxt : BaseTextField = null;
    public constructor() {
		super();
    }
    
    private _data : any = null;

	protected initItem(index:number,data:any)
    {	
        let view = this;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        this._data = data;
        this.width = 255;
        this.height = 20 + 5;

        if(data.empty){
            return;
        }

        let zidname = LanguageManager.getlocal('allianceWarVsPlayerPos', [LanguageManager.getlocal(`allianceMemberPo${data.allipos}`)]);
        let serverTxt = ComponentManager.getTextField(zidname, 20);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, serverTxt, view, [20,0]);
        view.addChild(serverTxt);

        let nameTxt = ComponentManager.getTextField(data.name, 20);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, serverTxt, [serverTxt.textWidth + 10,0]);
        view.addChild(nameTxt);
        if(index == 0){
            serverTxt.textColor = nameTxt.textColor = data.type == 'left' ? 0x47c5ff : TextFieldConst.COLOR_QUALITY_YELLOW; 
        }
        view.serverTxt = serverTxt;
        view.nameTxt = nameTxt;
        // else if(Api.mergeServerVoApi.judgeIsSameServer(data.zid,Api.mergeServerVoApi.getTrueZid())){
		// 	serverTxt.textColor = nameTxt.textColor = TextFieldConst.COLOR_QUALITY_BLUE; 
        // }
    }

    public refreshTextColor():void{
        let view = this;
        if(view.serverTxt){
            view.serverTxt.textColor = view.nameTxt.textColor = this._data.type == 'left' ? 0x47c5ff : TextFieldConst.COLOR_QUALITY_YELLOW; 
        }
    }

	public dispose():void
    {
        let view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        super.dispose();
    }
}