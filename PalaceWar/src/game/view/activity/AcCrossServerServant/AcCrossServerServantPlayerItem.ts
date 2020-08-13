/**
 * author:qianjun
 * desc:门客擂台item
*/
class AcCrossServerServantPlayerItem extends ScrollListItem
{
	public constructor() {
		super();
    }
    
    private _data : any = null;

	protected initItem(index:number,data:any)
    {	
        let type = data.type;
        let view = this;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        this._data = data;
        this.width = 310;
        this.height = 40 + 10;

        let maskbg = BaseBitmap.create(`crossservantplayernamebg`);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, maskbg, view);
        view.addChild(maskbg);

        let nameTxt = ComponentManager.getTextField(data.name,TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, maskbg, [20,0]);
        view.addChild(nameTxt);
    
        let zidname = Api.mergeServerVoApi.getAfterMergeSeverName(data.uid);
        let serverTxt = ComponentManager.getTextField(zidname,TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
		view.setLayoutPosition(LayoutConst.rightverticalCenter, serverTxt, maskbg, [20,0]);
        view.addChild(serverTxt);

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