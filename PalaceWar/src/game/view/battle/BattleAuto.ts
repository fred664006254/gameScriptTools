/**
 * author shaoliang
 * date 2018/12/4
 * @class BattleAuto
 * 门客战斗 自动上阵蒙版
 */

class BattleAuto extends BaseDisplayObjectContainer
{
    private _callbackF:Function = null;
	private _obj:any = null;

    public constructor() {
		super();
	}

    public init(type:number,f:Function,o:any):void
	{
        this._obj = o;
        this._callbackF = f;  

        let viewBg = BaseBitmap.create("public_alphabg");
        viewBg.width = GameConfig.stageWidth;
        viewBg.height = GameConfig.stageHeigth;
        viewBg.addTouchTap(this.touchTap,this,null);
        this.addChild(viewBg);

        let posY:number = GameConfig.stageHeigth - 280;
        if (type == 2)
        {
            posY = GameConfig.stageHeigth - 540;
        }
        else if (type == 3)
        {
            posY = GameConfig.stageHeigth - 360;
        }

        let bg:BaseBitmap = BaseBitmap.create("public_9_mainicontimebg");
        bg.width = 360;
        bg.setPosition(GameConfig.stageWidth/2-180, posY);
        this.addChild(bg);

        let rect = new egret.Rectangle(0,0,210,40);
         let picstr = "battle_auto1";
        if (type == 3)
        {
            picstr = "battle_auto2";
        }

        let title:BaseLoadBitmap = BaseLoadBitmap.create(picstr,rect);
        title.setPosition(GameConfig.stageWidth/2-title.width/2, posY+3);
        this.addChild(title);

        let str = LanguageManager.getlocal("autoBattleStop_DailyAc_1");
        if (type == 3)
        {
            str = LanguageManager.getlocal("autoBattleStop_AllianceQuest");
        }

        let text:BaseTextField = ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_CONTENT_SMALL);
        text.width = 330;
        text.lineSpacing = 6;
        text.textAlign = egret.HorizontalAlign.CENTER;
        text.setPosition( GameConfig.stageWidth/2-text.width/2, title.y+title.height + 7);
        this.addChild(text);

        bg.height = title.height + text.height + 18;

    }

    private touchTap():void
	{
       this._callbackF.apply(this._obj);
    }

    public dispose():void
	{
        this._callbackF = null;
		this._obj = null;

        super.dispose();
    }
}