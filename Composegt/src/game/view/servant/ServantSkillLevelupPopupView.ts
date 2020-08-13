/**
 * 门客技能升级
 * author yanyuling
 * date 2017/11/18
 * @class ServantBookLevelupPopupView
 */

class ServantSkillLevelupPopupView extends PopupView
{
    private _curTxt : BaseTextField = null;
    private _nextTxt : BaseTextField = null;
    private _skillExp : BaseTextField = null;
    private _bg : BaseBitmap = null;
    private _btn : BaseButton = null;
    private _curLvTxt : BaseTextField = null;
    private _levelTxt : BaseTextField = null;

	public constructor() {
		super();
	}

	public initView():void
	{
        let view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_UPSKILL, view.fresh, view)
        // public_tcdw_bg01
        let skillId = this.param.data.skillid;
        let servantId = this.param.data.servantId;
        let skilltype = this.param.data.skillType;
        let skilllv = Api.servantVoApi.getServantSkillLv(servantId, skillId);
        let isSpecial = Number(skillId) > 1;

        let group = new BaseDisplayObjectContainer();
        this.addChildToContainer(group);
        
		let bg:BaseBitmap = BaseBitmap.create("public_9v_bg12");
		bg.width = 526;
		bg.height = 355;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
        group.addChild(bg); 
        this._bg = bg;
        
        let res = "servant_skill_icon" + skillId;
        if(!RES.hasRes(res)){
            res = 'servant_skill_icon1';
        }
        if(skilltype == 2){
            res = "skillLevy_icon"+skillId; 
        }
        else if(skilltype == 1){
            let scfg = Config.SkillpassiveCfg.getSkillPassiveById(skillId);
            res = scfg.skillIcon;
        }
        let skillIcon =  BaseLoadBitmap.create(res);
        skillIcon.width = 108;
        skillIcon.height = 109;
        group.addChild(skillIcon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, skillIcon, bg, [145,16]);
        
        let skillName = ComponentManager.getTextField("",20,0x462003);
        let cn = "";
        // if(!LanguageManager.checkHasKey(cn)){
        //     cn = `servant_skillname1`;
        // }

        if(skilltype == 2){
            cn = "skillLevy_name"+skillId; 
        }
        else if(skilltype == 1){
            cn = "skillPassive_name"+skillId; 
        }
        else{
            cn = "servant_skillname"+skillId;
        }

        skillName.text = LanguageManager.getlocal(cn);
        group.addChild(skillName);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, skillName, skillIcon, [skillIcon.width+20,27]);

        let LvTxt = ComponentManager.getTextField(LanguageManager.getlocal("discussServantLevel", [`${skilllv}`]),20,0x410D00);
        group.addChild(LvTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, LvTxt, skillName, [0,skillName.textHeight+17]);
        view._curLvTxt = LvTxt;

        let line1 = BaseBitmap.create(`public_line4`);
        line1.width = 460;
        group.addChild(line1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line1, bg, [0,125]);

        let proNumBg = BaseBitmap.create("public_ts_bg01"); 
        proNumBg.width = 280;
        group.addChild(proNumBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, proNumBg, line1, [0,line1.height+14]);

        let curTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkillCur"),22,0x410D00);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, curTxt, proNumBg);
        group.addChild(curTxt); 

        let cfg = Config.ServantskillCfg.getSpecialSkillItemCfg(skillId);
        let str = '';
        if(skilltype == 3){
            str = cfg.getDescStr();
        }
        if(skilltype == 2){
            let cfg = Config.SkilllevyCfg.getSkillLevyById(skillId);
            str = cfg.skillDes;
        }
        if(skilltype == 1){
            let scfg = Config.SkillpassiveCfg.getSkillPassiveById(skillId);
            str = scfg.skillDes;
        }
        if(!isSpecial){
            str = LanguageManager.getlocal(`servantSkillDesc_${skillId}`, []);
        }
        let curValueTxt =  ComponentManager.getTextField(str,22,0x410D00);
        curValueTxt.width = 500;
        curValueTxt.lineSpacing = 10;
        curValueTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, curValueTxt, proNumBg, [0, proNumBg.height+20]);
        group.addChild(curValueTxt); 
        this._curTxt = curValueTxt;

        if(!isSpecial){
            let proNumBg2 = BaseBitmap.create("public_ts_bg01"); 
            proNumBg2.width = 280;
            group.addChild(proNumBg2);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, proNumBg2, curValueTxt, [0,curValueTxt.height+37]);

            let nextTxt = ComponentManager.getTextField(`${LanguageManager.getlocal("skinnextLv")}：`,22,0x410D00);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nextTxt, proNumBg2);
            group.addChild(nextTxt); 

            let nextValueTxt =  ComponentManager.getTextField(LanguageManager.getlocal(`servant_amulet_popTxt2`),22,0x410D00);
            nextValueTxt.lineSpacing = 10;
            nextValueTxt.textAlign = egret.HorizontalAlign.CENTER;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, nextValueTxt, proNumBg2, [0, proNumBg2.height+20]);
            group.addChild(nextValueTxt); 
            this._nextTxt = nextValueTxt;
            nextValueTxt.width = 520;

            let skillExpTxt = ComponentManager.getTextField(LanguageManager.getlocal(``, ['']), 22);  
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, skillExpTxt, bg, [0, bg.height+11]);
            group.addChild(skillExpTxt); 
            this._skillExp = skillExpTxt;

            let baseCfg = GameConfig.config.servantbaseCfg;
            let skillUpgradeExp:number[] = baseCfg.skillUpgradeExp; 
            let btn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"",()=>{
                if(Number(skillId) < 2){
                    let costexp = skillUpgradeExp[skilllv-1];
                    let servantObj:ServantInfoVo = Api.servantVoApi.getServantObj(servantId);
                    let exp = servantObj.skillExp;
                    if (exp < costexp){
                        App.CommonUtil.showTip(LanguageManager.getlocal(`servant_skilllevelupTip1`));
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUEST_SERVANT_UPSKILL,{servantId:servantId,pos:skillId})
                }
            },this);
            //btn.setText(LanguageManager.getlocal(`servant_skilllevelup`, [``]), false);

            btn.setScale(1.1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, skillExpTxt, [0, skillExpTxt.height+14]);
            group.addChild(btn); 
            this._btn = btn;

            let levelTxt = ComponentManager.getTextField(LanguageManager.getlocal(`servant_skilllevelup`, [``]), 20);
            levelTxt.textAlign = egret.HorizontalAlign.CENTER;
            levelTxt.lineSpacing = 5;
            view._levelTxt = levelTxt;
            group.addChild(levelTxt);
        }
        if(skilltype == 2){
            let cfg = Config.SkilllevyCfg.getSkillLevyById(skillId);
            let sinfo = Api.servantVoApi.getServantObj(servantId);
            if(sinfo.level < cfg.unlockLevel){
                let unlockTip = ComponentManager.getTextField(LanguageManager.getlocal(`servantUnlockLv`, [cfg.unlockLevel+'']), 22, TextFieldConst.COLOR_WARN_RED);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, unlockTip, curValueTxt, [0, curValueTxt.height+10]);
                group.addChild(unlockTip); 
            }
            
        }
        this.fresh();
        
    }

    private fresh():void{
        let view = this;
        let skillId = this.param.data.skillid;
        let servantId = this.param.data.servantId;
        let baseCfg = GameConfig.config.servantbaseCfg;
		let skillUpgradeExp:number[] = baseCfg.skillUpgradeExp; 
        let maxLv =  baseCfg.skillLvLimit; 
        let skilllv = Api.servantVoApi.getServantSkillLv(servantId, skillId);
        let skillValue1:number = GameConfig.config.servantbaseCfg.skillValue1 *100;
        let skillValue2:number = GameConfig.config.servantbaseCfg.skillValue2 *100;
        let servantObj:ServantInfoVo = Api.servantVoApi.getServantObj(servantId)
        //基础技能
        if(Number(skillId) < 2){
            if(skilllv == maxLv)
            {
                //最大等级
                App.DisplayUtil.changeToGray(view._btn);
                //this._lv1TipStr = LanguageManager.getlocal("servant_skilllevelupTip2");
                this._nextTxt.text = LanguageManager.getlocal("servant_skilllevelupTxt2",[LanguageManager.getlocal("servant_skilllLvTop"),""]);
            }else{
                let value = Number(skillId) == 0 ? ((skillValue1*(skilllv+1)).toFixed(2)) : ((skillValue2*(skilllv+1) +100).toFixed(0))
                this._nextTxt.text = LanguageManager.getlocal(`servantSkillDesc_${skillId}`,[value]);
            }
            let value = Number(skillId) == 0 ? ((skillValue1*skilllv).toFixed(2)) : ((skillValue2*skilllv +100).toFixed(0))
            this._curTxt.text = LanguageManager.getlocal(`servantSkillDesc_${skillId}`, [value]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, this._curTxt, this._bg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, this._nextTxt, this._bg);
    
            let costexp = skillUpgradeExp[skilllv-1];
            view._skillExp.text = LanguageManager.getlocal(`servant_skillexp`, [servantObj.skillExp+'']);  
            view._skillExp.textColor = servantObj.skillExp >= costexp ? 0x35916F : TextFieldConst.COLOR_WARN_RED;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._skillExp, view._bg, [0, view._bg.height+11]);
    
            view._levelTxt.text = LanguageManager.getlocal(`servant_skilllevelup`, [`${costexp}`]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._btn, view._skillExp, [0, view._skillExp.height+14]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._levelTxt, view._btn);
    
            view._curLvTxt.text = LanguageManager.getlocal("discussServantLevel", [`${skilllv}`]);
        }
    }
 

    public dispose()
    {
        let view = this;
        view._curTxt = null;
        view._nextTxt = null;
        view._skillExp = null;
        view._bg = null;
        view._btn = null;
        view._curLvTxt = null;
        view._levelTxt = null;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_UPSKILL, view.fresh, view);
        super.dispose();
    }
}