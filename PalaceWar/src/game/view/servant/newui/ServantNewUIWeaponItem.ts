/**
 * 门客详情new 神器ServantNewUIWeaponItem部分
 * author shaoliang
 * date 2019/7/31
 * @class ServantNewUIWeaponItem
 */
class ServantNewUIWeaponItem extends BaseDisplayObjectContainer
{
    private _servantId:string = null;
    private _bottomH:number = 0;
    private _barGroup:TabBarGroup = null;
    private _containerTab:{[key:string]:BaseDisplayObjectContainer} = {};

    public constructor()
	{
		super();
	}
	public init(servantId:string,bottomH):void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADE),this.checkWeaponRed,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADETEN),this.checkWeaponRed,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPABILITY),this.checkWeaponRed,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPSKILL),this.checkWeaponRed,this);

        this._servantId = servantId;
        this._bottomH = bottomH;
        let weaponVo = Api.weaponVoApi.getWeaponInfoVoByServantId(servantId);
        if (!weaponVo)
        {
            let blackBg = BaseBitmap.create("public_9_bg11");
            blackBg.width = GameConfig.stageWidth;
            blackBg.height = bottomH;
            this.addChild(blackBg);

            let noGetText = ComponentManager.getTextField(LanguageManager.getlocal("weapon_not_get"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
            noGetText.setPosition(blackBg.width/2 - noGetText.width/2, bottomH/2-12);
            this.addChild(noGetText);

            return;
        }

        let barTabNames = ["weapon_info_btn1","weapon_info_btn2","weapon_info_btn3"];

        this._barGroup = ComponentManager.getTabBarGroup(barTabNames,barTabNames,this.tabBtnClickHandler,this,null,TabBarGroup.ALIGN_VERTICAL,null,true);
		this._barGroup.x = 0;
        this._barGroup.y = 30;
        this.addChild(this._barGroup);

        this.tabBtnClickHandler({index:0}); 
        this.checkWeaponRed();
    }

    private checkWeaponRed():void
    {   
        let weaponVo = Api.weaponVoApi.getWeaponInfoVoByServantId(this._servantId);
        for (let i=0; i<3; i++)
        {   
            let showred = false;
            if (i==0)
            {   
                showred=weaponVo.checkLevelUp1();
            }
            if (i==1)
            {   
                showred=weaponVo.checkLevelUp2();
            }
            else if (i==2)
            {   
                showred=weaponVo.checkLevelUp3();
            }
            
            if (showred)
            {
                this._barGroup.addRedPoint(i);
            }
            else
            {
                this._barGroup.removeRedPoint(i);
            }
        }
    }  

    private tabBtnClickHandler(params:any)
    {
        let tarIdx = params.index; 

        let btnKey = String(tarIdx+1);

        for (let key in this._containerTab)
        {
            this._containerTab[key].visible = false;
        }
        
        if (this._containerTab[btnKey])
        {
            this._containerTab[btnKey].visible = true;
        }
        else
        {   
            this.initContainer(btnKey);            
        }

        if (btnKey == "1" || btnKey == "3")
        {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SELECTED_WEAPON_PROMATION,[1]);
        }
        else if (btnKey == "2")
        {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SELECTED_WEAPON_PROMATION,[2]);
        }
    }

    private initContainer(btnKey:string):void
    {
        let tmpNode = new BaseDisplayObjectContainer();
        this.addChild(tmpNode);
        if (btnKey ==  "1")
        {
            let node1 = new ServantWeaponNode1();
            node1.init(this._servantId,this._bottomH);
            tmpNode.addChild(node1);
        }
        else if (btnKey ==  "2")
        {
            let node2 = new ServantWeaponNode2();
            node2.init(this._servantId,this._bottomH);
            tmpNode.addChild(node2);
        }
        else if (btnKey ==  "3")
        {
            let node3 = new ServantWeaponNode3();
            node3.init(this._servantId,this._bottomH);
            tmpNode.addChild(node3);
        }

        this._containerTab[btnKey] = tmpNode;
    }



    public dispose():void
	{
         App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADE),this.checkWeaponRed,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADETEN),this.checkWeaponRed,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPABILITY),this.checkWeaponRed,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPSKILL),this.checkWeaponRed,this);

        this._servantId = null;
        this._barGroup = null;
        this._containerTab = null;
        this._bottomH = 0;

        super.dispose();
	}
}