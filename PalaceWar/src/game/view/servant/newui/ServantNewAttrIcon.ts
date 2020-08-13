/**
 * 门客新UI 神器资质图标
 * 神器加工
 * author shaoliang
 * date 2019/8/1
 * @class ServantNewAttrIcon
 */

class ServantNewAttrIcon extends BaseDisplayObjectContainer
{   
    private _numbg:BaseBitmap = null;
    private _plusNum:BaseTextField = null;
    private _starTab:any[] = [];
    private _icon:BaseBitmap = null;

    public constructor()
	{
		super();
	}
    // t 1,2,3,4 武智政魅
    public init(t:number):void
	{
         let icon = BaseBitmap.create("weapon_infopro"+t);
         icon.y = 10;
         this.addChild(icon);
         this._icon = icon;

         let numbg = BaseBitmap.create("weapon_numbg");
         numbg.x = 55;
         this.addChild(numbg);
         this._numbg = numbg;
         
         this._plusNum = ComponentManager.getTextField("0",16,TextFieldConst.COLOR_LIGHT_YELLOW);
         this._plusNum.width = numbg.width;
         this._plusNum.textAlign = egret.HorizontalAlign.CENTER;
         this._plusNum.setPosition(numbg.x, numbg.height/2-this._plusNum.height/2);
         this.addChild(this._plusNum);

         let starbg = BaseBitmap.create("weapon_star_bg");
         starbg.x = 0;
         starbg.y = 70;
         this.addChild(starbg);

         icon.x = starbg.width/2 - icon.width/2;
         

    }

    public setInfo(info:number[]):void
    {
        let star:number = info[0];
        let plus:number = info[1];
        let show:number = info[2];

        for (let i = 0; i<this._starTab.length; i++)
        {
            this._starTab[i].dispose();
        }
         this._starTab.length = 0;

        //  star = 5;
        //  plus = 2;

        if (star <= 5)
        {   
            let objContainer = new BaseDisplayObjectContainer;
            for (var index = 0; index < star; index++) {
                let starImg = BaseBitmap.create("servant_star");
                starImg.width = 30;
                starImg.height = 28;
                starImg.setScale(0.5);
                starImg.x = index * starImg.width*0.5;
                starImg.y = 2;
                objContainer.addChild(starImg);
            }
            objContainer.setPosition(47-objContainer.width/2,71);
            this.addChild(objContainer);
            this._starTab.push(objContainer);
        }
        else
        {
            let starImg = BaseBitmap.create("servant_star");
            starImg.width = 30;
            starImg.height = 28;
            starImg.setScale(0.5);
            starImg.x = 22;
            starImg.y = 71;
            this.addChild(starImg);

            let starNum = ComponentManager.getTextField(String(star),16,TextFieldConst.COLOR_WHITE);
            starNum.setPosition(starImg.x+18,starImg.y);
            this.addChild(starNum);
        }

        if (plus)
        {
            this._plusNum.visible = true;
            this._numbg.visible = true;
            this._plusNum.text = "+"+plus;
        }
        else
        {
            this._plusNum.visible = false;
            this._numbg.visible = false;
        }
        if (show)
        {
            App.DisplayUtil.changeToNormal(this._icon);
        }
        else
        {
            App.DisplayUtil.changeToGray(this._icon);
        }
    }

    public dispose()
    {
        this._plusNum = null;
        this._starTab.length = 0;
        this._numbg = null;
        this._icon = null;

        super.dispose();   
    }
}