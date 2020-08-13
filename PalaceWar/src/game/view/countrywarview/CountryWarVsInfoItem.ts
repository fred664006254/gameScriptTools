/**
 * author:qianjun
 * desc:门客战斗item
*/
class CountryWarVsInfoItem extends ScrollListItem
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

        let width = 0;
        //等级头衔
        let str = Api.playerVoApi.getPlayerOfficeByLevel(data.level);
        let titleId = data.titleid;
        if(titleId){
            let titleinfo = App.CommonUtil.getTitleData(titleId);
            if(titleinfo.title != ``){
                let title = Config.TitleCfg.getTitleCfgById(titleinfo.title);
                if(title && title.isTitle == 1 && title.titleType){
                    str = title.titleName;
                }   
                let titleImg = App.CommonUtil.getTitlePic(titleId);
                titleImg.width = 155;
                titleImg.height = 59;
                titleImg.setScale(0.65);
                width = 155 * 0.65;
                view.setLayoutPosition(LayoutConst.leftverticalCenter, titleImg, view, [20,0]);
                view.addChild(titleImg);
            }
        }
        else{
            let zidname = LanguageManager.getlocal('allianceWarVsPlayerPos', [str]);
            let serverTxt = ComponentManager.getTextField(zidname, 20);
            view.setLayoutPosition(LayoutConst.leftverticalCenter, serverTxt, view, [20,0]);
            view.addChild(serverTxt);
            width = serverTxt.textWidth;
            //serverTxt.textColor = data.type == 'left' ? TextFieldConst.COLOR_QUALITY_BLUE : TextFieldConst.COLOR_QUALITY_YELLOW; 
            
            if(data.uid == Api.playerVoApi.getPlayerID()){
                serverTxt.textColor = TextFieldConst.COLOR_QUALITY_BLUE; 
            }
        }

        let nameTxt = ComponentManager.getTextField(data.name,TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, maskbg, [20 + width + 5,0]);
        view.addChild(nameTxt);
    
        if(Api.playerVoApi.getPlayerID() == data.uid){
            nameTxt.textColor = TextFieldConst.COLOR_QUALITY_BLUE; 
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