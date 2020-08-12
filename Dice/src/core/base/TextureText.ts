/**
 *普通位图文字，只支持图集用法，暂时只能用数字和英文字母
 *
 * @class TextureText
 * @extends {BaseDisplayObjectContainer}
 */
class TextureText extends BaseDisplayObjectContainer
{
    private _preName:string=null;
    private _showStr:string='';
    private _letterSpacing:number=0;
    public constructor()
    {
        super();
    }
    public init(preName:string):void
    {
        this._preName=preName;
    }

    public setString(str:string):void
    {
        if(this._showStr==str)
        {
            return;
        }
        let num=this.numChildren;
        str=str||'';
        let l =str.length;
        for (let index = 0; index < l; index++) {
            const idxStr = str[index];
            let bmp:BaseBitmap=null;
            if(index<num)
            {
                bmp=<BaseBitmap>this.getChildAt(index);
                bmp.setRes(this._preName+idxStr);
            }
            else
            {
                bmp = BaseBitmap.create(this._preName+idxStr);
                this.addChildAt(bmp,index);
            }
            bmp.x=(bmp.width+this._letterSpacing)*index;
        }
        if(num>l)
        {
            for (let index = l; index < num; index++) 
            {
                let bmp=<BaseBitmap>this.getChildAt(l);
                bmp&&bmp.dispose();
            }
        }
        this._showStr=str||'';
    }

    public set letterSpacing(value:number)
    {
        this._letterSpacing=value;
    }

    public get letterSpacing():number
    {
        return this._letterSpacing;
    }

    public dispose():void
    {
        this._preName=null;
        this._showStr='';
        this._letterSpacing=0;
        super.dispose();
    }
}