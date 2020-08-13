/**
 * 议事事件item
 * author dky
 * date 2017/10/12
 * @class ChildScrollItem
 */
class CouncilItem extends ScrollListItem
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
        view.width = 553;
        view.height = 231 + 10;
        view._data = data;

        let eid = data.eventId;
        let type = data.eventNeedType;
        let joinNum = data.joinNum;
        //底图
        let bg = BaseBitmap.create(`discussevent${type == 0 ? 5 : type}bg`);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view);
        view.addChild(bg);
        //事件类型
        let needImg = BaseBitmap.create(`discussattrtype${type == 0 ? 5 : type}`);
        view.setLayoutPosition(LayoutConst.lefttop, needImg, bg);
        view.addChild(needImg);

        let blackBgRect: BaseBitmap = BaseBitmap.create("public_9_bg20");
		blackBgRect.width = view.width - 10;
		blackBgRect.height = 70;
		view.setLayoutPosition(LayoutConst.horizontalCenterbottom, blackBgRect, bg);
        view.addChild(blackBgRect);
        //事件名
        let rid = view.api.getDescId(eid);
        let nameTxt = ComponentManager.getTextField(LanguageManager.getlocal(`discussViewEventName${type}_${rid}`), 20);
        view.setLayoutPosition(LayoutConst.lefttop, nameTxt, blackBgRect, [10,10]);
        view.addChild(nameTxt);
        //所需述性
        let needTypeTxt = ComponentManager.getTextField(LanguageManager.getlocal(`discussViewNeedType`, [LanguageManager.getlocal(`servantInfo_speciality${type == 0 ? 7 : type}`)]), 20);
        view.setLayoutPosition(LayoutConst.leftbottom, needTypeTxt, blackBgRect, [10,10]);
        view.addChild(needTypeTxt);
        //是否参加
        let isVistTxt = ComponentManager.getTextField(LanguageManager.getlocal(`discussViewIsVisit${view.api.isVisitEvent(eid) ? 1 : 2}`), 20);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, isVistTxt, blackBgRect, [0,10]);
        view.addChild(isVistTxt);
        //查看事件按钮
        let str = 'discussViewCkanVisit';
        if(view.api.canGetReward(data.eventId)){
            str = 'DragonBoatDayLq';
        }
        let cksjianBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, str, view.cksjianClick, view);
        view.setLayoutPosition(LayoutConst.rightverticalCenter, cksjianBtn, blackBgRect, [5,0]);
        view.addChild(cksjianBtn);

        if (data.canjoin)
        {
            App.CommonUtil.addIconToBDOC(cksjianBtn);
        }

        let public_dot1 = BaseBitmap.create("public_dot2");
		view.setLayoutPosition(LayoutConst.righttop, public_dot1, cksjianBtn, [0-public_dot1.width/4, -public_dot1.height/4]);
        public_dot1.visible = view.api.canGetReward(data.eventId);
        view.addChild(public_dot1);
        //事件类型
        let joinBg = BaseBitmap.create(`discussredbg`);
        view.setLayoutPosition(LayoutConst.righttop, joinBg, bg, [10,10]);
        view.addChild(joinBg);
        
        let joinTxt = ComponentManager.getTextField(LanguageManager.getlocal(`discussviewJoinNum`,[joinNum,view.api.getMaxJoinNum()]), 20, view.api.isVisitEvent(eid) ? 0x21eb39 : (joinNum >= Config.CouncilCfg.maxPlayer ? 0xff3c3c : 0xfcf3b4));
        joinTxt.textAlign = egret.HorizontalAlign.CENTER;
        joinTxt.lineSpacing = 4;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, joinTxt, joinBg);
        view.addChild(joinTxt);
    }
    
    private cksjianClick():void{
        let view = this;
        // ViewController.getInstance().openView(ViewConst.POPUP.COUNCILREWARDPOPUPVIEW, {
        //     eventId : "1",//data.eventId,
        //     exp : "1_5_1000",//data.exp,
        //     servantData : {1007: "14_1_1000",1008: "14_1_1000",1009: "14_1_1000",1001: "14_1_1000",1001: "14_1_1000"},//data.servantData,
        //     rank : '3',//data.myrankArr.myrank
        // });
        // return;
        if(view.api.getCurpeirod() == 1){
            App.CommonUtil.showTip(LanguageManager.getlocal("discussJoinEventTip8"));
            return;
        }
        if(view.api.getCurpeirod() == 3){
            App.CommonUtil.showTip(LanguageManager.getlocal("discussJoinEventTip9"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.COUNCILEVENTVIEW, view._data);
    }
    
	public getSpaceY():number{
		return 10;
	}

    public dispose():void{
		super.dispose();
	}
}