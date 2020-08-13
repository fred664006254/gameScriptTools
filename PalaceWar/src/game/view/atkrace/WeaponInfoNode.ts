/**
 * 战斗中神器信息，代替神器出场动画
 * shaolaing   2020.7.15
 */

class WeaponInfoNode extends BaseDisplayObjectContainer
{
    public constructor() {
		super();
	}
    public init(sid:string, value:number ,atype:number):void
    {
        let weaponCfg = Config.ServantweaponCfg.getWeaponItemByServantId(sid);

        let weaponVo :WeaponInfoVo = null;
        if (weaponCfg)
        {
            weaponVo = Api.weaponVoApi.getWeaponInfoVoById(weaponCfg.id);
        }
        if (!value && weaponVo)
        {
            value = weaponVo.getSpecialityByType(atype);
        }

        let weaponbg = BaseLoadBitmap.create("weapon_info_bg");
        weaponbg.width = 109;
        weaponbg.height = 86;
        weaponbg.y = 14;
		this.addChild(weaponbg);

        let weaponImg = BaseLoadBitmap.create(weaponCfg.itemIcon);
		weaponImg.width = 80;
        weaponImg.height = 80;
        weaponImg.setPosition(weaponbg.x+weaponbg.width/2-weaponImg.width/2,weaponbg.y+weaponbg.height/2-weaponImg.height/2);
		this.addChild(weaponImg);

        let title = BaseBitmap.create("weapon_info_title");
        title.setPosition(weaponbg.width/2-title.width/2,0);
        this.addChild(title);

        let nameBg = BaseLoadBitmap.create("weapon_info_addbg");
        nameBg.width = 131;
        nameBg.height = 34;
        nameBg.setPosition(weaponbg.width/2-nameBg.width/2,weaponbg.y+weaponbg.height-16);
        this.addChild(nameBg);


      

        // let name = ComponentManager.getTextField(weaponCfg.name,20,TextFieldConst.COLOR_LIGHT_YELLOW);
        // name.setPosition(nameBg.x+nameBg.width/2-name.width/2,nameBg.y+10);
        // this.addChild(name);

        let add = ComponentManager.getTextField(LanguageManager.getlocal("weapon_attack",[String(value)]),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        add.setPosition(nameBg.x+nameBg.width/2-add.width/2,nameBg.y+7);
        this.addChild(add);


    }
}