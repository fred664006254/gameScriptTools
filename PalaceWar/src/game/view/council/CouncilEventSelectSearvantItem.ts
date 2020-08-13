/**
 * 议事派遣门客item
 * author qianjun
 * date 2017/10/12
 */
class CouncilEventSelectSearvantItem extends ScrollListItem
{

	public constructor() {
		super();
    }
    
    protected _servantInfoVo:ServantInfoVo;
    public _data : any;
    private _Index : number = 0;
    private _selectBtn : BaseButton = null;
    private _joinPic : BaseBitmap = null;

    private get api(){
        return Api.councilVoApi;
    }

	protected initItem(index:number,info:any)
    {
        let view = this;
        view._data = info;
        view._Index = index;
        view.width = 508;
        view.height = 120 + 10;
        view._servantInfoVo = info.data;
        let data : ServantInfoVo = info.data;

        let bg : BaseBitmap = BaseBitmap.create("public_9_bg44");
		bg.width = 508;
		bg.height = 120;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view);
        view.addChild(bg);
        
        let temW:number = 94;
		let iconBgBt:BaseLoadBitmap = BaseLoadBitmap.create(data.qualityBoxImgPath,null, {callback : ()=>{
            view.setLayoutPosition(LayoutConst.leftverticalCenter, iconBgBt, bg, [10,0]);
            let iconBt:BaseLoadBitmap = BaseLoadBitmap.create(data.halfImgPath,null, {callback : ()=>{
                view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconBt, iconBgBt);
            }, callbackThisObj : view});
            this.addChild(iconBt);
            iconBt.scaleX = (temW-10)/180;
            iconBt.scaleY = (temW-10)/177;


        if (data.isServantExile()) {
            let exileBMscale = temW/194;
            let exileBM = BaseBitmap.create("public_servantexilelogo");
            exileBM.setScale(exileBMscale);
            exileBM.setPosition(iconBgBt.x + exileBMscale * 194 - exileBM.width * exileBMscale, iconBgBt.y);
            this.addChild(exileBM);
        }

            let nameTxt = ComponentManager.getTextField(data.servantName, 22, TextFieldConst.COLOR_QUALITY_YELLOW);
            view.setLayoutPosition(LayoutConst.lefttop, nameTxt, iconBgBt, [94 + 10,0]);
            view.addChild(nameTxt);

            let levelTxt = ComponentManager.getTextField(LanguageManager.getlocal('discussServantLevel',[data.level.toString()]), 22);
            view.setLayoutPosition(LayoutConst.lefttop, levelTxt, nameTxt, [0,nameTxt.textHeight + 10]);
            view.addChild(levelTxt);
            //主属性 1 武力 2 智力 3政治 4魅力
            let mainAtr = '';
            let attr = '';
            switch(info.needType){
                case 1: 
                    mainAtr = App.StringUtil.changeIntToText(data.attrVo.forceTotal);
                    attr = `emperorWarBuzhen_forceAtt`;
                    break;
                case 2:
                    mainAtr = App.StringUtil.changeIntToText(data.attrVo.brainsTotal);
                    attr = `emperorWarBuzhen_inteAtt`;
                    break;
                case 4:
                    mainAtr = App.StringUtil.changeIntToText(data.attrVo.charmTotal);
                    attr = `emperorWarBuzhen_charmAtt`;
                    break;
                case 3:
                    mainAtr = App.StringUtil.changeIntToText(data.attrVo.politicsTotal);
                    attr = `emperorWarBuzhen_policyAtt`;
                    break;
                case 0:
                    mainAtr = App.StringUtil.changeIntToText(data.total);
                    attr = `emperorWarBuzhenZsx`;
                    break;
            }
            let mainatrText = ComponentManager.getTextField(LanguageManager.getlocal(attr, [mainAtr]), 22);
            view.setLayoutPosition(LayoutConst.lefttop, mainatrText, levelTxt, [0,levelTxt.textHeight + 10]);
            view.addChild(mainatrText);
        }, callbackThisObj : view});
		this.addChild(iconBgBt);
		iconBgBt.scaleX = temW/194;
        iconBgBt.scaleY = temW/192;

        let selectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'allianceTaskSendBtnTxt', view.selectClick, view);
        view.setLayoutPosition(LayoutConst.rightverticalCenter, selectBtn, view, [10,0]);
        view.addChild(selectBtn);
        selectBtn.visible = false;
        view._selectBtn = selectBtn;

        let str = '';
        let isjoin = view.api.servantIsJoined(info.eventId, data.servantId);
        switch(isjoin){
            case 'JOIN_THIS':
                str = 'discusspqzhong';
                break;
            case 'JOIN_OTHER':
                str = 'discussypqian'; 
                break;
            case 'NOT_JOIN':
                str = ''; 
                break;
        }

        let joinText = BaseBitmap.create(str);
        view.setLayoutPosition(LayoutConst.rightverticalCenter, joinText, view, [10,0]);
        view.addChild(joinText);
        joinText.visible = false;
        view._joinPic = joinText;

        if(isjoin == 'NOT_JOIN'){
            view._selectBtn.visible = true;
        }
        else{
            view._joinPic.visible = true;
        }
    }
    
    public refreshStatus(type):void{
        let view = this;
        if(type == 'add'){
            view._selectBtn.visible = false;
            let isjoin = view.api.servantIsJoined(view._data .eventId, view._data.data.servantId);
            let str = '';
            switch(isjoin){
                case 'JOIN_THIS':
                    str = 'discusspqzhong';
                    break;
                case 'JOIN_OTHER':
                    str = 'discussypqian'; 
                    break;
            }
            view._joinPic.setRes(str);
            view._joinPic.visible = true;
        }
        else{
            view._selectBtn.visible = true;
            view._joinPic.visible = false;
        }
        view.setLayoutPosition(LayoutConst.rightverticalCenter, view._joinPic, view, [10,0], true);
    }

    
    private selectClick():void{
        let view = this;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_COUNCIL_TEAMCHANGE, {type : 'add', idx : view._Index, servantId : view._data.data.servantId});
    }
    
	public getSpaceX():number{
		return 10;
	}

    public dispose():void{
        let view = this;
        view._joinPic = null;
        view._selectBtn = null;
		super.dispose();
	}
}