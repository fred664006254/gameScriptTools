
class WeaponAttrItem extends BaseDisplayObjectContainer
{
    protected _type:number = 0;
    protected _power:BaseTextField = null;
    protected _weaponId:string = null;

    public constructor()
	{
		super();
	}

    public init(type:number,weaponid:string):void
	{
        this._type = type;
        this._weaponId = weaponid;

        let picstr:string = type>4 ? "servant_season_bg2" : "weapon_attribute_bg1";
        let bg = BaseLoadBitmap.create(picstr);
        bg.width = 241;
        bg.height = 84;
        this.addChild(bg);

        let name = ComponentManager.getTextField(LanguageManager.getlocal("weapon_speciality_name_"+type),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        name.setPosition(bg.width/2-name.width/2,7);
        this.addChild(name);

        let powername = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
        powername.setPosition(40,40);
        this.addChild(powername);
        if (type == 5)
        {
            powername.text = LanguageManager.getlocal("weapon_speciality_power_2");
        }
        else if (type == 8)
        {
            powername.text = LanguageManager.getlocal("weapon_speciality_power_3");
        }
        else
        {
            powername.text = LanguageManager.getlocal("weapon_speciality_power_1");
        }

        this._power = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
        this._power.width = 110;
        this._power.textAlign = egret.HorizontalAlign.RIGHT;
        this._power.setPosition(90,40);
        this.addChild(this._power);
    }

    public setPower():void
    {
        let weaponVo = Api.weaponVoApi.getWeaponInfoVoById(this._weaponId);
        this._power.text = "+"+weaponVo.getSpecialityByType(this._type);
    }

    public dispose()
    {   
        this._type = 0;
        this._power = null;
        this._weaponId = null;

        super.dispose();
    }
}