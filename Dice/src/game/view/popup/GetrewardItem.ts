
class GetrewardItem extends ScrollListItem {

	public constructor() {
		super();
    }
    
	protected initItem(index : number, data : any) {
        let view = this;
        let islock = data.lock;
        view.width = 157;
        view.height = 178 + 10;

        let rewardVo = data;
        let bgid:number | string = 1;
        let scale = 0.75;
        let dy = 10;
        let x = 0;
        if(rewardVo.type == 100){
            let cfg = Config.DiceCfg.getCfgById(rewardVo.id);
            if(cfg.quality == 4){
                bgid = `4_1`;
                scale = 1;
                dy = 0;
                x = -10
            } else {
                bgid = cfg.quality;
            }
            // bgid = cfg.quality == 4 ? `4_1` : cfg.quality;
        }

        let bg = BaseBitmap.create(`bird_item_bg_${bgid}`);
        view.addChild(bg);
        bg.setScale(scale);
        bg.x = x;
        bg.y = dy;
        if(rewardVo.type == 1 || rewardVo.type == 2){
            let rewardData = GameData.formatRewardItem(rewardVo.type == 1 ? `1_1_1` : `2_1_1`)[0];
            let icon = GameData.getItemIcon(rewardData);
            view.addChild(icon);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon, bg, [0,dy]);
        }
        else{
            if(bgid ==="4_1"){
                // 传奇鸟特效
                let clip = ComponentMgr.getCustomMovieClip("guangxiao", 10); 
                view.addChild(clip);
                clip.blendMode = egret.BlendMode.ADD;
                clip.setEndCallBack(()=>{
                    clip.dispose();
                    clip = null;
                },view);
                clip.playWithTime(0);
                clip.setPosition(10,0);
            }
            let diceicon = App.CommonUtil.getDiceIconById(rewardVo.id.toString(),1);
            let shadow = diceicon.getChildByName(`shadow`);
            if(shadow){
                shadow.visible = false;
            }
            // itemGroup.width = diceicon.width * diceicon.scaleX;
            // itemGroup.height =diceicon.height * diceicon.scaleY;
            if(bgid === "4_1"){
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, diceicon, bg, [0,30 - dy]);
            } else {
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, diceicon, bg, [0,20 - dy]);
            }
            view.addChild(diceicon);
            
            if(Api.DiceVoApi.notOld(rewardVo.id.toString())){
                let newState = BaseBitmap.create(`dicenewget`);
                newState.width = 55;
                newState.height = 56;
                newState.setPosition(-9, 4);
                this.addChild(newState);
            }
           	
        }
        let numTxt = ComponentMgr.getTextField(`x${rewardVo.num}`, TextFieldConst.SIZE_CONTENT_COMMON);
        view.addChild(numTxt)
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, numTxt, bg, [10,6]);
		
    }

    protected checkBounds():boolean
	{
		return false;
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