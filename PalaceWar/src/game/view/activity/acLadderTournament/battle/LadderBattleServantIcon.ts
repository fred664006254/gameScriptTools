/*
    author : shaoliang
    date : 2019.10.28
    desc : 战斗门客的图标
*/

class LadderBattleServantIcon extends BaseDisplayObjectContainer
{ 
    private _selectBitmap:BaseBitmap = null;
    private _result:BaseBitmap = null;

    public constructor(){
        super();
    }

    public init(info:any):void
    {
        let bg = BaseBitmap.create("ladder_battle_servantbg");
        bg.name = "bg";
        this.addChild(bg);

        let servantpic = "";
        if(info.equip){
            let skincfg = Config.ServantskinCfg.getServantSkinItemById(info.equip);
            servantpic = skincfg.cell;
        }
        else
        {   
           servantpic = "servant_cell_" + info.sid;
        }
        let icon = BaseLoadBitmap.create(servantpic);
        icon.width = bg.width;
        icon.height = bg.height;
        icon.name = "icon2";
        this.addChild(icon);

        let mask = BaseBitmap.create("ladder_battle_servantmask");
        icon.mask = mask;

        let namebg = BaseBitmap.create("ladder_battle_servant_namebg");
        namebg.name = "namebg";
        this.addChild(namebg);

        let nametext = ComponentManager.getTextField(LanguageManager.getlocal("servant_name"+info.sid),20,TextFieldConst.COLOR_BROWN);
        nametext.setPosition(bg.width/2-nametext.width/2,bg.height-28);
        nametext.name = "nametext";
        this.addChild(nametext);


    }

    public setSelect(s:boolean):void
    {
        if (s)
        {
            if (!this._selectBitmap)
            {   
                let bg = <BaseBitmap>this.getChildByName("bg");
                this._selectBitmap = BaseBitmap.create("ladder_battle_servant_light")
                this._selectBitmap.width = 124;
                this._selectBitmap.height = 160;
                this._selectBitmap.setPosition(bg.width/2-this._selectBitmap.width/2,bg.height/2-this._selectBitmap.height/2);
                this.addChild(this._selectBitmap);
            }
        }
        else
        {
            if (this._selectBitmap)
            {
                this._selectBitmap.dispose();
                this._selectBitmap = null;
            }
        }
    }

    public setResult(r:number):void
    {   
        if (this._result)
        {
            return;
        }
        if (r == 2)
        {
            App.DisplayUtil.changeToGray(this.getChildByName("bg"));
            // App.DisplayUtil.changeToGray(this.getChildByName("icon2"));
            this.getChildByName("icon2").alpha = 0.6;
            App.DisplayUtil.changeToGray(this.getChildByName("namebg"));
            App.DisplayUtil.changeToGray(this.getChildByName("nametext"));
        }
        let result = BaseBitmap.create("ladder_formation_icon"+r);
        result.setPosition(6,65);
        this.addChild(result);
        this._result = result;
    }


    public dispose() 
    {   
        this._selectBitmap = null;
        this._result = null;

        super.dispose();
    }
}