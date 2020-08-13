/**
 * 门客信息，道具部分
 * author yanyuling
 * date 2017/11/20
 * @class ServantInfoItemsScrollItem
 */

class ServantSkillItem extends ScrollListItem
{

	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:any,param:any)
    {
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.useBtnHandlerCallBaclk,this);
        this.width = 120;
        this.height = 130;
        let sid = param;

        // let skillarr = [{skillType : `base`, skillId : '0'}, {skillType : `base`, skillId : '1'}];
        // if(cfg.skillPassive){
        //     skillarr.unshift({skillType : `passive`, skillId : cfg.skillPassive})
        // }
        // if(cfg.skillActive){
        //     skillarr.unshift({skillType : `fight`, skillId : cfg.skillActive})
        // }
        // if(cfg.skillLevy){
        //     skillarr.unshift({skillType : `levy`, skillId : cfg.skillLevy})
        // }


        let res = "servant_skill_icon" + data.skillId;
        if(!RES.hasRes(res)){
            res = 'servant_skill_icon1';
        }
        if(data.skillType == 2){
            res = "skillLevy_icon"+data.skillId; 
        }
        else if(data.skillType == 1){
            let scfg = Config.SkillpassiveCfg.getSkillPassiveById(data.skillId);
            res = scfg.skillIcon;
        }

        let skillIcon = BaseLoadBitmap.create(res);
        skillIcon.width = 108;
        skillIcon.height = 109;
        skillIcon.setScale(97/108 * 0.9);
        this.addChild(skillIcon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, skillIcon, this, [6,0], true);

        let lvbg = BaseBitmap.create(`servant_skilllvbg`);
        this.addChild(lvbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, lvbg, skillIcon, [64,-3]);

        let skill = Api.servantVoApi.getServantSkillLv(sid,data.skillId);
        let skilllvTxt = ComponentManager.getTextField(`${skill}`, 22);
        this.addChild(skilllvTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skilllvTxt, lvbg);

        let namebg = BaseBitmap.create(`servant_skillnamebg`);
        this.addChild(namebg);
        namebg.width = 107;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, namebg, skillIcon, [0,skillIcon.height * skillIcon.scaleY + 9]);

        let nameStr = '';
        if(data.skillType == 2){
            nameStr = "skillLevy_name"+data.skillId; 
        }
        else if(data.skillType == 1){
            nameStr = "skillPassive_name"+data.skillId; 
        }
        else{
            nameStr = "servant_skillname"+data.skillId;
        }
        let nameTxt = ComponentManager.getTextField(LanguageManager.getlocal(nameStr),18,0x462003);
        this.addChild(nameTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, namebg);

        let typebg = BaseBitmap.create(`servant_skilltype${data.skillType}bg`);
        this.addChild(typebg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, typebg, skillIcon, [-6,5]);

        let type = BaseBitmap.create(`servant_skilltype${data.skillType}`);
        this.addChild(type);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, type, typebg);

        this.addTouchTap(()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSKILLLEVELUPPOPUPVUEW, {
                skillid : data.skillId,
                servantId : sid,
                skillType : data.skillType
            })
        }, this);
    }

    public dispose():void
    {
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.useBtnHandlerCallBaclk,this);
        super.dispose()
    }
}