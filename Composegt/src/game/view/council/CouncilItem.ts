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
        view.width = 570;
        view.height = 231 + 30;
        view._data = data;

        let eid = data.eventId;
        let type = data.eventNeedType;
        let joinNum = data.joinNum;

        let __bg = BaseBitmap.create("activity_db_01");
        __bg.width = this.width;
        __bg.height = this.height;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, __bg, view);
        view.addChild(__bg);
        //底图
        let bg = BaseBitmap.create(`discussevent${type == 0 ? 5 : type}bg`);
        bg.width = 556;
        bg.height = 176;
        bg.x = __bg.x + __bg.width/2 - bg.width/2;
        bg.y = __bg.y + 8;
        // view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, __bg,[]);
        view.addChild(bg);
        //事件类型
        let needImg = BaseLoadBitmap.create(`servant_speciality${type == 0 ? 6 : type}`);
        needImg.width = 55;
        needImg.height = 57;
        view.setLayoutPosition(LayoutConst.lefttop, needImg, bg,[5,5]);
        view.addChild(needImg);

        // let blackBgRect: BaseBitmap = BaseBitmap.create("public_9_bg20");
		// blackBgRect.width = view.width - 10;
		// blackBgRect.height = 70;
		// view.setLayoutPosition(LayoutConst.horizontalCenterbottom, blackBgRect, bg);
        // view.addChild(blackBgRect);
        //事件名
        let rid = view.api.getDescId(eid);
        let nameTxt = ComponentManager.getTextField(LanguageManager.getlocal(`discussViewEventName${type}_${rid}`), 20,TextFieldConst.COLOR_BROWN);
        view.setLayoutPosition(LayoutConst.lefttop, nameTxt, bg, [10,bg.height +10]);
        view.addChild(nameTxt);
        //所需述性
        let needTypeTxt = ComponentManager.getTextField(LanguageManager.getlocal(`discussViewNeedType`, [LanguageManager.getlocal(`servantInfo_speciality${type == 0 ? 7 : type}`)]), 20,TextFieldConst.COLOR_BROWN);
        // needTypeTxt.x = nameTxt.x ;
        // needTypeTxt.y = nameTxt.y + 20;
        view.setLayoutPosition(LayoutConst.lefttop, needTypeTxt, bg, [10,bg.height + 30]);
        view.addChild(needTypeTxt);
        //是否参加
        let isVistTxt = ComponentManager.getTextField(LanguageManager.getlocal(`discussViewIsVisit${view.api.isVisitEvent(eid) ? 1 : 2}`), 20,TextFieldConst.COLOR_BROWN);
        view.setLayoutPosition(LayoutConst.lefttop, isVistTxt, bg, [bg.width/2 - 70,bg.height + 30]);
        // needTypeTxt.x = bg.x +bg.width/2;
        // needTypeTxt.y = needTypeTxt.y ;
        view.addChild(isVistTxt);
        //查看事件按钮
        let str = 'discussViewCkanVisit';
        if(view.api.canGetReward(data.eventId)){
            str = 'DragonBoatDayLq';
        }
        let cksjianBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, str, view.cksjianClick, view);
        view.setLayoutPosition(LayoutConst.righttop, cksjianBtn, bg, [5,bg.height + 10]);
        view.addChild(cksjianBtn);

        let public_dot1 = BaseBitmap.create("public_dot2");
		view.setLayoutPosition(LayoutConst.righttop, public_dot1, cksjianBtn, [0-public_dot1.width/4, -public_dot1.height/4]);
        public_dot1.visible = view.api.canGetReward(data.eventId);
        view.addChild(public_dot1);
        //事件类型
        let joinBg = BaseBitmap.create("public_numbg")//(`discussredbg`);
        joinBg.height = 60;
        view.setLayoutPosition(LayoutConst.righttop, joinBg, bg, [20,10]);
        view.addChild(joinBg);
        
        let joinTxt = ComponentManager.getTextField(LanguageManager.getlocal(`discussviewJoinNum`,[joinNum,view.api.getMaxJoinNum()]), 20, view.api.isVisitEvent(eid) ? 0x21eb39 : (joinNum >= Config.CouncilCfg.maxPlayer ? 0xff3c3c : 0xfedb38));
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
        // this._node
		super.dispose();
	}
}