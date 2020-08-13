/**
 * author:qianjun
 * desc:门客战斗item
*/
class CountryWarShowPlayerInfoItem extends ScrollListItem
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
        this.height = 38 + 5;

        if(data.empty){
            return;
        }

        //等级头衔
        let str = Api.playerVoApi.getPlayerOfficeByLevel(data.level);
        let titleId = data.titleid;
        let width = 0;
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
            view.serverTxt = serverTxt;
            width = serverTxt.textWidth;
            if(index == 0){
                serverTxt.textColor = data.type == 'left' ? TextFieldConst.COLOR_QUALITY_BLUE : TextFieldConst.COLOR_QUALITY_YELLOW; 
            }
        }

        let nameTxt = ComponentManager.getTextField(data.name, 20);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, view, [20 + width + 5,0]);
        view.addChild(nameTxt);
        if(index == 0){
            nameTxt.textColor = data.type == 'left' ? TextFieldConst.COLOR_QUALITY_BLUE : TextFieldConst.COLOR_QUALITY_YELLOW; 
        }
        
       
        view.nameTxt = nameTxt;
        // else if(Api.mergeServerVoApi.judgeIsSameServer(data.zid,Api.mergeServerVoApi.getTrueZid())){
		// 	serverTxt.textColor = nameTxt.textColor = TextFieldConst.COLOR_QUALITY_BLUE; 
        // }
    }

    public refreshTextColor():void{
        let view = this;
        if(view.serverTxt){
            view.serverTxt.textColor = this._data.type == 'left' ? TextFieldConst.COLOR_QUALITY_BLUE : TextFieldConst.COLOR_QUALITY_YELLOW; 
        }
        if(view.nameTxt){
            view.nameTxt.textColor = this._data.type == 'left' ? TextFieldConst.COLOR_QUALITY_BLUE : TextFieldConst.COLOR_QUALITY_YELLOW; 
        }
    }

	public dispose():void
    {
        let view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        super.dispose();
    }
}