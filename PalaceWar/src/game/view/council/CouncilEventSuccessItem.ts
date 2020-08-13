/**
 * 议事事件item
 * qianjun
 * date 2017/10/12
 * @class DiscussEventSuccessItem
 */
class CouncilEventSuccessItem extends ScrollListItem
{

	public constructor() {
		super();
    }
    
    private get api(){
        return Api.councilVoApi;
    }

    private _data : any = null;
	public initItem(index:number,data:any):void{		
        let view = this;
        view.width = 634;
        view.height = 200;
        view._data = data;
        //底图
        let bg = BaseBitmap.create('discusslistbg');
        bg.width = 634;
        bg.height = 188;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view);
        view.addChild(bg);

        let eid = data.eventId;
        let type = data.eventNeedType;
        let joinNum = data.joinNum;
        //玩家头像
        let picbg = BaseBitmap.create(`discusspicbg`);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, picbg, bg, [25,0]);
        view.addChild(picbg);

        let userContainer = Api.playerVoApi.getPlayerPortrait(data.level, data.pic);
        userContainer.mask = egret.Rectangle.create().setTo(100,0,picbg.width,150);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, userContainer, picbg, [-5, -10]);
        view.addChild(userContainer);
        userContainer.addTouchTap(view.clickItemHandler, view);

        //排名
        let rankid = Math.min(4, index + 1);
        let rankbg = BaseBitmap.create(`discussrank${rankid}`);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, rankbg, picbg);
        view.addChild(rankbg);

        let rankTxt = ComponentManager.getTextField(LanguageManager.getlocal('acRank_rank6', [(index + 1).toString()]),20);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rankTxt, rankbg);
        view.addChild(rankTxt);

        let kaung = BaseBitmap.create(`public_9_bg4`);
        kaung.width = 470;
        kaung.height = 155;
        view.setLayoutPosition(LayoutConst.lefttop, kaung, picbg, [picbg.width + 10,0]);
        view.addChild(kaung);
        //玩家名
        let nameTxt = ComponentManager.getTextField(data.name, 20, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, nameTxt, picbg, [picbg.width + 20,10]);
        view.addChild(nameTxt);
        if(data.uid == Api.playerVoApi.getPlayerID()){
            nameTxt.textColor = 0xfcf3b4;
        }
        //总属性
        let needTypeTxt = ComponentManager.getTextField(LanguageManager.getlocal(`discussViewAttrTotal`, [type == 0 ? '' : LanguageManager.getlocal(`servantInfo_speciality${type}`), App.StringUtil.changeIntToText(data.totalNum)]), 20, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.righttop, needTypeTxt, bg, [40,nameTxt.y]);
        view.addChild(needTypeTxt);
        //奖励
        let isVistTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_BLACK);
        let str = view.api.getRewardByRank(index + 1);
        if(str && str != ''){
            let unit = str.split('|');
            let num = unit[0].split('_');
            isVistTxt.text = LanguageManager.getlocal(`allianceTaskrewardStr`, [num[2]])
        }
        view.setLayoutPosition(LayoutConst.lefttop, isVistTxt, nameTxt, [0,nameTxt.textHeight + 10]);
        view.addChild(isVistTxt);

        let line = BaseBitmap.create(`public_line1`);
        line.width = 470;
        view.setLayoutPosition(LayoutConst.lefttop, line, isVistTxt, [0,isVistTxt.textHeight + 2]);
        view.addChild(line);
        
        let sinfo = data.sinfo;
        let arr = [];
        for(let i in data.sinfo){
            let servantid = i;
            let info = data.sinfo[i];
            let servanthalf = "servant_half_" + servantid;
            if(info.servantSkin){
                servanthalf = `skin_half_${info.servantSkin}`;
            }
            arr.push({
                data : {
                    qualityBoxImgPath : "servant_cardbg_" + info.clv,
                    halfImgPath : servanthalf
                }
            });
        }
        let tmpRect =  new egret.Rectangle(0,0,450,90);
        let scrollList = ComponentManager.getScrollList(CouncilEventSearvantItem, arr, tmpRect);
        scrollList.verticalScrollPolicy = 'off';
        view.setLayoutPosition(LayoutConst.lefttop, scrollList, isVistTxt, [-5,isVistTxt.textHeight]);
        view.addChild(scrollList);
    }

    private clickItemHandler(event: egret.TouchEvent): void {
		this.showUserInfo();
	}

	private showUserInfo()
    {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:this._data.uid});
    }

	protected userShotCallback(event:egret.Event)
    {
        let data = event.data.data.data;
        // if(String(data.ruid) == this._chatData.sender)
        // {
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
    }
    
	public getSpaceY():number{
		return 10;
	}

    public dispose():void{
		super.dispose();
	}
}