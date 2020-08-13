/**
 * author:qianjun
 * desc:帮会战斗item
*/
class AllianceWarVsPlayerInfoItem extends ScrollListItem
{
	public constructor() {
		super();
    }
    
    private _data : any = null;

	protected initItem(index:number,data:any)
    {	
        let view = this;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        this._data = data;
        this.width = 310;
        this.height = 40 + 10;

        let maskbg = BaseBitmap.create(`crossservantplayernamebg`);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, maskbg, view);
        view.addChild(maskbg);

        let zidname = LanguageManager.getlocal('allianceWarVsPlayerPos', [LanguageManager.getlocal(`allianceMemberPo${data.allipos}`)]);
        let serverTxt = ComponentManager.getTextField(zidname,TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, serverTxt, maskbg, [20,0]);
        view.addChild(serverTxt);

        let nameTxt = ComponentManager.getTextField(data.name,TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, serverTxt, [serverTxt.textWidth + 10,0]);
        view.addChild(nameTxt);
    
        if(data.uid == Api.playerVoApi.getPlayerID()){
            serverTxt.textColor = nameTxt.textColor = TextFieldConst.COLOR_QUALITY_BLUE; 
        }
        // else if(Api.mergeServerVoApi.judgeIsSameServer(data.zid,Api.mergeServerVoApi.getTrueZid())){
		// 	serverTxt.textColor = nameTxt.textColor = TextFieldConst.COLOR_QUALITY_BLUE; 
        // }
    }

	public dispose():void
    {
        let view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        super.dispose();
    }
}