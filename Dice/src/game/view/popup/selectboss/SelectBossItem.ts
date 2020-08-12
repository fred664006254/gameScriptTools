
class SelectBossItem extends ScrollListItem {
    private _group : BaseDisplayObjectContainer = null;

	public constructor() {
		super();
    }
    
	protected initItem(index : number, data : any) {
        let view = this;
        view.touchEnabled = false; 
        view.width = 213;
        view.height = 168;

        let boss = data;
        let group = new BaseDisplayObjectContainer();
        group.width = 204;
        view.addChild(group);
      
        
        let shadow = BaseBitmap.create(`selectbossshadow`);
        group.addChild(shadow);

        let img = BaseLoadBitmap.create(`boss_icon_${boss}`);
        group.addChild(img)
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, img, shadow, [0, 0]);
        shadow.x = 27;
        img.x = 10;

        group.anchorOffsetX = group.width / 2;
        group.anchorOffsetY = group.height / 2;
        group.setScale(0.75);
        view._group = group;
        group.setPosition(view.width/2, view.height/2);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, group, view);
		
    }
    
    public showSelect():void{
        let view = this;

        egret.Tween.get(view._group).to({scaleX : 1.2, scaleY : 1.2}, 300).to({scaleX : 1, scaleY : 1}, 100).call(()=>{
            egret.Tween.removeTweens(view._group);
        },view);

    }
    
	public getSpaceY(): number {
		return 0;
    }
    
	public getSpaceX(): number {
		return 0;
    }
    
	public dispose(): void {
        let view = this;
        view._group.dispose();
        view._group = null;
		super.dispose();
	}
}