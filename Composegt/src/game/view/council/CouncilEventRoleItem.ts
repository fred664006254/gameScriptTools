/**
 * 议事事件item
 * author qianjun
 * date 2017/10/12
 */
class CouncilEventRoleItem extends BaseDisplayObjectContainer
{

	public constructor() {
		super();
    }
    
    private get api(){
        return Api.councilVoApi;
    }

    private _joinBg : BaseBitmap = null;
    private _joinBtn : BaseBitmap = null;

    private _data : any = null;
	public initItem(index:number,data:any):void{		
        let view = this;
        view.width = 139 + 110;
        view.height = 310;
        view._data = data;
        let joinBg =  BaseBitmap.create("discussseat");
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, joinBg, view, [0,20]);
        view.addChild(joinBg);
        view._joinBg = joinBg;
        if(data.name){
            let role = BaseBitmap.create(`discussplayerrole`);
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, role, view, [0,-35], true);
            view.addChild(role);

            let nameBg = BaseBitmap.create("dinner_name_bg1");
            nameBg.width = 180;
            nameBg.height = 30;
            view.addChild(nameBg);
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, nameBg, role, [0,60]);
            
            let nameTxt = ComponentManager.getTextField(data.name,20, TextFieldConst.COLOR_LIGHT_YELLOW);
            view.addChild(nameTxt);
            if(data.uid == Api.playerVoApi.getPlayerID()){
                nameTxt.textColor = 0x7bbfff;// TextFieldConst.COLOR_QUALITY_BLUE;
                 nameBg.texture = ResourceManager.getRes("discuss_name_bg1");
            }
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, nameBg);
        }
        else{
            joinBg.addTouchTap(view.joinBtnHandler,view);
            let joinBtn =  BaseBitmap.create("studyatk_arrow");
            joinBtn.addTouchTap(view.joinBtnHandler,view);
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, joinBtn, joinBg, [0,60]);
            let tarY = joinBtn.y;
            egret.Tween.get(joinBtn,{loop:true}).to({y:tarY - 50 },1000).wait(200).to({y:tarY },1000);
            view.addChild(joinBtn);
            view._joinBtn = joinBtn;
        }
    }

    public refreshRole(data):void{
        let view = this;
        if(!view._joinBtn){
            return;
        }
        if(view._joinBg){
            view._joinBg.removeTouchTap();
        }
        if(view._joinBtn){
            view._joinBtn.removeTouchTap();
            view.removeChild(view._joinBtn);
            egret.Tween.removeTweens(view._joinBtn);
            view._joinBtn = null;
        }
        let role = BaseBitmap.create(`discussplayerrole`);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, role, view, [0,-35], true);
        view.addChild(role);

        let nameBg = BaseBitmap.create("dinner_name_bg1");
        nameBg.width = 180;
        nameBg.height = 30;
        view.addChild(nameBg);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, nameBg, role, [0,60]);
        
        let nameTxt = ComponentManager.getTextField(data.name,20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(nameTxt);
        if(data.uid == Api.playerVoApi.getPlayerID()){
            nameTxt.textColor = 0x7bbfff;// TextFieldConst.COLOR_QUALITY_BLUE;
            nameBg.texture = ResourceManager.getRes("discuss_name_bg1");
        }
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, nameBg);
    }

    private joinBtnHandler():void{
        let view = this;
        if(view.api.isVisitEvent(view._data.eventId)){
            App.CommonUtil.showTip(LanguageManager.getlocal("discussViewHaveVisit"));
            return;
        }
        if(view.api.getEventInfoById(view._data.eventId).joinNum >= view.api.getMaxJoinNum()){
            App.CommonUtil.showTip(LanguageManager.getlocal("discussViewNumEnough"));
            return;
        }
        if(view.api.getCurpeirod() != 2){
            App.CommonUtil.showTip(LanguageManager.getlocal("discussViewEventTimePass"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.COUNCILSELECTSERVANTVIEW, view._data);
    }

    public getSpaceX():number{
		return 220;
	}
    
	public getSpaceY():number{
		return 10;
	}

    public dispose():void{
        let view = this;
        if(view._joinBg){
            view._joinBg.removeTouchTap();
            view._joinBg = null;
        }
        if(view._joinBtn){
            view._joinBtn.removeTouchTap();
            egret.Tween.removeTweens(view._joinBtn);
            view._joinBtn = null;
        }
		super.dispose();
	}
}