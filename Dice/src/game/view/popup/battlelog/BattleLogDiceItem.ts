
class BattleLogDiceItem extends ScrollListItem {

	public constructor() {
		super();
    }
    
	protected initItem(index : number, data : {id:string}, param:any) {
        let view = this;

        view.width = param ? (40) : 97;
        view.height = param ? 40 : 96;

        let bg = BaseBitmap.create(`public_alpha`);
        bg.width = bg.height = param ? 36 : 128;
        // let bg = BaseBitmap.create(`bird_team_item_${Config.DiceCfg.getCfgById(data.id).quality}`);
        // bg.height = BattleStatus.diceSize.width * DiceScaleEnum.scale_54;
        let birdBg = BaseBitmap.create(`bird_team_item_${Config.DiceCfg.getCfgById(data.id).quality}`);
        birdBg.setScale(0.85);
        this.addChild(birdBg);

        let icon = App.CommonUtil.getDiceIconById(data.id,DiceScaleEnum.scale_battle_log);
        if(param){
            icon.setScale(DiceScaleEnum.scale_pve);
            birdBg.setScale(0.85*0.4);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, birdBg, bg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, bg);
        view.addChild(icon);

        this.addTouchTap(()=>{
            ViewController.getInstance().openView(ViewConst.DICEDETAILINFOVIEW,{
                dice : data.id,
                check : true,
                // inbattle:true,
                // info:{
                //     lv: Config.FairarenaCfg.getDiceLv(),
                // }
            });
        },this);
    }
    
	public getSpaceY(): number {
		return 0;
    }
    
	public getSpaceX(): number {
		return 0;
    }
    
	public dispose(): void {
        let view = this;
		super.dispose();
	}
}