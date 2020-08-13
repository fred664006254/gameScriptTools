/**
 * 武器架
 * date 2020.6.15
 * @class AcWeaponHousePopupViewTab4
 */
class AcWeaponHousePopupViewTab4 extends CommonViewTab{
    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }
    public initView():void{
        let rewardBg = BaseBitmap.create(App.CommonUtil.getResByCode("ac_weaponhousetab4bg", this.getTypeCode()));
        rewardBg.setPosition(29, 57);
        this.addChild(rewardBg);

        let cfgs = this.cfg.addScoreList;
        let arr = [[407,670],[283,670],[159,670],[33,670],[382,521],[222,521],[60,521],[344,375],[92,375],[220,220]];
        for(let i = cfgs.length-1; i >= 0; i--)
        {
            let txt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_reward_tab4txt", this.getTypeCode()),[""+cfgs[i].lvScore]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            txt.width = 140;
            txt.textAlign = egret.HorizontalAlign.CENTER;
            txt.x = arr[i][0];
            txt.y = arr[i][1];
            this.addChild(txt);
        }
        let tiptxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_reward_tab4tip", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, tiptxt, rewardBg,[0,-95]);
        this.addChild(tiptxt);       
    }

    private refreshView():void{

    }

    private get cfg() : Config.AcCfg.WeaponHouseCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcWeaponHouseVo{
        return <AcWeaponHouseVo> Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

    public dispose():void{
        let view = this;
        super.dispose();
    }
}