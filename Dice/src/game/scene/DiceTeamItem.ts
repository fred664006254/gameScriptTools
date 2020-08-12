
class DiceTeamItem extends ScrollListItem {

    protected _data : any = null;
    private _icon : BaseDisplayObjectContainer = null;
    private _levelTxt : BaseTextField = null;
    private _teamid : number = 0;
    private _bg : BaseBitmap = null;
    private clip:CustomMovieClip = null;
    public tipgruop: BaseDisplayObjectContainer = null;
    /**item 的状态， 1 默认状态， 2 编辑状态 */
    public status: number = 1;

	public constructor() {
		super();
    }
    
	protected initItem(index : number, data : {id:string, showLevel?:number}, param:any) {
        let view = this;
        view._teamid = param;
        view.width = 108 + 7;
        view.height = 140;
        view._data = data;

        // Config.DiceCfg.getCfgById(data.id).quality;
        let bg = BaseBitmap.create(`bird_team_item_${Config.DiceCfg.getCfgById(data.id).quality}`);
        bg.height = BattleStatus.diceSize.width * DiceScaleEnum.scale_54;
        bg.width =BattleStatus.diceSize.height * DiceScaleEnum.scale_54;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bg, view, [0,5], true);
        view.addChild(bg);
        view._bg = bg;
        bg.touchEnabled = true;
        bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bgOnclick, this);

        // if(Config.DiceCfg.getCfgById(data.id).quality === 4){
            let clip = ComponentMgr.getCustomMovieClip("guangxiao", 10); 
            clip.width = bg.width;
            clip.height = bg.height;
            this.addChild(clip);
            clip.blendMode = egret.BlendMode.ADD;
            clip.setEndCallBack(()=>{
                clip.dispose();
                clip = null;
            },this);
            clip.playWithTime(0);
            clip.visible = Config.DiceCfg.getCfgById(data.id).quality === 4;
            this.clip = clip;
            // clip.setPosition(20,10);
        // }

        let group = new BaseDisplayObjectContainer();
        view.addChild(group);
        view._icon = group;
        group.width = BattleStatus.diceSize.width * DiceScaleEnum.scale_54;
        group.height = BattleStatus.diceSize.height * DiceScaleEnum.scale_54;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, group, bg);
    
        let iconGroup = App.CommonUtil.getDiceIconById(data.id,DiceScaleEnum.scale_team);
        group.addChild(iconGroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconGroup, group);

        let tipgruop = new BaseDisplayObjectContainer();
        this.addChild(tipgruop);
        tipgruop.visible = false;
        this.tipgruop = tipgruop;
        let tipbg = BaseBitmap.create("publicclickchangebg");
        tipgruop.addChild(tipbg);
        
        let tiptxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_16, ColorEnums.white);
        tipgruop.addChild(tiptxt);
        tiptxt.text = LangMger.getlocal("sysclicktochange");
        tipgruop.alpha = 0;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tiptxt, tipgruop, [0,0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipgruop, bg, [0,0]);

        let level = Api.DiceVoApi.getDiceLvById(data.id);

        let levelTxt  = ComponentMgr.getTextField(LangMger.getlocal(`sysLevel`, [level.toString()]), TextFieldConst.SIZE_30, ColorEnums.white);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, levelTxt, bg, [0,bg.height+15]);
        view.addChild(levelTxt);
        view._levelTxt = levelTxt;
        levelTxt.bold = true;
        levelTxt.stroke = 1.5;

        data.showLevel = data.showLevel || 1;
        if(data.showLevel == 2){
            levelTxt.visible = false;
        }

        if(view._teamid == 0){
            levelTxt.visible = false;
        }
    }

    protected bgOnclick(obj, evt:egret.Event){
        if(this.status === 2){
            return;
        }
        ViewController.getInstance().openView(ViewConst.DICEDETAILINFOVIEW,{
            dice : this._data.id,
            check : true,
        });

        App.MsgHelper.dispEvt(MsgConst.DICE_INFOCLICK, {
            idx : -1,
            dice : ``
        });
    }

    /**
     * setTween
     */
    public setTween() {
        this.tipgruop.visible = true;
        let tw = egret.Tween.get(this.tipgruop, {loop:true});
        tw.to({alpha:1}, 1500).wait(1500)
        .to({alpha:0}, 1500).wait(1500);
    }

    /**
     * rmTween
     */
    public rmTween() {
        this.tipgruop.visible = false;
        egret.Tween.removeTweens(this.tipgruop);
    }
    
    public freshInfo():void{
        let view = this;

        let line = Api.LineVoApi.getLineInfoById(view._teamid);
        let diceinfo = line[view._index];
        let dice = diceinfo.id;
        this._data.id = dice;

        view._icon.removeChildren();
        let iconGroup = App.CommonUtil.getDiceIconById(dice,DiceScaleEnum.scale_team);
        view._icon.addChild(iconGroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconGroup, view._icon);
        view._bg.setRes(`bird_team_item_${Config.DiceCfg.getCfgById(dice).quality}`);
        this.clip.visible = Config.DiceCfg.getCfgById(dice).quality === 4;


        let level = Api.DiceVoApi.getDiceLvById(dice);
        view._levelTxt.text = LangMger.getlocal(`sysLevel`, [level.toString()]);
    }

    public openChangeTeam(dice : string, teamid : number):void{
        let view = this;
        view.removeTouchTap();
        this.status = 2;
        this._bg.touchEnabled = false;
        //打开替换队列模式
        view.addTouchTap(()=>{
            NetManager.request(NetConst.DICE_USE,{
                diceId : dice,
                lineNo : teamid,
                upPos : view._index + 1
            });
        },view);
    }

    public sendClick(dice : string, teamid : number):void{
        let view = this;
        NetManager.request(NetConst.DICE_USE,{
            diceId : dice,
            lineNo : teamid,
            upPos : view._index + 1
        });
    }

    public closeChangeTeam():void{
        let view = this;
        this.status = 1;
        this._bg.touchEnabled = true;
        //关闭替换队列模式
        view.removeTouchTap();
    }
    
	public getSpaceY(): number {
		return 0;
    }
    
	public getSpaceX(): number {
		return 0;
    }
    
	public dispose(): void {
        let view = this;
        view.tipgruop = null;
        view._data = null;
        view._icon = null;
        view._levelTxt = null;
        view._teamid = 0;
        view._bg = null;
        this.clip = null;
		super.dispose();
	}
}