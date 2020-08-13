/**
 * light item
 * author ycg
 * date 2020.6.3
 * @class AcMouseComeLight
 */
class AcMouseComeLight extends BaseDisplayObjectContainer
{
    private _aid:string;
    private _code:string;
    private _icon0:BaseBitmap;
    private _icon1:BaseBitmap;
    private _icon2:BaseBitmap;
    private _icon3:BaseBitmap;
    private _lightNode:BaseDisplayObjectContainer;

    private iconSpace = 10;
    private iconWidth = 62;
    private startX = 21;
    private roundWidth = (62 + 10) * 2;
    private baseWidth = 62 + 10;

    private _light:BaseBitmap;
	public constructor(param?:any) 
	{
        super();
        if (param && param.aid){
            this._aid = param.aid;
            this._code = param.code;
        }
        this.createLight();
    }
    
    private getTypeCode():string{
        if (this._code == "2"){
            return "1";
        }
        return this._code;
    }

    private createLight(){
        let bg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_light", this.getTypeCode()));
        this.addChild(bg);
        this.width = bg.width;
        this.height = bg.height;

        let container = new BaseDisplayObjectContainer();
        container.width = this.width;
        container.height = this.height;
        this.addChild(container);

        let mask = new egret.Rectangle(21, 49, 62, 58);
        container.mask = mask;

        let lightNode = new BaseDisplayObjectContainer();
        lightNode.width = this.width;
        lightNode.height = this.height;
        container.addChild(lightNode);
        // lightNode.setPosition(21, 49);
        this._lightNode = lightNode;

        let icon0 = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_lighticon1", this.getTypeCode()));
        icon0.x = this.startX;
        icon0.y = 49;
        lightNode.addChild(icon0);

        let icon1 = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_lighticon2", this.getTypeCode()));
        icon1.x = this.startX + this.iconSpace + this.iconWidth;
        icon1.y = 49;
        lightNode.addChild(icon1);

        this._icon0 = icon0;
        this._icon1 = icon1;

        this._light = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_lighteff", this.getTypeCode()));
        this._light.visible = false;
        this._light.x = bg.x + bg.width/2 - this._light.width/2;
        this._light.y = bg.y + bg.height/2 - this._light.height/2 + 15;
        this._light.blendMode = egret.BlendMode.ADD;
        this.addChild(this._light);
    }
    public showLight():void
    {
        this._light.alpha = 0;
        this._light.visible = true;
        
        egret.Tween.get(this._light, {loop: false})
        .to({alpha:1},150)
        .to({alpha:0},150)
        .to({alpha:1},150)
    }

    public playAnim(result:number, playNum:number, time:number):void
    {
        let roundNum = playNum + Math.floor((Math.random() * 2))
        let animTime = time + Math.floor((Math.random() * 700));
        egret.Tween.get(this._lightNode,{onChange:()=>{
            if(this._lightNode.x + this._icon0.x + this.baseWidth < 0){
                this._icon0.x += this.roundWidth;
            }
            if(this._lightNode.x + this._icon1.x + this.baseWidth < 0){
                this._icon1.x += this.roundWidth;
            }
        },onChangeObj:this})
        .to({x:-(this.roundWidth * roundNum) - result * this.baseWidth}, animTime,egret.Ease.cubicOut);
        
    }

    public resetLight():void
    {
        egret.Tween.removeTweens(this._lightNode);

        this._icon0.x = this.startX;
        this._icon1.x = this.startX + this.iconSpace + this.iconWidth;
        this._lightNode.x = 0;
        egret.Tween.removeTweens(this._light);
        this._light.alpha = 0;
        this._light.visible = false;
    }

	public dispose():void
	{
        this._aid = null;
        this._code = null;
        this._icon0 = null;
        this._icon1 = null;
        egret.Tween.removeTweens(this._lightNode);
        this._lightNode = null;
        egret.Tween.removeTweens(this._light);
        this._light = null;

		super.dispose();
	}
}