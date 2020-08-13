/**
 * 神器登场
 * author shaoliang
 * date 2019/8/28
 * @class WeaponComeOnView
 */

class WeaponComeOnView extends BaseView
{   
    private _function:Function = null;
    private _obj:any = null;
    private _showType:number = 0;

    public constructor()
	{
		super();
	}

    protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getBgName():string
	{
		return "public_alphabg";
	}

    protected isShowMask():boolean
	{
		return false;
	}

    protected getResourceList():string[]
	{
		let rewardPic:string[] = super.getResourceList();
		return rewardPic.concat([
				"weapon_show_bg","wifestatus_namebg","servant_upgrade_frame",
                //"weapon_upgrade_effect"
		]);
	}

    //type 1我方左 2我方中 3我放右 4敌方右 5敌方中
    //atype 属性类型
    protected initView():void
	{   
        let type = this.param.data.type;
        let sid = this.param.data.sid;
        let value = this.param.data.value;
        let atype = this.param.data.atype;

        let type2 = this.param.data.type2;
        let sid2 = this.param.data.sid2;
        let value2 = this.param.data.value2;
        let atype2 = this.param.data.atype2;

        this._function = this.param.data.f;
        this._obj = this.param.data.o;

        
        if (type == 1 || type == 2 || type == 6 || type == 7)
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
        }

        this.touchEnabled = true;
        this.addTouchTap(this.hide,this,null);

        if (value && value2)
        {
            this._showType = 3;
            this.showWeapon(type,sid,value,atype);
            this.showWeapon(type2,sid2,value2,atype2);
        }
        else if (value)
        {
            this._showType = 1;
            this.showWeapon(type,sid,value,atype);
        }
        else if (value2)
        {
            this._showType = 2;
            this.showWeapon(type2,sid2,value2,atype2);
        }
        else
        {
            this.hide();
        }
    }   


    //type 7 削藩平乱 右 
    private showWeapon(type:number,sid:string,value:number,atype:number){
        let weaponCfg = Config.ServantweaponCfg.getWeaponItemByServantId(sid);
        let auto = this.param.data.auto;
        let posX = 300;
        let posY = GameConfig.stageHeigth - 460;
        let posYO = GameConfig.stageHeigth-200;
        let posY1 = GameConfig.stageHeigth - 330;
        if (type == 3)
        {
            posX = 10;
        }
        //上面的
        else if (type>3)
        {   
            posX = 60;
            posYO = 400;
        }

        if (atype == 3 || atype == 5)
        {
            posYO = GameConfig.stageHeigth - 480;
            if (type == 1)
            {
                posX = 390;
            }
        }
        else if (atype == 8)
        {
            if (type == 1)
            {
                posX = 390;
            }
        }

        posY = posYO - 260;
        posY1 = posYO - 130;;

        let weaponNode = new BaseDisplayObjectContainer();
        
        
        weaponNode.setPosition(posX,posYO);

        let weaponbg = BaseBitmap.create("weapon_show_bg");
        weaponbg.setScale(0.5);
		weaponNode.addChild(weaponbg);

        let weaponImg = BaseLoadBitmap.create(weaponCfg.icon);
		weaponImg.width = 346*0.4;
        weaponImg.height = 346*0.4;
        weaponImg.setPosition(weaponbg.width*weaponbg.scaleX/2-weaponImg.width/2,weaponbg.height*weaponbg.scaleY/2-weaponImg.height/2-20);
		weaponNode.addChild(weaponImg);

        let nameBg = BaseBitmap.create("wifestatus_namebg");
        nameBg.width = 170;
        nameBg.height = 66;
        nameBg.setPosition(weaponbg.width*weaponbg.scaleX - 20,weaponbg.height*weaponbg.scaleY/2- nameBg.height /2);
        weaponNode.addChild(nameBg);

        let name = ComponentManager.getTextField(weaponCfg.name,20,TextFieldConst.COLOR_LIGHT_YELLOW);
        name.setPosition(nameBg.x+nameBg.width/2-name.width/2,nameBg.y+10);
        weaponNode.addChild(name);

        let add = ComponentManager.getTextField(LanguageManager.getlocal("weapon_attack",[String(value)]),18,TextFieldConst.COLOR_QUALITY_GREEN);
        add.setPosition(nameBg.x+nameBg.width/2-add.width/2,nameBg.y+34);
        weaponNode.addChild(add);

        let temp = BaseBitmap.create("servant_upgrade_frame1")
        let clip = ComponentManager.getCustomMovieClip("servant_upgrade_frame",5,100);
        clip.setScale(2);
		clip.setPosition(posX-90,posY-70);
		this.addChild(clip);

		let view = this;
		clip.setEndCallBack(()=>{
            clip.visible = false;
        },this)
        clip.playWithTime(1);

        this.addChild(weaponNode);

        egret.Tween.get(weaponNode).to({y:posY1},250).to({y:posY,alpha:0},300).call(this.hide,this);
    }

    public hide():void{   
        if (this._function && this._obj)
        {
            this._function.apply(this._obj,[this._showType]);
        }
        super.hide();
    }

    public dispose(){
        this._function = null;
        this._obj = null;
        this._showType = 0;

        super.dispose();   
    }
}