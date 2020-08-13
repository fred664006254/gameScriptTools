
class WeaponAttr2Item extends WeaponAttrItem
{


    public constructor()
	{
		super();
	}

    public init(type:number,weaponid:string):void
	{
        this._type = type;
        this._weaponId = weaponid;

        let picstr:string = "servant_season_bg3";
        let bg = BaseLoadBitmap.create(picstr);
        bg.width = 241;
        bg.height = 84;
        this.addChild(bg);

        let cfg = Config.ServantweaponCfg.getWeaponItemById(weaponid);
        let name = ComponentManager.getTextField(LanguageManager.getlocal("weapon_attribute_type"+type),20,TextFieldConst.COLOR_QUALITY_RED);
        name.setPosition(bg.width/2-name.width/2,7);
        this.addChild(name);

        let powername = ComponentManager.getTextField("",18,TextFieldConst.COLOR_LIGHT_YELLOW);
        powername.width = 90;
        powername.lineSpacing =3;
        powername.setPosition(30,40);
        this.addChild(powername);
        powername.text = LanguageManager.getlocal("weapon_attribute_type"+type+"_name"+cfg.attributeType1);

        this._power = ComponentManager.getTextField("",19,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._power.width = 110;
        this._power.textAlign = egret.HorizontalAlign.RIGHT;
        this._power.setPosition(110,40);
        this.addChild(this._power);

        // let vo = <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_THREEKINGDOMS);
        // let corner = BaseLoadBitmap.create(vo?"servant_season_flag1":"servant_season_flag2");
        // corner.width = 74;
        // corner.height = 65;
        // this.addChild(corner);
    }

    public setPower():void
    {
        let weaponVo = Api.weaponVoApi.getWeaponInfoVoById(this._weaponId);
        this._power.text = "+"+weaponVo.getAttributeValueByType(this._type);
    }
}